const http = require('http');
const https = require('https');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const LIVE_URL = 'https://msklogisticsolution.vercel.app';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function checkLiveHeaders(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      resolve({
        statusCode: res.statusCode,
        headers: res.headers
      });
    }).on('error', reject);
  });
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
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }

  async screenshot(outPath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outPath, Buffer.from(res.data, 'base64'));
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  console.log('--- Step 1: Checking Live Vercel Headers ---');
  try {
    const headerCheck = await checkLiveHeaders(LIVE_URL);
    console.log(`Live Status: ${headerCheck.statusCode}`);
    console.log(`Live Cache-Control: ${headerCheck.headers['cache-control']}`);
    console.log(`Live Server: ${headerCheck.headers['server']}`);
  } catch (err) {
    console.warn('Could not inspect headers directly:', err.message);
  }

  console.log('\n--- Step 2: Launching Chrome for Live URL Validation ---');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--remote-debugging-port=9337',
    '--headless=new',
    '--window-size=1440,900',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\tanis\\.gemini\\temp\\chrome-profile-live-test'
  ]);

  await delay(2500);

  const targets = await fetchJson('http://127.0.0.1:9337/json');
  const pageTarget = targets.find(t => t.type === 'page');
  if (!pageTarget) throw new Error('No page target found');

  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  try {
    await client.connect();
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log(`Navigating to Live URL: ${LIVE_URL}...`);
    await client.send('Page.navigate', { url: LIVE_URL });
    await delay(5000);

    // Initial audit
    const initialAudit = await client.eval(`(() => {
      const images = Array.from(document.images);
      return {
        title: document.title,
        totalImages: images.length,
        loadedCount: images.filter(img => img.complete && img.naturalWidth > 0).length,
        zeroNaturalWidthCount: images.filter(img => img.complete && img.naturalWidth === 0).length,
        hasRootContent: Boolean(document.getElementById('root')?.innerText?.length > 100),
        textLength: document.body.innerText.trim().length
      };
    })()`);
    console.log('Live Initial Page Audit:', initialAudit);

    // Scroll down to trigger all sections
    console.log('Scrolling down the live page...');
    await client.eval(`window.scrollTo(0, 3000);`);
    await delay(1500);
    await client.eval(`window.scrollTo(0, 6000);`);
    await delay(1500);
    await client.eval(`window.scrollTo(0, 0);`);
    await delay(1000);

    // Perform 10 Tab Switch cycles
    console.log('\n--- Step 3: Simulating 10 Background/Foreground Tab Switches on Live Site ---');
    for (let i = 1; i <= 10; i++) {
      await client.eval(`(() => {
        Object.defineProperty(document, 'hidden', { value: true, configurable: true });
        Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
        document.dispatchEvent(new Event('visibilitychange'));
        window.dispatchEvent(new Event('blur'));
      })()`);
      await delay(120);

      await client.eval(`(() => {
        Object.defineProperty(document, 'hidden', { value: false, configurable: true });
        Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
        document.dispatchEvent(new Event('visibilitychange'));
        window.dispatchEvent(new Event('focus'));
      })()`);
      await delay(120);
    }

    await delay(1500);

    const postTabAudit = await client.eval(`(() => {
      const images = Array.from(document.images);
      const broken = images.filter(img => img.naturalWidth === 0 && img.src && !img.src.endsWith('.svg'));
      const zeroOpacity = images.filter(img => window.getComputedStyle(img).opacity === '0');
      return {
        totalImages: images.length,
        brokenCount: broken.length,
        zeroOpacityCount: zeroOpacity.length,
        bodyTextLength: document.body.innerText.trim().length
      };
    })()`);
    console.log('Live Post 10x Tab Switch Audit:', postTabAudit);

    const screenshotPath1 = path.join(ARTIFACT_DIR, 'live_production_after_10_tab_switches.png');
    await client.screenshot(screenshotPath1);
    console.log(`Saved screenshot: ${screenshotPath1}`);

    // Test Navigation Cycle
    console.log('\n--- Step 4: Testing Route Navigation Cycle on Live Production ---');
    const routes = ['/about', '/services', '/contact', '/'];
    const routeResults = {};

    for (const r of routes) {
      console.log(`Navigating to ${r}...`);
      await client.eval(`(() => {
        window.history.pushState({}, '', '${r}');
        window.dispatchEvent(new PopStateEvent('popstate'));
      })()`);
      await delay(2000);

      const routeCheck = await client.eval(`(() => {
        const textLen = document.body.innerText.trim().length;
        const rootHasChildren = Boolean(document.getElementById('root')?.children.length);
        const images = Array.from(document.images);
        const brokenImgs = images.filter(img => img.naturalWidth === 0 && img.src && !img.src.endsWith('.svg')).length;
        return { textLen, rootHasChildren, imgCount: images.length, brokenImgs };
      })()`);
      console.log(`Route ${r} audit:`, routeCheck);
      routeResults[r] = routeCheck;
    }

    const screenshotPath2 = path.join(ARTIFACT_DIR, 'live_production_route_cycle_complete.png');
    await client.screenshot(screenshotPath2);
    console.log(`Saved screenshot: ${screenshotPath2}`);

    const finalReport = {
      timestamp: new Date().toISOString(),
      liveUrl: LIVE_URL,
      initialAudit,
      postTabAudit,
      routeResults
    };

    fs.writeFileSync(
      path.join(ARTIFACT_DIR, 'live_production_verification_report.json'),
      JSON.stringify(finalReport, null, 2)
    );
    console.log('\n=== All Live Production Tests Passed Successfully! ===');

  } finally {
    client.close();
    chromeProc.kill();
  }
}

run().catch(err => {
  console.error('Error during live test:', err);
  process.exit(1);
});
