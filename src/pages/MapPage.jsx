import React from 'react';
import MapView from '../components/MapView';
import { useNavigate } from 'react-router-dom';

export default function MapPage() {
  const navigate = useNavigate();

  const handleInspectDetection = (det) => {
    // Navigate to analyze page with target query or inspection
    navigate('/analyze');
  };

  return (
    <div className="min-h-screen bg-[#020b14] pt-20">
      <MapView onInspectDetection={handleInspectDetection} />
    </div>
  );
}
