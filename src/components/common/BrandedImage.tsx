import React, { useState } from 'react';
import { Box } from 'lucide-react';

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
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  // Sync if src changes
  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  const cornerClasses = {
    'bottom-right': 'bottom-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'top-right': 'top-3 right-3',
    'top-left': 'top-3 left-3',
  }[corner];

  return (
    <div
      className={`relative overflow-hidden group select-none ${aspectRatio} ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {hasError ? (
        /* Neutral Branded Placeholder */
        <div className="w-full h-full bg-[#1E242D] flex flex-col items-center justify-center p-6 text-center text-neutral-300 relative border border-neutral-700">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#B62825] mb-3 border border-white/10 shadow-inner">
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
        </div>
      ) : (
        /* Underlying Image */
        <img
          src={imgSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={handleError}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${imageClassName}`}
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
