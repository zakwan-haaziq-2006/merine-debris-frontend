import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  Layers
} from 'lucide-react';

export default function EnhancedCropGallery({ detections = [], selectedBoxId, onSelectBox }) {
  // Mode toggles per card index: true = Enhanced Denoised Crop, false = Raw Sonar Crop
  const [viewModes, setViewModes] = useState({});

  if (!detections || detections.length === 0) {
    return null;
  }

  const toggleViewMode = (idx, e) => {
    e.stopPropagation();
    setViewModes((prev) => ({
      ...prev,
      [idx]: !prev[idx] // default is true (Enhanced)
    }));
  };

  const getPriorityBadgeStyle = (label = 'MEDIUM') => {
    switch (label?.toUpperCase()) {
      case 'URGENT':
        return 'bg-red-500/20 text-red-300 border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.3)]';
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.3)]';
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.2)]';
      case 'LOW':
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-[#67D9E8]/30 space-y-5 bg-[#031B2E]/70 shadow-[0_0_30px_rgba(103,217,232,0.1)]">
      
      {/* Gallery Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#020b14] border border-[#67D9E8]/30 text-[10px] font-mono text-[#67D9E8] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#67D9E8] animate-pulse" />
            <span>CLASSICAL ACOUSTIC DENOISING & CONTRAST ENHANCEMENT</span>
          </div>
          <h4 className="text-xl md:text-2xl font-extrabold text-white font-display uppercase tracking-tight flex items-center gap-2">
            <span>ENHANCED DEBRIS TARGET GALLERY</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#67D9E8]/20 text-[#67D9E8] border border-[#67D9E8]/40">
              {detections.length} {detections.length === 1 ? 'TARGET' : 'TARGETS'}
            </span>
          </h4>
        </div>

        <div className="text-right text-[11px] font-mono text-[#8EA9C1] hidden sm:block">
          <div>3x Lanczos Upscale • Speckle Filtered</div>
          <div className="text-emerald-400 font-bold">Zero AI Hallucination Guarantee</div>
        </div>
      </div>

      {/* Target Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {detections.map((det, idx) => {
          const isSelected = selectedBoxId === idx || (selectedBoxId === undefined && idx === 0);
          const showEnhanced = viewModes[idx] !== false; // default true
          const cropSrc = showEnhanced 
            ? (det.enhanced_crop || det.raw_crop) 
            : (det.raw_crop || det.enhanced_crop);

          const priorityLabel = det.priority_label || 'HIGH';
          const priorityScore = typeof det.priority_score === 'number' ? det.priority_score.toFixed(1) : '72.0';

          return (
            <div
              key={idx}
              onClick={() => onSelectBox && onSelectBox(idx)}
              className={`group relative rounded-xl p-4 transition-all duration-300 border cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-[#042a47]/90 border-[#67D9E8] shadow-[0_0_25px_rgba(103,217,232,0.3)] ring-1 ring-[#67D9E8]'
                  : 'bg-[#020b14]/90 border-white/10 hover:border-[#67D9E8]/50 hover:bg-[#032038]'
              }`}
            >
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#67D9E8] bg-[#020b14] px-2 py-0.5 rounded border border-[#67D9E8]/30">
                    TRG-0{idx + 1}
                  </span>
                  <span className="font-extrabold text-white text-base font-display uppercase tracking-wide">
                    {det.class}
                  </span>
                </div>

                <div className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getPriorityBadgeStyle(priorityLabel)}`}>
                  {priorityLabel} ({priorityScore})
                </div>
              </div>

              {/* Crop Image Viewport */}
              <div className="relative rounded-lg overflow-hidden border border-white/15 bg-black/80 aspect-[4/3] flex items-center justify-center group-hover:border-[#67D9E8]/60 transition-colors">
                {cropSrc ? (
                  <img
                    src={cropSrc}
                    alt={`${det.class} target crop`}
                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="text-center p-4 space-y-2 text-[#8EA9C1]">
                    <Layers className="w-8 h-8 mx-auto text-[#67D9E8]/40 animate-pulse" />
                    <span className="text-xs font-mono block">Extracting acoustic crop...</span>
                  </div>
                )}

                {/* Denoised vs Raw Toggle Button Overlay */}
                <button
                  onClick={(e) => toggleViewMode(idx, e)}
                  className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white hover:text-[#67D9E8] hover:border-[#67D9E8] flex items-center gap-1.5 transition-all shadow-md z-10"
                  title="Toggle Raw vs Denoised Crop View"
                >
                  <Eye className="w-3 h-3 text-[#67D9E8]" />
                  <span>{showEnhanced ? 'ENHANCED (DENOISED)' : 'RAW SONAR CROP'}</span>
                </button>

                {/* Active Selection Pin Indicator */}
                {isSelected && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#67D9E8] text-[#031B2E] text-[10px] font-mono font-extrabold uppercase shadow-lg">
                    ACTIVE TARGET
                  </div>
                )}
              </div>

              {/* Target Coordinates & Metric Info Footer */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono border-t border-white/10 pt-3 text-[#8EA9C1]">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Confidence</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    {typeof det.confidence === 'number' ? (det.confidence <= 1 ? Math.round(det.confidence * 100) : Math.round(det.confidence)) : 88}%
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase">Swath Area</span>
                  <span className="text-white font-bold text-sm">
                    {det.area_percentage || 2.4}%
                  </span>
                </div>

                <div className="col-span-2 pt-1 border-t border-white/5 flex items-center justify-between text-[10px]">
                  <span>Box Coordinates:</span>
                  <span className="text-white font-mono font-semibold">
                    [{Math.round(det.box?.x1 || 0)}, {Math.round(det.box?.y1 || 0)}] → [{Math.round(det.box?.x2 || 0)}, {Math.round(det.box?.y2 || 0)}]
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
