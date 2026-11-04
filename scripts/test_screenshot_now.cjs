const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9225;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
}

async function test() {
  const p = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Temp\\chrome_snap_' + Date.now(),
    '--window-size=1440,900',
    'about:blank'
  ]);
  await sleep(1500);

  const targets = await getJson(`http://127.0.0.1:${PORT}/json/list`);
  const ws = new global.WebSocket(targets[0].webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let msgId = 1;
  const callbacks = new Map();
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && callbacks.has(msg.id)) {
      const { resolve } = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      resolve(msg.result);
    }
  };
  function send(method, params = {}) {
    const id = msgId++;
    return new Promise(resolve => {
      callbacks.set(id, { resolve });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');

  console.log('Navigating to http://localhost:5173/ ...');
  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await sleep(4000);

  const html = await send('Runtime.evaluate', {
    expression: 'document.body.innerHTML',
    returnByValue: true
  });
  console.log('HTML length:', html.result?.value?.length);
  console.log('HTML start:', html.result?.value?.substring(0, 300));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'test_snap_5173.png'), Buffer.from(shot.data, 'base64'));
  console.log('Saved test_snap_5173.png');

  ws.close();
  p.kill();
}
test();

