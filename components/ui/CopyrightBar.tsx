"use client";

import React, { useState, useEffect } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useSound } from "@/hooks/useSound";

export interface CopyrightBarProps extends HTMLMotionProps<"div"> {
  className?: string;
  variant?: "hero" | "footer" | "menu" | "default";
}

export default function CopyrightBar({
  className = "",
  variant = "default",
  ...motionProps
}: CopyrightBarProps) {
  const [timeString, setTimeString] = useState<string>("");
  const [timeZoneString, setTimeZoneString] = useState<string>("(UTC+5:30)");
  const { soundOn, toggleSound } = useSound();

  // Live ticking IST clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setTimeZoneString("(UTC+5:30)");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isLight = variant === "menu" || variant === "footer";

  // Fade in animation when reaching the end of the footer
  const footerAnimation: HTMLMotionProps<"div"> =
    variant === "footer"
      ? {
          initial: { opacity: 0, y: 15 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: false, amount: 0.4 },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        }
      : {};

  if (variant === "footer") {
    return (
      <motion.div
        className={`relative flex items-center justify-center text-[9.5px] xs:text-[11px] sm:text-[13px] font-mg12-regular font-light w-full select-none text-neutral-500 ${className}`}
        {...footerAnimation}
        {...motionProps}
      >
        <span className="whitespace-nowrap text-neutral-700 tracking-wide text-center">
          © 2026 GRAVITY STUDIOS. ALL RIGHTS RESERVED.
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative flex items-center justify-between gap-1 xs:gap-3 sm:gap-6 text-[9.5px] xs:text-[11px] sm:text-[13px] font-mg12-regular font-light w-full select-none flex-nowrap ${
        isLight ? "text-neutral-500" : "text-neutral-400"
      } ${className}`}
      {...motionProps}
    >
      {/* Left Metadata: Copyright, Timezone, Time */}
      <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-4 flex-nowrap whitespace-nowrap min-w-0">
        <span className={`whitespace-nowrap shrink-0 ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
          © 2026 GRAVITY STUDIOS
        </span>
        <span className={`whitespace-nowrap shrink-0 text-[8.5px] xs:text-[10px] sm:text-[12px] opacity-80 ${isLight ? "text-neutral-400" : "text-neutral-500"}`}>
          {timeZoneString}
        </span>
        <span className={`font-mono whitespace-nowrap shrink-0 ${isLight ? "text-neutral-800" : "text-neutral-200"}`}>
          {timeString || "07:52:11 PM"}
        </span>
      </div>

      {/* Right Controls: Sound Toggle (Hero/Menu) */}
      <div className="flex items-center gap-1.5 sm:gap-4 flex-nowrap whitespace-nowrap shrink-0 ml-1">
        <button
          type="button"
          onClick={() => toggleSound()}
          className={`inline-flex items-center gap-1 transition-colors cursor-pointer select-none whitespace-nowrap shrink-0 ${
            isLight
              ? "text-neutral-600 hover:text-black"
              : "text-neutral-300 hover:text-white"
          }`}
          aria-label="Toggle Audio Sound"
        >
          <svg
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 transition-colors ${
              soundOn ? "text-emerald-500" : isLight ? "text-neutral-500" : "text-neutral-400"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
          <span className="whitespace-nowrap hidden sm:inline">{soundOn ? "Sound On (Fan Running)" : "Sound"}</span>
          <span className="whitespace-nowrap sm:hidden">{soundOn ? "Sound On" : "Sound"}</span>
        </button>
      </div>
    </motion.div>
  );
}
