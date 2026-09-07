import type { CSSProperties } from "react";

type GlowOptions = {
  color?: string;
  opacity?: number;
  size?: number;
};

const DEFAULT_COLOR = "#c4b5fd";
const DEFAULT_OPACITY = 0.1;
const DEFAULT_SIZE = 10;

export function createGlowStyle({
  color = DEFAULT_COLOR,
  opacity = DEFAULT_OPACITY,
  size = DEFAULT_SIZE,
}: GlowOptions = {}): CSSProperties {
  return {
    "--glow-color": color,
    "--glow-opacity": String(Math.min(Math.max(opacity, 0), 1)),
    "--glow-size": `${Math.max(size, 0)}px`,
    "--glow-offset": `-${Math.max(size, 0)}px`,
  } as CSSProperties;
}
