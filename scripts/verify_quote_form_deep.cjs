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
  console.log('=== Verifying React Form Controlled Input Navigation to Step 3 ===\n');

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), `msk_quote_step3_${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9495',
    `--user-data-dir=${tmpDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--window-size=1440,900'
  ]);

  let cdp;
  try {
    let targets;
    for (let i = 0; i < 25; i++) {
      try {
        targets = await fetchJson('http://127.0.0.1:9495/json');
        if (targets && targets.length) break;
      } catch {
        await delay(300);
      }
    }

    const pageTarget = targets.find(t => t.type === 'page') || targets[0];
    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');

    await cdp.setViewport(1440, 900, false);
    await cdp.send('Page.navigate', { url: `${BASE_URL}/request-quote` });
    await delay(2000);

    // Step 1: Select Ocean Cargo and Continue
    await cdp.eval(`(() => {
      const oceanBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Ocean Cargo'));
      if (oceanBtn) oceanBtn.click();
    })()`);
    await delay(400);

    await cdp.eval(`(() => {
      const continueBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('CONTINUE'));
      if (continueBtn) continueBtn.click();
    })()`);
    await delay(800);

    // Step 2: Use prototype setters so React's onChange fires!
    const step2Filled = await cdp.eval(`(() => {
      const setTextarea = (selector, val) => {
        const el = document.querySelector(selector);
        if (el) {
          const proto = window.HTMLTextAreaElement.prototype;
          const set = Object.getOwnPropertyDescriptor(proto, 'value').set;
          set.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };
      const setInput = (selector, val) => {
        const el = document.querySelector(selector);
        if (el) {
          const proto = window.HTMLInputElement.prototype;
          const set = Object.getOwnPropertyDescriptor(proto, 'value').set;
          set.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };

      setTextarea('textarea[name="cargoDescription"]', 'Precision CNC Milling Equipment & Spares');
      setInput('input[name="approxWeight"]', '18.5');
      return true;
    })()`);
    console.log('Step 2 filled via prototype setter:', step2Filled);
    await delay(500);

    // Click CONTINUE to Step 3
    await cdp.eval(`(() => {
      const continueBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('CONTINUE'));
      if (continueBtn) continueBtn.click();
    })()`);
    await delay(800);

    // Inspect Step 3 Fields
    const step3Info = await cdp.eval(`(() => {
      const originInput = document.querySelector('input[name="originCity"]');
      const originLabel = originInput?.closest('div')?.querySelector('label')?.textContent || '';
      const containerSelect = document.querySelector('select[name="containerSize"]');
      const firstOpt = containerSelect?.options[0];
      const dateInput = document.querySelector('input[name="preferredDate"]');
      const destInput = document.querySelector('input[name="destinationPort"]');
      const destDatalist = destInput?.getAttribute('list') ? document.getElementById(destInput.getAttribute('list')) : null;
      const posSelect = document.querySelector('select[name="containerLocationOrPositioning"]');
      const opAddr = document.querySelector('textarea[name="operationalAddress"]');

      return {
        originInputFound: !!originInput,
        originLabel: originLabel.trim(),
        originHasAsterisk: originLabel.includes('*'),
        containerSelectFound: !!containerSelect,
        containerInitialVal: containerSelect ? containerSelect.value : null,
        firstOptionPlaceholder: firstOpt ? firstOpt.text : null,
        firstOptionDisabled: firstOpt ? firstOpt.disabled : false,
        dateInputFound: !!dateInput,
        dateMin: dateInput ? dateInput.getAttribute('min') : null,
        destDatalistOptionsCount: destDatalist ? destDatalist.options.length : 0,
        positioningSelectorFound: !!posSelect,
        operationalAddressFound: !!opAddr
      };
    })()`);
    console.log('\n================ STEP 3 FIELDS VERIFICATION ================');
    console.log(step3Info);

    // Fill Step 3 using prototype setter
    await cdp.eval(`(() => {
      const setInput = (selector, val) => {
        const el = document.querySelector(selector);
        if (el) {
          const proto = window.HTMLInputElement.prototype;
          const set = Object.getOwnPropertyDescriptor(proto, 'value').set;
          set.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };
      const setSelect = (selector, val) => {
        const el = document.querySelector(selector);
        if (el) {
          const proto = window.HTMLSelectElement.prototype;
          const set = Object.getOwnPropertyDescriptor(proto, 'value').set;
          set.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };
      const setTextarea = (selector, val) => {
        const el = document.querySelector(selector);
        if (el) {
          const proto = window.HTMLTextAreaElement.prototype;
          const set = Object.getOwnPropertyDescriptor(proto, 'value').set;
          set.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };

      setInput('input[name="originCity"]', 'JNPT Nhava Sheva CFS');
      setInput('input[name="destinationPort"]', 'Jebel Ali Port, Dubai (AEJEA)');
      setSelect('select[name="containerSize"]', '40ft High Cube Container (40HQ)');
      setSelect('select[name="containerLocationOrPositioning"]', 'MSK Nhava Sheva Yard / CFS Hub');
      setInput('input[name="preferredDate"]', '2026-11-25');
      setTextarea('textarea[name="operationalAddress"]', 'Sector 7, Conex CFS Terminal Area, Dronagiri Node, Navi Mumbai 400707');
    })()`);
    await delay(600);

    // Check sessionStorage draft at Step 3
    const draftBeforeRefresh = await cdp.eval(`(() => {
      const raw = sessionStorage.getItem('msk_quote_draft_v1');
      return raw ? JSON.parse(raw) : null;
    })()`);
    console.log('\nDraft in sessionStorage before refresh:', {
      step: draftBeforeRefresh?.step,
      cargoDescription: draftBeforeRefresh?.formData?.cargoDescription,
      originCity: draftBeforeRefresh?.formData?.originCity,
      containerSize: draftBeforeRefresh?.formData?.containerSize,
      operationalAddress: draftBeforeRefresh?.formData?.operationalAddress
    });

    // RELOAD PAGE TO VERIFY REFRESH RESTORATION (BUG 01)
    console.log('\nReloading page to test persistence (BUG 01)...');
    await cdp.send('Page.reload');
    await delay(2000);

    const stateAfterReload = await cdp.eval(`(() => {
      const raw = sessionStorage.getItem('msk_quote_draft_v1');
      const parsed = raw ? JSON.parse(raw) : null;
      const originInput = document.querySelector('input[name="originCity"]');
      const containerSelect = document.querySelector('select[name="containerSize"]');
      const opAddr = document.querySelector('textarea[name="operationalAddress"]');
      const stepHeader = document.querySelector('h3');
      return {
        sessionStorageActive: !!raw,
        restoredStep: parsed?.step,
        headerText: stepHeader ? stepHeader.textContent : '',
        originValue: originInput ? originInput.value : null,
        containerValue: containerSelect ? containerSelect.value : null,
        addressValue: opAddr ? opAddr.value : null
      };
    })()`);
    console.log('\nState after reload (Restored to Step 3 with all inputs intact):', stateAfterReload);

    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_quote_form_step3_restored_desktop.png'));

    // Test Mobile Viewport at 390px (BUG 16 & BUG 17)
    console.log('\nTesting mobile viewport at 390px (BUG 16 & 17)...');
    await cdp.setViewport(390, 844, true);
    await delay(1000);

    const mobileMetrics = await cdp.eval(`(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
      const overflowingInputs = inputs.filter(el => {
        const r = el.getBoundingClientRect();
        return r.right > window.innerWidth || r.left < 0;
      });
      const continueBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('CONTINUE'));
      const prevBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('PREVIOUS'));
      const cRect = continueBtn ? continueBtn.getBoundingClientRect() : null;
      const pRect = prevBtn ? prevBtn.getBoundingClientRect() : null;
      return {
        overflowingInputsCount: overflowingInputs.length,
        continueBtnWidth: cRect ? cRect.width : 0,
        continueBtnHeight: cRect ? cRect.height : 0,
        prevBtnWidth: pRect ? pRect.width : 0,
        windowWidth: window.innerWidth
      };
    })()`);
    console.log('\nMobile 390px Metrics:', mobileMetrics);

    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_quote_form_step3_mobile_390px.png'));

  } catch (err) {
    console.error('Error during step 3 verification:', err);
  } finally {
    if (cdp) await cdp.close();
    proc.kill();
  }
}

run();
