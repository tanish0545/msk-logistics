// Serverless API endpoint for Vercel: /api/quote
// Receives 5-step industrial quote requests, validates payload, and dispatches:
// 1. Internal MSK notification to info@msklogisticsolution.com (with customer Reply-To)
// 2. Customer confirmation email to the user's submitted email address

import type { EmailPayload } from './emailTemplates.js';
import { 
  generateInternalEmailHtml, 
  generateCustomerConfirmationEmailHtml, 
  getFormattedDateIST 
} from './emailTemplates.js';

const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
      message: 'Only POST requests are supported.',
    });
  }

  // Rate Limiting (6 quote submissions per 10 minutes per IP)
  const clientIp = 
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 
    req.socket?.remoteAddress || 
    'unknown';
  const now = Date.now();
  const rateLimit = rateLimitMap.get(clientIp);

  if (rateLimit && now < rateLimit.expiresAt) {
    if (rateLimit.count >= 6) {
      return res.status(429).json({
        success: false,
        error: 'Too Many Requests',
        message: 'Too many submissions from this connection. Please wait a few minutes before trying again.',
      });
    }
    rateLimit.count += 1;
  } else {
    rateLimitMap.set(clientIp, { count: 1, expiresAt: now + 10 * 60 * 1000 });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Invalid JSON',
        message: 'Malformed request payload.',
      });
    }
  }

  const {
    id,
    quoteName,
    solutionType,
    enquiryCategory,
    cargoDescription,
    packageCount,
    approxWeight,
    weightUnit,
    dimensions,
    packagingNeeds,
    specialHandlingNotes,
    originCity,
    destinationPort,
    containerSize,
    containerLocationOrPositioning,
    preferredDate,
    operationalAddress,
    contactName,
    companyName,
    email,
    phone,
    designation,
    additionalInstructions,
    honeypot,
  } = body || {};

  // Bot detection
  if (honeypot) {
    return res.status(200).json({
      success: true,
      message: 'Quote request registered successfully.',
    });
  }

  // Server-side validation
  const errors: Record<string, string> = {};

  if (!contactName || typeof contactName !== 'string' || contactName.trim().length < 2) {
    errors.contactName = 'Contact name is required (minimum 2 characters).';
  } else if (contactName.trim().length > 100) {
    errors.contactName = 'Contact name exceeds 100 characters.';
  }

  if (!companyName || typeof companyName !== 'string' || companyName.trim().length < 2) {
    errors.companyName = 'Company name is required.';
  } else if (companyName.trim().length > 150) {
    errors.companyName = 'Company name exceeds 150 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.email = 'A valid business email address is required.';
  }

  if (!phone || typeof phone !== 'string' || phone.trim().length === 0) {
    errors.phone = 'A valid contact telephone/mobile number is required.';
  } else if (/[a-zA-Z]/.test(phone)) {
    errors.phone = 'Phone number cannot contain alphabetic characters.';
  } else {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 8) {
      errors.phone = 'Phone number is too short (minimum 8 digits required).';
    } else if (digits.length > 15) {
      errors.phone = 'Phone number exceeds maximum length (15 digits).';
    }
  }

  if (!enquiryCategory || typeof enquiryCategory !== 'string' || enquiryCategory.trim().length === 0) {
    errors.enquiryCategory = 'A service category must be selected.';
  }

  if (!cargoDescription || typeof cargoDescription !== 'string' || cargoDescription.trim().length < 3) {
    errors.cargoDescription = 'Please provide a cargo description (minimum 3 characters).';
  }

  if (!approxWeight || typeof approxWeight !== 'string' || approxWeight.trim().length === 0) {
    errors.approxWeight = 'Approximate cargo weight is required.';
  } else if (/[a-zA-Z]/.test(approxWeight)) {
    errors.approxWeight = 'Weight must be a numeric value without alphabetic characters.';
  } else if (!/^\d+(\.\d+)?$/.test(approxWeight.trim())) {
    errors.approxWeight = 'Please enter a valid positive decimal or integer weight.';
  } else if (parseFloat(approxWeight) <= 0) {
    errors.approxWeight = 'Weight must be greater than zero.';
  }

  if (dimensions && typeof dimensions === 'string' && dimensions.trim().length > 100) {
    errors.dimensions = 'Cargo dimensions cannot exceed 100 characters.';
  }

  if (quoteName && typeof quoteName === 'string' && quoteName.trim().length > 150) {
    errors.quoteName = 'Quote reference name cannot exceed 150 characters.';
  }

  // Origin City / CFS Facility validation (BUG 02)
  if (!originCity || typeof originCity !== 'string' || originCity.trim().length < 2) {
    errors.originCity = 'Origin city or CFS facility is required (minimum 2 characters).';
  } else if (originCity.trim().length > 150) {
    errors.originCity = 'Origin city cannot exceed 150 characters.';
  }

  // Target Container Equipment Type validation (BUG 03)
  if (!containerSize || typeof containerSize !== 'string' || containerSize.trim().length === 0) {
    errors.containerSize = 'Please select a valid container equipment type.';
  }

  // Preferred Date validation: reject past dates (BUG 04)
  if (preferredDate && typeof preferredDate === 'string' && preferredDate.trim()) {
    const chosenDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(chosenDate.getTime())) {
      errors.preferredDate = 'Please provide a valid execution date.';
    } else if (chosenDate < today) {
      errors.preferredDate = 'Preferred execution date cannot be in the past.';
    }
  }

  // Operational Address validation (BUG 05)
  if (!operationalAddress || typeof operationalAddress !== 'string' || operationalAddress.trim().length < 5) {
    errors.operationalAddress = 'Operational staging address or facility location is required (minimum 5 characters).';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Failed',
      errors,
      message: 'Please resolve the highlighted validation issues before submitting.',
    });
  }

  // Email service configuration
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'info@msklogisticsolution.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'MSK Logistics Quotations <onboarding@resend.dev>';

  if (!apiKey) {
    return res.status(503).json({
      success: false,
      error: 'Service Unconfigured',
      message: 'Email delivery service is currently awaiting RESEND_API_KEY configuration on the server. Please contact info@msklogisticsolution.com directly via email or telephone at 8108672929.',
    });
  }

  const referenceId = id || `MSK-REQ-${Date.now().toString().slice(-6)}`;

  const emailPayload: EmailPayload = {
    enquiryType: 'quote',
    referenceId,
    customerName: contactName.trim(),
    companyName: companyName?.trim() || undefined,
    email: email.trim(),
    phone: phone?.trim() || undefined,
    designation: designation?.trim() || undefined,
    selectedService: String(enquiryCategory),
    solutionType: solutionType ? String(solutionType) : undefined,
    quoteName: quoteName?.trim() || undefined,
    cargoDescription: cargoDescription?.trim() || undefined,
    packageCount: packageCount || undefined,
    approxWeight: approxWeight || undefined,
    weightUnit: weightUnit || undefined,
    dimensions: dimensions?.trim() || undefined,
    packagingNeeds: packagingNeeds?.trim() || undefined,
    specialHandlingNotes: specialHandlingNotes?.trim() || undefined,
    originCity: originCity?.trim() || undefined,
    destinationPort: destinationPort?.trim() || undefined,
    containerSize: containerSize?.trim() || undefined,
    containerLocationOrPositioning: containerLocationOrPositioning?.trim() || undefined,
    preferredDate: preferredDate?.trim() || undefined,
    operationalAddress: operationalAddress?.trim() || undefined,
    additionalInstructions: additionalInstructions?.trim() || undefined,
    submissionDate: getFormattedDateIST(),
  };

  const internalSubject = emailPayload.quoteName
    ? `New Quote Request: [${emailPayload.quoteName}] — ${emailPayload.customerName} — [${referenceId}]`
    : `New Quote Request — ${emailPayload.customerName} — [${referenceId}]`;
  const internalHtml = generateInternalEmailHtml(emailPayload);

  // 1. Send Email 1 — Internal Notification
  let internalResponse: Response;
  let internalData: any = {};

  try {
    internalResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: emailPayload.email,
        subject: internalSubject,
        html: internalHtml,
      }),
    });

    internalData = (await internalResponse.json().catch(() => ({}))) as any;
  } catch (err: any) {
    console.error('[MSK Quote API] Network error during internal email dispatch:', {
      referenceId,
      error: err?.message,
    });
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'A network or server error occurred while sending your quote enquiry. Please reach out directly to info@msklogisticsolution.com or call 8108672929.',
    });
  }

  if (!internalResponse.ok) {
    console.error('[MSK Quote API] Resend API Error on internal dispatch:', {
      referenceId,
      status: internalResponse.status,
      error: internalData?.message || internalData,
    });
    return res.status(internalResponse.status).json({
      success: false,
      error: 'Delivery Error',
      message: internalData?.message || 'Unable to deliver message through email service provider. Please email info@msklogisticsolution.com.',
    });
  }

  // 2. Send Email 2 — Customer Confirmation (Handled with partial failure tolerance)
  const customerSubject = 'We Have Received Your Enquiry | MSK Logistics';
  const customerHtml = generateCustomerConfirmationEmailHtml(emailPayload);
  let customerDelivered = false;
  let customerNotice: string | null = null;

  try {
    const customerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [emailPayload.email],
        subject: customerSubject,
        html: customerHtml,
      }),
    });

    const custData = (await customerResponse.json().catch(() => ({}))) as any;
    if (customerResponse.ok) {
      customerDelivered = true;
    } else {
      console.warn('[MSK Quote API] Customer confirmation email notice:', {
        referenceId,
        status: customerResponse.status,
        message: custData?.message,
      });
      customerNotice = custData?.message || 'Customer confirmation awaiting domain verification.';
    }
  } catch (custErr: any) {
    console.warn('[MSK Quote API] Customer confirmation network error:', {
      referenceId,
      error: custErr?.message,
    });
    customerNotice = 'Network error sending customer confirmation copy.';
  }

  return res.status(200).json({
    success: true,
    referenceId,
    message: customerDelivered
      ? 'Thank you! Your quote request has been transmitted successfully to info@msklogisticsolution.com, and an acknowledgement has been sent to your inbox.'
      : 'Thank you! Your quote request has been transmitted successfully to our operations desk at info@msklogisticsolution.com.',
    id: internalData?.id || referenceId,
    delivery: {
      internal: true,
      customer: customerDelivered,
      notice: customerNotice,
    },
  });
}
