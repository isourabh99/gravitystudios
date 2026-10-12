"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import CtaButton from "@/components/ui/CtaButton";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

interface ConveyorItem {
  id: string;
  isTop: boolean;
  render: () => React.ReactNode;
}

const ITEMS: ConveyorItem[] = [
  // 1. TOP: Brand Presentation Deck (Screenshot 1 & 2 top)
  {
    id: "visual-brand-deck",
    isTop: true,
    render: () => (
      <div className="w-[280px] sm:w-[330px] md:w-[380px] h-[140px] sm:h-[160px] md:h-[175px] bg-[#111111] border border-neutral-800 rounded-md p-3 sm:p-3.5 relative overflow-hidden shadow-2xl group hover:border-[#ED3327]/50 transition-all duration-300">
        <div className="grid grid-cols-3 gap-2 h-full">
          <div className="bg-gradient-to-br from-[#ED3327] via-[#ED3327]/50 to-black rounded-xs p-2 flex flex-col justify-between border border-neutral-700/60">
            <span className="text-[7px] font-mono text-white/80">BRAND GUIDELINES</span>
            <span className="font-mg12-bold text-xs sm:text-sm font-bold text-white tracking-tight leading-tight">
              GRAVITY™ CORE
            </span>
          </div>
          <div className="bg-[#1b1c20] rounded-xs p-2 flex flex-col justify-between border border-neutral-700/60">
            <span className="text-[7px] font-mono text-neutral-400">PROPOSAL STRUCTURE</span>
            <div className="space-y-1">
              <div className="h-1 bg-neutral-600 rounded-full w-full" />
              <div className="h-1 bg-neutral-700 rounded-full w-4/5" />
              <div className="h-1 bg-[#ED3327] rounded-full w-2/3" />
            </div>
            <span className="text-[6px] font-mono text-neutral-500">SECTION 04</span>
          </div>
          <div className="bg-[#18181b] rounded-xs p-2 flex flex-col justify-between border border-neutral-700/60">
            <span className="text-[7px] font-mono text-neutral-400">TYPOGRAPHY</span>
            <div className="space-y-0.5">
              <span className="block font-mg12-bold text-sm text-white font-bold leading-none">Aa</span>
              <span className="block text-[6px] font-mono text-neutral-400">MG12 BOLD & REGULAR</span>
            </div>
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ED3327]" />
              <span className="w-2.5 h-2.5 rounded-full bg-black border border-neutral-600" />
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // 2. BOTTOM: Card 01 - Web Design & UX (Screenshot 2 bottom center)
  {
    id: "card-web-design",
    isTop: false,
    render: () => (
      <div className="w-[280px] sm:w-[320px] md:w-[340px] bg-black text-white p-3 sm:p-3.5 border border-neutral-800 shadow-2xl relative select-none hover:border-[#ED3327]/60 transition-colors duration-300">
        <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800/80 mb-1.5">
          <span className="font-mono text-xs sm:text-[13px] font-bold text-[#ED3327] tracking-wider">01</span>
          <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">GRAVITY STUDIO</span>
        </div>
        <h2 className="font-mg12-bold text-sm sm:text-base md:text-[17px] font-bold text-white tracking-tight mb-0.5 leading-snug">
          Web Design & UX
        </h2>
        <span className="block font-mg12-regular text-[10px] sm:text-[11px] text-neutral-400 font-light mb-1 tracking-wide">
          Designed for technical buyers
        </span>
        <p className="font-mg12-regular text-[11px] sm:text-xs text-neutral-300 font-light leading-relaxed mb-2">
          Websites that make a complex technology clear, credible and desirable to the people who buy it.
        </p>
        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-neutral-800/60">
          {["UI/UX Systems", "Figma", "Design Tokens", "Prototyping"].map((tag) => (
            <span key={tag} className="text-[8px] sm:text-[9px] font-mono px-1.5 py-0.5 bg-neutral-900 text-neutral-300 border border-neutral-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },

  // 3. TOP: Mobile Wireframe Interface (Screenshot 3 top center)
  {
    id: "visual-mobile-ux",
    isTop: true,
    render: () => (
      <div className="w-[280px] sm:w-[330px] md:w-[380px] h-[140px] sm:h-[160px] md:h-[175px] bg-[#0c0d12] border border-neutral-800 rounded-md p-3 sm:p-3.5 flex items-center justify-center gap-3.5 relative overflow-hidden shadow-2xl group hover:border-[#ED3327]/50 transition-all duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f243015_1px,transparent_1px),linear-gradient(to_bottom,#1f243015_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        {/* Phone 1 */}
        <div className="relative w-28 sm:w-36 h-full bg-[#12141c] border border-neutral-700 rounded-sm p-1.5 flex flex-col justify-between overflow-hidden shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ED3327]" />
            <span className="text-[8px] font-mono text-neutral-400">INTERFACE</span>
          </div>
          <div className="relative my-auto w-full h-16 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-neutral-400 fill-none opacity-85">
              <circle cx="50" cy="50" r="14" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="50" cy="50" r="6" className="stroke-[#ED3327]" strokeWidth="1.5" />
              <path d="M50 36 L50 14 M50 64 L50 86 M36 50 L14 50 M64 50 L86 50" strokeWidth="0.8" />
              <path d="M40 40 L20 20 M60 40 L80 20 M40 60 L20 80 M60 60 L80 80" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="2" fill="#ED3327" />
              <circle cx="80" cy="20" r="2" fill="#F4F4F0" />
            </svg>
          </div>
          <div className="flex items-center justify-between text-[7px] font-mono text-neutral-400 pt-1 border-t border-neutral-800">
            <span>UX WIREFRAME</span>
            <span className="text-white">v2.4</span>
          </div>
        </div>

        {/* Phone 2 */}
        <div className="relative w-28 sm:w-36 h-full bg-[#12141c] border border-neutral-700 rounded-sm p-1.5 flex flex-col justify-between overflow-hidden shadow-lg">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[8px] font-mono text-neutral-400">TELEMETRY</span>
          </div>
          <div className="relative my-auto w-full h-16 flex flex-col justify-center gap-1 px-1">
            <div className="h-1.5 w-4/5 bg-neutral-700 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-[#ED3327]" />
            </div>
            <div className="h-1.5 w-full bg-neutral-700 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-white" />
            </div>
            <div className="grid grid-cols-3 gap-1 pt-1.5">
              <div className="h-3.5 bg-neutral-800 rounded-xs flex items-center justify-center text-[7px] font-mono text-neutral-300">99.8%</div>
              <div className="h-3.5 bg-neutral-800 rounded-xs flex items-center justify-center text-[7px] font-mono text-neutral-300">0.04s</div>
              <div className="h-3.5 bg-neutral-800 rounded-xs flex items-center justify-center text-[7px] font-mono text-[#ED3327]">60fps</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[7px] font-mono text-neutral-400 pt-1 border-t border-neutral-800">
            <span>SYSTEM AUDIT</span>
            <span className="text-emerald-400">PASS</span>
          </div>
        </div>
      </div>
    ),
  },

  // 4. BOTTOM: Card 02 - Web Development (Screenshot 3 bottom right)
  {
    id: "card-web-dev",
    isTop: false,
    render: () => (
      <div className="w-[280px] sm:w-[320px] md:w-[340px] bg-black text-white p-3 sm:p-3.5 border border-neutral-800 shadow-2xl relative select-none hover:border-[#ED3327]/60 transition-colors duration-300">
        <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800/80 mb-1.5">
          <span className="font-mono text-xs sm:text-[13px] font-bold text-[#ED3327] tracking-wider">02</span>
          <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">GRAVITY STUDIO</span>
        </div>
        <h2 className="font-mg12-bold text-sm sm:text-base md:text-[17px] font-bold text-white tracking-tight mb-0.5 leading-snug">
          Web Development: Framer, Astro & Next.js
        </h2>
        <span className="block font-mg12-regular text-[10px] sm:text-[11px] text-neutral-400 font-light mb-1 tracking-wide">
          The right stack for your stage
        </span>
        <p className="font-mg12-regular text-[11px] sm:text-xs text-neutral-300 font-light leading-relaxed mb-2">
          Framer when your team needs to move fast; custom code in Astro or Next.js when you need performance and scale.
        </p>
        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-neutral-800/60">
          {["Next.js 16", "Astro", "Framer", "TypeScript", "Tailwind"].map((tag) => (
            <span key={tag} className="text-[8px] sm:text-[9px] font-mono px-1.5 py-0.5 bg-neutral-900 text-neutral-300 border border-neutral-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },

  // 5. TOP: Forest & Aerodynamic Tech Blimp
  {
    id: "visual-forest-blimp",
    isTop: true,
    render: () => (
      <div className="w-[280px] sm:w-[330px] md:w-[380px] h-[140px] sm:h-[160px] md:h-[175px] bg-[#0c180e] border border-neutral-800 rounded-md relative overflow-hidden shadow-2xl group hover:border-[#ED3327]/50 transition-all duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3b22_15%,#0d1a0f_70%)] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,#284e2e_0%,transparent_50%),radial-gradient(circle_at_70%_60%,#18361d_0%,transparent_60%)]" />
        <div className="absolute left-4 top-4 w-28 h-20 bg-white/10 blur-xl rounded-full" />
        <div className="absolute right-6 bottom-4 w-32 h-24 bg-white/10 blur-xl rounded-full" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-14 sm:w-16 h-32 sm:h-38 bg-gradient-to-r from-neutral-200 via-white to-neutral-300 rounded-full shadow-[0_20px_35px_rgba(0,0,0,0.65)] flex flex-col items-center justify-between py-3.5 border border-white/40">
            <div className="w-2.5 h-1.5 bg-[#ED3327] rounded-full mt-1" />
            <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-neutral-800 -rotate-90 uppercase select-none">
              GRAVITY
            </span>
            <div className="relative w-full flex items-center justify-between px-1">
              <span className="w-2.5 h-4 bg-neutral-900 rounded-xs -ml-2" />
              <span className="w-1.5 h-3 bg-[#ED3327] rounded-xs" />
              <span className="w-2.5 h-4 bg-neutral-900 rounded-xs -mr-2" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-2.5 left-3 text-[9px] font-mono text-emerald-400 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-white/10">
          ALT: 420m • STACK: HYBRID
        </div>
      </div>
    ),
  },

  // 6. BOTTOM: Card 03 - 3D & Interactive Experiences
  {
    id: "card-3d",
    isTop: false,
    render: () => (
      <div className="w-[280px] sm:w-[320px] md:w-[340px] bg-black text-white p-3 sm:p-3.5 border border-neutral-800 shadow-2xl relative select-none hover:border-[#ED3327]/60 transition-colors duration-300">
        <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800/80 mb-1.5">
          <span className="font-mono text-xs sm:text-[13px] font-bold text-[#ED3327] tracking-wider">03</span>
          <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">GRAVITY STUDIO</span>
        </div>
        <h2 className="font-mg12-bold text-sm sm:text-base md:text-[17px] font-bold text-white tracking-tight mb-0.5 leading-snug">
          3D & Interactive Experiences
        </h2>
        <span className="block font-mg12-regular text-[10px] sm:text-[11px] text-neutral-400 font-light mb-1 tracking-wide">
          Real-time WebGL, Three.js & motion
        </span>
        <p className="font-mg12-regular text-[11px] sm:text-xs text-neutral-300 font-light leading-relaxed mb-2">
          Interactive 3D configurators, spatial interfaces and cinematic physics that elevate your product above static competitors.
        </p>
        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-neutral-800/60">
          {["Three.js", "WebGL Shaders", "Blender Pipeline", "60 FPS GPU"].map((tag) => (
            <span key={tag} className="text-[8px] sm:text-[9px] font-mono px-1.5 py-0.5 bg-neutral-900 text-neutral-300 border border-neutral-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },

  // 7. TOP: 3D Realtime WebGL Geometry
  {
    id: "visual-3d-lab",
    isTop: true,
    render: () => (
      <div className="w-[280px] sm:w-[330px] md:w-[380px] h-[140px] sm:h-[160px] md:h-[175px] bg-[#0a0a0f] border border-neutral-800 rounded-md p-3.5 flex flex-col justify-between relative overflow-hidden shadow-2xl group hover:border-[#ED3327]/50 transition-all duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a3820_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3820_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        <div className="flex items-center justify-between z-10 border-b border-neutral-800/80 pb-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ED3327] animate-pulse" />
            <span className="text-[10px] font-mono text-neutral-300 tracking-wider">WEBGL / REALTIME</span>
          </div>
          <span className="text-[9px] font-mono text-neutral-400">TARGET: 60 FPS</span>
        </div>

        <div className="relative my-auto w-full h-18 flex items-center justify-center">
          <div className="relative w-15 h-15 border border-neutral-500 rotate-45 flex items-center justify-center">
            <div className="w-10 h-10 border border-[#ED3327] -rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(237,51,39,0.3)]">
              <div className="w-5 h-5 bg-white rotate-45 shadow-lg" />
            </div>
            <span className="absolute -top-1.5 -left-1.5 text-[8px] font-mono text-[#ED3327]">+</span>
            <span className="absolute -bottom-1.5 -right-1.5 text-[8px] font-mono text-[#ED3327]">+</span>
          </div>
        </div>

        <div className="flex items-center justify-between z-10 pt-1.5 border-t border-neutral-800/80 text-[8.5px] font-mono text-neutral-400">
          <span>PIPELINE: BLENDER ➔ GLTF</span>
          <span className="text-white">HARDWARE ACCEL</span>
        </div>
      </div>
    ),
  },

  // 8. BOTTOM: Card 04 - Branding & Visual Identity
  {
    id: "card-branding",
    isTop: false,
    render: () => (
      <div className="w-[280px] sm:w-[320px] md:w-[340px] bg-black text-white p-3 sm:p-3.5 border border-neutral-800 shadow-2xl relative select-none hover:border-[#ED3327]/60 transition-colors duration-300">
        <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800/80 mb-1.5">
          <span className="font-mono text-xs sm:text-[13px] font-bold text-[#ED3327] tracking-wider">04</span>
          <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">GRAVITY STUDIO</span>
        </div>
        <h2 className="font-mg12-bold text-sm sm:text-base md:text-[17px] font-bold text-white tracking-tight mb-0.5 leading-snug">
          Branding & Visual Identity
        </h2>
        <span className="block font-mg12-regular text-[10px] sm:text-[11px] text-neutral-400 font-light mb-1 tracking-wide">
          Identity, tone and web systems
        </span>
        <p className="font-mg12-regular text-[11px] sm:text-xs text-neutral-300 font-light leading-relaxed mb-2">
          A visual identity designed once and applied everywhere, from the pitch deck to the product UI.
        </p>
        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-neutral-800/60">
          {["Typography", "Design System", "Pitch Decks", "Guidelines"].map((tag) => (
            <span key={tag} className="text-[8px] sm:text-[9px] font-mono px-1.5 py-0.5 bg-neutral-900 text-neutral-300 border border-neutral-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },

  // 9. TOP: Google -> SEO & GEO -> LLM Flow (Screenshot 4 left)
  {
    id: "visual-seo-flow",
    isTop: true,
    render: () => (
      <div className="w-[280px] sm:w-[330px] md:w-[380px] h-[140px] sm:h-[160px] md:h-[175px] bg-white border border-neutral-200 rounded-md p-3.5 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl group hover:border-[#ED3327]/50 transition-all duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 w-full">
          <div className="flex items-center text-xl sm:text-2xl md:text-3xl font-bold font-sans tracking-tight select-none">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <span className="w-4 sm:w-7 h-[1.5px] bg-neutral-400" />
            <div className="border border-neutral-300 bg-neutral-50 px-2 py-0.5 rounded-full text-[8.5px] sm:text-[9.5px] font-mono text-neutral-700 font-semibold tracking-wider uppercase whitespace-nowrap shadow-2xs">
              SEO & GEO
            </div>
            <span className="text-neutral-400 text-xs">➔</span>
          </div>

          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-neutral-800 bg-black text-white flex items-center justify-center shadow-md">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider">LLM</span>
            <span className="absolute -top-1 left-2 w-1.5 h-1.5 rounded-full bg-[#ED3327]" />
            <span className="absolute -bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <span className="absolute top-2 -right-1 w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>

        <div className="absolute bottom-2 text-center text-[9px] font-mono text-neutral-400">
          SEARCH ENGINE & GENERATIVE AI CITATION
        </div>
      </div>
    ),
  },

  // 10. BOTTOM: Card 05 - SEO & AI Search Optimization (Screenshot 4 center bottom)
  {
    id: "card-seo",
    isTop: false,
    render: () => (
      <div className="w-[280px] sm:w-[320px] md:w-[340px] bg-black text-white p-3 sm:p-3.5 border border-neutral-800 shadow-2xl relative select-none hover:border-[#ED3327]/60 transition-colors duration-300">
        <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800/80 mb-1.5">
          <span className="font-mono text-xs sm:text-[13px] font-bold text-[#ED3327] tracking-wider">05</span>
          <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">GRAVITY STUDIO</span>
        </div>
        <h2 className="font-mg12-bold text-sm sm:text-base md:text-[17px] font-bold text-white tracking-tight mb-0.5 leading-snug">
          SEO & AI Search Optimization
        </h2>
        <span className="block font-mg12-regular text-[10px] sm:text-[11px] text-neutral-400 font-light mb-1 tracking-wide">
          Built to be found and cited by AI
        </span>
        <p className="font-mg12-regular text-[11px] sm:text-xs text-neutral-300 font-light leading-relaxed mb-2">
          Technical SEO from the first wireframe, plus the AI layer: content that search engines rank and that AI assistants quote.
        </p>
        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-neutral-800/60">
          {["LLM Citation", "GEO", "Schema.org", "PageSpeed 100"].map((tag) => (
            <span key={tag} className="text-[8px] sm:text-[9px] font-mono px-1.5 py-0.5 bg-neutral-900 text-neutral-300 border border-neutral-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

interface AlternatingItemViewProps {
  item: ConveyorItem;
  index: number;
  scrollYProgress: MotionValue<number>;
  xOffset: number;
  topYOffset: number;
  bottomYOffset: number;
}

function AlternatingItemView({
  item,
  index,
  scrollYProgress,
  xOffset,
  topYOffset,
  bottomYOffset,
}: AlternatingItemViewProps) {
  // Center progress where this item hits the center
  const center = Number((0.08 + index * 0.088).toFixed(3));
  const span = 0.075;

  // Mathematically guaranteed strictly ascending offsets between 0 and 1
  const p2 = center;
  const p1 = Math.max(0.015, Number((center - span).toFixed(4)));
  const p0 = Math.max(0, Number((p1 - 0.02).toFixed(4)));
  const p3 = Math.min(0.985, Number((center + span).toFixed(4)));
  const p4 = Math.min(1.0, Number((p3 + 0.02).toFixed(4)));

  // Horizontal X Translation: Starts from RIGHT (+xOffset) ➔ CENTER (0) ➔ Exits LEFT (-xOffset)
  const x = useTransform(
    scrollYProgress,
    [p1, p2, p3],
    [xOffset, 0, -xOffset],
    { clamp: true }
  );

  // Early-arc plateau: Card reaches full top/bottom altitude while still far to the right,
  // stays completely flat across the center danger zone, and only returns to center horizon on far left.
  const pArcIn = Number((p1 + (p2 - p1) * 0.22).toFixed(4));
  const pArcOut = Number((p2 + (p3 - p2) * 0.78).toFixed(4));

  // Generous vertical separation that keeps bottom slides well below the CTA button,
  // and stays 100% inside 100vh on both top and bottom!
  const targetY = item.isTop ? -topYOffset : bottomYOffset;
  const y = useTransform(
    scrollYProgress,
    [p1, pArcIn, p2, pArcOut, p3],
    [0, targetY, targetY, targetY, 0],
    { clamp: true }
  );

  // Scale: small (0.42) at edges ➔ blooms to full size (1.0) at center ➔ shrinks back to small (0.42)
  const scale = useTransform(
    scrollYProgress,
    [p0, p1, p2, p3, p4],
    [0.3, 0.44, 1.0, 0.44, 0.3],
    { clamp: true }
  );

  // Opacity: 0 before entry ➔ 0.45 muted preview at edge ➔ 1.0 at center ➔ 0.45 at exit ➔ 0
  const opacity = useTransform(
    scrollYProgress,
    [p0, p1, p2, p3, p4],
    [0, 0.45, 1.0, 0.45, 0],
    { clamp: true }
  );

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
      }}
      className="absolute flex items-center justify-center pointer-events-auto select-none"
    >
      {item.render()}
    </motion.div>
  );
}

export default function HorizontalServicesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useSmoothScroll();
  const [xOffset, setXOffset] = useState(520);
  const [topYOffset, setTopYOffset] = useState(215);
  const [bottomYOffset, setBottomYOffset] = useState(260);

  // Measure responsive X and Y travel distances
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (w < 640) {
        setXOffset(Math.min(320, w * 0.44));
        setTopYOffset(Math.min(180, Math.max(155, h * 0.23)));
        setBottomYOffset(Math.min(235, Math.max(205, h * 0.28)));
      } else if (w < 1024) {
        setXOffset(Math.min(440, w * 0.42));
        setTopYOffset(Math.min(205, Math.max(175, h * 0.24)));
        setBottomYOffset(Math.min(255, Math.max(225, h * 0.29)));
      } else {
        setXOffset(Math.min(520, w * 0.40));
        setTopYOffset(Math.min(220, Math.max(185, h * 0.245)));
        setBottomYOffset(Math.min(265, Math.max(235, h * 0.30)));
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Track vertical scroll progress inside the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleDiscoverClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetEl = document.getElementById("all-services");
    if (targetEl) {
      if (lenis) {
        lenis.scrollTo(targetEl, { duration: 1.2 });
      } else {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[540vh] bg-[#F4F4F0] text-neutral-900 select-none"
      aria-label="Our Services Showcase"
    >
      {/* Sticky Viewport pinned for the duration of the animation */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        
        {/* Soft edge fades for sleek editorial transitions */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F4F4F0] via-[#F4F4F0]/80 to-transparent z-30" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F4F4F0] via-[#F4F4F0]/80 to-transparent z-30" />

        {/* 1. CENTER FIXED ANCHOR: "Our services." + CtaButton */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mg12-regular text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] tracking-tight text-neutral-900 leading-none select-none mb-3.5 sm:mb-4.5"
          >
            Our services.
          </motion.h1>

          <div className="pointer-events-auto">
            <CtaButton
              href="#all-services"
              variant="brand"
              onClick={handleDiscoverClick}
              className="shadow-md"
            >
              Discover all Services ↗
            </CtaButton>
          </div>
        </div>

        {/* 2. ALTERNATING CONVEYOR SYSTEM: Right Center ➔ Up/Down Center ➔ Left Center */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
          {ITEMS.map((item, index) => (
            <AlternatingItemView
              key={item.id}
              item={item}
              index={index}
              scrollYProgress={scrollYProgress}
              xOffset={xOffset}
              topYOffset={topYOffset}
              bottomYOffset={bottomYOffset}
            />
          ))}
        </div>

        {/* Scroll Progress Indicator Pill in bottom left */}
        <div className="absolute bottom-5 left-6 sm:left-12 z-30 flex items-center gap-3 bg-black/80 backdrop-blur-md px-3.5 py-1.5 border border-neutral-700 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ED3327] animate-ping" />
          <span className="text-[10px] font-mono text-neutral-200 tracking-wider uppercase">
            Scroll to explore services
          </span>
          <span className="text-[11px] text-neutral-400">➔</span>
        </div>
      </div>
    </section>
  );
}
