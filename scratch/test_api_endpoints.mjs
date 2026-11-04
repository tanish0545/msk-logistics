// Node 24 native fetch
async function testEndpoints() {
  console.log('--- 1. Testing /api/contact validation errors ---');
  const resContactInvalid = await fetch('http://localhost:5173/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: '', email: 'not-an-email' }),
  });
  const dataContactInvalid = await resContactInvalid.json();
  console.log('Status:', resContactInvalid.status, '(Expected: 400)');
  console.log('Validation errors:', dataContactInvalid.errors);

  console.log('\n--- 2. Testing /api/contact bot honeypot ---');
  const resContactBot = await fetch('http://localhost:5173/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Bot Name', honeypot: 'spam' }),
  });
  const dataContactBot = await resContactBot.json();
  console.log('Status:', resContactBot.status, '(Expected: 200)', dataContactBot);

  console.log('\n--- 3. Testing /api/quote validation errors ---');
  const resQuoteInvalid = await fetch('http://localhost:5173/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contactName: '', cargoDescription: '' }),
  });
  const dataQuoteInvalid = await resQuoteInvalid.json();
  console.log('Status:', resQuoteInvalid.status, '(Expected: 400)');
  console.log('Validation errors:', dataQuoteInvalid.errors);

  console.log('\n--- 4. Testing /api/quote when RESEND_API_KEY is unconfigured ---');
  const resQuoteValid = await fetch('http://localhost:5173/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quoteName: 'Test Consignment Q-101',
      enquiryCategory: 'container-stuffing',
      cargoDescription: 'Industrial Valves & Pumps',
      contactName: 'Rohan Deshmukh',
      companyName: 'Deshmukh Engineering Pvt Ltd',
      email: 'rohan.d@deshmukh.co.in',
      phone: '+91 98200 12345',
    }),
  });
  const dataQuoteValid = await resQuoteValid.json();
  console.log('Status:', resQuoteValid.status, '(Expected: 503 or 200 depending on RESEND_API_KEY)');
  console.log('Response payload:', dataQuoteValid);

  console.log('\nAPI endpoint tests completed.');
}

testEndpoints().catch(console.error);
