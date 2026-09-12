import Card from "./Card";

const skills = ["Next.js", "React", "TypeScript", "JavaScript", "CSS"];

export default function ProjectCard() {
  return (
    <Card className="project-card">
      <div
        aria-label="Temporary project screenshot"
        className="project-card__screenshot"
        role="img"
      />
      <p className="project-card__description">
        This is temporary descriptive text for the project. It will be replaced
        with a concise overview of the site&apos;s purpose and implementation.
      </p>
      <ul aria-label="Project skills" className="project-card__skills">
        {skills.map((skill) => (
          <li className="project-card__skill" key={skill}>
            {skill}
          </li>
        ))}
      </ul>
    </Card>
  );
}
