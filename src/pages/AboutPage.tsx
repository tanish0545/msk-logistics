import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Anchor, 
  Phone, 
  MapPin, 
  Users
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/company';
import { BrandedImage } from '../components/common/BrandedImage';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 1. About Us Hero Section */}
      <section className="bg-[#1E242D] text-white py-16 sm:py-20 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="editorial-badge bg-white/10 text-white border-white/20">
              ABOUT MSK LOGISTICS
            </span>
            <span className="text-xs font-mono text-neutral-400">
              JNPT • NHAVA SHEVA MARITIME CORRIDOR
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white">
            Industrial Logistics Engineered for Export Operations
          </h1>
          <p className="text-neutral-300 text-[16px] sm:text-[18px] max-w-3xl font-body leading-relaxed">
            Specialized export packaging, systematic container stuffing, and high-tensile cargo lashing based at Western India’s maritime export gateway at Nhava Sheva (JNPT).
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>Navi Mumbai, Maharashtra</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Anchor className="w-3.5 h-3.5 text-blue-400" />
              <span>Primary Gateway: Nhava Sheva Port (JNPT)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Company Introduction */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-[15px] sm:text-[16px] text-[#52627A] leading-relaxed">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B62825]">
                  Operational Focus & Philosophy
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] font-heading">
                  Physical Cargo Preparation Built for Ocean Transit
                </h2>
              </div>

              <p>
                <strong className="text-[#1E293B]">{COMPANY_DETAILS.publicName}</strong> operates at the nexus of industrial manufacturing and international ocean transport. Headquartered in Navi Mumbai in close proximity to Jawaharlal Nehru Port Trust (JNPT / Nhava Sheva), our operational expertise is concentrated specifically on the physical preparation and securing of containerized export cargo.
              </p>

              <p>
                Our core operations focus on three critical stages: <strong>export packaging</strong>, <strong>container stuffing</strong>, and <strong>cargo lashing and securing</strong>. International ocean voyages expose cargo to severe physical stresses, including multi-axis roll, pitch, acceleration, and ambient humidity shifts. Conventional domestic transport packaging is frequently insufficient for these demands. MSK Logistics bridges this gap by engineering customized packaging, calculating container floor weight distribution, and implementing compliant lashing systems that restrain cargo from shifting inside shipping containers.
              </p>

              <h3 className="text-xl font-bold text-[#1E293B] font-heading pt-2">
                Clear Communication & Defined Scope of Responsibility
              </h3>
              <p>
                We believe that reliable logistics begins with clear communication and unambiguous definitions of responsibility. Our client engagements operate on shipment-specific requirements and clearly agreed operational work—whether coordinating container sourcing alongside packaging or packing client-arranged shipping line containers. Every assignment is backed by transparent quotation scopes, itemized material specifications, and rigorous pre-door sealing checks.
              </p>

              {/* Core Disciplines List */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-1">
                  <span className="text-[#B62825] font-bold block">01 / PACKAGING</span>
                  <span className="text-[#334155] font-semibold">Custom Wooden Crating & Barrier Prep</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-1">
                  <span className="text-[#173F70] font-bold block">02 / STUFFING</span>
                  <span className="text-[#334155] font-semibold">Weight-Balanced Container Loading</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-1">
                  <span className="text-emerald-700 font-bold block">03 / LASHING</span>
                  <span className="text-[#334155] font-semibold">High-Tensile Ratchet & Wire Securing</span>
                </div>
              </div>
            </div>

            {/* Sidebar Overview Card */}
            <div className="lg:col-span-5 bg-[#F8FAFC] p-7 sm:p-8 rounded-2xl border border-[#E2E8F0] space-y-6 shadow-sm">
              <div className="space-y-2">
                <span className="editorial-badge bg-white text-[#173F70] border-neutral-300">
                  OPERATIONAL DETAILS
                </span>
                <h3 className="text-xl font-bold text-[#1E293B] font-heading">
                  Company Reference
                </h3>
              </div>

              <div className="space-y-4 text-xs text-[#334155]">
                <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
                  <span className="text-[#64748B] block font-mono text-[11px] uppercase">Entity Name</span>
                  <span className="font-bold text-[#1E293B] text-sm">{COMPANY_DETAILS.legalName}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
                  <span className="text-[#64748B] block font-mono text-[11px] uppercase">Primary Maritime Gateway</span>
                  <span className="font-semibold">{COMPANY_DETAILS.gateway}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
                  <span className="text-[#64748B] block font-mono text-[11px] uppercase">Operating Location</span>
                  <span>{COMPANY_DETAILS.address}</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
                  <span className="text-[#64748B] block font-mono text-[11px] uppercase">Operational Focus</span>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-[#475569]">
                    <li>Export Wooden Crating & Vacuum Packing</li>
                    <li>Container Stuffing & Center of Gravity Calculation</li>
                    <li>Heavy Machinery Lashing, Chocking & Securing</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <Link 
                  to="/request-quote"
                  className="btn-primary w-full text-center py-3 text-xs uppercase font-mono tracking-wider"
                >
                  Request a Formal Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Services Overview */}
      <section className="py-16 sm:py-20 bg-[#F5F5F3] border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="editorial-badge bg-white text-[#B62825] border-red-200">
                WHAT WE DO
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] font-heading">
                Specialized Export Preparation Services
              </h2>
              <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
                Dedicated operational services planned around cargo dimensions, vessel motion characteristics, and transport corridor safety.
              </p>
            </div>

            <Link 
              to="/services" 
              className="btn-secondary text-xs font-mono uppercase tracking-wider self-start md:self-auto"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="bg-white rounded-xl border border-[#E2E2E2] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col group">
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                <BrandedImage 
                  src="/images/services/export-packaging.webp" 
                  alt="Export Packaging and Industrial Crating"
                  aspectRatio="h-full w-full"
                  imageClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#173F70]/90 text-white text-[11px] font-mono uppercase px-2.5 py-1 rounded z-10">
                  Packaging
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#1E293B] group-hover:text-[#B62825] transition-colors">
                    Export Packaging
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    Custom-built heavy-duty wooden boxes, skids, crates, and vacuum barrier foil wrapping to protect industrial machinery against maritime humidity and corrosion.
                  </p>
                </div>
                <Link 
                  to="/services/export-packaging"
                  className="text-xs font-bold text-[#173F70] hover:text-[#B62825] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-xl border border-[#E2E2E2] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col group">
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                <BrandedImage 
                  src="/images/services/container-stuffing.webp" 
                  alt="Container Stuffing and Loading Operations"
                  aspectRatio="h-full w-full"
                  imageClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#173F70]/90 text-white text-[11px] font-mono uppercase px-2.5 py-1 rounded z-10">
                  Stuffing
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#1E293B] group-hover:text-[#B62825] transition-colors">
                    Container Stuffing
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    Systematic cargo positioning and weight distribution planning inside Standard Dry, High Cube, Open Top, and Flat Rack containers.
                  </p>
                </div>
                <Link 
                  to="/services/container-stuffing"
                  className="text-xs font-bold text-[#173F70] hover:text-[#B62825] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-xl border border-[#E2E2E2] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col group">
              <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                <BrandedImage 
                  src="/images/services/cargo-lashing.webp" 
                  alt="Cargo Lashing and Securing"
                  aspectRatio="h-full w-full"
                  imageClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#173F70]/90 text-white text-[11px] font-mono uppercase px-2.5 py-1 rounded z-10">
                  Lashing
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#1E293B] group-hover:text-[#B62825] transition-colors">
                    Cargo Lashing & Securing
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    Certified high-tensile polyester webbing, ratchet belts, steel wire ropes, turnbuckles, and timber chocking engineered to prevent in-transit movement.
                  </p>
                </div>
                <Link 
                  to="/services/cargo-lashing"
                  className="text-xs font-bold text-[#173F70] hover:text-[#B62825] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Team Section — Featuring the Authentic Client Photograph */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="space-y-3">
            <span className="editorial-badge bg-neutral-100 text-[#173F70] border-neutral-300">
              OUR TEAM
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#173F70]">
              The People Behind Our Operations
            </h2>
            <p className="text-[#666666] text-base sm:text-lg max-w-3xl leading-relaxed">
              Behind every shipment is a team focused on coordination, careful handling, and the execution of agreed operational work.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Team Photograph Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-[#E2E2E2] shadow-md bg-neutral-100 group transition-all duration-300 hover:shadow-xl">
                <picture>
                  <source srcSet="/images/team/msk-logistics-team.webp" type="image/webp" />
                  <img
                    src="/images/team/msk-logistics-team.jpg"
                    alt="MSK Logistics team standing together inside a warehouse."
                    className="w-full h-auto object-cover max-h-[640px] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                    width="768"
                    height="1024"
                  />
                </picture>

                {/* Corner MSK Logo Watermark Overlay (Only Logo) */}
                <div className="absolute bottom-4 right-4 z-10 pointer-events-none select-none">
                  <div className="flex items-center bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-md shadow-md border border-neutral-200">
                    <img
                      src="/images/logo/msk-logistics-logo.png"
                      alt="MSK Logistics"
                      className="h-4 sm:h-5 w-auto object-contain flex-shrink-0"
                    />
                  </div>
                </div>
              </div>
              <span className="text-xs text-[#94A3B8] font-mono block mt-3 text-center sm:text-left">
                MSK Logistics operations and logistics coordination team at the facility.
              </span>
            </div>

            {/* Team Values & Coordination Disciplines (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4 text-xs sm:text-sm text-[#52627A] leading-relaxed">
                <p>
                  Our personnel are directly involved in executing and supervising the physical packaging, container stuffing sequences, and lashing installations across every client assignment.
                </p>
                <p>
                  From technical cargo measurement and crating design to ground-level strapping and container gate coordination at Nhava Sheva (JNPT), our team operates collectively to ensure compliance with ocean carrier requirements and transit safety.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-start gap-3.5">
                  <div className="p-2 bg-white rounded-lg border border-[#E2E8F0] text-[#173F70] shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-[#1E293B]">
                      Coordinated Operational Support
                    </h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Continuous on-ground supervision to ensure goods are staged, packed, and secured strictly according to agreed quotations.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-start gap-3.5">
                  <div className="p-2 bg-white rounded-lg border border-[#E2E8F0] text-[#B62825] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-[#1E293B]">
                      Careful Handling & Rigging
                    </h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Application of proper timber blocking, high-capacity ratchet belts, and certified lashing gear suitable for heavy cargo.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-start gap-3.5">
                  <div className="p-2 bg-white rounded-lg border border-[#E2E8F0] text-emerald-700 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-[#1E293B]">
                      Transparent Documentation
                    </h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Complete photographic records before container door closure for client records, customs, and ocean carrier compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Working Approach */}
      <section className="py-16 sm:py-20 bg-[#F5F5F3] border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="editorial-badge bg-white text-[#173F70] border-neutral-300">
              METHODICAL EXECUTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E293B] font-heading">
              Our Working Approach
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
              Every shipment is executed through a clear 5-step operational workflow to guarantee systematic preparation and transparent accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Step 1 */}
            <div className="bg-white p-5 rounded-xl border border-[#E2E2E2] space-y-3 relative flex flex-col justify-between hover:shadow-sm transition-shadow">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#173F70] text-white text-xs font-mono font-bold flex items-center justify-center">
                  01
                </div>
                <h3 className="text-sm font-bold text-[#1E293B] font-heading">
                  Understand Requirements
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Understand the cargo dimensions, weight distribution, and specific shipment requirements.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-[#94A3B8] border-t border-neutral-100">
                STEP 1 / CARGO REVIEW
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-5 rounded-xl border border-[#E2E2E2] space-y-3 relative flex flex-col justify-between hover:shadow-sm transition-shadow">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#173F70] text-white text-xs font-mono font-bold flex items-center justify-center">
                  02
                </div>
                <h3 className="text-sm font-bold text-[#1E293B] font-heading">
                  Confirm Arrangements
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Confirm packaging types, container specifications, and delivery arrangements.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-[#94A3B8] border-t border-neutral-100">
                STEP 2 / CONTAINER PLAN
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-5 rounded-xl border border-[#E2E2E2] space-y-3 relative flex flex-col justify-between hover:shadow-sm transition-shadow">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#173F70] text-white text-xs font-mono font-bold flex items-center justify-center">
                  03
                </div>
                <h3 className="text-sm font-bold text-[#1E293B] font-heading">
                  Agree on Scope
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Agree on the detailed operational work scope, materials, and transparent quotation.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-[#94A3B8] border-t border-neutral-100">
                STEP 3 / FORMAL SCOPE
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-5 rounded-xl border border-[#E2E2E2] space-y-3 relative flex flex-col justify-between hover:shadow-sm transition-shadow">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#173F70] text-white text-xs font-mono font-bold flex items-center justify-center">
                  04
                </div>
                <h3 className="text-sm font-bold text-[#1E293B] font-heading">
                  Coordinate Execution
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Coordinate on-ground packaging, stuffing sequences, and certified cargo lashing.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-[#94A3B8] border-t border-neutral-100">
                STEP 4 / GROUND WORK
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white p-5 rounded-xl border border-[#E2E2E2] space-y-3 relative flex flex-col justify-between hover:shadow-sm transition-shadow">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#173F70] text-white text-xs font-mono font-bold flex items-center justify-center">
                  05
                </div>
                <h3 className="text-sm font-bold text-[#1E293B] font-heading">
                  Complete & Document
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Complete the agreed work, final checklist inspection, and visual documentation.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-[#94A3B8] border-t border-neutral-100">
                STEP 5 / HANDOVER
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Request a Quote Call to Action */}
      <section className="py-16 sm:py-20 bg-[#173F70] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="editorial-badge bg-white/10 text-white border-white/20 text-xs font-mono">
                OPERATIONAL QUOTATION
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading">
                Let's Discuss Your Shipment Requirements
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Share your cargo details and requirements with our team to request a quotation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 flex-shrink-0 w-full md:w-auto">
              <Link
                to="/request-quote"
                className="w-full sm:w-auto bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-4 px-8 rounded-xl text-base transition-all shadow-md text-center inline-flex items-center justify-center gap-2"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={COMPANY_DETAILS.phoneHref}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl text-base transition-colors text-center border border-white/20 inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call Desk: {COMPANY_DETAILS.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
