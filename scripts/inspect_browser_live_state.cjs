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

async function inspectRoute(cdp, route, options = {}) {
  const url = `${TARGET_HOST}${route}`;
  console.log(`\n==================================================`);
  console.log(`INSPECTING ROUTE: ${route} (${url})`);
  console.log(`==================================================`);

  cdp.consoleMessages = [];
  cdp.failedRequests = [];

  await cdp.send('Page.navigate', { url });
  await sleep(1500);

  // Poll for React hydration (inner text > 200)
  let hydrated = false;
  let textLength = 0;
  for (let i = 0; i < 20; i++) {
    const evalRes = await cdp.send('Runtime.evaluate', {
      expression: 'document.body ? document.body.innerText.length : 0',
      returnByValue: true
    });
    textLength = evalRes.result && evalRes.result.value ? evalRes.result.value : 0;
    if (textLength > 300) {
      hydrated = true;
      break;
    }
    await sleep(250);
  }

  console.log(`Hydration status: ${hydrated ? 'HYDRATED' : 'NOT HYDRATED'} (text length: ${textLength})`);

  // Check specific DOM assertions for this route
  if (options.evalScript) {
    const customEval = await cdp.send('Runtime.evaluate', {
      expression: options.evalScript,
      returnByValue: true
    });
    console.log('Route Assertions:\n', JSON.stringify(customEval.result && customEval.result.value, null, 2));
  }

  // Report console messages
  const errors = cdp.consoleMessages.filter(m => m.level === 'error' || m.type === 'error');
  const warnings = cdp.consoleMessages.filter(m => m.level === 'warning' || m.type === 'warning');
  console.log(`Console: ${errors.length} errors, ${warnings.length} warnings`);
  if (errors.length > 0) {
    console.log('Errors:', errors);
  }
  if (cdp.failedRequests.length > 0) {
    console.log('Failed Requests:', cdp.failedRequests);
  }

  // Screenshot
  if (options.screenshotName) {
    const screenshot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(screenshot.data, 'base64');
    const outPath = path.join(ARTIFACT_DIR, options.screenshotName);
    fs.writeFileSync(outPath, buffer);
    console.log(`Saved screenshot: ${options.screenshotName} (${(buffer.length / 1024).toFixed(1)} KB)`);
  }
}

async function main() {
  const debugPort = 9333;
  const userDataDir = path.join(ARTIFACT_DIR, 'scratch', 'chrome_diagnose_profile');
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
  }

  console.log(`Launching Chrome on debug port ${debugPort}...`);
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
  await cdp.send('Console.enable');
  await cdp.send('Network.enable');

  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
    screenWidth: 1440,
    screenHeight: 900,
  });

  try {
    // 1. /container-guide
    await inspectRoute(cdp, '/container-guide', {
      screenshotName: 'diag_container_guide.png',
      evalScript: `(() => {
        return {
          title: document.title,
          h1: document.querySelector('h1')?.innerText,
          hasBreakBulkSection: !!document.querySelector('#break-bulk'),
          hasAllContainerCardsSection: !!document.querySelector('#all-container-cards'),
          hasTechnicalInspector: !!document.querySelector('#technical-inspector'),
          breakBulkTitle: document.querySelector('#break-bulk h2')?.innerText,
          breakBulkPhotosCount: document.querySelectorAll('#break-bulk img').length,
          breakBulkImages: Array.from(document.querySelectorAll('#break-bulk img')).map(img => img.src)
        };
      })()`
    });

    // 2. /container-guide#break-bulk
    await inspectRoute(cdp, '/container-guide#break-bulk', {
      screenshotName: 'diag_break_bulk_scroll.png',
      evalScript: `(() => {
        const el = document.querySelector('#break-bulk');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        return {
          scrolled: !!el,
          breakBulkText: el ? el.innerText.substring(0, 300) : null
        };
      })()`
    });

    // 3. /road-transport
    await inspectRoute(cdp, '/road-transport', {
      screenshotName: 'diag_road_transport.png',
      evalScript: `(() => {
        return {
          title: document.title,
          h1: document.querySelector('h1')?.innerText,
          photosCount: document.querySelectorAll('section img').length,
          photos: Array.from(document.querySelectorAll('section img')).map(img => img.src),
          hasWa0018: Array.from(document.querySelectorAll('img')).some(i => i.src.includes('WA0018') || i.src.includes('breakbulk-cylindrical-haulage')),
          hasWa0006: Array.from(document.querySelectorAll('img')).some(i => i.src.includes('WA0006') || i.src.includes('breakbulk-lowbed-machinery')),
          hasWa0007: Array.from(document.querySelectorAll('img')).some(i => i.src.includes('WA0007') || i.src.includes('breakbulk-heavy-rigging')),
          hasWa0008: Array.from(document.querySelectorAll('img')).some(i => i.src.includes('WA0008') || i.src.includes('trailer-chassis-ratchet'))
        };
      })()`
    });

    // 4. /warehouse
    await inspectRoute(cdp, '/warehouse', {
      screenshotName: 'diag_warehouse.png',
      evalScript: `(() => {
        return {
          title: document.title,
          h1: document.querySelector('h1')?.innerText,
          mentionsDeugro: document.body.innerText.includes('Deugro'),
          mentionsJaguar: document.body.innerText.includes('Jaguar'),
          mentionsYogiji: document.body.innerText.includes('Yogiji'),
          hasOpenYardPhoto: Array.from(document.querySelectorAll('img')).some(i => i.src.includes('open-yard-conex-staging') || i.src.includes('WA0025')),
          hasShadedWarehousePhoto: Array.from(document.querySelectorAll('img')).some(i => i.src.includes('shaded-warehouse-main-bay') || i.src.includes('WA0011'))
        };
      })()`
    });

    // 5. /services/cargo-lashing
    await inspectRoute(cdp, '/services/cargo-lashing', {
      screenshotName: 'diag_cargo_lashing.png',
      evalScript: `(() => {
        return {
          title: document.title,
          h1: document.querySelector('h1')?.innerText,
          mentionsDeugro: document.body.innerText.includes('Deugro'),
          mentionsJaguar: document.body.innerText.includes('Jaguar'),
          hasHighTensileWebbingBadge: document.body.innerText.includes('High-Tensile Webbing'),
          hasMarineHoldNetworkBadge: document.body.innerText.includes('Marine Hold Network'),
          hasChassisRatchetTieDownBadge: document.body.innerText.includes('Chassis Ratchet Tie-Down'),
          hasHeavyTimberBolstersBadge: document.body.innerText.includes('Heavy Timber Bolsters')
        };
      })()`
    });

    // 6. /request-quote
    await inspectRoute(cdp, '/request-quote', {
      screenshotName: 'diag_request_quote.png',
      evalScript: `(() => {
        const input = document.querySelector('input[name="quoteName"]');
        return {
          title: document.title,
          hasQuoteNameInput: !!input,
          quoteNamePlaceholder: input?.placeholder,
          hasCompanyNameInput: !!document.querySelector('input[name="companyName"]')
        };
      })()`
    });

    // 7. /about
    await inspectRoute(cdp, '/about', {
      screenshotName: 'diag_about.png',
      evalScript: `(() => {
        return {
          title: document.title,
          hasPolaris: document.body.innerText.includes('Polaris'),
          hasConex: document.body.innerText.includes('Conex'),
          hasPunjab: document.body.innerText.includes('Punjab'),
          hasSpeedy: document.body.innerText.includes('Speedy')
        };
      })()`
    });

  } finally {
    cdp.close();
    chromeProc.kill();
  }
}

main().catch(console.error);

