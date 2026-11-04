const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function run() {
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9889',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    'http://127.0.0.1:5173/'
  ]);

  let versionInfo = null;
  for (let i = 0; i < 20; i++) {
    await sleep(300);
    try {
      versionInfo = await fetchJson('http://127.0.0.1:9889/json/version');
      if (versionInfo && versionInfo.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  const list = await fetchJson('http://127.0.0.1:9889/json/list');
  const target = list.find(t => t.type === 'page');
  const wsUrl = target ? target.webSocketDebuggerUrl : versionInfo.webSocketDebuggerUrl;
  const ws = new globalThis.WebSocket(wsUrl);
  await new Promise(r => ws.addEventListener('open', r, { once: true }));

  let idCounter = 1;
  const pending = new Map();
  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data.toString());
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    }
  });

  const send = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  await send('Page.enable');
  await send('Runtime.enable');

  async function captureShot(url, filename, width, height, scrollY = 0, clickSelector = null) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768
    });
    await send('Page.navigate', { url });
    await sleep(2000);

    if (scrollY > 0) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${scrollY});` });
      await sleep(600);
    }

    if (clickSelector) {
      await send('Runtime.evaluate', {
        expression: `
          const el = document.querySelector('${clickSelector}');
          if (el) el.click();
        `
      });
      await sleep(800);
    }

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
    });
    fs.writeFileSync(path.join(ARTIFACT_DIR, filename), Buffer.from(shot.data, 'base64'));
    console.log(`Captured: ${filename} (${width}x${height})`);
  }

  // 1. Home Hero at 1920
  await captureShot('http://127.0.0.1:5173/', 'hero_sharp_1920.png', 1920, 1080);

  // 2. Home Hero at 1440
  await captureShot('http://127.0.0.1:5173/', 'hero_sharp_1440.png', 1440, 900);

  // 3. Home Hero at 1366
  await captureShot('http://127.0.0.1:5173/', 'hero_sharp_1366.png', 1366, 768);

  // 4. Home Hero at 390
  await captureShot('http://127.0.0.1:5173/', 'hero_sharp_390.png', 390, 844);

  // 5. Operations Gallery (showing Deugro / Jaguar / Transglobal project reference tags)
  await captureShot('http://127.0.0.1:5173/operations', 'evidence_operations_gallery.png', 1440, 950, 950);

  // 6. Operations Lightbox (showing verified consignment reference details)
  await captureShot('http://127.0.0.1:5173/operations', 'evidence_operations_lightbox.png', 1440, 950, 950, '[role="button"]');

  // 7. Request a Quote Portal (Step 1-5 smart flow)
  await captureShot('http://127.0.0.1:5173/request-quote', 'evidence_quote_request_wizard.png', 1440, 950, 350);

  // 8. Contact Page (24x7 Emergency Desk: 8108672929)
  await captureShot('http://127.0.0.1:5173/contact', 'evidence_contact_desk_24x7.png', 1440, 950, 400);

  // 9. Cargo Lashing Authentic Records
  await captureShot('http://127.0.0.1:5173/services/cargo-lashing', 'evidence_cargo_lashing_records.png', 1440, 950, 1400);

  // 10. Warehouse Dual-Facility Showcase
  await captureShot('http://127.0.0.1:5173/warehouse', 'evidence_warehouse_dual_showcase.png', 1440, 950, 300);

  chrome.kill();
  console.log('Finished capturing all evidence screenshots.');
  process.exit(0);
}

run().catch(err => {
  console.error('Error running capture:', err);
  process.exit(1);
});
