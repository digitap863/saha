import React from "react";
import { ArrowUpRight } from "lucide-react";

export interface PillarData {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  buttonLabel: string;
  fullDetails?: {
    subtitle: string;
    highlights: string[];
    summary: string;
  };
}

interface PillarsSectionProps {
  onSelectPillar: (pillar: PillarData) => void;
}

export const PILLARS_DATA: PillarData[] = [
  {
    id: "philosophy",
    number: "01",
    category: "PHILOSOPHY",
    title: "Why recovery matters.",
    description: "The thinking behind a more deliberate relationship with recovery.",
    buttonLabel: "EXPLORE PHILOSOPHY",
    fullDetails: {
      subtitle: "The Science & Architecture of Strategic Rest",
      highlights: [
        "Neuro-endocrine recalibration after prolonged adrenaline and cortisol elevation",
        "Cognitive decluttering through sensory reduction and environmental stillness",
        "Somatic release of chronic physical tension stored during high-stakes decision making",
        "Rebuilding genuine biological resilience rather than superficial relaxation",
      ],
      summary:
        "High performance without deliberate physiological down-regulation leads to cognitive narrowing, emotional fatigue, and compromised judgement. Sahā approaches recovery as a core leadership competency—an active, structured discipline that sustains enduring excellence.",
    },
  },
  {
    id: "experience",
    number: "02",
    category: "EXPERIENCE",
    title: "What the time holds.",
    description: "The practices, rhythm and personal attention that shape the experience.",
    buttonLabel: "EXPLORE EXPERIENCE",
    fullDetails: {
      subtitle: "A Quiet, Unrushed Cadence of Restoration",
      highlights: [
        "1-on-1 diagnostic consultation assessing sleep architecture, nervous system load, and daily stressors",
        "Personalized daily rhythm: restorative movement, breathwork, thermal therapy, and forest immersion",
        "Nutritious, organic anti-inflammatory dining crafted to balance blood sugar and support deep cellular repair",
        "Zero digital obligation—safe, discreet space to unplug without professional friction",
      ],
      summary:
        "Every stay is custom tailored. There are no mandatory group circles or rigid itineraries. You are met with uncompromising privacy, exquisite natural surroundings, and deeply knowledgeable practitioners dedicated to your holistic replenishment.",
    },
  },
  {
    id: "participation",
    number: "03",
    category: "PARTICIPATION",
    title: "Who it is designed for.",
    description: "For people carrying significant professional and personal responsibility.",
    buttonLabel: "WHO IT'S FOR",
    fullDetails: {
      subtitle: "Leaders Who Carry the Weight of Consequences",
      highlights: [
        "Founders, chief executives, and partners navigating critical inflection points or exits",
        "Senior policymakers, surgeons, and professionals operating under unrelenting accountability",
        "High performers experiencing subtle cognitive fatigue, diminished sleep quality, or chronic overload",
        "Discreet individuals seeking sanctuary without the fanfare of conventional luxury commercial spas",
      ],
      summary:
        "Sahā is deliberately intimate, hosting only a strictly limited cohort at any one time. This ensures absolute confidentiality, quietude, and personalized care for individuals whose decisions affect many lives.",
    },
  },
];

export default function PillarsSection({ onSelectPillar }: PillarsSectionProps) {
  return (
    <section id="experience" className="py-20 lg:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16 lg:mb-20">
        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[2.75rem] text-[#24281B] font-normal tracking-tight">
          A private experience. A considered approach.
        </h2>
        <div className="w-12 h-[1px] bg-[#B59828] mx-auto mt-5" />
      </div>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {PILLARS_DATA.map((pillar) => (
          <div
            key={pillar.id}
            className="flex flex-col justify-between p-8 sm:p-9 bg-[#F6F4ED] border border-[#E7E2D2] hover:border-[#C4B79A] transition-all duration-300 rounded-xs group"
          >
            {/* Top Details */}
            <div className="space-y-4">
              {/* Pillar Number & Category */}
              <div className="text-[11px] font-medium tracking-[0.25em] text-[#787C6B] uppercase">
                {pillar.number} / {pillar.category}
              </div>

              {/* Title */}
              <h3 className="font-serif-luxury text-2xl sm:text-[1.75rem] text-[#20241A] font-medium group-hover:text-[#B59828] transition-colors leading-snug">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#5D6150] leading-relaxed pt-1 font-normal">
                {pillar.description}
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-8">
              <button
                onClick={() => onSelectPillar(pillar)}
                className="w-full py-3.5 px-4 bg-[#3E4A19] hover:bg-[#313C12] text-[#FAF9F5] text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-sm"
              >
                <span>{pillar.buttonLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

