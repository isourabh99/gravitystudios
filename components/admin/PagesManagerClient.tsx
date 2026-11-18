"use client";

import React, { useState, useTransition } from "react";
import {
  FileText,
  Save,
  Check,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { PageContentConfig, PageContentSection } from "@/lib/cms/types";
import { updatePagesAction } from "@/app/admin/actions";

interface PagesManagerClientProps {
  initialPages: Record<string, PageContentConfig>;
  accentColor?: string;
}

export default function PagesManagerClient({
  initialPages,
  accentColor = "#ED3327",
}: PagesManagerClientProps) {
  const [pages, setPages] = useState<Record<string, PageContentConfig>>(initialPages);
  const [selectedSlug, setSelectedSlug] = useState<string>("home");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const currentPage = pages[selectedSlug] || {
    slug: selectedSlug,
    title: selectedSlug.toUpperCase(),
    sections: [],
  };

  const handleUpdateSection = (
    secId: string,
    field: keyof PageContentSection,
    value: any
  ) => {
    const updatedSections = currentPage.sections.map((sec) =>
      sec.id === secId ? { ...sec, [field]: value } : sec
    );

    setPages({
      ...pages,
      [selectedSlug]: {
        ...currentPage,
        sections: updatedSections,
      },
    });
  };

  const handleSave = () => {
    setToastMessage(null);
    startTransition(async () => {
      const res = await updatePagesAction(pages);
      if (res.success) {
        setToastMessage("Page structure & section copy saved successfully!");
        setTimeout(() => setToastMessage(null), 4000);
      } else {
        setToastMessage(`Error: ${res.error}`);
      }
    });
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-mg12-bold tracking-tight">
            Website Structure & Page Content Manager
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Edit headlines, hero banners, badges, and section visibility across core portfolio pages
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.15)] self-start sm:self-auto"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isPending ? "SAVING..." : "SAVE PAGE CONTENT"}</span>
        </button>
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

      {/* Grid: Left Page Selector, Right Section Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Page Selector (3 cols) */}
        <div className="lg:col-span-3 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block px-2">
            CORE PAGES
          </span>
          {[
            { slug: "home", label: "Home Page (/)" },
            { slug: "projects", label: "Projects Index (/projects)" },
          ].map((item) => (
            <button
              key={item.slug}
              onClick={() => setSelectedSlug(item.slug)}
              className={`w-full text-left px-3.5 py-3 rounded-xl font-mono text-xs transition-all cursor-pointer flex items-center justify-between ${
                selectedSlug === item.slug
                  ? "bg-neutral-900 border border-neutral-800 text-white font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-950"
              }`}
            >
              <span>{item.label}</span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: selectedSlug === item.slug ? accentColor : "#333333" }}
              />
            </button>
          ))}
        </div>

        {/* Section List (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          <div className="p-6 rounded-2xl bg-[#09090A] border border-neutral-800/80 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
              <div>
                <h3 className="text-sm font-bold text-white font-mg12-bold uppercase">
                  {selectedSlug} Section Hierarchy
                </h3>
                <p className="text-[11px] font-mono text-neutral-400">
                  Configure editorial text blocks and section call-to-actions
                </p>
              </div>

              <a
                href={selectedSlug === "home" ? "/" : `/${selectedSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white"
              >
                <span>Preview Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-6">
              {currentPage.sections?.map((section) => (
                <div
                  key={section.id}
                  className="p-5 rounded-xl bg-black border border-neutral-800/80 space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      {section.title}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleUpdateSection(section.id, "visible", !section.visible)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        section.visible
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                      }`}
                    >
                      {section.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{section.visible ? "VISIBLE" : "HIDDEN"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-neutral-400">
                        Section Badge / Eyebrow Text
                      </label>
                      <input
                        type="text"
                        value={section.badge || ""}
                        onChange={(e) => handleUpdateSection(section.id, "badge", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white font-mono text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-mono text-neutral-400">
                        CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={section.ctaText || ""}
                        onChange={(e) => handleUpdateSection(section.id, "ctaText", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-neutral-400">
                      Primary Headline
                    </label>
                    <input
                      type="text"
                      value={section.headline}
                      onChange={(e) => handleUpdateSection(section.id, "headline", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono text-neutral-400">
                      Subheadline & Description
                    </label>
                    <textarea
                      rows={2}
                      value={section.subheadline}
                      onChange={(e) =>
                        handleUpdateSection(section.id, "subheadline", e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-white font-mono text-xs leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
