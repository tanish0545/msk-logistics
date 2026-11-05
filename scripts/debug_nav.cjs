const { spawn } = require('child_process');
const http = require('http');

async function check() {
  const chromeProc = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--remote-debugging-port=9455', '--headless=new', '--window-size=1600,1000', 'http://127.0.0.1:5173'
  ]);
  await new Promise(r => setTimeout(r, 2500));
  const targets = await new Promise(r => http.get('http://127.0.0.1:9455/json', res => {
    let d = ''; res.on('data', c => d+=c); res.on('end', () => r(JSON.parse(d)));
  }));
  const ws = new globalThis.WebSocket(targets[0].webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  
  ws.send(JSON.stringify({
    id: 1,
    method: 'Runtime.evaluate',
    params: {
      expression: '({ innerWidth: window.innerWidth, navDisplay: window.getComputedStyle(document.querySelector("nav")).display, buttons: Array.from(document.querySelectorAll("button")).map(b => b.innerText || b.getAttribute("aria-label")) })',
      returnByValue: true
    }
  }));
  ws.onmessage = e => {
    const data = JSON.parse(e.data);
    if (data.id === 1) {
      console.log('Result:', data.result.result.value);
      chromeProc.kill();
      process.exit(0);
    }
  };
}
check();
