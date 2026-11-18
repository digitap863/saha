"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only activate Lenis on desktop view (screens >= 1024px or fine pointer devices)
    // On mobile devices, native touch momentum scrolling is preserved to avoid stutter,
    // address-bar jump, and touch-trapping drawbacks.
    const isDesktop = () => {
      if (typeof window === "undefined") return false;
      const isWide = window.innerWidth >= 1024;
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      return isWide || (window.innerWidth >= 768 && hasFinePointer);
    };

    if (!isDesktop()) {
      return;
    }

    let lenis: Lenis | null = null;
    let tickerCb: ((time: number) => void) | null = null;

    const initLenis = () => {
      lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 0, // Never hijack mobile/touch gestures
      });

      // Synchronize Lenis scroll with GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      tickerCb = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);
    };

    initLenis();

    const handleResize = () => {
      if (!isDesktop() && lenis) {
        // Destroy Lenis if resized to mobile
        if (tickerCb) gsap.ticker.remove(tickerCb);
        lenis.destroy();
        lenis = null;
        ScrollTrigger.refresh();
      } else if (isDesktop() && !lenis) {
        // Re-initialize if resized back to desktop
        initLenis();
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (tickerCb) gsap.ticker.remove(tickerCb);
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
