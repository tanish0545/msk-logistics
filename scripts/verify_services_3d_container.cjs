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
  const remotePort = 9325;
  const userDataDir = path.join(process.env.TEMP || 'C:\\Temp', 'chrome_cdp_container08_' + Date.now());

  console.log(`Launching Chrome on port ${remotePort}...`);
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${remotePort}`,
    `--user-data-dir=${userDataDir}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,960',
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

    if (!version) {
      throw new Error('Failed to connect to Chrome debugging port.');
    }

    const targets = await fetchJson(`http://127.0.0.1:${remotePort}/json/list`);
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('DOM.enable');
    await client.send('Runtime.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 960,
      deviceScaleFactor: 1,
      mobile: false,
    });

    console.log(`Navigating to ${TARGET_HOST}/ ...`);
    await client.send('Page.navigate', { url: TARGET_HOST });
    await sleep(2500);

    // Open Services dropdown cleanly by clicking toggle button or triggering mouseenter
    console.log('Triggering Services dropdown open...');
    const opened = await client.eval(`(() => {
      const links = Array.from(document.querySelectorAll('header nav a, a[href="/services"]'));
      const servicesLink = links.find(l => l.innerText && l.innerText.trim().startsWith('Services'));
      if (servicesLink) {
        const toggleBtn = servicesLink.querySelector('button');
        if (toggleBtn) {
          toggleBtn.click();
          return { method: 'button.click' };
        }
        const parent = servicesLink.closest('.relative.h-full');
        if (parent) {
          parent.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          return { method: 'mouseenter' };
        }
      }
      return { method: 'none' };
    })()`);

    console.log('Open method executed:', opened);
    await sleep(800);

    // Verify Dropdown Contents
    const dropdownInspection = await client.eval(`(() => {
      const menu = document.querySelector('[role="menu"][aria-label*="Services"]');
      if (!menu) return { open: false };
      const rect = menu.getBoundingClientRect();

      // Check MSK logo on left door
      const logo = menu.querySelector('img[src*="msk-logistics-logo"]');
      
      // Check all service links
      const serviceLinks = Array.from(menu.querySelectorAll('a[href^="/services/"]')).map(a => ({
        name: a.querySelector('.font-bold')?.textContent?.trim() || a.textContent.trim(),
        href: a.getAttribute('href'),
        rect: {
          left: Math.round(a.getBoundingClientRect().left),
          top: Math.round(a.getBoundingClientRect().top),
          width: Math.round(a.getBoundingClientRect().width),
          height: Math.round(a.getBoundingClientRect().height)
        },
        hasImg: !!a.querySelector('img'),
      }));

      // Check CARTING tree
      const spans = Array.from(menu.querySelectorAll('span')).map(s => s.textContent.trim());
      const hasCarting = spans.includes('CARTING');
      const hasSpeedy = spans.includes('Speedy');
      const hasPunjab = spans.includes('Punjab');
      const hasPolaris = spans.includes('Polaris');

      // Check 3D Container specific markings
      const hasLeftDoor = menu.textContent.includes('DOOR 01-L');
      const hasRightDoor = menu.textContent.includes('DOOR 02-R');
      const hasContainerID = menu.textContent.includes('MSKU 2026-HC');
      const hasCSCSafety = menu.textContent.includes('CSC SAFETY APPROVAL');

      return {
        open: true,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        hasLogo: !!logo,
        serviceCount: serviceLinks.length,
        services: serviceLinks,
        hasCarting,
        hasSpeedy,
        hasPunjab,
        hasPolaris,
        hasLeftDoor,
        hasRightDoor,
        hasContainerID,
        hasCSCSafety
      };
    })()`);

    console.log('Dropdown Inspection Result:', JSON.stringify(dropdownInspection, null, 2));

    // Capture Default Screenshot
    await sleep(400);
    const defaultShotPath = path.join(ARTIFACT_DIR, 'live_services_idea08_3d_container_default.png');
    await client.screenshot(defaultShotPath, { x: 0, y: 0, width: 1440, height: 600, scale: 1 });

    // Hover over Hazardous Cargo card
    const hazardService = dropdownInspection.services?.find(s => s.href === '/services/hazardous-cargo');
    if (hazardService && hazardService.rect) {
      console.log('Hovering over Hazardous Cargo card...');
      await client.send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: hazardService.rect.left + hazardService.rect.width / 2,
        y: hazardService.rect.top + hazardService.rect.height / 2,
      });
      await sleep(500);

      const hoverHazardPath = path.join(ARTIFACT_DIR, 'live_services_idea08_3d_container_hover_hazard.png');
      await client.screenshot(hoverHazardPath, { x: 0, y: 0, width: 1440, height: 600, scale: 1 });
    }

    // Hover over Ocean Cargo card
    const oceanService = dropdownInspection.services?.find(s => s.href === '/services/ocean-cargo');
    if (oceanService && oceanService.rect) {
      console.log('Hovering over Ocean Cargo card...');
      await client.send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: oceanService.rect.left + oceanService.rect.width / 2,
        y: oceanService.rect.top + oceanService.rect.height / 2,
      });
      await sleep(500);

      const hoverOceanPath = path.join(ARTIFACT_DIR, 'live_services_idea08_3d_container_hover_ocean.png');
      await client.screenshot(hoverOceanPath, { x: 0, y: 0, width: 1440, height: 600, scale: 1 });
    }

    // Mobile layout test at 390px
    console.log('Testing Mobile Drawer at 390px...');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(500);

    // Click Hamburger Button (xl:hidden)
    await client.eval(`(() => {
      const btn = document.querySelector('button[aria-label="Open navigation menu"]') ||
                  document.querySelector('header button[aria-expanded]');
      if (btn) btn.click();
    })()`);
    await sleep(700);

    // Click Expand Services list button
    await client.eval(`(() => {
      const expandBtn = document.querySelector('button[aria-label="Expand Services list"]') ||
                        Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('aria-label') === 'Expand Services list');
      if (expandBtn) expandBtn.click();
    })()`);
    await sleep(700);

    const mobileShotPath = path.join(ARTIFACT_DIR, 'live_services_idea08_3d_container_mobile_390px.png');
    await client.screenshot(mobileShotPath, { x: 0, y: 0, width: 390, height: 844, scale: 1 });

    client.close();
    console.log('All verifications and screenshots completed successfully!');
  } finally {
    try {
      chromeProc.kill();
    } catch (e) {}
  }
}

run().catch((err) => {
  console.error('Error during verification:', err);
  process.exit(1);
});
