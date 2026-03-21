"use client";

import { useEffect, useRef } from "react";

interface AuroraBackgroundProps {
  intensity?: number;
  className?: string;
}

export default function AuroraBackground({
  intensity = 1.0,
  className = "",
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const bands = [
      { y: 0.2, width: 0.4, speed: 0.0008, color: "26, 107, 74", phase: 0 },
      { y: 0.4, width: 0.3, speed: 0.0012, color: "42, 158, 110", phase: 2 },
      { y: 0.6, width: 0.5, speed: 0.0006, color: "61, 214, 140", phase: 4 },
      { y: 0.75, width: 0.25, speed: 0.001, color: "26, 107, 74", phase: 1 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bands.forEach((band) => {
        const yPos =
          canvas.height *
          (band.y + Math.sin(time * band.speed + band.phase) * 0.08);
        const bandHeight = canvas.height * band.width;
        const alpha =
          (0.12 + Math.sin(time * band.speed * 2 + band.phase) * 0.06) *
          intensity;

        const gradient = ctx.createRadialGradient(
          canvas.width * 0.5,
          yPos,
          0,
          canvas.width * 0.5,
          yPos,
          canvas.width * 0.6
        );
        gradient.addColorStop(0, `rgba(${band.color}, ${alpha})`);
        gradient.addColorStop(0.4, `rgba(${band.color}, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${band.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, yPos - bandHeight / 2, canvas.width, bandHeight);
      });

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
