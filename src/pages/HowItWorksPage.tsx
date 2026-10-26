import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { MagneticButton } from '../components/common/MagneticButton';

export const HowItWorksPage: React.FC = () => {
  const stepDetails = [
    {
      step: '01',
      title: 'Choose the Service Arrangement',
      summary: 'Select between Option 01 (Client-Arranged Container & Cargo) or Option 02 (Client Cargo, Container Arranged by Client).',
      detail: 'Identify your container arrangement. Under both options, MSK Logistics performs the agreed export packaging, container stuffing, and heavy cargo lashing work.',
      deliverable: 'Selected arrangement recorded on your enquiry'
    },
    {
      step: '02',
      title: 'Share Cargo & Shipment Details',
      summary: 'Submit cargo dimensions, weights, packaging preferences, and facility location.',
      detail: 'Provide equipment weights, number of packages, crating preferences, and any fragile points. Exact dimensions are helpful but approximate figures can be used for initial scoping.',
      deliverable: 'Preliminary cargo technical profile'
    },
    {
      step: '03',
      title: 'Requirement Review & Technical Planning',
      summary: 'MSK operational team reviews cargo characteristics and container compatibility.',
      detail: 'We assess weight distribution across container floor runners, identify necessary timber chocking or ratchet strap ratings, and note any crane or specialized forklift requirements.',
      deliverable: 'Operational plan and scope outline'
    },
    {
      step: '04',
      title: 'Quotation & Scope Confirmation',
      summary: 'Receive a transparent formal quotation detailing all agreed deliverables.',
      detail: 'The quote itemizes packaging materials, stuffing labor, lashing hardware, operational schedule, and clear exclusions.',
      deliverable: 'Written quotation and formal work scope'
    },
    {
      step: '05',
      title: 'Confirm Arrangement & Operational Schedule',
      summary: 'Align on container positioning dates, site access, and operational staging.',
      detail: 'Both parties confirm the container delivery window, gate entry formalities, loading timeline, and safety clearances at the designated packing facility.',
      deliverable: 'Agreed work schedule and site clearance'
    },
    {
      step: '06',
      title: 'Execute Packaging, Stuffing & Lashing',
      summary: 'MSK industrial specialists carry out the physical packing, stuffing, and securing work.',
      detail: 'Our on-site crew performs tailored timber crating or barrier wrapping, loads cargo sequentially for balance, and installs heavy-duty ratchet straps, blocking, and shoring.',
      deliverable: 'Secured export cargo ready for transit'
    },
    {
      step: '07',
      title: 'Completion Verification & Handover',
      summary: 'Pre-door closure inspection, documentation handover, and seal coordination.',
      detail: 'Final tension checks are completed on all lashing assemblies. Cargo securing photographs and agreed handover documentation are provided before container doors are closed and sealed.',
      deliverable: 'Photographic records & completion sign-off'
    }
  ];

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="bg-[#173F70] text-white py-14 sm:py-16 border-b border-[#0F2D52] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#173F70] via-[#1A457D] to-[#173F70] opacity-95 pointer-events-none" 
          aria-hidden="true" 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3.5 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="editorial-badge bg-white/10 text-white border-white/20">
              STRUCTURED WORKFLOW
            </span>
            <span className="text-xs font-mono text-blue-200">
              NHAVA SHEVA (JNPT) • MARITIME S.O.P.
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight">
            How It Works: Our 7-Step Export Process
          </h1>
          <p className="text-blue-100 text-[15px] sm:text-base max-w-3xl font-body leading-relaxed">
            From initial shipment review to final container lashing handover, explore our structured, quote-based workflow.
          </p>
        </div>
      </section>

      {/* Stepped Timeline */}
      <section className="py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#343434] font-heading">
              Operational Sequence from Enquiry to Handover
            </h2>
            <p className="text-[15px] text-[#666666] leading-relaxed">
              Every export cargo assignment follows this verified seven-stage workflow. Note that work commences only upon formal written agreement and schedule confirmation.
            </p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-[#B62825] before:via-[#B62825]/60 before:to-[#173F70]/20 before:hidden sm:before:block">
            {stepDetails.map((s, idx) => (
              <div 
                key={s.step}
                className="group relative bg-[#F5F5F3] hover:bg-white rounded-xl border border-[#E2E2E2] hover:border-[#173F70]/40 p-6 sm:p-8 sm:ml-12 space-y-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 motion-reduce:transform-none motion-reduce:transition-none"
              >
                {/* Step Marker Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E2E2] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#B62825] group-hover:scale-110 text-white font-mono-code font-bold text-[13px] flex items-center justify-center shrink-0 transition-transform duration-300 motion-reduce:transform-none shadow-xs">
                      {s.step}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#343434] group-hover:text-[#173F70] transition-colors font-heading">
                      {s.title}
                    </h3>
                  </div>

                  <span className="text-[11px] font-mono-code text-neutral-500 uppercase">
                    STAGE 0{idx + 1}
                  </span>
                </div>

                <p className="text-[14px] font-medium text-[#343434]">
                  {s.summary}
                </p>

                <p className="text-[14px] text-[#666666] leading-relaxed">
                  {s.detail}
                </p>

                <div className="pt-3 border-t border-[#E2E2E2] flex items-center gap-2 text-[12px] font-mono-code text-[#B62825]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Deliverable: {s.deliverable}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Process Integrity Notice */}
          <div className="p-6 rounded-lg bg-neutral-100 border border-neutral-300 text-[13px] text-neutral-700 space-y-2">
            <div className="font-bold flex items-center gap-2 text-[#343434]">
              <AlertCircle className="w-4 h-4 text-[#B62825]" />
              <span>Operational Clarity Notice</span>
            </div>
            <p>
              This structured sequence is a managed operational workflow conducted by logistics specialists. MSK Logistics does not offer automatic self-booking or automated real-time GPS tracking tools. All execution steps are coordinated directly by our operations desk in Navi Mumbai.
            </p>
          </div>

          <div className="pt-6 text-center">
            <MagneticButton maxPull={4}>
              <Link 
                to="/request-quote"
                className="btn-primary py-3.5 px-8 text-[15px] group/btn active:scale-[0.98] transition-all motion-reduce:transform-none"
              >
                <span>Begin Step 1: Submit Your Shipment Details</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover/btn:translate-x-1.5 motion-reduce:transform-none" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
};
