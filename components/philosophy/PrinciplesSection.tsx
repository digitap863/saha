"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface PrincipleItem {
  id: string;
  numeral: string;
  title: string;
  description: string;
}

export const PRINCIPLES_DATA: PrincipleItem[] = [
  {
    id: "individual",
    numeral: "I.",
    title: "Individual before programme",
    description:
      "Understand the person first: their demands, and their needs, before shaping the experience.",
  },
  {
    id: "rest-pressure",
    numeral: "II.",
    title: "Rest without performance pressure",
    description:
      "Recovery should not become another target. The state to measure is release.",
  },
  {
    id: "practices",
    numeral: "III.",
    title: "Practices with purpose",
    description:
      "Bring together complementary approaches only when they serve deep integration.",
  },
  {
    id: "intention",
    numeral: "IV.",
    title: "Carry the intention forward",
    description:
      "Leave with practical habits that sustain and outlast the retreat experience.",
  },
];

export default function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
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

      // 2. Staggered Principle Rows Entrance
      const validRows = rowsRef.current.filter(Boolean);
      if (validRows.length > 0) {
        gsap.fromTo(
          validRows,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: validRows[0],
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
      className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto pb-24 sm:pb-32 lg:pb-36 will-change-transform"
    >
      {/* Section Header: Tightly tracked neo-grotesque sans */}
      <div ref={headerRef} className="mb-14 sm:mb-16 lg:mb-20">
        <span className="text-[11px] font-medium tracking-[0.28em] text-[#69725C] uppercase block mb-3 sm:mb-4">
          THE PRINCIPLES
        </span>
        <h2 className="font-sans text-3xl sm:text-4xl lg:text-[2.75rem] text-[#1E2E23] font-normal tracking-[-0.04em] sm:tracking-[-0.045em] leading-[1.12] max-w-2xl">
          A connected approach. <br />
          Never a checklist.
        </h2>
      </div>

      {/* Structured Principles Rows */}
      <div className="border-t border-[#DFDBCF]">
        {PRINCIPLES_DATA.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              rowsRef.current[index] = el;
            }}
            className="border-b border-[#DFDBCF] py-8 sm:py-10 transition-colors duration-300 hover:bg-[#F8F7F2]/60 px-2 sm:px-4 -mx-2 sm:-mx-4 group"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
              {/* Numeral */}
              <div className="md:col-span-1 text-[12px] font-mono tracking-widest text-[#939786] group-hover:text-[#456C5B] transition-colors">
                {item.numeral}
              </div>

              {/* Principle Title: High-contrast serif */}
              <div className="md:col-span-5">
                <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#21261B] font-medium group-hover:text-[#375B4A] transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Principle Description */}
              <div className="md:col-span-6">
                <p className="text-xs sm:text-sm text-[#575E4E] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
