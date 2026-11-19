"use client";

import React from "react";

// Experience Components
import {
  ExperienceHeroJourney,
  RestorativePractices,
  ExperienceRhythm,
  GuidanceSection,
} from "@/components/experience";

// Common CTA Banner
import { ConversationCta } from "@/components/home";

export default function ExperiencePage() {
  return (
    <>
      {/* Hero & The Guest Journey Visual Section */}
      <ExperienceHeroJourney />

      {/* Connected Set of Restorative Practices & Quote Banner */}
      <RestorativePractices />

      {/* Daily Rhythm Image Strip */}
      <ExperienceRhythm />

      {/* Practitioners & Guidance Section */}
      <GuidanceSection />
    </>
  );
}

