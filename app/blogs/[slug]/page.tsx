import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Sparkles, User } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ShutterImage from "@/components/ui/ShutterImage";
import ScrambleText from "@/components/ui/ScrambleText";
import { getBlogPostBySlug, getBlogPosts, getThemeSettings } from "@/lib/cms/store";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = await getBlogPostBySlug(slug);
  if (!blog) {
    return { title: "Blog Article Not Found | Gravity Studios" };
  }

  return {
    title: `${blog.title} | Gravity Studios Blogs`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  };
}

export default async function SingleBlogDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [blog, allBlogs, theme] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(),
    getThemeSettings(),
  ]);

  if (!blog || blog.published === false) {
    notFound();
  }

  const accentColor = theme.accentColor || "#ED3327";

  // Related blogs (excluding current)
  const relatedBlogs = allBlogs
    .filter((b) => b.slug !== slug && b.published !== false)
    .slice(0, 2);

  // Render markdown content paragraphs & headings
  const contentParagraphs = (blog.content || "").split("\n\n").filter(Boolean);

  return (
    <main className="min-h-screen bg-[#F4F4F0] text-neutral-900 flex flex-col font-sans selection:bg-[#ED3327] selection:text-white">
      <Navbar />

      <article className="flex-1 pt-32 sm:pt-40 pb-24 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Back Navigation & Breadcrumb */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-300">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-neutral-600 hover:text-black uppercase tracking-wider group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blogs</span>
            </Link>

            <span className="font-mono text-xs text-neutral-400">
              ARTICLE #{blog.number || "01"}
            </span>
          </div>

          {/* Article Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-black text-white font-mono text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
              <span>{blog.badge || blog.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-mg12-bold tracking-tight text-neutral-950 leading-[1.1]">
              <ScrambleText text={blog.title} hoverColor={accentColor} />
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 font-sans leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Author & Timestamp Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-300 font-mono text-xs text-neutral-600">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-none bg-black text-white flex items-center justify-center font-bold text-[11px]">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-neutral-900">{blog.author || "Gravity Engineering"}</span>
                </div>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {blog.publishedAt}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {blog.readTime || "5 min read"}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Cover Media with Shutter Effect */}
          <div className="relative rounded-none overflow-hidden shadow-2xl bg-black border border-neutral-300">
            <ShutterImage
              src={blog.coverImage}
              alt={blog.title}
              aspectRatio="aspect-[16/9]"
              slatCount={8}
              containerClassName="rounded-none overflow-hidden"
            />
          </div>

          {/* Body Content */}
          <div className="prose prose-neutral max-w-none space-y-6 text-base sm:text-lg leading-relaxed text-neutral-800 font-sans">
            {contentParagraphs.map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-2xl sm:text-3xl font-bold font-mg12-bold tracking-tight text-neutral-950 pt-8 pb-2 border-b border-neutral-300"
                  >
                    {para.replace("## ", "")}
                  </h2>
                );
              }
              if (para.startsWith("### ")) {
                return (
                  <h3
                    key={i}
                    className="text-xl sm:text-2xl font-bold font-mg12-bold tracking-tight text-neutral-900 pt-4"
                  >
                    {para.replace("### ", "")}
                  </h3>
                );
              }
              if (para.startsWith("> ")) {
                return (
                  <blockquote
                    key={i}
                    className="pl-6 border-l-4 my-6 italic text-neutral-700 bg-neutral-200/50 py-3 rounded-none"
                    style={{ borderColor: accentColor }}
                  >
                    {para.replace("> ", "")}
                  </blockquote>
                );
              }
              return (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "first-letter:text-5xl first-letter:font-bold first-letter:font-mg12-bold first-letter:float-left first-letter:mr-3 first-letter:text-neutral-950"
                      : ""
                  }
                >
                  {para}
                </p>
              );
            })}
          </div>

          {/* Author Footnote Card */}
          <div className="p-6 sm:p-8 rounded-none bg-[#EBEAE5] border border-neutral-300 space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-none flex items-center justify-center font-bold text-white text-xs"
                style={{ backgroundColor: accentColor }}
              >
                GS
              </div>
              <div>
                <h4 className="font-bold text-neutral-950 text-sm font-mg12-bold">
                  Published by Gravity Studios Editorial
                </h4>
                <p className="text-xs font-mono text-neutral-500">
                  WebGL · Three.js · Generative AI Search Architecture
                </p>
              </div>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed font-sans">
              Our articles explore the convergence of real-time 3D rendering, machine-readable website architecture, and brand identity systems engineered for deep technology organizations.
            </p>
          </div>

          {/* Related Articles Section */}
          {relatedBlogs.length > 0 && (
            <div className="pt-16 border-t border-neutral-300 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold font-mg12-bold text-neutral-950">
                  Related Articles
                </h3>
                <Link
                  href="/blogs"
                  className="font-mono text-xs font-bold text-neutral-600 hover:text-black uppercase tracking-wider flex items-center gap-1 group"
                >
                  <span>All Blogs</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedBlogs.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blogs/${rel.slug}`}
                    className="group flex flex-col space-y-4 cursor-pointer"
                  >
                    <div className="relative rounded-none overflow-hidden bg-black shadow-md border border-neutral-300">
                      <ShutterImage
                        src={rel.coverImage}
                        alt={rel.title}
                        aspectRatio="aspect-[16/10]"
                        slatCount={6}
                        badge={
                          <div className="absolute bottom-3 left-3 z-30">
                            <span className="px-2.5 py-0.5 rounded-none bg-black/75 border border-white/20 text-white font-mono text-[9px] font-bold tracking-widest uppercase">
                              {rel.badge || rel.category}
                            </span>
                          </div>
                        }
                        containerClassName="rounded-none overflow-hidden"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold font-mg12-bold text-neutral-950 group-hover:text-[#ED3327] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs font-mono text-neutral-500">
                        {rel.publishedAt} · {rel.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}

