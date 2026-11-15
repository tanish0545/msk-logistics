/// <reference types="node" />

// Serverless API endpoint for Vercel: /api/contact
// Receives contact enquiries, validates payload, and dispatches:
// 1. Internal MSK notification to info@msklogisticsolution.com (with customer Reply-To)
// 2. Customer confirmation email to the user's submitted email address

import type { EmailPayload } from './emailTemplates.js';
import { getFormattedDateIST } from './emailTemplates.js';
import { dispatchEnquiryEmail } from './mailer.js';

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

  const dispatchResult = await dispatchEnquiryEmail(emailPayload);

  if (!dispatchResult.success) {
    return res.status(503).json({
      success: false,
      error: dispatchResult.error || 'Delivery Error',
      message: dispatchResult.message || 'Unable to deliver message through email service provider. Please reach out directly to info@msklogisticsolution.com.',
    });
  }

  return res.status(200).json({
    success: true,
    referenceId,
    message: dispatchResult.message || 'Thank you! Your enquiry has been delivered successfully to info@msklogisticsolution.com.',
    id: dispatchResult.messageId || referenceId,
    delivery: {
      method: dispatchResult.method,
      internal: dispatchResult.internalDelivered,
      customer: dispatchResult.customerDelivered,
      notice: dispatchResult.customerNotice,
    },
  });
}
