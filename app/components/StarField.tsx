"use client";

import { useEffect, useRef, useState } from "react";
import { STAR_COUNT, STAR_RANGES } from "../lib/starConfig";
import Star, { type StarProps } from "./Star";

type GeneratedStar = StarProps & {
  id: string;
};

function randomInRange({ min, max }: { min: number; max: number }) {
  return Math.random() * (max - min) + min;
}

function createStars(count: number): GeneratedStar[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `star-${index}`,
    className: "glow--pulse",
    x: randomInRange(STAR_RANGES.x),
    y: randomInRange(STAR_RANGES.y),
    size: randomInRange(STAR_RANGES.size),
    glowOpacity: randomInRange(STAR_RANGES.glowOpacity),
    glowSize: randomInRange(STAR_RANGES.glowSize),
    pulseMin: randomInRange(STAR_RANGES.pulseMin),
    pulseMax: randomInRange(STAR_RANGES.pulseMax),
    pulseDuration: randomInRange(STAR_RANGES.pulseDuration),
    pulseSizeMin: randomInRange(STAR_RANGES.pulseSizeMin),
    pulseSizeMax: randomInRange(STAR_RANGES.pulseSizeMax),
  }));
}

export default function StarField() {
  const [stars, setStars] = useState<GeneratedStar[]>([]);
  const generatedStars = useRef<GeneratedStar[] | null>(null);

  useEffect(() => {
    if (generatedStars.current === null) {
      generatedStars.current = createStars(STAR_COUNT);
    }

    setStars(generatedStars.current);
  }, []);

  return stars.map(({ id, ...star }) => <Star key={id} {...star} />);
}
