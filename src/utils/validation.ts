/**
 * MSK LOGISTICS — SHARED FORM & DATA VALIDATION UTILITIES
 * Enforces field-level validation across Contact, Request a Quote, and backend handlers.
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  cleanedValue?: string;
}

/**
 * Validates international and domestic telephone / mobile numbers (E.164 standard compatible)
 * Accepts: +91 81086 72929, 9876543210, 022-12345678, +1 (555) 234-5678
 * Rejects: Alphabetic letters, special symbols, excessively short (< 8 digits) or long (> 15 digits)
 */
export function validatePhoneNumber(phone: string | undefined | null, required: boolean = false): ValidationResult {
  const trimmed = (phone || '').trim();

  if (!trimmed) {
    if (required) {
      return { isValid: false, error: 'Phone number is required.' };
    }
    return { isValid: true, cleanedValue: '' };
  }

  // Reject alphabetic characters explicitly
  if (/[a-zA-Z]/.test(trimmed)) {
    return { isValid: false, error: 'Phone number cannot contain alphabetic characters.' };
  }

  // Remove valid formatting characters (+, space, hyphen, parenthesis, period)
  const cleaned = trimmed.replace(/[\s\-\(\)\.]/g, '');

  // Must only consist of an optional leading '+' followed exclusively by digits
  if (!/^\+?[0-9]+$/.test(cleaned)) {
    return { isValid: false, error: 'Phone number contains invalid characters. Use digits, +, and hyphens.' };
  }

  const digitsOnly = cleaned.replace(/\+/g, '');

  if (digitsOnly.length < 8) {
    return { isValid: false, error: 'Phone number is too short (minimum 8 digits required).' };
  }

  if (digitsOnly.length > 15) {
    return { isValid: false, error: 'Phone number exceeds international maximum (15 digits).' };
  }

  return { isValid: true, cleanedValue: trimmed };
}

/**
 * Validates approximate cargo weight
 * Rejects alphabetic characters, non-numeric strings, negative/zero numbers, or absurdly large values.
 */
export function validateApproxWeight(
  weight: string | number | undefined | null,
  unit: string = 'tons',
  required: boolean = true
): { isValid: boolean; error?: string; parsedWeight?: number } {
  if (weight === undefined || weight === null || String(weight).trim() === '') {
    if (required) {
      return { isValid: false, error: 'Approximate weight is required.' };
    }
    return { isValid: true };
  }

  const str = String(weight).trim();

  // Explicitly check for alphabetic characters
  if (/[a-zA-Z]/.test(str)) {
    return { isValid: false, error: 'Weight must be a numeric value without letters.' };
  }

  // Check valid positive decimal number format
  if (!/^\d+(\.\d+)?$/.test(str)) {
    return { isValid: false, error: 'Please enter a valid positive decimal or integer weight.' };
  }

  const num = parseFloat(str);

  if (isNaN(num) || num <= 0) {
    return { isValid: false, error: 'Weight must be greater than zero.' };
  }

  // Upper limits based on heavy-lift logistics capabilities
  const maxWeight = unit.toLowerCase() === 'kg' ? 600000 : 600; // 600 tons or 600,000 kg (ODC/Breakbulk maximum)
  if (num > maxWeight) {
    return {
      isValid: false,
      error: `Weight exceeds maximum allowable payload capacity (${maxWeight.toLocaleString()} ${unit}). Please verify or contact project cargo desk directly.`,
    };
  }

  return { isValid: true, parsedWeight: num };
}

/**
 * Validates email addresses
 */
export function validateEmail(email: string | undefined | null): ValidationResult {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Business email address is required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid business email address (e.g. name@company.com).' };
  }

  if (trimmed.length > 150) {
    return { isValid: false, error: 'Email address exceeds maximum length (150 characters).' };
  }

  return { isValid: true, cleanedValue: trimmed };
}

/**
 * Validates cargo dimensions if provided (e.g., "12.5 x 2.4 x 2.6 m" or "40 x 8 x 9.5 ft")
 */
export function validateDimensions(dimensions: string | undefined | null): ValidationResult {
  const trimmed = (dimensions || '').trim();
  if (!trimmed) return { isValid: true, cleanedValue: '' };

  if (trimmed.length > 100) {
    return { isValid: false, error: 'Dimensions string cannot exceed 100 characters.' };
  }

  // Allow digits, x, *, m, cm, mm, ft, in, spaces, hyphens, commas, periods
  if (!/^[0-9xX*.\s,\-mMcCtTiInN/'"]+$/.test(trimmed)) {
    return { isValid: false, error: 'Dimensions contain unrecognized characters. (e.g. 12.0 × 2.4 × 2.6 m)' };
  }

  return { isValid: true, cleanedValue: trimmed };
}

/**
 * Formats a comprehensive mailto: link for fallback email submission
 */
export function buildEnquiryMailtoUrl(params: {
  toEmail?: string;
  subject: string;
  details: Record<string, any>;
}): string {
  const to = params.toEmail || 'info@msklogisticsolution.com';
  const subject = params.subject || 'MSK Logistics Enquiry';

  const bodyLines = Object.entries(params.details)
    .filter(([_, val]) => val !== undefined && val !== null && String(val).trim() !== '')
    .map(([key, val]) => {
      // Format camelCase key into readable title
      const label = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
      return `${label}: ${String(val).trim()}`;
    });

  const body = bodyLines.join('\r\n');
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

