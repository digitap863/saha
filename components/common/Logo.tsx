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

  return (
    <div className={`flex items-center select-none ${className}`}>
      <Image
        src="/logo.png"
        alt="Sahā"
        width={1227}
        height={806}
        priority
        className={`h-9 sm:h-10 md:h-11 w-auto object-contain transition-opacity ${
          isLight ? "invert brightness-200" : ""
        }`}
      />
    </div>
  );
}
