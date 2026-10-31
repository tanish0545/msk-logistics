// Serverless API endpoint for Vercel: /api/contact
// Receives contact enquiries, validates payload, and sends email to info@msklogisticsolution.com via Resend.

function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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

  // Rate Limiting (5 requests per 10 minutes per IP)
  const clientIp = 
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 
    req.socket?.remoteAddress || 
    'unknown';
  const now = Date.now();
  const rateLimit = rateLimitMap.get(clientIp);

  if (rateLimit && now < rateLimit.expiresAt) {
    if (rateLimit.count >= 5) {
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

  // Parse body
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

  if (phone && typeof phone === 'string' && phone.trim().length > 30) {
    errors.phone = 'Phone number is too long.';
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
      message: 'Email delivery service is currently awaiting RESEND_API_KEY configuration on the server. Please contact info@msklogisticsolution.com directly via email or telephone.',
    });
  }

  // Sanitize fields for email body
  const cleanName = sanitizeHtml(name.trim());
  const cleanEmail = sanitizeHtml(email.trim());
  const cleanPhone = phone ? sanitizeHtml(phone.trim()) : 'Not provided';
  const cleanCompany = company ? sanitizeHtml(company.trim()) : 'Not provided';
  const cleanSubject = sanitizeHtml(subject.trim());
  const cleanMessage = sanitizeHtml(message.trim()).replace(/\n/g, '<br/>');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
          .header { background: #173f70; padding: 24px; color: #ffffff; }
          .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
          .header p { margin: 0; font-size: 13px; color: #cbd5e1; }
          .content { padding: 24px; }
          .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
          .meta-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
          .meta-label { font-weight: 600; color: #64748b; width: 35%; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
          .meta-value { color: #0f172a; font-weight: 500; }
          .message-box { background: #f8fafc; border-left: 4px solid #b62825; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155; }
          .footer { background: #f1f5f9; padding: 16px 24px; font-size: 12px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Website Enquiry</h1>
            <p>Received via MSK Logistics Contact Portal</p>
          </div>
          <div class="content">
            <table class="meta-table">
              <tr>
                <td class="meta-label">Full Name</td>
                <td class="meta-value">${cleanName}</td>
              </tr>
              <tr>
                <td class="meta-label">Email Address</td>
                <td class="meta-value"><a href="mailto:${cleanEmail}">${cleanEmail}</a></td>
              </tr>
              <tr>
                <td class="meta-label">Phone Number</td>
                <td class="meta-value">${cleanPhone}</td>
              </tr>
              <tr>
                <td class="meta-label">Company</td>
                <td class="meta-value">${cleanCompany}</td>
              </tr>
              <tr>
                <td class="meta-label">Subject / Service</td>
                <td class="meta-value"><strong>${cleanSubject}</strong></td>
              </tr>
            </table>

            <div style="margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; color: #64748b;">
              Enquiry Details
            </div>
            <div class="message-box">
              ${cleanMessage}
            </div>
          </div>
          <div class="footer">
            MSK Logistics Solution • Export Packaging, Container Stuffing &amp; Cargo Securing • Nhava Sheva (JNPT)
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: cleanEmail,
        subject: `[MSK Logistics Enquiry] ${cleanSubject} - ${cleanName}`,
        html: htmlContent,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend API Error:', resendData);
      return res.status(resendResponse.status).json({
        success: false,
        error: 'Delivery Error',
        message: resendData.message || 'Unable to deliver message through email service provider.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your enquiry has been delivered successfully to info@msklogisticsolution.com. Our team will contact you shortly.',
      id: resendData.id,
    });
  } catch (err: any) {
    console.error('Server error during email send:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'A network or server error occurred while sending your message. Please try again or reach out directly to info@msklogisticsolution.com.',
    });
  }
}

