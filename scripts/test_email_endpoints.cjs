// Test script to verify /api/contact and /api/quote endpoints
const http = require('http');

function postJson(url, data) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const postData = JSON.stringify(data);
    const req = http.request({
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, raw: body });
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('=== TESTING /api/contact ENDPOINT ===');
  const contactPayload = {
    name: 'Tanish Sharma',
    email: 'tanish.test@example.com',
    phone: '+91 98200 12345',
    subject: 'Export Packaging Inquiry',
    message: 'Testing Gmail SMTP and fallback integration for industrial machinery crating at Nhava Sheva.',
  };

  try {
    const contactRes = await postJson('http://localhost:5173/api/contact', contactPayload);
    console.log('Contact Response Status:', contactRes.status);
    console.log('Contact Response Data:', JSON.stringify(contactRes.data, null, 2));
  } catch (err) {
    console.error('Contact Request Error:', err.message);
  }

  console.log('\n=== TESTING /api/quote ENDPOINT ===');
  const quotePayload = {
    solutionType: 'client_container_and_cargo',
    enquiryCategory: 'ocean-cargo',
    cargoDescription: 'Industrial CNC Lathe Machines & Tooling Spares',
    packageCount: '4 Crates',
    approxWeight: '18.5',
    weightUnit: 'tons',
    originCity: 'JNPT Nhava Sheva CFS',
    destinationPort: 'Jebel Ali Port, Dubai (AEJEA)',
    containerSize: '40ft High Cube Container (40HQ)',
    preferredDate: '2026-11-28',
    operationalAddress: 'Plot 14-B, Sector 7, Conex CFS Terminal Node, Dronagiri, Navi Mumbai 400707',
    quoteName: 'Q-TEST-GMAIL-2026',
    companyName: 'Apex Machinery Exports Pvt Ltd',
    contactName: 'Rajesh K. Mehta',
    email: 'rajesh.mehta@example.com',
    phone: '+91 98200 54321',
  };

  try {
    const quoteRes = await postJson('http://localhost:5173/api/quote', quotePayload);
    console.log('Quote Response Status:', quoteRes.status);
    console.log('Quote Response Data:', JSON.stringify(quoteRes.data, null, 2));
  } catch (err) {
    console.error('Quote Request Error:', err.message);
  }
}

runTests();
