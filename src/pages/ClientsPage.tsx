import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';

export interface ClientCompany {
  id: number;
  name: string;
  shortName: string;
  logo?: string;
  hasVerifiedLogo: boolean;
  row: 1 | 2;
}

export const CLIENT_COMPANIES: ClientCompany[] = [
  // Row 1: Clients 1–10
  {
    id: 1,
    name: "Greenwich Meridian Logistics (I) Pvt. Ltd.",
    shortName: "GML INDIA",
    logo: "/images/clients/greenwich-logo.png",
    hasVerifiedLogo: true,
    row: 1,
  },
  {
    id: 2,
    name: "Intergrity Logistics Solutions (I) Pvt. Ltd.",
    shortName: "ILS LOGISTICS",
    logo: "/images/clients/integrity-logo.png",
    hasVerifiedLogo: true,
    row: 1,
  },
  {
    id: 3,
    name: "Sahara Maritime Pvt. Ltd.",
    shortName: "SAHARA MARITIME",
    logo: "/images/clients/sahara-logo.jpg",
    hasVerifiedLogo: true,
    row: 1,
  },
  {
    id: 4,
    name: "Jaguar Shipping & Logistics Pvt. Ltd.",
    shortName: "JAGUAR SHIPPING",
    logo: "/images/clients/jaguar-logo.jpg",
    hasVerifiedLogo: true,
    row: 1,
  },
  {
    id: 5,
    name: "Goodrich Maritime Pvt. Ltd.",
    shortName: "GOODRICH",
    logo: "/images/clients/goodrich-logo.jpg",
    hasVerifiedLogo: true,
    row: 1,
  },
  {
    id: 6,
    name: "Alliance Marine Agencies Pvt. Ltd.",
    shortName: "ALLIANCE MARINE",
    logo: "/images/clients/alliance-logo.png",
    hasVerifiedLogo: true,
    row: 1,
  },
  {
    id: 7,
    name: "Aquatrades Global Logistics Pvt. Ltd.",
    shortName: "AQUATRADES",
    hasVerifiedLogo: false,
    row: 1,
  },
  {
    id: 8,
    name: "Astraasl Logisolutions Pvt. Ltd.",
    shortName: "ASTRAASL",
    logo: "/images/clients/astraasl-logo.png",
    hasVerifiedLogo: true,
    row: 1,
  },
  {
    id: 9,
    name: "Drift Logistics",
    shortName: "DRIFT LOGISTICS",
    logo: "/images/clients/drift-logo.png",
    hasVerifiedLogo: true,
    row: 1,
  },
  {
    id: 10,
    name: "Evershine Shipping & Logistics",
    shortName: "EVERSHINE",
    hasVerifiedLogo: false,
    row: 1,
  },

  // Row 2: Clients 11–20
  {
    id: 11,
    name: "Omkar Express Logistics Pvt. Ltd.",
    shortName: "OMKAR EXPRESS",
    logo: "/images/clients/omkar-logo.png",
    hasVerifiedLogo: true,
    row: 2,
  },
  {
    id: 12,
    name: "Avaanti Logistics Solution",
    shortName: "AVAANTI",
    hasVerifiedLogo: false,
    row: 2,
  },
  {
    id: 13,
    name: "P H Value Shipping Pvt. Ltd.",
    shortName: "PH VALUE",
    logo: "/images/clients/phvalue-logo.svg",
    hasVerifiedLogo: true,
    row: 2,
  },
  {
    id: 14,
    name: "Transglobal Logistics Pvt. Ltd.",
    shortName: "TRANSGLOBAL",
    logo: "/images/clients/transglobal-logo.webp",
    hasVerifiedLogo: true,
    row: 2,
  },
  {
    id: 15,
    name: "Translead Logistics Pvt. Ltd.",
    shortName: "TRANSLEAD",
    hasVerifiedLogo: false,
    row: 2,
  },
  {
    id: 16,
    name: "Shreeji Shipping",
    shortName: "SHREEJI",
    logo: "/images/clients/shreeji-logo.svg",
    hasVerifiedLogo: true,
    row: 2,
  },
  {
    id: 17,
    name: "Nara Logistics",
    shortName: "NARA LOGISTICS",
    hasVerifiedLogo: false,
    row: 2,
  },
  {
    id: 18,
    name: "Vanguard Shipping & Logistics Pvt. Ltd.",
    shortName: "VANGUARD",
    logo: "/images/clients/vanguard-logo.svg",
    hasVerifiedLogo: true,
    row: 2,
  },
  {
    id: 19,
    name: "Hub & Link Cargo",
    shortName: "HUB & LINKS",
    logo: "/images/clients/hublinks-logo.png",
    hasVerifiedLogo: true,
    row: 2,
  },
  {
    id: 20,
    name: "Pentagon Shipping & Logistics Pvt. Ltd.",
    shortName: "PENTAGON",
    hasVerifiedLogo: false,
    row: 2,
  },
];

