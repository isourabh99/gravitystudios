"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BrandingSettings } from "@/lib/cms/types";

export interface GravityLogoProps {
  className?: string;
  showLink?: boolean;
  isDark?: boolean;
  mode?: string;
  textSize?: string;
  branding?: BrandingSettings;
}

export default function GravityLogo({
  className = "",
  showLink = true,
  isDark = false,
  textSize = "text-2xl",
  branding: initialBranding,
}: GravityLogoProps) {
  const [branding, setBranding] = useState<BrandingSettings | null>(initialBranding || null);

  useEffect(() => {
    if (!initialBranding) {
      // Fetch dynamic branding preferences from CMS store
      fetch("/api/cms/branding")
        .then((res) => res.json())
        .then((data) => {
          if (data?.success && data?.branding) {
            setBranding(data.branding);
          }
        })
        .catch(() => {});
    }
  }, [initialBranding]);

  const isImageLogo = branding?.logoType === "image" && branding.imageLogo?.url;
  const brandName = branding?.textLogo?.brandName || "gravity studios";
  const fontWeight = branding?.textLogo?.fontWeight || "bold";
  const isUppercase = branding?.textLogo?.uppercase ?? false;
  const hasOrbitDot = branding?.textLogo?.orbitingDot ?? true;

  const fontWeights: Record<string, string> = {
    light: "font-light",
    regular: "font-normal",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const logoContent = isImageLogo ? (
    /* Option B: Image/Asset Logo */
    <div className={`relative inline-flex items-center justify-center select-none group ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={branding!.imageLogo.url}
        alt={branding!.imageLogo.alt || brandName}
        style={{ height: `${branding!.imageLogo.height || 28}px` }}
        className={`object-contain transition-all ${isDark ? "brightness-0" : ""}`}
      />
    </div>
  ) : (
    /* Option A: Text Logo with Orbiting 3D Dot */
    <div className={`relative inline-flex items-center justify-center select-none group ${className}`}>
      {/* Brand Text */}
      <span
        className={`font-mg12-bold ${textSize} ${
          fontWeights[fontWeight] || "font-bold"
        } tracking-wide relative z-10 leading-tight py-1 ${
          isDark ? "text-black" : "text-white"
        } ${isUppercase ? "uppercase" : ""}`}
        style={{
          fontFamily: "var(--font-mg12-bold), Inter, var(--font-sans), system-ui, sans-serif",
          letterSpacing: branding?.textLogo?.letterSpacing || "normal",
        }}
      >
        {brandName}
      </span>

      {/* Orbiting Circle Dot around the text */}
      {hasOrbitDot && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center animate-[spin_5s_linear_infinite]">
          <span
            className={`absolute -top-1 w-1 h-1 rounded-full ${
              isDark
                ? "bg-black shadow-[0_0_8px_rgba(0,0,0,0.4)]"
                : "bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
            }`}
          />
        </div>
      )}
    </div>
  );

  if (showLink) {
    return (
      <Link href="/" className="inline-flex items-center" aria-label={`${brandName} Home`}>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
