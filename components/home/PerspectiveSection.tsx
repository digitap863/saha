"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PerspectiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopNatureRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(sectionRef);

    // 1. Desktop & Tablet (>= 768px):
    // Left-to-Right Image Fill Effect: initially shifted left by -18% (~80% visible),
    // and through scrolling, glides from left to right to 0%, filling the section completely.
    mm.add("(min-width: 768px)", () => {
      if (desktopNatureRef.current) {
        gsap.fromTo(
          desktopNatureRef.current,
          {
            xPercent: -18,
            scale: 0.96,
            opacity: 0.9,
            transformOrigin: "left bottom",
          },
          {
            xPercent: 0,
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

      // Staggered text entrance
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
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
    });

    // 2. Mobile View (< 768px):
    // Pure clean typography on white background with smooth staggered text entrance.
    mm.add("(max-width: 767px)", () => {
      const mobileTextTl = gsap.timeline({
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      if (headlineRef.current) {
        mobileTextTl.fromTo(
          headlineRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95 },
          0
        );
      }

      if (subtitleRef.current) {
        mobileTextTl.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          0.15
        );
      }

      if (bodyRef.current) {
        mobileTextTl.fromTo(
          bodyRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.28
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative z-10 w-full overflow-hidden bg-white min-h-[460px] sm:min-h-[520px] md:min-h-[720px] lg:min-h-[820px] flex items-center py-14 sm:py-16 md:py-20 lg:py-28"
    >
      {/* Nature Visual Layer: Rendered only on Desktop & Tablet (hidden on mobile) */}
      <div className="hidden md:flex absolute inset-0 w-full h-full pointer-events-none select-none z-0 items-end justify-start overflow-hidden">
        <img
          ref={desktopNatureRef}
          src="/home_nature.webp"
          alt="Sahā - Restoration in Nature"
          className="w-full h-full object-cover object-left-bottom lg:object-contain lg:object-left-bottom select-none will-change-transform"
          style={{ transformOrigin: "left bottom" }}
        />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Desktop Left Column Spacer (leaves full visual clarity for tree, meditating figure, and rock) */}
          <div className="hidden lg:block lg:col-span-6 pointer-events-none" />

          {/* Text Content Column: Sits on clean white background */}
          <div
            ref={textContainerRef}
            className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-8 lg:pl-6 xl:pl-8 will-change-transform"
          >
            {/* 1. Main Title */}
            <h2
              ref={headlineRef}
              className="font-sans text-[2rem] sm:text-[2.35rem] md:text-[2.65rem] lg:text-[2.85rem] leading-[1.12] tracking-[-0.02em] text-[#c0a221] font-normal will-change-transform"
            >
              The higher the <br />
              responsibility, the more <br />
              deliberate recovery <br />
              must become.
            </h2>

            {/* 2. Subtitle Quote */}
            <div
              ref={subtitleRef}
              className="font-serif-luxury text-xl sm:text-2xl md:text-[1.5rem] leading-[1.35] text-[#2f3123] font-normal will-change-transform"
            >
              <p>You are accustomed to carrying a great deal.</p>
              <p>There should be somewhere you do not have to.</p>
            </div>

            {/* 3. Body Narrative */}
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
