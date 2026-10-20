"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import CopyrightBar from "@/components/ui/CopyrightBar";
import ScrambleText from "@/components/ui/ScrambleText";

const Robot3DCanvas = dynamic(() => import("@/components/hero/Robot3DCanvas"), {
  ssr: false,
});

const HERO_TEXT = "We build premium web experiences for the world's most ambitious tech companies.";
const HERO_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&*+=/<>[]";

export default function Hero() {
  const { scrollY } = useScroll();
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const triggeredRef = useRef(false);

  // Text translation & fade out on scroll
  const titleY = useTransform(scrollY, [0, 250], [0, -60]);
  const titleOpacity = useTransform(scrollY, [0, 220], [1, 0]);

  // Bottom metadata fade out on scroll
  const metaOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const metaY = useTransform(scrollY, [0, 80], [0, 15]);
  const pointerEvents = useTransform(scrollY, (y) => (y > 60 ? "none" : "auto"));

  // Trigger scramble animation once as soon as user starts scrolling down
  // Animation plays to 100% completion on its own without getting stuck
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      if (y > 6 && !triggeredRef.current) {
        triggeredRef.current = true;
        setScrambleTrigger(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [scrollY]);

  return (
    <section data-theme="dark" className="relative w-full h-[100dvh] sm:min-h-[700px] bg-black text-neutral-100 flex flex-col justify-between px-6 sm:px-12 pt-20 sm:pt-28 pb-5 sm:pb-8 select-none overflow-hidden">
      {/* Light Ambient Red Atmosphere behind Robot (GPU composited) */}
      <div className="absolute right-0 top-1/4 bottom-0 w-full sm:w-[65%] pointer-events-none z-0 overflow-hidden opacity-80 transform-gpu">
        <div className="absolute -right-20 top-10 w-[600px] h-[600px] rounded-full bg-red-700/15 blur-[120px] transform-gpu" />
        <div className="absolute right-40 bottom-10 w-[450px] h-[450px] rounded-full bg-red-900/20 blur-[100px] transform-gpu" />
      </div>

      {/* Interactive 3D AI Robot Assistant with Cursor Tracking & Scroll Camera Zoom */}
      <Robot3DCanvas />

      {/* Main Content Overlay Container */}
      <div className="max-w-8xl mx-auto w-full flex-1 flex flex-col justify-between relative z-20 pointer-events-none">
        {/* Hero Title Typography & CTAs */}
        <div className="flex-1 flex flex-col items-start justify-start sm:justify-center max-w-2xl lg:max-w-3xl pt-6 sm:pt-0 sm:my-auto pointer-events-auto">
          <motion.h1
            style={{ y: titleY, opacity: titleOpacity }}
            className="font-mg12-regular text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight text-white leading-[1.25]"
          >
            <ScrambleText
              text={HERO_TEXT}
              trigger={scrambleTrigger}
              interactive={false}
              speed={1.25}
              chars={HERO_CHARS}
            />
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
