import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { HOMEPAGE_OPERATIONAL_GALLERY, type ClientImageAsset } from '../../data/imageAssets';
import { BrandedImage } from './BrandedImage';

export const OperationalEnvironmentsGallery: React.FC = () => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);

  const images = HOMEPAGE_OPERATIONAL_GALLERY;

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevLightboxImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  const nextLightboxImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightboxImage();
      if (e.key === 'ArrowRight') nextLightboxImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, prevLightboxImage, nextLightboxImage]);

  // Determine if marquee animation should be paused on card hover
  const isAnimationPaused = hoveredCardId !== null;

  // Helper for category label
  const getCategoryLabel = (subcategory: ClientImageAsset['subcategory']) => {
    switch (subcategory) {
      case 'high-cube-container': return '40ft High Cube Container';
      case 'flat-rack-container': return 'Flat Rack Container';
      case 'flat-rack-shipment': return 'Flat Rack Shipment';
      case 'breakbulk-shipment': return 'Breakbulk Transport';
      case 'container-loading': return 'Container Stuffing & Rigging';
      case 'export-packaging': return 'Export Packaging & Crating';
      case 'cargo-lashing': return 'Cargo Lashing & Securing';
      case 'shaded-warehouse': return 'Shaded Warehouse Operations';
      default: return 'Port Operations';
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#12161E] text-white border-y border-neutral-800 relative overflow-hidden select-none">
      {/* Background Decorative Ambient Radial Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#1E293B]/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* 1. Header & Context */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 sm:mb-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B62825]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                FIELD EXECUTION GALLERY
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight">
              Operational Environments
            </h2>

            <p className="text-[15px] sm:text-[17px] text-neutral-300 font-body leading-relaxed max-w-2xl">
              Explore the cargo, containers, and export operations behind our packaging, stuffing, and lashing services at Nhava Sheva (JNPT).
            </p>
          </div>

          {/* Discreet Controls & Full Directory Link */}
          <div className="flex items-center gap-3">
            <Link
              to="/import-export"
              className="group/btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#B62825] hover:bg-[#9E2220] text-white text-xs font-semibold font-mono transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>Explore All Shipments</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Infinite Marquee Track */}
      <div
        ref={marqueeContainerRef}
        className="relative w-full overflow-hidden py-4"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)' }}
      >
        <div
          className="animate-marquee-slow flex items-center gap-6"
          style={{
            animationPlayState: isAnimationPaused ? 'paused' : 'running',
          }}
        >
          {/* First loop of items (accessible to keyboard/screen readers) */}
          {images.map((item, index) => {
            const isHovered = hoveredCardId === item.id;
            const isOtherHovered = hoveredCardId !== null && !isHovered;

            return (
              <div
                key={`primary-${item.id}`}
                className="group relative flex-shrink-0 transition-all duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none"
                style={{
                  width: 'clamp(300px, 32vw, 450px)',
                  transform: isHovered
                    ? 'scale(1.03) translateY(-5px)'
                    : isOtherHovered
                    ? 'scale(0.985) translateY(0)'
                    : 'scale(1) translateY(0)',
                  zIndex: isHovered ? 40 : 10,
                  opacity: isOtherHovered ? 0.65 : 1,
                  transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease',
                }}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                aria-label={`View ${item.title}`}
              >
                {/* Image Card Container */}
                <div className={`relative rounded-xl overflow-hidden bg-neutral-900 border transition-all duration-300 ${
                  isHovered
                    ? 'border-[#B62825] shadow-[0_16px_36px_-6px_rgba(182,40,37,0.35),0_6px_16px_-4px_rgba(0,0,0,0.5)] ring-1 ring-[#B62825]/40'
                    : 'border-white/10 hover:border-white/25 shadow-lg'
                }`}>
                  <BrandedImage
                    src={item.localPath}
                    alt={item.alt}
                    aspectRatio="aspect-[16/10]"
                    imageClassName={`w-full h-full object-cover transition-transform duration-500 ease-out motion-reduce:transform-none ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}
                  />

                  {/* Gradient bottom shadow for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Default Baseline Title (always visible when not hovered) */}
                  <div className={`p-4 absolute bottom-0 left-0 right-0 z-20 transition-opacity duration-200 ${
                    isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate drop-shadow">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-300 font-mono truncate mt-0.5">
                      {item.verifiedDetails}
                    </p>
                  </div>

                  {/* Hover Floating Information Card Overlay */}
                  <div className={`absolute inset-x-3 bottom-3 z-30 p-4 rounded-xl bg-neutral-950/95 backdrop-blur-md border border-white/20 text-white shadow-2xl transition-all duration-300 motion-reduce:transform-none ${
                    isHovered
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-red-400">
                        {getCategoryLabel(item.subcategory)}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white font-heading leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-neutral-300 line-clamp-2 mt-1 leading-relaxed">
                      {item.shortDescription}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(index);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-white hover:text-red-300 font-semibold transition-colors"
                      >
                        <Maximize2 className="w-3 h-3 text-red-400" />
                        <span>Enlarge Photograph</span>
                      </button>

                      <Link
                        to="/request-quote"
                        onClick={(e) => e.stopPropagation()}
                        className="group/quote text-[11px] font-mono text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                      >
                        <span>Request Quote</span>
                        <ArrowRight className="w-3 h-3 text-red-400 transition-transform duration-200 group-hover/quote:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Duplicate loop of items for seamless infinite marquee (hidden from screen readers) */}
          {images.map((item, index) => {
            const isHovered = hoveredCardId === `duplicate-${item.id}`;
            const isOtherHovered = hoveredCardId !== null && !isHovered;

            return (
              <div
                key={`duplicate-${item.id}`}
                aria-hidden="true"
                tabIndex={-1}
                className="group relative flex-shrink-0 transition-all duration-300 ease-out motion-reduce:transform-none motion-reduce:transition-none"
                style={{
                  width: 'clamp(300px, 32vw, 450px)',
                  transform: isHovered
                    ? 'scale(1.03) translateY(-5px)'
                    : isOtherHovered
                    ? 'scale(0.985) translateY(0)'
                    : 'scale(1) translateY(0)',
                  zIndex: isHovered ? 40 : 10,
                  opacity: isOtherHovered ? 0.65 : 1,
                  transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease',
                }}
                onMouseEnter={() => setHoveredCardId(`duplicate-${item.id}`)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => openLightbox(index)}
              >
                <div className={`relative rounded-xl overflow-hidden bg-neutral-900 border transition-all duration-300 ${
                  isHovered
                    ? 'border-[#B62825] shadow-[0_16px_36px_-6px_rgba(182,40,37,0.35),0_6px_16px_-4px_rgba(0,0,0,0.5)] ring-1 ring-[#B62825]/40'
                    : 'border-white/10 hover:border-white/25 shadow-lg'
                }`}>
                  <BrandedImage
                    src={item.localPath}
                    alt=""
                    aspectRatio="aspect-[16/10]"
                    imageClassName={`w-full h-full object-cover transition-transform duration-500 ease-out motion-reduce:transform-none ${
                      isHovered ? 'scale-105' : 'scale-100'
                    }`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  <div className={`p-4 absolute bottom-0 left-0 right-0 z-20 transition-opacity duration-200 ${
                    isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate drop-shadow">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-300 font-mono truncate mt-0.5">
                      {item.verifiedDetails}
                    </p>
                  </div>

                  <div className={`absolute inset-x-3 bottom-3 z-30 p-4 rounded-xl bg-neutral-950/95 backdrop-blur-md border border-white/20 text-white shadow-2xl transition-all duration-300 motion-reduce:transform-none ${
                    isHovered
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-red-400">
                        {getCategoryLabel(item.subcategory)}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white font-heading leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-neutral-300 line-clamp-2 mt-1 leading-relaxed">
                      {item.shortDescription}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLightbox(index);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-white hover:text-red-300 font-semibold transition-colors"
                      >
                        <Maximize2 className="w-3 h-3 text-red-400" />
                        <span>Enlarge Photograph</span>
                      </button>

                      <Link
                        to="/request-quote"
                        onClick={(e) => e.stopPropagation()}
                        className="group/quote text-[11px] font-mono text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                      >
                        <span>Request Quote</span>
                        <ArrowRight className="w-3 h-3 text-red-400 transition-transform duration-200 group-hover/quote:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Accessible Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Operational photograph details"
        >
          <div
            className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Toolbar */}
            <div className="w-full flex items-center justify-between py-2 px-1 text-white text-xs font-mono">
              <div className="flex items-center gap-2 truncate pr-4">
                <span className="text-red-400 uppercase font-bold">
                  [{getCategoryLabel(images[lightboxIndex].subcategory)}]
                </span>
                <span className="truncate text-neutral-300">
                  {images[lightboxIndex].title}
                </span>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1"
                aria-label="Close image viewer"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">ESC</span>
              </button>
            </div>

            {/* Main Lightbox Image with MSK Corner Watermark Overlay */}
            <div className="relative max-h-[72vh] w-auto overflow-hidden rounded-xl bg-black border border-white/10 shadow-2xl">
              <img
                src={images[lightboxIndex].localPath}
                alt={images[lightboxIndex].alt}
                className="max-h-[72vh] max-w-full w-auto object-contain"
              />

              {/* MSK Corner Tag Watermark (Only MSK Logo) */}
              <div className="absolute bottom-4 right-4 z-20 pointer-events-none select-none">
                <div className="flex items-center bg-white/95 px-2.5 py-1.5 rounded-md shadow-lg border border-neutral-300">
                  <img
                    src="/images/logo/msk-logistics-logo.png"
                    alt="MSK Logistics"
                    className="h-5 w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={prevLightboxImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur border border-white/20 transition-all shadow-xl"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={nextLightboxImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur border border-white/20 transition-all shadow-xl"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Footer Information & Quote CTA */}
            <div className="w-full mt-3 p-4 rounded-xl bg-neutral-900/90 border border-white/10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-body">
                  {images[lightboxIndex].caption}
                </p>
                <p className="text-[11px] font-mono text-neutral-400">
                  Nhava Sheva (JNPT) • Export Operations
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-end">
                <span className="text-xs font-mono text-neutral-400">
                  {lightboxIndex + 1} / {images.length}
                </span>
                <Link
                  to={`/request-quote?ref=${encodeURIComponent(images[lightboxIndex].title)}`}
                  className="btn-primary text-xs py-2 px-3.5 whitespace-nowrap"
                  onClick={closeLightbox}
                >
                  <span>Request Similar Lashing Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
