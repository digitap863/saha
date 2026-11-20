"use client";

import React, { useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface ProfileItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const PROFILES: ProfileItem[] = [
  {
    id: "founders",
    title: "Founders & Business Owners",
    description:
      "Constant responsibility, high-stakes decisions and limited time to switch off.",
    icon: "/who-its-for/founders.webp",
  },
  {
    id: "executives",
    title: "CEOs & Senior Executives",
    description:
      "Sustained pressure, demanding schedules and the need to remain focused and effective.",
    icon: "/who-its-for/executives.webp",
  },
  {
    id: "travellers",
    title: "Frequent Travellers & Global Individuals",
    description:
      "Disrupted routines, changing time zones and the need for recovery across locations.",
    icon: "/who-its-for/travellers.webp",
  },
  {
    id: "privacy",
    title: "Individuals Who Value Privacy",
    description:
      "A preference for discreet, individual attention over public or group-oriented settings.",
    icon: "/who-its-for/privacy.webp",
  },
  {
    id: "schedules",
    title: "Professionals with Intense Schedules",
    description:
      "Back-to-back commitments, limited recovery time and the need to maintain physical and mental balance.",
    icon: "/who-its-for/schedules.webp",
  },
  {
    id: "personalised",
    title: "Those Seeking a Personalised Approach",
    description:
      "Individual needs, preferences and expectations that a standard programme cannot address.",
    icon: "/who-its-for/personalised.webp",
  },
];

export default function ProfilesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerPinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // ---------- DESKTOP: pinned horizontal scroll ----------
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      if (!track || !innerPinRef.current) return;

      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
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
          refreshPriority: 2,
        },
      });

      // Subtle fade/scale per card as it enters from the right,
      // tied to the horizontal tween via containerAnimation
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
              start: "left 90%",
              end: "left 55%",
              scrub: true,
            },
          }
        );
      });

      // Gentle icon float, also synced to the horizontal movement
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

    // ---------- MOBILE / TABLET: original fade-up entrance ----------
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
      id="profiles"
      className="relative w-full pt-8 sm:pt-14 pb-24 sm:pb-32 bg-[#FAF9F5] lg:py-0"
    >
      <div
        ref={innerPinRef}
        className="w-full relative lg:h-screen lg:flex lg:items-center bg-[#FAF9F5] lg:overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:max-w-none lg:mx-0 lg:px-0 lg:w-full">
          <div
            ref={trackRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 sm:gap-x-12 lg:flex lg:flex-nowrap lg:w-max lg:gap-0 lg:pl-[8vw] lg:pr-[8vw] will-change-transform"
          >
            {PROFILES.map((profile, index) => (
              <div
                key={profile.id}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className="flex flex-col items-center text-center group select-none lg:w-[28vw] lg:max-w-[400px] lg:shrink-0 lg:px-8"
              >
                <div
                  ref={(el) => {
                    iconRefs.current[index] = el;
                  }}
                  className="relative w-44 h-28 sm:h-32 lg:w-56 lg:h-40 mb-4 sm:mb-5 flex items-center justify-center pointer-events-none will-change-transform"
                >
                  <div className="relative w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-105">
                    <Image
                      src={profile.icon}
                      alt={profile.title}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="font-serif-luxury text-xl sm:text-[1.38rem] text-[#2F3123] font-normal leading-[1.24] mb-3 group-hover:text-[#8C6548] transition-colors">
                  {profile.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#5C5E50] leading-relaxed max-w-xs mx-auto font-normal">
                  {profile.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
