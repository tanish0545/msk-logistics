import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Camera, MapPin } from 'lucide-react';
import { BrandedImage } from '../components/gallery/BrandedImage';

export const OperationsPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-white">
      {/* 1. Page Header — Clean & Proportionate */}
      <section className="bg-[#173F70] text-white py-12 sm:py-14 border-b border-[#0F2D52] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#173F70] via-[#1A457D] to-[#173F70] opacity-95 pointer-events-none" 
          aria-hidden="true" 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3.5 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="editorial-badge bg-white/10 text-white border-white/20">
              FIELD OPERATIONS
            </span>
            <span className="text-xs font-mono text-blue-200">
              NHAVA SHEVA (JNPT) • PORT CORRIDORS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight">
            MSK Operational Capabilities
          </h1>
          <p className="text-blue-100 text-[15px] sm:text-base max-w-3xl font-body leading-relaxed">
            Direct on-site execution at Nhava Sheva (JNPT) and industrial client premises across the Mumbai metropolitan region. Precision export packaging, container stuffing, and heavy cargo securing.
          </p>
        </div>
      </section>

      {/* 2. Operational Overview Cards */}
      <section className="py-14 sm:py-18 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          {/* Operations Hub info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-7 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3.5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-xs font-mono text-[#B62825] font-bold">
                <MapPin className="w-4 h-4" />
                <span>OPERATIONAL BASE</span>
              </div>
              <h3 className="text-lg font-bold font-heading text-[#1E293B]">
                JNPT Township & Port Corridors
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Strategic location adjacent to Jawaharlal Nehru Port allows rapid positioning to container freight stations (CFS), terminal staging yards, and industrial client premises across Navi Mumbai.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3.5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-xs font-mono text-[#B62825] font-bold">
                <Wrench className="w-4 h-4" />
                <span>SECURING HARDWARE</span>
              </div>
              <h3 className="text-lg font-bold font-heading text-[#1E293B]">
                Heavy Industrial Securing Gear
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Heavy-duty polyester lashing straps, ratchet tensioners, steel wire ropes, turnbuckles, dunnage air bags, and ISPM-15 compliant hardwood chocking timber suited for sea transport.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3.5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-xs font-mono text-[#B62825] font-bold">
                <Camera className="w-4 h-4" />
                <span>QUALITY HANDOVER</span>
              </div>
              <h3 className="text-lg font-bold font-heading text-[#1E293B]">
                Systematic Inspection & Handover
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                Systematic verification across every operational milestone: empty container inspection, packaging integrity, internal stuffing layout, lashing point tension, and final door sealing.
              </p>
            </div>
          </div>

          {/* Operational Workflow Steps */}
          <div className="space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="editorial-badge bg-[#F5F5F3] text-[#B62825] border-red-200">
                STANDARD OPERATING PROCEDURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#173F70] font-heading">
                Step-by-Step Field Execution Protocol
              </h2>
              <p className="text-[15px] text-[#64748B] leading-relaxed">
                Every container stuffing and lashing assignment is executed following our standardized 6-step protocol:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-xs">
                <span className="text-xs font-mono font-bold text-[#B62825]">STEP 01</span>
                <h4 className="font-bold text-base text-[#1E293B]">Container Structural Audit</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Rigorous inspection of empty container: checking floor integrity, lashing rings, door gaskets, watertightness, and absence of residual contamination.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-xs">
                <span className="text-xs font-mono font-bold text-[#B62825]">STEP 02</span>
                <h4 className="font-bold text-base text-[#1E293B]">Cargo Verification & Preparation</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Verification of cargo piece counts, center-of-gravity markers, fragile tags, and application of corrosion-inhibiting barrier foil and desiccants where required.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-xs">
                <span className="text-xs font-mono font-bold text-[#B62825]">STEP 03</span>
                <h4 className="font-bold text-base text-[#1E293B]">Balanced Sequencing & Stuffing</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Loading arranged to balance container axle weights across front, middle, and rear bogies, preventing vehicle instability during road haulage and ocean pitch.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-xs">
                <span className="text-xs font-mono font-bold text-[#B62825]">STEP 04</span>
                <h4 className="font-bold text-base text-[#1E293B]">Engineered Lashing & Chocking</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Direct cross-lashing, loop lashing, and floor timber chocking anchored to container corner posts and side rails to neutralize longitudinal and transverse forces.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-xs">
                <span className="text-xs font-mono font-bold text-[#B62825]">STEP 05</span>
                <h4 className="font-bold text-base text-[#1E293B]">Tension Audit & Verification</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Tension testing of all ratchet straps and wire ropes. High-resolution photographic record compiled for client file and cargo insurance archives.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#E2E8F0] bg-white space-y-3 shadow-xs">
                <span className="text-xs font-mono font-bold text-[#B62825]">STEP 06</span>
                <h4 className="font-bold text-base text-[#1E293B]">Door Sealing & Gate-In Handover</h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Container doors closed, high-security bottle seal affixed and cross-verified against shipping documentation for immediate terminal gate-in.
                </p>
              </div>
            </div>
          </div>

          {/* Operational Photography Grid */}
          <div className="space-y-6 pt-4 border-t border-[#E2E2E2]">
            <div className="space-y-2">
              <span className="editorial-badge bg-[#F5F5F3] text-[#173F70] border-neutral-300">
                FIELD DOCUMENTATION
              </span>
              <h3 className="text-2xl font-bold text-[#173F70] font-heading">
                Field Documentation & Quayside Operations
              </h3>
              <p className="text-sm text-[#64748B]">
                Photographs from operational assignments at JNPT terminals and packing sheds.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="rounded-xl overflow-hidden border border-[#E2E8F0] bg-white group shadow-xs">
                <BrandedImage
                  src="/images/operations/container-loading/rigging-crew-crane-loading.jpg"
                  alt="MSK Logistics rigging operations on container vessel"
                  aspectRatio="aspect-[16/11]"
                />
                <div className="p-3.5 bg-white">
                  <h5 className="font-bold text-xs text-[#1E293B] truncate">Quayside Crane Handling</h5>
                  <p className="text-[11px] text-[#64748B] font-mono truncate">Flat Rack Loading & Guidance</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#E2E8F0] bg-white group shadow-xs">
                <BrandedImage
                  src="/images/operations/warehouse/shaded-warehouse-main-bay.jpg"
                  alt="Shaded warehouse export packaging bays"
                  aspectRatio="aspect-[16/11]"
                />
                <div className="p-3.5 bg-white">
                  <h5 className="font-bold text-xs text-[#1E293B] truncate">Shaded Packing Shed</h5>
                  <p className="text-[11px] text-[#64748B] font-mono truncate">Covered Cargo Staging Bays</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#E2E8F0] bg-white group shadow-xs">
                <BrandedImage
                  src="/images/operations/cargo-lashing/trailer-chassis-ratchet-lashing.jpg"
                  alt="Heavy cargo ratchet lashing on trailer chassis"
                  aspectRatio="aspect-[16/11]"
                />
                <div className="p-3.5 bg-white">
                  <h5 className="font-bold text-xs text-[#1E293B] truncate">Chassis Ratchet Lashing</h5>
                  <p className="text-[11px] text-[#64748B] font-mono truncate">High-Tensile Webbing & Chocking</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#E2E8F0] bg-white group shadow-xs">
                <BrandedImage
                  src="/images/operations/office/msk-jnpt-office-signboard.jpg"
                  alt="Official MSK Logistic Solution JNPT Navi Mumbai office"
                  aspectRatio="aspect-[16/11]"
                />
                <div className="p-3.5 bg-white">
                  <h5 className="font-bold text-xs text-[#1E293B] truncate">Navi Mumbai Office</h5>
                  <p className="text-[11px] text-[#64748B] font-mono truncate">JNPT Township • Registered Desk</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-[#173F70] rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-heading">
                Book an Operations Team for On-Site Packing
              </h3>
              <p className="text-blue-100 text-sm max-w-xl">
                Our mobile rigging and packing crews deploy across Navi Mumbai, Taloja, Rabale, Mahape, and JNPT port areas.
              </p>
            </div>
            <Link
              to="/request-quote"
              className="bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-3.5 px-6 rounded-xl inline-flex items-center gap-2 shadow-lg transition-all flex-shrink-0"
            >
              <span>Schedule Operational Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
