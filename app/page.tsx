import Header from "./components/Header";
import Planet from "./components/Planet";
import ShootingStar from "./components/ShootingStar";
import StarField from "./components/StarField";

export default function Home() {
  return (
    <>
      <Header />

      <main>
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
        <ShootingStar size={10} tailLength={100} duration={10} />
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