// Helper component for client card with complete, untruncated name
const ClientCard: React.FC<{ client: ClientCompany }> = ({ client }) => (
  <div className="group/card flex-shrink-0 w-[240px] sm:w-[270px] md:w-[285px] min-h-[175px] sm:min-h-[185px] flex flex-col justify-between p-4 sm:p-4.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#B62825] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 select-none">
    {/* Consistent Logo Display Area */}
    <div className="w-full h-16 sm:h-20 flex items-center justify-center p-2 rounded-lg bg-[#F8FAFC] group-hover/card:bg-white transition-colors overflow-hidden">
      {client.hasVerifiedLogo && client.logo ? (
        <img
          src={client.logo}
          alt={`${client.name} official logo`}
          className="max-h-full max-w-full object-contain filter group-hover/card:contrast-105 transition-all duration-200 pointer-events-none"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center rounded-md bg-neutral-100/70 border border-neutral-200/50 p-1.5 text-center group-hover/card:border-[#B62825]/30 group-hover/card:bg-red-50/20 transition-all">
          <span className="text-[11px] sm:text-[12px] font-bold font-mono tracking-wider text-[#173F70] uppercase group-hover/card:text-[#B62825] transition-colors leading-tight">
            {client.shortName}
          </span>
          <span className="text-[8.5px] font-mono tracking-widest text-[#94A3B8] uppercase mt-0.5">
            LOGISTICS
          </span>
        </div>
      )}
    </div>

    {/* Full Company Name Below Logo — No truncation, wraps naturally into 2–3 lines */}
    <div className="mt-2.5 pt-2 border-t border-[#F1F5F9] w-full text-center flex-1 flex items-center justify-center">
      <p className="text-[12px] sm:text-[12.5px] font-semibold text-[#1E293B] group-hover/card:text-[#B62825] leading-snug transition-colors text-center whitespace-normal break-words">
        {client.name}
      </p>
    </div>
  </div>
);

export const ClientsPage: React.FC = () => {
  const row1Clients = CLIENT_COMPANIES.filter((c) => c.row === 1);
  const row2Clients = CLIENT_COMPANIES.filter((c) => c.row === 2);

  // Duplicate 4 times to ensure completely seamless infinite scrolling on all screen sizes (including 4K)
  const row1Items = [...row1Clients, ...row1Clients, ...row1Clients, ...row1Clients];
  const row2Items = [...row2Clients, ...row2Clients, ...row2Clients, ...row2Clients];

  return (
    <div className="space-y-0 bg-[#FBFBFC]">
      {/* 1. Header Banner */}
      <InnerPageBanner
        badge="TRUSTED RELATIONSHIPS"
        badgeSubtext="COMMERCIAL EXPORTERS & LOGISTICS PARTNERS"
        title="Our Clients"
        description="Building trusted business relationships through dependable logistics and cargo-handling solutions."
      />

      {/* 2. Main Client Showcase Section */}
      <section className="py-14 sm:py-20 border-b border-[#E2E8F0] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          
          {/* Section Introduction */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#B62825] text-xs font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
              <span>OFFICIAL CLIENT DIRECTORY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#1E293B] tracking-tight">
              Commercial Partners &amp; Shipping Alliances
            </h2>
            <p className="text-[15px] sm:text-base text-[#64748B] font-body leading-relaxed">
              MSK Logistics Solution coordinates dedicated packaging, container stuffing, and maritime cargo lashing for leading forwarders, vessel agencies, and global freight handlers.
            </p>
          </div>

          {/* TWO-WAY CONTINUOUS INFINITE CLIENT MARQUEES */}
          <div className="space-y-6 sm:space-y-8 overflow-hidden py-2 -mx-4 sm:-mx-6 lg:-mx-8">
            
            {/* ROW 1: Moves RIGHT TO LEFT (Clients 1–10) */}
            <div className="group-marquee relative w-full overflow-hidden">
              {/* Subtle Gradient Edge Masks */}
              <div 
                className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#FBFBFC] to-transparent z-10" 
                aria-hidden="true" 
              />
              <div 
                className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#FBFBFC] to-transparent z-10" 
                aria-hidden="true" 
              />

              <div className="animate-marquee-left flex gap-4 sm:gap-5 w-max py-2 px-4 hover:[animation-play-state:paused]">
                {row1Items.map((client, idx) => (
                  <ClientCard key={`row1-${client.id}-${idx}`} client={client} />
                ))}
              </div>
            </div>

            {/* ROW 2: Moves LEFT TO RIGHT (Clients 11–20) */}
            <div className="group-marquee relative w-full overflow-hidden">
              {/* Subtle Gradient Edge Masks */}
              <div 
                className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#FBFBFC] to-transparent z-10" 
                aria-hidden="true" 
              />
              <div 
                className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#FBFBFC] to-transparent z-10" 
                aria-hidden="true" 
              />

              <div className="animate-marquee-right flex gap-4 sm:gap-5 w-max py-2 px-4 hover:[animation-play-state:paused]">
                {row2Items.map((client, idx) => (
                  <ClientCard key={`row2-${client.id}-${idx}`} client={client} />
                ))}
              </div>
            </div>

          </div>

          {/* 3. Value Pillars / Commitment Bar */}
          <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider">
                CORE COMMITMENT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B] font-heading">
                Operational Discipline Tailored to Every Client
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[14px] text-[#475569]">
              <div className="space-y-2">
                <strong className="block text-[#1E293B] font-semibold">1. Tailored Specifications</strong>
                <p className="text-[#64748B] leading-relaxed">
                  Packaging materials and container stuffing sequences planned specifically around product dimensions and transport hazards.
                </p>
              </div>
              <div className="space-y-2">
                <strong className="block text-[#1E293B] font-semibold">2. Schedule Adherence</strong>
                <p className="text-[#64748B] leading-relaxed">
                  Punctual deployment across container freight stations and port corridors to maintain tight vessel cut-off schedules.
                </p>
              </div>
              <div className="space-y-2">
                <strong className="block text-[#1E293B] font-semibold">3. Verified Quality Assurance</strong>
                <p className="text-[#64748B] leading-relaxed">
                  Certified lashing hardware, ISPM-15 compliant timber, and complete photographic handover documentation for every assignment.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Action Banner */}
          <div className="bg-[#173F70] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1.5">
              <h3 className="text-2xl font-bold font-heading">
                Partner with MSK Logistics for Certified Export Securing
              </h3>
              <p className="text-blue-100 text-sm max-w-xl font-body">
                Discuss cargo specifications, on-site stuffing requirements, and container securing services with our team.
              </p>
            </div>
            <Link
              to="/request-quote"
              className="bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-3.5 px-6 rounded-xl inline-flex items-center gap-2 shadow-lg transition-all flex-shrink-0"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};
