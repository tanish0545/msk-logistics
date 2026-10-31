import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Box, 
  Container, 
  Anchor, 
  SunMedium, 
  Umbrella, 
  Ship, 
  ExternalLink,
  ClipboardCheck
} from 'lucide-react';
import { HeroVideo } from '../components/hero/HeroVideo';
import { SolutionCards } from '../components/export-solutions/SolutionCards';
import { OperationalEnvironmentsGallery } from '../components/gallery/OperationalEnvironmentsGallery';
import { BrandedImage } from '../components/common/BrandedImage';
import { MagneticButton } from '../components/common/MagneticButton';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { 
  COMPANY_DETAILS, 
  CORE_SERVICES, 
  OPERATIONAL_COMMITMENTS 
} from '../data/company';
import { CONTAINER_LIST } from '../data/containerGuideData';
import { SHIPMENT_GALLERY } from '../data/shipmentGalleryData';
import { OPEN_WAREHOUSE_IMAGE, SHADED_WAREHOUSE_IMAGE } from '../data/warehouseData';
import { VESSEL_SCHEDULE_CONFIG } from '../components/navigation/navConfig';

export const HomePage: React.FC = () => {
  const exportPackaging = CORE_SERVICES.find(s => s.id === 'export-packaging') || CORE_SERVICES[0];
  const containerStuffing = CORE_SERVICES.find(s => s.id === 'container-stuffing') || CORE_SERVICES[1];
  const cargoLashing = CORE_SERVICES.find(s => s.id === 'cargo-lashing') || CORE_SERVICES[2];

  // Homepage Warehouse Preview state (exact same image, CSS overlay)
  const [warehouseMode, setWarehouseMode] = useState<'open' | 'shaded'>('open');
  const isShaded = warehouseMode === 'shaded';

  // Interactive active workflow stage for How It Works timeline
  const [activeWorkflowStage, setActiveWorkflowStage] = useState<number>(0);

  // Workflow stages matching the verified 4-step sequence
  const workflowStages = [
    {
      step: '01',
      title: 'Cargo Preparation',
      subtitle: 'Technical Review & Staging',
      description: 'Comprehensive review of cargo dimensions, tare weights, and container compatibility before positioning at terminal.',
      icon: ClipboardCheck,
    },
    {
      step: '02',
      title: 'Export Packaging',
      subtitle: 'Industrial Timber & Barrier Foil',
      description: 'Application of ISPM-15 treated timber crating, vapor-barrier foil sealing, and industrial desiccants for ocean transit.',
      icon: Box,
    },
    {
      step: '03',
      title: 'Container Stuffing',
      subtitle: 'Systematic Weight Distribution',
      description: 'Precision container stuffing, floor runner alignment, and heavy-payload balancing across ISO container beds.',
      icon: Container,
    },
    {
      step: '04',
      title: 'Cargo Lashing & Securing',
      subtitle: 'Heavy Restraints & Handover',
      description: 'High-tensile polyester webbing, steel wire lashing, timber chocking, and sign-off inspection before container door closure.',
      icon: Anchor,
    },
  ];

  // Preview container selection (4 curated types)
  const previewContainers = CONTAINER_LIST.filter(c => 
    ['20ft-standard', '40ft-high-cube', 'flat-rack', 'open-top'].includes(c.id)
  );

  // Preview shipment projects (3 distinct categories)
  const previewShipments = [
    SHIPMENT_GALLERY.find(s => s.category === 'flat-rack') || SHIPMENT_GALLERY[0],
    SHIPMENT_GALLERY.find(s => s.category === 'breakbulk') || SHIPMENT_GALLERY[1],
    SHIPMENT_GALLERY.find(s => s.category === 'open-top') || SHIPMENT_GALLERY[2],
  ];

  const trackingUrl = VESSEL_SCHEDULE_CONFIG.externalUrl || 'https://www.marinetraffic.com/';

  return (
    <div className="space-y-0 bg-white">
      {/* ------------------------------------------------------------- */}
      {/* 1. CINEMATIC HERO (3-video continuous sequence)                */}
      {/* ------------------------------------------------------------- */}
      <HeroVideo />

      {/* ------------------------------------------------------------- */}
      {/* 2. COMPANY INTRODUCTION TO MSK LOGISTICS                       */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E2E2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <ScrollReveal direction="left" delay={0} className="lg:col-span-5 space-y-4">
              <span className="editorial-badge bg-[#173F70]/10 text-[#173F70] border-[#173F70]/20">
                INDUSTRIAL EXPORT CAPABILITY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] tracking-tight font-heading leading-tight">
                Engineered Packaging & Container Stuffing for Maritime Export
              </h2>
              <div className="w-16 h-1 bg-[#B62825]" />
            </ScrollReveal>

            <ScrollReveal direction="right" delay={120} className="lg:col-span-7 space-y-5 text-base sm:text-lg text-[#666666] leading-relaxed font-body">
              <p>
                <strong className="text-[#343434] font-semibold">{COMPANY_DETAILS.publicName}</strong> operates directly from Western India's premier container hub at Nhava Sheva (JNPT). We specialize in technical export preparation for sea freight consignments, ensuring cargo is physically protected, systematically loaded, and immovably secured before ocean transit.
              </p>
              <p>
                Our operational disciplines are strictly focused on three core stages: industrial export packaging and crating, methodical container stuffing and weight balancing, and heavy-duty cargo lashing and timber shoring. Whether operating at your factory floor, CFS staging facility, or terminal yard, our rigging specialists execute agreed work scopes with marine safety rigor.
              </p>
              
              <div className="pt-3 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-mono text-[#173F70]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B62825]" />
                  <span className="font-bold">EXPORT PACKAGING</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B62825]" />
                  <span className="font-bold">CONTAINER STUFFING</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B62825]" />
                  <span className="font-bold">CARGO LASHING & SECURING</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#173F70] hover:text-[#B62825] transition-colors"
                >
                  <span>Learn more about our company & team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. CORE SERVICES — EDITORIAL INDUSTRIAL PRESENTATION           */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-[#F5F5F3] border-b border-[#E2E2E2] overflow-hidden" id="core-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          {/* Section Header */}
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="editorial-badge bg-white text-[#B62825] border-red-200">
                CORE DISCIPLINES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] font-heading tracking-tight">
                Specialized Export Preparation Services
              </h2>
              <p className="text-base sm:text-lg text-[#666666]">
                Each discipline is engineered to mitigate dynamic forces during ocean voyages, rail transfers, and heavy port handling.
              </p>
            </div>

            <div>
              <Link 
                to="/services" 
                className="btn-secondary text-sm inline-flex items-center gap-2 shadow-xs"
              >
                <span>Complete Services Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Service 01: Export Packaging (Editorial Split) */}
          <ScrollReveal direction="left" delay={0}>
            <div className="bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden shadow-sm hover-lift hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              <div className="lg:col-span-6 relative h-full min-h-[340px] sm:min-h-[400px]">
                <BrandedImage
                  src={exportPackaging.image}
                  alt={exportPackaging.title}
                  aspectRatio="h-full w-full min-h-[340px] sm:min-h-[400px]"
                  imageClassName="h-full w-full object-cover"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="editorial-badge bg-[#343434] text-white border-white/20">
                    DISCIPLINE 01
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider">
                    <Box className="w-4 h-4" />
                    <span>CARGO PREPARATION & ISPM-15 COMPLIANCE</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#173F70] font-heading">
                    {exportPackaging.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                    {exportPackaging.shortDescription}
                  </p>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                  {exportPackaging.keyActivities.slice(0, 3).map((act, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <Link
                    to={`/services/${exportPackaging.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#173F70] hover:text-[#B62825] transition-colors"
                  >
                    <span>Explore Packaging Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/request-quote?category=general-export"
                    className="text-xs font-semibold text-[#B62825] hover:underline"
                  >
                    Quote This Service &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Service 02: Container Stuffing (Inverted Split) */}
          <ScrollReveal direction="right" delay={120}>
            <div className="bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden shadow-sm hover-lift hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              <div className="lg:col-span-6 p-8 sm:p-12 space-y-6 order-2 lg:order-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173F70] uppercase tracking-wider">
                    <Container className="w-4 h-4" />
                    <span>PRECISION LOADING & WEIGHT DISTRIBUTION</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#173F70] font-heading">
                    {containerStuffing.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                    {containerStuffing.shortDescription}
                  </p>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                  {containerStuffing.keyActivities.slice(0, 3).map((act, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#173F70] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <Link
                    to={`/services/${containerStuffing.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#173F70] hover:text-[#B62825] transition-colors"
                  >
                    <span>Explore Stuffing Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/request-quote?category=container-selection"
                    className="text-xs font-semibold text-[#B62825] hover:underline"
                  >
                    Quote This Service &rarr;
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 relative h-full min-h-[340px] sm:min-h-[400px] order-1 lg:order-2">
                <BrandedImage
                  src={containerStuffing.image}
                  alt={containerStuffing.title}
                  aspectRatio="h-full w-full min-h-[340px] sm:min-h-[400px]"
                  imageClassName="h-full w-full object-cover"
                />
                <div className="absolute top-4 right-4 z-10">
                  <span className="editorial-badge bg-[#173F70] text-white border-white/20">
                    DISCIPLINE 02
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Service 03: Cargo Lashing & Securing (Editorial Split) */}
          <ScrollReveal direction="left" delay={0}>
            <div className="bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden shadow-sm hover-lift hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              <div className="lg:col-span-6 relative h-full min-h-[340px] sm:min-h-[400px]">
                <BrandedImage
                  src={cargoLashing.image}
                  alt={cargoLashing.title}
                  aspectRatio="h-full w-full min-h-[340px] sm:min-h-[400px]"
                  imageClassName="h-full w-full object-cover"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="editorial-badge bg-[#B62825] text-white border-white/20">
                    DISCIPLINE 03
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider">
                    <Anchor className="w-4 h-4" />
                    <span>DYNAMIC FORCE RESTRAINT & TIMBER SHORING</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#173F70] font-heading">
                    {cargoLashing.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                    {cargoLashing.shortDescription}
                  </p>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-[#475569]">
                  {cargoLashing.keyActivities.slice(0, 3).map((act, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <Link
                    to={`/services/${cargoLashing.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#173F70] hover:text-[#B62825] transition-colors"
                  >
                    <span>Explore Lashing Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/request-quote?category=flat-rack"
                    className="text-xs font-semibold text-[#B62825] hover:underline"
                  >
                    Quote This Service &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. TWO EXPORT PACKING ARRANGEMENTS                             */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E2E2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto space-y-4">
            <span className="editorial-badge bg-[#173F70]/10 text-[#173F70] border-[#173F70]/20">
              SERVICE ARRANGEMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] font-heading tracking-tight">
              Export Packing Solutions Designed Around Your Needs
            </h2>
            <p className="text-base sm:text-lg text-[#666666] leading-relaxed font-body">
              Choose the arrangement that suits your cargo and container availability. MSK Logistics performs the agreed export packaging, container stuffing, and cargo lashing work.
            </p>
          </ScrollReveal>

          {/* The Two Solution Cards Component */}
          <SolutionCards />

          <ScrollReveal direction="up" delay={120} className="text-center pt-2">
            <Link 
              to="/export-packing-solutions"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#173F70] hover:text-[#B62825] transition-colors"
            >
              <span>Compare Both Export Arrangements in Full Detail</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. IMPORT & EXPORT OVERVIEW (LCL vs FCL Summary)              */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E2E2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="editorial-badge bg-white text-[#173F70] border-[#E2E8F0]">
                SHIPPING LOAD CONCEPTS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] font-heading tracking-tight">
                Import & Export Overview: LCL vs FCL
              </h2>
              <p className="text-base sm:text-lg text-[#666666]">
                Understanding whether your consignment moves as consolidated cargo or a dedicated container dictates export packaging and securing strategy.
              </p>
            </div>

            <div>
              <Link 
                to="/import-export" 
                className="btn-secondary text-sm inline-flex items-center gap-2 shadow-xs"
              >
                <span>Full Import & Export Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LCL Preview Card */}
            <ScrollReveal direction="left" delay={0} className="h-full">
              <div className="h-full bg-white p-7 sm:p-8 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#173F70] uppercase tracking-wider">
                    CONSOLIDATED FREIGHT
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#F1F5F9] text-xs font-mono text-[#475569]">
                    1 to 15 CBM
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#1E293B]">
                  LCL — Less than Container Load
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Cargo shares container space with shipments from other exporters at a Container Freight Station (CFS). Requires reinforced export crating, vapor barriers, and robust palletization to withstand multiple transit transfers.
                </p>
                <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#64748B]">Billed on volume (W/M)</span>
                  <Link to="/import-export" className="text-xs font-bold text-[#173F70] hover:text-[#B62825]">
                    Learn More &rarr;
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* FCL Preview Card */}
            <ScrollReveal direction="right" delay={140} className="h-full">
              <div className="h-full bg-white p-7 sm:p-8 rounded-2xl border border-[#E2E2E2] shadow-xs space-y-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider">
                    DEDICATED FULL CONTAINER
                  </span>
                  <span className="px-2.5 py-1 rounded bg-red-50 text-xs font-mono text-[#B62825] font-semibold">
                    Exclusive Unit
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#1E293B]">
                  FCL — Full Container Load
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  An entire 20ft, 40ft, Open Top, or Flat Rack is allocated exclusively to your cargo. Direct stuffing at factory premises or port staging yard, sealed with high-security bolt seal, and secured against dynamic pitch and roll.
                </p>
                <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#64748B]">Flat container freight basis</span>
                  <Link to="/import-export" className="text-xs font-bold text-[#B62825] hover:underline">
                    Learn More &rarr;
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. CONTAINER GUIDE PREVIEW                                      */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E2E2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="editorial-badge bg-[#173F70]/10 text-[#173F70] border-[#173F70]/20">
                CONTAINER SPECIFICATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] font-heading tracking-tight">
                Standard Shipping Container Types
              </h2>
              <p className="text-base sm:text-lg text-[#666666]">
                Review indicative interior and exterior dimensions, cubic volumes, and payload ratings for international ocean containers.
              </p>
            </div>

            <div>
              <Link 
                to="/container-guide" 
                className="btn-secondary text-sm inline-flex items-center gap-2 shadow-xs"
              >
                <span>Complete 6-Container Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* 4 Selected Container Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewContainers.map((container, idx) => {
              const direction = idx < 2 ? 'left' : 'right';
              const delay = (idx % 4) * 110;

              return (
                <ScrollReveal key={container.id} direction={direction} delay={delay} className="h-full">
                  <div className="bg-[#F8FAFC] h-full rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs hover-lift transition-all group flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-[16/11] bg-neutral-900 overflow-hidden">
                        <BrandedImage
                          src={container.exteriorImage}
                          alt={container.name}
                          aspectRatio="aspect-[16/11]"
                          imageClassName="group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                            {container.code}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <h3 className="font-bold text-base text-[#1E293B] group-hover:text-[#173F70] transition-colors leading-snug">
                          {container.name}
                        </h3>
                        
                        <div className="space-y-1.5 text-xs font-mono text-[#64748B]">
                          <div className="flex justify-between">
                            <span>Volume:</span>
                            <strong className="text-[#173F70]">{container.cubicCapacity.cbm}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Internal Length:</span>
                            <strong className="text-[#334155]">{container.internalDimensions.length.metricMeters}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Payload:</span>
                            <strong className="text-[#334155]">{container.maxPayload.kg}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <Link
                        to="/container-guide"
                        className="w-full text-center block py-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-[#173F70] hover:text-white text-xs font-bold text-[#173F70] transition-colors shadow-2xs"
                      >
                        View Specs & Interior &rarr;
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. OPERATIONAL ENVIRONMENTS GALLERY                            */}
      {/* ------------------------------------------------------------- */}
      <OperationalEnvironmentsGallery />

      {/* ------------------------------------------------------------- */}
      {/* 8. WAREHOUSE OVERVIEW (Open vs Shaded Single Image Treatment) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E2E2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="editorial-badge bg-[#173F70]/10 text-[#173F70] border-[#173F70]/20">
                STAGING & BUFFER FACILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] font-heading tracking-tight">
                Warehouse & Staging Environments
              </h2>
              <p className="text-base sm:text-lg text-[#666666]">
                Explore both open yard staging and sheltered packing bay options ahead of port gate-in. Toggle modes to observe the protective canopy effect.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#F1F5F9] p-1 rounded-xl text-xs font-mono border border-neutral-200/80">
                <button
                  type="button"
                  onClick={() => setWarehouseMode('open')}
                  aria-pressed={!isShaded}
                  className={`py-1.5 px-3 rounded-lg transition-all duration-300 inline-flex items-center gap-1.5 ${
                    !isShaded ? 'bg-white text-[#173F70] font-bold shadow-xs' : 'text-[#64748B] hover:text-[#173F70]'
                  }`}
                >
                  <SunMedium className={`w-3.5 h-3.5 transition-transform duration-300 motion-reduce:transform-none ${
                    !isShaded ? 'text-amber-500 scale-110 rotate-12' : 'text-amber-500/70 scale-95'
                  }`} />
                  <span>Open Yard</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWarehouseMode('shaded')}
                  aria-pressed={isShaded}
                  className={`py-1.5 px-3 rounded-lg transition-all duration-300 inline-flex items-center gap-1.5 ${
                    isShaded ? 'bg-[#173F70] text-white font-bold shadow-xs' : 'text-[#64748B] hover:text-[#173F70]'
                  }`}
                >
                  <Umbrella className={`w-3.5 h-3.5 transition-transform duration-300 motion-reduce:transform-none ${
                    isShaded ? 'text-sky-300 scale-110 -rotate-12' : 'text-sky-500/70 scale-95'
                  }`} />
                  <span>Shaded Bay</span>
                </button>
              </div>

              <Link 
                to="/warehouse" 
                className="btn-secondary text-sm inline-flex items-center gap-2 shadow-xs group/btn"
              >
                <span>Full Facility Details</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Interactive Warehouse Preview Card: Open Sky vs Covered Roof */}
          <ScrollReveal direction="up" delay={80}>
            <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              <div className="lg:col-span-7 relative aspect-[16/10] bg-neutral-950 overflow-hidden group">
                {/* Layer 1: Open Warehouse Base (Natural daylight sky, stacked cartons, zero roof) */}
                <img
                  src={OPEN_WAREHOUSE_IMAGE}
                  alt="MSK Logistics Open-Air Warehouse Staging with Natural Daylight Sky"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none"
                />

                {/* Layer 2: Shaded Warehouse Overlay (Original metal roof structure & covered facility) */}
                <img
                  src={SHADED_WAREHOUSE_IMAGE}
                  alt="MSK Logistics Covered Warehouse Facility with Metal Roof"
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none ${
                    isShaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  aria-hidden={!isShaded}
                />

                {/* Mode indicator badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md ${
                    isShaded ? 'bg-[#173F70] text-white' : 'bg-white text-[#173F70]'
                  }`}>
                    {isShaded ? 'SHADED WAREHOUSE (COVERED ROOF)' : 'OPEN WAREHOUSE (OPEN-AIR SKY)'}
                  </span>
                </div>

                {/* MSK Logo watermark */}
                <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                  <div className="flex items-center bg-white/95 px-2 py-1 rounded shadow-md border border-neutral-200">
                    <img
                      src="/images/logo/msk-logistics-logo.png"
                      alt="MSK Logistics"
                      className="h-4 w-auto object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 space-y-5">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider">
                    {isShaded ? 'MODE 02 — COVERED STORAGE' : 'MODE 01 — OPEN STORAGE'}
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-[#1E293B]">
                    {isShaded ? 'Shaded Warehouse & Packing Shed' : 'Open Yard Staging Grounds'}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  {isShaded
                    ? 'Covered canopy and sheltered warehouse environment designed to protect moisture-sensitive industrial cargo, crating timber, barrier foil wrapping, and finished assemblies.'
                    : 'Open-air storage and industrial yard environment designed for weather-resistant goods, heavy steel fabrications, container holding, and short-term transit buffer staging.'
                  }
                </p>

                <div className="space-y-2 text-xs sm:text-sm text-[#475569]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{isShaded ? 'Dry stuffing & barrier foil under roof protection' : 'Staging for heavy low-bed trailers & hydraulic cranes'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>{isShaded ? 'Protected staging for electrical panels & machined components' : 'Pre-stuffing structural equipment laydown & sorting'}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/warehouse"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#173F70] hover:text-[#B62825] transition-colors"
                  >
                    <span>Explore full facility capabilities</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 9. HOW IT WORKS: STRUCTURED WORKFLOW                          */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E2E2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-14">
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="editorial-badge bg-white text-[#343434] border-neutral-300">
                STRUCTURED WORKFLOW
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] font-heading tracking-tight">
                How It Works: From Scope Review to Handover
              </h2>
              <p className="text-base sm:text-lg text-[#666666]">
                A predictable, quote-based process ensuring seamless coordination between your cargo preparation and container operations.
              </p>
            </div>

            <div>
              <Link 
                to="/how-it-works" 
                className="btn-secondary text-sm inline-flex items-center gap-2 shadow-xs"
              >
                <span>Read Detailed Process</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Animated 4-Stage Workflow Timeline with MSK-red Progress Line */}
          <div className="relative">
            {/* Desktop Horizontal MSK-Red Progress Line */}
            <div 
              className="hidden lg:block absolute top-7 left-14 right-14 h-[2px] bg-gradient-to-r from-[#B62825] via-[#B62825]/70 to-[#173F70]/30 z-0 pointer-events-none motion-reduce:opacity-50" 
              aria-hidden="true" 
            />

            {/* Mobile Vertical MSK-Red Progress Line */}
            <div 
              className="lg:hidden absolute top-8 bottom-8 left-[31px] w-[2px] bg-gradient-to-b from-[#B62825] via-[#B62825]/60 to-[#173F70]/30 z-0 pointer-events-none motion-reduce:opacity-50" 
              aria-hidden="true" 
            />

            {/* Stage Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {workflowStages.map((stage, idx) => {
                const IconComponent = stage.icon;
                const isActive = activeWorkflowStage === idx;
                const direction = idx < 2 ? 'left' : 'right';
                const delay = idx * 110;

                return (
                  <ScrollReveal key={stage.step} direction={direction} delay={delay} className="h-full">
                    <div 
                      onMouseEnter={() => setActiveWorkflowStage(idx)}
                      onFocus={() => setActiveWorkflowStage(idx)}
                      tabIndex={0}
                      className={`group h-full bg-white rounded-2xl border p-6 sm:p-7 space-y-4 transition-all duration-300 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825] motion-reduce:transform-none motion-reduce:transition-none cursor-default ${
                        isActive 
                          ? 'border-[#B62825] shadow-lg -translate-y-1.5 ring-1 ring-[#B62825]/30' 
                          : 'border-[#E2E8F0] hover:border-[#173F70]/40 hover:-translate-y-1 shadow-xs'
                      }`}
                    >
                      {/* Stage Header with Icon Badge */}
                      <div className="flex items-center justify-between">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 motion-reduce:transform-none ${
                          isActive
                            ? 'bg-[#B62825] text-white shadow-md scale-105'
                            : 'bg-[#F8FAFC] text-[#173F70] border border-[#E2E8F0] group-hover:scale-105 group-hover:text-[#B62825] group-hover:border-[#B62825]/40'
                        }`}>
                          <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        <span className="text-xs font-mono font-bold text-[#B62825] bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                          STAGE {stage.step}
                        </span>
                      </div>

                      {/* Stage Details */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#173F70]">
                          {stage.subtitle}
                        </div>
                        <h3 className="text-lg font-bold text-[#1E293B] font-heading leading-snug group-hover:text-[#B62825] transition-colors">
                          {stage.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed pt-1">
                          {stage.description}
                        </p>
                      </div>

                      {/* Active Visual Indicator Footnote */}
                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                        <span>Phase 0{idx + 1} of 04</span>
                        {isActive && (
                          <span className="text-[#B62825] font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B62825] animate-pulse" />
                            <span>Active Focus</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10. WHY CHOOSE MSK LOGISTICS                                   */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E2E2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <ScrollReveal direction="up" className="max-w-2xl space-y-3">
            <span className="editorial-badge bg-[#F5F5F3] text-[#173F70] border-neutral-300">
              OPERATIONAL PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] font-heading tracking-tight">
              Why Work With MSK Logistics?
            </h2>
            <p className="text-base sm:text-lg text-[#666666]">
              Our operational principles are grounded in transparent execution, technical coordination, and direct communication.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {OPERATIONAL_COMMITMENTS.map((item, idx) => {
              const direction = idx === 0 ? 'left' : idx === 1 ? 'up' : 'right';
              const delay = idx * 120;

              return (
                <ScrollReveal key={idx} direction={direction} delay={delay} className="h-full">
                  <div className="bg-[#F8FAFC] h-full p-7 sm:p-8 rounded-2xl border border-[#E2E8F0] space-y-4 transition-all duration-300 hover:border-[#173F70]/50 hover:shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#173F70] flex items-center justify-center font-mono font-bold text-sm border border-blue-100">
                      0{idx + 1}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#173F70] font-heading">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#666666] leading-relaxed font-body">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 11. VESSEL SCHEDULE PREVIEW & EXTERNAL TRACKING                */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-[#E2E2E2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
            <ScrollReveal direction="left" delay={0} className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#B62825]">
                <Ship className="w-4 h-4" />
                <span>PORT DEADLINE COORDINATION</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B]">
                Vessel Schedule & Tracking
              </h3>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Access the relevant carrier or vessel-tracking service to review shipment schedules, vessel movements, and port gate-in deadlines at Nhava Sheva (JNPT).
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={120} className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <a
                href={trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-primary text-sm py-3 px-5 inline-flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
              >
                <span>Open Vessel Tracking</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                to="/vessel-schedule"
                className="w-full sm:w-auto btn-secondary text-sm py-3 px-5 text-center whitespace-nowrap"
              >
                <span>Cut-Off Planning Guide</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 12. LATEST SHIPMENT GALLERY PREVIEW                           */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E2E2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="editorial-badge bg-[#173F70]/10 text-[#173F70] border-[#173F70]/20">
                FIELD ARCHIVES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] font-heading tracking-tight">
                Latest Operational Shipments
              </h2>
              <p className="text-base sm:text-lg text-[#666666]">
                A showcase of recent export projects spanning Flat Rack platforms, Breakbulk haulage, and Open Top equipment.
              </p>
            </div>

            <div>
              <Link 
                to="/import-export#shipment-gallery" 
                className="btn-secondary text-sm inline-flex items-center gap-2 shadow-xs"
              >
                <span>All Shipment Records</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewShipments.map((item, idx) => {
              const direction = idx === 0 ? 'left' : idx === 1 ? 'up' : 'right';
              const delay = idx * 120;

              return (
                <ScrollReveal key={item.id} direction={direction} delay={delay} className="h-full">
                  <div className="bg-white h-full rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs hover-lift transition-all group flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                        <BrandedImage
                          src={item.image}
                          alt={item.title}
                          aspectRatio="aspect-[16/10]"
                          imageClassName="group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2.5 py-1 rounded bg-[#173F70]/90 backdrop-blur-md text-white text-[11px] font-mono font-bold shadow">
                            {item.categoryLabel}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 space-y-2.5">
                        <h4 className="font-bold text-base sm:text-lg text-[#1E293B] group-hover:text-[#B62825] transition-colors leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#64748B] line-clamp-2 leading-relaxed">
                          {item.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-[#F1F5F9] mt-2 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#64748B] truncate max-w-[180px]">
                        {item.dimensionsNote}
                      </span>
                      <Link
                        to="/import-export"
                        className="text-xs font-bold text-[#173F70] hover:text-[#B62825]"
                      >
                        View Record &rarr;
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 13. PREMIUM CINEMATIC QUOTE CTA SECTION                       */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-24 sm:py-32 bg-[#0B1E38] text-white overflow-hidden group">
        {/* Background Photograph with subtle zoom effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/operations/container-loading/vessel-stowage-cell-guides.jpg"
            alt="Port terminal vessel stowage operations"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center opacity-30 transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out pointer-events-none"
          />
          {/* Deep Navy/Charcoal Vignette Gradients */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-[#0B1E38] via-[#0F2D52]/90 to-[#0B1E38]/95 pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0B1E38]/50 to-[#0B1E38] pointer-events-none"
            aria-hidden="true"
          />
        </div>

        <ScrollReveal direction="up" delay={0} className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-7 relative z-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F5F5F3] text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#B62825] animate-pulse" />
            <span>LET'S PLAN YOUR NEXT SHIPMENT</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading tracking-tight max-w-3xl mx-auto leading-tight">
            Ready to Prepare Your Cargo for Export?
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-body max-w-2xl mx-auto">
            Tell us about your cargo, packaging requirements, and container arrangements. Our team can review your requirements and discuss the next steps.
          </p>

          {/* Capability Indicators / Micro Service Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-blue-200/80 font-mono">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-md">
              <Box className="w-3.5 h-3.5 text-[#B62825]" />
              <span>Export Packaging</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-md">
              <Container className="w-3.5 h-3.5 text-[#B62825]" />
              <span>Container Stuffing</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-md">
              <Anchor className="w-3.5 h-3.5 text-[#B62825]" />
              <span>Cargo Lashing</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton maxPull={5}>
              <Link 
                to="/request-quote"
                className="w-full sm:w-auto bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-4 px-9 rounded-xl text-base transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98] inline-flex items-center justify-center gap-3 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B62825] motion-reduce:transform-none"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover/btn:translate-x-1 motion-reduce:transform-none" />
              </Link>
            </MagneticButton>

            <MagneticButton maxPull={4}>
              <Link 
                to="/services"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl text-base transition-all duration-200 border border-white/25 hover:border-white/40 hover:-translate-y-0.5 active:scale-[0.98] inline-flex items-center justify-center gap-2 group/btn motion-reduce:transform-none"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1 motion-reduce:transform-none" />
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 14. FOOTER COMPONENT is rendered automatically via App.tsx     */}
      {/* ------------------------------------------------------------- */}
    </div>
  );
};
