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
    '--remote-debugging-port=9666',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    'http://127.0.0.1:5173/'
  ]);

  let versionInfo = null;
  for (let i = 0; i < 20; i++) {
    await sleep(400);
    try {
      versionInfo = await fetchJson('http://127.0.0.1:9666/json/version');
      if (versionInfo && versionInfo.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  const list = await fetchJson('http://127.0.0.1:9666/json/list');
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

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  async function capturePage(url, filename, actionFn) {
    console.log(`Navigating to ${url}...`);
    await send('Page.navigate', { url });
    await sleep(2500);
    if (actionFn) {
      await actionFn();
      await sleep(1000);
    }
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 1440, height: 900, scale: 1 }
    });
    fs.writeFileSync(path.join(ARTIFACT_DIR, filename), Buffer.from(shot.data, 'base64'));
    console.log(`Saved ${filename}`);
  }

  // 1. Home page
  await capturePage('http://127.0.0.1:5173/', 'audit_home_page.png');

  // 2. Services directory
  await capturePage('http://127.0.0.1:5173/services', 'audit_services_directory.png');

  // 3. Every service page
  await capturePage('http://127.0.0.1:5173/services/ocean-cargo', 'audit_service_ocean_cargo.png');
  await capturePage('http://127.0.0.1:5173/services/air-cargo', 'audit_service_air_cargo.png');
  await capturePage('http://127.0.0.1:5173/services/container-stuffing', 'audit_service_container_stuffing.png');
  await capturePage('http://127.0.0.1:5173/services/special-project', 'audit_service_special_project.png');
  await capturePage('http://127.0.0.1:5173/services/cargo-lashing', 'audit_service_cargo_lashing.png');

  // 4. Warehouse Open Yard
  await capturePage('http://127.0.0.1:5173/warehouse#open-yard', 'audit_warehouse_open_yard.png', async () => {
    await send('Runtime.evaluate', {
      expression: 'const el = document.getElementById("open-yard"); if (el) el.scrollIntoView({ behavior: "instant" });'
    });
  });

  // 5. Warehouse Shaded Warehouse
  await capturePage('http://127.0.0.1:5173/warehouse#shaded-warehouse', 'audit_warehouse_shaded.png', async () => {
    await send('Runtime.evaluate', {
      expression: 'const el = document.getElementById("shaded-warehouse"); if (el) el.scrollIntoView({ behavior: "instant" });'
    });
  });

  // 6. Warehouse Dual Showcase
  await capturePage('http://127.0.0.1:5173/warehouse', 'audit_warehouse_dual_showcase.png');

  // 7. Container Guide
  await capturePage('http://127.0.0.1:5173/container-guide', 'audit_container_guide.png');

  // 8. Operations gallery
  await capturePage('http://127.0.0.1:5173/operations', 'audit_operations_gallery.png');

  // 9. About History & Philosophy
  await capturePage('http://127.0.0.1:5173/about', 'audit_about_history.png', async () => {
    await send('Runtime.evaluate', {
      expression: 'window.scrollTo(0, 520);'
    });
  });

  // 10. Contact page
  await capturePage('http://127.0.0.1:5173/contact', 'audit_contact_page.png');

  // 11. Quote Request flow
  await capturePage('http://127.0.0.1:5173/request-quote', 'audit_quote_request_flow.png');

  // 12. MSK ORBIT open
  await capturePage('http://127.0.0.1:5173/', 'audit_msk_orbit.png', async () => {
    await send('Runtime.evaluate', {
      expression: 'const btn = document.querySelector("button[aria-label*=\'ORBIT\']"); if (btn) btn.click();'
    });
  });

  ws.close();
  chrome.kill();
  console.log('ALL AUDIT SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

run().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});

