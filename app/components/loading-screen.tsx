"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Minimal 5x7 bitmap font. */
const GLYPHS: Record<string, readonly string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
  G: ["01110", "10001", "10000", "10111", "10001", "10001", "01110"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  J: ["00111", "00010", "00010", "00010", "10010", "10010", "01100"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
  X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
  Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
};

const UNIT = 10;
const PIXEL = 8;
const LETTER_GAP = 20;
const SHADES = [0.45, 0.6, 0.75, 0.9];

function shadeFor(letter: number, row: number, column: number) {
  return SHADES[(letter * 5 + row * 3 + column * 7) % SHADES.length];
}

const HOLD_MS = 1600;
const FADE_MS = 400;

export function LoadingScreen({
  name,
  label = "Loading",
}: {
  name: string;
  label?: string;
}) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const holdTimer = window.setTimeout(() => setIsLeaving(true), HOLD_MS);
    const hideTimer = window.setTimeout(
      () => setIsVisible(false),
      HOLD_MS + FADE_MS,
    );

    return () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  const characters = name.toUpperCase().split("");
  const pixels: ReactNode[] = [];
  let cursor = 0;

  characters.forEach((character, letterIndex) => {
    const glyph = GLYPHS[character];

    if (!glyph || character === " ") {
      cursor += 3 * UNIT;
      return;
    }

    glyph.forEach((row, rowIndex) => {
      row.split("").forEach((pixel, columnIndex) => {
        if (pixel !== "1") return;

        pixels.push(
          <rect
            key={`${letterIndex}-${rowIndex}-${columnIndex}`}
            x={cursor + columnIndex * UNIT}
            y={rowIndex * UNIT}
            width={PIXEL}
            height={PIXEL}
            fill="#c8c8c8"
            fillOpacity={shadeFor(letterIndex, rowIndex, columnIndex)}
          />,
        );
      });
    });

    cursor += 5 * UNIT + LETTER_GAP;
  });

  const width = Math.max(cursor - LETTER_GAP, UNIT);
  const height = 7 * UNIT;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#080808] transition-opacity duration-[400ms] ease-out ${
        isLeaving ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">{label}</span>

      <div
        aria-hidden="true"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "92vw",
        }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          shapeRendering="crispEdges"
          style={{ width: "clamp(200px, 30vw, 320px)", height: "auto" }}
        >
          <title>{name}</title>
          {pixels}
        </svg>
      </div>
    </div>
  );
}
