import React from "react";
import { Compass, Wind, Moon, Sun } from "lucide-react";

export default function SettingSection() {
  const elements = [
    {
      icon: Compass,
      title: "Complete Seclusion",
      desc: "Nestled in pristine highlands, protected from urban sensory contamination and commercial intrusion.",
    },
    {
      icon: Wind,
      title: "Alpine Air Quality",
      desc: "High negative-ion atmosphere and dense forest canopy that naturally down-regulate cortisol levels.",
    },
    {
      icon: Sun,
      title: "Circadian Architecture",
      desc: "Natural stone, timber, and soft directional daylight designed in accordance with biological circadian rhythms.",
    },
    {
      icon: Moon,
      title: "Acoustic Stillness",
      desc: "Zero ambient mechanical noise. An auditory baseline where the nervous system can truly decompress.",
    },
  ];

  return (
    <section id="setting" className="py-20 lg:py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-[11px] font-medium tracking-[0.3em] text-[#B59828] uppercase">
            THE SANCTUARY
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight text-[#22251B] font-normal">
            The Setting: <br />
            An environment built for restoration.
          </h2>
          <p className="text-base text-[#5A5E4D] leading-relaxed font-normal">
            Recovery cannot happen within the architecture that generated the fatigue. Sahā is
            situated in an untouched geographic pocket chosen specifically for its natural
            stillness, low electromagnetic disturbance, and pristine microclimate.
          </p>
        </div>

        {/* Right Side Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {elements.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 bg-[#F6F4ED] border border-[#E7E2D2] rounded-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xs bg-[#3E4A19]/10 text-[#3E4A19] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif-luxury text-xl text-[#23271C] font-medium">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5D6250] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

