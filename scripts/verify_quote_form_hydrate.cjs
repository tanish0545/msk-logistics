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
  console.log('=== Precise Step 3 Field & Draft Hydration Verification ===\n');

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), `msk_quote_hydrate_${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9496',
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
        targets = await fetchJson('http://127.0.0.1:9496/json');
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
    // Navigate to page first
    await cdp.send('Page.navigate', { url: `${BASE_URL}/request-quote` });
    await delay(1500);

    // 1. Inject draft into sessionStorage simulating a user who filled Step 1 and Step 2 and is at Step 3
    console.log('1. Setting draft in sessionStorage...');
    await cdp.eval(`(() => {
      const draft = {
        step: 3,
        data: {
          solutionType: 'client_container_and_cargo',
          enquiryCategory: 'ocean-cargo',
          cargoDescription: 'High-Precision CNC Milling Centers & Tooling',
          packageCount: '4 Crates',
          approxWeight: '18.5',
          weightUnit: 'tons',
          dimensions: '4.5m x 2.2m x 2.4m',
          packagingNeeds: 'ISPM-15 Heat Treated Crates with Moisture Barrier Foil',
          originCity: 'JNPT Nhava Sheva CFS',
          destinationPort: 'Jebel Ali Port, Dubai (AEJEA)',
          containerSize: '40ft High Cube Container (40HQ)',
          containerLocationOrPositioning: 'MSK Nhava Sheva Yard / CFS Hub',
          preferredDate: '2026-11-28',
          operationalAddress: 'Plot 14-B, Sector 7, Conex CFS Terminal Node, Dronagiri, Navi Mumbai 400707',
          companyName: 'Apex Machinery Exports Ltd',
          contactName: 'Rajesh K. Mehta',
          email: 'rajesh.mehta@apexmachinery.com',
          phone: '+91 98200 12345'
        }
      };
      sessionStorage.setItem('msk_quote_draft_v1', JSON.stringify(draft));
    })()`);

    // 2. Reload the page to test sessionStorage hydration (BUG 01)
    console.log('2. Reloading page to verify hydration of Step 3...');
    await cdp.send('Page.reload');
    await delay(2000);

    // 3. Inspect Step 3 Elements
    const step3Verified = await cdp.eval(`(() => {
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
        stepHeader: document.querySelector('h3')?.textContent,
        originInputFound: !!originInput,
        originValue: originInput ? originInput.value : null,
        originLabel: originLabel.trim(),
        originHasAsterisk: originLabel.includes('*'),
        containerSelectFound: !!containerSelect,
        containerValue: containerSelect ? containerSelect.value : null,
        containerOptionsCount: containerSelect ? containerSelect.options.length : 0,
        firstOptionPlaceholder: firstOpt ? firstOpt.text : null,
        firstOptionDisabled: firstOpt ? firstOpt.disabled : false,
        dateInputFound: !!dateInput,
        dateValue: dateInput ? dateInput.value : null,
        dateMin: dateInput ? dateInput.getAttribute('min') : null,
        destDatalistFound: !!destDatalist,
        destDatalistCount: destDatalist ? destDatalist.options.length : 0,
        positioningSelectorFound: !!posSelect,
        positioningValue: posSelect ? posSelect.value : null,
        operationalAddressFound: !!opAddr,
        operationalAddressValue: opAddr ? opAddr.value : null
      };
    })()`);

    console.log('\n================ STEP 3 HYDRATION & FIELDS ================');
    console.log(step3Verified);

    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_quote_form_step3_hydrated_desktop.png'));

    // 4. Test Mobile 390px Viewport on Step 3 (BUG 16 & BUG 17)
    console.log('\n4. Testing Mobile 390px Viewport on Step 3...');
    await cdp.setViewport(390, 844, true);
    await delay(1000);

    const mobileMetrics = await cdp.eval(`(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
      const overflowingInputs = inputs.filter(el => {
        const r = el.getBoundingClientRect();
        return r.right > window.innerWidth || r.left < 0;
      });
      const buttons = Array.from(document.querySelectorAll('button')).filter(b => 
        b.textContent.includes('CONTINUE') || b.textContent.includes('PREVIOUS') || b.textContent.includes('SUBMIT')
      );
      return {
        windowWidth: window.innerWidth,
        overflowingInputsCount: overflowingInputs.length,
        buttons: buttons.map(b => ({
          text: b.textContent.trim(),
          width: b.getBoundingClientRect().width,
          height: b.getBoundingClientRect().height
        }))
      };
    })()`);
    console.log('Mobile 390px Step 3 Metrics:', mobileMetrics);

    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_quote_form_step3_mobile_390px.png'));

  } catch (err) {
    console.error('Error during hydration verification:', err);
  } finally {
    if (cdp) await cdp.close();
    proc.kill();
  }
}

run();
