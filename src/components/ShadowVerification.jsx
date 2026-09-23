import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, ArrowRight, Activity, Binary, Waves, Info } from 'lucide-react';

export default function ShadowVerification({ analysisData }) {
  if (!analysisData) return null;

  const { shadowAnalysis, confidence, name } = analysisData;
  const isVerified = analysisData.shadowStatus === 'VERIFIED';

  return (
    <div className="glass-panel rounded-2xl p-6 lg:p-8 border border-[#67D9E8]/30 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#020b14] border border-[#67D9E8]/40 shadow-[0_0_15px_rgba(103,217,232,0.2)]">
            <ShieldCheck className="w-6 h-6 text-[#67D9E8]" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white uppercase tracking-wider font-display">
              SHADOW VERIFICATION PIPELINE
            </h3>
            <p className="text-xs text-[#8EA9C1] font-mono mt-0.5">
              Dual-Stage Physics Validation • Eliminating Seabed Backscatter False Positives
            </p>
          </div>
        </div>

        {/* Global Verdict Badge */}
        <div>
          {isVerified ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-sm font-mono font-bold shadow-[0_0_20px_rgba(52,211,153,0.25)]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>✓ SHADOW VERIFIED</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 text-sm font-mono font-bold shadow-[0_0_20px_rgba(245,158,11,0.25)]">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>⚠ SHADOW UNCERTAIN — REQUIRES HUMAN REVIEW</span>
            </div>
          )}
        </div>
      </div>

      {/* Visual Pipeline Flow Diagram */}
      <div className="bg-[#020b14]/80 rounded-xl p-5 border border-[#67D9E8]/15">
        <span className="block text-[10px] font-mono text-[#8EA9C1] uppercase tracking-widest mb-3">
          NEURAL INFERENCE & VERIFICATION FLOW
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-center">
          {/* Step 1: YOLO Detection */}
          <div className="p-3.5 rounded-lg bg-[#031B2E] border border-[#67D9E8]/30 flex flex-col items-center justify-center">
            <span className="text-[10px] font-mono text-[#67D9E8] font-bold">STAGE 01</span>
            <span className="text-sm font-bold text-white font-display mt-0.5">YOLOv11 Detection</span>
            <span className="text-[11px] font-mono text-slate-300 mt-1">Backscatter Feature Extracted</span>
          </div>

          {/* Step 2: Shadow Verification */}
          <div className={`p-3.5 rounded-lg border flex flex-col items-center justify-center ${
            isVerified 
              ? 'bg-[#042a42] border-[#67D9E8] shadow-[0_0_15px_rgba(103,217,232,0.3)]'
              : 'bg-amber-950/40 border-amber-500/40'
          }`}>
            <span className={`text-[10px] font-mono font-bold ${isVerified ? 'text-[#67D9E8]' : 'text-amber-400'}`}>STAGE 02</span>
            <span className="text-sm font-bold text-white font-display mt-0.5">Shadow Physics Check</span>
            <span className={`text-[11px] font-mono mt-1 ${isVerified ? 'text-emerald-300' : 'text-amber-300'}`}>
              {isVerified ? '✓ Verified Geometry' : '⚠ Irregular Bounds'}
            </span>
          </div>

          {/* Step 3: Confidence Evaluation */}
          <div className="p-3.5 rounded-lg bg-[#031B2E] border border-[#67D9E8]/30 flex flex-col items-center justify-center">
            <span className="text-[10px] font-mono text-[#67D9E8] font-bold">STAGE 03</span>
            <span className="text-sm font-bold text-white font-display mt-0.5">Confidence Scoring</span>
            <span className="text-[11px] font-mono text-white font-semibold mt-1">{confidence}% Aggregate</span>
          </div>

          {/* Step 4: Final Outcome */}
          <div className={`p-3.5 rounded-lg border flex flex-col items-center justify-center ${
            isVerified
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-950/50 border-amber-500/60 text-amber-300'
          }`}>
            <span className="text-[10px] font-mono font-bold">STAGE 04</span>
            <span className="text-sm font-bold font-display mt-0.5">
              {isVerified ? 'Verified Target' : 'Flag Human Review'}
            </span>
            <span className="text-[11px] font-mono mt-1 opacity-85">
              {isVerified ? 'High Reliability' : 'Operator Confirmation'}
            </span>
          </div>
        </div>
      </div>

      {/* Physics Validation Checklist & Acoustic Geometry Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Checklist */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#67D9E8]" />
            Acoustic Verification Checklist
          </span>
          <div className="space-y-2.5">
            {shadowAnalysis?.verificationSteps?.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-[#020b14]/60 border border-white/5"
              >
                {step.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 text-xs">
                  <div className={`font-semibold ${step.passed ? 'text-white' : 'text-amber-200'}`}>
                    {step.label}
                  </div>
                  <div className="text-[11px] font-mono text-[#8EA9C1] mt-0.5">
                    {step.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acoustic Trigonometry & Physical Parameters */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Binary className="w-4 h-4 text-[#67D9E8]" />
            Acoustic Shadow Calculation Parameters
          </span>
          <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-3 font-mono text-xs">
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-[#8EA9C1]">Towfish Sensor Altitude (H):</span>
              <span className="text-white font-bold">{analysisData.altitude}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-[#8EA9C1]">Acoustic Shadow Length (Ls):</span>
              <span className="text-white font-bold">{shadowAnalysis?.shadowLength}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-[#8EA9C1]">Seabed Grazing Angle (θ):</span>
              <span className="text-[#67D9E8] font-bold">{shadowAnalysis?.grazingAngle}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-[#8EA9C1]">Calculated Relief Height (h):</span>
              <span className="text-emerald-400 font-bold">{shadowAnalysis?.targetHeightCalculated}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#8EA9C1]">Geometric Consistency Index:</span>
              <span className="text-white font-bold">{shadowAnalysis?.consistencyScore}%</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#031422] border border-[#67D9E8]/20 flex items-center gap-2.5 text-[11px] text-[#A4C2DC]">
            <Info className="w-4 h-4 text-[#67D9E8] shrink-0" />
            <span>Formula: Target Height <code className="text-white font-mono font-bold">h = (H × Ls) / (R + Ls)</code> eliminates 2D flat seafloor clutter.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
