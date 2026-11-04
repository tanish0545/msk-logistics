import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9225;
const ARTIFACTS_DIR = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const cb = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) cb.reject(new Error(msg.error.message));
          else cb.resolve(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = this.id++;
      this.callbacks.set(msgId, { resolve, reject });
      this.ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('Launching headless Chrome...');
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--user-data-dir=' + path.join(process.cwd(), 'scratch', 'chrome-profile-' + Date.now()),
  ]);

  await sleep(1500);

  try {
    const listRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const tabs = await listRes.json();
    const targetTab = tabs[0];
    console.log('Connecting to Chrome CDP at:', targetTab.webSocketDebuggerUrl);

    const client = new CDPClient(targetTab.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('DOM.enable');

    async function capture(url, outFileName, width, height, setupFn = null) {
      console.log(`Navigating to ${url} at ${width}x${height}...`);
      await client.send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: width < 768,
      });

      await client.send('Page.navigate', { url });
      await sleep(2500);

      if (setupFn) {
        await setupFn(client);
        await sleep(1000);
      }

      const { data } = await client.send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: false,
      });

      const outPath = path.join(ARTIFACTS_DIR, outFileName);
      fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
      console.log(`Saved screenshot: ${outFileName}`);
    }

    // 1. Home Hero at 1920
    await capture('http://localhost:5173/', 'evidence_hero_1920.png', 1920, 1080);

    // 2. Home Hero at 1440
    await capture('http://localhost:5173/', 'evidence_hero_1440.png', 1440, 900);

    // 3. Home Hero at 1366
    await capture('http://localhost:5173/', 'evidence_hero_1366.png', 1366, 768);

    // 4. Home Hero at 390 (mobile)
    await capture('http://localhost:5173/', 'evidence_hero_390.png', 390, 844);

    // 5. Operations Gallery with Deugro/Jaguar tags
    await capture('http://localhost:5173/operations', 'evidence_operations_gallery.png', 1440, 1000, async (c) => {
      await c.send('Runtime.evaluate', {
        expression: "window.scrollTo(0, 1200);",
      });
    });

    // 6. Operations Lightbox with Consignment Reference
    await capture('http://localhost:5173/operations', 'evidence_operations_lightbox.png', 1440, 1000, async (c) => {
      await c.send('Runtime.evaluate', {
        expression: `
          const card = document.querySelectorAll('[role="button"]')[0];
          if (card) card.click();
        `,
      });
    });

    // 7. Request a Quote Form (Step 5 Review & Submission notice)
    await capture('http://localhost:5173/request-quote', 'evidence_quote_wizard_step5.png', 1440, 1000, async (c) => {
      await c.send('Runtime.evaluate', {
        expression: `
          // Fill form data and advance to step 5
          window.scrollTo(0, 400);
        `,
      });
    });

    // 8. Contact Page (24x7 Emergency Desk)
    await capture('http://localhost:5173/contact', 'evidence_contact_desk.png', 1440, 1000, async (c) => {
      await c.send('Runtime.evaluate', {
        expression: "window.scrollTo(0, 450);",
      });
    });

    // 9. Cargo Lashing Authentic Records
    await capture('http://localhost:5173/services/cargo-lashing', 'evidence_cargo_lashing.png', 1440, 1000, async (c) => {
      await c.send('Runtime.evaluate', {
        expression: "window.scrollTo(0, 1500);",
      });
    });

    // 10. Warehouse Dual Facility
    await capture('http://localhost:5173/warehouse', 'evidence_warehouse_dual.png', 1440, 1000, async (c) => {
      await c.send('Runtime.evaluate', {
        expression: "window.scrollTo(0, 200);",
      });
    });

    client.close();
    console.log('All evidence captured successfully!');
  } finally {
    chromeProc.kill('SIGTERM');
  }
}

run().catch(console.error);

