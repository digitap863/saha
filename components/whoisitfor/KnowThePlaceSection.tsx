"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface SettingDetail {
  number: string;
  title: string;
  description: string;
}

export const SETTING_DETAILS: SettingDetail[] = [
  {
    number: "01",
    title: "Location",
    description: "The destination, travel access and arrival arrangements.",
  },
  {
    number: "02",
    title: "Stay",
    description:
      "Accommodation type, privacy, room arrangements and what is included.",
  },
  {
    number: "03",
    title: "Environment",
    description:
      "Actual photographs of the spaces, landscape and places used during the experience.",
  },
  {
    number: "04",
    title: "Practical details",
    description:
      "Accessibility, facilities, programme dates and participation requirements.",
  },
];

export default function KnowThePlaceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header entrance animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Grid items staggered entrance animation
      const validItems = itemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.fromTo(
          validItems,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: validItems[0],
              start: "top 85%",
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
      id="setting-journey"
      className="relative w-full py-6 sm:py-12 lg:pb-25 bg-saha-bg"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Block */}
        <div ref={headerRef} className="max-w-5xl mb-14 sm:mb-18 lg:mb-22">
          <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-[#1E2E23] font-normal leading-[1.04] tracking-[-0.04em] sm:tracking-[-0.045em] max-w-5xl">
            Know the place before you <br className="hidden sm:inline" />
            make the journey.
          </h2>

          <p className="font-sans text-sm sm:text-base md:text-[1.05rem] text-[#5C5E50] font-normal leading-relaxed max-w-3xl mt-6 sm:mt-8">
            The setting is part of the experience, not a detail to discover after
            booking. Before participation is confirmed, Sahā should share the
            actual location, accommodation arrangements, facilities available,
            accessibility information and a clear picture of the environment.
          </p>
        </div>

        {/* 4 Details Grid with Editorial Divider Lines (2x2 on desktop) */}
        <div className="border-t border-[#D9CCC2] grid grid-cols-1 md:grid-cols-2">
          {/* 01 Location */}
          <div
            ref={(el) => {
              itemsRef.current[0] = el;
            }}
            className="pt-8 sm:pt-10 pb-8 sm:pb-12 md:pr-12 lg:pr-16 border-b border-[#D9CCC2] md:border-r"
          >
            <div className="text-[11px] sm:text-xs font-mono tracking-[0.2em] text-[#8C6548] mb-3 sm:mb-4">
              01
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-[2.4rem] text-[#2F3123] font-normal leading-tight mb-3">
              Location
            </h3>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#5C5E50] leading-relaxed max-w-md font-normal">
              The destination, travel access and arrival arrangements.
            </p>
          </div>

          {/* 02 Stay */}
          <div
            ref={(el) => {
              itemsRef.current[1] = el;
            }}
            className="pt-8 sm:pt-10 pb-8 sm:pb-12 md:pl-12 lg:pl-16 border-b border-[#D9CCC2]"
          >
            <div className="text-[11px] sm:text-xs font-mono tracking-[0.2em] text-[#8C6548] mb-3 sm:mb-4">
              02
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-[2.4rem] text-[#2F3123] font-normal leading-tight mb-3">
              Stay
            </h3>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#5C5E50] leading-relaxed max-w-md font-normal">
              Accommodation type, privacy, room arrangements and what is included.
            </p>
          </div>

          {/* 03 Environment */}
          <div
            ref={(el) => {
              itemsRef.current[2] = el;
            }}
            className="pt-8 sm:pt-12 pb-8 sm:pb-4 md:pr-12 lg:pr-16 border-b md:border-b-0 border-[#D9CCC2] md:border-r"
          >
            <div className="text-[11px] sm:text-xs font-mono tracking-[0.2em] text-[#8C6548] mb-3 sm:mb-4">
              03
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-[2.4rem] text-[#2F3123] font-normal leading-tight mb-3">
              Environment
            </h3>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#5C5E50] leading-relaxed max-w-md font-normal">
              Actual photographs of the spaces, landscape and places used during
              the experience.
            </p>
          </div>

          {/* 04 Practical details */}
          <div
            ref={(el) => {
              itemsRef.current[3] = el;
            }}
            className="pt-8 sm:pt-12 pb-8 sm:pb-4 md:pl-12 lg:pl-16"
          >
            <div className="text-[11px] sm:text-xs font-mono tracking-[0.2em] text-[#8C6548] mb-3 sm:mb-4">
              04
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-[2.4rem] text-[#2F3123] font-normal leading-tight mb-3">
              Practical details
            </h3>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#5C5E50] leading-relaxed max-w-md font-normal">
              Accessibility, facilities, programme dates and participation
              requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

