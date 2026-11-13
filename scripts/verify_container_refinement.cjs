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

async function auditCards(cdp, viewportLabel) {
  return await cdp.eval(`(() => {
    const section = document.getElementById('core-services');
    if (!section) return { error: '#core-services not found' };
    section.scrollIntoView({ behavior: 'instant', block: 'center' });

    const cardLinks = Array.from(section.querySelectorAll('a[href^="/services/"]'));
    return {
      viewport: '${viewportLabel}',
      count: cardLinks.length,
      cards: cardLinks.map((card, idx) => {
        const rect = card.getBoundingClientRect();
        const innerCard = card.querySelector('.aspect-\\\\[10\\\\/16\\\\]') || card.firstElementChild;
        const innerRect = innerCard ? innerCard.getBoundingClientRect() : rect;
        const titleEl = card.querySelector('h3');
        const descEl = card.querySelector('p');
        const btnEl = card.querySelector('span.bg-\\\\[\\\\#B62825\\\\]') || card.querySelector('span:has(svg)');
        const img = card.querySelector('img');

        const width = Math.round(innerRect.width);
        const height = Math.round(innerRect.height);
        const aspectRatio = height > 0 ? (width / height).toFixed(3) : 0;

        // Button wrapping check: is clientHeight approximately single line (28-36px)?
        const btnHeight = btnEl ? Math.round(btnEl.getBoundingClientRect().height) : 0;
        const btnText = btnEl ? btnEl.innerText.trim().replace(/\\s+/g, ' ') : '';
        const isSingleLine = btnHeight > 0 && btnHeight <= 38;

        return {
          index: idx + 1,
          title: titleEl ? titleEl.innerText : '',
          href: card.getAttribute('href'),
          width,
          height,
          aspectRatio,
          buttonText: btnText,
          buttonHeight: btnHeight,
          buttonIsSingleLine: isSingleLine,
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
}

async function run() {
  console.log('=== Verifying Refined Container Cards UI Across Viewports ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(__dirname, '../.tmp_chrome_verify_refinement');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9497',
    `--user-data-dir=${tmpDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--window-size=1920,1080'
  ]);

  let cdp;
  try {
    let targets;
    for (let i = 0; i < 15; i++) {
      try {
        targets = await fetchJson('http://127.0.0.1:9497/json');
        if (targets && targets.length) break;
      } catch {
        await delay(400);
      }
    }

    if (!targets || !targets.length) {
      throw new Error('Could not connect to Chrome on 9497');
    }

    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');

    // 1. Desktop 1920px (Full HD)
    console.log('\n--- 1. Testing Desktop 1920x1080 ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await delay(2500);

    const audit1920 = await auditCards(cdp, '1920px');
    console.log('1920px Card Audit:', JSON.stringify(audit1920, null, 2));
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_refined_container_cards_1920px.png'));

    // 2. Desktop 1536px (High-Res Laptop)
    console.log('\n--- 2. Testing Desktop 1536x1000 ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1536,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(800);
    const audit1536 = await auditCards(cdp, '1536px');
    console.log('1536px Card Audit:', JSON.stringify(audit1536, null, 2));
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_refined_container_cards_1536px.png'));

    // 3. Desktop 1280px (Standard Desktop)
    console.log('\n--- 3. Testing Desktop 1280x900 ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(800);
    const audit1280 = await auditCards(cdp, '1280px');
    console.log('1280px Card Audit:', JSON.stringify(audit1280, null, 2));
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_refined_container_cards_1280px.png'));

    // 4. Mobile 390px (iPhone 14/15)
    console.log('\n--- 4. Testing Mobile 390x844 ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(800);
    const audit390 = await auditCards(cdp, '390px');
    console.log('390px Mobile Card Audit:', JSON.stringify(audit390, null, 2));
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_refined_container_cards_mobile_390px.png'));

    console.log('\n=== All Multi-Viewport Audits Completed Successfully ===');

  } catch (err) {
    console.error('CDP verification error:', err);
  } finally {
    if (cdp) await cdp.close();
    proc.kill('SIGTERM');
    await delay(1000);
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  }
}

run();
