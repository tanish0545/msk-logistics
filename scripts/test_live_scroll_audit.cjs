const { spawn } = require('child_process');
const http = require('http');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--remote-debugging-port=9340',
    '--headless=new',
    '--window-size=1440,900',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\tanis\\.gemini\\temp\\chrome-profile-live-audit'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  const targets = await new Promise((res, rej) => {
    http.get('http://127.0.0.1:9340/json', r => {
      let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
    }).on('error', rej);
  });

  const pageTarget = targets.find(t => t.type === 'page');
  const ws = new globalThis.WebSocket(pageTarget.webSocketDebuggerUrl);

  await new Promise((res, rej) => {
    ws.addEventListener('open', res, { once: true });
    ws.addEventListener('error', rej);
  });

  let id = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const cur = ++id;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data.toString());
      if (msg.id === cur) {
        ws.removeEventListener('message', handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');
  console.log('Navigating to live production site...');
  await send('Page.navigate', { url: 'https://msklogisticsolution.vercel.app' });
  await new Promise(r => setTimeout(r, 5000));

  // Scroll down gradually to trigger all lazy images
  console.log('Scrolling down the live page gradually...');
  for (let y = 500; y <= 8000; y += 1000) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
    await new Promise(r => setTimeout(r, 600));
  }
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
  await new Promise(r => setTimeout(r, 1000));

  const check = await send('Runtime.evaluate', {
    expression: `(() => {
      const imgs = Array.from(document.images);
      const failed = imgs.filter(i => i.complete && i.naturalWidth === 0 && !i.src.endsWith('.svg'));
      const total = imgs.length;
      const loaded = imgs.filter(i => i.complete && i.naturalWidth > 0).length;
      const pending = imgs.filter(i => !i.complete).length;
      return { total, loaded, pending, failedCount: failed.length, failedUrls: failed.map(i => i.src) };
    })()`,
    returnByValue: true
  });

  console.log('Live Production Scroll-Audit Result:', JSON.stringify(check.result?.value, null, 2));

  ws.close();
  chromeProc.kill();
}

test().catch(console.error);

