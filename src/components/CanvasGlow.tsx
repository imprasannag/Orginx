"use client";

import { useEffect, useRef } from "react";

export default function CanvasGlow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Grid details
    const cellSize = 50;

    // Drifting particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      alphaSpeed: number;
    }

    const particles: Particle[] = [];
    const colors = ["#0080ff", "#00c08f", "#0080ff", "#00c08f"];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.1,
        alphaSpeed: 0.002 + Math.random() * 0.003,
      });
    }

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse coordinates for fluid lag effect
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const isLightMode = document.documentElement.classList.contains("light");

      // Draw subtle grid lines
      ctx.strokeStyle = isLightMode
        ? "rgba(0, 128, 255, 0.03)"
        : "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      // Vertical grid lines
      for (let x = 0; x < width; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      // Horizontal grid lines
      for (let y = 0; y < height; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw interactive grid lighting (underneath the cursor)
      if (mouse.x > -500 && mouse.y > -500) {
        const gridX = Math.floor(mouse.x / cellSize) * cellSize;
        const gridY = Math.floor(mouse.y / cellSize) * cellSize;

        // Draw radial light glow behind active cell
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          10,
          mouse.x,
          mouse.y,
          180
        );

        if (isLightMode) {
          gradient.addColorStop(0, "rgba(0, 128, 255, 0.08)");
          gradient.addColorStop(0.5, "rgba(0, 128, 255, 0.03)");
          gradient.addColorStop(1, "rgba(0, 128, 255, 0)");
        } else {
          gradient.addColorStop(0, "rgba(0, 128, 255, 0.12)");
          gradient.addColorStop(0.5, "rgba(0, 192, 143, 0.04)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 250, 0, Math.PI * 2);
        ctx.fill();

        // Highlight cells under cursor
        ctx.fillStyle = isLightMode
          ? "rgba(0, 128, 255, 0.02)"
          : "rgba(255, 255, 255, 0.007)";
        ctx.fillRect(gridX, gridY, cellSize, cellSize);
        ctx.fillRect(gridX - cellSize, gridY, cellSize, cellSize);
        ctx.fillRect(gridX + cellSize, gridY, cellSize, cellSize);
        ctx.fillRect(gridX, gridY - cellSize, cellSize, cellSize);
        ctx.fillRect(gridX, gridY + cellSize, cellSize, cellSize);
      }

      // Render drifting space dust particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary checks
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse alpha
        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.6 || p.alpha < 0.1) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
