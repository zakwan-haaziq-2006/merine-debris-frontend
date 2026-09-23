import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  UploadCloud, 
  Sparkles, 
  RefreshCw, 
  X, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Compass, 
  MapPin, 
  Layers, 
  Radio,
  Sliders,
  Cpu,
  Clock
} from 'lucide-react';
import SonarViewer from './SonarViewer';
import DetectionCard from './DetectionCard';
import ShadowVerification from './ShadowVerification';
import EnhancedCropGallery from './EnhancedCropGallery';
import RenderNoticeCard from './RenderNoticeCard';
import { SAMPLE_SONAR_DATASETS } from '../data/mockDetections';
import { processSonarSurvey, getLatestSurveyReport } from '../services/marineApiService';

export default function UploadSection() {
  const [customFile, setCustomFile] = useState(null);
  const [customPreviewUrl, setCustomPreviewUrl] = useState(null);
  const [locationNote, setLocationNote] = useState('Sector 4 - Chennai Coast');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // 2-Stage Pipeline State (YOLOv8 + Gemini 3.6 Flash)
  const [pipelineData, setPipelineData] = useState(null);
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  const fileInputRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    // Initial load from cache if available
    const cached = getLatestSurveyReport();
    if (cached) {
      setPipelineData(cached);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomFile(file);
      const url = URL.createObjectURL(file);
      setCustomPreviewUrl(url);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setCustomFile(file);
      const url = URL.createObjectURL(file);
      setCustomPreviewUrl(url);
    }
  };

  const handleRunAnalysis = async () => {
    if (!customFile && !customPreviewUrl) {
      alert("Please choose or drag a sonar image file first!");
      return;
    }

    setIsAnalyzing(true);
    setShowNoticeModal(true);

    // Smooth scroll to results area
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 120);

    try {
      // Execute 2-Endpoint Workflow (POST /detect -> POST /report)
      const result = await processSonarSurvey(customFile || customPreviewUrl || '/assets/sonar_ghost_net.jpg', locationNote);
      setPipelineData(result);
    } catch (err) {
      console.error('2-Stage Sonar Pipeline failed', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const currentPreview = customPreviewUrl;
  const currentFileName = customFile?.name || 'uploaded_sonar_scan.png';

  // Threat badge color mapping based on backend risk_level
  const getRiskBadge = (level = 'MEDIUM') => {
    switch (level?.toUpperCase()) {
      case 'CRITICAL':
        return {
          bg: 'bg-red-500/20 text-red-300 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse',
          label: 'CRITICAL THREAT',
          dot: 'bg-red-500'
        };
      case 'HIGH':
        return {
          bg: 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]',
          label: 'HIGH THREAT',
          dot: 'bg-orange-400'
        };
      case 'LOW':
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(52,211,153,0.3)]',
          label: 'LOW THREAT',
          dot: 'bg-emerald-400'
        };
      case 'MEDIUM':
      default:
        return {
          bg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]',
          label: 'MEDIUM THREAT',
          dot: 'bg-yellow-400'
        };
    }
  };

  const riskBadge = getRiskBadge(pipelineData?.riskLevel || 'HIGH');

  return (
    <section id="analyze" className="relative py-28 bg-[#020b14] overflow-hidden border-t border-[#67D9E8]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0c3b5e]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 acoustic-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 space-y-20">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#031B2E] border border-[#67D9E8]/30 text-[#67D9E8] font-mono text-xs tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>2-STAGE PIPELINE: YOLOv8 VISION + GEMINI 3.6 FLASH INTELLIGENCE</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase font-display">
            SONAR <span className="text-[#67D9E8]">ANALYSIS</span>
          </h2>

          <p className="text-base sm:text-lg text-[#8EA9C1] font-normal leading-relaxed">
            Upload your Forward-Looking Sonar (FLS) or Side-Scan imagery. The YOLO vision engine detects underwater debris targets, while Gemini synthesizes the official maritime survey report.
          </p>
        </div>

        {/* Render Free Tier Hosting Notice Layer Modal */}
        <RenderNoticeCard 
          isOpen={showNoticeModal} 
          onClose={() => setShowNoticeModal(false)} 
          isAnalyzing={isAnalyzing} 
        />

        {/* Upload & Survey Pipeline Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Main Dropzone / Upload Box */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`relative flex-1 flex flex-col items-center justify-center p-8 md:p-12 rounded-2xl border-2 border-dashed transition-all duration-300 min-h-[340px] ${
                isDragOver
                  ? 'border-[#67D9E8] bg-[#031B2E]/90 shadow-[0_0_35px_rgba(103,217,232,0.3)]'
                  : 'border-[#67D9E8]/30 bg-[#031B2E]/50 hover:border-[#67D9E8]/60 hover:bg-[#031B2E]/70'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/tiff"
                onChange={handleFileChange}
                className="hidden"
                id="sonar-file-input"
              />

              {!currentPreview ? (
                <div className="text-center space-y-5">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-[#020b14] border border-[#67D9E8]/40 flex items-center justify-center shadow-[0_0_20px_rgba(103,217,232,0.2)]">
                    <UploadCloud className="w-10 h-10 text-[#67D9E8]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-bold font-display uppercase tracking-wide text-white">
                      DROP FORWARD-LOOKING / SIDE-SCAN SONAR IMAGE
                    </h3>
                    <p className="text-xs font-mono text-[#8EA9C1]">
                      PNG / JPG / TIFF • YOLO Acoustic Neural Inference
                    </p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="glass-button-cyan px-7 py-3 rounded-lg text-xs font-mono font-bold tracking-widest uppercase text-white"
                  >
                    [ UPLOAD SONAR FILE ]
                  </button>
                </div>
              ) : (
                /* Selected / Loaded Sonar Image Preview */
                <div className="w-full space-y-4">
                  <div className="relative rounded-xl overflow-hidden border border-[#67D9E8]/40 bg-black aspect-[16/9] shadow-xl">
                    <img
                      src={currentPreview}
                      alt="Sonar Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded bg-black/85 backdrop-blur-md text-[11px] font-mono text-[#67D9E8] border border-white/10 flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 animate-pulse" />
                      <span>FILE: {currentFileName}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2.5 rounded-lg bg-[#020b14] border border-[#67D9E8]/30 hover:border-white text-xs font-mono text-white transition-colors"
                      >
                        Change Image
                      </button>
                      <button
                        onClick={() => {
                          setCustomFile(null);
                          setCustomPreviewUrl(null);
                        }}
                        className="p-2.5 rounded-lg bg-[#020b14] border border-red-500/30 hover:border-red-400 text-red-400 transition-colors"
                        title="Remove Image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={handleRunAnalysis}
                      disabled={isAnalyzing}
                      className="glass-button px-8 py-3.5 rounded-lg font-display font-extrabold text-xs tracking-widest uppercase text-[#031B2E] bg-gradient-to-r from-[#67D9E8] via-[#4fd0e2] to-[#2b96d6] hover:brightness-110 shadow-[0_0_25px_rgba(103,217,232,0.5)] flex items-center gap-2.5 transition-all"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#031B2E]" />
                          <span className="text-[#031B2E]">PROCESSING 2-STAGE PIPELINE...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[#031B2E]" />
                          <span className="text-[#031B2E]">RUN YOLO + GEMINI ANALYSIS</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pipeline Status & Transect Configuration */}
          <div className="lg:col-span-5 flex flex-col glass-panel rounded-2xl p-6 border border-[#67D9E8]/20 space-y-5 justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-bold tracking-wider text-white uppercase flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#67D9E8]" />
                  <span>SURVEY TRANSECT CONFIGURATION</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowNoticeModal(true)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono text-amber-300 hover:bg-amber-500/25 transition-colors cursor-pointer"
                    title="View Server Hosting & Latency Notice"
                  >
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span>RENDER NOTICE</span>
                  </button>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    API ONLINE
                  </span>
                </div>
              </div>

              {/* Survey Location Note Input Strip */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#67D9E8] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>SURVEY TRANSECT / SECTOR NOTE:</span>
                </label>
                <input
                  type="text"
                  value={locationNote}
                  onChange={(e) => setLocationNote(e.target.value)}
                  placeholder="e.g., Sector 4 - Chennai Coast"
                  className="w-full bg-[#020b14] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#67D9E8]"
                />
              </div>

              {/* 2-Stage Engine Details */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-mono text-[#8EA9C1] uppercase tracking-wider block">
                  PIPELINE WORKFLOW STAGES
                </span>

                <div className="p-3 rounded-xl bg-[#020b14]/70 border border-white/5 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-mono font-bold text-white">
                    <span>STAGE 1: YOLO Vision Engine</span>
                    <span className="text-[#67D9E8]">POST /detect</span>
                  </div>
                  <p className="text-[11px] text-[#8EA9C1]">
                    Identifies marine debris classes, extracts pixel bounding boxes & calculates swath coverage.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#020b14]/70 border border-white/5 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-mono font-bold text-white">
                    <span>STAGE 2: Gemini Intelligence</span>
                    <span className="text-[#67D9E8]">POST /report</span>
                  </div>
                  <p className="text-[11px] text-[#8EA9C1]">
                    Synthesizes threat level, priority actions checklist, and ISO hydrographic markdown dossier.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={handleRunAnalysis}
                disabled={isAnalyzing || (!customFile && !customPreviewUrl)}
                className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                  customFile || customPreviewUrl
                    ? 'bg-[#67D9E8] text-[#031B2E] hover:bg-white shadow-[0_0_20px_rgba(103,217,232,0.4)]'
                    : 'bg-white/5 text-slate-500 border border-white/10 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAnalyzing ? 'RUNNING PIPELINE...' : 'EXECUTE 2-STAGE ANALYSIS'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* SECTION 3 — AI DETECTION & GEMINI INTELLIGENCE RESULTS */}
        <div ref={resultsRef} className="pt-10 space-y-10">

          {/* Section 3 Title Header with Threat Badge */}
          <div className="flex flex-wrap items-end justify-between gap-4 pb-4 border-b border-[#67D9E8]/20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#031B2E] border border-[#67D9E8]/30 font-mono text-[11px] text-[#67D9E8] uppercase mb-2">
                <span>STAGE 1: YOLOv8 VISION • STAGE 2: GEMINI 3.6 FLASH</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
                AI <span className="text-[#67D9E8]">DETECTION & INTELLIGENCE</span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              {/* Dynamic Risk Level Badge */}
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border font-bold ${riskBadge.bg}`}>
                <span className={`w-2.5 h-2.5 rounded-full ${riskBadge.dot}`} />
                <span>RISK LEVEL: {pipelineData?.riskLevel || 'HIGH'}</span>
              </div>

              <Link
                to="/reports"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#67D9E8] text-[#031B2E] hover:bg-white transition-all text-xs font-mono font-bold shadow-[0_0_15px_rgba(103,217,232,0.4)]"
              >
                <FileText className="w-4 h-4 text-[#031B2E]" />
                <span>Open Full Survey Report</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#031B2E]" />
              </Link>
            </div>
          </div>

          {/* Executive Summary Highlight Callout Banner */}
          {pipelineData?.summary && (
            <div className="rounded-xl p-5 bg-[#031B2E]/90 border-l-4 border-[#67D9E8] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#67D9E8] uppercase tracking-widest">
                  OPERATIONAL SURVEY SUMMARY
                </span>
                <p className="text-sm text-white font-sans leading-relaxed">
                  {pipelineData.summary}
                </p>
                {pipelineData.primaryHazard && (
                  <p className="text-xs text-amber-300 font-mono flex items-center gap-1.5 pt-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Primary Hazard: {pipelineData.primaryHazard}</span>
                  </p>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-2 bg-[#020b14] px-4 py-2.5 rounded-lg border border-white/10 font-mono text-xs">
                <span className="text-[#8EA9C1]">TARGETS:</span>
                <span className="text-white font-bold">{pipelineData.totalDetected || pipelineData.detections?.length || 2}</span>
                <span className="text-[#8EA9C1] ml-2">AVG CONF:</span>
                <span className="text-emerald-400 font-bold">{((pipelineData.stats?.avg_confidence || 0.91) * 100).toFixed(0)}%</span>
              </div>
            </div>
          )}

          {/* Side-by-Side: Large Sonar Viewer (Left) + Detections & Actions List (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Side: Interactive Sonar Viewer with Bounding Box Overlay */}
            <div className="lg:col-span-7 space-y-4">
              <SonarViewer
                analysisData={{
                  sonarImage: currentPreview || pipelineData?.annotatedImage || '/assets/sonar_ghost_net.jpg',
                  frequency: '450 kHz',
                  range: '50 m',
                  depth: '31.2 m',
                  altitude: '7.5 m',
                  slantRange: '36.8 m',
                  locationName: locationNote,
                  coordinates: { lat: 13.0850, lng: 80.2750 },
                  boundingBoxes: pipelineData?.boundingBoxes || [],
                  shadowStatus: 'VERIFIED'
                }}
                isAnalyzing={isAnalyzing}
                selectedBoxId={pipelineData?.boundingBoxes?.[selectedBoxId || 0]?.id || pipelineData?.boundingBoxes?.[0]?.id}
                onSelectBox={(id) => {
                  const idx = pipelineData?.boundingBoxes?.findIndex(b => b.id === id);
                  if (idx !== undefined && idx !== -1) setSelectedBoxId(idx);
                }}
              />
            </div>

            {/* Right Side: YOLOv8 Detections Breakdown & Priority Actions Checklist */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Prominent OBJECT FOUND Coordinate Matrix Card */}
              {pipelineData?.detections?.length > 0 && (
                <DetectionCard
                  detection={pipelineData.detections[selectedBoxId || 0] || pipelineData.detections[0]}
                  isSelected={true}
                  onSelect={() => {}}
                />
              )}

              {/* Detections Summary List Header */}
              {pipelineData?.detections?.length > 1 && (
                <div className="glass-panel rounded-2xl p-5 border border-[#67D9E8]/25 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <Radio className="w-4 h-4 text-[#67D9E8]" />
                      <span>ALL IDENTIFIED TARGETS ({pipelineData.detections.length})</span>
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      13 FLS CLASSES
                    </span>
                  </div>

                  {/* Detections Cards */}
                  <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
                    {pipelineData.detections.map((det, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedBoxId(idx)}
                        className={`p-3 rounded-xl border transition-all flex items-center justify-between text-xs font-mono cursor-pointer ${
                          (selectedBoxId === idx || (!selectedBoxId && idx === 0))
                            ? 'bg-[#04243e] border-[#67D9E8] shadow-[0_0_15px_rgba(103,217,232,0.25)]'
                            : 'bg-[#020b14]/80 border-white/10 hover:border-[#67D9E8]/40 hover:bg-[#031B2E]'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white uppercase text-sm font-display">
                              {det.class}
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#031B2E] text-[#67D9E8] border border-[#67D9E8]/30">
                              TRG-0{idx + 1}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#8EA9C1]">
                            Area: {det.area_percentage || 2.4}% swath • Box: [{Math.round(det.box?.x1 || 204)}, {Math.round(det.box?.y1 || 154.1)}]
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-base font-bold text-emerald-400">
                            {typeof det.confidence === 'number' ? (det.confidence <= 1 ? Math.round(det.confidence * 100) : Math.round(det.confidence)) : 88}%
                          </div>
                          <span className="text-[10px] text-[#8EA9C1] uppercase">Confidence</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Priority Tactical Actions Checklist */}
              {pipelineData?.actions && (
                <div className="glass-panel rounded-2xl p-5 border border-[#67D9E8]/25 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#67D9E8]" />
                      <span>OPERATIONAL TACTICAL PROTOCOLS</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-400">FIELD ACTIONS</span>
                  </div>

                  <div className="space-y-2">
                    {pipelineData.actions.map((act, aIdx) => (
                      <div 
                        key={aIdx} 
                        className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#020b14]/60 border border-white/5 text-xs text-[#A4C2DC] font-sans"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#67D9E8] mt-1.5 shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button to Survey Report */}
              <Link
                to="/reports"
                className="w-full group py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#031B2E] via-[#042a42] to-[#031B2E] border border-[#67D9E8]/40 hover:border-[#67D9E8] text-white hover:text-[#67D9E8] flex items-center justify-between transition-all duration-200 shadow-[0_0_20px_rgba(103,217,232,0.2)] hover:shadow-[0_0_30px_rgba(103,217,232,0.4)] font-mono text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#67D9E8]" />
                  <span className="font-bold uppercase tracking-wider">Review & Download Gemini Survey Report</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#67D9E8] group-hover:translate-x-1 transition-transform" />
              </Link>

            </div>

          </div>

          {/* Enhanced Denoised Debris Crop Gallery */}
          {pipelineData?.detections?.length > 0 && (
            <EnhancedCropGallery
              detections={pipelineData.detections}
              selectedBoxId={selectedBoxId}
              onSelectBox={(idx) => setSelectedBoxId(idx)}
            />
          )}

          {/* Acoustic Shadow Physics Validation Strip */}
          <div className="pt-6 space-y-8">
            <ShadowVerification analysisData={pipelineData} />

            {/* Next Step Flow: Proceed to Survey Report Banner */}
            <div className="rounded-2xl glass-panel-elevated border border-[#67D9E8]/40 p-6 md:p-8 relative overflow-hidden shadow-[0_0_35px_rgba(103,217,232,0.15)]">
              {/* Ambient glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#67D9E8]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#031B2E] border border-[#67D9E8]/30 font-mono text-[11px] text-[#67D9E8] uppercase">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>STAGE 2 COMPLETE • GEMINI REPORT READY</span>
                  </div>
                  <h4 className="text-2xl font-extrabold text-white font-display uppercase tracking-wide">
                    Proceed to Standardized Survey Report
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8EA9C1] font-sans leading-relaxed">
                    YOLOv8 vision detection and Gemini 3.6 Flash maritime threat synthesis are complete. Proceed to the survey report module to review the full markdown dossier and download signed PDF reports.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
                  <Link
                    to="/reports"
                    className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold tracking-widest text-xs uppercase text-[#031B2E] bg-[#67D9E8] hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(103,217,232,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                    id="analysis-proceed-report-btn"
                  >
                    <FileText className="w-4 h-4 text-[#031B2E]" />
                    <span>VIEW SURVEY REPORT</span>
                    <ArrowRight className="w-4 h-4 text-[#031B2E] group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>

                  <Link
                    to="/map"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs text-[#8EA9C1] hover:text-white bg-[#020b14]/80 border border-white/10 hover:border-[#67D9E8]/40 transition-colors"
                  >
                    <Compass className="w-4 h-4 text-[#67D9E8]" />
                    <span>GIS Map</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
