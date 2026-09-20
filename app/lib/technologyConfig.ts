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
import type { ComponentType } from "react";
import { SiPrimereact } from "react-icons/si";

export type TechnologyIcon = ComponentType<{
  "aria-hidden"?: boolean;
  "aria-label"?: string;
  className?: string;
  size?: number | string;
}>;

export type Technology = {
  color: string;
  Icon: TechnologyIcon;
  label: string;
};

export const technologies = {
  angular: { label: "AngularJS", Icon: AngularIcon, color: "#ff31d9" },
  aspNet: { label: "ASP.NET", Icon: Dotnet, color: "#512bd4" },
  css: { label: "CSS", Icon: Css3, color: "#1572b6" },
  docker: { label: "Docker", Icon: DockerIcon, color: "#2496ed" },
  eslint: { label: "ESLint", Icon: Eslint, color: "#4b32c3" },
  firebase: { label: "Firebase", Icon: FirebaseIcon, color: "#ffca28" },
  git: { label: "Git", Icon: GitIcon, color: "#f05032" },
  html: { label: "HTML", Icon: Html5, color: "#e34f26" },
  java: { label: "Java", Icon: Java, color: "#f89820" },
  javascript: { label: "JavaScript", Icon: Javascript, color: "#f7df1e" },
  jest: { label: "Jest", Icon: Jest, color: "#c21325" },
  next: { label: "NextJS", Icon: NextjsIcon, color: "#f5f1ff" },
  postgresql: { label: "PostgreSQL", Icon: Postgresql, color: "#4169e1" },
  prettier: { label: "Prettier", Icon: Prettier, color: "#f7b93e" },
  primeReact: { label: "PrimeReact", Icon: SiPrimereact, color: "#03c9d7" },
  rabbitMq: { label: "RabbitMQ", Icon: RabbitmqIcon, color: "#ff6600" },
  react: { label: "ReactJS", Icon: ReactIcon, color: "#00d8ff" },
  recharts: { label: "Recharts", Icon: ChartNoAxesCombined, color: "#8884d8" },
  restApi: { label: "REST API", Icon: Braces, color: "#c4b5fd" },
  sass: { label: "Sass", Icon: Sass, color: "#cc6699" },
  tailwind: { label: "Tailwind CSS", Icon: TailwindIcon, color: "#38bdf8" },
  typescript: { label: "TypeScript", Icon: TypescriptIcon, color: "#3178c6" },
  vite: { label: "Vite", Icon: Vite, color: "#646cff" },
} satisfies Record<string, Technology>;

export const heroTechnologyGroups = [
  {
    label: "Frontend Languages & Frameworks",
    skills: [
      technologies.html,
      technologies.css,
      technologies.sass,
      technologies.javascript,
      technologies.typescript,
      technologies.react,
      technologies.next,
      technologies.angular,
      technologies.primeReact,
      technologies.tailwind,
      technologies.recharts,
    ],
  },
  {
    label: "Backend, Data & Infrastructure",
    skills: [
      technologies.java,
      technologies.aspNet,
      technologies.postgresql,
      technologies.rabbitMq,
      technologies.docker,
      technologies.firebase,
      technologies.restApi,
    ],
  },
  {
    label: "Development Tools & Quality",
    skills: [
      technologies.git,
      technologies.vite,
      technologies.eslint,
      technologies.prettier,
      technologies.jest,
    ],
  },
];

export const projectTechnologies: Record<string, Technology> = {
  "Angular JS": technologies.angular,
  "ASP.NET": technologies.aspNet,
  CSS: technologies.css,
  Docker: technologies.docker,
  HTML: technologies.html,
  JavaScript: technologies.javascript,
  "Next JS": technologies.next,
  PostgreSQL: technologies.postgresql,
  React: technologies.react,
  Recharts: technologies.recharts,
  SCSS: technologies.sass,
  "Tailwind CSS": technologies.tailwind,
  TypeScript: technologies.typescript,
};
