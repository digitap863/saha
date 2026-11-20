"use client";

import React, { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEnquiry } from "@/context/EnquiryContext";

gsap.registerPlugin(ScrollTrigger);

interface DistinctionCtaProps {
  onOpenEnquire?: () => void;
}

export default function DistinctionCta({ onOpenEnquire }: DistinctionCtaProps) {
  const { openEnquire } = useEnquiry();
  const handleOpenEnquire = onOpenEnquire || openEnquire;

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        cardRef.current,
        { y: 40, opacity: 0, scale: 0.985 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1 }
      )
        .fromTo(
          leftColRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          rightColRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="distinction"
      className="relative px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto my-16 sm:my-20 lg:my-28 will-change-transform"
    >
      <div
        ref={cardRef}
        className="relative bg-[#F2EEE6] border border-[#E0D9CC] rounded-[2px] px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 shadow-xs overflow-hidden"
      >
        {/* Subtle Luxury Pattern Texture */}
        <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#2B2520_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
          {/* Left Column */}
          <div ref={leftColRef} className="lg:col-span-6 space-y-4">
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.28em] text-[#8A7B6A] uppercase block">
              A CONSIDERED DISTINCTION
            </span>
            <h2 className="font-sans text-4xl sm:text-5xl lg:text-[4.25rem] text-[#1C1A17] font-normal leading-[1.04] tracking-[-0.035em]">
              Not an escape from <br />
              ambition.
            </h2>
          </div>

          {/* Right Column */}
          <div ref={rightColRef} className="lg:col-span-6 space-y-5 lg:pt-6">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-[2.2rem] text-[#26231F] font-normal leading-[1.2]">
              A deliberate pause to return with perspective.
            </h3>

            <p className="font-sans text-xs sm:text-sm md:text-[14px] text-[#5C564C] leading-relaxed max-w-xl font-normal">
              Sahā is not a medical performance clinic, nor a conventional holiday. It is a
              private recovery experience built around personal attention, appropriate practices
              and room to step away.
            </p>

            <div className="pt-3">
              <button
                onClick={handleOpenEnquire}
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 bg-[#2B2520] hover:bg-[#171412] text-[#F2EEE6] text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase transition-all rounded-[2px] active:scale-98 cursor-pointer group/btn"
              >
                <span>Begin with a conversation</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
