import React, { useState } from 'react';
import { Eye, Layers, ZoomIn, Sliders, Maximize2, ShieldCheck, Crosshair, Sparkles } from 'lucide-react';

export default function SonarViewer({
  analysisData,
  isAnalyzing,
  selectedBoxId,
  onSelectBox,
}) {
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [palette, setPalette] = useState('amber'); // 'amber' | 'cyan' | 'gray' | 'emerald'

  const getPaletteFilter = () => {
    switch (palette) {
      case 'cyan':
        return 'hue-rotate(160deg) saturate(1.4) brightness(0.95)';
      case 'gray':
        return 'grayscale(100%) contrast(1.15)';
      case 'emerald':
        return 'hue-rotate(85deg) saturate(1.6) brightness(0.9)';
      case 'amber':
      default:
        return 'none';
    }
  };

  if (!analysisData && !isAnalyzing) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden glass-panel-elevated border border-[#67D9E8]/30 shadow-2xl flex flex-col">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#020b14]/90 border-b border-[#67D9E8]/20 font-mono text-xs text-[#8EA9C1]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#67D9E8] animate-pulse"></span>
            <span className="text-white font-bold tracking-wider">SIDE-SCAN SONAR VIEWER</span>
          </div>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline text-[#A4C2DC]">
            FREQ: {analysisData?.frequency || '400 kHz'}
          </span>
          <span className="hidden md:inline text-[#A4C2DC]">
            RANGE: {analysisData?.range || '50 m'}
          </span>
        </div>

        {/* View Controls & Palette Selectors */}
        <div className="flex items-center gap-2">
          {/* Palette selector */}
          <div className="flex items-center gap-1 bg-[#031B2E] p-1 rounded-md border border-white/10">
            <button
              onClick={() => setPalette('amber')}
              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-colors ${
                palette === 'amber' ? 'bg-[#e59d3b] text-black' : 'text-[#8EA9C1] hover:text-white'
              }`}
              title="Amber / Sepia Sonar Palette"
            >
              Amber
            </button>
            <button
              onClick={() => setPalette('cyan')}
              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-colors ${
                palette === 'cyan' ? 'bg-[#67D9E8] text-[#031B2E]' : 'text-[#8EA9C1] hover:text-white'
              }`}
              title="Cyan Hydrographic Palette"
            >
              Cyan
            </button>
            <button
              onClick={() => setPalette('gray')}
              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-colors ${
                palette === 'gray' ? 'bg-white text-black' : 'text-[#8EA9C1] hover:text-white'
              }`}
              title="Monochrome Grayscale"
            >
              Gray
            </button>
          </div>

          {/* Toggle Bounding Boxes */}
          <button
            onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 border transition-colors ${
              showBoundingBoxes
                ? 'bg-[#67D9E8]/20 border-[#67D9E8] text-[#67D9E8]'
                : 'bg-black/30 border-white/10 text-white/50'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Detection Boxes</span>
          </button>
        </div>
      </div>

      {/* Main Sonar Imagery Canvas Container */}
      <div className="relative w-full aspect-[4/3] bg-black overflow-hidden group">
        {/* Sonar Image with selected acoustic filter */}
        <img
          src={analysisData?.sonarImage || '/assets/sonar_ghost_net.jpg'}
          alt="Side-Scan Sonar Imagery"
          className="w-full h-full object-fill transition-all duration-300"
          style={{ filter: getPaletteFilter() }}
        />

        {/* Acoustic Grid & Distance Ruler Overlay */}
        <div className="absolute inset-0 pointer-events-none acoustic-grid-dense opacity-20" />

        {/* Dynamic Sonar Waterfall Scanline when analyzing */}
        {isAnalyzing && (
          <div className="absolute inset-0 pointer-events-none z-30">
            <div className="animate-scanline" />
            <div className="absolute inset-0 bg-[#031B2E]/70 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-[#67D9E8]/30 animate-ping"></div>
                <div className="w-14 h-14 rounded-full border-2 border-[#67D9E8] border-t-transparent animate-spin"></div>
                <Crosshair className="w-6 h-6 text-[#67D9E8] absolute" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold font-display uppercase tracking-widest text-white">
                  ANALYZING SONAR IMAGERY...
                </p>
                <p className="text-xs font-mono text-[#67D9E8]">
                  Running YOLO Vision & Intelligence Engine
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Real-time Bounding Boxes Annotations */}
        {!isAnalyzing && analysisData?.boundingBoxes && (
          <div className="absolute inset-0 pointer-events-auto">
            {analysisData.boundingBoxes.map((box) => {
              const isSelected = selectedBoxId === box.id;
              const boxBorderColor = '#67D9E8';

              return (
                <React.Fragment key={box.id}>
                  {/* Target Object Detection Bounding Box */}
                  {showBoundingBoxes && (
                    <div
                      onClick={() => onSelectBox && onSelectBox(box.id)}
                      style={{
                        left: `${box.x}%`,
                        top: `${box.y}%`,
                        width: `${box.w}%`,
                        height: `${box.h}%`,
                        borderColor: boxBorderColor,
                      }}
                      className={`absolute border-2 rounded cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'ring-4 ring-[#67D9E8]/50 bg-white/10 shadow-[0_0_30px_rgba(103,217,232,0.6)]'
                          : 'bg-black/15 hover:bg-white/10'
                      }`}
                    >
                      {/* Detection Tag Badge */}
                      <div
                        style={{ backgroundColor: boxBorderColor }}
                        className="absolute -top-7 left-0 px-2 py-0.5 rounded text-[11px] font-mono font-black text-[#031B2E] uppercase shadow-lg flex items-center gap-1"
                      >
                        <span>{box.label}</span>
                        <span className="opacity-80">({box.confidence}%)</span>
                      </div>

                      {/* Corner Target Reticles */}
                      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white" />
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white" />
                      <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white" />
                      <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Sonar Acoustic Scale Overlay */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded bg-[#020b14]/85 backdrop-blur-md border border-[#67D9E8]/30 font-mono text-[10px] text-white flex items-center gap-3">
          <div>
            <span className="text-[#8EA9C1]">DEPTH:</span> {analysisData?.depth || '28.4m'}
          </div>
          <div>
            <span className="text-[#8EA9C1]">ALT:</span> {analysisData?.altitude || '6.2m'}
          </div>
          <div>
            <span className="text-[#8EA9C1]">SLANT:</span> {analysisData?.slantRange || '32.1m'}
          </div>
        </div>
      </div>

      {/* Footer info strip */}
      <div className="px-5 py-3 bg-[#031422] border-t border-[#67D9E8]/20 flex flex-wrap items-center justify-between text-xs font-mono text-[#8EA9C1]">
        <span>LOCATION: <strong className="text-white">{analysisData?.locationName}</strong></span>
        <span>LAT: <strong className="text-[#67D9E8]">{analysisData?.coordinates?.lat}</strong> LON: <strong className="text-[#67D9E8]">{analysisData?.coordinates?.lng}</strong></span>
      </div>
    </div>
  );
}
