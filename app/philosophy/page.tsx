"use client";

import React from "react";

// Philosophy Page Specific Components
import {
  PhilosophyHero,
  SustainedBanner,
  RestorationFeature,
  PrinciplesSection,
} from "@/components/philosophy";

export default function PhilosophyPage() {
  return (
    <>
      {/* 1. Philosophy Hero: Headline & Subtitle */}
      <PhilosophyHero />

      {/* 2. Sustained Performance Sage Banner */}
      <SustainedBanner />

      {/* 3. Restoration Feature: Meditation Repose & Considered Environment */}
      <RestorationFeature />

      {/* 4. The Principles: 4-Item Structured Approach */}
      <PrinciplesSection />
    </>
  );
}

