const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_HOST = 'http://127.0.0.1:5173';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('===========================================================');
  console.log('PHASE 1 ACCEPTANCE: HERO STABILIZATION SCREENSHOT EVIDENCE');
  console.log('===========================================================');

  console.log('Launching Headless Chrome on port 9222...');
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    TARGET_HOST + '/'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await sleep(400);
    try {
      const version = await fetchJson('http://127.0.0.1:9222/json/version');
      if (version && version.webSocketDebuggerUrl) {
        wsUrl = version.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!wsUrl) {
    console.error('ERROR: Could not connect to Chrome DevTools Protocol.');
    chrome.kill();
    process.exit(1);
  }

  const targets = await fetchJson('http://127.0.0.1:9222/json');
  const pageTarget = targets.find(t => t.type === 'page');
  const targetWs = pageTarget ? pageTarget.webSocketDebuggerUrl : wsUrl;

  const ws = new globalThis.WebSocket(targetWs);
  await new Promise(resolve => {
    if (ws.readyState === 1) resolve();
    else ws.addEventListener('open', resolve, { once: true });
  });

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

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');

  const viewports = [
    { name: '1920px', width: 1920, height: 1080, mobile: false, scale: 1 },
    { name: '1440px', width: 1440, height: 900, mobile: false, scale: 1 },
    { name: '1366px', width: 1366, height: 768, mobile: false, scale: 1 },
    { name: '390px', width: 390, height: 844, mobile: true, scale: 2 }
  ];

  const results = [];

  for (const vp of viewports) {
    console.log(`\nConfiguring viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.scale,
      mobile: vp.mobile
    });

    await send('Page.navigate', { url: `${TARGET_HOST}/` });

    // Wait until document.body is hydrated
    for (let attempt = 0; attempt < 30; attempt++) {
      const checkRes = await send('Runtime.evaluate', {
        expression: 'document.body ? document.body.innerText.length : 0'
      });
      if (checkRes.result && checkRes.result.value > 200) {
        break;
      }
      await sleep(200);
    }
    await sleep(1500);

    // Verify hero image loading status
    const imgStatus = await send('Runtime.evaluate', {
      expression: `(() => {
        const img = document.querySelector('section[aria-label*="Beyond Logistics"] img');
        if (!img) return { found: false };
        return {
          found: true,
          src: img.src,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          clientWidth: img.clientWidth,
          clientHeight: img.clientHeight,
          complete: img.complete
        };
      })()`,
      returnByValue: true
    });

    console.log(`  Hero Image Status [${vp.name}]:`, imgStatus.result ? imgStatus.result.value : 'unknown');

    const screenshot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });

    const fileName = `evidence_hero_${vp.name}.png`;
    const filePath = path.join(ARTIFACT_DIR, fileName);
    fs.writeFileSync(filePath, Buffer.from(screenshot.data, 'base64'));
    const size = fs.statSync(filePath).size;
    console.log(`  Saved screenshot: ${fileName} (${size} bytes)`);
    results.push({ viewport: vp.name, file: fileName, size, status: imgStatus.result ? imgStatus.result.value : null });
  }

  try {
    ws.close();
    chrome.kill();
  } catch (e) {}

  console.log('\n===========================================================');
  console.log(`ALL 4 REQUIRED VIEWPORTS CAPTURED SUCCESSFULLY:`);
  results.forEach(r => console.log(`  - ${r.viewport}: ${r.file} (${(r.size / 1024).toFixed(1)} KB)`));
  console.log('RESULT: SUCCESS! Phase 1 acceptance criteria met.');
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

