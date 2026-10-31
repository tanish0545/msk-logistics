import React from 'react';

export interface InnerPageBannerProps {
  badge?: React.ReactNode;
  badgeSubtext?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const InnerPageBanner: React.FC<InnerPageBannerProps> = ({
  badge,
  badgeSubtext,
  breadcrumb,
  title,
  description,
  meta,
  children,
  className = '',
}) => {
  return (
    <section className={`bg-[#1A1C23] text-white py-6 sm:py-8 lg:py-8.5 border-b border-[#2D3139] relative overflow-hidden ${className}`}>
      {/* Background Gradient — Dark Graphite to Deep Charcoal */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#14161D] via-[#1E212B] to-[#14161D] opacity-95 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Subtle Industrial Micro-grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #D9DEE5 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      {/* Titanium Top Hairline Accent */}
      <div 
        className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D9DEE5]/20 to-transparent pointer-events-none" 
        aria-hidden="true" 
      />

      {/* MSK Crimson Bottom Accent Line */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#B62825]/60 to-transparent pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-2.5 sm:space-y-3 relative z-10">
        {/* Optional Breadcrumb */}
        {breadcrumb && (
          <div className="flex flex-wrap items-center gap-1.5 text-[11.5px] sm:text-[12px] font-mono-code text-[#AEB6C2]">
            {breadcrumb}
          </div>
        )}

        {/* Badge + Subtext Row */}
        {(badge || badgeSubtext) && (
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {badge && (
              typeof badge === 'string' ? (
                <span className="editorial-badge bg-white/[0.06] text-[#D9DEE5] border border-white/15 shadow-2xs">
                  {badge}
                </span>
              ) : badge
            )}
            {badgeSubtext && (
              typeof badgeSubtext === 'string' ? (
                <span className="text-[11px] sm:text-xs font-mono tracking-wider text-[#AEB6C2] uppercase">
                  {badgeSubtext}
                </span>
              ) : badgeSubtext
            )}
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold font-heading text-[#F4F5F7] tracking-tight leading-tight">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-[#D9DEE5]/80 text-[13.5px] sm:text-[14.5px] max-w-3xl font-body leading-relaxed">
            {description}
          </p>
        )}

        {/* Optional Metadata Row */}
        {meta && (
          <div className="pt-0.5 text-xs font-mono text-[#AEB6C2]">
            {meta}
          </div>
        )}

        {/* Optional Children */}
        {children}
      </div>
    </section>
  );
};

