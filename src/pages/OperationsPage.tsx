import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Plane, 
  Box, 
  Anchor, 
  FileCheck, 
  Maximize2, 
  Headphones, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { BrandedImage } from '../components/common/BrandedImage';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { CLIENT_IMAGE_ASSETS } from '../data/imageAssets';
import { COMPANY_DETAILS } from '../data/company';

export interface PrincipalActivity {
  id: number;
  title: string;
  originalPoint: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

export const PRINCIPAL_ACTIVITIES: PrincipalActivity[] = [
  {
    id: 1,
    title: 'Export, Import & Air Cargo Handling',
    originalPoint: 'Cargo handling of Export Import & Air Cargo',
    description: 'Multimodal freight handling, CFS transfers, and staging coordination for containerized ocean exports, imports, and time-critical air cargo consignments.',
    icon: Plane,
    tag: 'ACTIVITY 01',
  },
  {
    id: 2,
    title: 'Industrial Packing Material & Palletisation',
    originalPoint: 'Packing Material (Palletisation)',
    description: 'Custom palletisation using Euro and standard wooden pallets, heat-treated (ISPM-15) materials, barrier foil wrapping, and tailored packaging supplies.',
    icon: Box,
    tag: 'ACTIVITY 02',
  },
  {
    id: 3,
    title: 'Marine Lashing & Timber Chocking',
    originalPoint: 'Lashing & Chocking',
    description: 'Heavy ratchet tie-downs, high-tensile steel wire securing, and custom hardwood chocking engineered to withstand rough ocean roll, pitch, and transit forces.',
    icon: Anchor,
    tag: 'ACTIVITY 03',
  },
  {
    id: 4,
    title: 'Customs Clearance for EXIM & SEZ Goods',
    originalPoint: 'Custom Clearance of Export Import & SEZ Goods',
    description: 'End-to-end procedural support, export-import documentation compliance, and seamless clearance processing for standard commercial and SEZ consignments.',
    icon: FileCheck,
    tag: 'ACTIVITY 04',
  },
  {
    id: 5,
    title: 'Project & Over-Dimensional Cargo (ODC) Specialist',
    originalPoint: 'Specialist in Project (ODC) handling from N/Sheva and Mundra',
    description: 'Specialized heavy rigging, flat rack stuffing, and maritime securing for oversized industrial machinery and ODC movements via Nhava Sheva (JNPT) and Mundra ports.',
    icon: Maximize2,
    tag: 'ACTIVITY 05',
  },
  {
    id: 6,
    title: 'Dedicated Client & Field Support Services',
    originalPoint: 'Other Client Services',
    description: 'Mobile on-site stuffing assistance, emergency field securing, dedicated logistics manpower deployment, and customized cargo protection solutions.',
    icon: Headphones,
    tag: 'ACTIVITY 06',
  },
];

type GalleryCategory = 
  | 'all' 
  | 'project-cargo' 
  | 'odc' 
  | 'flat-rack' 
  | 'break-bulk' 
  | 'hazardous'
  | 'lashing' 
  | 'stuffing' 
  | 'palletisation-packing' 
  | 'road-fleet';

export const OperationsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isItemInCategory = (item: typeof CLIENT_IMAGE_ASSETS[0], category: GalleryCategory): boolean => {
    if (category === 'all') return true;
    if (category === 'project-cargo') {
      return (
        item.subcategory === 'breakbulk-shipment' ||
        item.subcategory === 'flat-rack-shipment' ||
        item.id === 'img-pkg-sandvik-crate' ||
        item.category === 'shipment' ||
        Boolean(item.projectReference)
      );
    }
    if (category === 'odc') {
      return (
        item.id === 'img-bb-cylindrical-haulage' ||
        item.id === 'img-fr-mobile-crane' ||
        item.id === 'img-40ft-fr-lashed' ||
        item.id === 'img-20ft-fr-lashed' ||
        item.id === 'img-bb-heavy-rigging' ||
        item.id === 'img-bb-lowbed-machinery' ||
        item.id === 'img-fr-night-lashing' ||
        item.subcategory === 'breakbulk-shipment' ||
        item.subcategory === 'flat-rack-shipment'
      );
    }
    if (category === 'flat-rack') {
      return (
        item.subcategory === 'flat-rack-container' ||
        item.subcategory === 'flat-rack-shipment' ||
        item.id.includes('fr')
      );
    }
    if (category === 'break-bulk') {
      return (
        item.subcategory === 'breakbulk-shipment' ||
        item.id === 'img-bb-cylindrical-haulage' ||
        item.id === 'img-bb-lowbed-machinery' ||
        item.id === 'img-bb-heavy-rigging' ||
        item.id === 'img-bb-vessel-hold' ||
        item.id === 'img-fr-night-lashing' ||
        item.id === 'img-lash-vessel-cross'
      );
    }
    if (category === 'hazardous') {
      return (
        item.subcategory === 'hazardous-cargo' ||
        item.id.includes('dgr') ||
        item.id.includes('un3265') ||
        item.id.includes('un2588')
      );
    }
    if (category === 'lashing') {
      return (
        item.subcategory === 'cargo-lashing' ||
        item.id.includes('lash') ||
        item.id === 'img-fr-night-lashing' ||
        item.id === 'img-lash-trailer-chassis' ||
        item.id === 'img-lash-flat-rack-orange'
      );
    }
    if (category === 'stuffing') {
      return (
        item.subcategory === 'container-loading' ||
        item.subcategory === 'high-cube-container' ||
        item.id === 'img-40ft-hc-terminal' ||
        item.id === 'img-pkg-terminal-staging'
      );
    }
    if (category === 'palletisation-packing') {
      return (
        item.subcategory === 'export-packaging' ||
        item.subcategory === 'shaded-warehouse' ||
        item.id === 'img-wh-pallet-strapping' ||
        item.id === 'img-wh-staging-bays' ||
        item.id === 'img-wh-industrial-rolls' ||
        item.id === 'img-pkg-sandvik-crate' ||
        item.id === 'img-pkg-skid-wrapping'
      );
    }
    if (category === 'road-fleet') {
      return (
        item.id === 'img-bb-cylindrical-haulage' ||
        item.id === 'img-bb-heavy-rigging' ||
        item.id === 'img-bb-lowbed-machinery' ||
        item.id === 'img-lash-trailer-chassis' ||
        Boolean(item.projectReference?.includes('Haulage')) ||
        Boolean(item.projectReference?.includes('Fleet')) ||
        Boolean(item.projectReference?.includes('Road'))
      );
    }
    return true;
  };

