import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Info, 
  ShieldAlert, 
  Ruler, 
  Layers, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Camera, 
  Box, 
  Anchor 
} from 'lucide-react';
import { 
  CONTAINER_LIST, 
  BREAK_BULK_CARGO_RECORDS, 
  type ContainerGalleryImage
} from '../data/containerGuideData';
import { BrandedImage } from '../components/gallery/BrandedImage';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';
import { ScrollReveal } from '../components/common/ScrollReveal';

interface LightboxItem {
  containerId: string;
  containerName: string;
  viewType: string;
  viewLabel: string;
  url: string;
  caption: string;
  alt: string;
  isClientAsset?: boolean;
}

export const ContainerGuidePage: React.FC = () => {
  const [selectedContainerId, setSelectedContainerId] = useState<string>('40ft-high-cube');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [unitMode, setUnitMode] = useState<'metric' | 'both'>('metric');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const selectedContainer = CONTAINER_LIST.find(c => c.id === selectedContainerId) || CONTAINER_LIST[0];

  // Reset active gallery image index when container changes
  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [selectedContainerId]);

  // Construct flat list of all images for the Lightbox (Containers + Break Bulk)
  const allLightboxEntries = useMemo<LightboxItem[]>(() => {
    const list: LightboxItem[] = [];

    // 1. Container Gallery Images (4-5 per container)
    CONTAINER_LIST.forEach((c) => {
      c.galleryImages.forEach((img, idx) => {
        list.push({
          containerId: c.id,
          containerName: c.name,
          viewType: `gallery-${idx}`,
          viewLabel: img.referenceTag || `View ${idx + 1}`,
          url: img.url,
          caption: img.caption,
          alt: img.alt,
          isClientAsset: img.isAuthenticClient,
        });
      });
    });

    // 2. Break Bulk Records
    BREAK_BULK_CARGO_RECORDS.forEach((bb) => {
      list.push({
        containerId: bb.id,
        containerName: 'Break Bulk (BBC) Project Consignment',
        viewType: 'break-bulk',
        viewLabel: bb.projectTag,
        url: bb.imagePath,
        caption: `${bb.title}: ${bb.technicalDescription}`,
        alt: bb.alt,
        isClientAsset: true,
      });
    });

    return list;
  }, []);

  // Open Lightbox for a specific image URL
  const openLightboxForUrl = (url: string) => {
    const idx = allLightboxEntries.findIndex(item => item.url === url);
    if (idx !== -1) {
      setLightboxIndex(idx);
    } else {
      setLightboxIndex(0);
    }
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevLightboxImage = useCallback(() => {
    setLightboxIndex(prev => (prev - 1 + allLightboxEntries.length) % allLightboxEntries.length);
  }, [allLightboxEntries.length]);

  const nextLightboxImage = useCallback(() => {
    setLightboxIndex(prev => (prev + 1) % allLightboxEntries.length);
  }, [allLightboxEntries.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightboxImage();
      if (e.key === 'ArrowRight') nextLightboxImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, prevLightboxImage, nextLightboxImage]);

  // Active image in container showcase
  const activeGalleryImage: ContainerGalleryImage = 
    selectedContainer.galleryImages[activeGalleryIndex] || selectedContainer.galleryImages[0];

  const currentLightboxItem = allLightboxEntries[lightboxIndex] || allLightboxEntries[0];

  return (
    <div className="space-y-0 bg-[#F9FAFB]">
      {/* 1. Page Header — Dark Graphite Refined Banner */}
      <InnerPageBanner
        badge="EQUIPMENT REFERENCE"
        badgeSubtext="ISO STANDARDS • OCEAN FREIGHT SPECIFICATIONS"
        title="Container Guide: Types, Dimensions & Equipment"
        description="Comprehensive ocean container specifications for export cargo planning. Explore standard dry containers, High Cube, High Cube Heavy Duty (32.5T), Open Top, Flat Rack, Reefer, and Break Bulk (BBC) project consignments."
      />

      {/* 2. Streamlined Controls & Jump Links Bar */}
      <section className="bg-white border-b border-[#E8E8E8] sticky top-[68px] sm:top-[72px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          
          {/* Quick Section Anchor Links */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full lg:w-auto">
            <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider shrink-0 mr-1">
              Guide Navigation:
            </span>
            <a
              href="#container-showcase"
              className="py-1.5 px-3 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 bg-[#F1F5F9] text-[#1E293B] hover:bg-[#B62825] hover:text-white shrink-0"
            >
              <Box className="w-3.5 h-3.5 text-[#B62825]" />
              <span>1. Multi-Photo Showcase</span>
            </a>
            <a
              href="#break-bulk"
              className="py-1.5 px-3 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 bg-red-50 text-[#B62825] border border-red-200 hover:bg-[#B62825] hover:text-white shrink-0 font-bold shadow-xs"
            >
              <Anchor className="w-3.5 h-3.5 text-[#B62825] group-hover:text-white" />
              <span>2. Break Bulk (BBC) Gallery</span>
            </a>
            <a
              href="#container-comparison"
              className="py-1.5 px-3 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 bg-[#F1F5F9] text-[#1E293B] hover:bg-[#B62825] hover:text-white shrink-0"
            >
              <Ruler className="w-3.5 h-3.5 text-[#B62825]" />
              <span>3. Specifications Matrix</span>
            </a>
          </div>

          {/* Unit Toggle & Jump to Cards */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-lg text-xs font-mono">
              <button
                type="button"
                onClick={() => setUnitMode('metric')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  unitMode === 'metric'
                    ? 'bg-white text-[#000000] font-bold shadow-xs'
                    : 'text-[#64748B] hover:text-[#B62825]'
                }`}
              >
                Metric (m / mm)
              </button>
              <button
                type="button"
                onClick={() => setUnitMode('both')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  unitMode === 'both'
                    ? 'bg-white text-[#000000] font-bold shadow-xs'
                    : 'text-[#64748B] hover:text-[#B62825]'
                }`}
              >
                Metric &amp; Imperial (ft/in)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Container Studio / Deep-Dive Multi-Photo Showcase */}
      <section id="container-showcase" className="py-10 sm:py-14 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
          
          {/* Container Type Selector Strip */}
          <ScrollReveal direction="up">
            <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-[#E2E8F0] shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider px-3 shrink-0 hidden sm:inline">
                Select Container:
              </span>
              {CONTAINER_LIST.map((container) => {
                const isSelected = selectedContainerId === container.id;
                return (
                  <button
                    key={container.id}
                    type="button"
                    onClick={() => setSelectedContainerId(container.id)}
                    className={`py-2 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 cursor-pointer select-none shrink-0 ${
                      isSelected
                        ? 'bg-[#B62825] text-white shadow-xs font-bold ring-2 ring-[#B62825]/30'
                        : 'bg-[#F8FAFC] text-[#1E293B] hover:bg-[#F1F5F9] hover:text-[#B62825] border border-[#E2E8F0]'
                    }`}
                  >
                    <span>{container.code}</span>
                    <span className={`text-[11px] font-normal ${isSelected ? 'text-white/80' : 'text-[#64748B]'}`}>
                      ({container.category})
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={50}>
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
            
            {/* Showcase Top Bar */}
            <div className="p-6 sm:p-8 border-b border-[#E8E8E8] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-neutral-50 via-white to-neutral-50">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider">
                    {selectedContainer.category} Container Equipment
                  </span>
                  <span className="text-xs font-mono text-neutral-400">•</span>
                  <span className="text-xs font-mono text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded font-bold">
                    {selectedContainer.code}
                  </span>
                  {selectedContainer.clientFieldImage && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Camera className="w-3 h-3 text-emerald-600" />
                      <span>AUTHENTIC JNPT FIELD RECORDS</span>
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B] mt-1.5">
                  {selectedContainer.name}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="text-xs font-mono bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-2 rounded-lg text-[#52627A]">
                  Volume: <strong className="text-[#000000] font-bold">{selectedContainer.cubicCapacity.cbm}</strong>
                  {unitMode === 'both' && <span className="text-[#64748B]"> ({selectedContainer.cubicCapacity.cuft})</span>}
                </div>
                <Link
                  to={`/request-quote?container=${encodeURIComponent(selectedContainer.name)}`}
                  className="btn-primary text-xs py-2.5 px-4 whitespace-nowrap shadow-sm"
                >
                  <span>Request Quote for this Container</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>

            {/* Showcase Middle: Interactive Multi-Photo Viewer + Specifications */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Multi-Photo Viewer & Gallery (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Main Large Image Viewer */}
                <div 
                  className="relative group rounded-xl overflow-hidden border border-[#E2E8F0] bg-neutral-950 shadow-inner cursor-pointer"
                  onClick={() => openLightboxForUrl(activeGalleryImage.url)}
                  title="Click to open full-resolution viewer"
                >
                  <BrandedImage
                    src={activeGalleryImage.url}
                    alt={activeGalleryImage.alt}
                    aspectRatio="aspect-[16/11]"
                    tagSubtitle="MSK ASSET"
                    imageClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Click to Enlarge Hover Badge */}
                  <div className="absolute top-3 left-3 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="inline-flex items-center gap-1.5 bg-black/80 backdrop-blur-md text-white text-[11px] font-mono px-2.5 py-1 rounded shadow-md">
                      <Maximize2 className="w-3.5 h-3.5 text-red-400" />
                      <span>Click to enlarge (Photo {activeGalleryIndex + 1} of {selectedContainer.galleryImages.length})</span>
                    </span>
                  </div>

                  {/* Authentic Badge Overlay */}
                  <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md shadow-md backdrop-blur-md ${
                      activeGalleryImage.isAuthenticClient
                        ? 'bg-emerald-950/90 text-emerald-200 border border-emerald-500/40'
                        : 'bg-black/75 text-neutral-200 border border-white/10'
                    }`}>
                      {activeGalleryImage.isAuthenticClient ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>{activeGalleryImage.referenceTag || 'Authentic Field Record'}</span>
                        </>
                      ) : (
                        <>
                          <Box className="w-3 h-3 text-sky-400" />
                          <span>ISO Specification View</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Multi-Photo Thumbnail Strip (4-5 Photographs per container) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
                    <span>Photographs ({selectedContainer.galleryImages.length} Available):</span>
                    <span>Photo {activeGalleryIndex + 1} Selected</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {selectedContainer.galleryImages.map((img, idx) => {
                      const isSelected = activeGalleryIndex === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveGalleryIndex(idx)}
                          className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                            isSelected
                              ? 'border-[#B62825] ring-2 ring-[#B62825]/30 shadow-md scale-105 z-10'
                              : 'border-neutral-200 hover:border-neutral-400 opacity-75 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img.url}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {img.isAuthenticClient && (
                            <span 
                              className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 shadow-xs" 
                              title="Authentic Client Photograph"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Specific Descriptive Caption */}
                <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] text-xs text-[#475569] shadow-xs">
                  <div className="font-mono text-[11px] text-[#000000] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#B62825]" />
                    <span>Photo Detail &amp; Physical Specifications:</span>
                  </div>
                  <p className="leading-relaxed">
                    {activeGalleryImage.caption}
                  </p>
                </div>

                {/* Operational Disclaimer Notice */}
                <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-[11px] text-[#64748B] space-y-1">
                  <strong className="text-[#334155] block font-mono uppercase tracking-wide">
                    Manufacturer Variance &amp; CSC Plate Notice:
                  </strong>
                  <p>{selectedContainer.operationalDisclaimer}</p>
                </div>
              </div>

              {/* Right Column: Verified ISO Dimensions & Clearances (7 cols) */}
              <div 
                key={`specs-${selectedContainer.id}`}
                className="lg:col-span-7 space-y-6 animate-fade-in-up motion-reduce:animate-none"
              >
                {/* 1. External Dimensions */}
                <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#000000]">
                      <Ruler className="w-4 h-4 text-[#B62825]" />
                      <span>External Dimensions (Outside Envelope)</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">
                      ISO Standard Outer Profile
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-3.5 rounded-lg border border-[#E2E8F0] shadow-xs">
                      <span className="text-[#64748B] block font-medium">External Length:</span>
                      <strong className="text-sm font-bold text-[#1E293B] block mt-0.5">
                        {selectedContainer.externalDimensions.length.metricMeters}
                      </strong>
                      <span className="text-[11px] font-mono text-[#94A3B8]">
                        {selectedContainer.externalDimensions.length.metricMm}
                        {unitMode === 'both' && ` • ${selectedContainer.externalDimensions.length.imperial}`}
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-lg border border-[#E2E8F0] shadow-xs">
                      <span className="text-[#64748B] block font-medium">External Width:</span>
                      <strong className="text-sm font-bold text-[#1E293B] block mt-0.5">
                        {selectedContainer.externalDimensions.width.metricMeters}
                      </strong>
                      <span className="text-[11px] font-mono text-[#94A3B8]">
                        {selectedContainer.externalDimensions.width.metricMm}
                        {unitMode === 'both' && ` • ${selectedContainer.externalDimensions.width.imperial}`}
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-lg border border-[#E2E8F0] shadow-xs">
                      <span className="text-[#64748B] block font-medium">External Height:</span>
                      <strong className="text-sm font-bold text-[#1E293B] block mt-0.5">
                        {selectedContainer.externalDimensions.height.metricMeters}
                      </strong>
                      <span className="text-[11px] font-mono text-[#94A3B8]">
                        {selectedContainer.externalDimensions.height.metricMm}
                        {unitMode === 'both' && ` • ${selectedContainer.externalDimensions.height.imperial}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Internal Usable Dimensions */}
                <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#047857]">
                      <Layers className="w-4 h-4 text-[#10B981]" />
                      <span>Internal Usable Dimensions (Cargo Space)</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700 font-semibold">
                      Net Usable Envelope
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-3.5 rounded-lg border border-[#E2E8F0] shadow-xs">
                      <span className="text-[#64748B] block font-medium">Internal Length:</span>
                      <strong className="text-sm font-bold text-[#1E293B] block mt-0.5">
                        {selectedContainer.internalDimensions.length.metricMeters}
                      </strong>
                      <span className="text-[11px] font-mono text-[#94A3B8]">
                        {selectedContainer.internalDimensions.length.metricMm}
                        {unitMode === 'both' && ` • ${selectedContainer.internalDimensions.length.imperial}`}
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-lg border border-[#E2E8F0] shadow-xs">
                      <span className="text-[#64748B] block font-medium">Internal Width:</span>
                      <strong className="text-sm font-bold text-[#1E293B] block mt-0.5">
                        {selectedContainer.internalDimensions.width.metricMeters}
                      </strong>
                      <span className="text-[11px] font-mono text-[#94A3B8]">
                        {selectedContainer.internalDimensions.width.metricMm}
                        {unitMode === 'both' && ` • ${selectedContainer.internalDimensions.width.imperial}`}
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-lg border border-[#E2E8F0] shadow-xs">
                      <span className="text-[#64748B] block font-medium">Internal Height:</span>
                      <strong className="text-sm font-bold text-[#1E293B] block mt-0.5">
                        {selectedContainer.internalDimensions.height.metricMeters}
                      </strong>
                      <span className="text-[11px] font-mono text-[#94A3B8]">
                        {selectedContainer.internalDimensions.height.metricMm}
                        {unitMode === 'both' && ` • ${selectedContainer.internalDimensions.height.imperial}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Door Opening & Payload Ratings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] space-y-2 shadow-xs">
                    <strong className="text-[#000000] font-mono uppercase block text-xs">
                      Door / Top Clearances
                    </strong>
                    <div className="space-y-1.5 text-[#475569]">
                      <div>Door Width: <strong>{selectedContainer.doorOpening.width.metricMeters}</strong> ({selectedContainer.doorOpening.width.metricMm})</div>
                      <div>Door Height: <strong>{selectedContainer.doorOpening.height.metricMeters}</strong> ({selectedContainer.doorOpening.height.metricMm})</div>
                      {selectedContainer.topOpening && (
                        <div className="pt-1.5 text-emerald-800 border-t border-neutral-100 mt-1 font-medium">
                          Roof Open: <strong>{selectedContainer.topOpening.length.metricMeters} × {selectedContainer.topOpening.width.metricMeters}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] space-y-2 shadow-xs">
                    <strong className="text-[#000000] font-mono uppercase block text-xs">
                      Weights &amp; Payload Capacity
                    </strong>
                    <div className="space-y-1.5 text-[#475569]">
                      <div>Max Gross: <strong>{selectedContainer.maxGrossWeight.kg}</strong></div>
                      <div>Tare Weight: <strong>{selectedContainer.tareWeight.kg}</strong></div>
                      <div>Max Payload: <strong>{selectedContainer.maxPayload.kg}</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Advice Section */}
            <div className="p-6 sm:p-8 bg-[#F8FAFC] border-t border-[#E8E8E8] grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#1E293B] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#B62825]" />
                  <span>Recommended Cargo Applications</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {selectedContainer.recommendedUse}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#1E293B] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#B62825]" />
                  <span>MSK Stuffing &amp; Lashing Engineering Guidance</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {selectedContainer.stuffingAdvice}
                </p>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BREAK BULK CARGO (BBC) & CYLINDRICAL PROJECT SECTION (Phase 1 Part D)       */}
      {/* ========================================================================= */}
      <section id="break-bulk" className="py-14 sm:py-20 bg-[#0F0F12] text-white border-t border-b border-white/10 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          {/* Section Header */}
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B62825]/20 border border-[#B62825]/40 text-[#B62825] text-xs font-mono font-bold tracking-wider uppercase">
                <Anchor className="w-3.5 h-3.5 text-[#B62825]" />
                <span>BREAK BULK CARGO (BBC) &amp; CYLINDRICAL PROJECT CARGO</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
                Break Bulk <span className="text-[#B62825]">Consignments</span>
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Authentic client field documentation of non-containerized heavy break bulk equipment. Showcasing the complete operational handling cycle of an over-dimensional cylindrical pressure vessel: multi-axle trailer haulage, telescopic mobile crane hoisting, night vessel hold cellular loading, and certified high-tensile cross-webbing ratchet lashing.
              </p>
            </div>

            <Link
              to="/request-quote?enquiry=break-bulk"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#B62825] hover:bg-[#9E2220] text-white text-xs font-mono font-bold transition-all shadow-md self-start md:self-auto shrink-0 hover:scale-105 active:scale-95"
            >
              <span>Enquire for Break Bulk Cargo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          {/* Authentic Client Break Bulk Records Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BREAK_BULK_CARGO_RECORDS.map((rec, index) => (
              <ScrollReveal
                key={rec.id}
                direction={index === 0 ? 'up' : index % 2 === 1 ? 'left' : 'right'}
                delay={index * 80}
                className={`h-full ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <div
                  onClick={() => openLightboxForUrl(rec.imagePath)}
                  className="group cursor-pointer rounded-2xl bg-[#16161A] border border-white/10 hover:border-[#B62825] overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between h-full hover-lift"
                >
                  {/* Image Box */}
                  <div className={`relative ${index === 0 ? 'aspect-[16/9]' : 'aspect-[16/10]'} overflow-hidden bg-black`}>
                    <img
                      src={rec.imagePath}
                      alt={rec.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16161A] via-transparent to-black/30 pointer-events-none" />
                    
                    {/* Drive Asset Stamp */}
                    <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#B62825] text-white uppercase shadow-md">
                        AUTHENTIC CLIENT PHOTO
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-black/80 text-neutral-300 border border-white/20 uppercase backdrop-blur-sm">
                        {rec.driveFilename}
                      </span>
                      {index === 0 && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-blue-600/90 text-white uppercase shadow-md">
                          FEATURED: BLUE WRAPPED CYLINDRICAL CARGO
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="p-2 rounded-lg bg-black/80 text-white flex items-center gap-1.5 text-xs font-mono backdrop-blur-sm">
                        <Maximize2 className="w-3.5 h-3.5 text-red-400" />
                        <span>Zoom</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#B62825] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{rec.projectTag}</span>
                    </div>
                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-red-400 transition-colors">
                      {rec.title}
                    </h3>
                    
                    {/* Explicit Client Verification Caption */}
                    <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-800/30 text-blue-200 text-xs font-mono leading-relaxed">
                      <span className="font-bold text-blue-300 uppercase tracking-wide mr-1.5">CAPTION:</span>
                      {rec.caption}
                    </div>

                    <p className="text-xs sm:text-sm text-[#AEB6C2] leading-relaxed">
                      {rec.technicalDescription}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Break Bulk Engineering Capabilities Notice */}
          <ScrollReveal direction="up" delay={100}>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#94A3B8]">
              <div className="space-y-1">
                <strong className="text-white block font-mono uppercase text-xs">
                  Zero AI Hallucination Guarantee:
                </strong>
                <p className="leading-relaxed">
                  All break bulk photographs displayed above are 100% genuine operational records executed by MSK Logistics at Nhava Sheva (JNPT) and Mundra maritime gateways. We do not use simulated or stock cargo images for client projects.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 font-mono text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Port Consignments</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 4. INTERACTIVE CONTAINER COMPARISON MATRIX (All 7 Container Types) */}
      <section id="container-comparison" className="py-14 sm:py-18 bg-[#F8FAFC] border-t border-[#E8E8E8] scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="editorial-badge bg-black text-white border-white/20">
              TECHNICAL COMPARISON MATRIX
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#1E293B]">
              Compare Shipping Container Specifications
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
              Side-by-side comparison across all 7 container types. Verified ISO envelope measurements, internal usable volume, and precise distinctions between Maximum Gross Weight, Tare Weight, and Net Payload Capacity.
            </p>
          </div>

          {/* Responsive Comparison Table */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#000000] text-white font-mono uppercase tracking-wider text-[11px] border-b border-white/10">
                    <th className="py-4 px-4 sm:px-5 font-bold">Container Type</th>
                    <th className="py-4 px-3 sm:px-4 font-bold">Code</th>
                    <th className="py-4 px-3 sm:px-4 font-bold">Internal Dimensions (L × W × H)</th>
                    <th className="py-4 px-3 sm:px-4 font-bold">Volume</th>
                    <th className="py-4 px-3 sm:px-4 font-bold text-amber-300">Max Gross</th>
                    <th className="py-4 px-3 sm:px-4 font-bold text-neutral-300">Tare Weight</th>
                    <th className="py-4 px-3 sm:px-4 font-bold text-emerald-400">Net Payload</th>
                    <th className="py-4 px-4 sm:px-5 text-right font-bold">Enquire</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                  {CONTAINER_LIST.map((c, i) => (
                    <tr 
                      key={c.id} 
                      onClick={() => {
                        setSelectedContainerId(c.id);
                        const el = document.getElementById('container-showcase');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`transition-colors cursor-pointer hover:bg-red-50/30 ${
                        selectedContainerId === c.id ? 'bg-amber-50/60 font-medium' : i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'
                      }`}
                      title="Click row to view photographs and details in Multi-Photo Showcase"
                    >
                      <td className="py-3.5 px-4 sm:px-5">
                        <div className="font-bold text-[#1E293B]">{c.name}</div>
                        <div className="text-[11px] text-[#64748B] font-mono">{c.category}</div>
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-mono font-semibold text-[#B62825]">
                        {c.code}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-mono text-xs">
                        {c.internalDimensions.length.metricMeters} × {c.internalDimensions.width.metricMeters} × {c.internalDimensions.height.metricMeters}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-mono font-bold text-[#000000]">
                        {c.cubicCapacity.cbm}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-mono font-bold text-[#D97706]">
                        {c.maxGrossWeight.kg}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-mono text-[#64748B]">
                        {c.tareWeight.kg}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-mono font-bold text-emerald-700">
                        {c.maxPayload.kg}
                      </td>
                      <td className="py-3.5 px-4 sm:px-5 text-right">
                        <Link
                          to={`/request-quote?container=${encodeURIComponent(c.name)}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#000000] hover:bg-[#B62825] text-white text-xs font-mono font-bold transition-all shadow-xs"
                        >
                          <span>Quote</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Weight Definitions Legend */}
            <div className="p-4 sm:p-5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
                  <span><strong>Max Gross Weight:</strong> Total permissible loaded weight (Cargo + Container)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                  <span><strong>Tare Weight:</strong> Empty unladen container mass</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span><strong>Net Payload:</strong> Maximum allowable cargo mass</span>
                </span>
              </div>
              <span className="text-[11px] text-neutral-500">ISO 668 &amp; CSC Certified Ratings</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Accessible Full-Resolution Lightbox Modal */}
      {lightboxOpen && currentLightboxItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Container Image Viewer"
        >
          {/* Modal Content Box */}
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between py-2 px-1 text-white text-xs font-mono">
              <div className="flex items-center gap-2 truncate pr-4">
                <span className="font-bold text-neutral-200">
                  {currentLightboxItem.containerName}
                </span>
                <span className="text-neutral-500">•</span>
                <span className="text-red-400 font-semibold">
                  {currentLightboxItem.viewLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5"
                aria-label="Close image viewer"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] font-mono">ESC</span>
              </button>
            </div>

            {/* Main Lightbox Image with MSK Corner Watermark */}
            <div className="relative max-h-[72vh] w-auto overflow-hidden rounded-xl bg-black border border-white/10 shadow-2xl">
              <img
                src={currentLightboxItem.url}
                alt={currentLightboxItem.alt}
                loading="lazy"
                decoding="async"
                className="max-h-[72vh] max-w-full w-auto object-contain"
              />
              {/* MSK Corner Badge Overlay */}
              <div className="absolute bottom-4 right-4 z-20 pointer-events-none select-none">
                <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded shadow-lg border border-neutral-300">
                  <img
                    src="/images/logo/msk-logistics-logo.png"
                    alt="MSK Logistics"
                    className="h-5 w-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-black pl-1.5 border-l border-neutral-300">
                    CONTAINER GUIDE
                  </span>
                </div>
              </div>
            </div>

            {/* Left/Right Navigation Arrows */}
            <button
              type="button"
              onClick={prevLightboxImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur border border-white/20 transition-all shadow-lg"
              aria-label="Previous container view"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={nextLightboxImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur border border-white/20 transition-all shadow-lg"
              aria-label="Next container view"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom Caption & Pagination Bar */}
            <div className="w-full text-center pt-3 space-y-1 text-xs">
              <p className="text-neutral-300 max-w-2xl mx-auto line-clamp-2">
                {currentLightboxItem.caption}
              </p>
              <div className="text-neutral-500 font-mono text-[11px] flex items-center justify-center gap-3">
                <span>{lightboxIndex + 1} of {allLightboxEntries.length}</span>
                <span>•</span>
                <span>Press Left/Right Arrow Keys to Navigate</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
