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
    this.consoleMessages = [];
    this.failedRequests = [];
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new globalThis.WebSocket(this.wsUrl);
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject);
      this.ws.addEventListener('message', (event) => {
        const msg = JSON.parse(event.data.toString());
        if (msg.method === 'Console.messageAdded') {
          this.consoleMessages.push(msg.params.message);
        } else if (msg.method === 'Runtime.consoleAPICalled') {
          this.consoleMessages.push({
            type: msg.params.type,
            text: msg.params.args.map(a => a.value || a.description).join(' ')
          });
        } else if (msg.method === 'Network.loadingFailed') {
          this.failedRequests.push(msg.params);
        }

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

async function captureRoute(cdp, options) {
  const { route, scrollSelector, screenshotName, width = 1440, height = 900 } = options;
  const url = `${TARGET_HOST}${route}`;
  console.log(`\n--------------------------------------------------`);
  console.log(`VERIFYING ROUTE: ${route} (${width}x${height})`);
  console.log(`--------------------------------------------------`);

  cdp.consoleMessages = [];
  cdp.failedRequests = [];

  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 600,
    screenWidth: width,
    screenHeight: height,
  });

  // Navigate with cache disabled
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Page.navigate', { url });
  await sleep(1800);

  // Poll for React hydration
  for (let i = 0; i < 20; i++) {
    const evalRes = await cdp.send('Runtime.evaluate', {
      expression: 'document.body ? document.body.innerText.length : 0',
      returnByValue: true
    });
    const len = evalRes.result && evalRes.result.value ? evalRes.result.value : 0;
    if (len > 300) break;
    await sleep(200);
  }

  // Scroll if selector specified
  if (scrollSelector) {
    console.log(`Scrolling into view: ${scrollSelector}`);
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
    await sleep(700);
  }

  // Verify DOM attributes
  const domInfo = await cdp.send('Runtime.evaluate', {
    expression: `
      (() => {
        return {
          title: document.title,
          h1: document.querySelector('h1')?.innerText,
          h2: document.querySelector('h2')?.innerText,
          bodyTextLength: document.body.innerText.length,
          allContainerCardsExists: !!document.querySelector('#all-container-cards'),
          breakBulkExists: !!document.querySelector('#break-bulk'),
          hasQuoteNameField: !!document.querySelector('input[name="quoteName"]'),
          imagesCount: document.querySelectorAll('img').length
        };
      })()
    `,
    returnByValue: true
  });

  console.log('DOM Summary:', domInfo.result && domInfo.result.value);
  console.log(`Console: ${cdp.consoleMessages.length} logs/errors, Failed Requests: ${cdp.failedRequests.length}`);

  // Capture screenshot
  const screenshot = await cdp.send('Page.captureScreenshot', { format: 'png' });
  const buffer = Buffer.from(screenshot.data, 'base64');
  const outPath = path.join(ARTIFACT_DIR, screenshotName);
  fs.writeFileSync(outPath, buffer);
  console.log(`[SUCCESS] Saved: ${screenshotName} (${(buffer.length / 1024).toFixed(1)} KB)`);
  return { screenshotName, sizeKb: (buffer.length / 1024).toFixed(1), dom: domInfo.result && domInfo.result.value };
}

async function main() {
  const debugPort = 9444;
  const userDataDir = path.join(ARTIFACT_DIR, 'scratch', 'chrome_live_verify');
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
  }

  console.log('====================================================');
  console.log('MSK LOGISTICS: LIVE USER ROUTE VERIFICATION SUITE');
  console.log('====================================================');

  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
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

  const targets = await fetchJson(`http://127.0.0.1:${debugPort}/json/list`);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Console.enable');
  await cdp.send('Network.enable');

  const results = [];

  try {
    // 1. /container-guide (Header & Technical Inspector)
    results.push(await captureRoute(cdp, {
      route: '/container-guide',
      screenshotName: 'live_container_guide_1440px.png',
    }));

    // 2. /container-guide#break-bulk (Authentic Break Bulk Section with WA0019 & WA0020)
    results.push(await captureRoute(cdp, {
      route: '/container-guide#break-bulk',
      scrollSelector: '#break-bulk',
      screenshotName: 'live_container_guide_break_bulk_1440px.png',
    }));

    // 3. /container-guide#container-comparison (Comparison Matrix, proving #all-container-cards is gone)
    results.push(await captureRoute(cdp, {
      route: '/container-guide#container-comparison',
      scrollSelector: '#container-comparison',
      screenshotName: 'live_container_guide_comparison_1440px.png',
    }));

    // 4. /road-transport (Dedicated Road Transport Page)
    results.push(await captureRoute(cdp, {
      route: '/road-transport',
      screenshotName: 'live_road_transport_1440px.png',
    }));

    // 5. /road-transport gallery (4 authentic photos: WA0018, WA0006, WA0007, WA0008)
    results.push(await captureRoute(cdp, {
      route: '/road-transport',
      scrollSelector: 'section.bg-\\[\\#0B0B0D\\]',
      screenshotName: 'live_road_transport_gallery_1440px.png',
    }));

    // 6. /warehouse (Open Yard & Shaded Warehouse with zero unverified forwarder names)
    results.push(await captureRoute(cdp, {
      route: '/warehouse',
      screenshotName: 'live_warehouse_1440px.png',
    }));

    // 7. /services/cargo-lashing (Sanitized engineering badges)
    results.push(await captureRoute(cdp, {
      route: '/services/cargo-lashing',
      scrollSelector: 'div.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4',
      screenshotName: 'live_cargo_lashing_badges_1440px.png',
    }));

    // 8. /request-quote (Quote Reference Name visible immediately on Step 1)
    results.push(await captureRoute(cdp, {
      route: '/request-quote',
      scrollSelector: 'input[name="quoteName"]',
      screenshotName: 'live_request_quote_step1_qname_1440px.png',
    }));

    // 9. /about (Polaris, Conex, Punjab, Speedy CFS foundation)
    results.push(await captureRoute(cdp, {
      route: '/about',
      scrollSelector: 'h2',
      screenshotName: 'live_about_cfs_history_1440px.png',
    }));

    // 10. /services (5 core services + new Road Transport fleet banner)
    results.push(await captureRoute(cdp, {
      route: '/services',
      scrollSelector: 'div.bg-\\[\\#0B0B0D\\]',
      screenshotName: 'live_services_road_banner_1440px.png',
    }));

    console.log('\n====================================================');
    console.log('SUMMARY OF ALL CAPTURED LIVE BROWSER VERIFICATIONS');
    console.log('====================================================');
    results.forEach(r => console.log(`${r.screenshotName}: ${r.sizeKb} KB - Title: "${r.dom.title}"`));
  } finally {
    cdp.close();
    chromeProc.kill();
  }
}

main().catch(console.error);

