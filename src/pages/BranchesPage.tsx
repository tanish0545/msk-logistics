import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/company';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';

export const BELAPUR_BRANCH = {
  name: 'Main Branch — Belapur',
  building: 'Office No-A-428, 4th Floor, Balaji Bhawan',
  plotSector: 'Plot No-42A, Sector 11, CBD Belapur',
  cityState: 'Navi Mumbai 400 614, Maharashtra, India',
  fullAddress: `OFFICE NO-A-428, 4th FLOOR,\nBALAJI BHAWAN,\nPLOT NO-42A, SECTOR 11,\nCBD BELAPUR,\nNAVI MUMBAI 400 614,\nMAHARASHTRA, INDIA.`,
  mapQuery: 'Balaji Bhawan, Sector 11, CBD Belapur, Navi Mumbai 400614',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Balaji+Bhawan+Sector+11+CBD+Belapur+Navi+Mumbai+400614&t=&z=15&ie=UTF8&iwloc=&output=embed',
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Balaji+Bhawan+Sector+11+CBD+Belapur+Navi+Mumbai+400614',
};

export const JNPT_BRANCH = {
  name: 'Second Branch — JNPT',
  building: 'Building No. B/48, Office No. 3',
  plotSector: 'JNPT Township Colony, Sector - 3',
  cityState: 'Navi Mumbai 400702, Maharashtra, India',
  fullAddress: COMPANY_DETAILS.address,
  mapQuery: 'JNPT Township Colony, Sector 3, Navi Mumbai 400702',
  mapEmbedUrl: 'https://maps.google.com/maps?q=JNPT+Township+Colony+Sector+3+Navi+Mumbai+400702&t=&z=15&ie=UTF8&iwloc=&output=embed',
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=JNPT+Township+Colony+Sector+3+Navi+Mumbai+400702',
};

