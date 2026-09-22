import type { CSSProperties } from "react";
import type { TechnologyIcon } from "../lib/technologyConfig";

type SkillIconProps = {
  color: string;
  Icon: TechnologyIcon;
  label: string;
  size?: number;
};

export default function SkillIcon({
  color,
  Icon,
  label,
  size = 48,
}: SkillIconProps) {
  const skillStyle = {
    "--skill-color": color,
  } as CSSProperties;

  return (
    <div className="skill-icon" style={skillStyle}>
      <Icon aria-label={label} className="skill-icon__icon" size={size} />
      <span aria-hidden="true" className="skill-icon__label">
        {label}
      </span>
    </div>
  );
}
