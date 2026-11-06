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
    if (res.exceptionDetails) {
      console.error('Eval error:', res.exceptionDetails);
      return null;
    }
    return res.result ? res.result.value : undefined;
  }

  async captureScreenshot(outputPath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(res.data, 'base64');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved screenshot -> ${outputPath}`);
  }

  async close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  console.log('=== Step 1: Launch Chrome CDP ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const proc = spawn(chromePath, [
    '--remote-debugging-port=9488',
    '--headless=new',
    '--disable-gpu',
    '--window-size=1536,1000',
    '--user-data-dir=C:\\Users\\tanis\\.gemini\\temp\\chrome_bug_verify_2'
  ]);
  await delay(2500);

  const targets = await fetchJson('http://127.0.0.1:9488/json');
  const pageTarget = targets.find(t => t.type === 'page');
  const cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await cdp.connect();

  const results = [];

  try {
    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');

    // 1536px Desktop Viewport
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1536,
      height: 960,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('\n--- VERIFYING BUG-001 (Orbit Chatbot Viewport Cutoff) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await delay(2000);
    // Click chatbot launcher
    await cdp.eval(`
      (() => {
        const btn = document.querySelector('button[aria-label="Open MSK Orbit Assistant"]') ||
                    Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('MSK ORBIT') || b.textContent.includes('ORBIT'));
        if (btn) btn.click();
      })()
    `);
    await delay(600);
    const botWindowBox = await cdp.eval(`
      (() => {
        const win = document.querySelector('[role="dialog"][aria-label*="ORBIT"]') ||
                    document.querySelector('[role="dialog"]');
        if (!win) return { found: false };
        const rect = win.getBoundingClientRect();
        return {
          found: true,
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height,
          viewportHeight: window.innerHeight,
          fitsViewport: rect.top >= 50 && rect.bottom <= window.innerHeight
        };
      })()
    `);
    console.log('BUG-001 Result:', botWindowBox);
    results.push({ id: 'BUG-001', pass: botWindowBox.found && botWindowBox.top >= 50 });

    console.log('\n--- VERIFYING BUG-002 (Compare button scrolls to comparison section) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/export-packing-solutions#comparison-matrix` });
    await delay(1500);
    const scrollPos = await cdp.eval(`
      (() => {
        const el = document.getElementById('comparison-matrix');
        if (!el) return { found: false };
        const rect = el.getBoundingClientRect();
        return {
          found: true,
          rectTop: rect.top,
          isScrolledNearTop: rect.top >= 0 && rect.top <= 250,
          scrollY: window.scrollY
        };
      })()
    `);
    console.log('BUG-002 Comparison Matrix Position:', scrollPos);
    results.push({ id: 'BUG-002', pass: scrollPos.found && scrollPos.scrollY > 0 });

    console.log('\n--- VERIFYING BUG-003 & BUG-004 (Container Guide Selection & 6-Container Studio) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/container-guide` });
    await delay(1500);
    const studioCheck = await cdp.eval(`
      (() => {
        const completeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Complete 6-Container Studio'));
        return {
          hasCompleteStudioBtn: !!completeBtn,
          url: window.location.href
        };
      })()
    `);
    console.log('BUG-004 Studio Overview Check:', studioCheck);
    results.push({ id: 'BUG-004', pass: studioCheck.hasCompleteStudioBtn });

    // BUG-003: Select 20ft Standard Dry Container
    await cdp.send('Page.navigate', { url: `${BASE_URL}/container-guide?container=20ft-standard#container-showcase` });
    await delay(1500);
    const container20ftCheck = await cdp.eval(`
      (() => {
        const bodyText = document.body.innerText;
        const has20ftTitle = bodyText.includes("20' Standard Dry Container") || bodyText.includes("20ft Standard Dry");
        const hasIso = bodyText.includes('22G1');
        return {
          has20ftTitle,
          hasIso
        };
      })()
    `);
    console.log('BUG-003 20ft Container Check:', container20ftCheck);
    results.push({ id: 'BUG-003', pass: container20ftCheck.has20ftTitle && container20ftCheck.hasIso });

    console.log('\n--- VERIFYING BUG-005 (Operational Gallery Lightbox) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await delay(1800);
    // Click enlarge photograph button in operational gallery
    await cdp.eval(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const enlargeBtn = buttons.find(b => b.textContent.includes('Enlarge Photograph'));
        if (enlargeBtn) enlargeBtn.click();
      })()
    `);
    await delay(800);
    const lightboxCheck = await cdp.eval(`
      (() => {
        const modal = document.querySelector('[role="dialog"][aria-label="Operational photograph details"]');
        if (!modal) return { found: false };
        const img = modal.querySelector('img');
        return {
          found: true,
          isPortalInBody: modal.parentElement === document.body,
          zIndex: window.getComputedStyle(modal).zIndex,
          loadingAttr: img ? img.getAttribute('loading') : null,
          imgComplete: img ? img.complete : false
        };
      })()
    `);
    console.log('BUG-005 Lightbox Check:', lightboxCheck);
    results.push({ id: 'BUG-005', pass: lightboxCheck.found && lightboxCheck.isPortalInBody && lightboxCheck.loadingAttr === 'eager' });

    console.log('\n--- VERIFYING BUG-006 (Operational Shipment Link to Selected Shipment) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/import-export?shipment=fr-crane-loading#shipment-fr-crane-loading` });
    await delay(1500);
    const shipmentSelectCheck = await cdp.eval(`
      (() => {
        const targetCard = document.getElementById('shipment-fr-crane-loading');
        const modal = document.querySelector('[role="dialog"]');
        return {
          cardExists: !!targetCard,
          cardHasHighlightRing: targetCard ? targetCard.className.includes('ring-2') || targetCard.className.includes('border-[#B62825]') : false,
          modalOpen: !!modal
        };
      })()
    `);
    console.log('BUG-006 Shipment Selection Check:', shipmentSelectCheck);
    results.push({ id: 'BUG-006', pass: shipmentSelectCheck.cardExists && shipmentSelectCheck.modalOpen });

    console.log('\n--- VERIFYING BUG-007, BUG-011, BUG-018, BUG-019 (Quote Request Form) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/request-quote` });
    await delay(1500);
    // Check initial selection is empty (BUG-007)
    const quoteStep1Check = await cdp.eval(`
      (() => {
        const activeCards = Array.from(document.querySelectorAll('button')).filter(b => b.className.includes('border-[#B62825]') && (b.textContent.includes('Ocean Cargo') || b.textContent.includes('Stuffing Ops') || b.textContent.includes('Air Cargo')));
        return {
          selectedServiceCount: activeCards.length
        };
      })()
    `);
    console.log('BUG-007 Initial Selection (should be 0):', quoteStep1Check);
    
    // Advance without selecting service -> triggers error
    await cdp.eval(`
      (() => {
        const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('CONTINUE'));
        if (nextBtn) nextBtn.click();
      })()
    `);
    await delay(300);
    const step1Error = await cdp.eval(`
      (() => {
        const err = Array.from(document.querySelectorAll('p')).find(p => p.textContent.includes('select a core service'));
        return err ? err.textContent : null;
      })()
    `);
    console.log('BUG-007 Step 1 Error:', step1Error);
    results.push({ id: 'BUG-007', pass: quoteStep1Check.selectedServiceCount === 0 && !!step1Error });

    // Select Ocean Cargo
    await cdp.eval(`
      (() => {
        const oceanBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Ocean Cargo'));
        if (oceanBtn) oceanBtn.click();
      })()
    `);
    await delay(300);
    await cdp.eval(`
      (() => {
        const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('CONTINUE'));
        if (nextBtn) nextBtn.click();
      })()
    `);
    await delay(500);

    // BUG-019 & BUG-018 in Step 2
    const weightInputTest = await cdp.eval(`
      (() => {
        const input = document.querySelector('input[name="approxWeight"]');
        if (!input) return { found: false };
        return {
          found: true,
          inputMode: input.getAttribute('inputmode')
        };
      })()
    `);
    console.log('BUG-019 Weight Input Test:', weightInputTest);
    results.push({ id: 'BUG-019', pass: weightInputTest.found && weightInputTest.inputMode === 'decimal' });

    // Fill Step 2 inputs via React setter
    await cdp.eval(`
      (() => {
        function setReactInput(el, val) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const desc = document.querySelector('input[name="cargoDescription"]');
        const weight = document.querySelector('input[name="approxWeight"]');
        if (desc) setReactInput(desc, 'Heavy Industrial Machining Skid');
        if (weight) setReactInput(weight, '24.5');
      })()
    `);
    await delay(300);
    await cdp.eval(`
      (() => {
        const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('CONTINUE'));
        if (nextBtn) nextBtn.click();
      })()
    `);
    await delay(500);

    // Step 3 check
    const step3RouteCheck = await cdp.eval(`
      (() => {
        const originInput = document.querySelector('input[name="originCity"]');
        const destInput = document.querySelector('input[name="destinationPort"]');
        return {
          hasOriginField: !!originInput,
          hasDestinationField: !!destInput
        };
      })()
    `);
    console.log('BUG-018 Step 3 Route Check:', step3RouteCheck);
    results.push({ id: 'BUG-018', pass: step3RouteCheck.hasOriginField && step3RouteCheck.hasDestinationField });

    console.log('\n--- VERIFYING BUG-008 & BUG-009 & BUG-014 (Footer Links & Google Maps) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await delay(1500);
    const footerCheck = await cdp.eval(`
      (() => {
        const footer = document.querySelector('footer');
        if (!footer) return { found: false };
        const twoSolutionsLink = Array.from(footer.querySelectorAll('a')).find(a => a.textContent.includes('Two Export Solutions'));
        const twoSolutionsArrow = twoSolutionsLink ? twoSolutionsLink.querySelector('svg') : null;
        const arrowClasses = twoSolutionsArrow ? twoSolutionsArrow.getAttribute('class') : '';

        const addrLink = footer.querySelector('a[href*="google.com/maps"]');
        const addrHref = addrLink ? addrLink.getAttribute('href') : null;

        return {
          found: true,
          arrowHasOpacity0: arrowClasses.includes('opacity-0'),
          addrHref,
          hasTargetBlank: addrLink ? addrLink.getAttribute('target') === '_blank' : false,
          hasBalajiBhavan: addrHref ? addrHref.includes('Balaji+Bhavan') || addrHref.includes('Balaji') : false
        };
      })()
    `);
    console.log('BUG-008, BUG-009, BUG-014 Footer Check:', footerCheck);
    results.push({ id: 'BUG-008', pass: footerCheck.arrowHasOpacity0 });
    results.push({ id: 'BUG-009', pass: !!footerCheck.addrHref && footerCheck.hasTargetBlank });
    results.push({ id: 'BUG-014', pass: footerCheck.hasBalajiBhavan });

    console.log('\n--- VERIFYING BUG-010, BUG-011, BUG-012, BUG-013 (Contact Page) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/contact` });
    await delay(1500);
    const contactFormCheck = await cdp.eval(`
      (() => {
        const subjectInput = document.querySelector('input[placeholder="Enter your subject"]');
        return {
          subjectValue: subjectInput ? subjectInput.value : null,
          hasSubjectPlaceholder: !!subjectInput
        };
      })()
    `);
    console.log('BUG-010 Contact Subject Check:', contactFormCheck);
    results.push({ id: 'BUG-010', pass: contactFormCheck.subjectValue === '' && contactFormCheck.hasSubjectPlaceholder });

    // BUG-011 & BUG-012 & BUG-013: Fill contact form with invalid phone, then valid, test validation & fallback
    await cdp.eval(`
      (() => {
        function setReactInput(el, val) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
        function setReactTextarea(el, val) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
          setter.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }

        const nameInput = document.querySelector('input[placeholder="e.g. Sunil Kumar"]');
        const emailInput = document.querySelector('input[type="email"]');
        const phoneInput = document.querySelector('input[type="tel"]');
        const subjectInput = document.querySelector('input[placeholder="Enter your subject"]');
        const msgInput = document.querySelector('textarea');

        if (nameInput) setReactInput(nameInput, 'Rajesh Mehta');
        if (emailInput) setReactInput(emailInput, 'rajesh@exportcorp.in');
        if (phoneInput) setReactInput(phoneInput, 'badPhoneLetters');
        if (subjectInput) setReactInput(subjectInput, 'Export Lashing Requirement');
        if (msgInput) setReactTextarea(msgInput, 'Need container stuffing and lashing for 40ft HC at Nhava Sheva.');

        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.click();
      })()
    `);
    await delay(400);
    const phoneErrorCheck = await cdp.eval(`
      (() => {
        const err = Array.from(document.querySelectorAll('p')).find(p => p.textContent.includes('cannot contain alphabetic') || p.textContent.includes('valid telephone'));
        return {
          hasPhoneError: !!err,
          errorText: err ? err.textContent : null
        };
      })()
    `);
    console.log('BUG-011 Phone Error Check:', phoneErrorCheck);
    results.push({ id: 'BUG-011', pass: phoneErrorCheck.hasPhoneError });

    // Now supply valid phone and submit to test fallback banner and copy button
    await cdp.eval(`
      (() => {
        const phoneInput = document.querySelector('input[type="tel"]');
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(phoneInput, '+91 98200 12345');
        phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
        phoneInput.dispatchEvent(new Event('change', { bubbles: true }));
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.click();
      })()
    `);
    await delay(2000);
    const contactFallbackCheck = await cdp.eval(`
      (() => {
        const mailtoLink = document.querySelector('a[href^="mailto:info@msklogisticsolution.com"]');
        const copyBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Copy Enquiry Details') || b.textContent.includes('Copied'));
        const bodyText = document.body.innerText;

        return {
          hasNotice: bodyText.includes('Transmission Notice') || bodyText.includes('Submission Notice'),
          hasMailtoLink: !!mailtoLink,
          hasCopyBtn: !!copyBtn,
          mailtoHref: mailtoLink ? mailtoLink.getAttribute('href') : null
        };
      })()
    `);
    console.log('BUG-012 & BUG-013 Fallback Check:', contactFallbackCheck);
    results.push({ id: 'BUG-012', pass: contactFallbackCheck.hasNotice });
    results.push({ id: 'BUG-013', pass: contactFallbackCheck.hasMailtoLink && contactFallbackCheck.hasCopyBtn });

    console.log('\n--- VERIFYING BUG-015 (Services Breadcrumb) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/services` });
    await delay(1500);
    const servicesBreadcrumbCheck = await cdp.eval(`
      (() => {
        const breadcrumbEl = document.querySelector('section .font-mono-code') || document.querySelector('.font-mono-code');
        const text = breadcrumbEl ? breadcrumbEl.innerText : '';
        const links = breadcrumbEl ? Array.from(breadcrumbEl.querySelectorAll('a, span')).map(e => e.innerText) : [];
        return {
          breadcrumbFound: !!breadcrumbEl,
          text,
          links,
          hasHome: text.includes('Home'),
          hasServices: text.includes('Services')
        };
      })()
    `);
    console.log('BUG-015 Services Breadcrumb Check:', servicesBreadcrumbCheck);
    results.push({ id: 'BUG-015', pass: servicesBreadcrumbCheck.breadcrumbFound && servicesBreadcrumbCheck.hasHome && servicesBreadcrumbCheck.hasServices });

    console.log('\n--- VERIFYING BUG-016 (Services Mega Menu Cutoff at 1280px) ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await delay(1500);
    await cdp.eval(`
      (() => {
        const servicesBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim().startsWith('Services'));
        if (servicesBtn) servicesBtn.click();
      })()
    `);
    await delay(600);
    const servicesDropdownBounds = await cdp.eval(`
      (() => {
        const dropdown = document.querySelector('[role="menu"]');
        if (!dropdown) return { found: false };
        const rect = dropdown.getBoundingClientRect();
        return {
          found: true,
          left: rect.left,
          right: rect.right,
          width: rect.width,
          viewportWidth: window.innerWidth,
          isCutOffLeft: rect.left < 0,
          isCutOffRight: rect.right > window.innerWidth
        };
      })()
    `);
    console.log('BUG-016 Services Dropdown at 1280px:', servicesDropdownBounds);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_bug016_services_dropdown_1280px.png'));
    results.push({ id: 'BUG-016', pass: servicesDropdownBounds.found && !servicesDropdownBounds.isCutOffLeft });

    console.log('\n--- VERIFYING BUG-017 (Quote Request Submission Fallback & Resiliency) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/request-quote` });
    await delay(1500);
    // Fill full quote request to reach step 5
    await cdp.eval(`
      (() => {
        // Step 1: Pick Air Cargo
        const airBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Air Cargo'));
        if (airBtn) airBtn.click();
      })()
    `);
    await delay(300);
    await cdp.eval(`(() => Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('CONTINUE')).click())()`);
    await delay(400);

    // Step 2
    await cdp.eval(`
      (() => {
        function setReactInput(el, val) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const desc = document.querySelector('input[name="cargoDescription"]');
        const weight = document.querySelector('input[name="approxWeight"]');
        if (desc) setReactInput(desc, 'Pharmaceutical Consignments');
        if (weight) setReactInput(weight, '25.5');
      })()
    `);
    await delay(300);
    await cdp.eval(`(() => Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('CONTINUE')).click())()`);
    await delay(400);

    // Step 3
    await cdp.eval(`
      (() => {
        function setReactInput(el, val) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const dest = document.querySelector('input[name="destinationPort"]');
        const addr = document.querySelector('input[name="operationalAddress"]');
        if (dest) setReactInput(dest, 'Frankfurt Airport');
        if (addr) setReactInput(addr, 'Mumbai Sahar Cargo Terminal');
      })()
    `);
    await delay(300);
    await cdp.eval(`(() => Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('CONTINUE')).click())()`);
    await delay(400);

    // Step 4
    await cdp.eval(`
      (() => {
        function setReactInput(el, val) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          setter.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const company = document.querySelector('input[name="companyName"]');
        const contact = document.querySelector('input[name="contactName"]');
        const email = document.querySelector('input[name="email"]');
        const phone = document.querySelector('input[name="phone"]');
        if (company) setReactInput(company, 'Pharma Exports Ltd.');
        if (contact) setReactInput(contact, 'Vikram Sharma');
        if (email) setReactInput(email, 'vikram@pharmaexports.com');
        if (phone) setReactInput(phone, '+91 99887 76655');
      })()
    `);
    await delay(300);
    await cdp.eval(`(() => Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('CONTINUE')).click())()`);
    await delay(400);

    // Step 5: Check consent & Submit
    await cdp.eval(`
      (() => {
        const consent = document.querySelector('input[name="privacyConsent"]');
        if (consent) {
          consent.click();
        }
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.click();
      })()
    `);
    await delay(2000);
    const quoteFallbackCheck = await cdp.eval(`
      (() => {
        const mailtoLink = document.querySelector('a[href^="mailto:info@msklogisticsolution.com"]');
        const copyBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Copy Quote Details'));
        const bodyText = document.body.innerText;
        return {
          hasNotice: bodyText.includes('SUBMISSION NOTICE'),
          hasMailtoLink: !!mailtoLink,
          hasCopyBtn: !!copyBtn,
          preservedCompany: bodyText.includes('Pharma Exports Ltd.')
        };
      })()
    `);
    console.log('BUG-017 Quote Fallback Check:', quoteFallbackCheck);
    results.push({ id: 'BUG-017', pass: quoteFallbackCheck.hasNotice && quoteFallbackCheck.hasMailtoLink && quoteFallbackCheck.hasCopyBtn && quoteFallbackCheck.preservedCompany });

    console.log('\n========================================');
    console.log('AUTOMATED VERIFICATION SUMMARY:');
    console.log('========================================');
    console.table(results);

  } catch (err) {
    console.error('Fatal execution error during verification:', err);
  } finally {
    await cdp.close();
    proc.kill();
  }
}

run();
