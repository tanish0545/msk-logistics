import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Umbrella,
  SunMedium,
  Layers,
  Box,
  Clock,
  MapPin,
  Maximize2,
  PackageCheck,
  Wrench
} from 'lucide-react';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';
import { BrandedImage } from '../components/common/BrandedImage';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { COMPANY_DETAILS } from '../data/company';
import { WarehouseDualFacilityShowcase } from '../components/warehouse/WarehouseDualFacilityShowcase';

export const WarehousePage: React.FC = () => {
  return (
    <div className="space-y-0 bg-[#FAFAFA]">
      {/* 1. Page Header */}
      <InnerPageBanner
        badge="FACILITY & STAGING ARRANGEMENTS"
        badgeSubtext="NHAVA SHEVA (JNPT) LOGISTICS CORRIDOR"
        title="Open Yard & Shaded Warehouse Facilities"
        description="Comprehensive export staging facilities at Nhava Sheva: Open Yard Staging for container buffer storage, trailer movements, and heavy ODC machinery laydown; Shaded Warehouse Bays & Aryan Shed for sheltered export packing, pallet storage, and delicate cargo protection."
        meta={
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B62825]" />
              <span>Location: JNPT Port Corridor, Navi Mumbai</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B62825]" />
              <span>Availability: 24×7 Gate Operations</span>
            </div>
          </div>
        }
      />

      {/* 2. Facility Quick Jump Navigation Bar */}
      <section className="bg-white border-b border-[#E2E2E2] sticky top-[68px] sm:top-[72px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full lg:w-auto">
            <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider shrink-0 mr-1">
              Facilities:
            </span>
            <a
              href="#open-yard"
              className="py-1.5 px-3 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 bg-[#F1F5F9] text-[#1E293B] hover:bg-[#B62825] hover:text-white shrink-0"
            >
              <SunMedium className="w-3.5 h-3.5 text-amber-500" />
              <span>1. Open Yard</span>
            </a>
            <a
              href="#shaded-warehouse"
              className="py-1.5 px-3 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 bg-[#F1F5F9] text-[#1E293B] hover:bg-[#000000] hover:text-white shrink-0"
            >
              <Umbrella className="w-3.5 h-3.5 text-sky-500" />
              <span>2. Shaded Warehouse</span>
            </a>
            <a
              href="#odc-staging"
              className="py-1.5 px-3 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 bg-[#F1F5F9] text-[#1E293B] hover:bg-[#B62825] hover:text-white shrink-0"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#B62825]" />
              <span>3. ODC &amp; Project Staging</span>
            </a>
            <a
              href="#warehouse-packing"
              className="py-1.5 px-3 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 bg-[#F1F5F9] text-[#1E293B] hover:bg-[#B62825] hover:text-white shrink-0"
            >
              <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>4. Packing &amp; Palletisation</span>
            </a>
            <a
              href="#equipment-handling"
              className="py-1.5 px-3 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 bg-[#F1F5F9] text-[#1E293B] hover:bg-[#B62825] hover:text-white shrink-0"
            >
              <Wrench className="w-3.5 h-3.5 text-indigo-600" />
              <span>5. Equipment &amp; Handling</span>
            </a>
          </div>

          <div className="hidden xl:inline-flex items-center gap-1.5 text-xs font-mono text-white bg-[#000000] px-3 py-1.5 rounded-lg border border-white/20">
            <Layers className="w-3.5 h-3.5 text-[#B62825]" />
            <span>5 Specialized Facility Zones</span>
          </div>
        </div>
      </section>

      {/* Dual Facility Visual Showcase */}
      <WarehouseDualFacilityShowcase />

      {/* ========================================================================= */}
      {/* SECTION 1: OPEN YARD (Container Storage, Movement, Yard Ops, Truck Ops)   */}
      {/* ========================================================================= */}
      <section id="open-yard" className="py-14 sm:py-20 bg-white border-b border-[#E2E2E2] scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Header of Section 1 */}
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E8E8]">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold tracking-wider uppercase">
                <SunMedium className="w-3.5 h-3.5 text-amber-600" />
                <span>SECTION 01 — OPEN YARD INFRASTRUCTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#1E293B] tracking-tight">
                Open Yard: Container Storage, Movement &amp; Yard Operations
              </h2>
              <p className="text-[15px] sm:text-base text-[#475569] leading-relaxed">
                Spacious open-air hardstanding yard engineered for short-term container buffer holding, Conex CFS and Aryan yard staging, loaded on wheels and buffer services, heavy low-bed trailer maneuvering, mobile crane positioning, and Over-Dimensional Cargo (ODC) &amp; Break Bulk Cargo (BBC) staging under natural daylight sky ahead of JNPT terminal gate-in. Integrated logistics and supply chain services tailored for EXIM operations.
              </p>
            </div>

            <Link
              to="/request-quote?enquiry=open-yard"
              className="btn-primary text-xs sm:text-sm py-2.5 px-5 self-start md:self-auto shrink-0"
            >
              <span>Enquire for Open Yard Staging</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </ScrollReveal>

          {/* Visual Showcase: Large Yard Staging Visual + Photo Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Primary Visual */}
            <ScrollReveal direction="left" delay={50} className="lg:col-span-7 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-[#E2E2E2] shadow-md bg-neutral-900 aspect-[16/10] group">
                <BrandedImage
                  src="/images/operations/warehouse/open-yard-conex-staging.jpg"
                  alt="Authentic open-air container yard staging at JNPT Conex CFS corridor with natural daylight sky and container stacks"
                  aspectRatio="h-full w-full"
                  imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-white/95 text-[#1E293B] shadow-md backdrop-blur-sm border border-neutral-200">
                    OPEN YARD CONTAINER STAGING • JNPT CORRIDOR
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#64748B] font-mono">
                Authentic open yard staging: Conex CFS &amp; JNPT corridor container buffer yard, trailer maneuvering, and heavy equipment holding under natural daylight sky.
              </p>
            </ScrollReveal>

            {/* Accompanying Operational Yard Photos */}
            <ScrollReveal direction="right" delay={150} className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] items-center hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/operations/container-loading/mobile-crane-heavy-lift.jpg"
                    alt="Mobile crane heavy lift in open yard"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Mobile Crane &amp; Heavy Lift
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Hydraulic crane rigging for ODC components, structural machinery, and skid placement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] items-center hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/operations/export-packaging/skidded-equipment-terminal-staging.jpg"
                    alt="Heavy skidded equipment in yard staging"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Truck &amp; Trailer Movement (Loaded on Wheels)
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Wide drive-through aisles facilitating heavy multi-axle trailers, loaded on wheels buffer services, and quick turnaround.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] items-center hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/containers/container-40ft-high-cube.jpg"
                    alt="Container buffer storage"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Conex CFS &amp; Container Buffer Holding
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Staging 20ft and 40ft standard, High Cube, and Open Yard containers connected with Conex CFS ahead of vessel cut-offs.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Key Workflows & Suitability Grid for Open Yard */}
          <ScrollReveal direction="up" delay={100} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#E8E8E8]">
            <div className="space-y-4">
              <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B62825]" />
                <span>Open Yard Operational Capabilities</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                {[
                  'Short-term container buffer holding and Conex CFS terminal staging prior to gate opening',
                  'Loaded on wheels & buffer services for container chassis awaiting vessel clearance',
                  'Dedicated laydown for heavy low-bed trailers and multi-axle hydraulic pullers',
                  'Temporary positioning of heavy out-of-gauge (OOG), ODC & Break Bulk Cargo (BBC)',
                  'Pre-stuffing structural equipment sorting and crane rigging coordination',
                  'Terminal gate-in scheduling coordination aligned with vessel cut-offs at JNPT',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B62825]" />
                <span>Recommended Cargo &amp; Project Handlings</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                {[
                  'ODC & Break Bulk Cargo (BBC) staged for heavy industrial and engineering consignments',
                  'Raw structural steel, heavy industrial pipes, flanges, and girders',
                  'Weatherproof machinery pre-packed in heavy timber crating with tarpaulins',
                  'Empty and laden 20ft, 40ft, and Flat Rack shipping container staging',
                  'Over-dimensional breakbulk industrial components and project skids',
                  'Heavy earthmoving and mining equipment undergoing pre-shipment checks',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Operational Coordination Note */}
          <ScrollReveal direction="up" delay={150} className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-[#64748B] flex items-start gap-3">
            <Layers className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#334155] font-mono uppercase block mb-0.5">
                Yard Logistics Protocol (Conex CFS &amp; JNPT Gateways):
              </strong>
              <p className="leading-relaxed">
                Yard staging spaces, crane arrivals, loaded on wheels buffer turnarounds, and Conex CFS staging are systematically coordinated with our Nhava Sheva operational desk based on live terminal gate opening schedules and shipping line vessel cut-offs.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: SHADED WAREHOUSE (Covered Warehouse, Pallets, Packing Ops)     */}
      {/* ========================================================================= */}
      <section id="shaded-warehouse" className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-[#E2E2E2] scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Header of Section 2 */}
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase">
                <Umbrella className="w-3.5 h-3.5 text-sky-600" />
                <span>SECTION 02 — COVERED WAREHOUSE, AQUARIO &amp; ARYAN SHED INFRASTRUCTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#1E293B] tracking-tight">
                Shaded Warehouse, Aquario &amp; Aryan Shed: Covered Storage &amp; Packing Bays
              </h2>
              <p className="text-[15px] sm:text-base text-[#475569] leading-relaxed">
                Fully sheltered warehouse facilities, Aquario bays, and covered Aryan Shed bays equipped with heavy-duty overhead metal roofing, designated forklift access aisles, covered pallet racking, and specialized packing bays. Integrated logistics and supply chain services engineered for EXIM operations, shielding moisture-sensitive industrial goods, export crating, and barrier foil wrapping from humidity and rain.
              </p>
            </div>

            <Link
              to="/request-quote?enquiry=shaded-warehouse"
              className="btn-primary text-xs sm:text-sm py-2.5 px-5 self-start md:self-auto shrink-0 bg-[#000000] hover:bg-[#0B0B0D] border-white/20 text-white"
            >
              <span>Enquire for Shaded Packing</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </ScrollReveal>

          {/* Visual Showcase: Large Covered Facility Visual + Photo Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Primary Visual */}
            <ScrollReveal direction="left" delay={50} className="lg:col-span-7 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md bg-neutral-900 aspect-[16/10] group">
                <BrandedImage
                  src="/images/operations/warehouse/shaded-warehouse-main-bay.jpg"
                  alt="Covered warehouse facility with overhead metal roof shelter protecting export cargo packages and pallets"
                  aspectRatio="h-full w-full"
                  imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-[#000000] text-white shadow-md backdrop-blur-sm border border-white/20">
                    COVERED PACKING BAY &amp; ARYAN SHED ROOF SHELTER
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#64748B] font-mono">
                Shaded warehouse staging: Heavy-duty metal roof shelter protecting export cartons, timber crating, and palletized cargo inside Aryan Shed bays.
              </p>
            </ScrollReveal>

            {/* Accompanying Indoor Packing Photos */}
            <ScrollReveal direction="right" delay={150} className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="flex gap-4 p-4 rounded-xl bg-white border border-[#E2E8F0] items-center shadow-xs hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/operations/warehouse/covered-staging-bays-pallets.jpg"
                    alt="Covered staging bays with pallets"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Pallet Storage &amp; Forklift Aisles
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Structured staging bays with clear forklift access lanes for rapid container stuffing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white border border-[#E2E8F0] items-center shadow-xs hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/operations/warehouse/export-pallet-strapping-staging.jpg"
                    alt="Export pallet strapping under roof"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Export Packing &amp; Palletisation
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Euro &amp; standard pallet fabrication, vertical strapping, and shrink-wrap sealing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white border border-[#E2E8F0] items-center shadow-xs hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/operations/warehouse/industrial-rolls-covered-storage.jpg"
                    alt="Industrial rolls covered storage"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Indoor Cargo &amp; Materials Holding
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Climate-isolated space for moisture-sensitive rolls, fabrics, and bare metal goods.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Key Workflows & Suitability Grid for Shaded Warehouse */}
          <ScrollReveal direction="up" delay={100} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#E8E8E8]">
            <div className="space-y-4">
              <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                <Box className="w-4 h-4 text-[#173F70]" />
                <span>Shaded Warehouse Workflows</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                {[
                  'Sheltered industrial carpentry, wooden box building, and customized casing',
                  'Application of VCI anti-corrosion barrier foil, heat-sealing, and desiccant insertion',
                  'Indoor palletisation with high-tensile composite strapping and stretch-wrapping',
                  'Dry container stuffing operations shielded from tropical coastal rain and dust',
                  'Specialized ODC buffer operations and delicate machine module inspection',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#173F70]" />
                <span>Recommended Cargo for Shaded Staging</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                {[
                  'Machined precision components vulnerable to atmospheric oxidation and humidity',
                  'Electrical switchgears, transformers, control panels, and electronic assemblies',
                  'ISPM-15 heat-treated export crates and wooden pallets awaiting stuffing',
                  'Pharmaceuticals, chemical additives, and paper/fabric rolls requiring dry storage',
                  'Automotive parts, precision tooling, and boxed export merchandise',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Operational Scope Note */}
          <ScrollReveal direction="up" delay={150} className="p-4 rounded-xl bg-sky-50/60 border border-sky-200/80 text-xs text-[#64748B] flex items-start gap-3">
            <Layers className="w-4 h-4 text-sky-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#334155] font-mono uppercase block mb-0.5">
                Covered Bay Protocol (Aryan Shed &amp; Aquario Bays):
              </strong>
              <p className="leading-relaxed">
                Covered packing bays guarantee uninterrupted packing and securing even during monsoon months, ensuring exporters maintain their critical vessel booking cut-offs without moisture damage risk.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: ODC & PROJECT CARGO STAGING                                     */}
      {/* ========================================================================= */}
      <section id="odc-staging" className="py-14 sm:py-20 bg-white border-b border-[#E2E2E2] scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Header of Section 3 */}
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E8E8]">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#B62825] text-xs font-mono font-bold tracking-wider uppercase">
                <Maximize2 className="w-3.5 h-3.5 text-[#B62825]" />
                <span>SECTION 03 — ODC &amp; PROJECT CARGO STAGING</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#1E293B] tracking-tight">
                ODC &amp; Project Cargo Staging: Heavy Low-Bed Laydown &amp; Marine Consolidation
              </h2>
              <p className="text-[15px] sm:text-base text-[#475569] leading-relaxed">
                Specialized heavy laydown yard engineered for Over-Dimensional Cargo (ODC) and Break Bulk Cargo (BBC). Accommodates heavy multi-axle trailers, hydraulic pullers, and project consignments with certified ground-bearing capacity and mobile crane access.
              </p>
            </div>

            <Link
              to="/request-quote?enquiry=odc-staging"
              className="btn-primary text-xs sm:text-sm py-2.5 px-5 self-start md:self-auto shrink-0"
            >
              <span>Enquire for ODC Staging</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </ScrollReveal>

          {/* Visual Showcase for ODC Staging */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <ScrollReveal direction="left" delay={50} className="lg:col-span-7 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-[#E2E2E2] shadow-md bg-neutral-900 aspect-[16/10] group">
                <BrandedImage
                  src="/images/shipments/breakbulk/breakbulk-lowbed-machinery-lashing.jpg"
                  alt="Authentic ODC project cargo on heavy low-bed trailer staged at JNPT container yard"
                  aspectRatio="h-full w-full"
                  imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-white/95 text-[#1E293B] shadow-md backdrop-blur-sm border border-neutral-200">
                    ODC &amp; LOW-BED TRAILER STAGING
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#64748B] font-mono">
                Authentic field record: Heavy low-bed trailer staging with ratchet binders and timber dunnage alongside container stacks.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={150} className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] items-center hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/shipments/breakbulk/breakbulk-heavy-rigging-trailer.jpg"
                    alt="Heavy rigging trailer staging"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Multi-Axle Project Staging
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Dedicated heavy haulage bays for multi-axle pullers and non-standard industrial components.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] items-center hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/shipments/flat-rack/flat-rack-mobile-crane-lift.jpg"
                    alt="Mobile crane heavy lift onto Flat Rack"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Flat Rack &amp; Break Bulk Transfer
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Mobile telescopic crane rigging directly transferring heavy consignments from trailers to flat racks.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] items-center hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/shipments/breakbulk/breakbulk-cylindrical-haulage.jpg"
                    alt="Oversized cylindrical cargo haulage"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Cylindrical Vessel Laydown
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Heavy vessel laydown with specialized saddle bolsters and multi-point ratchet cross-securing.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Capabilities Grid */}
          <ScrollReveal direction="up" delay={100} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#E8E8E8]">
            <div className="space-y-4">
              <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B62825]" />
                <span>ODC Facility Specifications</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                {[
                  'Reinforced hardstanding ground capable of bearing 60+ ton axle point loads',
                  'Wide turning radiuses accommodating multi-axle trailers up to 45 meters total length',
                  'Designated tandem crane lift pads with high-tensile spreader beams',
                  'Seamless gate-in sequencing matching vessel terminal windows at JNPT & Mundra',
                  'Dedicated project tracking and milestone reporting for heavy ODC and project cargo consignments',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B62825]" />
                <span>Cargo Handling Disciplines</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                {[
                  'Over-width and over-height industrial skids exceeding standard container envelopes',
                  'Heavy cylindrical boilers, pressure vessels, and autoclave chambers',
                  'Earthmoving machinery, crawler excavators, and drilling rigs',
                  'Structural steel fabricated trusses, heavy pipe spools, and wind energy segments',
                  'High-value electrical power transformers requiring impact-recorder monitoring',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: WAREHOUSE PACKING AND PALLETISATION                             */}
      {/* ========================================================================= */}
      <section id="warehouse-packing" className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-[#E2E2E2] scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Header of Section 4 */}
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SECTION 04 — EXPORT PACKING &amp; PALLETISATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#1E293B] tracking-tight">
                Warehouse Packing: Custom Pallet Making, Box Building &amp; Strapping
              </h2>
              <p className="text-[15px] sm:text-base text-[#475569] leading-relaxed">
                Turnkey export packing and palletisation operations executed under covered facility bays. Specialized carpentry for Euro and standard wooden pallets, heavy-duty ISPM-15 wooden export crating, composite polyester strapping, and multi-layer VCI moisture barrier packaging.
              </p>
            </div>

            <Link
              to="/request-quote?enquiry=warehouse-packing"
              className="btn-primary text-xs sm:text-sm py-2.5 px-5 self-start md:self-auto shrink-0"
            >
              <span>Enquire for Export Packing</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </ScrollReveal>

          {/* Visual Showcase for Packing */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <ScrollReveal direction="left" delay={50} className="lg:col-span-7 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md bg-neutral-900 aspect-[16/10] group">
                <BrandedImage
                  src="/images/operations/warehouse/export-pallet-strapping-staging.jpg"
                  alt="Authentic export pallet strapping and packaging staging inside warehouse bay"
                  aspectRatio="h-full w-full"
                  imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-white/95 text-[#1E293B] shadow-md backdrop-blur-sm border border-neutral-200">
                    EXPORT PALLETISATION &amp; STRAPPING
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#64748B] font-mono">
                Authentic field record: High-tensile composite strapping and shrink wrapping on customized wooden pallets inside covered warehouse.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={150} className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="flex gap-4 p-4 rounded-xl bg-white border border-[#E2E8F0] items-center shadow-xs hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/operations/export-packaging/sandvik-heavy-wooden-crate.jpg"
                    alt="Sandvik heavy wooden export crate"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Custom Heavy Wooden Crating
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    ISPM-15 treated timber crating engineered for heavy machinery, toolings, and high-value equipment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white border border-[#E2E8F0] items-center shadow-xs hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/operations/export-packaging/heavy-machinery-skid-wrapping.jpg"
                    alt="VCI moisture barrier skid packaging"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    VCI Moisture Barrier Foil
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Vacuum heat-sealed anti-corrosion barrier film with desiccant packs protecting against maritime salt spray.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white border border-[#E2E8F0] items-center shadow-xs hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/operations/warehouse/covered-staging-bays-pallets.jpg"
                    alt="Covered staging bays with export pallets"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Standard &amp; Euro Pallet Making
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Custom fabrication of 1200×800mm, 1200×1000mm, and oversized two-way / four-way forklift pallets.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Capabilities Grid */}
          <ScrollReveal direction="up" delay={100} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#E8E8E8]">
            <div className="space-y-4">
              <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                <Box className="w-4 h-4 text-[#B62825]" />
                <span>Packaging Methodologies</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                {[
                  'ISPM-15 compliant heat-treated wood with phytosanitary stamping for worldwide export',
                  'Polyester composite strapping (19mm to 32mm) with heavy-duty phosphate buckles',
                  'Corrugated paper edge protectors and heavy timber base load spreaders',
                  'Industrial stretch film wrapping (23-micron heavy gauge) with weather-tight top sheeting',
                  'Customized wooden saddles, cradles, and contoured timber bolsters for cylindrical goods',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B62825]" />
                <span>Cargo Suitability</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                {[
                  'Automotive parts, engines, transmissions, and machined components',
                  'Pharmaceutical and food-grade packaging materials staged under clean shed',
                  'Precision electrical control cabinets and automated CNC toolings',
                  'Bagged chemical minerals, polymers, and resin pallets awaiting stuffing',
                  'Textile and fabric rolls stored off-floor on clean wooden runners',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: EQUIPMENT AND CARGO HANDLING                                   */}
      {/* ========================================================================= */}
      <section id="equipment-handling" className="py-14 sm:py-20 bg-white border-b border-[#E2E2E2] scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Header of Section 5 */}
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E8E8]">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-mono font-bold tracking-wider uppercase">
                <Wrench className="w-3.5 h-3.5 text-indigo-600" />
                <span>SECTION 05 — CARGO HANDLING &amp; YARD EQUIPMENT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#1E293B] tracking-tight">
                Equipment &amp; Cargo Handling: Cranes, Forklifts &amp; Buffer Fleet
              </h2>
              <p className="text-[15px] sm:text-base text-[#475569] leading-relaxed">
                Full-spectrum cargo handling machinery and dedicated operations equipment supporting seamless EXIM workflows. Features heavy industrial forklifts, mobile telescopic hydraulic cranes, loaded on wheels buffer services, Conex CFS connectivity, and 24×7 ground supervision.
              </p>
            </div>

            <Link
              to="/request-quote?enquiry=equipment-handling"
              className="btn-primary text-xs sm:text-sm py-2.5 px-5 self-start md:self-auto shrink-0"
            >
              <span>Enquire for Handling Equipment</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </ScrollReveal>

          {/* Visual Showcase for Equipment */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <ScrollReveal direction="left" delay={50} className="lg:col-span-7 space-y-3">
              <div className="relative rounded-2xl overflow-hidden border border-[#E2E2E2] shadow-md bg-neutral-900 aspect-[16/10] group">
                <BrandedImage
                  src="/images/operations/container-loading/mobile-crane-heavy-lift.jpg"
                  alt="Authentic telescopic mobile crane performing heavy lift onto Flat Rack container at Nhava Sheva"
                  aspectRatio="h-full w-full"
                  imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider bg-white/95 text-[#1E293B] shadow-md backdrop-blur-sm border border-neutral-200">
                    TELESCOPIC MOBILE CRANE OPERATIONS
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#64748B] font-mono">
                Authentic field record: Telescopic mobile hydraulic crane rigging and hoisting heavy machinery component onto yellow Flat Rack platform.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={150} className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] items-center hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/operations/container-loading/rigging-crew-crane-loading.jpg"
                    alt="Rigging specialists and vessel crane loading"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Certified Rigging Crews
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Trained ground crews with safety PPE guiding slings, wire bridles, and container cell alignment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] items-center hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/operations/cargo-lashing/trailer-chassis-ratchet-lashing.jpg"
                    alt="Trailer chassis ratchet lashing hardware"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Trailer Lashing Hardware
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    Certified 5-ton ratchet tensioners, safety latch hooks, and corner protectors for road transit.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] items-center hover-lift">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src="/images/operations/cargo-lashing/flat-rack-heavy-duty-orange-lashing.jpg"
                    alt="Flat Rack perimeter ratchet securing"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1E293B] font-heading">
                    Flat Rack Lashing System
                  </h4>
                  <p className="text-xs text-[#64748B]">
                    High-tensile perimeter securing bolted directly to container stake pockets and D-rings.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Capabilities Grid */}
          <ScrollReveal direction="up" delay={100} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#E8E8E8]">
            <div className="space-y-4">
              <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#B62825]" />
                <span>Handling Equipment Inventory</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                {[
                  'Diesel & electric forklifts (3.0T, 5.0T, and 10.0T capacity) with long fork tines',
                  'Telescopic mobile cranes (25T to 75T) with certified wire rope bridles and spreader beams',
                  'Heavy container reach stackers operating within Conex CFS corridor and yard staging',
                  'Custom steel ramp wedges and low-clearance machinery roller skates for container stuffing',
                  'Hydraulic pallet jacks, digital crane hanging scales, and portable air compressors',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-base text-[#1E293B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B62825]" />
                <span>Loaded on Wheels &amp; Buffer Services</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                {[
                  'Loaded on Wheels buffer services: trailers staged with laden boxes awaiting port gate opening',
                  'Zero unnecessary re-handling: cargo remains on wheels for rapid terminal gate-in',
                  'Substantial reduction in port storage charges, container detention, and demurrage risks',
                  'Close operational integration with Conex CFS, Aryan Shed, and terminal planners',
                  'Round-the-clock dispatch coordination with Hardeep / Pradeep road transport fleet',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. COORDINATION & CONSULTATION BANNER                                      */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-18 bg-[#000000] text-white border-t border-b border-white/10">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D9DEE5] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#B62825]" />
                <span>NHAVA SHEVA PORT STAGING DESK</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading">
                Coordinate Open Yard or Shaded Warehouse Staging
              </h3>
              <p className="text-[#AEB6C2] text-sm max-w-xl">
                Contact our JNPT operations desk to book staging bays, schedule trailer arrivals, or discuss custom crating and lashing requirements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                to="/request-quote"
                className="w-full sm:w-auto bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md text-center inline-flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <span>Request Facility Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={COMPANY_DETAILS.emergencyPhoneHref}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-5 rounded-xl text-sm transition-colors text-center border border-white/20 font-mono hover:scale-105 active:scale-95"
              >
                24×7: {COMPANY_DETAILS.emergencyPhoneDisplay}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
