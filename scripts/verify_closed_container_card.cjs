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
  console.log('=== Verifying Closed Shipping Container Card for Service 03 ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(__dirname, '../.tmp_chrome_verify_closed_card');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9496',
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
        targets = await fetchJson('http://127.0.0.1:9496/json');
        if (targets && targets.length) break;
      } catch {
        await delay(400);
      }
    }

    if (!targets || !targets.length) {
      throw new Error('Could not connect to Chrome on 9496');
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

    console.log('\n--- 1. Inspecting Core Services Container Cards on Homepage ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await delay(2500);

    const cardAudit = await cdp.eval(`(() => {
      const section = document.getElementById('core-services');
      if (!section) return { error: '#core-services not found' };
      section.scrollIntoView({ behavior: 'instant', block: 'center' });

      const cardLinks = Array.from(section.querySelectorAll('a[href^="/services/"]'));
      return {
        count: cardLinks.length,
        cards: cardLinks.map((card, idx) => {
          const title = card.querySelector('h3')?.innerText || '';
          const imgs = Array.from(card.querySelectorAll('img')).map(img => ({
            src: img.getAttribute('src'),
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            complete: img.complete
          }));
          const rect = card.getBoundingClientRect();
          return {
            index: idx + 1,
            title,
            href: card.getAttribute('href'),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            images: imgs
          };
        })
      };
    })()`);

    console.log('Core Services Card Audit:', JSON.stringify(cardAudit, null, 2));

    await delay(600);
    const desktopScreenshotPath = path.join(ARTIFACT_DIR, 'verified_closed_container_stuffing_card_desktop.png');
    await cdp.captureScreenshot(desktopScreenshotPath);

    console.log('\n--- 2. Inspecting Mobile Viewport (390x844) ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(500);

    await cdp.eval(`(() => {
      const section = document.getElementById('core-services');
      if (section) section.scrollIntoView({ behavior: 'instant', block: 'center' });
      // Scroll horizontally to Card 3
      const scrollBox = section.querySelector('.overflow-x-auto');
      if (scrollBox) {
        scrollBox.scrollLeft = 550; // Scroll to Card 3
      }
    })()`);
    await delay(600);

    const mobileScreenshotPath = path.join(ARTIFACT_DIR, 'verified_closed_container_stuffing_card_mobile.png');
    await cdp.captureScreenshot(mobileScreenshotPath);

    console.log('\n--- 3. Checking /services Page ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1536,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send('Page.navigate', { url: `${BASE_URL}/services` });
    await delay(2500);

    const servicesPageAudit = await cdp.eval(`(() => {
      const title = document.title;
      const heading = document.querySelector('h1')?.innerText;
      return { title, heading };
    })()`);
    console.log('Services Page Loaded:', servicesPageAudit);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_services_page_overview.png'));

    console.log('\n=== Verification Completed Successfully ===');

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
