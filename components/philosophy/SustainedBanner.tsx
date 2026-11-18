"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SustainedBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      // Card container smooth rise & scale settling
      tl.fromTo(
        cardRef.current,
        { y: 45, opacity: 0, scale: 0.985 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1 }
      )
        // Eyebrow
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.8"
        )
        // Headline
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        )
        // Vertical divider expand
        .fromTo(
          dividerRef.current,
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.8, transformOrigin: "top" },
          "-=0.7"
        )
        // Right quote
        .fromTo(
          quoteRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.85 },
          "-=0.65"
        )
        // Right body
        .fromTo(
          bodyRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-16 sm:mb-20 lg:mb-24 will-change-transform"
    >
      <div
        ref={cardRef}
        className="bg-[#487361] rounded-xs px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16 text-[#FAFBF8] shadow-xs"
      >
         {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF9F5_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Premise Headline in Tightly Tracked Neo-grotesque Sans */}
          <div className="lg:col-span-5 space-y-3">
            <span
              ref={eyebrowRef}
              className="text-[10px] sm:text-[11px] font-medium tracking-[0.28em] text-[#C2DEC9] uppercase block"
            >
              THE PREMISE
            </span>
            <h2
              ref={headlineRef}
              className="font-sans text-2xl sm:text-3xl lg:text-[2.25rem] font-normal tracking-[-0.04em] leading-[1.16] text-white"
            >
              Sustained  performance needs space for restoration.
            </h2>
          </div>

          {/* Right Column: Key Statement in High-contrast Serif & Description */}
          <div
            ref={dividerRef}
            className="lg:col-span-7 space-y-5 lg:pl-4 lg:border-l lg:border-[#5f8f7c]"
          >
            <p
              ref={quoteRef}
              className="font-serif-luxury text-lg sm:text-xl lg:text-[1.5rem] text-[#FAFBF8] leading-snug font-normal"
            >
              Being able to carry more does not mean you should have to carry it without pause.
            </p>
            <p
              ref={bodyRef}
              className="text-xs sm:text-sm text-[#CDDCD1] leading-relaxed font-normal tracking-wide max-w-xl"
            >
              Constant alertness, unyielding routines and responsibility can leave little room for meaningful recovery. Sahā is designed to create that space deliberately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
