import React, { useEffect, useState, useRef } from 'react';

export interface AnimatedStatCounterProps {
  /** If single number */
  value?: number;
  /** If range start */
  rangeStart?: number;
  /** If range end */
  rangeEnd?: number;
  /** Duration in ms (default 1800ms) */
  duration?: number;
  /** Custom prefix e.g. "EST. " */
  prefix?: string;
  /** Custom suffix e.g. " TEUs" */
  suffix?: string;
  /** Custom separator for range (default "–") */
  rangeSeparator?: string;
  /** Additional styling class */
  className?: string;
}

/**
 * AnimatedStatCounter
 * 
 * Elegant number counter adhering strictly to MSK verified metrics:
 * - Animates once when entering viewport via IntersectionObserver
 * - Respects prefers-reduced-motion
 * - Decelerates smoothly with easeOutCubic
 * - Formats single integers or numeric ranges (e.g. 350–400)
 */
export const AnimatedStatCounter: React.FC<AnimatedStatCounterProps> = ({
  value,
  rangeStart,
  rangeEnd,
  duration = 1800,
  prefix = '',
  suffix = '',
  rangeSeparator = '–',
  className = '',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const isRange = typeof rangeStart === 'number' && typeof rangeEnd === 'number';
  const finalStart = isRange ? rangeStart : 0;
  const finalEnd = isRange ? rangeEnd : (value ?? 0);

  const [currentVal1, setCurrentVal1] = useState<number>(() => {
    // Check reduced motion initially if possible
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return finalStart;
    }
    return 0;
  });

  const [currentVal2, setCurrentVal2] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return finalEnd;
    }
    return 0;
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrentVal1(finalStart);
      setCurrentVal2(finalEnd);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();

          const startTime = performance.now();
          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);

            if (isRange) {
              const v1 = Math.round(finalStart * eased);
              const v2 = Math.round(finalEnd * eased);
              setCurrentVal1(v1);
              setCurrentVal2(v2);
            } else {
              const v = Math.round(finalEnd * eased);
              setCurrentVal2(v);
            }

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCurrentVal1(finalStart);
              setCurrentVal2(finalEnd);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, isRange, finalStart, finalEnd, duration]);

  return (
    <span ref={containerRef} className={`tabular-nums inline-block ${className}`}>
      {prefix}
      {isRange ? (
        <>
          <span>{currentVal1}</span>
          <span className="mx-0.5 opacity-80">{rangeSeparator}</span>
          <span>{currentVal2}</span>
        </>
      ) : (
        <span>{currentVal2}</span>
      )}
      {suffix}
    </span>
  );
};
