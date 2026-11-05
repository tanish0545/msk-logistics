import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Ship, 
  Plane, 
  Box, 
  Layers, 
  Link2, 
  AlertTriangle, 
  ArrowRight
} from 'lucide-react';
import { CartingDropdownSection } from './CartingDropdownSection';

export interface ContainerServiceItem {
  readonly id: string;
  readonly name: string;
  readonly shortLabel: string;
  readonly description: string;
  readonly path: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly image: string;
  readonly badgeText: string;
}

const CONTAINER_SERVICES: readonly ContainerServiceItem[] = [
  {
    id: 'ocean-cargo',
    name: 'Ocean Cargo',
    shortLabel: 'Ocean Freight',
    description: 'FCL dedicated container shipping & consolidated maritime freight across global port corridors.',
    path: '/services/ocean-cargo',
    icon: Ship,
    image: '/images/import-export/fcl-dedicated-shipping.webp',
    badgeText: 'FCL / LCL',
  },
  {
    id: 'air-cargo',
    name: 'Air Cargo',
    shortLabel: 'Air Freight',
    description: 'Priority express air freight and customs clearance with scheduled international flight departures.',
    path: '/services/air-cargo',
    icon: Plane,
    image: '/images/services/air-cargo.png',
    badgeText: 'Priority Air',
  },
  {
    id: 'container-stuffing',
    name: 'Container Stuffing Logistics',
    shortLabel: 'Container Stuffing',
    description: 'Certified cargo stuffing, de-stuffing, weight balance & container yard terminal preparation.',
    path: '/services/container-stuffing',
    icon: Box,
    image: '/images/services/container-stuffing.webp',
    badgeText: 'Stuffing Ops',
  },
  {
    id: 'special-project',
    name: 'Special Project Cargo Handling',
    shortLabel: 'Project Cargo',
    description: 'Heavy-lift crane hoisting, over-dimensional cargo (ODC) & break-bulk specialized transport.',
    path: '/services/special-project',
    icon: Layers,
    image: '/images/shipments/break-bulk/breakbulk-night-crane-qc04-hoist.jpg',
    badgeText: 'Heavy-Lift ODC',
  },
  {
    id: 'cargo-lashing',
    name: 'Cargo Lashing',
    shortLabel: 'Cargo Securing',
    description: 'Turnkey marine chocking, high-tensile steel strapping & certified seaworthy lashing.',
    path: '/services/cargo-lashing',
    icon: Link2,
    image: '/images/services/cargo-lashing.webp',
    badgeText: 'Marine Securing',
  },
  {
    id: 'hazardous-cargo',
    name: 'Hazardous Cargo',
    shortLabel: 'Dangerous Goods (DGR)',
    description: 'Certified Class 1–9 dangerous goods packing, UN-spec packaging & IMDG segregation compliance.',
    path: '/services/hazardous-cargo',
    icon: AlertTriangle,
    image: '/images/hazardous/un3265-corrosive-class-8-drums.jpg',
    badgeText: 'Class 1-9 DGR',
  },
] as const;

interface Services3DContainerDropdownProps {
  onClose: () => void;
}

/**
 * MSK LOGISTICS — PREMIUM 3D SERVICES DROPDOWN V2
 * 
 * Features:
 * 1. Physically convincing 3D shipping container frame with Cor-Ten red steel, ISO corner castings & bevels.
 * 2. Realistic open double cargo doors with corrugated steel ridges, galvanized locking bars & industrial hinges.
 * 3. Atmospheric red ambient underglow with recessed cargo bay depth lighting.
 * 4. Clean 3-column × 2-row service card layout with authentic imagery, bold legible typography & smooth hover lift.
 * 5. Integrated right-side Specialized Services panel featuring the exact Carting hierarchy (Speedy, Punjab, Polaris).
 * 6. Full keyboard (Escape), outside click, and touchscreen interaction support.
 */