  // Filter gallery items
  const filteredGallery = CLIENT_IMAGE_ASSETS.filter((item) => isItemInCategory(item, selectedCategory));

  const getCategoryCount = (category: GalleryCategory): number => {
    return CLIENT_IMAGE_ASSETS.filter((item) => isItemInCategory(item, category)).length;
  };

  const activeItem = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
  }, [lightboxIndex, filteredGallery.length]);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
  }, [lightboxIndex, filteredGallery.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, prevImage, nextImage]);

  return (
    <div className="space-y-0 bg-[#FBFBFC]">
      {/* 1. Page Header */}
      <InnerPageBanner
        breadcrumb={
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Operations', isCurrent: true },
            ]}
          />
        }
        badge="OPERATIONAL EXCELLENCE"
        badgeSubtext="NHAVA SHEVA (JNPT) & MUNDRA PORT CORRIDORS"
        title="MSK Operational Capabilities & Field Projects"
        description="Direct on-site execution at Nhava Sheva (JNPT), Mundra, and client premises across Western India. Precision export packaging, container stuffing, project cargo rigging, and maritime cargo securing."
      />

      {/* 2. Principal Activities Section */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Section Header */}
          <ScrollReveal direction="up" className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#B62825] text-xs font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
              <span>CORE OPERATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#1E293B] tracking-tight">
              Principal Activities
            </h2>
            <p className="text-[15px] sm:text-base text-[#64748B] font-body leading-relaxed">
              Verified operational services delivered across container freight stations, industrial manufacturing plants, and primary western shipping gateways.
            </p>
          </ScrollReveal>

          {/* 6 Principal Activities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PRINCIPAL_ACTIVITIES.map((activity, aIdx) => {
              const Icon = activity.icon;
              return (
                <ScrollReveal
                  key={activity.id}
                  direction="up"
                  delay={(aIdx % 3) * 80}
                  className="h-full"
                >
                  <div
                    className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#B62825] shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 space-y-5 h-full hover-lift"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] group-hover:bg-red-50 text-[#B62825] group-hover:text-[#B62825] flex items-center justify-center border border-[#E2E8F0] group-hover:border-red-200 transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono font-bold tracking-wider text-[#94A3B8] group-hover:text-[#B62825] uppercase transition-colors">
                          {activity.tag}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg sm:text-xl font-bold font-heading text-[#1E293B] group-hover:text-[#B62825] transition-colors leading-snug">
                          {activity.title}
                        </h3>
                        <p className="text-[14px] text-[#64748B] leading-relaxed font-body">
                          {activity.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#F1F5F9] text-[11.5px] font-mono text-[#94A3B8]">
                      <span className="font-semibold text-[#B62825]">Profile Scope:</span> {activity.originalPoint}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ENHANCED PROJECT & OPERATIONS GALLERY WITH LIGHTBOX (Point 04)          */}
      {/* ========================================================================= */}
      <section id="operations-gallery" className="py-16 sm:py-24 bg-[#000000] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          {/* Gallery Header Matching Concept 10 */}
          <ScrollReveal direction="up" className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
                Our <span className="text-[#B62825]">Operations</span>
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] font-body leading-relaxed">
                Real project executions, cargo handling and industrial logistics.
              </p>
            </div>

            {/* Quick Consultation Badge */}
            <div className="flex items-center gap-2.5 text-xs font-mono text-slate-300 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#B62825]" />
              <span>Verified JNPT / Nhava Sheva Operations</span>
            </div>
          </ScrollReveal>

          {/* Category Filter Pills Matching Concept 10 */}
          <ScrollReveal direction="up" delay={50} className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            {[
              { id: 'all' as GalleryCategory, label: 'All' },
              { id: 'project-cargo' as GalleryCategory, label: 'Project Cargo' },
              { id: 'odc' as GalleryCategory, label: 'ODC' },
              { id: 'flat-rack' as GalleryCategory, label: 'Flat Rack' },
              { id: 'break-bulk' as GalleryCategory, label: 'Break Bulk' },
              { id: 'hazardous' as GalleryCategory, label: 'Hazardous Cargo (DGR)' },
              { id: 'lashing' as GalleryCategory, label: 'Cargo Lashing' },
              { id: 'stuffing' as GalleryCategory, label: 'Container Stuffing' },
              { id: 'palletisation-packing' as GalleryCategory, label: 'Palletisation & Packing' },
              { id: 'road-fleet' as GalleryCategory, label: 'Road Fleet & Connectivity' },
            ].map((tab) => {
              const active = selectedCategory === tab.id;
              const count = getCategoryCount(tab.id);
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`py-2 px-5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 inline-flex items-center gap-2 cursor-pointer ${
                    active
                      ? 'bg-[#B62825] text-white shadow-md ring-2 ring-[#B62825]/40'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    active ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </ScrollReveal>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGallery.map((item, index) => (
              <ScrollReveal
                key={item.id}
                direction="up"
                delay={(index % 4) * 60}
                className="h-full"
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setLightboxIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxIndex(index);
                    }
                  }}
                  className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-[#B62825] transition-all duration-300 shadow-md hover:shadow-xl text-left cursor-pointer flex flex-col justify-between h-full hover-lift"
                >
                  {/* Image Container with Watermark */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-neutral-950">
                    <BrandedImage
                      src={item.localPath}
                      alt={item.alt}
                      aspectRatio="h-full w-full"
                      imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Subtle Dark Gradient at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                    {/* ISO or Type Tag */}
                    {item.isoCode && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono font-bold border border-white/20">
                          ISO {item.isoCode}
                        </span>
                      </div>
                    )}

                    {/* Consignee / Project Cargo Badge */}
                    {item.consigneeOrPartner && (
                      <div className="absolute top-3 right-3 z-10 group-hover:opacity-0 transition-opacity">
                        <span className="px-2 py-0.5 rounded bg-[#B62825] text-white text-[9.5px] font-mono font-bold tracking-tight shadow-md border border-white/20">
                          {item.consigneeOrPartner}
                        </span>
                      </div>
                    )}

                    {/* Enlarge Hover Indicator */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-lg bg-[#B62825] text-white flex items-center justify-center shadow-lg">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Card Caption Info */}
                  <div className="p-4 bg-neutral-900/90 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                        {item.category.toUpperCase()} • {item.subcategory.replace('-', ' ').toUpperCase()}
                      </span>
                      <h4 className="text-sm font-bold text-white font-heading group-hover:text-red-300 transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      {item.projectReference && (
                        <div className="text-[10px] font-mono text-amber-300 font-medium line-clamp-1 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                          {item.projectReference.replace(/^Ref:\s*/i, '').replace(/IMG-\d+-WA\d+\.jpe?g/i, '').trim()}
                        </div>
                      )}
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {item.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="truncate">{item.verifiedDetails.split('.')[0]}</span>
                      <span className="text-[#B62825] font-bold group-hover:translate-x-0.5 transition-transform shrink-0">
                        View &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Lightbox Modal */}
          {activeItem && lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label="Image Lightbox"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-50 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-50 transition-colors"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-50 transition-colors"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Main Content Container */}
              <div
                className="max-w-5xl w-full bg-neutral-900 border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Large Photograph */}
                <div className="relative flex-1 bg-black flex items-center justify-center min-h-[360px] sm:min-h-[500px] overflow-hidden">
                  <img
                    src={activeItem.localPath}
                    alt={activeItem.alt}
                    className="max-h-[70vh] w-auto max-w-full object-contain"
                  />
                  {/* Bottom-right MSK Logo Stamp */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg border border-neutral-300">
                    <img
                      src="/images/logo/msk-logistics-logo.png"
                      alt="MSK Logistics Solution"
                      className="h-5 w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Lightbox Information Bar */}
                <div className="p-6 bg-neutral-900 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase font-semibold">
                      <span>{activeItem.category}</span>
                      <span>•</span>
                      <span>{activeItem.subcategory.replace('-', ' ')}</span>
                      {activeItem.isoCode && (
                        <>
                          <span>•</span>
                          <span className="text-white">ISO {activeItem.isoCode}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                      {activeItem.title}
                    </h3>
                    {activeItem.projectReference && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#B62825]/20 border border-[#B62825]/40 text-red-200 text-xs font-mono">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#B62825] shrink-0" />
                        <span><strong>Consignment Reference:</strong> {activeItem.projectReference}</span>
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                      {activeItem.caption} — {activeItem.verifiedDetails}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      to="/request-quote"
                      className="px-5 py-2.5 rounded-xl bg-[#B62825] hover:bg-[#9E2220] text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <span className="text-xs font-mono text-slate-400">
                      {lightboxIndex + 1} / {filteredGallery.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. CTA Banner */}
          <ScrollReveal direction="up" delay={100} className="bg-[#000000] rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-white/10">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-heading text-white">
                Book an Operations Team for On-Site Packing &amp; Lashing
              </h3>
              <p className="text-[#94A3B8] text-sm max-w-xl">
                Our mobile rigging and packing crews deploy across Navi Mumbai, Taloja, Rabale, Mahape, Mundra, and JNPT port areas.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                to="/request-quote"
                className="w-full sm:w-auto bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-3.5 px-6 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <span>Schedule Operational Team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={COMPANY_DETAILS.emergencyPhoneHref}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-mono font-bold py-3.5 px-5 rounded-xl text-center border border-white/20 text-xs hover:scale-105 active:scale-95"
              >
                24×7: {COMPANY_DETAILS.emergencyPhoneDisplay}
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </div>
  );
};
