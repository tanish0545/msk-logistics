import React from 'react';
import { Bot } from 'lucide-react';

export interface OrbitLauncherProps {
  isOpen: boolean;
  onClick: () => void;
  unreadCount?: number;
}

export const OrbitLauncher: React.FC<OrbitLauncherProps> = ({
  isOpen,
  onClick,
  unreadCount = 0,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Minimize MSK ORBIT AI Assistant' : 'Open MSK ORBIT AI Assistant'}
      aria-expanded={isOpen}
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-300 ${isOpen
        ? 'scale-90 opacity-90'
        : 'hover:scale-105 active:scale-95'
        }`}
    >
      {/* STRICT: ONE CIRCULAR BUTTON ONLY — Concept 09 */}
      <div className="relative w-10 h-10 sm:w-15 sm:h-15 rounded-full bg-[#000000] border-2 border-[#B62825] flex flex-col items-center justify-center p-2 shadow-[0_8px_30px_rgba(0,0,0,0.85)] group-hover:shadow-[0_0_28px_rgba(182,40,37,0.65)] group-hover:border-red-500 transition-all duration-300 overflow-hidden cursor-pointer">

        {/* Subtle Ambient Radial Red Glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(182,40,37,0.4)_0%,transparent_75%)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Orbit Ring Background Graphic */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full text-white pointer-events-none transition-transform duration-700 group-hover:rotate-45"
          aria-hidden="true"
        >
          {/* First Elliptical Orbit Track */}
          <ellipse
            cx="24"
            cy="24"
            rx="21"
            ry="7.5"
            transform="rotate(-28 24 24)"
            stroke="#D9DEE5"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            strokeOpacity="0.4"
          />

          {/* Second Crossed Elliptical Orbit Track */}
          <ellipse
            cx="24"
            cy="24"
            rx="21"
            ry="7.5"
            transform="rotate(35 24 24)"
            stroke="#B62825"
            strokeWidth="1.4"
            strokeOpacity="0.85"
          />

          {/* Orbiting Satellite Particle */}
          <circle cx="41" cy="19" r="1.8" fill="#FFFFFF" className="animate-pulse" />
          <circle cx="8" cy="29" r="1.4" fill="#B62825" />
        </svg>

        {/* AI Robot Glyph inside */}
        <div className="relative z-10 flex flex-col items-center justify-center -space-y-0.5">
          <div className="w-8 h-8 rounded-full bg-[#B62825] text-white flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-[9px] font-heading font-black tracking-wider text-white uppercase mt-1 leading-none drop-shadow">
            MSK ORBIT
          </span>
        </div>

        {/* Availability Live Status Indicator (Top-Right Badge) */}
        <span className="absolute top-1 right-1 flex h-3.5 w-3.5 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-black" />
        </span>
      </div>

      {/* Unread badge count */}
      {unreadCount > 0 && !isOpen && (
        <span className="absolute -top-1 -left-1 px-2 py-0.5 rounded-full bg-[#B62825] text-white text-[10px] font-mono font-bold shadow-md animate-bounce z-30">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

