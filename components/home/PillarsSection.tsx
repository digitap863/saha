"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface PillarItem {
  id: string;
  title: string;
  description: string;
}

export type PillarData = PillarItem;

export const PILLARS_ITEMS: PillarItem[] = [
  {
    id: "privacy",
    title: "Privacy, without compromise.",
    description: "A private setting that respects personal space and discretion.",
  },
  {
    id: "personal-attention",
    title: "Personal attention, not standard packages.",
    description: "Every experience is shaped around individual preferences, needs and pace.",
  },
  {
    id: "grounded-experience",
    title: "Grounded in Experience. Guided by Expertise",
    description: "Practices guided by experienced professionals with relevant training and expertise.",
  },
  {
    id: "time-managed",
    title: "Time, thoughtfully managed.",
    description: "A well-considered experience that respects the value of your time.",
  },
  {
    id: "beyond-borders",
    title: "Experiences beyond borders.",
    description: "Delivers bespoke recovery experiences for better flexibility across the globe.",
  },
  {
    id: "care-forward",
    title: "Care That Carries Forward.",
    description: "From nourishment to surroundings, every detail is thoughtfully chosen to support wellbeing that extends into everyday life.",
  },
];

export const PILLARS_DATA = PILLARS_ITEMS;

export default function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Staggered 6-Item Grid Entrance
      const validItems = itemsRef.current.filter(Boolean);
      if (validItems.length > 0) {
        gsap.fromTo(
          validItems,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
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
      id="experience"
      className="py-16 sm:py-20 lg:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto will-change-transform"
    >
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-16 lg:mb-24">
        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[2.75rem] text-[#24281B] font-normal tracking-tight">
          A private experience. A considered approach.
        </h2>
        <div className="w-12 h-[1px] bg-[#B59828] mx-auto mt-5" />
      </div>

      {/* 6 Features Grid (3 Columns x 2 Rows) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-16 lg:gap-y-20">
        {PILLARS_ITEMS.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="text-center flex flex-col items-center max-w-sm mx-auto group"
          >
            {/* Title in High-Contrast Luxury Gold Serif */}
            <h3 className="font-serif-luxury text-2xl sm:text-[1.75rem] lg:text-[1.85rem] text-[#B59828] font-normal leading-[1.25] tracking-tight mb-3 sm:mb-4 group-hover:text-[#9e841f] transition-colors">
              {item.title}
            </h3>

            {/* Description in Clean Soft Olive Sans */}
            <p className="text-xs sm:text-sm text-[#6C7160] leading-relaxed font-normal max-w-xs">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
