const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ARTIFACT_DIR = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const TARGET_HOST = 'http://127.0.0.1:5173';

const BROWSERS = {
  chrome: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  edge: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  brave: 'C:\\Users\\tanis\\AppData\\Local\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'
};

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

async function captureBrowser(browserName, browserExe, port, viewport, outputFilename) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), `browser-${browserName}-`));
  console.log(`Starting ${browserName} on port ${port}...`);

  const proc = spawn(browserExe, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${tmpDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 40; i++) {
    await sleep(300);
    try {
      const version = await fetchJson(`http://127.0.0.1:${port}/json/version`);
      if (version && version.webSocketDebuggerUrl) {
        wsUrl = version.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!wsUrl) {
    console.error(`Failed to connect to ${browserName} on port ${port}`);
    proc.kill();
    return false;
  }

  try {
    const targets = await fetchJson(`http://127.0.0.1:${port}/json`);
    const pageTarget = targets.find(t => t.type === 'page');
    const targetWs = pageTarget ? pageTarget.webSocketDebuggerUrl : wsUrl;

    const ws = new globalThis.WebSocket(targetWs);
    await new Promise(resolve => {
      if (ws.readyState === 1) resolve();
      else ws.addEventListener('open', resolve, { once: true });
    });

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const handler = (evt) => {
          const msg = JSON.parse(evt.data);
          if (msg.id === id) {
            ws.removeEventListener('message', handler);
            if (msg.error) reject(msg.error);
            else resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('DOM.enable');
    await send('Runtime.enable');

    await send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.width < 600,
    });

    await send('Page.navigate', { url: TARGET_HOST + '/' });
    await sleep(2500);

    const { data } = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });

    const outPath = path.join(ARTIFACT_DIR, outputFilename);
    fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
    console.log(`Saved ${outputFilename} (${fs.statSync(outPath).size} bytes)`);

    ws.close();
    return true;
  } finally {
    proc.kill();
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

async function main() {
  console.log('Testing Edge and Brave at 1536x864 with current code...');
  await captureBrowser('edge', BROWSERS.edge, 9225, { width: 1536, height: 864 }, 'current_hero_edge_1536.png');
  await captureBrowser('brave', BROWSERS.brave, 9226, { width: 1536, height: 864 }, 'current_hero_brave_1536.png');
  console.log('Done test.');
}

main().catch(console.error);
