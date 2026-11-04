import assert from 'assert';

// Simulated Resend tests
async function simulateDispatch({ internalStatus = 200, customerStatus = 200 }) {
  console.log(`\nSimulating Resend Dispatch (Internal: ${internalStatus}, Customer: ${customerStatus})...`);
  
  // Step 1: Internal dispatch
  if (internalStatus !== 200) {
    return {
      status: internalStatus,
      json: {
        success: false,
        error: 'Delivery Error',
        message: 'Resend API rejected internal notification.',
      }
    };
  }

  // Internal succeeded
  const internalData = { id: 'email_int_12345' };

  // Step 2: Customer dispatch
  let customerDelivered = false;
  let customerNotice = null;

  if (customerStatus === 200) {
    customerDelivered = true;
  } else {
    customerNotice = 'Customer confirmation email could not be delivered (domain unverified).';
  }

  return {
    status: 200,
    json: {
      success: true,
      referenceId: 'MSK-REQ-998877',
      message: customerDelivered
        ? 'Thank you! Your quote request has been transmitted successfully to info@msklogisticsolution.com, and an acknowledgement has been sent to your inbox.'
        : 'Thank you! Your quote request has been transmitted successfully to our operations desk at info@msklogisticsolution.com.',
      id: internalData.id,
      delivery: {
        internal: true,
        customer: customerDelivered,
        notice: customerNotice,
      }
    }
  };
}

async function runTests() {
  // Test A: Both emails succeed
  const resA = await simulateDispatch({ internalStatus: 200, customerStatus: 200 });
  assert.strictEqual(resA.status, 200);
  assert.strictEqual(resA.json.delivery.internal, true);
  assert.strictEqual(resA.json.delivery.customer, true);
  console.log('✓ Scenario A: Full dual delivery succeeded.');

  // Test B: Internal succeeds, Customer fails (Partial failure test)
  const resB = await simulateDispatch({ internalStatus: 200, customerStatus: 403 });
  assert.strictEqual(resB.status, 200); // Must still succeed so enquiry is not lost!
  assert.strictEqual(resB.json.delivery.internal, true);
  assert.strictEqual(resB.json.delivery.customer, false);
  assert.ok(resB.json.delivery.notice);
  console.log('✓ Scenario B: Partial delivery handled safely without losing customer enquiry.');

  // Test C: Internal fails
  const resC = await simulateDispatch({ internalStatus: 500, customerStatus: 200 });
  assert.strictEqual(resC.status, 500);
  assert.strictEqual(resC.json.success, false);
  console.log('✓ Scenario C: Total delivery failure reported honestly to customer.');
}

runTests().catch(console.error);

