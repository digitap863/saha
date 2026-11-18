"use client";

import React, { useState } from "react";

// Common Shared Components
import {
  Navbar,
  Footer,
  SmoothScroll,
  EnquiryModal,
} from "@/components/common";

// Philosophy Page Specific Components
import {
  PhilosophyHero,
  SustainedBanner,
  RestorationFeature,
  PrinciplesSection,
} from "@/components/philosophy";

// CTA Component
import { ConversationCta } from "@/components/home";

export default function PhilosophyPage() {
  const [enquireOpen, setEnquireOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#22251B] selection:bg-saha-gold/20">
        {/* Common Navigation */}
        <Navbar onOpenEnquire={() => setEnquireOpen(true)} />

        {/* Philosophy Main Content */}
        <main className="flex-1">
          {/* 1. Philosophy Hero: Headline & Subtitle */}
          <PhilosophyHero />

          {/* 2. Sustained Performance Sage Banner */}
          <SustainedBanner />

          {/* 3. Restoration Feature: Meditation Repose & Considered Environment */}
          <RestorationFeature />

          {/* 4. The Principles: 4-Item Structured Approach */}
          <PrinciplesSection />

        
        </main>

        {/* Common Footer */}
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

