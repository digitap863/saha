import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface PillarData {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
}

export const PILLARS_DATA: PillarData[] = [
  {
    id: "philosophy",
    number: "01",
    category: "PHILOSOPHY",
    title: "Why recovery matters.",
    description: "The thinking behind a more deliberate relationship with recovery.",
    buttonLabel: "EXPLORE PHILOSOPHY",
    href: "/philosophy",
  },
  {
    id: "experience",
    number: "02",
    category: "EXPERIENCE",
    title: "What the time holds.",
    description: "The practices, rhythm and personal attention that shape the experience.",
    buttonLabel: "EXPLORE EXPERIENCE",
    href: "/experience",
  },
  {
    id: "who-its-for",
    number: "03",
    category: "PARTICIPATION",
    title: "Who it is designed for.",
    description: "For people carrying significant professional and personal responsibility.",
    buttonLabel: "WHO IT'S FOR",
    href: "/who-its-for",
  },
];

export default function PillarsSection() {
  return (
    <section id="experience" className="py-10 lg:py-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
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

            {/* Action Link: Configured for future page routes, currently prevents navigation */}
            <div className="pt-8">
              <Link
                href={pillar.href}
                onClick={(e) => {
                  // Currently no redirection needed until dedicated pages are created
                  e.preventDefault();
                }}
                className="w-full py-3.5 px-4 bg-[#3E4A19] hover:bg-[#313C12] text-[#FAF9F5] text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-sm"
              >
                <span>{pillar.buttonLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
