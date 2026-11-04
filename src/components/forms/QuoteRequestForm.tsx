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
  Ship,
  Plane,
  Box,
  Anchor,
  Maximize2,
  Warehouse,
  Check,
  ShieldAlert
} from 'lucide-react';
import type { QuoteFormData, EnquiryCategory, SolutionType } from '../../types';

export interface ServiceOption {
  id: EnquiryCategory;
  title: string;
  badge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isoCode?: string;
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'ocean-cargo',
    title: 'Ocean Cargo',
    badge: 'ISO FCL / LCL',
    description: 'Vessel schedule alignment, port gate-in & FCL/LCL ocean freight handling.',
    icon: Ship,
    isoCode: '22G1 / 45G1',
  },
  {
    id: 'air-cargo',
    title: 'Air Cargo',
    badge: 'Express Freight',
    description: 'Time-critical air freight transfers, ULD packing & airport cargo handling.',
    icon: Plane,
    isoCode: 'ULD AIR',
  },
  {
    id: 'container-stuffing',
    title: 'Container Stuffing Logistics',
    badge: 'CFS & Yard',
    description: 'Precision weight distribution, mobile crane lifting & stuffing sequence execution.',
    icon: Box,
    isoCode: 'STUFF-OPS',
  },
  {
    id: 'special-project',
    title: 'Special Project Cargo Handling',
    badge: 'Heavy Lift / ODC',
    description: 'Over-dimensional cargo rigging, flat rack securing & multi-axle trailer transport.',
    icon: Maximize2,
    isoCode: '45P3 / BBC',
  },
  {
    id: 'cargo-lashing',
    title: 'Cargo Lashing',
    badge: 'Marine Securing',
    description: 'High-tensile ratchet webbings, Grade 80 chains, steel wire & timber chocking.',
    icon: Anchor,
    isoCode: 'LASH-SEC',
  },
  {
    id: 'hazardous-cargo',
    title: 'Hazardous Cargo',
    badge: 'DG / IMDG / IATA',
    description: 'UN-rated packaging, chemical drum palletisation, IBC tote restraint & DG segregation.',
    icon: ShieldAlert,
    isoCode: 'DG-IMDG',
  },
  {
    id: 'open-yard-warehouse',
    title: 'Open Yard Staging',
    badge: 'Hardstanding',
    description: 'Spacious open-air container buffer holding & low-bed trailer staging at Conex CFS.',
    icon: Warehouse,
    isoCode: 'CFS-BUFFER',
  },
  {
    id: 'shaded-warehouse',
    title: 'Shaded Warehouse',
    badge: 'Covered Shed',
    description: 'Covered Aquario & Aryan Shed bays for sheltered packing, pallet storage & barrier foil.',
    icon: Warehouse,
    isoCode: 'SHED-BAYS',
  },
];

