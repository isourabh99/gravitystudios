"use client";

import React, { useState, useEffect } from "react";
import { motion, MotionProps, HTMLMotionProps } from "framer-motion";
import { useSound } from "@/hooks/useSound";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

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
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const { soundOn, toggleSound } = useSound();
  const lenis = useSmoothScroll();

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

  // Footer: strictly hidden by default, fade in ONLY when footer reaches the end
  useEffect(() => {
    if (variant !== "footer") return;

    let ticking = false;
    const checkAtEnd = () => {
      if (typeof window === "undefined" || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        // Triggers ONLY when user reaches the very end of the page (within 40px)
        const atBottom = scrollPosition >= documentHeight - 40;
        setIsAtBottom(atBottom);
        ticking = false;
      });
    };

    // Lenis scroll listener
    if (lenis) {
      lenis.on("scroll", checkAtEnd);
    }

    // Window scroll & resize listeners
    window.addEventListener("scroll", checkAtEnd, { passive: true });
    window.addEventListener("resize", checkAtEnd, { passive: true });

    // IntersectionObserver on the footer end sentinel
    const sentinel = document.getElementById("footer-end-sentinel");
    let observer: IntersectionObserver | null = null;
    if (sentinel) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsAtBottom(true);
          } else {
            checkAtEnd();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(sentinel);
    }

    checkAtEnd();

    return () => {
      if (lenis) {
        lenis.off("scroll", checkAtEnd);
      }
      window.removeEventListener("scroll", checkAtEnd);
      window.removeEventListener("resize", checkAtEnd);
      if (observer) observer.disconnect();
    };
  }, [variant, lenis]);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isLight = variant === "menu" || variant === "footer";

  // Footer fade in animation: default hidden (opacity 0), fades in only at the end
  const footerAnimation: HTMLMotionProps<"div"> =
    variant === "footer"
      ? {
        initial: { opacity: 0 },
        animate: {
          opacity: isAtBottom ? 1 : 0,
          pointerEvents: isAtBottom ? "auto" : "none",
        },
        transition: { duration: 0.45, ease: "easeInOut" as const },
      }
      : {};

  return (
    <motion.div
      className={`relative flex flex-wrap items-center justify-between gap-4 text-xs sm:text-[13px] font-mg12-regular font-light w-full select-none ${isLight ? "text-neutral-500" : "text-neutral-400"
        } ${className}`}
      {...footerAnimation}
      {...motionProps}
    >
      {/* Left Metadata: Copyright, Timezone, Time (NO green dot before time) */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6">
        <span className={isLight ? "text-neutral-700" : "text-neutral-300"}>
          {variant === "footer" ? "© 2026 GRAVITY. ALL RIGHTS RESERVED." : "© 2026 GRAVITY"}
        </span>
        <span className={isLight ? "text-neutral-400" : "text-neutral-500"}>
          {timeZoneString}
        </span>
        <span className={`font-mono tracking-wider ${isLight ? "text-neutral-800" : "text-neutral-200"}`}>
          {timeString || "07:52:11 PM"}
        </span>
      </div>

      {/* Right Controls: Sound Toggle (hidden in footer) and Back to Top */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Sound Toggle (hidden in footer variant, NO scale, NO line, NO slide on hover) */}
        {variant !== "footer" && (
          <button
            type="button"
            onClick={() => toggleSound()}
            className={`inline-flex items-center gap-2 transition-colors cursor-pointer select-none ${isLight
                ? "text-neutral-600 hover:text-black"
                : "text-neutral-300 hover:text-white"
              }`}
            aria-label="Toggle Audio Sound"
          >
            <svg
              className={`w-3.5 h-3.5 transition-colors ${soundOn ? "text-emerald-500" : isLight ? "text-neutral-500" : "text-neutral-400"
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
            <span>{soundOn ? "Sound On (Fan Running)" : "Sound"}</span>
          </button>
        )}

        {/* Back to Top (for Footer variant, clean hover without underline) */}
        {variant === "footer" && (
          <button
            type="button"
            onClick={scrollToTop}
            className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer uppercase tracking-wider ${isLight
                ? "text-neutral-800 hover:text-[#ED3327]"
                : "text-neutral-200 hover:text-white"
              }`}
            aria-label="Scroll to top of page"
          >
            <span>BACK TO TOP</span>
            <span className="text-xs">↑</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
