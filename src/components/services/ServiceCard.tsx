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

const SERVICE_GATEWAY_LABELS: Record<string, string> = {
  'ocean-cargo': 'JNPT Gateway',
  'air-cargo': 'BOM Air Cargo',
  'container-stuffing': 'Punjab & Polaris CFS',
  'special-project': 'Nhava Sheva & Mundra',
  'cargo-lashing': 'Certified Securing',
  'hazardous-cargo': 'IMDG / IATA DGR',
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const direction: RevealDirection = index % 3 === 0 ? 'left' : index % 3 === 1 ? 'up' : 'right';
  const delay = (index % 3) * 120;
  const gateway = SERVICE_GATEWAY_LABELS[service.id] || 'Nhava Sheva & Mundra';

  return (
    <ScrollReveal direction={direction} delay={delay} className="h-full">
      <div className="group h-full bg-white rounded-2xl border-2 border-[#E2E8F0] hover:border-[#B62825] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_35px_-8px_rgba(182,40,37,0.18)] hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-[#B62825] focus-within:ring-offset-2 relative select-none motion-reduce:transform-none motion-reduce:transition-none">

        <div>
          {/* Large Photographic Image with Natural Proportions */}
          <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-900">
            <BrandedImage 
              src={service.image} 
              alt={service.title} 
              priority={true}
              aspectRatio="h-full w-full"
              imageClassName="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
            />

            {/* Industrial Overlay Badge */}
            <div className="absolute top-3 left-4 z-10 flex items-center gap-2">
              <span className="bg-[#000000]/85 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded border border-white/20 shadow-md">
                {service.tag}
              </span>
            </div>

            {/* Gateway Tag */}
            <div className="absolute top-3 right-4 z-10">
              <span className="bg-[#B62825]/90 backdrop-blur-md text-white text-[9.5px] font-mono font-bold px-2 py-0.5 rounded shadow">
                {gateway}
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-mono font-bold text-[#B62825] tracking-widest uppercase">
                DISCIPLINE 0{index + 1}
              </div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                ISO 9001:2015 CERTIFIED
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

        {/* Card Footer Link */}
        <div className="relative p-6 pt-4 mt-2 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between z-10">
          <Link 
            to={`/services/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#B62825] hover:text-[#9E2220] transition-colors focus:outline-none pl-1"
          >
            <span>View Specifications</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 motion-reduce:transform-none" />
          </Link>

          <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider pr-1">
            MSK LOGISTICS
          </span>
        </div>
      </div>
    </ScrollReveal>
  );
};
