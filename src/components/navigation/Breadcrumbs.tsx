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
                    <div className="absolute top-full left-0 mt-2 w-80 bg-[#0B0D13] border border-white/20 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.1)] p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
                      <div className="px-3 py-2 text-[10px] uppercase font-mono tracking-wider text-slate-300 border-b border-white/10 flex items-center justify-between font-bold">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
                          <span>Services Directory</span>
                        </span>
                        <span className="text-[#B62825] font-extrabold px-1.5 py-0.5 rounded bg-[#B62825]/15 border border-[#B62825]/30">6 MODES</span>
                      </div>
                      <div className="py-1.5 space-y-1">
                        {CORE_SERVICES.map((s) => {
                          const isCurrentService = items.some(it => it.label.toLowerCase() === s.title.toLowerCase());
                          return (
                            <Link
                              key={s.id}
                              to={`/services/${s.slug}`}
                              onClick={() => setDropdownOpen(false)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-sans transition-all cursor-pointer ${
                                isCurrentService
                                  ? 'bg-[#B62825] text-white font-bold shadow-md'
                                  : 'text-slate-200 hover:bg-white/10 hover:text-white hover:translate-x-0.5'
                              }`}
                            >
                              <span className="truncate font-medium">{s.title}</span>
                              {isCurrentService ? (
                                <Check className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                              ) : (
                                <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-200 uppercase">Explore &rarr;</span>
                              )}
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

