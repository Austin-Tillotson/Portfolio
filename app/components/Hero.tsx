"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { createGlowStyle } from "../lib/createGlowStyle";
import { heroTechnologyGroups } from "../lib/technologyConfig";
import SkillIcon from "./SkillIcon";
import SpaceViewLink from "./SpaceViewLink";

const heroGlowStyle = createGlowStyle({
  opacity: 0.08,
  size: 30,
  ellipseWidth: "90%",
  ellipseHeight: "80%",
  rotation: -10,
});

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="hero" id="hero">
      <div className="hero__content">
        <figure className="hero__image-figure">
          <div className="hero__image-container">
            <Image
              alt="Austin Tillotson"
              className="hero__image"
              height={2208}
              priority
              sizes="(max-width: 375px) 80vw, (max-width: 550px) 70vw, (max-width: 767px) 24rem, (max-width: 1200px) calc(44.44vw - 5.33rem), 28rem"
              src="/self.jpg"
              width={2944}
            />
          </div>
          <figcaption className="hero__image-details">
            <span className="hero__image-name">Austin Tillotson</span>
            <span className="hero__image-location">Melbourne, FL</span>
          </figcaption>
        </figure>

        <div className="hero__copy">
          <div className="hero__title glow glow--ellipse" style={heroGlowStyle}>
            <h1>
              <span className="hero__software">Software</span>
              <span className="hero__engineer">Engineer</span>
            </h1>
          </div>
          <p className="hero__paragraph">
            Drawing on four years of engineering experience and revolutionary AI tools, I build modern, responsive 
            full-stack web applications with exceptional efficiency and quality—grounded in strong fundamentals.
          </p>
          <motion.div
            className="hero__skills"
            initial={shouldReduceMotion ? false : "hidden"}
            viewport={{ once: true, amount: 0.15 }}
            whileInView={shouldReduceMotion ? {} : "visible"}
          >
            {heroTechnologyGroups.map((group) => (
              <motion.div
                aria-label={group.label}
                className="hero__skill-group"
                key={group.label}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.07 } },
                }}
              >
                {group !== heroTechnologyGroups[0] && (
                  <motion.span
                    aria-hidden="true"
                    className="hero__skill-separator"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { delay: 0.95, duration: 0.4 },
                      },
                    }}
                  />
                )}
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill.label}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, x: -8, y: 16 },
                      visible: { opacity: 1, scale: 1, x: 0, y: 0 },
                    }}
                  >
                    <SkillIcon {...skill} />
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="hero__actions"
            initial={shouldReduceMotion ? false : "hidden"}
            transition={{ delayChildren: 0.1, staggerChildren: 0.08 }}
            viewport={{ once: true, amount: 0.15 }}
            whileInView={shouldReduceMotion ? {} : "visible"}
          >
            {[
              { href: "#projects", label: "My Projects" },
              { href: "/about", label: "About Me" },
              { href: "/expanse", label: "Space View" },
            ].map(({ href, label }) => (
              <motion.div
                className="hero__action-reveal"
                key={href}
                variants={{
                  hidden: { opacity: 0, x: -32 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                {href === "/expanse" ? (
                  <SpaceViewLink className="action-link">{label}</SpaceViewLink>
                ) : (
                  <Link className="action-link" href={href}>
                    {label}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
