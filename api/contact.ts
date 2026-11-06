// Serverless API endpoint for Vercel: /api/contact
// Receives contact enquiries, validates payload, and dispatches:
// 1. Internal MSK notification to info@msklogisticsolution.com (with customer Reply-To)
// 2. Customer confirmation email to the user's submitted email address

import type { EmailPayload } from './emailTemplates.ts';
import { 
  generateInternalEmailHtml, 
  generateCustomerConfirmationEmailHtml, 
  getFormattedDateIST 
} from './emailTemplates.ts';

const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
      message: 'Only POST requests are supported.',
    });
  }

  // Rate Limiting (6 requests per 10 minutes per IP)
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
        message: 'Too many enquiry submissions from this connection. Please wait a few minutes before trying again.',
      });
    }
    rateLimit.count += 1;
  } else {
    rateLimitMap.set(clientIp, { count: 1, expiresAt: now + 10 * 60 * 1000 });
  }

  // Parse body safely
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

  const { name, email, phone, subject, message, company, honeypot } = body || {};

  // Honeypot check (bot detection)
  if (honeypot) {
    return res.status(200).json({
      success: true,
      message: 'Enquiry received successfully.',
    });
  }

  // Server-side validation
  const errors: Record<string, string> = {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Full name is required (minimum 2 characters).';
  } else if (name.trim().length > 100) {
    errors.name = 'Full name exceeds 100 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.email = 'A valid business email address is required.';
  }

  if (phone && typeof phone === 'string' && phone.trim().length > 0) {
    if (/[a-zA-Z]/.test(phone)) {
      errors.phone = 'Phone number cannot contain alphabetic characters.';
    } else {
      const digits = phone.replace(/\D/g, '');
      if (digits.length < 8) {
        errors.phone = 'Phone number is too short (minimum 8 digits required).';
      } else if (digits.length > 15) {
        errors.phone = 'Phone number exceeds maximum length (15 digits).';
      }
    }
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
    errors.subject = 'Subject / Service enquiry is required.';
  } else if (subject.trim().length > 200) {
    errors.subject = 'Subject exceeds 200 characters.';
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.message = 'Enquiry message must be at least 10 characters.';
  } else if (message.trim().length > 5000) {
    errors.message = 'Enquiry message exceeds 5,000 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Failed',
      errors,
      message: 'Please resolve the highlighted validation issues.',
    });
  }

  // Check Resend API configuration
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'info@msklogisticsolution.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'MSK Logistics Enquiries <onboarding@resend.dev>';

  if (!apiKey) {
    return res.status(503).json({
      success: false,
      error: 'Service Unconfigured',
      message: 'Email delivery service is currently awaiting RESEND_API_KEY configuration on the server. Please contact info@msklogisticsolution.com directly via email or telephone at +91 81086 72929.',
    });
  }

  const referenceId = `MSK-ENQ-${Date.now().toString().slice(-6)}`;

  const emailPayload: EmailPayload = {
    enquiryType: 'contact',
    referenceId,
    customerName: name.trim(),
    companyName: company?.trim() || undefined,
    email: email.trim(),
    phone: phone?.trim() || undefined,
    selectedService: subject.trim(),
    message: message.trim(),
    submissionDate: getFormattedDateIST(),
  };

  const internalSubject = `New Contact Enquiry — ${emailPayload.customerName} — [${referenceId}]`;
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
    console.error('[MSK Contact API] Network error during internal email dispatch:', {
      referenceId,
      error: err?.message,
    });
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'A network error occurred while transmitting your enquiry to MSK Logistics. Please email info@msklogisticsolution.com directly or call +91 81086 72929.',
    });
  }

  if (!internalResponse.ok) {
    console.error('[MSK Contact API] Resend API Error on internal dispatch:', {
      referenceId,
      status: internalResponse.status,
      error: internalData?.message || internalData,
    });
    return res.status(internalResponse.status).json({
      success: false,
      error: 'Delivery Error',
      message: internalData?.message || 'Unable to deliver message through email service provider. Please reach out directly to info@msklogisticsolution.com.',
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
      console.warn('[MSK Contact API] Customer confirmation email notice:', {
        referenceId,
        status: customerResponse.status,
        message: custData?.message,
      });
      customerNotice = custData?.message || 'Customer confirmation awaiting domain verification.';
    }
  } catch (custErr: any) {
    console.warn('[MSK Contact API] Customer confirmation network error:', {
      referenceId,
      error: custErr?.message,
    });
    customerNotice = 'Network error sending customer confirmation copy.';
  }

  return res.status(200).json({
    success: true,
    referenceId,
    message: customerDelivered
      ? 'Thank you! Your enquiry has been delivered successfully to info@msklogisticsolution.com, and an acknowledgement has been sent to your inbox.'
      : 'Thank you! Your enquiry has been delivered successfully to our operations desk at info@msklogisticsolution.com.',
    id: internalData?.id || referenceId,
    delivery: {
      internal: true,
      customer: customerDelivered,
      notice: customerNotice,
    },
  });
}
