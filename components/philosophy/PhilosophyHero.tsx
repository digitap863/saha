"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophyHero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Main Headline masked reveal: tightly tracked neo-grotesque sans-serif
      const headlineLines = [headlineLine1Ref.current, headlineLine2Ref.current].filter(Boolean);
      if (headlineLines.length > 0) {
        tl.fromTo(
          headlineLines,
          {
            y: "120%",
            opacity: 0,
            rotateX: -12,
          },
          {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            duration: 1.25,
            stagger: 0.14,
            ease: "power4.out",
          },
          0.15
        );
      }

      // 2. Sub-heading entrance: elegant high-contrast serif font
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
          0.55
        );
      }

      // 3. ScrollTrigger subtle drift on scroll
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          y: -40,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom 20%",
            scrub: 1.2,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-36 sm:pt-44 lg:pt-52 pb-16 sm:pb-20 lg:pb-24 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto text-center will-change-transform"
    >
      {/* 1. Main Headline: Tightly tracked neo-grotesque sans-serif with negative letter-spacing */}
      <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.85rem] text-[#1E2E23] font-normal tracking-[-0.045em] sm:tracking-[-0.05em] leading-[1.04] max-w-5xl mx-auto">
        <span className="block overflow-hidden py-1">
          <span ref={headlineLine1Ref} className="inline-block transform-gpu">
            Recovery is part of
          </span>
        </span>
        <span className="block overflow-hidden py-1">
          <span ref={headlineLine2Ref} className="inline-block transform-gpu">
            the responsibility.
          </span>
        </span>
      </h1>

      {/* 2. Sub-heading: Elegant high-contrast serif font at smaller contrasting size */}
      <p
        ref={subtitleRef}
        className="font-serif-luxury text-base sm:text-lg md:text-xl lg:text-[1.5rem] text-[#4F594A] font-normal max-w-xl mx-auto leading-tight mt-6 sm:mt-8 tracking-wide"
      >
        Your capacity to lead deserves the same attention as the work you lead.
      </p>
    </section>
  );
}
