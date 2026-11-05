const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const LOCAL_STAFF_URL = 'http://127.0.0.1:5173/company/staff';

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
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      console.error('Eval error:', res.exceptionDetails);
      return null;
    }
    return res.result ? res.result.value : undefined;
  }

  async captureScreenshot(outputPath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved screenshot -> ${outputPath}`);
  }

  async close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  console.log('=== Step 1: Launch Chrome ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const proc = spawn(chromePath, [
    '--remote-debugging-port=9459',
    '--headless=new',
    '--disable-gpu',
    '--window-size=1536,1000',
    '--user-data-dir=C:\\Users\\tanis\\.gemini\\temp\\chrome_staff_verify'
  ]);
  await delay(2500);

  const targets = await fetchJson('http://127.0.0.1:9459/json');
  const pageTarget = targets.find(t => t.type === 'page');
  const cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await cdp.connect();

  try {
    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');

    // 1. Verify at 1536px
    console.log('=== Step 2: Test at 1536px ===');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1536,
      height: 960,
      deviceScaleFactor: 1,
      mobile: false
    });
    await cdp.send('Page.navigate', { url: LOCAL_STAFF_URL });
    await delay(2500);

    const check1536 = await cdp.eval(`
      (() => {
        const hero = document.getElementById('msk-team-hero');
        const img = hero ? hero.querySelector('img') : null;
        const svgDividers = hero ? Array.from(hero.querySelectorAll('svg')).filter(s => s.querySelector('polygon') || s.querySelector('line')) : [];
        return {
          heroExists: !!hero,
          imgSrc: img ? img.src : null,
          imgNaturalWidth: img ? img.naturalWidth : 0,
          imgNaturalHeight: img ? img.naturalHeight : 0,
          svgDividersCount: svgDividers.length
        };
      })()
    `);
    console.log('1536px Hero Check:', JSON.stringify(check1536, null, 2));

    const shot1536 = path.join(ARTIFACT_DIR, 'staff_hero_fix_1536px.png');
    await cdp.captureScreenshot(shot1536);

    // 2. Verify at 1280px
    console.log('=== Step 3: Test at 1280px ===');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await delay(1000);

    const shot1280 = path.join(ARTIFACT_DIR, 'staff_hero_fix_1280px.png');
    await cdp.captureScreenshot(shot1280);

    // 3. Verify at 390px (Mobile)
    console.log('=== Step 4: Test at 390px Mobile ===');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await delay(1000);

    const shot390 = path.join(ARTIFACT_DIR, 'staff_hero_fix_390px.png');
    await cdp.captureScreenshot(shot390);

    console.log('=== ALL SCREENSHOTS CAPTURED SUCCESSFULLY ===');
  } finally {
    await cdp.close();
    proc.kill();
  }
}

run().catch(err => {
  console.error('Fatal error in verify_staff_hero_fix:', err);
  process.exit(1);
});
