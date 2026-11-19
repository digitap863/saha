"use client";

import React, { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEnquiry } from "@/context/EnquiryContext";

gsap.registerPlugin(ScrollTrigger);

interface ConversationCtaProps {
  onOpenEnquire?: () => void;
}

export default function ConversationCta({ onOpenEnquire }: ConversationCtaProps) {
  const { openEnquire } = useEnquiry();
  const handleOpenEnquire = onOpenEnquire || openEnquire;
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        cardRef.current,
        { y: 40, opacity: 0, scale: 0.985 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1 }
      )
        .fromTo(
          leftColRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          rightColRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.7"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="enquire"
      className="relative px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto my-14 will-change-transform"
    >
      <div
        ref={cardRef}
        className="bg-[#414E1A] text-[#FAF9F5] p-8 sm:p-12 lg:p-16 rounded-xs relative overflow-hidden shadow-lg"
      >
        {/* Decorative soft light gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FAF9F5]/5 rounded-full blur-3xl pointer-events-none" />
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF9F5_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          {/* Left Column */}
          <div ref={leftColRef} className="lg:col-span-7 space-y-4">
            <span className="block text-[11px] sm:text-xs tracking-[0.35em] text-[#D8BE6B] uppercase font-medium">
              A PRIVATE CONVERSATION
            </span>

            <h3 className="font-serif-luxury text-3xl sm:text-5xl lg:text-[4rem] leading-[1.05] font-normal tracking-tight text-[#FAF9F5]">
              Make room to <br />
              recover.
            </h3>
          </div>

          {/* Right Column */}
          <div ref={rightColRef} className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <p className="text-sm sm:text-base text-[#D4DEBD] leading-relaxed font-normal">
              Begin with a conversation about the demands you carry and the kind of recovery experience you are looking for.
            </p>

            <div>
              <button
                onClick={handleOpenEnquire}
                className="group inline-flex items-center gap-2 px-6 py-3.5 border border-[#CCD7AF]/80 text-[#FAF9F5] hover:bg-[#FAF9F5] hover:text-[#3B4616] text-[11px] tracking-[0.2em] uppercase transition-all duration-300 font-medium"
              >
                <span>REQUEST PROGRAMME DETAILS</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
