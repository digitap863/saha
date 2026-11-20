"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  WhoIsItForHero,
  ProfilesSection,
  PrinciplesSection,
  KnowThePlaceSection,
  DistinctionCta,
} from "@/components/whoisitfor";

gsap.registerPlugin(ScrollTrigger);

export default function WhoItsForPage() {
  useEffect(() => {
    // Sort and refresh triggers so sequential pinned horizontal sections calculate in exact order
    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 1. Who Is It For Hero: Headline & Subtitle */}
      <WhoIsItForHero />

      {/* 2. Demographic Profiles with GSAP Horizontal Scroll */}
      <ProfilesSection />

      {/* 3. Principles Section with Reverse Horizontal Scroll */}
      <PrinciplesSection />

      {/* 4. Setting & Journey Information */}
      <KnowThePlaceSection />

      {/* 5. Considered Distinction CTA Card */}
      <DistinctionCta />
    </>
  );
}
