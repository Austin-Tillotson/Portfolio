"use client";

import Image, { type StaticImageData } from "next/image";
import { Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FaGithub } from "react-icons/fa6";
import { SiVercel } from "react-icons/si";
import { useState, type CSSProperties } from "react";
import { projectTechnologies } from "../lib/technologyConfig";
import Card from "./Card";

type ProjectCardProps = {
  animationDelay?: number;
  description: string;
  githubUrl: string;
  imageAlt: string;
  imageSrc: StaticImageData;
  imageThemes?: {
    dark: StaticImageData;
    light: StaticImageData;
  };
  skills: string[];
  title: string;
  vercelUrl: string;
};

export default function ProjectCard({
  animationDelay = 0,
  description,
  githubUrl,
  imageAlt,
  imageSrc,
  imageThemes,
  skills,
  title,
  vercelUrl,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [imageTheme, setImageTheme] = useState<"light" | "dark">("light");
  const activeImage = imageThemes ? imageThemes[imageTheme] : imageSrc;

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
      transition={{
        duration: 1.2,
        delay: shouldReduceMotion ? 0 : 0.2 + animationDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-120px" }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
    >
      <motion.div
        transition={{ duration: 0.2, ease: "easeOut" }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.015, y: -6 }}
      >
        <Card className="project-card">
        <div
          aria-label={`${imageAlt}. Scroll to view the full screenshot.`}
          className="project-card__screenshot"
          role="region"
          tabIndex={0}
        >
          <a
            aria-label={`Visit ${title} demo site`}
            className="project-card__screenshot-link"
            href={vercelUrl}
            rel="noreferrer"
            target="_blank"
          >
            <Image
              alt={imageAlt}
              className="project-card__image"
              sizes="(max-width: 62.499rem) calc(100vw - 3rem), (max-width: 75rem) calc((100vw - 5.5rem) / 2), 35.75rem"
              src={activeImage}
            />
          </a>
        </div>
        <div className="project-card__content">
          <div className="project-card__header">
            <h3 className="project-card__title">{title}</h3>
            {imageThemes && (
              <div
                aria-label={`${title} screenshot theme`}
                className="project-card__theme-toggle"
                role="group"
              >
                <button
                  aria-label="Show light screenshot"
                  aria-pressed={imageTheme === "light"}
                  className={`project-card__theme-button ${
                    imageTheme === "light" ? "project-card__theme-button--active" : ""
                  }`}
                  onClick={() => setImageTheme("light")}
                  type="button"
                >
                  <Sun aria-hidden="true" />
                </button>
                <button
                  aria-label="Show dark screenshot"
                  aria-pressed={imageTheme === "dark"}
                  className={`project-card__theme-button ${
                    imageTheme === "dark" ? "project-card__theme-button--active" : ""
                  }`}
                  onClick={() => setImageTheme("dark")}
                  type="button"
                >
                  <Moon aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
          <p className="project-card__description">{description}</p>
          <section className="project-card__skills-section" aria-label="Project skills">
            <h4 className="project-card__skills-title">Skills</h4>
            <ul className="project-card__skills">
              {skills.map((skill) => {
                const technology = projectTechnologies[skill];
                const skillStyle = technology
                  ? ({ "--skill-color": technology.color } as CSSProperties)
                  : undefined;

                return (
                  <li className="project-card__skill" key={skill} style={skillStyle}>
                    {technology && (
                      <technology.Icon
                        aria-hidden={true}
                        className="project-card__skill-icon"
                        size={20}
                      />
                    )}
                    <span>{skill}</span>
                  </li>
                );
              })}
            </ul>
          </section>
          <div className="project-card__actions">
            <a
              aria-label={`${title} live site`}
              className="project-card__action"
              href={vercelUrl}
              rel="noreferrer"
              target="_blank"
            >
              <SiVercel aria-hidden="true" />
              <span>Demo</span>
            </a>
            <a
              aria-label={`${title} GitHub repository`}
              className="project-card__action"
              href={githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              <FaGithub aria-hidden="true" />
              <span>Repo</span>
            </a>
          </div>
        </div>
        </Card>
      </motion.div>
    </motion.article>
  );
}
