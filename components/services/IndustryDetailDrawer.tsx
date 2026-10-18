"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CtaButton from "@/components/ui/CtaButton";
import CloseButton from "@/components/ui/CloseButton";

export interface IndustryDetailData {
  id: string;
  num: string;
  title: string;
  category: string;
  imageUrl: string;
  accentColor: string;
  link: string;
  alt: string;
  tagline: string;
  description?: string;
  overview: string;
  approach: {
    challenge: string;
    solution: string;
  };
  results: { value: string; label: string }[];
  deliverables: string[];
  metadata: {
    domain: string;
    location: string;
    year: string;
    type: string;
  };
  technologies: string[];
  quote?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface IndustryDetailDrawerProps {
  industry: IndustryDetailData | null;
  isOpen: boolean;
  onClose: () => void;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%*+=/<>/_";
const isPunctuationOrSpace = (ch: string) => /[\s.,:;·—\-'"/\\()[\]{}]/.test(ch);
const getRandomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

interface DrawerScrambleTextProps {
  text: string;
  trigger: boolean;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "span" | "p" | "h1" | "div";
}

/**
 * High-performance Scramble & Settle text component matching ProjectDetailDrawer.
 * Triggers progressive decryption on scroll and locks cleanly into final text.
 */
function DrawerScrambleText({
  text,
  trigger,
  delay = 0,
  duration = 600,
  className = "",
  as: Component = "span",
}: DrawerScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!trigger) {
      hasTriggeredRef.current = false;
      setDisplayText(text);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    }
  }, [trigger, text]);

