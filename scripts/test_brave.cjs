const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function test() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'brave-test-'));
  const proc = spawn('C:\\Users\\tanis\\AppData\\Local\\BraveSoftware\\Brave-Browser\\Application\\brave.exe', [
    '--headless=new',
    '--remote-debugging-port=9229',
    '--user-data-dir=' + tmpDir,
    '--disable-gpu',
    '--no-sandbox',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));
  const res = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9229/json', r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => resolve(JSON.parse(d)));
    });
  });
  const wsUrl = res[0].webSocketDebuggerUrl;
  const ws = new globalThis.WebSocket(wsUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1536,
    height: 864,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send('Page.navigate', { url: 'http://127.0.0.1:5173/' });

  // Wait 4 seconds and check image status
  await new Promise(r => setTimeout(r, 4000));

  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const img = document.querySelector('img[src*="msk-cinematic-port"]');
      return {
        complete: img ? img.complete : null,
        naturalWidth: img ? img.naturalWidth : null,
        naturalHeight: img ? img.naturalHeight : null,
        currentSrc: img ? img.currentSrc : null,
        computedStyle: img ? {
          objectFit: getComputedStyle(img).objectFit,
          objectPosition: getComputedStyle(img).objectPosition,
          transform: getComputedStyle(img).transform
        } : null
      };
    })()`,
    returnByValue: true
  });
  console.log('Image status in Brave:', JSON.stringify(evalRes.result.value, null, 2));

  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  const outPath = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d\\brave_check_loaded.png';
  fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
  console.log('Saved brave_check_loaded.png, size:', fs.statSync(outPath).size);

  ws.close();
  proc.kill();
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
test().catch(console.error);

