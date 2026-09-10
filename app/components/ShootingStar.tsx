"use client";

import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import Star from "./Star";

export type ShootingStarPoint = {
  x: number;
  y: number;
};

export type ShootingStarBounds = {
  width: number;
  height: number;
};

type PixelPoint = {
  x: number;
  y: number;
};

type ShootingStarProps = {
  start?: ShootingStarPoint;
  end?: ShootingStarPoint;
  size?: number;
  tailLength?: number;
  opacityFadeEnd?: number;
  curveDirection?: -1 | 1;
  bounds: ShootingStarBounds;
  duration?: number;
  delay?: number;
};

type ShootingStarMotion = {
  opacity: number;
  position: PixelPoint;
  tailStart: PixelPoint;
  tailPath: string;
};

const DURATION_RANGE = { min: 3, max: 15 };
const CURVE_SAMPLE_COUNT = 24;
const TAIL_SAMPLE_COUNT = 16;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getCurvePoint(
  start: PixelPoint,
  control: PixelPoint,
  end: PixelPoint,
  progress: number,
) {
  const inverseProgress = 1 - progress;

  return {
    x:
      inverseProgress ** 2 * start.x +
      2 * inverseProgress * progress * control.x +
      progress ** 2 * end.x,
    y:
      inverseProgress ** 2 * start.y +
      2 * inverseProgress * progress * control.y +
      progress ** 2 * end.y,
  };
}

function getCurveLength(
  start: PixelPoint,
  control: PixelPoint,
  end: PixelPoint,
) {
  let length = 0;
  let previousPoint = start;

  for (let sample = 1; sample <= CURVE_SAMPLE_COUNT; sample += 1) {
    const currentPoint = getCurvePoint(
      start,
      control,
      end,
      sample / CURVE_SAMPLE_COUNT,
    );
    length += Math.hypot(
      currentPoint.x - previousPoint.x,
      currentPoint.y - previousPoint.y,
    );
    previousPoint = currentPoint;
  }

  return length;
}

function getTailPath(
  start: PixelPoint,
  control: PixelPoint,
  end: PixelPoint,
  startProgress: number,
  endProgress: number,
) {
  if (endProgress <= startProgress) {
    return "";
  }

  const points = Array.from({ length: TAIL_SAMPLE_COUNT + 1 }, (_, index) =>
    getCurvePoint(
      start,
      control,
      end,
      startProgress +
        ((endProgress - startProgress) * index) / TAIL_SAMPLE_COUNT,
    ),
  );

  return points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`,
    )
    .join(" ");
}

export default function ShootingStar({
  start = { x: -10, y: 50 },
  end = { x: 110, y: 50 },
  size = 8,
  tailLength = 9 * 16,
  opacityFadeEnd = 100,
  curveDirection = 1,
  bounds,
  duration = 4,
  delay = 0,
}: ShootingStarProps) {
  const trailGradientId = useId().replace(/:/g, "");
  const safeStart = {
    x: clamp(start.x, -20, 120),
    y: clamp(start.y, -20, 120),
  };
  const safeEnd = {
    x: clamp(end.x, -20, 120),
    y: clamp(end.y, -20, 120),
  };
  const safeOpacityFadeEnd = clamp(opacityFadeEnd, 55, 100);

  const curve = useMemo(() => {
    const startPoint = {
      x: (safeStart.x / 100) * bounds.width,
      y: (safeStart.y / 100) * bounds.height,
    };
    const endPoint = {
      x: (safeEnd.x / 100) * bounds.width,
      y: (safeEnd.y / 100) * bounds.height,
    };
    const pathVector = {
      x: endPoint.x - startPoint.x,
      y: endPoint.y - startPoint.y,
    };
    const pathLength = Math.hypot(pathVector.x, pathVector.y);
    const durationProgress =
      (clamp(duration, DURATION_RANGE.min, DURATION_RANGE.max) -
        DURATION_RANGE.min) /
      (DURATION_RANGE.max - DURATION_RANGE.min);
    const curveOffset =
      Math.min(pathLength * 0.2, 180) * durationProgress * curveDirection;
    const normal = {
      x: pathLength === 0 ? 0 : -pathVector.y / pathLength,
      y: pathLength === 0 ? 0 : pathVector.x / pathLength,
    };
    const controlPoint = {
      x: (startPoint.x + endPoint.x) / 2 + normal.x * curveOffset,
      y: (startPoint.y + endPoint.y) / 2 + normal.y * curveOffset,
    };

    return {
      start: startPoint,
      control: controlPoint,
      end: endPoint,
      length: getCurveLength(startPoint, controlPoint, endPoint),
      bounds,
    };
  }, [
    bounds,
    curveDirection,
    duration,
    safeEnd.x,
    safeEnd.y,
    safeStart.x,
    safeStart.y,
  ]);

  const [motion, setMotion] = useState<ShootingStarMotion | null>(null);

  useEffect(() => {
    if (curve === null) {
      return;
    }

    let animationFrame = 0;
    let animationStart: number | null = null;
    const durationMilliseconds = Math.max(duration, 0) * 1_000;
    const delayMilliseconds = Math.max(delay, 0);
    const tailProgressLength =
      curve.length === 0 ? 0 : Math.max(tailLength, 0) / curve.length;

    const animate = (timestamp: number) => {
      animationStart ??= timestamp;
      const elapsed = timestamp - animationStart;
      const animationElapsed = elapsed - delayMilliseconds;

      if (animationElapsed < 0) {
        animationFrame = window.requestAnimationFrame(animate);
        return;
      }

      const progress =
        durationMilliseconds === 0
          ? 1
          : clamp(animationElapsed / durationMilliseconds, 0, 1);
      const fadeProgress = clamp(progress / (safeOpacityFadeEnd / 100), 0, 1);
      const tailStartProgress = Math.max(0, progress - tailProgressLength);
      const tailStart = getCurvePoint(
        curve.start,
        curve.control,
        curve.end,
        tailStartProgress,
      );

      setMotion({
        opacity: 1 - fadeProgress,
        position: getCurvePoint(
          curve.start,
          curve.control,
          curve.end,
          progress,
        ),
        tailStart,
        tailPath: getTailPath(
          curve.start,
          curve.control,
          curve.end,
          tailStartProgress,
          progress,
        ),
      });

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [curve, delay, duration, safeOpacityFadeEnd, tailLength]);

  if (motion === null) {
    return null;
  }

  const shootingStarStyle = {
    "--star-x": `${motion.position.x}px`,
    "--star-y": `${motion.position.y}px`,
    opacity: motion.opacity,
  } as CSSProperties;

  return (
    <>
      <svg
        aria-hidden="true"
        className="shooting-star__trail"
        height="100%"
        preserveAspectRatio="none"
        style={{ opacity: motion.opacity }}
        viewBox={`0 0 ${curve.bounds.width} ${curve.bounds.height}`}
        width="100%"
      >
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id={trailGradientId}
            x1={motion.tailStart.x}
            x2={motion.position.x}
            y1={motion.tailStart.y}
            y2={motion.position.y}
          >
            <stop offset="0%" stopColor="#f5f1ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#f5f1ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f5f1ff" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          className="shooting-star__tail"
          d={motion.tailPath}
          stroke={`url(#${trailGradientId})`}
        />
      </svg>
      <Star
        className="shooting-star"
        x={safeStart.x}
        y={safeStart.y}
        size={size}
        glowOpacity={0.5}
        glowSize={Math.max(size * 0.5, 4)}
        style={shootingStarStyle}
      />
    </>
  );
}
