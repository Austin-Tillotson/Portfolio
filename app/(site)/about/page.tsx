import AboutAccordion from "../../components/AboutAccordion";

export default function AboutPage() {
  return (
    <section className="about-page content-section">
      <div className="about-page__content">
        <h1 className="content-section__title">About Me</h1>
        <AboutAccordion />
      </div>
    </section>
  );
}
