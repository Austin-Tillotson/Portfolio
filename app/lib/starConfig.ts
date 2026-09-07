type StarRange = {
  min: number;
  max: number;
};

export const STAR_COUNT = 60;

export const STAR_RANGES: Record<string, StarRange> = {
  x: { min: 0, max: 100 },
  y: { min: 0, max: 100 },
  size: { min: 4, max: 10 },
  glowOpacity: { min: 0.2, max: 0.5 },
  glowSize: { min: 2, max: 5 },
  pulseMin: { min: 0, max: 0 },
  pulseMax: { min: 1.2, max: 1.2 },
  pulseDuration: { min: 2.5, max: 15 },
  pulseSizeMin: { min: 0, max: 0 },
  pulseSizeMax: { min: 0, max: 1.5 },
};
