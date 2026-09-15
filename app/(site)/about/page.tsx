import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="about-page content-section">
      <div className="about-page__content">
        <h1 className="content-section__title">About Page</h1>
        <Link className="action-link" href="/">
          Return to Home
        </Link>
      </div>
    </section>
  );
}
