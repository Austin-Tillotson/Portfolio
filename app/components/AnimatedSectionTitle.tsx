"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type AnimatedSectionTitleProps = {
  as?: "h1" | "h2";
  children: ReactNode;
};

export default function AnimatedSectionTitle({
  as = "h2",
  children,
}: AnimatedSectionTitleProps) {
  const shouldReduceMotion = useReducedMotion();

  if (as === "h1") {
    return (
      <motion.h1
        className="content-section__title"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-120px" }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      >
        {children}
      </motion.h1>
    );
  }

  return (
    <motion.h2
      className="content-section__title"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-120px" }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.h2>
  );
}
