const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9224;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
}

async function inspect() {
  const userDataDir = path.join(process.env.TEMP || 'C:\\Temp', 'chrome_inspect_' + Date.now());
  const p = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${userDataDir}`,
    '--window-size=1440,900',
    'about:blank'
  ]);
  await sleep(1500);

  try {
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
    await send('Network.enable');

    const requestUrls = new Map();
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.method === 'Network.requestWillBeSent') {
        requestUrls.set(msg.params.requestId, msg.params.request.url);
      }
      if (msg.method === 'Network.responseReceived') {
        if (msg.params.response.status >= 400) {
          console.log('[HTTP ERROR]', msg.params.response.status, msg.params.response.url);
        }
      }
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('[BROWSER CONSOLE]', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.log('[BROWSER EXCEPTION]', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
      }
      if (msg.id && callbacks.has(msg.id)) {
        const { resolve } = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        resolve(msg.result);
      }
    };

    console.log('Navigating to http://127.0.0.1:5173/ ...');
    await send('Page.navigate', { url: 'http://127.0.0.1:5173/' });
    
    // Wait for React to mount in Vite dev mode
    console.log('Waiting for React to mount in #root...');
    const startTime = Date.now();
    let mounted = false;
    while (Date.now() - startTime < 15000) {
      const check = await send('Runtime.evaluate', {
        expression: `!!document.querySelector('#root > div')`,
        returnByValue: true
      });
      if (check.result.value) {
        mounted = true;
        break;
      }
      await sleep(500);
    }
    console.log('React mounted:', mounted, 'time:', Date.now() - startTime, 'ms');
    await sleep(1000);

    const evalResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const heroImg = document.querySelector('img[alt="MSK Logistics International Port Operations"]');
        const containerCards = document.querySelectorAll('a[href*="/services#"]');
        const stickerShowcase = document.querySelector('section.bg-\\\\[\\\\#B62825\\\\]');
        const orbitBtn = document.querySelector('button[aria-label*="MSK ORBIT"]');
        
        return {
          title: document.title,
          heroImg: {
            exists: !!heroImg,
            src: heroImg ? heroImg.src : null,
            naturalWidth: heroImg ? heroImg.naturalWidth : null,
            naturalHeight: heroImg ? heroImg.naturalHeight : null,
            complete: heroImg ? heroImg.complete : null,
            computedStyle: heroImg ? {
              display: window.getComputedStyle(heroImg).display,
              opacity: window.getComputedStyle(heroImg).opacity,
              visibility: window.getComputedStyle(heroImg).visibility,
              width: window.getComputedStyle(heroImg).width,
              height: window.getComputedStyle(heroImg).height,
            } : null
          },
          containerCardsCount: containerCards.length,
          stickerShowcaseExists: !!stickerShowcase,
          orbitBtn: {
            exists: !!orbitBtn,
            rect: orbitBtn ? orbitBtn.getBoundingClientRect() : null
          }
        };
      })()`,
      returnByValue: true
    });

    console.log('Live DOM inspection:', JSON.stringify(evalResult.result.value, null, 2));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.data, 'base64');
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'live_dev_home_screenshot.png'), buffer);
    console.log('Saved live_dev_home_screenshot.png (' + buffer.length + ' bytes)');

    ws.close();
  } catch (err) {
    console.error('Inspect error:', err);
  } finally {
    p.kill();
    try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}
  }
}

inspect();
