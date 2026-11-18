"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import ShutterImage from "@/components/ui/ShutterImage";
import CtaButton from "@/components/ui/CtaButton";
import ScrambleText from "@/components/ui/ScrambleText";

interface ServiceShowcaseItem {
  id: string;
  number: string;
  total: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaHref: string;
  tagline: string;
}

const SERVICES_DATA: ServiceShowcaseItem[] = [
  {
    id: "websites",
    number: "01",
    total: "05",
    title: "Websites & Digital Flagships",
    description:
      "Ultra high-performance digital platforms engineered in Next.js 16 and WebGL. We craft responsive spatial interfaces with mathematical precision and cinematic pacing.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explore Websites",
    ctaHref: "/services",
    tagline: "Architecture & Frontend Engineering",
  },
  {
    id: "3d-motion",
    number: "02",
    total: "05",
    title: "3D & Motion",
    description:
      "Your product sits in a housing, flies above the clouds or works at the scale of a city. We model it and show how it works.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explore 3D & Motion",
    ctaHref: "/services",
    tagline: "Real-time 3D & Simulation",
  },
  {
    id: "brand-identity",
    number: "03",
    total: "05",
    title: "Brand & Visual Systems",
    description:
      "Identity systems crafted for deeptech, artificial intelligence, and aerospace companies. From dynamic typography to generative visual languages that scale across mediums.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explore Brand Systems",
    ctaHref: "/services",
    tagline: "High-Conviction Identity",
  },
  {
    id: "ai-engineering",
    number: "04",
    total: "05",
    title: "AI & Custom Engineering",
    description:
      "Full-stack custom development integrating LLM reasoning workflows, vector databases, and real-time browser compute directly into headless architectures.",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explore AI Engineering",
    ctaHref: "/services",
    tagline: "Autonomous Agentic Pipelines",
  },
  {
    id: "geo-seo",
    number: "05",
    total: "05",
    title: "SEO & Generative Engine Optimization",
    description:
      "Architecting structured entity graphs, knowledge triples, and llms.txt files ensuring Gemini, ChatGPT Search, and Perplexity index and recommend your brand.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    ctaText: "Explore GEO & SEO",
    ctaHref: "/services",
    tagline: "Generative Search Dominance",
  },
];

/**
 * Exact Match to Image 2:
 * 3D Interactive Services Showcase with chamfered card, red corner badge,
 * real-time cursor tilt physics, and background contour wave lines.
 */
export default function HomeServicesSection({ accentColor = "#ED3327" }: { accentColor?: string }) {
  const [currentIndex, setCurrentIndex] = useState(1); // default to 02 / 05 as in screenshot
  const currentService = SERVICES_DATA[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : SERVICES_DATA.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < SERVICES_DATA.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      data-theme="light"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#F7F7F5] text-neutral-900 overflow-hidden select-none"
    >
      {/* 3D Contour Wave Lines & Dotted Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px, 96px 96px, 96px 96px",
        }}
      />

      <div className="max-w-8xl mx-auto w-full relative z-10">
        {/* Layout Grid: Left Counter | Center 3D Showcase | Right Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: SERVICE 02 / 05 Counter & Controls */}
          <div className="lg:col-span-2 flex flex-col justify-between h-full space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-600 tracking-wider">
              <span className="uppercase text-[11px] font-semibold text-neutral-500">SERVICE</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-neutral-950">
                {currentService.number}
              </span>
              <span className="text-xs text-neutral-400">/ {currentService.total}</span>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Service"
                className="w-9 h-9 rounded-none border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center transition-colors cursor-pointer shadow-xs text-neutral-700 hover:text-black"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Service"
                className="w-9 h-9 rounded-none border border-neutral-300 bg-white hover:bg-neutral-100 flex items-center justify-center transition-colors cursor-pointer shadow-xs text-neutral-700 hover:text-black"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Column: Chamfered Card with 3D Tilt & Pinned Badge */}
          <div className="lg:col-span-6 relative">
            <ShutterImage
              src={currentService.image}
              alt={currentService.title}
              aspectRatio="aspect-[16/11]"
              chamfered={true}
              interactive3D={true}
              badge={
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#ED3327] text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-md hover:bg-[#d62c20] transition-colors"
                >
                  <span>VIEW SERVICES</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              }
              containerClassName="shadow-2xl ring-1 ring-black/5"
            />
          </div>

          {/* Right Column: Title, Narrative Description, & Action Button */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold block">
                {currentService.tagline}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-mg12-bold tracking-tight text-neutral-950 leading-tight">
                <ScrambleText text={currentService.title} hoverColor={accentColor} />
              </h2>
              <p className="text-sm sm:text-base font-mg12-regular text-neutral-600 leading-relaxed">
                {currentService.description}
              </p>
            </div>

            <div className="pt-2">
              <Link href={currentService.ctaHref}>
                <CtaButton
                  variant="brand"
                  shape="square"
                  className="!py-3.5 !px-7 text-xs font-mono font-bold bg-black text-white hover:bg-[#ED3327] hover:text-white border-black"
                >
                  {currentService.ctaText} ↗
                </CtaButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

