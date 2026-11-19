"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface RhythmStep {
  id: string;
  title: string;
  imageSrc: string;
  alt: string;
}

export const RHYTHM_STEPS: RhythmStep[] = [
  {
    id: "arrive-gently",
    title: "Arrive gently",
    imageSrc: "/experience/arrive_gently.png",
    alt: "Sahā Experience — Arrive gently with ease and decompression",
  },
  {
    id: "nourish",
    title: "Nourish",
    imageSrc: "/experience/nourish.png",
    alt: "Sahā Experience — Thoughtful, uncomplicated nourishment",
  },
  {
    id: "restore",
    title: "Restore",
    imageSrc: "/experience/restore.png",
    alt: "Sahā Experience — Physical movement, mobility and reconnection",
  },
  {
    id: "make-space",
    title: "Make space",
    imageSrc: "/experience/make_space.png",
    alt: "Sahā Experience — Time without interruption in quiet nature",
  },
  {
    id: "close-quietly",
    title: "Close quietly",
    imageSrc: "/experience/close_quietly.png",
    alt: "Sahā Experience — Deep restorative sleep and evening quietude",
  },
];

export default function ExperienceRhythm() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const footnoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Headline Fade-Up
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
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

      // 2. Titles Stagger Entrance
      const validTitles = titlesRef.current.filter(Boolean);
      if (validTitles.length > 0) {
        gsap.fromTo(
          validTitles,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: validTitles[0],
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Image Curtain Wipe & Scale Entrance
      const validImages = imageWrappersRef.current.filter(Boolean);
      if (validImages.length > 0) {
        gsap.fromTo(
          validImages,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            scale: 1.14,
            opacity: 0.6,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            opacity: 1,
            duration: 1.3,
            stagger: 0.12,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 5. Footnote subtle entrance
      if (footnoteRef.current) {
        gsap.fromTo(
          footnoteRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footnoteRef.current,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full  py-8 sm:py-12 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ========================================================
            PART 1: SECTION TITLE
           ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 lg:mb-20">
          <h2
            ref={headlineRef}
            className="font-headline-sans font-light text-[#1F231B] text-3xl sm:text-4xl lg:text-[3.35rem] leading-[1.12] tracking-[-0.04em] will-change-transform"
          >
            A rhythm, not a timetable.
          </h2>
        </div>

        {/* ========================================================
            PART 2: 5 RHYTHM COLUMNS WITH ANIMATED IMAGES
           ======================================================== */}
        {/* Desktop: 5-column contiguous grid. Mobile/Tablet: responsive scrollable or adaptive columns */}
        <div className="group/strip w-full max-w-6xl mx-auto">
          {/* Mobile view indicator note */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 lg:gap-1.5 items-end">
            {RHYTHM_STEPS.map((step, idx) => (
              <div
                key={step.id}
                ref={(el) => {
                  cardContainersRef.current[idx] = el;
                }}
                className="group/card flex flex-col items-center cursor-pointer will-change-transform"
              >
                {/* Pillar Header Title */}
                <h3
                  ref={(el) => {
                    titlesRef.current[idx] = el;
                  }}
                  className="font-playfair text-sm sm:text-base lg:text-[1.05rem] text-[#22251B] font-normal tracking-[-0.01em] text-center mb-3 sm:mb-4 group-hover/card:text-[#C47B3F] transition-colors duration-400"
                >
                  {step.title}
                </h3>

                {/* Image Mask Frame with GSAP Curtain Reveal & Hover Zoom */}
                <div className="relative w-full aspect-[2/3.1] rounded-xs overflow-hidden bg-[#ECE8DF] shadow-xs">
                  <div
                    ref={(el) => {
                      imageWrappersRef.current[idx] = el;
                    }}
                    className="relative w-full h-full will-change-transform"
                  >
                    <Image
                      src={step.imageSrc}
                      alt={step.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-108 group-hover/card:brightness-[1.02]"
                    />

                    {/* Subtle warm ambient vignette */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            PART 3: FOOTNOTE / DISCLAIMER
           ======================================================== */}
        <div className="mt-14 sm:mt-18 lg:mt-24 max-w-3xl mx-auto text-center px-4">
          <p
            ref={footnoteRef}
            className="text-[10px] sm:text-[11px] text-[#787D70] font-sans leading-relaxed tracking-normal will-change-transform"
          >
            *The programme is shaped around the individual. Depending on the experience and personal
            suitability. The actual schedule, programme length and inclusions will be shared before
            participation. This outline describes the intended pace, not a fixed timetable.
          </p>
        </div>
      </div>
    </section>
  );
}

