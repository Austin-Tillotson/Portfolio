import type { CSSProperties } from "react";
import Star from "./Star";

type ShootingStarProps = {
  size?: number;
  tailLength?: number;
  duration?: number;
};

export default function ShootingStar({
  size = 8,
  tailLength = 9 * 16,
  duration = 4,
}: ShootingStarProps) {
  const shootingStarStyle = {
    "--shooting-star-tail-length": `${Math.max(tailLength, 0)}px`,
    "--shooting-star-duration": `${Math.max(duration, 0)}s`,
  } as CSSProperties;

  return (
    <Star
      className="shooting-star"
      x={0}
      y={50}
      size={size}
      glowOpacity={0.5}
      glowSize={Math.max(size * 0.5, 4)}
      style={shootingStarStyle}
    >
      <span className="shooting-star__tail" />
    </Star>
  );
}
