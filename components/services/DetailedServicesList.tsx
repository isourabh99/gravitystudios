"use client";

import React, { useState } from "react";
import CtaButton from "@/components/ui/CtaButton";
import ServiceAccordionItem, { ServiceDetail } from "@/components/services/ServiceAccordionItem";

const SERVICE_DETAILS: ServiceDetail[] = [
  {
    number: "01",
    title: "Web Design & User Experience",
    category: "Design & Systems",
    tagline:
      "Crafting high-conversion digital experiences, wireframes, and design systems for technical and high-growth brands.",
    deliverables: [
      "Information Architecture & Wireframing",
      "Interactive Figma Design Systems & Tokens",
      "High-Fidelity Desktop & Mobile Prototypes",
      "Usability Audits & User Experience Strategy",
      "Custom Micro-Interactions & Animation Specs",
    ],
    technologies: ["Figma", "Design Tokens", "Framer", "Protopie"],
    timeline: "2 – 4 Weeks",
  },
  {
    number: "02",
    title: "Web Development: Framer, Astro & Next.js",
    category: "Engineering & Performance",
    tagline:
      "Performance-first custom web engineering. Clean code, instant page loads, and enterprise scalability.",
    deliverables: [
      "Next.js 16 (App Router) & React 19 Architecture",
      "Astro Ultra-Fast Static Site Generation",
      "Framer Custom Staging & Production Deployment",
      "Tailwind CSS & Modular Design System Implementation",
      "Headless CMS Integration (Sanity, Strapi, Contentful)",
    ],
    technologies: ["Next.js", "React 19", "Astro", "TypeScript", "Tailwind CSS"],
    timeline: "3 – 6 Weeks",
  },
  {
    number: "03",
    title: "3D & Interactive WebGL Experiences",
    category: "Spatial Media & Creative Tech",
    tagline:
      "Immersive 3D interactive models, spatial product configurators, and real-time graphics running at 60 FPS in browser.",
    deliverables: [
      "Three.js & React Three Fiber Real-time 3D",
      "Custom GLSL Shader & Post-Processing Effects",
      "Blender 3D Asset Modeling & Geometry Optimization",
      "Interactive Cursor & Scroll Physics Simulation",
      "Mobile & Low-End GPU Fallback Optimization",
    ],
    technologies: ["Three.js", "React Three Fiber", "GLSL Shaders", "Blender", "Framer Motion"],
    timeline: "3 – 5 Weeks",
  },
  {
    number: "04",
    title: "Branding & Visual Identity Systems",
    category: "Brand Strategy & Creative Direction",
    tagline:
      "Comprehensive visual identities built for scale across digital platforms, pitch decks, and physical collateral.",
    deliverables: [
      "Logomark, Typography & Visual Grid Systems",
      "Brand Guidelines & Identity Playbooks",
      "Investor Pitch Deck & Keynote Presentation Templates",
      "Marketing Collateral & Social Media Asset Kits",
      "Interactive Digital Styleguides",
    ],
    technologies: ["Illustrator", "Typography Systems", "Keynote", "Figma"],
    timeline: "2 – 4 Weeks",
  },
  {
    number: "05",
    title: "SEO & Generative AI Search Optimization (GEO)",
    category: "Search Visibility & Growth",
    tagline:
      "Engineered from day one for maximum discoverability across Google Search and Generative AI engines like ChatGPT, Claude, and Perplexity.",
    deliverables: [
      "Rich Schema.org & JSON-LD Structured Data Markup",
      "Generative Engine Optimization (GEO) & LLM Citation Architecture",
      "Core Web Vitals & PageSpeed 99+ Optimization",
      "Semantic HTML5 & Accessibility (WCAG 2.1)",
      "Automated Sitemaps, Robots & OpenGraph Social Meta",
    ],
    technologies: ["JSON-LD", "Semantic HTML", "Google Lighthouse", "Core Web Vitals"],
    timeline: "1 – 3 Weeks",
  },
];

export default function DetailedServicesList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="all-services"
      className="relative w-full bg-[#F4F4F0] text-neutral-900 px-6 sm:px-12 lg:px-16 py-20 sm:py-28 border-t border-neutral-300 select-none"
    >
      <div className="max-w-8xl mx-auto w-full">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-12 sm:pb-16 border-b border-neutral-300">
          <div className="lg:col-span-8 space-y-3">
            <span className="block font-mono text-xs sm:text-[13px] tracking-[0.25em] text-[#ED3327] uppercase">
              CAPABILITIES & SCOPE
            </span>
            <h2 className="font-mg12-regular text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-neutral-900 tracking-tight">
              Detailed capabilities.
            </h2>
          </div>
          <div className="lg:col-span-4 pt-2 lg:pt-8">
            <p className="font-mg12-regular text-sm sm:text-base font-light text-neutral-600 leading-relaxed max-w-md">
              From fast-moving venture-backed startups to enterprise hardware manufacturers: we engineer bespoke digital products that demand attention.
            </p>
          </div>
        </div>

        {/* Detailed Accordion / List */}
        <div className="divide-y divide-neutral-300 border-b border-neutral-300">
          {SERVICE_DETAILS.map((service, idx) => (
            <ServiceAccordionItem
              key={service.number}
              service={service}
              isOpen={openIndex === idx}
              onToggle={() => toggleAccordion(idx)}
            />
          ))}
        </div>

        {/* Process Steps (How We Work) */}
        <div className="py-20 sm:py-28 border-b border-neutral-300">
          <div className="mb-12">
            <span className="block font-mono text-xs sm:text-[13px] tracking-[0.25em] text-[#ED3327] uppercase mb-2">
              OUR METHODOLOGY
            </span>
            <h2 className="font-mg12-regular text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight">
              From discovery to production.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Scope",
                desc: "We analyze your audience, technical goals, conversion bottlenecks, and define precise deliverables with clear timelines.",
              },
              {
                step: "02",
                title: "Architecture & Design",
                desc: "Information hierarchy, wireframes, and high-fidelity prototypes in Figma with custom design tokens and motion direction.",
              },
              {
                step: "03",
                title: "Engineering & 3D",
                desc: "High-performance builds in Next.js, Astro or Framer, integrating Three.js shaders and smooth interactions without performance drops.",
              },
              {
                step: "04",
                title: "Audit & Launch",
                desc: "Rigorous PageSpeed 99+ audits, schema markup implementation, multi-device testing, and seamless custom domain deployment.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white border border-neutral-300 p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-black transition-colors"
              >
                <span className="font-mono text-xs font-bold text-[#ED3327]">
                  PHASE {item.step}
                </span>
                <h4 className="font-mg12-bold text-lg font-bold text-neutral-900">
                  {item.title}
                </h4>
                <p className="font-mg12-regular text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action Banner */}
        <div className="pt-16 sm:pt-24 flex flex-col items-center justify-center text-center space-y-6">
          <span className="font-mono text-xs sm:text-[13px] tracking-[0.2em] text-[#ED3327] uppercase">
            HAVE A PROJECT IN MIND?
          </span>
          <h2 className="font-mg12-regular text-3xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight max-w-2xl">
            Let&apos;s build an exceptional digital experience.
          </h2>
          <p className="font-mg12-regular text-sm sm:text-base font-light text-neutral-600 max-w-lg">
            Tell us about your product, timeline, and vision. We&apos;ll schedule an introductory consultation within 24 hours.
          </p>
          <div className="pt-4">
            <CtaButton href="/contact" variant="brand">
              Get in Touch ↗
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
