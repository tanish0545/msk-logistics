import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { QUOTE_CTA } from './navConfig';

interface HangingContainerQuoteButtonProps {
  variant?: 'desktop' | 'compact' | 'drawer';
  className?: string;
  onClick?: () => void;
}

export const HangingContainerQuoteButton: React.FC<HangingContainerQuoteButtonProps> = ({
  variant = 'desktop',
  className = '',
  onClick,
}) => {
  // =========================================================================
  // 1. MOBILE DRAWER VARIANT (Full-width inside slide-out menu drawer)
  // =========================================================================
  if (variant === 'drawer') {
    return (
      <Link
        to={QUOTE_CTA.path}
        onClick={onClick}
        className={`group relative w-full h-[54px] rounded-md overflow-hidden bg-gradient-to-b from-[#D43330] via-[#B62825] to-[#8F1917] border border-[#7A1513] shadow-md flex items-center justify-between px-4 sm:px-6 transition-all duration-200 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825] ${className}`}
        aria-label="Request a logistics quote"
      >
        {/* Corrugated Vertical Ribs Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(0,0,0,0.34) 0px, rgba(0,0,0,0.34) 2px, transparent 2px, transparent 6px, rgba(255,255,255,0.18) 6px, rgba(255,255,255,0.18) 8px, transparent 8px, transparent 12px)',
          }}
          aria-hidden="true"
        />

        {/* Structural Corner Castings */}
        <div className="absolute top-0 left-0 w-3 h-2.5 bg-[#1E222A] border-r border-b border-[#374151] flex items-center justify-center">
          <div className="w-1.5 h-1 rounded-full bg-[#0D0F14] border border-[#4B5563]" />
        </div>
        <div className="absolute top-0 right-0 w-3 h-2.5 bg-[#1E222A] border-l border-b border-[#374151] flex items-center justify-center">
          <div className="w-1.5 h-1 rounded-full bg-[#0D0F14] border border-[#4B5563]" />
        </div>
        <div className="absolute bottom-0 left-0 w-3 h-2.5 bg-[#1E222A] border-r border-t border-[#374151] flex items-center justify-center">
          <div className="w-1.5 h-1 rounded-full bg-[#0D0F14] border border-[#4B5563]" />
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-2.5 bg-[#1E222A] border-l border-t border-[#374151] flex items-center justify-center">
          <div className="w-1.5 h-1 rounded-full bg-[#0D0F14] border border-[#4B5563]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col text-left leading-tight pl-2">
          <span className="font-mono-code text-[9px] font-semibold tracking-widest uppercase text-white/60">
            MSKU 2026-HQ
          </span>
          <span className="font-nav text-[15px] font-black tracking-wider uppercase text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            GET A QUOTE
          </span>
        </div>
        <div className="relative z-10 w-8 h-8 rounded bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
          <ArrowUpRight className="w-5 h-5 text-white stroke-[2.4] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>
    );
  }

  // =========================================================================
  // 2. MOBILE COMPACT HEADER VARIANT (< sm screens: Crane Hoist + Container)
  // =========================================================================
  if (variant === 'compact') {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <Link
          to={QUOTE_CTA.path}
          onClick={onClick}
          aria-label="Request a logistics quote"
          className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#B62825] rounded-xs"
        >
          {/* Subtle Mobile Pendulum Motion Wrapper */}
          <div className="animate-container-pendulum relative w-[104px] flex flex-col items-center">
            
            {/* Industrial Crane Hoist & Spreader Assembly (Proportionally Scaled for Mobile) */}
            <div className="relative w-full h-[15px] pointer-events-none overflow-visible">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 104 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  {/* Metallic Cable Gradient */}
                  <linearGradient id="mobileCableGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#94A3B8" />
                    <stop offset="50%" stopColor="#E2E8F0" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>

                  {/* Mobile Hazard Pattern */}
                  <pattern id="mobileHazardPattern" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="3" height="6" fill="#EAB308" />
                    <rect x="3" width="3" height="6" fill="#0F172A" />
                  </pattern>

                  {/* Steel Gradient */}
                  <linearGradient id="mobileSteelGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="50%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>
                </defs>

                {/* 1. Crane Trolley Base & Overhead Track */}
                <rect x="22" y="0" width="60" height="1.5" rx="0.5" fill="#334155" />
                <rect x="34" y="0.8" width="36" height="2.5" rx="0.5" fill="#1E293B" stroke="#475569" strokeWidth="0.4" />
                {/* Trolley wheels */}
                <rect x="36" y="0" width="3" height="2" rx="0.3" fill="#64748B" />
                <rect x="65" y="0" width="3" height="2" rx="0.3" fill="#64748B" />

                {/* 2. Twin Vertical Crane Hoist Ropes */}
                <line x1="44" y1="2.5" x2="44" y2="6.5" stroke="url(#mobileCableGrad)" strokeWidth="1.1" />
                <line x1="60" y1="2.5" x2="60" y2="6.5" stroke="url(#mobileCableGrad)" strokeWidth="1.1" />

                {/* 3. Hoist Headblock */}
                <rect x="40" y="5.8" width="24" height="2.8" rx="0.6" fill="url(#mobileSteelGrad)" stroke="#475569" strokeWidth="0.4" />
                <circle cx="52" cy="7.2" r="0.9" fill="#EAB308" />

                {/* 4. Solid Rectangular Container Spreader Beam */}
                <rect x="4" y="8.6" width="96" height="3.4" rx="0.6" fill="url(#mobileSteelGrad)" stroke="#475569" strokeWidth="0.5" />
                {/* Spreader Center Hazard Identification */}
                <rect x="42" y="9.2" width="20" height="2.2" fill="url(#mobileHazardPattern)" stroke="#EAB308" strokeWidth="0.4" />
                {/* Spreader Corner Guide Flippers */}
                <polygon points="3,8.6 4.5,8.6 3,12" fill="#EAB308" />
                <polygon points="101,8.6 99.5,8.6 101,12" fill="#EAB308" />

                {/* 5. Four Corner Twist-lock Connections to Container Top Corners */}
                {/* Left Twistlock Connection */}
                <rect x="5.5" y="11.8" width="2.2" height="3.2" rx="0.4" fill="#0F172A" stroke="#94A3B8" strokeWidth="0.4" />
                <line x1="10" y1="12" x2="6.5" y2="15" stroke="#94A3B8" strokeWidth="0.8" />
                <circle cx="6.6" cy="13.5" r="0.6" fill="#10B981" />

                {/* Right Twistlock Connection */}
                <rect x="96.3" y="11.8" width="2.2" height="3.2" rx="0.4" fill="#0F172A" stroke="#94A3B8" strokeWidth="0.4" />
                <line x1="94" y1="12" x2="97.5" y2="15" stroke="#94A3B8" strokeWidth="0.8" />
                <circle cx="97.4" cy="13.5" r="0.6" fill="#10B981" />
              </svg>
            </div>

            {/* Miniature Red Shipping Container Body */}
            <div className="relative w-full h-[35px] rounded-[2.5px] overflow-hidden bg-gradient-to-b from-[#D43330] via-[#B62825] to-[#8F1917] border border-[#7A1513] shadow-[0_3px_8px_rgba(0,0,0,0.3)] flex items-center justify-between px-2 transition-all duration-150 active:scale-95">
              {/* Subtle Corrugated Pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-35"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1.5px, transparent 1.5px, transparent 4px, rgba(255,255,255,0.18) 4px, rgba(255,255,255,0.18) 5.5px, transparent 5.5px, transparent 8px)',
                }}
                aria-hidden="true"
              />

              {/* Corner Castings with Oval Twistlock Apertures */}
              <div className="absolute top-0 left-0 w-2 h-1.5 bg-[#1E222A] border-r border-b border-[#475569] flex items-center justify-center">
                <div className="w-1 h-0.5 rounded-full bg-[#0D0F14]" />
              </div>
              <div className="absolute top-0 right-0 w-2 h-1.5 bg-[#1E222A] border-l border-b border-[#475569] flex items-center justify-center">
                <div className="w-1 h-0.5 rounded-full bg-[#0D0F14]" />
              </div>
              <div className="absolute bottom-0 left-0 w-2 h-1.5 bg-[#1E222A] border-r border-t border-[#475569] flex items-center justify-center">
                <div className="w-1 h-0.5 rounded-full bg-[#0D0F14]" />
              </div>
              <div className="absolute bottom-0 right-0 w-2 h-1.5 bg-[#1E222A] border-l border-t border-[#475569] flex items-center justify-center">
                <div className="w-1 h-0.5 rounded-full bg-[#0D0F14]" />
              </div>

              {/* Text & Icon */}
              <span className="relative z-10 font-nav text-[11px] font-black uppercase tracking-wider text-white pl-0.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                QUOTE
              </span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5 text-white stroke-[2.4] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>

          </div>
        </Link>
      </div>
    );
  }

  // =========================================================================
  // 3. DESKTOP & TABLET VARIANT: FULL INDUSTRIAL PORT GANTRY CRANE LIFTING CTA
  // =========================================================================
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <Link
        to={QUOTE_CTA.path}
        onClick={onClick}
        aria-label="Request a logistics quote"
        className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B62825] rounded-xs transition-transform"
      >
        {/* Subtle Pendulum Motion Wrapper: Pivots from the crane trolley mount on the overhead beam */}
        <div className="animate-container-pendulum relative w-[160px] xl:w-[166px] flex flex-col items-center">
          
          {/* ================================================================= */}
          {/* INDUSTRIAL PORT GANTRY CRANE HOIST & SPREADER BEAM ASSEMBLY       */}
          {/* Replaces clothes-hanger wires with authentic gantry lifting gear  */}
          {/* ================================================================= */}
          <div className="relative w-full h-[22px] pointer-events-none overflow-visible">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 160 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                {/* Heavy Steel Wire Rope Cable Gradient */}
                <linearGradient id="gantryCableGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#64748B" />
                  <stop offset="25%" stopColor="#CBD5E1" />
                  <stop offset="50%" stopColor="#F8FAFC" />
                  <stop offset="75%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>

                {/* Industrial Crane Steel Gradient */}
                <linearGradient id="craneSteelGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="25%" stopColor="#334155" />
                  <stop offset="65%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>

                {/* Spreader Frame Structural Steel Gradient */}
                <linearGradient id="spreaderSteelGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B4252" />
                  <stop offset="30%" stopColor="#2E3440" />
                  <stop offset="75%" stopColor="#1C2029" />
                  <stop offset="100%" stopColor="#0B0D13" />
                </linearGradient>

                {/* Metallic Twist-Lock Shackle Gradient */}
                <linearGradient id="twistlockGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#94A3B8" />
                  <stop offset="40%" stopColor="#475569" />
                  <stop offset="80%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>

                {/* Industrial Yellow/Black Safety Hazard Stripes Pattern */}
                <pattern
                  id="gantryHazardPattern"
                  width="8"
                  height="8"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <rect width="4" height="8" fill="#EAB308" />
                  <rect x="4" width="4" height="8" fill="#0F172A" />
                </pattern>
              </defs>

              {/* ----------------------------------------------------------------- */}
              {/* 1. CRANE TROLLEY & OVERHEAD RUNNER BEAM (Mounted to Port Gantry)  */}
              {/* ----------------------------------------------------------------- */}
              {/* Overhead Crane Rail Section */}
              <rect x="28" y="0" width="104" height="2" rx="0.5" fill="#334155" />
              <line x1="28" y1="0.5" x2="132" y2="0.5" stroke="#94A3B8" strokeWidth="0.5" />

              {/* Heavy Trolley Carriage Housing */}
              <rect
                x="50"
                y="1"
                width="60"
                height="3.6"
                rx="0.8"
                fill="url(#craneSteelGrad)"
                stroke="#475569"
                strokeWidth="0.5"
                className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
              />

              {/* Four Grooved Steel Trolley Wheels Running on Track */}
              <rect x="52" y="0" width="5.5" height="2.4" rx="0.5" fill="#64748B" stroke="#1E293B" strokeWidth="0.4" />
              <rect x="63" y="0" width="5.5" height="2.4" rx="0.5" fill="#64748B" stroke="#1E293B" strokeWidth="0.4" />
              <rect x="91.5" y="0" width="5.5" height="2.4" rx="0.5" fill="#64748B" stroke="#1E293B" strokeWidth="0.4" />
              <rect x="102.5" y="0" width="5.5" height="2.4" rx="0.5" fill="#64748B" stroke="#1E293B" strokeWidth="0.4" />

              {/* Trolley Center Motor / Winch Drum with Rivet Detailing */}
              <rect x="73" y="1.6" width="14" height="2.2" rx="0.4" fill="#0F172A" />
              <circle cx="75" cy="2.7" r="0.5" fill="#94A3B8" />
              <circle cx="85" cy="2.7" r="0.5" fill="#94A3B8" />

              {/* ----------------------------------------------------------------- */}
              {/* 2. QUAD STEEL WIRE ROPE HOIST CABLES (Twin Ropes on Each Side)     */}
              {/* ----------------------------------------------------------------- */}
              {/* Left Twin Hoist Cables */}
              <line x1="64" y1="3.8" x2="64" y2="9.8" stroke="url(#gantryCableGrad)" strokeWidth="1.4" strokeLinecap="square" />
              <line x1="68" y1="3.8" x2="68" y2="9.8" stroke="url(#gantryCableGrad)" strokeWidth="1.4" strokeLinecap="square" />
              {/* Subtle inner strand line for braided wire rope appearance */}
              <line x1="64" y1="4" x2="64" y2="9.5" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="1.5 1" opacity="0.7" />
              <line x1="68" y1="4" x2="68" y2="9.5" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="1.5 1" opacity="0.7" />

              {/* Right Twin Hoist Cables */}
              <line x1="92" y1="3.8" x2="92" y2="9.8" stroke="url(#gantryCableGrad)" strokeWidth="1.4" strokeLinecap="square" />
              <line x1="96" y1="3.8" x2="96" y2="9.8" stroke="url(#gantryCableGrad)" strokeWidth="1.4" strokeLinecap="square" />
              <line x1="92" y1="4" x2="92" y2="9.5" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="1.5 1" opacity="0.7" />
              <line x1="96" y1="4" x2="96" y2="9.5" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="1.5 1" opacity="0.7" />

              {/* ----------------------------------------------------------------- */}
              {/* 3. CRANE HOIST HEADBLOCK / SHEAVE BLOCK                           */}
              {/* ----------------------------------------------------------------- */}
              <rect
                x="58"
                y="9"
                width="44"
                height="4.2"
                rx="0.8"
                fill="url(#craneSteelGrad)"
                stroke="#64748B"
                strokeWidth="0.5"
                className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
              />
              {/* Sheave Pulley Highlights */}
              <circle cx="66" cy="11.1" r="1.7" fill="#1E293B" stroke="#94A3B8" strokeWidth="0.6" />
              <circle cx="66" cy="11.1" r="0.6" fill="#F8FAFC" />
              <circle cx="94" cy="11.1" r="1.7" fill="#1E293B" stroke="#94A3B8" strokeWidth="0.6" />
              <circle cx="94" cy="11.1" r="0.6" fill="#F8FAFC" />

              {/* Center Load Swivel Pin with High-Vis Accent */}
              <circle cx="80" cy="11.1" r="1.3" fill="#EAB308" stroke="#713F12" strokeWidth="0.4" />

              {/* Direct Structural Mount Plates Connecting Headblock to Spreader */}
              <rect x="63" y="12.8" width="6" height="1.6" fill="#1E293B" />
              <rect x="91" y="12.8" width="6" height="1.6" fill="#1E293B" />

              {/* ----------------------------------------------------------------- */}
              {/* 4. SOLID RECTANGULAR CONTAINER SPREADER BEAM                      */}
              {/* ----------------------------------------------------------------- */}
              {/* Main Heavy Steel Spreader Frame spanning almost full container width */}
              <rect
                x="8"
                y="13.8"
                width="144"
                height="4.8"
                rx="0.8"
                fill="url(#spreaderSteelGrad)"
                stroke="#475569"
                strokeWidth="0.6"
                className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]"
              />

              {/* Top Machined Flange Rail with Structural Metallic Highlight */}
              <rect x="8.5" y="14" width="143" height="1" fill="#64748B" opacity="0.8" />

              {/* Center Safety Hazard Stripes Indicator Plate */}
              <rect
                x="60"
                y="14.6"
                width="40"
                height="3.2"
                fill="url(#gantryHazardPattern)"
                stroke="#EAB308"
                strokeWidth="0.5"
                rx="0.4"
              />

              {/* Left Telescoping End Beam Sleeves */}
              <rect x="8" y="13.8" width="16" height="4.8" rx="0.6" fill="#1E2430" stroke="#64748B" strokeWidth="0.5" />
              <rect x="10" y="15" width="2" height="2.4" rx="0.3" fill="#EAB308" />

              {/* Right Telescoping End Beam Sleeves */}
              <rect x="136" y="13.8" width="16" height="4.8" rx="0.6" fill="#1E2430" stroke="#64748B" strokeWidth="0.5" />
              <rect x="148" y="15" width="2" height="2.4" rx="0.3" fill="#EAB308" />

              {/* Port Spreader Corner Guide Flippers (Angled yellow guide arms on outer ends) */}
              <polygon points="7,13.8 8.5,13.8 7,18.8" fill="#EAB308" stroke="#713F12" strokeWidth="0.3" />
              <polygon points="153,13.8 151.5,13.8 153,18.8" fill="#EAB308" stroke="#713F12" strokeWidth="0.3" />

              {/* ----------------------------------------------------------------- */}
              {/* 5. FOUR HEAVY TWIST-LOCK LIFTING CONNECTIONS TO CORNER CASTINGS   */}
              {/* ----------------------------------------------------------------- */}
              {/* LEFT CORNER: Front & Rear Corner Lifting Connections */}
              {/* Left Connection 1 (Front Vertical Drop Shaft) */}
              <rect
                x="10"
                y="18.2"
                width="2.6"
                height="4.2"
                rx="0.4"
                fill="url(#twistlockGrad)"
                stroke="#0F172A"
                strokeWidth="0.4"
              />
              {/* Left Connection 2 (Angled Heavy Support Stay) */}
              <line x1="17.5" y1="18.2" x2="11.5" y2="21.8" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
              {/* Left Twistlock Housing & Collar Locking into Container Corner */}
              <rect
                x="9"
                y="19.8"
                width="4.8"
                height="2.4"
                rx="0.5"
                fill="#1E293B"
                stroke="#EAB308"
                strokeWidth="0.4"
              />
              {/* Green Twistlock Engagement Pin Indicator (Locked!) */}
              <circle cx="11.4" cy="21" r="0.75" fill="#10B981" />

              {/* RIGHT CORNER: Front & Rear Corner Lifting Connections */}
              {/* Right Connection 3 (Front Vertical Drop Shaft) */}
              <rect
                x="147.4"
                y="18.2"
                width="2.6"
                height="4.2"
                rx="0.4"
                fill="url(#twistlockGrad)"
                stroke="#0F172A"
                strokeWidth="0.4"
              />
              {/* Right Connection 4 (Angled Heavy Support Stay) */}
              <line x1="142.5" y1="18.2" x2="148.5" y2="21.8" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
              {/* Right Twistlock Housing & Collar Locking into Container Corner */}
              <rect
                x="146.2"
                y="19.8"
                width="4.8"
                height="2.4"
                rx="0.5"
                fill="#1E293B"
                stroke="#EAB308"
                strokeWidth="0.4"
              />
              {/* Green Twistlock Engagement Pin Indicator (Locked!) */}
              <circle cx="148.6" cy="21" r="0.75" fill="#10B981" />
            </svg>
          </div>

          {/* ================================================================= */}
          {/* 6. REALISTIC MINIATURE RED SHIPPING CONTAINER                     */}
          {/* Visibly supported directly by the 4 spreader twist-locks above    */}
          {/* ================================================================= */}
          <div className="relative w-full h-[43px] xl:h-[44px] rounded-[3px] overflow-hidden bg-gradient-to-b from-[#D43330] via-[#B62825] to-[#8F1917] border border-[#7A1513] shadow-[0_6px_14px_rgba(0,0,0,0.35),0_1px_3px_rgba(0,0,0,0.2)] group-hover:shadow-[0_8px_20px_rgba(182,40,37,0.45),0_2px_4px_rgba(0,0,0,0.25)] group-hover:brightness-[1.06] transition-all duration-200">
            
            {/* Realistic Corrugated Metal Panels (Vertical Rib Grooves) */}
            <div
              className="absolute inset-x-2.5 inset-y-1 pointer-events-none opacity-45"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(0,0,0,0.36) 0px, rgba(0,0,0,0.36) 2px, transparent 2px, transparent 6px, rgba(255,255,255,0.18) 6px, rgba(255,255,255,0.18) 8px, transparent 8px, transparent 12px)',
              }}
              aria-hidden="true"
            />

            {/* Top Structural Horizontal Rail (Steel Beam with Rivet Highlights) */}
            <div className="absolute top-0 inset-x-0 h-[3.5px] bg-[#871816] border-b border-[#D43330]/40 flex items-center justify-around px-4">
              <span className="w-0.5 h-0.5 rounded-full bg-white/40" />
              <span className="w-0.5 h-0.5 rounded-full bg-white/40" />
              <span className="w-0.5 h-0.5 rounded-full bg-white/40" />
              <span className="w-0.5 h-0.5 rounded-full bg-white/40" />
            </div>

            {/* Bottom Structural Horizontal Rail with Forklift Pockets */}
            <div className="absolute bottom-0 inset-x-0 h-[4.5px] bg-[#6B1311] border-t border-[#3B0A09] flex items-center justify-center gap-6">
              <div className="w-3.5 h-[2.5px] rounded-[1px] bg-[#1E222A] border border-[#374151]" />
              <div className="w-3.5 h-[2.5px] rounded-[1px] bg-[#1E222A] border border-[#374151]" />
            </div>

            {/* Left & Right Vertical Structural Corner Posts */}
            <div className="absolute inset-y-0 left-0 w-[11px] bg-gradient-to-r from-[#1E222A] via-[#2A303C] to-[#1E222A] border-r border-[#374151]" />
            <div className="absolute inset-y-0 right-0 w-[11px] bg-gradient-to-l from-[#1E222A] via-[#2A303C] to-[#1E222A] border-l border-[#374151]" />

            {/* Corner Castings with Oval Twistlock Apertures */}
            {/* Top-Left Corner Casting (Engaged with Crane Spreader Twistlock) */}
            <div className="absolute top-0 left-0 w-[11px] h-[9px] bg-[#1A1D24] border-r border-b border-[#475569] flex items-center justify-center z-10">
              <div className="w-[5px] h-[3px] rounded-full bg-[#0B0D12] border border-[#64748B]/70" />
            </div>
            {/* Top-Right Corner Casting (Engaged with Crane Spreader Twistlock) */}
            <div className="absolute top-0 right-0 w-[11px] h-[9px] bg-[#1A1D24] border-l border-b border-[#475569] flex items-center justify-center z-10">
              <div className="w-[5px] h-[3px] rounded-full bg-[#0B0D12] border border-[#64748B]/70" />
            </div>
            {/* Bottom-Left Corner Casting */}
            <div className="absolute bottom-0 left-0 w-[11px] h-[9px] bg-[#1A1D24] border-r border-t border-[#475569] flex items-center justify-center z-10">
              <div className="w-[5px] h-[3px] rounded-full bg-[#0B0D12] border border-[#64748B]/70" />
            </div>
            {/* Bottom-Right Corner Casting */}
            <div className="absolute bottom-0 right-0 w-[11px] h-[9px] bg-[#1A1D24] border-l border-t border-[#475569] flex items-center justify-center z-10">
              <div className="w-[5px] h-[3px] rounded-full bg-[#0B0D12] border border-[#64748B]/70" />
            </div>

            {/* Container Stencil Marking: MSKU 2026-HQ */}
            <div className="absolute top-[3px] left-[14px] z-10 flex items-center gap-1 pointer-events-none">
              <span className="font-mono-code text-[6.5px] font-bold text-white/55 tracking-[0.14em] uppercase">
                MSKU 2026
              </span>
            </div>

            {/* Container Stencil Marking: ISO 9001 Seal Indicator */}
            <div className="absolute top-[3px] right-[14px] z-10 pointer-events-none">
              <span className="font-mono-code text-[6px] font-semibold text-white/45 tracking-widest uppercase">
                ISO 9001
              </span>
            </div>

            {/* MAIN CTA CONTENT: Bold White "GET A QUOTE" + Arrow Icon */}
            <div className="relative z-10 h-full w-full pl-[13px] pr-[12px] pt-[6px] pb-[3px] flex items-center justify-between">
              <div className="flex flex-col text-left leading-[1.08]">
                <span className="font-nav text-[9px] font-bold tracking-[0.16em] uppercase text-white/90">
                  GET A
                </span>
                <span className="font-nav text-[14px] xl:text-[14.5px] font-black tracking-[0.1em] uppercase text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] group-hover:text-white transition-colors">
                  QUOTE
                </span>
              </div>

              {/* Arrow Icon with Subtle Metallic Bevel */}
              <div className="w-6 h-6 rounded bg-black/25 border border-white/20 flex items-center justify-center group-hover:bg-[#801412] group-hover:border-white/40 transition-colors shrink-0 shadow-xs">
                <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.8] transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Subtle Metallic Corner Highlight Reflection */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-transparent to-white"
              aria-hidden="true"
            />
          </div>

        </div>
      </Link>
    </div>
  );
};
