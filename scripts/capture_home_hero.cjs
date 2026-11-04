const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const PORT = 9226;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getJson(url) {
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

class CdpConnection {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    const WS = global.WebSocket;
    this.ws = new WS(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    const msgId = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(msgId, { resolve, reject });
      this.ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  console.log('Starting Chrome for Hero capture...');
  const userDataDir = path.join(process.env.TEMP || 'C:\\Temp', 'chrome_hero_' + Date.now());
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${userDataDir}`,
    '--window-size=1440,900',
    '--hide-scrollbars',
    '--disable-gpu',
    'about:blank'
  ]);

  await sleep(1500);

  try {
    const targets = await getJson(`http://127.0.0.1:${PORT}/json/list`);
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    const cdp = new CdpConnection(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');

    async function captureView(width, height, isMobile, filename) {
      console.log(`Setting viewport: ${width}x${height} (mobile=${isMobile})...`);
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: isMobile
      });

      console.log('Navigating to http://127.0.0.1:5173/ ...');
      await cdp.send('Page.navigate', { url: 'http://127.0.0.1:5173/' });
      await sleep(2000);

      // Wait for hero image to exist and complete
      await cdp.send('Runtime.evaluate', {
        expression: `
          new Promise((resolve) => {
            const check = () => {
              const img = document.querySelector('img[alt="MSK Logistics International Port Operations"]');
              if (img && img.complete && img.naturalWidth > 0) resolve();
              else setTimeout(check, 100);
            };
            check();
          });
        `,
        awaitPromise: true
      });
      await sleep(1500);

      const res = await cdp.send('Page.captureScreenshot', { format: 'png' });
      const buffer = Buffer.from(res.data, 'base64');
      const outPath = path.join(ARTIFACT_DIR, filename);
      fs.writeFileSync(outPath, buffer);
      console.log(`Saved screenshot: ${filename} (${buffer.length} bytes)`);
    }

    // 1. Desktop 1440x900
    await captureView(1440, 900, false, 'verified_cinematic_hero_1440.png');
    await sleep(500);

    // 2. Desktop 1920x1080
    await captureView(1920, 1080, false, 'verified_cinematic_hero_1920.png');

    // 3. Mobile 390x844
    await captureView(390, 844, true, 'verified_cinematic_hero_mobile_390.png');

    cdp.close();
    console.log('Hero captures completed successfully!');
  } catch (e) {
    console.error('Error during capture:', e);
  } finally {
    chromeProcess.kill();
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

run();
