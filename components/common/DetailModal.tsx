"use client";

import React from "react";
import { X, Check, ArrowRight } from "lucide-react";
import { PillarData } from "@/components/home/PillarsSection";

interface DetailModalProps {
  pillar: PillarData | null;
  onClose: () => void;
  onOpenEnquire: () => void;
}

export default function DetailModal({
  pillar,
  onClose,
  onOpenEnquire,
}: DetailModalProps) {
  if (!pillar) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#14170D]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-saha-bg border border-[#DDD6C5] shadow-2xl p-6 sm:p-10 my-8 rounded-xs text-[#22251B]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#686B5B] hover:text-[#22251B] transition-colors focus:outline-hidden"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="space-y-6">
          {/* Category Tag */}
          <div className="text-[11px] font-medium tracking-[0.3em] text-saha-gold uppercase">
            {pillar.number} / {pillar.category}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#20231B] font-medium leading-tight">
              {pillar.title}
            </h3>
            {pillar.fullDetails?.subtitle && (
              <p className="text-sm font-medium text-[#5E6452]">
                {pillar.fullDetails.subtitle}
              </p>
            )}
          </div>

          {/* Summary */}
          {pillar.fullDetails?.summary && (
            <p className="text-sm sm:text-base text-[#464B3B] leading-relaxed border-l-2 border-saha-gold/50 pl-4 py-1">
              {pillar.fullDetails.summary}
            </p>
          )}

          {/* Highlights List */}
          {pillar.fullDetails?.highlights && (
            <div className="space-y-3 pt-2">
              <h4 className="text-[11px] uppercase tracking-widest text-[#787D6C] font-semibold">
                Key Dimensions
              </h4>
              <ul className="space-y-2.5">
                {pillar.fullDetails.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#383C2F]">
                    <span className="w-4 h-4 rounded-full bg-[#3F4C19]/10 text-saha-olive flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-6 border-t border-[#E5DFCF] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 border border-[#CCC6B4] text-xs uppercase tracking-wider text-[#575B4B] hover:text-[#20231B] transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenEnquire();
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#3F4C19] hover:bg-[#323D14] text-[#FAF9F5] text-xs font-medium tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2"
            >
              <span>Discuss Your Recovery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

