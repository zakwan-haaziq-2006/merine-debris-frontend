import React, { useEffect, useRef } from 'react';

/**
 * VesselCanvas
 * Renders the realistic top-down research survey vessel on deep ocean water
 * with physics bobbing, gentle survey movement, stern wake, and subtle acoustic sonar pulse waves.
 */
export default function VesselCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Load ship image and prepare transparent sprite
    const shipImg = new Image();
    shipImg.src = '/assets/survey_vessel.jpg';
    let shipSprite = null;

    shipImg.onload = () => {
      // Key out dark background to create transparent vessel sprite
      const offCanvas = document.createElement('canvas');
      offCanvas.width = shipImg.naturalWidth;
      offCanvas.height = shipImg.naturalHeight;
      const offCtx = offCanvas.getContext('2d');
      offCtx.drawImage(shipImg, 0, 0);

      const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

        if (brightness < 16 && r < 24 && g < 24 && b < 24) {
          data[i + 3] = 0; // Pure transparent for black background
        } else if (brightness < 32 && r < 36 && g < 36 && b < 36) {
          // Feathered smooth edge
          data[i + 3] = Math.floor(((brightness - 16) / 16) * 255);
        }
      }
      offCtx.putImageData(imgData, 0, 0);
      shipSprite = offCanvas;
    };

    // Physics and simulation state
    let time = 0;
    const waves = [];
    const maxWaves = 3;
    for (let i = 0; i < maxWaves; i++) {
      waves.push({
        radius: (i * 90),
        maxRadius: 280,
        opacity: 0.6 - (i * 0.15),
        speed: 0.75
      });
    }

    // Wake particle system
    const wakeParticles = [];

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Responsive positioning: center-right on desktop, center on mobile
      const isMobile = width < 768;
      const baseCenterX = isMobile ? width * 0.5 : width * 0.72;
      const baseCenterY = isMobile ? height * 0.68 : height * 0.5;

      // Realistic slow survey patrol drift and oceanic bobbing
      const driftX = Math.sin(time * 0.3) * 18;
      const driftY = Math.cos(time * 0.22) * 12;
      const bobY = Math.sin(time * 1.4) * 4.5;
      const rollAngle = Math.sin(time * 1.1) * 0.025; // in radians (~1.4 deg)

      const shipX = baseCenterX + driftX;
      const shipY = baseCenterY + driftY + bobY;

      // Desired ship visual scale
      const shipTargetLength = isMobile ? 220 : 340;
      const scale = shipSprite ? shipTargetLength / shipSprite.height : 0.4;
      const drawWidth = shipSprite ? shipSprite.width * scale : 160;
      const drawHeight = shipSprite ? shipSprite.height * scale : 340;

      // 1. Spawn subtle wake foam particles behind stern
      if (Math.random() < 0.35) {
        wakeParticles.push({
          x: shipX + (Math.random() - 0.5) * (drawWidth * 0.35),
          y: shipY + drawHeight * 0.45 + (Math.random() * 10),
          radius: Math.random() * 6 + 4,
          maxRadius: Math.random() * 24 + 18,
          opacity: 0.38,
          vx: (Math.random() - 0.5) * 0.4,
          vy: Math.random() * 0.5 + 0.3,
          life: 0,
          maxLife: 90
        });
      }

      // Draw & update wake particles
      for (let i = wakeParticles.length - 1; i >= 0; i--) {
        const p = wakeParticles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.radius += (p.maxRadius - p.radius) * 0.03;
        p.opacity = 0.38 * (1 - p.life / p.maxLife);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * 0.6})`);
        grad.addColorStop(0.5, `rgba(103, 217, 232, ${p.opacity * 0.3})`);
        grad.addColorStop(1, 'rgba(3, 27, 46, 0)');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) {
          wakeParticles.splice(i, 1);
        }
      }

      // 2. Realistic Side-Scan Sonar Acoustic Pulse Sweep
      ctx.save();
      ctx.translate(shipX, shipY);

      waves.forEach((wave) => {
        wave.radius += wave.speed;
        if (wave.radius > wave.maxRadius) {
          wave.radius = 20;
        }
        const progress = wave.radius / wave.maxRadius;
        const currentOpacity = (1 - progress) * 0.45;

        // Sonar Acoustic Port / Starboard beam arcs
        ctx.beginPath();
        ctx.ellipse(0, 0, wave.radius * 1.25, wave.radius * 0.95, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(103, 217, 232, ${currentOpacity * 0.85})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([8, 6]);
        ctx.stroke();

        // Subtle inner glow ring
        ctx.beginPath();
        ctx.ellipse(0, 0, wave.radius * 1.25, wave.radius * 0.95, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.4})`;
        ctx.lineWidth = 0.6;
        ctx.setLineDash([]);
        ctx.stroke();
      });

      // Subtle acoustic swath lines (port and starboard sonar fan)
      const sweepAngle = Math.sin(time * 0.8) * 0.15;
      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.lineTo(-240, Math.sin(time * 0.6) * 30);
      ctx.moveTo(15, 0);
      ctx.lineTo(240, -Math.sin(time * 0.6) * 30);
      ctx.strokeStyle = 'rgba(103, 217, 232, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // 3. Render realistic Survey Vessel
      if (shipSprite) {
        ctx.save();
        ctx.translate(shipX, shipY);
        ctx.rotate(rollAngle);

        // Water contact shadow beneath hull
        ctx.save();
        ctx.filter = 'blur(12px)';
        ctx.fillStyle = 'rgba(1, 10, 18, 0.65)';
        ctx.beginPath();
        ctx.ellipse(8, 12, drawWidth * 0.45, drawHeight * 0.48, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Subtle water displacement caustics around hull
        ctx.save();
        ctx.strokeStyle = 'rgba(103, 217, 232, 0.25)';
        ctx.lineWidth = 2;
        ctx.filter = 'blur(4px)';
        ctx.beginPath();
        ctx.ellipse(0, 0, drawWidth * 0.52, drawHeight * 0.52, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Draw transparent hull
        ctx.drawImage(
          shipSprite,
          -drawWidth / 2,
          -drawHeight / 2,
          drawWidth,
          drawHeight
        );

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
