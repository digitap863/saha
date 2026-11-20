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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#FAF1EC] border border-[#E8DDD4] shadow-2xl rounded-xs text-[#3D2314] overflow-hidden my-auto">
        {/* Subtle Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-[#7A695E] hover:text-[#3D2314] transition-colors z-20 focus:outline-hidden cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {submitted ? (
          <div className="p-8 sm:p-16 text-center space-y-4 sm:space-y-6 max-w-lg mx-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#733C1B]/10 rounded-full flex items-center justify-center mx-auto text-[#733C1B]">
              <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="font-playfair text-2xl sm:text-3xl text-[#4A2E1D] font-normal">
                Enquiry Received with Discretion
              </h3>
              <p className="text-xs sm:text-sm text-[#6E5D52] leading-relaxed">
                Thank you, {formData.name || "friend"}. Our admissions team will review your details
                and connect with you personally via {formData.preferredContact} within 24 hours.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={resetAndClose}
                className="px-7 py-3 bg-[#733C1B] hover:bg-[#5C2F13] text-[#FAF8F5] text-xs font-medium tracking-[0.2em] uppercase transition-all rounded-[3px] cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.42fr] divide-y md:divide-y-0 md:divide-x divide-[#E8DDD4]">
            {/* ========================================================
                LEFT COLUMN: Hero Statement & 3D Glass Emblem
               ======================================================== */}
            <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 lg:space-y-8 bg-[#FAF1EC]">
              <div>
                {/* Eyebrow */}
                <div className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] text-[#8C6548] uppercase">
                  SAHĀ · PRIVATE ENQUIRIES
                </div>

                {/* Main Serif Headline */}
                <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[2.75rem] text-[#4A2E1D] font-normal leading-[1.14] mt-3 sm:mt-5 tracking-[-0.015em]">
                  Begin with a <br className="hidden sm:inline" />
                  conversation.
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#6E5D52] leading-relaxed mt-3 sm:mt-4 max-w-sm">
                  Every experience begins with understanding what matters to you. Share a few
                  details and our team will connect with you personally.
                </p>
              </div>

              {/* 3D Glass Emblem Graphic */}
              <div className="relative w-44 sm:w-52 md:w-56 aspect-[260/280] mt-4 sm:mt-8 mix-blend-multiply select-none pointer-events-none">
                <Image
                  src="/enquiry_emblem.webp"
                  alt="Sahā Emblem"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>

            {/* ========================================================
                RIGHT COLUMN: Form Details
               ======================================================== */}
            <div className="p-6 sm:p-10 lg:p-12 bg-[#FAF1EC]">
              <h3 className="font-playfair text-xl sm:text-2xl text-[#4A2E1D] font-normal mb-5 sm:mb-6">
                A little about you
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-[#4A2E1D] mb-1.5">
                    Full name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#D9CCC2] rounded-[3px] text-xs sm:text-sm text-[#3D2314] placeholder-[#A8988C] focus:outline-hidden focus:border-[#733C1B] transition-colors"
                  />
                </div>

                {/* Email & Contact Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4A2E1D] mb-1.5">
                      Email address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#D9CCC2] rounded-[3px] text-xs sm:text-sm text-[#3D2314] placeholder-[#A8988C] focus:outline-hidden focus:border-[#733C1B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A2E1D] mb-1.5">
                      Contact number
                    </label>
                    <input
                      type="tel"
                      placeholder="With country code"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-transparent border border-[#D9CCC2] rounded-[3px] text-xs sm:text-sm text-[#3D2314] placeholder-[#A8988C] focus:outline-hidden focus:border-[#733C1B] transition-colors"
                    />
                  </div>
                </div>

                {/* Where are you based? */}
                <div>
                  <label className="block text-xs font-medium text-[#4A2E1D] mb-1.5">
                    Where are you based?
                  </label>
                  <input
                    type="text"
                    placeholder="City / Country"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#D9CCC2] rounded-[3px] text-xs sm:text-sm text-[#3D2314] placeholder-[#A8988C] focus:outline-hidden focus:border-[#733C1B] transition-colors"
                  />
                </div>

                {/* Divider Line */}
                <div className="border-t border-[#E8DDD4] pt-4 mt-2">
                  {/* Preferred contact channel radio group */}
                  <label className="block text-xs font-medium text-[#4A2E1D] mb-2.5">
                    How would you prefer us to reach you? *
                  </label>
                  <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-[#4A2E1D]">
                    {["WhatsApp", "Phone call", "Email"].map((method) => (
                      <label
                        key={method}
                        className="inline-flex items-center gap-2 cursor-pointer select-none"
                      >
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method}
                          checked={formData.preferredContact === method}
                          onChange={() =>
                            setFormData({ ...formData, preferredContact: method })
                          }
                          className="w-3.5 h-3.5 text-[#733C1B] focus:ring-[#733C1B] border-[#D9CCC2] accent-[#733C1B] cursor-pointer"
                        />
                        <span className="font-normal">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Anything you would like us to know? */}
                <div>
                  <label className="block text-xs font-medium text-[#4A2E1D] mb-1.5">
                    Anything you would like us to know? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Share any preferences, expectations or details that would help us understand your enquiry."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-transparent border border-[#D9CCC2] rounded-[3px] text-xs sm:text-sm text-[#3D2314] placeholder-[#A8988C] focus:outline-hidden focus:border-[#733C1B] transition-colors resize-none"
                  />
                </div>

                {/* Submit Action & Privacy Discretion Note */}
                <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="submit"
                    className="px-6 sm:px-7 py-3 bg-[#733C1B] hover:bg-[#5C2F13] text-[#FAF8F5] text-xs sm:text-[13px] font-medium tracking-wide rounded-[3px] transition-all flex items-center justify-center gap-2 shrink-0 active:scale-98 cursor-pointer"
                  >
                    <span>Continue enquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="hidden sm:block h-8 w-[1px] bg-[#D9CCC2]" />

                  <p className="text-[11px] text-[#8C7C71] italic leading-tight">
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
