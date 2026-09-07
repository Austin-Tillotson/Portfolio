import type { CSSProperties } from "react";
import { createGlowStyle } from "../lib/createGlowStyle";

type PlanetProps = {
  radius: number;
  opacity?: number;
  size?: number;
  pulseMin?: number;
  pulseMax?: number;
  pulseDuration?: number;
  pulseSizeMin?: number;
  pulseSizeMax?: number;
  className?: string;
};

export default function Planet({
  radius,
  opacity = 0.17,
  size = 100,
  pulseMin,
  pulseMax,
  pulseDuration,
  pulseSizeMin,
  pulseSizeMax,
  className = "",
}: PlanetProps) {
  const safeRadius = Math.max(radius, 0);
  const planetStyle = {
    ...createGlowStyle({
      opacity,
      size: Math.max(safeRadius * 0.25, size),
      pulseMin,
      pulseMax,
      pulseDuration,
      pulseSizeMin,
      pulseSizeMax,
    }),
    "--planet-diameter": `${safeRadius * 2}px`,
  } as CSSProperties;

  return (
    <span
      aria-hidden="true"
      className={`planet glow ${className}`.trim()}
      style={planetStyle}
    >
      <span className="planet__surface" />
    </span>
  );
}
