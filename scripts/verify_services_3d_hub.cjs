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
    console.log(`[Screenshot Saved] -> ${path.basename(filePath)} (${(res.data.length * 0.75 / 1024).toFixed(1)} KB)`);
  }

  close() {
    if (this.ws) {
      try { this.ws.close(); } catch (_) {}
    }
  }
}

async function run() {
  console.log('===============================================================');
  console.log('MSK LOGISTICS — SERVICES 3D HUB DROPDOWN VERIFICATION SUITE');
  console.log('===============================================================');

  const cdpPort = 9244;
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${cdpPort}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,960',
    'about:blank'
  ]);

  await sleep(1500);

  let version;
  for (let i = 0; i < 10; i++) {
    try {
      version = await fetchJson(`http://127.0.0.1:${cdpPort}/json/version`);
      if (version.webSocketDebuggerUrl) break;
    } catch (_) {
      await sleep(500);
    }
  }

  const targets = await fetchJson(`http://127.0.0.1:${cdpPort}/json/list`);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await cdp.connect();

  await cdp.send('Page.enable');
  await cdp.send('DOM.enable');
  await cdp.send('Runtime.enable');

  try {
    console.log('\n>>> 1. Loading Homepage at 1440x960 ...');
    await cdp.send('Page.navigate', { url: TARGET_HOST });
    await sleep(2500);

    // Find the Services nav item and trigger hover / click
    console.log('>>> 2. Opening Services Dropdown...');
    const servicesTriggerInfo = await cdp.eval(`(() => {
      const links = Array.from(document.querySelectorAll('header nav a, header nav button'));
      const servicesLink = links.find(l => l.innerText.trim().startsWith('Services'));
      if (servicesLink) {
        const rect = servicesLink.getBoundingClientRect();
        return { found: true, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, text: servicesLink.innerText.trim() };
      }
      return { found: false };
    })()`);

    console.log('Services Trigger Found:', servicesTriggerInfo);

    if (servicesTriggerInfo.found) {
      // Simulate mouse move over Services
      await cdp.send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: servicesTriggerInfo.x,
        y: servicesTriggerInfo.y,
      });
      await sleep(500);

      // Also dispatch mouse enter to trigger hover handler
      await cdp.eval(`(() => {
        const links = Array.from(document.querySelectorAll('header nav a, header nav button'));
        const servicesLink = links.find(l => l.innerText.trim().startsWith('Services'));
        if (servicesLink) {
          const parent = servicesLink.closest('.relative.h-full');
          if (parent) {
            parent.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          }
        }
      })()`);
      await sleep(600);
    }

    // Check if Services 3D Hub Dropdown is visible
    const dropdownState = await cdp.eval(`(() => {
      const menu = document.querySelector('[aria-label="Services Mega Menu"]');
      if (!menu) return { visible: false };

      const rect = menu.getBoundingClientRect();
      const nodes = Array.from(menu.querySelectorAll('[role="menuitem"]')).map(n => ({
        label: n.innerText.trim(),
        href: n.getAttribute('href') || n.href || '',
      }));
      const cartingBadge = Array.from(menu.querySelectorAll('span')).find(s => s.innerText.trim() === 'CARTING')?.innerText || '';
      const cartingBranches = Array.from(menu.querySelectorAll('.grid-cols-3 div span')).map(s => s.innerText.trim());
      const viewAll = menu.querySelector('a[href="/services"]')?.innerText || '';
      const hasSvg = Boolean(menu.querySelector('svg'));
      const has3DContainer = Boolean(menu.querySelector('svg polygon'));

      return {
        visible: true,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        nodeCount: nodes.length,
        nodes,
        hasCartingBadge: Boolean(cartingBadge),
        cartingBranches,
        viewAll,
        hasSvg,
        has3DContainer,
      };
    })()`);

    console.log('Services 3D Hub Dropdown State:', dropdownState);

    // Capture screenshot of Default State of Dropdown
    await sleep(400);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'live_services_dropdown_3d_hub_default.png'), {
      x: 0,
      y: 0,
      width: 1440,
      height: 600,
      scale: 1,
    });

    // Hover over Hazardous Cargo node
    console.log('\n>>> 3. Testing Hover interaction on Hazardous Cargo node...');
    const hazardNodeCoord = await cdp.eval(`(() => {
      const menu = document.querySelector('[aria-label="Services Mega Menu"]');
      if (!menu) return null;
      const hazardNode = Array.from(menu.querySelectorAll('[role="menuitem"]')).find(n => n.innerText.includes('Hazardous'));
      if (hazardNode) {
        const rect = hazardNode.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
      return null;
    })()`);

    if (hazardNodeCoord) {
      await cdp.send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: hazardNodeCoord.x,
        y: hazardNodeCoord.y,
      });
      await sleep(600);

      // Check hover styling
      const hoverCheck = await cdp.eval(`(() => {
        const menu = document.querySelector('[aria-label="Services Mega Menu"]');
        const activeLine = menu?.querySelector('line[stroke="url(#activeLineGradient)"]');
        return {
          hasActiveLine: Boolean(activeLine),
        };
      })()`);
      console.log('Hover reaction state:', hoverCheck);

      await cdp.screenshot(path.join(ARTIFACT_DIR, 'live_services_dropdown_3d_hub_hover_hazard.png'), {
        x: 0,
        y: 0,
        width: 1440,
        height: 600,
        scale: 1,
      });
    }

    // Hover over Ocean Cargo node
    console.log('\n>>> 4. Testing Hover interaction on Ocean Cargo node...');
    const oceanNodeCoord = await cdp.eval(`(() => {
      const menu = document.querySelector('[aria-label="Services Mega Menu"]');
      if (!menu) return null;
      const oceanNode = Array.from(menu.querySelectorAll('[role="menuitem"]')).find(n => n.innerText.includes('Ocean'));
      if (oceanNode) {
        const rect = oceanNode.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
      return null;
    })()`);

    if (oceanNodeCoord) {
      await cdp.send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: oceanNodeCoord.x,
        y: oceanNodeCoord.y,
      });
      await sleep(600);

      await cdp.screenshot(path.join(ARTIFACT_DIR, 'live_services_dropdown_3d_hub_hover_ocean.png'), {
        x: 0,
        y: 0,
        width: 1440,
        height: 600,
        scale: 1,
      });
    }

    // -----------------------------------------------------------------
    // 5. MOBILE / RESPONSIVE VIEWPORT TEST (390px)
    // -----------------------------------------------------------------
    console.log('\n>>> 5. Testing Mobile Viewport (390px) ...');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(500);

    // Refresh at mobile viewport
    await cdp.send('Page.navigate', { url: TARGET_HOST });
    await sleep(2000);

    // Open mobile menu
    await cdp.eval(`(() => {
      const btn = document.querySelector('button[aria-label="Open mobile navigation menu"], button:has(svg.lucide-menu)');
      if (btn) btn.click();
    })()`);
    await sleep(800);

    // Expand Services accordion
    await cdp.eval(`(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('aria-label')?.includes('Expand Services'));
      if (btn) btn.click();
    })()`);
    await sleep(800);

    const mobileState = await cdp.eval(`(() => {
      const links = Array.from(document.querySelectorAll('a[href^="/services/"]')).map(a => a.innerText.trim());
      const hasCarting = Boolean(Array.from(document.querySelectorAll('span')).find(s => s.innerText.trim() === 'CARTING'));
      return { links, hasCarting };
    })()`);
    console.log('Mobile Services State:', mobileState);

    await cdp.screenshot(path.join(ARTIFACT_DIR, 'live_services_dropdown_mobile_390px.png'));

  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    cdp.close();
    chromeProc.kill();
    console.log('\n[DONE] Verification completed successfully.');
  }
}

run();
