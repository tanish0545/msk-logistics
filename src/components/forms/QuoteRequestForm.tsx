import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Loader2, 
  ArrowRight, 
  ArrowLeft, 
  Phone, 
  Mail, 
  Info
} from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/company';
import type { QuoteFormData, EnquiryCategory, SolutionType } from '../../types';

export const ENQUIRY_CATEGORIES: {
  id: EnquiryCategory;
  label: string;
  badge: string;
  description: string;
  tag?: string;
}[] = [
  {
    id: 'general-export',
    label: 'General Export Packing',
    badge: 'Standard',
    description: 'General industrial cargo packaging, crating, palletizing & securing.',
  },
  {
    id: 'flat-rack',
    label: 'Flat Rack Shipment',
    badge: 'Heavy / OOG',
    description: 'Out-of-gauge, heavy equipment or machinery requiring bed-lashing.',
  },
  {
    id: 'breakbulk',
    label: 'Breakbulk Shipment',
    badge: 'Heavy Lift',
    description: 'Non-containerized breakbulk cargo, project units & heavy rigging.',
  },
  {
    id: 'open-top',
    label: 'Open Top Shipment',
    badge: 'Overheight',
    description: 'Overheight cargo loaded by overhead crane with tarpaulin securing.',
  },
  {
    id: 'container-selection',
    label: 'Container Selection Assistance',
    badge: 'Advisory',
    description: 'Assistance evaluating cargo dimensions against container payload specs.',
  },
  {
    id: 'open-warehouse',
    label: 'Open Warehouse Enquiry',
    badge: 'Yard Buffer',
    description: 'Open-yard staging / buffer area (Awaiting MSK facility confirmation).',
    tag: 'Subject to verification',
  },
  {
    id: 'shaded-warehouse',
    label: 'Shaded Warehouse Enquiry',
    badge: 'Covered Shed',
    description: 'Covered shed / weather-protected staging (Awaiting MSK facility confirmation).',
    tag: 'Subject to verification',
  },
];

