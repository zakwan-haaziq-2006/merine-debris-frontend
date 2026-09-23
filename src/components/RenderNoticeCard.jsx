import React from 'react';
import { Server, Clock, ShieldCheck, X, RefreshCw, Radio } from 'lucide-react';

export default function RenderNoticeCard({ isOpen, onClose, isAnalyzing = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      {/* Click outside to close */}
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
      />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-b from-[#031b2e] via-[#04243e] to-[#020b14] border border-[#67D9E8]/40 p-6 md:p-8 shadow-[0_0_50px_rgba(103,217,232,0.25)] space-y-6">
        {/* Ambient lighting effects */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#67D9E8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#020b14] border border-[#67D9E8]/40 text-[#67D9E8]">
              <Server className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#67D9E8] uppercase tracking-widest block">
                INFRASTRUCTURE & EXECUTION LAYER
              </span>
              <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">
                {isAnalyzing ? 'Processing Sonar Detection Pipeline...' : 'Backend Server Infrastructure Notice'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10 cursor-pointer"
            title="Close Notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Processing Radar Indicator if Analyzing */}
        {isAnalyzing && (
          <div className="p-4 rounded-xl bg-[#020b14]/90 border border-[#67D9E8]/30 flex items-center gap-4">
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#67D9E8]/40 animate-ping" />
              <div className="w-10 h-10 rounded-full bg-[#031B2E] border border-[#67D9E8] flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-[#67D9E8] animate-spin" />
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#67D9E8]">
                <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span>YOLOv8 VISION + GEMINI INFERENCE ACTIVE</span>
              </div>
              <p className="text-[11px] text-[#8EA9C1]">
                Executing acoustic anomaly detection & ISO survey report synthesis in background...
              </p>
            </div>
          </div>
        )}

        {/* Render Free Tier Hosting Notice Card Body */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#020b14]/70 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                <span>Render Free-Tier Hosting Notice</span>
              </span>
              <span className="text-[10px] font-mono text-[#8EA9C1]">
                Model Latency Delay (15–30s)
              </span>
            </div>
            <p className="text-xs text-[#A4C2DC] leading-relaxed font-sans">
              The backend API server is currently hosted on <span className="text-white font-semibold">Render Free Tier</span>. Because free instances spin down when idle, initial detection queries may take a few extra seconds due to server cold-start.
            </p>
          </div>

          {/* Production Guarantee Banner */}
          <div className="p-4 rounded-xl bg-[#020b14]/90 border border-emerald-500/40 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>PRODUCTION COMMITMENT GUARANTEE</span>
            </div>
            <p className="text-xs text-[#8EA9C1] leading-relaxed font-sans">
              We assure that once selected / approved, high-performance GPU cloud infrastructure (NVIDIA CUDA instances) will be deployed for instant sub-second production-level inference.
            </p>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#67D9E8] hover:bg-white text-[#031B2E] font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(103,217,232,0.3)] cursor-pointer"
          >
            {isAnalyzing ? 'Understand & Continue Processing' : 'Close Notice'}
          </button>
        </div>
      </div>
    </div>
  );
}
