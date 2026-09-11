import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Planet from "./components/Planet";
import ShootingStarManager from "./components/ShootingStarManager";
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
        <ShootingStarManager />
        <Hero />

        <section className="content-section content-section--projects" id="projects">
          <p>This is the projects section.</p>
        </section>

        <section className="content-section content-section--contact" id="contact">
          <p>This is the contact section.</p>
        </section>
      </main>

      <Footer />
    </>
  );
}
