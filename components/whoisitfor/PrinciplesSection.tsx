"use client";

import React, { useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface PrincipleItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const PRINCIPLES: PrincipleItem[] = [
  {
    id: "quality",
    title: "Quality Without Excess.",
    description:
      "Experienced practitioners, considered surroundings and seamless coordination, with quality in every detail.",
    icon: "/who-its-for/bowl.png",
  },
  {
    id: "continuity",
    title: "Continuity in Care.",
    description:
      "Your preferences and requirements understood and carried forward across experiences.",
    icon: "/who-its-for/bronze.png",
  },
  {
    id: "privacy",
    title: "Privacy in Every Interaction.",
    description:
      "Discreet communication, confidentiality and respect for your personal information at every stage.",
    icon: "/who-its-for/leather.png",
  },
  {
    id: "boundaries",
    title: "Beyond Geographical Boundaries.",
    description:
      "Bespoke experiences arranged at your residence, preferred destination or location of choice.",
    icon: "/who-its-for/globe.png",
  },
  {
    id: "personalised",
    title: "Personalised to You.",
    description:
      "Every experience shaped around your preferences, routines, comfort and individual requirements.",
    icon: "/who-its-for/stone.png",
  },
  {
    id: "contact",
    title: "One Point of Contact.",
    description:
      "A dedicated contact to coordinate practitioners, schedules, locations and every detail.",
    icon: "/who-its-for/bell.png",
  },
  {
    id: "time",
    title: "Time, Respected.",
    description:
      "Experiences arranged around your availability, with minimal disruption to your commitments.",
    icon: "/who-its-for/golden-sand.png",
  },
];

export default function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerPinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // ---------- DESKTOP: pinned REVERSE horizontal scroll ----------
    // Starts showing the last card, then travels back to the first (left to right).
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      if (!track || !innerPinRef.current) return;

      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      // Start from the far-left offset (-distance) and move to 0
      gsap.set(track, { x: () => -getDistance() });

      const tween = gsap.to(track, {
        x: 0,
        ease: "none",
        scrollTrigger: {
          trigger: innerPinRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      // Cards fade/scale in as they enter from the LEFT edge
      const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.35, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              containerAnimation: tween,
              start: "right 10%",
              end: "right 45%",
              scrub: true,
            },
          }
        );
      });

      // Gentle icon float synced to the horizontal movement
      iconRefs.current.filter(Boolean).forEach((icon, i) => {
        gsap.to(icon, {
          y: i % 2 === 0 ? -12 : 12,
          ease: "none",
          scrollTrigger: {
            trigger: icon,
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });
    });

    // ---------- MOBILE / TABLET: fade-up entrance ----------
    mm.add("(max-width: 1023px)", () => {
      const validItems = itemsRef.current.filter(Boolean);
      if (validItems.length === 0) return;

      gsap.fromTo(
        validItems,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 1.15,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === innerPinRef.current || st.trigger === sectionRef.current) {
          st.kill(true);
        }
      });
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="principles"
      className="relative w-full pt-8 sm:pt-14 pb-24 sm:pb-32 bg-[#FAF9F5] lg:py-0"
    >
      <div
        ref={innerPinRef}
        className="w-full relative lg:h-screen lg:flex lg:items-center bg-[#FAF9F5] lg:overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:max-w-none lg:mx-0 lg:px-0 lg:w-full">
          {/* Mobile Short Title Header (Visible only on mobile & tablet) */}
          <div className="lg:hidden text-center max-w-md mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.28em] text-[#8C6548] uppercase block mb-2">
              A CONSIDERED APPROACH
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#2F3123] font-normal leading-tight">
              Our Principles.
            </h2>
          </div>

          <div
            ref={trackRef}
            className="grid grid-cols-2 gap-x-4 sm:gap-x-8 md:gap-x-12 gap-y-10 sm:gap-y-14 lg:flex lg:flex-nowrap lg:w-max lg:gap-0 lg:pl-[8vw] lg:pr-[8vw] will-change-transform"
          >
            {PRINCIPLES.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className={`flex flex-col items-center text-center group select-none lg:w-[28vw] lg:max-w-[400px] lg:shrink-0 lg:px-8 ${
                  index === PRINCIPLES.length - 1
                    ? "col-span-2 lg:col-span-1 max-w-[280px] sm:max-w-[360px] lg:max-w-[400px] mx-auto"
                    : ""
                }`}
              >
                <div
                  ref={(el) => {
                    iconRefs.current[index] = el;
                  }}
                  className="relative w-28 h-20 sm:w-36 sm:h-28 md:w-44 md:h-32 lg:w-56 lg:h-40 mb-3 sm:mb-4 lg:mb-5 flex items-center justify-center pointer-events-none will-change-transform"
                >
                  <div className="relative w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-105">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="font-serif-luxury text-[14px] sm:text-lg md:text-[1.38rem] text-[#2F3123] font-normal leading-snug sm:leading-[1.24] mb-2 sm:mb-3 group-hover:text-[#8C6548] transition-colors">
                  {item.title}
                </h3>

                <p className="text-[11px] sm:text-xs md:text-[13px] text-[#5C5E50] leading-relaxed max-w-xs mx-auto font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
