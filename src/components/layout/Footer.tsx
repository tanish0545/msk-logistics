import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, ArrowRight } from 'lucide-react';
import { COMPANY_DETAILS, CORE_SERVICES } from '../../data/company';
import { MagneticButton } from '../common/MagneticButton';
import { IsoCertificationBadge } from '../common/IsoCertificationBadge';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0B1728] text-white border-t border-[#1E2E48] pt-16 pb-12 select-none overflow-hidden">
      {/* Decorative World Maritime Route Map Accent Background */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07] flex items-center justify-end"
        aria-hidden="true" 
      >
        <svg 
          viewBox="0 0 1000 500" 
          className="w-full sm:w-[1250px] h-auto max-h-[500px] object-cover object-right translate-x-12 sm:translate-x-24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle World Map Continents Outline Paths */}
          <path 
            d="M150,120 Q180,80 230,100 T300,130 T280,220 T210,250 T160,200 Z" 
            fill="currentColor" 
          />
          <path 
            d="M240,280 Q270,300 280,360 T250,440 T210,380 T220,300 Z" 
            fill="currentColor" 
          />
          <path 
            d="M480,90 Q540,70 600,110 T580,180 T520,190 T470,140 Z" 
            fill="currentColor" 
          />
          <path 
            d="M480,210 Q540,200 570,260 T560,380 T500,400 T460,300 T470,220 Z" 
            fill="currentColor" 
          />
          <path 
            d="M620,110 Q700,90 820,120 T860,240 T780,280 T680,240 T610,180 Z" 
            fill="currentColor" 
          />
          <path 
            d="M690,230 Q720,220 750,250 T730,300 T680,270 Z" 
            fill="#B62825" 
            fillOpacity="0.4"
          />
          <path 
            d="M780,330 Q840,320 860,370 T820,430 T750,400 Z" 
            fill="currentColor" 
          />

          {/* Maritime Shipping Route Arcs (Connecting JNPT / India Hub to Global Ports) */}
          <path 
            d="M695,245 Q620,180 540,150 T480,130" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            strokeDasharray="4 6" 
          />
          <path 
            d="M695,245 Q640,250 560,260 T480,320" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            strokeDasharray="4 6" 
          />
          <path 
            d="M695,245 Q750,260 810,240 T880,180" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            strokeDasharray="4 6" 
          />
          <path 
            d="M695,245 Q600,210 300,140" 
            stroke="#B62825" 
            strokeWidth="1.6" 
            strokeDasharray="4 5" 
            strokeOpacity="0.85" 
          />

          {/* Nhava Sheva (INNSA) Port Hub Node */}
          <circle cx="695" cy="245" r="6" fill="#B62825" fillOpacity="0.9" />
          <circle cx="695" cy="245" r="14" stroke="#B62825" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.6" />
          
          {/* Global Destination Hub Nodes with subtle red centers */}
          <circle cx="530" cy="140" r="3.5" fill="currentColor" />
          <circle cx="530" cy="140" r="1.5" fill="#B62825" />
          <circle cx="820" cy="230" r="3.5" fill="currentColor" />
          <circle cx="820" cy="230" r="1.5" fill="#B62825" />
          <circle cx="260" cy="130" r="3.5" fill="currentColor" />
          <circle cx="260" cy="130" r="1.5" fill="#B62825" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Top Grid: 4 Clean Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#1E2E48]">
          
          {/* Col 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block" aria-label="MSK Logistics Homepage">
              <div className="bg-white px-3 py-2 rounded-lg inline-block shadow-sm">
                <img 
                  src="/images/logo/msk-logistics-logo.png" 
                  alt="MSK Logistics Pvt. Ltd." 
                  className="h-9 w-auto object-contain"
                  width="90"
                  height="36"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Link>

            <p className="text-slate-300 text-[14px] leading-relaxed max-w-sm font-body">
              MSK Logistics Pvt. Ltd. provides specialized industrial export packaging, container stuffing, and heavy cargo securing services operating from Western India's premier container gateway at Nhava Sheva (JNPT).
            </p>

            <div className="pt-2 text-[12px] font-mono text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
                <span>PORT: NHAVA SHEVA (JNPT) • PORT CODE: INNSA</span>
              </div>
              <div className="text-slate-500 pl-3.5">CORRIDOR: NAVI MUMBAI &amp; RAIGAD TERMINALS</div>
            </div>

            {/* Dedicated ISO Certification Area */}
            <div className="pt-2">
              <IsoCertificationBadge size="sm" theme="dark" />
            </div>
          </div>

          {/* Col 2: Core Capabilities (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="text-[12px] font-mono uppercase tracking-wider text-[#B62825] font-bold">
              Core Capabilities
            </div>
            <ul className="space-y-2.5 text-[14px] font-body">
              {CORE_SERVICES.map((service) => (
                <li key={service.id}>
                  <Link 
                    to={`/services/${service.slug}`} 
                    className="text-slate-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#B62825]" />
                  </Link>
                </li>
              ))}
              <li className="pt-1.5">
                <Link 
                  to="/export-packing-solutions" 
                  className="text-white font-medium hover:text-[#B62825] transition-colors duration-200 inline-flex items-center gap-1.5 group"
                >
                  <span>Two Export Solutions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B62825] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="text-[12px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Navigation
            </div>
            <ul className="space-y-2 text-[14px] font-body">
              <li>
                <Link to="/" className="group/link text-slate-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5">
                  <span>Home</span>
                  <ArrowRight className="w-3 h-3 text-[#B62825] opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 motion-reduce:transform-none" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="group/link text-slate-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5">
                  <span>About Us</span>
                  <ArrowRight className="w-3 h-3 text-[#B62825] opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 motion-reduce:transform-none" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="group/link text-slate-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5">
                  <span>Services</span>
                  <ArrowRight className="w-3 h-3 text-[#B62825] opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 motion-reduce:transform-none" />
                </Link>
              </li>
              <li>
                <Link to="/container-guide" className="group/link text-slate-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5">
                  <span>Container Guide</span>
                  <ArrowRight className="w-3 h-3 text-[#B62825] opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 motion-reduce:transform-none" />
                </Link>
              </li>
              <li>
                <Link to="/warehouse" className="group/link text-slate-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5">
                  <span>Warehouse</span>
                  <ArrowRight className="w-3 h-3 text-[#B62825] opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 motion-reduce:transform-none" />
                </Link>
              </li>
              <li>
                <Link to="/vessel-schedule" className="group/link text-slate-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5">
                  <span>Vessel Schedule</span>
                  <ArrowRight className="w-3 h-3 text-[#B62825] opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 motion-reduce:transform-none" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="group/link text-slate-300 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5">
                  <span>Contact Office</span>
                  <ArrowRight className="w-3 h-3 text-[#B62825] opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 motion-reduce:transform-none" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Registered Office & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="text-[12px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              Registered Office
            </div>

            <div className="space-y-3 text-[13px] text-slate-300 font-body">
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
                  href={COMPANY_DETAILS.infoEmailHref}
                  className="hover:text-white transition-colors break-all"
                  title="General Inquiries"
                >
                  {COMPANY_DETAILS.infoEmail}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B62825] shrink-0" />
                <a 
                  href={COMPANY_DETAILS.accountsEmailHref}
                  className="hover:text-white transition-colors break-all"
                  title="Accounts &amp; Invoicing"
                >
                  {COMPANY_DETAILS.accountsEmail}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <MagneticButton maxPull={3} className="w-full">
                <Link 
                  to="/request-quote"
                  className="w-full text-center bg-[#B62825] hover:bg-[#9E2220] text-white text-[13px] font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] inline-flex items-center justify-center gap-1.5 group/btn motion-reduce:transform-none"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1 motion-reduce:transform-none" />
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-slate-400 font-mono">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_DETAILS.publicName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span>Navi Mumbai, Maharashtra, India</span>
            <span>•</span>
            <span>Export Logistics Desk</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

