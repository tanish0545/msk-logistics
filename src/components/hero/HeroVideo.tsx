import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, ShieldCheck, Box, Anchor } from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/company';
import { HeroVideoSequence } from './HeroVideoSequence';

export const HeroVideo: React.FC = () => {
  return (
    <section className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center bg-[#222222] overflow-hidden">
      {/* Background Continuous Sequential Video Player */}
      <div className="absolute inset-0 z-0">
        <HeroVideoSequence posterSrc="/images/general/logistics-hero-poster.webp" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Customer-Facing Focus Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[12.5px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
            <span className="text-white/95 tracking-wide">
              Export Logistics & Cargo Securing • Nhava Sheva (JNPT)
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08] font-heading">
            Export Packing.{' '}
            <span className="text-white/90">Container Stuffing.</span>{' '}
            <span className="text-[#B62825]">Cargo Securing.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl text-neutral-200 leading-relaxed max-w-2xl font-body">
            {COMPANY_DETAILS.headlineCopy}
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link 
              to="/request-quote" 
              className="btn-primary text-center py-3.5 px-7 text-[15px]"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link 
              to="/services" 
              className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-md text-[15px] font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Explore Our Services</span>
              <ArrowDown className="w-4 h-4" />
            </Link>
          </div>

          {/* Technical Highlights Bar */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/15 text-neutral-300 font-mono-code text-[12px]">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-[#B62825] shrink-0" />
              <span>Export Crating & Barrier Prep</span>
            </div>
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4 text-[#B62825] shrink-0" />
              <span>Weight-Balanced Container Stuffing</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B62825] shrink-0" />
              <span>Heavy Ratchet & Timber Lashing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
