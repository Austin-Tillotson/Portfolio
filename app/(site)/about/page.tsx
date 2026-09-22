import AboutAccordion from "../../components/AboutAccordion";
import AnimatedSectionTitle from "../../components/AnimatedSectionTitle";

export default function AboutPage() {
  return (
    <section className="about-page content-section">
      <div className="about-page__content">
        <AnimatedSectionTitle as="h1">About Me</AnimatedSectionTitle>
        <AboutAccordion />
      </div>
    </section>
  );
}
