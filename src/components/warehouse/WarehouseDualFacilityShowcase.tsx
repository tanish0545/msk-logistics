import React from 'react';
import { ArrowRight, Check, SunMedium, Umbrella } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';

export const WarehouseDualFacilityShowcase: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#070709] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Section Header Matching Concept 06 */}
        <ScrollReveal direction="up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            Warehouse <span className="text-[#B62825]">Facilities</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] font-body mt-1.5 max-w-2xl">
            Specialized open-air and covered staging facilities engineered for international cargo workflows.
          </p>
        </ScrollReveal>

        {/* Dual Facility Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: Open Yard */}
          <ScrollReveal direction="left" delay={50} className="h-full">
            <div className="group relative rounded-2xl bg-[#0F0F12] border border-white/15 hover:border-[#B62825] overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between h-full hover-lift">
              {/* Top Image Preview with Gradient Overlay */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-neutral-900">
                <img
                  src="/images/operations/warehouse/open-yard-conex-staging.jpg"
                  alt="Open Yard Container Staging at Nhava Sheva"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-[#0F0F12]/40 to-transparent pointer-events-none" />
                
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#000000]/80 text-white border border-white/20 uppercase backdrop-blur-sm">
                    FACILITY 01 • OPEN AIR
                  </span>
                </div>
              </div>

              {/* Card Content & Feature Checklist */}
              <div className="p-6 sm:p-7 space-y-5 -mt-6 relative z-10 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#B62825] text-white flex items-center justify-center shadow-md">
                      <SunMedium className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white tracking-wide">
                      Open Yard
                    </h3>
                  </div>

                  {/* Checklist Matching Concept 06 */}
                  <div className="space-y-2.5 pt-1">
                    {[
                      'Container Staging',
                      'Conex CFS Integration',
                      'Loaded on Wheels & Buffer',
                      'ODC & Break Bulk (BBC)',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-[#D9DEE5]">
                        <div className="w-4 h-4 rounded-full bg-[#B62825] text-white flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation Row */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className="text-xs font-mono text-[#AEB6C2]">
                    Unobstructed sky laydown for EXIM
                  </span>
                  <a
                    href="#open-yard"
                    aria-label="View Open Yard details"
                    className="w-10 h-10 rounded-full bg-[#B62825] hover:bg-[#9E2220] text-white flex items-center justify-center shadow-md transition-all group-hover:scale-110 active:scale-95"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Shaded Warehouse */}
          <ScrollReveal direction="right" delay={150} className="h-full">
            <div className="group relative rounded-2xl bg-[#0F0F12] border border-white/15 hover:border-[#B62825] overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between h-full hover-lift">
              {/* Top Image Preview with Gradient Overlay */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-neutral-900">
                <img
                  src="/images/operations/warehouse/shaded-warehouse-main-bay.jpg"
                  alt="Shaded Warehouse Covered Staging Bays"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-[#0F0F12]/40 to-transparent pointer-events-none" />
                
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#000000]/80 text-white border border-white/20 uppercase backdrop-blur-sm">
                    FACILITY 02 • COVERED BAYS
                  </span>
                </div>
              </div>

              {/* Card Content & Feature Checklist */}
              <div className="p-6 sm:p-7 space-y-5 -mt-6 relative z-10 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#B62825] text-white flex items-center justify-center shadow-md">
                      <Umbrella className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white tracking-wide">
                      Shaded Warehouse
                    </h3>
                  </div>

                  {/* Checklist Matching Concept 06 */}
                  <div className="space-y-2.5 pt-1">
                    {[
                      'Covered Packing Bays',
                      'Pallet Making & Strapping',
                      'Export Packaging',
                      'Moisture-Sensitive Cargo',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-[#D9DEE5]">
                        <div className="w-4 h-4 rounded-full bg-[#B62825] text-white flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation Row */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className="text-xs font-mono text-[#AEB6C2]">
                    Weather-protected storage &amp; packing
                  </span>
                  <a
                    href="#shaded-warehouse"
                    aria-label="View Shaded Warehouse details"
                    className="w-10 h-10 rounded-full bg-[#B62825] hover:bg-[#9E2220] text-white flex items-center justify-center shadow-md transition-all group-hover:scale-110 active:scale-95"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};
