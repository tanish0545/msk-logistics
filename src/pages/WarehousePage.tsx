import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Umbrella,
  SunMedium,
  Layers,
  Sparkles
} from 'lucide-react';
import { WAREHOUSE_CATEGORIES, OPEN_WAREHOUSE_IMAGE, SHADED_WAREHOUSE_IMAGE } from '../data/warehouseData';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';

export const WarehousePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'open' | 'shaded'>('open');

  const selectedCategory = WAREHOUSE_CATEGORIES.find(c => c.id === activeTab) || WAREHOUSE_CATEGORIES[0];
  const isShaded = activeTab === 'shaded';

  return (
    <div className="space-y-0 bg-[#FAFAFA]">
      {/* 1. Page Header — Modern & Cinematic, not an oversized block */}
      <InnerPageBanner
        badge="FACILITY & STAGING ARRANGEMENTS"
        badgeSubtext="NHAVA SHEVA (JNPT) LOGISTICS CORRIDOR"
        title="Warehouse & Staging Environments"
        description="Indicative staging environments for export cargo preparation: Open Yard Staging for weather-resistant heavy equipment and Shaded Packing Bays for moisture-sensitive export crating."
      />

      {/* 2. Interactive Mode Switcher Sticky Bar */}
      <section className="bg-white border-b border-[#E2E2E2] sticky top-[68px] sm:top-[72px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 p-1 bg-[#F1F5F9] rounded-xl border border-neutral-200/80">
            <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider hidden sm:inline ml-2 mr-1">
              Select Mode:
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('open')}
              aria-pressed={!isShaded}
              className={`relative py-2 px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 inline-flex items-center gap-2 select-none ${
                !isShaded
                  ? 'bg-[#B62825] text-white shadow-sm font-semibold'
                  : 'bg-transparent text-[#52627A] hover:text-[#B62825] hover:bg-white/60'
              }`}
            >
              <SunMedium className={`w-4 h-4 transition-transform duration-300 motion-reduce:transform-none ${
                !isShaded ? 'text-amber-300 scale-110 rotate-12' : 'text-amber-500/70 scale-95'
              }`} />
              <span>Open Warehouse (Open-Air Sky)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('shaded')}
              aria-pressed={isShaded}
              className={`relative py-2 px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 inline-flex items-center gap-2 select-none ${
                isShaded
                  ? 'bg-[#B62825] text-white shadow-sm font-semibold'
                  : 'bg-transparent text-[#52627A] hover:text-[#B62825] hover:bg-white/60'
              }`}
            >
              <Umbrella className={`w-4 h-4 transition-transform duration-300 motion-reduce:transform-none ${
                isShaded ? 'text-sky-300 scale-110 -rotate-12' : 'text-sky-500/70 scale-95'
              }`} />
              <span>Shaded Warehouse (Canopy Shelter)</span>
            </button>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#173F70] bg-blue-50/80 px-3 py-1.5 rounded-lg border border-blue-200/80">
            <Sparkles className="w-3.5 h-3.5 text-[#B62825]" />
            <span>Interactive Lighting Simulation</span>
          </div>
        </div>
      </section>

      {/* 3. Main Detail Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          {/* Main Card with Stable Dimensions */}
          <div className="bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden shadow-sm p-6 sm:p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E8E8] pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider">
                  {selectedCategory.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B]">
                  {selectedCategory.name}
                </h2>
              </div>

              <Link
                to={`/request-quote?enquiry=${activeTab}-warehouse`}
                className="btn-primary text-xs sm:text-sm py-2.5 px-5 self-start md:self-auto"
              >
                <span>Enquire for {activeTab === 'open' ? 'Open Staging' : 'Shaded Packing'}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Description */}
            <p className="text-[15px] sm:text-base text-[#475569] leading-relaxed max-w-4xl">
              {selectedCategory.briefDescription}
            </p>

            {/* Visual Panel: EXACT SAME IMAGE for both Open and Shaded, with smooth CSS Overlay */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
                <span className="uppercase tracking-wider">
                  Facility Representation ({isShaded ? 'Original Covered Warehouse with Metal Roof' : 'Natural Daylight & Unobstructed Open Sky'})
                </span>
                <span className="text-[#173F70] font-semibold">
                  Environment: {isShaded ? 'Covered Staging Bay' : 'Open-Air Staging Ground'}
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-[#E2E2E2] bg-neutral-950 aspect-[16/9] max-h-[520px] shadow-md group">
                {/* 1. Base Layer: Open-Air Warehouse (Natural Daylight Sky, Stacked Cartons, Zero Roof) */}
                <img
                  src={OPEN_WAREHOUSE_IMAGE}
                  alt={selectedCategory.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:transform-none"
                />

                {/* 2. Top Layer: Shaded Warehouse with Original Metal Roof Structure */}
                <img
                  src={SHADED_WAREHOUSE_IMAGE}
                  alt="Covered warehouse facility with original overhead metal roof structure"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ease-in-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:transform-none ${
                    isShaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />

                {/* MSK Logo Watermark Tag */}
                <div className="absolute bottom-4 right-4 z-20 pointer-events-none select-none">
                  <div className="flex items-center bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-md shadow-md border border-neutral-200">
                    <img
                      src="/images/logo/msk-logistics-logo.png"
                      alt="MSK Logistics"
                      className="h-4.5 w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Mode Pill Tag Overlay */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-md backdrop-blur-md ${
                    isShaded
                      ? 'bg-[#173F70]/90 text-white border border-white/20'
                      : 'bg-white/90 text-[#173F70] border border-neutral-200'
                  }`}>
                    {isShaded ? 'MODE: SHADED WAREHOUSE (COVERED ROOF)' : 'MODE: OPEN WAREHOUSE (OPEN-AIR SKY)'}
                  </div>
                </div>

                {/* Bottom Caption Pill */}
                <div className="absolute bottom-4 left-4 right-24 z-20 pointer-events-none">
                  <div className="bg-black/65 backdrop-blur-md text-white text-xs px-3.5 py-2 rounded-lg max-w-xl border border-white/10 shadow-sm">
                    <span className="font-mono font-semibold text-white/95">
                      {selectedCategory.imageCaption}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Specifications & Suitability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#E8E8E8]">
              {/* Intended Purpose */}
              <div className="space-y-4">
                <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#173F70]" />
                  <span>Staging & Buffer Workflows</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                  {selectedCategory.intendedPurpose.map((purpose, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span>{purpose}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Cargo Types */}
              <div className="space-y-4">
                <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#173F70]" />
                  <span>Suitable Cargo Types</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                  {selectedCategory.suitability.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Professional Customer Scope Note */}
            <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E2E2] text-xs text-[#64748B] flex items-start gap-3">
              <Layers className="w-4 h-4 text-[#173F70] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#334155] font-mono uppercase block mb-1">
                  Operational Coordination Note:
                </strong>
                <p className="leading-relaxed">
                  {selectedCategory.operationalScopeNote}
                </p>
              </div>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="bg-[#173F70] text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-heading">
                Coordinate Cargo Staging Ahead of Port Gate-In
              </h3>
              <p className="text-blue-100 text-sm max-w-xl">
                Contact our JNPT operations desk to confirm staging availability and container positioning schedules.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full sm:w-auto">
              <Link
                to={`/request-quote?enquiry=${activeTab}-warehouse`}
                className="w-full sm:w-auto bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md text-center inline-flex items-center justify-center gap-2"
              >
                <span>Request Facility Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-5 rounded-xl text-sm transition-colors text-center border border-white/20"
              >
                <span>Contact Desk</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
