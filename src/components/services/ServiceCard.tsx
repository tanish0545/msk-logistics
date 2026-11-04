import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { ServiceItem } from '../../data/company';
import { BrandedImage } from '../common/BrandedImage';
import { ScrollReveal, type RevealDirection } from '../common/ScrollReveal';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

// Map each service to an ISO container-style operational spec code
const SERVICE_ISO_CODES: Record<string, { iso: string; payload: string; tare: string }> = {
  'ocean-cargo': { iso: 'ISO 22G1 / FCL', payload: 'NET: 28,240 KG', tare: 'TARE: 2,200 KG' },
  'air-cargo': { iso: 'IATA / AIR ULD', payload: 'NET: 6,800 KG', tare: 'TARE: 120 KG' },
  'container-stuffing': { iso: 'ISO 45G1 / HC', payload: 'NET: 28,600 KG', tare: 'TARE: 3,900 KG' },
  'special-project': { iso: 'ISO 45P3 / ODC', payload: 'NET: 40,000+ KG', tare: 'TARE: 5,200 KG' },
  'cargo-lashing': { iso: 'IMO / CSS CODE', payload: 'TENSILE: 5,000 KG', tare: 'ISPM-15 CHOCK' },
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const direction: RevealDirection = index % 3 === 0 ? 'left' : index % 3 === 1 ? 'up' : 'right';
  const delay = (index % 3) * 120;
  const spec = SERVICE_ISO_CODES[service.id] || { iso: 'ISO 9001:2015', payload: 'VERIFIED', tare: 'ISPM-15' };

  return (
    <ScrollReveal direction={direction} delay={delay} className="h-full">
      <div className="group h-full bg-white rounded-2xl border-2 border-[#E2E8F0] hover:border-[#B62825] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_35px_-8px_rgba(182,40,37,0.18)] hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-[#B62825] focus-within:ring-offset-2 relative select-none motion-reduce:transform-none motion-reduce:transition-none">

        {/* 1. Structural Corner Castings (Top-Left & Top-Right) */}
        <div className="absolute top-0 left-0 w-3.5 h-3 bg-[#1E222A] border-r border-b border-[#374151] z-20 flex items-center justify-center">
          <div className="w-1.5 h-1 rounded-full bg-[#0D0F14] border border-[#4B5563]" />
        </div>
        <div className="absolute top-0 right-0 w-3.5 h-3 bg-[#1E222A] border-l border-b border-[#374151] z-20 flex items-center justify-center">
          <div className="w-1.5 h-1 rounded-full bg-[#0D0F14] border border-[#4B5563]" />
        </div>

        {/* 2. Top MSK Red Industrial Container Bar */}
        <div className="relative h-2 bg-[#B62825] border-b border-[#871816] flex items-center justify-between px-6 z-10">
          <span className="w-1 h-1 rounded-full bg-white/60" />
          <span className="w-1 h-1 rounded-full bg-white/60" />
          <span className="w-1 h-1 rounded-full bg-white/60" />
        </div>

        <div>
          {/* 3. Image with Corrugated Border & Tags */}
          <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-900">
            <BrandedImage 
              src={service.image} 
              alt={service.title} 
              priority={true}
              aspectRatio="h-full w-full"
              imageClassName="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
            />

            {/* Subtle Corrugated Rib Accent Pattern along Image Bottom */}
            <div
              className="absolute inset-x-0 bottom-0 h-2 pointer-events-none opacity-40 z-10"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 3px, transparent 3px, transparent 8px)',
              }}
              aria-hidden="true"
            />

            {/* Industrial Overlay Badge */}
            <div className="absolute top-3 left-4 z-10 flex items-center gap-2">
              <span className="bg-[#000000]/85 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded border border-white/20 shadow-md">
                {service.tag}
              </span>
            </div>

            {/* ISO Stencil Code */}
            <div className="absolute top-3 right-4 z-10">
              <span className="bg-[#B62825]/90 backdrop-blur-md text-white text-[9.5px] font-mono font-bold px-2 py-0.5 rounded shadow">
                {spec.iso}
              </span>
            </div>
          </div>

          {/* 4. Card Content */}
          <div className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-mono font-bold text-[#B62825] tracking-widest uppercase">
                DISCIPLINE 0{index + 1}
              </div>
              <div className="text-[10px] font-mono text-neutral-400">
                {spec.payload}
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B] group-hover:text-[#B62825] transition-colors duration-200 font-heading">
              {service.title}
            </h3>

            <p className="text-[14px] text-[#64748B] leading-relaxed font-body">
              {service.shortDescription}
            </p>

            {/* Key Activities List */}
            <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 mb-1">
                Standard Execution Scope:
              </div>
              {service.keyActivities.slice(0, 3).map((act, i) => (
                <div key={i} className="flex items-start gap-2 text-[13px] text-[#334155]">
                  <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{act}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Footer Link & Corner Castings (Bottom-Left & Bottom-Right) */}
        <div className="relative p-6 pt-4 mt-2 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between z-10">
          {/* Bottom Corner Castings */}
          <div className="absolute bottom-0 left-0 w-3.5 h-3 bg-[#1E222A] border-r border-t border-[#374151] flex items-center justify-center">
            <div className="w-1.5 h-1 rounded-full bg-[#0D0F14] border border-[#4B5563]" />
          </div>
          <div className="absolute bottom-0 right-0 w-3.5 h-3 bg-[#1E222A] border-l border-t border-[#374151] flex items-center justify-center">
            <div className="w-1.5 h-1 rounded-full bg-[#0D0F14] border border-[#4B5563]" />
          </div>

          <Link 
            to={`/services/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#B62825] hover:text-[#9E2220] transition-colors focus:outline-none pl-1"
          >
            <span>View Specifications</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 motion-reduce:transform-none" />
          </Link>

          <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider pr-1">
            {spec.tare}
          </span>
        </div>
      </div>
    </ScrollReveal>
  );
};
