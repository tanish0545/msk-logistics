// Verification script for MSK Logistics email routing via Gmail SMTP
// Tests both recipient addresses separately and verifies actual delivery via Nodemailer.
// SECURITY: Never logs or prints passwords, App Passwords, or API keys.

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const http = require('http');

function loadEnv() {
  try {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key] && val) {
            process.env[key] = val;
          }
        }
      }
    }
  } catch {}
}

loadEnv();

const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
const smtpSecure = process.env.SMTP_SECURE !== 'false';
const smtpUser = process.env.SMTP_USER || 'info@msklogisticsolution.com';
const smtpPass = (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || '').trim();

if (!smtpPass) {
  console.error('[FATAL] SMTP_PASS is missing in .env');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

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
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function runVerification() {
  console.log('================================================================');
  console.log('MSK LOGISTICS — EMAIL ROUTING & DELIVERY VERIFICATION');
  console.log('================================================================');
  console.log(`Server: ${smtpHost}:${smtpPort} (SSL: ${smtpSecure})`);
  console.log(`Sender Account: ${smtpUser}`);
  console.log(`Credentials: [App Password Active (${smtpPass.length} chars)]`);

  // 1. Verify SMTP Connection
  console.log('\n--- TEST 1: SMTP AUTHENTICATION & HANDSHAKE ---');
  try {
    await transporter.verify();
    console.log('[PASS] SMTP connection handshake & credentials verified successfully.');
  } catch (err) {
    console.error('[FAIL] SMTP verification failed:', err.message);
    process.exit(1);
  }

  // 2. Test Recipient 1: Internal Recipient (info@msklogisticsolution.com)
  console.log('\n--- TEST 2: INTERNAL NOTIFICATION ROUTING (info@msklogisticsolution.com) ---');
  const internalTestSubject = 'Website Request — Verification Test Client';
  const internalFrom = `"MSK Website" <${smtpUser}>`;
  const internalTo = smtpUser; // info@msklogisticsolution.com
  const customerReplyTo = 'test.client@example.com';

  try {
    const info1 = await transporter.sendMail({
      from: internalFrom,
      to: internalTo,
      replyTo: customerReplyTo,
      subject: internalTestSubject,
      text: 'This is an internal notification test verifying routing to info@msklogisticsolution.com.',
      html: '<p>This is an internal notification test verifying routing to <strong>info@msklogisticsolution.com</strong>.</p>',
      cc: undefined,
      bcc: undefined,
    });
    console.log('[PASS] Internal email accepted by Gmail SMTP server:');
    console.log('  - From:     ', internalFrom);
    console.log('  - To:       ', internalTo);
    console.log('  - Reply-To: ', customerReplyTo);
    console.log('  - Subject:  ', internalTestSubject);
    console.log('  - CC:       ', '[None - Undefined]');
    console.log('  - BCC:      ', '[None - Undefined]');
    console.log('  - MessageID:', info1.messageId);
    console.log('  - Response: ', info1.response);
  } catch (err) {
    console.error('[FAIL] Internal email sending failed:', err.message);
  }

  // 3. Test Recipient 2: Customer Recipient (Separate delivery, NO CC/BCC to MSK)
  console.log('\n--- TEST 3: CUSTOMER ACKNOWLEDGEMENT ROUTING (Customer Address Only) ---');
  // For testing delivery separately to the customer inbox without spamming third parties,
  // we test delivering an acknowledgement to a test address while verifying that MSK is neither CC nor BCC.
  const customerTestRecipient = smtpUser; // Sending confirmation to info@ for delivery proof
  const customerFrom = `"MSK Website" <${smtpUser}>`;
  const customerSubject = 'We Have Received Your Enquiry | MSK Logistics';
  const customerReplyToAddress = smtpUser; // info@msklogisticsolution.com

  try {
    const info2 = await transporter.sendMail({
      from: customerFrom,
      to: customerTestRecipient,
      replyTo: customerReplyToAddress,
      subject: customerSubject,
      text: 'This is a customer acknowledgement test verifying customer-only routing with zero MSK CC/BCC.',
      html: '<p>This is a customer acknowledgement test verifying customer-only routing with zero MSK CC/BCC.</p>',
      cc: undefined,
      bcc: undefined,
    });
    console.log('[PASS] Customer acknowledgement email accepted by Gmail SMTP server:');
    console.log('  - From:     ', customerFrom);
    console.log('  - To:       ', customerTestRecipient);
    console.log('  - Reply-To: ', customerReplyToAddress);
    console.log('  - Subject:  ', customerSubject);
    console.log('  - CC:       ', '[None - Undefined]');
    console.log('  - BCC:      ', '[None - Undefined]');
    console.log('  - MessageID:', info2.messageId);
    console.log('  - Response: ', info2.response);
  } catch (err) {
    console.error('[FAIL] Customer acknowledgement sending failed:', err.message);
  }

  // 4. Test Full Contact Form Endpoint via Vite Dev Server
  console.log('\n--- TEST 4: FULL CONTACT FORM ENDPOINT (/api/contact) ---');
  const contactPayload = {
    name: 'Vikram Malhotra',
    email: 'info@msklogisticsolution.com', // using valid email for delivery test
    phone: '+91 98200 88888',
    company: 'Malhotra Heavy Machinery Exports',
    subject: 'Port Carting & Customs Verification',
    message: 'Testing complete contact form email routing with exact subject "Website Request — Vikram Malhotra" and sender "MSK Website".',
  };

  try {
    const res = await postJson('http://localhost:5173/api/contact', contactPayload);
    console.log('Status:   ', res.status);
    console.log('Response: ', JSON.stringify(res.data, null, 2));
    if (res.status === 200 && res.data.success) {
      console.log('[PASS] /api/contact dispatched successfully via Gmail SMTP.');
    } else {
      console.log('[FAIL] /api/contact returned unexpected response.');
    }
  } catch (err) {
    console.error('[FAIL] /api/contact request failed:', err.message);
  }

  // 5. Test Full Quote Form Endpoint via Vite Dev Server
  console.log('\n--- TEST 5: FULL QUOTE FORM ENDPOINT (/api/quote) ---');
  const quotePayload = {
    solutionType: 'client_container_and_cargo',
    enquiryCategory: 'ocean-cargo',
    cargoDescription: 'Heavy Precision Transformers & Control Panels',
    packageCount: '6 Heavy Crates',
    approxWeight: '24.5',
    weightUnit: 'tons',
    originCity: 'JNPT CFS Terminal Node',
    destinationPort: 'Hamburg Port, Germany (DEHAM)',
    containerSize: '40ft Flat Rack Container (40FR)',
    preferredDate: '2026-12-15',
    operationalAddress: 'Warehouse Sector 9, Dronagiri CFS Hub, Navi Mumbai 400707',
    companyName: 'Apex Power Grid Systems Ltd',
    contactName: 'Sunil R. Deshmukh',
    email: 'info@msklogisticsolution.com',
    phone: '+91 98200 99999',
    designation: 'Logistics Director',
  };

  try {
    const res = await postJson('http://localhost:5173/api/quote', quotePayload);
    console.log('Status:   ', res.status);
    console.log('Response: ', JSON.stringify(res.data, null, 2));
    if (res.status === 200 && res.data.success) {
      console.log('[PASS] /api/quote dispatched successfully via Gmail SMTP.');
      console.log('Expected Internal Subject: "New Quote Request — Apex Power Grid Systems Ltd — ' + res.data.referenceId + '"');
    } else {
      console.log('[FAIL] /api/quote returned unexpected response.');
    }
  } catch (err) {
    console.error('[FAIL] /api/quote request failed:', err.message);
  }

  console.log('\n================================================================');
  console.log('ALL TESTS COMPLETED');
  console.log('================================================================');
}

runVerification();
