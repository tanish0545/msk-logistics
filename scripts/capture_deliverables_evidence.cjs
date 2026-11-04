const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_HOST = 'http://127.0.0.1:5173';

function sleep(ms) {
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

async function run() {
  console.log('===========================================================');
  console.log('DELIVERABLES BROWSER VISUAL EVIDENCE CAPTURE');
  console.log('===========================================================');

  console.log('Spawning Chrome on port 9222...');
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    TARGET_HOST + '/'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await sleep(400);
    try {
      const version = await fetchJson('http://127.0.0.1:9222/json/version');
      if (version && version.webSocketDebuggerUrl) {
        wsUrl = version.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!wsUrl) {
    console.error('ERROR: Could not connect to Chrome DevTools Protocol.');
    chrome.kill();
    process.exit(1);
  }

  const targets = await fetchJson('http://127.0.0.1:9222/json');
  const pageTarget = targets.find(t => t.type === 'page');
  const targetWs = pageTarget ? pageTarget.webSocketDebuggerUrl : wsUrl;

  const ws = new globalThis.WebSocket(targetWs);
  await new Promise(resolve => {
    if (ws.readyState === 1) resolve();
    else ws.addEventListener('open', resolve, { once: true });
  });

  let msgId = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('DOM.enable');
  await send('Runtime.enable');

  async function captureRoute({ url, width, height, filename, setupFn }) {
    console.log(`\nNavigating to ${url} at ${width}x${height}...`);
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 600,
    });
    await send('Page.navigate', { url });
    await sleep(2200);

    if (setupFn) {
      await setupFn();
      await sleep(600);
    }

    const { data } = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });

    const outPath = path.join(ARTIFACT_DIR, filename);
    fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
    console.log(`Saved screenshot: ${filename} (${fs.statSync(outPath).size} bytes)`);
  }

  // 1. Homepage Hero 1536px
  await captureRoute({
    url: `${TARGET_HOST}/`,
    width: 1536,
    height: 820,
    filename: 'live_hero_composition_1536px.png'
  });

  // 2. Homepage Hero Mobile 390px
  await captureRoute({
    url: `${TARGET_HOST}/`,
    width: 390,
    height: 844,
    filename: 'live_hero_mobile_390px.png'
  });

  // 3. Navbar Services Dropdown Open 1536px
  await captureRoute({
    url: `${TARGET_HOST}/`,
    width: 1536,
    height: 820,
    filename: 'live_navbar_services_dropdown_1536px.png',
    setupFn: async () => {
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const sBtn = btns.find(b => b.textContent && b.textContent.includes('Services'));
            if (sBtn) sBtn.click();
          })()
        `
      });
    }
  });

  // 4. Hazardous Cargo Page 1536px
  await captureRoute({
    url: `${TARGET_HOST}/services/hazardous-cargo`,
    width: 1536,
    height: 950,
    filename: 'live_hazardous_cargo_page_1536px.png'
  });

  // 5. Hazardous Cargo Page Technical Visuals & Lexicon (Scrolled)
  await captureRoute({
    url: `${TARGET_HOST}/services/hazardous-cargo`,
    width: 1536,
    height: 950,
    filename: 'live_hazardous_cargo_visuals_1536px.png',
    setupFn: async () => {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo(0, 520);`
      });
    }
  });

  // 6. Hazardous Cargo Mobile 390px
  await captureRoute({
    url: `${TARGET_HOST}/services/hazardous-cargo`,
    width: 390,
    height: 844,
    filename: 'live_hazardous_cargo_mobile_390px.png'
  });

  // 7. Break Bulk Section in Container Guide 1536px
  await captureRoute({
    url: `${TARGET_HOST}/container-guide#break-bulk`,
    width: 1536,
    height: 950,
    filename: 'live_break_bulk_wa0019_blue_1536px.png',
    setupFn: async () => {
      await send('Runtime.evaluate', {
        expression: `
          const bb = document.getElementById('break-bulk');
          if (bb) bb.scrollIntoView();
        `
      });
    }
  });

  // 8. Request Quote Step 1 with Hazardous Option 1536px
  await captureRoute({
    url: `${TARGET_HOST}/request-quote`,
    width: 1536,
    height: 950,
    filename: 'live_quote_hazardous_option_1536px.png'
  });

  console.log('\nAll deliverable screenshots captured successfully!');
  ws.close();
  chrome.kill();
  process.exit(0);
}

run().catch(err => {
  console.error('Execution error:', err);
  process.exit(1);
});

