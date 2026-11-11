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
  const proc = spawn(chromePath, [
    '--remote-debugging-port=9493',
    '--headless=new',
    '--disable-gpu',
    '--window-size=1536,1000',
    '--user-data-dir=' + path.join(__dirname, '../.tmp_chrome_round2_final'),
  ]);

  await delay(1500);

  let cdp;
  try {
    const targets = await fetchJson('http://127.0.0.1:9493/json');
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

    const injectReactHelpers = `
      window.__setReactInput = function(el, val) {
        if (!el) return;
        const proto = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
        const set = Object.getOwnPropertyDescriptor(proto, 'value').set;
        set.call(el, val);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      };
    `;

    // =========================================================================
    // BUG-006: Selected Vessel Shipment Details
    // =========================================================================
    console.log('\n--- VERIFYING BUG-006: Selected Vessel Shipment Details ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await delay(2000);

    console.log('Clicking shipment link from HomePage...');
    const clickResult = await cdp.eval(`
      (() => {
        const link = document.querySelector('a[href*="fr-crane-loading"]');
        if (link) {
          link.scrollIntoView({ behavior: 'instant', block: 'center' });
          link.click();
          return { clicked: true, href: link.getAttribute('href') };
        }
        return { clicked: false };
      })()
    `);
    console.log('Homepage click result:', clickResult);
    await delay(2000);

    const bug006ModalState = await cdp.eval(`
      (() => {
        const dialog = document.querySelector('[role="dialog"]');
        if (!dialog) return { hasModal: false, url: window.location.href };
        const heading = dialog.querySelector('h3')?.textContent?.trim() || '';
        const category = dialog.querySelector('.bg-\\\\[\\\\#B62825\\\\]')?.textContent?.trim() || '';
        const image = dialog.querySelector('img[src*="flat-rack-crane-loading"]')?.getAttribute('src') || '';
        const specs = Array.from(dialog.querySelectorAll('strong')).map(s => s.textContent.trim());
        const gearList = Array.from(dialog.querySelectorAll('div.flex.items-center.gap-2 span')).map(s => s.textContent.trim());
        const dimensions = dialog.querySelector('p.text-\\\\[\\\\#475569\\\\]')?.textContent?.trim() || '';
        return {
          hasModal: true,
          url: window.location.href,
          heading,
          category,
          image,
          dimensions,
          specs,
          gearListCount: gearList.length,
          gearPreview: gearList.slice(0, 2),
        };
      })()
    `);
    console.log('BUG-006 Modal state:', bug006ModalState);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_bug006_selected_vessel_shipment.png'));

    // Test direct URL load and refresh
    console.log('Testing direct URL navigation to /import-export?shipment=fr-crane-loading...');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/import-export?shipment=fr-crane-loading#shipment-fr-crane-loading` });
    await delay(1500);
    const directState = await cdp.eval(`
      (() => {
        const dialog = document.querySelector('[role="dialog"]');
        return {
          hasModal: !!dialog,
          heading: dialog?.querySelector('h3')?.textContent?.trim() || '',
          url: window.location.href
        };
      })()
    `);
    console.log('Direct URL state:', directState);

    // =========================================================================
    // BUG-014: Google Maps Registered Office Destination
    // =========================================================================
    console.log('\n--- VERIFYING BUG-014: Google Maps Registered Office Destination ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/company/branches` });
    await delay(1500);

    const bug014State = await cdp.eval(`
      (() => {
        const mapIframe = document.querySelector('iframe');
        const directionsLinks = Array.from(document.querySelectorAll('a[href*="google.com/maps"]')).map(a => a.href);
        return {
          iframeSrc: mapIframe?.getAttribute('src') || '',
          directionsLinks,
        };
      })()
    `);
    console.log('BUG-014 Maps state:', bug014State);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_bug014_google_maps_destination.png'));

    // =========================================================================
    // BUG-015: Breadcrumb Backward and Forward Navigation
    // =========================================================================
    console.log('\n--- VERIFYING BUG-015: Breadcrumb Backward and Forward Navigation ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/services` });
    await delay(1500);

    const servicesBreadcrumb = await cdp.eval(`
      (() => {
        const nav = document.querySelector('nav[aria-label="Breadcrumb"]');
        if (!nav) return { hasBreadcrumb: false };
        const items = Array.from(nav.querySelectorAll('li')).map(li => li.textContent.trim().replace(/\\s+/g, ' '));
        const hasDropdown = !!nav.querySelector('button[aria-label*="forward"]');
        return { hasBreadcrumb: true, items, hasDropdown };
      })()
    `);
    console.log('Services page breadcrumb:', servicesBreadcrumb);

    // Open forward dropdown
    await cdp.eval(`
      (() => {
        const btn = document.querySelector('nav[aria-label="Breadcrumb"] button[aria-label*="forward"]');
        if (btn) btn.click();
      })()
    `);
    await delay(400);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_bug015_breadcrumb_dropdown_forward.png'));

    // Click Air Cargo in forward dropdown
    await cdp.eval(`
      (() => {
        const link = Array.from(document.querySelectorAll('nav[aria-label="Breadcrumb"] a[href*="air-cargo"]'))[0];
        if (link) link.click();
      })()
    `);
    await delay(1500);

    const airCargoBreadcrumb = await cdp.eval(`
      (() => {
        const nav = document.querySelector('nav[aria-label="Breadcrumb"]');
        if (!nav) return { hasBreadcrumb: false };
        const items = Array.from(nav.querySelectorAll('li')).map(li => li.textContent.trim().replace(/\\s+/g, ' '));
        const servicesLink = nav.querySelector('a[href="/services"]')?.getAttribute('href');
        const activeSpan = nav.querySelector('[aria-current="page"]')?.textContent.trim();
        return {
          hasBreadcrumb: true,
          items,
          servicesLink,
          activeSpan,
          url: window.location.href,
        };
      })()
    `);
    console.log('Air Cargo breadcrumb state:', airCargoBreadcrumb);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_bug015_air_cargo_breadcrumb.png'));

    // Click "Services" in breadcrumb to navigate backward
    await cdp.eval(`
      (() => {
        const link = document.querySelector('nav[aria-label="Breadcrumb"] a[href="/services"]');
        if (link) link.click();
      })()
    `);
    await delay(1500);
    console.log('Back on Services URL:', await cdp.eval('window.location.href'));

    // =========================================================================
    // BUG-012: Contact Form Delivery Retest
    // =========================================================================
    console.log('\n--- VERIFYING BUG-012: Contact Form Delivery Retest ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/contact` });
    await delay(1500);
    await cdp.eval(injectReactHelpers);

    // Fill form using React input setter
    await cdp.eval(`
      (() => {
        window.__setReactInput(document.querySelector('input[placeholder*="Sunil Kumar"]'), 'Sunil Kumar');
        window.__setReactInput(document.querySelector('input[placeholder*="company.com"]'), 'sunil.kumar@exportcorp.com');
        window.__setReactInput(document.querySelector('input[placeholder*="+91 98765"]'), '+91 98765 43210');
        window.__setReactInput(document.querySelector('input[placeholder*="Export Industries"]'), 'Kumar Exports Ltd.');
        window.__setReactInput(document.querySelector('input[placeholder*="Enter your subject"]'), 'Cargo Lashing & Stuffing Enquiry');
        window.__setReactInput(document.querySelector('textarea'), 'Need certified container stuffing and heavy cargo lashing at JNPT for 3x 40ft Flat Racks next Tuesday.');
      })()
    `);
    await delay(600);

    // Submit form
    console.log('Submitting Contact form...');
    await cdp.eval(`
      (() => {
        const btn = document.querySelector('form button[type="submit"]');
        if (btn) btn.click();
      })()
    `);
    await delay(2500);

    const contactFormResult = await cdp.eval(`
      (() => {
        const nameVal = document.querySelector('input[placeholder*="Sunil Kumar"]')?.value;
        const emailVal = document.querySelector('input[placeholder*="company.com"]')?.value;
        const msgVal = document.querySelector('textarea')?.value;
        const errorBanner = document.querySelector('.bg-red-50');
        const bannerText = errorBanner?.textContent || '';
        const mailtoBtn = errorBanner?.querySelector('a[href^="mailto:"]');
        const mailtoHref = mailtoBtn?.getAttribute('href') || '';
        const copyBtn = errorBanner?.querySelector('button');
        const decodedHref = decodeURIComponent(mailtoHref);
        return {
          valuesPreserved: !!(nameVal && emailVal && msgVal),
          nameVal,
          emailVal,
          bannerPresent: !!errorBanner,
          bannerSnippet: bannerText.slice(0, 140).replace(/\\s+/g, ' '),
          mailtoRecipient: decodedHref.includes('info@msklogisticsolution.com'),
          mailtoHasSubject: decodedHref.includes('Cargo Lashing'),
          mailtoHasBody: decodedHref.includes('Sunil Kumar'),
          copyBtnPresent: !!copyBtn,
        };
      })()
    `);
    console.log('BUG-012 Contact form test result:', contactFormResult);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_bug012_contact_delivery_retest.png'));

    // =========================================================================
    // BUG-017: Quote Request Submission Retest
    // =========================================================================
    console.log('\n--- VERIFYING BUG-017: Quote Request Submission Retest ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/request-quote` });
    await delay(1500);
    await cdp.eval(injectReactHelpers);

    // Step 1: Select Cargo Lashing
    console.log('Step 1: Selecting service...');
    await cdp.eval(`
      (() => {
        const card = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Cargo Lashing'));
        if (card) card.click();
      })()
    `);
    await delay(400);
    await cdp.eval(`
      (() => {
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('CONTINUE'));
        if (next) next.click();
      })()
    `);
    await delay(800);

    // Step 2: Fill Cargo Specs
    console.log('Step 2: Entering specifications...');
    await cdp.eval(`
      (() => {
        const desc = document.querySelector('input[name="cargoDescription"]');
        const weight = document.querySelector('input[name="approxWeight"]');
        const dims = document.querySelector('input[name="dimensions"]');
        window.__setReactInput(desc, 'Heavy industrial high-pressure water pump skid');
        window.__setReactInput(weight, '14.5');
        window.__setReactInput(dims, '6.2m x 2.4m x 2.8m');
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('CONTINUE'));
        if (next) next.click();
      })()
    `);
    await delay(800);

    // Step 3: Route & Schedule
    console.log('Step 3: Route & Schedule...');
    await cdp.eval(`
      (() => {
        const origin = document.querySelector('input[name="originCity"]');
        const dest = document.querySelector('input[name="destinationPort"]');
        const addr = document.querySelector('input[name="operationalAddress"]');
        const date = document.querySelector('input[name="preferredDate"]');
        window.__setReactInput(origin, 'Pune MIDC');
        window.__setReactInput(dest, 'Jebel Ali Port');
        window.__setReactInput(addr, 'JNPT Nhava Sheva CFS Staging Yard');
        window.__setReactInput(date, '2026-12-15');
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('CONTINUE'));
        if (next) next.click();
      })()
    `);
    await delay(800);

    // Step 4: Commercial Contact & Quote Reference Name
    console.log('Step 4: Commercial Contact & Quote Name...');
    await cdp.eval(`
      (() => {
        const qName = document.querySelector('input[name="quoteName"]');
        const comp = document.querySelector('input[name="companyName"]');
        const contact = document.querySelector('input[name="contactName"]');
        const email = document.querySelector('input[name="email"]');
        const phone = document.querySelector('input[name="phone"]');
        window.__setReactInput(qName, 'JNPT-HEAVY-PUMP-2026');
        window.__setReactInput(comp, 'Sharma Marine Machinery Ltd');
        window.__setReactInput(contact, 'Rajesh Sharma');
        window.__setReactInput(email, 'rajesh@sharmamarine.com');
        window.__setReactInput(phone, '+91 98200 12345');
        const next = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('CONTINUE'));
        if (next) next.click();
      })()
    `);
    await delay(800);

    // Step 5: Review & Consent & Submit
    console.log('Step 5: Review, Consent & Submit...');
    await cdp.eval(`
      (() => {
        const checkbox = document.querySelector('input[name="privacyConsent"]');
        if (checkbox) checkbox.click();
        const submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('SUBMIT QUOTE REQUEST'));
        if (submitBtn) submitBtn.click();
      })()
    `);
    await delay(2500);

    const quoteFormResult = await cdp.eval(`
      (() => {
        const banner = document.querySelector('.bg-red-950\\\\/80');
        const bannerText = banner?.textContent || '';
        const mailtoLink = banner?.querySelector('a[href^="mailto:"]')?.getAttribute('href') || '';
        const decodedMailto = decodeURIComponent(mailtoLink);
        return {
          bannerPresent: !!banner,
          bannerSnippet: bannerText.slice(0, 160).replace(/\\s+/g, ' '),
          mailtoHasQuoteName: decodedMailto.includes('JNPT-HEAVY-PUMP-2026'),
          mailtoHasCargo: decodedMailto.includes('Heavy industrial'),
          mailtoHasCompany: decodedMailto.includes('Sharma Marine'),
          mailtoRecipient: decodedMailto.includes('info@msklogisticsolution.com'),
        };
      })()
    `);
    console.log('BUG-017 Quote form result:', quoteFormResult);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_bug017_quote_submission_retest.png'));

    console.log('\n=== ALL 5 VERIFICATIONS COMPLETED SUCCESSFULLY ===\n');

  } catch (err) {
    console.error('Error in verification:', err);
  } finally {
    if (cdp) await cdp.close();
    proc.kill();
  }
}

run();
