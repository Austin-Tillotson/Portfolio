"use client";

import { Menu, X } from "lucide-react";
import { Unbounded } from "next/font/google";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { createGlowStyle } from "../lib/createGlowStyle";

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

const navigationLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header site-bar">
      <div className="header__content site-bar__content">
        <a
          className={`header__title glow glow--hover ${unbounded.className}`}
          href="#hero"
          style={createGlowStyle()}
        >
          <span className="glow__content">Austin Tillotson</span>
        </a>

        <nav className="header__nav" aria-label="Main navigation">
          {navigationLinks.map(({ label, href }) => (
            <a
              key={label}
              className="header__nav-link glow glow--hover"
              href={href}
              style={createGlowStyle()}
            >
              <span className="header__nav-link-label">{label}</span>
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a
            className="header__contact-button glow glow--hover"
            href="#contact"
            style={createGlowStyle()}
          >
            <span className="glow__content">Contact Me</span>
          </a>
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              className="header__social-button glow glow--hover"
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              style={createGlowStyle()}
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
