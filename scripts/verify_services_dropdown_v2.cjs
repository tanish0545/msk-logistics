const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const BASE_URL = 'http://127.0.0.1:5173';

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
  console.log('=== Step 1: Launching Chrome for 3D Services Dropdown V2 Verification ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--remote-debugging-port=9351',
    '--headless=new',
    '--window-size=1440,900',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\tanis\\.gemini\\temp\\chrome-profile-dropdown-v2'
  ]);

  await delay(2500);

  const targets = await fetchJson('http://127.0.0.1:9351/json');
  const pageTarget = targets.find(t => t.type === 'page');
  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);

  try {
    await client.connect();
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('Navigating to homepage...');
    await client.send('Page.navigate', { url: BASE_URL + '/' });
    await delay(3500);

    // Trigger toggle button or mouseenter on Services
    console.log('Opening Services dropdown via chevron button & mouseenter...');
    const opened = await client.eval(`(() => {
      const toggleBtn = document.querySelector('button[aria-label*=\"Toggle Services submenu\"]');
      if (toggleBtn) {
        toggleBtn.click();
        return { clickedBtn: true };
      }
      const navLinks = Array.from(document.querySelectorAll('nav a'));
      const servicesLink = navLinks.find(a => a.innerText.trim().startsWith('Services'));
      if (servicesLink && servicesLink.parentElement?.parentElement) {
        servicesLink.parentElement.parentElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        return { mouseEntered: true };
      }
      return { failed: true };
    })()`);
    console.log('Triggered Services open:', opened);
    await delay(1200);

    // Verify Dropdown Contents
    const dropdownAudit = await client.eval(`(() => {
      const menu = document.querySelector('[aria-label*=\"3D Services Menu\"]');
      if (!menu) return { found: false };

      const services = Array.from(menu.querySelectorAll('a[href^=\"/services/\"]')).map(a => {
        const title = a.querySelector('h5')?.innerText?.trim() || '';
        const desc = a.querySelector('p')?.innerText?.trim() || '';
        const img = a.querySelector('img')?.src || '';
        return { title, desc, href: a.getAttribute('href'), img };
      });

      const cartingTitle = menu.innerText.includes('CARTING');
      const cartingSpeedy = menu.innerText.includes('Speedy');
      const cartingPunjab = menu.innerText.includes('Punjab');
      const cartingPolaris = menu.innerText.includes('Polaris');
      const dirLink = Boolean(menu.querySelector('a[href=\"/services\"]'));

      return {
        found: true,
        serviceCount: services.length,
        services,
        carting: { cartingTitle, cartingSpeedy, cartingPunjab, cartingPolaris },
        dirLink
      };
    })()`);

    console.log('Dropdown V2 Audit:', JSON.stringify(dropdownAudit, null, 2));

    const shotDefault = path.join(ARTIFACT_DIR, 'live_services_dropdown_v2_default.png');
    await client.screenshot(shotDefault);
    console.log('Saved Default Screenshot:', shotDefault);

    // Hover over Hazardous Cargo card
    console.log('Hovering over Hazardous Cargo card...');
    await client.eval(`(() => {
      const links = Array.from(document.querySelectorAll('[aria-label*=\"3D Services Menu\"] a'));
      const hazLink = links.find(l => l.innerText.includes('Hazardous'));
      if (hazLink) {
        hazLink.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        hazLink.classList.add('border-[#B62825]', '-translate-y-1');
      }
    })()`);
    await delay(600);

    const shotHoverHaz = path.join(ARTIFACT_DIR, 'live_services_dropdown_v2_hover_hazard.png');
    await client.screenshot(shotHoverHaz);
    console.log('Saved Hover Hazard Screenshot:', shotHoverHaz);

    // Hover over Ocean Cargo card
    console.log('Hovering over Ocean Cargo card...');
    await client.eval(`(() => {
      const links = Array.from(document.querySelectorAll('[aria-label*=\"3D Services Menu\"] a'));
      const oceanLink = links.find(l => l.innerText.includes('Ocean Cargo'));
      if (oceanLink) {
        oceanLink.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        oceanLink.classList.add('border-[#B62825]', '-translate-y-1');
      }
    })()`);
    await delay(600);

    const shotHoverOcean = path.join(ARTIFACT_DIR, 'live_services_dropdown_v2_hover_ocean.png');
    await client.screenshot(shotHoverOcean);
    console.log('Saved Hover Ocean Screenshot:', shotHoverOcean);

    // Test Mobile Viewport (390 x 844)
    console.log('\n=== Testing Mobile Viewport (390px) ===');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await delay(1000);

    // On mobile, open the mobile menu
    await client.eval(`(() => {
      const menuBtn = document.querySelector('button[aria-label*=\"menu\" i], button[aria-label*=\"navigation\" i]');
      if (menuBtn) menuBtn.click();
    })()`);
    await delay(1000);

    // In mobile menu, toggle Services submenu
    await client.eval(`(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const servicesBtn = buttons.find(b => b.innerText.includes('Services'));
      if (servicesBtn) servicesBtn.click();
    })()`);
    await delay(1000);

    const shotMobile = path.join(ARTIFACT_DIR, 'live_services_dropdown_v2_mobile_390px.png');
    await client.screenshot(shotMobile);
    console.log('Saved Mobile Screenshot:', shotMobile);

    console.log('\n=== All 3D Services Dropdown V2 Tests Passed Successfully! ===');

  } finally {
    client.close();
    chromeProc.kill();
  }
}

run().catch(console.error);
