"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface RestorativePracticeItem {
  id: string;
  title: string;
  description: string;
}

export const RESTORATIVE_PRACTICES: RestorativePracticeItem[] = [
  {
    id: "physical-restoration",
    title: "Physical restoration",
    description:
      "Movement, mobility and practices that support physical ease and reconnection with the body.",
  },
  {
    id: "breath-regulation",
    title: "Breath & regulation",
    description:
      "Breathwork and guided relaxation to create the conditions to settle.",
  },
  {
    id: "sleep-rhythm",
    title: "Sleep & rhythm",
    description:
      "Restorative routines and attention to the rhythms that support better rest.",
  },
  {
    id: "nourishment",
    title: "Nourishment",
    description:
      "Thoughtful, uncomplicated nourishment as part of the overall experience.",
  },
  {
    id: "selected-therapies",
    title: "Selected recovery therapies",
    description:
      "Additional modalities may be considered where appropriate and suitable.",
  },
  {
    id: "space-reflection",
    title: "Space & reflection",
    description:
      "Time without interruption, expectation or a requirement to be productive.",
  },
];

export default function RestorativePractices() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const quoteBannerRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Headline Fade-Up
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Practice Items Stagger Reveal
      const validItems = gridItemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.fromTo(
          validItems,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: validItems[0],
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Quote Banner Reveal
      if (quoteBannerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: quoteBannerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          quoteBannerRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
        );

        if (quoteTextRef.current) {
          tl.fromTo(
            quoteTextRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
            "-=0.6"
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full  py-8 sm:py-12 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* ========================================================
            PART 1: SECTION HEADLINE
           ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 lg:mb-24">
          <h2
            ref={headlineRef}
            className="font-headline-sans font-light text-[#C47B3F] text-3xl sm:text-4xl lg:text-[2.85rem] leading-[1.15] tracking-[-0.04em] will-change-transform"
          >
            A connected set of restorative practices.
          </h2>
        </div>

        {/* ========================================================
            PART 2: 6 RESTORATIVE PRACTICES GRID
           ======================================================== */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-10 lg:gap-x-14 gap-y-12 sm:gap-y-16">
          {RESTORATIVE_PRACTICES.map((practice, index) => (
            <div
              key={practice.id}
              ref={(el) => {
                gridItemsRef.current[index] = el;
              }}
              className="text-center flex flex-col items-center will-change-transform"
            >
              {/* Practice Title in Elegant Serif */}
              <h3 className="font-playfair text-lg sm:text-xl lg:text-[1.35rem] font-medium text-[#22251B] mb-2.5 sm:mb-3 tracking-[-0.01em]">
                {practice.title}
              </h3>

              {/* Practice Description */}
              <p className="font-sans text-xs sm:text-[13px] text-[#555A4E] leading-relaxed max-w-[290px] mx-auto font-normal">
                {practice.description}
              </p>
            </div>
          ))}
        </div>

        {/* ========================================================
            PART 3: QUOTE BANNER BLOCK
           ======================================================== */}
        <div className="mt-20 sm:mt-28 lg:mt-32 max-w-5xl mx-auto">
          <div
            ref={quoteBannerRef}
            className="bg-[#6F400A] text-white px-8 sm:px-14 lg:px-20 py-14 sm:py-18 lg:py-20 rounded-xs shadow-sm text-center relative overflow-hidden will-change-transform"
          >
            {/* Subtle luxury ambient texture overlay */}
            <div
              className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF9F5_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
              aria-hidden="true"
            />

            <blockquote
              ref={quoteTextRef}
              className="relative z-10 font-playfair font-normal text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] leading-[1.28] tracking-[-0.015em] text-[#FAF9F5] max-w-3xl mx-auto will-change-transform"
            >
              &ldquo;Recovery should not become another performance target.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