export const QuoteRequestForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const solParam = searchParams.get('solution');
  const initialSolution: SolutionType = 
    solParam === 'client_cargo_container_arranged_by_client' || solParam === 'client-arranged'
      ? 'client_cargo_container_arranged_by_client'
      : 'client_container_and_cargo';

  const getInitialCategory = (): EnquiryCategory => {
    const cat = searchParams.get('category');
    if (cat === 'flat-rack') return 'flat-rack';
    if (cat === 'breakbulk') return 'breakbulk';
    if (cat === 'open-top') return 'open-top';
    const enq = searchParams.get('enquiry');
    if (enq === 'open-warehouse') return 'open-warehouse';
    if (enq === 'shaded-warehouse') return 'shaded-warehouse';
    if (searchParams.get('container')) return 'container-selection';
    return 'general-export';
  };

  const getInitialContainer = (): string => {
    const containerParam = searchParams.get('container');
    if (containerParam) return containerParam;
    const cat = searchParams.get('category');
    if (cat === 'flat-rack') return 'Flat Rack Container';
    if (cat === 'breakbulk') return 'Breakbulk / Specialized Rigging';
    if (cat === 'open-top') return 'Open Top Container';
    return '40ft High Cube Container';
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<QuoteFormData>({
    solutionType: initialSolution,
    enquiryCategory: getInitialCategory(),
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    designation: '',
    cargoDescription: '',
    packageCount: '',
    approxWeight: '',
    weightUnit: 'tons',
    dimensions: '',
    packagingNeeds: '',
    specialHandlingNotes: '',
    containerSize: getInitialContainer(),
    containerLocationOrPositioning: '',
    containerAvailabilityDate: '',
    preferredDate: '',
    operationalAddress: '',
    additionalInstructions: '',
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync query params if solution, category, enquiry, or container changes in URL
  useEffect(() => {
    const sol = searchParams.get('solution');
    if (sol) {
      const normalizedSol: SolutionType = 
        sol === 'client_cargo_container_arranged_by_client' || sol === 'client-arranged'
          ? 'client_cargo_container_arranged_by_client'
          : 'client_container_and_cargo';
      setFormData(prev => ({ ...prev, solutionType: normalizedSol }));
    }
    const cat = searchParams.get('category');
    if (cat === 'flat-rack' || cat === 'breakbulk' || cat === 'open-top') {
      setFormData(prev => ({ 
        ...prev, 
        enquiryCategory: cat as EnquiryCategory,
        containerSize: cat === 'flat-rack' ? 'Flat Rack' : cat === 'open-top' ? 'Open Top' : 'Breakbulk / Specialized Rigging'
      }));
    }
    const enq = searchParams.get('enquiry');
    if (enq === 'open-warehouse' || enq === 'shaded-warehouse') {
      setFormData(prev => ({ ...prev, enquiryCategory: enq as EnquiryCategory }));
    }
    const containerParam = searchParams.get('container');
    if (containerParam) {
      setFormData(prev => ({ 
        ...prev, 
        containerSize: containerParam,
        enquiryCategory: 'container-selection'
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.solutionType) {
        errs.solutionType = 'Please select an export packing solution.';
      }
    } else if (step === 2) {
      if (!formData.companyName.trim()) errs.companyName = 'Company name is required.';
      if (!formData.contactName.trim()) errs.contactName = 'Contact person name is required.';
      if (!formData.email.trim()) {
        errs.email = 'Business email is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errs.email = 'Please enter a valid email address.';
      }
      if (!formData.phone.trim()) {
        errs.phone = 'Phone number is required.';
      } else if (formData.phone.trim().length < 8) {
        errs.phone = 'Please enter a valid phone number.';
      }
    } else if (step === 3) {
      if (!formData.cargoDescription.trim()) errs.cargoDescription = 'Please describe the cargo or product.';
      if (!formData.approxWeight.trim()) errs.approxWeight = 'Approximate weight is required.';
    } else if (step === 4) {
      if (!formData.containerLocationOrPositioning.trim()) {
        errs.containerLocationOrPositioning = formData.solutionType === 'complete'
          ? 'Please specify the required delivery/positioning location.'
          : 'Please specify where your container will be staged/available.';
      }
    } else if (step === 5) {
      if (!formData.operationalAddress.trim()) errs.operationalAddress = 'Work location / facility address is required.';
    } else if (step === 6) {
      if (!formData.privacyConsent) errs.privacyConsent = 'You must acknowledge the quote review terms to proceed.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const apiUrl = import.meta.env.VITE_ENQUIRY_API_URL;

      if (apiUrl && apiUrl.trim().length > 0) {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            submittedAt: new Date().toISOString(),
            source: 'MSK Logistics Quote Request Portal'
          })
        });

        if (!response.ok) {
          throw new Error('Server responded with an error during submission.');
        }
      } else {
        const existing = JSON.parse(localStorage.getItem('msk_quote_requests') || '[]');
        existing.push({
          ...formData,
          id: `REQ-${Date.now()}`,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('msk_quote_requests', JSON.stringify(existing));
        await new Promise(res => setTimeout(res, 800));
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Submission failed. Please contact our desk directly by email or phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl border border-[#E2E2E2] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm space-y-6">
        <div className="w-16 h-16 bg-red-50 text-[#B62825] rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="editorial-badge bg-green-50 text-green-700 border-green-200">
            ENQUIRY RECORDED
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#343434] font-heading">
            Quote Request Received
          </h2>
          <p className="text-[15px] text-[#666666] leading-relaxed">
            Thank you for your enquiry. Your quote request has been received. Our team will review the information and contact you to discuss requirements and pricing.
          </p>
        </div>

        {/* Truthful Status Box */}
        <div className="p-4 bg-[#F5F5F3] rounded-lg border border-[#E2E2E2] text-left text-[13px] space-y-2">
          <div className="font-semibold text-[#343434]">Important Operational Notice:</div>
          <p className="text-[#666666]">
            A quote request is <strong>not a confirmed booking, confirmed price, confirmed container arrangement, or scheduled job</strong>. Container availability, transport charges, and packing schedules will be formally verified and agreed upon in writing.
          </p>
          <div className="pt-2 border-t border-[#E2E2E2] font-mono-code text-[12px] text-neutral-500 space-y-1">
            <div>ARRANGEMENT: {formData.solutionType === 'complete' ? 'Complete Export Packing Solution (Option A)' : 'Client-Arranged Container (Option B)'}</div>
            <div>ENQUIRY FOCUS: {ENQUIRY_CATEGORIES.find(c => c.id === formData.enquiryCategory)?.label || formData.enquiryCategory}</div>
          </div>
        </div>

        {/* Direct Contact Options */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-[14px]">
          <a 
            href={COMPANY_DETAILS.phoneHref}
            className="btn-secondary w-full sm:w-auto"
          >
            <Phone className="w-4 h-4 text-[#B62825]" />
            <span>Call Desk: {COMPANY_DETAILS.phone}</span>
          </a>
          <a 
            href={COMPANY_DETAILS.emailHref}
            className="btn-primary w-full sm:w-auto"
          >
            <Mail className="w-4 h-4" />
            <span>Email Documents Directly</span>
          </a>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
            }}
            className="text-[13px] text-neutral-500 hover:text-[#B62825] underline"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E2E2E2] shadow-sm overflow-hidden">
      {/* Progress Steps Header */}
      <div className="bg-[#343434] text-white p-5 sm:p-6 border-b border-neutral-700">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <span className="editorial-badge bg-white/10 text-white border-white/20">
              STEP 0{currentStep} OF 06
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
              {currentStep === 1 && 'Select Service Arrangement'}
              {currentStep === 2 && 'Customer & Company Information'}
              {currentStep === 3 && 'Cargo Specifications'}
              {currentStep === 4 && 'Container Sourcing & Placement'}
              {currentStep === 5 && 'Schedule & Facility Location'}
              {currentStep === 6 && 'Review Details & Submit'}
            </h2>
          </div>

          <div className="text-[12px] font-mono-code text-neutral-300">
            {formData.solutionType === 'client_container_and_cargo' || formData.solutionType === 'complete'
              ? '[OPTION 01 SELECTED]'
              : '[OPTION 02 SELECTED]'}
          </div>
        </div>

        {/* Progress Bar Indicator */}
        <div className="w-full bg-neutral-700 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-[#B62825] h-full transition-all duration-300"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-9 space-y-6">
        {/* STEP 1: Select Service Arrangement */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-[15px] font-semibold text-[#343434] mb-1">
                Which export packing solution do you need? <span className="text-[#B62825]">*</span>
              </label>
              <p className="text-[13px] text-[#666666]">
                Select the arrangement that matches your operational workflow. Both solutions include agreed packaging, stuffing, and lashing work. MSK does not supply or arrange containers under either option.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Option 01 Radio Card */}
              <div 
                onClick={() => setFormData(p => ({ ...p, solutionType: 'client_container_and_cargo' }))}
                className={`cursor-pointer rounded-xl p-5 border-2 transition-all ${
                  formData.solutionType === 'client_container_and_cargo' || formData.solutionType === 'complete'
                    ? 'border-[#173F70] bg-blue-50/20 shadow-md ring-1 ring-[#173F70]/20'
                    : 'border-[#E2E2E2] hover:border-neutral-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-[#173F70] uppercase">
                    Option 01
                  </span>
                  <input
                    type="radio"
                    name="solutionType"
                    checked={formData.solutionType === 'client_container_and_cargo' || formData.solutionType === 'complete'}
                    onChange={() => setFormData(p => ({ ...p, solutionType: 'client_container_and_cargo' }))}
                    className="w-4 h-4 text-[#173F70] focus:ring-[#173F70]"
                  />
                </div>
                <div className="font-bold text-[#173F70] text-[16px] mb-1 font-heading">
                  Client-Arranged Container & Cargo
                </div>
                <div className="text-xs font-semibold text-[#343434] mb-2">
                  You provide the cargo and the container. MSK handles the packing work.
                </div>
                <p className="text-[13px] text-[#666666] leading-relaxed mb-4">
                  Already have your cargo and container arranged? MSK Logistics performs the agreed export packaging, container stuffing, and cargo lashing work.
                </p>
                <div className="text-[11px] font-mono text-neutral-600 border-t border-[#E2E2E2] pt-2">
                  ✓ Container provided by Client • MSK does not supply container
                </div>
              </div>

              {/* Option 02 Radio Card */}
              <div 
                onClick={() => setFormData(p => ({ ...p, solutionType: 'client_cargo_container_arranged_by_client' }))}
                className={`cursor-pointer rounded-xl p-5 border-2 transition-all ${
                  formData.solutionType === 'client_cargo_container_arranged_by_client' || formData.solutionType === 'client-arranged'
                    ? 'border-[#B62825] bg-red-50/20 shadow-md ring-1 ring-[#B62825]/20'
                    : 'border-[#E2E2E2] hover:border-neutral-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-[#B62825] uppercase">
                    Option 02
                  </span>
                  <input
                    type="radio"
                    name="solutionType"
                    checked={formData.solutionType === 'client_cargo_container_arranged_by_client' || formData.solutionType === 'client-arranged'}
                    onChange={() => setFormData(p => ({ ...p, solutionType: 'client_cargo_container_arranged_by_client' }))}
                    className="w-4 h-4 text-[#B62825] focus:ring-[#B62825]"
                  />
                </div>
                <div className="font-bold text-[#343434] text-[16px] mb-1 font-heading">
                  Client Cargo, Container to Be Arranged
                </div>
                <div className="text-xs font-semibold text-[#173F70] mb-2">
                  You provide the cargo and arrange the container separately.
                </div>
                <p className="text-[13px] text-[#666666] leading-relaxed mb-4">
                  Have products ready but no container yet? Arrange a suitable container independently, then MSK Logistics can perform the agreed export packaging, container stuffing, and cargo lashing work.
                </p>
                <div className="text-[11px] font-mono text-neutral-600 border-t border-[#E2E2E2] pt-2">
                  ✓ Container sourcing is Client responsibility • MSK does not supply container
                </div>
              </div>
            </div>

            {/* Dynamic Explanation Notice */}
            <div className="p-4 rounded-xl bg-[#F5F5F3] border border-[#E2E2E2] text-[13px] flex items-start gap-3">
              <Info className="w-5 h-5 text-[#B62825] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#343434] block mb-0.5">
                  {formData.solutionType === 'client_container_and_cargo' || formData.solutionType === 'complete'
                    ? 'Option 01 Selected — Container & Cargo Ready:' 
                    : 'Option 02 Selected — Container to Be Arranged by Client:'}
                </strong>
                <p className="text-[#666666]">
                  {formData.solutionType === 'client_container_and_cargo' || formData.solutionType === 'complete'
                    ? 'You provide the cargo and container at the staging location. MSK Logistics performs the agreed export packaging, container stuffing, and cargo lashing work.'
                    : 'You provide the cargo and source the container independently. MSK Logistics performs the agreed export packaging, container stuffing, and cargo lashing work once the container is in place.'}
                </p>
              </div>
            </div>

            {/* Shipment / Enquiry Category Focus */}
            <div className="pt-4 border-t border-[#E2E2E2] space-y-3">
              <div>
                <label className="block text-[15px] font-semibold text-[#343434] mb-1">
                  Select Shipment or Enquiry Category Focus
                </label>
                <p className="text-[13px] text-[#666666]">
                  Important operational distinction: Sourcing Arrangement (Option A vs B above) specifies container responsibility. Any specialized shipment type below (e.g. Flat Rack, Breakbulk, Open Top) can be serviced under either arrangement.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ENQUIRY_CATEGORIES.map(category => {
                  const isSelected = formData.enquiryCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setFormData(p => ({
                          ...p,
                          enquiryCategory: category.id,
                          containerSize: 
                            category.id === 'flat-rack' ? 'Flat Rack Container' :
                            category.id === 'open-top' ? 'Open Top Container' :
                            category.id === 'breakbulk' ? 'Breakbulk / Specialized Rigging' :
                            p.containerSize
                        }));
                      }}
                      className={`text-left p-3.5 rounded-lg border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#B62825] bg-red-50/30 ring-1 ring-[#B62825]'
                          : 'border-[#E2E2E2] hover:border-neutral-400 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className={`text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded ${
                            isSelected ? 'bg-[#B62825] text-white' : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {category.badge}
                          </span>
                          {category.tag && (
                            <span className="text-[10px] font-mono-code text-[#D97706] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              {category.tag}
                            </span>
                          )}
                        </div>
                        <div className="font-semibold text-[13.5px] text-[#343434] mb-1">
                          {category.label}
                        </div>
                        <p className="text-[12px] text-[#666666] leading-snug">
                          {category.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Customer & Company Details */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                  Company Name <span className="text-[#B62825]">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Acme Export Industries"
                  className={`w-full px-3.5 py-2.5 rounded-md border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] ${
                    errors.companyName ? 'border-red-500' : 'border-[#E2E2E2]'
                  }`}
                />
                {errors.companyName && <p className="text-red-500 text-[12px] mt-1">{errors.companyName}</p>}
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                  Contact Person Name <span className="text-[#B62825]">*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="e.g. Rajesh Sharma"
                  className={`w-full px-3.5 py-2.5 rounded-md border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] ${
                    errors.contactName ? 'border-red-500' : 'border-[#E2E2E2]'
                  }`}
                />
                {errors.contactName && <p className="text-red-500 text-[12px] mt-1">{errors.contactName}</p>}
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                  Business Email <span className="text-[#B62825]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`w-full px-3.5 py-2.5 rounded-md border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] ${
                    errors.email ? 'border-red-500' : 'border-[#E2E2E2]'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                  Phone Number <span className="text-[#B62825]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className={`w-full px-3.5 py-2.5 rounded-md border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] ${
                    errors.phone ? 'border-red-500' : 'border-[#E2E2E2]'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-[12px] mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                  Designation / Role (Optional)
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Export Logistics Manager"
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Cargo Details */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                Cargo or Product Description <span className="text-[#B62825]">*</span>
              </label>
              <textarea
                name="cargoDescription"
                rows={3}
                value={formData.cargoDescription}
                onChange={handleChange}
                placeholder="Describe machinery, steel parts, packaged goods, automotive components, etc."
                className={`w-full px-3.5 py-2.5 rounded-md border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] ${
                  errors.cargoDescription ? 'border-red-500' : 'border-[#E2E2E2]'
                }`}
              />
              {errors.cargoDescription && <p className="text-red-500 text-[12px] mt-1">{errors.cargoDescription}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                  Number of Packages / Units (Optional)
                </label>
                <input
                  type="text"
                  name="packageCount"
                  value={formData.packageCount}
                  onChange={handleChange}
                  placeholder="e.g. 12 crates / 4 skids"
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                  Approximate Total Weight <span className="text-[#B62825]">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="approxWeight"
                    value={formData.approxWeight}
                    onChange={handleChange}
                    placeholder="e.g. 18"
                    className={`flex-1 px-3.5 py-2.5 rounded-md border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] ${
                      errors.approxWeight ? 'border-red-500' : 'border-[#E2E2E2]'
                    }`}
                  />
                  <select
                    name="weightUnit"
                    value={formData.weightUnit}
                    onChange={handleChange}
                    className="px-3 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] bg-white"
                  >
                    <option value="tons">Metric Tons</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lbs">Pounds (lbs)</option>
                  </select>
                </div>
                {errors.approxWeight && <p className="text-red-500 text-[12px] mt-1">{errors.approxWeight}</p>}
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                  Cargo Dimensions (L × W × H)
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="e.g. 3.2m × 1.8m × 2.1m (or 'Not available yet')"
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                />
                <span className="text-[11px] text-[#666666] mt-0.5 block">
                  Exact measurements not required if still being finalized.
                </span>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                  Packaging Requirements (Optional)
                </label>
                <input
                  type="text"
                  name="packagingNeeds"
                  value={formData.packagingNeeds}
                  onChange={handleChange}
                  placeholder="e.g. Wooden crating, moisture barrier foil, skidding"
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                  Special Cargo-Handling Notes (Optional)
                </label>
                <input
                  type="text"
                  name="specialHandlingNotes"
                  value={formData.specialHandlingNotes}
                  onChange={handleChange}
                  placeholder="e.g. Top-heavy machinery, crane lifting lugs available, center-of-gravity marked"
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Container Arrangements */}
        {currentStep === 4 && (
          <div className="space-y-6">
            {formData.solutionType === 'complete' ? (
              <div className="space-y-5">
                <div className="p-4 bg-red-50/60 rounded-lg border border-red-200 text-[13px] space-y-1">
                  <div className="font-bold text-[#B62825] uppercase font-mono-code">
                    Option A — Complete Export Packing Arrangement
                  </div>
                  <p className="text-[#343434]">
                    MSK Logistics will arrange the container subject to availability and an agreed quotation. Container charges, positioning fees, and included scope will be clarified in your quotation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                      Preferred Container Type / Size
                    </label>
                    <select
                      name="containerSize"
                      value={formData.containerSize}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                    >
                      <option value="20ft Standard Dry Container">20ft Standard Dry Container</option>
                      <option value="40ft Standard Dry Container">40ft Standard Dry Container</option>
                      <option value="40ft High Cube Container">40ft High Cube Container (HQ)</option>
                      <option value="Open Top Container">Open Top Container</option>
                      <option value="Flat Rack Container">Flat Rack Container</option>
                      <option value="Reefer Container">Reefer Container (Refrigerated)</option>
                      <option value="Breakbulk / Specialized Rigging">Breakbulk / Specialized Rigging (Non-containerized)</option>
                      <option value="Not sure yet (Need MSK Recommendation)">Not sure yet (Need MSK Recommendation)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                      Container Delivery / Positioning Location <span className="text-[#B62825]">*</span>
                    </label>
                    <input
                      type="text"
                      name="containerLocationOrPositioning"
                      value={formData.containerLocationOrPositioning}
                      onChange={handleChange}
                      placeholder="e.g. Client factory in Taloja, Navi Mumbai"
                      className={`w-full px-3.5 py-2.5 rounded-md border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] ${
                        errors.containerLocationOrPositioning ? 'border-red-500' : 'border-[#E2E2E2]'
                      }`}
                    />
                    {errors.containerLocationOrPositioning && (
                      <p className="text-red-500 text-[12px] mt-1">{errors.containerLocationOrPositioning}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="p-4 bg-neutral-100 rounded-lg border border-neutral-300 text-[13px] space-y-1">
                  <div className="font-bold text-[#343434] uppercase font-mono-code">
                    Option B — Client-Arranged Container
                  </div>
                  <p className="text-[#666666]">
                    You are responsible for arranging the container directly with your carrier or leasing partner. MSK Logistics will perform the packaging, stuffing, and cargo lashing work on-site.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                      Your Planned Container Type / Size
                    </label>
                    <select
                      name="containerSize"
                      value={formData.containerSize}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                    >
                      <option value="20ft Standard Dry Container">20ft Standard Dry Container</option>
                      <option value="40ft Standard Dry Container">40ft Standard Dry Container</option>
                      <option value="40ft High Cube Container">40ft High Cube Container (HQ)</option>
                      <option value="Open Top Container">Open Top Container</option>
                      <option value="Flat Rack Container">Flat Rack Container</option>
                      <option value="Reefer Container">Reefer Container (Refrigerated)</option>
                      <option value="Breakbulk / Specialized Rigging">Breakbulk / Specialized Rigging (Non-containerized)</option>
                      <option value="Not finalized yet">Not finalized yet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                      Container Staging / Availability Location <span className="text-[#B62825]">*</span>
                    </label>
                    <input
                      type="text"
                      name="containerLocationOrPositioning"
                      value={formData.containerLocationOrPositioning}
                      onChange={handleChange}
                      placeholder="e.g. CFS Yard, Nhava Sheva or Client Warehouse"
                      className={`w-full px-3.5 py-2.5 rounded-md border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] ${
                        errors.containerLocationOrPositioning ? 'border-red-500' : 'border-[#E2E2E2]'
                      }`}
                    />
                    {errors.containerLocationOrPositioning && (
                      <p className="text-red-500 text-[12px] mt-1">{errors.containerLocationOrPositioning}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Schedule & Location */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                  Preferred Packing / Stuffing Date
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                />
                <span className="text-[11px] text-[#666666] mt-0.5 block">
                  Subject to operational confirmation. (Not a final booking).
                </span>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                  Operational Packing Facility / Work Location <span className="text-[#B62825]">*</span>
                </label>
                <input
                  type="text"
                  name="operationalAddress"
                  value={formData.operationalAddress}
                  onChange={handleChange}
                  placeholder="e.g. Plot 45, MIDC Taloja, Navi Mumbai"
                  className={`w-full px-3.5 py-2.5 rounded-md border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] ${
                    errors.operationalAddress ? 'border-red-500' : 'border-[#E2E2E2]'
                  }`}
                />
                {errors.operationalAddress && (
                  <p className="text-red-500 text-[12px] mt-1">{errors.operationalAddress}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[14px] font-medium text-[#343434] mb-1.5">
                  Additional Scope Notes / Work Schedule Instructions (Optional)
                </label>
                <textarea
                  name="additionalInstructions"
                  rows={3}
                  value={formData.additionalInstructions}
                  onChange={handleChange}
                  placeholder="Specify crane requirements, gate entry formalities, loading window constraints, etc."
                  className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Review & Consent */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="bg-[#F5F5F3] p-5 rounded-lg border border-[#E2E2E2] space-y-4 text-[13px]">
              <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-2 font-bold text-[#343434]">
                <span>Enquiry Summary</span>
                <span className="font-mono-code text-[11px] text-[#B62825]">
                  {formData.solutionType === 'complete' ? 'OPTION A: COMPLETE SOLUTION' : 'OPTION B: CLIENT-ARRANGED CONTAINER'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#343434]">
                <div><strong>Company:</strong> {formData.companyName || '—'}</div>
                <div><strong>Contact:</strong> {formData.contactName} ({formData.phone})</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Enquiry Focus:</strong> {
                  ENQUIRY_CATEGORIES.find(c => c.id === formData.enquiryCategory)?.label || formData.enquiryCategory
                }</div>
                <div><strong>Cargo:</strong> {formData.cargoDescription}</div>
                <div><strong>Weight:</strong> {formData.approxWeight} {formData.weightUnit}</div>
                <div><strong>Dimensions:</strong> {formData.dimensions || 'Pending confirmation'}</div>
                <div><strong>Container:</strong> {formData.containerSize}</div>
                <div className="sm:col-span-2"><strong>Work Location:</strong> {formData.operationalAddress}</div>
              </div>

              {(formData.enquiryCategory === 'open-warehouse' || formData.enquiryCategory === 'shaded-warehouse') && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-[12px] text-amber-900">
                  <strong>Warehouse Staging Note:</strong> Open-yard and shaded staging inquiries are indicative and awaiting formal facility capacity confirmation by MSK Logistics prior to final quote approval.
                </div>
              )}

              <div className="pt-2 border-t border-[#E2E2E2] text-[12px] text-neutral-600">
                <strong>Responsibility Check:</strong>{' '}
                {formData.solutionType === 'complete'
                  ? 'Option A: MSK Logistics arranges container (subject to quotation & availability) and performs agreed packing, stuffing, and lashing.'
                  : 'Option B: Customer provides cargo and arranges container; MSK Logistics performs agreed packaging, stuffing, and lashing.'}
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#B62825] focus:ring-[#B62825] rounded mt-0.5"
                />
                <span className="text-[13px] text-[#343434] leading-snug">
                  I confirm that the shipment details provided are accurate for quotation purposes. I understand that submitting this enquiry does not constitute a confirmed container booking or price guarantee until formally reviewed and accepted in writing by MSK Logistics Pvt. Ltd.
                </span>
              </label>
              {errors.privacyConsent && (
                <p className="text-red-500 text-[12px] pl-7">{errors.privacyConsent}</p>
              )}
            </div>

            {submitError && (
              <div className="p-4 bg-red-50 rounded border border-red-200 text-red-700 text-[13px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-[#E2E2E2] flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              disabled={isSubmitting}
              className="btn-secondary px-5 py-2.5 text-[14px]"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary px-6 py-2.5 text-[14px]"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-8 py-3 text-[15px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                  <span>Submitting Request...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-1.5" />
                  <span>Submit Quote Request</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
