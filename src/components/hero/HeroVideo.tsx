import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, Globe, Box } from 'lucide-react';
import { CircularCertificationMark } from '../common/CircularCertificationMark';

interface VideoClip {
  id: string;
  src: string;
  poster: string;
  durationMs: number;
  label: string;
}

const HERO_FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Safe & Secure',
    subtitle: 'Cargo Handling',
  },
  {
    icon: Clock,
    title: 'On-Time',
    subtitle: 'Operations',
  },
  {
    icon: Globe,
    title: 'Global',
    subtitle: 'Connectivity',
  },
  {
    icon: Box,
    title: 'End-to-End',
    subtitle: 'Logistics Support',
  },
];

/**
 * Editorial Video Sequence for MSK Logistics Hero
 * 1. Opening: logistics-hero2-v2.mp4 (Ocean freight container vessel cruising into harbor at sunset)
 * 2. Cargo operations: logistics-hero1.mp4 (Reach stacker container handling & staging in container yard)
 * 3. Warehouse staging: logistics-hero3.mp4 (High-bay industrial warehousing & racked cargo facility)
 */
const VIDEO_SEQUENCE: VideoClip[] = [
  {
    id: 'ocean-port-hero2',
    src: '/videos/logistics-hero2-v2.mp4',
    poster: '/images/hero/hero-fullbleed-cinematic.webp',
    durationMs: 6200,
    label: 'Ocean Freight & Harbor Navigation',
  },
  {
    id: 'cargo-handling-hero1',
    src: '/videos/logistics-hero1.mp4',
    poster: '/images/hero/hero-fullbleed-cinematic.webp',
    durationMs: 5600,
    label: 'Container Stacking & Yard Handling',
  },
  {
    id: 'warehousing-hero3',
    src: '/videos/logistics-hero3.mp4',
    poster: '/images/hero/hero-fullbleed-cinematic.webp',
    durationMs: 5200,
    label: 'Industrial Warehousing & Staging',
  },
];

