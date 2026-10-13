"use client";

import React from "react";
import Link from "next/link";

export interface CtaButtonProps {
  children: React.ReactNode;
  variant?: "brand" | "outline" | "ghost" | "white";
  shape?: "square" | "pill" | "rounded";
  href?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export default function CtaButton({
  children,
  variant = "brand",
  shape = "square",
  href,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  target,
  rel,
}: CtaButtonProps) {
  // Square no rounded as requested
  const shapeClasses =
    shape === "square"
      ? "rounded-none"
      : shape === "pill"
        ? "rounded-full"
        : "rounded-lg";

  const baseClasses = `group relative inline-flex items-center justify-center font-mono text-xs sm:text-[13px] tracking-widest uppercase font-semibold px-8 py-4 select-none cursor-pointer overflow-hidden transition-colors duration-300 ${shapeClasses} ${className}`;

  // Slot rolling text animation: text moves up and duplicate text comes in from down on hover
  const animatedContent = (
    <span className="relative inline-flex items-center justify-center overflow-hidden h-[1.3em] leading-none">
      {/* Primary text sliding up out of view on hover */}
      <span className="inline-flex items-center gap-2 transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[150%] group-hover:opacity-0">
        {children}
      </span>
      {/* Duplicate text sliding up into view from bottom on hover */}
      <span className="absolute inset-0 inline-flex items-center justify-center gap-2 translate-y-[150%] opacity-0 transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-hover:opacity-100">
        {children}
      </span>
    </span>
  );

  // Default black bg, on hover changes to #ED3327
  let variantClasses = "bg-black text-white hover:bg-[#ED3327]";

  if (variant === "white") {
    variantClasses = "bg-white text-black hover:bg-[#ED3327] hover:text-white";
  } else if (variant === "outline") {
    variantClasses = "border border-neutral-300 text-black hover:bg-[#ED3327] hover:text-white hover:border-[#ED3327]";
  } else if (variant === "ghost") {
    variantClasses = "text-neutral-700 hover:text-black hover:bg-neutral-100";
  }

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={`${baseClasses} ${variantClasses}`}
      >
        {animatedContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses}`}
    >
      {animatedContent}
    </button>
  );
}
