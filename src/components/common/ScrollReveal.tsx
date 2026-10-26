import React, { useEffect, useRef, useState } from 'react';

export type RevealDirection = 'left' | 'right' | 'up' | 'down' | 'none';

export interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  disabled?: boolean;
}

/**
 * Custom hook to trigger entrance animations when an element enters the viewport.
 * Automatically respects prefers-reduced-motion and gracefully falls back if
 * IntersectionObserver is unavailable.
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  once = true,
  disabled = false,
}: UseScrollRevealOptions = {}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (disabled) {
      setIsRevealed(true);
      return;
    }

    // SSR or no IntersectionObserver support fallback
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    // Immediate display if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsRevealed(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, disabled]);

  return { ref: elementRef, isRevealed };
}

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number; // Milliseconds
  duration?: number; // Milliseconds
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
 * scroll-triggered entrance animations.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 620,
  distance,
  distanceY,
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
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

  // Dynamic CSS variables for custom timing and distances
  const customStyles: React.CSSProperties = {
    ...(delay > 0 ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : {}),
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
