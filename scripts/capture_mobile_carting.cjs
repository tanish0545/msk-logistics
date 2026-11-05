const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const BASE_URL = 'http://127.0.0.1:5173';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = ''; res.on('data', c => data += c); res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) { this.wsUrl = wsUrl; this.ws = null; this.id = 1; this.callbacks = new Map(); }
  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new globalThis.WebSocket(this.wsUrl);
      this.ws.addEventListener('open', resolve);
      this.ws.addEventListener('error', reject);
      this.ws.addEventListener('message', (ev) => {
        const msg = JSON.parse(ev.data.toString());
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(new Error(msg.error.message)); else resolve(msg.result);
        }
      });
    });
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.id; this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expr) {
    const r = await this.send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result?.value;
  }
  async screenshot(p) {
    const r = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(p, Buffer.from(r.data, 'base64'));
  }
  close() { if (this.ws) this.ws.close(); }
}

async function run() {
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--remote-debugging-port=9356', '--headless=new', '--window-size=390,844', '--disable-gpu',
    '--user-data-dir=C:\\Users\\tanis\\.gemini\\temp\\chrome-profile-mobile-cart-2'
  ]);
  await delay(2500);
  const targets = await fetchJson('http://127.0.0.1:9356/json');
  const client = new CDPClient(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  try {
    await client.connect();
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Page.navigate', { url: BASE_URL });
    await delay(2500);

    // 1. Click mobile hamburger toggle
    await client.eval(`(() => {
      const btn = document.querySelector('button[aria-label*="navigation menu"]');
      if (btn) btn.click();
    })()`);
    await delay(1000);

    // 2. Click Expand Services list
    await client.eval(`(() => {
      const btn = document.querySelector('button[aria-label*="Expand Services"]');
      if (btn) btn.click();
    })()`);
    await delay(1000);

    // 3. Scroll to Carting in mobile drawer
    await client.eval(`(() => {
      const carting = document.querySelector('[aria-label*="Carting"]');
      if (carting) carting.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await delay(800);

    await client.screenshot(path.join(ARTIFACT_DIR, 'carting_restored_dropdown_mobile.png'));
    console.log('Successfully captured mobile screenshot!');
  } finally {
    client.close();
    chromeProc.kill();
  }
}
run().catch(console.error);
