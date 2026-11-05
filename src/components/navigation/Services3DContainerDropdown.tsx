import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Ship, 
  Plane, 
  Box, 
  Layers, 
  Link2, 
  AlertTriangle, 
  ArrowRight,
  Check,
  RotateCw
} from 'lucide-react';
import { CartingDropdownSection } from './CartingDropdownSection';

export interface ConceptBServiceItem {
  readonly id: string;
  readonly name: string;
  readonly subtitle: string;
  readonly path: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly image: string;
  readonly description: string;
  readonly capabilities: readonly string[];
}

const CONCEPT_B_SERVICES: readonly ConceptBServiceItem[] = [
  {
    id: 'ocean-cargo',
    name: 'Ocean Cargo',
    subtitle: 'FCL & LCL Port Freight',
    path: '/services/ocean-cargo',
    icon: Ship,
    image: '/images/import-export/fcl-dedicated-shipping.webp',
    description: 'Dedicated ocean cargo operations and maritime container coordination operating through JNPT corridors.',
    capabilities: [
      'Global Sea Freight & FCL Staging',
      'LCL Consolidation Logistics',
      'Port Terminal Gate-In Alignment',
    ],
  },
  {
    id: 'air-cargo',
    name: 'Air Cargo',
    subtitle: 'Express Priority Cargo',
    path: '/services/air-cargo',
    icon: Plane,
    image: '/images/services/air-cargo.png',
    description: 'Time-sensitive and reliable air freight solutions, airport staging, and expedited export customs processing.',
    capabilities: [
      'Global Air Freight & ULD Handling',
      'Express Airport Terminal Hand-Off',
      'End-to-End Customs Coordination',
    ],
  },
  {
    id: 'container-stuffing',
    name: 'Container Stuffing Logistics',
    subtitle: 'Stuffing & De-Stuffing',
    path: '/services/container-stuffing',
    icon: Box,
    image: '/images/services/container-stuffing.webp',
    description: 'Methodical container loading, weight-distribution balancing, and stuffing across standard dry vans and open tops.',
    capabilities: [
      'CFS Staging Coordination',
      'Precision Weight Balance Planning',
      'Pre-Loading Structural Verification',
    ],
  },
  {
    id: 'special-project',
    name: 'Special Project Cargo Handling',
    subtitle: 'Heavy-Lift & Break Bulk',
    path: '/services/special-project',
    icon: Layers,
    image: '/images/shipments/breakbulk/breakbulk-cylindrical-haulage.jpg',
    description: 'Specialist in Over-Dimensional Cargo (ODC), heavy machinery rigging, flat-rack securing, and hydraulic low-bed haulage.',
    capabilities: [
      'ODC Heavy Machinery Rigging',
      'Flat-Rack & Open-Top Tie-Downs',
      'Hydraulic Low-Bed Trailer Haulage',
    ],
  },
  {
    id: 'cargo-lashing',
    name: 'Cargo Lashing',
    subtitle: 'Choking & Marine Lashing',
    path: '/services/cargo-lashing',
    icon: Link2,
    image: '/images/services/cargo-lashing.webp',
    description: 'Certified marine cargo lashing, timber chocking, container securing, and high-tensile composite strapping.',
    capabilities: [
      'Certified ISPM-15 Timber Chocking',
      'High-Tensile Ratchet Straps & Wire',
      'IMO / CSS Code Certified Securing',
    ],
  },
  {
    id: 'hazardous-cargo',
    name: 'Hazardous Cargo',
    subtitle: 'Class 1–9 DGR Certified',
    path: '/services/hazardous-cargo',
    icon: AlertTriangle,
    image: '/images/services/hazardous-cargo/chemical-drums-palletized.jpg',
    description: 'Technical packaging, UN-certified container securing, chemical drum lashing, and IMDG / IATA DGR coordination.',
    capabilities: [
      'UN-Spec Packaging & Segregation',
      'IMDG Code Compliance & SDS Checks',
      'Statutory Port Authority Approvals',
    ],
  },
] as const;

interface Services3DContainerDropdownProps {
  onClose: () => void;
}

