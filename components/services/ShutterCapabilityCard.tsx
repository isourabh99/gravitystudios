"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrambleText from "@/components/ui/ScrambleText";

export interface CapabilityItem {
  number: string; // e.g. "01", "02"
  label?: string; // e.g. "CAPABILITY / 01"
  title: string;
  shortDesc: string;
  category: string;
  tagline: string;
  deliverables: string[];
  technologies: string[];
  timeline: string;
  metrics?: { label: string; value: string }[];
  isDefaultActive?: boolean;
}

export interface ShutterCapabilityCardProps {
  item: CapabilityItem;
  isActive?: boolean;
  onSelect?: (item: CapabilityItem) => void;
  className?: string;
  slatCount?: number;
}

export default function ShutterCapabilityCard({
  item,
  isActive = false,
  onSelect,
  className = "",
  slatCount = 5,
}: ShutterCapabilityCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeOrHovered = isActive || isHovered;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect && onSelect(item)}
      className={`group relative overflow-hidden rounded-md border transition-all duration-500 cursor-pointer select-none flex flex-col justify-between min-h-[380px] sm:min-h-[420px] p-6 sm:p-7 md:p-8 ${
        activeOrHovered
          ? "border-neutral-900 shadow-2xl scale-[1.01]"
          : "border-neutral-300 bg-[#EFEFEA] hover:border-neutral-700 shadow-xs"
      } ${className}`}
    >
      {/* =========================================================================
          1. SHUTTER MECHANISM BACKGROUND (Venetian Blind / Louver Slats)
         ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Base Light Background */}
        <div className="absolute inset-0 bg-[#EFEFEA] transition-colors duration-500" />

        {/* Shutter Slats (Staggered mechanical wipe from top to bottom) */}
        <div className="absolute inset-0 flex flex-col w-full h-full">
          {Array.from({ length: slatCount }).map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                scaleY: activeOrHovered ? 1 : 0,
                opacity: activeOrHovered ? 1 : 0,
              }}
              transition={{
                duration: 0.38,
                delay: activeOrHovered ? i * 0.045 : (slatCount - 1 - i) * 0.03,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                originY: 0,
                height: `${100 / slatCount}%`,
              }}
              className="w-full bg-[#0C0D0E] relative border-b border-neutral-900/40"
            >
              {/* Subtle metallic slat highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10" />
            </motion.div>
          ))}
        </div>

        {/* Subtle grid texture overlay on dark mode */}
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:14px_14px] transition-opacity duration-500 ${
            activeOrHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Shutter Laser Accent Line at bottom edge */}
        <motion.div
          initial={false}
          animate={{
            scaleX: activeOrHovered ? 1 : 0,
            opacity: activeOrHovered ? 1 : 0,
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 inset-x-0 h-[2px] bg-[#ED3327] origin-left"
        />
      </div>

      {/* =========================================================================
          2. CARD TOP HEADER (Matches Screenshot 1: "THE TRAP / 01" + circular 01)
         ========================================================================= */}
      <div className="relative z-10 flex items-center justify-between border-b pb-4 transition-colors duration-400 border-neutral-300/80 group-hover:border-neutral-700/80">
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase transition-colors duration-400 ${
              activeOrHovered ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            {item.label || `CAPABILITY / ${item.number}`}
          </span>
          {activeOrHovered && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#ED3327] animate-pulse" />
          )}
        </div>

        {/* Circular Numbered Outline Badge (Matches Screenshot 1 top right) */}
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center font-mono text-[11px] sm:text-xs transition-all duration-400 ${
            activeOrHovered
              ? "border-neutral-600 text-white bg-neutral-900/60"
              : "border-neutral-400 text-neutral-700 bg-transparent"
          }`}
        >
          {item.number}
        </div>
      </div>

      {/* =========================================================================
          3. CARD BODY & SCRAMBLE TEXT HEADLINE (Screenshot 1: Bold title + paragraph)
         ========================================================================= */}
      <div className="relative z-10 my-auto py-6 space-y-4">
        {/* Scramble Text on Title */}
        <h3
          className={`font-mg12-regular text-2xl sm:text-3xl md:text-[32px] leading-tight tracking-tight transition-colors duration-400 ${
            activeOrHovered ? "text-white" : "text-neutral-950"
          }`}
        >
          <ScrambleText
            text={item.title}
            autoPlay={false}
            interactive={true}
            hoverColor={activeOrHovered ? "#FFFFFF" : "#ED3327"}
            speed={0.4}
          />
        </h3>

        {/* Short Editorial Description */}
        <p
          className={`font-mg12-regular text-xs sm:text-[13px] md:text-sm leading-relaxed font-light transition-colors duration-400 ${
            activeOrHovered ? "text-neutral-300" : "text-neutral-600"
          }`}
        >
          {item.shortDesc}
        </p>

        {/* Expanded Tech / Deliverable Highlights on Hover */}
        <AnimatePresence>
          {activeOrHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 4, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 overflow-hidden space-y-2.5"
            >
              <div className="flex flex-wrap gap-1.5">
                {item.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[9.5px] px-2 py-0.5 rounded-xs bg-neutral-800/80 text-neutral-300 border border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
                {item.timeline && (
                  <span className="font-mono text-[9.5px] px-2 py-0.5 rounded-xs bg-[#ED3327]/15 text-[#ED3327] border border-[#ED3327]/30">
                    {item.timeline}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================================================
          4. CARD BOTTOM BAR: Click to inspect indicator + Category
         ========================================================================= */}
      <div className="relative z-10 pt-4 border-t flex items-center justify-between text-[11px] font-mono transition-colors duration-400 border-neutral-300/80 group-hover:border-neutral-800">
        <span
          className={`tracking-wider uppercase transition-colors duration-400 ${
            activeOrHovered ? "text-neutral-400" : "text-neutral-500"
          }`}
        >
          {item.category}
        </span>

        <div className="flex items-center gap-1.5">
          <span
            className={`transition-colors duration-400 ${
              activeOrHovered ? "text-[#ED3327]" : "text-neutral-600"
            }`}
          >
            {activeOrHovered ? "EXPLORE SCOPE" : "VIEW DETAILS"}
          </span>
          <span
            className={`transition-transform duration-300 ${
              activeOrHovered
                ? "translate-x-1 text-[#ED3327]"
                : "text-neutral-400"
            }`}
          >
            ↗
          </span>
        </div>
      </div>
    </div>
  );
}
