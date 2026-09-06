"use client";

import { Menu, X } from "lucide-react";
import { Unbounded } from "next/font/google";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const unbounded = Unbounded({ subsets: ["latin"] });

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/austin-tillotson-515b58196/",
    Icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/Austin-Tillotson",
    Icon: FaGithub,
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__content">
        <a className={`header__title ${unbounded.className}`} href="#hero">
          Austin Tillotson
        </a>

        <nav className="header__nav" aria-label="Main navigation">
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header__actions">
          <a className="header__contact-button" href="#contact">
            Contact Me
          </a>
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              className="header__social-button"
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>

        <button
          className="header__menu-button"
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="header__dropdown">
          <nav className="header__mobile-nav" aria-label="Mobile navigation">
            <a className="header__mobile-link" href="#projects" onClick={() => setIsMenuOpen(false)}>
              Projects
            </a>
            <a className="header__mobile-link" href="#contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>
          </nav>

          <div className="header__mobile-social-actions">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                className="header__social-button"
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