/**
 * MSK LOGISTICS — SERVICES MEGA MENU REDESIGN
 * CONCEPT B: STACKED LAYERED 3D FLIP CARDS
 * 
 * Features:
 * 1. 3×2 arrangement of physically stacked, layered service cards.
 * 2. Smooth 3D flip around Y-axis on hover/focus revealing verified capabilities & "Explore Service" CTA.
 * 3. Offset background panels creating tactile depth and physical card stacking.
 * 4. Dedicated Right-side Specialized Services panel featuring the exact Carting hierarchy (Speedy, Punjab, Polaris).
 * 5. Full-width dark obsidian glassmorphic panel with warm dusk port crane silhouette.
 * 6. Responsive adaptation with touch tap-to-flip support and full keyboard accessibility.
 */
export const Services3DContainerDropdown: React.FC<Services3DContainerDropdownProps> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

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

  // Touch & Click toggle handler for cards
  const handleCardClick = (id: string) => {
    setFlippedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-[#0B0D13]/97 text-[#D9DEE5] rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.92),0_0_40px_rgba(182,40,37,0.15)] border border-white/10 overflow-hidden text-left flex flex-col lg:flex-row w-[1140px] xl:w-[1240px] max-w-[calc(100vw-2rem)] select-none backdrop-blur-2xl transition-all duration-300"
      role="menu"
      aria-label="MSK Logistics Services Mega Menu"
      tabIndex={-1}
    >
      {/* Top MSK-Red Specular Highlight Line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#B62825] to-transparent z-40 pointer-events-none" />

      {/* Atmospheric Port Background Lighting (Dusk Sunset Warmth on the right) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 86% 40%, rgba(245,110,25,0.26) 0%, rgba(182,40,37,0.16) 38%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Container Gantry Crane Silhouette (SVG on right) */}
      <div 
        className="absolute right-0 bottom-0 w-[440px] h-[360px] pointer-events-none overflow-hidden opacity-[0.22] z-0 flex items-end justify-end"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 320" fill="none" className="w-full h-full text-white" xmlns="http://www.w3.org/2000/svg">
          {/* Main Gantry Crane Leg & Boom Silhouette */}
          <path d="M 280 40 L 360 40 L 390 120 L 390 320 L 370 320 L 370 140 L 300 140 L 290 320 L 270 320 Z" fill="currentColor" />
          <path d="M 180 40 L 400 40 L 395 55 L 180 55 Z" fill="currentColor" />
          <path d="M 210 55 L 280 140 L 265 140 L 195 55 Z" fill="currentColor" />
          {/* Gantry Cross Bracing */}
          <line x1="290" y1="140" x2="370" y2="230" stroke="currentColor" strokeWidth="3" />
          <line x1="370" y1="140" x2="290" y2="230" stroke="currentColor" strokeWidth="3" />
          <line x1="290" y1="230" x2="370" y2="320" stroke="currentColor" strokeWidth="3" />
          <line x1="370" y1="230" x2="290" y2="320" stroke="currentColor" strokeWidth="3" />
          {/* Crane Trolley & Cables */}
          <rect x="250" y="55" width="28" height="14" fill="#B62825" />
          <line x1="258" y1="69" x2="258" y2="120" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="270" y1="69" x2="270" y2="120" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Hoisted Container Spreader */}
          <rect x="246" y="120" width="36" height="8" fill="currentColor" />
          <rect x="248" y="128" width="32" height="18" fill="#B62825" fillOpacity="0.8" stroke="currentColor" strokeWidth="1" />
          {/* Stacked Containers at Wharf Base */}
          <rect x="30" y="240" width="70" height="26" fill="currentColor" opacity="0.6" />
          <rect x="105" y="240" width="70" height="26" fill="currentColor" opacity="0.8" />
          <rect x="50" y="214" width="70" height="26" fill="#B62825" opacity="0.5" />
          <rect x="125" y="214" width="70" height="26" fill="currentColor" opacity="0.7" />
          <rect x="75" y="188" width="70" height="26" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* LEFT SECTION: 6 STACKED LAYERED 3D FLIP CARDS                             */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex-1 p-5 sm:p-6 lg:p-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
        
        {/* Section Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest text-[#B62825] uppercase">
            <span className="text-[#B62825] tracking-tight font-black">///</span>
            <span>OUR SERVICES</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
            Comprehensive Cargo &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5252] via-[#B62825] to-[#E53E3E]">
              Logistics Solutions
            </span>
          </h2>
          
          <p className="text-xs sm:text-[12.5px] text-[#94A3B8] font-body max-w-2xl leading-relaxed">
            End-to-End handling, from port to project, with safety, precision and global reach.
          </p>
        </div>

        {/* 6 Stacked Layered Cards Grid (3 cols × 2 rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 xl:gap-4.5 my-3.5">
          {CONCEPT_B_SERVICES.map((service) => {
            const Icon = service.icon;
            const isFlipped = flippedCardId === service.id;

            return (
              <div
                key={service.id}
                className="relative group/stack [perspective:1000px] h-[195px] xl:h-[205px]"
                onMouseEnter={() => setFlippedCardId(service.id)}
                onMouseLeave={() => setFlippedCardId(null)}
              >
                {/* 1. LAYER 3: Deepest Background Layer Panel (Offset top-right) */}
                <div 
                  className="absolute inset-0 rounded-2xl bg-[#090B10] border border-white/[0.05] translate-x-3 -translate-y-2.5 opacity-50 pointer-events-none transition-transform duration-300 group-hover/stack:translate-x-3.5 group-hover/stack:-translate-y-3"
                  aria-hidden="true"
                />

                {/* 2. LAYER 2: Middle Background Layer Panel (Offset top-right) */}
                <div 
                  className="absolute inset-0 rounded-2xl bg-[#11141D] border border-white/[0.1] translate-x-1.5 -translate-y-1.5 opacity-80 pointer-events-none transition-transform duration-300 group-hover/stack:translate-x-2 group-hover/stack:-translate-y-2 shadow-sm"
                  aria-hidden="true"
                />

                {/* 3. FOREGROUND 3D FLIPPER CARD */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`${service.name}. ${isFlipped ? 'Showing details' : 'Click to flip for details'}`}
                  aria-expanded={isFlipped}
                  onClick={() => handleCardClick(service.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(service.id);
                    }
                  }}
                  className={`relative w-full h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825] ${
                    isFlipped 
                      ? '[transform:rotateY(180deg)] scale-[1.03] z-30 shadow-[0_0_30px_rgba(182,40,37,0.55),0_12px_28px_rgba(0,0,0,0.85)]' 
                      : 'hover:scale-[1.01] hover:shadow-[0_8px_20px_rgba(0,0,0,0.6)]'
                  }`}
                >
                  {/* ========================================================= */}
                  {/* FRONT FACE (Photograph + Bottom Info Bar)                 */}
                  {/* ========================================================= */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] bg-[#0E1118] border border-white/15 flex flex-col justify-between transition-colors duration-300 group-hover/stack:border-[#B62825]/80">
                    {/* Top Photograph with Vignette */}
                    <div className="relative h-[62%] w-full overflow-hidden bg-neutral-900">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/stack:scale-105"
                        width="300"
                        height="140"
                        loading="eager"
                        decoding="async"
                      />
                      {/* Dark gradient overlay blending into bottom card bar */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1118] via-[#0E1118]/40 to-transparent" />

                      {/* Micro flip hint badge on top right */}
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/60 border border-white/15 text-[9px] font-mono text-white/70 flex items-center gap-1 opacity-0 group-hover/stack:opacity-100 transition-opacity">
                        <RotateCw className="w-2.5 h-2.5 text-[#B62825]" />
                        <span>Flip</span>
                      </div>
                    </div>

                    {/* Bottom Metadata Bar */}
                    <div className="p-2.5 xl:p-3 bg-[#0E1118] flex items-center justify-between gap-2 border-t border-white/5 h-[38%]">
                      <div className="flex items-center gap-2 xl:gap-2.5 min-w-0">
                        {/* Red Accent Icon Badge */}
                        <div className="w-7 h-7 rounded-lg bg-[#B62825]/20 border border-[#B62825]/40 flex items-center justify-center text-[#B62825] group-hover/stack:bg-[#B62825] group-hover/stack:text-white transition-colors shrink-0 shadow-xs">
                          <Icon className="w-3.5 h-3.5" />
                        </div>

                        {/* Title & Subtitle */}
                        <div className="min-w-0">
                          <h3 className="text-[12.5px] xl:text-[13px] font-bold font-heading text-white tracking-wide leading-tight group-hover/stack:text-[#B62825] transition-colors line-clamp-1">
                            {service.name}
                          </h3>
                          <p className="text-[10px] font-mono text-[#94A3B8] truncate mt-0.5">
                            {service.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Directional Circular Arrow Button */}
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover/stack:border-[#B62825] group-hover/stack:text-white group-hover/stack:bg-[#B62825] transition-all shrink-0">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* BACK FACE (3D Flipped Info + Capabilities + CTA)          */}
                  {/* ========================================================= */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#1A0B0D] via-[#10121A] to-[#0A0C10] border-2 border-[#B62825] p-3 xl:p-3.5 flex flex-col justify-between shadow-[0_0_25px_rgba(182,40,37,0.45)]">
                    
                    {/* Header: Icon + Title */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-md bg-[#B62825] text-white flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[12.5px] xl:text-[13px] font-black font-heading text-white truncate tracking-wide">
                          {service.name}
                        </span>
                      </div>
                      
                      {/* Flip Return Cue */}
                      <span className="text-[9px] font-mono text-red-400 font-semibold uppercase tracking-wider shrink-0 flex items-center gap-0.5">
                        <RotateCw className="w-2.5 h-2.5" />
                      </span>
                    </div>

                    {/* Middle: Short Description & Concise Capabilities */}
                    <div className="space-y-1.5 py-1">
                      <p className="text-[10px] xl:text-[10.5px] text-slate-300 leading-snug font-body line-clamp-2">
                        {service.description}
                      </p>
                      
                      <div className="space-y-1 text-[9.5px] xl:text-[10px] font-mono text-slate-200">
                        {service.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-center gap-1.5 truncate">
                            <Check className="w-3 h-3 text-[#B62825] shrink-0 stroke-[2.5]" />
                            <span className="truncate">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom: Explore Service CTA Button */}
                    <Link
                      to={service.path}
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                      }}
                      className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-[#D43330] via-[#B62825] to-[#8F1917] hover:brightness-110 active:scale-95 text-white text-[11px] font-heading font-bold flex items-center justify-center gap-1.5 shadow-[0_2px_8px_rgba(182,40,37,0.4)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Left Action Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link
            to="/request-quote"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D43330] via-[#B62825] to-[#8F1917] hover:brightness-110 active:scale-95 text-white text-xs font-heading font-bold shadow-[0_4px_16px_rgba(182,40,37,0.4)] transition-all cursor-pointer"
          >
            <span>Request a Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to="/services"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141822]/80 hover:bg-[#1C2230] border border-white/15 text-white text-xs font-heading font-bold transition-all cursor-pointer"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* RIGHT SECTION: SPECIALIZED SERVICES & CARTING                             */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full lg:w-[330px] xl:w-[360px] p-5 sm:p-6 lg:p-7 flex flex-col justify-between bg-black/40 backdrop-blur-md">
        
        {/* Right Header */}
        <div className="space-y-1">
          <h3 className="text-lg font-black font-heading tracking-tight leading-none text-white">
            SPECIALIZED <span className="text-[#B62825]">SERVICES</span>
          </h3>
          <p className="text-[11px] text-slate-400 font-body leading-snug">
            End-to-End Cargo Solutions Across Multiple Modes
          </p>
        </div>

        {/* Restored Authentic Carting Diagram (Compact, Centered, 3 Connected Nodes) */}
        <div className="my-4">
          <CartingDropdownSection onClose={onClose} />
        </div>

        {/* View All Services Directory Link */}
        <div className="pt-3 border-t border-white/10">
          <Link
            to="/services"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#B62825] hover:text-red-400 hover:underline transition-colors cursor-pointer"
          >
            <Box className="w-4 h-4 text-[#B62825]" />
            <span>View All Services Directory &rarr;</span>
          </Link>
        </div>

      </div>

    </div>
  );
};
