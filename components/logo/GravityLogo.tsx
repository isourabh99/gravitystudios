"use client";

import Link from "next/link";

export interface GravityLogoProps {
  className?: string;
  showLink?: boolean;
  isDark?: boolean;
  mode?: string;
  textSize?: string;
}

export default function GravityLogo({
  className = "",
  showLink = true,
  isDark = false,
  textSize = "text-2xl",
}: GravityLogoProps) {
  const logoContent = (
    <div className={`relative inline-flex items-center justify-center select-none group ${className}`}>
      {/* Brand Text 'gravity studios' */}
      <span
        className={`font-mg12-bold ${textSize} font-bold tracking-wide relative z-10 leading-tight py-1 ${
          isDark ? "text-black" : "text-white"
        }`}
        style={{
          fontFamily: "var(--font-mg12-bold), Inter, var(--font-sans), system-ui, sans-serif",
        }}
      >
        gravity studios
      </span>

      {/* Orbiting Circle Dot around the text */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center animate-[spin_5s_linear_infinite]">
        <span
          className={`absolute -top-1 w-1 h-1 rounded-full ${
            isDark
              ? "bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)]"
              : "bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
          }`}
        />
      </div>
    </div>
  );

  if (showLink) {
    return (
      <Link href="/" className="inline-flex items-center" aria-label="Gravity Studios Home">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
