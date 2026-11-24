"use client";

import React from "react";
import Link from "next/link";
import { useEnquiry } from "@/context/EnquiryContext";

interface FooterProps {
  onOpenEnquire?: () => void;
}

export default function Footer({ onOpenEnquire }: FooterProps) {
  const { openEnquire } = useEnquiry();
  const handleOpenEnquire = onOpenEnquire || openEnquire;

  const footerLinks = [
    { label: "PHILOSOPHY", href: "/philosophy" },
    { label: "EXPERIENCE", href: "/experience" },
    { label: "WHO IT'S FOR", href: "/who-its-for" },
    // { label: "THE SETTING", href: "/#setting" },
    { label: "ENQUIRE", href: "#enquire", action: handleOpenEnquire },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-[#232613] md:bg-white select-none">
      {/* Nature Visual in Background: public/footer_bg.webp (Desktop/Tablet only, hidden on mobile) */}
      <div className="hidden md:flex absolute inset-0 w-full h-full pointer-events-none select-none z-0 items-end justify-center">
        <img
          src="/footer_bg.webp"
          alt="Sahā Nature Background"
          className="w-full h-full object-cover object-bottom select-none"
        />
      </div>

      {/* Dark Footer Content Bar Overlay */}
      <div className="relative z-10 w-full px-0 sm:px-4 md:px-8 lg:px-12">
        <div className="max-w-360 mx-auto bg-[#232613] text-saha-bg px-6 sm:px-10 lg:px-14 py-10 sm:py-12 shadow-xl border-t border-[#3B421C]/50">
          {/* Top Brand & Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 md:gap-10 items-center text-center sm:text-left">
            {/* Brand Logo with Symmetrical Center on Mobile */}
            <div className="w-full sm:w-auto flex justify-center sm:justify-start">
              <Link
                href="/"
                className="inline-block group focus:outline-hidden"
                aria-label="Sahā Home"
              >
                <img
                  src="/logo_bg_removed.webp"
                  alt="Sahā - Breathe · Be · Balance"
                  className="h-14 sm:h-16 md:h-18 w-auto object-contain block mx-auto sm:mx-0"
                />
              </Link>
            </div>

            {/* Navigation Links: 2x2 balanced grid on mobile, horizontal row on tablet/desktop */}
            <nav className="w-full sm:w-auto grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-3.5 sm:gap-y-0 sm:flex sm:flex-wrap sm:items-center max-w-75 sm:max-w-none mx-auto sm:mx-0 text-center sm:text-left">
              {footerLinks.map((item) =>
                item.action ? (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] text-[#9EA391] hover:text-[#D8BE6B] transition-colors uppercase cursor-pointer py-1.5 focus:outline-hidden"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] text-[#9EA391] hover:text-[#D8BE6B] transition-colors uppercase py-1.5 focus:outline-hidden"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Hairline Divider */}
          <div className="w-full h-px bg-[#373D1E] mt-8 sm:mt-10 md:mt-12 mb-6" />

          {/* Copyright & Core Values */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-[11px] tracking-[0.25em] text-[#717763] uppercase text-center sm:text-left">
            <div>© 2026 SAHĀ</div>
            <div className="text-[9.5px] sm:text-[11px] tracking-[0.28em] text-[#868C76]">BREATHE · BE · BALANCE</div>
          </div>
        </div>
      </div>

      {/* Lower Meadow & Mossy Rock Panorama revealed below the dark bar on Desktop */}
      <div className="hidden md:block relative z-0 w-full h-40 sm:h-30 md:h-40 pointer-events-none" />
    </footer>
  );
}
