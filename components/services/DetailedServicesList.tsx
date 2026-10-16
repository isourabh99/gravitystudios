"use client";

import React, { useState, useMemo } from "react";
import CtaButton from "@/components/ui/CtaButton";
import ScrambleText from "@/components/ui/ScrambleText";
import ShutterCapabilityCard, { CapabilityItem } from "@/components/services/ShutterCapabilityCard";
import CurvedPerspectiveSlider from "@/components/services/CurvedPerspectiveSlider";
import CapabilityDetailModal from "@/components/services/CapabilityDetailModal";

const CAPABILITIES: CapabilityItem[] = [
  {
    number: "01",
    label: "THE DISCIPLINE / 01",
    title: "Web Design & Systems",
    shortDesc:
      "Websites that make complex technology clear, credible, and instantly desirable to enterprise buyers and venture investors.",
    category: "Design & Systems",
    tagline:
      "Crafting high-conversion digital experiences, wireframes, and scalable design systems for high-growth and technical brands.",
    deliverables: [
      "Information Architecture & Strategic Wireframing",
      "Interactive Figma Design Systems & Token Libraries",
      "High-Fidelity Desktop & Mobile Prototypes",
      "Usability Audits & User Experience Strategy",
      "Custom Micro-Interactions & Motion Direction",
    ],
    technologies: ["Figma", "Design Tokens", "Framer", "Protopie"],
    timeline: "2 – 4 Weeks",
    metrics: [
      { label: "Design Token Coverage", value: "100%" },
      { label: "Usability Score", value: "98/100" },
    ],
    isDefaultActive: true,
  },
  {
    number: "02",
    label: "THE DISCIPLINE / 02",
    title: "High-Performance Engineering",
    shortDesc:
      "Next.js 16, Astro & React 19 architecture engineered for sub-second loads, robust security, and seamless CMS integration.",
    category: "Engineering & Performance",
    tagline:
      "Performance-first custom web engineering. Clean code, instant page loads, and enterprise-grade reliability.",
    deliverables: [
      "Next.js 16 (App Router) & React 19 SSR/SSG Architecture",
      "Astro Ultra-Fast Static Site Generation",
      "Tailwind CSS & Modular Design Token Implementation",
      "Headless CMS Integration (Sanity, Strapi, Contentful)",
      "Automated CI/CD Pipelines & Edge Deployments",
    ],
    technologies: ["Next.js 16", "React 19", "Astro", "TypeScript", "Tailwind CSS"],
    timeline: "3 – 6 Weeks",
    metrics: [
      { label: "Google Lighthouse", value: "99+" },
      { label: "First Contentful Paint", value: "0.2s" },
    ],
  },
  {
    number: "03",
    label: "THE DISCIPLINE / 03",
    title: "3D & Real-time WebGL",
    shortDesc:
      "Spatial product configurators, Three.js shaders, and real-time interactive physics that run at silky-smooth 60 FPS in browser.",
    category: "Spatial Media & Creative Tech",
    tagline:
      "Immersive 3D interactive models, spatial configurators, and real-time graphics that elevate technical hardware products.",
    deliverables: [
      "Three.js & React Three Fiber Real-time 3D Viewers",
      "Custom GLSL Shader & Post-Processing Effects",
      "Blender Asset Modeling & Geometry Optimization",
      "Interactive Cursor & Scroll Physics Simulation",
      "Mobile & Low-End GPU Fallback Optimization",
    ],
    technologies: ["Three.js", "React Three Fiber", "GLSL Shaders", "Blender", "Framer Motion"],
    timeline: "3 – 5 Weeks",
    metrics: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Shader Footprint", value: "< 2MB" },
    ],
  },
  {
    number: "04",
    label: "THE DISCIPLINE / 04",
    title: "Branding & Visual Identity",
    shortDesc:
      "Visual identities built for scale across digital platforms, investor pitch decks, marketing collateral, and physical spaces.",
    category: "Brand Strategy & Direction",
    tagline:
      "Comprehensive visual identities designed once and applied everywhere, establishing unmistakable authority in your industry.",
    deliverables: [
      "Logomark, Typography & Visual Grid Systems",
      "Brand Guidelines & Identity Playbooks",
      "Investor Pitch Deck & Keynote Presentation Kits",
      "Marketing Collateral & Social Media Asset Kits",
      "Interactive Digital Brand Styleguides",
    ],
    technologies: ["Illustrator", "Typography Systems", "Keynote", "Figma"],
    timeline: "2 – 4 Weeks",
    metrics: [
      { label: "Asset Deliverables", value: "40+" },
      { label: "Guideline Depth", value: "80+ Pgs" },
    ],
  },
  {
    number: "05",
    label: "THE DISCIPLINE / 05",
    title: "SEO & Generative AI Optimization",
    shortDesc:
      "Engineered from day one for maximum discoverability across Google Search and Generative AI engines like ChatGPT, Claude, and Perplexity.",
    category: "Search Visibility & Growth",
    tagline:
      "Technical SEO from the first wireframe, plus the AI layer: content that search engines rank and that LLM assistants quote.",
    deliverables: [
      "Rich Schema.org & JSON-LD Structured Data Markup",
      "Generative Engine Optimization (GEO) & LLM Citation Architecture",
      "Core Web Vitals & PageSpeed 99+ Optimization",
      "Semantic HTML5 & Accessibility (WCAG 2.1)",
      "Automated Sitemaps, Robots & OpenGraph Social Meta",
    ],
    technologies: ["JSON-LD", "Semantic HTML5", "Google Lighthouse", "Core Web Vitals"],
    timeline: "1 – 3 Weeks",
    metrics: [
      { label: "LLM Citation Readiness", value: "100%" },
      { label: "SEO Score", value: "100/100" },
    ],
  },
  {
    number: "06",
    label: "THE DISCIPLINE / 06",
    title: "Interactive Web Apps & Tools",
    shortDesc:
      "Custom calculators, live quotation builders, and bespoke web tools that capture qualified enterprise leads on autopilot.",
    category: "Product & Web Apps",
    tagline:
      "Engineering interactive digital utilities that turn passive website visitors into engaged, qualified prospects.",
    deliverables: [
      "ROI & Financial Calculation Engines",
      "Dynamic Product Customization Wizards",
      "Interactive Multi-Step Proposal Builders",
      "Real-Time Data Visualization & Analytics",
      "CRM & Webhook Integrations (HubSpot, Salesforce)",
    ],
    technologies: ["React 19", "Next.js", "Zustand", "Tailwind CSS"],
    timeline: "2 – 4 Weeks",
    metrics: [
      { label: "Inbound Conversion", value: "+34%" },
      { label: "Time on Site", value: "3.2x" },
    ],
  },
];

