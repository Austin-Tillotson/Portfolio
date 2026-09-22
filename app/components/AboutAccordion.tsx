"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

const aboutSections = [
  {
    id: "my-story",
    label: "My Story",
    paragraphs: [
      `Born in 1998, my story is one of perseverance and dedication. From the
      very beginning, I was the silent type. I was so silent my mother worried
      at times if I was alive, as I never made my life known while I was a mere
      fetus. This continued after birth. I would develop an ear infection but
      show no signs that I had it. This resulted in it going unnoticed for
      months. By the time it was found, it would take many months to cure it.`,
      `As a result, at an early age, I was behind. My ears were slow to develop
      and potentially never fully developed, and I was behind when it came to
      learning language. Despite being put into school early to make up for it,
      I would stay behind. This would catch up to me by the 2nd grade, as my
      school recommended I repeat that grade. I would go through tutoring that
      next year alongside the speech tutoring I took part in through the 5th
      grade. I would show great progress, going from failing a grade to getting
      my first straight-A report card by the end of 3rd grade. I would get
      straight As through 5th and 6th grades and leave elementary school as an
      honors student who was awarded the Indian Chief Award, an award that only
      one male student and one female student in a grade would receive.`,
      `From there, I would go through middle and high school, participating in
      dual enrollment when it became available. I would graduate from high
      school in 2017 and attend the University of Central Florida that fall.`,
      `I entered college not knowing exactly what I wanted to do. I knew math
      was my strongest topic throughout school, so I chose engineering, looking
      to make the most out of it. Naturally, I would quickly learn that finding
      something I enjoyed was most important, and mechanical was not it. Neither
      was electrical, as I would fail my first electrical engineering
      course... Fortunately, that same semester, I took Computer Organization.
      Funny enough, I was terrified at first, realizing it was a programming
      course. I had tried AP Computer Science in high school and eliminated the
      idea of programming because that was a horrible experience. But going
      through the course, I both excelled and found it interesting. And with the
      struggles I had on the electrical side, I would make my last transition to
      Computer Engineering, my best option to enter programming without giving
      up all my credits thus far. From there, I would find great success in my
      CS courses, and thus my career path was decided.`,
      `I would graduate with a love for programming, especially web design. But
      I would happily take the offer I got for a Software Engineering position.
      Recently, I was reminded of how much I enjoyed web design and have been
      dusting off those skills and working towards transitioning directly into
      that role.`,
    ],
  },
  {
    id: "my-hobbies",
    label: "My Hobbies",
    paragraphs: [
      `While I enjoy programming, especially web design, it is still my job, and
      I need a break from it after the workday. That leads me to the true
      highlights of my day: eating, exercising, playing video games, and
      watching videos, streams, and anime.`,
      `Eating is my true highlight. Every day I look forward to dinner.`,
      `Next is exercising, which I view as my lifestyle. My highest priority
      after work is getting to the gym 6 days a week. Sunday is my least
      favorite day because it's my rest day, so I feel less productive. And most
      importantly, I have to eat less as I burn less.`,
      `Finally, I spend the rest of my free time relaxing by watching videos,
      streams, anime, or playing video games.`,
      `But truly, the most enjoyable time every day is dinner, when I eat my
      favorite food and watch some great anime while I eat.`,
    ],
  },
  {
    id: "artificial-intelligence",
    label: "Artificial Intelligence",
    paragraphs: [
      `Truly, it is one of the most controversial topics of the modern day, is
      it not? Some think it's the best thing to have ever happened, others the
      worst. And others have a nuanced view.`,
      `I am in the latter. I believe AI is both the best and worst thing we
      humans have ever produced. On one hand, it has so much potential: extreme
      efficiency enhancement, the capability of solving problems we could not
      solve, diagnosing and debugging issues we encounter, and closing skill
      gaps. Everything will just become easier to accomplish. But on the other
      hand, the value of these things is going to rapidly decrease as everything
      becomes easier. And of course, there is the worst case of AI becoming
      something we can no longer control.`,
      `Personally, I think AI is inevitable, the cat is out of the bag. And every 
      day I am surprised at the speed at which it is improving. I am someone who 
      will seek to utilize it to the best of my abilities and accept the consequences 
      it may have in the future.`,
    ],
  },
  {
    id: "fun_fact",
    label: "Fun Fact",
    paragraphs: [
      `Wonder why the site is called ARTillotson?`,
      `Well, it's because my initials spell ART!`,
    ],
  },
];

export default function AboutAccordion() {
  const shouldReduceMotion = useReducedMotion();
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function toggleSection(id: string) {
    const isOpening = openSectionId !== id;

    setOpenSectionId(isOpening ? id : null);

    if (!isOpening) {
      return;
    }

    window.requestAnimationFrame(() => {
      const section = sectionRefs.current[id];
      const header = document.querySelector(".header");

      if (!section) {
        return;
      }

      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      const safeTop = headerHeight + 16;
      const viewportBottom = window.innerHeight - 16;
      const sectionRect = section.getBoundingClientRect();
      const firstParagraph = section.querySelector<HTMLElement>(
        ".about-accordion__paragraph",
      );
      const firstParagraphTop = firstParagraph?.getBoundingClientRect().top;
      let scrollOffset = 0;

      if (sectionRect.top < safeTop) {
        scrollOffset = sectionRect.top - safeTop;
      } else if (
        firstParagraphTop !== undefined &&
        firstParagraphTop > viewportBottom
      ) {
        scrollOffset = firstParagraphTop - viewportBottom;
      } else {
        return;
      }

      window.scrollBy({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        top: scrollOffset,
      });
    });
  }

  return (
    <motion.div
      className="about-accordion-reveal"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
      transition={{
        duration: 1.2,
        delay: shouldReduceMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-120px" }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
    >
      <div className="about-accordion">
        {aboutSections.map(({ id, label, paragraphs }) => {
          const isOpen = openSectionId === id;
          const panelId = `about-panel-${id}`;
          const triggerId = `about-trigger-${id}`;

          return (
            <div
              className={`about-accordion__item${isOpen ? " about-accordion__item--open" : ""}`}
              key={id}
              ref={(element) => {
                sectionRefs.current[id] = element;
              }}
            >
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className={`about-accordion__trigger${isOpen ? " about-accordion__trigger--open" : ""}`}
                id={triggerId}
                onClick={() => toggleSection(id)}
                type="button"
              >
                {label}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    aria-labelledby={triggerId}
                    className="about-accordion__panel-reveal"
                    exit={shouldReduceMotion ? {} : { height: 0, opacity: 0, y: -8 }}
                    id={panelId}
                    initial={shouldReduceMotion ? false : { height: 0, opacity: 0, y: -8 }}
                    role="region"
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="about-accordion__panel">
                      {paragraphs.map((paragraph) => (
                        <p className="about-accordion__paragraph" key={paragraph}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
