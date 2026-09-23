import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Navigation, 
  MapPin, 
  Globe2, 
  Radio, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  X,
  Layers,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Comprehensive North Pacific Gyre (Great Pacific Garbage Patch) Detections
// Positioned relative to the North Pacific ocean basin in the Google Maps embed
const GYRE_DETECTIONS = [
  {
    id: 'GYRE-01',
    name: 'GHOST FISHING NET CLUSTER (4.8m)',
    category: 'Derelict Fishing Gear',
    confidence: 96,
    shadowStatus: 'VERIFIED',
    legendType: 'VERIFIED', // 'VERIFIED' | 'REVIEW' | 'HAZARD'
    depth: '28.4 m',
    coords: '35.2400° N, 141.5200° W',
    sonarImage: '/assets/sonar_ghost_net.jpg',
    location: 'North Pacific Gyre — Subtropical Convergence Core',
    notes: 'Specular highlight with 18.4m continuous acoustic shadow.',
    top: '46%',
    left: '48%',
    timestamp: '14:23:08 UTC',
  },
  {
    id: 'GYRE-02',
    name: 'LOST ISO 40FT SHIPPING CONTAINER',
    category: 'Submerged Freight Hazard',
    confidence: 94,
    shadowStatus: 'VERIFIED',
    legendType: 'HAZARD',
    depth: '38.5 m',
    coords: '36.1200° N, 138.8400° W',
    sonarImage: '/assets/sonar_cargo_container.jpg',
    location: 'North Pacific Gyre — Eastern Accumulation Corridor',
    notes: 'Rigid corner reflector geometry. Critical navigation hazard.',
    top: '38%',
    left: '58%',
    timestamp: '15:02:44 UTC',
  },
  {
    id: 'GYRE-03',
    name: 'DENSE HDPE SYNTHETIC ROPE BUNDLE',
    category: 'Polymer Entanglement Mass',
    confidence: 89,
    shadowStatus: 'VERIFIED',
    legendType: 'VERIFIED',
    depth: '22.0 m',
    coords: '33.8500° N, 144.2100° W',
    sonarImage: '/assets/sonar_ghost_net.jpg',
    location: 'North Pacific Gyre — Central Vortex Core',
    notes: 'Multi-strand acoustic diffraction pattern verified.',
    top: '56%',
    left: '42%',
    timestamp: '15:44:12 UTC',
  },
  {
    id: 'GYRE-04',
    name: 'UNIDENTIFIED DIFFUSE ANOMALY CLUSTER',
    category: 'Scattered Debris Field',
    confidence: 64,
    shadowStatus: 'UNCERTAIN',
    legendType: 'REVIEW',
    depth: '55.1 m',
    coords: '36.7800° N, 136.9500° W',
    sonarImage: '/assets/sonar_shipwreck_debris.jpg',
    location: 'North Pacific Gyre — Outer Boundary Transect',
    notes: 'Inconclusive shadow geometry. Flagged for secondary acoustic survey.',
    top: '34%',
    left: '68%',
    timestamp: '16:15:30 UTC',
  },
  {
    id: 'GYRE-05',
    name: 'DERELICT TRAWLER WINCH & HEAVY CABLE',
    category: 'Heavy Subsea Obstacle',
    confidence: 91,
    shadowStatus: 'VERIFIED',
    legendType: 'HAZARD',
    depth: '42.0 m',
    coords: '34.6500° N, 145.1000° W',
    sonarImage: '/assets/sonar_ghost_net.jpg',
    location: 'North Pacific Gyre — Subsurface Drift Track 3',
    notes: 'High acoustic backscatter with long acoustic occlusion.',
    top: '52%',
    left: '34%',
    timestamp: '16:50:00 UTC',
  },
  {
    id: 'GYRE-06',
    name: 'METALLIC FLOATING CHEMICAL DRUM',
    category: 'Hazardous Chemical Drum',
    confidence: 58,
    shadowStatus: 'UNCERTAIN',
    legendType: 'REVIEW',
    depth: '18.3 m',
    coords: '35.8900° N, 148.4000° W',
    sonarImage: '/assets/sonar_shipwreck_debris.jpg',
    location: 'North Pacific Gyre — Northern Gyre Fringe',
    notes: 'Low shadow contrast; potential buoyant casing or sediment ripple.',
    top: '40%',
    left: '26%',
    timestamp: '17:22:15 UTC',
  },
  {
    id: 'GYRE-07',
    name: 'SUBSEA TUBULAR STEEL CASING',
    category: 'Industrial Tubular Steel',
    confidence: 84,
    shadowStatus: 'VERIFIED',
    legendType: 'HAZARD',
    depth: '62.0 m',
    coords: '33.1200° N, 140.2000° W',
    sonarImage: '/assets/sonar_pipeline.jpg',
    location: 'North Pacific Gyre — Southern Convergence Channel',
    notes: 'Continuous cylindrical backscatter along 28m seafloor span.',
    top: '64%',
    left: '52%',
    timestamp: '18:05:40 UTC',
  },
];

