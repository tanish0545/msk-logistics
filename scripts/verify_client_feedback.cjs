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
    console.log(`[Screenshot Saved] -> ${outputPath}`);
  }

  async close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  console.log('=== Launch Chrome CDP ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(__dirname, '../.tmp_chrome_client_feedback');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9494',
    '--headless=new',
    '--disable-gpu',
    '--window-size=1536,1000',
    '--user-data-dir=' + tmpDir,
  ]);

  await delay(1800);

  let cdp;
  try {
    const targets = await fetchJson('http://127.0.0.1:9494/json');
    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1536,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // -------------------------------------------------------------
    // TEST 1: CONTACT PAGE VERIFICATION
    // -------------------------------------------------------------
    console.log('\n--- 1. Testing Contact Page ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/contact` });
    await delay(2000);

    const contactChecks = await cdp.eval(`(() => {
      const pageText = document.body.innerText;
      const links = Array.from(document.querySelectorAll('a'));
      const telLinks = links.filter(a => a.href.startsWith('tel:')).map(a => ({ text: a.innerText.trim(), href: a.href }));
      const mailLinks = links.filter(a => a.href.startsWith('mailto:')).map(a => ({ text: a.innerText.trim(), href: a.href }));

      const directOpsNode = Array.from(document.querySelectorAll('strong')).find(s => s.innerText.includes('Direct Operations Desk'));
      const emergencyNode = Array.from(document.querySelectorAll('strong')).find(s => s.innerText.includes('24×7 Emergency Operations Desk'));

      const hasOldNumber = pageText.includes('81045');
      const hasEmergencyInDirect = telLinks.some(l => l.href.includes('8108672929') && l.text.includes('81086 72929'));
      const hasInfoEmail = mailLinks.some(l => l.href.includes('info@msklogisticsolution.com'));

      return {
        hasDirectOpsRow: !!directOpsNode,
        hasEmergencyRow: !!emergencyNode,
        telLinks,
        mailLinks,
        hasOldNumber,
        hasEmergencyInDirect,
        hasInfoEmail,
      };
    })()`);

    console.log('Contact Page Checks:', JSON.stringify(contactChecks, null, 2));

    // Scroll to contact details card
    await cdp.eval(`(() => {
      const el = document.querySelector('strong');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_client_contact_page.png'));

    // -------------------------------------------------------------
    // TEST 2: FOOTER VERIFICATION (DESKTOP)
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Footer Contact Details ---');
    await cdp.eval(`window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })`);
    await delay(1000);

    const footerChecks = await cdp.eval(`(() => {
      const footer = document.querySelector('footer');
      if (!footer) return { found: false };
      const text = footer.innerText;
      const links = Array.from(footer.querySelectorAll('a')).map(a => ({ text: a.innerText.trim(), href: a.href }));

      return {
        found: true,
        hasOldPhone81045: text.includes('81045') || text.includes('92823'),
        hasAccountsEmail: text.includes('accounts@msklogisticsolution.com'),
        hasEmergencyPhone: text.includes('81086 72929'),
        hasInfoEmail: text.includes('info@msklogisticsolution.com'),
        hasQuoteButton: links.some(l => l.text.includes('Request a Quote') && l.href.includes('/request-quote')),
        hasAddress: text.includes('Balaji Bhawan') && text.includes('CBD Belapur'),
        telLinks: links.filter(l => l.href.startsWith('tel:')),
      };
    })()`);

    console.log('Footer Checks:', JSON.stringify(footerChecks, null, 2));
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_client_footer_desktop.png'));

    // -------------------------------------------------------------
    // TEST 3: CLIENT CARGO ARRANGEMENTS (OPTION 01 & 02)
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Client Cargo Arrangements on /export-packing-solutions ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/export-packing-solutions` });
    await delay(2000);

    const solutionsImages = await cdp.eval(`(() => {
      const cards = Array.from(document.querySelectorAll('h3')).filter(h => h.innerText.includes('Client'));
      const images = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }));
      return {
        cards: cards.map(c => c.innerText.trim()),
        images: images.filter(i => i.src.includes('operations') || i.src.includes('import-export')),
      };
    })()`);

    console.log('Solutions Images on /export-packing-solutions:', JSON.stringify(solutionsImages, null, 2));
    await cdp.eval(`(() => {
      const el = document.querySelector('h3');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_client_cargo_arrangements.png'));

    // Check on /import-export page too
    console.log('\n--- 3b. Testing Client Cargo Arrangements on /import-export ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/import-export` });
    await delay(2000);

    const importExportSolutions = await cdp.eval(`(() => {
      const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }));
      return imgs.filter(i => i.src.includes('operations') || i.src.includes('sandvik') || i.src.includes('covered-staging'));
    })()`);

    console.log('Import/Export Arrangements Images:', JSON.stringify(importExportSolutions, null, 2));
    await cdp.eval(`(() => {
      const h3 = Array.from(document.querySelectorAll('h3')).find(h => h.innerText.includes('Client-Arranged'));
      if (h3) h3.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_import_export_client_cargo.png'));

    // -------------------------------------------------------------
    // TEST 4: CORE SERVICES QUALITY (SERVICES PAGE & DROPDOWN)
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing Core Services Images on /services ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/services` });
    await delay(2000);

    const coreServicesCards = await cdp.eval(`(() => {
      const serviceCards = Array.from(document.querySelectorAll('h3')).map(h => h.innerText.trim());
      const images = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }));
      return {
        serviceHeaders: serviceCards,
        images: images.filter(i => i.src.includes('/images/')),
      };
    })()`);

    console.log('Core Services Images on /services:', JSON.stringify(coreServicesCards, null, 2));
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_core_services_directory.png'));

    // -------------------------------------------------------------
    // TEST 5: MOBILE RESPONSIVENESS (390px)
    // -------------------------------------------------------------
    console.log('\n--- 5. Testing Mobile Viewport (390px) ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await cdp.send('Page.navigate', { url: `${BASE_URL}/contact` });
    await delay(2000);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_client_contact_mobile_390px.png'));

    await cdp.eval(`window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })`);
    await delay(800);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_client_footer_mobile_390px.png'));

    console.log('\n=== ALL TESTS COMPLETED SUCCESSFULLY ===');
  } catch (err) {
    console.error('Fatal Test Error:', err);
    process.exitCode = 1;
  } finally {
    if (cdp) await cdp.close();
    proc.kill();
  }
}

run();
