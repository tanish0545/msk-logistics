const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';
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
    '--remote-debugging-port=9891',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    'about:blank'
  ]);

  let versionInfo = null;
  for (let i = 0; i < 20; i++) {
    await sleep(300);
    try {
      versionInfo = await fetchJson('http://127.0.0.1:9891/json/version');
      if (versionInfo && versionInfo.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  const list = await fetchJson('http://127.0.0.1:9891/json/list');
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

  const filesToCapture = [
    {
      file: 'email_quote_internal.html',
      outName: 'evidence_email_quote_internal_desktop.png',
      width: 780,
      height: 1150,
      mobile: false
    },
    {
      file: 'email_quote_customer.html',
      outName: 'evidence_email_quote_customer_desktop.png',
      width: 780,
      height: 1100,
      mobile: false
    },
    {
      file: 'email_contact_internal.html',
      outName: 'evidence_email_contact_internal_desktop.png',
      width: 780,
      height: 980,
      mobile: false
    },
    {
      file: 'email_contact_customer.html',
      outName: 'evidence_email_contact_customer_desktop.png',
      width: 780,
      height: 950,
      mobile: false
    },
    {
      file: 'email_quote_customer.html',
      outName: 'evidence_email_quote_customer_mobile.png',
      width: 390,
      height: 950,
      mobile: true
    }
  ];

  for (const item of filesToCapture) {
    const fullPath = path.resolve('scratch', item.file).replace(/\\/g, '/');
    const fileUrl = `file:///${fullPath}`;

    await send('Emulation.setDeviceMetricsOverride', {
      width: item.width,
      height: item.height,
      deviceScaleFactor: 1,
      mobile: !!item.mobile
    });

    await send('Page.navigate', { url: fileUrl });
    await sleep(800);

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
    });

    fs.writeFileSync(path.join(ARTIFACT_DIR, item.outName), Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot: ${item.outName} (${item.width}x${item.height})`);
  }

  chrome.kill();
  console.log('All email preview screenshots captured successfully.');
  process.exit(0);
}

run().catch(err => {
  console.error('Error during email capture:', err);
  process.exit(1);
});

