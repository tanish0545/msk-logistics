import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle2,
  Box,
  Container,
  Anchor
} from 'lucide-react';
import { HeroVideo } from '../components/hero/HeroVideo';
import { SolutionCards } from '../components/export-solutions/SolutionCards';
import { OperationalEnvironmentsGallery } from '../components/gallery/OperationalEnvironmentsGallery';
import { BrandedImage } from '../components/common/BrandedImage';
import { 
  COMPANY_DETAILS, 
  CORE_SERVICES, 
  HOW_IT_WORKS_STEPS, 
  OPERATIONAL_COMMITMENTS 
} from '../data/company';

export const HomePage: React.FC = () => {
  const exportPackaging = CORE_SERVICES.find(s => s.id === 'export-packaging') || CORE_SERVICES[0];
  const containerStuffing = CORE_SERVICES.find(s => s.id === 'container-stuffing') || CORE_SERVICES[1];
  const cargoLashing = CORE_SERVICES.find(s => s.id === 'cargo-lashing') || CORE_SERVICES[2];

  return (
    <div className="space-y-0 bg-white">
      {/* ------------------------------------------------------------- */}
      {/* 1. CINEMATIC HERO (3-video continuous sequence)                */}
      {/* ------------------------------------------------------------- */}
      <HeroVideo />

      {/* ------------------------------------------------------------- */}
      {/* 2. BRIEF INTRODUCTION TO MSK LOGISTICS                        */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="editorial-badge bg-[#173F70]/10 text-[#173F70] border-[#173F70]/20">
                INDUSTRIAL EXPORT CAPABILITY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] tracking-tight font-heading leading-tight">
                Engineered Packaging & Container Stuffing for Maritime Export
              </h2>
              <div className="w-16 h-1 bg-[#B62825]" />
            </div>

            <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-[#666666] leading-relaxed font-body">
              <p>
                <strong className="text-[#343434] font-semibold">{COMPANY_DETAILS.publicName}</strong> operates directly from Western India's premier container hub at Nhava Sheva (JNPT). We specialize in technical export preparation for sea freight consignments, ensuring cargo is physically protected, systematically loaded, and immovably secured before ocean transit.
              </p>
              <p>
                Our operational disciplines are strictly focused on three core stages: industrial export packaging and crating, methodical container stuffing and weight balancing, and certified cargo lashing and timber shoring. Whether operating at your factory floor, CFS staging facility, or terminal yard, our rigging specialists execute agreed work scopes with marine safety rigor.
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
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. CORE SERVICES — EDITORIAL INDUSTRIAL PRESENTATION           */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-[#F5F5F3] border-b border-[#E2E2E2]" id="core-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
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
                className="btn-secondary text-sm inline-flex items-center gap-2"
              >
                <span>Complete Services Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Service 01: Export Packaging (Editorial Split) */}
          <div className="bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
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

              {/* Key Activities */}
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

          {/* Service 02: Container Stuffing (Inverted Split) */}
          <div className="bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
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

              {/* Key Activities */}
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

          {/* Service 03: Cargo Lashing & Securing (Editorial Split) */}
          <div className="bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
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

              {/* Key Activities */}
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
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. TWO EXPORT PACKING ARRANGEMENTS                             */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="editorial-badge bg-[#173F70]/10 text-[#173F70] border-[#173F70]/20">
              SERVICE ARRANGEMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] font-heading tracking-tight">
              Export Packing Solutions Designed Around Your Needs
            </h2>
            <p className="text-base sm:text-lg text-[#666666] leading-relaxed font-body">
              Choose the arrangement that suits your cargo and container availability. MSK Logistics performs the agreed export packaging, container stuffing, and cargo lashing work.
            </p>
          </div>

          {/* The Two Solution Cards */}
          <SolutionCards />

          {/* Deep link to comparison */}
          <div className="text-center pt-2">
            <Link 
              to="/import-export"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#173F70] hover:text-[#B62825] transition-colors"
            >
              <span>Explore Shipment Gallery & Detailed Shipping Concepts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. OPERATIONAL ENVIRONMENTS IMAGE GALLERY                      */}
      {/* ------------------------------------------------------------- */}
      <OperationalEnvironmentsGallery />

      {/* ------------------------------------------------------------- */}
      {/* 6. HOW IT WORKS: STRUCTURED WORKFLOW                          */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="editorial-badge bg-[#F5F5F3] text-[#343434] border-neutral-300">
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
                className="btn-secondary text-sm inline-flex items-center gap-2"
              >
                <span>Read Detailed Process</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stepped Workflow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS_STEPS.slice(0, 4).map((step) => (
              <div 
                key={step.step}
                className="relative bg-[#F5F5F3] p-6 sm:p-7 rounded-xl border border-[#E2E2E2] space-y-3 hover:border-[#173F70]/40 transition-colors"
              >
                <div className="text-xs font-mono font-bold text-[#B62825]">
                  STEP {step.step}
                </div>
                <h3 className="text-lg font-bold text-[#173F70] font-heading">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Remaining Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS_STEPS.slice(4).map((step) => (
              <div 
                key={step.step}
                className="relative bg-[#F5F5F3] p-6 sm:p-7 rounded-xl border border-[#E2E2E2] space-y-3 hover:border-[#173F70]/40 transition-colors"
              >
                <div className="text-xs font-mono font-bold text-[#B62825]">
                  STEP {step.step}
                </div>
                <h3 className="text-lg font-bold text-[#173F70] font-heading">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. WHY CHOOSE MSK LOGISTICS                                    */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-[#F5F5F3] border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="editorial-badge bg-white text-[#173F70] border-neutral-300">
              OPERATIONAL PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] font-heading tracking-tight">
              Why Work With MSK Logistics?
            </h2>
            <p className="text-base sm:text-lg text-[#666666]">
              Our operational principles are grounded in transparent execution, technical coordination, and direct communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {OPERATIONAL_COMMITMENTS.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-7 sm:p-8 rounded-2xl border border-[#E2E2E2] space-y-4 transition-all duration-300 hover:border-[#173F70]/50 hover:shadow-lg"
              >
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
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8. QUOTE CTA                                                   */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-[#173F70] text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#173F70] via-[#102C50] to-[#173F70] opacity-95 pointer-events-none" 
          aria-hidden="true" 
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6 relative z-10">
          <span className="editorial-badge bg-white/10 text-white border-white/20">
            TAILORED QUOTATION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading tracking-tight">
            Planning an Export Shipment?
          </h2>
          <p className="text-base sm:text-lg text-blue-100 leading-relaxed font-body max-w-2xl mx-auto">
            Tell us about your cargo, packaging requirements, and container arrangement to request a tailored quotation.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/request-quote"
              className="w-full sm:w-auto bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-4 px-8 rounded-xl text-base transition-all shadow-xl inline-flex items-center justify-center gap-2"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl text-base transition-colors border border-white/20 inline-flex items-center justify-center"
            >
              <span>Contact Operational Desk</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 9. CONTACT INFORMATION                                         */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-[#F5F5F3] rounded-2xl border border-[#E2E2E2] p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="space-y-2">
                <span className="editorial-badge bg-white text-[#B62825] border-red-200">
                  DIRECT CONTACT
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#173F70] font-heading">
                  Navi Mumbai Operations
                </h3>
                <p className="text-xs sm:text-sm text-[#666666]">
                  Reach our export desk directly for container stuffing schedules and lashing inspections.
                </p>
              </div>

              <div className="space-y-3 text-sm text-[#343434] md:border-l md:border-r border-[#E2E2E2] md:px-8">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#B62825] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm leading-relaxed">{COMPANY_DETAILS.address}</span>
                </div>
              </div>

              <div className="space-y-4">
                <a 
                  href={COMPANY_DETAILS.phoneHref}
                  className="flex items-center gap-3 text-[#173F70] hover:text-[#B62825] font-bold text-base transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#B62825]" />
                  <span>{COMPANY_DETAILS.phone}</span>
                </a>
                <a 
                  href={COMPANY_DETAILS.emailHref}
                  className="flex items-center gap-3 text-[#173F70] hover:text-[#B62825] text-sm transition-colors break-all"
                >
                  <Mail className="w-5 h-5 text-[#B62825]" />
                  <span>{COMPANY_DETAILS.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
