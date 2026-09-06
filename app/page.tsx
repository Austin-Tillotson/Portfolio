export default function Home() {
  return (
    <>
      <header>
        <nav aria-label="Main navigation">
          <a href="#hero">Portfolio</a>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

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
