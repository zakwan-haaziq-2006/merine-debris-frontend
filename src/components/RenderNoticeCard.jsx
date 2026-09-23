import React from 'react';
import { Server, Clock, ShieldCheck } from 'lucide-react';

export default function RenderNoticeCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#031b2e]/90 via-[#07243d]/90 to-[#031b2e]/90 border border-[#67D9E8]/30 p-5 md:p-6 shadow-[0_0_30px_rgba(103,217,232,0.1)]">
      {/* Background ambient light */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#67D9E8]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#020b14] border border-[#67D9E8]/40 text-[#67D9E8] shrink-0 shadow-[0_0_15px_rgba(103,217,232,0.2)]">
            <Server className="w-6 h-6 animate-pulse text-[#67D9E8]" />
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Render Free-Tier Deployment Notice
              </span>
              <span className="px-2 py-0.5 rounded bg-[#67D9E8]/10 border border-[#67D9E8]/20 text-[#67D9E8] font-mono text-[10px]">
                YOLOv8 + Gemini 3.6 Flash
              </span>
            </div>

            <h4 className="text-base font-bold text-white font-display uppercase tracking-wide">
              Backend Server Model Latency Notice
            </h4>

            <p className="text-xs text-[#A4C2DC] leading-relaxed max-w-3xl font-sans">
              The backend API server is currently hosted on <span className="text-white font-semibold">Render Free Tier</span>, which may cause initial detection requests to take longer (cold-start delay). 
            </p>
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0 p-3.5 rounded-xl bg-[#020b14]/90 border border-emerald-500/30 space-y-1 font-mono text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>PRODUCTION GUARANTEE</span>
          </div>
          <p className="text-[11px] text-[#8EA9C1] leading-snug">
            We assure that upon selection, high-performance GPU cloud infrastructure will be deployed for instant production-level inference.
          </p>
        </div>
      </div>
    </div>
  );
}
