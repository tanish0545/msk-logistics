import React, { useRef, useState, useEffect } from 'react';

interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxPull?: number;
}

/**
 * MagneticButton: Adds subtle, restrained magnetic pointer tracking (3-5px max)
 * exclusively on desktop fine-pointer devices with hover capability.
 * Safely disables on touch devices, mobile screens, and prefers-reduced-motion.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  maxPull = 4,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on desktop pointer with fine resolution and no reduced motion
    const hoverMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateSupport = () => {
      setIsSupported(hoverMedia.matches && !motionMedia.matches);
    };

    updateSupport();

    hoverMedia.addEventListener?.('change', updateSupport);
    motionMedia.addEventListener?.('change', updateSupport);

    return () => {
      hoverMedia.removeEventListener?.('change', updateSupport);
      motionMedia.removeEventListener?.('change', updateSupport);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSupported || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Limit maximum pull to restrained 3-5px
    const clampedX = Math.max(-1, Math.min(1, deltaX)) * maxPull;
    const clampedY = Math.max(-1, Math.min(1, deltaY)) * maxPull;

    setOffset({ x: clampedX, y: clampedY });
  };

  const handleMouseEnter = () => {
    if (!isSupported) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isSupported) return;
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: isSupported && isHovered
          ? `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)`
          : 'translate3d(0, 0, 0)',
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isHovered ? 'transform' : 'auto',
      }}
      {...props}
    >
      {children}
    </div>
  );
};
