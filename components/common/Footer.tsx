import React from "react";
import Link from "next/link";

interface FooterProps {
  onOpenEnquire?: () => void;
}

export default function Footer({ onOpenEnquire }: FooterProps) {
  const footerLinks = [
    { label: "PHILOSOPHY", href: "/philosophy" },
    { label: "EXPERIENCE", href: "/#experience" },
    { label: "WHO IT'S FOR", href: "/#who-its-for" },
    { label: "THE SETTING", href: "/#setting" },
    { label: "ENQUIRE", href: "#enquire", action: onOpenEnquire },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-[#232613] md:bg-white select-none">
      {/* Nature Visual in Background: public/footer_bg.png (Desktop/Tablet only, hidden on mobile) */}
      <div className="hidden md:flex absolute inset-0 w-full h-full pointer-events-none select-none z-0 items-end justify-center">
        <img
          src="/footer_bg.png"
          alt="Sahā Nature Background"
          className="w-full h-full object-cover object-bottom select-none"
        />
      </div>

      {/* Dark Footer Content Bar Overlay */}
      <div className="relative z-10 w-full px-0 sm:px-4 md:px-8 lg:px-12">
        <div className="max-w-360 mx-auto bg-[#232613] text-saha-bg px-6 sm:px-10 lg:px-14 py-10 sm:py-12 shadow-xl border-t border-[#3B421C]/50">
          {/* Top Brand & Navigation */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10">
            {/* Brand Logo with White Typography */}
            <div className="space-y-3">
              <Link
                href="/"
                className="inline-block group focus:outline-hidden"
                aria-label="Sahā Home"
              >
                <img
                  src="/logo_bg_removed.png"
                  alt="Sahā - Breathe · Be · Balance"
                  className="h-14 sm:h-16 md:h-18 w-auto object-contain block"
                />
              </Link>
             
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap items-center gap-6 sm:gap-8">
              {footerLinks.map((item) =>
                item.action ? (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-[#9EA391] hover:text-[#D8BE6B] transition-colors uppercase cursor-pointer"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-[#9EA391] hover:text-[#D8BE6B] transition-colors uppercase"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Hairline Divider */}
          <div className="w-full h-[1px] bg-[#373D1E] mt-10 sm:mt-12 mb-6" />

          {/* Copyright & Core Values */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] tracking-[0.25em] text-[#717763] uppercase">
            <div>© 2026 SAHĀ</div>
            <div>BREATHE · BE · BALANCE</div>
          </div>
        </div>
      </div>

      {/* Lower Meadow & Mossy Rock Panorama revealed below the dark bar on Desktop */}
      <div className="hidden md:block relative z-0 w-full h-40 sm:h-30 md:h-40 pointer-events-none" />
    </footer>
  );
}
