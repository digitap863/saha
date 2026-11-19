import React from "react";
import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark" | "gold";
  className?: string;
  showTagline?: boolean;
}

export default function Logo({
  variant = "dark",
  className = "",
}: LogoProps) {
  const isLight = variant === "light";
  const logoSrc = isLight ? "/logo_bg_removed.png" : "/logo.png";

  return (
    <div className={`flex items-center select-none ${className}`}>
      <Image
        src={logoSrc}
        alt="Sahā - Breathe · Be · Balance"
        width={1024}
        height={672}
        priority
        unoptimized
        className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-opacity"
      />
    </div>
  );
}