export const BranchesPage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <div className="space-y-0 bg-[#FBFBFC]">
      {/* 1. Header Banner */}
      <InnerPageBanner
        badge="OPERATING NETWORK"
        badgeSubtext="CBD BELAPUR & NHAVA SHEVA (JNPT)"
        title="Our Branches"
        description="Administrative and operational facilities coordinating certified export packaging, container stuffing, and maritime cargo lashing across the Western Gateway."
      />

      {/* 2. Main Content */}
      <section className="py-14 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-14">
          
          {/* Quick Branch Navigation Selector */}
          <div className="flex flex-wrap items-center gap-3 p-1.5 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0] max-w-lg">
            <a 
              href="#main-branch" 
              className="flex-1 text-center py-2.5 px-4 rounded-lg text-[13px] font-semibold transition-all bg-white text-[#173F70] shadow-xs hover:text-[#B62825] hover:shadow-sm"
            >
              1. Main Branch — Belapur
            </a>
            <a 
              href="#second-branch" 
              className="flex-1 text-center py-2.5 px-4 rounded-lg text-[13px] font-semibold transition-all bg-white text-[#173F70] shadow-xs hover:text-[#B62825] hover:shadow-sm"
            >
              2. Second Branch — JNPT
            </a>
          </div>

          {/* =================================================================== */}
          {/* BRANCH 01: MAIN BRANCH — BELAPUR                                    */}
          {/* =================================================================== */}
          <div 
            id="main-branch" 
            className="scroll-mt-24 p-8 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] space-y-8 shadow-xs"
          >
            {/* Alias anchor for #belapur */}
            <span id="belapur" className="sr-only" aria-hidden="true" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#B62825] border border-red-200 text-xs font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
                  <span>MAIN BRANCH</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] font-heading">
                  Main Branch — Belapur
                </h2>
                <p className="text-[14px] text-[#64748B]">
                  CBD Belapur commercial office coordinating customer accounts, operational scheduling, and administrative services.
                </p>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#10B981] border border-emerald-200 text-xs font-mono font-bold shrink-0 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>ACTIVE OFFICE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Branch Address Details */}
              <div className="lg:col-span-6 space-y-6 text-[14px] text-[#334155]">
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173F70] uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-[#B62825]" />
                    <span>Official Address</span>
                  </div>
                  <div className="font-mono text-[13.5px] text-[#1E293B] leading-relaxed whitespace-pre-line pl-6 font-semibold">
                    {BELAPUR_BRANCH.fullAddress}
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#B62825] shrink-0" />
                    <div>
                      <span className="text-xs text-[#94A3B8] uppercase font-mono block">Direct Inquiries:</span>
                      <a 
                        href={COMPANY_DETAILS.phoneHref}
                        className="text-[#173F70] font-semibold hover:text-[#B62825] transition-colors"
                      >
                        {COMPANY_DETAILS.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#B62825] shrink-0" />
                    <div>
                      <span className="text-xs text-[#94A3B8] uppercase font-mono block">Official Email:</span>
                      <a 
                        href={COMPANY_DETAILS.emailHref}
                        className="text-[#173F70] font-medium hover:text-[#B62825] transition-colors"
                      >
                        {COMPANY_DETAILS.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={BELAPUR_BRANCH.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#173F70] hover:text-[#B62825] transition-colors border-b border-[#CBD5E1] pb-0.5 hover:border-[#B62825]"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Map Embed */}
              <div className="lg:col-span-6 rounded-xl overflow-hidden border border-[#E2E8F0] bg-neutral-100 shadow-inner h-[280px]">
                <iframe
                  title="MSK Logistics Main Branch Belapur Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={BELAPUR_BRANCH.mapEmbedUrl}
                />
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* BRANCH 02: SECOND BRANCH — JNPT                                     */}
          {/* =================================================================== */}
          <div 
            id="second-branch" 
            className="scroll-mt-24 p-8 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] space-y-8 shadow-xs"
          >
            {/* Alias anchor for #jnpt */}
            <span id="jnpt" className="sr-only" aria-hidden="true" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#173F70] border border-blue-200 text-xs font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#173F70]" />
                  <span>SECOND BRANCH</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] font-heading">
                  Second Branch — JNPT
                </h2>
                <p className="text-[14px] text-[#64748B]">
                  Port corridor facility adjacent to Jawaharlal Nehru Port, handling on-site rigging, container stuffing, and field operations.
                </p>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#173F70] border border-blue-200 text-xs font-mono font-bold shrink-0 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#173F70]" />
                <span>PORT DESK</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Branch Address Details */}
              <div className="lg:col-span-6 space-y-6 text-[14px] text-[#334155]">
                <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173F70] uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-[#B62825]" />
                    <span>Official Address</span>
                  </div>
                  <div className="font-mono text-[13.5px] text-[#1E293B] leading-relaxed whitespace-pre-line pl-6 font-semibold">
                    {JNPT_BRANCH.fullAddress}
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#B62825] shrink-0" />
                    <div>
                      <span className="text-xs text-[#94A3B8] uppercase font-mono block">Field Operations Desk:</span>
                      <a 
                        href={COMPANY_DETAILS.phoneHref}
                        className="text-[#173F70] font-semibold hover:text-[#B62825] transition-colors"
                      >
                        {COMPANY_DETAILS.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#B62825] shrink-0" />
                    <div>
                      <span className="text-xs text-[#94A3B8] uppercase font-mono block">Operations Email:</span>
                      <a 
                        href={COMPANY_DETAILS.emailHref}
                        className="text-[#173F70] font-medium hover:text-[#B62825] transition-colors"
                      >
                        {COMPANY_DETAILS.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={JNPT_BRANCH.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#173F70] hover:text-[#B62825] transition-colors border-b border-[#CBD5E1] pb-0.5 hover:border-[#B62825]"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Map Embed */}
              <div className="lg:col-span-6 rounded-xl overflow-hidden border border-[#E2E8F0] bg-neutral-100 shadow-inner h-[280px]">
                <iframe
                  title="MSK Logistics Second Branch JNPT Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={JNPT_BRANCH.mapEmbedUrl}
                />
              </div>
            </div>
          </div>

          {/* Action Callout */}
          <div className="bg-[#173F70] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1.5">
              <h3 className="text-2xl font-bold font-heading">
                Visit Our Offices or Request On-Site Coordination
              </h3>
              <p className="text-blue-100 text-sm max-w-xl font-body">
                Contact either of our Navi Mumbai facilities to schedule container stuffing, timber crating, or port cargo securing.
              </p>
            </div>
            <Link
              to="/contact"
              className="bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-3.5 px-6 rounded-xl inline-flex items-center gap-2 shadow-lg transition-all flex-shrink-0"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};
