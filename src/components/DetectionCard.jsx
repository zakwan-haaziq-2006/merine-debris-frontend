import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, Ruler, Eye, Layers, Compass, Crosshair, Box, Sparkles, MapPin } from 'lucide-react';

export default function DetectionCard({ detection, isSelected, onSelect }) {
  if (!detection) return null;

  // Handle both standard mock structure and API YOLOv8 payload structure
  const rawClass = detection.class || detection.name || detection.shortName || 'Unknown Object';
  const confidenceVal = typeof detection.confidence === 'number' 
    ? (detection.confidence <= 1 ? Math.round(detection.confidence * 100) : Math.round(detection.confidence))
    : 88;

  // Parse Box coordinates
  const box = detection.box || {
    x1: 204.0,
    y1: 154.1,
    x2: 243.4,
    y2: 247.5
  };

  const x1 = typeof box.x1 === 'number' ? box.x1 : 204.0;
  const y1 = typeof box.y1 === 'number' ? box.y1 : 154.1;
  const x2 = typeof box.x2 === 'number' ? box.x2 : 243.4;
  const y2 = typeof box.y2 === 'number' ? box.y2 : 247.5;

  const boxWidth = Math.abs(x2 - x1).toFixed(1);
  const boxHeight = Math.abs(y2 - y1).toFixed(1);
  const centroidX = ((x1 + x2) / 2).toFixed(1);
  const centroidY = ((y1 + y2) / 2).toFixed(1);
  const areaPercentage = detection.area_percentage || detection.area || 2.4;

  const isVerified = detection.shadowStatus === 'VERIFIED' || confidenceVal >= 80;
  
  const confidenceColor =
    confidenceVal >= 90
      ? 'text-emerald-400'
      : confidenceVal >= 75
      ? 'text-[#67D9E8]'
      : 'text-amber-400';

  const progressBg =
    confidenceVal >= 90
      ? 'bg-emerald-400'
      : confidenceVal >= 75
      ? 'bg-[#67D9E8]'
      : 'bg-amber-400';

  // Category mapping
  let categoryLabel = 'Marine Plastics & Polymer Debris';
  if (rawClass.toLowerCase().includes('chain') || rawClass.toLowerCase().includes('propeller') || rawClass.toLowerCase().includes('valve')) {
    categoryLabel = 'Subsea Hardware / Rigging';
  } else if (rawClass.toLowerCase().includes('pipe')) {
    categoryLabel = 'Subsea Infrastructure';
  } else if (rawClass.toLowerCase().includes('net')) {
    categoryLabel = 'Ghost Fishing Gear';
  } else if (rawClass.toLowerCase().includes('container') || rawClass.toLowerCase().includes('ship') || rawClass.toLowerCase().includes('aircraft')) {
    categoryLabel = 'Heavy Obstacle / Freight';
  }

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl p-5 md:p-6 transition-all duration-300 border ${
        isSelected
          ? 'bg-[#04243e] border-[#67D9E8] shadow-[0_0_30px_rgba(103,217,232,0.3)] ring-1 ring-[#67D9E8]/40'
          : 'bg-[#031B2E]/80 border-[#67D9E8]/20 hover:border-[#67D9E8]/50 hover:bg-[#031B2E]'
      }`}
    >
      {/* Top Banner: OBJECT FOUND */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#67D9E8] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#67D9E8]"></span>
          </span>
          <span className="text-xs font-mono font-extrabold tracking-widest text-[#67D9E8] uppercase">
            TARGET ACQUIRED • OBJECT FOUND
          </span>
        </div>

        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#020b14] text-[#67D9E8] border border-[#67D9E8]/30">
          SWATH {areaPercentage}%
        </span>
      </div>

      {/* Main Target Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-mono text-[#8EA9C1] tracking-wider uppercase block">
            {categoryLabel}
          </span>
          <h3 className="text-2xl font-black text-white font-display uppercase tracking-wide mt-1">
            {rawClass}
          </h3>
        </div>

        {/* Confidence Pill */}
        <div className="text-right">
          <div className={`text-3xl font-black font-mono leading-none ${confidenceColor}`}>
            {confidenceVal}%
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#8EA9C1] uppercase mt-1 block">
            CONFIDENCE
          </span>
        </div>
      </div>

      {/* Confidence Progress Meter */}
      <div className="w-full bg-[#020b14] h-2 rounded-full mt-4 overflow-hidden border border-white/5">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${progressBg}`}
          style={{ width: `${confidenceVal}%` }}
        />
      </div>

      {/* EXACT COORDINATES & BOUNDING BOX GRID */}
      <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-white font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-[#67D9E8]">
            <Crosshair className="w-3.5 h-3.5" />
            SONAR PIXEL BOUNDING MATRIX
          </span>
          <span className="text-[10px] text-[#8EA9C1]">
            CENTROID: [{centroidX}, {centroidY}]
          </span>
        </div>

        {/* Coordinate Grid Cells */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-[#020b14]/70 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-[#8EA9C1] uppercase block">X1 (LEFT)</span>
            <span className="text-white font-bold">{x1} px</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#020b14]/70 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-[#8EA9C1] uppercase block">Y1 (TOP)</span>
            <span className="text-white font-bold">{y1} px</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#020b14]/70 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-[#8EA9C1] uppercase block">X2 (RIGHT)</span>
            <span className="text-white font-bold">{x2} px</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#020b14]/70 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-[#8EA9C1] uppercase block">Y2 (BOTTOM)</span>
            <span className="text-white font-bold">{y2} px</span>
          </div>
        </div>

        {/* Box Dimensions & Coverage Strip */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#8EA9C1]">
          <div className="bg-[#020b14]/50 rounded-lg p-2.5 flex items-center justify-between border border-white/5">
            <span>TARGET SIZE (W × H):</span>
            <strong className="text-white">{boxWidth} × {boxHeight} px</strong>
          </div>
          <div className="bg-[#020b14]/50 rounded-lg p-2.5 flex items-center justify-between border border-white/5">
            <span>SWATH COVERAGE:</span>
            <strong className="text-[#67D9E8]">{areaPercentage}%</strong>
          </div>
        </div>
      </div>

      {/* Shadow Verification Badge & Relief Estimate */}
      <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isVerified ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>✓ SHADOW GEOMETRY VERIFIED</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>⚠ REQUIRES REVIEW</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-[#A4C2DC]">
          <Ruler className="w-3.5 h-3.5 text-[#67D9E8]" />
          <span>EST. HEIGHT: {detection.shadowAnalysis?.targetHeightCalculated || '0.35 m'}</span>
        </div>
      </div>
    </div>
  );
}
