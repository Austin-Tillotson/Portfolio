"use client";

import { useEffect, useState } from "react";
import ShootingStar from "./ShootingStar";

type ManagedShootingStar = {
  id: string;
  verticalPosition: number;
  initialTimeout: number;
  timeout: number;
};

const SHOOTING_STARS: ManagedShootingStar[] = [
  {
    id: "shooting-star-1",
    verticalPosition: 18,
    initialTimeout: 1_000,
    timeout: 2_500,
  },
  {
    id: "shooting-star-2",
    verticalPosition: 34,
    initialTimeout: 3_000,
    timeout: 4_000,
  },
  {
    id: "shooting-star-3",
    verticalPosition: 50,
    initialTimeout: 5_000,
    timeout: 5_500,
  },
  {
    id: "shooting-star-4",
    verticalPosition: 66,
    initialTimeout: 7_000,
    timeout: 7_000,
  },
  {
    id: "shooting-star-5",
    verticalPosition: 82,
    initialTimeout: 9_000,
    timeout: 8_500,
  },
];

const SHOOTING_STAR_DURATION = 10;
const SHOOTING_STAR_SIZE = 10;
const SHOOTING_STAR_TAIL_LENGTH = 100;

function ManagedShootingStar({
  verticalPosition,
  initialTimeout,
  timeout,
}: ManagedShootingStar) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    const delayBeforeRun = run === 0 ? initialTimeout : 0;
    const restartDelay =
      delayBeforeRun + SHOOTING_STAR_DURATION * 1_000 + timeout;
    const timer = window.setTimeout(() => {
      setRun((currentRun) => currentRun + 1);
    }, restartDelay);

    return () => window.clearTimeout(timer);
  }, [initialTimeout, run, timeout]);

  return (
    <ShootingStar
      key={run}
      verticalPosition={verticalPosition}
      size={SHOOTING_STAR_SIZE}
      tailLength={SHOOTING_STAR_TAIL_LENGTH}
      duration={SHOOTING_STAR_DURATION}
      delay={run === 0 ? initialTimeout : 0}
    />
  );
}

export default function ShootingStarManager() {
  return SHOOTING_STARS.map((star) => (
    <ManagedShootingStar key={star.id} {...star} />
  ));
}
