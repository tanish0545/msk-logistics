import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface HeroVideoClip {
  readonly src: string;
  readonly label: string;
  readonly description: string;
}

/**
 * EXACT SEQUENCE REQUIRED BY CLIENT:
 * 1. logistics-hero2.mp4 (Heavy operations / yard staging)
 * 2. logistics-hero1.mp4 (Container stuffing & packing prep)
 * 3. logistics-hero3.mp4 (Cargo securing & lashing operations)
 * Then repeats indefinitely starting back at logistics-hero2.mp4.
 *
 * NOTE: Strictly preserved in this exact order. Not sorted alphabetically.
 */
export const HERO_VIDEO_SEQUENCE: readonly HeroVideoClip[] = [
  {
    src: '/videos/logistics-hero2-v2.mp4',
    label: 'Clip 01',
    description: 'Heavy machinery and container yard staging operations',
  },
  {
    src: '/videos/logistics-hero1.mp4',
    label: 'Clip 02',
    description: 'Export packaging and container stuffing preparation',
  },
  {
    src: '/videos/logistics-hero3.mp4',
    label: 'Clip 03',
    description: 'Maritime cargo lashing and transport securing',
  },
] as const;

interface HeroVideoSequenceProps {
  posterSrc?: string;
  className?: string;
  showSequenceIndicator?: boolean;
}

