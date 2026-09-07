import Header from "./components/Header";
import Planet from "./components/Planet";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Planet
          className="planet--top-left"
          radius={80}
          opacity={0.15}
          size={70}
        />
        <Planet
          className="planet--contact"
          radius={200}
          opacity={0.17}
          size={100}
        />
        <Planet
          className="planet--lower-title"
          radius={40}
          opacity={0.11}
          size={40}
        />
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
