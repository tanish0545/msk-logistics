import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { NAV_ITEMS, type NavItem } from './navConfig';
import { HangingContainerQuoteButton } from './HangingContainerQuoteButton';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [mobileBranchesOpen, setMobileBranchesOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const companyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setCompanyDropdownOpen(false);
    setMobileServicesOpen(false);
    setMobileCompanyOpen(false);
    setMobileBranchesOpen(false);
  }, [location.pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (servicesRef.current && !servicesRef.current.contains(target)) {
        setServicesDropdownOpen(false);
      }
      if (companyRef.current && !companyRef.current.contains(target)) {
        setCompanyDropdownOpen(false);
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
        setCompanyDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hover handlers for Services dropdown with 180ms grace period
  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  // Hover handlers for Company dropdown with 180ms grace period
  const handleCompanyEnter = () => {
    if (companyTimeoutRef.current) {
      clearTimeout(companyTimeoutRef.current);
      companyTimeoutRef.current = null;
    }
    setCompanyDropdownOpen(true);
  };

  const handleCompanyLeave = () => {
    companyTimeoutRef.current = setTimeout(() => {
      setCompanyDropdownOpen(false);
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
    if (item.id === 'company') {
      return location.pathname.startsWith('/company');
    }
    return location.pathname === item.path || location.pathname.startsWith(item.path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E2E2E2] select-none shadow-xs">
      {/* Target total height: 68-76px (72px desktop / 68px mobile) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-[68px] sm:h-[72px] flex items-center justify-between">

        {/* 1. Logo (Far Left) - increased by ~25-35% to 150-155px width, vertically centered */}
        <div className="flex-shrink-0 flex items-center">
          <Link
            to="/"
            className="flex items-center transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F70] rounded-sm py-0.5"
            aria-label="MSK Logistics Homepage"
          >
            <img
              src="/images/logo/msk-logistics-logo.png"
              alt="MSK Logistics Solution"
              className="w-[120px] sm:w-[135px] lg:w-[150px] xl:w-[140px] h-auto object-contain"
              width="155"
              height="60"
            />
          </Link>
        </div>

        {/* 2. Desktop Navigation Links (Centered / Single Horizontal Row) */}
        <nav
          className="hidden xl:flex items-center h-full gap-0.5 xl:gap-1 2xl:gap-2.5 3xl:gap-4 flex-1 justify-center px-1"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item);

            if (item.hasDropdown) {
              const isServices = item.id === 'services';
              const isCompany = item.id === 'company';
              const isOpen = isServices ? servicesDropdownOpen : isCompany ? companyDropdownOpen : false;
              const ref = isServices ? servicesRef : companyRef;
              const onEnter = isServices ? handleServicesEnter : handleCompanyEnter;
              const onLeave = isServices ? handleServicesLeave : handleCompanyLeave;
              const onToggle = () => {
                if (isServices) setServicesDropdownOpen(!servicesDropdownOpen);
                if (isCompany) setCompanyDropdownOpen(!companyDropdownOpen);
              };

              return (
                <div
                  key={item.id}
                  ref={ref}
                  className="relative h-full flex items-center"
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  <div className="group relative h-full flex items-center">
                    <Link
                      to={item.path}
                      className={`relative h-full flex items-center gap-1 px-2 xl:px-2.5 py-1 text-[13px] 2xl:text-[14px] 3xl:text-[14.5px] font-nav transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F70] rounded-sm whitespace-nowrap ${active
                        ? 'text-[#173F70] font-semibold'
                        : 'text-[#475569] font-normal hover:text-[#173F70]'
                        }`}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                    >
                      <span>{item.label}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onToggle();
                        }}
                        className="p-0.5 rounded hover:bg-neutral-100 transition-colors focus:outline-none"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 stroke-[2.2] ${isOpen ? 'rotate-180 text-[#173F70]' : 'text-current group-hover:text-[#173F70]'
                            }`}
                        />
                      </button>

                      {/* Smooth Animated Red Underline Bar */}
                      <span
                        className={`absolute bottom-0 left-2 right-2 h-[2px] bg-[#B62825] rounded-t-full transition-all duration-200 ease-out origin-left pointer-events-none ${active
                          ? 'scale-x-100 opacity-100'
                          : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                          }`}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div
                      className={`absolute top-full pt-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-180 ${isCompany ? 'right-0 min-w-[310px]' : 'left-0 w-[360px]'
                        }`}
                      role="menu"
                      aria-orientation="vertical"
                    >
                      {isServices ? (
                        /* SERVICES DROPDOWN — INDUSTRIAL TITANIUM WITH CARTING TREE */
                        <div className="bg-[#0B0D14] rounded-xl shadow-2xl border border-neutral-800/90 py-3 overflow-hidden text-left">
                          {/* 1. Header */}
                          <div className="px-4 pb-1.5 pt-0.5 text-[10.5px] font-mono uppercase tracking-[0.14em] text-[#94A3B8] font-semibold">
                            Specialized Services
                          </div>

                          {/* 2. Specialized Services (Clean Direct Links) */}
                          <div className="py-0.5 space-y-0.5">
                            <Link
                              to="/services/export-packaging"
                              role="menuitem"
                              className="block px-4 py-1.5 text-[13.5px] font-medium text-[#F1F5F9] hover:text-[#B62825] hover:bg-white/[0.04] transition-colors"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              Export Packaging
                            </Link>
                            <Link
                              to="/services/container-stuffing"
                              role="menuitem"
                              className="block px-4 py-1.5 text-[13.5px] font-medium text-[#F1F5F9] hover:text-[#B62825] hover:bg-white/[0.04] transition-colors"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              Container Stuffing
                            </Link>
                            <Link
                              to="/services/cargo-lashing"
                              role="menuitem"
                              className="block px-4 py-1.5 text-[13.5px] font-medium text-[#F1F5F9] hover:text-[#B62825] hover:bg-white/[0.04] transition-colors"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              Cargo Lashing &amp; Securing
                            </Link>
                            <Link
                              to="/export-packing-solutions"
                              role="menuitem"
                              className="block px-4 py-1.5 text-[13.5px] font-medium text-[#F1F5F9] hover:text-[#B62825] hover:bg-white/[0.04] transition-colors"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              Export Packing Solutions
                            </Link>
                          </div>

                          {/* 3. Divider */}
                          <div className="border-t border-neutral-800/80 my-2.5 mx-4" />

                          {/* 4. Carting Hierarchical Tree Diagram (Point 10) */}
                          <div className="px-4 py-1">
                            {/* Centered Parent Node: CARTING */}
                            <div className="flex justify-center">
                              <Link
                                to="/services#carting"
                                className="group/parent inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#161922] border border-[#B62825]/70 hover:border-[#B62825] transition-all shadow-xs"
                                onClick={() => setServicesDropdownOpen(false)}
                                title="View Carting Hierarchy"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#B62825] shadow-[0_0_6px_rgba(182,40,37,0.85)]" />
                                <span className="font-heading font-extrabold text-[12px] text-white tracking-widest uppercase group-hover/parent:text-[#B62825] transition-colors">
                                  CARTING
                                </span>
                              </Link>
                            </div>

                            {/* Tree Connector Lines (SVG with MSK-red accents) */}
                            <div className="relative w-full h-5 my-0.5">
                              <svg className="w-full h-full" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none">
                                {/* Central vertical stem from parent */}
                                <path d="M 150 0 L 150 10" stroke="#B62825" strokeWidth="1.5" />
                                {/* Horizontal connector bar spanning across all 3 child columns */}
                                <path d="M 50 10 L 250 10" stroke="#B62825" strokeWidth="1.5" />
                                {/* Left drop to Speedy */}
                                <path d="M 50 10 L 50 20" stroke="#B62825" strokeWidth="1.5" />
                                {/* Center drop to Punjab */}
                                <path d="M 150 10 L 150 20" stroke="#B62825" strokeWidth="1.5" />
                                {/* Right drop to Pollaris */}
                                <path d="M 250 10 L 250 20" stroke="#B62825" strokeWidth="1.5" />
                                {/* Junction & Terminal Dots */}
                                <circle cx="150" cy="10" r="2" fill="#B62825" />
                                <circle cx="50" cy="19" r="1.75" fill="#B62825" />
                                <circle cx="150" cy="19" r="1.75" fill="#B62825" />
                                <circle cx="250" cy="19" r="1.75" fill="#B62825" />
                              </svg>
                            </div>

                            {/* 3 Child Company Nodes Horizontally Aligned */}
                            <div className="grid grid-cols-3 gap-2">
                              <Link
                                to="/services#carting"
                                className="group/child flex flex-col items-center justify-center py-1.5 px-1 rounded bg-[#13161F] hover:bg-[#1A1E2B] border border-white/[0.08] hover:border-[#B62825] transition-all text-center"
                                onClick={() => setServicesDropdownOpen(false)}
                              >
                                <span className="text-[12.5px] font-semibold text-[#F1F5F9] group-hover/child:text-[#B62825] transition-colors">
                                  Speedy
                                </span>
                              </Link>
                              <Link
                                to="/services#carting"
                                className="group/child flex flex-col items-center justify-center py-1.5 px-1 rounded bg-[#13161F] hover:bg-[#1A1E2B] border border-white/[0.08] hover:border-[#B62825] transition-all text-center"
                                onClick={() => setServicesDropdownOpen(false)}
                              >
                                <span className="text-[12.5px] font-semibold text-[#F1F5F9] group-hover/child:text-[#B62825] transition-colors">
                                  Punjab
                                </span>
                              </Link>
                              <Link
                                to="/services#carting"
                                className="group/child flex flex-col items-center justify-center py-1.5 px-1 rounded bg-[#13161F] hover:bg-[#1A1E2B] border border-white/[0.08] hover:border-[#B62825] transition-all text-center"
                                onClick={() => setServicesDropdownOpen(false)}
                              >
                                <span className="text-[12.5px] font-semibold text-[#F1F5F9] group-hover/child:text-[#B62825] transition-colors">
                                  Pollaris
                                </span>
                              </Link>
                            </div>
                          </div>

                          {/* 5. Divider */}
                          <div className="border-t border-neutral-800/80 my-2.5 mx-4" />

                          {/* 6. View All Services Directory Link */}
                          <div className="px-4 pt-0.5">
                            <Link
                              to="/services"
                              className="text-[12.5px] font-semibold text-[#B62825] hover:text-[#DC2626] inline-flex items-center gap-1.5 transition-colors group/viewall"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              <span>View All Services Directory</span>
                              <span className="group-hover/viewall:translate-x-0.5 transition-transform">&rarr;</span>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        /* COMPANY OVERVIEW DROPDOWN (PRESERVED) */
                        <div className="bg-white rounded-xl shadow-xl border border-[#E2E2E2] py-2 overflow-visible">
                          <div className="px-4 py-1.5 border-b border-[#F0F0F0] text-[10.5px] font-mono uppercase tracking-wider text-[#94A3B8]">
                            Company Overview
                          </div>
                          {item.dropdownItems?.map((dropdownItem) => {
                            const hasSub = dropdownItem.subItems && dropdownItem.subItems.length > 0;

                            if (hasSub) {
                              return (
                                <div key={dropdownItem.path} className="relative group/sub">
                                  <Link
                                    to={dropdownItem.path}
                                    role="menuitem"
                                    className="flex items-center justify-between px-4 py-2 hover:bg-[#F8F9FA] transition-colors group/item border-l-2 border-transparent hover:border-[#B62825]"
                                    onClick={() => setCompanyDropdownOpen(false)}
                                  >
                                    <div>
                                      <div className="text-[13.5px] font-medium text-[#1E293B] group-hover/item:text-[#B62825] transition-colors">
                                        {dropdownItem.label}
                                      </div>
                                      <div className="text-[11.5px] text-[#64748B]">
                                        {dropdownItem.description}
                                      </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover/item:text-[#B62825] group-hover/sub:translate-x-0.5 transition-all shrink-0 ml-2" />
                                  </Link>

                                  {/* Desktop Submenu Flyout */}
                                  <div className="hidden group-hover/sub:block group-focus-within/sub:block absolute right-full top-0 pr-1.5 z-50 min-w-[260px] animate-in fade-in duration-150">
                                    <div className="bg-white rounded-xl shadow-xl border border-[#E2E2E2] py-2 overflow-hidden">
                                      <div className="px-4 py-1.5 border-b border-[#F0F0F0] text-[10px] font-mono uppercase tracking-wider text-[#94A3B8]">
                                        Operating Locations
                                      </div>
                                      {dropdownItem.subItems?.map((sub) => (
                                        <Link
                                          key={sub.path}
                                          to={sub.path}
                                          className="block px-4 py-2 hover:bg-[#F8F9FA] transition-colors group/subitem border-l-2 border-transparent hover:border-[#B62825]"
                                          onClick={() => setCompanyDropdownOpen(false)}
                                        >
                                          <div className="text-[13px] font-medium text-[#1E293B] group-hover/subitem:text-[#B62825] transition-colors">
                                            {sub.label}
                                          </div>
                                          {sub.description && (
                                            <div className="text-[11px] text-[#64748B]">
                                              {sub.description}
                                            </div>
                                          )}
                                        </Link>
                                      ))}
                                      <div className="border-t border-[#F0F0F0] mt-1 pt-1.5 px-4">
                                        <Link
                                          to="/company/branches"
                                          className="text-[11.5px] font-semibold text-[#B62825] hover:underline inline-flex items-center gap-1"
                                          onClick={() => setCompanyDropdownOpen(false)}
                                        >
                                          <span>View All Branches</span>
                                          <span>&rarr;</span>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <Link
                                key={dropdownItem.path}
                                to={dropdownItem.path}
                                role="menuitem"
                                className="block px-4 py-2 hover:bg-[#F8F9FA] transition-colors group/item border-l-2 border-transparent hover:border-[#B62825]"
                                onClick={() => setCompanyDropdownOpen(false)}
                              >
                                <div className="text-[13.5px] font-medium text-[#1E293B] group-hover/item:text-[#B62825] transition-colors">
                                  {dropdownItem.label}
                                </div>
                                <div className="text-[11.5px] text-[#64748B] line-clamp-1">
                                  {dropdownItem.description}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
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
                    className="group relative h-full flex items-center px-2 xl:px-2.5 py-1 font-nav text-[13px] 2xl:text-[14px] 3xl:text-[14.5px] text-[#475569] font-normal hover:text-[#173F70] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F70] rounded-sm whitespace-nowrap"
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
                  className={`group relative h-full flex items-center px-2 xl:px-2.5 py-1 font-nav text-[13px] 2xl:text-[14px] 3xl:text-[14.5px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F70] rounded-sm whitespace-nowrap ${active
                    ? 'text-[#173F70] font-semibold'
                    : 'text-[#475569] font-normal hover:text-[#173F70]'
                    }`}
                >
                  <span>{item.label}</span>

                  {/* Smooth Animated Red Underline Bar */}
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-[2px] bg-[#B62825] rounded-t-full transition-all duration-200 ease-out origin-left pointer-events-none ${active
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

        {/* 3. Right-Side Cluster: Quote Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
          {/* Desktop & Tablet: Hanging Shipping Container CTA */}
          <div className="hidden sm:flex items-center">
            <HangingContainerQuoteButton variant="desktop" />
          </div>

          {/* Mobile Header: Compact Container CTA */}
          <div className="sm:hidden flex items-center">
            <HangingContainerQuoteButton variant="compact" />
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <div className="flex xl:hidden items-center">
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
      </div>

      {/* 5. Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#E2E2E2] shadow-2xl px-5 pt-3 pb-8 space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in duration-200">
          <div className="flex flex-col space-y-1 font-nav">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item);

              if (item.hasDropdown) {
                const isServices = item.id === 'services';
                const isCompany = item.id === 'company';
                const isSubOpen = isServices ? mobileServicesOpen : isCompany ? mobileCompanyOpen : false;
                const toggleSub = () => {
                  if (isServices) setMobileServicesOpen(!mobileServicesOpen);
                  if (isCompany) setMobileCompanyOpen(!mobileCompanyOpen);
                };

                return (
                  <div key={item.id} className="py-1">
                    <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#F8F9FA]">
                      <Link
                        to={item.path}
                        className={`text-[15px] font-medium ${active ? 'text-[#173F70] font-semibold' : 'text-[#52627A]'
                          }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={toggleSub}
                        className="p-1.5 text-[#52627A] hover:text-[#173F70]"
                        aria-label={`Expand ${item.label} list`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isSubOpen ? 'rotate-180 text-[#173F70]' : ''
                            }`}
                        />
                      </button>
                    </div>

                    {isSubOpen && (
                      <div className="pl-4 pr-2 py-2 space-y-1.5 border-l-2 border-[#E2E2E2] ml-4 mt-1 bg-[#FAFAFA] rounded-r-lg">
                        {isServices ? (
                          /* MOBILE SERVICES VIEW WITH CARTING TREE */
                          <div className="space-y-2 py-1">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] font-bold px-2">
                              Specialized Services
                            </div>
                            <div className="space-y-1">
                              <Link
                                to="/services/export-packaging"
                                className="block py-1 px-2 text-[13.5px] text-[#52627A] hover:text-[#B62825] font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                Export Packaging
                              </Link>
                              <Link
                                to="/services/container-stuffing"
                                className="block py-1 px-2 text-[13.5px] text-[#52627A] hover:text-[#B62825] font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                Container Stuffing
                              </Link>
                              <Link
                                to="/services/cargo-lashing"
                                className="block py-1 px-2 text-[13.5px] text-[#52627A] hover:text-[#B62825] font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                Cargo Lashing &amp; Securing
                              </Link>
                              <Link
                                to="/export-packing-solutions"
                                className="block py-1 px-2 text-[13.5px] text-[#52627A] hover:text-[#B62825] font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                Export Packing Solutions
                              </Link>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-[#E2E2E2] my-2" />

                            {/* Mobile Carting Tree */}
                            <div className="bg-white p-2.5 rounded-lg border border-[#E2E2E2]">
                              <div className="flex justify-center">
                                <Link
                                  to="/services#carting"
                                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0B0D14] text-white text-[11px] font-extrabold uppercase tracking-wider border border-[#B62825]"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
                                  <span>CARTING</span>
                                </Link>
                              </div>

                              {/* SVG Tree Connector */}
                              <div className="relative w-full h-4 my-0.5">
                                <svg className="w-full h-full" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none">
                                  <path d="M 150 0 L 150 10" stroke="#B62825" strokeWidth="1.5" />
                                  <path d="M 50 10 L 250 10" stroke="#B62825" strokeWidth="1.5" />
                                  <path d="M 50 10 L 50 20" stroke="#B62825" strokeWidth="1.5" />
                                  <path d="M 150 10 L 150 20" stroke="#B62825" strokeWidth="1.5" />
                                  <path d="M 250 10 L 250 20" stroke="#B62825" strokeWidth="1.5" />
                                  <circle cx="150" cy="10" r="2" fill="#B62825" />
                                  <circle cx="50" cy="19" r="1.75" fill="#B62825" />
                                  <circle cx="150" cy="19" r="1.75" fill="#B62825" />
                                  <circle cx="250" cy="19" r="1.75" fill="#B62825" />
                                </svg>
                              </div>

                              <div className="grid grid-cols-3 gap-1.5 text-center">
                                <Link
                                  to="/services#carting"
                                  className="py-1 px-1 rounded bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#B62825] text-[11.5px] font-semibold text-[#1E293B]"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  Speedy
                                </Link>
                                <Link
                                  to="/services#carting"
                                  className="py-1 px-1 rounded bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#B62825] text-[11.5px] font-semibold text-[#1E293B]"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  Punjab
                                </Link>
                                <Link
                                  to="/services#carting"
                                  className="py-1 px-1 rounded bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#B62825] text-[11.5px] font-semibold text-[#1E293B]"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  Pollaris
                                </Link>
                              </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-[#E2E2E2] my-2" />

                            <Link
                              to="/services"
                              className="block py-1 px-2 text-[13px] font-semibold text-[#B62825]"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              All Services Directory &rarr;
                            </Link>
                          </div>
                        ) : (
                          /* MOBILE COMPANY VIEW (PRESERVED) */
                          <>
                            {item.dropdownItems?.map((dropdownItem) => {
                              const hasSub = dropdownItem.subItems && dropdownItem.subItems.length > 0;

                              if (hasSub) {
                                return (
                                  <div key={dropdownItem.path} className="py-1">
                                    <div className="flex items-center justify-between py-1 px-2">
                                      <Link
                                        to={dropdownItem.path}
                                        className="text-[14px] text-[#52627A] hover:text-[#B62825] font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {dropdownItem.label}
                                      </Link>
                                      <button
                                        type="button"
                                        onClick={() => setMobileBranchesOpen(!mobileBranchesOpen)}
                                        className="p-1 text-[#52627A] hover:text-[#B62825]"
                                        aria-label="Expand branches list"
                                      >
                                        <ChevronDown
                                          className={`w-3.5 h-3.5 transition-transform ${mobileBranchesOpen ? 'rotate-180 text-[#B62825]' : ''
                                            }`}
                                        />
                                      </button>
                                    </div>

                                    {mobileBranchesOpen && (
                                      <div className="pl-3 py-1 space-y-1 border-l border-neutral-300 ml-2 mt-0.5">
                                        {dropdownItem.subItems?.map((sub) => (
                                          <Link
                                            key={sub.path}
                                            to={sub.path}
                                            className="block py-1 px-2 text-[13px] text-[#64748B] hover:text-[#B62825]"
                                            onClick={() => setMobileMenuOpen(false)}
                                          >
                                            {sub.label}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              }

                              return (
                                <Link
                                  key={dropdownItem.path}
                                  to={dropdownItem.path}
                                  className="block py-1.5 px-2 text-[14px] text-[#52627A] hover:text-[#B62825] font-medium"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {dropdownItem.label}
                                </Link>
                              );
                            })}
                          </>
                        )}
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
                  className={`py-2 px-3 rounded-lg text-[15px] font-medium transition-colors flex items-center justify-between ${active
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

          {/* Prominent Red Shipping Container Get a Quote CTA for Mobile Drawer */}
          <div className="pt-4 border-t border-[#E2E2E2] space-y-3">
            <HangingContainerQuoteButton
              variant="drawer"
              onClick={() => setMobileMenuOpen(false)}
            />

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
