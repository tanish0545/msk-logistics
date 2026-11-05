import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Ship, 
  Plane, 
  Box, 
  Layers, 
  Link2, 
  AlertTriangle, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react';
import { CartingDropdownSection } from './CartingDropdownSection';

export interface ContainerServiceItem {
  id: string;
  name: string;
  shortLabel: string;
  tagline: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
}

const CONTAINER_SERVICES: ContainerServiceItem[] = [
  {
    id: 'ocean-cargo',
    name: 'Ocean Cargo',
    shortLabel: 'Ocean Cargo',
    tagline: 'FCL & LCL Port Freight',
    path: '/services/ocean-cargo',
    icon: Ship,
    image: '/images/import-export/fcl-dedicated-shipping.jpg',
  },
  {
    id: 'air-cargo',
    name: 'Air Cargo',
    shortLabel: 'Air Cargo',
    tagline: 'Express Priority Cargo',
    path: '/services/air-cargo',
    icon: Plane,
    image: '/images/archive_unused_20261103/layer-plane.png',
  },
  {
    id: 'container-stuffing',
    name: 'Container Stuffing Logistics',
    shortLabel: 'Container Stuffing',
    tagline: 'Stuffing & De-Stuffing',
    path: '/services/container-stuffing',
    icon: Box,
    image: '/images/services/container-stuffing.webp',
  },
  {
    id: 'special-project',
    name: 'Special Project Cargo Handling',
    shortLabel: 'Project Cargo',
    tagline: 'Heavy-Lift & Break Bulk',
    path: '/services/special-project',
    icon: Layers,
    image: '/images/shipments/break-bulk/breakbulk-night-crane-qc04-hoist.jpg',
  },
  {
    id: 'cargo-lashing',
    name: 'Cargo Lashing',
    shortLabel: 'Cargo Lashing',
    tagline: 'Choking & Marine Lashing',
    path: '/services/cargo-lashing',
    icon: Link2,
    image: '/images/services/cargo-lashing.webp',
  },
  {
    id: 'hazardous-cargo',
    name: 'Hazardous Cargo',
    shortLabel: 'Hazardous Cargo',
    tagline: 'Class 1-9 DGR Certified',
    path: '/services/hazardous-cargo',
    icon: AlertTriangle,
    image: '/images/hazardous/un3265-corrosive-class-8-drums.jpg',
  },
];

interface Services3DContainerDropdownProps {
  onClose: () => void;
}

/**
 * IDEA 08 — 3D Container Theme (Industrial Look)
 * 
 * Features:
 * 1. Realistic open red shipping container with CSS 3D perspective and open doors.
 * 2. Official MSK logo stenciled on the left open door.
 * 3. Industrial locking bars, corner castings, and ISO twistlocks.
 * 4. Recessed interior cargo bay with depth lighting.
 * 5. Six interactive service cards in a 3-column × 2-row layout with authentic cargo imagery.
 * 6. Untouched, exact CARTING section on the right (Speedy, Punjab, Polaris).
 */
