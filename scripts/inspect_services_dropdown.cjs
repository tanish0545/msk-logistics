const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ARTIFACT_DIR = 'C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const BASE_URL = 'http://127.0.0.1:5173';

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
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
    console.log(`[Screenshot Saved] -> ${path.basename(outputPath)} (${(size / 1024).toFixed(1)} KB)`);
  }

  async close() {
    if (this.ws) {
      try { this.ws.close(); } catch {}
    }
  }
}

async function run() {
  console.log('=== Inspecting Services Dropdown Across Viewports ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), `msk_chrome_inspect_${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9495',
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
    for (let i = 0; i < 20; i++) {
      try {
        targets = await fetchJson('http://127.0.0.1:9495/json');
        if (targets && targets.length) break;
      } catch {
        await delay(300);
      }
    }

    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();
    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');

    // Helper to wait for React root
    async function waitForPage() {
      for (let i = 0; i < 40; i++) {
        const mounted = await cdp.eval('document.getElementById("root")?.children.length > 0');
        if (mounted) break;
        await delay(300);
      }
      await delay(800);
    }

    // 1. Desktop 1920px (Full HD)
    console.log('\n--- 1. Testing Desktop 1920x1080 ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await waitForPage();

    // Trigger Services dropdown open by clicking the Services button
    const opened = await cdp.eval(`(() => {
      const btns = Array.from(document.querySelectorAll('header button'));
      const servicesBtn = btns.find(b => b.innerText.includes('Services'));
      if (!servicesBtn) return { error: 'Services button not found' };
      servicesBtn.click();
      return { success: true, text: servicesBtn.innerText };
    })()`);
    console.log('Opened services dropdown on 1920px:', opened);
    await delay(600);

    const dropdownMetrics1920 = await cdp.eval(`(() => {
      const menu = document.querySelector('[role="menu"][aria-label*="Services"]');
      if (!menu) return { error: 'Services menu not found in DOM' };
      const rect = menu.getBoundingClientRect();
      const style = window.getComputedStyle(menu);
      const cards = menu.querySelectorAll('.group\\\\/stack, [class*="group/stack"]');
      const carting = menu.querySelector('[aria-label*="Carting"]');
      return {
        visible: rect.width > 0 && rect.height > 0,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, bottom: rect.bottom, right: rect.right },
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
        fitsInViewport: rect.bottom <= window.innerHeight && rect.right <= window.innerWidth && rect.x >= 0,
        zIndex: style.zIndex,
        background: style.backgroundColor,
        cardsCount: cards.length,
        hasCarting: !!carting
      };
    })()`);
    console.log('1920px Dropdown Metrics:', JSON.stringify(dropdownMetrics1920, null, 2));
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_services_dropdown_1920px.png'));

    // 2. Desktop 1536px
    console.log('\n--- 2. Testing Desktop 1536x864 ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1536,
      height: 864,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(400);
    const dropdownMetrics1536 = await cdp.eval(`(() => {
      const menu = document.querySelector('[role="menu"][aria-label*="Services"]');
      if (!menu) return { error: 'Services menu not found in DOM' };
      const rect = menu.getBoundingClientRect();
      return {
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, bottom: rect.bottom },
        windowHeight: window.innerHeight,
        fitsInViewport: rect.bottom <= window.innerHeight && rect.x >= 0
      };
    })()`);
    console.log('1536px Dropdown Metrics:', JSON.stringify(dropdownMetrics1536, null, 2));
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_services_dropdown_1536px.png'));

    // 3. Desktop 1280px
    console.log('\n--- 3. Testing Desktop 1280x800 ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(400);
    const dropdownMetrics1280 = await cdp.eval(`(() => {
      const menu = document.querySelector('[role="menu"][aria-label*="Services"]');
      if (!menu) return { error: 'Services menu not found in DOM' };
      const rect = menu.getBoundingClientRect();
      return {
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, bottom: rect.bottom },
        windowHeight: window.innerHeight,
        fitsInViewport: rect.bottom <= window.innerHeight && rect.x >= 0
      };
    })()`);
    console.log('1280px Dropdown Metrics:', JSON.stringify(dropdownMetrics1280, null, 2));
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_services_dropdown_1280px.png'));

    // 4. Mobile 390px
    console.log('\n--- 4. Testing Mobile 390x844 ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    // Fresh navigation in mobile viewport
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await waitForPage();

    // Click hamburger button to open drawer
    const hamburgerResult = await cdp.eval(`(() => {
      const btn = document.querySelector('header button[aria-label*="navigation menu"]');
      if (!btn) return { error: 'Hamburger button not found' };
      btn.click();
      return { success: true, label: btn.getAttribute('aria-label') };
    })()`);
    console.log('Mobile hamburger click result:', hamburgerResult);
    await delay(600);

    // Click Services expand button in mobile drawer
    const servicesAccordion = await cdp.eval(`(() => {
      const sBtn = document.querySelector('button[aria-label="Toggle Services submenu"]');
      if (sBtn) {
        sBtn.click();
        return { success: true };
      }
      return { error: 'Services accordion button not found' };
    })()`);
    console.log('Mobile services accordion click result:', servicesAccordion);
    await delay(800);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_services_dropdown_mobile.png'));

    // 5. Also inspect Breadcrumb dropdown on subpage (/services/ocean-cargo)
    console.log('\n--- 5. Testing Breadcrumbs Dropdown on /services/ocean-cargo ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1536,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send('Page.navigate', { url: `${BASE_URL}/services/ocean-cargo` });
    await waitForPage();

    const breadcrumbOpened = await cdp.eval(`(() => {
      const bcBtn = document.querySelector('nav[aria-label="Breadcrumb"] button[aria-label*="service"]');
      if (!bcBtn) return { error: 'Breadcrumb dropdown button not found' };
      bcBtn.click();
      return { success: true };
    })()`);
    console.log('Breadcrumb dropdown clicked:', breadcrumbOpened);
    await delay(500);

    const bcMetrics = await cdp.eval(`(() => {
      const menu = document.querySelector('nav[aria-label="Breadcrumb"] .absolute');
      if (!menu) return { error: 'Breadcrumb dropdown menu not found' };
      const rect = menu.getBoundingClientRect();
      const style = window.getComputedStyle(menu);
      return {
        visible: rect.width > 0 && rect.height > 0,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        zIndex: style.zIndex,
        background: style.backgroundColor
      };
    })()`);
    console.log('Breadcrumb Dropdown Metrics:', JSON.stringify(bcMetrics, null, 2));
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_breadcrumb_dropdown.png'));

  } catch (err) {
    console.error('Inspection error:', err);
  } finally {
    if (cdp) await cdp.close();
    proc.kill('SIGTERM');
    await delay(600);
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
  }
}

run();
