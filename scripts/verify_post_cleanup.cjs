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
  console.log('=== Step 1: Launching Chrome for Post-Cleanup Verification ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--remote-debugging-port=9345',
    '--headless=new',
    '--window-size=1440,900',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\tanis\\.gemini\\temp\\chrome-profile-post-cleanup'
  ]);

  await delay(2500);

  const targets = await fetchJson('http://127.0.0.1:9345/json');
  const pageTarget = targets.find(t => t.type === 'page');
  if (!pageTarget) throw new Error('No page target found');

  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);

  const networkErrors = [];
  try {
    await client.connect();
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Network.enable');

    client.ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data.toString());
      if (msg.method === 'Network.responseReceived') {
        const resp = msg.params.response;
        if (resp.status >= 400 && !resp.url.includes('favicon')) {
          networkErrors.push({ url: resp.url, status: resp.status });
        }
      }
    });

    console.log('=== Step 2: Testing Homepage Hero & Dropdown ===');
    await client.send('Page.navigate', { url: BASE_URL + '/' });
    await delay(3500);

    const homeAudit = await client.eval(`(() => {
      const heroImg = document.querySelector('img[alt*=\"Sunset intermodal\"], img[alt*=\"MSK Logistics\"]');
      const heroReady = heroImg ? { complete: heroImg.complete, naturalWidth: heroImg.naturalWidth, src: heroImg.src } : null;
      const images = Array.from(document.images);
      return {
        title: document.title,
        heroReady,
        totalImages: images.length,
        textLength: document.body.innerText.trim().length
      };
    })()`);
    console.log('Home Page Audit:', homeAudit);

    const homeScreenshot = path.join(ARTIFACT_DIR, 'post_cleanup_homepage.png');
    await client.screenshot(homeScreenshot);
    console.log('Saved:', homeScreenshot);

    console.log('\n=== Step 3: Auditing Every Route in the Application ===');
    const routesToTest = [
      { path: '/about', name: 'About' },
      { path: '/services', name: 'Services' },
      { path: '/services/export-packaging', name: 'Export Packaging' },
      { path: '/services/container-stuffing', name: 'Container Stuffing' },
      { path: '/services/cargo-lashing', name: 'Cargo Lashing' },
      { path: '/services/hazardous-cargo', name: 'Hazardous Cargo' },
      { path: '/container-guide', name: 'Container Guide' },
      { path: '/warehouse', name: 'Warehouse' },
      { path: '/import-export', name: 'Import Export' },
      { path: '/road-transport', name: 'Road Transport' },
      { path: '/operations', name: 'Operations' },
      { path: '/contact', name: 'Contact' },
      { path: '/request-quote', name: 'Quote' }
    ];

    const routeAudits = [];
    for (const r of routesToTest) {
      console.log(`Checking route: ${r.path} (${r.name})...`);
      await client.send('Page.navigate', { url: BASE_URL + r.path });
      await delay(2500);

      // Scroll to trigger any lazy images on the page
      await client.eval('window.scrollTo(0, 2000)');
      await delay(800);
      await client.eval('window.scrollTo(0, 0)');
      await delay(400);

      const audit = await client.eval(`(() => {
        const textLen = document.body.innerText.trim().length;
        const images = Array.from(document.images);
        const broken = images.filter(img => img.complete && img.naturalWidth === 0 && !img.src.endsWith('.svg'));
        const loaded = images.filter(img => img.complete && img.naturalWidth > 0);
        return {
          route: '${r.path}',
          textLen,
          totalImages: images.length,
          loadedCount: loaded.length,
          brokenCount: broken.length,
          brokenUrls: broken.map(b => b.src)
        };
      })()`);

      console.log(`  -> Text: ${audit.textLen} chars, Images: ${audit.loadedCount}/${audit.totalImages} loaded, Broken: ${audit.brokenCount}`);
      routeAudits.push(audit);

      if (r.path === '/services/hazardous-cargo') {
        const hazScreenshot = path.join(ARTIFACT_DIR, 'post_cleanup_hazardous_cargo.png');
        await client.screenshot(hazScreenshot);
        console.log('  Saved:', hazScreenshot);
      } else if (r.path === '/container-guide') {
        const cgScreenshot = path.join(ARTIFACT_DIR, 'post_cleanup_container_guide.png');
        await client.screenshot(cgScreenshot);
        console.log('  Saved:', cgScreenshot);
      }
    }

    console.log('\n=== Step 4: Verification Summary ===');
    console.log('Total Routes Tested:', routeAudits.length);
    const totalBrokenAcrossRoutes = routeAudits.reduce((acc, cur) => acc + cur.brokenCount, 0);
    console.log('Total Broken Images Across All Routes:', totalBrokenAcrossRoutes);
    console.log('Network 4xx/5xx Errors:', networkErrors);

    const report = {
      timestamp: new Date().toISOString(),
      homeAudit,
      routeAudits,
      networkErrors,
      passed: totalBrokenAcrossRoutes === 0 && networkErrors.length === 0
    };

    fs.writeFileSync(
      path.join(ARTIFACT_DIR, 'post_cleanup_verification_report.json'),
      JSON.stringify(report, null, 2)
    );
    console.log('Verification report written to post_cleanup_verification_report.json');

  } finally {
    client.close();
    chromeProc.kill();
  }
}

run().catch(err => {
  console.error('Error during post-cleanup test:', err);
  process.exit(1);
});
