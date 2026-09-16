"use client";

import { useState } from "react";

const aboutSections = [
  {
    id: "id1",
    label: "about me",
    paragraphs: [
      "Paragraph 1.",
      "Paragraph 2.",
    ],
  },
  {
    id: "id2",
    label: "about me",
    paragraphs: [
      "Paragraph 1.",
      "Paragraph 2.",
    ],
  },
  {
    id: "id3",
    label: "about me",
    paragraphs: [
      "Paragraph 1.",
      "Paragraph 2.",
    ],
  },
];

export default function AboutAccordion() {
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);

  return (
    <div className="about-accordion">
      {aboutSections.map(({ id, label, paragraphs }) => {
        const isOpen = openSectionId === id;
        const panelId = `about-panel-${id}`;
        const triggerId = `about-trigger-${id}`;

        return (
          <div
            className={`about-accordion__item${isOpen ? " about-accordion__item--open" : ""}`}
            key={id}
          >
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className={`about-accordion__trigger${isOpen ? " about-accordion__trigger--open" : ""}`}
              id={triggerId}
              onClick={() => setOpenSectionId(isOpen ? null : id)}
              type="button"
            >
              {label}
            </button>
            {isOpen && (
              <div
                aria-labelledby={triggerId}
                className="about-accordion__panel"
                id={panelId}
                role="region"
              >
                {paragraphs.map((paragraph) => (
                  <p className="about-accordion__paragraph" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
