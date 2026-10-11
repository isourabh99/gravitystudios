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

  // Scroll-driven Scramble & Reverse Unscramble (reactive listener, zero idle CPU overhead)
  useEffect(() => {
    let isClean = true;
    const len = HERO_TEXT.length;

    const unsubscribe = scrollY.on("change", (y) => {
      if (y <= 2) {
        if (!isClean && textRef.current) {
          textRef.current.textContent = HERO_TEXT;
          isClean = true;
        }
      } else if (y <= 230) {
        isClean = false;
        if (textRef.current) {
          // Progress across 0px to 200px scroll range
          const progress = Math.min(1, Math.max(0, y / 200));
          const scrambleCount = Math.floor(progress * len);

          let out = "";
          for (let i = 0; i < len; i++) {
            const ch = HERO_TEXT[i];
            if (ch === " " || ch === "'") {
              out += ch;
            } else if (i < scrambleCount) {
              // Scroll Down: Scramble moves from starting (index 0) to ending (index N)
              out += CHARS[Math.floor(Math.random() * CHARS.length)];
            } else {
              // Scroll Up: Clean text restores in reverse from ending (index N) to starting (index 0)
              out += ch;
            }
          }
          textRef.current.textContent = out;
        }
      }
    });

    return () => unsubscribe();
  }, [scrollY]);

  return (
    <section data-theme="dark" className="relative w-full h-screen min-h-[700px] bg-black text-neutral-100 flex flex-col justify-between px-6 sm:px-12 pt-28 pb-6 select-none overflow-hidden">
      {/* Light Ambient Red Atmosphere behind Robot */}
      <div className="absolute right-0 top-1/4 bottom-0 w-full sm:w-[65%] pointer-events-none z-0 overflow-hidden opacity-80">
        <div className="absolute -right-20 top-10 w-[600px] h-[600px] rounded-full bg-red-700/15 blur-[160px]" />
        <div className="absolute right-40 bottom-10 w-[450px] h-[450px] rounded-full bg-red-900/20 blur-[140px]" />
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
        <div className="pointer-events-auto">
          <CopyrightBar variant="hero" style={{ opacity: metaOpacity, y: metaY, pointerEvents }} />
        </div>
      </div>
    </section>
  );
}
