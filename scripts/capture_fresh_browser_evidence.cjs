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

function checkServer(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
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

async function main() {
  console.log('====================================================');
  console.log('VERIFICATION SCRIPT 3: FRESH BROWSER EVIDENCE SUITE');
  console.log('====================================================');

  const isUp = await checkServer(TARGET_HOST + '/');
  if (!isUp) {
    console.error(`ERROR: Vite server is not responding at ${TARGET_HOST}`);
    process.exit(1);
  }
  console.log(`Vite server confirmed responsive at ${TARGET_HOST}`);

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

  // Find page target
  const targets = await fetchJson('http://127.0.0.1:9222/json');
  const pageTarget = targets.find(t => t.type === 'page');
  const targetWs = pageTarget ? pageTarget.webSocketDebuggerUrl : wsUrl;

  console.log('Connecting WebSocket to Chrome DevTools...');
  const ws = new globalThis.WebSocket(targetWs);
  await new Promise(resolve => {
    if (ws.readyState === 1) resolve();
    else ws.addEventListener('open', resolve, { once: true });
  });

  let idCounter = 1;
  const pending = new Map();
  const consoleMessages = [];

  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data.toString());
    if (data.method === 'Runtime.consoleAPICalled') {
      consoleMessages.push(data.params);
    }
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

  const captureTasks = [
    // 1. Home
    { route: '/', name: 'home', title: 'MSK Logistics — Home' },
    // 2. Container Guide
    { route: '/container-guide', name: 'container_guide', title: 'Container Guide' },
    // 3. Warehouse
    { route: '/warehouse', name: 'warehouse', title: 'Warehouse Facilities' },
    // 4. Operations
    { route: '/operations', name: 'operations', title: 'Operations Gallery' },
    // 5. Cargo Lashing
    { route: '/services/cargo-lashing', name: 'cargo_lashing', title: 'Cargo Lashing' },
    // 6. Request Quote
    { route: '/request-quote', name: 'quote_request', title: 'Request a Quote' },
    // 7. Contact
    { route: '/contact', name: 'contact', title: 'Contact Us' }
  ];

  const capturedFiles = [];

  for (const task of captureTasks) {
    console.log(`\nNavigating to: ${task.route} (${task.title})...`);

    // --- A. DESKTOP (1440 x 900) ---
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await send('Page.navigate', { url: `${TARGET_HOST}${task.route}` });

    // Wait until document.body is hydrated
    for (let attempt = 0; attempt < 30; attempt++) {
      const checkRes = await send('Runtime.evaluate', {
        expression: 'document.body ? document.body.innerText.length : 0'
      });
      if (checkRes.result && checkRes.result.value > 200) {
        break;
      }
      await sleep(250);
    }
    await sleep(1500);

    const desktopPng = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });

    const desktopFile = `fresh_desktop_1440_${task.name}.png`;
    const desktopPath = path.join(ARTIFACT_DIR, desktopFile);
    fs.writeFileSync(desktopPath, Buffer.from(desktopPng.data, 'base64'));
    const desktopSize = fs.statSync(desktopPath).size;
    console.log(`  [Desktop 1440px] Saved: ${desktopFile} (${desktopSize} bytes)`);
    capturedFiles.push({ file: desktopFile, size: desktopSize, mode: 'Desktop 1440px' });

    // --- B. MOBILE (390 x 844) ---
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(800);

    const mobilePng = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });

    const mobileFile = `fresh_mobile_390_${task.name}.png`;
    const mobilePath = path.join(ARTIFACT_DIR, mobileFile);
    fs.writeFileSync(mobilePath, Buffer.from(mobilePng.data, 'base64'));
    const mobileSize = fs.statSync(mobilePath).size;
    console.log(`  [Mobile 390px]   Saved: ${mobileFile} (${mobileSize} bytes)`);
    capturedFiles.push({ file: mobileFile, size: mobileSize, mode: 'Mobile 390px' });
  }

  // Clean up
  try {
    ws.close();
    chrome.kill();
  } catch (e) {}

  console.log('\n====================================================');
  console.log(`TOTAL FRESH SCREENSHOTS CAPTURED: ${capturedFiles.length}`);
  capturedFiles.forEach(c => console.log(`  - ${c.file} (${c.size} bytes) [${c.mode}]`));
  console.log('RESULT: SUCCESS! All fresh browser evidence captures saved.');
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});

