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
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }

  async screenshot(outPath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outPath, Buffer.from(res.data, 'base64'));
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  console.log('=== Step 1: Launching Chrome for Our Team & Our Staff Verification ===');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--remote-debugging-port=9352',
    '--headless=new',
    '--window-size=1440,960',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\tanis\\.gemini\\temp\\chrome-profile-team-staff'
  ]);

  await delay(2500);

  const targets = await fetchJson('http://127.0.0.1:9352/json');
  const pageTarget = targets.find(t => t.type === 'page');
  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);

  try {
    await client.connect();
    await client.send('Page.enable');
    await client.send('Runtime.enable');

    console.log('Navigating to http://127.0.0.1:5173/company/staff ...');
    await client.send('Page.navigate', { url: `${BASE_URL}/company/staff` });
    await delay(3000);

    // Verify Hero Details
    const heroDetails = await client.eval(`(() => {
      const hero = document.getElementById('msk-team-hero');
      const staffSec = document.getElementById('msk-staff-action');
      const teamImg = hero ? hero.querySelector('img') : null;
      const h1 = hero ? hero.querySelector('h1') : null;
      const rows = hero ? hero.querySelectorAll('.group\\\\/row, .space-y-5 > div') : [];
      return {
        hasHero: !!hero,
        hasStaffSection: !!staffSec,
        h1Text: h1 ? h1.innerText : null,
        imgSrc: teamImg ? teamImg.src : null,
        imgComplete: teamImg ? teamImg.complete : false,
        imgNaturalWidth: teamImg ? teamImg.naturalWidth : 0,
        imgNaturalHeight: teamImg ? teamImg.naturalHeight : 0,
        infoRowsCount: rows.length
      };
    })()`);
    console.log('Hero Verification Result:', JSON.stringify(heroDetails, null, 2));

    // Screenshot 1: Desktop Hero (1440px)
    const shotHero = path.join(ARTIFACT_DIR, 'our_team_hero_desktop_1440px.png');
    await client.screenshot(shotHero);
    console.log('Saved Hero Desktop Screenshot:', shotHero);

    // Scroll to Staff In Action section
    console.log('Scrolling to Our Staff In Action section...');
    await client.eval(`(() => {
      const sec = document.getElementById('msk-staff-action');
      if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'start' });
    })()`);
    await delay(1200);

    // Verify Staff In Action Images and Cards
    const staffDetails = await client.eval(`(() => {
      const sec = document.getElementById('msk-staff-action');
      if (!sec) return null;
      const imgs = Array.from(sec.querySelectorAll('img')).map(i => ({
        src: i.src,
        complete: i.complete,
        width: i.naturalWidth,
        height: i.naturalHeight
      }));
      const h2 = sec.querySelector('h2');
      return {
        h2Text: h2 ? h2.innerText : null,
        images: imgs
      };
    })()`);
    console.log('Staff Section Result:', JSON.stringify(staffDetails, null, 2));

    // Screenshot 2: Desktop Staff In Action (1440px)
    const shotStaff = path.join(ARTIFACT_DIR, 'our_staff_in_action_desktop_1440px.png');
    await client.screenshot(shotStaff);
    console.log('Saved Staff In Action Desktop Screenshot:', shotStaff);

    // Scroll to Functional Categories & Leadership
    console.log('Scrolling to Functional Categories & Leadership...');
    await client.eval(`(() => {
      window.scrollBy({ top: 600, behavior: 'instant' });
    })()`);
    await delay(1000);

    const shotCategories = path.join(ARTIFACT_DIR, 'our_staff_categories_leadership_1440px.png');
    await client.screenshot(shotCategories);
    console.log('Saved Categories & Leadership Screenshot:', shotCategories);

    // Test Mobile Viewport (390 x 844)
    console.log('\n=== Testing Mobile Viewport (390px) ===');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await delay(1000);

    // Scroll to top
    await client.eval(`window.scrollTo({ top: 0, behavior: 'instant' });`);
    await delay(1000);

    const shotMobileHero = path.join(ARTIFACT_DIR, 'our_team_mobile_hero_390px.png');
    await client.screenshot(shotMobileHero);
    console.log('Saved Mobile Hero Screenshot:', shotMobileHero);

    // Scroll down on mobile
    await client.eval(`window.scrollBy({ top: 650, behavior: 'instant' });`);
    await delay(1000);

    const shotMobileStaff = path.join(ARTIFACT_DIR, 'our_staff_mobile_cards_390px.png');
    await client.screenshot(shotMobileStaff);
    console.log('Saved Mobile Staff Cards Screenshot:', shotMobileStaff);

    // Check About Page Section 7
    console.log('\n=== Testing About Page Section 7 Team Section ===');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 960,
      deviceScaleFactor: 1,
      mobile: false
    });
    await delay(500);

    await client.send('Page.navigate', { url: `${BASE_URL}/about` });
    await delay(3000);

    await client.eval(`(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const teamSec = sections.find(s => s.innerText.includes('OUR TEAM') || s.innerText.includes('The People Behind Our Operations'));
      if (teamSec) teamSec.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`);
    await delay(1500);

    const shotAbout = path.join(ARTIFACT_DIR, 'about_page_team_section_1440px.png');
    await client.screenshot(shotAbout);
    console.log('Saved About Page Team Section Screenshot:', shotAbout);

    console.log('\n=== All Verification Steps Completed Successfully! ===');

  } finally {
    client.close();
    chromeProc.kill();
  }
}

run().catch(console.error);
