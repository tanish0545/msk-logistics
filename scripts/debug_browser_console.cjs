const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

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

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(__dirname, '../.tmp_chrome_network_debug');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--remote-debugging-port=9487',
    `--user-data-dir=${tmpDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions'
  ]);

  let ws;
  try {
    let targets;
    for (let i = 0; i < 20; i++) {
      try {
        targets = await fetchJson('http://127.0.0.1:9487/json');
        if (targets && targets.length) break;
      } catch {
        await delay(300);
      }
    }

    const page = targets.find(t => t.type === 'page') || targets[0];
    ws = new globalThis.WebSocket(page.webSocketDebuggerUrl);
    await new Promise(r => ws.addEventListener('open', r, { once: true }));

    let id = 1;
    function send(method, params = {}) {
      return new Promise(res => {
        const reqId = ++id;
        const handler = (e) => {
          const msg = JSON.parse(e.data.toString());
          if (msg.id === reqId) {
            ws.removeEventListener('message', handler);
            res(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: reqId, method, params }));
      });
    }

    ws.addEventListener('message', e => {
      const msg = JSON.parse(e.data.toString());
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('[CONSOLE]', msg.params.type, msg.params.args.map(a => a.value || a.description));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.log('[EXCEPTION]', JSON.stringify(msg.params.exceptionDetails));
      }
      if (msg.method === 'Network.responseReceived') {
        const r = msg.params.response;
        if (r.status >= 400) {
          console.log('[NETWORK ERROR]', r.status, r.url);
        }
      }
      if (msg.method === 'Network.loadingFailed') {
        console.log('[NETWORK FAILED]', msg.params.errorText, msg.params.canceled);
      }
    });

    await send('Runtime.enable');
    await send('Network.enable');
    await send('Page.enable');

    console.log('Navigating to http://127.0.0.1:5173/ ...');
    await send('Page.navigate', { url: 'http://127.0.0.1:5173/' });

    for (let sec = 1; sec <= 10; sec++) {
      await delay(1000);
      const res = await send('Runtime.evaluate', {
        expression: `({
          title: document.title,
          rootChildren: document.getElementById('root') ? document.getElementById('root').children.length : -1,
          hasCoreServices: !!document.getElementById('core-services')
        })`,
        returnByValue: true
      });
      console.log(`Sec ${sec}:`, res ? res.result.value : 'null');
      if (res && res.result && res.result.value && res.result.value.hasCoreServices) {
        console.log('Found #core-services! Ready.');
        break;
      }
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (ws) ws.close();
    proc.kill();
    await delay(500);
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
  }
}

run();
