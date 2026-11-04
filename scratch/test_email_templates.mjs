import fs from 'fs';
import path from 'path';
import { 
  generateInternalEmailHtml, 
  generateCustomerConfirmationEmailHtml, 
  getFormattedDateIST 
} from '../api/emailTemplates.ts';

const SCRATCH_DIR = path.join(process.cwd(), 'scratch');
const ARTIFACTS_DIR = 'C:\\Users\\tanis\\.gemini\\antigravity\\brain\\c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d';

// Sample 1: Full 5-Step Industrial Quote Request Payload
const quotePayload = {
  enquiryType: 'quote',
  referenceId: 'MSK-REQ-849201',
  submissionDate: getFormattedDateIST(),
  customerName: 'Vikramaditya Singhania',
  companyName: 'Singhania Heavy Engineering Pvt. Ltd.',
  email: 'v.singhania@singhania-heavy.com',
  phone: '+91 98201 44552',
  designation: 'Head of Global Logistics & EXIM Operations',
  selectedService: 'Special Project Cargo Handling (ODC / FR)',
  solutionType: 'Client Arranged Container & MSK Lashing / Packing Scope',
  quoteName: 'JNPT-ROTTERDAM-HEAVY-PRESS-2026',
  cargoDescription: '52-Ton Hydraulic Stamping Press Base & Sub-Assembly Bed (Over-Dimensional Unit)',
  packageCount: '2 Heavy Skid Packages + 1 Ancillary Crate',
  approxWeight: '54.5',
  weightUnit: 'tons',
  dimensions: '11.8m (L) × 3.1m (W) × 3.4m (H) — Out of Gauge (OOG)',
  packagingNeeds: 'ISPM-15 Heat Treated Hardwood Timber Saddles & Anti-Corrosion VCI Barrier Foil Seal',
  specialHandlingNotes: 'Heavy spreader beam crane lift required; zero tilt tolerance during cellular hold positioning.',
  originCity: 'Pune Industrial Area (Chakan MIDC)',
  destinationPort: 'Port of Rotterdam, Netherlands (Via JNPT Corridor)',
  containerSize: '40ft Flat Rack Container (ISO 45P3)',
  containerLocationOrPositioning: 'Conex CFS Terminal Yard / Staging Hardstanding',
  preferredDate: '2026-11-20',
  operationalAddress: 'Nhava Sheva (JNPT) Western Maritime Corridor, Sector 3',
  additionalInstructions: 'Surveyor inspection required prior to container gate-in. Please ensure marine lashing certificates comply with ClassNK / DNV ocean transit specifications.',
};

// Sample 2: Professional Contact Form Enquiry
const contactPayload = {
  enquiryType: 'contact',
  referenceId: 'MSK-ENQ-392018',
  submissionDate: getFormattedDateIST(),
  customerName: 'Ananya Deshmukh',
  companyName: 'Apex Precision Tools Ltd.',
  email: 'ananya.d@apexprecision.in',
  phone: '+91 98190 23456',
  selectedService: 'Export Packaging & Container Stuffing Consultation',
  message: 'We have an upcoming consignment of precision CNC machine tools destined for Hamburg. We require on-site export crating with VCI foil wrapping and certified container stuffing at our factory premises before trailer transfer to JNPT. Kindly share your availability for preliminary technical inspection this week.',
};

// Sample 3: Minimal Contact Form (Missing optional fields: no company, no phone)
const minimalPayload = {
  enquiryType: 'contact',
  referenceId: 'MSK-ENQ-110294',
  submissionDate: getFormattedDateIST(),
  customerName: 'Rajesh Mehra',
  email: 'rajesh.mehra@freightforwarding.net',
  selectedService: 'General Maritime Freight Inquiry',
  message: 'Seeking general operational guidance regarding container buffer storage at Conex CFS ahead of vessel gate opening dates.',
};

console.log('Generating HTML email templates...');

// Generate HTMLs
const htmlQuoteInternal = generateInternalEmailHtml(quotePayload);
const htmlQuoteCustomer = generateCustomerConfirmationEmailHtml(quotePayload);
const htmlContactInternal = generateInternalEmailHtml(contactPayload);
const htmlContactCustomer = generateCustomerConfirmationEmailHtml(contactPayload);
const htmlMinimalInternal = generateInternalEmailHtml(minimalPayload);
const htmlMinimalCustomer = generateCustomerConfirmationEmailHtml(minimalPayload);

// Save files for browser inspection
fs.writeFileSync(path.join(SCRATCH_DIR, 'email_quote_internal.html'), htmlQuoteInternal);
fs.writeFileSync(path.join(SCRATCH_DIR, 'email_quote_customer.html'), htmlQuoteCustomer);
fs.writeFileSync(path.join(SCRATCH_DIR, 'email_contact_internal.html'), htmlContactInternal);
fs.writeFileSync(path.join(SCRATCH_DIR, 'email_contact_customer.html'), htmlContactCustomer);
fs.writeFileSync(path.join(SCRATCH_DIR, 'email_minimal_internal.html'), htmlMinimalInternal);
fs.writeFileSync(path.join(SCRATCH_DIR, 'email_minimal_customer.html'), htmlMinimalCustomer);

console.log('Successfully generated all 6 HTML email template samples in scratch/ directory.');

