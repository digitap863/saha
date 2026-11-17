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
    focusArea: "Cognitive & Mental Clarity",
    timeframe: "Next 1-3 Months",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#14170D]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF9F5] border border-[#DDD6C5] shadow-2xl p-6 sm:p-10 my-8 rounded-xs text-[#22251B]">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 text-[#686B5B] hover:text-[#22251B] transition-colors focus:outline-hidden"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 bg-[#3F4C19]/10 rounded-full flex items-center justify-center mx-auto text-[#3F4C19]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-luxury text-3xl text-[#22251B] font-medium">
                Enquiry Received with Discretion
              </h3>
              <p className="text-sm text-[#5C604F] max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name || "friend"}. Our admissions director will review your
                details and contact you via your private channel within 24 hours.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={resetAndClose}
                className="px-8 py-3 bg-[#3F4C19] text-[#FAF9F5] text-xs font-medium tracking-[0.2em] uppercase hover:bg-[#323D14] transition-all"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="text-center mb-8 space-y-2">
              <Logo showTagline={false} className="mb-2 scale-90" />
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#B59828] font-medium">
                CONFIDENTIAL ADMISSIONS
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#20231B] font-normal">
                Initiate a Private Conversation
              </h3>
              <p className="text-xs sm:text-sm text-[#636756] max-w-lg mx-auto">
                Because Sahā hosts an intimate, restricted cohort, we begin with a confidential
                dialogue to align on your recovery objectives.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#525646] font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#DDD7C7] text-sm text-[#20231B] focus:outline-hidden focus:border-[#3F4C19] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#525646] font-medium mb-1">
                    Role / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Founder & Managing Partner"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#DDD7C7] text-sm text-[#20231B] focus:outline-hidden focus:border-[#3F4C19] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#525646] font-medium mb-1">
                    Private Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah@private.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#DDD7C7] text-sm text-[#20231B] focus:outline-hidden focus:border-[#3F4C19] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#525646] font-medium mb-1">
                    Phone / Secure Messenger (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#DDD7C7] text-sm text-[#20231B] focus:outline-hidden focus:border-[#3F4C19] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#525646] font-medium mb-1">
                    Primary Area of Focus
                  </label>
                  <select
                    value={formData.focusArea}
                    onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#DDD7C7] text-sm text-[#20231B] focus:outline-hidden focus:border-[#3F4C19] transition-colors"
                  >
                    <option>Cognitive & Mental Clarity</option>
                    <option>Sustained Focus & Adrenal Reset</option>
                    <option>Executive Sabbatical Interval</option>
                    <option>Sleep Architecture & Deep Rest</option>
                    <option>Leadership Transition Recovery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#525646] font-medium mb-1">
                    Preferred Timeframe
                  </label>
                  <select
                    value={formData.timeframe}
                    onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#DDD7C7] text-sm text-[#20231B] focus:outline-hidden focus:border-[#3F4C19] transition-colors"
                  >
                    <option>Immediate / Within 30 Days</option>
                    <option>Next 1-3 Months</option>
                    <option>Next Quarter</option>
                    <option>General Future Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#525646] font-medium mb-1">
                  Confidential Context or Questions
                </label>
                <textarea
                  rows={3}
                  placeholder="Share any specific demands you carry or what your ideal recovery interval looks like..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F2EFE8] border border-[#DDD7C7] text-sm text-[#20231B] focus:outline-hidden focus:border-[#3F4C19] transition-colors"
                />
              </div>

              {/* Privacy notice */}
              <div className="flex items-center gap-2 text-[11px] text-[#6C7160] pt-1">
                <ShieldCheck className="w-4 h-4 text-[#3F4C19]" />
                <span>Strict confidentiality. Your information will never be shared or commercialized.</span>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#3F4C19] hover:bg-[#323D14] text-[#FAF9F5] text-xs font-medium tracking-[0.22em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Request Programme Prospectus</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

