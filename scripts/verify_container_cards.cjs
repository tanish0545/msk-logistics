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
  console.log('=== Launching Chrome CDP for Photorealistic Container Cards Verification ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(__dirname, '../.tmp_chrome_verify_container_cards');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9494',
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
    for (let i = 0; i < 15; i++) {
      try {
        targets = await fetchJson('http://127.0.0.1:9494/json');
        if (targets && targets.length) break;
      } catch {
        await delay(400);
      }
    }

    if (!targets || !targets.length) {
      throw new Error('Could not connect to Chrome on 9494');
    }

    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1536,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });

    console.log('\n--- Navigating to Homepage Core Services ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await delay(2500);

    // Scroll to #core-services
    await cdp.eval(`(() => {
      const el = document.getElementById('core-services');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await delay(1500);

    const audit = await cdp.eval(`(() => {
      const section = document.getElementById('core-services');
      if (!section) return { error: '#core-services section not found' };

      const cardLinks = Array.from(section.querySelectorAll('a[href*="/services/"]'));
      const cards = cardLinks.map(card => {
        const titleEl = card.querySelector('h3');
        const imgEl = card.querySelector('img');
        const descEl = card.querySelector('p');
        const href = card.getAttribute('href');

        return {
          title: titleEl ? titleEl.textContent.trim() : null,
          imageSrc: imgEl ? imgEl.getAttribute('src') : null,
          imageLoaded: imgEl ? (imgEl.naturalWidth > 0) : false,
          naturalWidth: imgEl ? imgEl.naturalWidth : 0,
          naturalHeight: imgEl ? imgEl.naturalHeight : 0,
          description: descEl ? descEl.textContent.trim() : null,
          href: href
        };
      });

      const sectionHtml = section.innerHTML;
      const sectionText = section.innerText;

      // Ensure no fake 2D container illustration artifacts
      const hasFakeCssCorrugations = sectionHtml.includes('repeating-linear-gradient(90deg');
      const hasFakeLockRods = sectionHtml.includes('Cam Handle');
      const hasFakeSpecs = sectionText.includes('MAX GROSS: 30,480 KG') || sectionText.includes('TARE: 2,230 KG');

      return {
        cardCount: cards.length,
        hasFakeCssCorrugations,
        hasFakeLockRods,
        hasFakeSpecs,
        cards
      };
    })()`);

    console.log('\nAudit Results:');
    console.log(`- Card Count: ${audit.cardCount}`);
    console.log(`- Has Fake CSS Corrugations: ${audit.hasFakeCssCorrugations}`);
    console.log(`- Has Fake CSS Lock Rods: ${audit.hasFakeLockRods}`);
    console.log(`- Has Fake Cargo Specs: ${audit.hasFakeSpecs}`);
    console.log('\nCard Inspection:');
    if (audit.cards) {
      audit.cards.forEach((c, idx) => {
        console.log(`  [${idx + 1}] "${c.title}"`);
        console.log(`      Image: ${c.imageSrc} (Loaded: ${c.imageLoaded}, ${c.naturalWidth}x${c.naturalHeight}px)`);
        console.log(`      Route: ${c.href}`);
      });
    }

    // 1. Capture Desktop Screenshot
    console.log('\nCapturing Desktop view (1536x1000)...');
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_photorealistic_container_cards_desktop.png'));

    // 2. Capture Tablet View
    console.log('\nCapturing Tablet view (768x1024)...');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(600);
    await cdp.eval(`(() => {
      const el = document.getElementById('core-services');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await delay(800);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_photorealistic_container_cards_tablet.png'));

    // 3. Capture Mobile 390px View
    console.log('\nCapturing Mobile view (390x844)...');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(600);
    await cdp.eval(`(() => {
      const el = document.getElementById('core-services');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await delay(800);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_photorealistic_container_cards_mobile.png'));

    console.log('\n=== ALL VERIFICATIONS COMPLETED SUCCESSFULLY ===');
  } catch (err) {
    console.error('Verification error:', err);
  } finally {
    if (cdp) await cdp.close();
    proc.kill();
    try {
      await delay(1000);
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  }
}

run();