export const Services3DContainerDropdown: React.FC<Services3DContainerDropdownProps> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Close on click outside the dropdown panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      className="bg-[#0B0D13] text-[#D9DEE5] rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] border border-[#222834] overflow-hidden text-left flex flex-col lg:flex-row w-[1020px] max-w-[calc(100vw-2rem)] select-none transition-all duration-300"
      role="menu"
      aria-label="MSK Logistics 3D Services Menu"
      tabIndex={-1}
    >
      {/* ========================================================================= */}
      {/* MAIN CONTAINER AREA — Realistic 3D Open Shipping Container Bay            */}
      {/* ========================================================================= */}
      <div className="relative flex-1 p-3.5 sm:p-5 bg-gradient-to-b from-[#111620] via-[#0B0E14] to-[#07090D] flex flex-col justify-center overflow-hidden">
        
        {/* Subtle Ambient Red Atmospheric Illumination */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(182,40,37,0.22) 0%, rgba(182,40,37,0.06) 50%, transparent 75%)',
          }}
          aria-hidden="true"
        />

        {/* 3D Perspective Container Frame */}
        <div className="relative w-full [perspective:1400px]">
          
          {/* Container Outer Shell (Cor-Ten Red Steel) */}
          <div className="relative rounded-xl bg-gradient-to-b from-[#8C1B19] via-[#B62825] to-[#6E1210] p-[3px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-t border-[#E53935]/70 border-b border-[#3E0908]">
            
            {/* Corner Castings (ISO 1161 Steel Blocks) */}
            {/* Top-Left */}
            <div className="absolute -top-2.5 -left-2.5 z-40 w-5.5 h-5.5 rounded-[3px] bg-gradient-to-br from-[#5A6272] via-[#353A47] to-[#1C1F26] border border-[#788296] shadow-[0_2px_6px_rgba(0,0,0,0.6)] flex items-center justify-center">
              <div className="w-3 h-1.5 bg-[#090B0E] rounded-full border border-black/80" />
            </div>
            {/* Top-Right */}
            <div className="absolute -top-2.5 -right-2.5 z-40 w-5.5 h-5.5 rounded-[3px] bg-gradient-to-br from-[#5A6272] via-[#353A47] to-[#1C1F26] border border-[#788296] shadow-[0_2px_6px_rgba(0,0,0,0.6)] flex items-center justify-center">
              <div className="w-3 h-1.5 bg-[#090B0E] rounded-full border border-black/80" />
            </div>
            {/* Bottom-Left */}
            <div className="absolute -bottom-2.5 -left-2.5 z-40 w-5.5 h-5.5 rounded-[3px] bg-gradient-to-br from-[#5A6272] via-[#353A47] to-[#1C1F26] border border-[#788296] shadow-[0_2px_6px_rgba(0,0,0,0.6)] flex items-center justify-center">
              <div className="w-3 h-1.5 bg-[#090B0E] rounded-full border border-black/80" />
            </div>
            {/* Bottom-Right */}
            <div className="absolute -bottom-2.5 -right-2.5 z-40 w-5.5 h-5.5 rounded-[3px] bg-gradient-to-br from-[#5A6272] via-[#353A47] to-[#1C1F26] border border-[#788296] shadow-[0_2px_6px_rgba(0,0,0,0.6)] flex items-center justify-center">
              <div className="w-3 h-1.5 bg-[#090B0E] rounded-full border border-black/80" />
            </div>

            {/* Container Top Header Rail with Stenciled Technical ID */}
            <div className="h-6.5 bg-[#141822] rounded-t-lg border-b border-[#2A3142] flex items-center justify-between px-4 text-[9px] font-mono tracking-wider text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-bold text-slate-200">MSK HIGH-CUBE INTERMODAL BAY</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 font-mono text-[8.5px] text-slate-400">
                <span>ISO 6346: 45G1</span>
                <span className="text-[#B62825] font-bold">MAX PAYLOAD: 28,600 KG</span>
              </div>
            </div>

            {/* Container Open Interior Stage */}
            <div className="relative flex flex-col md:flex-row bg-[#080A0E] overflow-hidden">
              
              {/* =============================================================== */}
              {/* LEFT 3D OPEN CONTAINER DOOR                                     */}
              {/* =============================================================== */}
              <div
                className="hidden xl:flex w-[84px] shrink-0 bg-gradient-to-r from-[#8C1B19] via-[#A82421] to-[#6E1210] border-r-2 border-[#380807] flex-col justify-between p-2 relative shadow-[10px_0_24px_rgba(0,0,0,0.7)] z-20"
                style={{
                  transform: 'rotateY(20deg) scale(0.97)',
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                }}
                aria-hidden="true"
              >
                {/* Corrugated Vertical Rib Texture */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 7px, #000000 7px, #000000 11px, rgba(255,255,255,0.35) 11px, rgba(255,255,255,0.35) 13px)',
                  }}
                />

                {/* 3 Heavy Steel Outer Hinges */}
                <div className="absolute top-4 -left-1.5 w-3 h-5 bg-[#3B4252] rounded-xs border border-gray-400 shadow-md" />
                <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-5 bg-[#3B4252] rounded-xs border border-gray-400 shadow-md" />
                <div className="absolute bottom-4 -left-1.5 w-3 h-5 bg-[#3B4252] rounded-xs border border-gray-400 shadow-md" />

                {/* Dual Vertical Galvanized Steel Locking Bars */}
                <div className="absolute top-0 bottom-0 left-[26px] w-[3.5px] bg-gradient-to-r from-[#94A3B8] via-[#F8FAFC] to-[#64748B] shadow-sm">
                  <div className="absolute top-[42%] -left-1 w-3 h-4 bg-white rounded-xs border border-gray-700 shadow-sm" />
                </div>
                <div className="absolute top-0 bottom-0 left-[44px] w-[3.5px] bg-gradient-to-r from-[#94A3B8] via-[#F8FAFC] to-[#64748B] shadow-sm">
                  <div className="absolute top-[48%] -left-1 w-3 h-4 bg-white rounded-xs border border-gray-700 shadow-sm" />
                </div>

                {/* Top Door Stencil */}
                <div className="relative z-10 font-mono text-[7.5px] font-black text-white/90 tracking-widest uppercase">
                  DOOR 01-L
                </div>

                {/* Center Stencil: Official MSK Brand Emblem */}
                <div className="relative z-10 py-3 text-center">
                  <div className="font-heading font-black text-[13px] tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">
                    MSK
                  </div>
                  <div className="font-mono text-[6.5px] text-white/80 tracking-wider font-semibold uppercase mt-0.5">
                    LOGISTICS
                  </div>
                </div>

                {/* Bottom Door Specification Stencil */}
                <div className="relative z-10 font-mono text-[6.5px] text-white/70 leading-tight space-y-0.5">
                  <div>TARE 3900KG</div>
                  <div>CUBE 76.4M³</div>
                </div>
              </div>

              {/* =============================================================== */}
              {/* RECESSED INTERIOR CARGO BAY — 3x2 SERVICE CARDS                 */}
              {/* =============================================================== */}
              <div className="relative flex-1 p-3 sm:p-4 bg-gradient-to-b from-[#0E1219] via-[#090C11] to-[#06080B] overflow-hidden">
                
                {/* Overhead Industrial Lamp Glows */}
                <div className="absolute top-0 left-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-[#E2E8F0]/40 to-transparent blur-xs pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-[#E2E8F0]/40 to-transparent blur-xs pointer-events-none" />

                {/* 3-Column x 2-Row Interactive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 relative z-10">
                  {CONTAINER_SERVICES.map((service) => {
                    const IconComponent = service.icon;

                    return (
                      <Link
                        key={service.id}
                        to={service.path}
                        onClick={onClose}
                        className="group relative rounded-xl overflow-hidden border border-[#232B3B] bg-[#121620] shadow-[0_6px_16px_rgba(0,0,0,0.45)] hover:border-[#B62825] hover:shadow-[0_12px_28px_-4px_rgba(182,40,37,0.45),0_0_0_1px_rgba(217,56,52,0.6)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[128px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825]"
                      >
                        {/* Background Cargo Image with Deep Protective Gradients */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img
                            src={service.image}
                            alt=""
                            className="w-full h-full object-cover opacity-35 group-hover:opacity-50 group-hover:scale-108 transition-all duration-500 ease-out"
                            loading="lazy"
                          />
                          {/* Multi-stage High-Legibility Gradients */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-[#0B0F17]/85 to-[#0B0F17]/40" />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-200" />
                        </div>

                        {/* Card Content Top: Icon & Badge */}
                        <div className="relative z-10 p-2.5 pb-1 flex items-start justify-between gap-2">
                          {/* Metallic Chrome Icon Badge */}
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2D3546] to-[#151923] border border-[#3E485D] group-hover:border-[#B62825] group-hover:from-[#B62825] group-hover:to-[#8C1B19] shadow-md flex items-center justify-center shrink-0 transition-all duration-200">
                            <IconComponent className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
                          </div>

                          {/* Technical Pill Badge */}
                          <span className="font-mono text-[9px] font-bold text-slate-300 group-hover:text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/10 group-hover:border-[#B62825]/60 transition-colors duration-200">
                            {service.badgeText}
                          </span>
                        </div>

                        {/* Card Content Bottom: Title, Description & Action */}
                        <div className="relative z-10 p-2.5 pt-0 space-y-1">
                          <div className="flex items-center justify-between gap-1">
                            <h5 className="font-heading font-bold text-[13px] text-white tracking-tight group-hover:text-[#FFFFFF] transition-colors duration-150">
                              {service.name}
                            </h5>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF5252] group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                          </div>

                          <p className="text-[11px] text-slate-300 leading-snug line-clamp-2 font-normal group-hover:text-slate-200 transition-colors duration-150">
                            {service.description}
                          </p>
                        </div>

                        {/* Subtle Red Bottom Active Glow Line */}
                        <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-[#FF5252] to-transparent transition-all duration-300" />
                      </Link>
                    );
                  })}
                </div>

                {/* Cargo Deck Floor Crossmembers */}
                <div className="mt-3 pt-2 border-t border-[#1C222F] flex items-center justify-between text-[8px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
                    <span>NHAVA SHEVA (JNPT) CARGO TERMINAL STAGING</span>
                  </span>
                  <span className="hidden sm:inline">SAFETY FIRST • COMPLIANCE ALWAYS</span>
                </div>
              </div>

              {/* =============================================================== */}
              {/* RIGHT 3D OPEN CONTAINER DOOR                                    */}
              {/* =============================================================== */}
              <div
                className="hidden xl:flex w-[84px] shrink-0 bg-gradient-to-r from-[#6E1210] via-[#A82421] to-[#8C1B19] border-l-2 border-[#380807] flex-col justify-between p-2 relative shadow-[-10px_0_24px_rgba(0,0,0,0.7)] z-20"
                style={{
                  transform: 'rotateY(-20deg) scale(0.97)',
                  transformOrigin: 'right center',
                  transformStyle: 'preserve-3d',
                }}
                aria-hidden="true"
              >
                {/* Corrugated Vertical Rib Texture */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 7px, #000000 7px, #000000 11px, rgba(255,255,255,0.35) 11px, rgba(255,255,255,0.35) 13px)',
                  }}
                />

                {/* 3 Heavy Steel Outer Hinges */}
                <div className="absolute top-4 -right-1.5 w-3 h-5 bg-[#3B4252] rounded-xs border border-gray-400 shadow-md" />
                <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-5 bg-[#3B4252] rounded-xs border border-gray-400 shadow-md" />
                <div className="absolute bottom-4 -right-1.5 w-3 h-5 bg-[#3B4252] rounded-xs border border-gray-400 shadow-md" />

                {/* Dual Vertical Galvanized Steel Locking Bars */}
                <div className="absolute top-0 bottom-0 right-[26px] w-[3.5px] bg-gradient-to-r from-[#94A3B8] via-[#F8FAFC] to-[#64748B] shadow-sm">
                  <div className="absolute top-[42%] -left-1 w-3 h-4 bg-white rounded-xs border border-gray-700 shadow-sm" />
                </div>
                <div className="absolute top-0 bottom-0 right-[44px] w-[3.5px] bg-gradient-to-r from-[#94A3B8] via-[#F8FAFC] to-[#64748B] shadow-sm">
                  <div className="absolute top-[48%] -left-1 w-3 h-4 bg-white rounded-xs border border-gray-700 shadow-sm" />
                </div>

                {/* Top Door Stencil */}
                <div className="relative z-10 text-right font-mono text-[7.5px] font-black text-white/90 tracking-widest uppercase">
                  DOOR 02-R
                </div>

                {/* Center: CSC Safety Approval Metal Plate */}
                <div className="relative z-10 bg-[#161B24]/95 border border-gray-500/80 rounded p-1 shadow-sm text-[6px] font-mono text-gray-200 leading-tight">
                  <div className="font-bold text-[#FACC15] border-b border-gray-600 pb-0.5 mb-0.5">
                    CSC APPROVAL
                  </div>
                  <div>MAX: 32,500 KG</div>
                  <div>NET: 28,600 KG</div>
                  <div className="text-[5.5px] text-[#38BDF8] mt-0.5">ISO 6346 CERT</div>
                </div>

                {/* Bottom Door Locking Cam Warning */}
                <div className="relative z-10 text-right font-mono text-[7px] text-[#FACC15] font-black tracking-wider">
                  HIGH CARGO
                </div>
              </div>

            </div>

            {/* Container Bottom Sill Crossmember */}
            <div className="h-4 bg-[#121620] rounded-b-lg border-t border-[#262C3A] flex items-center justify-between px-4 text-[8px] font-mono text-slate-400">
              <span>FORKLIFT POCKETS: 2050mm SPREAD</span>
              <span className="hidden sm:inline">HIGH-STRENGTH COR-TEN CORROSION RESISTANT STEEL</span>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT-SIDE PANEL — SPECIALIZED SERVICES & CARTING                         */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-[285px] border-t lg:border-t-0 lg:border-l border-[#222834] bg-[#0E121A] p-4 sm:p-5 flex flex-col justify-between space-y-4">
        
        {/* Header Block */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B62825] shadow-[0_0_8px_#B62825] animate-pulse" />
            <h4 className="font-heading font-black text-[12px] tracking-wider text-white uppercase">
              SPECIALIZED SERVICES
            </h4>
          </div>
          <p className="text-[11.5px] text-slate-300 leading-relaxed">
            End-to-End Cargo Solutions
          </p>
        </div>

        {/* CARTING DIAGRAM (Speedy, Punjab, Polaris preserved 100%) */}
        <div className="my-auto py-1">
          <CartingDropdownSection theme="dark" />
        </div>

        {/* Directory Footer Action */}
        <div className="pt-3 border-t border-[#1F2533]">
          <Link
            to="/services"
            onClick={onClose}
            className="group flex items-center justify-between p-2.5 rounded-xl bg-[#141924] hover:bg-[#B62825] border border-[#273142] hover:border-[#B62825] text-[12px] font-bold text-white transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825]"
          >
            <span>View All Services Directory</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </div>
  );
};
