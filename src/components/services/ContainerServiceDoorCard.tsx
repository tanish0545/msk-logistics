import React from 'react';
import { Link } from 'react-router-dom';
import { Ship, Plane, Box, Maximize2, Anchor } from 'lucide-react';
import type { ServiceItem } from '../../data/company';

export interface ContainerServiceDoorCardProps {
  service: ServiceItem;
  index: number;
}

interface ContainerDoorStyle {
  baseColor: string;
  borderColor: string;
  accentColor: string;
  icon: React.ComponentType<{ className?: string }>;
  isoNumber: string;
  hazardStripes?: boolean;
}

const CONTAINER_STYLES: Record<string, ContainerDoorStyle> = {
  'ocean-cargo': {
    baseColor: 'bg-[#0F3D6E]',
    borderColor: 'border-[#1E528E]',
    accentColor: '#38BDF8',
    icon: Ship,
    isoNumber: 'MSKU 492015-8',
  },
  'air-cargo': {
    baseColor: 'bg-[#475569]',
    borderColor: 'border-[#64748B]',
    accentColor: '#E2E8F0',
    icon: Plane,
    isoNumber: 'IATA 729104-2',
  },
  'container-stuffing': {
    baseColor: 'bg-[#9E2220]',
    borderColor: 'border-[#B62825]',
    accentColor: '#FCA5A5',
    icon: Box,
    isoNumber: 'MSKC 810459-0',
  },
  'special-project': {
    baseColor: 'bg-[#18181B]',
    borderColor: 'border-[#27272A]',
    accentColor: '#EAB308',
    icon: Maximize2,
    isoNumber: 'MSKP 993120-6',
    hazardStripes: true,
  },
  'cargo-lashing': {
    baseColor: 'bg-[#7F1D1D]',
    borderColor: 'border-[#991B1B]',
    accentColor: '#F87171',
    icon: Anchor,
    isoNumber: 'MSKL 554318-1',
  },
};

