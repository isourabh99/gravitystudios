"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceDetailData } from "@/data/servicesShowcaseData";
import CtaButton from "@/components/ui/CtaButton";
import CloseButton from "@/components/ui/CloseButton";

export interface ServiceDetailDrawerProps {
  service: ServiceDetailData | null;
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

export default function ServiceDetailDrawer({
  service,
  isOpen,
  onClose,
}: ServiceDetailDrawerProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Reset scroll position on opening
  useEffect(() => {
    if (isOpen) {
      setHasScrolled(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      const t = setTimeout(() => setHasScrolled(true), 120);
      return () => clearTimeout(t);
    }
  }, [isOpen, service?.id]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.currentTarget.scrollTop > 10 && !hasScrolled) {
      setHasScrolled(true);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const openedAtRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      openedAtRef.current = performance.now();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Prevent synthetic ghost click from touch release that just opened the drawer
    if (performance.now() - openedAtRef.current < 450) {
      return;
    }
    onClose();
  };

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-[3px] cursor-pointer select-none"
            aria-hidden="true"
          />

          {/* Slide-over Drawer from Right matching IndustryDetailDrawer & ProjectDetailDrawer */}
          <motion.aside
            key="drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-[130] w-full sm:w-[580px] md:w-[680px] lg:w-[780px] xl:w-[860px] max-w-full h-full bg-white text-neutral-900 shadow-2xl flex flex-col overflow-hidden select-none"
            role="dialog"
            aria-modal="true"
            aria-label={`${service.title} Service Dossier`}
          >
            {/* Top Close Button (Black square with white circle hover at top-left edge) */}
            <div className="absolute top-0 left-0 z-40">
              <CloseButton
                onClick={onClose}
                variant="dark"
                ariaLabel="Close Service Details"
              />
            </div>

            {/* Scrollable Drawer Body with Lenis scroll prevented */}
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
                  src={service.imageUrl}
                  alt={service.alt}
                  className="w-full h-full object-cover select-none pointer-events-none filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/90">
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: service.accentColor }}
                    />
                    <span className="tracking-wider uppercase font-medium">
                      {service.category}
                    </span>
                  </span>
                  <span className="font-semibold tracking-widest text-[#ED3327]">
                    GRAVITY™ CAPABILITY DOSSIER
                  </span>
                </div>
              </div>

              {/* 2. MAIN EDITORIAL CONTENT */}
              <div className="p-6 sm:p-10 lg:p-12 space-y-10">
                {/* Header Tag, Title & Subtitle with scramble on scroll */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <DrawerScrambleText
                      text={`${service.num} / 10`}
                      trigger={hasScrolled}
                      delay={0}
                      duration={400}
                      className="font-mono text-xs text-[#ED3327] font-semibold tracking-wider"
                    />
                    <DrawerScrambleText
                      text={service.category}
                      trigger={hasScrolled}
                      delay={50}
                      duration={450}
                      className="font-mono text-xs text-neutral-400 uppercase tracking-widest"
                    />
                  </div>

                  <h1 className="font-mg12-regular text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight leading-tight">
                    <DrawerScrambleText
                      text={service.title}
                      trigger={hasScrolled}
                      delay={70}
                      duration={600}
                    />
                  </h1>

                  <p className="font-mg12-regular text-sm sm:text-base md:text-lg text-neutral-600 font-light leading-relaxed">
                    <DrawerScrambleText
                      text={service.tagline}
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
                    text={service.overview}
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
                      text={service.approach.challenge}
                      trigger={hasScrolled}
                      delay={260}
                      duration={700}
                      className="font-mg12-regular text-xs sm:text-sm text-neutral-600 leading-relaxed font-light"
                    />
                    <DrawerScrambleText
                      as="p"
                      text={service.approach.solution}
                      trigger={hasScrolled}
                      delay={300}
                      duration={700}
                      className="font-mg12-regular text-xs sm:text-sm text-neutral-600 leading-relaxed font-light"
                    />
                  </div>

                  {/* Right Column: Key Benchmarks */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#ED3327] rounded-none shrink-0" />
                      <DrawerScrambleText
                        text="KEY BENCHMARKS"
                        trigger={hasScrolled}
                        delay={240}
                        duration={400}
                        className="font-mono text-[11px] sm:text-xs text-neutral-900 font-bold uppercase tracking-wider"
                      />
                    </div>

                    <div className="space-y-3">
                      {service.results.map((res, i) => (
                        <div
                          key={i}
                          className="pb-2 border-b border-neutral-100 last:border-none"
                        >
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

                {/* 4. WHAT YOU GET (DELIVERABLES LIST) */}
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
                    {service.deliverables.map((item, idx) => (
                      <li
                        key={idx}
                        className="py-3 flex items-start gap-3 font-mg12-regular text-xs sm:text-sm text-neutral-800 font-light"
                      >
                        <span className="text-[#ED3327] font-bold shrink-0 mt-0.5">
                          →
                        </span>
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
                      text={service.metadata.domain}
                      trigger={hasScrolled}
                      delay={420}
                      duration={500}
                      className="font-mg12-bold text-xs sm:text-sm text-neutral-900 block font-bold"
                    />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] text-neutral-400 uppercase tracking-wider mb-1">
                      TIMELINE
                    </span>
                    <DrawerScrambleText
                      text={service.metadata.timeline}
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
                      text={service.metadata.year}
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
                      text={service.metadata.type}
                      trigger={hasScrolled}
                      delay={510}
                      duration={500}
                      className="font-mg12-bold text-xs sm:text-sm text-neutral-900 block font-bold"
                    />
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {service.technologies.map((tech, idx) => (
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
                {service.quote && (
                  <div className="p-6 bg-[#F4F4F0] border-l-2 border-[#ED3327] space-y-2">
                    <DrawerScrambleText
                      as="p"
                      text={`“${service.quote.quote}”`}
                      trigger={hasScrolled}
                      delay={550}
                      duration={700}
                      className="font-mg12-regular text-sm sm:text-base italic text-neutral-800 font-light"
                    />
                    <div className="font-mono text-xs text-neutral-600">
                      <DrawerScrambleText
                        text={service.quote.author}
                        trigger={hasScrolled}
                        delay={600}
                        duration={500}
                        className="font-semibold text-neutral-900"
                      />{" "}
                      —{" "}
                      <DrawerScrambleText
                        text={service.quote.role}
                        trigger={hasScrolled}
                        delay={630}
                        duration={500}
                      />
                    </div>
                  </div>
                )}

                {/* 6. BOTTOM GET IN TOUCH ACTION */}
                <div className="pt-10 pb-6 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-[#ED3327] font-semibold tracking-wider uppercase block">
                      NEED THIS DISCIPLINE FOR YOUR NEXT PROJECT?
                    </span>
                    <p className="font-mg12-regular text-sm text-neutral-600 font-light">
                      Let&apos;s build an ambitious digital flagship together.
                    </p>
                  </div>

                  <CtaButton
                    href={`/contact?service=${service.id}`}
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
