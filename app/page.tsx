import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <section id="hero">
          <p>This is the hero section.</p>
        </section>

        <section id="projects">
          <p>This is the projects section.</p>
        </section>

        <section id="contact">
          <p>This is the contact section.</p>
        </section>
      </main>

      <footer>
        <p>Portfolio footer.</p>
      </footer>
    </>
  );
}
