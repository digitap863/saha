"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GuidanceSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 1.1 }
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        );
      }

      if (narrativeRef.current) {
        tl.fromTo(
          narrativeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-saha-bg py-8 sm:py-12 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex justify-center">
        {/* Centered Content Container */}
        <div
          ref={contentRef}
          className="max-w-3xl w-full text-center space-y-6 sm:space-y-7 will-change-transform"
        >
          {/* Centered Eyebrow Accent with Balanced Flanking Hairlines */}
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-[#C47B3F]" />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.28em] text-[#C47B3F] uppercase">
              PRACTITIONERS & GUIDANCE
            </span>
            <span className="w-6 h-[1px] bg-[#C47B3F]" />
          </div>

          {/* Centered Main Headline */}
          <h2
            ref={headlineRef}
            className="font-headline-sans font-light text-[#C47B3F] text-4xl sm:text-5xl lg:text-[4rem] leading-[1.08] tracking-[-0.04em] text-center will-change-transform"
          >
            Know who is guiding <br />
            your experience.
          </h2>

          {/* Centered Subheading in Playfair Italic */}
          <p
            ref={subtitleRef}
            className="font-playfair text-2xl sm:text-3xl text-[#1C241D] italic font-normal tracking-tight pt-1 text-center will-change-transform"
          >
            Clarity is part of care.
          </p>

          {/* Centered Body Copy */}
          <div
            ref={narrativeRef}
            className="space-y-4 text-sm sm:text-base text-[#4A5043] leading-relaxed font-normal text-center max-w-2xl mx-auto will-change-transform"
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
            <p className="text-xs sm:text-[13px] text-[#6F7567] pt-2 max-w-xl mx-auto">
              Sahā is a private recovery and wellbeing experience, not a substitute for
              professional healthcare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
