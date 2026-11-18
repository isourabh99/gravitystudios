"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ShutterImage from "@/components/ui/ShutterImage";
import ScrambleText from "@/components/ui/ScrambleText";
import { BlogPostItem } from "@/lib/cms/types";

export interface HomeNewsSectionProps {
  blogs: BlogPostItem[];
  accentColor?: string;
}

/**
 * Exact Match to Image 3:
 * Editorial Blogs / News Showcase with chromatic aberration graphics,
 * bottom-left category badge, number badges [01], [02], circular red CTA buttons,
 * and signature shutter slats.
 */
export default function HomeNewsSection({
  blogs = [],
  accentColor = "#ED3327",
}: HomeNewsSectionProps) {
  const publishedBlogs = blogs.filter((b) => b.published !== false).slice(0, 2);

  return (
    <section
      data-theme="light"
      id="news"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#F4F4F0] text-neutral-900 overflow-hidden select-none border-t border-neutral-300"
    >
      <div className="max-w-8xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-neutral-300">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold block mb-2">
              DISPATCHES & EDITORIAL RESEARCH
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mg12-bold tracking-tight text-neutral-950">
              <ScrambleText text="Insights & Technical Thought" hoverColor={accentColor} />
            </h2>
          </div>

          <Link
            href="/news"
            className="flex items-center gap-1.5 font-mono text-xs text-neutral-700 hover:text-black font-bold uppercase tracking-wider group"
          >
            <span>VIEW ALL DISPATCHES</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 2-Card Grid Matching Image 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {publishedBlogs.map((blog, idx) => (
            <Link
              key={blog.slug}
              href={`/news/${blog.slug}`}
              className="group flex flex-col space-y-4 cursor-pointer"
            >
              {/* Media Card with Shutter Effect & Corner Badge */}
              <div className="relative rounded-none overflow-hidden bg-black shadow-lg">
                <ShutterImage
                  src={blog.coverImage}
                  alt={blog.title}
                  aspectRatio="aspect-[16/10]"
                  slatCount={6}
                  overlayText={idx === 0 ? "Deeptech branding: an identity for invisible technology" : undefined}
                  badge={
                    <div className="absolute bottom-4 left-4 z-30">
                      <span className="px-3 py-1 rounded-none bg-black/70 border border-white/20 text-white font-mono text-[10px] font-bold tracking-widest uppercase backdrop-blur-xs">
                        {blog.badge || blog.category}
                      </span>
                    </div>
                  }
                  containerClassName="rounded-none overflow-hidden"
                />
              </div>

              {/* Bottom Information Row */}
              <div className="flex items-start justify-between gap-4 pt-1">
                <div className="flex items-start gap-3.5">
                  {/* Number Badge [01], [02] */}
                  <span className="px-2 py-0.5 rounded-none bg-black text-white font-mono text-[11px] font-bold shrink-0 mt-0.5">
                    {blog.number || `0${idx + 1}`}
                  </span>

                  {/* Title & Metadata */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold font-mg12-bold text-neutral-950 group-hover:text-[#ED3327] transition-colors leading-snug line-clamp-2">
                      <ScrambleText text={blog.title} hoverColor={accentColor} interactive={true} />
                    </h3>
                    <p className="text-xs font-mono text-neutral-500">
                      {blog.publishedAt} · {blog.category}
                    </p>
                  </div>
                </div>

                {/* Square Red Action Arrow Button */}
                <div className="w-8 h-8 rounded-none bg-[#ED3327] text-white flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-black transition-all duration-300 shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

