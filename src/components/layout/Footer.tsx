import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { COMPANY_DETAILS, CORE_SERVICES } from '../../data/company';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#343434] text-white border-t border-neutral-700 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-neutral-700/80">
          {/* Col 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block" aria-label="MSK Logistics Homepage">
              <div className="bg-white p-2.5 rounded inline-block">
                <img 
                  src="/images/logo/msk-logistics-logo.png" 
                  alt="MSK Logistics Pvt. Ltd." 
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-neutral-300 text-[14px] leading-relaxed max-w-sm">
              MSK Logistics Pvt. Ltd. is a specialized logistics provider based in Navi Mumbai, offering industrial export packaging, container stuffing, and heavy cargo lashing and securing services.
            </p>

            <div className="pt-2 text-[12px] font-mono-code text-neutral-400 space-y-1">
              <div>LOC: {COMPANY_DETAILS.operationalCoordinates}</div>
              <div>PORT: NHAVA SHEVA (JNPT) CORRIDORS</div>
            </div>
          </div>

          {/* Col 2: Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[12px] font-mono-code uppercase tracking-wider text-[#B62825] font-semibold">
              Core Capabilities
            </div>
            <ul className="space-y-2 text-[14px]">
              {CORE_SERVICES.map((service) => (
                <li key={service.id}>
                  <Link 
                    to={`/services/${service.slug}`} 
                    className="text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#B62825]" />
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link 
                  to="/export-packing-solutions" 
                  className="text-white font-medium hover:text-[#B62825] transition-colors inline-flex items-center gap-1"
                >
                  <span>Two Export Solutions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B62825]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-[12px] font-mono-code uppercase tracking-wider text-neutral-400 font-semibold">
              Company
            </div>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-300 hover:text-white transition-colors">
                  Services Directory
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-neutral-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/request-quote" className="text-neutral-300 hover:text-white transition-colors">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact & Desk (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[12px] font-mono-code uppercase tracking-wider text-neutral-400 font-semibold">
              Registered Office
            </div>

            <div className="space-y-3 text-[13px] text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                <span className="leading-snug">{COMPANY_DETAILS.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B62825] shrink-0" />
                <a 
                  href={COMPANY_DETAILS.phoneHref}
                  className="hover:text-white transition-colors font-medium"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B62825] shrink-0" />
                <a 
                  href={COMPANY_DETAILS.emailHref}
                  className="hover:text-white transition-colors break-all"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                to="/request-quote"
                className="inline-block w-full text-center bg-[#B62825] hover:bg-[#9E2220] text-white text-[13px] font-semibold py-2.5 px-4 rounded transition-colors"
              >
                Start Quote Request
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-neutral-400 font-mono-code">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_DETAILS.publicName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Navi Mumbai, Maharashtra, India</span>
            <span>•</span>
            <span>Export Logistics Desk</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
