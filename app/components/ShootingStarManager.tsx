"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ShootingStar, {
  type ShootingStarBounds,
  type ShootingStarPoint,
} from "./ShootingStar";

type ManagedShootingStar = {
  id: string;
  initialTimeout: number;
  timeout: number;
};

const SHOOTING_STARS: ManagedShootingStar[] = [
  {
    id: "shooting-star-1",
    initialTimeout: 1_000,
    timeout: 2_500,
  },
  {
    id: "shooting-star-2",
    initialTimeout: 3_000,
    timeout: 4_000,
  },
  {
    id: "shooting-star-3",
    initialTimeout: 5_000,
    timeout: 5_500,
  },
  {
    id: "shooting-star-4",
    initialTimeout: 7_000,
    timeout: 7_000,
  },
  {
    id: "shooting-star-5",
    initialTimeout: 9_000,
    timeout: 8_500,
  },
];

const SHOOTING_STAR_RANGES = {
  duration: { min: 3, max: 15 },
  size: { min: 1, max: 15 },
  tailLength: { min: 100, max: 500 },
  opacityFadeEnd: { min: 55, max: 100 },
};

type ShootingStarSettings = {
  duration: number;
  size: number;
  tailLength: number;
  opacityFadeEnd: number;
  curveDirection: -1 | 1;
  start: ShootingStarPoint;
  end: ShootingStarPoint;
  originY: number;
};

type CardinalDirection = "north" | "south" | "east" | "west";

const CARDINAL_DIRECTIONS: CardinalDirection[] = [
  "north",
  "south",
  "east",
  "west",
];

const OPPOSITE_DIRECTIONS: Record<CardinalDirection, CardinalDirection> = {
  north: "south",
  south: "north",
  east: "west",
  west: "east",
};

const EDGE_OFFSET = 10;
const EDGE_POSITION_RANGE = { min: 10, max: 90 };
const MINIMUM_PATH_LENGTH = 60;

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPointOnEdge(direction: CardinalDirection): ShootingStarPoint {
  const edgePosition = randomInteger(
    EDGE_POSITION_RANGE.min,
    EDGE_POSITION_RANGE.max,
  );

  switch (direction) {
    case "north":
      return { x: edgePosition, y: -EDGE_OFFSET };
    case "south":
      return { x: edgePosition, y: 100 + EDGE_OFFSET };
    case "east":
      return { x: 100 + EDGE_OFFSET, y: edgePosition };
    case "west":
      return { x: -EDGE_OFFSET, y: edgePosition };
  }
}

function chooseEndDirection(
  startDirection: CardinalDirection,
): CardinalDirection {
  if (Math.random() < 0.7) {
    return OPPOSITE_DIRECTIONS[startDirection];
  }

  const adjacentDirections = CARDINAL_DIRECTIONS.filter(
    (direction) =>
      direction !== startDirection &&
      direction !== OPPOSITE_DIRECTIONS[startDirection],
  );

  return adjacentDirections[Math.floor(Math.random() * adjacentDirections.length)];
}

function getPathLength(start: ShootingStarPoint, end: ShootingStarPoint) {
  return Math.hypot(end.x - start.x, end.y - start.y);
}

function createShootingStarPath() {
  const startDirection =
    CARDINAL_DIRECTIONS[
      Math.floor(Math.random() * CARDINAL_DIRECTIONS.length)
    ];
  const endDirection = chooseEndDirection(startDirection);
  const start = randomPointOnEdge(startDirection);
  let end = randomPointOnEdge(endDirection);

  while (getPathLength(start, end) < MINIMUM_PATH_LENGTH) {
    end = randomPointOnEdge(endDirection);
  }

  return { start, end };
}

function createShootingStarSettings(originY: number): ShootingStarSettings {
  const { start, end } = createShootingStarPath();

  return {
    duration: randomInteger(
      SHOOTING_STAR_RANGES.duration.min,
      SHOOTING_STAR_RANGES.duration.max,
    ),
    size: randomInteger(
      SHOOTING_STAR_RANGES.size.min,
      SHOOTING_STAR_RANGES.size.max,
    ),
    tailLength: randomInteger(
      SHOOTING_STAR_RANGES.tailLength.min,
      SHOOTING_STAR_RANGES.tailLength.max,
    ),
    opacityFadeEnd: randomInteger(
      SHOOTING_STAR_RANGES.opacityFadeEnd.min,
      SHOOTING_STAR_RANGES.opacityFadeEnd.max,
    ),
    curveDirection: Math.random() < 0.5 ? -1 : 1,
    start,
    end,
    originY,
  };
}

function ManagedShootingStar({
  initialTimeout,
  timeout,
  bounds,
  getOriginY,
}: ManagedShootingStar & {
  bounds: ShootingStarBounds;
  getOriginY: () => number;
}) {
  const [run, setRun] = useState(0);
  const [settings, setSettings] = useState<ShootingStarSettings | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSettings(createShootingStarSettings(getOriginY()));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [getOriginY]);

  useEffect(() => {
    if (settings === null) {
      return;
    }

    const delayBeforeRun = run === 0 ? initialTimeout : 0;
    const restartDelay =
      delayBeforeRun + settings.duration * 1_000 + timeout;
    const timer = window.setTimeout(() => {
      setSettings(createShootingStarSettings(getOriginY()));
      setRun((currentRun) => currentRun + 1);
    }, restartDelay);

    return () => window.clearTimeout(timer);
  }, [getOriginY, initialTimeout, run, settings, timeout]);

  if (settings === null) {
    return null;
  }

  return (
    <ShootingStar
      key={run}
      start={settings.start}
      end={settings.end}
      size={settings.size}
      tailLength={settings.tailLength}
      opacityFadeEnd={settings.opacityFadeEnd}
      curveDirection={settings.curveDirection}
      bounds={bounds}
      duration={settings.duration}
      delay={run === 0 ? initialTimeout : 0}
      originY={settings.originY}
    />
  );
}

export default function ShootingStarManager() {
  const managerRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState<ShootingStarBounds | null>(null);

  const getOriginY = useCallback(() => {
    const manager = managerRef.current;

    return manager === null ? 0 : Math.max(0, -manager.getBoundingClientRect().top);
  }, []);

  useEffect(() => {
    const updateBounds = () => {
      const nextBounds = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      setBounds((currentBounds) => {
        if (currentBounds?.width === nextBounds.width) {
          return currentBounds;
        }

        return nextBounds;
      });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="shooting-star-manager"
      ref={managerRef}
    >
      {bounds !== null &&
        SHOOTING_STARS.map((star) => (
          <ManagedShootingStar
            key={star.id}
            {...star}
            bounds={bounds}
            getOriginY={getOriginY}
          />
        ))}
    </div>
  );
}
