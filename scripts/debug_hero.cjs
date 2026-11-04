const { spawn } = require('child_process');
const http = require('http');

async function test() {
  const p = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--user-data-dir=C:\\Temp\\test_img_' + Date.now(),
    'about:blank'
  ]);
  await new Promise(r => setTimeout(r, 1500));
  http.get('http://127.0.0.1:9223/json/list', res => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', async () => {
      const targets = JSON.parse(d);
      const ws = new global.WebSocket(targets[0].webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Page.navigate', params: { url: 'http://127.0.0.1:4173/' } }));
      };
      ws.onmessage = async (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === 1) {
          await new Promise(r => setTimeout(r, 2000));
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: `(() => {
                return {
                  title: document.title,
                  rootHtml: document.getElementById('root')?.innerHTML?.substring(0, 500)
                };
              })()`,
              returnByValue: true
            }
          }));
        }
        if (msg.id === 2) {
          console.log('Image eval:', JSON.stringify(msg.result?.result?.value || msg, null, 2));
          ws.close();
          p.kill();
        }
      };
    });
  });
}
test();
