import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { CORE_SERVICES } from '../data/company';
import { BrandedImage } from '../components/common/BrandedImage';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';

export const CargoLashingPage: React.FC = () => {
  const service = CORE_SERVICES.find(s => s.id === 'cargo-lashing')!;

  return (
    <div className="space-y-0">
      {/* Breadcrumb & Hero */}
      <InnerPageBanner
        breadcrumb={
          <>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#AEB6C2]" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#AEB6C2]" />
            <span className="text-[#B62825] font-semibold">{service.title}</span>
          </>
        }
        badge={service.tag}
        title={`${service.title} for Ocean Transit`}
        description={service.shortDescription}
      />

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4 text-[15px] sm:text-[16px] text-[#666666] leading-relaxed">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#343434] font-heading">
                  Service Overview & Cargo Restraint Engineering
                </h2>
                <p>
                  {service.fullDescription}
                </p>
                <p>
                  Ocean container vessels encounter forces in 6 degrees of freedom. Heavy industrial equipment, machinery, steel coils, and crated goods must be securely restrained against both lateral tipping and longitudinal shifting during heavy swell. MSK Logistics deploys certified composite polyester lashing belts, high-tensile ratchet assemblies, steel chains, and tailored wooden chocking bolted or nailed into container floor runners.
                </p>
              </div>

              {/* Key Activities */}
              <div className="space-y-4 bg-[#F5F5F3] p-7 rounded-xl border border-[#E2E2E2]">
                <h3 className="text-xl font-bold text-[#343434] font-heading">
                  Key Operational Activities
                </h3>
                <div className="space-y-3">
                  {service.keyActivities.map((act, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-[14px] text-[#343434]">
                      <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Responsibilities */}
              <div className="space-y-4 p-7 rounded-xl border border-[#E2E2E2] bg-white">
                <h3 className="text-xl font-bold text-[#343434] font-heading">
                  Applicable Customer Responsibilities
                </h3>
                <div className="space-y-3">
                  {service.customerResponsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-[14px] text-[#666666]">
                      <div className="w-5 h-5 rounded-full bg-neutral-200 text-[#343434] flex items-center justify-center font-mono-code text-[11px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              {/* Media Card */}
              <div className="rounded-xl overflow-hidden border border-[#E2E2E2] shadow-sm bg-white group">
                <BrandedImage 
                  src={service.image} 
                  alt={service.title}
                  aspectRatio="aspect-[16/10]"
                  imageClassName="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#343434] text-white text-[12px] font-mono-code flex items-center justify-between">
                  <span>HEAVY-DUTY LASHING DESK</span>
                  <span>JNPT SECTOR 3</span>
                </div>
              </div>

              {/* Securing Equipment */}
              <div className="bg-[#F5F5F3] p-7 rounded-xl border border-[#E2E2E2] space-y-4">
                <h3 className="text-lg font-bold text-[#343434] font-heading">
                  Securing Hardware & Materials
                </h3>
                <p className="text-[13px] text-[#666666] leading-relaxed">
                  Lashing gear includes 25mm to 50mm polyester webbing straps, high-capacity ratchet tensioners, corner protectors, hardwood wedge chocks, dunnage air bags, and anti-slip friction rubber mats.
                </p>
                <div className="pt-2">
                  <Link 
                    to="/request-quote"
                    className="btn-primary w-full text-center py-3 text-[14px]"
                  >
                    <span>Request Lashing Quotation</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Verification & Handover Notice */}
              <div className="p-4 rounded-lg bg-neutral-100 border border-neutral-300 text-[12px] text-neutral-600 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <p>
                  Pre-sealing verification: Customers or their nominated survey representatives are welcome to inspect completed lashing and chocking prior to container door closure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
