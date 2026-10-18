"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Project, PROJECTS } from "@/data/projectsData";
import { useUniversalLoader } from "@/components/loader/UniversalLoaderWrapper";
import CopyrightBar from "@/components/ui/CopyrightBar";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%*+=/<>/_";

const isPunctuationOrSpace = (ch: string) => /[\s.,:;·—\-'"/\\()[\]{}]/.test(ch);

const getRandomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

interface ScrambleRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "span" | "p" | "h1" | "div";
  isReady?: boolean;
}

function ScrambleReveal({
  text,
  delay = 0,
  duration = 260,
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
      const FRAME_INTERVAL = 24;

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

  useEffect(() => {
    if (!isReady) {
      const raf = requestAnimationFrame(() => {
        const scrambledPlaceholder = text
          .split("")
          .map((ch) => (isPunctuationOrSpace(ch) ? ch : getRandomGlyph()))
          .join("");
        setDisplayText(scrambledPlaceholder);
      });
      return () => cancelAnimationFrame(raf);
    }

    runScramble(delay, duration);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isReady, delay, duration, runScramble, text]);

  return <Component className={className}>{displayText}</Component>;
}

export interface ProjectsHeroBannerProps {
  onSelectProject?: (project: Project) => void;
  onExploreClick?: () => void;
}

export default function ProjectsHeroBanner({
  onSelectProject,
  onExploreClick,
}: ProjectsHeroBannerProps) {
  const { isLoading } = useUniversalLoader();
  const isReady = !isLoading;

  // Wave perspective slide active index with CONTINUOUS AUTOPLAY
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Touch / Drag handling for 3D wave track
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 40) {
      if (touchDeltaX.current > 0) {
        // swipe right -> previous slide
        setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
      } else {
        // swipe left -> next slide
        setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
      }
    }
  };

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];

  return (
    <div className="relative w-full h-screen min-h-[680px] max-h-[1050px] bg-[#030303] text-white flex flex-col justify-between select-none overflow-hidden">
      {/* 1. DENIM / TWILL WOVEN VECTOR DOTS TEXTURE (Jeans / pant fabric weave pattern) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-55"
        style={{
          backgroundColor: "#030303",
          backgroundImage: `
            radial-gradient(rgba(255, 255, 255, 0.45) 0.85px, transparent 0.85px),
            radial-gradient(rgba(255, 255, 255, 0.22) 0.85px, transparent 0.85px)
          `,
          backgroundSize: "8px 8px, 8px 8px",
          backgroundPosition: "0 0, 4px 4px",
        }}
      />

      {/* 2. DITHERED CLOUD / NEBULA GRAPHIC (Top Right corner matching screenshot) */}
      <div className="pointer-events-none absolute top-0 right-0 w-[380px] sm:w-[540px] md:w-[680px] h-[280px] sm:h-[400px] z-0 opacity-50 mix-blend-screen overflow-hidden">
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="dither-noise" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.035"
                numOctaves="4"
                result="noise"
              />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -6"
                result="dither"
              />
              <feComposite in="SourceGraphic" in2="dither" operator="in" />
            </filter>
            <radialGradient
              id="cloud-glow"
              cx="75%"
              cy="25%"
              r="60%"
              fx="80%"
              fy="20%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#cccccc" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#666666" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse
            cx="480"
            cy="120"
            rx="240"
            ry="140"
            fill="url(#cloud-glow)"
            filter="url(#dither-noise)"
          />
        </svg>
      </div>

      {/* Soft Vignette / Gradient overlays */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent z-10" />

      {/* 3. REUSED COPYRIGHT BAR (No duplicate custom bar, uses existing CopyrightBar component) */}
      <div className="relative z-20 w-full max-w-8xl mx-auto px-6 sm:px-12 pt-24 sm:pt-28">
        <CopyrightBar variant="default" className="text-neutral-400" />
      </div>

      {/* 4. CENTER HERO HEADLINE: REFINED COMPACT SIZE WITH SCRAMBLE REVEAL */}
      <div className="relative z-20 w-full max-w-3xl mx-auto px-6 sm:px-12 text-center my-auto py-3 sm:py-5">
        <h1 className="font-mg12-regular text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight leading-[1.2] text-white">
          <span className="block mb-1 text-white">
            <ScrambleReveal
              text="Our projects"
              delay={40}
              duration={220}
              isReady={isReady}
            />
          </span>
          <span className="block font-mg12-regular text-neutral-200">
            <ScrambleReveal
              text="from web design, CRM to 3D."
              delay={120}
              duration={260}
              isReady={isReady}
              className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-neutral-400"
            />
          </span>
        </h1>
      </div>

      {/* 5. 3D CURVED WAVE VIDEO SLIDES TRACK (Amphitheater wave curve with RGB chromatic aberration) */}
      <div
        className="relative z-20 w-full overflow-hidden pb-4 sm:pb-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative w-full h-[220px] xs:h-[240px] sm:h-[290px] md:h-[320px] lg:h-[350px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          {PROJECTS.map((project, idx) => {
            // Distance from active center slide (-3 to 3)
            const count = PROJECTS.length;
            let offset = (idx - activeIndex) % count;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // 3D Wave curve calculations:
            // Center is straight and elevated, sides curve outward (rotateY) and push back (translateZ)
            const rotateY = offset * -18;
            const translateZ = isCenter ? 30 : -Math.abs(offset) * 120;
            const translateX = offset * (typeof window !== "undefined" && window.innerWidth < 640 ? 210 : 360);
            const translateY = Math.sin(Math.abs(offset) * 0.9) * 18;
            const scale = isCenter ? 1.05 : 0.88 - Math.abs(offset) * 0.06;
            const opacity = isCenter ? 1 : Math.max(0.4, 0.85 - Math.abs(offset) * 0.25);
            const zIndex = 20 - Math.abs(offset);

            return (
              <div
                key={project.number}
                onClick={() => {
                  if (isCenter) {
                    if (onSelectProject) onSelectProject(project);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                className={`absolute w-[260px] xs:w-[300px] sm:w-[400px] md:w-[460px] lg:w-[500px] aspect-16/10 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
                  isCenter ? "ring-1 ring-white/30 shadow-2xl" : "hover:opacity-85"
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
              >
                {/* Chromatic aberration edge lines */}
                <div className="relative w-full h-full bg-neutral-900 border border-neutral-700 overflow-hidden shadow-2xl group">
                  {/* Real Project Video */}
                  <video
                    src={project.video.src}
                    poster={project.video.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* RGB Chromatic Aberration Glow Overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(237,51,39,0.2) 0%, transparent 50%, rgba(0,255,255,0.2) 100%)",
                    }}
                  />

                  {/* Top Badge: Project Number & Domain */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[9px] sm:text-[10px] text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ED3327] animate-pulse" />
                    <span className="font-bold text-white">{project.number}</span>
                    <span className="text-neutral-500">·</span>
                    <span className="uppercase tracking-wider">{project.category}</span>
                  </div>

                  {/* Center CTA button on active slide */}
                  {isCenter && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider shadow-xl hover:bg-[#ED3327] hover:text-white transition-colors">
                        View Project ↗
                      </span>
                    </div>
                  )}

                  {/* Bottom Title Bar */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-2.5 sm:p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-baseline justify-between">
                    <div>
                      <h3 className="font-mg12-regular text-sm sm:text-base text-white tracking-tight leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] font-mg12-regular text-neutral-400 line-clamp-1">
                        {project.tagline}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-400 shrink-0 ml-2">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Dots & Controls */}
        <div className="w-full max-w-8xl mx-auto px-6 sm:px-12 pt-3 flex items-center justify-between text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">{activeProject.number}</span>
            <span>/</span>
            <span>{String(PROJECTS.length).padStart(2, "0")}</span>
            <span className="hidden sm:inline text-neutral-400 ml-2 uppercase tracking-wider">
              {activeProject.title} — {activeProject.category}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
              }
              aria-label="Previous Project"
              className="w-8 h-8 rounded-full border border-neutral-700 bg-black/60 hover:bg-white hover:text-black hover:border-white text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev + 1) % PROJECTS.length)}
              aria-label="Next Project"
              className="w-8 h-8 rounded-full border border-neutral-700 bg-black/60 hover:bg-white hover:text-black hover:border-white text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* 6. BOTTOM SCROLL ARROW TO EXPLORE INDEX */}
      <div className="relative z-20 pb-4 text-center">
        <button
          type="button"
          onClick={() => {
            if (onExploreClick) {
              onExploreClick();
            } else {
              window.scrollTo({
                top: window.innerHeight - 40,
                behavior: "smooth",
              });
            }
          }}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors cursor-pointer py-1"
        >
          <span>Explore All Projects</span>
          <span className="text-[#ED3327] animate-bounce">↓</span>
        </button>
      </div>
    </div>
  );
}
