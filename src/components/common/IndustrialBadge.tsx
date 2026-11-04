import React from 'react';

export type IndustrialBadgeVariant = 
  | 'msk-logistics'
  | 'est-2019'
  | 'project-cargo'
  | 'cargo-handling'
  | 'handle-with-care'
  | 'ocean-air-land'
  | 'beyond-logistics';

export interface IndustrialBadgeProps {
  variant: IndustrialBadgeVariant;
  theme?: 'dark' | 'light' | 'red';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  withRivet?: boolean;
}

const BADGE_CONFIG: Record<IndustrialBadgeVariant, { label: string; code: string }> = {
  'msk-logistics': { label: 'MSK LOGISTICS', code: 'ID: MSK-EXP' },
  'est-2019': { label: 'EST. 2019', code: 'FOUNDED MAY 2019' },
  'project-cargo': { label: 'PROJECT CARGO', code: 'ODC / SPEC' },
  'cargo-handling': { label: 'CARGO HANDLING', code: 'PORT RIGGING' },
  'handle-with-care': { label: 'HANDLE WITH CARE', code: 'FRAGILE / ISPM-15' },
  'ocean-air-land': { label: 'OCEAN / AIR / LAND', code: 'MULTIMODAL' },
  'beyond-logistics': { label: 'BEYOND LOGISTICS', code: 'DELIVER TRUST' },
};

export const IndustrialBadge: React.FC<IndustrialBadgeProps> = ({
  variant,
  theme = 'dark',
  size = 'sm',
  className = '',
  withRivet = true,
}) => {
  const info = BADGE_CONFIG[variant];

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[9px]',
    sm: 'px-2.5 py-1 text-[10px]',
    md: 'px-3 py-1.5 text-[11px]',
  }[size];

  const themeClasses = {
    dark: 'bg-[#000000] text-white border-white/20 shadow-xs hover:border-white/40',
    light: 'bg-[#F8FAFC] text-[#1E293B] border-[#E2E8F0] shadow-2xs hover:border-neutral-400',
    red: 'bg-[#B62825] text-white border-red-700 shadow-xs hover:bg-[#9E2220]',
  }[theme];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider rounded-md border select-none transition-all duration-200 ${sizeClasses} ${themeClasses} ${className}`}
      title={info.code}
    >
      {withRivet && (
        <span 
          className={`w-1 h-1 rounded-full shrink-0 ${
            theme === 'red' ? 'bg-white' : 'bg-[#B62825]'
          }`} 
          aria-hidden="true" 
        />
      )}
      <span>{info.label}</span>
    </span>
  );
};

