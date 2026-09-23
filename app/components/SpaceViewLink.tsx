"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useReducedMotion } from "motion/react";

const exitDuration = 500;

type SpaceViewLinkProps = Readonly<{
  className: string;
  children: React.ReactNode;
}>;

export default function SpaceViewLink({
  className,
  children,
}: SpaceViewLinkProps) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [isTransitioning, setIsTransitioning] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (
      shouldReduceMotion ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    document
      .querySelector(".site-shell")
      ?.classList.add("site-shell--exiting-to-expanse");

    window.setTimeout(() => router.push("/expanse"), exitDuration);
  }

  return (
    <Link className={className} href="/expanse" onClick={handleClick}>
      {children}
    </Link>
  );
}
