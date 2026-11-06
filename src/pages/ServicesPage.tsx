import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Anchor, ShieldCheck, Layers, Truck, ChevronRight } from 'lucide-react';
import { CORE_SERVICES } from '../data/company';
import { ServiceCard } from '../components/services/ServiceCard';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const ServicesPage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* Services Banner */}
      <InnerPageBanner
        breadcrumb={
          <>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#AEB6C2]" />
            <span className="text-[#B62825] font-semibold">Services</span>
          </>
        }
        badge="COMPREHENSIVE LOGISTICS DIRECTORY"
        badgeSubtext="NHAVA SHEVA (JNPT) • WESTERN MARITIME GATEWAY"
        title="Ocean Cargo, Air Cargo, Container Stuffing, Technical Securing & Hazardous Cargo"
        description="Six specialized industrial logistics disciplines: Ocean Freight, Air Freight, Container Stuffing, Special Project Cargo Handling, Marine Cargo Lashing, and Dangerous Goods (DG) Securing."
      />

      {/* Services Grid (6 Capabilities) */}
      <section className="py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_SERVICES.map((service, index) => (
              <ScrollReveal
                key={service.id}
                direction={index % 3 === 0 ? 'left' : index % 3 === 1 ? 'up' : 'right'}
                delay={(index % 3) * 90}
                className="h-full"
              >
                <ServiceCard service={service} index={index} />
              </ScrollReveal>
            ))}
          </div>

          {/* Dedicated Road Transport & Heavy Haulage Fleet Banner */}
          <ScrollReveal direction="up" delay={80}>
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0B0B0D] text-white border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B62825]/20 border border-[#B62825]/40 text-[#B62825] text-xs font-mono font-bold uppercase">
                  <Truck className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>HEAVY ROAD HAULAGE &amp; HIGHWAY FLEET</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Road Transport &amp; Heavy Fleet Logistics
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-body">
                  Dedicated multi-axle modular trailers, drop-deck low-beds, and factory-to-port road haulage connecting manufacturing corridors across Panipat, Delhi NCR, Gujarat, and Maharashtra directly to Nhava Sheva (JNPT) and Mundra port terminals.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono text-slate-400">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Multi-Axle Modular Prime Mover</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Drop-Deck Low-Bed Haulage</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Project Cargo Crane Rigging</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Chassis Stake-Pocket Lashing</span>
                </div>
              </div>
              <Link
                to="/road-transport"
                className="btn-primary text-sm py-3 px-6 shrink-0 inline-flex items-center gap-2"
              >
                <span>Explore Road Transport Fleet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Integration Overview */}
          <ScrollReveal direction="up" delay={100}>
            <div className="p-8 sm:p-10 rounded-2xl bg-[#F5F5F3] border border-[#E2E2E2] space-y-6">
              <div className="max-w-3xl space-y-3">
                <span className="editorial-badge bg-white text-[#B62825] border-red-200">
                  INTEGRATED END-TO-END EXECUTION
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#343434] font-heading">
                  How Our Core Logistics Capabilities Operate in Harmony
                </h2>
                <p className="text-[15px] text-[#666666] leading-relaxed">
                  Freight forwarding, airport transit, container stuffing, heavy-lift rigging, marine lashing, and dangerous goods securing are not isolated silos—they are interconnected links of a secure export supply chain. MSK Logistics unifies all disciplines under one continuous operational standard at Nhava Sheva (JNPT).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E2E2E2]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#343434] text-[15px]">
                    <Anchor className="w-4 h-4 text-[#B62825]" />
                    <span>1. Freight Corridors (Ocean &amp; Air)</span>
                  </div>
                  <p className="text-[13px] text-[#666666]">
                    Dedicated EXIM coordination, container release management, airport terminal transit, and swift customs compliance across Western India gateways.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#343434] text-[15px]">
                    <Layers className="w-4 h-4 text-[#B62825]" />
                    <span>2. Container Stuffing &amp; Weight Engineering</span>
                  </div>
                  <p className="text-[13px] text-[#666666]">
                    Precision weight-distribution planning across standard dry vans, open tops, and specialized containers executed near Punjab and Polaris CFS facilities.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#343434] text-[15px]">
                    <ShieldCheck className="w-4 h-4 text-[#B62825]" />
                    <span>3. Technical Securing &amp; ODC Rigging</span>
                  </div>
                  <p className="text-[13px] text-[#666666]">
                    Engineered Flat Rack heavy machinery securing, out-of-gauge (OOG) crane rigging, low-bed trailer lashing, and certified cargo lashing networks.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <Link to="/export-packing-solutions" className="btn-primary text-[14px]">
                  <span>Explore Two Service Arrangements</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link to="/request-quote" className="btn-secondary text-[14px]">
                  <span>Request a Quote for Services</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
