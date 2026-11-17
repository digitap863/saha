"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subhead1Ref = useRef<HTMLDivElement>(null);
  const subhead2Ref = useRef<HTMLDivElement>(null);

  // Desktop/Tablet image refs:
  // imageContainerRef has z-[60] so it sits on TOP of the navbar (z-50) when scroll back happens
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Mobile image refs
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(heroRef);

    // 1. Entrance animation on page load
    const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (headlineRef.current) {
      entranceTl.fromTo(
        headlineRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3 },
        0.15
      );
    }

    if (subhead1Ref.current) {
      entranceTl.fromTo(
        subhead1Ref.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1 },
        0.4
      );
    }

    if (subhead2Ref.current) {
      entranceTl.fromTo(
        subhead2Ref.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        0.6
      );
    }

    // Initial entrance zoom-in
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.22,
          opacity: 0,
          transformOrigin: "bottom right",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 2.2,
          ease: "power3.out",
        }
      );
    }

    if (mobileImageRef.current) {
      gsap.fromTo(
        mobileImageRef.current,
        {
          scale: 1.15,
          opacity: 0,
          transformOrigin: "bottom right",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
        }
      );
    }

    // 2. Desktop Scroll Animation:
    // Pinned zoom out + ensure image sits on top of navbar when scroll back happens
    mm.add("(min-width: 768px)", () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=65%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            if (imageContainerRef.current) {
              imageContainerRef.current.style.zIndex = "60";
            }
          },
          // When user scrolls back up into hero, elevate image over navbar
          onEnterBack: () => {
            if (imageContainerRef.current) {
              imageContainerRef.current.style.zIndex = "60";
            }
          },
          onUpdate: (self) => {
            if (imageContainerRef.current) {
              // If scrolling back up (direction === -1), keep image on top of navbar
              if (self.direction === -1) {
                imageContainerRef.current.style.zIndex = "60";
              }
            }
          },
          onLeave: () => {
            // Once scrolled fully past hero, reset z-index so it doesn't block lower sections
            if (imageContainerRef.current) {
              imageContainerRef.current.style.zIndex = "10";
            }
          },
        },
      });

      // Zoom out image slightly on scroll
      if (imageContainerRef.current) {
        scrollTl.to(
          imageContainerRef.current,
          {
            scale: 0.86,
            transformOrigin: "bottom right",
            ease: "power1.inOut",
          },
          0
        );
      }

      // Gentle text elevation on scroll
      if (textContentRef.current) {
        scrollTl.to(
          textContentRef.current,
          {
            y: -35,
            opacity: 0.7,
            ease: "power1.inOut",
          },
          0
        );
      }
    });

    // 3. Mobile Scroll Animation
    mm.add("(max-width: 767px)", () => {
      if (mobileContainerRef.current) {
        gsap.to(mobileContainerRef.current, {
          scale: 0.9,
          transformOrigin: "bottom right",
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full overflow-x-clip bg-white min-h-[520px] sm:min-h-[600px] md:min-h-[660px] lg:min-h-[720px] xl:min-h-[760px] flex items-center pt-24 sm:pt-28 md:pt-0"
    >
      {/* Left Content Container */}
      <div
        ref={textContentRef}
        className="w-full max-w-[1500px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-12 md:py-16 lg:py-24 z-10 relative will-change-transform"
      >
        <div className="max-w-xl md:max-w-2xl flex flex-col justify-center space-y-6 sm:space-y-8">
          {/* Main Headline */}
          <h1
            ref={headlineRef}
            className="font-sans text-[2.75rem] sm:text-[3.75rem] md:text-[4.5rem] lg:text-[5.25rem] leading-[1.04] tracking-[-0.015em] text-[#a5a013] font-normal"
          >
            Recover from <br />
            the life you built.
          </h1>

          {/* First Paragraph: Serif Subheading */}
          <div
            ref={subhead1Ref}
            className="font-serif-luxury text-xl sm:text-2xl md:text-[1.65rem] leading-[1.35] text-[#202523] font-normal"
          >
            <p>For people whose work demands sustained focus,</p>
            <p>sound judgement and responsibility.</p>
          </div>

          {/* Second Paragraph: Sans Accent Note */}
          <div ref={subhead2Ref} className="pt-2">
            <p className="font-sans text-sm sm:text-[0.95rem] text-[#4d4c21] font-normal tracking-normal">
              A private recovery experience for high performers.
            </p>
          </div>
        </div>
      </div>

      {/* Right Silhouette Image - Desktop/Tablet:
          Configured with `z-[60]` (higher than Navbar's z-50) so when scroll back happens,
          the head and silhouette are rendered ON TOP of the navbar.
          `pointer-events-none` guarantees navbar links stay 100% interactive. */}
      <div
        ref={imageContainerRef}
        className="hidden md:flex absolute right-0 top-0 bottom-0 h-full w-auto items-end justify-end pointer-events-none select-none z-[60] will-change-transform"
        style={{ transformOrigin: "bottom right" }}
      >
        <img
          ref={imageRef}
          src="/678.png"
          alt="Sahā - Golden Rim-Lit Silhouette"
          className="h-full w-auto max-w-none object-contain select-none will-change-transform"
          style={{ objectPosition: "right bottom", transformOrigin: "bottom right" }}
        />
      </div>

      {/* Right Silhouette Image - Mobile */}
      <div
        ref={mobileContainerRef}
        className="flex md:hidden w-full justify-end px-4 pb-6 mt-4 pointer-events-none select-none will-change-transform"
        style={{ transformOrigin: "bottom right" }}
      >
        <img
          ref={mobileImageRef}
          src="/Golden Rim-Lit Bearded Silhouette.png"
          alt="Sahā - Golden Rim-Lit Silhouette"
          className="w-full max-w-95 h-auto object-contain will-change-transform"
          style={{ objectPosition: "right bottom" }}
        />
      </div>
    </section>
  );
}
