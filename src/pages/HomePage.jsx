import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { 
  Scan, 
  Layers, 
  FileCheck, 
  MapPin, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  Radio, 
  Activity,
  Compass,
  Radar
} from 'lucide-react';
import { SURVEY_METRICS } from '../data/mockDetections';

export default function HomePage() {
  const features = [
    {
      icon: <Scan className="w-6 h-6 text-[#67D9E8]" />,
      title: 'AI SONAR DEBRIS ANALYSIS',
      description: 'Automated deep learning object recognition on raw side-scan waterfall imagery detecting ghost nets, containers, and pipelines.',
      link: '/analyze',
      linkText: 'Launch Analysis',
      tag: 'YOLOv11 ML Model'
    },
    {
      icon: <Layers className="w-6 h-6 text-[#67D9E8]" />,
      title: 'ACOUSTIC SHADOW VERIFICATION',
      description: 'Physics-based validation computing grazing angles, shadow length, and towfish altitude to eliminate false positive seafloor echoes.',
      link: '/analyze',
      linkText: 'Inspect Shadows',
      tag: 'Acoustic Physics'
    },
    {
      icon: <FileCheck className="w-6 h-6 text-[#67D9E8]" />,
      title: 'STANDARDIZED SURVEY REPORTING',
      description: 'Automated generation of marine hydrographic survey inspection reports with full exportable PDF and high-res target documentation.',
      link: '/reports',
      linkText: 'Generate Report',
      tag: 'Automated PDF'
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#67D9E8]" />,
      title: 'GIS HYDROGRAPHIC MAPPING',
      description: 'Real-time spatial visualization along vessel survey tracklines with interactive sonar target pings and GPS coordinates.',
      link: '/map',
      linkText: 'View GIS Map',
      tag: 'Spatial Bathymetry'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Interactive Hero with Survey Vessel & Water Drift */}
      <Hero />

      {/* Mission Quick Navigation & Features Section */}
      <section className="relative py-20 bg-[#020b14] border-t border-[#67D9E8]/15 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0c3b5e]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#67D9E8]/5 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 acoustic-grid opacity-25 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 space-y-16">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#67D9E8]/20 pb-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#031B2E] border border-[#67D9E8]/30 text-[11px] font-mono text-[#67D9E8]">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>INTELLIGENT HYDROGRAPHIC SUITE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide font-display uppercase">
                Subsea Detection & Survey Modules
              </h2>
              <p className="text-[#8EA9C1] text-sm sm:text-base leading-relaxed">
                Seamlessly analyze acoustic side-scan sonar files, verify 3D targets using acoustic shadow geometry, and track geospatial underwater debris in one unified platform.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/analyze"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold tracking-wider text-xs uppercase text-[#031B2E] bg-[#67D9E8] hover:bg-white transition-all shadow-[0_0_20px_rgba(103,217,232,0.4)]"
              >
                <span>OPEN ANALYZER</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 4 Feature Module Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group relative glass-panel rounded-xl p-6 flex flex-col justify-between hover:border-[#67D9E8]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(1,10,18,0.8),0_0_25px_rgba(103,217,232,0.15)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-[#031422] border border-[#67D9E8]/30 group-hover:border-[#67D9E8] group-hover:shadow-[0_0_15px_rgba(103,217,232,0.3)] transition-all">
                      {feature.icon}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#8EA9C1]">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-display tracking-wider uppercase group-hover:text-[#67D9E8] transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-[#8EA9C1] leading-relaxed font-sans">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/5">
                  <Link
                    to={feature.link}
                    className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#67D9E8] group-hover:text-white transition-colors"
                  >
                    <span>{feature.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Mission Telemetry Summary Strip */}
          <div className="glass-panel-elevated rounded-xl p-6 sm:p-8 border border-[#67D9E8]/30">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div className="md:col-span-1 space-y-1">
                <span className="text-[10px] font-mono text-[#67D9E8] uppercase tracking-widest block">ACTIVE SURVEY</span>
                <h4 className="text-lg font-bold text-white font-display uppercase">{SURVEY_METRICS.missionName}</h4>
                <p className="text-xs text-[#8EA9C1] font-mono">ID: {SURVEY_METRICS.surveyId}</p>
              </div>

              <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-lg bg-[#020b14]/60 border border-[#67D9E8]/15">
                  <span className="text-[10px] font-mono text-[#8EA9C1] uppercase block">SURVEY AREA</span>
                  <span className="text-lg font-bold font-mono text-white">{SURVEY_METRICS.areaCoveredKm2}</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#020b14]/60 border border-[#67D9E8]/15">
                  <span className="text-[10px] font-mono text-[#8EA9C1] uppercase block">SCAN DISTANCE</span>
                  <span className="text-lg font-bold font-mono text-[#67D9E8]">{SURVEY_METRICS.totalDistanceKm}</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#020b14]/60 border border-[#67D9E8]/15">
                  <span className="text-[10px] font-mono text-[#8EA9C1] uppercase block">OBJECTS DETECTED</span>
                  <span className="text-lg font-bold font-mono text-emerald-400">{SURVEY_METRICS.objectsDetected} TARGETS</span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#020b14]/60 border border-[#67D9E8]/15">
                  <span className="text-[10px] font-mono text-[#8EA9C1] uppercase block">AVG DEPTH</span>
                  <span className="text-lg font-bold font-mono text-white">{SURVEY_METRICS.averageDepth}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
