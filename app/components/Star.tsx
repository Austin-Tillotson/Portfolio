import type { CSSProperties } from "react";
import { createGlowStyle } from "../lib/createGlowStyle";

export type StarProps = {
  x: number;
  y: number;
  size: number;
  glowOpacity?: number;
  glowSize?: number;
  pulseMin?: number;
  pulseMax?: number;
  pulseDuration?: number;
  pulseSizeMin?: number;
  pulseSizeMax?: number;
  className?: string;
};

const STAR_COLOR = "#f5f1ff";
const STAR_OPACITY = 0.5;

export default function Star({
  x,
  y,
  size,
  glowOpacity,
  glowSize,
  pulseMin,
  pulseMax,
  pulseDuration,
  pulseSizeMin,
  pulseSizeMax,
  className = "",
}: StarProps) {
  const starStyle = {
    ...createGlowStyle({
      color: STAR_COLOR,
      opacity: glowOpacity,
      size: glowSize,
      pulseMin,
      pulseMax,
      pulseDuration,
      pulseSizeMin,
      pulseSizeMax,
    }),
    "--star-x": `${Math.min(Math.max(x, 0), 100)}%`,
    "--star-y": `${Math.min(Math.max(y, 0), 100)}%`,
    "--star-size": `${Math.max(size, 0)}px`,
    "--star-color": STAR_COLOR,
    "--star-opacity": String(STAR_OPACITY),
  } as CSSProperties;

  return (
    <span
      aria-hidden="true"
      className={`star glow ${className}`.trim()}
      style={starStyle}
    >
      <span className="star__surface" />
    </span>
  );
}
