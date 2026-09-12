import type { StaticImageData } from "next/image";
import applecartScreenshot from "../public/ApplecartUI.png";
import balancePointScreenshot from "../public/BalancePoint.png";
import codeSwitcherScreenshot from "../public/CodeSwitcher.png";
import passPointScreenshot from "../public/PassPoint.png";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Planet from "./components/Planet";
import ProjectCard from "./components/ProjectCard";
import ShootingStarManager from "./components/ShootingStarManager";
import StarField from "./components/StarField";

type Project = {
  description: string;
  githubUrl: string;
  name: string;
  screenshot: StaticImageData;
  skills: string[];
  vercelUrl: string;
};

const projects: Project[] = [
  {
    name: "PassPoint",
    screenshot: passPointScreenshot,
    description: "PassPoint is a fullstack password manager web application built with Angular JS, ASP.NET, and PostgreSQL. The app features a responsive layout, user authentication, password management, secure storage of sensitive information, and a password generator.",
    skills: ["Angular JS", "JavaScript", "TypeScript", "SCSS", "ASP.NET", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/Austin-Tillotson/PassPoint",
    vercelUrl: "https://pass-point-lake.vercel.app/login",
  },
  {
    name: "BalancePoint",
    screenshot: balancePointScreenshot,
    description: "BalancePoint is a modern financial dashboard web application built with Next JS, React, TypeScript, and Recharts. The app features a responsive layout, functional navigation bar, and interactive charts for visualizing financial data.",
    skills: ["Next JS", "React", "JavaScript", "TypeScript", "Tailwind CSS", "Recharts"],
    githubUrl: "https://github.com/Austin-Tillotson/BalancePoint",
    vercelUrl: "https://financial-app-project-two.vercel.app/",
  },
  {
    name: "Applecart",
    screenshot: applecartScreenshot,
    description: "AppleCart is a modern ecommerce site built with HTML, SCSS, and JavaScript. The site features a responsive layout displaying various Apple products and an interactable cart that can have products added, removed, and cleared.",
    skills: ["JavaScript", "SCSS", "HTML"],
    githubUrl: "https://github.com/Austin-Tillotson/applecart_ui",
    vercelUrl: "https://applecart-ui-snowy.vercel.app/",
  },
  {
    name: "CodeSwitcher",
    screenshot: codeSwitcherScreenshot,
    description: "Code Switcher is a modern landing page built with HTML, CSS, and JavaScript. The site features animated UI components, animated background, interactive language tabs, and syntax styled code. One of my early projects where I developed strong fundamentals.",
    skills: ["JavaScript", "CSS", "HTML"],
    githubUrl: "https://github.com/Austin-Tillotson/frontend-now-code-switcher",
    vercelUrl: "https://frontend-now-code-switcher.vercel.app/",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <div aria-hidden="true" className="space-scene">
          <Planet
            className="planet--top-left glow--pulse"
            radius={80}
            opacity={0.15}
            size={70}
            pulseDuration={10}
          />
          <Planet
            className="planet--contact glow--pulse"
            radius={200}
            opacity={0.17}
            size={100}
            pulseDuration={15}
          />
          <Planet
            className="planet--lower-title glow--pulse"
            radius={40}
            opacity={0.11}
            size={40}
            pulseDuration={5}
            pulseSizeMin={1}
            pulseSizeMax={1}
          />
          <StarField />
          <ShootingStarManager />
        </div>
        <Hero />

        <section className="content-section content-section--projects" id="projects">
          <h2 className="content-section__title">Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard
                description={project.description}
                githubUrl={project.githubUrl}
                imageAlt={`${project.name} project screenshot`}
                imageSrc={project.screenshot}
                key={project.name}
                skills={project.skills}
                title={project.name}
                vercelUrl={project.vercelUrl}
              />
            ))}
          </div>
        </section>

        <section className="content-section content-section--contact" id="contact">
          <p>This is the contact section.</p>
        </section>
      </main>

      <Footer />
    </>
  );
}