const CATEGORIES = [
  "All Capabilities",
  "Design & Systems",
  "Engineering & Performance",
  "Spatial Media & Creative Tech",
  "Brand Strategy & Direction",
  "Search Visibility & Growth",
];

export default function DetailedServicesList() {
  const [selectedCategory, setSelectedCategory] = useState("All Capabilities");
  const [activeModalItem, setActiveModalItem] = useState<CapabilityItem | null>(null);

  // Filter capabilities by category
  const filteredCapabilities = useMemo(() => {
    if (selectedCategory === "All Capabilities") return CAPABILITIES;
    return CAPABILITIES.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="all-services"
      className="relative w-full bg-[#F4F4F0] text-neutral-900 px-4 sm:px-8 lg:px-12 py-14 sm:py-24 border-t border-neutral-300 select-none overflow-hidden"
    >
      <div className="max-w-8xl mx-auto w-full space-y-16 sm:space-y-24">
        {/* =========================================================================
            1. SECTION HERO HEADER
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start pb-10 sm:pb-16 border-b border-neutral-300">
          <div className="lg:col-span-8 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ED3327] animate-pulse" />
              <span className="font-mono text-xs sm:text-[13px] tracking-[0.25em] text-[#ED3327] uppercase">
                CAPABILITIES & SCOPE
              </span>
            </div>
            <h2 className="font-mg12-regular text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-neutral-950 tracking-tight">
              <ScrambleText text="Detailed capabilities." autoPlay={false} interactive={true} />
            </h2>
          </div>
          <div className="lg:col-span-4 pt-1 lg:pt-8 space-y-3">
            <p className="font-mg12-regular text-xs sm:text-sm md:text-base font-light text-neutral-600 leading-relaxed max-w-md">
              From fast-moving venture-backed startups to enterprise hardware manufacturers: we engineer bespoke digital products that demand attention.
            </p>
          </div>
        </div>

        {/* =========================================================================
            2. 3D CURVED PERSPECTIVE SLIDER (Screenshots 2, 3, 4, 5)
            "slide scroll krne pr grab left m center ki images andar ki trf right slide krne center images zomm hote hue"
           ========================================================================= */}
        <div className="border-b border-neutral-300 pb-16 sm:pb-24">
          <CurvedPerspectiveSlider />
        </div>

        {/* =========================================================================
            3. CAPABILITIES GRID: SHUTTER CARDS (Screenshot 1)
            "jaha cards use krne waha 1st image jese cards shutter jesa aanimation hover p"
           ========================================================================= */}
        <div className="space-y-8">
          {/* Category Filter Pills Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block mb-1">
                FILTER BY DISCIPLINE
              </span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-mono text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${selectedCategory === cat
                        ? "bg-black text-white shadow-md border border-black"
                        : "bg-white text-neutral-700 border border-neutral-300 hover:border-black hover:text-black"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-right font-mono text-xs text-neutral-500">
              SHOWING {filteredCapabilities.length} OF {CAPABILITIES.length} DISCIPLINES
            </div>
          </div>

          {/* Cards Grid: Reusable Shutter Capability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCapabilities.map((item, index) => (
              <ShutterCapabilityCard
                key={item.number}
                item={item}
                isActive={index === 0 && selectedCategory === "All Capabilities"}
                onSelect={(selected) => setActiveModalItem(selected)}
              />
            ))}
          </div>
        </div>

        {/* =========================================================================
            4. METHODOLOGY & PRODUCTION PHASES (With Shutter Hover Effect)
           ========================================================================= */}
        <div className="py-16 sm:py-24 border-t border-b border-neutral-300 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="block font-mono text-xs sm:text-[13px] tracking-[0.25em] text-[#ED3327] uppercase">
              OUR METHODOLOGY
            </span>
            <h3 className="font-mg12-regular text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight">
              From discovery to production.
            </h3>
            <p className="font-mg12-regular text-sm text-neutral-600 font-light">
              A battle-tested 4-phase agile pipeline designed for speed, zero regressions, and measurable market impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {[
              {
                step: "01",
                title: "Discovery & Scope",
                desc: "We analyze your audience, technical goals, conversion bottlenecks, and define precise deliverables with clear sprint timelines.",
                tag: "PHASE 01 / SPRINT 1",
              },
              {
                step: "02",
                title: "Architecture & Design",
                desc: "Information hierarchy, wireframes, and high-fidelity prototypes in Figma with custom design tokens, shaders, and motion direction.",
                tag: "PHASE 02 / SPRINT 2",
              },
              {
                step: "03",
                title: "Engineering & 3D",
                desc: "High-performance builds in Next.js, Astro or Framer, integrating Three.js shaders and smooth interactions without performance drops.",
                tag: "PHASE 03 / SPRINT 3-4",
              },
              {
                step: "04",
                title: "Audit & Launch",
                desc: "Rigorous PageSpeed 99+ audits, schema markup implementation, multi-device testing, and seamless custom domain deployment.",
                tag: "PHASE 04 / PRODUCTION",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group relative bg-[#EFEFEA] hover:bg-[#0C0D0E] border border-neutral-300 hover:border-black p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-400 rounded-sm shadow-xs hover:shadow-xl cursor-default"
              >
                {/* Top header */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest text-[#ED3327] uppercase font-bold">
                    {item.tag}
                  </span>
                  <span className="w-6 h-6 rounded-full border border-neutral-400 group-hover:border-neutral-700 flex items-center justify-center font-mono text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors">
                    {item.step}
                  </span>
                </div>

                {/* Body */}
                <div className="space-y-2">
                  <h4 className="font-mg12-bold text-lg font-bold text-neutral-900 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="font-mg12-regular text-xs sm:text-[13px] text-neutral-600 group-hover:text-neutral-300 leading-relaxed font-light transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom line indicator */}
                <div className="h-[2px] w-full bg-neutral-300 group-hover:bg-[#ED3327] transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            5. BOTTOM CALL TO ACTION BANNER
           ========================================================================= */}
        <div className="pt-8 sm:pt-16 flex flex-col items-center justify-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-300 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#ED3327] animate-ping" />
            <span className="font-mono text-xs text-neutral-700 uppercase tracking-wider">
              NOW BOOKING Q2 / Q3 PROJECTS
            </span>
          </div>

          <h2 className="font-mg12-regular text-3xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight max-w-3xl leading-tight">
            Let&apos;s build an exceptional digital experience.
          </h2>

          <p className="font-mg12-regular text-sm sm:text-base font-light text-neutral-600 max-w-lg leading-relaxed">
            Tell us about your product, timeline, and technical vision. We&apos;ll schedule an introductory consultation within 24 hours.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <CtaButton href="/contact" variant="brand">
              Get in Touch ↗
            </CtaButton>
            <a
              href="#all-services"
              className="font-mono text-xs text-neutral-600 hover:text-black tracking-wider uppercase underline underline-offset-4 transition-colors"
            >
              Back to top of capabilities ↑
            </a>
          </div>
        </div>
      </div>

      {/* Reusable Capability Modal for Granular Inspection */}
      <CapabilityDetailModal
        item={activeModalItem}
        isOpen={Boolean(activeModalItem)}
        onClose={() => setActiveModalItem(null)}
      />
    </section>
  );
}
