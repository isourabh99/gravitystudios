"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useUniversalLoader } from "@/components/loader/UniversalLoaderWrapper";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%*+=/<>/_";

const isPunctuationOrSpace = (ch: string) => {
  return /[\s.,:;·—\-'"/\\()[\]{}]/.test(ch);
};

const getRandomGlyph = () => {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
};

interface ScrambleRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "span" | "p" | "div";
  isReady?: boolean;
}

function ScrambleReveal({
  text,
  delay = 0,
  duration = 700,
  className = "",
  as: Component = "span",
  isReady = true,
}: ScrambleRevealProps) {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);

  const runScramble = useCallback(
    (customDelay: number, customDuration: number) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      const startTime = performance.now();
      let lastUpdate = 0;
      const FRAME_INTERVAL = 32; // ~30fps scramble update for crisp reading cadence

      const tick = (now: number) => {
        const elapsed = now - startTime;

        if (elapsed < customDelay) {
          if (now - lastUpdate >= FRAME_INTERVAL) {
            lastUpdate = now;
            const scrambled = text
              .split("")
              .map((ch) => (isPunctuationOrSpace(ch) ? ch : getRandomGlyph()))
              .join("");
            setDisplayText(scrambled);
          }
          frameRef.current = requestAnimationFrame(tick);
          return;
        }

        const progress = Math.min(1, (elapsed - customDelay) / customDuration);
        const resolvedCount = Math.floor(progress * text.length);

        if (now - lastUpdate >= FRAME_INTERVAL || progress >= 1) {
          lastUpdate = now;
          const current = text
            .split("")
            .map((ch, idx) => {
              if (isPunctuationOrSpace(ch)) return ch;
              if (idx < resolvedCount) return ch;
              return getRandomGlyph();
            })
            .join("");
          setDisplayText(current);
        }

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayText(text);
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    },
    [text]
  );

  // Scramble strictly after loader finishes (isReady becomes true)
  useEffect(() => {
    if (!isReady) {
      // While loader is animating over the screen, keep text scrambled asynchronously
      const raf = requestAnimationFrame(() => {
        const scrambledPlaceholder = text
          .split("")
          .map((ch) => (isPunctuationOrSpace(ch) ? ch : getRandomGlyph()))
          .join("");
        setDisplayText(scrambledPlaceholder);
      });
      return () => cancelAnimationFrame(raf);
    }

    // Loader is finished, kick off the scramble reveal animation
    runScramble(delay, duration);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isReady, delay, duration, runScramble, text]);

  return <Component className={className}>{displayText}</Component>;
}

export interface ProjectsHeroProps {
  projectCount?: number;
}

export default function ProjectsHero({ projectCount = 8 }: ProjectsHeroProps) {
  const { isLoading } = useUniversalLoader();
  const isReady = !isLoading;
  const formattedCount = String(projectCount).padStart(2, "0");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pb-16 sm:pb-24 border-b border-neutral-300">
      {/* Left Column: Subtitle Tag */}
      <div className="lg:col-span-4">
        <ScrambleReveal
          text={`SELECTED WORK · ${formattedCount} PROJECTS`}
          delay={100}
          duration={500}
          isReady={isReady}
          className="font-mono text-xs sm:text-[13px] tracking-[0.2em] text-neutral-500 uppercase select-none block"
        />
      </div>

      {/* Right Column: Bold Editorial Headline & Narrative */}
      <div className="lg:col-span-8 space-y-6 sm:space-y-8">
        <h1 className="font-mg12-regular text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] leading-[1.15] tracking-tight text-neutral-900">
          <ScrambleReveal
            text="Websites, brands and 3D for "
            delay={180}
            duration={650}
            isReady={isReady}
          />
          <ScrambleReveal
            text="ambitious"
            delay={380}
            duration={480}
            isReady={isReady}
            className="text-[#ED3327] font-mg12-bold"
          />
          <ScrambleReveal
            text=" tech companies at pivotal moments."
            delay={500}
            duration={750}
            isReady={isReady}
          />
        </h1>

        <div className="space-y-4 max-w-2xl font-mg12-regular text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
          <ScrambleReveal
            as="p"
            text="At Gravity, we partner with startups and SMBs at pivotal moments in their growth: raising funds, launching a new product, building a brand identity."
            delay={650}
            duration={850}
            isReady={isReady}
          />
          <ScrambleReveal
            as="p"
            text="At these strategic stages, a well-crafted website does more than look good. It structures a message, asserts a posture, and strengthens a company's credibility with clients, partners, and investors."
            delay={850}
            duration={950}
            isReady={isReady}
          />
        </div>

        {/* Clients List Inline Row */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-t border-neutral-300/80">
          <ScrambleReveal
            text="Clients"
            delay={1000}
            duration={350}
            isReady={isReady}
            className="font-mono text-xs text-neutral-900 font-semibold uppercase tracking-wider shrink-0"
          />
          <ScrambleReveal
            as="p"
            text="Hylight, Artefact area, Une Autre Île Productions, Skipper NDT, blink, Alt-a, Kestrix, BotBlox"
            delay={1100}
            duration={750}
            isReady={isReady}
            className="font-mg12-regular text-xs sm:text-sm text-neutral-500 font-light leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
