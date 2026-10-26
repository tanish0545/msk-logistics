import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { CORE_SERVICES } from '../data/company';

import { BrandedImage } from '../components/common/BrandedImage';

export const ExportPackagingPage: React.FC = () => {
  const service = CORE_SERVICES.find(s => s.id === 'export-packaging')!;

  return (
    <div className="space-y-0">
      {/* Breadcrumb & Hero */}
      <section className="bg-[#343434] text-white py-16 sm:py-20 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="flex items-center gap-2 text-[12px] font-mono-code text-neutral-400">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#B62825]">{service.title}</span>
          </div>

          <span className="editorial-badge bg-white/10 text-white border-white/20">
            {service.tag}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white">
            {service.title} for Maritime Shipments
          </h1>

          <p className="text-neutral-300 text-[16px] sm:text-[18px] max-w-3xl font-body leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4 text-[15px] sm:text-[16px] text-[#666666] leading-relaxed">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#343434] font-heading">
                  Service Overview & Engineering Approach
                </h2>
                <p>
                  {service.fullDescription}
                </p>
                <p>
                  Export packaging serves as the foundational barrier between your manufactured goods and the demanding conditions of ocean transit. From moisture barrier films to heavy timber skidding and custom-built wooden crates, our team plans packaging specifications around your cargo's weight, balance points, and vulnerabilities.
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
                  <span>PACKAGING STAGING FACILITY</span>
                  <span>NAVI MUMBAI</span>
                </div>
              </div>

              {/* Scope & Role in Export Chain */}
              <div className="bg-[#F5F5F3] p-7 rounded-xl border border-[#E2E2E2] space-y-4">
                <h3 className="text-lg font-bold text-[#343434] font-heading">
                  How This Fits Into Your Export Packing
                </h3>
                <p className="text-[13px] text-[#666666] leading-relaxed">
                  Properly packaged cargo allows seamless stuffing without point-loading damage to container floorboards and gives cargo lashing straps rigid anchor surfaces to pull against.
                </p>
                <div className="pt-2">
                  <Link 
                    to="/request-quote"
                    className="btn-primary w-full text-center py-3 text-[14px]"
                  >
                    <span>Request Packaging Quotation</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Compliance Notice */}
              <div className="p-4 rounded-lg bg-neutral-100 border border-neutral-300 text-[12px] text-neutral-600 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <p>
                  Note: Specific international regulatory treatments (such as phytosanitary heat treatment or hazardous goods certification) must be confirmed and agreed upon during quotation review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
