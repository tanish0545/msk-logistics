import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  AlertCircle,
  CheckCircle2,
  Box,
  Layers,
  Scale,
  Clock,
  ShieldCheck,
  Container,
  PackageCheck
} from 'lucide-react';
import {
  SHIPMENT_GALLERY,
  SHIPMENT_CATEGORIES,
  type ShipmentCategory,
  type ShipmentItem
} from '../data/shipmentGalleryData';
import { EXPORT_SOLUTIONS } from '../data/company';
import { BrandedImage } from '../components/common/BrandedImage';

export const ImportExportPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ShipmentCategory | 'all'>('all');
  const [lightboxItem, setLightboxItem] = useState<ShipmentItem | null>(null);

  const opt1 = EXPORT_SOLUTIONS.option01;
  const opt2 = EXPORT_SOLUTIONS.option02;

  // Filter gallery items
  const filteredGallery = activeCategory === 'all'
    ? SHIPMENT_GALLERY
    : SHIPMENT_GALLERY.filter(item => item.category === activeCategory);

  // Lightbox navigation
  const openLightbox = (item: ShipmentItem) => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!lightboxItem) return;
    const currentIndex = filteredGallery.findIndex(i => i.id === lightboxItem.id);
    if (currentIndex === -1) return;

    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % filteredGallery.length;
      setLightboxItem(filteredGallery[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + filteredGallery.length) % filteredGallery.length;
      setLightboxItem(filteredGallery[prevIndex]);
    }
  };

  return (
    <div className="space-y-0 bg-white">
      {/* ------------------------------------------------------------- */}
      {/* 1. PAGE HEADING & INTRODUCTION                                */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-[#173F70] text-white py-14 sm:py-16 border-b border-[#0F2D52] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#173F70] via-[#1B4B85] to-[#173F70] opacity-90 pointer-events-none" 
          aria-hidden="true" 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-5 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="editorial-badge bg-white/10 text-white border-white/20">
              INDUSTRIAL EXPORT OPERATIONS
            </span>
            <span className="text-xs font-mono text-blue-200 tracking-wider">
              PORT OF NHAVA SHEVA • JNPT GATEWAY
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading text-white tracking-tight">
            Import & Export Operations
          </h1>

          <p className="text-blue-100 text-base sm:text-lg max-w-3xl font-body leading-relaxed">
            Professional export packaging, methodical container stuffing, and maritime cargo lashing engineered for sea-freight consignments. Review our service arrangements, compare shipment loading concepts, and explore verified shipment records.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. SECTION A — TWO MSK EXPORT-PACKING SERVICE OPTIONS          */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-[#F5F5F3] border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B62825]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B62825]">
                SECTION A • OPERATIONAL FRAMEWORK
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] font-heading tracking-tight">
              Export Packing Solutions Designed Around Your Needs
            </h2>
            <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
              Choose the arrangement that suits your cargo and container availability. MSK Logistics performs the agreed export packaging, container stuffing, and cargo lashing work.
            </p>
          </div>

          {/* Two Large Service Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Option 01: Client-Arranged Container & Cargo */}
            <div className="bg-white rounded-2xl border-2 border-[#173F70] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Visual Header */}
                <div className="relative">
                  <BrandedImage
                    src={opt1.image}
                    alt={opt1.title}
                    aspectRatio="aspect-[16/9]"
                    imageClassName="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="editorial-badge bg-[#173F70] text-white border-white/20 shadow-md">
                      {opt1.badge}
                    </span>
                  </div>
                </div>

                <div className="p-7 sm:p-9 space-y-6">
                  <div>
                    <div className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider mb-1">
                      OPTION 01
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#173F70] font-heading leading-tight">
                      {opt1.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base font-semibold text-[#343434]">
                      {opt1.subheading}
                    </p>
                    <p className="mt-3 text-sm text-[#666666] leading-relaxed">
                      {opt1.summary}
                    </p>
                  </div>

                  {/* Scope & Responsibilities Breakdown */}
                  <div className="space-y-3 bg-[#F5F5F3] p-5 rounded-xl border border-[#E2E2E2] text-xs sm:text-[13px]">
                    <div className="font-mono font-bold uppercase text-[#173F70] text-[11px] tracking-wider mb-2">
                      Operational Responsibilities & Scope:
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#173F70] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#343434]">Cargo / Products:</strong>{' '}
                        <span className="text-[#666666]">{opt1.customerCargo}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#173F70] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#343434]">Container:</strong>{' '}
                        <span className="text-[#666666]">{opt1.containerStatus}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#B62825]">Export Packaging:</strong>{' '}
                        <span className="text-[#343434]">{opt1.mskPackaging}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#B62825]">Container Stuffing:</strong>{' '}
                        <span className="text-[#343434]">{opt1.mskStuffing}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#B62825]">Cargo Lashing & Securing:</strong>{' '}
                        <span className="text-[#343434]">{opt1.mskLashing}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E2E2E2] flex items-center justify-between text-[11px] font-mono text-[#666666]">
                      <span>Commercial Basis:</span>
                      <strong className="text-[#173F70]">{opt1.pricingNote}</strong>
                    </div>
                  </div>

                  {/* Critical Policy Notice */}
                  <div className="flex items-start gap-2.5 text-xs text-[#666666] bg-amber-50/70 p-3.5 rounded-lg border border-amber-200">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Critical Policy:</strong> {opt1.criticalNotice}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-7 sm:p-9 pt-0">
                <Link
                  to={`/request-quote?solution=${opt1.id}`}
                  className="w-full bg-[#173F70] hover:bg-[#0F2D52] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md inline-flex items-center justify-center gap-2 group-hover:bg-[#B62825]"
                >
                  <span>Select Option 01 & Request Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Option 02: Client Cargo, Container to Be Arranged */}
            <div className="bg-white rounded-2xl border-2 border-neutral-300 hover:border-[#B62825] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                {/* Visual Header */}
                <div className="relative">
                  <BrandedImage
                    src={opt2.image}
                    alt={opt2.title}
                    aspectRatio="aspect-[16/9]"
                    imageClassName="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="editorial-badge bg-[#343434] text-white border-white/20 shadow-md">
                      {opt2.badge}
                    </span>
                  </div>
                </div>

                <div className="p-7 sm:p-9 space-y-6">
                  <div>
                    <div className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider mb-1">
                      OPTION 02
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#343434] font-heading leading-tight">
                      {opt2.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base font-semibold text-[#173F70]">
                      {opt2.subheading}
                    </p>
                    <p className="mt-3 text-sm text-[#666666] leading-relaxed">
                      {opt2.summary}
                    </p>
                  </div>

                  {/* Scope & Responsibilities Breakdown */}
                  <div className="space-y-3 bg-[#F5F5F3] p-5 rounded-xl border border-[#E2E2E2] text-xs sm:text-[13px]">
                    <div className="font-mono font-bold uppercase text-[#343434] text-[11px] tracking-wider mb-2">
                      Operational Responsibilities & Scope:
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#343434] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#343434]">Cargo / Products:</strong>{' '}
                        <span className="text-[#666666]">{opt2.customerCargo}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#343434]">Container:</strong>{' '}
                        <span className="text-[#666666]">{opt2.containerStatus}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-neutral-700">Container Sourcing:</strong>{' '}
                        <span className="text-[#666666]">{opt2.containerSourcing}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#B62825]">Export Packaging:</strong>{' '}
                        <span className="text-[#343434]">{opt2.mskPackaging}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#B62825]">Container Stuffing:</strong>{' '}
                        <span className="text-[#343434]">{opt2.mskStuffing}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#B62825]">Cargo Lashing & Securing:</strong>{' '}
                        <span className="text-[#343434]">{opt2.mskLashing}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E2E2E2] flex items-center justify-between text-[11px] font-mono text-[#666666]">
                      <span>Commercial Basis:</span>
                      <strong className="text-[#343434]">{opt2.pricingNote}</strong>
                    </div>
                  </div>

                  {/* Critical Policy Notice */}
                  <div className="flex items-start gap-2.5 text-xs text-[#666666] bg-amber-50/70 p-3.5 rounded-lg border border-amber-200">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Critical Policy:</strong> {opt2.criticalNotice}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-7 sm:p-9 pt-0">
                <Link
                  to={`/request-quote?solution=${opt2.id}`}
                  className="w-full bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md inline-flex items-center justify-center gap-2"
                >
                  <span>Select Option 02 & Request Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. SECTION B — LCL VS FCL SHIPPING OPTIONS                     */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#173F70]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#173F70]">
                SECTION B • SHIPPING CONCEPTS EXPLAINED
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] font-heading tracking-tight">
              LCL vs FCL — Understand Your Shipping Options
            </h2>
            <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
              Before packaging and stuffing begin, understanding whether your consignment moves as consolidated cargo or a dedicated container helps determine packaging design and handling parameters.
            </p>
          </div>

          {/* Two Spacious Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* LCL Card */}
            <div className="bg-[#F8F9FA] rounded-2xl border border-[#E2E2E2] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Visual Header */}
                <div className="relative">
                  <BrandedImage
                    src="/images/import-export/lcl-consolidation.webp"
                    alt="LCL Consolidated Export Cargo Staged in Freight Station"
                    aspectRatio="aspect-[16/9]"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="editorial-badge bg-[#343434] text-white border-white/20">
                      SHARED CONTAINER SPACE
                    </span>
                  </div>
                </div>

                <div className="p-7 sm:p-9 space-y-6">
                  <div>
                    <div className="text-xs font-mono font-bold text-[#173F70] uppercase tracking-wider mb-1">
                      CONSOLIDATION FREIGHT
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#343434] font-heading">
                      LCL — Less than Container Load
                    </h3>
                    <p className="mt-3 text-sm sm:text-[15px] text-[#666666] leading-relaxed">
                      Cargo shares container space with shipments belonging to other exporters. Ideal when total cargo volume does not justify the cost of reserving an entire 20ft or 40ft container.
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2 text-xs sm:text-[13px] text-[#475569]">
                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#E2E2E2]">
                      <Layers className="w-4 h-4 text-[#173F70] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#343434] block">Shared Space:</strong>
                        <span>Goods are consolidated at a Container Freight Station (CFS) alongside cargo from other shippers.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#E2E2E2]">
                      <Box className="w-4 h-4 text-[#173F70] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#343434]">Typical Suitability:</strong>
                        <span>Consignments between 1 to 15 CBM, boxed machinery spares, palletized drums, and modular cartons.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#E2E2E2]">
                      <Scale className="w-4 h-4 text-[#173F70] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#343434]">Common Pricing Basis:</strong>
                        <span>Billed on volume or weight basis (Weight or Measurement / W/M per cubic meter or metric ton).</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#E2E2E2]">
                      <Clock className="w-4 h-4 text-[#173F70] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#343434]">Handling Considerations:</strong>
                        <span>Requires robust export crating and shrink wrapping because cargo is handled multiple times during consolidation and deconsolidation.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-7 sm:p-9 pt-0">
                <div className="p-3.5 bg-blue-50/70 rounded-lg text-xs text-[#173F70] border border-blue-200">
                  <strong>MSK Export Packaging Focus:</strong> We build ISPM-15 wooden boxes and heavy-duty shrink-wrapped skids tailored to endure shared LCL handling.
                </div>
              </div>
            </div>

            {/* FCL Card */}
            <div className="bg-[#F8F9FA] rounded-2xl border-2 border-[#173F70]/30 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Visual Header */}
                <div className="relative">
                  <BrandedImage
                    src="/images/import-export/fcl-dedicated-shipping.webp"
                    alt="FCL Dedicated Full Container Shipping at Terminal"
                    aspectRatio="aspect-[16/9]"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="editorial-badge bg-[#173F70] text-white border-white/20">
                      DEDICATED FULL CONTAINER
                    </span>
                  </div>
                </div>

                <div className="p-7 sm:p-9 space-y-6">
                  <div>
                    <div className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider mb-1">
                      DEDICATED CONTAINER LOAD
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#173F70] font-heading">
                      FCL — Full Container Load
                    </h3>
                    <p className="mt-3 text-sm sm:text-[15px] text-[#666666] leading-relaxed">
                      An entire container is allocated exclusively to one shipper’s consignment. The container remains sealed from initial stuffing at origin until delivery at the consignee’s warehouse.
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2 text-xs sm:text-[13px] text-[#475569]">
                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#E2E2E2]">
                      <Container className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#343434] block">Dedicated Space:</strong>
                        <span>Sole occupancy of standard 20ft, 40ft, 40ft High Cube, Open Top, or Flat Rack equipment.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#E2E2E2]">
                      <PackageCheck className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#343434]">Typical Suitability:</strong>
                        <span>High-volume shipments, heavy plant machinery, sensitive electronics, or oversized out-of-gauge project equipment.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#E2E2E2]">
                      <Scale className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#343434]">Common Pricing Basis:</strong>
                        <span>Flat ocean freight rate per container regardless of whether it is fully packed or partially filled.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#E2E2E2]">
                      <ShieldCheck className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#343434]">Handling Differences:</strong>
                        <span>Direct stuffing at client facility or CFS, sealed with high-security bolt seal, zero intermediate cross-handling.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-7 sm:p-9 pt-0">
                <div className="p-3.5 bg-red-50/70 rounded-lg text-xs text-[#B62825] border border-red-200">
                  <strong>MSK Stuffing & Lashing Focus:</strong> We calculate load distribution, sequence heavy units, and install certified cross-lashing webbing and chocks.
                </div>
              </div>
            </div>
          </div>

          {/* Operational Boundaries Notice */}
          <div className="bg-[#F5F5F3] p-4 sm:p-5 rounded-xl border border-[#E2E2E2] flex items-start gap-3 text-xs sm:text-sm text-[#666666]">
            <AlertCircle className="w-5 h-5 text-[#173F70] flex-shrink-0 mt-0.5" />
            <div>
              <strong>Note on Ocean Freight & Forwarding:</strong> MSK Logistics focuses strictly on export packaging, container stuffing, and certified cargo securing. We do not provide freight-forwarding or booking agent services unless formally confirmed. Ocean freight rates and shipping line bookings must be coordinated directly with your chosen carrier or freight forwarder.
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. SECTION C — SHIPMENT GALLERY                                */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-[#FAFAFA] border-b border-[#E2E2E2]" id="shipment-gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B62825]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B62825]">
                SECTION C • FIELD GALLERY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F70] font-heading tracking-tight">
              Shipment Gallery
            </h2>
            <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
              Explore authentic shipment photographs across specialized export methods: Flat Rack platforms, Breakbulk haulage, and Open Top top-loading containers.
            </p>
          </div>

          {/* Category Filter Tabs (Sticky bar aligned below navbar) */}
          <div className="sticky top-[68px] sm:top-[72px] z-30 bg-white/95 backdrop-blur-md border border-[#E2E2E2] rounded-2xl p-2.5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
                {SHIPMENT_CATEGORIES.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'bg-[#173F70] text-white shadow-md'
                        : 'bg-[#F5F5F3] text-[#52627A] hover:bg-[#E8E8E8] hover:text-[#173F70]'
                    }`}
                  >
                    {category.label}
                    {category.id !== 'all' && (
                      <span className="ml-1.5 text-xs opacity-70 font-mono">
                        ({SHIPMENT_GALLERY.filter(item => item.category === category.id).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#52627A]">
                <span>Archive:</span>
                <strong className="text-[#173F70]">
                  {filteredGallery.length} {filteredGallery.length === 1 ? 'Record' : 'Records'}
                </strong>
              </div>
            </div>
          </div>

          {/* Shipment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map(item => (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-[#E2E2E2] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container — ONLY the MSK Logo watermark in corner, NO text overlays on image */}
                  <div
                    className="relative cursor-pointer overflow-hidden bg-neutral-900"
                    onClick={() => openLightbox(item)}
                  >
                    <BrandedImage
                      src={item.image}
                      alt={item.altText}
                      aspectRatio="aspect-[16/10]"
                      imageClassName="group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Subtle Hover Lens Overlay */}
                    <div className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 text-[#173F70] text-xs font-bold shadow-lg">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge & Specifications</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body — Category label and details placed BELOW the image */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B62825] block mb-1">
                        {item.categoryLabel}
                      </span>
                      <h3 className="font-bold text-lg text-[#173F70] group-hover:text-[#B62825] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#666666] leading-relaxed line-clamp-2">
                        {item.shortDescription}
                      </p>
                    </div>

                    {/* Lashing Gear Summary */}
                    <div className="pt-3 border-t border-[#F1F5F9] space-y-2 text-xs">
                      <div className="text-[11px] font-mono text-[#94A3B8] uppercase">
                        Securing Hardware Applied:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.lashingGearUsed.slice(0, 2).map((gear, idx) => (
                          <span
                            key={idx}
                            className="bg-[#F5F5F3] text-[#475569] px-2.5 py-1 rounded-md text-[11px] font-medium"
                          >
                            {gear}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions: View Details & Request Quote */}
                <div className="p-6 sm:p-7 pt-0 border-t border-[#F1F5F9] mt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => openLightbox(item)}
                    className="text-xs font-bold text-[#173F70] hover:text-[#B62825] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    to={`/request-quote?category=${item.category}`}
                    className="text-xs font-bold text-[#B62825] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Quote for this Shipment</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. SECTION D — REQUEST A QUOTE CTA                             */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-24 bg-[#173F70] text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#173F70] via-[#102C50] to-[#0D2340] opacity-95 pointer-events-none" 
          aria-hidden="true" 
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6 relative z-10">
          <span className="editorial-badge bg-white/10 text-white border-white/20">
            EXPORT PACKAGING & CONTAINER STUFFING
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight">
            Planning Your Next Export Shipment?
          </h2>

          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Share your cargo requirements and the container arrangement to request a quotation. Our operational specialists evaluate cargo drawings, center of gravity, and lashing plans.
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
              to="/container-guide"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl text-base transition-colors border border-white/20 inline-flex items-center justify-center gap-2"
            >
              <span>Inspect Container Guide</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* ACCESSIBLE LIGHTBOX MODAL DIALOG                              */}
      {/* ------------------------------------------------------------- */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-[#0F172A]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-neutral-300 relative my-auto">
            {/* Modal Header Bar */}
            <div className="bg-[#173F70] text-white px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-[#B62825] text-white text-[11px] font-mono uppercase px-2.5 py-0.5 rounded font-bold">
                  {lightboxItem.categoryLabel}
                </span>
                <span className="text-sm font-semibold text-neutral-200 hidden sm:inline">
                  {lightboxItem.title}
                </span>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image Area with Corner Branded Tag */}
            <div className="relative bg-neutral-900 flex items-center justify-center max-h-[55vh] overflow-hidden">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.altText}
                className="w-full h-auto max-h-[55vh] object-contain"
              />

              {/* Watermark Tag (Only Logo) */}
              <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                <div className="flex items-center bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-md shadow-lg border border-neutral-200">
                  <img
                    src="/images/logo/msk-logistics-logo.png"
                    alt="MSK Logistics"
                    className="h-5 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('prev');
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all focus:outline-none"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('next');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all focus:outline-none"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Technical Specifications Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[40vh] overflow-y-auto">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#173F70]">
                  {lightboxItem.title}
                </h3>
                <p className="text-sm text-[#64748B] mt-2 leading-relaxed">
                  {lightboxItem.detailedDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#E2E2E2] space-y-1.5">
                  <strong className="text-[#173F70] font-mono uppercase block">
                    Cargo Envelope & Dimensions
                  </strong>
                  <p className="text-[#475569]">{lightboxItem.dimensionsNote}</p>
                </div>

                <div className="p-4 bg-[#F8F9FA] rounded-xl border border-[#E2E2E2] space-y-1.5">
                  <strong className="text-[#173F70] font-mono uppercase block">
                    Operational Scope Included
                  </strong>
                  <p className="text-[#475569]">{lightboxItem.operationalScope}</p>
                </div>
              </div>

              {/* Lashing Gear Checklist */}
              <div className="space-y-2">
                <strong className="text-xs font-mono uppercase text-[#94A3B8] block">
                  Securing Equipment Applied:
                </strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#334155]">
                  {lightboxItem.lashingGearUsed.map((gear, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                      <span>{gear}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Action CTA */}
              <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#64748B]">
                  Need similar securing for your upcoming shipment?
                </div>
                <Link
                  to={`/request-quote?category=${lightboxItem.category}`}
                  onClick={closeLightbox}
                  className="w-full sm:w-auto bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-2.5 px-6 rounded-xl text-sm inline-flex items-center justify-center gap-2 transition-all shadow"
                >
                  <span>Request Quote for {lightboxItem.categoryLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
