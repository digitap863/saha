"use client";

import React, { useState } from "react";

// Common Shared Components
import {
  Navbar,
  Footer,
  SmoothScroll,
  EnquiryModal,
  DetailModal,
} from "@/components/common";

// Home Page Specific Components
import {
  Hero,
  PerspectiveSection,
  ManifestoBanner,
  PillarsSection,
  SettingSection,
  ConversationCta,
  type PillarData,
} from "@/components/home";

export default function Home() {
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<PillarData | null>(null);

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-white text-[#22251B] selection:bg-[#B59828]/20">
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
            <PillarsSection onSelectPillar={(pillar) => setSelectedPillar(pillar)} />
          </div>

          {/* 5. The Setting Sanctuary Section */}
          <SettingSection />

          {/* 6. Private Conversation CTA Banner */}
          <ConversationCta onOpenEnquire={() => setEnquireOpen(true)} />
        </main>

        {/* Common Footer & Panoramic Landscape */}
        <Footer onOpenEnquire={() => setEnquireOpen(true)} />

        {/* Interactive Modals */}
        <EnquiryModal
          isOpen={enquireOpen}
          onClose={() => setEnquireOpen(false)}
        />

        <DetailModal
          pillar={selectedPillar}
          onClose={() => setSelectedPillar(null)}
          onOpenEnquire={() => setEnquireOpen(true)}
        />
      </div>
    </SmoothScroll>
  );
}
