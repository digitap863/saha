"use client";

import React, { useState } from "react";

// Common Shared Components
import {
  Navbar,
  Footer,
  SmoothScroll,
  EnquiryModal,
} from "@/components/common";

// Home Page Specific Components
import {
  Hero,
  PerspectiveSection,
  ManifestoBanner,
  PillarsSection,
  ConversationCta,
} from "@/components/home";

export default function Home() {
  const [enquireOpen, setEnquireOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-white text-[#22251B] selection:bg-saha-gold/20">
        {/* Common Navigation */}
        <Navbar onOpenEnquire={() => setEnquireOpen(true)} />

        {/* Main Content Sections */}
        <main className="flex-1">
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
          <ConversationCta onOpenEnquire={() => setEnquireOpen(true)} />
        </main>

        {/* Common Footer & Panoramic Landscape */}
        <Footer onOpenEnquire={() => setEnquireOpen(true)} />

        {/* Interactive Admissions Modal */}
        {/* <EnquiryModal
          isOpen={enquireOpen}
          onClose={() => setEnquireOpen(false)}
        /> */}
      </div>
    </SmoothScroll>
  );
}
