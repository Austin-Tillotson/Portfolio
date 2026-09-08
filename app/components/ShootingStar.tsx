import type { CSSProperties } from "react";
import Star from "./Star";

type ShootingStarProps = {
  verticalPosition?: number;
  size?: number;
  tailLength?: number;
  duration?: number;
  delay?: number;
};

export default function ShootingStar({
  verticalPosition = 50,
  size = 8,
  tailLength = 9 * 16,
  duration = 4,
  delay = 0,
}: ShootingStarProps) {
  const shootingStarStyle = {
    "--shooting-star-y": `${Math.min(Math.max(verticalPosition, 0), 100)}svh`,
    "--shooting-star-tail-length": `${Math.max(tailLength, 0)}px`,
    "--shooting-star-duration": `${Math.max(duration, 0)}s`,
    "--shooting-star-delay": `${Math.max(delay, 0)}ms`,
  } as CSSProperties;

  return (
    <Star
      className="shooting-star"
      x={0}
      y={verticalPosition}
      size={size}
      glowOpacity={0.5}
      glowSize={Math.max(size * 0.5, 4)}
      style={shootingStarStyle}
    >
      <span className="shooting-star__tail" />
    </Star>
  );
}
