"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PerspectiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const natureImgRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll-driven Left-to-Right Image Fill Effect:
      // Initially shows ~80% of the image (shifted left by -18%),
      // and through scrolling, glides from left to right to 0%, filling the section completely.
      if (natureImgRef.current) {
        gsap.fromTo(
          natureImgRef.current,
          {
            xPercent: -18, // Initially shifted left, displaying ~80% of the visual
            scale: 0.96,
            opacity: 0.9,
            transformOrigin: "left bottom",
          },
          {
            xPercent: 0, // Moves from left to right as you scroll, completely filling out
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              end: "center 45%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 2. Coordinated Typography Entrance on Scroll
      if (textContainerRef.current) {
        gsap.fromTo(
          textContainerRef.current,
          {
            x: 35,
            opacity: 0.6,
          },
          {
            x: 0,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "center 48%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Subtle upward stagger for the text elements
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      if (headlineRef.current) {
        textTl.fromTo(
          headlineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          0
        );
      }

      if (subtitleRef.current) {
        textTl.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0.18
        );
      }

      if (bodyRef.current) {
        textTl.fromTo(
          bodyRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.32
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative w-full overflow-hidden bg-white min-h-[560px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[820px] flex items-center py-16 md:py-20 lg:py-28"
    >
      {/* Nature Visual Layer:
          Initially shifted left (showing ~80%), moving left-to-right as you scroll to fill completely */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 flex items-end justify-start overflow-hidden">
        <img
          ref={natureImgRef}
          src="/home_nature.png"
          alt="Sahā - Restoration in Nature"
          className="w-full h-full object-cover object-left-bottom sm:object-contain sm:object-left-bottom select-none will-change-transform"
          style={{ transformOrigin: "left bottom" }}
        />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Spacer (leaves full visual clarity for tree, meditating figure, and rock) */}
          <div className="lg:col-span-6 min-h-[300px] sm:min-h-[380px] lg:min-h-0 pointer-events-none" />

          {/* Right Column: Exactly the text from the reference */}
          <div
            ref={textContainerRef}
            className="lg:col-span-6 flex flex-col justify-center space-y-7 sm:space-y-8 lg:pl-6 xl:pl-8 will-change-transform"
          >
            {/* Main Headline */}
            <h2
              ref={headlineRef}
              className="font-sans text-[1.85rem] sm:text-[2.25rem] md:text-[2.65rem] lg:text-[2.85rem] leading-[1.14] tracking-[-0.015em] text-[#c0a221] font-normal will-change-transform"
            >
              The higher the <br />
              responsibility, the more <br />
              deliberate recovery <br />
              must become.
            </h2>

            {/* Subtitle Quote */}
            <div
              ref={subtitleRef}
              className="font-serif-luxury text-xl sm:text-2xl md:text-[1.5rem] leading-[1.35] text-[#2f3123] font-normal will-change-transform"
            >
              <p>You are accustomed to carrying a great deal.</p>
              <p>There should be somewhere you do not have to.</p>
            </div>

            {/* Body Narrative */}
            <p
              ref={bodyRef}
              className="font-sans text-sm sm:text-base md:text-[1rem] leading-relaxed text-[#45473d] font-normal max-w-xl will-change-transform"
            >
              For founders, business leaders, entrepreneurs and senior decision-makers, pressure
              rarely ends with the working day. Sahā creates a private interval away from constant
              demands, with considered practices that support restoration and perspective.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
