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
  // imageContainerRef is anchored firmly to `bottom-0 right-0` so the silhouette
  // ALWAYS sits on the bottom of the screen across fullscreen, normal screen, and all aspect ratios.
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

    // Initial entrance zoom-in: anchored strictly to `right bottom`
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.18,
          opacity: 0,
          transformOrigin: "100% 100%",
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
          scale: 1.12,
          opacity: 0,
          transformOrigin: "100% 100%",
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
    // Pinned zoom out + ensure image stays firmly on the bottom of the screen
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
              if (self.direction === -1) {
                imageContainerRef.current.style.zIndex = "60";
              }
            }
          },
          onLeave: () => {
            if (imageContainerRef.current) {
              imageContainerRef.current.style.zIndex = "10";
            }
          },
        },
      });

      // Zoom out image slightly on scroll, keeping bottom strictly anchored
      if (imageContainerRef.current) {
        scrollTl.to(
          imageContainerRef.current,
          {
            scale: 0.88,
            transformOrigin: "100% 100%",
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
          scale: 0.92,
          transformOrigin: "100% 100%",
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
      className="relative w-full overflow-x-clip bg-white min-h-screen h-screen min-h-[100dvh] h-[100dvh] flex items-center pt-20 md:pt-0"
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
          Anchored strictly to `bottom-0 right-0` with `translate-y-[6px]` and `h-[100dvh]`
          so the shoulders ALWAYS sit firmly on the bottom of the screen with ZERO white gap. */}
      <div
        ref={imageContainerRef}
        className="hidden md:flex absolute right-0 bottom-0 h-full max-h-[100dvh] w-auto items-end justify-end pointer-events-none select-none z-[60] will-change-transform translate-y-[6px]"
        style={{ transformOrigin: "100% 100%" }}
      >
        <img
          ref={imageRef}
          src="/678.png"
          alt="Sahā - Golden Rim-Lit Silhouette"
          className="h-full max-h-[100dvh] w-auto max-w-none block select-none will-change-transform pointer-events-none"
          style={{ transformOrigin: "100% 100%" }}
        />
      </div>

      {/* Right Silhouette Image - Mobile: Anchored to bottom-right */}
      <div
        ref={mobileContainerRef}
        className="flex md:hidden absolute right-0 bottom-0 w-full justify-end pointer-events-none select-none will-change-transform translate-y-[4px]"
        style={{ transformOrigin: "100% 100%" }}
      >
        <img
          ref={mobileImageRef}
          src="/678.png"
          alt="Sahā - Golden Rim-Lit Silhouette"
          className="w-auto h-[55vh] max-h-[460px] max-w-none block select-none will-change-transform"
          style={{ transformOrigin: "100% 100%" }}
        />
      </div>
    </section>
  );
}
