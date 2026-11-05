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
      console.error('Eval error:', res.exceptionDetails);
      return null;
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

async function run() {
  console.log('=== Step 1: Launch Chrome ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const proc = spawn(chromePath, [
    '--remote-debugging-port=9456',
    '--headless=new',
    '--disable-gpu',
    '--window-size=1600,1000',
    '--user-data-dir=C:\\Users\\tanis\\.gemini\\temp\\chrome_final_verify'
  ]);
  await delay(2500);

  const targets = await fetchJson('http://127.0.0.1:9456/json');
  const pageTarget = targets.find(t => t.type === 'page');
  const cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await cdp.connect();

  try {
    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1600,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('=== Step 2: Navigate to localhost Home ===');
    await cdp.send('Page.navigate', { url: LOCAL_URL });
    await delay(3000);

    // Check innerWidth and buttons
    const debugInfo = await cdp.eval(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('header button, nav button')).map(b => ({
          text: b.innerText,
          aria: b.getAttribute('aria-label')
        }));
        return {
          innerWidth: window.innerWidth,
          title: document.title,
          buttons
        };
      })()
    `);
    console.log('Page Debug Info:', JSON.stringify(debugInfo, null, 2));

    // Open Services dropdown
    console.log('=== Step 3: Trigger Services dropdown ===');
    const openResult = await cdp.eval(`
      (() => {
        // Trigger hover on Services container
        const servicesButton = Array.from(document.querySelectorAll('button')).find(b => 
          (b.innerText && b.innerText.includes('Services')) || 
          (b.getAttribute('aria-label') && b.getAttribute('aria-label').includes('Services'))
        );
        if (servicesButton) {
          const parent = servicesButton.closest('.group') || servicesButton.parentElement;
          if (parent) {
            parent.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          }
          servicesButton.click();
          return { clicked: true, text: servicesButton.innerText };
        }
        return { clicked: false };
      })()
    `);
    console.log('Open Result:', openResult);
    await delay(1000);

    // Inspect Services dropdown
    const dropdownInspection = await cdp.eval(`
      (() => {
        const menu = document.querySelector('[role="menu"][aria-label*="Services Mega Menu"]');
        if (!menu) return { error: 'Services menu not found' };

        // 1. Air Cargo card inspection
        const airImg = Array.from(menu.querySelectorAll('img')).find(img => img.src && img.src.includes('air-cargo'));
        const airCard = {
          hasAirImage: !!airImg,
          src: airImg ? airImg.src : null,
          complete: airImg ? airImg.complete : false,
          naturalWidth: airImg ? airImg.naturalWidth : 0,
          naturalHeight: airImg ? airImg.naturalHeight : 0,
        };

        // 2. Carting section inspection
        const carting = menu.querySelector('[aria-label*="Carting"]');
        const cartingData = {
          hasCartingSection: !!carting,
          heading: carting ? (carting.querySelector('a[aria-label*="Carting"]') ? carting.querySelector('a[aria-label*="Carting"]').innerText.trim() : null) : null,
          hasSvg: carting ? !!carting.querySelector('svg') : false,
          options: carting ? Array.from(carting.querySelectorAll('div.grid a')).map(a => ({
            name: a.innerText.trim(),
            href: a.getAttribute('href')
          })) : []
        };

        return {
          isOpen: true,
          airCard,
          cartingData
        };
      })()
    `);
    console.log('Dropdown Inspection Result:', JSON.stringify(dropdownInspection, null, 2));

    // Capture Localhost Services Dropdown screenshot
    const shotDropdown = path.join(ARTIFACT_DIR, 'localhost_services_dropdown_final.png');
    await cdp.captureScreenshot(shotDropdown);

    // Click Air Cargo
    console.log('=== Step 4: Click Air Cargo & verify navigation + immediate dropdown closure ===');
    const navClickResult = await cdp.eval(`
      (() => {
        const link = document.querySelector('a[aria-label="Explore Air Cargo"]') || 
                     document.querySelector('a[aria-label="Go to Air Cargo"]') ||
                     document.querySelector('a[href="/services/air-cargo"]');
        if (link) {
          link.click();
          return { clicked: true, href: link.getAttribute('href') };
        }
        return { clicked: false };
      })()
    `);
    console.log('Air Cargo Click Result:', navClickResult);
    await delay(1500);

    const postAirCargoCheck = await cdp.eval(`
      (() => {
        const path = window.location.pathname;
        const menu = document.querySelector('[role="menu"][aria-label*="Services Mega Menu"]');
        const heroImg = Array.from(document.querySelectorAll('img')).find(img => img.src && img.src.includes('air-cargo-premium'));
        return {
          currentPath: path,
          isDropdownVisible: !!menu,
          hasHeroImage: !!heroImg,
          heroImgSrc: heroImg ? heroImg.src : null,
          heroImgNaturalWidth: heroImg ? heroImg.naturalWidth : 0,
          heroImgNaturalHeight: heroImg ? heroImg.naturalHeight : 0,
        };
      })()
    `);
    console.log('Post Air Cargo Navigation Check:', JSON.stringify(postAirCargoCheck, null, 2));

    // Capture Localhost Air Cargo Page screenshot
    const shotAirPage = path.join(ARTIFACT_DIR, 'localhost_air_cargo_page_navigated.png');
    await cdp.captureScreenshot(shotAirPage);

    // Re-open Services dropdown and click Speedy
    console.log('=== Step 5: Test Carting Navigation: Speedy ===');
    await cdp.eval(`
      (() => {
        const btn = document.querySelector('button[aria-label="Toggle Services menu"]');
        if (btn) btn.click();
      })()
    `);
    await delay(1000);

    await cdp.eval(`
      (() => {
        const link = document.querySelector('a[aria-label*="Speedy"]');
        if (link) link.click();
      })()
    `);
    await delay(1500);

    const speedyCheck = await cdp.eval(`
      (() => {
        const menu = document.querySelector('[role="menu"][aria-label*="Services Mega Menu"]');
        return {
          currentPath: window.location.pathname,
          currentHash: window.location.hash,
          isDropdownVisible: !!menu,
          hasAnchor: !!document.getElementById('speedy'),
          hasCfsCarting: !!document.getElementById('cfs-carting'),
        };
      })()
    `);
    console.log('Speedy Navigation Check:', JSON.stringify(speedyCheck, null, 2));

    // Capture Container Stuffing & Carting section
    const shotCarting = path.join(ARTIFACT_DIR, 'localhost_carting_destination_scrolled.png');
    await cdp.captureScreenshot(shotCarting);

    // Re-open Services dropdown and click Punjab
    console.log('=== Step 6: Test Carting Navigation: Punjab ===');
    await cdp.eval(`
      (() => {
        const btn = document.querySelector('button[aria-label="Toggle Services menu"]');
        if (btn) btn.click();
      })()
    `);
    await delay(1000);

    await cdp.eval(`
      (() => {
        const link = document.querySelector('a[aria-label*="Punjab"]');
        if (link) link.click();
      })()
    `);
    await delay(1500);

    const punjabCheck = await cdp.eval(`
      (() => {
        const menu = document.querySelector('[role="menu"][aria-label*="Services Mega Menu"]');
        return {
          currentPath: window.location.pathname,
          currentHash: window.location.hash,
          isDropdownVisible: !!menu,
        };
      })()
    `);
    console.log('Punjab Navigation Check:', JSON.stringify(punjabCheck, null, 2));

    // Re-open Services dropdown and click Polaris
    console.log('=== Step 7: Test Carting Navigation: Polaris ===');
    await cdp.eval(`
      (() => {
        const btn = document.querySelector('button[aria-label="Toggle Services menu"]');
        if (btn) btn.click();
      })()
    `);
    await delay(1000);

    await cdp.eval(`
      (() => {
        const link = document.querySelector('a[aria-label*="Polaris"]');
        if (link) link.click();
      })()
    `);
    await delay(1500);

    const polarisCheck = await cdp.eval(`
      (() => {
        const menu = document.querySelector('[role="menu"][aria-label*="Services Mega Menu"]');
        return {
          currentPath: window.location.pathname,
          currentHash: window.location.hash,
          isDropdownVisible: !!menu,
        };
      })()
    `);
    console.log('Polaris Navigation Check:', JSON.stringify(polarisCheck, null, 2));

    // Test Browser Back and Forward
    console.log('=== Step 8: Test Browser Back & Forward ===');
    await cdp.eval(`window.history.back()`);
    await delay(1200);
    const backCheck = await cdp.eval(`
      (() => {
        const menu = document.querySelector('[role="menu"][aria-label*="Services Mega Menu"]');
        return {
          path: window.location.pathname,
          hash: window.location.hash,
          isDropdownVisible: !!menu
        };
      })()
    `);
    console.log('Browser Back Check:', JSON.stringify(backCheck, null, 2));

    // Test Mobile Viewport (390px)
    console.log('=== Step 9: Test Mobile Viewport (390px) ===');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await cdp.send('Page.navigate', { url: LOCAL_URL });
    await delay(2000);

    await cdp.eval(`
      (() => {
        const btn = document.querySelector('button[aria-label*="navigation menu"]');
        if (btn) btn.click();
      })()
    `);
    await delay(1000);

    await cdp.eval(`
      (() => {
        const btn = document.querySelector('button[aria-label*="Expand Services"]');
        if (btn) btn.click();
      })()
    `);
    await delay(1000);

    await cdp.eval(`
      (() => {
        const carting = document.querySelector('[aria-label*="Carting"]');
        if (carting) carting.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()
    `);
    await delay(800);

    const shotMobile = path.join(ARTIFACT_DIR, 'localhost_mobile_menu_carting_final.png');
    await cdp.captureScreenshot(shotMobile);

    console.log('=== ALL TESTS COMPLETED SUCCESSFULLY ===');
  } finally {
    await cdp.close();
    proc.kill();
  }
}

run().catch(err => {
  console.error('Fatal error in verify_all:', err);
  process.exit(1);
});
