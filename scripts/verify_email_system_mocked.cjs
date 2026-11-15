// OFFLINE UNIT TEST & MOCKED VALIDATION SCRIPT FOR MSK LOGISTICS EMAIL SYSTEM
// STRICT ZERO-DELIVERY ENFORCEMENT:
// This script runs 100% offline using a mocked in-memory Nodemailer transport.
// ZERO network sockets, ZERO SMTP handshakes, ZERO live emails sent.

const assert = require('assert');
const path = require('path');
const fs = require('fs');

// 1. Mock Nodemailer before loading any API modules
const nodemailer = require('nodemailer');

const dispatchedMails = [];

// Intercept nodemailer.createTransport with a pure in-memory mock
nodemailer.createTransport = function (config) {
  return {
    verify: async function () {
      return true;
    },
    sendMail: async function (mailOptions) {
      dispatchedMails.push({
        from: mailOptions.from,
        to: mailOptions.to,
        cc: mailOptions.cc,
        bcc: mailOptions.bcc,
        replyTo: mailOptions.replyTo,
        subject: mailOptions.subject,
        text: mailOptions.text,
        html: mailOptions.html,
      });
      return {
        messageId: `<mock-${Date.now()}-${Math.random().toString(36).substring(2, 8)}@msklogisticsolution.com>`,
        response: '250 MOCK_TEST_NO_NETWORK_CALL',
      };
    },
  };
};

// Also mock global fetch to ensure Resend API can NEVER be contacted
global.fetch = async function () {
  throw new Error('NETWORK DISABLED: Fetch attempted during zero-delivery test!');
};

// Now import the actual compiled / ts-node or dist modules or transpile on the fly
// Let's verify emailTemplates directly first:
const emailTemplatesPath = path.join(__dirname, '..', 'api', 'emailTemplates.ts');
const emailTemplatesContent = fs.readFileSync(emailTemplatesPath, 'utf8');

console.log('================================================================');
console.log('MSK LOGISTICS — OFFLINE MOCKED EMAIL SYSTEM VALIDATION');
console.log('CRITICAL: ZERO EMAILS SENT • PURE IN-MEMORY AUDIT');
console.log('================================================================\n');

// ------------------------------------------------------------------------------
// TEST SUITE 1: STATIC TEMPLATE AUDIT
// ------------------------------------------------------------------------------
console.log('--- TEST SUITE 1: STATIC TEMPLATE CODE INSPECTION ---');

const hasIncorrectUrl = emailTemplatesContent.includes('https://www.msklogistic.com/') || 
                        emailTemplatesContent.includes('DEFAULT_SITE_URL = \'https://msklogistic.com\'');
assert.strictEqual(hasIncorrectUrl, false, 'FAIL: Legacy domain msklogistic.com must be removed from email templates');
console.log('[PASS] Incorrect legacy domain (msklogistic.com) successfully removed from templates.');

const hasProductionSiteUrl = emailTemplatesContent.includes('https://msklogisticsolution.vercel.app');
assert.strictEqual(hasProductionSiteUrl, true, 'FAIL: Production Vercel URL must be present in templates');
console.log('[PASS] Production Vercel URL verified in email templates.');

const hasOfficialLogoUrl = emailTemplatesContent.includes('https://msklogisticsolution.vercel.app/images/logo/msk-logistics-logo.png');
assert.strictEqual(hasOfficialLogoUrl, true, 'FAIL: Official absolute HTTPS logo URL must be present');
console.log('[PASS] Official absolute HTTPS logo URL verified in email templates.');

// ------------------------------------------------------------------------------
// TEST SUITE 2: TEMPLATE GENERATION & HYPERLINK AUDIT
// ------------------------------------------------------------------------------
console.log('\n--- TEST SUITE 2: GENERATED HTML & LOGO HYPERLINK AUDIT ---');