export default function MapView({ onInspectDetection }) {
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'VERIFIED' | 'REVIEW' | 'HAZARD'
  const [selectedTarget, setSelectedTarget] = useState(GYRE_DETECTIONS[0]);
  const [activePopupTarget, setActivePopupTarget] = useState(null);
  const [mapType, setMapType] = useState('m'); // 'm' (roadmap) | 'k' (satellite)
  const [zoomLevel, setZoomLevel] = useState(4);

  const filteredDetections = GYRE_DETECTIONS.filter((det) => {
    if (filter === 'VERIFIED') return det.legendType === 'VERIFIED';
    if (filter === 'REVIEW') return det.legendType === 'REVIEW';
    if (filter === 'HAZARD') return det.legendType === 'HAZARD';
    return true;
  });

  const countVerified = GYRE_DETECTIONS.filter((d) => d.legendType === 'VERIFIED').length;
  const countReview = GYRE_DETECTIONS.filter((d) => d.legendType === 'REVIEW').length;
  const countHazard = GYRE_DETECTIONS.filter((d) => d.legendType === 'HAZARD').length;

  const handleMarkerClick = (target, e) => {
    e.stopPropagation();
    setActivePopupTarget(target);
    setSelectedTarget(target);
  };

  // Construct Google Maps URL based on user's exact embed spec
  const googleMapsUrl = `https://www.google.com/maps?q=North+Pacific+Gyre&z=${zoomLevel}&t=${mapType}&hl=en&output=embed`;

  return (
    <section id="map" className="relative py-28 bg-[#020b14] overflow-hidden border-t border-[#67D9E8]/15">
      {/* Deep sea ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0c3b5e]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 acoustic-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#031B2E] border border-[#67D9E8]/30 text-[#67D9E8] font-mono text-xs tracking-widest uppercase">
            <Globe2 className="w-3.5 h-3.5 animate-pulse" />
            <span>GIS HYDROGRAPHIC MAPPING • NORTH PACIFIC GYRE</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase font-display">
            DETECTION <span className="text-[#67D9E8]">MAP</span>
          </h2>

          <p className="text-base sm:text-lg text-[#8EA9C1] font-normal leading-relaxed">
            Acoustic anomaly detections and verified subsea debris targets rendered directly across the North Pacific Gyre (Great Pacific Garbage Patch).
          </p>
        </div>

        {/* Main Map Display Card */}
        <div className="glass-panel-elevated rounded-2xl overflow-hidden border border-[#67D9E8]/30 shadow-2xl space-y-0">
          
          {/* Top Control & Location Bar */}
          <div className="p-4 md:p-5 bg-[#031422] border-b border-[#67D9E8]/20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            
            {/* Location Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-white font-bold tracking-wider">
                <Navigation className="w-4 h-4 text-[#67D9E8] animate-pulse" />
                <span className="font-display tracking-widest uppercase">NORTH PACIFIC GYRE</span>
              </div>
              <span className="hidden sm:inline text-[#67D9E8] bg-[#020b14] px-2.5 py-1 rounded border border-[#67D9E8]/30 text-[11px]">
                35.0000° N, 140.0000° W
              </span>
              <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                ACTIVE SATELLITE RADAR
              </span>
            </div>

            {/* Map Mode & Zoom Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-[#020b14] p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => setMapType('m')}
                  className={`px-3 py-1 rounded text-xs font-semibold uppercase transition-colors ${
                    mapType === 'm' ? 'bg-[#67D9E8] text-[#031B2E] font-bold shadow-[0_0_10px_rgba(103,217,232,0.4)]' : 'text-[#8EA9C1] hover:text-white'
                  }`}
                  title="Standard Map View"
                >
                  Map
                </button>
                <button
                  onClick={() => setMapType('k')}
                  className={`px-3 py-1 rounded text-xs font-semibold uppercase transition-colors ${
                    mapType === 'k' ? 'bg-[#67D9E8] text-[#031B2E] font-bold shadow-[0_0_10px_rgba(103,217,232,0.4)]' : 'text-[#8EA9C1] hover:text-white'
                  }`}
                  title="Satellite Ocean View"
                >
                  Satellite
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center bg-[#020b14] p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => setZoomLevel((z) => Math.min(z + 1, 8))}
                  className="p-1.5 rounded text-[#8EA9C1] hover:text-white hover:bg-white/5 transition-colors"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-[11px] text-[#67D9E8] font-bold">Z{zoomLevel}</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.max(z - 1, 2))}
                  className="p-1.5 rounded text-[#8EA9C1] hover:text-white hover:bg-white/5 transition-colors"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
              </div>

              <a
                href="https://www.google.com/maps?q=North+Pacific+Gyre"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#020b14] border border-[#67D9E8]/30 text-[#67D9E8] hover:text-white hover:border-white transition-colors text-xs"
              >
                <span>External</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* DEDICATED PROMINENT ACOUSTIC LEGEND & FILTER BAR */}
          <div className="px-4 md:px-6 py-3.5 bg-[#020b14] border-b border-[#67D9E8]/20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            
            <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs">
              <ShieldCheck className="w-4 h-4 text-[#67D9E8]" />
              <span>ACOUSTIC LEGEND (CLICK TO FILTER ON MAP):</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px]">
              {/* Filter: All */}
              <button
                onClick={() => setFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  filter === 'ALL'
                    ? 'bg-white text-[#031B2E] font-bold border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                    : 'bg-[#031B2E]/60 text-[#8EA9C1] border-white/10 hover:text-white'
                }`}
              >
                All Markers ({GYRE_DETECTIONS.length})
              </button>

              {/* 🟢 Verified Shadow Target */}
              <button
                onClick={() => setFilter(filter === 'VERIFIED' ? 'ALL' : 'VERIFIED')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                  filter === 'VERIFIED'
                    ? 'bg-[#67D9E8] text-[#031B2E] font-bold border-[#67D9E8] shadow-[0_0_15px_rgba(103,217,232,0.6)]'
                    : 'bg-[#031B2E] text-white border-emerald-500/40 hover:border-[#67D9E8]'
                }`}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#67D9E8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#67D9E8]"></span>
                </span>
                <span>Verified Shadow Target ({countVerified})</span>
              </button>

              {/* 🟡 Uncertain / Requires Review */}
              <button
                onClick={() => setFilter(filter === 'REVIEW' ? 'ALL' : 'REVIEW')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                  filter === 'REVIEW'
                    ? 'bg-amber-400 text-[#031B2E] font-bold border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                    : 'bg-[#031B2E] text-white border-amber-500/40 hover:border-amber-400'
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                <span>Uncertain / Requires Review ({countReview})</span>
              </button>

              {/* 🔴 High Navigation Hazard */}
              <button
                onClick={() => setFilter(filter === 'HAZARD' ? 'ALL' : 'HAZARD')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                  filter === 'HAZARD'
                    ? 'bg-red-500 text-white font-bold border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]'
                    : 'bg-[#031B2E] text-white border-red-500/40 hover:border-red-400'
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></span>
                <span>High Navigation Hazard ({countHazard})</span>
              </button>
            </div>

          </div>

          {/* RESPONSIVE GOOGLE MAPS CANVAS WITH ACOUSTIC TARGET PINS RENDERED DIRECTLY ON TOP */}
          <div 
            onClick={() => setActivePopupTarget(null)}
            className="relative w-full h-[540px] md:h-[620px] bg-[#020b14] overflow-hidden select-none"
          >
            
            {/* Exact Google Maps iframe Embed */}
            <iframe
              title="North Pacific Gyre Google Map"
              src={googleMapsUrl}
              className="w-full h-full border-0 filter saturate-[1.18] contrast-[1.06]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Vessel Trackline SVG Corridor Rendered ON the Google Map */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70">
              <defs>
                <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#67D9E8" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#67D9E8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#67D9E8" stopOpacity="0.4" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <polyline
                points="26% 40%, 34% 52%, 42% 56%, 48% 46%, 58% 38%, 68% 34%"
                fill="none"
                stroke="url(#trackGradient)"
                strokeWidth="3"
                strokeDasharray="8,8"
                filter="url(#glow)"
              />
            </svg>

            {/* ACOUSTIC LEGEND MARKERS RENDERED DIRECTLY ON TOP OF THE GOOGLE MAP */}
            {filteredDetections.map((item) => {
              const isSelected = selectedTarget?.id === item.id;
              const isPopupOpen = activePopupTarget?.id === item.id;

              let markerColor = '#67D9E8';
              let ringColor = 'rgba(103,217,232,0.4)';
              let badgeBg = 'bg-[#031B2E] border-[#67D9E8]/60 text-[#67D9E8]';

              if (item.legendType === 'REVIEW') {
                markerColor = '#f59e0b';
                ringColor = 'rgba(245,158,11,0.4)';
                badgeBg = 'bg-[#031B2E] border-amber-500/60 text-amber-400';
              } else if (item.legendType === 'HAZARD') {
                markerColor = '#ef4444';
                ringColor = 'rgba(239,68,68,0.5)';
                badgeBg = 'bg-[#031B2E] border-red-500/60 text-red-400';
              }

              return (
                <div
                  key={item.id}
                  style={{ top: item.top, left: item.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                  onClick={(e) => handleMarkerClick(item, e)}
                >
                  {/* Outer Pulsing Ping Wave */}
                  <div 
                    style={{ background: markerColor }}
                    className="absolute -inset-3 rounded-full opacity-40 animate-ping pointer-events-none" 
                  />

                  {/* Middle Beacon Ring */}
                  <div 
                    style={{ borderColor: markerColor, background: ringColor }}
                    className="w-9 h-9 rounded-full border border-dashed flex items-center justify-center transition-transform duration-300 group-hover:scale-125 shadow-lg"
                  >
                    {/* Inner Solid Marker Dot */}
                    <div 
                      style={{ background: markerColor }}
                      className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-[0_0_15px_currentColor]" 
                    />
                  </div>

                  {/* Target Label Flag attached to Marker */}
                  <div className={`absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase border shadow-xl backdrop-blur-md transition-all duration-200 pointer-events-none ${badgeBg} ${
                    isSelected ? 'ring-2 ring-[#67D9E8] scale-105 opacity-100' : 'opacity-85 group-hover:opacity-100'
                  }`}>
                    {item.name.split(' (')[0]}
                  </div>
                </div>
              );
            })}

            {/* INTERACTIVE POPUP DOSSIER WHEN A MARKER IS CLICKED ON THE MAP */}
            {activePopupTarget && (
              <div 
                className="absolute z-40 max-w-sm w-80 sm:w-96 rounded-2xl bg-[#031422]/98 border border-[#67D9E8]/50 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(103,217,232,0.25)] backdrop-blur-2xl font-mono text-xs text-white -translate-x-1/2 -translate-y-full transition-all"
                style={{ 
                  top: `calc(${activePopupTarget.top} - 24px)`, 
                  left: activePopupTarget.left 
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Popup Header */}
                <div className="flex items-start justify-between gap-3 border-b border-white/15 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#67D9E8] font-bold px-2 py-0.5 rounded bg-[#020b14] border border-[#67D9E8]/30">
                        {activePopupTarget.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        activePopupTarget.legendType === 'VERIFIED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : activePopupTarget.legendType === 'HAZARD'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {activePopupTarget.legendType === 'VERIFIED' ? '✓ VERIFIED' : activePopupTarget.legendType === 'HAZARD' ? '🚨 HAZARD' : '⚠ REVIEW'} ({activePopupTarget.confidence}%)
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-white font-display uppercase tracking-wider mt-1.5">
                      {activePopupTarget.name}
                    </h4>
                  </div>
                  
                  <button 
                    onClick={() => setActivePopupTarget(null)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Sonar Image Preview */}
                <div className="my-3 rounded-lg overflow-hidden border border-white/10 aspect-[16/9] bg-black relative">
                  <img 
                    src={activePopupTarget.sonarImage} 
                    alt={activePopupTarget.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-[#67D9E8] border border-white/10">
                    DEPTH: {activePopupTarget.depth}
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="space-y-1.5 text-[11px] text-[#A4C2DC]">
                  <div className="flex justify-between">
                    <span>COORDINATES:</span>
                    <strong className="text-white">{activePopupTarget.coords}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>SECTOR:</span>
                    <span className="text-[#67D9E8] truncate max-w-[200px]">{activePopupTarget.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SHADOW STATUS:</span>
                    <strong className={activePopupTarget.shadowStatus === 'VERIFIED' ? 'text-emerald-400' : 'text-amber-400'}>
                      {activePopupTarget.shadowStatus === 'VERIFIED' ? '✓ Shadow Geometry Verified' : '⚠ Requires Visual ROV Review'}
                    </strong>
                  </div>
                  <p className="text-[10px] text-slate-300 italic pt-1 border-t border-white/10">
                    {activePopupTarget.notes}
                  </p>
                </div>

                {/* Inspect in Analysis Button */}
                <div className="pt-3 mt-2 border-t border-white/10">
                  <Link
                    to="/analyze"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#67D9E8] hover:bg-white text-[#031B2E] font-bold uppercase text-[11px] tracking-wider transition-all shadow-[0_0_15px_rgba(103,217,232,0.4)]"
                  >
                    <span>Inspect Sonar Data</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* In-Canvas Telemetry HUD (Bottom Left) */}
            <div className="absolute bottom-4 left-4 z-30 max-w-sm hidden sm:block pointer-events-auto">
              <div className="bg-[#031422]/95 p-4 rounded-xl border border-[#67D9E8]/40 font-mono text-[11px] space-y-2 text-[#A4C2DC] shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="font-bold text-white uppercase text-xs flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-[#67D9E8] animate-pulse" />
                    NORTH PACIFIC GYRE TELEMETRY
                  </span>
                  <span className="text-[#67D9E8] font-bold">SECTOR 7</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>CONVERGENCE:</span>
                    <strong className="text-white">Great Pacific Garbage Patch</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>SURVEY TRANSECT:</span>
                    <strong className="text-[#67D9E8]">ALPHA-7 SWATH (400kHz)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>SEABED DEPTH:</span>
                    <span className="text-emerald-400">4,250 m (Abyssal Plain)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ACTIVE MARKERS:</span>
                    <span className="text-white font-bold">{filteredDetections.length} Targets Displayed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* In-Canvas Floating Legend Badge (Bottom Right) */}
            <div className="absolute bottom-4 right-4 z-30 bg-[#031422]/95 p-3.5 rounded-xl border border-[#67D9E8]/40 font-mono text-[11px] space-y-2 text-[#A4C2DC] shadow-2xl backdrop-blur-xl hidden md:block pointer-events-auto">
              <div className="font-bold text-white uppercase text-xs flex items-center gap-1.5 border-b border-white/10 pb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#67D9E8]" />
                <span>ACOUSTIC LEGEND</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#67D9E8] border border-white shadow-[0_0_8px_#67D9E8]"></span>
                <span className="text-white">Verified Shadow Target ({countVerified})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-white shadow-[0_0_8px_#f59e0b]"></span>
                <span className="text-white">Uncertain / Requires Review ({countReview})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 border border-white shadow-[0_0_8px_#ef4444]"></span>
                <span className="text-white">High Navigation Hazard ({countHazard})</span>
              </div>
            </div>

          </div>

          {/* NORTH PACIFIC GYRE TARGET DOSSIER CARDS BELOW MAP */}
          <div className="p-6 bg-[#031422] border-t border-[#67D9E8]/20 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white font-display uppercase tracking-wider">
                  NORTH PACIFIC GYRE ACOUSTIC TARGET DOSSIER
                </h3>
                <p className="text-xs text-[#8EA9C1] font-mono">
                  Click any target card to open its acoustic popup directly on the Google Map
                </p>
              </div>

              <span className="text-xs font-mono text-[#67D9E8]">
                SHOWING {filteredDetections.length} OF {GYRE_DETECTIONS.length} TARGETS
              </span>
            </div>

            {/* Target Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredDetections.map((target) => (
                <div
                  key={target.id}
                  onClick={() => {
                    setSelectedTarget(target);
                    setActivePopupTarget(target);
                  }}
                  className={`cursor-pointer rounded-xl p-4 transition-all duration-200 space-y-3 flex flex-col justify-between border ${
                    selectedTarget?.id === target.id
                      ? 'bg-[#04243e] border-[#67D9E8] shadow-[0_0_20px_rgba(103,217,232,0.3)]'
                      : 'bg-[#020b14]/80 border-white/10 hover:border-[#67D9E8]/40 hover:bg-[#031B2E]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#67D9E8] px-2 py-0.5 rounded bg-[#031B2E] border border-[#67D9E8]/30">
                        {target.id}
                      </span>
                      
                      {/* Legend category badge */}
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        target.legendType === 'VERIFIED'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : target.legendType === 'HAZARD'
                          ? 'bg-red-500/15 text-red-300 border border-red-500/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}>
                        {target.legendType} ({target.confidence}%)
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white font-display uppercase leading-snug">
                      {target.name}
                    </h4>

                    <p className="text-[11px] text-[#8EA9C1] font-mono">
                      {target.category}
                    </p>

                    <div className="space-y-1 text-[10px] font-mono text-[#A4C2DC] pt-1">
                      <div className="flex justify-between">
                        <span>COORDS:</span>
                        <span className="text-white font-semibold">{target.coords}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DEPTH:</span>
                        <span className="text-white">{target.depth}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                    <span className={
                      target.legendType === 'VERIFIED'
                        ? 'text-emerald-300'
                        : target.legendType === 'HAZARD'
                        ? 'text-red-300'
                        : 'text-amber-300'
                    }>
                      {target.legendType === 'VERIFIED' ? '✓ Verified' : target.legendType === 'HAZARD' ? '🚨 Hazard' : '⚠ Review'}
                    </span>
                    <Link
                      to="/analyze"
                      className="text-[#67D9E8] hover:text-white underline font-semibold"
                    >
                      Inspect Sonar →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
