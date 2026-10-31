import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Info, 
  ShieldAlert, 
  HelpCircle, 
  Ruler,
  Layers,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Camera,
  Box,
  Compass,
  ChevronDown
} from 'lucide-react';
import { CONTAINER_LIST, type ContainerDetail } from '../data/containerGuideData';
import { BrandedImage } from '../components/gallery/BrandedImage';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';

interface LightboxItem {
  containerId: string;
  containerName: string;
  viewType: 'exterior' | 'interior' | 'field';
  viewLabel: string;
  url: string;
  caption: string;
  alt: string;
  isClientAsset?: boolean;
}

export const ContainerGuidePage: React.FC = () => {
  const [selectedContainerId, setSelectedContainerId] = useState<string>('40ft-high-cube');
  const [showcaseViewMode, setShowcaseViewMode] = useState<'exterior' | 'interior' | 'field'>('exterior');
  const [unitMode, setUnitMode] = useState<'metric' | 'both'>('metric');
  
  // Per-card exterior/interior/field toggle state for the dedicated cards section
  const [cardViewModes, setCardViewModes] = useState<Record<string, 'exterior' | 'interior' | 'field'>>({
    '20ft-standard': 'exterior',
    '40ft-standard': 'exterior',
    '40ft-high-cube': 'exterior',
    'open-top': 'exterior',
    'flat-rack': 'exterior',
    'reefer-container': 'exterior',
  });

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const selectedContainer = CONTAINER_LIST.find(c => c.id === selectedContainerId) || CONTAINER_LIST[0];

  // Reset showcase view mode when selected container changes (if field was active on a container without field photo)
  useEffect(() => {
    if (showcaseViewMode === 'field' && !selectedContainer.clientFieldImage) {
      setShowcaseViewMode('exterior');
    }
  }, [selectedContainerId, showcaseViewMode, selectedContainer.clientFieldImage]);

  // Construct flat list of all images for the Lightbox
  const allLightboxEntries = useMemo<LightboxItem[]>(() => {
    const list: LightboxItem[] = [];
    CONTAINER_LIST.forEach((c) => {
      // 1. Exterior
      list.push({
        containerId: c.id,
        containerName: c.name,
        viewType: 'exterior',
        viewLabel: 'Exterior Structural Profile',
        url: c.exteriorImage,
        caption: c.exteriorCaption,
        alt: c.exteriorAlt,
        isClientAsset: false,
      });
      // 2. Interior
      list.push({
        containerId: c.id,
        containerName: c.name,
        viewType: 'interior',
        viewLabel: 'Interior Cargo Hold',
        url: c.interiorImage,
        caption: c.interiorCaption,
        alt: c.interiorAlt,
        isClientAsset: false,
      });
      // 3. Client Field Photo if present
      if (c.clientFieldImage) {
        list.push({
          containerId: c.id,
          containerName: c.name,
          viewType: 'field',
          viewLabel: 'Authentic Client Field Record (JNPT)',
          url: c.clientFieldImage,
          caption: c.clientFieldCaption || `${c.name} operational photo at Nhava Sheva`,
          alt: c.clientFieldAlt || `${c.name} at terminal`,
          isClientAsset: true,
        });
      }
    });
    return list;
  }, []);

  // Open Lightbox for a specific container and view
  const openLightboxFor = (containerId: string, viewType: 'exterior' | 'interior' | 'field') => {
    const idx = allLightboxEntries.findIndex(
      item => item.containerId === containerId && item.viewType === viewType
    );
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

  // Helper to get active display image in the showcase
  const getShowcaseImage = () => {
    if (showcaseViewMode === 'interior') {
      return {
        url: selectedContainer.interiorImage,
        caption: selectedContainer.interiorCaption,
        alt: selectedContainer.interiorAlt,
        label: 'Interior View',
        isClientAsset: false,
      };
    }
    if (showcaseViewMode === 'field' && selectedContainer.clientFieldImage) {
      return {
        url: selectedContainer.clientFieldImage,
        caption: selectedContainer.clientFieldCaption || '',
        alt: selectedContainer.clientFieldAlt || '',
        label: 'Client Field Record (JNPT)',
        isClientAsset: true,
      };
    }
    return {
      url: selectedContainer.exteriorImage,
      caption: selectedContainer.exteriorCaption,
      alt: selectedContainer.exteriorAlt,
      label: 'Exterior View',
      isClientAsset: false,
    };
  };

  // Helper to get active display image on a specific container card
  const getCardImage = (c: ContainerDetail) => {
    const mode = cardViewModes[c.id] || 'exterior';
    if (mode === 'interior') {
      return {
        url: c.interiorImage,
        caption: c.interiorCaption,
        alt: c.interiorAlt,
        label: 'Interior View',
        mode: 'interior' as const,
        isClientAsset: false,
      };
    }
    if (mode === 'field' && c.clientFieldImage) {
      return {
        url: c.clientFieldImage,
        caption: c.clientFieldCaption || '',
        alt: c.clientFieldAlt || '',
        label: 'Client Field Record (JNPT)',
        mode: 'field' as const,
        isClientAsset: true,
      };
    }
    return {
      url: c.exteriorImage,
      caption: c.exteriorCaption,
      alt: c.exteriorAlt,
      label: 'Exterior View',
      mode: 'exterior' as const,
      isClientAsset: false,
    };
  };

  const showcaseImg = getShowcaseImage();
  const currentLightboxItem = allLightboxEntries[lightboxIndex] || allLightboxEntries[0];

  return (
    <div className="space-y-0 bg-[#F9FAFB]">
      {/* 1. Page Header — Dark Graphite Refined Banner */}
      <InnerPageBanner
        badge="EQUIPMENT REFERENCE"
        badgeSubtext="ISO STANDARDS • OCEAN FREIGHT SPECIFICATIONS"
        title="Container Guide: Types, Dimensions & Equipment"
        description="Explore standard ocean container types, dedicated interior and exterior structural views, indicative dimensions, door clearances, and payload capacities for export cargo planning."
      />

      {/* 2. Sticky Container Quick-Bar & Measurement Unit Controls */}
      <section className="bg-white border-b border-[#E8E8E8] sticky top-[68px] sm:top-[72px] z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Quick Container Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full lg:w-auto">
            {CONTAINER_LIST.map((container) => (
              <button
                key={container.id}
                onClick={() => {
                  setSelectedContainerId(container.id);
                  // Scroll to showcase section smoothly
                  const el = document.getElementById('container-showcase');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                aria-selected={selectedContainerId === container.id}
                className={`py-2 px-3.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 ${
                  selectedContainerId === container.id
                    ? 'bg-[#B62825] text-white shadow-xs font-semibold ring-2 ring-[#B62825]/30'
                    : 'bg-[#F5F5F3] text-[#52627A] hover:bg-[#E8E8E8] hover:text-[#B62825]'
                }`}
              >
                <span>{container.code}</span>
                {container.clientFieldImage && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" title="Authentic Client Photograph Available" />
                )}
              </button>
            ))}
          </div>

          {/* Unit Toggle & Jump to Cards */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            <a
              href="#all-container-cards"
              className="text-xs font-mono text-[#173F70] hover:text-[#B62825] font-semibold flex items-center gap-1 transition-colors"
            >
              <span>View All 6 Cards</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-lg text-xs font-mono">
              <button
                type="button"
                onClick={() => setUnitMode('metric')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  unitMode === 'metric'
                    ? 'bg-white text-[#173F70] font-bold shadow-xs'
                    : 'text-[#64748B] hover:text-[#173F70]'
                }`}
              >
                Metric (m / mm)
              </button>
              <button
                type="button"
                onClick={() => setUnitMode('both')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  unitMode === 'both'
                    ? 'bg-white text-[#173F70] font-bold shadow-xs'
                    : 'text-[#64748B] hover:text-[#173F70]'
                }`}
              >
                Metric & Imperial (ft/in)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Container Studio / Deep-Dive Showcase */}
      <section id="container-showcase" className="py-10 sm:py-14 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
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
                      <span>JNPT FIELD PHOTO</span>
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B] mt-1.5">
                  {selectedContainer.name}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="text-xs font-mono bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-2 rounded-lg text-[#52627A]">
                  Volume: <strong className="text-[#173F70] font-bold">{selectedContainer.cubicCapacity.cbm}</strong>
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

            {/* Showcase Middle: Interactive Viewer + Specifications */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Visual Container Viewer with View Tabs (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* View Tabs Control */}
                <div className="flex items-center justify-between gap-2 p-1.5 bg-[#F1F5F9] rounded-xl border border-neutral-200">
                  <div className="flex items-center gap-1.5 w-full">
                    <button
                      type="button"
                      onClick={() => setShowcaseViewMode('exterior')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
                        showcaseViewMode === 'exterior'
                          ? 'bg-white text-[#173F70] font-bold shadow-xs'
                          : 'text-[#64748B] hover:text-[#173F70]'
                      }`}
                    >
                      Exterior View
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowcaseViewMode('interior')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
                        showcaseViewMode === 'interior'
                          ? 'bg-white text-[#173F70] font-bold shadow-xs'
                          : 'text-[#64748B] hover:text-[#173F70]'
                      }`}
                    >
                      Interior View
                    </button>
                    {selectedContainer.clientFieldImage && (
                      <button
                        type="button"
                        onClick={() => setShowcaseViewMode('field')}
                        className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center gap-1 ${
                          showcaseViewMode === 'field'
                            ? 'bg-emerald-600 text-white font-bold shadow-xs'
                            : 'text-emerald-700 hover:bg-emerald-50'
                        }`}
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>JNPT Field</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Main Image Viewer */}
                <div 
                  key={`${selectedContainer.id}-${showcaseViewMode}`}
                  className="relative group rounded-xl overflow-hidden border border-[#E2E8F0] bg-neutral-950 shadow-inner cursor-pointer animate-fade-in-up motion-reduce:animate-none"
                  onClick={() => openLightboxFor(selectedContainer.id, showcaseViewMode)}
                  title="Click to open full-resolution viewer"
                >
                  <BrandedImage
                    src={showcaseImg.url}
                    alt={showcaseImg.alt}
                    aspectRatio="aspect-[16/11]"
                    tagSubtitle="MSK ASSET"
                    imageClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                  />

                  {/* Click to Enlarge Hover Badge */}
                  <div className="absolute top-3 left-3 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="inline-flex items-center gap-1.5 bg-black/80 backdrop-blur-md text-white text-[11px] font-mono px-2.5 py-1 rounded shadow-md">
                      <Maximize2 className="w-3.5 h-3.5 text-red-400" />
                      <span>Click to enlarge</span>
                    </span>
                  </div>

                  {/* Active View Badge */}
                  <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md shadow-md backdrop-blur-md ${
                      showcaseImg.isClientAsset
                        ? 'bg-emerald-950/85 text-emerald-200 border border-emerald-500/40'
                        : 'bg-black/75 text-neutral-200 border border-white/10'
                    }`}>
                      {showcaseImg.isClientAsset ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Field Photo (JNPT)</span>
                        </>
                      ) : (
                        <>
                          <Box className="w-3 h-3 text-sky-400" />
                          <span>{showcaseImg.label}</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Specific Descriptive Caption */}
                <div className="p-3.5 bg-white rounded-xl border border-[#E2E8F0] text-xs text-[#475569] shadow-xs">
                  <div className="font-mono text-[11px] text-[#173F70] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#B62825]" />
                    <span>View Specifications & Physical Characteristics:</span>
                  </div>
                  <p className="leading-relaxed">
                    {showcaseImg.caption}
                  </p>
                </div>

                {/* Manufacturer Variance Notice */}
                <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-[11px] text-[#64748B] space-y-1">
                  <strong className="text-[#334155] block font-mono uppercase tracking-wide">
                    Manufacturer Variance & CSC Plate Notice:
                  </strong>
                  <p>{selectedContainer.operationalDisclaimer}</p>
                </div>
              </div>

              {/* Right Column: Verified ISO Dimensions & Clearances (7 cols) with smooth key transition */}
              <div 
                key={`specs-${selectedContainer.id}`}
                className="lg:col-span-7 space-y-6 animate-fade-in-up motion-reduce:animate-none"
              >
                {/* 1. External Dimensions */}
                <div className="bg-[#F8FAFC] p-5 rounded-xl border border-[#E2E8F0] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#173F70]">
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
                    <strong className="text-[#173F70] font-mono uppercase block text-xs">
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
                    <strong className="text-[#173F70] font-mono uppercase block text-xs">
                      Weights & Payload Capacity
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
                  <Info className="w-4 h-4 text-[#173F70]" />
                  <span>Recommended Cargo Applications</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {selectedContainer.recommendedUse}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#1E293B] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#B62825]" />
                  <span>MSK Stuffing & Lashing Engineering Guidance</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {selectedContainer.stuffingAdvice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dedicated Container Cards Section (All 6 Types) */}
      <section id="all-container-cards" className="py-12 sm:py-16 bg-white border-t border-[#E8E8E8] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="editorial-badge bg-[#173F70]/10 text-[#173F70] border-[#173F70]/20">
              EQUIPMENT CATALOG & VISUAL SPECIFICATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#1E293B]">
              Every Container Type: Dedicated Visual & Technical Cards
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
              Explore individual exterior and interior images for every container type in our international shipping guide. Toggle between views to inspect internal structural features like T-bar flooring, roof bows, end bulkheads, and door clearances.
            </p>
          </div>

          {/* Cards Stack */}
          <div className="space-y-10">
            {CONTAINER_LIST.map((c, index) => {
              const activeView = cardViewModes[c.id] || 'exterior';
              const cardImg = getCardImage(c);

              return (
                <div 
                  key={c.id} 
                  id={`card-${c.id}`}
                  className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {/* Card Header Bar */}
                  <div className="px-6 py-5 bg-[#F8FAFC] border-b border-[#E8E8E8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#173F70] text-white text-xs font-mono font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#1E293B]">
                        {c.name}
                      </h3>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#E2E8F0] text-[#334155] font-semibold">
                        {c.code}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded bg-white border border-[#E2E8F0] text-[#173F70] font-bold">
                        {c.cubicCapacity.cbm}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-white border border-[#E2E8F0] text-[#64748B]">
                        Payload: <strong className="text-[#334155]">{c.maxPayload.kg}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Card Body: 2 Columns */}
                  <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Image Viewer with Interactive Tabs (5 cols) */}
                    <div className="lg:col-span-5 space-y-3.5">
                      {/* View Switch Controls */}
                      <div className="flex items-center justify-between gap-2 p-1.5 bg-[#F1F5F9] rounded-xl border border-neutral-200">
                        <div className="flex items-center gap-1.5 w-full">
                          <button
                            type="button"
                            onClick={() => setCardViewModes(prev => ({ ...prev, [c.id]: 'exterior' }))}
                            className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
                              activeView === 'exterior'
                                ? 'bg-white text-[#173F70] font-bold shadow-xs'
                                : 'text-[#64748B] hover:text-[#173F70]'
                            }`}
                          >
                            Exterior View
                          </button>
                          <button
                            type="button"
                            onClick={() => setCardViewModes(prev => ({ ...prev, [c.id]: 'interior' }))}
                            className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
                              activeView === 'interior'
                                ? 'bg-white text-[#173F70] font-bold shadow-xs'
                                : 'text-[#64748B] hover:text-[#173F70]'
                            }`}
                          >
                            Interior View
                          </button>
                          {c.clientFieldImage && (
                            <button
                              type="button"
                              onClick={() => setCardViewModes(prev => ({ ...prev, [c.id]: 'field' }))}
                              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center gap-1 ${
                                activeView === 'field'
                                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                                  : 'text-emerald-700 hover:bg-emerald-50'
                              }`}
                            >
                              <Camera className="w-3 h-3" />
                              <span>Field</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Image Viewer with MSK Logo Watermark Corner Tag */}
                      <div
                        className="relative group rounded-xl overflow-hidden border border-[#E2E8F0] bg-neutral-950 shadow-inner cursor-pointer"
                        onClick={() => openLightboxFor(c.id, activeView)}
                        title="Click to view full image in lightbox"
                      >
                        <BrandedImage
                          src={cardImg.url}
                          alt={cardImg.alt}
                          aspectRatio="aspect-[16/11]"
                          tagSubtitle="MSK LOGISTICS"
                        />

                        {/* Enlarge Hover Pill */}
                        <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <span className="inline-flex items-center gap-1.5 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-md">
                            <Maximize2 className="w-3 h-3 text-red-400" />
                            <span>Enlarge</span>
                          </span>
                        </div>

                        {/* Active View Indicator */}
                        <div className="absolute bottom-2.5 left-2.5 z-20 pointer-events-none">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow backdrop-blur-md ${
                            cardImg.isClientAsset
                              ? 'bg-emerald-950/85 text-emerald-200 border border-emerald-500/40'
                              : 'bg-black/75 text-neutral-200 border border-white/10'
                          }`}>
                            {cardImg.isClientAsset ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>Field Record (JNPT)</span>
                              </>
                            ) : (
                              <span>{cardImg.label}</span>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* View Caption */}
                      <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] text-xs text-[#52627A]">
                        <p className="leading-relaxed">
                          {cardImg.caption}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Verified Specifications, Uses, Advice & Quote CTA (7 cols) */}
                    <div className="lg:col-span-7 space-y-5">
                      {/* Technical Dimensions Summary Table */}
                      <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#173F70] font-mono uppercase tracking-wider text-[11px]">
                            <tr>
                              <th className="py-2.5 px-3 font-bold">Measurement</th>
                              <th className="py-2.5 px-3 font-bold">External Envelope</th>
                              <th className="py-2.5 px-3 font-bold text-emerald-700">Internal Usable</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                            <tr>
                              <td className="py-2.5 px-3 font-semibold text-[#64748B]">Length</td>
                              <td className="py-2.5 px-3 font-mono">
                                {c.externalDimensions.length.metricMeters}
                                {unitMode === 'both' && <span className="text-[#94A3B8]"> ({c.externalDimensions.length.imperial})</span>}
                              </td>
                              <td className="py-2.5 px-3 font-mono font-semibold text-emerald-800">
                                {c.internalDimensions.length.metricMeters}
                                {unitMode === 'both' && <span className="text-[#94A3B8]"> ({c.internalDimensions.length.imperial})</span>}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2.5 px-3 font-semibold text-[#64748B]">Width</td>
                              <td className="py-2.5 px-3 font-mono">
                                {c.externalDimensions.width.metricMeters}
                                {unitMode === 'both' && <span className="text-[#94A3B8]"> ({c.externalDimensions.width.imperial})</span>}
                              </td>
                              <td className="py-2.5 px-3 font-mono font-semibold text-emerald-800">
                                {c.internalDimensions.width.metricMeters}
                                {unitMode === 'both' && <span className="text-[#94A3B8]"> ({c.internalDimensions.width.imperial})</span>}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2.5 px-3 font-semibold text-[#64748B]">Height</td>
                              <td className="py-2.5 px-3 font-mono">
                                {c.externalDimensions.height.metricMeters}
                                {unitMode === 'both' && <span className="text-[#94A3B8]"> ({c.externalDimensions.height.imperial})</span>}
                              </td>
                              <td className="py-2.5 px-3 font-mono font-semibold text-emerald-800">
                                {c.internalDimensions.height.metricMeters}
                                {unitMode === 'both' && <span className="text-[#94A3B8]"> ({c.internalDimensions.height.imperial})</span>}
                              </td>
                            </tr>
                            <tr className="bg-[#FAFAFA]">
                              <td className="py-2.5 px-3 font-semibold text-[#64748B]">Door Clearances</td>
                              <td colSpan={2} className="py-2.5 px-3 font-mono text-[#173F70]">
                                Width: <strong>{c.doorOpening.width.metricMeters}</strong> • Height: <strong>{c.doorOpening.height.metricMeters}</strong>
                                {c.topOpening && (
                                  <span className="block text-emerald-700 text-[11px] font-semibold mt-0.5">
                                    Roof Opening: {c.topOpening.length.metricMeters} × {c.topOpening.width.metricMeters}
                                  </span>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Typical Uses */}
                      <div className="space-y-1.5 text-xs">
                        <strong className="text-[#173F70] font-mono uppercase tracking-wide block flex items-center gap-1.5">
                          <Box className="w-3.5 h-3.5 text-[#B62825]" />
                          <span>Typical Cargo Applications:</span>
                        </strong>
                        <p className="text-[#52627A] leading-relaxed">
                          {c.recommendedUse}
                        </p>
                      </div>

                      {/* Important Specification Notes & Advice */}
                      <div className="p-3.5 bg-[#FFFBEB] rounded-xl border border-[#FDE68A] text-xs space-y-1">
                        <strong className="text-[#92400E] font-mono uppercase tracking-wide block flex items-center gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-[#D97706]" />
                          <span>Stuffing & Engineering Specification:</span>
                        </strong>
                        <p className="text-[#78350F] leading-relaxed">
                          {c.stuffingAdvice}
                        </p>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <Link
                          to={`/request-quote?container=${encodeURIComponent(c.name)}`}
                          className="bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-2.5 px-5 rounded-lg text-xs transition-colors shadow-sm inline-flex items-center gap-1.5"
                        >
                          <span>Request Quote for {c.name.split(' ')[0]}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedContainerId(c.id);
                            const el = document.getElementById('container-showcase');
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                          className="bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#173F70] font-semibold py-2.5 px-4 rounded-lg text-xs transition-colors inline-flex items-center gap-1.5"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>Focus in Blueprint Studio</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Engineering Advisory CTA Banner */}
      <section className="py-12 sm:py-16 bg-[#1A1C23] border-t border-[#2D3139] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-red-300">
                <HelpCircle className="w-4 h-4" />
                <span>MARITIME CARGO PLANNING & STUFFING</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#F4F5F7]">
                Need Help Selecting or Stuffing a Container?
              </h3>
              <p className="text-[#D9DEE5]/80 text-sm leading-relaxed">
                Provide your cargo weight distribution, crating dimensions, and destination port. Our technical engineers calculate floor load ratings, specify lashing arrangements, and recommend the most economical container configuration.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
              <Link
                to={`/request-quote?container=${encodeURIComponent(selectedContainer.name)}`}
                className="w-full sm:w-auto bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md text-center inline-flex items-center justify-center gap-2"
              >
                <span>Request Container Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-6 rounded-xl text-sm transition-colors text-center border border-white/20"
              >
                <span>Speak with an Engineer</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Accessible Full-Resolution Lightbox Modal */}
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
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#173F70] pl-1.5 border-l border-neutral-300">
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