export const HeroVideoSequence: React.FC<HeroVideoSequenceProps> = ({
  posterSrc = '/images/general/logistics-hero-poster.webp',
  className = '',
  showSequenceIndicator = true,
}) => {
  // Current clip index in HERO_VIDEO_SEQUENCE (0 -> 1 -> 2 -> 0 ...)
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Active slot ('A' or 'B') for seamless dual-buffer crossfade without flashes
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');

  // Video source assigned to each slot
  const [slotASrc, setSlotASrc] = useState<string>(HERO_VIDEO_SEQUENCE[0].src);
  const [slotBSrc, setSlotBSrc] = useState<string>(HERO_VIDEO_SEQUENCE[1].src);

  // State flags for smooth poster crossfade and error resilience
  const [firstVideoReady, setFirstVideoReady] = useState<boolean>(false);
  const [hasPlaybackError, setHasPlaybackError] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Video element references
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);

  // Guard against unmounted state updates or rapid multi-triggers
  const isTransitioningRef = useRef<boolean>(false);

  // 1. Accessibility: Detect user's reduced-motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // 2. Advance to next video in sequence
  const advanceToNext = useCallback(() => {
    if (isTransitioningRef.current || prefersReducedMotion) return;
    isTransitioningRef.current = true;

    const nextIndex = (currentIndex + 1) % HERO_VIDEO_SEQUENCE.length;
    const incomingSlot = activeSlot === 'A' ? 'B' : 'A';
    const upcomingIndex = (nextIndex + 1) % HERO_VIDEO_SEQUENCE.length;

    const incomingVideo = incomingSlot === 'B' ? videoBRef.current : videoARef.current;
    const outgoingVideo = incomingSlot === 'B' ? videoARef.current : videoBRef.current;

    if (incomingVideo) {
      // Play incoming video
      const playPromise = incomingVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Swap active slot to trigger crossfade
            setActiveSlot(incomingSlot);
            setCurrentIndex(nextIndex);
            setHasPlaybackError(false);
            setFirstVideoReady(true);

            // Pause and reset outgoing video
            if (outgoingVideo) {
              setTimeout(() => {
                outgoingVideo.pause();
                outgoingVideo.currentTime = 0;
                // Preload the clip that will play after the incoming one
                if (incomingSlot === 'B') {
                  setSlotASrc(HERO_VIDEO_SEQUENCE[upcomingIndex].src);
                } else {
                  setSlotBSrc(HERO_VIDEO_SEQUENCE[upcomingIndex].src);
                }
                isTransitioningRef.current = false;
              }, 400);
            } else {
              isTransitioningRef.current = false;
            }
          })
          .catch((err) => {
            // If browser blocks playback or fails
            console.warn('Hero video sequence transition notice:', err);
            isTransitioningRef.current = false;
          });
      }
    } else {
      isTransitioningRef.current = false;
    }
  }, [activeSlot, currentIndex, prefersReducedMotion]);

  // 3. Initial autoplay on mount (Slot A starts with Clip 0: logistics-hero2-v2.mp4)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const initialVideo = videoARef.current;
    if (initialVideo) {
      initialVideo.currentTime = 0;
      const playPromise = initialVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setFirstVideoReady(true);
            setHasPlaybackError(false);
          })
          .catch(() => {
            // Autoplay might be restricted on mobile until interaction
            // Poster remains visible underneath
          });
      }
    }
  }, [prefersReducedMotion]);

  // 4. Handle visibility change (pause when tab hidden, resume when visible)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden || prefersReducedMotion) {
        videoARef.current?.pause();
        videoBRef.current?.pause();
      } else {
        const activeVideo = activeSlot === 'A' ? videoARef.current : videoBRef.current;
        activeVideo?.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [activeSlot, prefersReducedMotion]);

  const handleVideoAError = () => {
    // If slot A fails, try advancing to slot B
    if (activeSlot === 'A') {
      advanceToNext();
    }
  };

  const handleVideoBError = () => {
    // If slot B fails, try advancing to slot A
    if (activeSlot === 'B') {
      advanceToNext();
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#222222] ${className}`}>
      {/* 1. Static Poster Image (Always present underneath as guaranteed fallback) */}
      <img
        src={posterSrc}
        alt="Container terminal and export staging operations at MSK Logistics"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          firstVideoReady && !hasPlaybackError && !prefersReducedMotion
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100'
        }`}
        loading="eager"
      />

      {/* 2. Video Slot A */}
      {!prefersReducedMotion && (
        <video
          ref={videoARef}
          src={slotASrc}
          autoPlay
          muted
          playsInline
          loop={false}
          preload="auto"
          onEnded={advanceToNext}
          onCanPlay={() => {
            setFirstVideoReady(true);
            setHasPlaybackError(false);
          }}
          onError={handleVideoAError}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            activeSlot === 'A' && firstVideoReady && !hasPlaybackError
              ? 'opacity-100 z-10'
              : 'opacity-0 z-0 pointer-events-none'
          }`}
          aria-hidden="true"
        />
      )}

      {/* 3. Video Slot B (Alternating buffer for zero-gap crossfade) */}
      {!prefersReducedMotion && (
        <video
          ref={videoBRef}
          src={slotBSrc}
          muted
          playsInline
          loop={false}
          preload="metadata"
          onEnded={advanceToNext}
          onCanPlay={() => {
            setFirstVideoReady(true);
            setHasPlaybackError(false);
          }}
          onError={handleVideoBError}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            activeSlot === 'B' && !hasPlaybackError
              ? 'opacity-100 z-10'
              : 'opacity-0 z-0 pointer-events-none'
          }`}
          aria-hidden="true"
        />
      )}

      {/* 4. Industrial Legibility Overlays (Preserve text readability over any video frame) */}
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#222222]/95 via-[#343434]/80 to-[#222222]/65 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-black/40 pointer-events-none" />

      {/* 5. Subtle Technical Grid Overlay */}
      <div
        className="absolute inset-0 z-20 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* 6. Subtle Sequence Indicator (Bottom Right) */}
      {showSequenceIndicator && !prefersReducedMotion && (
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-mono-code text-white/80 pointer-events-none select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B62825] animate-pulse" />
          <span className="text-white font-bold">{currentIndex + 1}</span>
          <span className="text-white/40">/</span>
          <span>{HERO_VIDEO_SEQUENCE.length}</span>
          <span className="text-white/60 hidden md:inline ml-1 border-l border-white/20 pl-2">
            {HERO_VIDEO_SEQUENCE[currentIndex].description}
          </span>
        </div>
      )}
    </div>
  );
};
