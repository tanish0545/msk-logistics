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
    console.log(`[Screenshot Saved] -> ${outputPath} (${(size / 1024).toFixed(1)} KB)`);
  }

  async close() {
    if (this.ws) {
      try { this.ws.close(); } catch {}
    }
  }
}

async function run() {
  console.log('=== Verifying Liquid Glass Service Cards Implementation ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(__dirname, '../.tmp_chrome_verify_liquid_glass');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9491',
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
    for (let i = 0; i < 20; i++) {
      try {
        targets = await fetchJson('http://127.0.0.1:9491/json');
        if (targets && targets.length) break;
      } catch {
        await delay(300);
      }
    }

    if (!targets || !targets.length) {
      throw new Error('Could not connect to Chrome on 9491');
    }

    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');

    // 1. Desktop 1536px
    console.log('\n--- 1. Testing Desktop 1536x1000 ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1536,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await delay(2000);

    const audit = await cdp.eval(`(() => {
      const section = document.getElementById('core-services');
      if (!section) return { error: '#core-services not found' };
      section.scrollIntoView({ behavior: 'instant', block: 'center' });

      const cards = Array.from(section.querySelectorAll('a[href^="/services/"]'));
      return {
        count: cards.length,
        cards: cards.map((card, idx) => {
          const glassPanel = card.querySelector('.liquid-glass');
          const style = glassPanel ? window.getComputedStyle(glassPanel) : null;
          const title = card.querySelector('h3')?.innerText || '';
          const desc = card.querySelector('p')?.innerText || '';
          const btn = card.querySelector('span.bg-\\\\[\\\\#B62825\\\\]');
          const btnStyle = btn ? window.getComputedStyle(btn) : null;
          const img = card.querySelector('img');

          return {
            index: idx + 1,
            title,
            desc: desc.slice(0, 50) + '...',
            button: {
              text: btn ? btn.innerText.replace(/\\s+/g, ' ').trim() : '',
              bg: btnStyle ? btnStyle.backgroundColor : '',
              isSingleLine: btn ? (btn.getBoundingClientRect().height <= 36) : false
            },
            glass: {
              background: style ? style.backgroundColor : 'none',
              backdropFilter: style ? (style.backdropFilter || style.webkitBackdropFilter) : 'none',
              border: style ? style.border : 'none',
              boxShadow: style ? style.boxShadow : 'none'
            },
            image: {
              src: img ? img.getAttribute('src') : '',
              naturalWidth: img ? img.naturalWidth : 0,
              naturalHeight: img ? img.naturalHeight : 0,
              complete: img ? img.complete : false
            }
          };
        })
      };
    })()`);

    console.log('Liquid Glass Card Audit:', JSON.stringify(audit, null, 2));

    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_liquid_glass_cards_desktop.png'));

    // 2. Desktop 1280px
    console.log('\n--- 2. Testing Desktop 1280x900 ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_liquid_glass_cards_1280px.png'));

    // 3. Mobile 390px
    console.log('\n--- 3. Testing Mobile 390x844 ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(600);
    await cdp.eval(`(() => {
      const section = document.getElementById('core-services');
      if (section) section.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_liquid_glass_cards_mobile.png'));

    console.log('\n=== All Liquid Glass Verifications Completed Successfully ===');

  } catch (err) {
    console.error('CDP verification error:', err);
  } finally {
    if (cdp) await cdp.close();
    proc.kill('SIGTERM');
    await delay(800);
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  }
}

run();
