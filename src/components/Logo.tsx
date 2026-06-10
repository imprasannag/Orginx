import React from "react";

interface LogoProps {
  className?: string;
  iconSizeClassName?: string;
  isInverted?: boolean; // to force invert the black text to white on dark backgrounds
}

export default function Logo({
  className = "",
  iconSizeClassName = "h-7",
  isInverted = true, // default to true because both navbar and footer are dark!
}: LogoProps) {
  return (
    <div className={`flex items-center select-none group/logo ${className}`}>
      <img
        src="/logo.png"
        alt="OrginX Logo"
        className={`${iconSizeClassName} w-auto object-contain transition-transform duration-300 group-hover/logo:scale-[1.03]`}
        style={isInverted ? { filter: "invert(1) hue-rotate(180deg)" } : undefined}
      />
    </div>
  );
}
