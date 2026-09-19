import Image from "next/image";
import Link from "next/link";
import { createGlowStyle } from "../lib/createGlowStyle";

const heroGlowStyle = createGlowStyle({
  opacity: 0.08,
  size: 30,
  ellipseWidth: "90%",
  ellipseHeight: "80%",
  rotation: -10,
});

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__content">
        <div className="hero__image-container">
          <Image
            alt="Austin Tillotson"
            className="hero__image"
            height={2208}
            priority
            sizes="(max-width: 375px) 80vw, (max-width: 550px) 70vw, (max-width: 767px) 24rem, (max-width: 1200px) calc(44.44vw - 5.33rem), 28rem"
            src="/self.jpg"
            width={2944}
          />
        </div>

        <div className="hero__copy">
          <div className="hero__title glow glow--ellipse" style={heroGlowStyle}>
            <h1>
              <span className="hero__software">Software</span>
              <span className="hero__engineer">Engineer</span>
            </h1>
          </div>
          <p className="hero__paragraph">
            With a strong passion for Frontend, I excel in taking Designs and Ideas 
            and bringing them to Life in responsive and visually appealing web applications
          </p>
          <div className="hero__actions">
            <Link className="action-link" href="#projects">
              See My Projects
            </Link>
            <Link className="action-link" href="/about">
              Learn More About Me
            </Link>
            <Link className="action-link" href="/expanse">
              Observe The Endless Expanse
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
