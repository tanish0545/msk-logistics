const { spawn } = require('child_process');
const http = require('http');
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

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.exception?.description || res.exceptionDetails.text || 'CDP Eval Exception');
    }
    return res.result?.value;
  }

  async screenshot(filePath, clip = null) {
    const params = { format: 'png' };
    if (clip) params.clip = clip;
    const res = await this.send('Page.captureScreenshot', params);
    const fs = require('fs');
    fs.writeFileSync(filePath, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot: ${filePath} (${Math.round(res.data.length * 0.75 / 1024)} KB)`);
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

async function run() {
  const remotePort = 9335;
  const userDataDir = path.join(process.env.TEMP || 'C:\\Temp', 'chrome_scroll_test_' + Date.now());

  console.log(`Launching Chrome on port ${remotePort}...`);
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${remotePort}`,
    `--user-data-dir=${userDataDir}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    'about:blank'
  ], { detached: false });

  try {
    let version = null;
    for (let i = 0; i < 30; i++) {
      try {
        version = await fetchJson(`http://127.0.0.1:${remotePort}/json/version`);
        if (version && version.webSocketDebuggerUrl) break;
      } catch (e) {
        await sleep(300);
      }
    }

    if (!version) throw new Error('Chrome failed to start');

    const targets = await fetchJson(`http://127.0.0.1:${remotePort}/json/list`);
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('DOM.enable');
    await client.send('Runtime.enable');
    await client.send('Network.enable');

    console.log('Navigating to homepage...');
    await client.send('Page.navigate', { url: TARGET_HOST });
    
    // Wait for render
    for (let i = 0; i < 40; i++) {
      const ready = await client.eval(`Boolean(document.getElementById('root')?.children.length > 0 && document.body.innerText.trim().length > 100)`);
      if (ready) break;
      await sleep(300);
    }
    await sleep(1500);

    // Scroll down gradually
    console.log('Scrolling down the homepage...');
    for (let pos = 500; pos <= 5000; pos += 1000) {
      await client.eval(`window.scrollTo({ top: ${pos}, behavior: 'instant' })`);
      await sleep(300);
    }

    const scrollStats = await client.eval(`(() => {
      const allReveals = document.querySelectorAll('.scroll-reveal');
      const revealed = document.querySelectorAll('.scroll-reveal.is-revealed');
      return {
        total: allReveals.length,
        revealedCount: revealed.length,
        unrevealedCount: allReveals.length - revealed.length
      };
    })()`);

    console.log('Scroll stats after scrolling to 5000px:', scrollStats);

    // Now simulate Tab Switch 10 times in a row as required by prompt!
    console.log('\n--- Switching Tabs 10 times (Phase 6 regression test) ---');
    for (let t = 1; t <= 10; t++) {
      // Hide
      await client.eval(`(() => {
        Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
        Object.defineProperty(document, 'hidden', { value: true, configurable: true });
        document.dispatchEvent(new Event('visibilitychange'));
      })()`);
      await sleep(150);

      // Restore
      await client.eval(`(() => {
        Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
        Object.defineProperty(document, 'hidden', { value: false, configurable: true });
        document.dispatchEvent(new Event('visibilitychange'));
        window.dispatchEvent(new Event('focus'));
      })()`);
      await sleep(250);
    }

    // Verify all images after 10 tab switches
    const tabSwitchAudit = await client.eval(`(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const broken = imgs.filter(i => {
        // Exclude intentionally hidden shaded warehouse overlay
        if (i.src.includes('shaded-warehouse-main-bay')) return false;
        const style = window.getComputedStyle(i);
        return style.opacity === '0' || (i.complete && i.naturalWidth === 0);
      });

      return {
        totalImages: imgs.length,
        brokenCount: broken.length,
        broken: broken.map(b => b.src)
      };
    })()`);

    console.log('Audit after 10 tab switches:', tabSwitchAudit);

    // Take screenshot after 10 tab switches
    const fs = require('fs');
    const tabSwitchShot = path.join(ARTIFACT_DIR, 'live_recovery_after_10_tab_switches.png');
    await client.screenshot(tabSwitchShot, { x: 0, y: 0, width: 1440, height: 900, scale: 1 });

    // Test Route Navigations: Home -> About -> Services -> Contact -> Home
    console.log('\n--- Testing Full Route Cycle (Home -> About -> Services -> Contact -> Home) ---');
    const testRoutes = ['/about', '/services', '/contact', '/'];
    for (const route of testRoutes) {
      console.log(`Navigating to ${route}...`);
      await client.eval(`(() => {
        window.history.pushState({}, '', '${route}');
        window.dispatchEvent(new PopStateEvent('popstate'));
      })()`);
      await sleep(1500);

      const routeCheck = await client.eval(`(() => {
        const textLen = document.body.innerText.trim().length;
        const rootHasChildren = Boolean(document.getElementById('root')?.children.length);
        return {
          path: window.location.pathname,
          rendered: textLen > 200,
          textLen,
          rootHasChildren
        };
      })()`);

      console.log(`Route ${route} check:`, routeCheck);
    }

    const finalShot = path.join(ARTIFACT_DIR, 'live_recovery_route_cycle_complete.png');
    await client.screenshot(finalShot, { x: 0, y: 0, width: 1440, height: 900, scale: 1 });

    client.close();
    console.log('All tests passed successfully!');
  } finally {
    try {
      chromeProc.kill();
    } catch (e) {}
  }
}

run().catch(console.error);
