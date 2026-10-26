export type SolutionType = 
  | 'client_container_and_cargo' 
  | 'client_cargo_container_arranged_by_client' 
  | 'complete' 
  | 'client-arranged';

export type EnquiryCategory =
  | 'general-export'
  | 'flat-rack'
  | 'breakbulk'
  | 'open-top'
  | 'container-selection'
  | 'open-warehouse'
  | 'shaded-warehouse';

export interface QuoteFormData {
  // Step 1: Core Service Arrangement (Option A vs Option B)
  solutionType: SolutionType;

  // Shipment / Enquiry Category (Independent of arrangement)
  enquiryCategory: EnquiryCategory;

  // Step 2: Customer & Company Details
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  designation?: string;

  // Step 3: Cargo Details
  cargoDescription: string;
  packageCount: string;
  approxWeight: string;
  weightUnit: 'kg' | 'tons' | 'lbs';
  dimensions?: string;
  packagingNeeds: string;
  specialHandlingNotes?: string;

  // Step 4: Container Arrangements (Conditional)
  containerSize: string;
  containerLocationOrPositioning: string;
  containerAvailabilityDate?: string;

  // Step 5: Schedule & Location
  preferredDate: string;
  operationalAddress: string;
  additionalInstructions?: string;

  // Step 6: Consent
  privacyConsent: boolean;
}
