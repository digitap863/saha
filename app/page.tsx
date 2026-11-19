"use client";

import React from "react";

// Home Page Specific Components
import {
  Hero,
  PerspectiveSection,
  ManifestoBanner,
  PillarsSection,
  ConversationCta,
} from "@/components/home";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section with GSAP zoom & placement animation */}
      <Hero />

      {/* 2. Perspective & Philosophy Section (Tree, Seated Meditator & Rock) */}
      <PerspectiveSection />

      {/* 3. The Sahā Perspective Manifesto Banner */}
      <ManifestoBanner />

      {/* 4. Three Pillars Cards Section (01 Philosophy, 02 Experience, 03 Participation) */}
      <div id="who-its-for">
        <PillarsSection />
      </div>

      {/* 5. Private Conversation CTA Banner */}
      <ConversationCta />
    </>
  );
}
