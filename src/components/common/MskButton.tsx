import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon } from 'lucide-react';

export type MskButtonVariant = 'primary' | 'secondary' | 'metallic' | 'outline' | 'ghost';
export type MskButtonSize = 'sm' | 'md' | 'lg';

export interface MskButtonProps {
  children: React.ReactNode;
  variant?: MskButtonVariant;
  size?: MskButtonSize;
  to?: string;
  href?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  showArrow?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

export const MskButton: React.FC<MskButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon: Icon,
  iconPosition = 'right',
  showArrow = false,
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  target,
  rel,
  'aria-label': ariaLabel,
}) => {
  // Base classes: GPU accelerated, accessible focus ring, micro press scale, smooth transition
  const baseClasses =
    'group/mskbtn inline-flex items-center justify-center font-heading font-bold select-none cursor-pointer rounded-xl transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B62825] active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none motion-reduce:transform-none motion-reduce:transition-none';

  // Size definitions
  const sizeClasses = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[36px]',
    md: 'text-sm px-5 py-3 gap-2 min-h-[44px]',
    lg: 'text-base px-7 py-4 gap-2.5 min-h-[52px]',
  }[size];

  // Variant definitions
  const variantClasses = {
    // Primary: Official MSK Red with subtle ambient red glow on hover
    primary:
      'bg-[#B62825] hover:bg-[#9E2220] text-white shadow-[0_2px_8px_rgba(182,40,37,0.35)] hover:shadow-[0_4px_20px_rgba(182,40,37,0.55)] hover:-translate-y-0.5 border border-red-500/30',

    // Metallic: Dark industrial metal with Titanium Silver text and subtle edge highlight
    metallic:
      'bg-gradient-to-b from-[#1E232E] to-[#14171F] text-[#D9DEE5] border border-white/15 hover:border-[#B62825]/60 hover:text-white shadow-[0_2px_10px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:-translate-y-0.5',

    // Secondary: Clean dark surface with white text
    secondary:
      'bg-[#161920] hover:bg-[#202531] text-white border border-white/10 hover:border-white/20 shadow-sm hover:-translate-y-0.5',

    // Outline: Crisp transparent with high-contrast border
    outline:
      'bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/60 hover:-translate-y-0.5',

    // Ghost: Subtle transparent hover
    ghost:
      'bg-transparent hover:bg-white/5 text-[#D9DEE5] hover:text-white border border-transparent',
  }[variant];

  const fullClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`.trim();

  // Trailing arrow or custom right icon with forward slide animation
  const renderRightIcon = () => {
    if (showArrow) {
      return (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover/mskbtn:translate-x-1 motion-reduce:transform-none" />
      );
    }
    if (Icon && iconPosition === 'right') {
      return (
        <Icon className="w-4 h-4 transition-transform duration-200 ease-out group-hover/mskbtn:translate-x-1 motion-reduce:transform-none" />
      );
    }
    return null;
  };

  // Leading left icon
  const renderLeftIcon = () => {
    if (Icon && iconPosition === 'left') {
      return (
        <Icon className="w-4 h-4 transition-transform duration-200 ease-out group-hover/mskbtn:-translate-x-0.5 motion-reduce:transform-none" />
      );
    }
    return null;
  };

  const content = (
    <>
      {renderLeftIcon()}
      <span>{children}</span>
      {renderRightIcon()}
    </>
  );

  // 1. Internal React Router link
  if (to) {
    return (
      <Link
        to={to}
        className={fullClasses}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  // 2. External standard hyperlink
  if (href) {
    return (
      <a
        href={href}
        className={fullClasses}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  // 3. Regular HTML button
  return (
    <button
      type={type}
      disabled={disabled}
      className={fullClasses}
      onClick={onClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};
