import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * RouteProgressIndicator
 * 
 * Cinematic 2.5px MSK-Red progress indicator line across the viewport top.
 * Triggers on route changes with high-velocity ease and specular neon head glow,
 * then cleanly fades out. Zero layout disruption, zero blocking.
 */
export const RouteProgressIndicator: React.FC = () => {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const isFirstRender = useRef(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Avoid running on the very first mount if desired, or run a fast splash
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    // Start progress
    setVisible(true);
    setProgress(20);

    const t1 = setTimeout(() => {
      setProgress(68);
    }, 120);

    const t2 = setTimeout(() => {
      setProgress(95);
    }, 240);

    const t3 = setTimeout(() => {
      setProgress(100);
    }, 360);

    const t4 = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 560);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[2.5px] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="h-full bg-gradient-to-r from-[#8B1A17] via-[#B62825] to-[#E53E3E] transition-all duration-200 ease-out relative"
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(182, 40, 37, 0.7), 0 0 4px rgba(255, 100, 100, 0.9)',
        }}
      >
        {/* Specular head point */}
        <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/60 blur-[1px]" />
      </div>
    </div>
  );
};

