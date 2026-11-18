"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  FileText,
  Save,
  Check,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  ExternalLink,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { PageContentConfig, PageContentSection } from "@/lib/cms/types";
import { updatePagesAction } from "@/app/admin/actions";
import CtaButton from "@/components/ui/CtaButton";
import CustomInputField from "@/components/ui/CustomInputField";
import ScrambleText from "@/components/ui/ScrambleText";
import { useAdminTheme } from "@/components/admin/AdminThemeContext";

interface SinglePageEditorClientProps {
  slug: string;
  initialPages: Record<string, PageContentConfig>;
  accentColor?: string;
  isDark?: boolean;
}

export default function SinglePageEditorClient({
  slug,
  initialPages,
  accentColor = "#ED3327",
}: SinglePageEditorClientProps) {
  const { isLight } = useAdminTheme();
  const [pages, setPages] = useState<Record<string, PageContentConfig>>(initialPages);
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

  const currentPage = pages[slug] || {
    slug,
    title: slug.toUpperCase(),
    sections: [
      {
        id: `${slug}-hero`,
        title: `${slug.toUpperCase()} Hero Section`,
        badge: "DIGITAL INNOVATION",
        headline: "Engineering Digital Experiences",
        subheadline: "Crafting real-time WebGL, interactive 3D, and bespoke digital platforms.",
        ctaText: "Explore More",
        ctaLink: "/contact",
        visible: true,
      },
    ],
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
      [slug]: {
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
        setToastMessage(`Page "${slug.toUpperCase()}" content saved to MongoDB!`);
        setTimeout(() => setToastMessage(null), 4000);
      } else {
        setToastMessage(`Error: ${res.error}`);
      }
    });
  };

  const pageNames: Record<string, string> = {
    home: "Home Page (/)",
    projects: "Projects Page (/projects)",
    services: "Services Page (/services)",
    contact: "Contact Page (/contact)",
    studio: "Studio Page (/#studio)",
    news: "News Page (/#news)",
  };

  const liveUrls: Record<string, string> = {
    home: "/",
    projects: "/projects",
    services: "/services",
    contact: "/contact",
    studio: "/#studio",
    news: "/#news",
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header with Breadcrumb */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${borderSep}`}>
        <div>
          <div className={`flex items-center gap-2 text-xs font-mono mb-1 ${textSub}`}>
            <Link href="/admin" className={`hover:${textHeading}`}>Admin</Link>
            <ChevronRight className="w-3 h-3 text-neutral-500" />
            <span>Pages CMS</span>
            <ChevronRight className="w-3 h-3 text-neutral-500" />
            <span className={`uppercase font-bold ${textHeading}`}>{slug}</span>
          </div>

          <h1 className={`text-xl sm:text-2xl font-bold font-mg12-bold tracking-tight ${textHeading}`}>
            <ScrambleText text={`Page Editor: ${pageNames[slug] || slug}`} hoverColor={accentColor} />
          </h1>
          <p className={`text-xs font-mono mt-1 ${textSub}`}>
            Manage section copy, headline hierarchies, and visibility in MongoDB
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <a
            href={liveUrls[slug] || "/"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs border border-neutral-800 transition-colors"
          >
            <span>Live View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <CtaButton
            onClick={handleSave}
            variant="brand"
            shape="square"
            disabled={isPending}
            className="!py-3 !px-6 text-xs font-mono font-bold"
          >
            {isPending ? "SAVING..." : "SAVE TO MONGODB"}
          </CtaButton>
        </div>
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

      {/* Section Editors */}
      <div className="space-y-6">
        {currentPage.sections?.map((section, idx) => (
          <div
            key={section.id}
            className={`p-6 rounded-2xl border space-y-5 ${cardCls}`}
          >
            <div className={`flex items-center justify-between pb-3 border-b ${borderSep}`}>
              <div className="flex items-center gap-3">
                <span className={`font-mono text-xs font-bold ${textSub}`}>
                  0{idx + 1}
                </span>
                <h3 className={`text-sm font-bold font-mg12-bold ${textHeading}`}>
                  {section.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleUpdateSection(section.id, "visible", !section.visible)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                  section.visible
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold"
                    : isLight
                    ? "bg-neutral-100 text-neutral-500 border border-neutral-300"
                    : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                }`}
              >
                {section.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{section.visible ? "SECTION VISIBLE" : "HIDDEN"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomInputField
                label="Eyebrow Badge Text"
                name={`badge-${section.id}`}
                value={section.badge || ""}
                onChange={(e) => handleUpdateSection(section.id, "badge", e.target.value)}
                isDark={!isLight}
              />
              <CustomInputField
                label="Call-to-Action Button Label"
                name={`cta-${section.id}`}
                value={section.ctaText || ""}
                onChange={(e) => handleUpdateSection(section.id, "ctaText", e.target.value)}
                isDark={!isLight}
              />
            </div>

            <CustomInputField
              label="Section Primary Headline"
              name={`headline-${section.id}`}
              value={section.headline}
              onChange={(e) => handleUpdateSection(section.id, "headline", e.target.value)}
              isDark={!isLight}
            />

            <CustomInputField
              label="Subheadline Narrative & Copy"
              name={`subheadline-${section.id}`}
              value={section.subheadline}
              onChange={(e) => handleUpdateSection(section.id, "subheadline", e.target.value)}
              multiline
              rows={3}
              isDark={!isLight}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

