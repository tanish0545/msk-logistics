import React, { useEffect, useState, useRef } from 'react';

// The 5-stage logistics sequence requested
type VehicleType = 'ship' | 'plane' | 'truck' | 'train' | 'container';

const VEHICLES: VehicleType[] = ['ship', 'plane', 'truck', 'train', 'container'];

export const RotatingLogisticsCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [vehicleIndex, setVehicleIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const currentVehicle = VEHICLES[vehicleIndex];
  const posRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for pointer: fine (desktop mice) and not reduced motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(() => {
          setPos({ x: posRef.current.x, y: posRef.current.y });
          animFrameRef.current = null;
        });
      }

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = !!target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer');
        setIsHoveringInteractive(interactive);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Rotate vehicle every 10 seconds
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setVehicleIndex((prev) => (prev + 1) % VEHICLES.length);
        setIsTransitioning(false);
      }, 300);
    }, 10000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearInterval(interval);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  if (!enabled) return null;

  // Custom refined vector icons for each logistics mode
  const renderIcon = () => {
    switch (currentVehicle) {
      case 'ship':
        // Cargo Container Vessel
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white stroke-[1.8]">
            <path d="M2 19c2 1 4 1 6 0 2-1 4-1 6 0 2 1 4 1 6 0" stroke="#B62825" strokeLinecap="round" />
            <path d="M3 16l2-8h14l2 8H3z" stroke="currentColor" fill="rgba(0,0,0,0.6)" strokeLinejoin="round" />
            <path d="M7 8V4h3v4M14 8V4h3v4" stroke="#D9DEE5" />
            <path d="M10 3h4v2h-4z" fill="#B62825" />
          </svg>
        );
      case 'plane':
        // Freight Aeroplane
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white stroke-[1.8]">
            <path d="M12 2l2 7h6l-4 3 2 8-6-4-6 4 2-8-4-3h6l2-7z" stroke="currentColor" fill="rgba(0,0,0,0.6)" strokeLinejoin="round" />
            <circle cx="12" cy="11" r="1.5" fill="#B62825" />
          </svg>
        );
      case 'truck':
        // Container Freight Truck
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white stroke-[1.8]">
            <rect x="2" y="6" width="13" height="10" rx="1" stroke="currentColor" fill="rgba(0,0,0,0.6)" />
            <path d="M15 9h4l3 3v4h-7V9z" stroke="currentColor" fill="rgba(182,40,37,0.3)" />
            <circle cx="6" cy="18" r="2" stroke="#D9DEE5" fill="#B62825" />
            <circle cx="18" cy="18" r="2" stroke="#D9DEE5" fill="#B62825" />
            <path d="M5 9v4M9 9v4" stroke="#B62825" strokeWidth="1.2" />
          </svg>
        );
      case 'train':
        // Freight Train / Intermodal Locomotive
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white stroke-[1.8]">
            <rect x="4" y="3" width="16" height="15" rx="2" stroke="currentColor" fill="rgba(0,0,0,0.6)" />
            <path d="M4 11h16" stroke="#B62825" />
            <circle cx="8" cy="15" r="1.5" fill="#FFFFFF" />
            <circle cx="16" cy="15" r="1.5" fill="#FFFFFF" />
            <path d="M2 20l3-2h14l3 2M9 18v2M15 18v2" stroke="#D9DEE5" strokeLinecap="round" />
          </svg>
        );
      case 'container':
        // Shipping ISO Container
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white stroke-[1.8]">
            <rect x="2" y="5" width="20" height="14" rx="1.5" stroke="currentColor" fill="rgba(0,0,0,0.6)" />
            <line x1="6" y1="5" x2="6" y2="19" stroke="#B62825" />
            <line x1="10" y1="5" x2="10" y2="19" stroke="#D9DEE5" />
            <line x1="14" y1="5" x2="14" y2="19" stroke="#D9DEE5" />
            <line x1="18" y1="5" x2="18" y2="19" stroke="#B62825" />
            <circle cx="20" cy="12" r="1" fill="#B62825" />
          </svg>
        );
    }
  };

  return (
    <div
      className="pointer-events-none fixed z-[9999] transition-transform duration-75 ease-out select-none will-change-transform"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    >
      {/* Target Aim Point */}
      <div
        className={`relative flex items-center justify-center transition-all duration-300 ${
          isHoveringInteractive ? 'scale-110' : 'scale-95'
        }`}
      >
        {/* Outer Orbit Halo */}
        <div
          className={`absolute rounded-full border border-white/20 transition-all duration-300 ${
            isHoveringInteractive
              ? 'w-10 h-10 border-[#B62825]/70 bg-black/70 shadow-[0_0_14px_rgba(182,40,37,0.4)]'
              : 'w-8 h-8 bg-black/60 shadow-[0_2px_8px_rgba(0,0,0,0.6)]'
          }`}
        />

        {/* Small MSK Red Waypoint Pulse Center */}
        <span
          className={`absolute w-1.5 h-1.5 rounded-full bg-[#B62825] shadow-[0_0_6px_#B62825] transition-opacity duration-200 ${
            isHoveringInteractive ? 'opacity-100 scale-125' : 'opacity-80'
          }`}
        />

        {/* Icon Floating Badge attached to cursor */}
        <div
          className={`relative z-10 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-75 rotate-12' : 'opacity-100 scale-100 rotate-0'
          }`}
        >
          {renderIcon()}
        </div>

        {/* Micro Tag Label on hover */}
        {isHoveringInteractive && (
          <span className="absolute left-6 top-4 px-1.5 py-0.5 rounded bg-black/90 border border-white/20 text-[9px] font-mono font-bold text-[#D9DEE5] tracking-wider uppercase whitespace-nowrap shadow-md">
            {currentVehicle}
          </span>
        )}
      </div>
    </div>
  );
};

