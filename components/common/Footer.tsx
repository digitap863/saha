import React from "react";

interface FooterProps {
  onOpenEnquire?: () => void;
}

export default function Footer({ onOpenEnquire }: FooterProps) {
  const footerLinks = [
    { label: "PHILOSOPHY", href: "#philosophy" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "WHO IT'S FOR", href: "#who-its-for" },
    { label: "THE SETTING", href: "#setting" },
    { label: "ENQUIRE", href: "#enquire", action: onOpenEnquire },
  ];

  return (
    <footer className="relative bg-[#17190F] text-[#FAF9F5] pt-16 overflow-hidden">
      {/* Upper Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          {/* Brand */}
          <div className="space-y-2">
            <h4 className="font-serif-luxury text-3xl sm:text-4xl text-[#FAF9F5] tracking-wide font-normal">
              Sahā
            </h4>
            <p className="text-sm text-[#8D9280] tracking-wide font-light">
              Recover from the life you built.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8">
            {footerLinks.map((item) =>
              item.action ? (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-[#9EA391] hover:text-[#D8BE6B] transition-colors uppercase"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-[#9EA391] hover:text-[#D8BE6B] transition-colors uppercase"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>

        {/* Hairline Divider */}
        <div className="w-full h-[1px] bg-[#2A2E1D] mt-12 mb-6" />

        {/* Copyright & Values */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] tracking-[0.25em] text-[#6E7361] uppercase">
          <div>© 2026 SAHĀ</div>
          <div>BREATHE · BE · BALANCE</div>
        </div>
      </div>

      {/* Scenic Lush Grassland / Landscape Panorama: Uses public/footer_bg.png */}
      <div className="relative w-full h-44 sm:h-56 md:h-72 lg:h-84 xl:h-96 overflow-hidden select-none pointer-events-none">
        <img
          src="/footer_bg.png"
          alt="Sahā Meadow Panorama"
          className="w-full h-full object-cover object-bottom select-none"
        />
        {/* Subtle atmospheric top gradient blending from dark footer into meadow sky */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#17190F] to-transparent pointer-events-none" />
      </div>
    </footer>
  );
}
