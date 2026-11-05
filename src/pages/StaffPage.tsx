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
import { ScrollReveal } from '../components/common/ScrollReveal';

export const StaffPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-[#0B0B0D] text-[#D9DEE5] selection:bg-[#B62825] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION — OUR TEAM (SPLIT LAYOUT)                                 */}
      {/* ========================================================================= */}
      <section id="msk-team-hero" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 bg-[#0B0B0D] overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[360px] bg-[#B62825]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" delay={50}>
            {/* Split Card: Left 68% Photo + Right 32% Info Panel */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B0B0D] flex flex-col lg:flex-row items-stretch relative">
              
              {/* LEFT SIDE: Team Photograph with Text Overlay (~68% on Desktop) */}
              <div className="relative w-full lg:w-[68%] min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] overflow-hidden bg-[#0B0B0D] group">
                <img
                  src="/images/team/msk-team-containers.jpg"
                  alt="MSK Logistics dedicated team standing in front of shipping containers"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  style={{ objectPosition: 'center 40%' }}
                  loading="eager"
                  decoding="async"
                />

                {/* Dark gradient overlay on top-left for crisp text contrast without obscuring faces */}
                <div className="absolute inset-0 bg-gradient-to-t via-[#0B0B0D]/50 to-transparent lg:bg-gradient-to-br lg:from-[#0B0B0D]/90 lg:via-[#0B0B0D]/60 lg:to-transparent lg:w-[45%] pointer-events-none" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                {/* Text Overlay on Left Side: Positioned at top-left above team members */}
                <div className="absolute inset-0 z-10 flex flex-col justify-start pt-6 sm:pt-8 lg:pt-10 p-6 sm:p-8 lg:p-10 max-w-md">
                  {/* Small label: /// OUR TEAM */}
                  <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#B62825] font-bold uppercase mb-2">
                    <span>/// OUR TEAM</span>
                  </div>

                  {/* Main heading */}
                  <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-black font-heading text-white leading-tight drop-shadow-md">
                    The People Behind<br className="hidden sm:inline" />{' '}
                    <span className="text-[#B62825]">MSK Logistics</span>
                  </h1>

                  {/* Subtle red horizontal accent line below heading */}
                  <div className="w-16 h-1 bg-[#B62825] rounded-full mt-3" />
                </div>
              </div>

              {/* Angled Red Dividing Edge (Desktop Viewport) */}
              <div className="hidden lg:block absolute left-[68%] top-0 bottom-0 w-8 -translate-x-1/2 z-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 32 100" preserveAspectRatio="none">
                  {/* Dark angled polygon matching the right panel background */}
                  <polygon points="0,0 32,0 32,100 12,100" fill="#0D0F14" />
                  {/* Angled MSK red dividing accent line */}
                  <line x1="0" y1="0" x2="12" y2="100" stroke="#B62825" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>

              {/* RIGHT SIDE: Information Panel (~32% on Desktop) */}
              <div className="relative w-full lg:w-[32%] bg-[#0D0F14] p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 border-[#B62825]/40 z-10">
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
      {/* 2. SECOND SECTION — OUR STAFF, IN ACTION                                  */}
      {/* ========================================================================= */}
      <section id="msk-staff-action" className="py-16 sm:py-20 lg:py-24 bg-[#08080A] border-t border-b border-white/10 relative overflow-hidden">
        {/* Subtle ambient red background highlight */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B62825]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
          
          {/* Section Header with CTA */}
          <ScrollReveal direction="up" delay={50}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-3 max-w-2xl">
                {/* Small label: /// OUR STAFF */}
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#B62825] font-bold uppercase">
                  <span>/// OUR STAFF</span>
                </div>

                {/* Main heading: Our Staff, In Action */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
                  Our Staff, <span className="text-[#B62825]">In Action</span>
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed">
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
              <div className="h-full rounded-2xl overflow-hidden bg-[#12141A] border border-white/10 hover:border-[#B62825]/60 shadow-xl transition-all duration-300 group flex flex-col justify-between">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src="/images/operations/container-loading/rigging-crew-crane-loading.jpg"
                    alt="Authentic MSK ground operations team coordinating heavy cargo crane lift at container terminal"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-transparent to-black/30" />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-mono font-bold text-[#B62825] border border-[#B62825]/40">
                    OPERATIONS
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-[#B62825] transition-colors">
                      On-Ground Execution
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                      Authentic MSK ground operations personnel and rigging crews actively coordinating terminal cargo movements, heavy crane hoists, and vessel cell positioning.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>YARD COORDINATION</span>
                    <span className="text-white font-medium">CFS &amp; JNPT Port</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2 — Warehouse */}
            <ScrollReveal direction="up" delay={150} className="h-full">
              <div className="h-full rounded-2xl overflow-hidden bg-[#12141A] border border-white/10 hover:border-[#B62825]/60 shadow-xl transition-all duration-300 group flex flex-col justify-between">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src="/images/operations/warehouse/export-pallet-strapping-staging.jpg"
                    alt="Authentic MSK warehouse handling and export pallet strapping inside covered staging bays"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-transparent to-black/30" />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-mono font-bold text-[#B62825] border border-[#B62825]/40">
                    WAREHOUSE
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-[#B62825] transition-colors">
                      Handling &amp; Storage
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                      Systematic pallet strapping, moisture protection wrapping, and precision export cargo staging across dedicated covered warehouse bays.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>SHELTERED STAGING</span>
                    <span className="text-white font-medium">Covered Facilities</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3 — Ground Team */}
            <ScrollReveal direction="up" delay={200} className="h-full">
              <div className="h-full rounded-2xl overflow-hidden bg-[#12141A] border border-white/10 hover:border-[#B62825]/60 shadow-xl transition-all duration-300 group flex flex-col justify-between">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src="/images/services/container-stuffing.jpg"
                    alt="Authentic MSK ground team operating forklift equipment for container stuffing and cargo securing"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141A] via-transparent to-black/30" />
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-mono font-bold text-[#B62825] border border-[#B62825]/40">
                    GROUND TEAM
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-[#B62825] transition-colors">
                      Stuffing &amp; Lashing
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                      Certified forklift operators and stuffing crews executing multi-axle weight distribution, heavy timber chocking, and high-tensile lashing.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>EQUIPMENT IN ACTION</span>
                    <span className="text-white font-medium">Forklifts &amp; Rigging</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* ========================================================================= */}
          {/* 3. STAFF FUNCTIONAL CATEGORIES (4 HORIZONTALLY ALIGNED)                  */}
          {/* ========================================================================= */}
          <ScrollReveal direction="up" delay={100}>
            <div className="pt-8 sm:pt-12 border-t border-white/10">
              <div className="text-[11px] font-mono tracking-widest text-[#B62825] uppercase font-bold mb-6">
                /// OPERATIONAL CAPABILITIES &amp; DIVISIONS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                {/* Category 1: Operations */}
                <div className="relative p-6 rounded-xl bg-[#12141A]/70 border border-white/10 hover:border-[#B62825]/40 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 group-hover:border-[#B62825]/50 group-hover:bg-[#B62825]/15 group-hover:text-[#B62825] transition-all">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-heading text-white">Operations</h4>
                  <p className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider mt-1">
                    On-Ground Execution
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Gate coordination, dock supervision, customs verification, and terminal carting transfers across Nhava Sheva.
                  </p>
                  {/* Subtle red vertical separator on desktop */}
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-gradient-to-b from-transparent via-[#B62825]/40 to-transparent pointer-events-none" />
                </div>

                {/* Category 2: Warehouse */}
                <div className="relative p-6 rounded-xl bg-[#12141A]/70 border border-white/10 hover:border-[#B62825]/40 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 group-hover:border-[#B62825]/50 group-hover:bg-[#B62825]/15 group-hover:text-[#B62825] transition-all">
                    <Warehouse className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-heading text-white">Warehouse</h4>
                  <p className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider mt-1">
                    Handling &amp; Storage
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Sheltered staging, pallet inventory segregation, weatherproofing, and safe transitional storage management.
                  </p>
                  {/* Subtle red vertical separator on desktop */}
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-gradient-to-b from-transparent via-[#B62825]/40 to-transparent pointer-events-none" />
                </div>

                {/* Category 3: Ground Team */}
                <div className="relative p-6 rounded-xl bg-[#12141A]/70 border border-white/10 hover:border-[#B62825]/40 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 group-hover:border-[#B62825]/50 group-hover:bg-[#B62825]/15 group-hover:text-[#B62825] transition-all">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-heading text-white">Ground Team</h4>
                  <p className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider mt-1">
                    Cargo, Stuffing &amp; Lashing
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Forklift loading, ocean container stuffing, dunnage placement, and certified heavy polyester strapping.
                  </p>
                  {/* Subtle red vertical separator on desktop */}
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-gradient-to-b from-transparent via-[#B62825]/40 to-transparent pointer-events-none" />
                </div>

                {/* Category 4: Support */}
                <div className="relative p-6 rounded-xl bg-[#12141A]/70 border border-white/10 hover:border-[#B62825]/40 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 group-hover:border-[#B62825]/50 group-hover:bg-[#B62825]/15 group-hover:text-[#B62825] transition-all">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold font-heading text-white">Support</h4>
                  <p className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider mt-1">
                    Coordination &amp; Client Service
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
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
      <section className="py-16 sm:py-20 bg-[#0B0B0D] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Professional Philosophy */}
            <ScrollReveal direction="left" delay={50} className="lg:col-span-7 h-full">
              <div className="p-8 sm:p-10 rounded-2xl bg-[#12141A] border border-white/10 shadow-xl space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B62825]/10 border border-[#B62825]/40 text-[#B62825] text-xs font-mono font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    <span>WORKFORCE PHILOSOPHY</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                    Skilled Execution in Dynamic Port Environments
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
                    Our people are skilled and professional in their work, playing an important role in delivering services and solutions to our clients. We strive to remain responsive to changing market conditions and evolving client requirements.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-body">
                    Every export crating assignment, heavy machinery lashing project, and ocean container stuffing operation requires rigorous on-site coordination. Our crews adhere to strict safety protocols, schedule discipline, and certified handling procedures across CFS hubs and client factory premises.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
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
              <div className="p-8 sm:p-10 rounded-2xl bg-[#12141A] border border-white/10 shadow-xl space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                    <Building2 className="w-3.5 h-3.5 text-[#B62825]" />
                    <span>LEADERSHIP</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    Sunil Naresh Kadu
                  </h3>
                  <div className="text-[13px] font-mono font-bold text-[#B62825] uppercase tracking-wider">
                    Proprietor &amp; Founder
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body pt-2">
                    Founded MSK Logistics Solution in May 2019 with a vision for uncompromising cargo handling, container stuffing, and maritime lashing across Nhava Sheva. Under his stewardship, the company maintains strong client relationships, customized protection standards, and schedule adherence.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">FOUNDED:</span>
                    <span className="font-bold text-white">May 2019</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">LOCATION:</span>
                    <span className="font-bold text-white">Navi Mumbai, India</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">OPERATING HUBS:</span>
                    <span className="font-bold text-white">JNPT &amp; CBD Belapur</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">PRIMARY GATEWAY:</span>
                    <span className="font-bold text-[#B62825]">Nhava Sheva Port</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Action Callout Banner */}
          <ScrollReveal direction="up" delay={50}>
            <div className="bg-gradient-to-r from-[#12141A] via-[#1A1D24] to-[#12141A] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-white/10">
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