export const Services3DContainerDropdown: React.FC<Services3DContainerDropdownProps> = ({ onClose }) => {
  return (
    <div 
      className="bg-[#0B0D13] rounded-2xl shadow-2xl shadow-black/40 border border-[#222834] overflow-hidden text-left flex flex-col lg:flex-row w-[970px] max-w-[calc(100vw-2rem)] select-none transition-all duration-200"
      role="menu"
      aria-label="Services Mega Menu — 3D Container Theme"
    >
      {/* ========================================================================= */}
      {/* LEFT / CENTER AREA — 3D Open Shipping Container Bay                        */}
      {/* ========================================================================= */}
      <div className="relative flex-1 p-4 sm:p-5 bg-gradient-to-b from-[#0F131A] via-[#0B0E14] to-[#07090D] flex flex-col justify-center overflow-hidden">
        
        {/* Subtle Industrial Background Grid & Ambient Red Glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(182,40,37,0.18) 0%, rgba(182,40,37,0.04) 50%, transparent 75%)',
          }}
        />

        {/* 3D Perspective Container Wrapper */}
        <div className="relative w-full [perspective:1400px]">
          
          {/* Container Heavy Outer Frame */}
          <div className="relative rounded-lg bg-gradient-to-b from-[#8C1B19] via-[#B62825] to-[#731311] p-[3px] shadow-[0_16px_36px_rgba(0,0,0,0.7)] border-t border-[#D93834]/60 border-b border-[#4A0A09]">
            
            {/* Top Corner Castings (ISO Twistlock Blocks) */}
            <div className="absolute -top-2 -left-2 z-30 w-5 h-5 rounded-xs bg-gradient-to-br from-[#474D5A] via-[#2A2F3A] to-[#14171F] border border-[#6B7280] shadow-md flex items-center justify-center">
              <div className="w-2.5 h-1.5 bg-[#090B0E] rounded-full border border-black" />
            </div>
            <div className="absolute -top-2 -right-2 z-30 w-5 h-5 rounded-xs bg-gradient-to-br from-[#474D5A] via-[#2A2F3A] to-[#14171F] border border-[#6B7280] shadow-md flex items-center justify-center">
              <div className="w-2.5 h-1.5 bg-[#090B0E] rounded-full border border-black" />
            </div>

            {/* Bottom Corner Castings */}
            <div className="absolute -bottom-2 -left-2 z-30 w-5 h-5 rounded-xs bg-gradient-to-br from-[#474D5A] via-[#2A2F3A] to-[#14171F] border border-[#6B7280] shadow-md flex items-center justify-center">
              <div className="w-2.5 h-1.5 bg-[#090B0E] rounded-full border border-black" />
            </div>
            <div className="absolute -bottom-2 -right-2 z-30 w-5 h-5 rounded-xs bg-gradient-to-br from-[#474D5A] via-[#2A2F3A] to-[#14171F] border border-[#6B7280] shadow-md flex items-center justify-center">
              <div className="w-2.5 h-1.5 bg-[#090B0E] rounded-full border border-black" />
            </div>

            {/* Container Header Beam: High-Cube Hazard Stripes & Identification */}
            <div className="relative h-6 bg-[#161A22] rounded-t-sm flex items-center justify-between px-3 overflow-hidden border-b border-[#2A3140]">
              {/* Top High-Cube Warning Stripes */}
              <div 
                className="absolute top-0 left-0 right-0 h-[3px] opacity-90"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #FACC15, #FACC15 8px, #111827 8px, #111827 16px)',
                }}
              />

              {/* Left Stencil Identification */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B62825] animate-pulse" />
                <span className="font-mono text-[9.5px] font-bold text-white/90 tracking-wider">
                  MSKU 2026-HC
                </span>
                <span className="hidden sm:inline font-mono text-[8.5px] text-[#94A3B8] tracking-widest uppercase">
                  40&apos; HIGH CUBE
                </span>
              </div>

              {/* Center Stencil: MSK SPECIALIZED SERVICES */}
              <div className="font-mono text-[10px] font-black text-white tracking-widest uppercase flex items-center gap-1.5">
                <span className="text-[#B62825] font-bold">●</span>
                <span>SPECIALIZED SERVICES</span>
                <span className="text-[#B62825] font-bold">●</span>
              </div>

              {/* Right Stencil: Cargo Specifications */}
              <div className="font-mono text-[9px] text-[#CBD5E1] tracking-wider hidden sm:block">
                PAYLOAD: 28,600 KG
              </div>
            </div>

            {/* Main Open Container Chamber & 3D Doors */}
            <div className="relative flex min-h-[300px]">
              
              {/* ------------------------------------------------------------- */}
              {/* 3D LEFT CONTAINER DOOR (Swung Open to the Left with MSK Logo) */}
              {/* ------------------------------------------------------------- */}
              <div 
                className="hidden md:flex flex-col justify-between w-[92px] shrink-0 bg-gradient-to-r from-[#7A1311] via-[#A82220] to-[#8C1917] p-2 relative shadow-[-10px_10px_20px_rgba(0,0,0,0.6)] border-r border-black/60 origin-left"
                style={{
                  transform: 'perspective(1000px) rotateY(32deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Corrugated Vertical Lines on Door */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 6px, #000 6px, #000 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 12px)',
                  }}
                />

                {/* Industrial Hinges on outer edge */}
                <div className="absolute top-4 -left-1 w-2.5 h-4 bg-[#2D3340] rounded-xs border border-gray-500 shadow-sm" />
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2.5 h-4 bg-[#2D3340] rounded-xs border border-gray-500 shadow-sm" />
                <div className="absolute bottom-4 -left-1 w-2.5 h-4 bg-[#2D3340] rounded-xs border border-gray-500 shadow-sm" />

                {/* Dual Vertical Galvanized Steel Locking Bars */}
                <div className="absolute top-0 bottom-0 left-[26px] w-[3px] bg-gradient-to-r from-[#94A3B8] via-[#E2E8F0] to-[#64748B] shadow-sm">
                  <div className="absolute top-[42%] -left-1 w-2.5 h-3.5 bg-white rounded-xs border border-gray-600 shadow-xs" />
                </div>
                <div className="absolute top-0 bottom-0 left-[42px] w-[3px] bg-gradient-to-r from-[#94A3B8] via-[#E2E8F0] to-[#64748B] shadow-sm">
                  <div className="absolute top-[48%] -left-1 w-2.5 h-3.5 bg-white rounded-xs border border-gray-600 shadow-xs" />
                </div>

                {/* Top Door Stencil */}
                <div className="relative z-10 font-mono text-[7.5px] font-black text-white/80 tracking-widest uppercase">
                  DOOR 01-L
                </div>

                {/* Center Door: Official MSK Logo Asset */}
                <div className="relative z-10 flex flex-col items-center my-auto">
                  <div className="bg-white/95 rounded p-1.5 shadow-md border border-white/40 flex items-center justify-center">
                    <img 
                      src="/images/logo/msk-logistics-logo.png" 
                      alt="MSK Logistics" 
                      className="w-16 h-auto object-contain filter drop-shadow-xs" 
                    />
                  </div>
                  <span className="font-mono text-[8px] font-black text-white tracking-widest uppercase mt-1.5 text-center leading-tight">
                    SERVICES
                  </span>
                </div>

                {/* Bottom Door Specification Plaque */}
                <div className="relative z-10 font-mono text-[6.5px] text-white/70 leading-tight">
                  <div>TARE: 3900 KG</div>
                  <div>VOL: 76.4 CBM</div>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* CENTER INTERIOR CARGO CHAMBER (Recessed 3x2 Service Cards Grid) */}
              {/* ------------------------------------------------------------- */}
              <div className="relative flex-1 bg-[#0E1117] p-2.5 sm:p-3 overflow-hidden shadow-[inset_0_12px_24px_rgba(0,0,0,0.85),inset_0_-8px_16px_rgba(0,0,0,0.7)] flex flex-col justify-between">
                
                {/* Container Back Wall Corrugation Pattern */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-25"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 14px, rgba(0,0,0,0.5) 14px, rgba(0,0,0,0.5) 28px)',
                  }}
                />

                {/* Container Ceiling Overhead Red LED Glow */}
                <div 
                  className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(182,40,37,0.38) 0%, transparent 70%)',
                  }}
                />

                {/* Container Floor Rib Texture at the Bottom */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-4 pointer-events-none opacity-30"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, #1E2430 0px, #1E2430 6px, #0B0E14 6px, #0B0E14 12px)',
                  }}
                />

                {/* The 6 Service Cards inside the container (3 Columns × 2 Rows) */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {CONTAINER_SERVICES.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.id}
                        to={service.path}
                        onClick={onClose}
                        className="group relative rounded-xl overflow-hidden bg-[#131720]/90 border border-[#B62825]/35 hover:border-[#B62825] p-2.5 sm:p-3 flex flex-col justify-between h-[125px] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-[0_8px_20px_rgba(182,40,37,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825]"
                        role="menuitem"
                        title={service.name}
                      >
                        {/* Authentic Cargo Background Image Overlay */}
                        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                          <img 
                            src={service.image} 
                            alt={service.name}
                            className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                            loading="lazy"
                          />
                          {/* Dark Vignette Gradient for Perfect Contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-[#0A0D12]/75 to-[#0A0D12]/35" />
                        </div>

                        {/* Card Top: Icon Badge & Micro Arrow */}
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="w-7 h-7 rounded-lg bg-[#B62825]/20 border border-[#B62825]/40 flex items-center justify-center text-white group-hover:bg-[#B62825] group-hover:text-white group-hover:shadow-[0_0_12px_rgba(182,40,37,0.6)] transition-all duration-300">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          
                          <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-[#B62825]/60 group-hover:bg-[#B62825]/30 group-hover:translate-x-0.5 transition-all duration-200">
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>

                        {/* Card Bottom: Service Name & Specification Tagline */}
                        <div className="relative z-10 mt-auto">
                          <div className="text-[13px] sm:text-[13.5px] font-bold text-white group-hover:text-red-100 tracking-tight leading-snug">
                            {service.shortLabel}
                          </div>
                          <div className="text-[10px] text-gray-400 group-hover:text-red-200/90 font-medium truncate mt-0.5">
                            {service.tagline}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* 3D RIGHT CONTAINER DOOR (Swung Open to the Right with Hardware) */}
              {/* ------------------------------------------------------------- */}
              <div 
                className="hidden md:flex flex-col justify-between w-[92px] shrink-0 bg-gradient-to-l from-[#7A1311] via-[#A82220] to-[#8C1917] p-2 relative shadow-[10px_10px_20px_rgba(0,0,0,0.6)] border-l border-black/60 origin-right"
                style={{
                  transform: 'perspective(1000px) rotateY(-36deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Corrugated Vertical Lines on Door */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 6px, #000 6px, #000 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 12px)',
                  }}
                />

                {/* Industrial Hinges on outer right edge */}
                <div className="absolute top-4 -right-1 w-2.5 h-4 bg-[#2D3340] rounded-xs border border-gray-500 shadow-sm" />
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-4 bg-[#2D3340] rounded-xs border border-gray-500 shadow-sm" />
                <div className="absolute bottom-4 -right-1 w-2.5 h-4 bg-[#2D3340] rounded-xs border border-gray-500 shadow-sm" />

                {/* Dual Vertical Galvanized Steel Locking Bars */}
                <div className="absolute top-0 bottom-0 right-[42px] w-[3px] bg-gradient-to-r from-[#94A3B8] via-[#E2E8F0] to-[#64748B] shadow-sm">
                  <div className="absolute top-[40%] -left-1 w-2.5 h-3.5 bg-white rounded-xs border border-gray-600 shadow-xs" />
                </div>
                <div className="absolute top-0 bottom-0 right-[26px] w-[3px] bg-gradient-to-r from-[#94A3B8] via-[#E2E8F0] to-[#64748B] shadow-sm">
                  <div className="absolute top-[46%] -left-1 w-2.5 h-3.5 bg-white rounded-xs border border-gray-600 shadow-xs" />
                </div>

                {/* Top Door Stencil */}
                <div className="relative z-10 text-right font-mono text-[7.5px] font-black text-white/80 tracking-widest uppercase">
                  DOOR 02-R
                </div>

                {/* Center Door: CSC Safety Approval & Container Data Plate */}
                <div className="relative z-10 bg-[#161B24]/90 border border-gray-600/60 rounded p-1.5 shadow-sm text-[6.5px] font-mono text-gray-300 leading-tight">
                  <div className="font-bold text-[#FACC15] border-b border-gray-600 pb-0.5 mb-0.5">
                    CSC SAFETY APPROVAL
                  </div>
                  <div>MAX: 32,500 KG</div>
                  <div>PAYLOAD: 28,600 KG</div>
                  <div>CUBE: 76.4 CU.M</div>
                  <div className="text-[5.5px] text-gray-400 mt-0.5">ISO 6346 CERTIFIED</div>
                </div>

                {/* Bottom Door Locking Cam Warning Stencil */}
                <div className="relative z-10 text-right font-mono text-[7px] text-[#FACC15] font-bold">
                  HIGH CARGO
                </div>
              </div>

            </div>

            {/* Container Bottom Sill Crossmember */}
            <div className="h-2.5 bg-[#141820] rounded-b-sm border-t border-[#262C3A] flex items-center justify-between px-3">
              <span className="font-mono text-[7px] text-[#64748B]">FORKLIFT POCKETS 2050mm</span>
              <span className="font-mono text-[7px] text-[#64748B]">HEAVY DUTY COR-TEN STEEL</span>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT AREA — SPECIALIZED SERVICES & CARTING (Preserved 100% Unchanged)    */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-[285px] border-t lg:border-t-0 lg:border-l border-[#1F2533] bg-[#0E121A] p-5 flex flex-col justify-between space-y-4">
        
        {/* Header Block */}
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
            <h4 className="font-heading font-bold text-[12px] tracking-wider text-white uppercase">
              SPECIALIZED SERVICES
            </h4>
          </div>
          <p className="text-[11.5px] text-slate-400 leading-relaxed">
            End-to-End Cargo Solutions
          </p>
        </div>

        {/* CARTING TREE SECTION — 100% Preserved Component & Design */}
        <div className="my-auto py-1">
          <CartingDropdownSection />
        </div>

        {/* Directory Footer Action */}
        <div className="pt-2 border-t border-[#1F2533]">
          <Link
            to="/services"
            onClick={onClose}
            className="group inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#E53935] hover:text-[#FF5252] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B62825] rounded py-0.5"
          >
            <span>View All Services Directory</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </div>
  );
};
