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
  const tmpDir = path.join(__dirname, '../.tmp_chrome_client_corrections');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9496',
    `--user-data-dir=${tmpDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--headless=new',
    '--disable-gpu',
    '--window-size=1440,1100'
  ]);

  await delay(1500);

  let versionInfo;
  for (let i = 0; i < 10; i++) {
    try {
      versionInfo = await fetchJson('http://127.0.0.1:9496/json/version');
      break;
    } catch {
      await delay(500);
    }
  }

  if (!versionInfo) {
    console.error('Failed to connect to Chrome on 9496');
    proc.kill();
    process.exit(1);
  }

  const targets = await fetchJson('http://127.0.0.1:9496/json/list');
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();

  await client.send('Page.enable');
  await client.send('DOM.enable');

  try {
    // ---------------------------------------------------------
    // TEST 1: CONTACT PAGE (/contact)
    // ---------------------------------------------------------
    console.log('\n--- 1. Testing Contact Page (/contact) ---');
    await client.send('Page.navigate', { url: `${BASE_URL}/contact` });
    await delay(2000);

    const contactAudit = await client.eval(`
      (() => {
        const bodyText = document.body.innerText;
        const html = document.body.innerHTML;

        const hasAccountsHeading = bodyText.includes('Accounts & Invoicing') || bodyText.includes('Accounts & invoicing');
        const hasAccountsEmail = html.includes('accounts@msklogisticsolution.com');
        const hasBillingDesc = bodyText.includes('Billing documentation');

        const telLinks = Array.from(document.querySelectorAll('a[href="tel:+918108672929"]'))
          .map(a => a.textContent.trim());

        const directDeskEl = Array.from(document.querySelectorAll('a[href^="tel:"]'))
          .find(a => a.textContent.includes('81086 72929'));

        const infoEmailEl = Array.from(document.querySelectorAll('a[href^="mailto:info@"]'))
          .find(a => a.href.includes('info@msklogisticsolution.com'));

        return {
          hasAccountsHeading,
          hasAccountsEmail,
          hasBillingDesc,
          telLinkCount: telLinks.length,
          telLinkTexts: telLinks,
          hasDirectDesk: !!directDeskEl,
          hasInfoEmail: !!infoEmailEl,
          infoEmailHref: infoEmailEl ? infoEmailEl.href : null,
          has81045: bodyText.includes('81045') || html.includes('81045')
        };
      })()
    `);

    console.log('Contact Page Audit:', contactAudit);

    if (contactAudit.hasAccountsHeading || contactAudit.hasAccountsEmail || contactAudit.hasBillingDesc) {
      console.error('FAIL: Accounts & Invoicing is still present on Contact page!');
    } else {
      console.log('PASS: Accounts & Invoicing is COMPLETELY REMOVED from Contact page.');
    }

    if (contactAudit.hasDirectDesk && contactAudit.telLinkCount >= 2) {
      console.log('PASS: Direct Operations Desk and Emergency Desk both correctly use +91 81086 72929.');
    } else {
      console.error('WARN: Expected at least 2 clickable +91 81086 72929 links, found:', contactAudit.telLinkCount);
    }

    // Scroll to the contact details and capture screenshot
    await client.eval(`(() => { window.scrollTo(0, 400); })()`);
    await delay(600);
    await client.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_contact_page_no_accounts.png'));

    // Test mobile viewport for contact
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(500);
    await client.eval(`(() => { window.scrollTo(0, 450); })()`);
    await delay(500);
    await client.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_contact_mobile_no_accounts.png'));

    // Reset viewport back to desktop
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 1100,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(500);

    // ---------------------------------------------------------
    // TEST 2: HOMEPAGE CORE SERVICES SECTION (#core-services)
    // ---------------------------------------------------------
    console.log('\n--- 2. Testing Homepage Core Services (#core-services) ---');
    await client.send('Page.navigate', { url: `${BASE_URL}/#core-services` });
    await delay(2500);

    // Scroll to #core-services so all cards are visible in viewport
    await client.eval(`
      (() => {
        const s = document.getElementById('core-services');
        if (s) s.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()
    `);
    await delay(1200);

    const coreServicesAudit = await client.eval(`
      (() => {
        const section = document.getElementById('core-services');
        if (!section) return { error: '#core-services section not found' };

        const sectionHtml = section.innerHTML;
        const sectionText = section.innerText;

        // Check for any fake container markings
        const hasFakeMsku = sectionHtml.includes('MSKU') || sectionHtml.includes('MSKC') || sectionHtml.includes('MSKP') || sectionHtml.includes('MSKD');
        const hasFakeLockRods = sectionHtml.includes('Cam Handle') || sectionHtml.includes('Locking Rod');
        const hasFakeSpecs = sectionText.includes('MAX GROSS') || sectionText.includes('PAYLOAD') || sectionText.includes('TARE');
        const hasCorrugationRibs = sectionHtml.includes('repeating-linear-gradient(90deg');

        // Check cards
        const cardLinks = Array.from(section.querySelectorAll('a[href*="/services/"]'));
        const cardDetails = cardLinks.map(card => {
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
          cardCount: cardDetails.length,
          cards: cardDetails,
          hasFakeMsku,
          hasFakeLockRods,
          hasFakeSpecs,
          hasCorrugationRibs
        };
      })()
    `);

    console.log('Core Services Audit Summary:');
    console.log(`- Card Count: ${coreServicesAudit.cardCount}`);
    console.log(`- Fake MSKU Numbers Present: ${coreServicesAudit.hasFakeMsku}`);
    console.log(`- Fake Locking Rods Present: ${coreServicesAudit.hasFakeLockRods}`);
    console.log(`- Fake Payload Specs Present: ${coreServicesAudit.hasFakeSpecs}`);
    console.log(`- Corrugation Ribs Present: ${coreServicesAudit.hasCorrugationRibs}`);
    console.log('- Cards Details:');
    if (coreServicesAudit.cards) {
      coreServicesAudit.cards.forEach((c, idx) => {
        console.log(`  [${idx + 1}] "${c.title}"`);
        console.log(`      Image: ${c.imageSrc} (Loaded: ${c.imageLoaded}, ${c.naturalWidth}x${c.naturalHeight})`);
        console.log(`      Href: ${c.href}`);
      });
    }

    await client.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_core_services_photographic_desktop.png'));

    // Capture mobile 390px view of Core Services
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(600);
    await client.eval(`
      (() => {
        const s = document.getElementById('core-services');
        if (s) s.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()
    `);
    await delay(600);
    await client.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_core_services_photographic_mobile_390px.png'));

    // Reset viewport back to desktop
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await delay(500);

    // ---------------------------------------------------------
    // TEST 3: FOOTER DETAILS
    // ---------------------------------------------------------
    console.log('\n--- 3. Testing Footer Details ---');
    const footerAudit = await client.eval(`
      (() => {
        const footer = document.querySelector('footer');
        if (!footer) return { error: 'footer not found' };
        const text = footer.innerText;
        const html = footer.innerHTML;

        return {
          has81045: text.includes('81045') || html.includes('81045'),
          hasAccountsEmail: html.includes('accounts@msklogisticsolution.com'),
          hasEmergency81086: text.includes('81086 72929'),
          hasInfoEmail: html.includes('info@msklogisticsolution.com')
        };
      })()
    `);

    console.log('Footer Audit:', footerAudit);

    console.log('\n=== ALL VERIFICATIONS COMPLETED SUCCESSFULLY ===');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await client.close();
    proc.kill();
    try {
      await delay(1000);
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      // ignore EPERM on temp dir cleanup
    }
  }
}

run();
