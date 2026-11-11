import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { CORE_SERVICES } from '../data/company';
import { BrandedImage } from '../components/common/BrandedImage';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const ContainerStuffingPage: React.FC = () => {
  const service = CORE_SERVICES.find(s => s.id === 'container-stuffing')!;

  return (
    <div className="space-y-0">
      {/* Breadcrumb & Hero */}
      <InnerPageBanner
        breadcrumb={
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Services', to: '/services', hasDropdown: true },
              { label: service.title, isCurrent: true },
            ]}
          />
        }
        badge={service.tag}
        title={`${service.title} & Weight Balance Planning`}
        description={service.shortDescription}
      />

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <ScrollReveal direction="left" delay={50} className="lg:col-span-7 space-y-8">
              <div className="space-y-4 text-[15px] sm:text-[16px] text-[#666666] leading-relaxed">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#343434] font-heading">
                  Service Overview & Loading Methodology
                </h2>
                <p>
                  {service.fullDescription}
                </p>
                <p>
                  Improper container stuffing can lead to catastrophic weight imbalances, causing road trailer instability or container rejection at maritime terminal gates. MSK Logistics coordinates stuffing with precise loading sequence planning. We inspect internal container surfaces, distribute weight evenly over floor crossmembers, and avoid excessive point-loads.
                </p>
              </div>

              {/* Key Activities */}
              <div className="space-y-4 bg-[#F5F5F3] p-7 rounded-xl border border-[#E2E2E2]">
                <h3 className="text-xl font-bold text-[#343434] font-heading">
                  Key Operational Activities
                </h3>
                <div className="space-y-3">
                  {service.keyActivities.map((act, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-[14px] text-[#343434]">
                      <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Responsibilities */}
              <div className="space-y-4 p-7 rounded-xl border border-[#E2E2E2] bg-white">
                <h3 className="text-xl font-bold text-[#343434] font-heading">
                  Applicable Customer Responsibilities
                </h3>
                <div className="space-y-3">
                  {service.customerResponsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-[14px] text-[#666666]">
                      <div className="w-5 h-5 rounded-full bg-neutral-200 text-[#343434] flex items-center justify-center font-mono-code text-[11px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right Sidebar */}
            <ScrollReveal direction="right" delay={150} className="lg:col-span-5 space-y-8">
              {/* Media Card */}
              <div className="rounded-xl overflow-hidden border border-[#E2E2E2] shadow-sm bg-white group hover-lift">
                <BrandedImage 
                  src={service.image} 
                  alt={service.title}
                  aspectRatio="aspect-[16/10]"
                  imageClassName="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-[#343434] text-white text-[12px] font-mono-code flex items-center justify-between">
                  <span>LOADING DOCK & STUFFING</span>
                  <span>JNPT PORT SECTOR</span>
                </div>
              </div>

              {/* Role in Export Chain */}
              <div className="bg-[#F5F5F3] p-7 rounded-xl border border-[#E2E2E2] space-y-4">
                <h3 className="text-lg font-bold text-[#343434] font-heading">
                  Available Container Types
                </h3>
                <p className="text-[13px] text-[#666666] leading-relaxed">
                  We coordinate stuffing for 20ft Standard, 40ft Standard, 40ft High Cube (HQ), Open Top, and Flat Rack equipment, working either with MSK-arranged containers (Option A) or client-supplied containers (Option B).
                </p>
                <div className="pt-2">
                  <Link 
                    to="/request-quote"
                    className="btn-primary w-full text-center py-3 text-[14px] hover:scale-105 active:scale-95 transition-transform"
                  >
                    <span>Request Stuffing Quotation</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Verified Payload Notice */}
              <div className="p-4 rounded-lg bg-neutral-100 border border-neutral-300 text-[12px] text-neutral-600 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <p>
                  Operational note: Maximum container payload limits (VGM compliance) and crane lifting capacities are verified against individual container CSC safety plates prior to loading.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Authentic Container Stuffing & OEM Yard Box Showcase */}
          <div id="cfs-carting" className="pt-10 border-t border-[#E2E2E2] space-y-6 scroll-mt-28">
            <span id="speedy" className="sr-only" aria-hidden="true" />
            <span id="punjab" className="sr-only" aria-hidden="true" />
            <span id="polaris" className="sr-only" aria-hidden="true" />
            <span id="carting" className="sr-only" aria-hidden="true" />
            <ScrollReveal direction="up" className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#B62825] border border-red-200 text-xs font-mono font-bold uppercase">
                <span>FIELD EXECUTION OPERATIONS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#343434]">
                Carting &amp; Stuffing: Speedy, Punjab &amp; Polaris CFS Terminals, Haz Panipat &amp; Delhi Corridors
              </h3>
              <p className="text-xs sm:text-sm text-[#666666] max-w-3xl">
                Precision stuffing sequences, port-to-CFS carting movements, weight distribution planning, and heavy mobile crane loading executed across Speedy, Punjab Conware, and Polaris CFS facilities, Haz Panipat &amp; Delhi industrial corridors, and OEM yard box staging at Nhava Sheva.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  img: '/images/containers/container-40ft-high-cube.jpg',
                  alt: '40ft High Cube container stuffing at Punjab CFS',
                  title: 'Haz Panipat & Delhi Corridors',
                  desc: 'Hazardous & industrial cargo stuffing across Panipat & Delhi corridors aligned with Punjab and Polaris CFS standards.'
                },
                {
                  img: '/images/operations/export-packaging/skidded-equipment-terminal-staging.jpg',
                  alt: 'OEM yard box and skidded equipment pre-stuffing staging',
                  title: 'OEM Yard Box Staging',
                  desc: 'Heavy skidded machinery and OEM boxes pre-positioned for stuffing sequence.'
                },
                {
                  img: '/images/shipments/open-top/open-top-crane-loading.jpg',
                  alt: 'Open top container vertical crane stuffing',
                  title: 'Open Top Crane Stuffing',
                  desc: 'Vertical crane-lowered machinery through open roof for out-of-gauge equipment.'
                },
                {
                  img: '/images/operations/container-loading/mobile-crane-heavy-lift.jpg',
                  alt: 'Mobile crane heavy lift for container loading',
                  title: 'Mobile Crane Rigging',
                  desc: 'Heavy lift rigging and placement for over-dimensional project containers.'
                }
              ].map((card, cIdx) => (
                <ScrollReveal
                  key={cIdx}
                  direction="up"
                  delay={cIdx * 60}
                  className="h-full"
                >
                  <div className="rounded-xl overflow-hidden border border-[#E2E2E2] bg-white shadow-xs group h-full hover-lift">
                    <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                      <img
                        src={card.img}
                        alt={card.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3.5 space-y-1">
                      <span className="text-[11px] font-mono font-bold text-[#B62825] uppercase block">
                        {card.title}
                      </span>
                      <p className="text-xs text-[#475569]">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
