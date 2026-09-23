const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Samiiksha\\.gemini\\antigravity-ide\\brain\\105f7b75-dcd4-4ff1-8f85-be15a2514a2d';
const destDir = 'D:\\Ocean debris\\public\\assets';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const assets = [
  { src: 'ocean_water_overhead_1788158686242.jpg', dest: 'ocean_water_bg.jpg' },
  { src: 'hero_ocean_aerial_1788158626434.jpg', dest: 'hero_ocean_aerial.jpg' },
  { src: 'survey_vessel_topdown_1788158730253.jpg', dest: 'survey_vessel.jpg' },
  { src: 'sonar_ghost_net_1788158777856.jpg', dest: 'sonar_ghost_net.jpg' },
  { src: 'sonar_pipeline_1788158842835.jpg', dest: 'sonar_pipeline.jpg' },
  { src: 'sonar_cargo_container_1788158911192.jpg', dest: 'sonar_cargo_container.jpg' },
  { src: 'sonar_shipwreck_debris_1788159017939.jpg', dest: 'sonar_shipwreck_debris.jpg' }
];

assets.forEach(item => {
  const srcPath = path.join(srcDir, item.src);
  const destPath = path.join(destDir, item.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${item.src} -> ${item.dest}`);
  } else {
    console.warn(`Source not found: ${srcPath}`);
  }
});
