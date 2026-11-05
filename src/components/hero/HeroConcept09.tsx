import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Anchor,
  MapPin,
  Calendar,
  Clock,
  Layers
} from 'lucide-react';
import { CircularCertificationMark } from '../common/CircularCertificationMark';

export const HeroConcept09: React.FC = () => {
  const handleScrollToIntro = () => {
    const target = document.getElementById('company-intro');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      aria-label="MSK Logistics — Beyond Logistics, We Deliver Trust"
      className="relative w-full min-h-[520px] sm:min-h-[560px] lg:h-[650px] xl:h-[670px] 2xl:h-[700px] bg-[#000000] text-white overflow-hidden border-b border-white/10 select-none flex flex-col justify-between"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC PORT ENVIRONMENT BACKGROUND (One Complete Image Asset)       */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Full-bleed cinematic logistics-port master image: clean universal object-position, no transform hacks */}
        <img
          src="/images/hero/msk-cinematic-port-final.png"
          alt="MSK Logistics International Multimodal Port Operations"
          className="w-full h-full object-cover object-[78%_20%] sm:object-[78%_28%] lg:object-[50%_57%] lg:translate-x-[2.5%] opacity-100"
          loading="eager"
          decoding="sync"
        />

        {/* Directional Left-to-Right Dark Wash: scoped to text column for razor-sharp headline contrast */}
        <div
          className="absolute inset-0 hidden lg:block pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.60) 32%, rgba(0,0,0,0.25) 42%, transparent 52%)',
          }}
        />

        {/* Mobile / Tablet Vertical Legibility Wash: preserves vehicle visibility while maintaining text contrast */}
        <div
          className="absolute inset-0 lg:hidden pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.8) 100%)',
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. FOREGROUND HERO CONTENT (Two-Column Desktop, Integrated Mobile)        */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[2280px] 4xl:max-w-[3200px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-6 sm:pt-7 lg:pt-8 xl:pt-9 pb-4 sm:pb-5 lg:pb-5 xl:pb-6 flex-1 flex flex-col justify-between">

        {/* Main Grid: Left Typography vs Right Port Environment Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center flex-1">

          {/* ------------------------------------------------------------- */}
          {/* LEFT SIDE: Hero Typography & Call-To-Actions (5 cols)         */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-3 sm:space-y-3.5 max-w-lg lg:max-w-[490px] xl:max-w-[530px] text-left z-20">

            {/* Eyebrow Label with Industrial Multimodal Code */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#B62825] shadow-[0_0_10px_#B62825] animate-pulse" />
              <span className="font-mono text-xs sm:text-[12.5px] font-bold tracking-[0.2em] text-[#D9DEE5] uppercase">
                OCEAN • AIR • PROJECT • LASHING
              </span>
            </div>

            {/* Bold Headline with MSK Crimson Accent on "Trust." (Strictly 2 lines on desktop) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[3.15rem] 2xl:text-[3.6rem] font-bold text-white tracking-tight leading-[1.08] font-heading">
              Beyond Logistics{' '}<br className="hidden sm:inline" />
              We Deliver{' '}
              <span className="text-[#B62825] drop-shadow-[0_2px_22px_rgba(182,40,37,0.55)]">
                Trust.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-[13.5px] sm:text-base lg:text-[15px] xl:text-[16.5px] text-[#AEB6C2] font-body leading-relaxed max-w-xl">
              End-to-end cargo solutions with precision, safety and on-time execution. Specialized export packing, container stuffing, cargo lashing, warehousing and heavy project cargo solutions.
            </p>

            {/* Dual Action CTAs */}
            <div className="pt-1.5 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5">
              {/* Primary CTA: Request a Quote */}
              <Link
                to="/request-quote"
                className="group relative inline-flex items-center justify-center gap-2.5 py-3 px-6 sm:px-7 rounded-xl text-sm sm:text-base font-semibold text-white bg-[#B62825] hover:bg-[#9E2220] transition-all duration-200 shadow-lg shadow-[#B62825]/30 hover:shadow-xl hover:shadow-[#B62825]/50 hover:-translate-y-0.5 active:translate-y-0 border border-[#B62825] shrink-0"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-1.5" />
              </Link>

              {/* Secondary CTA: Explore Services */}
              <Link
                to="/services"
                className="group relative inline-flex items-center justify-center gap-2 py-3 px-5 sm:px-6 rounded-xl text-sm sm:text-base font-medium text-[#F4F5F7] bg-[#000000]/90 hover:bg-[#0B0B0D] hover:text-white backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shrink-0"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-[#D9DEE5] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Quick Port Gateway Credibility Tag */}
            <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono bg-black/60 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none px-2.5 py-1 sm:p-0 rounded-lg sm:rounded-none border border-white/10 sm:border-0 w-fit">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B62825]" />
                <span className="text-[#D9DEE5] sm:text-[#8E9BAE]">Nhava Sheva (JNPT) &amp; Mundra</span>
              </div>
              <span className="hidden sm:inline text-[#8E9BAE]">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[#D9DEE5] sm:text-[#8E9BAE]">24×7 Operations Desk</span>
              </div>
            </div>

          </div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT SIDE: CLEAN CINEMATIC PORT PERSPECTIVE (6/7 cols)       */}
          {/* Transparent container showcasing the authentic port scene     */}
          {/* ------------------------------------------------------------- */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 items-center justify-end z-10 w-full min-h-[140px]" />

        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM SECTION: ILLUMINATED RED ROUTE LINE & INFORMATION BAR           */}
        {/* ========================================================================= */}
        <div className="pt-2 sm:pt-3 lg:pt-3 space-y-2 sm:space-y-2.5 w-full z-20">

          {/* Horizontal Illuminated Crimson Route Line with Integrated Scroll Indicator */}
          <div className="relative w-full flex items-center justify-center my-0 sm:my-0.5">
            {/* Left laser line with glowing waypoint dot */}
            <div className="relative flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#B62825] to-[#EF4444] shadow-[0_0_8px_#B62825]">
              <span className="absolute right-12 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-[#B62825] shadow-[0_0_8px_#EF4444]" />
            </div>

            {/* Central Interactive Scroll Indicator Node */}
            <button
              type="button"
              onClick={handleScrollToIntro}
              aria-label="Scroll to company introduction"
              className="group mx-3 sm:mx-4 flex flex-col items-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825] rounded-full p-1 transition-all duration-300 hover:scale-105 active:scale-95 z-20 shrink-0"
            >
              <div className="w-5 h-7 rounded-full border border-white/60 group-hover:border-[#EF4444] flex items-start justify-center p-1 bg-black/70 backdrop-blur-md shadow-[0_0_12px_rgba(182,40,37,0.5)] transition-all">
                <div className="w-1 h-2 rounded-full bg-[#EF4444] shadow-[0_0_6px_#EF4444] animate-bounce" />
              </div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#D9DEE5] group-hover:text-white transition-colors">
                SCROLL
              </span>
            </button>

            {/* Right laser line with glowing waypoint dot */}
            <div className="relative flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#B62825] to-[#EF4444] shadow-[0_0_8px_#B62825]">
              <span className="absolute left-12 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white border border-[#B62825] shadow-[0_0_8px_#EF4444]" />
            </div>
          </div>

          {/* Compact Premium Information Highlights Bar (Concept 09) */}
          <div className="w-full lg:max-w-[calc(100%-200px)] xl:max-w-[calc(100%-210px)] 2xl:max-w-[calc(100%-130px)] bg-[#000000]/95 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.8)] py-2 sm:py-2.5 px-4 sm:px-6 lg:px-7">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 items-center">

              {/* Highlight 1: Since 2019 */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0B0B0D] border border-white/10 flex items-center justify-center text-[#B62825] shrink-0">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                    ESTABLISHED
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white font-heading truncate">
                    Since 2019
                  </div>
                </div>
              </div>

              {/* Highlight 2: Cargo Handling */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0B0B0D] border border-white/10 flex items-center justify-center text-[#B62825] shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                    CORE EXPERTISE
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white font-heading truncate">
                    Cargo Handling
                  </div>
                </div>
              </div>

              {/* Highlight 3: Nhava Sheva & Mundra */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0B0B0D] border border-white/10 flex items-center justify-center text-[#B62825] shrink-0">
                  <Anchor className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                    GATEWAYS
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white font-heading truncate">
                    Nhava Sheva &amp; Mundra
                  </div>
                </div>
              </div>

              {/* Highlight 4: Logistics Solutions */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0B0B0D] border border-white/10 flex items-center justify-center text-[#B62825] shrink-0">
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#94A3B8]">
                    SERVICE SCOPE
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white font-heading truncate">
                    Logistics Solutions
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Mobile ISO 9001:2015 Indicator Row */}
          <div className="flex lg:hidden items-center justify-end w-full pt-1 px-1">
            <CircularCertificationMark className="scale-85 origin-right" />
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. DESKTOP CIRCULAR ISO 9001:2015 BADGE (Bottom-Right, Clear of Chatbot)  */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex absolute bottom-3 xl:bottom-4 right-24 lg:right-24 xl:right-28 2xl:right-8 z-30 select-none pointer-events-auto items-center justify-center">
        <CircularCertificationMark />
      </div>

      {/* Bottom Hairline Metallic Edge */}
      <div
        className="absolute bottom-0 inset-x-0 h-[1px] pointer-events-none bg-gradient-to-r from-transparent via-[#D9DEE5]/25 to-transparent z-20"
        aria-hidden="true"
      />
    </section>
  );
};
