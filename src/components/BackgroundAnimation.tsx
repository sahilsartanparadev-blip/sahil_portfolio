import { useEffect, useRef } from 'react';

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Subtle particles representing 'AI data nodes'
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.5,
    }));

    const animate = () => {
      time += 0.002;
      const w = canvas.width;
      const h = canvas.height;

      // Clear background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);

      // Draw subtle glowing orbs (Aurora effect)
      const gradient1 = ctx.createRadialGradient(
        w * 0.3 + Math.cos(time) * w * 0.2, h * 0.3 + Math.sin(time) * h * 0.2, 0,
        w * 0.3 + Math.cos(time) * w * 0.2, h * 0.3 + Math.sin(time) * h * 0.2, w * 0.5
      );
      gradient1.addColorStop(0, 'rgba(34, 211, 166, 0.07)'); // Primary green glow
      gradient1.addColorStop(1, 'rgba(34, 211, 166, 0)');

      const gradient2 = ctx.createRadialGradient(
        w * 0.7 + Math.cos(time + 2) * w * 0.2, h * 0.6 + Math.sin(time + 2) * h * 0.2, 0,
        w * 0.7 + Math.cos(time + 2) * w * 0.2, h * 0.6 + Math.sin(time + 2) * h * 0.2, w * 0.5
      );
      gradient2.addColorStop(0, 'rgba(59, 130, 246, 0.06)'); // Secondary blue glow
      gradient2.addColorStop(1, 'rgba(59, 130, 246, 0)');

      const gradient3 = ctx.createRadialGradient(
        w * 0.5 + Math.cos(time + 4) * w * 0.2, h * 0.8 + Math.sin(time + 4) * h * 0.2, 0,
        w * 0.5 + Math.cos(time + 4) * w * 0.2, h * 0.8 + Math.sin(time + 4) * h * 0.2, w * 0.4
      );
      gradient3.addColorStop(0, 'rgba(139, 92, 246, 0.05)'); // Purple glow
      gradient3.addColorStop(1, 'rgba(139, 92, 246, 0)');

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, w, h);

      // Draw Grid with perspective illusion
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      // Moving grid effect
      const offsetY = (time * 60) % gridSize;
      
      ctx.beginPath();
      for (let x = 0; x <= w; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = offsetY - gridSize; y <= h; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Update and draw particles with connections
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
