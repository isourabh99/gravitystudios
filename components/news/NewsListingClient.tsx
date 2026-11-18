"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Sparkles, Filter, Calendar, Clock } from "lucide-react";
import ShutterImage from "@/components/ui/ShutterImage";
import ScrambleText from "@/components/ui/ScrambleText";
import { BlogPostItem } from "@/lib/cms/types";

interface NewsListingClientProps {
  initialBlogs: BlogPostItem[];
  accentColor?: string;
}

const CATEGORIES = [
  "ALL",
  "BRANDING",
  "DIGITAL STRATEGY",
  "3D & MOTION",
  "WEBGL & GRAPHICS",
  "GEO & AI",
];

export default function NewsListingClient({
  initialBlogs = [],
  accentColor = "#ED3327",
}: NewsListingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      if (blog.published === false) return false;
      const matchesCategory =
        selectedCategory === "ALL" ||
        blog.category.toUpperCase() === selectedCategory.toUpperCase();
      const matchesSearch =
        searchQuery.trim() === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialBlogs, selectedCategory, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-[#F4F4F0] text-neutral-900 select-none">
      {/* Editorial Hero Header */}
      <section className="pt-32 sm:pt-40 pb-16 px-6 sm:px-12 border-b border-neutral-300 relative overflow-hidden bg-[#F0EFEA]">
        {/* Subtle background tech grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-8xl mx-auto w-full relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono tracking-widest text-neutral-600 uppercase">
            <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span>DISPATCHES & EDITORIAL RESEARCH</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-mg12-bold tracking-tight text-neutral-950 leading-[1.05]">
            <ScrambleText text="Insights, 3D Thought & Engineering" hoverColor={accentColor} />
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-neutral-600 font-sans leading-relaxed">
            In-depth perspectives on WebGL architecture, generative search optimization (GEO), spatial computing, and identity systems built for deeptech companies.
          </p>

          {/* Interactive Controls Bar: Category Pills & Search */}
          <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-none text-xs font-mono font-bold tracking-wider transition-all duration-200 uppercase ${
                      isActive
                        ? "bg-black text-white shadow-md"
                        : "bg-white/80 border border-neutral-300 text-neutral-700 hover:bg-neutral-200/80"
                    }`}
                    style={isActive ? { borderColor: accentColor } : undefined}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search dispatches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/90 border border-neutral-300 rounded-none text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dispatches Grid */}
      <section className="py-16 sm:py-24 px-6 sm:px-12">
        <div className="max-w-8xl mx-auto w-full">
          {filteredBlogs.length === 0 ? (
            <div className="py-24 text-center space-y-4">
              <p className="text-sm font-mono text-neutral-500 uppercase tracking-wider">
                NO DISPATCHES FOUND FOR &quot;{searchQuery || selectedCategory}&quot;
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                }}
                className="px-4 py-2 text-xs font-mono font-bold uppercase rounded bg-black text-white hover:bg-neutral-800"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
              {filteredBlogs.map((blog, idx) => (
                <Link
                  key={blog.slug}
                  href={`/news/${blog.slug}`}
                  className="group flex flex-col space-y-5 cursor-pointer"
                >
                  {/* Media Showcase with Shutter Effect & Corner Badge */}
                  <div className="relative rounded-none overflow-hidden bg-black shadow-lg">
                    <ShutterImage
                      src={blog.coverImage}
                      alt={blog.title}
                      aspectRatio="aspect-[16/10]"
                      slatCount={6}
                      badge={
                        <div className="absolute bottom-4 left-4 z-30">
                          <span className="px-3 py-1 rounded-none bg-black/75 border border-white/20 text-white font-mono text-[10px] font-bold tracking-widest uppercase backdrop-blur-xs">
                            {blog.badge || blog.category}
                          </span>
                        </div>
                      }
                      containerClassName="rounded-none overflow-hidden"
                    />
                  </div>

                  {/* Information Row */}
                  <div className="flex items-start justify-between gap-4 pt-1">
                    <div className="flex items-start gap-4">
                      {/* Number Badge [01], [02], [03] */}
                      <span className="px-2.5 py-1 rounded-none bg-black text-white font-mono text-xs font-bold shrink-0 mt-0.5">
                        {blog.number || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`)}
                      </span>

                      {/* Title, Excerpt & Metadata */}
                      <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl font-bold font-mg12-bold text-neutral-950 group-hover:text-[#ED3327] transition-colors leading-snug">
                          <ScrambleText text={blog.title} hoverColor={accentColor} interactive={true} />
                        </h2>

                        <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                          {blog.excerpt}
                        </p>

                        <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 pt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {blog.publishedAt}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {blog.readTime || "5 min read"}
                          </span>
                          <span>·</span>
                          <span className="uppercase text-neutral-700 font-bold">
                            {blog.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Square Red Action Arrow Button */}
                    <div
                      className="w-10 h-10 rounded-none flex items-center justify-center shrink-0 text-white shadow-md group-hover:scale-110 group-hover:bg-black transition-all duration-300"
                      style={{ backgroundColor: accentColor }}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
