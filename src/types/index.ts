export type SolutionType = 
  | 'client_container_and_cargo' 
  | 'client_cargo_container_arranged_by_client' 
  | 'complete' 
  | 'client-arranged';

export type EnquiryCategory =
  | 'ocean-cargo'
  | 'air-cargo'
  | 'container-stuffing'
  | 'special-project'
  | 'cargo-lashing'
  | 'hazardous-cargo'
  | 'open-yard-warehouse'
  | 'shaded-warehouse'
  | 'general-export'
  | 'flat-rack'
  | 'breakbulk'
  | 'open-top'
  | 'container-selection'
  | 'open-warehouse';

export interface QuoteFormData {
  // Step 1: Core Service & Cargo Arrangement
  solutionType: SolutionType;
  enquiryCategory: EnquiryCategory | '';

  // Step 2: Cargo Details
  cargoDescription: string;
  packageCount: string;
  approxWeight: string;
  weightUnit: 'kg' | 'tons' | 'lbs';
  dimensions?: string;
  packagingNeeds: string;
  specialHandlingNotes?: string;

  // Step 3: Origin & Destination / Positioning
  originCity?: string;
  destinationPort?: string;
  containerSize: string;
  containerLocationOrPositioning: string;
  containerAvailabilityDate?: string;
  preferredDate: string;
  operationalAddress: string;

  // Step 4: Contact Information & Quote Reference
  quoteName?: string; // "Q Name" from client handwritten brief Note 1
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  designation?: string;
  additionalInstructions?: string;

  // Step 5: Review & Consent
  privacyConsent: boolean;
}
