import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CORE_SERVICES } from '../../data/company';
import { ContainerServiceDoorCard } from './ContainerServiceDoorCard';
import { ScrollReveal } from '../common/ScrollReveal';

export const ContainerServicesSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="py-24 sm:py-28 lg:py-32 bg-[#0B0B0D] text-white border-b border-white/10 relative overflow-hidden" 
      id="core-services"
      aria-label="Core Services Section"
    >
      {/* Subtle ambient red background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(182,40,37,0.12)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14 relative z-10">

        {/* Section Header: Aligned heading and service directory control with generous spacing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <ScrollReveal direction="up" className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-[#B62825] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B62825] animate-pulse" />
              <span>Dedicated Logistics Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
              Our Core <span className="text-[#B62825]">Services</span>
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] font-body max-w-2xl leading-relaxed">
              Integrated cargo solutions for domestic and international trade operating through Nhava Sheva (JNPT) and western shipping gateways.
            </p>
          </ScrollReveal>

          {/* Controls: Scroll arrows (on mobile/tablet) & Directory link */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Previous service"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#B62825] border border-white/15 hover:border-[#B62825] flex items-center justify-center text-white transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Next service"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#B62825] border border-white/15 hover:border-[#B62825] flex items-center justify-center text-white transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#B62825] border border-white/15 hover:border-[#B62825] text-xs font-mono font-bold text-white transition-all shadow-sm group whitespace-nowrap"
            >
              <span>All 6 Services Directory</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 
          Six Vertical Container Cards:
          - Desktop (lg: 1024px+): Exact 6-column grid with equal width and height, NO horizontal overflow
          - Tablet & Mobile: Smooth horizontal touch scroll with snap alignment
        */}
        <div
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-6 gap-3.5 sm:gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 pt-1 scrollbar-none snap-x snap-mandatory"
        >
          {CORE_SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className="w-[74vw] max-w-[270px] sm:w-[44vw] sm:max-w-[320px] lg:w-auto shrink-0 lg:shrink snap-start h-full"
            >
              <ContainerServiceDoorCard service={service} index={index} />
            </div>
          ))}
        </div>

        {/* Bottom Operational Note */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-mono text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B62825]" />
            <span>6 Core Dedicated Services • Exclusively Focused Export Execution</span>
          </div>
          <div>
            <span>Direct CFS Coordination near Punjab &amp; Polaris, JNPT</span>
          </div>
        </div>

      </div>
    </section>
  );
};
