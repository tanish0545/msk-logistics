const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

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
    console.log(`[Screenshot Saved] -> ${path.basename(outputPath)} (${(size / 1024).toFixed(1)} KB)`);
  }

  async setViewport(width, height, isMobile = false) {
    await this.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: isMobile,
    });
  }

  async close() {
    if (this.ws) {
      try { this.ws.close(); } catch { }
    }
  }
}

async function run() {
  console.log('================================================================');
  console.log('       MSK LOGISTICS — COMPREHENSIVE 18-BUG QA VERIFICATION     ');
  console.log('================================================================\n');

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), `msk_qa_verify_v2_${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9493',
    `--user-data-dir=${tmpDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--window-size=1536,1000'
  ]);

  let cdp;
  const results = {};

  try {
    let targets;
    for (let i = 0; i < 25; i++) {
      try {
        targets = await fetchJson('http://127.0.0.1:9493/json');
        if (targets && targets.length) break;
      } catch {
        await delay(300);
      }
    }

    if (!targets || !targets.length) {
      throw new Error('Could not connect to Chrome on port 9493');
    }

    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');

    // -------------------------------------------------------------
    // PHASE 1: Quote Request Form (BUG 01, 02, 03, 04, 05)
    // -------------------------------------------------------------
    console.log('\n--- VERIFYING PHASE 1: Multi-Step Quote Request Form ---');
    await cdp.setViewport(1440, 900, false);
    await cdp.send('Page.navigate', { url: `${BASE_URL}/request-quote` });
    await delay(2000);

    // Step 1: Select Ocean Cargo service
    await cdp.eval(`(() => {
      const cards = Array.from(document.querySelectorAll('button, div[role="button"]'));
      const oceanCard = cards.find(c => c.textContent.includes('Ocean Cargo'));
      if (oceanCard) oceanCard.click();
    })()`);
    await delay(500);

    // Advance to Step 2
    await cdp.eval(`(() => {
      const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next') || b.textContent.includes('Continue'));
      if (nextBtn) nextBtn.click();
    })()`);
    await delay(800);

    // Step 2: Fill cargo details
    await cdp.eval(`(() => {
      const setVal = (selector, val) => {
        const el = document.querySelector(selector);
        if (el) {
          el.value = val;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };
      setVal('textarea[name="cargoDescription"]', 'Industrial CNC Milling Machines and Precision Spares');
      setVal('input[name="approxWeight"]', '14.5');
    })()`);
    await delay(500);

    // Advance to Step 3 (Equipment, Origin, Date, Address)
    await cdp.eval(`(() => {
      const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next') || b.textContent.includes('Continue'));
      if (nextBtn) nextBtn.click();
    })()`);
    await delay(1000);

    // 1. Verify BUG 03: Container equipment type starts empty with placeholder
    const containerSelectInfo = await cdp.eval(`(() => {
      const select = document.querySelector('select[name="containerSize"]');
      if (!select) return { found: false };
      return {
        found: true,
        value: select.value,
        firstOptionText: select.options[0]?.text,
        firstOptionValue: select.options[0]?.value,
        firstOptionDisabled: select.options[0]?.disabled,
        optionsCount: select.options.length
      };
    })()`);
    console.log('BUG 03 - Container Equipment Initial Value:', containerSelectInfo);
    results.bug03 = containerSelectInfo.found && containerSelectInfo.value === '' && containerSelectInfo.firstOptionDisabled;

    // 2. Verify BUG 02: Origin City mandatory indicator
    const originCityInfo = await cdp.eval(`(() => {
      const input = document.querySelector('input[name="originCity"]');
      const label = input ? input.closest('div')?.querySelector('label') : null;
      return {
        found: !!input,
        label: label ? label.textContent.trim() : null,
        value: input ? input.value : ''
      };
    })()`);
    console.log('BUG 02 - Origin City Field Info:', originCityInfo);
    results.bug02 = originCityInfo.found && originCityInfo.label && originCityInfo.label.includes('*');

    // 3. Verify BUG 04: Preferred Execution Date has min attribute set to today
    const dateInfo = await cdp.eval(`(() => {
      const input = document.querySelector('input[name="preferredDate"]');
      return {
        found: !!input,
        min: input ? input.getAttribute('min') : null,
        type: input ? input.type : null
      };
    })()`);
    console.log('BUG 04 - Preferred Date Min Attribute:', dateInfo);
    const todayStr = new Date().toISOString().split('T')[0];
    results.bug04 = dateInfo.found && dateInfo.min === todayStr;

    // 4. Verify BUG 05: Country datalist, Operational Address & Positioning Location
    const countryAndPositioningInfo = await cdp.eval(`(() => {
      const destInput = document.querySelector('input[name="destinationPort"]');
      const listAttr = destInput ? destInput.getAttribute('list') : null;
      const datalist = listAttr ? document.getElementById(listAttr) : null;
      const posSelect = document.querySelector('select[name="containerLocationOrPositioning"]');
      const opAddr = document.querySelector('textarea[name="operationalAddress"]');
      return {
        destInputFound: !!destInput,
        datalistFound: !!datalist,
        datalistOptionsCount: datalist ? datalist.options.length : 0,
        positioningSelectorFound: !!posSelect,
        operationalAddressFound: !!opAddr
      };
    })()`);
    console.log('BUG 05 - Country Datalist, Positioning Selector & Operational Address:', countryAndPositioningInfo);
    results.bug05 = countryAndPositioningInfo.datalistFound && 
                     countryAndPositioningInfo.datalistOptionsCount > 20 && 
                     countryAndPositioningInfo.positioningSelectorFound && 
                     countryAndPositioningInfo.operationalAddressFound;

    // Fill Step 3 values
    await cdp.eval(`(() => {
      const setVal = (selector, val) => {
        const el = document.querySelector(selector);
        if (el) {
          el.value = val;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };
      setVal('input[name="originCity"]', 'JNPT Nhava Sheva CFS');
      setVal('input[name="destinationPort"]', 'Jebel Ali Port, Dubai (AEJEA)');
      setVal('select[name="containerSize"]', '40ft High Cube Container (40HQ)');
      setVal('select[name="containerLocationOrPositioning"]', 'MSK Nhava Sheva Yard / CFS Hub');
      setVal('textarea[name="operationalAddress"]', 'Plot 14-B, Sector 7, Conex CFS Terminal Area, Dronagiri, Navi Mumbai 400707');
    })()`);
    await delay(800);

    // 5. Verify BUG 01: Persist draft form data and active step in sessionStorage
    const storageBeforeRefresh = await cdp.eval(`(() => {
      const draft = sessionStorage.getItem('msk_quote_draft_v1');
      return {
        raw: draft,
        parsed: draft ? JSON.parse(draft) : null
      };
    })()`);
    console.log('BUG 01 - Draft in SessionStorage at Step 3:', {
      step: storageBeforeRefresh.parsed?.step,
      cargoDescription: storageBeforeRefresh.parsed?.formData?.cargoDescription,
      originCity: storageBeforeRefresh.parsed?.formData?.originCity,
      containerSize: storageBeforeRefresh.parsed?.formData?.containerSize
    });

    // Refresh page to verify persistence (BUG 01)
    await cdp.send('Page.reload');
    await delay(2000);

    const stateAfterRefresh = await cdp.eval(`(() => {
      const draft = sessionStorage.getItem('msk_quote_draft_v1');
      const originInput = document.querySelector('input[name="originCity"]');
      const containerSelect = document.querySelector('select[name="containerSize"]');
      const stepHeader = document.querySelector('h2, h3');
      return {
        sessionStoragePresent: !!draft,
        restoredStep: draft ? JSON.parse(draft).step : null,
        originValue: originInput ? originInput.value : null,
        containerValue: containerSelect ? containerSelect.value : null,
        headerText: stepHeader ? stepHeader.textContent : ''
      };
    })()`);
    console.log('BUG 01 - State after refresh (restores Step 3 and field data):', stateAfterRefresh);
    results.bug01 = stateAfterRefresh.sessionStoragePresent && 
                    stateAfterRefresh.restoredStep === 3 && 
                    stateAfterRefresh.originValue === 'JNPT Nhava Sheva CFS' &&
                    stateAfterRefresh.containerValue === '40ft High Cube Container (40HQ)';

    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_quote_form_step3_restored_desktop.png'));

    // -------------------------------------------------------------
    // PHASE 11: Quote Request Mobile (BUG 16 & BUG 17)
    // -------------------------------------------------------------
    console.log('\n--- VERIFYING PHASE 11: Quote Form Mobile Viewport (390px) ---');
    await cdp.setViewport(390, 844, true);
    await delay(1000);

    const mobileFormMetrics = await cdp.eval(`(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
      const buttons = Array.from(document.querySelectorAll('button')).filter(b => 
        b.textContent.includes('Next') || b.textContent.includes('Previous') || b.textContent.includes('Back')
      );
      const overflowingInputs = inputs.filter(el => {
        const r = el.getBoundingClientRect();
        return r.right > window.innerWidth || r.left < 0;
      });
      const nextBtn = buttons.find(b => b.textContent.includes('Next'));
      const btnRect = nextBtn ? nextBtn.getBoundingClientRect() : null;
      return {
        overflowingInputsCount: overflowingInputs.length,
        nextBtnWidth: btnRect ? btnRect.width : 0,
        nextBtnHeight: btnRect ? btnRect.height : 0,
        windowWidth: window.innerWidth
      };
    })()`);
    console.log('BUG 16 & 17 - Mobile Form Metrics:', mobileFormMetrics);
    results.bug16 = mobileFormMetrics.overflowingInputsCount === 0;
    results.bug17 = mobileFormMetrics.nextBtnWidth > 150 && mobileFormMetrics.nextBtnHeight >= 44;

    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_quote_form_step3_mobile_390px.png'));

    // -------------------------------------------------------------
    // PHASE 3: Import & Export Page (BUG 07)
    // -------------------------------------------------------------
    console.log('\n--- VERIFYING PHASE 3: Import & Export Page (BUG 07) ---');
    await cdp.setViewport(1920, 1080, false);
    await cdp.send('Page.navigate', { url: `${BASE_URL}/import-export` });
    await delay(2000);

    const importExportCards = await cdp.eval(`(() => {
      const allHeadings = Array.from(document.querySelectorAll('h3'));
      const lclHeading = allHeadings.find(h => h.textContent.includes('LCL'));
      const fclHeading = allHeadings.find(h => h.textContent.includes('FCL'));

      const lclCard = lclHeading ? lclHeading.closest('.rounded-2xl') : null;
      const fclCard = fclHeading ? fclHeading.closest('.rounded-2xl') : null;

      if (!lclCard || !fclCard) return { found: false };

      const lclStyle = window.getComputedStyle(lclCard);
      const fclStyle = window.getComputedStyle(fclCard);

      const lclBadge = lclCard.querySelector('.editorial-badge');
      const fclBadge = fclCard.querySelector('.editorial-badge');

      const lclBadgeStyle = lclBadge ? window.getComputedStyle(lclBadge) : null;
      const fclBadgeStyle = fclBadge ? window.getComputedStyle(fclBadge) : null;

      return {
        found: true,
        lclBorderColor: lclStyle.borderColor,
        fclBorderColor: fclStyle.borderColor,
        lclBg: lclStyle.backgroundColor,
        fclBg: fclStyle.backgroundColor,
        borderMatches: lclStyle.borderColor === fclStyle.borderColor,
        bgMatches: lclStyle.backgroundColor === fclStyle.backgroundColor,
        lclBadgeBg: lclBadgeStyle ? lclBadgeStyle.backgroundColor : null,
        fclBadgeBg: fclBadgeStyle ? fclBadgeStyle.backgroundColor : null,
        badgesMatch: lclBadgeStyle?.backgroundColor === fclBadgeStyle?.backgroundColor
      };
    })()`);
    console.log('BUG 07 - Import & Export LCL vs FCL Styling:', importExportCards);
    results.bug07 = importExportCards.found && importExportCards.borderMatches && importExportCards.bgMatches && importExportCards.badgesMatch;

    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_import_export_lcl_fcl_1920px.png'));

    // -------------------------------------------------------------
    // PHASE 7 & 8: Staff Page (BUG 11, 12, 13)
    // -------------------------------------------------------------
    console.log('\n--- VERIFYING PHASE 7 & 8: Staff Page (BUG 11, 12, 13) ---');
    await cdp.setViewport(1536, 1000, false);
    await cdp.send('Page.navigate', { url: `${BASE_URL}/company/staff` });
    await delay(2000);

    const staffPageCheck = await cdp.eval(`(() => {
      const crumbs = Array.from(document.querySelectorAll('nav[aria-label="Breadcrumb"] a, nav[aria-label="Breadcrumb"] span'))
        .map(el => el.textContent.trim()).filter(Boolean);
      const mainDiv = document.querySelector('main > div');
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const heroSection = document.getElementById('msk-team-hero');
      const actionSection = document.getElementById('msk-staff-action');
      return {
        crumbs,
        heroBg: heroSection ? window.getComputedStyle(heroSection).backgroundColor : null,
        actionBg: actionSection ? window.getComputedStyle(actionSection).backgroundColor : null,
        isLightDesign: heroSection ? window.getComputedStyle(heroSection).backgroundColor !== 'rgb(11, 11, 13)' : false
      };
    })()`);
    console.log('BUG 11, 12, 13 - Staff Page Check:', staffPageCheck);
    results.bug11 = staffPageCheck.isLightDesign;
    results.bug12_staff = staffPageCheck.crumbs.length >= 2;
    results.bug13_staff = !staffPageCheck.crumbs.includes('Company') && staffPageCheck.crumbs.includes('Our Staff');

    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_staff_page_light_hierarchy_1536px.png'));

    // -------------------------------------------------------------
    // PHASE 8: Branches Breadcrumbs (BUG 13)
    // -------------------------------------------------------------
    console.log('\n--- VERIFYING PHASE 8: Branches Breadcrumbs (BUG 13) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/branches` });
    await delay(2000);

    const branchesCrumbs = await cdp.eval(`(() => {
      const crumbs = Array.from(document.querySelectorAll('nav[aria-label="Breadcrumb"] a, nav[aria-label="Breadcrumb"] span'))
        .map(el => el.textContent.trim()).filter(Boolean);
      return { crumbs };
    })()`);
    console.log('BUG 13 - Branches Breadcrumbs:', branchesCrumbs);
    results.bug13_branches = !branchesCrumbs.crumbs.includes('Company') && branchesCrumbs.crumbs.includes('Our Branches');

    // -------------------------------------------------------------
    // PHASE 8: Vessel Schedule & Operations Breadcrumbs (BUG 12)
    // -------------------------------------------------------------
    console.log('\n--- VERIFYING PHASE 8: Vessel Schedule & Operations Breadcrumbs (BUG 12) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/vessel-schedule` });
    await delay(2000);
    const vesselCrumbs = await cdp.eval(`(() => {
      const crumbs = Array.from(document.querySelectorAll('nav[aria-label="Breadcrumb"] a, nav[aria-label="Breadcrumb"] span'))
        .map(el => el.textContent.trim()).filter(Boolean);
      return { crumbs };
    })()`);
    console.log('BUG 12 - Vessel Schedule Breadcrumbs:', vesselCrumbs);
    results.bug12_vessel = vesselCrumbs.crumbs.includes('Vessel Schedule');

    await cdp.send('Page.navigate', { url: `${BASE_URL}/operations` });
    await delay(2000);
    const opsCrumbs = await cdp.eval(`(() => {
      const crumbs = Array.from(document.querySelectorAll('nav[aria-label="Breadcrumb"] a, nav[aria-label="Breadcrumb"] span'))
        .map(el => el.textContent.trim()).filter(Boolean);
      return { crumbs };
    })()`);
    console.log('BUG 12 - Operations Breadcrumbs:', opsCrumbs);
    results.bug12_ops = opsCrumbs.crumbs.includes('Operations');

    // -------------------------------------------------------------
    // PHASE 9: Container Guide Scroll Spy (BUG 14)
    // -------------------------------------------------------------
    console.log('\n--- VERIFYING PHASE 9: Container Guide Scroll Spy (BUG 14) ---');
    await cdp.setViewport(1536, 1000, false);
    await cdp.send('Page.navigate', { url: `${BASE_URL}/container-guide` });
    await delay(2000);

    const initialNavHighlight = await cdp.eval(`(() => {
      const breakBulkLink = document.querySelector('a[href="#break-bulk"]');
      const showcaseLink = document.querySelector('a[href="#container-showcase"]');
      return {
        breakBulkHasActiveBg: breakBulkLink ? breakBulkLink.className.includes('bg-red-50') : false,
        showcaseHasActiveBg: showcaseLink ? showcaseLink.className.includes('bg-red-50') : false
      };
    })()`);
    console.log('BUG 14 - Initial Navigation Active State:', initialNavHighlight);
    results.bug14_initial = !initialNavHighlight.breakBulkHasActiveBg && initialNavHighlight.showcaseHasActiveBg;

    // Scroll to Break Bulk Cargo section
    await cdp.eval(`(() => {
      const target = document.getElementById('break-bulk');
      if (target) {
        target.scrollIntoView({ behavior: 'instant' });
      }
    })()`);
    await delay(1200);

    const scrolledNavHighlight = await cdp.eval(`(() => {
      const breakBulkLink = document.querySelector('a[href="#break-bulk"]');
      return {
        breakBulkHasActiveBgAfterScroll: breakBulkLink ? breakBulkLink.className.includes('bg-red-50') : false
      };
    })()`);
    console.log('BUG 14 - After scroll to Break Bulk Cargo:', scrolledNavHighlight);
    results.bug14 = results.bug14_initial && scrolledNavHighlight.breakBulkHasActiveBgAfterScroll;

    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_container_guide_dynamic_highlight.png'));

    // -------------------------------------------------------------
    // PHASE 10: Road Transport Lightbox & Mobile (BUG 15, 18)
    // -------------------------------------------------------------
    console.log('\n--- VERIFYING PHASE 10 & 11: Road Transport (BUG 15, 18) ---');
    await cdp.setViewport(1536, 1000, false);
    await cdp.send('Page.navigate', { url: `${BASE_URL}/services/road-transport` });
    await delay(2000);

    // Scroll to fleet grid and click first fleet card
    await cdp.eval(`(() => {
      const card = document.querySelector('.group.cursor-pointer');
      if (card) {
        card.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    })()`);
    await delay(800);

    await cdp.eval(`(() => {
      const card = document.querySelector('.group.cursor-pointer');
      if (card) {
        card.click();
      }
    })()`);
    await delay(1000);

    const lightboxInfo = await cdp.eval(`(() => {
      const modal = document.querySelector('[role="dialog"]');
      const newTabBtn = Array.from(document.querySelectorAll('a')).find(a => 
        a.textContent.includes('Open in New Tab') || a.getAttribute('title')?.includes('Open full-size')
      );
      return {
        modalFound: !!modal,
        newTabBtnFound: !!newTabBtn,
        newTabHref: newTabBtn ? newTabBtn.getAttribute('href') : null,
        newTabTarget: newTabBtn ? newTabBtn.getAttribute('target') : null
      };
    })()`);
    console.log('BUG 15 - Lightbox modal and New Tab action:', lightboxInfo);
    results.bug15 = lightboxInfo.modalFound && lightboxInfo.newTabBtnFound && lightboxInfo.newTabTarget === '_blank';

    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_road_transport_lightbox_desktop.png'));

    // Mobile layout check at 390px (BUG 18)
    await cdp.setViewport(390, 844, true);
    await delay(1000);

    // Close modal if open
    await cdp.eval(`(() => {
      const closeBtn = document.querySelector('button[aria-label="Close image viewer"]');
      if (closeBtn) closeBtn.click();
    })()`);
    await delay(800);

    const roadTransportMobileInfo = await cdp.eval(`(() => {
      const bodyWidth = document.body.scrollWidth;
      const windowWidth = window.innerWidth;
      const heroTitle = document.querySelector('h1');
      const specsTable = document.querySelector('.grid.grid-cols-1');
      return {
        horizontalOverflow: bodyWidth > windowWidth,
        bodyWidth,
        windowWidth,
        heroTitleFound: !!heroTitle,
        specsTableFound: !!specsTable
      };
    })()`);
    console.log('BUG 18 - Road Transport Mobile Layout Metrics:', roadTransportMobileInfo);
    results.bug18 = !roadTransportMobileInfo.horizontalOverflow;

    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_road_transport_mobile_390px.png'));

    // -------------------------------------------------------------
    // PHASE 5: Services Mega Menu Dropdown (BUG 09)
    // -------------------------------------------------------------
    console.log('\n--- VERIFYING PHASE 5: Services Dropdown Bottom Padding (BUG 09) ---');
    await cdp.setViewport(1536, 1000, false);
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await delay(2000);

    // Open Services dropdown
    await cdp.eval(`(() => {
      const servicesNavBtn = Array.from(document.querySelectorAll('button, a')).find(el => el.textContent.trim().startsWith('Services'));
      if (servicesNavBtn) {
        servicesNavBtn.click();
        servicesNavBtn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      }
    })()`);
    await delay(1000);

    const dropdownActionButtons = await cdp.eval(`(() => {
      const quoteBtn = Array.from(document.querySelectorAll('a, button')).find(b => b.textContent.includes('Request a Quote') && b.closest('.fixed, .absolute'));
      if (!quoteBtn) return { found: false };
      const qRect = quoteBtn.getBoundingClientRect();
      return {
        found: true,
        quoteBtnVisible: qRect.top < window.innerHeight && qRect.bottom <= window.innerHeight,
        quoteBtnBottom: qRect.bottom,
        windowHeight: window.innerHeight
      };
    })()`);
    console.log('BUG 09 - Services Dropdown Action Buttons Check:', dropdownActionButtons);
    results.bug09 = dropdownActionButtons.found && dropdownActionButtons.quoteBtnVisible;

    // -------------------------------------------------------------
    // PHASE 6: Card Hover Stability & Hardware Acceleration (BUG 10)
    // -------------------------------------------------------------
    console.log('\n--- VERIFYING PHASE 6: Card Hover Stability & Hardware Acceleration (BUG 10) ---');
    const hoverLiftCss = await cdp.eval(`(() => {
      const card = document.querySelector('.hover-lift');
      if (!card) return { found: false };
      const style = window.getComputedStyle(card);
      return {
        found: true,
        willChange: style.willChange,
        backfaceVisibility: style.backfaceVisibility,
        transition: style.transition
      };
    })()`);
    console.log('BUG 10 - .hover-lift Computed Style:', hoverLiftCss);
    results.bug10 = hoverLiftCss.found && (hoverLiftCss.willChange.includes('transform') || hoverLiftCss.backfaceVisibility === 'hidden');

    console.log('\n================================================================');
    console.log('                  FINAL VERIFICATION RESULTS                    ');
    console.log('================================================================');
    console.table(results);

  } catch (err) {
    console.error('Test run failed with error:', err);
  } finally {
    if (cdp) await cdp.close();
    proc.kill();
  }
}

run();
