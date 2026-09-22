"use client";

import { motion, useReducedMotion } from "motion/react";

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : "hidden"}
      viewport={{ once: true, amount: 0.15 }}
      whileInView={shouldReduceMotion ? {} : "visible"}
    >
      <motion.footer
        className="footer site-bar"
        transition={{ duration: 0.5, ease: "easeOut" }}
        variants={
          shouldReduceMotion
            ? {}
            : {
                hidden: { opacity: 0, y: 64 },
                visible: { opacity: 1, y: 0 },
              }
        }
      >
        <div className="footer__content site-bar__content">
          <p>© 2026 Austin Tillotson</p>
        </div>
      </motion.footer>
    </motion.div>
  );
}
