const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const PORT = 9222;

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
    const WebSocket = require('stream'); // fallback check
    // In Node 20+, we can use global WebSocket!
    if (typeof WebSocket === 'undefined' && typeof global.WebSocket === 'undefined') {
      throw new Error('No WebSocket');
    }
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
  console.log('Starting headless Chrome...');
  const userDataDir = path.join(process.env.TEMP || 'C:\\Temp', 'chrome_cdp_profile_' + Date.now());
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
    const versionInfo = await getJson(`http://127.0.0.1:${PORT}/json/version`);
    console.log('Connected to Chrome:', versionInfo['Browser']);

    const targets = await getJson(`http://127.0.0.1:${PORT}/json/list`);
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    const wsUrl = pageTarget.webSocketDebuggerUrl;

    const cdp = new CdpConnection(wsUrl);
    await cdp.connect();
    console.log('CDP WebSocket connected!');

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    // Capture Helper
    async function captureScreenshot(url, filename, actions = async () => {}) {
      console.log(`Navigating to ${url}...`);
      await cdp.send('Page.navigate', { url });
      await sleep(2500);

      await actions();
      await sleep(500);

      const res = await cdp.send('Page.captureScreenshot', { format: 'png' });
      const buffer = Buffer.from(res.data, 'base64');
      const outPath = path.join(ARTIFACT_DIR, filename);
      fs.writeFileSync(outPath, buffer);
      console.log(`Saved screenshot: ${filename} (${buffer.length} bytes)`);
    }

    // 1. Concept 01: Hero Section
    await captureScreenshot('http://127.0.0.1:5173/', 'concept01_hero_verified.png', async () => {
      // Ensure images are fully loaded
      await cdp.send('Runtime.evaluate', {
        expression: `
          new Promise((resolve) => {
            const img = document.querySelector('img[alt="MSK Logistics International Port Operations"]');
            if (!img || img.complete) resolve();
            else { img.onload = resolve; img.onerror = resolve; }
          });
        `,
        awaitPromise: true
      });
      await sleep(1500);
    });

    // 2. Concept 02: Core Services (Shipping Container Cards)
    await captureScreenshot('http://127.0.0.1:5173/', 'concept02_services_container_doors_verified.png', async () => {
      await cdp.send('Runtime.evaluate', {
        expression: `document.getElementById('core-services')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
      });
      await sleep(800);
    });

    // 3. Concept 03: Industrial Stickers & Badges
    await captureScreenshot('http://127.0.0.1:5173/', 'concept03_industrial_stickers_verified.png', async () => {
      await cdp.send('Runtime.evaluate', {
        expression: `
          const el = document.querySelector('section.bg-\\\\[\\\\#B62825\\\\]');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
        `
      });
      await sleep(800);
    });

    // 4. Concept 05: Container Guide with Technical UI
    await captureScreenshot('http://127.0.0.1:5173/container-guide', 'concept05_container_guide_technical_ui_verified.png', async () => {
      await cdp.send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: 350, behavior: 'instant' });`
      });
      await sleep(800);
    });

    // 5. Concept 06: Warehouse Dual-Facility Showcase
    await captureScreenshot('http://127.0.0.1:5173/warehouse', 'concept06_warehouse_facilities_verified.png', async () => {
      await cdp.send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: 400, behavior: 'instant' });`
      });
      await sleep(800);
    });

    // 6. Concept 07: Smart Request a Quote Flow
    await captureScreenshot('http://127.0.0.1:5173/request-quote', 'concept07_quote_flow_5step_verified.png', async () => {
      await cdp.send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: 200, behavior: 'instant' });`
      });
      await sleep(800);
    });

    // 7. Concept 09: MSK ORBIT AI Chatbot Launcher & Opened Panel
    // First, launcher in bottom right
    await captureScreenshot('http://127.0.0.1:5173/', 'concept09_orbit_launcher_circular_verified.png', async () => {
      await cdp.send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: 0, behavior: 'instant' });`
      });
      await sleep(500);
    });

    // Now click the Orbit Launcher to open panel with 2x2 quick actions
    await captureScreenshot('http://127.0.0.1:5173/', 'concept09_orbit_chat_open_panel_verified.png', async () => {
      await cdp.send('Runtime.evaluate', {
        expression: `
          const btn = document.querySelector('button[aria-label*="MSK ORBIT"]');
          if (btn) btn.click();
        `
      });
      await sleep(1000);
    });

    // 8. Concept 10: Operations Gallery with Filters
    await captureScreenshot('http://127.0.0.1:5173/operations', 'concept10_operations_gallery_filters_verified.png', async () => {
      await cdp.send('Runtime.evaluate', {
        expression: `
          const el = document.getElementById('operations-gallery');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        `
      });
      await sleep(800);
    });

    cdp.close();
    console.log('All 8 concepts successfully captured!');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chromeProcess.kill();
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

run();
