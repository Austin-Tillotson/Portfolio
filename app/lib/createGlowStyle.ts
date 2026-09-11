import type { CSSProperties } from "react";

type GlowOptions = {
  color?: string;
  opacity?: number;
  size?: number;
  edgeFade?: number;
  roundness?: number;
  ellipseWidth?: string;
  ellipseHeight?: string;
  rotation?: number;
  pulseMin?: number;
  pulseMax?: number;
  pulseDuration?: number;
  pulseSizeMin?: number;
  pulseSizeMax?: number;
};

const DEFAULT_COLOR = "#c4b5fd";
const DEFAULT_OPACITY = 0.1;
const DEFAULT_SIZE = 10;
const DEFAULT_PULSE_MIN = 0.8;
const DEFAULT_PULSE_MAX = 1.2;
const DEFAULT_PULSE_DURATION = 3;
const DEFAULT_PULSE_SIZE_MIN = 0.8;
const DEFAULT_PULSE_SIZE_MAX = 1.2;

export function createGlowStyle({
  color = DEFAULT_COLOR,
  opacity = DEFAULT_OPACITY,
  size = DEFAULT_SIZE,
  edgeFade = 0,
  roundness = 0,
  ellipseWidth = "100%",
  ellipseHeight = "100%",
  rotation = 0,
  pulseMin = DEFAULT_PULSE_MIN,
  pulseMax = DEFAULT_PULSE_MAX,
  pulseDuration = DEFAULT_PULSE_DURATION,
  pulseSizeMin = DEFAULT_PULSE_SIZE_MIN,
  pulseSizeMax = DEFAULT_PULSE_SIZE_MAX,
}: GlowOptions = {}): CSSProperties {
  const safeEdgeFade = Math.min(Math.max(edgeFade, 0), 1);
  const safeRoundness = Math.min(Math.max(roundness, 0), 1);
  const glowBackground =
    safeEdgeFade === 0
      ? color
      : `radial-gradient(ellipse at center, ${color} 0%, ${color} ${(1 - safeEdgeFade) * 100}%, transparent 100%)`;

  return {
    "--glow-color": color,
    "--glow-background": glowBackground,
    "--glow-opacity": String(Math.min(Math.max(opacity, 0), 1)),
    "--glow-size": `${Math.max(size, 0)}px`,
    "--glow-offset": `-${Math.max(size, 0)}px`,
    "--glow-border-radius":
      safeRoundness === 0 ? "inherit" : `${safeRoundness * 50}%`,
    "--glow-ellipse-width": ellipseWidth,
    "--glow-ellipse-height": ellipseHeight,
    "--glow-rotation": `${rotation}deg`,
    "--glow-pulse-min": String(Math.max(pulseMin, 0)),
    "--glow-pulse-max": String(Math.max(pulseMax, 0)),
    "--glow-pulse-duration": `${Math.max(pulseDuration, 0)}s`,
    "--glow-pulse-size-min": String(Math.max(pulseSizeMin, 0)),
    "--glow-pulse-size-max": String(Math.max(pulseSizeMax, 0)),
  } as CSSProperties;
}
