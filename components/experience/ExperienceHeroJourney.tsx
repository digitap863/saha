"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "arrive",
    title: "Arrive and settle",
    description:
      "A private welcome, an initial conversation and time to settle into the environment. The transition out of everyday demands should feel unhurried.",
  },
  {
    id: "recover",
    title: "Recover at your pace",
    description:
      "Restorative practices are selected around the individual. There is room for guided sessions as well as unstructured time, without turning recovery into another performance.",
  },
  {
    id: "return",
    title: "Return with intention",
    description:
      "Make space to reflect on what was useful and identify practical ways to carry supportive routines into everyday life.",
  },
];

export default function ExperienceHeroJourney() {
  const containerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  // Top Section Refs
  const topHeadline1Ref = useRef<HTMLSpanElement>(null);
  const topHeadline2Ref = useRef<HTMLSpanElement>(null);
  const topSubtitleRef = useRef<HTMLParagraphElement>(null);

  // Journey Section Refs
  const journeySectionRef = useRef<HTMLDivElement>(null);
  const journeyTagRef = useRef<HTMLSpanElement>(null);
  const journeyHeadlineRef = useRef<HTMLHeadingElement>(null);
  const journeyColumnsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Page Mount: Background Image Cinematic Reveal
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1.04, opacity: 0.85, transformOrigin: "top center" },
          {
            scale: 1,
            opacity: 1,
            duration: 1.8,
            ease: "power2.out",
            transformOrigin: "top center",
          }
        );

        // Continuous Subtle Parallax Drift on Scroll:
        // Anchored at top on load (progress=0 at scrollY=0), gently drifts up as user scrolls
        gsap.to(bgImageRef.current, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // 2. Top Hero Headline Masked Line Entrance
      const topTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      const topLines = [topHeadline1Ref.current, topHeadline2Ref.current].filter(Boolean);
      if (topLines.length > 0) {
        topTl.fromTo(
          topLines,
          { y: "125%", opacity: 0, rotateX: -12 },
          {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            duration: 1.3,
            stagger: 0.16,
          },
          0.2
        );
      }

      if (topSubtitleRef.current) {
        topTl.fromTo(
          topSubtitleRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
          0.65
        );
      }

      // 3. Lower Section: "The Guest Journey" ScrollTrigger Sequence
      if (journeySectionRef.current) {
        const journeyTl = gsap.timeline({
          scrollTrigger: {
            trigger: journeySectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power3.out" },
        });

        if (journeyTagRef.current) {
          journeyTl.fromTo(
            journeyTagRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8 },
            0
          );
        }

        if (journeyHeadlineRef.current) {
          journeyTl.fromTo(
            journeyHeadlineRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1 },
            0.15
          );
        }

        const validCols = journeyColumnsRef.current.filter(Boolean);
        if (validCols.length > 0) {
          journeyTl.fromTo(
            validCols,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.16,
            },
            0.35
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#EDE8E1] min-h-250 lg:min-h-350 flex flex-col justify-between pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 isolate"
    >
      {/* Full Screen Width Background Image (experience.png) - anchored at the top */}
      <div
        ref={bgImageRef}
        className="absolute top-0 inset-x-0 w-full h-[112%] -z-10 pointer-events-none select-none overflow-hidden origin-top"
      >
        <Image
          src="/experience.png"
          alt="Sahā Experience — Time away, used with intention"
          fill
          priority
          unoptimized
          className="object-cover object-[75%_top] sm:object-[center_top]"
        />
      </div>

      {/* Inner Container: Aligns typography and content with page grid */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col justify-between flex-1">
        {/* ========================================================
            PART 1: TOP HERO STATEMENT
           ======================================================== */}
        <div className="relative z-10 max-w-xl lg:max-w-2xl pt-2 sm:pt-4">
          {/* Main Dual-Tone Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] leading-none tracking-normal font-light">
            {/* Line 1: Warm Ochre Tightly Tracked Sans */}
            <span className="block overflow-hidden py-1">
              <span
                ref={topHeadline1Ref}
                className="font-headline-sans font-light text-[#C47B3F] tracking-tighter inline-block transform-gpu will-change-transform"
              >
                Time away,
              </span>
            </span>

            {/* Line 2: Playfair Display Italic */}
            <span className="block overflow-hidden py-2.5 pr-4 -mr-4">
              <span
                ref={topHeadline2Ref}
                className="font-playfair italic font-normal text-[#1C3A2B] tracking-[-0.01em] inline-block transform-gpu will-change-transform"
              >
                used with intention.
              </span>
            </span>
          </h1>

          {/* Subtitle Description */}
          <p
            ref={topSubtitleRef}
            className="font-playfair font-normal text-[#1C3A2B] text-[17px] leading-[1.5] max-w-[340px] mt-6 sm:mt-8 will-change-transform"
          >
            A personal recovery experience with considered practices, quiet structure and room to do
            very little.
          </p>
        </div>

        {/* ========================================================
            PART 2: THE GUEST JOURNEY (Bottom Section)
           ======================================================== */}
        <div
          ref={journeySectionRef}
          className="relative z-10 pt-36 sm:pt-48 lg:pt-60 pb-2"
        >
          {/* Eyebrow Label */}
          <span
            ref={journeyTagRef}
            className="text-[10px] sm:text-[11px] font-medium tracking-[0.28em] text-[#4F5547] uppercase block mb-3 sm:mb-4 will-change-transform"
          >
            THE GUEST JOURNEY
          </span>

          {/* Journey Headline */}
          <h2
            ref={journeyHeadlineRef}
            className="font-sans  text-3xl sm:text-4xl lg:text-[2.85rem] text-[#C47B3F] font-normal tracking-[-0.035em] leading-[1.14] max-w-2xl mb-8 sm:mb-12 will-change-transform"
          >
            A considered experience, from <br className="hidden sm:inline" />
            arrival to return.
          </h2>

          {/* 3 Columns Journey Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {JOURNEY_STEPS.map((step, idx) => (
              <div
                key={step.id}
                ref={(el) => {
                  journeyColumnsRef.current[idx] = el;
                }}
                className="space-y-2 sm:space-y-3 will-change-transform"
              >
                {/* Step Title in Refined Serif */}
                <h3 className="font-serif-luxury text-base sm:text-lg lg:text-2xl text-[#00000] font-medium tracking-normal">
                  {step.title}
                </h3>

                {/* Step Narrative */}
                <p className="text-[11px] sm:text-xs lg lg:text-sm text-[#00000] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

