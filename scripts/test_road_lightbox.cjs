const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

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
      awaitPromise: true,
    });
    if (res && res.exceptionDetails) {
      console.error('Eval error:', res.exceptionDetails);
      return null;
    }
    return res && res.result ? res.result.value : undefined;
  }

  async captureScreenshot(outputPath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    fs.writeFileSync(outputPath, buffer);
    const size = fs.statSync(outputPath).size;
    console.log(`[Screenshot Saved] -> ${path.basename(outputPath)} (${(size / 1024).toFixed(1)} KB)`);
  }

  async close() {
    if (this.ws) {
      try { this.ws.close(); } catch { }
    }
  }
}

async function run() {
  console.log('=== Verifying Road Transport Lightbox (BUG 15) ===\n');

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), `msk_road_test_${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9497',
    `--user-data-dir=${tmpDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--window-size=1536,1000'
  ]);

  let cdp;
  try {
    let targets;
    for (let i = 0; i < 25; i++) {
      try {
        targets = await fetchJson('http://127.0.0.1:9497/json');
        if (targets && targets.length) break;
      } catch {
        await delay(300);
      }
    }

    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');

    await cdp.send('Page.navigate', { url: `${BASE_URL}/road-transport` });
    await delay(2000);

    const cardsCount = await cdp.eval(`(() => {
      const cards = document.querySelectorAll('.group.cursor-pointer');
      return cards.length;
    })()`);
    console.log('Fleet cards found on /road-transport:', cardsCount);

    // Scroll first card into view and trigger click
    const clicked = await cdp.eval(`(() => {
      const card = document.querySelector('.group.cursor-pointer');
      if (card) {
        card.scrollIntoView({ behavior: 'instant', block: 'center' });
        card.click();
        return true;
      }
      return false;
    })()`);
    console.log('Card clicked:', clicked);
    await delay(1000);

    const modalState = await cdp.eval(`(() => {
      const modal = document.querySelector('[role="dialog"]');
      const newTabBtn = modal?.querySelector('a[target="_blank"]');
      const img = modal?.querySelector('img');
      const closeBtn = modal?.querySelector('button[aria-label="Close image viewer"]');
      return {
        modalFound: !!modal,
        modalRole: modal?.getAttribute('role'),
        modalAriaLabel: modal?.getAttribute('aria-label'),
        modalClasses: modal?.className,
        newTabBtnFound: !!newTabBtn,
        newTabHref: newTabBtn?.getAttribute('href'),
        newTabTarget: newTabBtn?.getAttribute('target'),
        imgSrc: img?.getAttribute('src'),
        closeBtnFound: !!closeBtn
      };
    })()`);
    console.log('\nLightbox State:', modalState);

    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_road_transport_lightbox_modal.png'));

  } catch (err) {
    console.error('Error during lightbox verification:', err);
  } finally {
    if (cdp) await cdp.close();
    proc.kill();
  }
}

run();
