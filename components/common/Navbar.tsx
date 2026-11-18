"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { ArrowUpRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenEnquire?: () => void;
}

export default function Navbar({ onOpenEnquire }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "PHILOSOPHY", href: "/philosophy" },
    { label: "EXPERIENCE", href: "/#experience" },
    { label: "WHO IT'S FOR", href: "/#who-its-for" },
    { label: "THE SETTING", href: "/#setting" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#ffff]/95 backdrop-blur-md shadow-xs py-3 "
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus:outline-hidden"
          aria-label="Sahā Home"
        >
          <Logo />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-9">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[11px] font-medium tracking-[0.2em] text-[#4F5244] hover:text-[#B59828] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B59828] hover:after:w-full after:transition-all after:duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenEnquire}
            className="group inline-flex items-center gap-1.5 px-4 py-2 border border-[#3E4A19] text-[#293011] hover:bg-[#3E4A19] hover:text-[#FAF9F5] text-[11px] tracking-[0.18em] uppercase transition-all duration-300 ease-out font-medium"
          >
            <span>ENQUIRE</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenEnquire}
            className="px-2.5 py-1.5 border border-[#3E4A19] text-[#293011] text-[10px] tracking-wider uppercase font-medium flex items-center gap-1"
          >
            <span>ENQUIRE</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-stone-700 hover:text-stone-900 focus:outline-hidden"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F5] border-b border-[#E8E4D5] px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium tracking-[0.2em] text-[#4F5244] hover:text-[#B59828] py-2 border-b border-[#ECE7DA]"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquire?.();
                }}
                className="w-full text-center py-3 bg-[#3E4A19] text-[#FAF9F5] text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-1.5"
              >
                <span>ENQUIRE NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

