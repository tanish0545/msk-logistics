import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react';
import { NAV_ITEMS, QUOTE_CTA, type NavItem } from './navConfig';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hover handlers for Services dropdown with 180ms grace period
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  // Determine active route
  const isItemActive = (item: NavItem): boolean => {
    if (item.id === 'home') {
      return location.pathname === '/';
    }
    if (item.id === 'services') {
      return (
        location.pathname === '/services' ||
        location.pathname.startsWith('/services/') ||
        location.pathname === '/export-packing-solutions'
      );
    }
    return location.pathname === item.path || location.pathname.startsWith(item.path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E2E2E2] select-none shadow-xs">
      {/* Target total height: 68-76px (72px desktop / 68px mobile) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-[68px] sm:h-[72px] flex items-center justify-between">
        
        {/* 1. Logo (Far Left) - approx 95-105px wide, perfectly vertically centered */}
        <div className="flex-shrink-0 flex items-center">
          <Link
            to="/"
            className="flex items-center transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F70] rounded-sm py-1"
            aria-label="MSK Logistics Homepage"
          >
            <img
              src="/images/logo/msk-logistics-logo.png"
              alt="MSK Logistics Solution"
              className="w-[96px] sm:w-[100px] h-auto object-contain"
              width="100"
              height="50"
            />
          </Link>
        </div>

        {/* 2. Desktop Navigation Links (Centered / Single Horizontal Row) */}
        <nav
          className="hidden xl:flex items-center h-full gap-1 xl:gap-2 2xl:gap-3.5 3xl:gap-5 flex-1 justify-center px-2"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item);

            if (item.hasDropdown) {
              return (
                <div
                  key={item.id}
                  ref={dropdownRef}
                  className="relative h-full flex items-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="group relative h-full flex items-center">
                    <Link
                      to={item.path}
                      className={`relative h-full flex items-center gap-1.5 px-2.5 py-1 text-[14px] 2xl:text-[14.5px] font-nav transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F70] rounded-sm whitespace-nowrap ${
                        active
                          ? 'text-[#173F70] font-semibold'
                          : 'text-[#475569] font-normal hover:text-[#173F70]'
                      }`}
                      aria-haspopup="true"
                      aria-expanded={servicesDropdownOpen}
                    >
                      <span>{item.label}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setServicesDropdownOpen(!servicesDropdownOpen);
                        }}
                        className="p-0.5 rounded hover:bg-neutral-100 transition-colors focus:outline-none"
                        aria-label="Toggle Services submenu"
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 stroke-[2.2] ${
                            servicesDropdownOpen ? 'rotate-180 text-[#173F70]' : 'text-current group-hover:text-[#173F70]'
                          }`}
                        />
                      </button>

                      {/* Smooth Animated Red Underline Bar */}
                      <span
                        className={`absolute bottom-0 left-2 right-2 h-[2px] bg-[#B62825] rounded-t-full transition-all duration-200 ease-out origin-left pointer-events-none ${
                          active
                            ? 'scale-x-100 opacity-100'
                            : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                        }`}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  {/* Services Dropdown Menu */}
                  {servicesDropdownOpen && (
                    <div
                      className="absolute top-full left-0 pt-1.5 z-50 min-w-[290px] animate-in fade-in slide-in-from-top-1 duration-180"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <div className="bg-white rounded-xl shadow-xl border border-[#E2E2E2] py-2 overflow-hidden">
                        <div className="px-4 py-1.5 border-b border-[#F0F0F0] text-[10.5px] font-mono uppercase tracking-wider text-[#94A3B8]">
                          Specialized Services
                        </div>
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            to={dropdownItem.path}
                            role="menuitem"
                            className="block px-4 py-2 hover:bg-[#F8F9FA] transition-colors group/item"
                            onClick={() => setServicesDropdownOpen(false)}
                          >
                            <div className="text-[13.5px] font-medium text-[#1E293B] group-hover/item:text-[#173F70] transition-colors">
                              {dropdownItem.label}
                            </div>
                            <div className="text-[11.5px] text-[#64748B] line-clamp-1">
                              {dropdownItem.description}
                            </div>
                          </Link>
                        ))}
                        <div className="border-t border-[#F0F0F0] mt-1 pt-2 px-4 pb-1">
                          <Link
                            to="/services"
                            className="text-[12px] font-semibold text-[#B62825] hover:underline inline-flex items-center gap-1"
                            onClick={() => setServicesDropdownOpen(false)}
                          >
                            <span>View All Services Directory</span>
                            <span>&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (item.isExternal && item.externalUrl) {
              return (
                <div key={item.id} className="relative h-full flex items-center">
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-full flex items-center px-2.5 py-1 font-nav text-[14px] 2xl:text-[14.5px] text-[#475569] font-normal hover:text-[#173F70] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F70] rounded-sm whitespace-nowrap"
                  >
                    <span>{item.label}</span>
                    <span
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#B62825] rounded-t-full transition-all duration-200 ease-out origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 pointer-events-none"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              );
            }

            return (
              <div key={item.id} className="relative h-full flex items-center">
                <Link
                  to={item.path}
                  className={`group relative h-full flex items-center px-2.5 py-1 font-nav text-[14px] 2xl:text-[14.5px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F70] rounded-sm whitespace-nowrap ${
                    active
                      ? 'text-[#173F70] font-semibold'
                      : 'text-[#475569] font-normal hover:text-[#173F70]'
                  }`}
                >
                  <span>{item.label}</span>

                  {/* Smooth Animated Red Underline Bar */}
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-[2px] bg-[#B62825] rounded-t-full transition-all duration-200 ease-out origin-left pointer-events-none ${
                      active
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        {/* 3. Get a Quote CTA Button (Far Right) - Height approx 52-54px */}
        <div className="hidden sm:flex items-center flex-shrink-0">
          <Link
            to={QUOTE_CTA.path}
            className="w-[136px] sm:w-[142px] h-[52px] sm:h-[54px] rounded-lg bg-[#B62825] hover:bg-[#9E2220] text-white flex items-center justify-between px-3.5 sm:px-4 shadow-sm hover:shadow-md transition-all duration-200 ease-out group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B62825]"
            aria-label="Request a logistics quote"
          >
            <div className="flex flex-col text-left leading-[1.12]">
              <span className="text-[11px] font-bold tracking-wider uppercase text-white/95 font-nav">
                {QUOTE_CTA.line1}
              </span>
              <span className="text-[15px] font-extrabold tracking-wider uppercase text-white font-nav">
                {QUOTE_CTA.line2}
              </span>
            </div>
            <ArrowUpRight className="w-4.5 h-4.5 text-white stroke-[2.4] transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0 ml-1.5" />
          </Link>
        </div>

        {/* 4. Mobile & Tablet Menu Toggle Button */}
        <div className="flex xl:hidden items-center gap-2.5">
          <Link
            to={QUOTE_CTA.path}
            className="sm:hidden h-[38px] px-3 rounded-lg bg-[#B62825] hover:bg-[#9E2220] text-white flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <span>Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            className="p-2 rounded-lg text-[#173F70] hover:bg-[#F5F5F3] focus:outline-none focus:ring-2 focus:ring-[#173F70] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2]" /> : <Menu className="w-6 h-6 stroke-[2]" />}
          </button>
        </div>
      </div>

      {/* 5. Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#E2E2E2] shadow-2xl px-5 pt-3 pb-8 space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in duration-200">
          <div className="flex flex-col space-y-1 font-nav">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item);

              if (item.hasDropdown) {
                return (
                  <div key={item.id} className="py-1">
                    <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#F8F9FA]">
                      <Link
                        to={item.path}
                        className={`text-[15px] font-medium ${
                          active ? 'text-[#173F70] font-semibold' : 'text-[#52627A]'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="p-1.5 text-[#52627A] hover:text-[#173F70]"
                        aria-label="Expand services list"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileServicesOpen ? 'rotate-180 text-[#173F70]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="pl-4 pr-2 py-2 space-y-1.5 border-l-2 border-[#E2E2E2] ml-4 mt-1 bg-[#FAFAFA] rounded-r-lg">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            to={dropdownItem.path}
                            className="block py-1.5 px-2 text-[14px] text-[#52627A] hover:text-[#173F70] font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                        <Link
                          to="/services"
                          className="block py-1 px-2 text-[13px] font-semibold text-[#B62825]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          All Services Directory &rarr;
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              if (item.isExternal && item.externalUrl) {
                return (
                  <a
                    key={item.id}
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 rounded-lg text-[15px] font-medium text-[#52627A] hover:bg-[#F8F9FA] hover:text-[#173F70] transition-colors flex items-center justify-between"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#94A3B8]">↗</span>
                  </a>
                );
              }

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`py-2 px-3 rounded-lg text-[15px] font-medium transition-colors flex items-center justify-between ${
                    active
                      ? 'text-[#173F70] bg-[#EEF2F6] font-semibold border-l-4 border-[#B62825]'
                      : 'text-[#52627A] hover:bg-[#F8F9FA] hover:text-[#173F70]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="text-[11px] font-mono text-[#B62825] uppercase tracking-wider font-bold">
                      Active
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Prominent Red Get a Quote CTA for Mobile Drawer */}
          <div className="pt-4 border-t border-[#E2E2E2] space-y-3">
            <Link
              to={QUOTE_CTA.path}
              className="w-full h-[56px] rounded-[10px] bg-[#B62825] hover:bg-[#9E2220] text-white flex items-center justify-between px-6 shadow-md transition-all font-nav"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex flex-col text-left leading-[1.12]">
                <span className="text-[12px] font-bold tracking-wider uppercase text-white/95">
                  {QUOTE_CTA.line1}
                </span>
                <span className="text-[16px] font-extrabold tracking-wider uppercase text-white">
                  {QUOTE_CTA.line2}
                </span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white stroke-[2.4]" />
            </Link>

            <div className="text-center pt-1">
              <span className="text-xs text-[#64748B] font-mono">
                JNPT • Navi Mumbai • Export Packing Solutions
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
