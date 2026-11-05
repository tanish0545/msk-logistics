import React from 'react';

export interface CartingDropdownSectionProps {
  theme?: 'dark' | 'light';
  className?: string;
}

/**
 * CARTING Section Component
 * 
 * Preserves the exact visual hierarchy, connecting tree lines, and three terminals:
 * - Speedy
 * - Punjab
 * - Polaris
 * 
 * Retains 100% authentic identity and connections with enhanced industrial polish.
 */
export const CartingDropdownSection: React.FC<CartingDropdownSectionProps> = ({
  theme = 'dark',
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`p-3.5 rounded-xl border transition-all duration-200 select-none ${
        isDark
          ? 'bg-[#121620]/90 border-[#262F3E] shadow-inner'
          : 'bg-[#F8F9FA] border-[#E9ECEF]'
      } ${className}`}
      aria-label="MSK Carting Terminals: Speedy, Punjab, Polaris"
    >
      {/* Centered Parent Node: CARTING (Display-only, non-clickable) */}
      <div className="flex justify-center">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border shadow-xs select-none cursor-default pointer-events-none ${
            isDark
              ? 'bg-[#181E2B] border-[#B62825]/60 text-white'
              : 'bg-white border-[#B62825]/40 text-[#202124]'
          }`}
          title="MSK Carting Operations"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B62825] shadow-[0_0_6px_#B62825]" />
          <span className="font-heading font-bold text-[10.5px] tracking-widest uppercase">
            CARTING
          </span>
        </div>
      </div>

      {/* Tree Connector Lines (SVG with MSK-red accents) */}
      <div className="relative w-full h-4.5 my-1.5 select-none pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none">
          {/* Central vertical stem from parent */}
          <path d="M 150 0 L 150 10" stroke="#B62825" strokeWidth="1.5" strokeLinecap="round" />
          {/* Horizontal connector bar spanning across all 3 child columns */}
          <path d="M 50 10 L 250 10" stroke="#B62825" strokeWidth="1.5" strokeLinecap="round" />
          {/* Left drop to Speedy */}
          <path d="M 50 10 L 50 20" stroke="#B62825" strokeWidth="1.5" strokeLinecap="round" />
          {/* Center drop to Punjab */}
          <path d="M 150 10 L 150 20" stroke="#B62825" strokeWidth="1.5" strokeLinecap="round" />
          {/* Right drop to Polaris */}
          <path d="M 250 10 L 250 20" stroke="#B62825" strokeWidth="1.5" strokeLinecap="round" />
          {/* Junction & Terminal Dots */}
          <circle cx="150" cy="10" r="2" fill="#B62825" />
          <circle cx="50" cy="18" r="2" fill="#B62825" />
          <circle cx="150" cy="18" r="2" fill="#B62825" />
          <circle cx="250" cy="18" r="2" fill="#B62825" />
        </svg>
      </div>

      {/* 3 Child Company Nodes Horizontally Aligned (Speedy, Punjab, Polaris) */}
      <div className="grid grid-cols-3 gap-2 select-none">
        <div
          className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-lg border text-center transition-all duration-200 cursor-default pointer-events-none ${
            isDark
              ? 'bg-[#181E2B] border-[#2A3445] text-slate-200 shadow-2xs'
              : 'bg-white border-[#E2E8F0] text-[#202124] shadow-2xs'
          }`}
        >
          <span className="text-[12px] font-bold tracking-tight">
            Speedy
          </span>
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
            CFS
          </span>
        </div>

        <div
          className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-lg border text-center transition-all duration-200 cursor-default pointer-events-none ${
            isDark
              ? 'bg-[#181E2B] border-[#2A3445] text-slate-200 shadow-2xs'
              : 'bg-white border-[#E2E8F0] text-[#202124] shadow-2xs'
          }`}
        >
          <span className="text-[12px] font-bold tracking-tight">
            Punjab
          </span>
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
            Conware
          </span>
        </div>

        <div
          className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-lg border text-center transition-all duration-200 cursor-default pointer-events-none ${
            isDark
              ? 'bg-[#181E2B] border-[#2A3445] text-slate-200 shadow-2xs'
              : 'bg-white border-[#E2E8F0] text-[#202124] shadow-2xs'
          }`}
        >
          <span className="text-[12px] font-bold tracking-tight">
            Polaris
          </span>
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
            Logistics
          </span>
        </div>
      </div>
    </div>
  );
};
