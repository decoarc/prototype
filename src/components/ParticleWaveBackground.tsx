import React, { useEffect, useRef } from "react";
import "./ParticleWaveBackground.css";

/** Stitch-inspired base */
const BASE = "#191a1f";

function ParticleWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    const drawStill = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = BASE;
      ctx.fillRect(0, 0, w, h);
    };

    if (reduced) {
      drawStill();
      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    const spacing = () =>
      Math.max(26, Math.min(42, window.innerWidth / 26));

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const sp = spacing();
      const cols = Math.ceil(w / sp) + 2;
      const rows = Math.ceil(h / (sp * 0.82)) + 2;

      ctx.fillStyle = BASE;
      ctx.fillRect(0, 0, w, h);

      const time = performance.now() / 1000;
      const positions: { x: number; y: number }[] = [];

      const mouse = mouseRef.current;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const stagger = (row & 1) * (sp * 0.5);
          const baseX = col * sp + stagger - sp;
          const baseY = row * sp * 0.82 - sp;
          const waveX =
            Math.sin(baseY * 0.005 + time * 0.55) * 10 +
            Math.cos((baseX + baseY) * 0.003 + time * 0.35) * 6;
          const waveY =
            Math.sin(baseX * 0.004 + time * 0.75) * 14 +
            Math.sin(baseX * 0.012 + time * 1.1) * 5;
          positions.push({ x: baseX + waveX, y: baseY + waveY });
        }
      }

      ctx.lineWidth = 0.55;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col;
          const p = positions[i];
          if (!p) continue;

          const right = col < cols - 1 ? positions[i + 1] : null;
          const bottom = row < rows - 1 ? positions[i + cols] : null;

          if (right) {
            const d = Math.hypot(right.x - p.x, right.y - p.y);
            if (d < sp * 1.55) {
              const a =
                0.045 +
                0.035 * Math.sin(time * 1.2 + col * 0.08 + row * 0.04);
              ctx.strokeStyle = `rgba(130, 175, 255, ${a})`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(right.x, right.y);
              ctx.stroke();
            }
          }
          if (bottom) {
            ctx.strokeStyle = "rgba(95, 130, 210, 0.042)";
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(bottom.x, bottom.y);
            ctx.stroke();
          }
        }
      }

      for (const p of positions) {
        let a = 0.1 + 0.09 * Math.sin(time * 1.8 + p.x * 0.008 + p.y * 0.006);
        let radius = 1.15;
        
        const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (distToMouse < mouse.radius) {
          const intensity = 1 - distToMouse / mouse.radius;
          a += intensity * 0.8; // Light up significantly (up to ~1.0 opacity)
          radius += intensity * 2.0; // Make the dot larger (up to 3.15 radius)
        }

        // We can even add a slight blueish core glow if it gets really bright
        if (a > 0.6) {
          ctx.fillStyle = `rgba(255, 255, 255, ${a})`; // turn whiter when very bright
        } else {
          ctx.fillStyle = `rgba(230, 238, 255, ${a})`;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="particle-wave-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default ParticleWaveBackground;
