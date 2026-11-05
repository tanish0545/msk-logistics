const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

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

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

async function run() {
  const remotePort = 9330;
  const userDataDir = path.join(process.env.TEMP || 'C:\\Temp', 'chrome_diagnose_' + Date.now());

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

    const consoleLogs = [];
    const failedRequests = [];

    client.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data.toString());
      if (msg.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push({ type: msg.params.type, text: msg.params.args.map(a => a.value || a.description).join(' ') });
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        consoleLogs.push({ type: 'EXCEPTION', text: msg.params.exceptionDetails?.exception?.description || msg.params.exceptionDetails?.text });
      }
      if (msg.method === 'Network.responseReceived') {
        if (msg.params.response.status >= 400) {
          failedRequests.push({ url: msg.params.response.url, status: msg.params.response.status });
        }
      }
    });

    console.log('Navigating to homepage...');
    await client.send('Page.navigate', { url: TARGET_HOST });
    
    // Wait for root to have rendered
    for (let i = 0; i < 40; i++) {
      const ready = await client.eval(`(() => {
        const root = document.getElementById('root');
        return Boolean(root && root.children.length > 0 && document.body.innerText.trim().length > 100);
      })()`);
      if (ready) break;
      await sleep(300);
    }
    await sleep(1500);

    // Audit initial image states
    const initialImages = await client.eval(`(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        opacity: window.getComputedStyle(img).opacity,
        display: window.getComputedStyle(img).display,
        visibility: window.getComputedStyle(img).visibility,
        rect: { width: Math.round(img.getBoundingClientRect().width), height: Math.round(img.getBoundingClientRect().height) }
      }));
    })()`);

    console.log(`Loaded ${initialImages.length} images on Home. Checking for zero width or opacity 0...`);
    const blankInitial = initialImages.filter(i => i.opacity === '0' || (i.complete && i.naturalWidth === 0));
    console.log(`Initially blank/zero-opacity images on Home:`, blankInitial.length);
    if (blankInitial.length > 0) {
      console.log('Details:', blankInitial.slice(0, 5));
    }

    // Now simulate Tab Switch / Inactivity: set visibility hidden then visible
    console.log('\n--- Simulating Tab Switch (Hidden -> Visible) ---');
    await client.send('Emulation.setFocusEmulationEnabled', { enabled: false });
    await client.eval(`(() => {
      Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
      Object.defineProperty(document, 'hidden', { value: true, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    })()`);
    await sleep(1500);

    // Return to tab
    await client.send('Emulation.setFocusEmulationEnabled', { enabled: true });
    await client.eval(`(() => {
      Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
      Object.defineProperty(document, 'hidden', { value: false, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
      window.dispatchEvent(new Event('focus'));
    })()`);
    await sleep(1500);

    const postSwitchImages = await client.eval(`(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        opacity: window.getComputedStyle(img).opacity,
        isBlackOrBlank: img.opacity === '0' || (img.complete && img.naturalWidth === 0)
      }));
    })()`);

    const blankAfterSwitch = postSwitchImages.filter(i => i.isBlackOrBlank);
    console.log(`Images with zero opacity or failed decode after tab switch:`, blankAfterSwitch.length);

    // Now test Route Navigation: Home -> About -> Services -> Home
    console.log('\n--- Testing Route Transitions: Home -> About -> Services -> Home ---');
    const routes = ['/about', '/services', '/container-guide', '/'];
    for (const r of routes) {
      console.log(`Navigating client-side to ${r}...`);
      await client.eval(`(() => {
        window.history.pushState({}, '', '${r}');
        window.dispatchEvent(new PopStateEvent('popstate'));
      })()`);
      await sleep(1200);

      const pageState = await client.eval(`(() => {
        const root = document.getElementById('root');
        const textLen = document.body.innerText.trim().length;
        const mainChildCount = document.querySelector('main')?.children?.length || 0;
        const scrollRevealEls = Array.from(document.querySelectorAll('.scroll-reveal'));
        const revealedCount = scrollRevealEls.filter(el => el.classList.contains('is-revealed')).length;

        return {
          route: window.location.pathname,
          rootExists: Boolean(root),
          rootChildCount: root?.children?.length || 0,
          bodyTextLength: textLen,
          mainChildCount,
          totalScrollReveal: scrollRevealEls.length,
          revealedCount,
          unrevealedCount: scrollRevealEls.length - revealedCount,
        };
      })()`);

      console.log(`State on ${r}:`, pageState);
    }

    console.log('\nConsole Errors & Exceptions:');
    console.log(consoleLogs.filter(l => l.type === 'error' || l.type === 'EXCEPTION'));

    console.log('\nFailed Network Requests (4xx/5xx):');
    console.log(failedRequests);

    client.close();
  } finally {
    try {
      chromeProc.kill();
    } catch (e) {}
  }
}

run().catch(console.error);
