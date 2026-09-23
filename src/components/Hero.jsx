import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Radio } from 'lucide-react';
import VesselCanvas from './VesselCanvas';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#020b14] pt-24 pb-12">
      {/* High-Resolution Aerial Ocean Background with Natural Water Swell */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-85 transition-transform duration-1000 scale-105 animate-water-drift"
        style={{
          backgroundImage: `url('/assets/ocean_water_bg.jpg')`,
        }}
      >
        {/* Deep Ocean Vignette & Depth Mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020b14]/90 via-[#031B2E]/40 to-[#020b14]/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020b14]/60 via-transparent to-[#020b14] pointer-events-none" />
        
        {/* Subtle acoustic coordinate grid lines */}
        <div className="absolute inset-0 acoustic-grid opacity-30 pointer-events-none" />
      </div>

      {/* Realistic Moving Research Survey Vessel & Sonar Sweep Simulation */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <VesselCanvas />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 flex-1 flex flex-col justify-center my-auto">
        <div className="max-w-3xl space-y-6">
          
          {/* Research Classification Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#031B2E]/80 border border-[#67D9E8]/30 backdrop-blur-md shadow-[0_0_20px_rgba(103,217,232,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#67D9E8] animate-ping"></span>
            <span className="text-[11px] font-mono font-semibold tracking-widest text-[#67D9E8] uppercase">
              DEEP HYDROGRAPHIC SURVEY • YOLOv11 + ACOUSTIC SHADOW VERIFICATION
            </span>
          </div>

          {/* Main Huge Bold Heading */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white uppercase font-display leading-[0.92] drop-shadow-2xl">
              DEEPSEA <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#67D9E8]">AI</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider text-[#67D9E8] font-display uppercase drop-shadow-md">
              AI-POWERED UNDERWATER INTELLIGENCE
            </p>
          </div>

          {/* Supporting Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#A4C2DC] max-w-2xl font-normal leading-relaxed">
            Automatically detect marine debris, ghost fishing nets, pipelines, and submerged anomalies from side-scan sonar imagery with subsea acoustic shadow verification.
          </p>

          {/* CTA Action Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-5">
            <Link
              to="/analyze"
              className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-lg font-bold tracking-widest text-sm uppercase text-white bg-white/5 border border-white/50 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#031B2E] hover:border-white hover:shadow-[0_0_35px_rgba(255,255,255,0.4),0_0_50px_rgba(103,217,232,0.3)] hover:-translate-y-0.5 active:translate-y-0"
              id="hero-explore-btn"
            >
              <span>EXPLORE NOW</span>
              <ArrowRight className="w-4 h-4 text-[#67D9E8] group-hover:text-[#031B2E] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/map"
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-lg font-semibold tracking-wider text-xs uppercase text-[#8EA9C1] hover:text-white transition-colors"
            >
              <Compass className="w-4 h-4 text-[#67D9E8]" />
              <span>LIVE GIS TRACKLINE</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Marine Research Telemetry Footer Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 w-full mt-8">
        <div className="glass-panel rounded-xl p-4 md:p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 border border-[#67D9E8]/20">
          <div>
            <span className="block text-[10px] font-mono text-[#8EA9C1] uppercase tracking-wider">VESSEL</span>
            <span className="text-xs sm:text-sm font-bold font-mono text-white">R/V OCEAN EXPLORER</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-[#8EA9C1] uppercase tracking-wider">ACOUSTIC FREQ</span>
            <span className="text-xs sm:text-sm font-bold font-mono text-[#67D9E8]">400 kHz (DUAL SWATH)</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-[#8EA9C1] uppercase tracking-wider">BATHYMETRY DEPTH</span>
            <span className="text-xs sm:text-sm font-bold font-mono text-white">38.4 m</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-[#8EA9C1] uppercase tracking-wider">TOWFISH ALTITUDE</span>
            <span className="text-xs sm:text-sm font-bold font-mono text-white">6.2 m OFF SEABED</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-[#8EA9C1] uppercase tracking-wider">SWATH WIDTH</span>
            <span className="text-xs sm:text-sm font-bold font-mono text-white">100 m (50m P/S)</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-[#8EA9C1] uppercase tracking-wider">SURVEY POSITION</span>
            <span className="text-xs sm:text-sm font-bold font-mono text-emerald-400">13°05'N, 80°16'E</span>
          </div>
        </div>
      </div>

    </section>
  );
}
