import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import ReportPage from './pages/ReportPage';
import MapPage from './pages/MapPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#020b14] text-white flex flex-col font-sans selection:bg-[#67D9E8] selection:text-[#031B2E]">
        {/* Automatic Scroll to Top on Route Change */}
        <ScrollToTop />

        {/* Persistent Sticky Marine Navigation Bar */}
        <Navbar />

        {/* Dynamic Route View */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/reports" element={<ReportPage />} />
            <Route path="/report" element={<Navigate to="/reports" replace />} />
            <Route path="/map" element={<MapPage />} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Marine Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
