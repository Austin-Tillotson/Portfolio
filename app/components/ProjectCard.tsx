import Image, { type StaticImageData } from "next/image";
import { FaGithub } from "react-icons/fa6";
import { SiVercel } from "react-icons/si";
import Card from "./Card";

type ProjectCardProps = {
  description: string;
  githubUrl: string;
  imageAlt: string;
  imageSrc: StaticImageData;
  skills: string[];
  title: string;
  vercelUrl: string;
};

export default function ProjectCard({
  description,
  githubUrl,
  imageAlt,
  imageSrc,
  skills,
  title,
  vercelUrl,
}: ProjectCardProps) {
  return (
    <Card className="project-card">
      <div
        aria-label={`${imageAlt}. Scroll to view the full screenshot.`}
        className="project-card__screenshot"
        role="region"
        tabIndex={0}
      >
        <Image
          alt={imageAlt}
          className="project-card__image"
          sizes="(max-width: 62.499rem) calc(100vw - 3rem), (max-width: 75rem) calc((100vw - 5.5rem) / 2), 35.75rem"
          src={imageSrc}
        />
      </div>
      <div className="project-card__content">
        <div className="project-card__header">
          <h3 className="project-card__title">{title}</h3>
          <div className="project-card__actions">
            <a
              aria-label={`${title} live site`}
              className="project-card__action"
              href={vercelUrl}
              rel="noreferrer"
              target="_blank"
            >
              <SiVercel aria-hidden="true" />
            </a>
            <a
              aria-label={`${title} GitHub repository`}
              className="project-card__action"
              href={githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              <FaGithub aria-hidden="true" />
            </a>
          </div>
        </div>
        <p className="project-card__description">{description}</p>
        <section className="project-card__skills-section" aria-label="Project skills">
          <h4 className="project-card__skills-title">Skills</h4>
          <ul className="project-card__skills">
            {skills.map((skill) => (
              <li className="project-card__skill" key={skill}>
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Card>
  );
}
