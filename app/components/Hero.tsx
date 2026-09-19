import Image from "next/image";
import Link from "next/link";
import {
  AngularIcon,
  DockerIcon,
  Dotnet,
  Eslint,
  FirebaseIcon,
  GitIcon,
  Html5,
  Java,
  Javascript,
  Jest,
  NextjsIcon,
  Postgresql,
  Prettier,
  RabbitmqIcon,
  _React as ReactIcon,
  Sass,
  TailwindIcon,
  TypescriptIcon,
  Vite,
} from "@dev.icons/react";
import { Css3 } from "@dev.icons/react/mono";
import { Braces, ChartNoAxesCombined } from "lucide-react";
import { SiPrimereact } from "react-icons/si";
import { createGlowStyle } from "../lib/createGlowStyle";
import SkillIcon from "./SkillIcon";

const heroGlowStyle = createGlowStyle({
  opacity: 0.08,
  size: 30,
  ellipseWidth: "90%",
  ellipseHeight: "80%",
  rotation: -10,
});

const heroSkillGroups = [
  {
    label: "Frontend Languages & Frameworks",
    skills: [
      { label: "HTML", Icon: Html5, color: "#e34f26" },
      { label: "CSS", Icon: Css3, color: "#1572b6" },
      { label: "Sass", Icon: Sass, color: "#cc6699" },
      { label: "JavaScript", Icon: Javascript, color: "#f7df1e" },
      { label: "TypeScript", Icon: TypescriptIcon, color: "#3178c6" },
      { label: "ReactJS", Icon: ReactIcon, color: "#00d8ff" },
      { label: "NextJS", Icon: NextjsIcon, color: "#f5f1ff" },
      { label: "AngularJS", Icon: AngularIcon, color: "#ff31d9" },
      { label: "PrimeReact", Icon: SiPrimereact, color: "#03c9d7" },
      { label: "Tailwind CSS", Icon: TailwindIcon, color: "#38bdf8" },
      { label: "Recharts", Icon: ChartNoAxesCombined, color: "#8884d8" },
    ],
  },
  {
    label: "Backend, Data & Infrastructure",
    skills: [
      { label: "Java", Icon: Java, color: "#f89820" },
      { label: "ASP.NET", Icon: Dotnet, color: "#512bd4" },
      { label: "PostgreSQL", Icon: Postgresql, color: "#4169e1" },
      { label: "RabbitMQ", Icon: RabbitmqIcon, color: "#ff6600" },
      { label: "Docker", Icon: DockerIcon, color: "#2496ed" },
      { label: "Firebase", Icon: FirebaseIcon, color: "#ffca28" },
      { label: "REST API", Icon: Braces, color: "#c4b5fd" },
    ],
  },
  {
    label: "Development Tools & Quality",
    skills: [
      { label: "Git", Icon: GitIcon, color: "#f05032" },
      { label: "Vite", Icon: Vite, color: "#646cff" },
      { label: "ESLint", Icon: Eslint, color: "#4b32c3" },
      { label: "Prettier", Icon: Prettier, color: "#f7b93e" },
      { label: "Jest", Icon: Jest, color: "#c21325" },
    ],
  },
];

export default function Hero() {
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
            With a strong passion for Frontend, I excel in taking Designs and Ideas 
            and bringing them to Life in responsive and visually appealing web applications
          </p>
          <div className="hero__skills">
            {heroSkillGroups.map((group) => (
              <div aria-label={group.label} className="hero__skill-group" key={group.label}>
                {group.skills.map((skill) => (
                  <SkillIcon key={skill.label} {...skill} />
                ))}
              </div>
            ))}
          </div>
          <div className="hero__actions">
            <Link className="action-link" href="#projects">
              See My Projects
            </Link>
            <Link className="action-link" href="/about">
              Learn More About Me
            </Link>
            <Link className="action-link" href="/expanse">
              Observe The Endless Expanse
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
