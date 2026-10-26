import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SolutionCards } from '../components/export-solutions/SolutionCards';
import { ComparisonTable } from '../components/export-solutions/ComparisonTable';

export const ExportPackingSolutionsPage: React.FC = () => {
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
              SERVICE ARRANGEMENTS
            </span>
            <span className="text-xs font-mono text-blue-200">
              NHAVA SHEVA (JNPT) • OPERATIONAL MODELS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight">
            Two Transparent Export Packing Arrangements
          </h1>
          <p className="text-blue-100 text-[15px] sm:text-base max-w-3xl font-body leading-relaxed">
            Choose the operational model that matches your export shipment. Both arrangements feature our dedicated packaging, stuffing, and cargo lashing execution.
          </p>
        </div>
      </section>

      {/* Overview & Solution Cards */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#343434] font-heading">
              Select Your Operational Arrangement
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#666666] leading-relaxed">
              These are not two unrelated logistics products; they represent two distinct operational methods to coordinate export packaging, stuffing, and lashing work. Select the option that aligns with your carrier contracts and facility logistics.
            </p>
          </div>

          <SolutionCards />
        </div>
      </section>

      {/* Detailed Comparison Matrix */}
      <section className="py-16 sm:py-20 bg-[#F5F5F3] border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="max-w-2xl space-y-3">
            <span className="editorial-badge bg-white text-[#B62825] border-red-200">
              RESPONSIBILITY MATRIX
            </span>
            <h2 className="text-3xl font-bold text-[#343434] font-heading">
              Detailed Scope & Responsibility Comparison
            </h2>
            <p className="text-[15px] text-[#666666]">
              A side-by-side breakdown clarifying who provides each element and how pricing is structured.
            </p>
          </div>

          <ComparisonTable />
        </div>
      </section>

      {/* Practical Guidance Callout */}
      <section className="py-16 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-7 rounded-xl bg-red-50/40 border border-red-200 space-y-3">
              <span className="editorial-badge bg-white text-[#B62825] border-red-200">
                WHEN TO CHOOSE OPTION A
              </span>
              <h3 className="text-xl font-bold text-[#343434] font-heading">
                Complete Export Packing Solution
              </h3>
              <p className="text-[14px] text-[#666666] leading-relaxed">
                Choose this arrangement when you want MSK Logistics to coordinate both container positioning and all on-site packaging and securing. Ideal for manufacturers without direct shipping line container allocations who need a coordinated packing schedule.
              </p>
              <div className="pt-2">
                <Link to="/request-quote?solution=complete" className="text-[13px] font-semibold text-[#B62825] hover:underline inline-flex items-center gap-1">
                  <span>Start Quote for Option A</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="p-7 rounded-xl bg-[#F5F5F3] border border-[#E2E2E2] space-y-3">
              <span className="editorial-badge bg-white text-[#343434] border-neutral-300">
                WHEN TO CHOOSE OPTION B
              </span>
              <h3 className="text-xl font-bold text-[#343434] font-heading">
                Client-Arranged Container
              </h3>
              <p className="text-[14px] text-[#666666] leading-relaxed">
                Choose this arrangement if your freight forwarder or shipping line already provides carrier-owned containers (COC) or shipper-owned containers (SOC). Our crew performs only the agreed packaging, stuffing, and lashing work on your supplied box.
              </p>
              <div className="pt-2">
                <Link to="/request-quote?solution=client-arranged" className="text-[13px] font-semibold text-[#343434] hover:underline inline-flex items-center gap-1">
                  <span>Start Quote for Option B</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
