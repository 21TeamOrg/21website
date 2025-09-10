import React, { useRef, useEffect } from "react";

export const ParticleCanvas: React.FC<{ className?: string }> = ({
  className,
}) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Simple animated particles placeholder (replace with R3F/GLSL for production)
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame: number;
    const width = canvas.width;
    const height = canvas.height;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    }));
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (!ctx) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#00fff7cc";
        ctx.shadowColor = "#00fff7";
        ctx.shadowBlur = 8;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }
      frame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={ref}
      width={600}
      height={300}
      className={`w-full h-full ${className || ""}`}
    />
  );
};
