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
  console.log('=== Launching Chrome CDP for Cinematic Experience & Team Verification ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(__dirname, '../.tmp_chrome_verify_cinematic');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9495',
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
        targets = await fetchJson('http://127.0.0.1:9495/json');
        if (targets && targets.length) break;
      } catch {
        await delay(400);
      }
    }

    if (!targets || !targets.length) {
      throw new Error('Could not connect to Chrome on 9495');
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

    console.log('\n--- 1. Testing Homepage & Core Services (Desktop 1536px) ---');
    await cdp.send('Page.navigate', { url: `${BASE_URL}/` });
    await delay(2500);

    // Scroll to #core-services
    const coreServicesAudit = await cdp.eval(`(() => {
      const section = document.getElementById('core-services');
      if (!section) return { error: '#core-services not found' };
      section.scrollIntoView({ behavior: 'instant', block: 'center' });
      
      const cards = Array.from(section.querySelectorAll('a[href^="/services/"]'));
      return {
        cardCount: cards.length,
        cards: cards.map((c, i) => {
          const title = c.querySelector('h3')?.innerText || '';
          const imgs = Array.from(c.querySelectorAll('img')).map(img => ({
            src: img.getAttribute('src'),
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            complete: img.complete
          }));
          const rect = c.getBoundingClientRect();
          return {
            index: i + 1,
            title,
            href: c.getAttribute('href'),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            images: imgs
          };
        })
      };
    })()`);

    console.log('Core Services Card Audit:', JSON.stringify(coreServicesAudit, null, 2));
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_cinematic_container_cards_desktop.png'));

    // Trigger hover on card 1 to reveal interior
    await cdp.eval(`(() => {
      const firstCard = document.querySelector('a[href^="/services/"]');
      if (firstCard) {
        firstCard.classList.add('group-hover/card');
        const event = new MouseEvent('mouseover', { bubbles: true });
        firstCard.dispatchEvent(event);
      }
    })()`);
    await delay(400);

    console.log('\n--- 2. Testing Homepage "Our Team" Section ---');
    const teamAudit = await cdp.eval(`(() => {
      const section = document.getElementById('homepage-our-team');
      if (!section) return { error: '#homepage-our-team not found' };
      section.scrollIntoView({ behavior: 'instant', block: 'center' });

      const heading = section.querySelector('h2')?.innerText;
      const teamImg = section.querySelector('img[src*="msk-team-containers"]');
      const rect = teamImg ? teamImg.getBoundingClientRect() : null;
      const button = section.querySelector('a[href="/company/staff"]')?.innerText;

      return {
        found: true,
        heading,
        button,
        img: teamImg ? {
          src: teamImg.getAttribute('src'),
          naturalWidth: teamImg.naturalWidth,
          naturalHeight: teamImg.naturalHeight,
          complete: teamImg.complete,
          visibleWidth: rect ? Math.round(rect.width) : 0,
          visibleHeight: rect ? Math.round(rect.height) : 0
        } : null
      };
    })()`);

    console.log('Homepage Our Team Section Audit:', JSON.stringify(teamAudit, null, 2));
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_cinematic_our_team_homepage.png'));

    console.log('\n--- 3. Testing Final Quote CTA Section with MskButton ---');
    await cdp.eval(`(() => {
      window.scrollTo(0, document.body.scrollHeight);
    })()`);
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_cinematic_homepage_quote_cta.png'));

    console.log('\n--- 4. Testing Mobile Viewport (390x844) ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await delay(500);

    await cdp.eval(`(() => {
      const section = document.getElementById('homepage-our-team');
      if (section) section.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_cinematic_our_team_mobile_390px.png'));

    console.log('\n--- 5. Testing Dedicated Staff Page (/company/staff) ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1536,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cdp.send('Page.navigate', { url: `${BASE_URL}/company/staff` });
    await delay(2500);

    const staffPageAudit = await cdp.eval(`(() => {
      const hero = document.getElementById('msk-team-hero');
      const teamImg = document.querySelector('img[src*="msk-team-containers"]');
      return {
        heroFound: !!hero,
        teamImg: teamImg ? {
          src: teamImg.getAttribute('src'),
          naturalWidth: teamImg.naturalWidth,
          naturalHeight: teamImg.naturalHeight,
          complete: teamImg.complete,
          width: teamImg.offsetWidth,
          height: teamImg.offsetHeight
        } : null
      };
    })()`);

    console.log('Staff Page Audit:', JSON.stringify(staffPageAudit, null, 2));
    await delay(600);
    await cdp.captureScreenshot(path.join(ARTIFACT_DIR, 'verified_cinematic_staff_page_hero.png'));

    console.log('\n=== All CDP Verifications & Screenshots Completed Successfully ===');

  } catch (err) {
    console.error('CDP verification error:', err);
  } finally {
    if (cdp) await cdp.close();
    proc.kill('SIGTERM');
    await delay(1000);
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  }
}

run();
