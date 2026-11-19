"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import Logo from "./Logo";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
   
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#14170D]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-saha-bg border border-[#DDD6C5] shadow-2xl p-4 sm:p-10 my-3 sm:my-8 rounded-xs text-[#22251B]">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 p-1.5 sm:p-2 text-[#686B5B] hover:text-[#22251B] transition-colors focus:outline-hidden"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {submitted ? (
          <div className="py-8 sm:py-12 text-center space-y-4 sm:space-y-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-saha-olive/10 rounded-full flex items-center justify-center mx-auto text-[#3F4C19]">
              <CheckCircle2 className="w-7 h-7 sm:w-9 sm:h-9" />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#22251B] font-medium">
                Enquiry Received with Discretion
              </h3>
              <p className="text-xs sm:text-sm text-[#5C604F] max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name || "friend"}. Our admissions director will review your
                details and contact you via your private channel within 24 hours.
              </p>
            </div>

            <div className="pt-2 sm:pt-4">
              <button
                onClick={resetAndClose}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-saha-olive text-saha-bg text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase hover:bg-[#323D14] transition-all"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="text-center mb-3.5 sm:mb-8 space-y-1 sm:space-y-2">
              <div className="flex justify-center items-center mb-1 sm:mb-3">
                <Logo showTagline={false} className="scale-70 sm:scale-95 justify-center origin-center" />
              </div>
              <div className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-saha-gold font-medium">
                CONFIDENTIAL ADMISSIONS
              </div>
              <h3 className="font-serif-luxury text-lg sm:text-3xl text-[#20231B] font-normal leading-snug">
                Initiate a Private Conversation
              </h3>
              <p className="text-[11px] sm:text-sm text-[#636756] max-w-lg mx-auto leading-relaxed">
                Because Sahā hosts an intimate, restricted cohort, we begin with a confidential
                dialogue to align on your recovery objectives.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#525646] font-medium mb-0.5 sm:mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2.5 bg-[#F2EFE8] border border-[#DDD7C7] text-xs sm:text-sm text-[#20231B] focus:outline-hidden focus:border-[#3F4C19] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#525646] font-medium mb-0.5 sm:mb-1">
                    Role / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Founder & Managing Partner"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2.5 bg-[#F2EFE8] border border-[#DDD7C7] text-xs sm:text-sm text-[#20231B] focus:outline-hidden focus:border-saha-olive transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#525646] font-medium mb-0.5 sm:mb-1">
                    Private Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah@private.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2.5 bg-[#F2EFE8] border border-[#DDD7C7] text-xs sm:text-sm text-[#20231B] focus:outline-hidden focus:border-[#3F4C19] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#525646] font-medium mb-0.5 sm:mb-1">
                    Phone / Secure Messenger (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2.5 bg-[#F2EFE8] border border-[#DDD7C7] text-xs sm:text-sm text-[#20231B] focus:outline-hidden focus:border-[#3F4C19] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#525646] font-medium mb-0.5 sm:mb-1">
                  Confidential Context or Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="Share any specific demands you carry or what your ideal recovery interval looks like..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2.5 bg-[#F2EFE8] border border-[#DDD7C7] text-xs sm:text-sm text-[#20231B] focus:outline-hidden focus:border-saha-olive transition-colors resize-none"
                />
              </div>

              {/* Privacy notice */}
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#6C7160] pt-0.5 sm:pt-1">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3F4C19] shrink-0" />
                <span>Strict confidentiality. Your information will never be shared or commercialized.</span>
              </div>

              {/* Submit Button */}
              <div className="pt-1.5 sm:pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 sm:py-3.5 bg-[#3F4C19] hover:bg-[#323D14] text-saha-bg text-[11px] sm:text-xs font-medium tracking-[0.18em] sm:tracking-[0.22em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Request Programme Prospectus</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

