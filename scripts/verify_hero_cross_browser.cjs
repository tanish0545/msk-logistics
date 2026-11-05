const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ARTIFACT_DIR = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
const TARGET_HOST = 'http://127.0.0.1:5173';

const BROWSERS = {
  edge: {
    name: 'Microsoft Edge',
    exe: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    port: 9240
  },
  brave: {
    name: 'Brave Browser',
    exe: 'C:\\Users\\tanis\\AppData\\Local\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    port: 9241
  },
  chrome: {
    name: 'Google Chrome',
    exe: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    port: 9242
  }
};

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

async function runBrowser(browserKey, tasks) {
  const cfg = BROWSERS[browserKey];
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), `vfy-${browserKey}-`));
  console.log(`\n===========================================================`);
  console.log(`VERIFYING ${cfg.name.toUpperCase()} (PORT ${cfg.port})`);
  console.log(`===========================================================`);

  const proc = spawn(cfg.exe, [
    '--headless=new',
    `--remote-debugging-port=${cfg.port}`,
    `--user-data-dir=${tmpDir}`,
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 40; i++) {
    await sleep(300);
    try {
      const version = await fetchJson(`http://127.0.0.1:${cfg.port}/json/version`);
      if (version && version.webSocketDebuggerUrl) {
        wsUrl = version.webSocketDebuggerUrl;
        break;
      }
    } catch (e) {}
  }

  if (!wsUrl) {
    console.error(`Failed to connect to ${cfg.name}`);
    proc.kill();
    return {};
  }

  const results = {};

  try {
    const targets = await fetchJson(`http://127.0.0.1:${cfg.port}/json`);
    const pageTarget = targets.find(t => t.type === 'page');
    const targetWs = pageTarget ? pageTarget.webSocketDebuggerUrl : wsUrl;

    const ws = new globalThis.WebSocket(targetWs);
    await new Promise(r => ws.onopen = r);

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
    await send('Runtime.enable');

    // Initial navigation
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1536,
      height: 864,
      deviceScaleFactor: 1,
      mobile: false
    });
    await send('Page.navigate', { url: TARGET_HOST + '/' });
    await sleep(4000);

    for (const task of tasks) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: task.width,
        height: task.height,
        deviceScaleFactor: 1,
        mobile: task.width < 600,
      });
      await sleep(1000);

      // Verify image status & measure layout
      const evalRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const img = document.querySelector('img[src*="msk-cinematic-port"]');
          if (!img) return { error: 'Hero image not found' };
          const cs = getComputedStyle(img);
          const rect = img.getBoundingClientRect();
          const parentRect = img.parentElement.getBoundingClientRect();
          const h1 = document.querySelector('h1');
          const h1Rect = h1 ? h1.getBoundingClientRect() : null;
          const quoteBtn = document.querySelector('a[href="/request-quote"]');
          const quoteRect = quoteBtn ? quoteBtn.getBoundingClientRect() : null;

          return {
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            objectFit: cs.objectFit,
            objectPosition: cs.objectPosition,
            transform: cs.transform,
            translate: cs.translate,
            imageRect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
            parentRect: { left: parentRect.left, top: parentRect.top, width: parentRect.width, height: parentRect.height },
            headlineRect: h1Rect ? { left: h1Rect.left, top: h1Rect.top, right: h1Rect.right, bottom: h1Rect.bottom } : null,
            quoteBtnRect: quoteRect ? { left: quoteRect.left, top: quoteRect.top, right: quoteRect.right, bottom: quoteRect.bottom } : null
          };
        })()`,
        returnByValue: true
      });

      results[task.name] = evalRes.result.value;
      console.log(`[${cfg.name}] ${task.name} (${task.width}x${task.height}):`);
      console.log(`  objectFit: ${evalRes.result.value.objectFit}, objectPosition: ${evalRes.result.value.objectPosition}, transform: ${evalRes.result.value.transform}`);
      console.log(`  imageRect: left=${evalRes.result.value.imageRect?.left}, width=${evalRes.result.value.imageRect?.width}, height=${evalRes.result.value.imageRect?.height}`);

      if (task.outputFile) {
        const { data } = await send('Page.captureScreenshot', { format: 'png' });
        const outPath = path.join(ARTIFACT_DIR, task.outputFile);
        fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
        console.log(`  -> Saved artifact: ${task.outputFile} (${fs.statSync(outPath).size} bytes)`);
      }
    }

    ws.close();
  } finally {
    proc.kill();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
  }

  return results;
}

async function main() {
  console.log('===========================================================');
  console.log('MSK LOGISTICS — HERO CROSS-BROWSER CONSISTENCY VERIFICATION');
  console.log('===========================================================');

  const desktopTasks = [
    { name: '1536px', width: 1536, height: 864, outputFile: 'temp' },
    { name: '1366px', width: 1366, height: 768, outputFile: 'temp' },
    { name: '1920px', width: 1920, height: 1080, outputFile: 'temp' },
  ];

  // 1. Edge
  const edgeTasks = [
    { name: '1536px', width: 1536, height: 864, outputFile: 'live_hero_edge_1536px.png' },
    { name: '1366px', width: 1366, height: 768, outputFile: 'live_hero_edge_1366px.png' },
    { name: '1920px', width: 1920, height: 1080, outputFile: 'live_hero_desktop_1920px.png' },
    { name: '768px', width: 768, height: 1024, outputFile: 'live_hero_tablet_768px.png' },
    { name: '390px', width: 390, height: 844, outputFile: 'live_hero_mobile_390px.png' },
  ];
  const edgeResults = await runBrowser('edge', edgeTasks);

  // 2. Brave
  const braveTasks = [
    { name: '1536px', width: 1536, height: 864, outputFile: 'live_hero_brave_1536px.png' },
    { name: '1366px', width: 1366, height: 768, outputFile: 'live_hero_brave_1366px.png' },
  ];
  const braveResults = await runBrowser('brave', braveTasks);

  // 3. Chrome
  const chromeTasks = [
    { name: '1536px', width: 1536, height: 864, outputFile: 'live_hero_chrome_1536px.png' },
  ];
  const chromeResults = await runBrowser('chrome', chromeTasks);

  console.log('\n===========================================================');
  console.log('CROSS-BROWSER COMPARISON MATRIX (1536px)');
  console.log('===========================================================');
  console.log('Edge 1536px imageRect:', edgeResults['1536px']?.imageRect);
  console.log('Brave 1536px imageRect:', braveResults['1536px']?.imageRect);
  console.log('Chrome 1536px imageRect:', chromeResults['1536px']?.imageRect);

  const matchEB = Math.abs(edgeResults['1536px']?.imageRect?.left - braveResults['1536px']?.imageRect?.left) < 0.1;
  const matchEC = Math.abs(edgeResults['1536px']?.imageRect?.left - chromeResults['1536px']?.imageRect?.left) < 0.1;
  console.log(`Edge matches Brave exactly: ${matchEB}`);
  console.log(`Edge matches Chrome exactly: ${matchEC}`);
}

main().catch(console.error);