// Dynamically extract and run generateInternalEmailHtml and generateCustomerConfirmationEmailHtml
// We can use tsx or compile with esbuild / typescript
const ts = require('typescript');
const emailTemplatesJs = ts.transpileModule(emailTemplatesContent, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;

// Evaluate in sandboxed context
const templateModule = { exports: {} };
const evalFn = new Function('module', 'exports', 'require', emailTemplatesJs);
evalFn(templateModule, templateModule.exports, require);
const { generateInternalEmailHtml, generateCustomerConfirmationEmailHtml } = templateModule.exports;

// Test Contact Form Internal Template
const contactPayload = {
  enquiryType: 'contact',
  referenceId: 'MSK-ENQ-123456',
  customerName: 'Aditya Birla Chemicals',
  companyName: 'Aditya Birla Group',
  email: 'logistics@adityabirla.com',
  phone: '+91 98200 11111',
  selectedService: 'Customs Clearance & Port Carting',
  message: 'Require custom handling for high-density chemical export containers at Nhava Sheva.',
};

const internalContactHtml = generateInternalEmailHtml(contactPayload);
const customerContactHtml = generateCustomerConfirmationEmailHtml(contactPayload);

// Test Quote Form Internal Template
const quotePayload = {
  enquiryType: 'quote',
  referenceId: 'MSK-REQ-654321',
  customerName: 'Rajesh K. Mehta',
  companyName: 'Apex Machinery Exports Pvt Ltd',
  email: 'rajesh.mehta@apexmachinery.com',
  phone: '+91 98200 22222',
  selectedService: 'Ocean Freight Forwarding (FCL)',
  cargoDescription: 'Industrial CNC Lathes and Machine Spares',
  approxWeight: '22',
  weightUnit: 'tons',
  originCity: 'JNPT CFS Terminal Node',
  destinationPort: 'Jebel Ali Port, Dubai',
  containerSize: '40ft High Cube Container (40HQ)',
};

const internalQuoteHtml = generateInternalEmailHtml(quotePayload);
const customerQuoteHtml = generateCustomerConfirmationEmailHtml(quotePayload);

const allHtmls = [
  { name: 'Contact Form - Internal Email', html: internalContactHtml },
  { name: 'Contact Form - Customer Confirmation', html: customerContactHtml },
  { name: 'Quote Form - Internal Email', html: internalQuoteHtml },
  { name: 'Quote Form - Customer Confirmation', html: customerQuoteHtml },
];

for (const item of allHtmls) {
  // 1. Verify Logo exists with absolute HTTPS URL
  const expectedImgSrc = 'src="https://msklogisticsolution.vercel.app/images/logo/msk-logistics-logo.png"';
  assert.ok(item.html.includes(expectedImgSrc), `FAIL: ${item.name} missing exact absolute logo src`);

  // 2. Verify Logo link exists with production URL
  const expectedLinkHref = 'href="https://msklogisticsolution.vercel.app/"';
  assert.ok(item.html.includes(expectedLinkHref), `FAIL: ${item.name} missing exact production logo link href`);

  // 3. Verify no legacy domain exists in the HTML
  assert.ok(!item.html.includes('msklogistic.com'), `FAIL: ${item.name} contains legacy msklogistic.com domain`);

  console.log(`[PASS] ${item.name}:`);
  console.log(`  - Logo <img> src:  https://msklogisticsolution.vercel.app/images/logo/msk-logistics-logo.png`);
  console.log(`  - Logo <a> href:   https://msklogisticsolution.vercel.app/`);
  console.log(`  - Legacy URLs:     None (0 occurrences)`);
}

// ------------------------------------------------------------------------------
// TEST SUITE 3: MOCKED ROUTING & DISPATCH AUDIT (ALL 4 SCENARIOS)
// ------------------------------------------------------------------------------
console.log('\n--- TEST SUITE 3: MOCKED ROUTING & DISPATCH AUDIT ---');

const mailerPath = path.join(__dirname, '..', 'api', 'mailer.ts');
let mailerContent = fs.readFileSync(mailerPath, 'utf8');

// Replace relative import './emailTemplates.js' with a virtual inline require
const mailerTranspiled = ts.transpileModule(mailerContent, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;

const mailerModule = { exports: {} };
const customRequire = function (id) {
  if (id === './emailTemplates.js' || id === './emailTemplates') {
    return templateModule.exports;
  }
  return require(id);
};

const mailerEvalFn = new Function('module', 'exports', 'require', mailerTranspiled);
mailerEvalFn(mailerModule, mailerModule.exports, customRequire);
const { dispatchEnquiryEmail } = mailerModule.exports;

async function runMockedDispatchTests() {
  // Scenario 1: Contact Form Dispatch
  dispatchedMails.length = 0;
  console.log('Dispatching Contact Form enquiry in-memory...');
  const contactResult = await dispatchEnquiryEmail(contactPayload);

  assert.strictEqual(contactResult.success, true);
  assert.strictEqual(dispatchedMails.length, 2, 'Must dispatch exactly 2 emails (1 internal, 1 customer)');

  const [contactInternal, contactCustomer] = dispatchedMails;

  // A. Contact Internal Notification
  console.log('\nEvaluating SCENARIO 1: Contact Form Internal Notification:');
  console.log('  - Sender:   ', contactInternal.from);
  console.log('  - To:       ', contactInternal.to);
  console.log('  - Reply-To: ', contactInternal.replyTo);
  console.log('  - Subject:  ', contactInternal.subject);
  console.log('  - CC:       ', contactInternal.cc ?? 'None (undefined)');
  console.log('  - BCC:      ', contactInternal.bcc ?? 'None (undefined)');

  assert.strictEqual(contactInternal.from, '"MSK Website" <info@msklogisticsolution.com>');
  assert.strictEqual(contactInternal.to, 'info@msklogisticsolution.com');
  assert.strictEqual(contactInternal.replyTo, 'logistics@adityabirla.com');
  assert.strictEqual(contactInternal.subject, 'Website Request — Aditya Birla Chemicals');
  assert.strictEqual(contactInternal.cc, undefined);
  assert.strictEqual(contactInternal.bcc, undefined);
  console.log('  -> [PASS] Meets all Scenario 1 requirements.');

  // B. Contact Customer Acknowledgement
  console.log('\nEvaluating SCENARIO 2: Contact Form Customer Acknowledgement:');
  console.log('  - Sender:   ', contactCustomer.from);
  console.log('  - To:       ', contactCustomer.to);
  console.log('  - Reply-To: ', contactCustomer.replyTo);
  console.log('  - Subject:  ', contactCustomer.subject);
  console.log('  - CC:       ', contactCustomer.cc ?? 'None (undefined)');
  console.log('  - BCC:      ', contactCustomer.bcc ?? 'None (undefined)');

  assert.strictEqual(contactCustomer.from, '"MSK Website" <info@msklogisticsolution.com>');
  assert.strictEqual(contactCustomer.to, 'logistics@adityabirla.com');
  assert.strictEqual(contactCustomer.replyTo, 'info@msklogisticsolution.com');
  assert.strictEqual(contactCustomer.subject, 'We Have Received Your Enquiry | MSK Logistics');
  assert.strictEqual(contactCustomer.cc, undefined);
  assert.strictEqual(contactCustomer.bcc, undefined);
  assert.notStrictEqual(contactCustomer.to, 'info@msklogisticsolution.com');
  console.log('  -> [PASS] Meets all Scenario 2 requirements.');

  // Scenario 2: Quote Form Dispatch
  dispatchedMails.length = 0;
  console.log('\nDispatching Quote Form request in-memory...');
  const quoteResult = await dispatchEnquiryEmail(quotePayload);

  assert.strictEqual(quoteResult.success, true);
  assert.strictEqual(dispatchedMails.length, 2, 'Must dispatch exactly 2 emails (1 internal, 1 customer)');

  const [quoteInternal, quoteCustomer] = dispatchedMails;

  // C. Quote Internal Notification
  console.log('\nEvaluating SCENARIO 3: Quote Form Internal Notification:');
  console.log('  - Sender:   ', quoteInternal.from);
  console.log('  - To:       ', quoteInternal.to);
  console.log('  - Reply-To: ', quoteInternal.replyTo);
  console.log('  - Subject:  ', quoteInternal.subject);
  console.log('  - CC:       ', quoteInternal.cc ?? 'None (undefined)');
  console.log('  - BCC:      ', quoteInternal.bcc ?? 'None (undefined)');

  assert.strictEqual(quoteInternal.from, '"MSK Website" <info@msklogisticsolution.com>');
  assert.strictEqual(quoteInternal.to, 'info@msklogisticsolution.com');
  assert.strictEqual(quoteInternal.replyTo, 'rajesh.mehta@apexmachinery.com');
  assert.strictEqual(quoteInternal.subject, 'New Quote Request — Apex Machinery Exports Pvt Ltd — MSK-REQ-654321');
  assert.strictEqual(quoteInternal.cc, undefined);
  assert.strictEqual(quoteInternal.bcc, undefined);
  console.log('  -> [PASS] Meets all Scenario 3 requirements.');

  // D. Quote Customer Acknowledgement
  console.log('\nEvaluating SCENARIO 4: Quote Form Customer Acknowledgement:');
  console.log('  - Sender:   ', quoteCustomer.from);
  console.log('  - To:       ', quoteCustomer.to);
  console.log('  - Reply-To: ', quoteCustomer.replyTo);
  console.log('  - Subject:  ', quoteCustomer.subject);
  console.log('  - CC:       ', quoteCustomer.cc ?? 'None (undefined)');
  console.log('  - BCC:      ', quoteCustomer.bcc ?? 'None (undefined)');

  assert.strictEqual(quoteCustomer.from, '"MSK Website" <info@msklogisticsolution.com>');
  assert.strictEqual(quoteCustomer.to, 'rajesh.mehta@apexmachinery.com');
  assert.strictEqual(quoteCustomer.replyTo, 'info@msklogisticsolution.com');
  assert.strictEqual(quoteCustomer.subject, 'Quote Request Acknowledgement | MSK Logistics');
  assert.strictEqual(quoteCustomer.cc, undefined);
  assert.strictEqual(quoteCustomer.bcc, undefined);
  assert.notStrictEqual(quoteCustomer.to, 'info@msklogisticsolution.com');
  console.log('  -> [PASS] Meets all Scenario 4 requirements.');

  console.log('\n================================================================');
  console.log('ALL MOCKED TESTS PASSED PERFECTLY (0 LIVE EMAILS SENT)');
  console.log('================================================================');
}

runMockedDispatchTests().catch(err => {
  console.error('\n[FATAL TEST FAILURE]:', err);
  process.exit(1);
});
