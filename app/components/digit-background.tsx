"use client";

import { useEffect, useRef } from "react";

export function DigitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let dpr = 1;

    // Matrix rain state
    const chars = "0123456789";
    let columns: {
      x: number;
      y: number;
      speed: number;
      length: number;
      chars: string[];
    }[] = [];

    const fontSize = 14;
    const columnWidth = fontSize * 1.2;

    function init() {
      if (!canvas || !ctx) return;
      dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      const numColumns = Math.ceil(width / columnWidth) + 1;

      columns = Array.from({ length: numColumns }, (_, i) => ({
        x: i * columnWidth,
        y: Math.random() * -height,
        speed: 0.5 + Math.random() * 1.5,
        length: 5 + Math.floor(Math.random() * 15),
        chars: Array.from({ length: 20 }, () =>
          chars[Math.floor(Math.random() * chars.length)]
        ),
      }));
    }

    function draw() {
      if (!canvas || !ctx) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Fade effect - slight transparency on each frame
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      columns.forEach((col) => {
        // Draw the trail
        for (let i = 0; i < col.length; i++) {
          const charY = col.y - i * fontSize;
          if (charY < -fontSize || charY > height + fontSize) continue;

          const isHead = i === 0;
          const trailOpacity = isHead
            ? 0.9
            : Math.max(0.02, 0.5 - i * 0.04);

          // Head is bright white, trail is muted gray
          if (isHead) {
            ctx.fillStyle = `rgba(255, 255, 255, ${trailOpacity})`;
            ctx.shadowColor = "rgba(255, 255, 255, 0.35)";
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = `rgba(160, 160, 160, ${trailOpacity})`;
            ctx.shadowBlur = 0;
          }

          const charIndex =
            (Math.floor(col.y / fontSize) + i) % col.chars.length;
          ctx.fillText(col.chars[charIndex], col.x, charY);
        }

        ctx.shadowBlur = 0;

        // Move column down
        col.y += col.speed;

        // Reset when off screen
        if (col.y - col.length * fontSize > height) {
          col.y = -col.length * fontSize;
          col.speed = 0.5 + Math.random() * 1.5;
          col.length = 5 + Math.floor(Math.random() * 15);
        }
      });

      animationId = requestAnimationFrame(draw);
    }

    init();
    draw();

    const handleResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-30"
      aria-hidden="true"
    />
  );
}
