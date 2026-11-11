import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, Check } from 'lucide-react';
import { CORE_SERVICES } from '../../data/company';

export interface BreadcrumbItem {
  label: string;
  to?: string;
  isCurrent?: boolean;
  hasDropdown?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  return (
    <nav aria-label="Breadcrumb" className={`relative z-30 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[11.5px] sm:text-[12px] font-mono-code text-[#AEB6C2]">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1 || item.isCurrent;

          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-[#AEB6C2]/60 shrink-0 select-none" aria-hidden="true" />
              )}

              {item.hasDropdown ? (
                <div className="relative inline-flex items-center" ref={dropdownRef}>
                  {item.to ? (
                    <Link
                      to={item.to}
                      className="hover:text-white transition-colors focus:outline-none focus:underline"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={item.isCurrent ? 'text-[#B62825] font-semibold' : ''}>
                      {item.label}
                    </span>
                  )}

                  {/* Forward Hierarchy Dropdown Trigger */}
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="ml-1 p-0.5 rounded hover:bg-white/10 text-[#AEB6C2] hover:text-white transition-colors focus:outline-none cursor-pointer"
                    aria-label="View all service subpages (forward navigation)"
                    aria-expanded={dropdownOpen}
                    title="Select child service"
                  >
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Services Forward Menu Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-[#12141A] border border-white/15 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
                      <div className="px-2.5 py-1.5 text-[10px] uppercase font-mono tracking-wider text-neutral-400 border-b border-white/10 flex items-center justify-between">
                        <span>Services Directory</span>
                        <span className="text-[#B62825] font-bold">6 Modes</span>
                      </div>
                      <div className="py-1 space-y-0.5">
                        {CORE_SERVICES.map((s) => {
                          const isCurrentService = items.some(it => it.label.toLowerCase() === s.title.toLowerCase());
                          return (
                            <Link
                              key={s.id}
                              to={`/services/${s.slug}`}
                              onClick={() => setDropdownOpen(false)}
                              className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-sans transition-colors ${
                                isCurrentService
                                  ? 'bg-[#B62825]/20 text-[#B62825] font-bold'
                                  : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              <span className="truncate">{s.title}</span>
                              {isCurrentService && <Check className="w-3.5 h-3.5 text-[#B62825] shrink-0" />}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : isLast ? (
                <span
                  className="text-[#B62825] font-semibold"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.to ? (
                <Link
                  to={item.to}
                  className="hover:text-white transition-colors focus:outline-none focus:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

