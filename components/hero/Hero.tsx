"use client";

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import CopyrightBar from "@/components/ui/CopyrightBar";

const Robot3DCanvas = dynamic(() => import("@/components/hero/Robot3DCanvas"), {
  ssr: false,
});

const HERO_TEXT = "We build premium web experiences for the world's most ambitious tech companies.";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&*+=/<>[]";

export default function Hero() {
  const { scrollY } = useScroll();
  const textRef = useRef<HTMLHeadingElement>(null);

  // Text translation & fade out on scroll
  const titleY = useTransform(scrollY, [0, 250], [0, -60]);
  const titleOpacity = useTransform(scrollY, [0, 220], [1, 0]);

  // Bottom metadata fade out on scroll
  const metaOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const metaY = useTransform(scrollY, [0, 80], [0, 15]);
  const pointerEvents = useTransform(scrollY, (y) => (y > 60 ? "none" : "auto"));

  // Scroll-driven Scramble & Reverse Unscramble (RAF throttled for smooth scrolling)
  useEffect(() => {
    let isClean = true;
    let rafId: number | null = null;
    const len = HERO_TEXT.length;

    const unsubscribe = scrollY.on("change", (y) => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (y <= 2) {
          if (!isClean && textRef.current) {
            textRef.current.textContent = HERO_TEXT;
            isClean = true;
          }
        } else if (y <= 230) {
          isClean = false;
          if (textRef.current) {
            const progress = Math.min(1, Math.max(0, y / 200));
            const scrambleCount = Math.floor(progress * len);

            let out = "";
            for (let i = 0; i < len; i++) {
              const ch = HERO_TEXT[i];
              if (ch === " " || ch === "'") {
                out += ch;
              } else if (i < scrambleCount) {
                out += CHARS[Math.floor(Math.random() * CHARS.length)];
              } else {
                out += ch;
              }
            }
            textRef.current.textContent = out;
          }
        }
      });
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      unsubscribe();
    };
  }, [scrollY]);

  return (
    <section data-theme="dark" className="relative w-full h-[100dvh] sm:min-h-[700px] bg-black text-neutral-100 flex flex-col justify-between px-5 sm:px-12 pt-20 sm:pt-28 pb-5 sm:pb-8 select-none overflow-hidden">
      {/* Light Ambient Red Atmosphere behind Robot (GPU composited) */}
      <div className="absolute right-0 top-1/4 bottom-0 w-full sm:w-[65%] pointer-events-none z-0 overflow-hidden opacity-80 transform-gpu">
        <div className="absolute -right-20 top-10 w-[600px] h-[600px] rounded-full bg-red-700/15 blur-[120px] transform-gpu" />
        <div className="absolute right-40 bottom-10 w-[450px] h-[450px] rounded-full bg-red-900/20 blur-[100px] transform-gpu" />
      </div>

      {/* Interactive 3D AI Robot Assistant with Cursor Tracking & Scroll Camera Zoom */}
      <Robot3DCanvas />

      {/* Main Content Overlay Container */}
      <div className="max-w-8xl mx-auto w-full flex-1 flex flex-col justify-between relative z-20 pointer-events-none">
        {/* Hero Title Typography (Smaller, Regular Weight) */}
        <div className="flex-1 flex items-start sm:items-center max-w-2xl lg:max-w-3xl pt-6 sm:pt-0 sm:my-auto">
          <motion.h1
            ref={textRef}
            style={{ y: titleY, opacity: titleOpacity }}
            className="font-mg12-regular text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight text-white leading-[1.25] pointer-events-auto"
          >
            We build premium web experiences for the world&apos;s most ambitious tech companies.
          </motion.h1>
        </div>

        {/* Bottom Copyright & UTC Bar */}
        <div className="pointer-events-auto pb-1.5 sm:pb-0">
          <CopyrightBar variant="hero" style={{ opacity: metaOpacity, y: metaY, pointerEvents }} />
        </div>
      </div>
    </section>
  );
}