export const ContainerServiceDoorCard: React.FC<ContainerServiceDoorCardProps> = ({
  service,
  index,
}) => {
  const style = CONTAINER_STYLES[service.id] || {
    baseColor: 'bg-[#18181B]',
    borderColor: 'border-[#333333]',
    accentColor: '#B62825',
    icon: Box,
    isoNumber: `MSKU ${100000 + index * 1234}-0`,
  };

  const Icon = style.icon;

  return (
    <Link
      to={`/services#${service.slug}`}
      className="group relative block w-full select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825] rounded-xl"
      aria-label={`View ${service.title} details`}
    >
      <div
        className={`relative h-[380px] sm:h-[400px] w-full rounded-xl ${style.baseColor} border-2 ${style.borderColor} overflow-hidden flex flex-col justify-between p-4 shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_16px_40px_rgba(182,40,37,0.35)] group-hover:border-[#B62825]`}
      >
        {/* Top & Bottom Hazard Stripes (Special Project Cargo) */}
        {style.hazardStripes && (
          <div
            className="absolute top-0 inset-x-0 h-4 z-20 pointer-events-none opacity-90"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, #EAB308, #EAB308 10px, #000000 10px, #000000 20px)',
            }}
          />
        )}
        {style.hazardStripes && (
          <div
            className="absolute bottom-0 inset-x-0 h-4 z-20 pointer-events-none opacity-90"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, #EAB308, #EAB308 10px, #000000 10px, #000000 20px)',
            }}
          />
        )}

        {/* 1. Corner Castings (Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-[#0A0A0C] border-r border-b border-white/20 z-30 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#18181B] border border-white/40" />
        </div>
        <div className="absolute top-0 right-0 w-4 h-4 bg-[#0A0A0C] border-l border-b border-white/20 z-30 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#18181B] border border-white/40" />
        </div>
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-[#0A0A0C] border-r border-t border-white/20 z-30 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#18181B] border border-white/40" />
        </div>
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#0A0A0C] border-l border-t border-white/20 z-30 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#18181B] border border-white/40" />
        </div>

        {/* 2. Realistic Corrugated Ribbing Background Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 8px, rgba(255,255,255,0.08) 8px, rgba(255,255,255,0.08) 16px, rgba(0,0,0,0.45) 16px, rgba(0,0,0,0.45) 24px)',
          }}
          aria-hidden="true"
        />

        {/* 3. Vertical Metal Locking Rods (Two Industrial Steel Rods) */}
        {/* Left Locking Rod */}
        <div className="absolute inset-y-2 left-[28%] w-1.5 bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-500 shadow-md pointer-events-none z-[2] flex flex-col justify-between py-6">
          <div className="w-3.5 h-2.5 -ml-1 bg-neutral-800 border border-neutral-400 rounded-xs" />
          {/* Cam Handle */}
          <div className="w-5 h-2 -ml-2 bg-neutral-300 border border-neutral-700 shadow-sm group-hover:bg-[#B62825] group-hover:border-red-400 transition-colors duration-300" />
          <div className="w-3.5 h-2.5 -ml-1 bg-neutral-800 border border-neutral-400 rounded-xs" />
        </div>

        {/* Right Locking Rod */}
        <div className="absolute inset-y-2 right-[28%] w-1.5 bg-gradient-to-r from-neutral-400 via-neutral-100 to-neutral-500 shadow-md pointer-events-none z-[2] flex flex-col justify-between py-6">
          <div className="w-3.5 h-2.5 -ml-1 bg-neutral-800 border border-neutral-400 rounded-xs" />
          {/* Cam Handle */}
          <div className="w-5 h-2 -ml-2 bg-neutral-300 border border-neutral-700 shadow-sm group-hover:bg-[#B62825] group-hover:border-red-400 transition-colors duration-300" />
          <div className="w-3.5 h-2.5 -ml-1 bg-neutral-800 border border-neutral-400 rounded-xs" />
        </div>

        {/* Top Stencil Row: ISO Container Number */}
        <div className="relative z-10 flex items-center justify-between pt-1">
          <span className="font-mono text-[10px] font-bold text-white/70 tracking-widest uppercase">
            {style.isoNumber}
          </span>
          <span className="font-mono text-[9px] font-bold text-white/50 px-1.5 py-0.5 rounded bg-black/40 border border-white/10 uppercase">
            ISO 9001:2015
          </span>
        </div>

        {/* Middle Content: Clean Icon inside square badge & Title */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto space-y-3 px-2">
          {/* Circular/Square Icon Badge */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-black/60 border border-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-lg group-hover:border-[#B62825] group-hover:scale-110 transition-all duration-300">
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>

          {/* Stencil Service Title & Description with contrast shield */}
          <div className="w-full bg-black/55 backdrop-blur-xs px-2.5 py-2 rounded-lg border border-white/10 shadow-md space-y-1">
            <h3 className="text-base sm:text-lg font-heading font-black text-white tracking-wide leading-tight drop-shadow-md">
              {service.title}
            </h3>
            <p className="text-[11px] font-mono font-medium text-white/80 line-clamp-2">
              {service.shortDescription}
            </p>
          </div>
        </div>

        {/* Bottom Stencil Markings: ISO Payload and Specification Details */}
        <div className="relative z-10 pt-2 border-t border-white/15 space-y-1">
          <div className="grid grid-cols-2 gap-1 text-[9px] font-mono text-white/70 uppercase">
            <div>
              <span className="text-white/40">MAX GROSS:</span> 30,480 KG
            </div>
            <div className="text-right">
              <span className="text-white/40">TARE:</span> 2,230 KG
            </div>
            <div>
              <span className="text-white/40">PAYLOAD:</span> 28,250 KG
            </div>
            <div className="text-right">
              <span className="text-white/40">CUBE:</span> 33.2 CBM
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#B62825] bg-black/60 px-2 py-0.5 rounded border border-[#B62825]/40 group-hover:bg-[#B62825] group-hover:text-white transition-colors uppercase">
              View Scope &rarr;
            </span>
            <span className="text-[9px] font-mono text-white/40">
              DISCIPLINE 0{index + 1}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

