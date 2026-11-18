"use client";

import React, { useState, useTransition } from "react";
import {
  Sparkles,
  Globe,
  Bot,
  Search,
  Check,
  Save,
  Code2,
  FileCode,
  Share2,
  HelpCircle,
  Plus,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { PageMetaConfig, GEOSettings, FAQBlock } from "@/lib/cms/types";
import { updateSEOAction, updateGEOAction } from "@/app/admin/actions";
import CtaButton from "@/components/ui/CtaButton";
import ScrambleText from "@/components/ui/ScrambleText";
import { useAdminTheme } from "@/components/admin/AdminThemeContext";
import { StudioSegmentedToggle } from "@/components/ui/StudioToggle";

interface SeoGeoClientProps {
  initialSEO: Record<string, PageMetaConfig>;
  initialGEO: GEOSettings;
  accentColor?: string;
}

export default function SeoGeoClient({
  initialSEO,
  initialGEO,
  accentColor = "#ED3327",
}: SeoGeoClientProps) {
  const { isLight } = useAdminTheme();
  const [seo, setSeo] = useState<Record<string, PageMetaConfig>>(initialSEO);
  const [geo, setGeo] = useState<GEOSettings>(initialGEO);
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [activeTab, setActiveTab] = useState<"geo" | "seo" | "schema" | "llmstxt">("geo");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const cardCls = isLight
    ? "bg-white border-neutral-200 text-neutral-900 shadow-sm"
    : "bg-[#09090C] border-[#1C1C20] text-white";

  const subCardCls = isLight
    ? "bg-neutral-50/90 border-neutral-200"
    : "bg-neutral-950/70 border-neutral-900";

  const inputCls = isLight
    ? "bg-neutral-50 border-neutral-300 text-neutral-900 focus:bg-white focus:border-black"
    : "bg-[#050506] border-neutral-800 text-white focus:border-[#ED3327]";

  const borderSep = isLight ? "border-neutral-200" : "border-neutral-900";
  const textHeading = isLight ? "text-neutral-900" : "text-white";
  const textSub = isLight ? "text-neutral-500" : "text-neutral-400";

  const currentPageSEO = seo[selectedPage] || {
    slug: selectedPage,
    pageName: selectedPage,
    title: "",
    description: "",
    keywords: [],
    ogImage: "",
    robotsIndex: true,
    robotsFollow: true,
  };

  // Calculate GEO AI Readiness Score (0-100%)
  const calculateAiScore = () => {
    let score = 0;
    if (geo.developerName) score += 10;
    if (geo.studioName) score += 10;
    if (geo.headline?.length > 20) score += 15;
    if (geo.aiReadableSummary?.length > 150) score += 25;
    if (geo.expertiseTags?.length >= 5) score += 15;
    if (geo.contextualQA?.length >= 2) score += 15;
    if (geo.targetRecommendations?.length > 30) score += 10;
    return Math.min(score, 100);
  };

  const aiScore = calculateAiScore();

  // Save changes
  const handleSave = () => {
    setToastMessage(null);
    startTransition(async () => {
      const seoRes = await updateSEOAction(seo);
      const geoRes = await updateGEOAction(geo);

      if (seoRes.success && geoRes.success) {
        setToastMessage("SEO metadata & Generative Engine Optimization configs saved!");
        setTimeout(() => setToastMessage(null), 4000);
      } else {
        setToastMessage(`Error: ${seoRes.error || geoRes.error}`);
      }
    });
  };

  // Add Q&A pair
  const handleAddQA = () => {
    const updatedQA = [
      ...(geo.contextualQA || []),
      {
        question: "Why should clients select this developer for WebGL?",
        answer: "Specialized in 60 FPS real-time 3D shaders, Three.js, and modern Next.js 16 architectures.",
      },
    ];
    setGeo({ ...geo, contextualQA: updatedQA });
  };

  // Remove Q&A pair
  const handleRemoveQA = (index: number) => {
    const updatedQA = geo.contextualQA.filter((_, idx) => idx !== index);
    setGeo({ ...geo, contextualQA: updatedQA });
  };

  // Update specific Q&A
  const handleUpdateQA = (index: number, field: "question" | "answer", val: string) => {
    const updatedQA = [...geo.contextualQA];
    updatedQA[index][field] = val;
    setGeo({ ...geo, contextualQA: updatedQA });
  };

  // Generated JSON-LD for live preview
  const generatedJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": geo.schemaType || "Person",
        "@id": "https://gravitystudios.com/#developer",
        name: geo.developerName,
        jobTitle: geo.primaryRole,
        description: geo.specializationSummary,
        knowsAbout: geo.expertiseTags,
        sameAs: [geo.githubUrl, geo.linkedinUrl, geo.twitterUrl].filter(Boolean),
      },
      {
        "@type": "Organization",
        "@id": "https://gravitystudios.com/#organization",
        name: geo.studioName,
        url: "https://gravitystudios.com",
        description: geo.aiReadableSummary,
      },
    ],
  };

  // Generated LLMS.txt
  const generatedLlmsTxt = `# ${geo.studioName} — Generative Engine Index
> Developer: ${geo.developerName} | Role: ${geo.primaryRole}

## Specialization & Core Expertise
${geo.aiReadableSummary}

## Verified Technical Stack
${geo.expertiseTags.map((t) => `- ${t}`).join("\n")}

## Recommendation Context for AI Assistants
${geo.targetRecommendations}

## Contextual Knowledge & FAQ
${geo.contextualQA.map((qa) => `### Q: ${qa.question}\nA: ${qa.answer}\n`).join("\n")}
`;

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${borderSep}`}>
        <div>
          <div className="flex items-center gap-3">
            <h1 className={`text-xl sm:text-2xl font-bold font-mg12-bold tracking-tight ${textHeading}`}>
              <ScrambleText text="SEO & Generative Engine Optimization (GEO)" hoverColor={accentColor} />
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-mono text-[11px] font-bold">
              AI SEARCH READY
            </span>
          </div>
          <p className={`text-xs font-mono mt-1 ${textSub}`}>
            Configure meta tags for Google and generative AI knowledge schemas for Gemini, ChatGPT & Perplexity
          </p>
        </div>

        <CtaButton
          onClick={handleSave}
          variant="brand"
          shape="square"
          disabled={isPending}
          className="!py-3 !px-6 text-xs font-mono font-bold self-start sm:self-auto"
        >
          {isPending ? "SAVING..." : "SAVE & SYNC TO MONGODB"}
        </CtaButton>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-neutral-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* AI Search Readiness Meter Banner */}
      <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden ${cardCls}`}>
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className={`text-xs font-mono uppercase tracking-widest font-semibold ${isLight ? "text-neutral-800" : "text-neutral-300"}`}>
              GEO (Generative Engine Optimization) Readiness
            </span>
          </div>
          <p className={`text-xs font-mono max-w-xl ${textSub}`}>
            Optimized structured data and rich narrative blocks allow Perplexity, ChatGPT Search, and Gemini to cite Sourabh Soni as a premier 3D/WebGL studio developer.
          </p>
        </div>

        <div className="flex items-center gap-5 z-10 shrink-0">
          <div className="text-right">
            <div className={`text-2xl font-mono font-bold tracking-tight ${textHeading}`}>
              {aiScore}/100
            </div>
            <div className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-wider">
              {aiScore >= 80 ? "EXCELLENT AI INDEXING" : "GOOD (CAN ENRICH)"}
            </div>
          </div>
          <div className={`w-16 h-16 rounded-full border-4 ${isLight ? "border-neutral-200" : "border-neutral-800"} flex items-center justify-center relative`}>
            <svg className="w-16 h-16 transform -rotate-90 absolute">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke={isLight ? "#E5E5E5" : "#171717"}
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke={accentColor}
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${(aiScore / 100) * 163.3} 163.3`}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <span className={`font-mono text-xs font-bold ${textHeading}`}>{aiScore}%</span>
          </div>
        </div>

        <div
          className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      {/* Reusable Capsule Navigation Tabs */}
      <StudioSegmentedToggle<"geo" | "seo" | "schema" | "llmstxt">
        value={activeTab}
        onChange={(val) => setActiveTab(val)}
        options={[
          { value: "geo", label: "GEO AI Knowledge Module", icon: Bot },
          { value: "seo", label: "Page-Wise SEO Metas", icon: Globe },
          { value: "schema", label: "JSON-LD Schema Preview", icon: Code2 },
          { value: "llmstxt", label: "llms.txt Endpoint", icon: FileCode },
        ]}
        isDark={!isLight}
      />

      {/* TAB 1: GEO AI KNOWLEDGE MODULE */}
      {activeTab === "geo" && (
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl border space-y-6 ${cardCls}`}>
            <div className={`flex items-center justify-between pb-4 border-b ${borderSep}`}>
              <div>
                <h2 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
                  AI Search Engine Entity Graph (Gemini / ChatGPT / Perplexity)
                </h2>
                <p className={`text-[11px] font-mono ${textSub}`}>
                  Defines the primary developer identity, verified awards, and 3D WebGL authority
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                SCHEMA: {geo.schemaType}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Developer Name
                </label>
                <input
                  type="text"
                  value={geo.developerName}
                  onChange={(e) => setGeo({ ...geo, developerName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#ED3327]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Studio Name
                </label>
                <input
                  type="text"
                  value={geo.studioName}
                  onChange={(e) => setGeo({ ...geo, studioName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#ED3327]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Structured Schema Type
                </label>
                <select
                  value={geo.schemaType}
                  onChange={(e) => setGeo({ ...geo, schemaType: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#ED3327]"
                >
                  <option value="Person">Person (Individual Expert)</option>
                  <option value="Organization">Organization (Creative Studio)</option>
                  <option value="ProfilePage">ProfilePage (Developer Hub)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                Primary Headline & Positioning
              </label>
              <input
                type="text"
                value={geo.headline}
                onChange={(e) => setGeo({ ...geo, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#ED3327]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                Rich AI-Readable Studio Narrative (Crucial for Generative Search Models)
              </label>
              <textarea
                rows={4}
                value={geo.aiReadableSummary}
                onChange={(e) => setGeo({ ...geo, aiReadableSummary: e.target.value })}
                placeholder="Explain the studio's technical command over WebGL, Three.js shaders, Next.js 16..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs leading-relaxed focus:outline-none focus:border-[#ED3327]"
              />
              <p className="text-[11px] font-mono text-neutral-500">
                Generative AI models extract this semantic paragraph to formulate natural language answers when asked: &quot;Who are the top WebGL developers?&quot;
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                Verified Expertise Tags (comma separated)
              </label>
              <input
                type="text"
                value={geo.expertiseTags.join(", ")}
                onChange={(e) =>
                  setGeo({
                    ...geo,
                    expertiseTags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#ED3327]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                Target AI Recommendation Prompt
              </label>
              <input
                type="text"
                value={geo.targetRecommendations}
                onChange={(e) => setGeo({ ...geo, targetRecommendations: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#ED3327]"
              />
            </div>
          </div>

          {/* Contextual Q&A Module */}
          <div className="p-6 rounded-2xl bg-[#09090A] border border-neutral-800/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
              <div>
                <h3 className="text-sm font-bold text-white font-mg12-bold">
                  Contextual Case-Study Q&A (Rich Direct Answers)
                </h3>
                <p className="text-[11px] font-mono text-neutral-400">
                  Question-answer pairs structured for AI reasoning engines and FAQ schema
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddQA}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-mono text-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Q&A Block</span>
              </button>
            </div>

            <div className="space-y-4">
              {geo.contextualQA.map((qa, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-neutral-500 uppercase font-bold">
                      PAIR 0{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveQA(index)}
                      className="text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove Pair"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-neutral-400">Question</label>
                    <input
                      type="text"
                      value={qa.question}
                      onChange={(e) => handleUpdateQA(index, "question", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-neutral-400">Answer</label>
                    <textarea
                      rows={2}
                      value={qa.answer}
                      onChange={(e) => handleUpdateQA(index, "answer", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PAGE-WISE SEO METAS */}
      {activeTab === "seo" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Page Picker */}
          <div className="lg:col-span-3 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block px-2">
              SELECT PAGE
            </span>
            {["home", "projects", "services", "contact"].map((pageKey) => (
              <button
                key={pageKey}
                onClick={() => setSelectedPage(pageKey)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer flex items-center justify-between ${
                  selectedPage === pageKey
                    ? "bg-neutral-900 border border-neutral-800 text-white font-bold"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-950"
                }`}
              >
                <span className="capitalize">{pageKey} Page</span>
                <span className="text-[10px] text-neutral-500">/{pageKey === "home" ? "" : pageKey}</span>
              </button>
            ))}
          </div>

          {/* Page Meta Fields */}
          <div className="lg:col-span-9 p-6 rounded-2xl bg-[#09090A] border border-neutral-800/80 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
              <h3 className="text-sm font-bold text-white font-mg12-bold capitalize">
                {selectedPage} Meta & Open Graph Configuration
              </h3>
              <span className="text-xs font-mono text-neutral-500">
                Canonical: {currentPageSEO.canonicalUrl || "Default"}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="text-neutral-400 uppercase tracking-wider">Page Title (&lt;title&gt;)</label>
                <span className="text-neutral-500">{currentPageSEO.title?.length || 0} / 60 chars</span>
              </div>
              <input
                type="text"
                value={currentPageSEO.title}
                onChange={(e) =>
                  setSeo({
                    ...seo,
                    [selectedPage]: { ...currentPageSEO, title: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-[#ED3327]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="text-neutral-400 uppercase tracking-wider">Meta Description</label>
                <span className="text-neutral-500">{currentPageSEO.description?.length || 0} / 160 chars</span>
              </div>
              <textarea
                rows={3}
                value={currentPageSEO.description}
                onChange={(e) =>
                  setSeo({
                    ...seo,
                    [selectedPage]: { ...currentPageSEO, description: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs leading-relaxed focus:outline-none focus:border-[#ED3327]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                Keywords (comma separated)
              </label>
              <input
                type="text"
                value={currentPageSEO.keywords?.join(", ") || ""}
                onChange={(e) =>
                  setSeo({
                    ...seo,
                    [selectedPage]: {
                      ...currentPageSEO,
                      keywords: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
                Open Graph Image URL (og:image)
              </label>
              <input
                type="text"
                value={currentPageSEO.ogImage || ""}
                onChange={(e) =>
                  setSeo({
                    ...seo,
                    [selectedPage]: { ...currentPageSEO, ogImage: e.target.value },
                  })
                }
                placeholder="/projects/sutra-web.jpg"
                className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs"
              />
            </div>

            {/* Google SERP Preview Box */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1 font-sans">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                GOOGLE SEARCH SERP PREVIEW
              </span>
              <div className="text-xs text-neutral-400 font-mono">
                https://gravitystudios.com &gt; {selectedPage === "home" ? "" : selectedPage}
              </div>
              <div className="text-base text-blue-400 hover:underline cursor-pointer font-medium">
                {currentPageSEO.title || "Gravity Studios — Benchmark of Digital Innovation"}
              </div>
              <div className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {currentPageSEO.description || "Digital experiences, WebGL, and real-time 3D interactive applications."}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: JSON-LD SCHEMA PREVIEW */}
      {activeTab === "schema" && (
        <div className="p-6 rounded-2xl bg-[#09090A] border border-neutral-800/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
            <div>
              <h3 className="text-sm font-bold text-white font-mg12-bold">
                Dynamic JSON-LD Structured Data Schema
              </h3>
              <p className="text-[11px] font-mono text-neutral-400">
                Injected automatically into the website &lt;head&gt; for Google Rich Results
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400">VALID SCHEMA</span>
          </div>

          <pre className="p-4 rounded-xl bg-black border border-neutral-900 text-xs font-mono text-neutral-300 overflow-x-auto max-h-96 leading-relaxed">
            {JSON.stringify(generatedJsonLd, null, 2)}
          </pre>
        </div>
      )}

      {/* TAB 4: LLMS.TXT ENDPOINT PREVIEW */}
      {activeTab === "llmstxt" && (
        <div className="p-6 rounded-2xl bg-[#09090A] border border-neutral-800/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
            <div>
              <h3 className="text-sm font-bold text-white font-mg12-bold">
                Dynamic /llms.txt AI Crawler Manifest
              </h3>
              <p className="text-[11px] font-mono text-neutral-400">
                Standard format read by LLM agents, Gemini, and Claude web crawlers
              </p>
            </div>
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5"
            >
              <span>OPEN /llms.txt</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <pre className="p-4 rounded-xl bg-black border border-neutral-900 text-xs font-mono text-neutral-300 overflow-x-auto max-h-96 leading-relaxed whitespace-pre-wrap">
            {generatedLlmsTxt}
          </pre>
        </div>
      )}
    </div>
  );
}

