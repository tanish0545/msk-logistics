import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  Workflow, 
  ShieldCheck, 
  Truck, 
  Warehouse, 
  Layers, 
  Headphones, 
  Award, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const StaffPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-[#FBFBFC] text-[#1E293B] selection:bg-[#B62825] selection:text-white">
      {/* ========================================================================= */}
      {/* 0. HEADER BANNER & BREADCRUMBS (BUG 11 & BUG 12 & BUG 13)                 */}
      {/* ========================================================================= */}
      <InnerPageBanner
        breadcrumb={
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Our Staff', isCurrent: true },
            ]}
          />
        }
        badge="MSK LEADERSHIP & FIELD CREWS"
        badgeSubtext="PORT OF NHAVA SHEVA (JNPT) • CBD BELAPUR"
        title="Our Team & Ground Workforce"
        description="A dedicated team of logistics professionals bringing experience, coordination and reliability to every export packaging, stuffing and maritime securing assignment."
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION — OUR TEAM (SPLIT LAYOUT WITH AUTHENTIC CONTAINER PHOTO)   */}
      {/* ========================================================================= */}
      <section id="msk-team-hero" className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 bg-[#FBFBFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" delay={50}>
            {/* Split Card: Left 68% Photo + Right 32% Info Panel */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-xl bg-white flex flex-col lg:flex-row items-stretch relative">
              
              {/* LEFT SIDE: Team Photograph with Text Overlay (~68% on Desktop) */}
              <div className="relative w-full lg:w-[68%] aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[580px] overflow-hidden bg-[#0B0B0D] group">
                <img
                  src="/images/team/msk-team-containers.jpg"
                  alt="MSK Logistics dedicated team standing in front of shipping containers"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  style={{ objectPosition: 'center 40%' }}
                  loading="eager"
                  decoding="async"
                />

                {/* Soft, continuous radial contrast behind top-left heading */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 10% 15%, rgba(11, 11, 13, 0.85) 0%, rgba(11, 11, 13, 0.45) 40%, rgba(11, 11, 13, 0.1) 65%, transparent 85%)'
                  }}
                  aria-hidden="true"
                />

                {/* Text Overlay on Left Side: Positioned at top-left above team members */}
                <div className="absolute inset-0 z-10 flex flex-col justify-start pt-6 sm:pt-8 lg:pt-10 p-6 sm:p-8 lg:p-10 max-w-md">
                  {/* Small label: /// OUR TEAM */}
                  <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#B62825] font-bold uppercase mb-2">
                    <span>/// OUR TEAM</span>
                  </div>

                  {/* Main heading */}
                  <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black font-heading text-white leading-tight drop-shadow-md">
                    The People Behind<br className="hidden sm:inline" />{' '}
                    <span className="text-[#B62825]">MSK Logistics</span>
                  </h1>

                  {/* Subtle red horizontal accent line below heading */}
                  <div className="w-16 h-1 bg-[#B62825] rounded-full mt-3" />
                </div>
              </div>

              {/* RIGHT SIDE: Information Panel (~32% on Desktop with Clean Vertical Red Divider) */}
              <div className="relative w-full lg:w-[32%] bg-neutral-900 text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l-2 lg:border-[#B62825] z-10">
                {/* Subtle red edge lighting */}
                <div className="hidden lg:block absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#B62825]/15 to-transparent pointer-events-none" />

                <div className="space-y-6">
                  {/* Heading */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight">
                      Our Team
                    </h2>
                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed mt-3">
                      A dedicated team of logistics professionals bringing experience, coordination and reliability to every shipment.
                    </p>
                  </div>

                  {/* Three Information Rows */}
                  <div className="space-y-5 pt-2">
                    {/* Row 1: Experienced Professionals */}
                    <div className="flex items-start gap-3.5 group/row">
                      <div className="w-11 h-11 rounded-lg bg-[#B62825]/15 border border-[#B62825]/50 flex items-center justify-center text-[#B62825] shrink-0 shadow-inner group-hover/row:border-[#B62825] group-hover/row:bg-[#B62825]/25 transition-all">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold font-heading text-white">
                          Experienced Professionals
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                          Domain expertise across cargo operations.
                        </p>
                      </div>
                    </div>

                    {/* Row 2: Coordinated Operations */}
                    <div className="flex items-start gap-3.5 group/row">
                      <div className="w-11 h-11 rounded-lg bg-[#B62825]/15 border border-[#B62825]/50 flex items-center justify-center text-[#B62825] shrink-0 shadow-inner group-hover/row:border-[#B62825] group-hover/row:bg-[#B62825]/25 transition-all">
                        <Workflow className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold font-heading text-white">
                          Coordinated Operations
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                          Seamless execution at every stage.
                        </p>
                      </div>
                    </div>

                    {/* Row 3: Committed to Trust */}
                    <div className="flex items-start gap-3.5 group/row">
                      <div className="w-11 h-11 rounded-lg bg-[#B62825]/15 border border-[#B62825]/50 flex items-center justify-center text-[#B62825] shrink-0 shadow-inner group-hover/row:border-[#B62825] group-hover/row:bg-[#B62825]/25 transition-all">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold font-heading text-white">
                          Committed to Trust
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                          People, process and precision.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Panel Footer Metadata */}
                <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>OPERATING HUBS</span>
                  <span className="text-[#B62825] font-bold">JNPT &amp; CBD BELAPUR</span>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECOND SECTION — OUR STAFF, IN ACTION (LIGHT BACKGROUND HARMONY)       */}
      {/* ========================================================================= */}
      <section id="msk-staff-action" className="py-16 sm:py-20 lg:py-24 bg-white border-t border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
          
          {/* Section Header with CTA */}
          <ScrollReveal direction="up" delay={50}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
              <div className="space-y-3 max-w-2xl">
                {/* Small label: /// OUR STAFF */}
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#B62825] font-bold uppercase">
                  <span>/// OUR STAFF</span>
                </div>

                {/* Main heading: Our Staff, In Action */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#1E293B] tracking-tight">
                  Our Staff, <span className="text-[#B62825]">In Action</span>
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#64748B] font-body leading-relaxed">
                  A skilled and dedicated workforce ensuring safe, efficient and on-time cargo operations.
                </p>
              </div>

              {/* CTA button: Meet Our Team -> */}
              <div className="shrink-0">
                <a
                  href="#msk-team-hero"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#B62825] hover:bg-[#9E2220] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#B62825]/20 hover:shadow-[#B62825]/40 transition-all duration-300 group"
                >
                  <span>Meet Our Team</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Three Operational Image Cards (Horizontally Arranged) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1 — Operations */}
            <ScrollReveal direction="up" delay={100} className="h-full">
              <div className="h-full rounded-2xl overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#B62825]/60 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between hover-lift">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src="/images/operations/container-loading/rigging-crew-crane-loading.jpg"
                    alt="Authentic MSK ground operations team coordinating heavy cargo crane lift at container terminal"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-mono font-bold text-white border border-white/20">
                    OPERATIONS
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-heading text-[#1E293B] group-hover:text-[#B62825] transition-colors">
                      On-Ground Execution
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed">
                      Authentic MSK ground operations personnel and rigging crews actively coordinating terminal cargo movements, heavy crane hoists, and vessel cell positioning.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                    <span>YARD COORDINATION</span>
                    <span className="text-[#1E293B] font-semibold">CFS &amp; JNPT Port</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2 — Warehouse */}
            <ScrollReveal direction="up" delay={150} className="h-full">
              <div className="h-full rounded-2xl overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#B62825]/60 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between hover-lift">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src="/images/operations/warehouse/export-pallet-strapping-staging.jpg"
                    alt="Authentic MSK warehouse handling and export pallet strapping inside covered staging bays"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-mono font-bold text-white border border-white/20">
                    WAREHOUSE
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-heading text-[#1E293B] group-hover:text-[#B62825] transition-colors">
                      Handling &amp; Storage
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed">
                      Systematic pallet strapping, moisture protection wrapping, and precision export cargo staging across dedicated covered warehouse bays.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                    <span>SHELTERED STAGING</span>
                    <span className="text-[#1E293B] font-semibold">Covered Facilities</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3 — Ground Team */}
            <ScrollReveal direction="up" delay={200} className="h-full">
              <div className="h-full rounded-2xl overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#B62825]/60 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between hover-lift">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src="/images/services/container-stuffing.jpg"
                    alt="Authentic MSK ground team operating forklift equipment for container stuffing and cargo securing"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-mono font-bold text-white border border-white/20">
                    GROUND TEAM
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-heading text-[#1E293B] group-hover:text-[#B62825] transition-colors">
                      Stuffing &amp; Lashing
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] font-body leading-relaxed">
                      Certified forklift operators and stuffing crews executing multi-axle weight distribution, heavy timber chocking, and high-tensile lashing.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                    <span>EQUIPMENT IN ACTION</span>
                    <span className="text-[#1E293B] font-semibold">Forklifts &amp; Rigging</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* ========================================================================= */}
          {/* 3. STAFF FUNCTIONAL CATEGORIES (4 HORIZONTALLY ALIGNED)                  */}
          {/* ========================================================================= */}
          <ScrollReveal direction="up" delay={100}>
            <div className="pt-8 sm:pt-12 border-t border-[#E2E8F0]">
              <div className="text-[11px] font-mono tracking-widest text-[#B62825] uppercase font-bold mb-6">
                /// OPERATIONAL CAPABILITIES &amp; DIVISIONS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                {/* Category 1: Operations */}
                <div className="relative p-6 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#B62825]/40 shadow-xs hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#B62825] mb-4 group-hover:bg-[#B62825] group-hover:text-white transition-all">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-heading text-[#1E293B]">Operations</h4>
                  <p className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider mt-1">
                    On-Ground Execution
                  </p>
                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                    Gate coordination, dock supervision, customs verification, and terminal carting transfers across Nhava Sheva.
                  </p>
                </div>

                {/* Category 2: Warehouse */}
                <div className="relative p-6 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#B62825]/40 shadow-xs hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#B62825] mb-4 group-hover:bg-[#B62825] group-hover:text-white transition-all">
                    <Warehouse className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-heading text-[#1E293B]">Warehouse</h4>
                  <p className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider mt-1">
                    Handling &amp; Storage
                  </p>
                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                    Sheltered staging, pallet inventory segregation, weatherproofing, and safe transitional storage management.
                  </p>
                </div>

                {/* Category 3: Ground Team */}
                <div className="relative p-6 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#B62825]/40 shadow-xs hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#B62825] mb-4 group-hover:bg-[#B62825] group-hover:text-white transition-all">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-heading text-[#1E293B]">Ground Team</h4>
                  <p className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider mt-1">
                    Cargo, Stuffing &amp; Lashing
                  </p>
                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                    Forklift loading, ocean container stuffing, dunnage placement, and certified heavy polyester strapping.
                  </p>
                </div>

                {/* Category 4: Support */}
                <div className="relative p-6 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#B62825]/40 shadow-xs hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#B62825] mb-4 group-hover:bg-[#B62825] group-hover:text-white transition-all">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-heading text-[#1E293B]">Support</h4>
                  <p className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider mt-1">
                    Coordination &amp; Client Service
                  </p>
                  <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                    Real-time status updates, shipping documentation alignment, carrier coordination, and responsive client dispatch.
                  </p>
                </div>

              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. AUTHENTIC LEADERSHIP PROFILE & CREDENTIALS                             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#FBFBFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Professional Philosophy */}
            <ScrollReveal direction="left" delay={50} className="lg:col-span-7 h-full">
              <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#B62825] text-xs font-mono font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    <span>WORKFORCE PHILOSOPHY</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1E293B] font-heading">
                    Skilled Execution in Dynamic Port Environments
                  </h3>
                  <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-body">
                    Our people are skilled and professional in their work, playing an important role in delivering services and solutions to our clients. We strive to remain responsive to changing market conditions and evolving client requirements.
                  </p>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-body">
                    Every export crating assignment, heavy machinery lashing project, and ocean container stuffing operation requires rigorous on-site coordination. Our crews adhere to strict safety protocols, schedule discipline, and certified handling procedures across CFS hubs and client factory premises.
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#475569]">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0" />
                    <span>Certified Lashing Standards</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0" />
                    <span>Schedule Punctuality &amp; Discipline</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0" />
                    <span>ISO 9001:2015 Quality Management</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0" />
                    <span>Zero-Accident Safety Protocol</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Leadership Anchor (Proprietor) */}
            <ScrollReveal direction="right" delay={100} className="lg:col-span-5 h-full">
              <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-[#E2E8F0] text-xs font-mono text-[#475569]">
                    <Building2 className="w-3.5 h-3.5 text-[#B62825]" />
                    <span>LEADERSHIP</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1E293B] font-heading">
                    Sunil Naresh Kadu
                  </h3>
                  <div className="text-[13px] font-mono font-bold text-[#B62825] uppercase tracking-wider">
                    Proprietor &amp; Founder
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-body pt-2">
                    Founded MSK Logistics Solution in May 2019 with a vision for uncompromising cargo handling, container stuffing, and maritime lashing across Nhava Sheva. Under his stewardship, the company maintains strong client relationships, customized protection standards, and schedule adherence.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono text-[#475569] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">FOUNDED:</span>
                    <span className="font-bold text-[#1E293B]">May 2019</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">LOCATION:</span>
                    <span className="font-bold text-[#1E293B]">Navi Mumbai, India</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">OPERATING HUBS:</span>
                    <span className="font-bold text-[#1E293B]">JNPT &amp; CBD Belapur</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">PRIMARY GATEWAY:</span>
                    <span className="font-bold text-[#B62825]">Nhava Sheva Port</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Action Callout Banner */}
          <ScrollReveal direction="up" delay={50}>
            <div className="bg-neutral-900 rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Need Skilled Logistics Support On-Site?
                </h3>
                <p className="text-slate-300 text-sm max-w-xl font-body leading-relaxed">
                  Our certified crews are ready to deploy for export crating, ocean container stuffing, and heavy maritime lashing.
                </p>
              </div>
              <Link
                to="/request-quote"
                className="bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-3.5 px-7 rounded-xl inline-flex items-center gap-2.5 shadow-xl shadow-[#B62825]/30 hover:shadow-[#B62825]/50 transition-all flex-shrink-0 group"
              >
                <span>Connect With Our Team</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
};
