import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Anchor, 
  Phone, 
  MapPin, 
  Users,
  Calendar,
  Building2,
  PackageCheck,
  Handshake,
  UserCheck
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/company';
import { BrandedImage } from '../components/common/BrandedImage';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-white">
      {/* ========================================================================= */}
      {/* 1. ABOUT US HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <InnerPageBanner
        badge="ABOUT MSK LOGISTICS"
        badgeSubtext="JNPT • NHAVA SHEVA MARITIME CORRIDOR"
        title="Industrial Logistics Engineered for Export Operations"
        description="Specialized export packaging, systematic container stuffing, and high-tensile cargo lashing based at Western India’s maritime export gateway at Nhava Sheva (JNPT)."
        meta={
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B62825]" />
              <span>Navi Mumbai, Maharashtra</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Anchor className="w-3.5 h-3.5 text-[#D9DEE5]" />
              <span>Primary Gateway: Nhava Sheva Port (JNPT)</span>
            </div>
          </div>
        }
      />

      {/* ========================================================================= */}
      {/* 2. HISTORY & PHILOSOPHY SECTION (Point 02 Enhancement)                     */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E2E2E2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Polished Editorial Storytelling */}
            <ScrollReveal direction="left" delay={0} className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F70]/10 border border-[#173F70]/20 text-[#173F70] text-xs font-mono font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
                  <span>FOUNDED MAY 2019 • NHAVA SHEVA</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E293B] font-heading tracking-tight leading-tight">
                  History &amp; Philosophy
                </h2>
                <div className="w-16 h-1 bg-[#B62825]" />
              </div>

              <div className="space-y-4 text-base sm:text-[17px] text-[#52627A] font-body leading-relaxed">
                <p>
                  <strong className="text-[#1E293B] font-semibold">MSK Logistics Solution</strong> was established in <strong>May 2019</strong> to provide dedicated cargo handling and transportation, lashing and choking, palletisation, packing, and specialized export-related activities from Western India’s maritime export hub at Nhava Sheva (JNPT).
                </p>
                <p>
                  In its foundational phase, the company worked in close collaboration with <strong>Speedy Multimodes Limited</strong>, one of the prominent Container Freight Station (CFS) operators in India. This operational association reinforced our ground-level discipline, container terminal protocol, and marine-standard handling procedures.
                </p>
                <p>
                  Our operational philosophy centers strictly on the quality of logistics execution, packaging materials, and client-tailored services. Rather than applying standard uniform packaging, every solution is carefully customized according to specific product requirements and cargo sensitivities. Rigorous adherence to schedules and maintaining strong, dependable client relationships remain our steadfast priorities across every assignment.
                </p>
              </div>

              {/* Verified Competency Tags */}
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] sm:text-xs font-mono">
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] font-medium">
                  Cargo Handling &amp; Transportation
                </span>
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] font-medium">
                  Industrial Packing &amp; Palletisation
                </span>
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] font-medium">
                  Marine Lashing &amp; Choking
                </span>
                <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] font-medium">
                  CFS-Aligned Operational Rigor
                </span>
              </div>
            </ScrollReveal>

            {/* Right Column: Editorial Structured Pillars */}
            <ScrollReveal direction="right" delay={120} className="lg:col-span-5 space-y-4">
              <div className="bg-[#F8FAFC] p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] space-y-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#173F70]">
                    Verified Company Profile
                  </span>
                  <span className="text-[11px] font-mono text-[#94A3B8]">
                    MAY 2019 • JNPT
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Item 1: Inception */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#B62825] shadow-xs shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                        Established in May 2019
                      </h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        Formed as an export-readiness specialist handling cargo transportation, packaging, palletisation, and containerized lashing.
                      </p>
                    </div>
                  </div>

                  {/* Item 2: CFS Background */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#173F70] shadow-xs shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                        Speedy Multimodes Limited Collaboration
                      </h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        Initially worked alongside Speedy Multimodes Limited, one of India&apos;s recognized CFS operators, executing terminal-compliant packing work.
                      </p>
                    </div>
                  </div>

                  {/* Item 3: Custom Packaging Philosophy */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-emerald-700 shadow-xs shrink-0">
                      <PackageCheck className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                        Customized Material &amp; Service Standards
                      </h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        Dedicated focus on high-quality packaging materials and customized packing configurations matched to cargo dimensions and transit mode.
                      </p>
                    </div>
                  </div>

                  {/* Item 4: Schedule & Client Trust */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#B62825] shadow-xs shrink-0">
                      <Handshake className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                        Schedule Adherence &amp; Client Relationships
                      </h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        Prioritizing punctual execution schedules and sustaining long-term, transparent working partnerships with exporters and logistics coordinators.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MONTHLY BUSINESS VOLUME METRIC (Point 02 Enhancement)                  */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 bg-[#173F70] text-white relative overflow-hidden border-b border-[#0F2D52]">
        {/* Subtle Diagonal Technical Lines Accent */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0px, rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 24px)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <ScrollReveal direction="up" delay={0}>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/15 p-8 sm:p-12 lg:p-14 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Metric Display Column */}
                <div className="lg:col-span-6 space-y-3 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-mono font-medium uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
                    <span>MONTHLY BUSINESS VOLUME</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                    <span className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading text-white tracking-tight drop-shadow-sm">
                      350–400
                    </span>
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-2xl sm:text-3xl font-bold font-heading text-[#B62825] tracking-wide">
                        TEUs
                      </span>
                      <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-blue-200 font-semibold">
                        Per Month
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-16 h-1 bg-[#B62825] mx-auto lg:mx-0 mt-3" />
                </div>

                {/* Supporting Editorial Column */}
                <div className="lg:col-span-6 space-y-4 text-center lg:text-left border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-10">
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight">
                    Consistent Container Handling Capacity
                  </h3>
                  <p className="text-sm sm:text-base text-blue-100 font-body leading-relaxed">
                    MSK Logistics manages a sustained throughput of <strong className="text-white font-semibold">350–400 TEUs per month</strong> across technical export packaging, container stuffing, and heavy maritime securing operations, supporting continuous movement through Western India&apos;s primary ocean gateways.
                  </p>
                  <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-blue-200">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                      <span>Twenty-Foot Equivalent Units</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                      <span>Nhava Sheva (JNPT) Hub</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. OWNERSHIP & LEADERSHIP SECTION (Point 02 Enhancement)                  */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E2E2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 sm:space-y-12">
          
          {/* Section Header */}
          <ScrollReveal direction="up" delay={0} className="max-w-2xl space-y-3">
            <span className="editorial-badge bg-white text-[#173F70] border-neutral-300">
              GOVERNANCE &amp; LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E293B] font-heading tracking-tight">
              Ownership &amp; Leadership
            </h2>
            <div className="w-16 h-1 bg-[#B62825]" />
            <p className="text-sm sm:text-base text-[#64748B] font-body leading-relaxed">
              Direct commercial stewardship and hands-on operational leadership guiding every client engagement and project commitment.
            </p>
          </ScrollReveal>

          {/* Premium Profile Card */}
          <ScrollReveal direction="up" delay={80}>
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-7 sm:p-10 shadow-sm max-w-4xl hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                
                {/* Replaceable Avatar Container */}
                <div 
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-[#173F70] via-[#1E293B] to-[#0F2D52] flex items-center justify-center border-2 border-white/20 shadow-md text-white font-heading font-bold text-3xl sm:text-4xl tracking-wider select-none shrink-0 relative overflow-hidden group"
                  title="Sunil Naresh Kadu — Proprietor (Replaceable image container for future photograph)"
                >
                  {/* Future photograph drop-in container */}
                  {/* <img src="/images/team/sunil-naresh-kadu.jpg" alt="Sunil Naresh Kadu, Proprietor" className="w-full h-full object-cover" /> */}
                  <span className="text-[#F4F5F7] group-hover:scale-105 transition-transform duration-300">
                    SNK
                  </span>
                  
                  {/* Subtle Corner Designation Ribbon */}
                  <div className="absolute bottom-1.5 inset-x-1.5 py-0.5 bg-black/40 backdrop-blur-xs rounded text-[9px] font-mono text-center text-white/90 uppercase tracking-widest">
                    PROPRIETOR
                  </div>
                </div>

                {/* Profile Details */}
                <div className="space-y-4 text-center sm:text-left flex-1">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#B62825]/10 border border-[#B62825]/20 text-[#B62825] text-xs font-mono font-bold uppercase tracking-wider">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Commercial Stewardship</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#1E293B] font-heading tracking-tight pt-1">
                      Sunil Naresh Kadu
                    </h3>
                    <p className="text-base sm:text-lg font-mono font-bold text-[#B62825] tracking-wide">
                      Proprietor
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#52627A] font-body leading-relaxed">
                    Under the direct leadership of <strong className="text-[#1E293B]">Sunil Naresh Kadu</strong>, MSK Logistics Solution maintains hands-on executive accountability across all commercial contracts, quality standards, and export packaging executions.
                  </p>

                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#334155] border-t border-[#E2E8F0]">
                    <div className="flex items-center gap-2 pt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#173F70]" />
                      <span>Commercial Entity: <strong>MSK Logistics Solution</strong></span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
                      <span>Confirmed Designation: <strong>Proprietor</strong></span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OPERATIONAL FOCUS & PHILOSOPHY (Preserved Existing Section)            */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-[15px] sm:text-[16px] text-[#52627A] leading-relaxed">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B62825]">
                  Operational Disciplines
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
                Clear Communication &amp; Defined Scope of Responsibility
              </h3>
              <p>
                We believe that reliable logistics begins with clear communication and unambiguous definitions of responsibility. Our client engagements operate on shipment-specific requirements and clearly agreed operational work—whether coordinating container sourcing alongside packaging or packing client-arranged shipping line containers. Every assignment is backed by transparent quotation scopes, itemized material specifications, and rigorous pre-door sealing checks.
              </p>

              {/* Core Disciplines List */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-1">
                  <span className="text-[#B62825] font-bold block">01 / PACKAGING</span>
                  <span className="text-[#334155] font-semibold">Custom Wooden Crating &amp; Barrier Prep</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-1">
                  <span className="text-[#173F70] font-bold block">02 / STUFFING</span>
                  <span className="text-[#334155] font-semibold">Weight-Balanced Container Loading</span>
                </div>
                <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-1">
                  <span className="text-emerald-700 font-bold block">03 / LASHING</span>
                  <span className="text-[#334155] font-semibold">High-Tensile Ratchet &amp; Wire Securing</span>
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
                    <li>Export Wooden Crating &amp; Vacuum Packing</li>
                    <li>Container Stuffing &amp; Center of Gravity Calculation</li>
                    <li>Heavy Machinery Lashing, Chocking &amp; Securing</li>
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

      {/* ========================================================================= */}
      {/* 6. OUR SERVICES OVERVIEW (Preserved Existing Section)                      */}
      {/* ========================================================================= */}
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
                    Cargo Lashing &amp; Securing
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

      {/* ========================================================================= */}
      {/* 7. OUR TEAM SECTION (Preserved Authentic Client Photograph)               */}
      {/* ========================================================================= */}
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

                {/* Corner MSK Logo Watermark Overlay */}
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
                      Careful Handling &amp; Rigging
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

      {/* ========================================================================= */}
      {/* 8. OUR WORKING APPROACH (Preserved Existing Section)                      */}
      {/* ========================================================================= */}
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
                  Complete &amp; Document
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

      {/* ========================================================================= */}
      {/* 9. REQUEST A QUOTE CALL TO ACTION (Preserved Existing Section)             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#173F70] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="editorial-badge bg-white/10 text-white border-white/20 text-xs font-mono">
                OPERATIONAL QUOTATION
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading">
                Let&apos;s Discuss Your Shipment Requirements
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
