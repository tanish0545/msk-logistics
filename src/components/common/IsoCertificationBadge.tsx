import React from 'react';

export interface IsoCertificationBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  showText?: boolean;
}

export const IsoCertificationBadge: React.FC<IsoCertificationBadgeProps> = ({
  className = '',
  size = 'md',
  theme = 'light',
  showText = true,
}) => {
  // Dimensions preserving the exact 1:1 circular ratio of the supplied seal
  const sizeMap = {
    sm: 'w-12 h-12 sm:w-14 sm:h-14',
    md: 'w-16 h-16 sm:w-18 sm:h-18',
    lg: 'w-22 h-22 sm:w-24 sm:h-24',
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`inline-flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-200 group select-none ${
        isDark
          ? 'bg-[#0E1C30] border border-[#22354F] shadow-sm hover:border-[#385680] hover:-translate-y-0.5'
          : 'bg-white border border-[#E2E8F0] shadow-xs hover:shadow-md hover:border-[#173F70]/40 hover:-translate-y-0.5'
      } ${className}`}
      aria-label="Certified ISO 9001:2015 Company"
    >
      {/* Exact Original Supplied Seal Asset — 100% Preserved Artwork & Geometry */}
      <div className={`relative ${sizeMap[size]} shrink-0 flex items-center justify-center p-1 rounded-xl bg-white overflow-hidden shadow-xs`}>
        <img
          src="/images/iso/iso-9001-2015.png"
          alt="Certified ISO 9001:2015 Company"
          className="w-full h-full object-contain select-none"
          loading="eager"
          decoding="async"
        />
      </div>

      {showText && (
        <div className="space-y-0.5 text-left">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span
              className={`text-[10px] sm:text-[10.5px] font-mono font-bold tracking-wider uppercase ${
                isDark ? 'text-slate-300' : 'text-[#173F70]'
              }`}
            >
              CERTIFIED COMPANY
            </span>
          </div>
          <div
            className={`text-[13px] sm:text-[14px] font-bold font-heading tracking-tight ${
              isDark ? 'text-white' : 'text-[#1E293B]'
            }`}
          >
            ISO 9001:2015
          </div>
        </div>
      )}
    </div>
  );
};