export const QuoteRequestForm: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Initial solution type from URL or default
  const initialSolution: SolutionType = 'client_container_and_cargo';

  // Initial enquiry category from URL or default
  const getInitialCategory = (): EnquiryCategory => {
    const cat = searchParams.get('category');
    if (cat === 'ocean-cargo') return 'ocean-cargo';
    if (cat === 'air-cargo') return 'air-cargo';
    if (cat === 'container-stuffing') return 'container-stuffing';
    if (cat === 'special-project' || cat === 'flat-rack' || cat === 'breakbulk') return 'special-project';
    if (cat === 'cargo-lashing') return 'cargo-lashing';
    if (cat === 'open-yard-warehouse' || cat === 'open-warehouse') return 'open-yard-warehouse';
    if (cat === 'shaded-warehouse') return 'shaded-warehouse';
    return 'container-stuffing';
  };

  // Initial container from URL or default
  const getInitialContainer = (): string => {
    const containerParam = searchParams.get('container');
    if (containerParam) return containerParam;
    const cat = searchParams.get('category');
    if (cat === 'flat-rack') return '40ft Flat Rack Container';
    if (cat === 'breakbulk') return 'Breakbulk / Specialized Rigging';
    if (cat === 'open-top') return 'Open Top Container';
    return '40ft High Cube Container';
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [generatedRequestId, setGeneratedRequestId] = useState<string>('');

  const [formData, setFormData] = useState<QuoteFormData>({
    solutionType: initialSolution,
    enquiryCategory: getInitialCategory(),
    // Step 2
    cargoDescription: '',
    packageCount: '',
    approxWeight: '',
    weightUnit: 'tons',
    dimensions: '',
    packagingNeeds: '',
    specialHandlingNotes: '',
    // Step 3
    originCity: 'Navi Mumbai / Nhava Sheva',
    destinationPort: '',
    containerSize: getInitialContainer(),
    containerLocationOrPositioning: '',
    preferredDate: '',
    operationalAddress: '',
    // Step 4
    quoteName: '', // Client Brief Note 1: "Change req' Add Q name -"
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    designation: '',
    additionalInstructions: '',
    // Step 5
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
    if (cat) {
      if (cat === 'ocean-cargo') setFormData(p => ({ ...p, enquiryCategory: 'ocean-cargo' }));
      else if (cat === 'air-cargo') setFormData(p => ({ ...p, enquiryCategory: 'air-cargo' }));
      else if (cat === 'container-stuffing') setFormData(p => ({ ...p, enquiryCategory: 'container-stuffing' }));
      else if (cat === 'special-project' || cat === 'flat-rack' || cat === 'breakbulk') {
        setFormData(p => ({ 
          ...p, 
          enquiryCategory: 'special-project',
          containerSize: cat === 'flat-rack' ? '40ft Flat Rack Container' : 'Breakbulk / Specialized Rigging'
        }));
      }
      else if (cat === 'cargo-lashing') setFormData(p => ({ ...p, enquiryCategory: 'cargo-lashing' }));
      else if (cat === 'open-warehouse' || cat === 'open-yard-warehouse') {
        setFormData(p => ({ ...p, enquiryCategory: 'open-yard-warehouse' }));
      }
      else if (cat === 'shaded-warehouse') {
        setFormData(p => ({ ...p, enquiryCategory: 'shaded-warehouse' }));
      }
    }
    const containerParam = searchParams.get('container');
    if (containerParam) {
      setFormData(prev => ({ 
        ...prev, 
        containerSize: containerParam,
        enquiryCategory: 'special-project'
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
      if (!formData.enquiryCategory) {
        errs.enquiryCategory = 'Please select a core service.';
      }
    } else if (step === 2) {
      if (!formData.cargoDescription.trim()) errs.cargoDescription = 'Please describe the cargo or commodity.';
      if (!formData.approxWeight.trim()) errs.approxWeight = 'Approximate weight is required.';
    } else if (step === 3) {
      if (!formData.containerLocationOrPositioning.trim() && !formData.operationalAddress.trim()) {
        errs.operationalAddress = 'Origin facility or container positioning location is required.';
      }
    } else if (step === 4) {
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
    } else if (step === 5) {
      if (!formData.privacyConsent) {
        errs.privacyConsent = 'You must acknowledge the quote review terms to submit.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const reqId = `MSK-REQ-${Date.now().toString().slice(-6)}`;

    try {
      const endpoint = import.meta.env.VITE_ENQUIRY_API_URL || '/api/quote';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: reqId,
          submittedAt: new Date().toISOString(),
          source: 'MSK Logistics Industrial Quote Portal',
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setGeneratedRequestId(result.referenceId || reqId);
        setIsSubmitted(true);
      } else {
        const message =
          result?.message ||
          (result?.error ? `${result.error}: ${result.message || 'Transmission failed.'}` : null) ||
          'Unable to transmit your quote request. Please email info@msklogisticsolution.com directly or contact our 24x7 desk at 8108672929.';
        setSubmitError(message);
      }
    } catch (err: unknown) {
      console.error('[Quote Submission Error]:', err);
      setSubmitError(
        'A network connection error occurred while submitting your quote request. Please verify your connection or email info@msklogisticsolution.com directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#000000] text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-8 sm:p-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#B62825]/20 border border-[#B62825] flex items-center justify-center mx-auto text-[#B62825]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-bold text-red-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
            <span>REFERENCE ID: {generatedRequestId}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Quote Request Received
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Thank you, <strong className="text-white">{formData.contactName}</strong>. Your enquiry for{' '}
            <strong className="text-red-400">
              {SERVICE_OPTIONS.find(s => s.id === formData.enquiryCategory)?.title || formData.enquiryCategory}
            </strong>{' '}
            has been routed to our Nhava Sheva commercial operations desk.
          </p>
        </div>

        <div className="max-w-md mx-auto p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-mono space-y-2 text-left">
          <div className="flex justify-between border-b border-white/10 pb-1.5">
            <span className="text-slate-400">Quote Name:</span>
            <span className="text-white font-bold">{formData.quoteName || 'N/A'}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-1.5">
            <span className="text-slate-400">Company:</span>
            <span className="text-white">{formData.companyName}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-1.5">
            <span className="text-slate-400">Cargo Weight:</span>
            <span className="text-white">{formData.approxWeight} {formData.weightUnit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Response Target:</span>
            <span className="text-emerald-400 font-bold">Within 2–4 Business Hours</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
          <a
            href="tel:8108672929"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B62825] hover:bg-[#9E2220] text-white font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>24×7 Urgent Desk: 8108672929</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
            }}
            className="text-slate-400 hover:text-white underline py-2"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#000000] text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      {/* Concept 07: 5-Step Connected Progress Stepper */}
      <div className="bg-[#0B0B0D] p-5 sm:p-7 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          {/* Connected Stepper Circles */}
          <div className="relative flex items-center justify-between">
            {/* Background connecting line */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-white/10 z-0" />
            
            {/* Active connecting line */}
            <div 
              className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-[#B62825] transition-all duration-300 z-0"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            />

            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Cargo Details' },
              { num: 3, label: 'Route' },
              { num: 4, label: 'Your Information' },
              { num: 5, label: 'Review' },
            ].map((s) => {
              const isActive = currentStep === s.num;
              const isPast = currentStep > s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all duration-200 border-2 ${
                      isActive
                        ? 'bg-[#B62825] text-white border-[#B62825] ring-4 ring-[#B62825]/30 scale-110 shadow-lg'
                        : isPast
                        ? 'bg-[#B62825] text-white border-[#B62825]'
                        : 'bg-[#18181B] text-[#AEB6C2] border-white/20'
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-mono font-medium mt-1.5 whitespace-nowrap hidden sm:block ${
                      isActive ? 'text-white font-bold' : isPast ? 'text-red-300' : 'text-[#64748B]'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-9 space-y-8">
        
        {/* ========================================================================= */}
        {/* STEP 1: Select Service & Arrangement (Concept 07)                         */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-7">
            {/* Left/Top Container Motif Card: Get a Quote */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#18181B] via-[#0F0F12] to-[#18181B] border border-white/15 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 relative z-10">
                <span className="text-[10px] font-mono text-[#B62825] uppercase tracking-widest font-bold">
                  STEP 01 • INQUIRY INITIALIZATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Get a <span className="text-[#B62825]">Quote</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#AEB6C2] font-body max-w-xl">
                  Tell us your requirement and our team will get back to you shortly.
                </p>
              </div>

              {/* Decorative mini container badge */}
              <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-[#B62825] text-white flex items-center justify-center font-bold text-xs">
                  MSK
                </div>
                <div className="text-left font-mono text-[9px] text-[#AEB6C2] leading-tight">
                  <div className="text-white font-bold">JNPT CORRIDOR</div>
                  <div>2-4h Response</div>
                </div>
              </div>
            </div>

            {/* Direct Q Name Input immediately visible on Step 1 */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/15 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono font-semibold text-slate-200 uppercase tracking-wide">
                  Quote Reference Name (Q Name) <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <span className="text-[10px] font-mono text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded border border-red-800/40">CLIENT REFERENCE TAG</span>
              </div>
              <input
                type="text"
                name="quoteName"
                value={formData.quoteName}
                onChange={handleChange}
                placeholder="e.g. Q-PROJECT-2026-FR, EXP-MUNDRA-01, MSK-ODC-TURBINE"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825] focus:ring-1 focus:ring-[#B62825]"
              />
              <p className="text-[11px] text-slate-400 font-mono">
                Assign a project identifier or quote name for instant reference by our operations desk.
              </p>
            </div>

            <div>
              <label className="block text-[15px] font-semibold text-white mb-2">
                Select Service <span className="text-[#B62825]">*</span>
              </label>

              {/* 6 Container Service Selection Cards Matching Concept 07 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { id: 'ocean-cargo' as EnquiryCategory, title: 'Ocean Cargo', icon: Ship },
                  { id: 'air-cargo' as EnquiryCategory, title: 'Air Cargo', icon: Plane },
                  { id: 'container-stuffing' as EnquiryCategory, title: 'Stuffing Ops', icon: Box },
                  { id: 'special-project' as EnquiryCategory, title: 'Project Cargo', icon: Maximize2 },
                  { id: 'cargo-lashing' as EnquiryCategory, title: 'Cargo Lashing', icon: Anchor },
                  { id: 'hazardous-cargo' as EnquiryCategory, title: 'Hazardous Cargo', icon: ShieldAlert },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = formData.enquiryCategory === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, enquiryCategory: item.id }))}
                      className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center space-y-2.5 transition-all duration-200 cursor-pointer select-none group ${
                        isSelected
                          ? 'border-[#B62825] bg-[#B62825]/15 shadow-[0_0_20px_rgba(182,40,37,0.4)] ring-2 ring-[#B62825]'
                          : 'border-white/10 bg-[#121215] hover:border-white/30 hover:bg-[#18181D]'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#B62825] text-white shadow-md'
                            : 'bg-white/5 text-[#AEB6C2] group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-heading font-bold transition-colors ${
                        isSelected ? 'text-white' : 'text-[#AEB6C2] group-hover:text-white'
                      }`}>
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {errors.enquiryCategory && (
              <p className="text-red-400 text-xs font-mono">{errors.enquiryCategory}</p>
            )}

            {/* Service Arrangement Option Cards */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <label className="block text-[14px] font-semibold text-white">
                Operational Arrangement <span className="text-[#B62825]">*</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setFormData(p => ({ ...p, solutionType: 'client_container_and_cargo' }))}
                  className={`cursor-pointer rounded-xl p-4.5 border transition-all ${
                    formData.solutionType === 'client_container_and_cargo' || formData.solutionType === 'complete'
                      ? 'border-[#B62825] bg-[#B62825]/10 shadow-md ring-1 ring-[#B62825]'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-red-400 uppercase">
                      Option 01: Client Container &amp; Cargo
                    </span>
                    <input
                      type="radio"
                      name="solutionType"
                      checked={formData.solutionType === 'client_container_and_cargo' || formData.solutionType === 'complete'}
                      onChange={() => setFormData(p => ({ ...p, solutionType: 'client_container_and_cargo' }))}
                      className="accent-[#B62825]"
                    />
                  </div>
                  <h5 className="text-sm font-bold text-white mb-1">
                    You Provide Cargo &amp; Container
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    MSK Logistics executes export packaging, container stuffing sequences, and certified marine lashing at terminal or factory.
                  </p>
                </div>

                <div
                  onClick={() => setFormData(p => ({ ...p, solutionType: 'client_cargo_container_arranged_by_client' }))}
                  className={`cursor-pointer rounded-xl p-4.5 border transition-all ${
                    formData.solutionType === 'client_cargo_container_arranged_by_client' || formData.solutionType === 'client-arranged'
                      ? 'border-[#B62825] bg-[#B62825]/10 shadow-md ring-1 ring-[#B62825]'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-red-400 uppercase">
                      Option 02: Cargo Only / Terminal Coordination
                    </span>
                    <input
                      type="radio"
                      name="solutionType"
                      checked={formData.solutionType === 'client_cargo_container_arranged_by_client' || formData.solutionType === 'client-arranged'}
                      onChange={() => setFormData(p => ({ ...p, solutionType: 'client_cargo_container_arranged_by_client' }))}
                      className="accent-[#B62825]"
                    />
                  </div>
                  <h5 className="text-sm font-bold text-white mb-1">
                    Cargo at Staging Yard / Forwarder Equipment
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    You provide the cargo; container placement is coordinated via your shipping line or freight forwarder booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: Cargo Details & Packaging Needs                                   */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Cargo Description &amp; Technical Specs</h3>
              <p className="text-xs text-slate-400 mt-1">
                Provide accurate weight and dimensions so our team can evaluate floor load distribution and lashing geometry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Cargo Description / Commodity Name <span className="text-[#B62825]">*</span>
                </label>
                <input
                  type="text"
                  name="cargoDescription"
                  value={formData.cargoDescription}
                  onChange={handleChange}
                  placeholder="e.g. Heavy CNC Milling Center, Sandvik Mining Assemblies, Electrical Transformer"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825] focus:ring-1 focus:ring-[#B62825]"
                />
                {errors.cargoDescription && <p className="text-red-400 text-xs font-mono">{errors.cargoDescription}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Package Count / Number of Units
                </label>
                <input
                  type="text"
                  name="packageCount"
                  value={formData.packageCount}
                  onChange={handleChange}
                  placeholder="e.g. 4 Crates, 12 Pallets, 1 Heavy Skid"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Approximate Weight <span className="text-[#B62825]">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="approxWeight"
                    value={formData.approxWeight}
                    onChange={handleChange}
                    placeholder="e.g. 24.5"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                  />
                  <select
                    name="weightUnit"
                    value={formData.weightUnit}
                    onChange={handleChange}
                    className="px-3 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-sm text-white focus:outline-none focus:border-[#B62825]"
                  >
                    <option value="tons">Tons (MT)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lbs">Pounds (lbs)</option>
                  </select>
                </div>
                {errors.approxWeight && <p className="text-red-400 text-xs font-mono">{errors.approxWeight}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Cargo Dimensions (L × W × H)
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="e.g. 11.8m × 2.4m × 2.9m (or in mm / inches)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Packaging Requirements
                </label>
                <input
                  type="text"
                  name="packagingNeeds"
                  value={formData.packagingNeeds}
                  onChange={handleChange}
                  placeholder="e.g. Wooden Dunnage, VCI barrier foil, Palletisation, Plywood GSA"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Special Handling / ODC Notes
                </label>
                <textarea
                  name="specialHandlingNotes"
                  rows={2}
                  value={formData.specialHandlingNotes}
                  onChange={handleChange}
                  placeholder="Specify eccentric center of gravity, delicate painted surfaces, crane sling points, or moisture sensitivity."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: Origin, Destination & Positioning                                 */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Route, Port &amp; Container Positioning</h3>
              <p className="text-xs text-slate-400 mt-1">
                Define the loading gateway, terminal facility, and container equipment specifications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Origin City / CFS Facility
                </label>
                <input
                  type="text"
                  name="originCity"
                  value={formData.originCity}
                  onChange={handleChange}
                  placeholder="e.g. Nhava Sheva (JNPT) / Conex CFS / Polaris / Panipat"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Destination Port / Country
                </label>
                <input
                  type="text"
                  name="destinationPort"
                  value={formData.destinationPort}
                  onChange={handleChange}
                  placeholder="e.g. Jebel Ali (UAE), Rotterdam (NL), Houston (USA)"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Target Container Equipment Type
                </label>
                <select
                  name="containerSize"
                  value={formData.containerSize}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/15 text-sm text-white focus:outline-none focus:border-[#B62825]"
                >
                  <option value="20ft Standard Dry Container">20ft Standard Dry Container (22G1)</option>
                  <option value="40ft Standard Dry Container">40ft Standard Dry Container (42G1)</option>
                  <option value="40ft High Cube Container">40ft High Cube Container (45G1)</option>
                  <option value="20ft Flat Rack Container">20ft Flat Rack Container (25P3)</option>
                  <option value="40ft Flat Rack Container">40ft Flat Rack Container (45P3)</option>
                  <option value="Open Top Container">Open Top Container (Tarpaulin/Bow)</option>
                  <option value="Breakbulk / Specialized Rigging">Breakbulk / Non-Containerized Project Cargo</option>
                  <option value="Open Yard Buffer Holding">Open Yard Buffer Holding (Conex CFS)</option>
                  <option value="Shaded Warehouse Staging">Shaded Warehouse Staging (Aryan Shed)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Preferred Execution Date
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#B62825]"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Operational Address / Container Positioning Location <span className="text-[#B62825]">*</span>
                </label>
                <input
                  type="text"
                  name="operationalAddress"
                  value={formData.operationalAddress}
                  onChange={handleChange}
                  placeholder="e.g. Conex CFS Yard, Dronagiri / Client Works, Taloja MIDC / Nhava Sheva Terminal"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
                {errors.operationalAddress && (
                  <p className="text-red-400 text-xs font-mono">{errors.operationalAddress}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: Contact Details & Quote Reference                                 */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Commercial Contact &amp; Quote Reference</h3>
              <p className="text-xs text-slate-400 mt-1">
                Assign a shipment quote reference code and provide your direct contact channels for fast quotation turnaround.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Note 1 line 1: "Change req' Add Q name -" */}
              <div className="md:col-span-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                    Quote Reference Name (Q Name)
                  </label>
                  <span className="text-[10px] font-mono text-red-400">CLIENT REFERENCE TAG</span>
                </div>
                <input
                  type="text"
                  name="quoteName"
                  value={formData.quoteName}
                  onChange={handleChange}
                  placeholder="e.g. Q-PROJECT-2026-FR, EXP-MUNDRA-01, MSK-ODC-TURBINE"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Company Name <span className="text-[#B62825]">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Greenwich Meridian, Sandvik, BHEL, Larsen &amp; Toubro"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
                {errors.companyName && <p className="text-red-400 text-xs font-mono">{errors.companyName}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Contact Person <span className="text-[#B62825]">*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="Full name of logistics manager or coordinator"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
                {errors.contactName && <p className="text-red-400 text-xs font-mono">{errors.contactName}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Business Email <span className="text-[#B62825]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
                {errors.email && <p className="text-red-400 text-xs font-mono">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Phone / Mobile Number <span className="text-[#B62825]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
                {errors.phone && <p className="text-red-400 text-xs font-mono">{errors.phone}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Designation / Role
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. Export Head, Logistics Specialist, Project Manager"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-semibold text-slate-300 uppercase">
                  Additional Instructions
                </label>
                <input
                  type="text"
                  name="additionalInstructions"
                  value={formData.additionalInstructions}
                  onChange={handleChange}
                  placeholder="Gate pass lead time, crane tonnage needed, port surveyor presence"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B62825]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: Review & Confirm Submission                                       */}
        {/* ========================================================================= */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Review Quote Specifications</h3>
              <p className="text-xs text-slate-400 mt-1">
                Please verify your cargo and operational details before dispatching to our engineering desk.
              </p>
            </div>

            {/* Industrial Review Card */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-4 font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B62825]" />
                  <span className="text-white font-bold tracking-wider">
                    {SERVICE_OPTIONS.find(s => s.id === formData.enquiryCategory)?.title.toUpperCase() || 'LOGISTICS SERVICE'}
                  </span>
                </div>
                {formData.quoteName && (
                  <span className="px-2 py-0.5 rounded bg-[#B62825]/20 text-red-300 border border-[#B62825]/40 font-bold">
                    Q NAME: {formData.quoteName}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Company:</span>
                  <span className="text-white font-semibold">{formData.companyName || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Contact Person:</span>
                  <span className="text-white">{formData.contactName} ({formData.phone})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Business Email:</span>
                  <span className="text-white">{formData.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Cargo Commodity:</span>
                  <span className="text-white">{formData.cargoDescription}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Weight &amp; Units:</span>
                  <span className="text-emerald-400 font-bold">{formData.approxWeight} {formData.weightUnit}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Target Equipment:</span>
                  <span className="text-white">{formData.containerSize}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block text-[10px] uppercase">Operating / Staging Location:</span>
                  <span className="text-white">{formData.operationalAddress || formData.originCity}</span>
                </div>
                {formData.packagingNeeds && (
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Packaging Scope:</span>
                    <span className="text-white">{formData.packagingNeeds}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Direct 24×7 Operations Hotline:</span>
                <a href="tel:8108672929" className="text-red-400 font-bold hover:underline">
                  +91 8108672929
                </a>
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
                  className="w-4 h-4 text-[#B62825] accent-[#B62825] rounded mt-0.5"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I confirm that the shipment specifications provided are accurate for operational assessment. I understand this enquiry will be reviewed by MSK Logistics commercial desk to generate a formal quote.
                </span>
              </label>
              {errors.privacyConsent && (
                <p className="text-red-400 text-xs font-mono pl-7">{errors.privacyConsent}</p>
              )}
            </div>

            {submitError && (
              <div className="p-4 bg-red-950/80 rounded-xl border border-red-700 text-red-200 text-xs space-y-3">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-red-300 font-mono tracking-wide">
                      SUBMISSION NOTICE
                    </p>
                    <p className="leading-relaxed text-slate-200">{submitError}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-red-800/60 flex flex-wrap gap-2 text-xs font-mono">
                  <a
                    href={`mailto:info@msklogisticsolution.com?subject=Quote%20Request%20-%20${encodeURIComponent(formData.quoteName || formData.companyName || 'Industrial Consignment')}&body=Company:%20${encodeURIComponent(formData.companyName)}%0D%0AContact:%20${encodeURIComponent(formData.contactName)}%20(${encodeURIComponent(formData.phone)})%0D%0AService:%20${encodeURIComponent(formData.enquiryCategory)}%0D%0ACargo:%20${encodeURIComponent(formData.cargoDescription)}%0D%0AWeight:%20${encodeURIComponent(formData.approxWeight)}%20${encodeURIComponent(formData.weightUnit)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B62825] hover:bg-[#9E2220] text-white font-bold transition-colors"
                  >
                    <span>Email Direct: info@msklogisticsolution.com</span>
                  </a>
                  <a
                    href="tel:8108672929"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors border border-white/20"
                  >
                    <span>Call Desk: +91 81086 72929</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* Navigation Buttons                                                        */}
        {/* ========================================================================= */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-white/20 hover:border-white/40 text-slate-300 hover:text-white text-xs font-semibold font-mono transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#B62825] hover:bg-[#9E2220] text-white text-xs font-semibold font-mono tracking-wider transition-colors shadow-lg flex items-center gap-1.5"
            >
              <span>CONTINUE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-[#B62825] hover:bg-[#9E2220] text-white text-sm font-bold font-mono tracking-wider transition-all shadow-xl flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>TRANSMITTING SPECIFICATION...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>SUBMIT QUOTE REQUEST</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
