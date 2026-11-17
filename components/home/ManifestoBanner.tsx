import React from "react";

export default function ManifestoBanner() {
  return (
    <section className="relative px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto my-12">
      <div className="bg-[#44501B] text-[#FAF9F5] p-8 sm:p-12 lg:p-16 rounded-xs relative overflow-hidden shadow-md">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF9F5_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-5 lg:pr-8 lg:border-r border-[#5B6A27]/60">
            {/* Perspective Eyebrow */}
            <span className="block text-[11px] sm:text-xs tracking-[0.35em] text-[#D8BE6B] uppercase font-medium">
              THE SAHĀ PERSPECTIVE
            </span>

            {/* Main Headline */}
            <h3 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[3.25rem] leading-[1.08] font-normal tracking-tight text-[#FAF9F5]">
              Recovery is <br />
              part of the <br />
              responsibility.
            </h3>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 space-y-6 lg:pl-4">
            {/* Ambition Statement */}
            <h4 className="font-serif-luxury text-2xl sm:text-3xl lg:text-[2.25rem] leading-[1.18] text-[#E4CB75] font-normal">
              Not an escape from ambition. A deliberate pause to return with greater capacity.
            </h4>

            {/* Clarification Sentence */}
            <p className="text-sm sm:text-base text-[#D4DEBD] leading-relaxed max-w-xl font-normal">
              The intention is simple: create the conditions for the person behind the performance to recover.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

