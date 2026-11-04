const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_HOST = 'http://127.0.0.1:5173';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function checkServer(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false));
  });
}

function fetchJson(url) {
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

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 0;
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
          if (msg.error) {
            reject(new Error(msg.error.message));
          } else {
            resolve(msg.result);
          }
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

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

async function captureEvidence(cdp, options) {
  const { url, width, height, scrollSelector, outputPath, delayMs = 1500 } = options;

  console.log(`\nNavigating to: ${url} (${width}x${height})...`);
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 600,
    screenWidth: width,
    screenHeight: height,
  });

  await cdp.send('Page.navigate', { url });
  await sleep(delayMs);

  // Poll for React hydration
  for (let i = 0; i < 20; i++) {
    const evalRes = await cdp.send('Runtime.evaluate', {
      expression: 'document.body ? document.body.innerText.length : 0',
      returnByValue: true
    });
    const len = evalRes.result && evalRes.result.value ? evalRes.result.value : 0;
    if (len > 300) break;
    await sleep(250);
  }

  // Scroll if selector specified
  if (scrollSelector) {
    console.log(`Scrolling element into view: ${scrollSelector}`);
    await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.querySelector('${scrollSelector}');
          if (el) {
            el.scrollIntoView({ behavior: 'instant', block: 'center' });
            return true;
          }
          return false;
        })()
      `,
      returnByValue: true
    });
    await sleep(600);
  }

  const screenshot = await cdp.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  });

  const buffer = Buffer.from(screenshot.data, 'base64');
  fs.writeFileSync(outputPath, buffer);
  const sizeKb = (buffer.length / 1024).toFixed(1);
  console.log(`-> Saved evidence screenshot: ${path.basename(outputPath)} (${sizeKb} KB, ${width}x${height})`);
}

async function main() {
  console.log('====================================================');
  console.log('MSK LOGISTICS: CLIENT COMPLETION EVIDENCE CAPTURE');
  console.log('====================================================');

  const isUp = await checkServer(TARGET_HOST + '/');
  if (!isUp) {
    console.error(`ERROR: Vite server is not responding at ${TARGET_HOST}`);
    process.exit(1);
  }

  const debugPort = 9222;
  const userDataDir = path.join(ARTIFACT_DIR, 'scratch', 'chrome_evidence_profile');
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
  }

  console.log(`Launching headless Chrome on debug port ${debugPort}...`);
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    'about:blank',
  ]);

  await sleep(1500);

  let versionInfo;
  for (let retry = 0; retry < 10; retry++) {
    try {
      versionInfo = await fetchJson(`http://127.0.0.1:${debugPort}/json/version`);
      break;
    } catch {
      await sleep(400);
    }
  }

  if (!versionInfo) {
    console.error('Failed to connect to Chrome debug port.');
    chromeProc.kill();
    process.exit(1);
  }

  const targets = await fetchJson(`http://127.0.0.1:${debugPort}/json/list`);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');

  try {
    // 1. Break Bulk Gallery on Container Guide Page (Desktop 1440)
    await captureEvidence(cdp, {
      url: `${TARGET_HOST}/container-guide#break-bulk`,
      width: 1440,
      height: 900,
      scrollSelector: '#break-bulk',
      outputPath: path.join(ARTIFACT_DIR, 'evidence_break_bulk_1440px.png'),
    });

    // 2. Break Bulk Gallery on Container Guide Page (Mobile 390)
    await captureEvidence(cdp, {
      url: `${TARGET_HOST}/container-guide#break-bulk`,
      width: 390,
      height: 844,
      scrollSelector: '#break-bulk',
      outputPath: path.join(ARTIFACT_DIR, 'evidence_break_bulk_mobile_390px.png'),
    });

    // 3. Container Comparison Matrix verifying #all-container-cards is gone (Desktop 1440)
    await captureEvidence(cdp, {
      url: `${TARGET_HOST}/container-guide#container-comparison`,
      width: 1440,
      height: 900,
      scrollSelector: '#container-comparison',
      outputPath: path.join(ARTIFACT_DIR, 'evidence_container_guide_comparison_1440px.png'),
    });

    // 4. Dedicated Road Transport Page (Desktop 1440)
    await captureEvidence(cdp, {
      url: `${TARGET_HOST}/road-transport`,
      width: 1440,
      height: 900,
      outputPath: path.join(ARTIFACT_DIR, 'evidence_road_transport_1440px.png'),
    });

    // 5. Dedicated Road Transport Page Gallery Scrolled (Desktop 1440)
    await captureEvidence(cdp, {
      url: `${TARGET_HOST}/road-transport`,
      width: 1440,
      height: 900,
      scrollSelector: 'section.bg-\\[\\#0B0B0D\\]',
      outputPath: path.join(ARTIFACT_DIR, 'evidence_road_fleet_gallery_1440px.png'),
    });

    // 6. Dedicated Road Transport Page (Mobile 390)
    await captureEvidence(cdp, {
      url: `${TARGET_HOST}/road-transport`,
      width: 390,
      height: 844,
      outputPath: path.join(ARTIFACT_DIR, 'evidence_road_transport_mobile_390px.png'),
    });

    // 7. Cargo Lashing Page with Sanitized Engineering Badges (Desktop 1440)
    await captureEvidence(cdp, {
      url: `${TARGET_HOST}/services/cargo-lashing`,
      width: 1440,
      height: 900,
      scrollSelector: 'div.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4',
      outputPath: path.join(ARTIFACT_DIR, 'evidence_cargo_lashing_badges_1440px.png'),
    });

    // 8. Quote Request Page with Q Name Field (Desktop 1440)
    await captureEvidence(cdp, {
      url: `${TARGET_HOST}/request-quote`,
      width: 1440,
      height: 900,
      scrollSelector: 'input[name="quoteName"]',
      outputPath: path.join(ARTIFACT_DIR, 'evidence_quote_qname_1440px.png'),
    });

    console.log('\nAll evidence captures completed successfully!');
  } finally {
    cdp.close();
    chromeProc.kill();
  }
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
