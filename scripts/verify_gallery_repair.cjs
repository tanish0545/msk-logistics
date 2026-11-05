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
      console.error('CDP Eval Exception:', JSON.stringify(res.exceptionDetails));
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
  console.log('MSK LOGISTICS — COMPREHENSIVE VERIFICATION & SCREENSHOT SUITE');
  console.log('===============================================================');

  const cdpPort = 9231;
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

  const report = {
    containerGuide: {},
    hazardousCargo: {},
    operationsPage: {},
    homepageGallery: {},
    internalLabelScan: { totalMatches: 0, details: [] },
  };

  try {
    // -----------------------------------------------------------------
    // 1. CONTAINER GUIDE VERIFICATION
    // -----------------------------------------------------------------
    console.log('\n>>> 1. AUDITING /container-guide ...');
    await cdp.send('Page.navigate', { url: `${TARGET_HOST}/container-guide` });
    await sleep(2500);

    // Scan for any forbidden internal labels
    const forbiddenLabels = ['AUTHENTIC CLIENT PHOTO', 'AUTHENTIC FIELD PHOTO', 'AUTHENTIC JNPT FIELD RECORDS', 'IMG-20261022-WA', 'WA00'];
    const pageText = await cdp.eval('document.body.innerText');
    for (const term of forbiddenLabels) {
      const count = (pageText.match(new RegExp(term, 'gi')) || []).length;
      if (count > 0) {
        report.internalLabelScan.totalMatches += count;
        report.internalLabelScan.details.push({ page: '/container-guide', term, count });
      }
    }

    // Verify all container selector tabs
    const containerTabs = await cdp.eval(`
      Array.from(document.querySelectorAll('button')).filter(b => {
        const t = b.innerText.trim();
        return ["20' GP", "40' GP", "40' HC", "40' HC HD", "Open Top", "Flat Rack", "Reefer"].some(c => t.includes(c));
      }).map(b => b.innerText.trim())
    `);
    console.log('Found Container Selector Tabs:', containerTabs);

    const testContainers = [
      { key: "40' HC", expectedExterior: '40ft-high-cube-exterior.jpg', forbidden: ['container-stuffing', 'container-40ft-high-cube.jpg'] },
      { key: "40' HC HD", expectedExterior: '40ft-high-cube-heavy-duty-exterior.jpg' },
      { key: "Reefer", expectedDetail: 'reefer-machinery-detail.jpg' },
      { key: "Flat Rack", expectedExterior: 'flat-rack-exterior.jpg' },
      { key: "Open Top", expectedExterior: 'open-top-exterior.jpg' },
      { key: "20' GP", expectedExterior: '20ft-standard-dry-exterior.jpg' },
      { key: "40' GP", expectedExterior: '40ft-standard-dry-exterior.jpg' },
    ];

    for (const c of testContainers) {
      console.log(`\nTesting Container Tab: ${c.key}...`);
      await cdp.eval(`(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes("${c.key}"));
        if (btn) { btn.click(); }
      })()`);
      await sleep(1000);

      const state = await cdp.eval(`(() => {
        const heading = document.querySelector('h2.font-heading')?.innerText || '';
        const mainImg = document.querySelector('.lg\\\\:col-span-5 img');
        const thumbnails = Array.from(document.querySelectorAll('.lg\\\\:col-span-5 button img')).map(img => img.src);
        return {
          heading,
          mainImgSrc: mainImg?.src || '',
          mainImgNaturalW: mainImg?.naturalWidth || 0,
          mainImgNaturalH: mainImg?.naturalHeight || 0,
          thumbnailCount: thumbnails.length,
          thumbnails,
        };
      })()`);

      report.containerGuide[c.key] = state;
      console.log(`  Heading: "${state.heading}"`);
      console.log(`  Main Image: ${state.mainImgSrc.split('/').pop()} (${state.mainImgNaturalW}x${state.mainImgNaturalH})`);
      console.log(`  Thumbnails (${state.thumbnailCount}):`, state.thumbnails.map(t => t.split('/').pop()));

      if (c.forbidden) {
        for (const f of c.forbidden) {
          const hasForbidden = state.thumbnails.some(t => t.includes(f));
          if (hasForbidden) {
            console.error(`  [FAIL] ${c.key} still contains forbidden image: ${f}`);
          } else {
            console.log(`  [PASS] ${c.key} successfully purged forbidden image: ${f}`);
          }
        }
      }

      if (c.expectedDetail) {
        const hasExpected = state.thumbnails.some(t => t.includes(c.expectedDetail));
        console.log(`  [${hasExpected ? 'PASS' : 'FAIL'}] ${c.key} contains ${c.expectedDetail}: ${hasExpected}`);
      }
    }

    // Capture screenshots for key containers
    // 40' HC
    await cdp.eval(`Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes("40' HC")).click()`);
    await sleep(800);
    await cdp.eval(`window.scrollTo(0, 450)`);
    await sleep(400);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'live_repair_container_40hc.png'));

    // Reefer
    await cdp.eval(`Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes("Reefer")).click()`);
    await sleep(800);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'live_repair_container_reefer.png'));

    // Break Bulk section
    await cdp.eval(`document.getElementById('break-bulk')?.scrollIntoView({ behavior: 'instant' })`);
    await sleep(800);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'live_repair_break_bulk_section.png'));

    // -----------------------------------------------------------------
    // 2. HAZARDOUS CARGO VERIFICATION
    // -----------------------------------------------------------------
    console.log('\n>>> 2. AUDITING /services/hazardous-cargo ...');
    await cdp.send('Page.navigate', { url: `${TARGET_HOST}/services/hazardous-cargo` });
    await sleep(2500);

    const hzState = await cdp.eval(`(() => {
      const heading = document.querySelector('h2.font-heading')?.innerText || '';
      const section = document.getElementById('hazardous-gallery');
      const tabs = Array.from(section ? section.querySelectorAll('button') : []).map(b => b.innerText.trim());
      const mainImg = section ? section.querySelector('img.object-contain') : null;
      return {
        heading,
        hasSection: Boolean(section),
        tabs,
        mainImgSrc: mainImg?.src || '',
        mainImgW: mainImg?.naturalWidth || 0,
        mainImgH: mainImg?.naturalHeight || 0,
      };
    })()`);

    report.hazardousCargo = hzState;
    console.log('Hazardous Cargo Gallery State:');
    console.log(`  Heading: "${hzState.heading}"`);
    console.log(`  Main Image: ${hzState.mainImgSrc.split('/').pop()} (${hzState.mainImgW}x${hzState.mainImgH})`);
    console.log('  Tabs:', hzState.tabs);

    await cdp.eval(`document.getElementById('hazardous-gallery')?.scrollIntoView({ behavior: 'instant', block: 'start' })`);
    await sleep(800);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'live_repair_hazardous_cargo_desktop.png'));

    // -----------------------------------------------------------------
    // 3. OPERATIONS PAGE VERIFICATION
    // -----------------------------------------------------------------
    console.log('\n>>> 3. AUDITING /operations ...');
    await cdp.send('Page.navigate', { url: `${TARGET_HOST}/operations` });
    await sleep(2500);

    const opsFilters = await cdp.eval(`
      Array.from(document.querySelectorAll('#operations-gallery button')).map(b => b.innerText.trim())
    `);
    console.log('Operations Gallery Filter Tabs:', opsFilters);

    // Click Hazardous Cargo filter
    await cdp.eval(`(() => {
      const b = Array.from(document.querySelectorAll('#operations-gallery button')).find(x => x.innerText.includes('Hazardous'));
      if (b) b.click();
    })()`);
    await sleep(800);

    const hzCards = await cdp.eval(`
      Array.from(document.querySelectorAll('#operations-gallery .grid > div')).map(card => {
        const title = card.querySelector('h4')?.innerText || '';
        const img = card.querySelector('img')?.src || '';
        const ref = card.querySelector('.bg-amber-950\\\\/40')?.innerText || '';
        return { title, img: img.split('/').pop(), ref };
      })
    `);
    console.log(`Hazardous Filter Cards (${hzCards.length}):`, hzCards);
    report.operationsPage.hazardousCards = hzCards;

    await cdp.eval(`document.getElementById('operations-gallery')?.scrollIntoView({ behavior: 'instant', block: 'start' })`);
    await sleep(800);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'live_repair_operations_hazardous.png'));

    // Click Break Bulk filter
    await cdp.eval(`(() => {
      const b = Array.from(document.querySelectorAll('#operations-gallery button')).find(x => x.innerText.includes('Break Bulk'));
      if (b) b.click();
    })()`);
    await sleep(800);

    const bbCards = await cdp.eval(`
      Array.from(document.querySelectorAll('#operations-gallery .grid > div')).map(card => {
        const title = card.querySelector('h4')?.innerText || '';
        const img = card.querySelector('img')?.src || '';
        const ref = card.querySelector('.bg-amber-950\\\\/40')?.innerText || '';
        return { title, img: img.split('/').pop(), ref };
      })
    `);
    console.log(`Break Bulk Filter Cards (${bbCards.length}):`, bbCards);
    report.operationsPage.breakBulkCards = bbCards;

    await cdp.screenshot(path.join(ARTIFACT_DIR, 'live_repair_operations_breakbulk.png'));

    // Check for internal labels on /operations
    const opsText = await cdp.eval('document.body.innerText');
    for (const term of forbiddenLabels) {
      const count = (opsText.match(new RegExp(term, 'gi')) || []).length;
      if (count > 0) {
        report.internalLabelScan.totalMatches += count;
        report.internalLabelScan.details.push({ page: '/operations', term, count });
      }
    }

    // -----------------------------------------------------------------
    // 4. HOMEPAGE FIELD EXECUTION GALLERY
    // -----------------------------------------------------------------
    console.log('\n>>> 4. AUDITING / (Homepage Field Execution Gallery) ...');
    await cdp.send('Page.navigate', { url: `${TARGET_HOST}/` });
    await sleep(2500);

    const marqueeCards = await cdp.eval(`(() => {
      const cards = Array.from(document.querySelectorAll('.animate-marquee-slow > div'));
      return cards.map(c => {
        const title = c.querySelector('h3, h4')?.innerText || '';
        const img = c.querySelector('img')?.src || '';
        return { title, img: img.split('/').pop() };
      });
    })()`);

    console.log(`Homepage Marquee Items (${marqueeCards.length}):`);
    report.homepageGallery.cards = marqueeCards;

    await cdp.eval(`(() => {
      const el = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('FIELD EXECUTION GALLERY'));
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await sleep(800);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'live_repair_homepage_marquee.png'));

    // Mobile Viewport Check (390px)
    console.log('\n>>> 5. CHECKING MOBILE RESPONSIVENESS (390px) ...');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(500);

    await cdp.send('Page.navigate', { url: `${TARGET_HOST}/container-guide` });
    await sleep(2000);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'live_repair_mobile_container_guide.png'));

    await cdp.send('Page.navigate', { url: `${TARGET_HOST}/services/hazardous-cargo` });
    await sleep(2000);
    await cdp.eval(`document.getElementById('hazardous-gallery')?.scrollIntoView({ behavior: 'instant', block: 'start' })`);
    await sleep(600);
    await cdp.screenshot(path.join(ARTIFACT_DIR, 'live_repair_mobile_hazardous.png'));

  } catch (err) {
    console.error('Error in verification:', err);
  } finally {
    cdp.close();
    chromeProc.kill();
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'live_verification_report.json'), JSON.stringify(report, null, 2));
    console.log('\n[DONE] Full verification finished. Report written to live_verification_report.json');
  }
}

run();
