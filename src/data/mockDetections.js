export const SAMPLE_SONAR_DATASETS = [
  {
    id: 'sample-ghost-net',
    name: 'GHOST FISHING NET',
    shortName: 'GHOST NET',
    category: 'Marine Debris / Lost Fishing Gear',
    confidence: 94,
    shadowStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    riskLevel: 'CRITICAL',
    sonarImage: '/assets/sonar_ghost_net.jpg',
    locationName: 'Bay of Bengal — Transect B-14',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    depth: '28.4 m',
    altitude: '6.2 m',
    frequency: '400 kHz',
    range: '40 m',
    slantRange: '32.1 m',
    dimensions: '4.8 m × 3.6 m × 1.85 m',
    material: 'High-Density Polyethylene (HDPE) Monofilament',
    shadowAnalysis: {
      shadowDetected: true,
      shadowLength: '18.4 m',
      targetHeightCalculated: '1.85 m',
      grazingAngle: '14.2°',
      acousticBackscatter: 'High (Specular reflection from trapped floats)',
      shadowGeometry: 'Irregular trapezoid corresponding to net clump mass',
      consistencyScore: 96.4,
      verificationSteps: [
        { label: 'Acoustic highlight backscatter threshold', passed: true, detail: '+18.4 dB above ambient seabed' },
        { label: 'Acoustic shadow presence & continuity', passed: true, detail: 'Dark low-intensity zone (0.02 lux eq)' },
        { label: 'Towfish altitude-to-shadow height ratio', passed: true, detail: 'Estimated elevation: 1.85m ±0.1m' },
        { label: 'Morphological shape validation', passed: true, detail: 'Matches synthetic net entanglement model' }
      ]
    },
    boundingBoxes: [
      {
        id: 'box-gn-1',
        label: 'GHOST NET',
        confidence: 94,
        x: 41, // %
        y: 33, // %
        w: 22, // %
        h: 33, // %
        color: '#67D9E8',
        shadowBox: {
          x: 58,
          y: 37,
          w: 36,
          h: 24,
          label: 'ACOUSTIC SHADOW (18.4m)'
        }
      }
    ]
  },
  {
    id: 'sample-pipeline',
    name: 'SUBSEA EXPOSED PIPELINE',
    shortName: 'PIPE',
    category: 'Subsea Infrastructure / Hazard',
    confidence: 82,
    shadowStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    riskLevel: 'MODERATE',
    sonarImage: '/assets/sonar_pipeline.jpg',
    locationName: 'North Sea Basin — Pipeline Corridor Alpha',
    coordinates: { lat: 52.1432, lng: 3.4156 },
    depth: '54.0 m',
    altitude: '8.5 m',
    frequency: '450 kHz',
    range: '50 m',
    slantRange: '48.2 m',
    dimensions: '48.0 m exposed × 0.85 m dia',
    material: 'Coated Structural Carbon Steel',
    shadowAnalysis: {
      shadowDetected: true,
      shadowLength: '4.8 m',
      targetHeightCalculated: '0.88 m',
      grazingAngle: '18.6°',
      acousticBackscatter: 'Linear continuous specular return',
      shadowGeometry: 'Parallel linear occlusion across sandy megaripples',
      consistencyScore: 91.2,
      verificationSteps: [
        { label: 'Linear backscatter continuity', passed: true, detail: 'Continuous cylindrical reflector detected' },
        { label: 'Acoustic shadow clearance', passed: true, detail: 'Span freespan gap detected at Station 02' },
        { label: 'Elevation profile vs Seabed bathymetry', passed: true, detail: 'Height matches 34" OD pipe spec' },
        { label: 'Spatial azimuth correlation', passed: true, detail: 'Orientation 092° consistent with pipeline chart' }
      ]
    },
    boundingBoxes: [
      {
        id: 'box-pipe-1',
        label: 'PIPE',
        confidence: 82,
        x: 4,
        y: 46,
        w: 92,
        h: 6,
        color: '#67D9E8',
        shadowBox: {
          x: 4,
          y: 43,
          w: 92,
          h: 4,
          label: 'PARALLEL ACOUSTIC SHADOW'
        }
      }
    ]
  },
  {
    id: 'sample-container',
    name: 'LOST SHIPPING CONTAINER',
    shortName: 'CARGO CONTAINER',
    category: 'Heavy Marine Debris / Navigation Hazard',
    confidence: 91,
    shadowStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    riskLevel: 'CRITICAL',
    sonarImage: '/assets/sonar_cargo_container.jpg',
    locationName: 'Cape Hatteras Shelf — Nav Channel 7',
    coordinates: { lat: 35.1245, lng: -75.3478 },
    depth: '38.5 m',
    altitude: '12.0 m',
    frequency: '400 kHz',
    range: '50 m',
    slantRange: '39.4 m',
    dimensions: '12.2 m × 2.44 m × 2.59 m (40ft ISO Box)',
    material: 'Corten Steel / Corrugated Freight Hull',
    shadowAnalysis: {
      shadowDetected: true,
      shadowLength: '24.2 m',
      targetHeightCalculated: '2.54 m',
      grazingAngle: '11.8°',
      acousticBackscatter: 'Hard right-angle specular corner reflector',
      shadowGeometry: 'Sharp rectangular geometric shadow occlusion',
      consistencyScore: 98.1,
      verificationSteps: [
        { label: 'Corner reflector acoustic signature', passed: true, detail: 'Sharp orthogonal specular backscatter' },
        { label: 'Geometric shadow bounds calculation', passed: true, detail: 'Sharp trapezoidal shadow 24.2m long' },
        { label: 'Calculated 3D height', passed: true, detail: '2.54m (Matches standard 8.5ft ISO container)' },
        { label: 'Structural integrity index', passed: true, detail: 'Intact hull structure resting upright' }
      ]
    },
    boundingBoxes: [
      {
        id: 'box-cont-1',
        label: 'CARGO CONTAINER',
        confidence: 91,
        x: 39,
        y: 40,
        w: 6,
        h: 18,
        color: '#67D9E8',
        shadowBox: {
          x: 45,
          y: 40,
          w: 39,
          h: 38,
          label: 'SHARP ACOUSTIC SHADOW (24.2m)'
        }
      }
    ]
  },
  {
    id: 'sample-debris-field',
    name: 'UNVERIFIED ANOMALY / DEBRIS CLUSTER',
    shortName: 'POSSIBLE DEBRIS',
    category: 'Scattered Seafloor Clutter',
    confidence: 61,
    shadowStatus: 'UNCERTAIN',
    reviewStatus: 'REQUIRES_REVIEW',
    riskLevel: 'LOW_WARNING',
    sonarImage: '/assets/sonar_shipwreck_debris.jpg',
    locationName: 'Strait of Malacca — Sector 09',
    coordinates: { lat: 4.2105, lng: 100.5512 },
    depth: '34.0 m',
    altitude: '9.0 m',
    frequency: '450 kHz',
    range: '75 m',
    slantRange: '68.0 m',
    dimensions: '8.4 m × 6.2 m cluster (multi-fragment)',
    material: 'Mixed Metal / Timber / Geological Outcrop',
    shadowAnalysis: {
      shadowDetected: false,
      shadowLength: 'Fragmented / Low contrast',
      targetHeightCalculated: '0.42 m (Inconclusive)',
      grazingAngle: '22.4°',
      acousticBackscatter: 'Diffuse multi-scattering',
      shadowGeometry: 'Discontinuous acoustic shadow; high ambiguity with rock reef',
      consistencyScore: 54.8,
      verificationSteps: [
        { label: 'Backscatter brightness peak', passed: true, detail: 'High reflection elements present' },
        { label: 'Acoustic shadow continuity test', passed: false, detail: '⚠ Shadow contrast below 4.5 dB threshold' },
        { label: 'Geometric correlation', passed: false, detail: '⚠ Irregular aspect ratio; potential natural rock' },
        { label: 'Human sonar technician validation', passed: false, detail: '⚠ Flagged for secondary acoustic survey' }
      ]
    },
    boundingBoxes: [
      {
        id: 'box-deb-1',
        label: 'POSSIBLE DEBRIS',
        confidence: 61,
        x: 47,
        y: 20,
        w: 37,
        h: 65,
        color: '#f59e0b',
        shadowBox: {
          x: 64,
          y: 30,
          w: 30,
          h: 55,
          label: 'DIFFUSE SHADOW (UNCERTAIN)'
        }
      }
    ]
  }
];

