import React from 'react';
import { Link } from 'react-router-dom';
import { Warehouse, ArrowRight, AlertCircle, Clock, MapPin, Truck } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/company';

export const WarehousingPage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="bg-[#343434] text-white py-16 sm:py-20 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <span className="editorial-badge bg-white/10 text-white border-white/20">
            CARGO STAGING & YARD CAPABILITIES
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white">
            Cargo Staging & Stuffing Facilities
          </h1>
          <p className="text-neutral-300 text-[16px] sm:text-[18px] max-w-3xl font-body leading-relaxed">
            Operational staging grounds and stuffing buffer yards positioned in the Nhava Sheva (JNPT) corridor to facilitate organized export packing and seamless container handover.
          </p>
        </div>
      </section>

      {/* Scope Disclaimer / Transparent Boundary Notice */}
      <section className="bg-[#FFF8F0] border-b border-[#FEE2C7] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-[#D97706] flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm text-[#92400E]">
              <span className="font-bold text-[#78350F] uppercase tracking-wide text-xs">
                Facility Scope Clarification
              </span>
              <p className="leading-relaxed">
                Our facilities are configured specifically as <strong>export cargo staging, packaging preparation, and stuffing transit yards</strong>. MSK Logistics does not offer general retail third-party logistics (3PL), e-commerce fulfillment, or cold-storage warehousing. Yard usage is provided in direct conjunction with contracted packaging, stuffing, and lashing operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Yard Features */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="editorial-badge bg-[#F5F5F3] text-[#B62825] border-red-200">
              STAGING GROUND INFRASTRUCTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#343434] font-heading">
              Engineered for Industrial Cargo Transit
            </h2>
            <p className="text-[15px] text-[#666666] leading-relaxed">
              When cargo arrives ahead of container positioning or vessel gate-in windows, our staging area ensures equipment is protected, inventoried, and readied for sequential stuffing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-[#F5F5F3] border border-[#E2E2E2] space-y-4">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-[#B62825]">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#343434] font-heading">
                Heavy Trailer & Crane Access
              </h3>
              <p className="text-sm text-[#666666] leading-relaxed">
                Wide ingress lanes configured for heavy low-bed trailers, multi-axle trucks, and mobile hydraulic cranes for offloading unboxed industrial machinery.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F5F5F3] border border-[#E2E2E2] space-y-4">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-[#B62825]">
                <Warehouse className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#343434] font-heading">
                Covered Packing Prep Sheds
              </h3>
              <p className="text-sm text-[#666666] leading-relaxed">
                Weather-protected bays for carpentry, wooden crate fabrication, barrier foil sealing, and palletization shielded from direct precipitation and environmental dust.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F5F5F3] border border-[#E2E2E2] space-y-4">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-[#B62825]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#343434] font-heading">
                Gate-In Buffer Synchronization
              </h3>
              <p className="text-sm text-[#666666] leading-relaxed">
                Short-term buffer staging to align stuffed containers with terminal gate opening schedules, preventing demurrage and early gate-in penalties at JNPT.
              </p>
            </div>
          </div>

          {/* Location & Contact CTA */}
          <div className="p-8 sm:p-10 rounded-xl bg-[#F8F9FA] border border-[#E2E2E2] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#52627A]">
                <MapPin className="w-4 h-4 text-[#B62825]" />
                <span>{COMPANY_DETAILS.location}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#343434]">
                Coordinate Staging for Your Outbound Project Cargo
              </h3>
              <p className="text-sm text-[#666666]">
                Contact our JNPT operations desk to confirm staging availability and container positioning schedules.
              </p>
            </div>
            <Link
              to="/contact"
              className="btn-primary text-sm py-3 px-6 whitespace-nowrap"
            >
              <span>Contact Operations Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
