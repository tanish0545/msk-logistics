const { spawn } = require('child_process');
const http = require('http');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

  close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chromeProc = spawn(chromePath, [
    '--remote-debugging-port=9338',
    '--headless=new',
    '--window-size=1440,900',
    '--disable-gpu',
    '--user-data-dir=C:\\Users\\tanis\\.gemini\\temp\\chrome-profile-live-diag'
  ]);

  await delay(2500);

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9338/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const pageTarget = targets.find(t => t.type === 'page');
  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);

  try {
    await client.connect();
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Network.enable');

    const networkErrors = [];
    client.ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data.toString());
      if (msg.method === 'Network.responseReceived') {
        const resp = msg.params.response;
        if (resp.status >= 400) {
          networkErrors.push({ url: resp.url, status: resp.status });
        }
      }
    });

    console.log('Navigating to live URL...');
    await client.send('Page.navigate', { url: 'https://msklogisticsolution.vercel.app' });
    await delay(5000);

    const info = await client.eval(`(() => {
      const scripts = Array.from(document.scripts).map(s => s.src);
      const images = Array.from(document.images);
      const unrendered = images.filter(img => img.naturalWidth === 0).map(img => ({
        src: img.src,
        loading: img.loading,
        complete: img.complete,
        opacity: window.getComputedStyle(img).opacity,
        rect: img.getBoundingClientRect()
      }));
      return {
        scripts,
        totalImages: images.length,
        unrenderedCount: unrendered.length,
        sampleUnrendered: unrendered.slice(0, 10)
      };
    })()`);

    console.log('Live Diagnostics:');
    console.log('Scripts:', info.scripts);
    console.log('Total Images:', info.totalImages);
    console.log('Unrendered Images Count:', info.unrenderedCount);
    console.log('Sample Unrendered:', JSON.stringify(info.sampleUnrendered, null, 2));
    console.log('Network 4xx/5xx Errors:', networkErrors);

  } finally {
    client.close();
    chromeProc.kill();
  }
}

run().catch(console.error);

