import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Ship, 
  Plane, 
  Box, 
  Maximize2, 
  Anchor, 
  AlertTriangle, 
  ArrowRight 
} from 'lucide-react';
import type { ServiceItem } from '../../data/company';

export interface ContainerServiceDoorCardProps {
  service: ServiceItem;
  index: number;
}

const CONTAINER_DOOR_IMAGES: Record<string, string> = {
  'ocean-cargo': '/images/services/container-cards/ocean-cargo-blue-doors.jpg',
  'air-cargo': '/images/services/container-cards/air-cargo-white-doors.jpg',
  'container-stuffing': '/images/services/container-cards/container-stuffing-closed-doors.jpg',
  'special-project': '/images/services/container-cards/special-project-weathered-doors.jpg',
  'cargo-lashing': '/images/services/container-cards/cargo-lashing-red-doors.jpg',
  'hazardous-cargo': '/images/services/container-cards/hazardous-cargo-green-doors.jpg',
};

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'ocean-cargo': Ship,
  'air-cargo': Plane,
  'container-stuffing': Box,
  'special-project': Maximize2,
  'cargo-lashing': Anchor,
  'hazardous-cargo': AlertTriangle,
};

export const ContainerServiceDoorCard: React.FC<ContainerServiceDoorCardProps> = ({
  service,
  index,
}) => {
  const Icon = SERVICE_ICONS[service.id] || Box;
  const doorImage = CONTAINER_DOOR_IMAGES[service.id] || service.image;

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group/card relative block w-full select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825] rounded-2xl"
      aria-label={`Explore ${service.title} details`}
    >
      {/* Extended hit-area prevents hover flickering on card translation */}
      <span className="absolute -bottom-2 inset-x-0 h-2 pointer-events-auto" aria-hidden="true" />
      {/* 
        Refined Card Aspect Ratio ~0.625 (10/16):
        Consistent width-to-height ratio, equal dimensions across all 6 cards
      */}
      <div className="relative w-full aspect-[10/16] rounded-2xl overflow-hidden bg-[#0D0F14] border border-white/10 group-hover/card:border-[#B62825]/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group-hover/card:shadow-[0_8px_30px_rgba(182,40,37,0.25)] transition-all duration-300 ease-out group-hover/card:-translate-y-1.5 flex flex-col justify-between p-3 sm:p-3.5 transform-gpu will-change-transform backface-hidden">
        
        {/* Photorealistic Closed Container Door Background Image */}
        <img
          src={doorImage}
          alt={`${service.title} shipping container doors`}
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover/card:scale-[1.03] motion-reduce:transform-none"
        />

        {/* Soft Ambient Vignettes: Kept very light so corrugated metal & locking bars remain visible */}
        <div 
          className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" 
          aria-hidden="true" 
        />
        <div 
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/45 via-black/15 to-transparent pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Top Header: Subtle glassmorphism badge with service number & service icon */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="font-mono text-[10px] font-bold text-white/95 bg-black/25 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/15 tracking-widest flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
            <span>0{index + 1}</span>
          </span>

          <div className="w-7 h-7 rounded-lg bg-black/25 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/90 shadow-sm group-hover/card:border-[#B62825] group-hover/card:text-[#B62825] transition-colors">
            <Icon className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Bottom Content Group: Liquid Glass Panel + Separate Red Explore Button */}
        <div className="relative z-10 mt-auto flex flex-col">
          
          {/* 
            ELEGANT LIQUID GLASS / GLASSMORPHISM PANEL:
            - Semi-transparent smoked-glass background (~18-22% opacity)
            - 14px-16px backdrop blur
            - Subtle translucent white border + gentle inner highlight
            - Container doors and locking bars remain genuinely visible through the glass
          */}
          <div className="liquid-glass rounded-xl p-2.5 sm:p-3 bg-black/20 sm:bg-black/18 backdrop-blur-[14px] sm:backdrop-blur-[16px] border border-white/20 group-hover/card:border-[#B62825]/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_rgba(255,255,255,0.22)] group-hover/card:shadow-[0_8px_25px_rgba(182,40,37,0.25),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-300 ease-out space-y-1">
            {/* Service Title: Uniform height, wraps up to 2 lines cleanly without clipping */}
            <div className="h-8 sm:h-9 flex items-center">
              <h3 className="text-xs sm:text-[12.5px] font-heading font-bold text-white tracking-tight leading-tight line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] group-hover/card:text-red-200 transition-colors">
                {service.title}
              </h3>
            </div>

            {/* Description: strictly limited to two lines */}
            <p className="text-[10px] sm:text-[10.5px] font-body text-[#D9DEE5]/90 line-clamp-2 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] h-7 sm:h-8">
              {service.shortDescription}
            </p>
          </div>

          {/* 
            SEPARATE STANDALONE RED EXPLORE SERVICE BUTTON:
            - Kept completely distinct from the glass text panel (not one solid block)
            - MSK Red background, single-line text, right-aligned arrow
          */}
          <div className="mt-2 sm:mt-2.5">
            <span className="w-full h-7 sm:h-8 inline-flex items-center justify-between px-2.5 sm:px-3 rounded-lg bg-[#B62825] group-hover/card:bg-[#9E2220] text-white text-[10.5px] sm:text-[11px] font-heading font-bold tracking-wide whitespace-nowrap shadow-md group-hover/card:shadow-[0_4px_16px_rgba(182,40,37,0.5)] transition-all duration-200">
              <span>Explore Service</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1.5 transition-transform duration-200 group-hover/card:translate-x-1 motion-reduce:transform-none" />
            </span>
          </div>

        </div>

      </div>
    </Link>
  );
};
