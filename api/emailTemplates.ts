/**
 * MSK LOGISTICS — BRANDED EMAIL NOTIFICATION TEMPLATES
 * 
 * Strict Brand Guidelines:
 * - Obsidian Black: #0B0B0D
 * - MSK Red: #B62825
 * - White: #FFFFFF
 * - Titanium Silver: #D9DEE5
 * - Light Background: #F4F5F7
 * - Slogan: "Beyond Logistics, We Deliver Trust."
 * 
 * Compatible with Gmail, Apple Mail, Outlook (including MSO table fallbacks), and mobile email clients.
 */

export interface EmailPayload {
  enquiryType: 'contact' | 'quote';
  referenceId: string;
  submissionDate?: string;
  // Customer & Company
  customerName: string;
  companyName?: string;
  email: string;
  phone?: string;
  designation?: string;
  // Service & Solution
  selectedService: string;
  solutionType?: string;
  quoteName?: string; // Q Name per Client Brief 1
  // Cargo Details
  cargoDescription?: string;
  packageCount?: string | number;
  approxWeight?: string | number;
  weightUnit?: string;
  dimensions?: string;
  packagingNeeds?: string;
  specialHandlingNotes?: string;
  // Route & Operational Logistics
  originCity?: string;
  destinationPort?: string;
  containerSize?: string;
  containerLocationOrPositioning?: string;
  preferredDate?: string;
  operationalAddress?: string;
  // Message / Additional Notes
  message?: string;
  additionalInstructions?: string;
}

export function sanitizeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function getFormattedDateIST(dateInput?: Date | string): string {
  try {
    const d = dateInput ? new Date(dateInput) : new Date();
    return d.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    }) + ' (IST)';
  } catch {
    return new Date().toISOString();
  }
}

const DEFAULT_SITE_URL = 'https://msklogistic.com';

function getSiteUrl(): string {
  if (typeof process !== 'undefined' && process.env?.VITE_SITE_URL) {
    return process.env.VITE_SITE_URL.replace(/\/+$/, '');
  }
  return DEFAULT_SITE_URL;
}

/**
 * -----------------------------------------------------------------------------
 * EMAIL 1: INTERNAL MSK NOTIFICATION
 * Destination: info@msklogisticsolution.com
 * Clear visual hierarchy, structured customer cards, shipment details & action indicator.
 * -----------------------------------------------------------------------------
 */