export const SURVEY_METRICS = {
  surveyId: 'SUR-2026-001',
  missionName: 'Project Neptune DeepScan Alpha',
  vesselName: 'R/V OCEAN EXPLORER (IMO 9482910)',
  sonarSystem: 'EdgeTech 4200 Dual-Freq (100/400 kHz) Towfish',
  date: 'August 31, 2026',
  areaCoveredKm2: '14.8 km²',
  totalDistanceKm: '42.6 km',
  imagesAnalyzed: 24,
  objectsDetected: 7,
  highConfidence: 5,
  requiresReview: 2,
  averageDepth: '38.2 m',
  processingTimePerScan: '142 ms'
};

export const ALL_MAP_DETECTIONS = [
  {
    id: 'det-01',
    name: 'GHOST NET',
    confidence: 94,
    shadow: 'VERIFIED',
    depth: '28.4 m',
    lat: 13.0827,
    lng: 80.2707,
    risk: 'CRITICAL',
    type: 'Fishing Gear',
    sampleKey: 'sample-ghost-net',
    timestamp: '14:23:08 UTC'
  },
  {
    id: 'det-02',
    name: 'PIPE',
    confidence: 82,
    shadow: 'VERIFIED',
    depth: '54.0 m',
    lat: 13.1240,
    lng: 80.2980,
    risk: 'MODERATE',
    type: 'Subsea Pipe',
    sampleKey: 'sample-pipeline',
    timestamp: '14:38:15 UTC'
  },
  {
    id: 'det-03',
    name: 'CARGO CONTAINER',
    confidence: 91,
    shadow: 'VERIFIED',
    depth: '38.5 m',
    lat: 13.0512,
    lng: 80.2450,
    risk: 'CRITICAL',
    type: 'Freight Debris',
    sampleKey: 'sample-container',
    timestamp: '15:02:44 UTC'
  },
  {
    id: 'det-04',
    name: 'POSSIBLE DEBRIS',
    confidence: 61,
    shadow: 'UNCERTAIN',
    depth: '34.0 m',
    lat: 13.1450,
    lng: 80.3120,
    risk: 'REVIEW',
    type: 'Anomaly Cluster',
    sampleKey: 'sample-debris-field',
    timestamp: '15:19:30 UTC'
  },
  {
    id: 'det-05',
    name: 'TIRE REEF BUNDLE',
    confidence: 88,
    shadow: 'VERIFIED',
    depth: '22.1 m',
    lat: 13.0201,
    lng: 80.2605,
    risk: 'MODERATE',
    type: 'Artificial Clutter',
    sampleKey: 'sample-ghost-net',
    timestamp: '15:44:12 UTC'
  },
  {
    id: 'det-06',
    name: 'LOST ANCHOR & CHAIN',
    confidence: 85,
    shadow: 'VERIFIED',
    depth: '41.0 m',
    lat: 13.0990,
    lng: 80.2850,
    risk: 'MODERATE',
    type: 'Mooring Debris',
    sampleKey: 'sample-cargo-container',
    timestamp: '16:05:00 UTC'
  },
  {
    id: 'det-07',
    name: 'METALLIC CYLINDER (DRUM)',
    confidence: 58,
    shadow: 'UNCERTAIN',
    depth: '46.7 m',
    lat: 13.0710,
    lng: 80.3340,
    risk: 'REVIEW',
    type: 'Chemical/Oil Drum',
    sampleKey: 'sample-debris-field',
    timestamp: '16:22:45 UTC'
  }
];
