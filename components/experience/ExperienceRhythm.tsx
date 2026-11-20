"use client";

import React, { useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface RhythmStep {
  id: string;
  title: string;
  imageSrc: string;
  alt: string;
}

export const RHYTHM_STEPS: RhythmStep[] = [
  {
    id: "arrive-gently",
    title: "Arrive gently",
    imageSrc: "/experience/arrive_gently.webp",
    alt: "Sahā Experience — Arrive gently with ease and decompression",
  },
  {
    id: "nourish",
    title: "Nourish",
    imageSrc: "/experience/nourish.webp",
    alt: "Sahā Experience — Thoughtful, uncomplicated nourishment",
  },
  {
    id: "restore",
    title: "Restore",
    imageSrc: "/experience/restore.webp",
    alt: "Sahā Experience — Physical movement, mobility and reconnection",
  },
  {
    id: "make-space",
    title: "Make space",
    imageSrc: "/experience/make_space.webp",
    alt: "Sahā Experience — Time without interruption in quiet nature",
  },
  {
    id: "close-quietly",
    title: "Close quietly",
    imageSrc: "/experience/close_quietly.webp",
    alt: "Sahā Experience — Deep restorative sleep and evening quietude",
  },
];

export default function ExperienceRhythm() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const footnoteRef = useRef<HTMLParagraphElement>(null);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // ==========================================
    // 1. DESKTOP (>= 1024px): 5-column grid entrance
    // ==========================================
    mm.add("(min-width: 1024px)", () => {
      // Headline entrance
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Titles stagger entrance
      const validTitles = titlesRef.current.filter(Boolean);
      if (validTitles.length > 0) {
        gsap.fromTo(
          validTitles,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: validTitles[0],
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Images curtain reveal & scale
      const validImages = imageWrappersRef.current.filter(Boolean);
      if (validImages.length > 0) {
        gsap.fromTo(
          validImages,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            scale: 1.14,
            opacity: 0.6,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            opacity: 1,
            duration: 1.3,
            stagger: 0.12,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // ==========================================
    // 2. MOBILE / TABLET (< 1024px): Pinned Horizontal Scroll
    // ==========================================
    mm.add("(max-width: 1023px)", () => {
      if (!pinContainerRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const validImages = imageWrappersRef.current.filter(Boolean);
      const validTitles = titlesRef.current.filter(Boolean);

      // Ensure images & titles are visible on mobile
      validImages.forEach((img) => {
        if (img) gsap.set(img, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1 });
      });
      validTitles.forEach((t) => {
        if (t) gsap.set(t, { opacity: 1, y: 0 });
      });

      // Headline entrance
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Calculate total horizontal travel distance
      const getDistance = () => {
        const containerWidth = track.parentElement
          ? track.parentElement.clientWidth
          : window.innerWidth;
        return -(track.scrollWidth - containerWidth);
      };

      gsap.to(track, {
        x: getDistance,
        ease: "none",
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: "top 30%",
          end: () => `+=${Math.abs(getDistance()) * 1.3}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    // Footnote entrance (both desktop & mobile)
    if (footnoteRef.current) {
      gsap.fromTo(
        footnoteRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footnoteRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === pinContainerRef.current || st.trigger === sectionRef.current) {
          st.kill(true);
        }
      });
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-8 sm:py-12 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div ref={pinContainerRef} className="w-full">
          {/* ========================================================
              PART 1: SECTION TITLE
             ======================================================== */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-20">
            <h2
              ref={headlineRef}
              className="font-headline-sans font-light text-[#1F231B] text-3xl sm:text-4xl lg:text-[3.35rem] leading-[1.12] tracking-[-0.04em] will-change-transform"
            >
              A rhythm, not a timetable.
            </h2>
          </div>

          {/* ========================================================
              PART 2: 5 RHYTHM COLUMNS (GSAP Horizontal Scroll on Mobile)
             ======================================================== */}
          <div className="group/strip w-full max-w-6xl mx-auto overflow-hidden">
            <div
              ref={trackRef}
              className="flex lg:grid lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-1.5 items-end flex-nowrap will-change-transform"
            >
              {RHYTHM_STEPS.map((step, idx) => (
                <div
                  key={step.id}
                  ref={(el) => {
                    cardContainersRef.current[idx] = el;
                  }}
                  className="group/card flex flex-col items-center cursor-pointer will-change-transform shrink-0 w-[calc(50vw-22px)] sm:w-[calc(33.33vw-24px)] lg:w-auto"
                >
                  {/* Pillar Header Title */}
                  <h3
                    ref={(el) => {
                      titlesRef.current[idx] = el;
                    }}
                    className="font-playfair text-sm sm:text-base lg:text-[1.05rem] text-[#22251B] font-normal tracking-[-0.01em] text-center mb-3 sm:mb-4 group-hover/card:text-[#C47B3F] transition-colors duration-400"
                  >
                    {step.title}
                  </h3>

                  {/* Image Mask Frame with GSAP Curtain Reveal & Hover Zoom */}
                  <div className="relative w-full aspect-[2/3.1] rounded-xs overflow-hidden bg-[#ECE8DF] shadow-xs">
                    <div
                      ref={(el) => {
                        imageWrappersRef.current[idx] = el;
                      }}
                      className="relative w-full h-full will-change-transform"
                    >
                      <Image
                        src={step.imageSrc}
                        alt={step.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-108 group-hover/card:brightness-[1.02]"
                      />

                      {/* Subtle warm ambient vignette */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            PART 3: FOOTNOTE / DISCLAIMER
           ======================================================== */}
        <div className="mt-14 sm:mt-18 lg:mt-24 max-w-3xl mx-auto text-center px-4">
          <p
            ref={footnoteRef}
            className="text-[10px] sm:text-[11px] text-[#787D70] font-sans leading-relaxed tracking-normal will-change-transform"
          >
            *The programme is shaped around the individual. Depending on the experience and personal
            suitability. The actual schedule, programme length and inclusions will be shared before
            participation. This outline describes the intended pace, not a fixed timetable.
          </p>
        </div>
      </div>
    </section>
  );
}
