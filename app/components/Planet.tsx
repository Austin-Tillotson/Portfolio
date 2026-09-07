import type { CSSProperties } from "react";
import { createGlowStyle } from "../lib/createGlowStyle";

type PlanetProps = {
  radius: number;
  opacity?: number;
  size?: number;
  className?: string;
};

export default function Planet({
  radius,
  opacity = 0.17,
  size = 100,
  className = "",
}: PlanetProps) {
  const safeRadius = Math.max(radius, 0);
  const planetStyle = {
    ...createGlowStyle({
      opacity,
      size: Math.max(safeRadius * 0.25, size),
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
