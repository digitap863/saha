"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Lock scroll during loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    const minDisplayTime = 2600; // Minimum 2.6s so the brand animation plays elegantly

    let maxTimer: NodeJS.Timeout | null = null;
    let fadeTimer: NodeJS.Timeout | null = null;

    const handleComplete = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDisplayTime - elapsed);
      fadeTimer = setTimeout(() => {
        setLoading(false);
      }, remaining);
    };

    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete);
      maxTimer = setTimeout(handleComplete, 4500);
    }

    return () => {
      window.removeEventListener("load", handleComplete);
      if (maxTimer) clearTimeout(maxTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Remove component from DOM after fade-out transition finishes
  useEffect(() => {
    if (!loading) {
      const cleanupTimer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = "";
      }, 700);
      return () => clearTimeout(cleanupTimer);
    }
  }, [loading]);

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-700 ease-out ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative w-[75vw] sm:w-[60vw] md:w-[480px] lg:w-[540px] max-w-[85vw] aspect-[1536/1024] flex items-center justify-center">
        <Image
          src="/saha%20loading%20animation.gif"
          alt="Sahā Loading..."
          fill
          priority
          unoptimized
          className="object-contain mix-blend-multiply"
        />
      </div>
    </div>
  );
}
