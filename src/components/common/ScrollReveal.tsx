import React, { useEffect, useRef, useState, useCallback } from 'react';

export type RevealDirection = 'left' | 'right' | 'up' | 'down' | 'zoom' | 'none';

export interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  disabled?: boolean;
  fallbackTimeoutMs?: number;
}

/**
 * Check if an element is currently within or above the active viewport.
 */
function isElementInOrAboveViewport(el: HTMLElement, marginPx: number = 60): boolean {
  if (typeof window === 'undefined') return true;
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  // Element is visible if its top is above the viewport bottom (with margin)
  // and its bottom is below the viewport top (has not scrolled completely out of sight upwards)
  return rect.top <= windowHeight + marginPx && rect.bottom >= -marginPx;
}

/**
 * Bulletproof hook to trigger entrance animations when an element enters the viewport.
 * 
 * Fixes for Blank Page / Tab-Switch Disappearance:
 * 1. Checks element bounding rect immediately on mount — elements in viewport reveal instantly.
 * 2. Fallback timeout guarantees no content is EVER left permanently hidden at opacity: 0.
 * 3. Listens to 'visibilitychange' and 'pageshow' to re-verify visibility when user returns to tab.
 * 4. Once revealed, elements stay revealed permanently (never revert to opacity: 0).
 * 5. Automatically respects prefers-reduced-motion and falls back if IntersectionObserver is missing.
 */
export function useScrollReveal({
  threshold = 0.05,
  rootMargin = '0px 0px 40px 0px',
  once = true,
  disabled = false,
  fallbackTimeoutMs = 1200,
}: UseScrollRevealOptions = {}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const reveal = useCallback(() => {
    setIsRevealed(true);
  }, []);

  useEffect(() => {
    if (disabled || isRevealed) {
      setIsRevealed(true);
      return;
    }

    // SSR or no IntersectionObserver support fallback
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    // Immediate display if user prefers reduced motion
    try {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setIsRevealed(true);
        return;
      }
    } catch {
      // Ignore matchMedia errors
    }

    const element = elementRef.current;
    if (!element) return;

    // 1. Immediate in-viewport geometry check on mount
    if (isElementInOrAboveViewport(element, 80)) {
      setIsRevealed(true);
      return;
    }

    // 2. Setup IntersectionObserver
    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              reveal();
              if (once && observer) {
                observer.unobserve(entry.target);
              }
              break;
            } else if (!once) {
              setIsRevealed(false);
            }
          }
        },
        {
          threshold,
          rootMargin,
        }
      );
      observer.observe(element);
    } catch {
      // If observer setup fails, reveal immediately
      setIsRevealed(true);
      return;
    }

    // 3. Fallback safety timer: guarantees element NEVER stays permanently hidden
    const safetyTimer = setTimeout(() => {
      if (elementRef.current && isElementInOrAboveViewport(elementRef.current, 200)) {
        reveal();
      }
    }, fallbackTimeoutMs);

    // 4. Tab resume / visibility listener: re-check when user returns to tab
    const handleResume = () => {
      if (document.visibilityState === 'visible' && elementRef.current) {
        if (isElementInOrAboveViewport(elementRef.current, 100)) {
          reveal();
        }
      }
    };

    document.addEventListener('visibilitychange', handleResume);
    window.addEventListener('pageshow', handleResume);
    window.addEventListener('focus', handleResume);

    return () => {
      clearTimeout(safetyTimer);
      if (observer) {
        observer.disconnect();
      }
      document.removeEventListener('visibilitychange', handleResume);
      window.removeEventListener('pageshow', handleResume);
      window.removeEventListener('focus', handleResume);
    };
  }, [threshold, rootMargin, once, disabled, isRevealed, reveal, fallbackTimeoutMs]);

  return { ref: elementRef, isRevealed };
}

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number; // Milliseconds
  duration?: number; // Milliseconds
  staggerIndex?: number; // Automatic staggered delay based on index
  distance?: number; // Horizontal offset in px
  distanceY?: number; // Vertical offset in px
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  as?: React.ElementType;
  className?: string;
}

/**
 * Reusable ScrollReveal component for smooth, hardware-accelerated
 * scroll-triggered entrance animations with permanent tab-recovery.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 620,
  staggerIndex,
  distance,
  distanceY,
  threshold = 0.05,
  rootMargin = '0px 0px 40px 0px',
  once = true,
  as: Component = 'div',
  className = '',
  style,
  ...rest
}) => {
  const { ref, isRevealed } = useScrollReveal({
    threshold,
    rootMargin,
    once,
  });

  const computedDelay = delay > 0 ? delay : (staggerIndex !== undefined ? (staggerIndex % 4) * 80 : 0);

  // Dynamic CSS variables for custom timing and distances
  const customStyles: React.CSSProperties = {
    ...(computedDelay > 0 ? ({ '--reveal-delay': `${computedDelay}ms` } as React.CSSProperties) : {}),
    ...(duration !== 620 ? ({ '--reveal-duration': `${duration}ms` } as React.CSSProperties) : {}),
    ...(distance !== undefined ? ({ '--reveal-dist-x': `${distance}px` } as React.CSSProperties) : {}),
    ...(distanceY !== undefined ? ({ '--reveal-dist-y': `${distanceY}px` } as React.CSSProperties) : {}),
    ...style,
  };

  const directionClass = `scroll-reveal-${direction}`;
  const revealedClass = isRevealed ? 'is-revealed' : '';

  return (
    <Component
      ref={ref as any}
      className={`scroll-reveal ${directionClass} ${revealedClass} ${className}`.trim()}
      style={customStyles}
      {...rest}
    >
      {children}
    </Component>
  );
};