export const HeroVideo: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');
  const [slotAIndex, setSlotAIndex] = useState<number>(0);
  const [slotBIndex, setSlotBIndex] = useState<number>(1);
  const [videoError, setVideoError] = useState<boolean>(false);

  const heroRef = useRef<HTMLElement>(null);
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);

  // Detect prefers-reduced-motion and scroll progress
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    let ticking = false;
    let lastProgress = 0;
    const handleScroll = () => {
      if (motionQuery.matches) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroHeight = heroRef.current?.offsetHeight || 720;
          const currentY = window.scrollY;
          // When scrolled past the hero, avoid unnecessary state updates
          if (currentY > heroHeight && lastProgress === 1) {
            ticking = false;
            return;
          }
          const progress = Math.min(Math.max(currentY / heroHeight, 0), 1);
          if (progress !== lastProgress) {
            lastProgress = progress;
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', motionListener);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Video Sequence Playback Engine with Smooth Dual-Buffer Crossfades
  useEffect(() => {
    if (prefersReducedMotion || videoError) return;

    let switchTimeout: ReturnType<typeof setTimeout>;
    let prepTimeout: ReturnType<typeof setTimeout>;

    if (activeSlot === 'A') {
      const currentClip = VIDEO_SEQUENCE[slotAIndex];
      // Play Video A
      if (videoRefA.current && videoRefA.current.paused) {
        videoRefA.current.play().catch(() => { });
      }

      // Schedule transition to Video B
      switchTimeout = setTimeout(() => {
        // Start Video B playback
        if (videoRefB.current) {
          videoRefB.current.currentTime = 0;
          videoRefB.current.play().catch(() => { });
        }
        // Crossfade to B
        setActiveSlot('B');

        // After crossfade (1.2s), pause A and cue the next scene in slot A
        prepTimeout = setTimeout(() => {
          if (videoRefA.current) {
            videoRefA.current.pause();
          }
          const nextIndex = (slotBIndex + 1) % VIDEO_SEQUENCE.length;
          setSlotAIndex(nextIndex);
        }, 1200);
      }, currentClip.durationMs);
    } else {
      const currentClip = VIDEO_SEQUENCE[slotBIndex];
      // Play Video B
      if (videoRefB.current && videoRefB.current.paused) {
        videoRefB.current.play().catch(() => { });
      }

      // Schedule transition to Video A
      switchTimeout = setTimeout(() => {
        // Start Video A playback
        if (videoRefA.current) {
          videoRefA.current.currentTime = 0;
          videoRefA.current.play().catch(() => { });
        }
        // Crossfade to A
        setActiveSlot('A');

        // After crossfade (1.2s), pause B and cue the next scene in slot B
        prepTimeout = setTimeout(() => {
          if (videoRefB.current) {
            videoRefB.current.pause();
          }
          const nextIndex = (slotAIndex + 1) % VIDEO_SEQUENCE.length;
          setSlotBIndex(nextIndex);
        }, 1200);
      }, currentClip.durationMs);
    }

    return () => {
      clearTimeout(switchTimeout);
      clearTimeout(prepTimeout);
    };
  }, [activeSlot, slotAIndex, slotBIndex, prefersReducedMotion, videoError]);

  const typographyParallaxX = prefersReducedMotion ? 0 : scrollProgress * -25;
  const heroOpacity = prefersReducedMotion ? 1 : 1 - scrollProgress * 0.22;

  const clipA = VIDEO_SEQUENCE[slotAIndex];
  const clipB = VIDEO_SEQUENCE[slotBIndex];

  return (
    <section
      ref={heroRef}
      aria-label="MSK Logistics Industrial Export Solutions"
      className="relative w-full min-h-[640px] sm:min-h-[600px] lg:min-h-[660px] xl:min-h-[660px] 2xl:min-h-[700px] flex items-center bg-[#07080A] overflow-hidden border-b border-[#34343A]/80 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC VIDEO SEQUENCE BACKGROUND (Edge-to-Edge Full-Bleed)          */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">

        {/* Graceful Fallback Poster Image (Always Present Underneath Videos) */}
        <picture>
          <source srcSet="/images/hero/hero-fullbleed-cinematic.webp" type="image/webp" />
          <img
            src="/images/hero/hero-fullbleed-cinematic.png"
            alt="MSK Logistics Global Port & Intermodal Transport"
            className="w-full h-full object-cover object-[72%_center] sm:object-right-bottom lg:object-[82%_bottom]"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </picture>

        {/* Dual-Buffer Video Engine: Slot A */}
        {!prefersReducedMotion && (
          <video
            ref={videoRefA}
            key={clipA.id}
            src={clipA.src}
            poster={clipA.poster}
            muted
            autoPlay
            playsInline
            preload={activeSlot === 'A' ? 'auto' : 'metadata'}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-[72%_center] sm:object-center transition-opacity duration-1000 ease-in-out ${activeSlot === 'A' ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          />
        )}

        {/* Dual-Buffer Video Engine: Slot B */}
        {!prefersReducedMotion && (
          <video
            ref={videoRefB}
            key={clipB.id}
            src={clipB.src}
            poster={clipB.poster}
            muted
            playsInline
            preload={activeSlot === 'B' ? 'auto' : 'metadata'}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-[72%_center] sm:object-center transition-opacity duration-1000 ease-in-out ${activeSlot === 'B' ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
          />
        )}

        {/* Desktop Left-to-Right Protective Obsidian Gradient */}
        <div
          className="hidden lg:block absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, #07080A 0%, rgba(7,8,10,0.92) 28%, rgba(7,8,10,0.72) 48%, rgba(7,8,10,0.28) 68%, transparent 100%)',
          }}
        />

        {/* Mobile Full Ambient Darkening Overlay (Full-Bleed Behind Text) */}
        <div
          className="lg:hidden absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,8,10,0.88) 0%, rgba(7,8,10,0.78) 45%, rgba(7,8,10,0.88) 100%)',
          }}
        />

        {/* Bottom Smooth Transition to Road / Next Website Section */}
        <div
          className="absolute bottom-0 inset-x-0 h-16 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #07080A 0%, rgba(7,8,10,0.6) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* World Map with Subtle Global Route Connections */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-15"
        aria-hidden="true"
      >
        <svg className="w-full h-full object-cover" viewBox="0 0 1600 800" fill="none" preserveAspectRatio="xMidYMid slice">
          <path d="M 220 220 Q 320 200 420 240 Q 480 320 420 420 Q 340 480 260 400 Z" fill="#AEB6C2" opacity="0.15" />
          <path d="M 320 440 Q 380 440 420 520 Q 380 680 320 720 Q 280 620 290 520 Z" fill="#AEB6C2" opacity="0.12" />
          <path d="M 720 180 Q 860 160 920 240 Q 880 320 780 320 Q 720 260 720 180 Z" fill="#AEB6C2" opacity="0.14" />
          <path d="M 760 340 Q 880 340 920 440 Q 880 620 800 660 Q 740 540 760 340 Z" fill="#AEB6C2" opacity="0.12" />
          <path d="M 940 180 Q 1280 160 1360 320 Q 1280 480 1100 460 Q 980 340 940 180 Z" fill="#AEB6C2" opacity="0.16" />
          <path d="M 1240 520 Q 1380 500 1420 600 Q 1340 680 1240 640 Z" fill="#AEB6C2" opacity="0.12" />

          {/* Global Shipping & Air Routes radiating from Nhava Sheva / Mumbai Hub */}
          <path d="M 980 380 Q 880 280 780 240" stroke="#B62825" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.5" />
          <path d="M 980 380 Q 930 350 890 340" stroke="#B62825" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.5" />
          <path d="M 980 380 Q 1070 430 1180 430" stroke="#B62825" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.5" />
          <path d="M 980 380 Q 700 240 420 270" stroke="#B62825" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.4" />

          {/* Port Nodes */}
          <circle cx="980" cy="380" r="4" fill="#B62825" />
          <circle cx="980" cy="380" r="9" stroke="#B62825" strokeWidth="1" opacity="0.6" className="animate-ping" />
          <circle cx="780" cy="240" r="2.5" fill="#D9DEE5" opacity="0.7" />
          <circle cx="890" cy="340" r="2.5" fill="#D9DEE5" opacity="0.7" />
          <circle cx="1180" cy="430" r="2.5" fill="#D9DEE5" opacity="0.7" />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 2. GIANT BACKGROUND TYPOGRAPHY — MSK + LOGISTICS                          */}
      {/* Oversized Layered Typography: MSK (Crimson) stacked above LOGISTICS (Silver) */}
      {/* ========================================================================= */}
      <div
        className="absolute top-[2%] sm:top-[3%] lg:top-[4%] right-[-1%] sm:right-[1%] lg:right-[2%] xl:right-[3%] z-10 pointer-events-none select-none overflow-hidden max-w-[96vw] lg:max-w-[72vw]"
        style={{
          transform: `translate3d(${typographyParallaxX}px, 0, 0)`,
          transition: 'transform 0.1s linear',
        }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-start leading-[0.74] sm:leading-[0.76]">
          {/* 1. Giant MSK (Oversized in MSK Crimson Red #B62825) */}
          <span className="font-heading font-black tracking-tight text-[15vw] sm:text-[13vw] lg:text-[10vw] xl:text-[145px] 2xl:text-[165px] uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#B62825]/[0.45] via-[#B62825]/[0.22] to-transparent drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] select-none">
            MSK
          </span>

          {/* 2. Giant LOGISTICS (Oversized in Translucent Silver / Graphite) */}
          <div className="flex items-baseline gap-2.5 sm:gap-4 -mt-[1.5vw] sm:-mt-[1vw]">
            <span className="font-heading font-black tracking-tight text-[15vw] sm:text-[13vw] lg:text-[10vw] xl:text-[145px] 2xl:text-[165px] uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#F4F5F7]/[0.24] via-[#D9DEE5]/[0.10] to-transparent drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] select-none">
              LOGISTICS
            </span>
            <span className="hidden sm:inline-block w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#B62825] shadow-[0_0_12px_rgba(182,40,37,0.95)] shrink-0 self-center opacity-70" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FOREGROUND EDITORIAL CONTENT CONTAINER                                 */}
      {/* ========================================================================= */}
      <div
        className="relative z-20 max-w-[1620px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-7 sm:pt-9 lg:pt-10 xl:pt-12 pb-24 sm:pb-9 lg:pb-10 xl:pb-12 w-full transition-opacity duration-200"
        style={{ opacity: heroOpacity }}
      >
        <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-[620px] space-y-4 xl:space-y-5">

          {/* Main Headline with Deliberate Line Breaks (First Prominent Text Element) */}
          <h1 className="animate-hero-entrance text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.8rem] font-bold text-[#F4F5F7] tracking-tight leading-[1.06] font-heading">
            Export Packing.<br />
            Container Stuffing.<br />
            <span className="text-[#B62825] drop-shadow-[0_2px_16px_rgba(182,40,37,0.4)]">
              Cargo Securing.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="animate-hero-entrance hero-delay-1 text-[14px] sm:text-base lg:text-[17px] text-[#AEB6C2] leading-relaxed max-w-xl font-body">
            Reliable export packing solutions designed around your cargo, container arrangements, and shipment requirements.
          </p>

          {/* Action CTAs */}
          <div className="animate-hero-entrance hero-delay-2 pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Primary CTA: Request a Quote */}
            <Link
              to="/request-quote"
              className="group relative inline-flex items-center justify-center gap-2.5 py-3.5 px-7 rounded-md text-[15px] font-semibold text-white bg-[#B62825] hover:bg-[#9E2220] transition-all duration-200 shadow-lg shadow-[#B62825]/30 hover:shadow-xl hover:shadow-[#B62825]/45 active:scale-[0.98] border border-[#B62825] shrink-0"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-1.5" />
            </Link>

            {/* Secondary CTA: Explore Our Services */}
            <Link
              to="/services"
              className="group relative inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-md text-[15px] font-medium text-[#F4F5F7] bg-[#161820]/90 hover:bg-[#20232D] backdrop-blur-md border border-[#34343A] hover:border-[#D9DEE5]/60 transition-all duration-200 active:scale-[0.98] shrink-0"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 text-[#D9DEE5] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Four Refined Industrial Feature Cards in 2x2 Grid */}
          <div className="animate-hero-entrance hero-delay-3 pt-2 sm:pt-3 grid grid-cols-1 min-[380px]:grid-cols-2 gap-2.5 sm:gap-3 max-w-xl">
            {HERO_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative flex items-center gap-3 p-3 sm:py-3.5 sm:px-4 rounded-xl bg-[#0F1118]/75 hover:bg-[#151824]/90 backdrop-blur-md border border-white/[0.08] hover:border-[#B62825]/45 transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.35)]"
                >
                  {/* Clean Inset Icon Container with restrained MSK Crimson Accent */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#181B26] border border-white/[0.08] flex items-center justify-center text-[#D9DEE5] group-hover:text-[#B62825] group-hover:border-[#B62825]/40 transition-colors shrink-0">
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>

                  {/* Title & Subtitle Hierarchy */}
                  <div className="flex flex-col justify-center leading-snug min-w-0">
                    <span className="text-[13px] sm:text-[13.5px] font-bold text-[#F4F5F7] font-heading tracking-tight truncate">
                      {feature.title}
                    </span>
                    <span className="text-[11px] sm:text-[11.5px] text-[#94A3B8] font-body truncate">
                      {feature.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MINIMAL CIRCULAR CERTIFICATION MARK (Bottom-Right Corner)               */}
      {/* SVG + CSS rotating outer assembly (25s) with stationary ISO 9001:2015 text */}
      {/* ========================================================================= */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-10 xl:right-12 z-30 select-none pointer-events-auto">
        <CircularCertificationMark />
      </div>

      {/* ========================================================================= */}
      {/* 5. SCROLL-DRIVEN HERO CONNECTOR & TRANSFORMATION ACCENT                   */}
      {/* ========================================================================= */}

      {/* Delicate Metallic Titanium Hairline Accent along the bottom border */}
      <div
        className="absolute bottom-0 inset-x-0 h-[1px] pointer-events-none bg-gradient-to-r from-transparent via-[#D9DEE5]/25 to-transparent z-20"
        aria-hidden="true"
      />

      {/* Scroll Indicator Pill */}
      <div
        className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none select-none transition-all duration-300"
        style={{ opacity: Math.max(1 - scrollProgress * 2.5, 0) }}
        aria-hidden="true"
      >
        <div className="w-5 h-7 rounded-full border border-[#D9DEE5]/30 flex items-start justify-center p-1 bg-[#34343A]/40 backdrop-blur-xs shadow-xs">
          <div className="w-1 h-2 rounded-full bg-[#B62825] animate-bounce" />
        </div>
        <span className="text-[9px] font-mono-code uppercase tracking-[0.2em] text-[#AEB6C2]/70 font-semibold">
          Scroll
        </span>
      </div>
    </section>
  );
};
