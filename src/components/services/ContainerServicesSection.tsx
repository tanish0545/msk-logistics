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
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#050507] text-white border-b border-white/10 relative overflow-hidden" id="core-services">
      {/* Subtle ambient red background radial */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(182,40,37,0.12)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 relative z-10">
        
        {/* Section Header Matching Concept 02 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <ScrollReveal direction="up" className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
              Our Core <span className="text-[#B62825]">Services</span>
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] font-body max-w-2xl">
              Integrated cargo solutions for domestic and international trade.
            </p>
          </ScrollReveal>

          {/* Navigation Controls & Complete Directory Link */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Previous service"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#B62825] border border-white/15 hover:border-[#B62825] flex items-center justify-center text-white transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Next service"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#B62825] border border-white/15 hover:border-[#B62825] flex items-center justify-center text-white transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link
              to="/services"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#D9DEE5] hover:text-[#B62825] ml-2 transition-colors"
            >
              <span>All 5 Services Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 5 Shipping-Container Doors Row Matching Concept 02 */}
        <div
          ref={scrollContainerRef}
          className="grid grid-flow-col auto-cols-[82%] sm:auto-cols-[46%] lg:auto-cols-[calc(20%-13px)] gap-4 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory"
        >
          {CORE_SERVICES.map((service, index) => (
            <div key={service.id} className="snap-start">
              <ContainerServiceDoorCard service={service} index={index} />
            </div>
          ))}
        </div>

        {/* Bottom Operational Note */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B62825]" />
            <span>5 Core Dedicated Services • Exclusively Focused Export Execution</span>
          </div>
          <div>
            <span>Direct CFS Coordination near Punjab &amp; Polaris, JNPT</span>
          </div>
        </div>

      </div>
    </section>
  );
};
