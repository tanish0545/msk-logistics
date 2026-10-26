import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Ship, Calendar, Clock, Anchor } from 'lucide-react';
import { VESSEL_SCHEDULE_CONFIG } from '../components/navigation/navConfig';

export const VesselSchedulePage: React.FC = () => {
  const trackingUrl = VESSEL_SCHEDULE_CONFIG.externalUrl || 'https://www.marinetraffic.com/';

  return (
    <div className="space-y-0 bg-white">
      {/* 1. Page Header — Clean, Modern & Action-Oriented */}
      <section className="bg-[#173F70] text-white py-14 sm:py-16 border-b border-[#0F2D52] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#173F70] via-[#1A457D] to-[#173F70] opacity-95 pointer-events-none" 
          aria-hidden="true" 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-5 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="editorial-badge bg-white/10 text-white border-white/20">
              PORT TERMINAL COORDINATION
            </span>
            <span className="text-xs font-mono text-blue-200">
              NHAVA SHEVA (JNPT) • PORT CODE: INNSA
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight">
            Vessel Schedule & Cut-Off Coordination
          </h1>

          <p className="text-blue-100 text-[15px] sm:text-[17px] max-w-3xl font-body leading-relaxed">
            Coordinating export packaging, container stuffing, and dynamic cargo securing to align seamlessly with carrier gate-in windows and vessel cut-off dates at Nhava Sheva (JNPT).
          </p>

          {/* Prominent MarineTraffic Track a Vessel CTA in Hero */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#B62825] hover:bg-[#9E2220] text-white font-nav text-[15px] font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B62825] self-start"
              aria-label="Track a Vessel on MarineTraffic (opens in a new tab)"
            >
              <span>Track a Vessel</span>
              <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <p className="text-xs sm:text-sm text-blue-100/90 font-body flex items-center gap-2">
              <Ship className="w-4 h-4 text-blue-300 shrink-0" />
              <span>Track vessel movements and view maritime traffic on MarineTraffic.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Customer-Facing Clean Tracking Section */}
      <section className="bg-[#F8FAFC] border-b border-[#E2E8F0] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#B62825]">
                <Ship className="w-4 h-4" />
                <span>LIVE MARITIME RADAR & AIS TRACKING</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#1E293B]">
                Live Vessel Movements & Schedules
              </h2>
              <p className="text-[15px] text-[#475569] leading-relaxed">
                Track vessel movements and view maritime traffic on MarineTraffic. Review real-time AIS vessel coordinates, port arrivals, departures, and estimated berthing timetables worldwide before dispatching export cargo.
              </p>
              <p className="text-xs text-[#64748B] pt-1">
                Notice: Live AIS vessel tracking and maritime radar data are provided by the external MarineTraffic platform.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col items-start md:items-end gap-2">
              <a
                href={trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm sm:text-base py-3.5 px-7 inline-flex items-center gap-2.5 shadow-md whitespace-nowrap group hover:bg-[#9E2220] transition-all"
              >
                <span>Track a Vessel</span>
                <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="text-[12px] text-[#64748B]">Opens MarineTraffic in new window</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Operational Timeline: How We Align Operations */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="space-y-3 max-w-3xl">
            <span className="editorial-badge bg-[#F5F5F3] text-[#B62825] border-red-200">
              CUT-OFF SYNCHRONIZATION
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#173F70]">
              Aligning Packaging & Stuffing with Port Deadlines
            </h2>
            <p className="text-[15px] sm:text-base text-[#64748B] leading-relaxed">
              Missing a vessel cut-off leads to costly roll-overs and storage fees. Our operations desk plans backwards from your shipping line's published Port Gate Cut-off to guarantee on-time terminal gate-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 hover:border-[#173F70]/30 transition-colors">
              <span className="text-xs font-mono font-bold text-[#B62825]">STAGE 01</span>
              <h3 className="font-bold text-[#1E293B] text-base flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#173F70]" />
                <span>Booking & Empty Positioning</span>
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Confirm shipping line booking, container release order (CRO), and arrange empty container positioning at our staging yard or client premises.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 hover:border-[#173F70]/30 transition-colors">
              <span className="text-xs font-mono font-bold text-[#B62825]">STAGE 02</span>
              <h3 className="font-bold text-[#1E293B] text-base flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#173F70]" />
                <span>Packaging & Stuffing Window</span>
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Execute crating, multi-layer foil wrapping, and sequential stuffing typically 24 to 48 hours prior to the terminal gate-in deadline.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 hover:border-[#173F70]/30 transition-colors">
              <span className="text-xs font-mono font-bold text-[#B62825]">STAGE 03</span>
              <h3 className="font-bold text-[#1E293B] text-base flex items-center gap-1.5">
                <Anchor className="w-4 h-4 text-[#173F70]" />
                <span>Cargo Lashing & Inspection</span>
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Install certified ratchet straps, wire ropes, and timber chocking. Perform tension audits and client photo-documentation before sealing.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 hover:border-[#173F70]/30 transition-colors">
              <span className="text-xs font-mono font-bold text-[#B62825]">STAGE 04</span>
              <h3 className="font-bold text-[#1E293B] text-base flex items-center gap-1.5">
                <Ship className="w-4 h-4 text-[#173F70]" />
                <span>Terminal Gate-In Dispatch</span>
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Release container trailer for terminal gate entry at JNPT within official gate opening hours, preventing early-entry charges or missed sailings.
              </p>
            </div>
          </div>

          {/* Major Terminals Directory */}
          <div className="space-y-6 pt-6 border-t border-[#E2E2E2]">
            <div>
              <h3 className="text-xl font-bold font-heading text-[#1E293B]">
                Major Nhava Sheva (JNPT) Container Terminals
              </h3>
              <p className="text-sm text-[#64748B] mt-1">
                For live vessel schedules and gate opening times, consult the official terminal portals or your shipping line agent:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-1.5 shadow-xs">
                <span className="font-bold text-sm text-[#173F70]">APM Terminals Mumbai (GTI)</span>
                <p className="text-xs text-[#64748B]">Gateway Terminals India (Berths 1 & 2)</p>
                <div className="text-[11px] font-mono text-[#52627A]">Port Code: INNSA</div>
              </div>

              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-1.5 shadow-xs">
                <span className="font-bold text-sm text-[#173F70]">DP World Nhava Sheva</span>
                <p className="text-xs text-[#64748B]">NSICT & NSIGT Terminals</p>
                <div className="text-[11px] font-mono text-[#52627A]">Port Code: INNSA</div>
              </div>

              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-1.5 shadow-xs">
                <span className="font-bold text-sm text-[#173F70]">BMCT (PSA Mumbai)</span>
                <p className="text-xs text-[#64748B]">Bharat Mumbai Container Terminals</p>
                <div className="text-[11px] font-mono text-[#52627A]">Port Code: INNSA</div>
              </div>

              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white space-y-1.5 shadow-xs">
                <span className="font-bold text-sm text-[#173F70]">JNPCT</span>
                <p className="text-xs text-[#64748B]">Jawaharlal Nehru Port Container Terminal</p>
                <div className="text-[11px] font-mono text-[#52627A]">Port Code: INNSA</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#1E293B]">
                Have an Upcoming Vessel Cut-Off Date?
              </h4>
              <p className="text-sm text-[#64748B]">
                Share your scheduled sailing date and cargo specifications for prioritized stuffing and securing coordination.
              </p>
            </div>
            <Link to="/request-quote" className="btn-primary text-sm py-3 px-6 whitespace-nowrap">
              <span>Schedule Stuffing for Vessel</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
