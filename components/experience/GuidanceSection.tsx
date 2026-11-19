"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface GuidancePillar {
  index: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

export const GUIDANCE_PILLARS: GuidancePillar[] = [
  {
    index: "01",
    icon: Compass,
    title: "Considered Expertise",
    description:
      "Experienced practitioners bringing specialized knowledge, care, and grounded depth to every practice.",
  },
  {
    index: "02",
    icon: HeartHandshake,
    title: "Personal Attunement",
    description:
      "Sessions shaped around individual needs, preferences, and comfort—without rigid expectations.",
  },
  {
    index: "03",
    icon: Sparkles,
    title: "Unrushed Guidance",
    description:
      "Attentive when direction is needed, completely quiet and unobtrusive when restorative space is preferred.",
  },
  {
    index: "04",
    icon: ShieldCheck,
    title: "In Good Hands",
    description:
      "A trusted, private environment built on clarity, safety, and thorough communication before participation.",
  },
];

export default function GuidanceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const cardGridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Left Column Sequence
      const leftTl = gsap.timeline({
        scrollTrigger: {
          trigger: leftColRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      if (headlineRef.current) {
        leftTl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.1 }
        );
      }

      if (subtitleRef.current) {
        leftTl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        );
      }

      if (narrativeRef.current) {
        leftTl.fromTo(
          narrativeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        );
      }

      // 2. Right Column Cards Stagger
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardGridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#FAF9F5] py-8 sm:py-12 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* ========================================================
              LEFT COLUMN: EDITORIAL STATEMENT & NARRATIVE
             ======================================================== */}
          <div ref={leftColRef} className="lg:col-span-6 space-y-7 will-change-transform">
            {/* Eyebrow Accent */}
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#C47B3F]" />
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.28em] text-[#C47B3F] uppercase">
                PRACTITIONERS & GUIDANCE
              </span>
            </div>

            {/* Main Headline */}
            <h2
              ref={headlineRef}
              className="font-headline-sans font-light text-[#C47B3F] text-4xl sm:text-5xl lg:text-[3.85rem] leading-[1.08] tracking-[-0.04em] will-change-transform"
            >
              Know who is <br />
              guiding your <br />
              experience.
            </h2>

            {/* Subheading in Playfair Italic */}
            <p
              ref={subtitleRef}
              className="font-playfair text-2xl sm:text-3xl text-[#1C241D] italic font-normal tracking-tight pt-2 will-change-transform"
            >
              Clarity is part of care.
            </p>

            {/* Body Copy with Refined Editorial Rhythm */}
            <div
              ref={narrativeRef}
              className="space-y-4 text-sm sm:text-[15px] text-[#4A5043] leading-relaxed max-w-xl font-normal will-change-transform"
            >
              <p>
                <span className="text-[#1C241D] font-medium">
                  The right guidance makes all the difference.
                </span>{" "}
                Our experienced practitioners bring knowledge, care and considered expertise to every
                practice.
              </p>
              <p>
                Each session is thoughtfully guided, with attention to your individual needs,
                preferences and comfort. Because a truly personal experience begins with knowing you
                are in good hands.
              </p>
              <p className="text-xs sm:text-[13px] text-[#6F7567] pt-2">
                Sahā is a private recovery and wellbeing experience, not a substitute for
                professional healthcare.
              </p>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: CARE STANDARDS & PILLARS GRID
             ======================================================== */}
          <div className="lg:col-span-6 lg:pt-4">
            <div
              ref={cardGridRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            >
              {GUIDANCE_PILLARS.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.index}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    className="group relative bg-white/85 hover:bg-white border border-[#E7E1D4] hover:border-[#C47B3F]/50 p-6 sm:p-7 rounded-xs shadow-xs hover:shadow-md transition-all duration-400 flex flex-col justify-between min-h-[220px] will-change-transform"
                  >
                    {/* Top Row: Index number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-headline-sans text-xs tracking-[0.2em] font-medium text-[#C47B3F]">
                        {pillar.index}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-[#FAF7F0] flex items-center justify-center text-[#C47B3F] group-hover:bg-[#C47B3F] group-hover:text-white transition-colors duration-400">
                        <IconComponent className="w-4 h-4 stroke-[1.5]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-playfair text-lg sm:text-[1.15rem] font-medium text-[#1C241D] mb-2 group-hover:text-[#C47B3F] transition-colors duration-300">
                        {pillar.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-[13px] text-[#555B4E] leading-relaxed font-normal">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Subtle bottom indicator line on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C47B3F] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

