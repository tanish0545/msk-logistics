import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface CartingDropdownSectionProps {
  onClose?: () => void;
  className?: string;
}

interface CartingOption {
  readonly id: string;
  readonly name: string;
  readonly path: string;
  readonly label: string;
}

const CARTING_OPTIONS: readonly CartingOption[] = [
  {
    id: 'speedy',
    name: 'Speedy',
    path: '/services/container-stuffing#speedy',
    label: 'Speedy CFS Carting Operations',
  },
  {
    id: 'punjab',
    name: 'Punjab',
    path: '/services/container-stuffing#punjab',
    label: 'Punjab Conware CFS Carting Operations',
  },
  {
    id: 'polaris',
    name: 'Polaris',
    path: '/services/container-stuffing#polaris',
    label: 'Polaris Marine Logistics CFS Carting Operations',
  },
];

/**
 * CARTING Section Component
 * 
 * Restores the authentic compact white/light diagram panel:
 * - Centered CARTING heading badge
 * - Tree connector branches (SVG with MSK red lines and junction dots)
 * - Three individual options: Speedy, Punjab, Polaris
 * - Fully interactive, clickable with directional arrow and hover states
 */
export const CartingDropdownSection: React.FC<CartingDropdownSectionProps> = ({
  onClose,
  className = '',
}) => {
  return (
    <div
      className={`p-3 sm:p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs select-none ${className}`}
      aria-label="MSK Carting Terminals: Speedy, Punjab, Polaris"
    >
      {/* Centered Parent Node: CARTING Heading */}
      <div className="flex justify-center">
        <Link
          to="/services/container-stuffing#carting"
          onClick={onClose}
          className="group/parent inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F5] hover:bg-[#FEE2E2] border border-[#B62825]/50 hover:border-[#B62825] shadow-2xs transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825]"
          title="MSK Carting Operations"
          aria-label="MSK Carting Operations"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B62825] shadow-[0_0_6px_rgba(182,40,37,0.7)]" />
          <span className="font-heading font-extrabold text-[11.5px] text-[#B62825] tracking-widest uppercase transition-colors">
            CARTING
          </span>
        </Link>
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
          <circle cx="50" cy="18" r="1.75" fill="#B62825" />
          <circle cx="150" cy="18" r="1.75" fill="#B62825" />
          <circle cx="250" cy="18" r="1.75" fill="#B62825" />
        </svg>
      </div>

      {/* 3 Child Company Nodes Horizontally Aligned */}
      <div className="grid grid-cols-3 gap-2">
        {CARTING_OPTIONS.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={onClose}
            className="group/node flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white hover:bg-[#FFF5F5] border border-[#E2E8F0] hover:border-[#B62825] shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825]"
            aria-label={item.label}
          >
            <span className="text-[12px] font-semibold text-[#202124] group-hover/node:text-[#B62825] transition-colors">
              {item.name}
            </span>
            <ArrowRight className="w-2.5 h-2.5 text-slate-400 group-hover/node:text-[#B62825] group-hover/node:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
};
