/// <reference types="node" />

// Server-side email delivery engine for MSK Logistics
// Primary: Gmail SMTP via Nodemailer using Google App Password
// Fallback: Resend API (if SMTP credentials are not configured or encounter a transport error)
// SECURITY: Secrets are never exposed to frontend code or logged to console.

import nodemailer, { type Transporter } from 'nodemailer';
import fs from 'fs';
import path from 'path';
import type { EmailPayload } from './emailTemplates.js';
import { 
  generateInternalEmailHtml, 
  generateCustomerConfirmationEmailHtml 
} from './emailTemplates.js';

// Auto-load .env in local dev / test environments if not already populated on process.env
function loadLocalEnv() {
  try {
    const envPath = path.join(process.cwd(), '.env');
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
  } catch { }
}

loadLocalEnv();

export interface EmailDispatchResult {
  success: boolean;
  method?: 'smtp' | 'resend';
  messageId?: string;
  referenceId: string;
  internalDelivered: boolean;
  customerDelivered: boolean;
  customerNotice?: string | null;
  error?: string;
  message?: string;
}

/**
 * Validates an email address format safely.
 */
export function isValidEmail(email: string | undefined | null): boolean {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Strips HTML tags to produce a clean plain-text fallback for email clients.
 */
function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi, '\n\n$1\n----------------------------------------\n')
    .replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, '\n$1')
    .replace(/<td[^>]*>([\s\S]*?)<\/td>/gi, '  $1  ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n\n$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
}

/**
 * Retrieves the configured SMTP transporter if SMTP_PASS is available.
 */
function getSmtpTransporter(): Transporter | null {
  const smtpPass = (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || '').trim();
  if (!smtpPass) {
    return null;
  }

  const smtpHost = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  const rawPort = process.env.SMTP_PORT?.trim() || '465';
  const smtpPort = parseInt(rawPort, 10) || 465;
  const isSecure = process.env.SMTP_SECURE === 'false' ? false : smtpPort === 465;
  const smtpUser = (process.env.SMTP_USER || 'info@msklogisticsolution.com').trim();

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: isSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
}

/**
 * Dispatches an email via Resend API as a fallback.
 */
async function sendViaResend(
  fromEmail: string,
  toEmail: string,
  replyTo: string | undefined,
  subject: string,
  html: string,
  apiKey: string
): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: replyTo,
        subject,
        html,
      }),
    });

    const data: any = await res.json().catch(() => ({}));
    if (res.ok) {
      return { ok: true, id: data?.id };
    }
    return { ok: false, error: data?.message || `Resend error HTTP ${res.status}` };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Network error connecting to Resend API' };
  }
}

/**
 * Verifies the Gmail SMTP connection credentials.
 */
export async function verifySmtpConnection(): Promise<{ ok: boolean; message: string }> {
  const transporter = getSmtpTransporter();
  if (!transporter) {
    return {
      ok: false,
      message: 'SMTP_PASS environment variable is not configured.'
    };
  }

  try {
    await transporter.verify();
    return {
      ok: true,
      message: 'Gmail SMTP authentication and server handshake verified successfully.'
    };
  } catch (err: any) {
    return {
      ok: false,
      message: `SMTP verification failed: ${err?.message || 'Authentication error'}`
    };
  }
}

/**
 * Main email dispatch function.
 * 1. Validates customer email for Reply-To.
 * 2. Attempts Gmail SMTP (Nodemailer) first if credentials are present.
 * 3. Falls back to Resend API if SMTP is unconfigured or fails.
 * 4. Sends both internal notification and customer acknowledgement.
 */