export function generateInternalEmailHtml(data: EmailPayload): string {
  const siteUrl = getSiteUrl();
  const submissionTime = data.submissionDate || getFormattedDateIST();
  const isQuote = data.enquiryType === 'quote';

  const cleanName = sanitizeHtml(data.customerName || 'Prospective Client');
  const cleanEmail = sanitizeHtml(data.email || '');
  const cleanPhone = data.phone ? sanitizeHtml(data.phone) : 'Not provided';
  const cleanCompany = data.companyName ? sanitizeHtml(data.companyName) : 'Not specified';
  const cleanDesignation = data.designation ? sanitizeHtml(data.designation) : '';
  const cleanService = sanitizeHtml(data.selectedService || 'General Consignment Enquiry');
  const cleanQName = data.quoteName ? sanitizeHtml(data.quoteName) : '';
  const cleanSolution = data.solutionType ? sanitizeHtml(data.solutionType) : '';
  const cleanCargo = data.cargoDescription ? sanitizeHtml(data.cargoDescription) : '';
  const cleanPackages = data.packageCount ? sanitizeHtml(String(data.packageCount)) : '';
  const cleanWeight = data.approxWeight ? `${sanitizeHtml(String(data.approxWeight))} ${sanitizeHtml(data.weightUnit || 'kg')}` : '';
  const cleanDimensions = data.dimensions ? sanitizeHtml(data.dimensions) : '';
  const cleanPackaging = data.packagingNeeds ? sanitizeHtml(data.packagingNeeds) : '';
  const cleanHandling = data.specialHandlingNotes ? sanitizeHtml(data.specialHandlingNotes) : '';
  const cleanOrigin = data.originCity ? sanitizeHtml(data.originCity) : '';
  const cleanDestination = data.destinationPort ? sanitizeHtml(data.destinationPort) : '';
  const cleanContainer = data.containerSize ? sanitizeHtml(data.containerSize) : '';
  const cleanLocation = data.containerLocationOrPositioning ? sanitizeHtml(data.containerLocationOrPositioning) : '';
  const cleanDate = data.preferredDate ? sanitizeHtml(data.preferredDate) : '';
  const cleanAddress = data.operationalAddress ? sanitizeHtml(data.operationalAddress) : '';
  const cleanMsg = (data.message || data.additionalInstructions || '').trim();
  const formattedMsg = cleanMsg ? sanitizeHtml(cleanMsg).replace(/\n/g, '<br/>') : '';

  const headingText = isQuote ? 'NEW QUOTE REQUEST' : 'NEW CONTACT ENQUIRY';
  const subHeadingText = isQuote 
    ? '5-Step Industrial Specification Portal' 
    : 'Direct Contact & Consultation Form';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${headingText} — ${cleanName}</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #F4F5F7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .fluid-padding { padding-left: 16px !important; padding-right: 16px !important; }
      .stack-column { display: block !important; width: 100% !important; max-width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F5F7;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4F5F7; margin: 0; padding: 24px 0 36px 0;">
    <tr>
      <td align="center">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #D9DEE5; box-shadow: 0 4px 16px rgba(11,11,13,0.06);">
          
          <!-- BRAND HEADER: Obsidian Black with MSK Red Line -->
          <tr>
            <td style="background-color: #0B0B0D; padding: 28px 32px 24px 32px; border-bottom: 3px solid #B62825;" class="fluid-padding">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle" align="left" style="padding-bottom: 12px;">
                    <a href="${siteUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img src="${siteUrl}/images/logo/msk-logistics-logo.png" alt="MSK Logistics Solution" width="155" height="auto" style="display: block; max-width: 165px; height: auto;" />
                    </a>
                  </td>
                  <td valign="middle" align="right" style="padding-bottom: 12px;">
                    <span style="display: inline-block; padding: 4px 10px; background-color: #1E293B; color: #FFFFFF; font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; border-radius: 4px; border: 1px solid #334155; letter-spacing: 0.05em;">
                      ${data.referenceId}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="border-top: 1px solid #1E293B; padding-top: 12px;">
                    <p style="margin: 0; color: #D9DEE5; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;">
                      Beyond Logistics, We Deliver Trust.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO BANNER: Notice & Timestamp -->
          <tr>
            <td style="background-color: #FFFFFF; padding: 28px 32px 12px 32px;" class="fluid-padding">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="display: inline-block; padding: 3px 9px; background-color: #FFF1F2; color: #B62825; font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; border-radius: 4px; border: 1px solid #FECDD3; letter-spacing: 0.06em; margin-bottom: 8px;">
                      ${headingText}
                    </span>
                    <h1 style="margin: 6px 0 4px 0; font-size: 22px; font-weight: 800; color: #0B0B0D; letter-spacing: -0.02em; line-height: 1.25;">
                      ${isQuote ? (cleanQName ? `Quote: ${cleanQName}` : 'New Industrial Quote Request') : `Enquiry from ${cleanName}`}
                    </h1>
                    <p style="margin: 0; font-size: 13px; color: #64748B; line-height: 1.4;">
                      ${subHeadingText} • Received ${submissionTime}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CARD 1: CUSTOMER & COMPANY DETAILS -->
          <tr>
            <td style="padding: 12px 32px;" class="fluid-padding">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="background-color: #0B0B0D; padding: 9px 16px; border-bottom: 1px solid #1E293B;">
                    <span style="font-size: 11px; font-weight: 700; color: #FFFFFF; text-transform: uppercase; letter-spacing: 0.08em; font-family: 'Courier New', Courier, monospace;">
                      1. Customer &amp; Business Profile
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="35%" style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em;">Contact Person:</td>
                        <td width="65%" style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #0B0B0D;">
                          ${cleanName} ${cleanDesignation ? `<span style="font-size: 12px; font-weight: normal; color: #64748B;">(${cleanDesignation})</span>` : ''}
                        </td>
                      </tr>
                      ${cleanCompany !== 'Not specified' ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Company Name:</td>
                        <td style="padding: 6px 0; font-size: 14px; font-weight: 600; color: #0B0B0D; border-top: 1px solid #F1F5F9;">${cleanCompany}</td>
                      </tr>` : ''}
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Email Address:</td>
                        <td style="padding: 6px 0; font-size: 13.5px; border-top: 1px solid #F1F5F9;">
                          <a href="mailto:${cleanEmail}" style="color: #B62825; font-weight: 700; text-decoration: none;">${cleanEmail}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Phone / Mobile:</td>
                        <td style="padding: 6px 0; font-size: 13.5px; border-top: 1px solid #F1F5F9;">
                          <a href="tel:${cleanPhone}" style="color: #0B0B0D; font-weight: 700; text-decoration: none; font-family: 'Courier New', Courier, monospace;">${cleanPhone}</a>
                        </td>
                      </tr>
                      ${cleanAddress ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Staging Address:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #334155; border-top: 1px solid #F1F5F9;">${cleanAddress}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CARD 2: SERVICE & SHIPMENT SPECIFICATIONS (Conditional Fields Only) -->
          <tr>
            <td style="padding: 12px 32px;" class="fluid-padding">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="background-color: #0B0B0D; padding: 9px 16px; border-bottom: 1px solid #1E293B;">
                    <span style="font-size: 11px; font-weight: 700; color: #FFFFFF; text-transform: uppercase; letter-spacing: 0.08em; font-family: 'Courier New', Courier, monospace;">
                      2. Service &amp; Cargo Specifications
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="35%" style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em;">Selected Service:</td>
                        <td width="65%" style="padding: 6px 0; font-size: 14px; font-weight: 700; color: #B62825;">
                          ${cleanService.toUpperCase()}
                        </td>
                      </tr>
                      ${cleanQName ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Q Name / Ref:</td>
                        <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0B0B0D; font-family: 'Courier New', Courier, monospace; border-top: 1px solid #F1F5F9;">${cleanQName}</td>
                      </tr>` : ''}
                      ${cleanSolution ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Arrangement Scope:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #334155; border-top: 1px solid #F1F5F9;">${cleanSolution}</td>
                      </tr>` : ''}
                      ${cleanCargo ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Cargo Description:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #0B0B0D; border-top: 1px solid #F1F5F9;">${cleanCargo}</td>
                      </tr>` : ''}
                      ${(cleanPackages || cleanWeight) ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Quantity &amp; Weight:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #0B0B0D; border-top: 1px solid #F1F5F9;">
                          ${cleanPackages ? `<strong>${cleanPackages}</strong> units ` : ''}
                          ${cleanWeight ? `• <strong>${cleanWeight}</strong>` : ''}
                        </td>
                      </tr>` : ''}
                      ${cleanDimensions ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Dimensions:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #334155; border-top: 1px solid #F1F5F9;">${cleanDimensions}</td>
                      </tr>` : ''}
                      ${cleanPackaging ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Packaging Treatment:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #334155; border-top: 1px solid #F1F5F9;">${cleanPackaging}</td>
                      </tr>` : ''}
                      ${cleanHandling ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Special Handling:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #334155; border-top: 1px solid #F1F5F9;">${cleanHandling}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${(cleanOrigin || cleanDestination || cleanContainer || cleanLocation || cleanDate) ? `
          <!-- CARD 3: ROUTE & CONTAINER LOGISTICS -->
          <tr>
            <td style="padding: 12px 32px;" class="fluid-padding">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="background-color: #0B0B0D; padding: 9px 16px; border-bottom: 1px solid #1E293B;">
                    <span style="font-size: 11px; font-weight: 700; color: #FFFFFF; text-transform: uppercase; letter-spacing: 0.08em; font-family: 'Courier New', Courier, monospace;">
                      3. Operational Routing &amp; Container
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      ${(cleanOrigin || cleanDestination) ? `
                      <tr>
                        <td width="35%" style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em;">Corridor Route:</td>
                        <td width="65%" style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0B0B0D;">
                          ${cleanOrigin || 'Western Hub'} &rarr; ${cleanDestination || 'Port of Destination'}
                        </td>
                      </tr>` : ''}
                      ${cleanContainer ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Container Type:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #0B0B0D; border-top: 1px solid #F1F5F9;">${cleanContainer}</td>
                      </tr>` : ''}
                      ${cleanLocation ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Staging Location:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #334155; border-top: 1px solid #F1F5F9;">${cleanLocation}</td>
                      </tr>` : ''}
                      ${cleanDate ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Target Loading Date:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #B62825; border-top: 1px solid #F1F5F9;">${cleanDate}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>` : ''}

          <!-- CARD 4: MESSAGE / SPECIAL REQUIREMENTS -->
          ${formattedMsg ? `
          <tr>
            <td style="padding: 12px 32px;" class="fluid-padding">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="background-color: #0B0B0D; padding: 9px 16px; border-bottom: 1px solid #1E293B;">
                    <span style="font-size: 11px; font-weight: 700; color: #FFFFFF; text-transform: uppercase; letter-spacing: 0.08em; font-family: 'Courier New', Courier, monospace;">
                      ${isQuote ? '4. Additional Operational Instructions' : '3. Customer Enquiry Message'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; border-left: 4px solid #B62825; font-size: 13.5px; line-height: 1.6; color: #1E293B; background-color: #FFFFFF;">
                    ${formattedMsg}
                  </td>
                </tr>
              </table>
            </td>
          </tr>` : ''}

          <!-- ACTION REQUIRED BANNER -->
          <tr>
            <td style="padding: 16px 32px 24px 32px;" class="fluid-padding">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFF1F2; border: 1px solid #FECDD3; border-radius: 8px; padding: 14px 18px;">
                <tr>
                  <td valign="top" width="24" style="padding-right: 12px;">
                    <div style="width: 10px; height: 10px; background-color: #B62825; border-radius: 50%; margin-top: 5px;"></div>
                  </td>
                  <td valign="top">
                    <p style="margin: 0 0 4px 0; font-size: 12px; font-family: 'Courier New', Courier, monospace; font-weight: bold; color: #B62825; text-transform: uppercase; letter-spacing: 0.06em;">
                      ACTION REQUIRED • COMMERCIAL DESK
                    </p>
                    <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.45;">
                      Please review cargo specifications and respond directly to <strong style="color: #0B0B0D;">${cleanName}</strong> (<a href="mailto:${cleanEmail}" style="color: #B62825; text-decoration: underline;">${cleanEmail}</a>${cleanPhone !== 'Not provided' ? ` • ${cleanPhone}` : ''}).
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BRAND FOOTER -->
          <tr>
            <td style="background-color: #0B0B0D; padding: 24px 32px; border-top: 1px solid #1E293B; text-align: center;" class="fluid-padding">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #FFFFFF; letter-spacing: 0.03em;">
                MSK LOGISTICS SOLUTION
              </p>
              <p style="margin: 0 0 10px 0; font-size: 11px; color: #94A3B8; line-height: 1.5;">
                ISO 9001:2015 Certified • JNPT / Nhava Sheva &amp; Mundra Western Maritime Corridors<br />
                24×7 Operations Desk: <a href="tel:8108672929" style="color: #D9DEE5; text-decoration: none; font-weight: bold;">+91 81086 72929</a> • <a href="mailto:info@msklogisticsolution.com" style="color: #D9DEE5; text-decoration: none;">info@msklogisticsolution.com</a>
              </p>
              <p style="margin: 0; font-size: 10px; color: #64748B; font-family: 'Courier New', Courier, monospace;">
                Automated Internal Dispatch System • REF: ${data.referenceId}
              </p>
            </td>
          </tr>

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * -----------------------------------------------------------------------------
 * EMAIL 2: CUSTOMER ACKNOWLEDGEMENT & CONFIRMATION
 * Sent to: data.email (Supplied customer address)
 * Professional reassurance, verified reference ID, requested service summary,
 * next steps explanation, and official 24x7 desk contacts.
 * -----------------------------------------------------------------------------
 */
export function generateCustomerConfirmationEmailHtml(data: EmailPayload): string {
  const siteUrl = getSiteUrl();
  const submissionTime = data.submissionDate || getFormattedDateIST();
  const isQuote = data.enquiryType === 'quote';
  const badgeText = isQuote ? 'QUOTE REQUEST ACKNOWLEDGEMENT' : 'ENQUIRY ACKNOWLEDGEMENT';

  const cleanName = sanitizeHtml(data.customerName || 'Valued Client');
  const cleanService = sanitizeHtml(data.selectedService || 'Industrial Logistics & Freight Services');
  const cleanQName = data.quoteName ? sanitizeHtml(data.quoteName) : '';
  const cleanCargo = data.cargoDescription ? sanitizeHtml(data.cargoDescription) : '';
  const cleanOrigin = data.originCity ? sanitizeHtml(data.originCity) : '';
  const cleanDestination = data.destinationPort ? sanitizeHtml(data.destinationPort) : '';
  const cleanContainer = data.containerSize ? sanitizeHtml(data.containerSize) : '';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>We Have Received Your Enquiry | MSK Logistics</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #F4F5F7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .fluid-padding { padding-left: 16px !important; padding-right: 16px !important; }
      .stack-column { display: block !important; width: 100% !important; max-width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F5F7;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4F5F7; margin: 0; padding: 24px 0 36px 0;">
    <tr>
      <td align="center">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
        <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #D9DEE5; box-shadow: 0 4px 16px rgba(11,11,13,0.06);">
          
          <!-- BRAND HEADER: Obsidian Black with MSK Red Line -->
          <tr>
            <td style="background-color: #0B0B0D; padding: 28px 32px 24px 32px; border-bottom: 3px solid #B62825;" class="fluid-padding">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle" align="left" style="padding-bottom: 12px;">
                    <a href="${siteUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img src="${siteUrl}/images/logo/msk-logistics-logo.png" alt="MSK Logistics Solution" width="155" height="auto" style="display: block; max-width: 165px; height: auto;" />
                    </a>
                  </td>
                  <td valign="middle" align="right" style="padding-bottom: 12px;">
                    <span style="display: inline-block; padding: 4px 10px; background-color: #1E293B; color: #FFFFFF; font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; border-radius: 4px; border: 1px solid #334155; letter-spacing: 0.05em;">
                      ${data.referenceId}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="border-top: 1px solid #1E293B; padding-top: 12px;">
                    <p style="margin: 0; color: #D9DEE5; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;">
                      Beyond Logistics, We Deliver Trust.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ACKNOWLEDGEMENT HEADER -->
          <tr>
            <td style="background-color: #FFFFFF; padding: 32px 32px 16px 32px;" class="fluid-padding">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="display: inline-block; padding: 3px 9px; background-color: #FFF1F2; color: #B62825; font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; border-radius: 4px; border: 1px solid #FECDD3; letter-spacing: 0.06em; margin-bottom: 8px;">
                      ${badgeText}
                    </span>
                    <h1 style="margin: 6px 0 12px 0; font-size: 24px; font-weight: 800; color: #0B0B0D; letter-spacing: -0.02em; line-height: 1.25;">
                      We Have Received Your Enquiry
                    </h1>
                    <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155; line-height: 1.6;">
                      Dear <strong>${cleanName}</strong>,
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6;">
                      Thank you for contacting <strong>MSK Logistics Solution</strong>. We have registered your inquiry regarding <strong style="color: #B62825;">${cleanService}</strong>. Our commercial and operations team at Nhava Sheva (JNPT) has received your submission and is reviewing the requirements.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SUMMARY CARD OF SUBMITTED DETAILS -->
          <tr>
            <td style="padding: 8px 32px 16px 32px;" class="fluid-padding">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="background-color: #0B0B0D; padding: 10px 18px; border-bottom: 1px solid #1E293B;">
                    <span style="font-size: 11px; font-weight: 700; color: #FFFFFF; text-transform: uppercase; letter-spacing: 0.08em; font-family: 'Courier New', Courier, monospace;">
                      Summary of Registered Information
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="38%" style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em;">Reference ID:</td>
                        <td width="62%" style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #0B0B0D; font-family: 'Courier New', Courier, monospace;">
                          ${data.referenceId}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Date Registered:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #334155; border-top: 1px solid #F1F5F9;">${submissionTime}</td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Requested Service:</td>
                        <td style="padding: 6px 0; font-size: 13.5px; font-weight: 700; color: #B62825; border-top: 1px solid #F1F5F9;">${cleanService}</td>
                      </tr>
                      ${cleanQName ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Quote Reference (Q Name):</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #0B0B0D; font-family: 'Courier New', Courier, monospace; border-top: 1px solid #F1F5F9;">${cleanQName}</td>
                      </tr>` : ''}
                      ${cleanCargo ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Cargo Item:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #334155; border-top: 1px solid #F1F5F9;">${cleanCargo}</td>
                      </tr>` : ''}
                      ${(cleanOrigin || cleanDestination) ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Corridor:</td>
                        <td style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #0B0B0D; border-top: 1px solid #F1F5F9;">
                          ${cleanOrigin || 'Western India'} &rarr; ${cleanDestination || 'Terminal Destination'}
                        </td>
                      </tr>` : ''}
                      ${cleanContainer ? `
                      <tr>
                        <td style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; border-top: 1px solid #F1F5F9;">Container Spec:</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #334155; border-top: 1px solid #F1F5F9;">${cleanContainer}</td>
                      </tr>` : ''}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- WHAT HAPPENS NEXT CARD -->
          <tr>
            <td style="padding: 8px 32px 16px 32px;" class="fluid-padding">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 18px 20px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #0B0B0D; text-transform: uppercase; letter-spacing: 0.06em;">
                      What Happens Next
                    </h3>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="top" width="24" style="padding-bottom: 10px;">
                          <div style="width: 18px; height: 18px; background-color: #0B0B0D; color: #FFFFFF; font-size: 10px; font-weight: bold; border-radius: 50%; text-align: center; line-height: 18px; font-family: monospace;">1</div>
                        </td>
                        <td valign="top" style="padding-bottom: 10px; font-size: 13px; color: #475569; line-height: 1.5;">
                          <strong style="color: #0B0B0D;">Operational &amp; Technical Review:</strong> Our cargo specialists evaluate your shipment dimensions, weight distribution, and required securing protocols.
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" width="24" style="padding-bottom: 10px;">
                          <div style="width: 18px; height: 18px; background-color: #0B0B0D; color: #FFFFFF; font-size: 10px; font-weight: bold; border-radius: 50%; text-align: center; line-height: 18px; font-family: monospace;">2</div>
                        </td>
                        <td valign="top" style="padding-bottom: 10px; font-size: 13px; color: #475569; line-height: 1.5;">
                          <strong style="color: #0B0B0D;">Facility &amp; Capacity Alignment:</strong> We verify equipment readiness across Nhava Sheva (JNPT) / Mundra gateways, Conex CFS buffer holding, and shaded packing bays.
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" width="24">
                          <div style="width: 18px; height: 18px; background-color: #B62825; color: #FFFFFF; font-size: 10px; font-weight: bold; border-radius: 50%; text-align: center; line-height: 18px; font-family: monospace;">3</div>
                        </td>
                        <td valign="top" style="font-size: 13px; color: #475569; line-height: 1.5;">
                          <strong style="color: #0B0B0D;">Direct Coordination:</strong> A dedicated logistics coordinator from our commercial operations desk will reach out to you directly with operational specifics.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CONTACT & 24x7 DESK CARD -->
          <tr>
            <td style="padding: 8px 32px 24px 32px;" class="fluid-padding">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0B0B0D; border-radius: 8px; padding: 20px 22px; color: #FFFFFF;">
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="top" style="padding-bottom: 12px;">
                          <span style="font-size: 10px; font-family: 'Courier New', Courier, monospace; font-weight: bold; color: #FCA5A5; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 4px;">
                            NEED IMMEDIATE ASSISTANCE?
                          </span>
                          <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: #FFFFFF;">
                            24×7 Operations &amp; Commercial Helpdesk
                          </h4>
                        </td>
                      </tr>
                      <tr>
                        <td style="border-top: 1px solid #1E293B; padding-top: 12px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td class="stack-column" valign="top" style="padding-bottom: 8px;">
                                <p style="margin: 0 0 2px 0; font-size: 11px; color: #94A3B8; text-transform: uppercase; font-family: 'Courier New', Courier, monospace;">Emergency Hotline</p>
                                <a href="tel:8108672929" style="font-size: 16px; font-weight: bold; color: #FFFFFF; text-decoration: none; font-family: 'Courier New', Courier, monospace;">+91 81086 72929</a>
                              </td>
                              <td class="stack-column" valign="top" style="padding-bottom: 8px;">
                                <p style="margin: 0 0 2px 0; font-size: 11px; color: #94A3B8; text-transform: uppercase; font-family: 'Courier New', Courier, monospace;">Email Enquiries</p>
                                <a href="mailto:info@msklogisticsolution.com" style="font-size: 13px; font-weight: bold; color: #FCA5A5; text-decoration: none;">info@msklogisticsolution.com</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SIGN-OFF -->
          <tr>
            <td style="padding: 0 32px 28px 32px;" class="fluid-padding">
              <p style="margin: 0 0 4px 0; font-size: 14px; color: #475569;">
                Warm regards,
              </p>
              <p style="margin: 0; font-size: 15px; font-weight: 800; color: #0B0B0D;">
                Commercial Operations Desk
              </p>
              <p style="margin: 0; font-size: 13px; color: #64748B;">
                MSK Logistics Solution • Navi Mumbai &amp; JNPT
              </p>
            </td>
          </tr>

          <!-- BRAND FOOTER -->
          <tr>
            <td style="background-color: #0B0B0D; padding: 24px 32px; border-top: 1px solid #1E293B; text-align: center;" class="fluid-padding">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #FFFFFF; letter-spacing: 0.03em;">
                MSK LOGISTICS SOLUTION
              </p>
              <p style="margin: 0 0 10px 0; font-size: 11px; color: #94A3B8; line-height: 1.5;">
                ISO 9001:2015 Certified • Nhava Sheva (JNPT) &amp; Mundra Corridors<br />
                Office No-A-428, Balaji Bhawan, Sector 11, CBD Belapur, Navi Mumbai 400614
              </p>
              <p style="margin: 0; font-size: 10px; color: #64748B; font-family: 'Courier New', Courier, monospace;">
                You are receiving this official service receipt regarding your recent inquiry.
              </p>
            </td>
          </tr>

        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}
