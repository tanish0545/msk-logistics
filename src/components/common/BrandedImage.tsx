import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, RefreshCw } from 'lucide-react';

export interface BrandedImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  imageClassName?: string;
  corner?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showBadge?: boolean;
  tagSubtitle?: string;
  onClick?: () => void;
  aspectRatio?: string;
  priority?: boolean;
}

/**
 * Resilient, production-grade BrandedImage component.
 * 
 * Fixes for "Images turn black/blank after tab switch or route navigation":
 * 1. Checks `imgRef.current.complete && naturalWidth > 0` on mount — never hides cached images.
 * 2. Does NOT hide images with opacity-0 if they are already completed or in browser cache.
 * 3. Listens to `visibilitychange`, `pageshow`, and `focus` to re-decode/re-verify textures on tab resume.
 * 4. Calls `img.decode()` to force GPU texture rasterization and avoid black compositor tiles.
 * 5. Automatic retry mechanism (up to 2 attempts) for transient network/decoding failures.
 * 6. Preserves aspect ratio, styling, and the official MSK watermark badge.
 */
export const BrandedImage: React.FC<BrandedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  className = '',
  imageClassName = '',
  corner = 'bottom-right',
  showBadge = true,
  onClick,
  aspectRatio = 'aspect-[16/10]',
  priority = false,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(priority);
  const [retryCount, setRetryCount] = useState<number>(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Sync state if source prop changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setRetryCount(0);
    // If priority is true or image is already in memory, start as loaded
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(priority);
    }
  }, [src, priority]);

  // Synchronous mount check & decode
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (img.complete) {
      if (img.naturalWidth > 0) {
        setIsLoaded(true);
        // Force asynchronous decode to ensure GPU texture is allocated
        if (typeof img.decode === 'function') {
          img.decode().catch(() => {});
        }
      } else if (img.src && !hasError) {
        // Zero natural width after complete indicates decode/load error
        handleError();
      }
    }
  }, [imgSrc, hasError]);

  // Tab switch & browser resume recovery: wake up discarded GPU textures
  useEffect(() => {
    const handleTabResume = () => {
      if (document.visibilityState === 'visible' && imgRef.current) {
        const img = imgRef.current;
        if (img.complete) {
          if (img.naturalWidth > 0) {
            setIsLoaded(true);
            // Re-decode to ensure texture is re-rasterized if GPU evicted it
            if (typeof img.decode === 'function') {
              img.decode().catch(() => {});
            }
          } else {
            // If texture was evicted and left in dead state, re-trigger
            if (retryCount < 2) {
              setRetryCount((prev) => prev + 1);
              const current = img.src;
              img.src = '';
              img.src = current;
            }
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleTabResume);
    window.addEventListener('pageshow', handleTabResume);
    window.addEventListener('focus', handleTabResume);

    return () => {
      document.removeEventListener('visibilitychange', handleTabResume);
      window.removeEventListener('pageshow', handleTabResume);
      window.removeEventListener('focus', handleTabResume);
    };
  }, [retryCount]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    if (imgRef.current && typeof imgRef.current.decode === 'function') {
      imgRef.current.decode().catch(() => {});
    }
  }, []);

  const handleError = useCallback(() => {
    if (retryCount < 2) {
      // Retry once before switching to fallback
      setRetryCount((prev) => prev + 1);
      setTimeout(() => {
        if (imgRef.current) {
          const baseSrc = imgSrc.split('?')[0];
          setImgSrc(`${baseSrc}?retry=${Date.now()}`);
        }
      }, 300);
      return;
    }

    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setRetryCount(0);
    } else {
      setHasError(true);
    }
  }, [fallbackSrc, imgSrc, retryCount]);

  const cornerClasses = {
    'bottom-right': 'bottom-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'top-right': 'top-3 right-3',
    'top-left': 'top-3 left-3',
  }[corner];

  return (
    <div
      className={`relative overflow-hidden group select-none bg-neutral-900 ${aspectRatio} ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {/* Subtle skeleton shimmer underneath until image is confirmed visible */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-neutral-800 animate-pulse pointer-events-none" 
          aria-hidden="true" 
        />
      )}

      {hasError ? (
        /* Neutral Branded Fallback Placeholder (Never a broken black void) */
        <div className="w-full h-full bg-[#1A1F26] flex flex-col items-center justify-center p-6 text-center text-neutral-300 relative border border-neutral-700/60">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#B62825] mb-2.5 border border-white/10 shadow-inner">
            <Box className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#B62825] mb-1">
            MSK LOGISTICS
          </span>
          <span className="text-xs sm:text-sm text-neutral-300 font-medium line-clamp-2 max-w-xs">
            {alt}
          </span>
          <span className="text-[10px] font-mono text-neutral-500 mt-2">
            JNPT CORRIDOR • NHAVA SHEVA
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setHasError(false);
              setRetryCount(0);
              setImgSrc(`${src}?manualRetry=${Date.now()}`);
            }}
            className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] font-mono text-white transition-colors cursor-pointer"
            aria-label="Retry loading image"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Retry Image</span>
          </button>
        </div>
      ) : (
        /* Underlying Image with Resilient Loading Lifecycle */
        <img
          ref={imgRef}
          src={imgSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ease-out group-hover:scale-[1.04] ${
            isLoaded ? 'opacity-100' : 'opacity-95'
          } ${imageClassName}`}
        />
      )}

      {/* MSK Logo Corner Watermark Tag Overlay (Only the actual MSK logo, no text overlays) */}
      {showBadge && !hasError && (
        <div
          className={`absolute ${cornerClasses} z-10 pointer-events-none select-none transition-opacity duration-200`}
          aria-hidden="true"
        >
          <div className="flex items-center bg-white/95 backdrop-blur-md px-2 py-1 rounded-md shadow-md border border-neutral-200/90">
            <img
              src="/images/logo/msk-logistics-logo.png"
              alt="MSK Logistics"
              className="h-4 sm:h-4.5 w-auto object-contain flex-shrink-0"
              width="42"
              height="20"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                // If logo itself fails, hide the badge quietly
                e.currentTarget.parentElement?.remove();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
