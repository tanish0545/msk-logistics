const { spawn } = require('child_process');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

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
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9777',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    'http://127.0.0.1:5173/'
  ]);

  let versionInfo = null;
  for (let i = 0; i < 20; i++) {
    await sleep(300);
    try {
      versionInfo = await fetchJson('http://127.0.0.1:9777/json/version');
      if (versionInfo && versionInfo.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  const list = await fetchJson('http://127.0.0.1:9777/json/list');
  const target = list.find(t => t.type === 'page');
  const wsUrl = target ? target.webSocketDebuggerUrl : versionInfo.webSocketDebuggerUrl;
  const ws = new globalThis.WebSocket(wsUrl);
  await new Promise(r => ws.addEventListener('open', r, { once: true }));

  let idCounter = 1;
  const pending = new Map();
  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data.toString());
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    }
  });

  const send = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  await send('Page.enable');
  await send('Runtime.enable');

  await send('Page.navigate', { url: 'http://127.0.0.1:5173/' });
  await sleep(2000);

  const viewports = [
    { width: 1920, height: 1080 },
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 390, height: 844 }
  ];

  for (const vp of viewports) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 600
    });
    await sleep(600);
    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('section[aria-label*="MSK Logistics"]');
        return el ? Math.round(el.getBoundingClientRect().height) : null;
      })()`,
      returnByValue: true
    });
    console.log(`Viewport ${vp.width}x${vp.height}: Hero height = ${evalRes.result.value}px`);
  }

  chrome.kill();
  process.exit(0);
}

run().catch(console.error);
