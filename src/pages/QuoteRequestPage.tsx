import React from 'react';
import { Phone, Mail, Info } from 'lucide-react';
import { QuoteRequestForm } from '../components/forms/QuoteRequestForm';
import { COMPANY_DETAILS } from '../data/company';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';

export const QuoteRequestPage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <InnerPageBanner
        badge="QUOTATION DESK"
        title="Request an Export Packing Quotation"
        description="Submit your cargo parameters and preferred container arrangement for an itemized quotation from our Navi Mumbai operations desk."
      />

      {/* Main Form Section */}
      <section className="py-16 sm:py-20 bg-[#F5F5F3] border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* The 7-step Form (8 cols) */}
            <div className="lg:col-span-8">
              <QuoteRequestForm />
            </div>

            {/* Sidebar Guidance & Direct Contacts (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Operational Arrangement Summary */}
              <div className="bg-white p-6 rounded-xl border border-[#E2E2E2] shadow-sm space-y-4 text-[13px]">
                <div className="flex items-center gap-2 font-bold text-[#343434] text-[15px] font-heading border-b border-[#E2E2E2] pb-2">
                  <Info className="w-4 h-4 text-[#B62825]" />
                  <span>Arrangement Overview</span>
                </div>

                <div className="space-y-3 text-[#666666]">
                  <div>
                    <strong className="text-[#173F70] block">Option 01: Client Container & Cargo</strong>
                    <span>You provide cargo and container. MSK performs agreed export packaging, container stuffing, and cargo lashing work.</span>
                  </div>
                  <div className="border-t border-[#E2E2E2] pt-2">
                    <strong className="text-[#B62825] block">Option 02: Container to Be Arranged</strong>
                    <span>You provide cargo and source container independently. MSK performs agreed packaging, stuffing, and lashing work.</span>
                  </div>
                  <div className="border-t border-[#E2E2E2] pt-2 text-[11px] text-amber-800 bg-amber-50 p-2 rounded">
                    <strong>Note:</strong> MSK does not supply or arrange containers under either option.
                  </div>
                </div>
              </div>

              {/* Direct Communication Alternative */}
              <div className="bg-white p-6 rounded-xl border border-[#E2E2E2] shadow-sm space-y-4">
                <h3 className="font-bold text-[#343434] text-[15px] font-heading">
                  Prefer Direct Communication?
                </h3>
                <p className="text-[13px] text-[#666666] leading-relaxed">
                  If you have complex cargo drawings, urgent shipping cut-offs, or multiple container lots, connect directly with our desk:
                </p>

                <div className="space-y-3 text-[13px] text-[#343434]">
                  <a 
                    href={COMPANY_DETAILS.phoneHref}
                    className="flex items-center gap-2.5 p-3 rounded bg-[#F5F5F3] hover:bg-neutral-200 transition-colors font-medium"
                  >
                    <Phone className="w-4 h-4 text-[#B62825]" />
                    <span>{COMPANY_DETAILS.phone}</span>
                  </a>

                  <a 
                    href={COMPANY_DETAILS.emailHref}
                    className="flex items-center gap-2.5 p-3 rounded bg-[#F5F5F3] hover:bg-neutral-200 transition-colors font-medium break-all"
                  >
                    <Mail className="w-4 h-4 text-[#B62825]" />
                    <span>{COMPANY_DETAILS.email}</span>
                  </a>
                </div>

                <div className="pt-2 text-[11px] font-mono-code text-neutral-400">
                  DESK: JNPT SECTOR 3, NAVI MUMBAI
                </div>
              </div>

              {/* Integrity Notice */}
              <div className="p-4 rounded-lg bg-neutral-100 border border-neutral-300 text-[12px] text-neutral-600">
                Quotes are evaluated individually based on verified cargo weights, packaging materials, and container positioning logistics. No automated algorithms or hidden fees.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
