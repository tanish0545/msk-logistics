import React from 'react';

/**
 * CARTING Section Component
 * 
 * Preserves the exact visual appearance, connecting lines, and three options:
 * - Speedy
 * - Punjab
 * - Polaris
 * 
 * Content, styling, and structure remain 100% identical to the approved design.
 */
export const CartingDropdownSection: React.FC = () => {
  return (
    <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#E9ECEF]">
      {/* Centered Parent Node: CARTING (Display-only, non-clickable) */}
      <div className="flex justify-center">
        <div
          className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white border border-[#B62825]/40 shadow-2xs select-none cursor-default pointer-events-none"
          title="Carting Operations"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B62825] shadow-[0_0_4px_rgba(182,40,37,0.5)]" />
          <span className="font-heading font-bold text-[11px] text-[#202124] tracking-widest uppercase">
            CARTING
          </span>
        </div>
      </div>

      {/* Tree Connector Lines (SVG with MSK-red accents) */}
      <div className="relative w-full h-4 my-1 select-none pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none">
          {/* Central vertical stem from parent */}
          <path d="M 150 0 L 150 10" stroke="#B62825" strokeWidth="1.2" />
          {/* Horizontal connector bar spanning across all 3 child columns */}
          <path d="M 50 10 L 250 10" stroke="#B62825" strokeWidth="1.2" />
          {/* Left drop to Speedy */}
          <path d="M 50 10 L 50 20" stroke="#B62825" strokeWidth="1.2" />
          {/* Center drop to Punjab */}
          <path d="M 150 10 L 150 20" stroke="#B62825" strokeWidth="1.2" />
          {/* Right drop to Polaris */}
          <path d="M 250 10 L 250 20" stroke="#B62825" strokeWidth="1.2" />
          {/* Junction & Terminal Dots */}
          <circle cx="150" cy="10" r="1.75" fill="#B62825" />
          <circle cx="50" cy="18" r="1.5" fill="#B62825" />
          <circle cx="150" cy="18" r="1.5" fill="#B62825" />
          <circle cx="250" cy="18" r="1.5" fill="#B62825" />
        </svg>
      </div>

      {/* 3 Child Company Nodes Horizontally Aligned (Display-only, non-clickable) */}
      <div className="grid grid-cols-3 gap-2 select-none">
        <div className="flex flex-col items-center justify-center py-1.5 px-1 rounded-md bg-white border border-[#E2E8F0] shadow-2xs text-center cursor-default pointer-events-none">
          <span className="text-[12px] font-semibold text-[#202124]">
            Speedy
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-1.5 px-1 rounded-md bg-white border border-[#E2E8F0] shadow-2xs text-center cursor-default pointer-events-none">
          <span className="text-[12px] font-semibold text-[#202124]">
            Punjab
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-1.5 px-1 rounded-md bg-white border border-[#E2E8F0] shadow-2xs text-center cursor-default pointer-events-none">
          <span className="text-[12px] font-semibold text-[#202124]">
            Polaris
          </span>
        </div>
      </div>
    </div>
  );
};

