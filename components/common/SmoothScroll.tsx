"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Scroll to top and refresh ScrollTrigger on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
    // Give DOM a frame to settle then refresh ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const isDesktop = () => {
      if (typeof window === "undefined") return false;
      const isWide = window.innerWidth >= 1024;
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      return isWide || (window.innerWidth >= 768 && hasFinePointer);
    };

    if (!isDesktop()) {
      return;
    }

    let tickerCb: ((time: number) => void) | null = null;

    const initLenis = () => {
      const lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 0, // Never hijack mobile/touch gestures
      });

      lenisRef.current = lenis;

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
      if (!isDesktop() && lenisRef.current) {
        if (tickerCb) gsap.ticker.remove(tickerCb);
        lenisRef.current.destroy();
        lenisRef.current = null;
        ScrollTrigger.refresh();
      } else if (isDesktop() && !lenisRef.current) {
        initLenis();
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (tickerCb) gsap.ticker.remove(tickerCb);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
