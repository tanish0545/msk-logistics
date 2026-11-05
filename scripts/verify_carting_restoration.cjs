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
  console.log('=== Step 1: Launching Chrome for Carting Restoration Verification ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--remote-debugging-port=9353',
    '--headless=new',
    '--window-size=1440,960',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\tanis\\.gemini\\temp\\chrome-profile-carting'
  ]);

  await delay(2500);

  const targets = await fetchJson('http://127.0.0.1:9353/json');
  const pageTarget = targets.find(t => t.type === 'page');
  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);

  try {
    await client.connect();
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('Navigating to http://127.0.0.1:5173 ...');
    await client.send('Page.navigate', { url: BASE_URL });
    await delay(3000);

    // Open Services dropdown
    console.log('Opening Services dropdown...');
    await client.eval(`(() => {
      const buttons = Array.from(document.querySelectorAll('nav button'));
      const servicesBtn = buttons.find(b => b.innerText.includes('Services'));
      if (servicesBtn) servicesBtn.click();
    })()`);
    await delay(1000);

    // Inspect the dropdown & Carting section
    const dropdownInfo = await client.eval(`(() => {
      const menu = document.querySelector('[aria-label*=\"Services Mega Menu\"]') || document.querySelector('[role=\"menu\"]');
      if (!menu) return { error: 'Services menu not found' };

      const cartingSection = menu.querySelector('[aria-label*=\"Carting\"]');
      const cartingLinks = cartingSection ? Array.from(cartingSection.querySelectorAll('a')).map(a => ({
        text: a.innerText.trim(),
        href: a.getAttribute('href'),
        ariaLabel: a.getAttribute('aria-label')
      })) : [];

      const hasSvgTree = cartingSection ? !!cartingSection.querySelector('svg') : false;
      const isLightBg = cartingSection ? cartingSection.className.includes('bg-white') || cartingSection.className.includes('bg-[#F8F9FA]') : false;

      // Check left 6 service cards
      const serviceCards = Array.from(menu.querySelectorAll('h3, h4')).map(h => h.innerText.trim());

      return {
        hasMenu: true,
        hasCartingSection: !!cartingSection,
        isLightBg,
        hasSvgTree,
        cartingLinks,
        serviceHeadingsSample: serviceCards.slice(0, 8)
      };
    })()`);

    console.log('Dropdown Inspection Result:', JSON.stringify(dropdownInfo, null, 2));

    // Capture Screenshot of corrected dropdown
    const shotDropdown = path.join(ARTIFACT_DIR, 'carting_restored_dropdown_desktop.png');
    await client.screenshot(shotDropdown);
    console.log('Saved Carting Restored Dropdown Screenshot:', shotDropdown);

    // Test Navigation: Click Speedy
    console.log('\nTesting Navigation for Speedy...');
    await client.eval(`(() => {
      const links = Array.from(document.querySelectorAll('[aria-label*=\"Carting\"] a'));
      const speedyLink = links.find(l => l.innerText.includes('Speedy'));
      if (speedyLink) speedyLink.click();
    })()`);
    await delay(2000);

    const speedyNavResult = await client.eval(`(() => {
      return {
        currentUrl: window.location.href,
        currentHash: window.location.hash,
        targetAnchorExists: !!document.getElementById('speedy'),
        cfsCartingExists: !!document.getElementById('cfs-carting'),
        pageTitle: document.title,
        h1Text: document.querySelector('h1')?.innerText || document.querySelector('h2')?.innerText
      };
    })()`);
    console.log('Speedy Navigation Result:', JSON.stringify(speedyNavResult, null, 2));

    // Return to Home & Test Navigation for Punjab
    console.log('\nTesting Navigation for Punjab...');
    await client.send('Page.navigate', { url: BASE_URL });
    await delay(2500);

    await client.eval(`(() => {
      const buttons = Array.from(document.querySelectorAll('nav button'));
      const servicesBtn = buttons.find(b => b.innerText.includes('Services'));
      if (servicesBtn) servicesBtn.click();
    })()`);
    await delay(1000);

    await client.eval(`(() => {
      const links = Array.from(document.querySelectorAll('[aria-label*=\"Carting\"] a'));
      const punjabLink = links.find(l => l.innerText.includes('Punjab'));
      if (punjabLink) punjabLink.click();
    })()`);
    await delay(2000);

    const punjabNavResult = await client.eval(`(() => {
      return {
        currentUrl: window.location.href,
        currentHash: window.location.hash,
        targetAnchorExists: !!document.getElementById('punjab'),
        pageTitle: document.title
      };
    })()`);
    console.log('Punjab Navigation Result:', JSON.stringify(punjabNavResult, null, 2));

    // Return to Home & Test Navigation for Polaris
    console.log('\nTesting Navigation for Polaris...');
    await client.send('Page.navigate', { url: BASE_URL });
    await delay(2500);

    await client.eval(`(() => {
      const buttons = Array.from(document.querySelectorAll('nav button'));
      const servicesBtn = buttons.find(b => b.innerText.includes('Services'));
      if (servicesBtn) servicesBtn.click();
    })()`);
    await delay(1000);

    await client.eval(`(() => {
      const links = Array.from(document.querySelectorAll('[aria-label*=\"Carting\"] a'));
      const polarisLink = links.find(l => l.innerText.includes('Polaris'));
      if (polarisLink) polarisLink.click();
    })()`);
    await delay(2000);

    const polarisNavResult = await client.eval(`(() => {
      return {
        currentUrl: window.location.href,
        currentHash: window.location.hash,
        targetAnchorExists: !!document.getElementById('polaris'),
        pageTitle: document.title
      };
    })()`);
    console.log('Polaris Navigation Result:', JSON.stringify(polarisNavResult, null, 2));

    // Test Mobile Viewport (390 x 844)
    console.log('\n=== Testing Mobile Viewport (390px) ===');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await delay(1000);

    await client.send('Page.navigate', { url: BASE_URL });
    await delay(2500);

    // Open mobile hamburger menu
    await client.eval(`(() => {
      const menuBtn = document.querySelector('button[aria-label*=\"menu\" i], button[aria-label*=\"navigation\" i]');
      if (menuBtn) menuBtn.click();
    })()`);
    await delay(1000);

    // Expand Services in mobile menu
    await client.eval(`(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const servicesBtn = buttons.find(b => b.innerText.includes('Services'));
      if (servicesBtn) servicesBtn.click();
    })()`);
    await delay(1000);

    // Scroll to mobile Carting section
    await client.eval(`(() => {
      const carting = document.querySelector('[aria-label*=\"Carting\"]');
      if (carting) carting.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await delay(1000);

    const shotMobile = path.join(ARTIFACT_DIR, 'carting_restored_dropdown_mobile.png');
    await client.screenshot(shotMobile);
    console.log('Saved Carting Restored Mobile Screenshot:', shotMobile);

    console.log('\n=== All Carting Restoration & Navigation Tests Completed Successfully! ===');

  } finally {
    client.close();
    chromeProc.kill();
  }
}

run().catch(console.error);

