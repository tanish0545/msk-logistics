const http = require('http');
const fs = require('fs');

const routes = [
  '/',
  '/container-guide',
  '/road-transport',
  '/warehouse',
  '/services/cargo-lashing',
  '/request-quote',
  '/about'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:5173${route}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          route,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          length: data.length,
          hasDoctype: data.includes('<!doctype html>')
        });
      });
    }).on('error', (err) => {
      resolve({ route, error: err.message });
    });
  });
}

// In an SPA (Single Page Application), all routes serve index.html,
// and the client-side router (React Router) renders the page.
// Let's also check the actual TSX source files being requested by Vite during hydration!
const assets = [
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/pages/HomePage.tsx',
  '/src/pages/ContainerGuidePage.tsx',
  '/src/pages/RoadTransportPage.tsx',
  '/src/pages/WarehousePage.tsx',
  '/src/pages/CargoLashingPage.tsx',
  '/src/pages/QuoteRequestPage.tsx',
  '/src/pages/AboutPage.tsx',
  '/src/data/company.ts',
  '/src/data/containerGuideData.ts',
  '/src/data/imageAssets.ts',
  '/images/shipments/flat-rack/flat-rack-night-lashing-hold.jpg',
  '/images/operations/cargo-lashing/vessel-cross-webbing-lashing.jpg',
  '/images/shipments/breakbulk/breakbulk-cylindrical-haulage.jpg',
  '/images/shipments/breakbulk/breakbulk-lowbed-machinery-lashing.jpg',
  '/images/shipments/breakbulk/breakbulk-heavy-rigging-trailer.jpg',
  '/images/operations/cargo-lashing/trailer-chassis-ratchet-lashing.jpg',
  '/images/hero/msk-cinematic-port-final.png'
];

async function checkAsset(asset) {
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:5173${asset}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          asset,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          size: res.headers['content-length'] || data.length
        });
      });
    }).on('error', (err) => {
      resolve({ asset, error: err.message });
    });
  });
}

async function main() {
  console.log('--- Checking HTML routes ---');
  for (const r of routes) {
    const res = await checkRoute(r);
    console.log(`${res.route}: Status ${res.status}, Type: ${res.contentType}, Length: ${res.length}`);
  }

  console.log('\n--- Checking Client TSX & Image Assets ---');
  for (const a of assets) {
    const res = await checkAsset(a);
    console.log(`${res.asset}: Status ${res.status}, Size: ${res.size}`);
  }
}

main();

