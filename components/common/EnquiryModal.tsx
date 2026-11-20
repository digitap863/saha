"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, CheckCircle2, ArrowRight } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    preferredContact: "WhatsApp",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  // Shared styling: compact on mobile, refined and balanced on desktop
  const inputClass =
    "w-full px-3 py-1.5 sm:px-3.5 sm:py-2 bg-transparent border border-[#D9CCC2] rounded-[3px] text-[11px] sm:text-sm text-[#3D2314] placeholder-[#A8988C] focus:outline-hidden focus:border-[#733C1B] transition-colors";
  const labelClass =
    "block text-[11px] sm:text-xs font-medium text-[#4A2E1D] mb-1";

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg md:max-w-4xl lg:max-w-5xl md:h-137.5 lg:h-142.5 max-h-[92vh] bg-[#FAF1EC] border border-[#E8DDD4] shadow-2xl rounded-xs text-[#3D2314] overflow-hidden my-auto flex flex-col justify-center">
        {/* Subtle Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-2 right-2 sm:top-5 sm:right-5 p-2 text-[#7A695E] hover:text-[#3D2314] transition-colors z-20 focus:outline-hidden cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {submitted ? (
          <div className="p-6 sm:p-12 text-center space-y-3 sm:space-y-4 max-w-lg mx-auto my-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#733C1B]/10 rounded-full flex items-center justify-center mx-auto text-[#733C1B]">
              <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-playfair text-xl sm:text-2xl text-[#4A2E1D] font-normal">
                Enquiry Received with Discretion
              </h3>
              <p className="text-[11px] sm:text-xs text-[#6E5D52] leading-relaxed">
                Thank you, {formData.name || "friend"}. Our admissions team will review your details
                and connect with you personally via {formData.preferredContact} within 24 hours.
              </p>
            </div>

            <div className="pt-2 sm:pt-3">
              <button
                onClick={resetAndClose}
                className="px-5 py-2 sm:px-6 sm:py-2.5 bg-[#733C1B] hover:bg-[#5C2F13] text-[#FAF8F5] text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase transition-all rounded-[3px] cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.42fr] md:divide-x divide-[#E8DDD4] md:h-full">
            {/* ========================================================
    LEFT SECTION: Hero Statement & 3D Glass Emblem
    Mobile: compact row (text left, emblem right) above the form
    Desktop: single shared column, text + emblem flush left
   ======================================================== */}
<div className="flex px-4 pt-8 pb-5 md:px-12 lg:px-16 md:py-8 flex-col justify-between md:justify-start items-start text-left bg-[#FAF1EC] border-b border-[#E8DDD4] md:border-b-0 md:h-full md:min-h-0">
  {/* Shared column: text + emblem share the same left edge and width */}
  <div className="w-full md:max-w-76 lg:max-w-84 md:mx-auto flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-8 md:flex-1 md:min-h-0">
    {/* Text block */}
    <div className="flex-1 md:flex-none min-w-0 space-y-1.5 md:space-y-4">
      {/* Eyebrow */}
      <div className="text-[9px] md:text-[11px] font-medium tracking-[0.2em] md:tracking-[0.25em] text-[#8C6548] uppercase">
        SAHĀ · PRIVATE ENQUIRIES
      </div>

      {/* Main Serif Headline */}
      <h2 className="font-playfair text-[1.5rem] md:text-[2.6rem] lg:text-[2.75rem] text-[#4A2E1D] font-normal leading-[1.12] tracking-[-0.015em]">
        Begin with a <br className="hidden md:block" />
        conversation.
      </h2>

      {/* Description */}
      <p className="text-[11px] md:text-sm text-[#6E5D52] leading-snug md:leading-relaxed">
        Every experience begins with understanding what matters to you. Share a few
        details and our team will connect with you personally.
      </p>
    </div>

    {/* 3D Glass Emblem - desktop: fills remaining column space, left edge flush with text */}
    <div className="relative w-20 shrink-0 aspect-1140/1180 self-start md:self-auto md:w-full md:flex-1 md:min-h-0 md:aspect-auto select-none pointer-events-none">
      <Image
        src="/enquiry_modal.webp"
        alt="Sahā Emblem"
        fill
        unoptimized
        className="object-contain object-center md:object-left"
      />
    </div>
  </div>
</div>

            {/* ========================================================
                RIGHT SECTION: Form Details
               ======================================================== */}
            <div className="p-4 sm:p-6 lg:p-8 bg-[#FAF1EC] flex flex-col justify-center md:h-full">
              <h3 className="font-playfair text-base sm:text-xl lg:text-2xl text-[#4A2E1D] font-normal mb-2.5 sm:mb-3.5">
                A little about you
              </h3>

              <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
                {/* Full Name */}
                <div>
                  <label className={labelClass}>Full name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                  />
                </div>

                {/* Email & Contact Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className={labelClass}>Email address *</label>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Contact number</label>
                    <input
                      type="tel"
                      placeholder="With country code"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Where are you based? */}
                <div>
                  <label className={labelClass}>Where are you based?</label>
                  <input
                    type="text"
                    placeholder="City / Country"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={inputClass}
                  />
                </div>

                {/* Divider Line */}
                <div className="border-t border-[#E8DDD4] pt-2 sm:pt-2.5 mt-1 sm:mt-1.5">
                  <label className="block text-[11px] sm:text-xs font-medium text-[#4A2E1D] mb-1.5 sm:mb-2">
                    How would you prefer us to reach you? *
                  </label>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:gap-6 text-[11px] sm:text-xs text-[#4A2E1D]">
                    {["WhatsApp", "Phone call", "Email"].map((method) => (
                      <label
                        key={method}
                        className="inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none"
                      >
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method}
                          checked={formData.preferredContact === method}
                          onChange={() =>
                            setFormData({ ...formData, preferredContact: method })
                          }
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#733C1B] focus:ring-[#733C1B] border-[#D9CCC2] accent-[#733C1B] cursor-pointer"
                        />
                        <span className="font-normal">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Anything you would like us to know? */}
                <div>
                  <label className={labelClass}>
                    Anything you would like us to know? (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Share any preferences, expectations or details that would help us understand your enquiry."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Submit Action & Privacy Discretion Note */}
                <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <button
                    type="submit"
                    className="px-5 sm:px-6 py-2 sm:py-2.5 bg-[#733C1B] hover:bg-[#5C2F13] text-[#FAF8F5] text-[11px] sm:text-xs font-medium tracking-wide rounded-[3px] transition-all flex items-center justify-center gap-2 shrink-0 active:scale-98 cursor-pointer"
                  >
                    <span>Continue enquiry</span>
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>

                  <div className="hidden sm:block h-7 w-[1px] bg-[#D9CCC2]" />

                  <p className="text-[10px] sm:text-[11px] text-[#8C7C71] italic leading-tight">
                    Your details will be treated with discretion and used to respond to your enquiry.
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}