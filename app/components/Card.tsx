import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ children, className }: CardProps) {
  const cardClassName = ["card", className].filter(Boolean).join(" ");

  return <div className={cardClassName}>{children}</div>;
}
