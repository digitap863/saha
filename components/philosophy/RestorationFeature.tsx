"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RestorationFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

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

      // 1. Card container rise
      tl.fromTo(
        cardRef.current,
        { y: 50, opacity: 0, scale: 0.985 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2 }
      )
        // 2. Subtle image scale settle
        .fromTo(
          imageRef.current,
          { scale: 1.06, opacity: 0.9 },
          { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" },
          "-=1.1"
        )
        // 3. Eyebrow tag
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.9"
        )
        // 4. Headline
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        )
        // 5. Sub-heading
        .fromTo(
          subheadRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.85 },
          "-=0.65"
        )
        // 6. Body text
        .fromTo(
          bodyRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-20 sm:mb-24 lg:mb-32 will-change-transform"
    >
      <div
        ref={cardRef}
        className="relative isolate rounded-xs overflow-hidden w-full aspect-[1755/896] min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-[#FAFBF8] bg-[#223F32] shadow-sm"
      >
        {/* Full-size Image at z-0 with subtle GSAP scale-in */}
        <div ref={imageRef} className="absolute inset-0 w-full h-full -z-0">
          <Image
            src="/philosophy.png"
            alt="A different proposition — Restorative repose in considered environment"
            fill
            priority
            unoptimized
            className="object-cover object-right md:object-center pointer-events-none"
          />
        </div>

        {/* Top / Main Headline: Tightly tracked neo-grotesque sans-serif */}
        <div className="relative z-10 max-w-lg lg:max-w-xl pointer-events-auto">
          <span
            ref={eyebrowRef}
            className="text-[10px] sm:text-[11px] font-medium tracking-[0.28em] text-[#8EAF9F] uppercase block mb-8 sm:mb-12"
          >
            A DIFFERENT PROPOSITION
          </span>

          <h2
            ref={headlineRef}
            className="font-sans text-3xl sm:text-4xl lg:text-[2.75rem] text-[#ccccb6] font-normal tracking-[-0.04em] sm:tracking-[-0.045em] leading-[1.08] max-w-md"
          >
            Not another <br />
            performance to <br />
            maintain.
          </h2>
        </div>

        {/* Bottom Section: High-contrast serif sub-heading & description */}
        <div className="relative z-10 pt-8 sm:pt-12 max-w-md lg:max-w-lg space-y-3 sm:space-y-4 pointer-events-auto">
          <h3
            ref={subheadRef}
            className="font-serif-luxury text-xl sm:text-2xl text-[#ccccb6] font-normal tracking-normal"
          >
            Not another system to optimise.
          </h3>
          <p
            ref={bodyRef}
            className="text-xs sm:text-sm text-[#ccccb6] leading-relaxed font-normal tracking-wide"
          >
            A considered environment, personal attention and enough distance from everyday demands to recover. The tools are selected with care; the person comes first.
          </p>
        </div>
      </div>
    </section>
  );
}
