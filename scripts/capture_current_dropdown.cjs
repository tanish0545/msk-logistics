const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const BASE_URL = 'http://127.0.0.1:5173';

function delay(ms) {
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

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new globalThis.WebSocket(this.wsUrl);
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject);
      this.ws.addEventListener('message', (event) => {
        const msg = JSON.parse(event.data.toString());
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result);
        }
      });
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.id;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }

  async screenshot(outPath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outPath, Buffer.from(res.data, 'base64'));
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--remote-debugging-port=9346',
    '--headless=new',
    '--window-size=1440,900',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\tanis\\.gemini\\temp\\chrome-profile-dropdown-cap'
  ]);

  await delay(2500);

  const targets = await fetchJson('http://127.0.0.1:9346/json');
  const pageTarget = targets.find(t => t.type === 'page');
  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);

  try {
    await client.connect();
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('Navigating to homepage...');
    await client.send('Page.navigate', { url: BASE_URL + '/' });
    await delay(3000);

    // Click on the Services navbar button or hover
    console.log('Opening Services dropdown...');
    const opened = await client.eval(`(() => {
      // Find Services link or button
      const navButtons = Array.from(document.querySelectorAll('nav button, nav a'));
      const servicesBtn = navButtons.find(b => b.innerText.trim().startsWith('Services'));
      if (servicesBtn) {
        servicesBtn.click();
        return true;
      }
      return false;
    })()`);
    console.log('Clicked Services button:', opened);
    await delay(1000);

    const shotPath = path.join(ARTIFACT_DIR, 'current_services_dropdown_before_v2.png');
    await client.screenshot(shotPath);
    console.log('Screenshot saved to:', shotPath);

  } finally {
    client.close();
    chromeProc.kill();
  }
}

run().catch(console.error);