  useEffect(() => {
    if (!trigger || hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const startTime = performance.now();
    let lastUpdate = 0;
    const FRAME_INTERVAL = 30;

    const tick = (now: number) => {
      const elapsed = now - startTime;

      if (elapsed < delay) {
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

      const progress = Math.min(1, (elapsed - delay) / duration);
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

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [trigger, text, delay, duration]);

  return <Component className={className}>{displayText}</Component>;
}

export default function IndustryDetailDrawer({
  industry,
  isOpen,
  onClose,
}: IndustryDetailDrawerProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const openedAtRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      openedAtRef.current = performance.now();
    }
  }, [isOpen]);

  // Reset scroll & scramble state when drawer opens or industry changes
  useEffect(() => {
    if (isOpen) {
      setHasScrolled(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [isOpen, industry?.id]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.scrollTop;
    if (!hasScrolled && top > 6) {
      setHasScrolled(true);
    } else if (hasScrolled && top === 0) {
      setHasScrolled(false);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!hasScrolled && e.deltaY > 0) {
      setHasScrolled(true);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Prevent synthetic ghost click from touch release that just opened the drawer
    if (performance.now() - openedAtRef.current < 450) {
      return;
    }
    onClose();
  };

  if (!industry) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dimmed Translucent Backdrop matching ProjectDetailDrawer */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-[2px] cursor-pointer select-none"
            aria-hidden="true"
          />

          {/* Slide-over Drawer from Right matching ProjectDetailDrawer */}
          <motion.aside
            key="drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-[130] w-full sm:w-[580px] md:w-[680px] lg:w-[780px] xl:w-[860px] max-w-full h-full bg-white text-neutral-900 shadow-2xl flex flex-col overflow-hidden select-none"
            role="dialog"
            aria-modal="true"
            aria-label={`${industry.title} Sector Dossier`}
          >
            {/* Top Close Button (Black square with white circle hover at top-left edge) */}
            <div className="absolute top-0 left-0 z-40">
              <CloseButton onClick={onClose} variant="dark" ariaLabel="Close Industry Details" />
            </div>

            {/* Scrollable Drawer Body with scrollbar hidden & Lenis prevented internally */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              onWheel={handleWheel}
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar"
            >
              {/* 1. TOP HERO MEDIA SECTION */}
              <div className="relative w-full bg-black aspect-16/10 overflow-hidden border-b border-neutral-300">
                <img
                  src={industry.imageUrl}
                  alt={industry.alt}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/90">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: industry.accentColor }} />
                    <span className="tracking-wider uppercase">{industry.category}</span>
                  </span>
                  <span className="font-semibold tracking-widest text-[#ED3327]">GRAVITY™ DOSSIER</span>
                </div>
              </div>

              {/* 2. MAIN EDITORIAL CONTENT (Matches ProjectDetailDrawer exact format) */}
              <div className="p-6 sm:p-10 lg:p-12 space-y-10">
                {/* Header Tag, Title & Subtitle with scramble on scroll */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <DrawerScrambleText
                      text={`${industry.num} / 06`}
                      trigger={hasScrolled}
                      delay={0}
                      duration={400}
                      className="font-mono text-xs text-[#ED3327] font-semibold tracking-wider"
                    />
                    <DrawerScrambleText
                      text={industry.category}
                      trigger={hasScrolled}
                      delay={50}
                      duration={450}
                      className="font-mono text-xs text-neutral-400 uppercase tracking-widest"
                    />
                  </div>

                  <h1 className="font-mg12-regular text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight leading-tight">
                    <DrawerScrambleText
                      text={industry.title}
                      trigger={hasScrolled}
                      delay={70}
                      duration={600}
                    />
                  </h1>

                  <p className="font-mg12-regular text-sm sm:text-base md:text-lg text-neutral-600 font-light leading-relaxed">
                    <DrawerScrambleText
                      text={industry.tagline}
                      trigger={hasScrolled}
                      delay={120}
                      duration={650}
                    />
                  </p>
                </div>

                {/* Overview Paragraph */}
                <div className="space-y-4 font-mg12-regular text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
                  <DrawerScrambleText
                    as="p"
                    text={industry.overview}
                    trigger={hasScrolled}
                    delay={180}
                    duration={750}
                  />
                </div>

                {/* 3. TWO-COLUMN APPROACH & OUTCOME SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-200">
                  {/* Left Column: Our Approach */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#ED3327] rounded-none shrink-0" />
                      <DrawerScrambleText
                        text="OUR APPROACH"
                        trigger={hasScrolled}
                        delay={220}
                        duration={400}
                        className="font-mono text-[11px] sm:text-xs text-neutral-900 font-bold uppercase tracking-wider"
                      />
                    </div>
                    <DrawerScrambleText
                      as="p"
                      text={industry.approach.challenge}
                      trigger={hasScrolled}
                      delay={260}
                      duration={700}
                      className="font-mg12-regular text-xs sm:text-sm text-neutral-600 leading-relaxed font-light"
                    />
                    <DrawerScrambleText
                      as="p"
                      text={industry.approach.solution}
                      trigger={hasScrolled}
                      delay={300}
                      duration={700}
                      className="font-mg12-regular text-xs sm:text-sm text-neutral-600 leading-relaxed font-light"
                    />
                  </div>

                  {/* Right Column: The Outcome */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#ED3327] rounded-none shrink-0" />
                      <DrawerScrambleText
                        text="THE OUTCOME"
                        trigger={hasScrolled}
                        delay={240}
                        duration={400}
                        className="font-mono text-[11px] sm:text-xs text-neutral-900 font-bold uppercase tracking-wider"
                      />
                    </div>

                    <div className="space-y-3">
                      {industry.results.map((res, i) => (
                        <div key={i} className="pb-2 border-b border-neutral-100 last:border-none">
                          <DrawerScrambleText
                            text={res.value}
                            trigger={hasScrolled}
                            delay={280 + i * 40}
                            duration={500}
                            className="font-mg12-bold text-xl sm:text-2xl text-neutral-900 block leading-tight font-bold"
                          />
                          <DrawerScrambleText
                            text={res.label}
                            trigger={hasScrolled}
                            delay={320 + i * 40}
                            duration={500}
                            className="font-mono text-[11px] text-neutral-500 uppercase tracking-wide block"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. WHAT YOU GET (DELIVERABLES LIST WITH ARROWS) */}
                <div className="pt-8 border-t border-neutral-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#ED3327] rounded-none shrink-0" />
                    <DrawerScrambleText
                      text="WHAT YOU GET"
                      trigger={hasScrolled}
                      delay={350}
                      duration={400}
                      className="font-mono text-[11px] sm:text-xs text-neutral-900 font-bold uppercase tracking-wider"
                    />
                  </div>

                  <ul className="divide-y divide-neutral-200">
                    {industry.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="py-3 flex items-start gap-3 font-mg12-regular text-xs sm:text-sm text-neutral-800 font-light"
                      >
                        <span className="text-[#ED3327] font-bold shrink-0 mt-0.5">→</span>
                        <DrawerScrambleText
                          text={item}
                          trigger={hasScrolled}
                          delay={380 + idx * 30}
                          duration={550}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5. METADATA GRID */}
                <div className="pt-8 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider mb-1">
                      DOMAIN
                    </span>
                    <DrawerScrambleText
                      text={industry.metadata.domain}
                      trigger={hasScrolled}
                      delay={420}
                      duration={500}
                      className="font-mg12-bold text-xs sm:text-sm text-neutral-900 block font-bold"
                    />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider mb-1">
                      LOCATION
                    </span>
                    <DrawerScrambleText
                      text={industry.metadata.location}
                      trigger={hasScrolled}
                      delay={450}
                      duration={500}
                      className="font-mg12-bold text-xs sm:text-sm text-neutral-900 block font-bold"
                    />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider mb-1">
                      YEAR
                    </span>
                    <DrawerScrambleText
                      text={industry.metadata.year}
                      trigger={hasScrolled}
                      delay={480}
                      duration={500}
                      className="font-mg12-bold text-xs sm:text-sm text-neutral-900 block font-bold"
                    />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider mb-1">
                      TYPE
                    </span>
                    <DrawerScrambleText
                      text={industry.metadata.type}
                      trigger={hasScrolled}
                      delay={510}
                      duration={500}
                      className="font-mg12-bold text-xs sm:text-sm text-neutral-900 block font-bold"
                    />
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {industry.technologies.map((tech, idx) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#F4F4F0] border border-neutral-300 font-mono text-[10px] sm:text-[11px] text-neutral-700"
                    >
                      <DrawerScrambleText
                        text={tech}
                        trigger={hasScrolled}
                        delay={530 + idx * 25}
                        duration={450}
                      />
                    </span>
                  ))}
                </div>

                {/* Client Quote */}
                {industry.quote && (
                  <div className="p-6 bg-[#F4F4F0] border-l-2 border-[#ED3327] space-y-2">
                    <DrawerScrambleText
                      as="p"
                      text={`“${industry.quote.quote}”`}
                      trigger={hasScrolled}
                      delay={550}
                      duration={700}
                      className="font-mg12-regular text-sm sm:text-base italic text-neutral-800 font-light"
                    />
                    <div className="font-mono text-xs text-neutral-600">
                      <DrawerScrambleText
                        text={industry.quote.author}
                        trigger={hasScrolled}
                        delay={600}
                        duration={500}
                        className="font-semibold text-neutral-900"
                      />{" "}
                      —{" "}
                      <DrawerScrambleText
                        text={industry.quote.role}
                        trigger={hasScrolled}
                        delay={630}
                        duration={500}
                      />
                    </div>
                  </div>
                )}

                {/* 6. BOTTOM GET IN TOUCH ACTION (Exact Match to ProjectDetailDrawer) */}
                <div className="pt-10 pb-6 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-[#ED3327] font-semibold tracking-wider uppercase block">
                      HAVE A SIMILAR PROJECT IN {industry.title.toUpperCase()}?
                    </span>
                    <p className="font-mg12-regular text-sm text-neutral-600 font-light">
                      Let&apos;s build an ambitious digital experience together.
                    </p>
                  </div>

                  <CtaButton
                    href={`/contact?sector=${industry.id}`}
                    variant="brand"
                    shape="square"
                    className="w-full sm:w-auto px-8 py-4 shrink-0 shadow-xl"
                  >
                    Get in touch ↗
                  </CtaButton>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
