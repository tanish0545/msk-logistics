import React from 'react';

export interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  showRedAccent?: boolean;
  elevation?: 'subtle' | 'medium' | 'high';
}

/**
 * InteractiveCard: Reusable card wrapper implementing Concept 03:
 * - Subtle elevation on hover
 * - Smooth shadow transition with MSK crimson tint
 * - MSK-red border illumination
 * - Top animated accent line
 * - Hardware-accelerated and respects prefers-reduced-motion
 */
export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  showRedAccent = true,
  elevation = 'medium',
  ...rest
}) => {
  const elevationClasses = {
    subtle: 'hover:-translate-y-1 hover:shadow-md hover:border-[#B62825]/40',
    medium: 'hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-8px_rgba(182,40,37,0.12),0_4px_12px_-2px_rgba(0,0,0,0.05)] hover:border-[#B62825]/50',
    high: 'hover:-translate-y-2 hover:shadow-[0_20px_36px_-6px_rgba(182,40,37,0.18),0_6px_16px_-2px_rgba(0,0,0,0.08)] hover:border-[#B62825]/60',
  }[elevation];

  return (
    <div
      className={`group relative rounded-xl border border-[#E2E2E2] bg-white transition-all duration-300 ease-out focus-within:ring-2 focus-within:ring-[#B62825] focus-within:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none ${elevationClasses} ${className}`}
      {...rest}
    >
      {showRedAccent && (
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-[#B62825] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20 motion-reduce:hidden rounded-t-xl pointer-events-none"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
};

