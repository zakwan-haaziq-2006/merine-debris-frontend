import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, Waves, ShieldCheck, Compass, Anchor, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#020b14] border-t border-[#67D9E8]/20 text-[#8EA9C1] font-mono text-xs overflow-hidden">
      {/* Deep sea ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#0c3b5e]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Project Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#031B2E] border border-[#67D9E8]/40 shadow-[0_0_15px_rgba(103,217,232,0.25)] group-hover:border-[#67D9E8] transition-colors">
                  <Radio className="w-4 h-4 text-[#67D9E8]" />
                </div>
                <span className="text-xl font-extrabold tracking-widest text-white font-display">
                  DEEPSEA <span className="text-[#67D9E8]">AI</span>
                </span>
              </Link>
            </div>
            <p className="text-[#A4C2DC] text-xs leading-relaxed max-w-md font-sans">
              AI-Powered Automated Underwater Marine Debris and Anomaly Detection System using Side-Scan Sonar Imagery with multi-frequency backscatter analysis and acoustic shadow geometry verification.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#67D9E8]">
              <Anchor className="w-3.5 h-3.5" />
              <span>HYDROGRAPHIC RESEARCH & SUBSEA ROBOTICS DIVISION</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs font-display">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white hover:underline transition-colors">
                  Home (Vessel Hero)
                </Link>
              </li>
              <li>
                <Link to="/analyze" className="hover:text-white hover:underline transition-colors">
                  Sonar Analysis
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-white hover:underline transition-colors">
                  Survey Reports & PDF
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-white hover:underline transition-colors">
                  GIS Detection Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs font-display">
              ACOUSTIC TELEMETRY
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <div>FREQ: <span className="text-white">100 / 400 / 450 kHz</span></div>
              <div>SWATH: <span className="text-white">Dual 100m Swath</span></div>
              <div>AI ENGINE: <span className="text-white">YOLOv11 + Shadow Physics</span></div>
              <div>COORDINATES: <span className="text-emerald-400">13.0827°N, 80.2707°E</span></div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#8EA9C1]">
          <div>
            © 2026 DEEPSEA AI — Underwater Marine Debris & Sonar Intelligence System.
          </div>
          <div className="flex items-center gap-4 text-[#67D9E8]">
            <span>FastAPI • React • Leaflet • Side-Scan Sonar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
