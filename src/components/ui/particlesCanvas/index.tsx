"use client";

import { useRef, useEffect } from "react";

export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;

      canvas.width = w;
      canvas.height = h;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      alpha: number;
      alphaSpeed: number;
    };

    const particles: Particle[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() < 0.6 ? 2 : 4,
      alpha: Math.random(),
      alphaSpeed: 0.004 + Math.random() * 0.008,
    }));

    let raf: number;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap en los bordes
        if (p.x < -p.size)                p.x = canvas.width  + p.size;
        if (p.x > canvas.width  + p.size) p.x = -p.size;
        if (p.y < -p.size)                p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;

        // Breathe alpha
        p.alpha += p.alphaSpeed;
        if (p.alpha >= 1 || p.alpha <= 0) p.alphaSpeed *= -1;
        p.alpha = Math.max(0, Math.min(1, p.alpha));

        ctx.save();
        ctx.globalAlpha = p.alpha * 0.6;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        ctx.restore();
      }

      raf = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        display: "block", // evita el gap inline por defecto
      }}
    />
  );
}