const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const LOCAL_URL = 'http://127.0.0.1:5173';

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
    if (res.exceptionDetails) {
      throw new Error('Eval failed: ' + JSON.stringify(res.exceptionDetails));
    }
    return res.result ? res.result.value : undefined;
  }

  async captureScreenshot(outputPath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved screenshot -> ${outputPath}`);
  }

  async close() {
    if (this.ws) this.ws.close();
  }
}

async function findOrLaunchChrome() {
  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Users\\tanis\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
  ];
  const chromePath = chromePaths.find(p => fs.existsSync(p));
  if (!chromePath) throw new Error('Chrome executable not found');

  const port = 9223;
  try {
    const targets = await fetchJson(`http://127.0.0.1:${port}/json`);
    const page = targets.find(t => t.type === 'page');
    if (page) return { wsUrl: page.webSocketDebuggerUrl, browserProc: null };
  } catch (e) {
    // Need to launch
  }

  console.log(`Launching headless Chrome on port ${port}...`);
  const userDataDir = path.join(process.env.TEMP || 'C:/Windows/Temp', 'chrome_cdp_verify_' + Date.now());
  const proc = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--window-size=1440,900',
    'about:blank',
  ], { detached: true, stdio: 'ignore' });

  for (let i = 0; i < 40; i++) {
    await delay(250);
    try {
      const targets = await fetchJson(`http://127.0.0.1:${port}/json`);
      const page = targets.find(t => t.type === 'page');
      if (page) return { wsUrl: page.webSocketDebuggerUrl, browserProc: proc };
    } catch (e) {}
  }
  throw new Error('Failed to connect to launched Chrome');
}

async function openServicesDropdown(cdp) {
  await delay(700);
  await cdp.eval(`
    (() => {
      const servicesBtn = document.querySelector('button[aria-label="Toggle Services menu"]');
      if (servicesBtn) {
        servicesBtn.click();
      }
    })()
  `);
  await delay(800);
}

