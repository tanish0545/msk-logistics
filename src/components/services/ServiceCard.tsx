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

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  // Determine direction: Col 1 from left, Col 2 from up/center, Col 3 from right
  const direction: RevealDirection = index % 3 === 0 ? 'left' : index % 3 === 1 ? 'up' : 'right';
  const delay = (index % 3) * 120;

  return (
    <ScrollReveal direction={direction} delay={delay} className="h-full">
      <div className="group h-full bg-white rounded-xl border border-[#E2E2E2] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_16px_32px_-8px_rgba(182,40,37,0.14),0_4px_12px_-2px_rgba(0,0,0,0.05)] hover:border-[#B62825]/50 hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-[#B62825] focus-within:ring-offset-2 relative motion-reduce:transform-none motion-reduce:transition-none">

      {/* Top subtle MSK-red animated accent line on hover */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 bg-[#B62825] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20 motion-reduce:hidden" 
        aria-hidden="true"
      />

      {/* Image with Tag Overlay */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-100">
        <BrandedImage 
          src={service.image} 
          alt={service.title} 
          aspectRatio="h-full w-full"
          imageClassName="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
        />
        <div className="absolute top-3 left-3 bg-[#343434]/90 backdrop-blur-sm text-white text-[11px] font-mono px-2.5 py-1 rounded z-10 shadow-xs">
          {service.tag}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="text-[12px] font-mono-code text-[#B62825] font-semibold tracking-wider uppercase">
            Capability 0{index + 1}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#343434] group-hover:text-[#B62825] transition-colors duration-200 font-heading">
            {service.title}
          </h3>

          <p className="text-[14px] text-[#666666] leading-relaxed font-body">
            {service.shortDescription}
          </p>

          {/* Quick Key Activities Highlights */}
          <div className="pt-2 border-t border-[#E2E2E2] space-y-2">
            {service.keyActivities.slice(0, 3).map((act, i) => (
              <div key={i} className="flex items-start gap-2 text-[13px] text-[#343434]">
                <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Link */}
        <div className="pt-6 mt-6 border-t border-[#E2E2E2] flex items-center justify-between">
          <Link 
            to={`/services/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#B62825] hover:text-[#9E2220] transition-colors focus:outline-none"
          >
            <span>View Service Details</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 motion-reduce:transform-none" />
          </Link>
          <span className="text-[11px] font-mono-code text-neutral-400">
            JNPT CORRIDOR
          </span>
        </div>
      </div>
    </div>
    </ScrollReveal>
  );
};
