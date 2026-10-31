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
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    'http://127.0.0.1:4173/'
  ], { detached: false });

  let versionInfo = null;
  for (let i = 0; i < 20; i++) {
    await sleep(500);
    try {
      versionInfo = await fetchJson('http://127.0.0.1:9222/json/version');
      if (versionInfo && versionInfo.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  const targets = await fetchJson('http://127.0.0.1:9222/json');
  const pageTarget = targets.find(t => t.type === 'page');
  const wsUrl = pageTarget ? pageTarget.webSocketDebuggerUrl : versionInfo.webSocketDebuggerUrl;

  const ws = new globalThis.WebSocket(wsUrl);
  await new Promise((resolve) => {
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
  await send('DOM.enable');

  await send('Page.navigate', { url: 'http://127.0.0.1:4173/' });
  await sleep(2500);

  // 1. Desktop 1440px
  console.log('Capturing Desktop 1440px...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await sleep(1000);
  const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'circular_mark_desktop_1440.png'), Buffer.from(desktopShot.data, 'base64'));

  // 2. High-res close up of the circular certification mark
  console.log('Capturing Close-up on Circular Mark...');
  const closeUpShot = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 1280, y: 550, width: 155, height: 160, scale: 2 }
  });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'circular_mark_close_up.png'), Buffer.from(closeUpShot.data, 'base64'));

  // 3. Tablet 768px
  console.log('Capturing Tablet 768px...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: false
  });
  await sleep(1000);
  const tabletShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'circular_mark_tablet_768.png'), Buffer.from(tabletShot.data, 'base64'));

  // 4. Mobile 390px
  console.log('Capturing Mobile 390px...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sleep(1000);
  const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'circular_mark_mobile_390.png'), Buffer.from(mobileShot.data, 'base64'));

  ws.close();
  chrome.kill();
  console.log('Done captures!');
}

main().catch(console.error);