export async function dispatchEnquiryEmail(payload: EmailPayload): Promise<EmailDispatchResult> {
  const referenceId = payload.referenceId;
  const toEmail = (process.env.CONTACT_TO_EMAIL || 'info@msklogisticsolution.com').trim();
  const smtpUser = (process.env.SMTP_USER || 'info@msklogisticsolution.com').trim();
  // Sender display name per client instruction: "MSK Website"
  const senderEmail = `"MSK Website" <${smtpUser}>`;
  const resendFromEmail = (process.env.CONTACT_FROM_EMAIL || `"MSK Website" <${smtpUser}>`).trim();
  const resendApiKey = (process.env.RESEND_API_KEY || '').trim();

  // Validate customer email for Reply-To
  const rawCustomerEmail = payload.email?.trim();
  const hasValidCustomerEmail = isValidEmail(rawCustomerEmail);
  const replyTo = hasValidCustomerEmail ? rawCustomerEmail : undefined;

  // Build subject and body per client specification:
  // Contact Form Internal Subject: "Website Request — {Customer Name}"
  // Quote Form Internal Subject: "New Quote Request — {Company Name} — {Reference ID}"
  const isQuote = payload.enquiryType === 'quote';
  const companyPart = payload.companyName?.trim() || payload.customerName?.trim() || 'Direct Request';
  const internalSubject = isQuote
    ? `New Quote Request — ${companyPart} — ${referenceId}`
    : `Website Request — ${payload.customerName}`;

  const internalHtml = generateInternalEmailHtml(payload);
  const internalText = htmlToPlainText(internalHtml);

  const customerSubject = isQuote
    ? 'Quote Request Acknowledgement | MSK Logistics'
    : 'We Have Received Your Enquiry | MSK Logistics';
  const customerHtml = generateCustomerConfirmationEmailHtml(payload);
  const customerText = htmlToPlainText(customerHtml);

  const transporter = getSmtpTransporter();
  let customerDelivered = false;
  let customerNotice: string | null = null;
  let messageId: string | undefined;
  let smtpErrorMessage: string | null = null;
  let resendErrorMessage: string | null = null;

  // ---------------------------------------------------------------------------
  // ATTEMPT 1: Primary Delivery via Gmail SMTP (Nodemailer)
  // ---------------------------------------------------------------------------
  if (transporter) {
    try {
      // 1. Send Internal Notification to info@msklogisticsolution.com ONLY
      const internalInfo = await transporter.sendMail({
        from: senderEmail,
        to: toEmail,
        replyTo: replyTo,
        subject: internalSubject,
        text: internalText,
        html: internalHtml,
        // Strictly no CC or BCC to avoid duplicate deliveries
        cc: undefined,
        bcc: undefined,
      });

      messageId = internalInfo.messageId;

      console.log(`[MSK Mailer] Internal notification dispatched via Gmail SMTP [${referenceId}] MessageID: ${messageId}`);

      // 2. Send Customer Confirmation Email separately to the customer's submitted address ONLY
      // Do not CC or BCC the customer acknowledgement to the MSK inbox
      if (hasValidCustomerEmail && rawCustomerEmail) {
        try {
          await transporter.sendMail({
            from: senderEmail,
            to: rawCustomerEmail,
            replyTo: toEmail, // Customer replies directly to MSK Commercial Desk
            subject: customerSubject,
            text: customerText,
            html: customerHtml,
            // Strictly no CC or BCC to MSK inbox
            cc: undefined,
            bcc: undefined,
          });
          customerDelivered = true;
          console.log(`[MSK Mailer] Customer acknowledgement dispatched via Gmail SMTP to: ${rawCustomerEmail}`);
        } catch (custErr: any) {
          console.warn(`[MSK Mailer] SMTP Customer confirmation notice [${referenceId}]:`, custErr?.message);
          customerNotice = 'Customer confirmation copy could not be delivered to the recipient address.';
        }
      }

      return {
        success: true,
        method: 'smtp',
        messageId,
        referenceId,
        internalDelivered: true,
        customerDelivered,
        customerNotice,
        message: customerDelivered
          ? 'Your submission has been dispatched directly to info@msklogisticsolution.com via Gmail SMTP, and an acknowledgement copy has been sent to your email.'
          : 'Your submission has been dispatched directly to info@msklogisticsolution.com via Gmail SMTP.',
      };
    } catch (smtpErr: any) {
      smtpErrorMessage = smtpErr?.message || 'SMTP handshake failed';
      console.warn(`[MSK Mailer] Gmail SMTP transport error [${referenceId}]:`, smtpErrorMessage);
      // Fall through to Resend fallback if available
    }
  }

  // ---------------------------------------------------------------------------
  // ATTEMPT 2: Fallback Delivery via Resend API
  // ---------------------------------------------------------------------------
  if (resendApiKey) {
    console.log(`[MSK Mailer] Falling back to Resend API for [${referenceId}]...`);
    const resendResult = await sendViaResend(
      resendFromEmail,
      toEmail,
      replyTo,
      internalSubject,
      internalHtml,
      resendApiKey
    );

    if (resendResult.ok) {
      messageId = resendResult.id;

      // Customer acknowledgement via Resend separately to customer's submitted address ONLY
      if (hasValidCustomerEmail && rawCustomerEmail) {
        const custResend = await sendViaResend(
          resendFromEmail,
          rawCustomerEmail,
          toEmail,
          customerSubject,
          customerHtml,
          resendApiKey
        );
        if (custResend.ok) {
          customerDelivered = true;
        } else {
          customerNotice = custResend.error || 'Customer confirmation awaiting domain verification.';
        }
      }

      return {
        success: true,
        method: 'resend',
        messageId,
        referenceId,
        internalDelivered: true,
        customerDelivered,
        customerNotice,
        message: customerDelivered
          ? 'Your submission has been dispatched to info@msklogisticsolution.com, and an acknowledgement has been sent to your email.'
          : 'Your submission has been dispatched to our commercial operations desk at info@msklogisticsolution.com.',
      };
    } else {
      resendErrorMessage = resendResult.error || 'Resend API dispatch error';
      console.error(`[MSK Mailer] Resend API fallback also failed [${referenceId}]:`, resendErrorMessage);
    }
  }

  // ---------------------------------------------------------------------------
  // FAILURE: Neither provider succeeded or both unconfigured
  // ---------------------------------------------------------------------------
  const hasSmtpConfigured = !!(process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD);
  let failureReason = '';
  if (smtpErrorMessage && resendErrorMessage) {
    failureReason = `Gmail SMTP failed (${smtpErrorMessage}) and Resend fallback failed (${resendErrorMessage}).`;
  } else if (smtpErrorMessage) {
    failureReason = `Gmail SMTP failed: ${smtpErrorMessage}.`;
  } else if (resendErrorMessage) {
    failureReason = `Email dispatch failed: ${resendErrorMessage}.`;
  } else if (!hasSmtpConfigured && !resendApiKey) {
    failureReason = 'Email service is awaiting SMTP_PASS configuration in .env.';
  } else {
    failureReason = 'Unable to deliver message through email service providers.';
  }

  return {
    success: false,
    referenceId,
    internalDelivered: false,
    customerDelivered: false,
    error: 'Transmission Failure',
    message: `${failureReason} Please reach out directly to info@msklogisticsolution.com or call +91 81086 72929.`,
  };
}
