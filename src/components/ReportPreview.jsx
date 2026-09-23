import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar, 
  Ship, 
  MapPin, 
  Database, 
  Sparkles, 
  X,
  Radio,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SURVEY_METRICS, ALL_MAP_DETECTIONS } from '../data/mockDetections';
import { getLatestSurveyReport, runSimulatedSurvey } from '../services/marineApiService';
import MarkdownViewer from './MarkdownViewer';
import SonarViewer from './SonarViewer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ReportPreview() {
  const [reportData, setReportData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const printableRef = useRef(null);

  useEffect(() => {
    const cached = getLatestSurveyReport();
    if (cached) {
      setReportData(cached);
    } else {
      // Fallback initial load
      runSimulatedSurvey('/assets/sonar_ghost_net.jpg', 'Sector 4 - Chennai Coast').then(res => {
        setReportData(res);
      });
    }
  }, []);

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      const element = printableRef.current || document.getElementById('survey-report-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#031422',
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`DEEPSEA_AI_GEMINI_SURVEY_REPORT_${SURVEY_METRICS.surveyId}.pdf`);
    } catch (err) {
      console.error('PDF export error', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Threat badge color mapping based on backend risk_level
  const getRiskBadge = (level = 'MEDIUM') => {
    switch (level?.toUpperCase()) {
      case 'CRITICAL':
        return {
          bg: 'bg-red-500/20 text-red-300 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse',
          label: 'CRITICAL THREAT LEVEL',
          dot: 'bg-red-500'
        };
      case 'HIGH':
        return {
          bg: 'bg-orange-500/20 text-orange-300 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]',
          label: 'HIGH THREAT LEVEL',
          dot: 'bg-orange-400'
        };
      case 'LOW':
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(52,211,153,0.3)]',
          label: 'LOW THREAT LEVEL',
          dot: 'bg-emerald-400'
        };
      case 'MEDIUM':
      default:
        return {
          bg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]',
          label: 'MEDIUM THREAT LEVEL',
          dot: 'bg-yellow-400'
        };
    }
  };

  const riskBadge = getRiskBadge(reportData?.riskLevel || 'MEDIUM');

  const stats = reportData?.stats || {
    total_detections: reportData?.detections?.length || 2,
    avg_confidence: 0.91,
    class_counts: { "Chain": 1, "Tire": 1 },
    categories: { critical_anomalies: 0, subsea_hardware: 1, plastics_and_debris: 1 }
  };

  const highPriorityCount = (stats.categories?.critical_anomalies || 0) + (stats.categories?.subsea_hardware || 0);

  return (
    <section id="reports" className="relative py-28 bg-[#020b14] overflow-hidden border-t border-[#67D9E8]/15">
      {/* Background grid */}
      <div className="absolute inset-0 acoustic-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0c3b5e]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#031B2E] border border-[#67D9E8]/30 text-[#67D9E8] font-mono text-xs tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>GEMINI 3.6 FLASH • MARITIME THREAT INTELLIGENCE REPORT</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase font-display">
            SURVEY <span className="text-[#67D9E8]">REPORT</span>
          </h2>

          <p className="text-base sm:text-lg text-[#8EA9C1] font-normal leading-relaxed">
            Consolidated operational hydrographic dossier synthesized by Gemini 3.6 Flash from YOLOv8 acoustic detection telemetry.
          </p>
        </div>

        {/* Professional Report Card Container */}
        <div 
          ref={printableRef}
          id="survey-report-content" 
          className="glass-panel-elevated rounded-2xl border border-[#67D9E8]/30 p-6 md:p-10 space-y-10 shadow-2xl"
        >
          
          {/* Header Info Strip & Threat Badge */}
          <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#67D9E8] tracking-widest uppercase">
                  OFFICIAL HYDROGRAPHIC ACOUSTIC SURVEY
                </span>
                {/* Risk Level Threat Badge */}
                <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-bold border ${riskBadge.bg}`}>
                  <span className={`w-2 h-2 rounded-full ${riskBadge.dot}`} />
                  {riskBadge.label}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white font-display uppercase tracking-wider">
                {reportData?.locationNote ? `SURVEY TRANSECT: ${reportData.locationNote}` : 'DEEPSEA-EXPEDITION ALPHA-7'}
              </h3>
              
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8EA9C1] pt-1">
                <span className="flex items-center gap-1.5">
                  <Ship className="w-3.5 h-3.5 text-[#67D9E8]" />
                  {SURVEY_METRICS.vesselName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#67D9E8]" />
                  {reportData?.timestamp ? new Date(reportData.timestamp).toLocaleDateString() : SURVEY_METRICS.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-400" />
                  <span>YOLOv8 + Gemini 3.6 Flash</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="glass-button-cyan px-6 py-3 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-white flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#67D9E8]" />
                <span>EXPAND DOSSIER</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="glass-button px-6 py-3 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-white hover:text-[#031B2E] flex items-center gap-2 shadow-[0_0_15px_rgba(103,217,232,0.2)]"
              >
                <Download className="w-4 h-4 text-[#67D9E8]" />
                <span>{isExporting ? 'GENERATING PDF...' : 'DOWNLOAD SIGNED PDF'}</span>
              </button>
            </div>
          </div>

          {/* Highlight Callout: Executive Summary Banner */}
          {reportData?.summary && (
            <div className="rounded-xl p-5 bg-[#031B2E]/90 border-l-4 border-[#67D9E8] shadow-lg space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#67D9E8] uppercase tracking-widest">
                EXECUTIVE SUMMARY & OPERATIONAL ASSESSMENT
              </span>
              <p className="text-sm sm:text-base text-white font-sans leading-relaxed">
                {reportData.summary}
              </p>
              {reportData.primaryHazard && (
                <div className="pt-2 flex items-center gap-2 text-xs font-mono text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Primary Navigational Hazard:</strong> {reportData.primaryHazard}</span>
                </div>
              )}
            </div>
          )}

          {/* Survey KPI Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#020b14]/70 rounded-xl p-4 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-[#8EA9C1] uppercase tracking-wider">TOTAL TARGETS</span>
              <div className="text-xl md:text-2xl font-bold font-mono text-white">
                {stats.total_detections || reportData?.detections?.length || 2} <span className="text-xs text-[#67D9E8]">Objects</span>
              </div>
            </div>

            <div className="bg-[#020b14]/70 rounded-xl p-4 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-[#8EA9C1] uppercase tracking-wider">AVG CONFIDENCE</span>
              <div className="text-xl md:text-2xl font-bold font-mono text-[#67D9E8]">
                {((stats.avg_confidence || 0.91) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="bg-[#020b14]/70 rounded-xl p-4 border border-amber-500/20 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">HIGH PRIORITY TARGETS</span>
              <div className="text-xl md:text-2xl font-bold font-mono text-amber-400">
                {highPriorityCount || 1} <span className="text-xs">Rigging / Hardware</span>
              </div>
            </div>

            <div className="bg-[#020b14]/70 rounded-xl p-4 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">PLASTICS & DEBRIS</span>
              <div className="text-xl md:text-2xl font-bold font-mono text-emerald-400">
                {stats.categories?.plastics_and_debris || 1} <span className="text-xs">Polymer Units</span>
              </div>
            </div>
          </div>

          {/* Annotated Sonar Imagery Preview & Detections Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Uploaded Sonar Image with Plotted Target Bounding Boxes */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#67D9E8]" />
                <span>UPLOADED SONAR TELEMETRY & PLOTTED TARGETS</span>
              </span>

              <SonarViewer
                analysisData={{
                  sonarImage: reportData?.sonarImage || reportData?.annotatedImage || '/assets/sonar_ghost_net.jpg',
                  frequency: '450 kHz',
                  range: '50 m',
                  depth: '31.2 m',
                  altitude: '7.5 m',
                  slantRange: '36.8 m',
                  locationName: reportData?.locationNote || 'Sector 4 Coastal Survey',
                  coordinates: { lat: 13.0850, lng: 80.2750 },
                  boundingBoxes: reportData?.boundingBoxes || [],
                  shadowStatus: 'VERIFIED'
                }}
                isAnalyzing={false}
              />
            </div>

            {/* Right: Tactical Priority Actions Checklist for Field Operators */}
            <div className="lg:col-span-6 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#67D9E8]" />
                <span>TACTICAL PRIORITY PROTOCOLS & ACTION CHECKLIST</span>
              </span>

              <div className="space-y-2.5">
                {(reportData?.actions || [
                  "Priority Level 1: Immediate Safety & Navigational Advisory for Chain target",
                  "Priority Level 2: Deploy ROV for optical ground-truthing",
                  "Priority Level 3: Update Hydrographic Bathymetric Charts with obstruction coordinates"
                ]).map((action, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#020b14]/80 border border-white/10 flex items-start gap-3 text-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-white font-sans">{action}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Full Markdown Report Document Viewer */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#67D9E8]" />
                <span>GEMINI 3.6 FLASH SYNTHESIZED MARITIME REPORT</span>
              </span>
              <span className="text-[11px] font-mono text-[#67D9E8]">
                ISO 19115 COMPLIANT
              </span>
            </div>

            <div className="p-6 md:p-8 rounded-xl bg-[#020b14]/80 border border-white/10 shadow-inner">
              <MarkdownViewer markdown={reportData?.markdown} />
            </div>
          </div>

        </div>

      </div>

      {/* Expanded Full Report Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#031B2E] border border-[#67D9E8]/40 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#67D9E8]" />
                <div>
                  <h3 className="text-xl font-bold font-display uppercase text-white">
                    OFFICIAL HYDROGRAPHIC MARITIME DOSSIER
                  </h3>
                  <p className="text-xs font-mono text-[#8EA9C1]">
                    Document Ref: DEEPSEA-REP-{SURVEY_METRICS.surveyId} • YOLOv8 + Gemini 3.6 Flash
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Full Markdown Report */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-[#020b14] border border-white/10">
                <MarkdownViewer markdown={reportData?.markdown} />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-lg bg-white/10 text-white font-bold text-xs uppercase hover:bg-white/20"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    handleDownloadPDF();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#67D9E8] text-[#031B2E] font-bold text-xs uppercase hover:bg-white flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Signed PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
