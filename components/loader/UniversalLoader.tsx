"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrambleText from "@/components/ui/ScrambleText";

export interface LoaderConfig {
  topLeft: string[];
  bottomRight: string[];
}

// Page-specific loader configurations
export const LOADER_PAGE_CONFIGS: Record<string, LoaderConfig> = {
  "/": {
    topLeft: [
      "Studio Gravity",
      "Design, systems & interactive engineering",
      "Digital experiences for the forward-thinking",
    ],
    bottomRight: [
      "Waking up the assistant unit...",
      "Turbine spinning up",
      "Screen and optics calibrated",
      "Assistant online.",
    ],
  },
  "/contact": {
    topLeft: [
      "Communications Channel",
      "New business & collaborations",
      "Tokyo / New York / Worldwide",
    ],
    bottomRight: [
      "Establishing secure channel...",
      "Routing to design & engineering...",
      "Direct transmission ready.",
      "Drop us a message below.",
    ],
  },
  default: {
    topLeft: [
      "Studio Gravity",
      "Interactive media laboratory",
      "Connecting nodes...",
    ],
    bottomRight: [
      "Identity, websites, real-time 3D",
      "Calibrating layout and typography...",
      "Connecting worldwide...",
      "Welcome to Studio Gravity.",
    ],
  },
};

export interface UniversalLoaderProps {
  pathname?: string;
  topLeft?: string | string[];
  bottomRight?: string[];
  duration?: number;
  onComplete?: () => void;
}

export default function UniversalLoader({
  pathname = "/",
  topLeft,
  bottomRight,
  duration = 1400,
  onComplete,
}: UniversalLoaderProps) {
  const [isExiting, setIsExiting] = useState(false);

  // Determine content based on pathname or explicit props
  const baseConfig =
    LOADER_PAGE_CONFIGS[pathname] ||
    (pathname.startsWith("/contact") ? LOADER_PAGE_CONFIGS["/contact"] : LOADER_PAGE_CONFIGS.default);

  const activeTopLeft = topLeft || baseConfig.topLeft;
  const activeBottomRight = bottomRight || baseConfig.bottomRight;

  const normalizedTopLeft = Array.isArray(activeTopLeft)
    ? activeTopLeft
    : [activeTopLeft];

  useEffect(() => {
    // Single unified loader display timer
    const timerExit = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 250);
    }, duration);

    return () => clearTimeout(timerExit);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="universal-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] bg-black text-white flex flex-col justify-center items-center px-6 sm:px-12 select-none pointer-events-auto"
        >
          <style>{`
            @keyframes logoWaveRipple {
              0%, 100% {
                transform: translateY(0px);
                opacity: 0.55;
              }
              50% {
                transform: translateY(-5px);
                opacity: 1;
              }
            }
          `}</style>

          {/* 1. TOP-LEFT: Page-specific scrambled lines (Left-Aligned Paragraph) */}
          <div className="absolute top-12 left-8 sm:top-20 sm:left-16 md:top-24 md:left-24 z-20 pointer-events-none text-left flex flex-col items-start space-y-1 sm:space-y-1.5">
            {normalizedTopLeft.map((line, idx) => (
              <p
                key={idx}
                className="font-mg12-regular text-sm sm:text-base md:text-lg text-neutral-200 tracking-wide leading-relaxed min-h-[1.5rem]"
              >
                <ScrambleText
                  text={line}
                  autoPlay
                  interactive={false}
                  speed={0.9}
                />
              </p>
            ))}
          </div>

          {/* 2. CENTER: Animated 'gravity™' Logo */}
          <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
            <div className="inline-flex items-center space-x-[2px] sm:space-x-1 select-none py-1">
              {"gravity".split("").map((letter, idx) => (
                <span
                  key={idx}
                  className="font-mg12-regular text-base sm:text-lg md:text-xl font-normal text-white inline-block"
                  style={{
                    animation: "logoWaveRipple 1.6s ease-in-out infinite",
                    animationDelay: `${idx * 0.12}s`,
                  }}
                >
                  {letter}
                </span>
              ))}
              <span className="text-[11px] text-neutral-400 -mt-2 ml-0.5 font-sans">™</span>
            </div>
          </div>

          {/* 3. BOTTOM-RIGHT: Page-specific scrambled lines (Right-Aligned Paragraph) */}
          <div className="absolute right-8 bottom-12 sm:right-16 sm:bottom-20 md:right-24 md:bottom-24 z-20 pointer-events-none text-right flex flex-col items-end space-y-1 sm:space-y-1.5">
            {activeBottomRight.map((line, idx) => (
              <p
                key={idx}
                className="font-mg12-regular text-sm sm:text-base md:text-lg text-neutral-200 tracking-wide leading-relaxed min-h-[1.5rem]"
              >
                <ScrambleText
                  text={line}
                  autoPlay
                  interactive={false}
                  speed={0.9}
                />
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