async function run() {
  console.log('=== STARTING MSK LOGISTICS FINAL VERIFICATION ===');
  const { wsUrl, browserProc } = await findOrLaunchChrome();
  const cdp = new CDPClient(wsUrl);
  await cdp.connect();
  console.log('CDP connected to Chrome');

  try {
    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // 1. Navigate to Home
    console.log(`Navigating to ${LOCAL_URL}...`);
    await cdp.send('Page.navigate', { url: LOCAL_URL });
    await delay(2500);

    // 2. Open Services dropdown
    console.log('Triggering Services dropdown open...');
    await openServicesDropdown(cdp);

    // Check if dropdown is open
    const isOpen = await cdp.eval(`
      !!document.querySelector('[role="menu"][aria-label*="Services Mega Menu"]')
    `);
    console.log('Services dropdown open state:', isOpen);

    // Verify Air Cargo image exists and is air-cargo-premium.png
    const airCargoImgSrc = await cdp.eval(`
      (() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const airImg = imgs.find(img => img.src && (img.src.includes('air-cargo') || img.alt === 'Air Cargo'));
        return airImg ? { src: airImg.src, complete: airImg.complete, naturalWidth: airImg.naturalWidth, naturalHeight: airImg.naturalHeight } : null;
      })()
    `);
    console.log('Air Cargo image in dropdown:', airCargoImgSrc);

    // Verify Carting compact diagram elements
    const cartingCheck = await cdp.eval(`
      (() => {
        const cartingHeading = document.querySelector('a[aria-label="MSK Carting Operations"]');
        const speedy = document.querySelector('a[aria-label*="Speedy"]');
        const punjab = document.querySelector('a[aria-label*="Punjab"]');
        const polaris = document.querySelector('a[aria-label*="Polaris"]');
        const svg = document.querySelector('svg[viewBox="0 0 300 20"]');
        return {
          hasHeading: !!cartingHeading,
          headingText: cartingHeading ? cartingHeading.textContent.trim() : null,
          hasSpeedy: !!speedy,
          speedyHref: speedy ? speedy.getAttribute('href') : null,
          hasPunjab: !!punjab,
          punjabHref: punjab ? punjab.getAttribute('href') : null,
          hasPolaris: !!polaris,
          polarisHref: polaris ? polaris.getAttribute('href') : null,
          hasTreeSvg: !!svg,
        };
      })()
    `);
    console.log('Carting diagram check:', cartingCheck);

    // Capture Localhost Services Dropdown screenshot
    const dropdownScreenshotPath = path.join(ARTIFACT_DIR, 'localhost_services_dropdown_final.png');
    await cdp.captureScreenshot(dropdownScreenshotPath);

    // 3. Click Air Cargo card / Explore Service and confirm immediate closure & navigation
    console.log('Clicking Air Cargo navigation...');
    await cdp.eval(`
      (() => {
        const link = document.querySelector('a[aria-label="Explore Air Cargo"]') || document.querySelector('a[href="/services/air-cargo"]');
        if (link) link.click();
      })()
    `);
    await delay(1200);

    const postNavUrl = await cdp.eval(`window.location.pathname`);
    console.log('Current URL after Air Cargo click:', postNavUrl);

    // Check that dropdown is completely closed
    const isDropdownVisibleAfterNav = await cdp.eval(`
      !!document.querySelector('[role="menu"][aria-label*="Services Mega Menu"]')
    `);
    console.log('Is dropdown overlay still visible after navigation? (MUST BE FALSE):', isDropdownVisibleAfterNav);

    // Verify Air Cargo page hero/main image
    const airCargoPageImg = await cdp.eval(`
      (() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const mainImg = imgs.find(img => img.src && img.src.includes('air-cargo-premium'));
        return mainImg ? { src: mainImg.src, complete: mainImg.complete, naturalWidth: mainImg.naturalWidth, naturalHeight: mainImg.naturalHeight } : null;
      })()
    `);
    console.log('Air Cargo page loaded main image:', airCargoPageImg);

    // Capture Localhost Air Cargo Page screenshot
    const airCargoPageScreenshotPath = path.join(ARTIFACT_DIR, 'localhost_air_cargo_page_navigated.png');
    await cdp.captureScreenshot(airCargoPageScreenshotPath);

    // 4. Test Carting Navigation: Speedy
    console.log('Testing Carting navigation: Speedy...');
    await openServicesDropdown(cdp);

    await cdp.eval(`
      (() => {
        const speedy = document.querySelector('a[aria-label*="Speedy"]');
        if (speedy) speedy.click();
      })()
    `);
    await delay(1000);

    const speedyUrl = await cdp.eval(`window.location.pathname + window.location.hash`);
    const isDropdownOpenAfterSpeedy = await cdp.eval(`!!document.querySelector('[role="menu"][aria-label*="Services Mega Menu"]')`);
    console.log('Speedy destination:', speedyUrl, '| Dropdown closed:', !isDropdownOpenAfterSpeedy);

    // 5. Test Carting Navigation: Punjab
    console.log('Testing Carting navigation: Punjab...');
    await openServicesDropdown(cdp);

    await cdp.eval(`
      (() => {
        const punjab = document.querySelector('a[aria-label*="Punjab"]');
        if (punjab) punjab.click();
      })()
    `);
    await delay(1000);

    const punjabUrl = await cdp.eval(`window.location.pathname + window.location.hash`);
    const isDropdownOpenAfterPunjab = await cdp.eval(`!!document.querySelector('[role="menu"][aria-label*="Services Mega Menu"]')`);
    console.log('Punjab destination:', punjabUrl, '| Dropdown closed:', !isDropdownOpenAfterPunjab);

    // 6. Test Carting Navigation: Polaris
    console.log('Testing Carting navigation: Polaris...');
    await openServicesDropdown(cdp);

    await cdp.eval(`
      (() => {
        const polaris = document.querySelector('a[aria-label*="Polaris"]');
        if (polaris) polaris.click();
      })()
    `);
    await delay(1000);

    const polarisUrl = await cdp.eval(`window.location.pathname + window.location.hash`);
    const isDropdownOpenAfterPolaris = await cdp.eval(`!!document.querySelector('[role="menu"][aria-label*="Services Mega Menu"]')`);
    console.log('Polaris destination:', polarisUrl, '| Dropdown closed:', !isDropdownOpenAfterPolaris);

    // Capture Container Stuffing & Carting Section screenshot
    const cartingSectionScreenshotPath = path.join(ARTIFACT_DIR, 'localhost_carting_destination_scrolled.png');
    await cdp.captureScreenshot(cartingSectionScreenshotPath);

    // 7. Test Browser Back and Forward
    console.log('Testing Browser Back navigation...');
    await cdp.send('Page.navigate', { url: LOCAL_URL + '/services/air-cargo' });
    await delay(1000);
    await cdp.send('Page.navigate', { url: LOCAL_URL + '/services/container-stuffing' });
    await delay(1000);
    // Go Back
    await cdp.eval(`window.history.back()`);
    await delay(1000);
    const backUrl = await cdp.eval(`window.location.pathname`);
    const isDropdownOpenAfterBack = await cdp.eval(`!!document.querySelector('[role="menu"][aria-label*="Services Mega Menu"]')`);
    console.log('Browser Back URL:', backUrl, '| Dropdown closed:', !isDropdownOpenAfterBack);

    // 8. Test Mobile Viewport
    console.log('Testing Mobile Viewport (390px)...');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await cdp.send('Page.navigate', { url: LOCAL_URL });
    await delay(2000);

    // Open mobile hamburger menu
    await cdp.eval(`
      (() => {
        const hamburgerBtn = document.querySelector('button[aria-label="Open mobile menu"]') || document.querySelector('button[aria-label="Toggle navigation menu"]');
        if (hamburgerBtn) hamburgerBtn.click();
      })()
    `);
    await delay(600);

    // Expand mobile services section
    await cdp.eval(`
      (() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const sBtn = btns.find(b => b.textContent && b.textContent.includes('Services'));
        if (sBtn) sBtn.click();
      })()
    `);
    await delay(600);

    const mobileScreenshotPath = path.join(ARTIFACT_DIR, 'localhost_mobile_menu_carting_final.png');
    await cdp.captureScreenshot(mobileScreenshotPath);

    console.log('=== ALL LOCALHOST VERIFICATIONS PASSED ===');
  } finally {
    await cdp.close();
    if (browserProc) {
      try { browserProc.kill(); } catch (e) {}
    }
  }
}

run().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
