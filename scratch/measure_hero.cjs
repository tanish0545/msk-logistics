const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const viewports = [
    { name: '1920x1080', width: 1920, height: 1080 },
    { name: '1440x900', width: 1440, height: 900 },
    { name: '1366x768', width: 1366, height: 768 },
    { name: '390x844', width: 390, height: 844 }
  ];
  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    const heroBox = await page.evaluate(() => {
      const el = document.querySelector('section[aria-label*="MSK Logistics"]');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return { offsetHeight: el.offsetHeight, clientHeight: el.clientHeight, rectHeight: Math.round(rect.height) };
    });
    console.log(vp.name, 'Hero height:', heroBox);
    await page.close();
  }
  await browser.close();
})();

