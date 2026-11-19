"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const footnoteRef = useRef<HTMLParagraphElement>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    const cardWidth = scrollWidth / RHYTHM_STEPS.length;
    const currentIndex = Math.min(
      RHYTHM_STEPS.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setActiveStep(currentIndex);
  };

  const scrollToStep = (idx: number) => {
    const targetCard = cardContainersRef.current[idx];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const scrollByDirection = (dir: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Headline Fade-Up
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

      // 2. Titles Stagger Entrance
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

      // 3. Image Curtain Wipe & Scale Entrance
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

      // 5. Footnote subtle entrance
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full  py-8 sm:py-12 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ========================================================
            PART 1: SECTION TITLE
           ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 lg:mb-20">
          <h2
            ref={headlineRef}
            className="font-headline-sans font-light text-[#1F231B] text-3xl sm:text-4xl lg:text-[3.35rem] leading-[1.12] tracking-[-0.04em] will-change-transform"
          >
            A rhythm, not a timetable.
          </h2>
        </div>

        {/* ========================================================
            PART 2: 5 RHYTHM COLUMNS WITH ANIMATED IMAGES
           ======================================================== */}
        <div className="group/strip w-full max-w-6xl mx-auto relative">
          {/* Mobile Horizontal Scroll Container / Desktop 5-Col Contiguous Grid */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex lg:grid lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-1.5 items-end overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 px-4 sm:px-6 lg:px-0 -mx-4 sm:-mx-6 lg:mx-0 snap-x snap-mandatory scroll-smooth touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {RHYTHM_STEPS.map((step, idx) => (
              <div
                key={step.id}
                ref={(el) => {
                  cardContainersRef.current[idx] = el;
                }}
                className="group/card flex flex-col items-center cursor-pointer will-change-transform shrink-0 w-[calc(50%-6px)] sm:w-[calc(33.33%-11px)] lg:w-auto snap-start"
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

          {/* Mobile Pagination & Navigation (hidden on desktop lg) */}
          <div className="flex lg:hidden items-center justify-between mt-5 px-1 sm:px-2">
            {/* Step Indicators / Dots */}
            <div className="flex items-center gap-1.5">
              {RHYTHM_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToStep(i)}
                  aria-label={`Go to rhythm step ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeStep === i
                      ? "w-6 bg-[#3F4C19]"
                      : "w-1.5 bg-[#D5CFC1] hover:bg-[#A39D8D]"
                  }`}
                />
              ))}
            </div>

            {/* Mobile swipe hint and arrows */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-widest uppercase text-[#888D7E] font-medium">
                Swipe
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => scrollByDirection("left")}
                  disabled={!canScrollLeft}
                  className={`p-1.5 rounded-full border border-[#DDD7C7] transition-all duration-200 ${
                    canScrollLeft
                      ? "text-[#293011] bg-white/80 hover:bg-[#EAE5D9] active:scale-95"
                      : "text-[#C2BCAD] opacity-40 cursor-not-allowed"
                  }`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => scrollByDirection("right")}
                  disabled={!canScrollRight}
                  className={`p-1.5 rounded-full border border-[#DDD7C7] transition-all duration-200 ${
                    canScrollRight
                      ? "text-[#293011] bg-white/80 hover:bg-[#EAE5D9] active:scale-95"
                      : "text-[#C2BCAD] opacity-40 cursor-not-allowed"
                  }`}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
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

