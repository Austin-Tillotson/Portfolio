"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Unbounded } from "next/font/google";
import { useEffect, useRef, useState } from "react";
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
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
  { label: "About Me", href: "/about" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (
        dropdownRef.current?.contains(event.target) ||
        menuButtonRef.current?.contains(event.target)
      ) {
        return;
      }

      setIsMenuOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isMenuOpen]);

  return (
    <>
      <header className="header site-bar">
        <div className="header__content site-bar__content">
        <Link
          className={`header__title glow glow--hover ${unbounded.className}`}
          href="/#hero"
          style={createGlowStyle({ edgeFade: 0.5, roundness: 0.6 })}
        >
          <span className="glow__content">Austin Tillotson</span>
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          {navigationLinks.map(({ label, href }) => (
            <Link
              key={label}
              className="header__nav-link glow glow--hover"
              href={href}
              style={createGlowStyle({ edgeFade: 0.7, roundness: 0.3 })}
            >
              <span className="header__nav-link-label">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <Link
            className="header__contact-button"
            href="/#contact"
          >
            Contact Me
          </Link>
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
          ref={menuButtonRef}
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="header__dropdown" id="mobile-menu" ref={dropdownRef}>
          <nav className="header__mobile-nav" aria-label="Mobile navigation">
            {navigationLinks.map(({ label, href }) => (
              <Link
                className="header__mobile-link"
                href={href}
                key={label}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="header__mobile-link-label">{label}</span>
              </Link>
            ))}
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
    </>
  );
}
