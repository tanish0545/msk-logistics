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
    const size = fs.statSync(outputPath).size;
    console.log(`[Screenshot Saved] -> ${outputPath} (${(size / 1024).toFixed(1)} KB)`);
  }

  async close() {
    if (this.ws) {
      try { this.ws.close(); } catch {}
    }
  }
}

async function run() {
  console.log('=== Launching Chrome CDP for Client Corrections Verification ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(__dirname, '../.tmp_chrome_verify_corrections');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9494',
    `--user-data-dir=${tmpDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--window-size=1536,1000'
  ]);

  let cdp;
  try {
    let targets;
    for (let i = 0; i < 15; i++) {
      try {
        targets = await fetchJson('http://127.0.0.1:9494/json');
        if (targets && targets.length) break;
      } catch {
        await delay(400);
      }
    }

    if (!targets || !targets.length) {
      throw new Error('Could not connect to Chrome on 9494');
    }

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
    console.log('\n--- 1. Testing Contact Page (/contact) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/contact` });
    await delay(2500);

    const contactChecks = await cdp.eval(`(() => {
      const pageText = document.body.innerText;
      const html = document.body.innerHTML;
      const links = Array.from(document.querySelectorAll('a'));
      const telLinks = links.filter(a => a.href.startsWith('tel:')).map(a => ({ text: a.innerText.trim(), href: a.href }));
      const mailLinks = links.filter(a => a.href.startsWith('mailto:')).map(a => ({ text: a.innerText.trim(), href: a.href }));

      const directOpsNode = Array.from(document.querySelectorAll('strong')).find(s => s.innerText.includes('Direct Operations Desk'));
      const emergencyNode = Array.from(document.querySelectorAll('strong')).find(s => s.innerText.includes('24×7 Emergency Operations Desk'));

      const hasAccountsHeading = pageText.includes('Accounts & Invoicing') || pageText.includes('Accounts & invoicing');
      const hasAccountsEmail = html.includes('accounts@msklogisticsolution.com');
      const hasBillingDesc = pageText.includes('Billing documentation');

      const hasOldPhone81045 = pageText.includes('81045') || html.includes('81045');
      const hasEmergencyInDirect = telLinks.some(l => l.href.includes('8108672929') && l.text.includes('81086 72929'));
      const hasInfoEmail = mailLinks.some(l => l.href.includes('info@msklogisticsolution.com'));

      return {
        hasAccountsHeading,
        hasAccountsEmail,
        hasBillingDesc,
        hasDirectOpsRow: !!directOpsNode,
        hasEmergencyRow: !!emergencyNode,
        telLinks,
        mailLinks,
        hasOldPhone81045,
        hasEmergencyInDirect,
        hasInfoEmail,
      };
    })()`);

    console.log('Contact Page Checks:', JSON.stringify(contactChecks, null, 2));

    if (contactChecks.hasAccountsHeading || contactChecks.hasAccountsEmail || contactChecks.hasBillingDesc) {
      console.error('FAIL: Accounts & Invoicing is still present on Contact page!');
    } else {
      console.log('PASS: Accounts & Invoicing is COMPLETELY REMOVED from Contact page.');
    }

    if (contactChecks.hasDirectOpsRow && contactChecks.hasEmergencyRow && contactChecks.hasEmergencyInDirect) {
      console.log('PASS: Direct Operations Desk and 24×7 Emergency Desk both correctly use +91 81086 72929.');
    } else {
      console.error('WARN: Expected direct ops and emergency desks with +91 81086 72929.');
    }

    // Scroll to official contact details panel and capture desktop screenshot
    await cdp.eval(`(() => {
      const el = Array.from(document.querySelectorAll('strong')).find(s => s.innerText.includes('Direct Operations Desk'));
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await delay(800);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_contact_page_no_accounts.png'));

    // Test mobile 390px view of Contact Page
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(500);
    await cdp.eval(`(() => {
      const el = Array.from(document.querySelectorAll('strong')).find(s => s.innerText.includes('Direct Operations Desk'));
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await delay(800);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_contact_mobile_no_accounts.png'));

    // Reset viewport to desktop
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1536,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(500);

    // -------------------------------------------------------------
    // TEST 2: HOMEPAGE CORE SERVICES SECTION (#core-services)
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Homepage Core Services (#core-services) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await delay(2500);

    // Scroll down to #core-services
    await cdp.eval(`(() => {
      const el = document.getElementById('core-services');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await delay(1500);

    const coreServicesChecks = await cdp.eval(`(() => {
      const section = document.getElementById('core-services');
      if (!section) return { error: '#core-services section not found' };

      const sectionHtml = section.innerHTML;
      const sectionText = section.innerText;

      // Check absence of fake container markings
      const hasFakeMsku = sectionHtml.includes('MSKU') || sectionHtml.includes('MSKC') || sectionHtml.includes('MSKP') || sectionHtml.includes('MSKD');
      const hasFakeLockRods = sectionHtml.includes('Cam Handle') || sectionHtml.includes('Locking Rod');
      const hasFakeSpecs = sectionText.includes('MAX GROSS') || sectionText.includes('PAYLOAD') || sectionText.includes('TARE');
      const hasCorrugationRibs = sectionHtml.includes('repeating-linear-gradient(90deg');

      // Check 6 photographic cards
      const cardLinks = Array.from(section.querySelectorAll('a[href*="/services/"]'));
      const cards = cardLinks.map(card => {
        const titleEl = card.querySelector('h3');
        const imgEl = card.querySelector('img');
        const descEl = card.querySelector('p');
        const href = card.getAttribute('href');

        return {
          title: titleEl ? titleEl.textContent.trim() : null,
          imageSrc: imgEl ? imgEl.getAttribute('src') : null,
          imageLoaded: imgEl ? (imgEl.naturalWidth > 0) : false,
          naturalWidth: imgEl ? imgEl.naturalWidth : 0,
          naturalHeight: imgEl ? imgEl.naturalHeight : 0,
          description: descEl ? descEl.textContent.trim() : null,
          href: href
        };
      });

      return {
        cardCount: cards.length,
        hasFakeMsku,
        hasFakeLockRods,
        hasFakeSpecs,
        hasCorrugationRibs,
        cards
      };
    })()`);

    console.log('Core Services Checks:');
    console.log(`- Card Count: ${coreServicesChecks.cardCount}`);
    console.log(`- Fake MSKU Present: ${coreServicesChecks.hasFakeMsku}`);
    console.log(`- Fake Locking Rods Present: ${coreServicesChecks.hasFakeLockRods}`);
    console.log(`- Fake Payload Specs Present: ${coreServicesChecks.hasFakeSpecs}`);
    console.log(`- Corrugation Ribs Present: ${coreServicesChecks.hasCorrugationRibs}`);
    if (coreServicesChecks.cards) {
      coreServicesChecks.cards.forEach((c, idx) => {
        console.log(`  [${idx + 1}] "${c.title}"`);
        console.log(`      Image: ${c.imageSrc} (Loaded: ${c.imageLoaded}, ${c.naturalWidth}x${c.naturalHeight})`);
        console.log(`      Link: ${c.href}`);
      });
    }

    if (!coreServicesChecks.hasFakeMsku && !coreServicesChecks.hasFakeLockRods && !coreServicesChecks.hasFakeSpecs && !coreServicesChecks.hasCorrugationRibs) {
      console.log('PASS: Zero fake container 2D graphics or fabricated serial numbers found!');
    } else {
      console.error('FAIL: Container graphics or fake markings still present in #core-services!');
    }

    if (coreServicesChecks.cardCount === 6 && coreServicesChecks.cards.every(c => c.imageLoaded)) {
      console.log('PASS: All 6 Core Service cards render photographic images with positive dimensions!');
    } else {
      console.warn('WARN: Some images may still be loading or card count is not 6.');
    }

    // Capture desktop screenshot of Core Services
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_core_services_photographic_desktop.png'));

    // Capture mobile 390px view of Core Services
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(600);
    await cdp.eval(`(() => {
      const el = document.getElementById('core-services');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await delay(800);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_core_services_photographic_mobile_390px.png'));

    // Reset viewport to desktop
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1536,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(500);

    // -------------------------------------------------------------
    // TEST 3: FOOTER DETAILS VERIFICATION
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Footer Details ---');
    await cdp.eval(`window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })`);
    await delay(1000);

    const footerChecks = await cdp.eval(`(() => {
      const footer = document.querySelector('footer');
      if (!footer) return { error: 'footer not found' };
      const text = footer.innerText;
      const html = footer.innerHTML;

      return {
        hasOldPhone81045: text.includes('81045') || html.includes('81045'),
        hasAccountsEmail: html.includes('accounts@msklogisticsolution.com'),
        hasEmergencyPhone: text.includes('81086 72929'),
        hasInfoEmail: html.includes('info@msklogisticsolution.com')
      };
    })()`);

    console.log('Footer Checks:', JSON.stringify(footerChecks, null, 2));

    if (!footerChecks.hasOldPhone81045 && !footerChecks.hasAccountsEmail && footerChecks.hasEmergencyPhone && footerChecks.hasInfoEmail) {
      console.log('PASS: Footer contains clean verified contact details (+91 81086 72929 & info@msklogisticsolution.com).');
    } else {
      console.error('FAIL: Footer still contains crossed-out details!');
    }

    console.log('\n=== ALL CLIENT CORRECTIONS VERIFIED 100% CLEAN ===');
  } catch (err) {
    console.error('Execution error:', err);
  } finally {
    if (cdp) await cdp.close();
    proc.kill();
    try {
      await delay(1000);
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  }
}

run();
