"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Newspaper,
  Plus,
  Search,
  GripVertical,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Check,
  X,
  FileText,
  Calendar,
  Clock,
  Sparkles,
} from "lucide-react";
import { BlogPostItem } from "@/lib/cms/types";
import {
  saveBlogPostAction,
  deleteBlogPostAction,
  reorderBlogPostsAction,
} from "@/app/admin/actions";
import CtaButton from "@/components/ui/CtaButton";
import CustomInputField from "@/components/ui/CustomInputField";
import CustomSelect from "@/components/ui/CustomSelect";
import ScrambleText from "@/components/ui/ScrambleText";
import { useAdminTheme } from "@/components/admin/AdminThemeContext";

interface BlogManagerClientProps {
  initialBlogs: BlogPostItem[];
  accentColor?: string;
}

export default function BlogManagerClient({
  initialBlogs = [],
  accentColor = "#ED3327",
}: BlogManagerClientProps) {
  const { isLight } = useAdminTheme();
  const [blogs, setBlogs] = useState<BlogPostItem[]>(initialBlogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingBlog, setEditingBlog] = useState<BlogPostItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deleteConfirmSlug, setDeleteConfirmSlug] = useState<string | null>(null);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dropTargetIdx, setDropTargetIdx] = useState<number | null>(null);
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

  // Filter
  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Drag and drop
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dropTargetIdx !== index) {
      setDropTargetIdx(index);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIndex) {
      setDraggedIdx(null);
      setDropTargetIdx(null);
      return;
    }

    const reordered = [...blogs];
    const [moved] = reordered.splice(draggedIdx, 1);
    reordered.splice(targetIndex, 0, moved);

    const reorderedWithNumbers = reordered.map((b, i) => ({
      ...b,
      orderIndex: i,
      number: String(i + 1).padStart(2, "0"),
    }));

    setBlogs(reorderedWithNumbers);
    setDraggedIdx(null);
    setDropTargetIdx(null);

    startTransition(async () => {
      const res = await reorderBlogPostsAction(reorderedWithNumbers.map((b) => b.slug));
      if (res.success) {
        setToastMessage("Blog post ordering updated in MongoDB.");
        setTimeout(() => setToastMessage(null), 3000);
      }
    });
  };

  // Toggle published
  const handleTogglePublish = (slug: string) => {
    const blog = blogs.find((b) => b.slug === slug);
    if (!blog) return;

    const updated = { ...blog, published: !blog.published };
    setBlogs((prev) => prev.map((b) => (b.slug === slug ? updated : b)));

    startTransition(async () => {
      const res = await saveBlogPostAction(updated);
      if (res.success) {
        setToastMessage(`Post "${updated.title}" ${updated.published ? "published" : "hidden"} in MongoDB.`);
        setTimeout(() => setToastMessage(null), 3000);
      }
    });
  };

  // Add new
  const handleAddNew = () => {
    const newNumber = String(blogs.length + 1).padStart(2, "0");
    const emptyPost: BlogPostItem = {
      id: `blog-new-${Date.now()}`,
      slug: `insight-${blogs.length + 1}`,
      number: newNumber,
      title: "New Editorial Insight",
      excerpt: "Brief summary describing the technical thought, shader architecture, or studio case study.",
      content: `### Executive Overview\n\nDeep analysis of modern digital systems, interactive 3D, and engineering moats.\n\n### Key Principles\n1. Mathematical rigor\n2. Real-time GPU compute\n3. Zero-compromise typography`,
      category: "Branding",
      badge: "INSIGHT",
      readTime: "5 min read",
      publishedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      published: true,
      featured: false,
      orderIndex: blogs.length,
    };

    setEditingBlog(emptyPost);
    setIsCreatingNew(true);
  };

  // Save Modal
  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    startTransition(async () => {
      const res = await saveBlogPostAction(editingBlog);
      if (res.success && res.data) {
        setToastMessage(`Post "${res.data.title}" saved to MongoDB!`);
        setTimeout(() => setToastMessage(null), 4000);

        setBlogs((prev) => {
          const idx = prev.findIndex((b) => b.slug === res.data!.slug);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = res.data!;
            return next;
          }
          return [...prev, res.data!];
        });

        setEditingBlog(null);
        setIsCreatingNew(false);
      } else {
        setToastMessage(`Error: ${res.error}`);
      }
    });
  };

  // Delete
  const handleDelete = (slug: string) => {
    startTransition(async () => {
      const res = await deleteBlogPostAction(slug);
      if (res.success) {
        setBlogs((prev) => prev.filter((b) => b.slug !== slug));
        setToastMessage("Blog post deleted from MongoDB.");
        setTimeout(() => setToastMessage(null), 3000);
      } else {
        setToastMessage(`Error: ${res.error}`);
      }
      setDeleteConfirmSlug(null);
    });
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${borderSep}`}>
        <div>
          <div className="flex items-center gap-3">
            <h1 className={`text-xl sm:text-2xl font-bold font-mg12-bold tracking-tight ${textHeading}`}>
              <ScrambleText text="Blogs & Editorial CMS" hoverColor={accentColor} />
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-mono text-[11px] font-bold">
              MONGODB DIRECT
            </span>
          </div>
          <p className={`text-xs font-mono mt-1 ${textSub}`}>
            Manage research dispatches, thought leadership, and blog posts with drag-and-drop reordering
          </p>
        </div>

        <CtaButton
          onClick={handleAddNew}
          variant="brand"
          shape="square"
          className="!py-3 !px-6 text-xs font-mono tracking-widest uppercase font-bold self-start sm:self-auto"
        >
          + ADD NEW POST
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

      {/* Control Bar: Search & Drag-Drop Instruction */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border ${cardCls}`}>
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts in MongoDB..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl border font-mono text-xs placeholder-neutral-500 focus:outline-none transition-colors ${inputCls}`}
          />
        </div>

        <div className={`flex items-center gap-4 text-xs font-mono self-end sm:self-auto ${textSub}`}>
          <span className="flex items-center gap-1.5">
            <GripVertical className="w-3.5 h-3.5 text-neutral-500" />
            <span>DRAG & DROP TO REORDER</span>
          </span>
          <span className="text-neutral-600">|</span>
          <span>
            POSTS: <strong className={textHeading}>{blogs.length}</strong> IN MONGODB
          </span>
        </div>
      </div>

      {/* Blog Posts List Table */}
      <div className={`rounded-2xl border overflow-hidden ${cardCls}`}>
        {filteredBlogs.length > 0 ? (
          <div className={`divide-y ${borderSep}`}>
            {filteredBlogs.map((blog, index) => {
              const isDragging = draggedIdx === index;
              const isDropTarget = dropTargetIdx === index;

              return (
                <div
                  key={blog.slug}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all cursor-move group ${
                    isDragging
                      ? "opacity-30 scale-[0.98] bg-neutral-900"
                      : isDropTarget
                      ? "bg-neutral-900/90 border-t-2 border-[#ED3327]"
                      : isLight
                      ? "hover:bg-neutral-50/90"
                      : "hover:bg-neutral-950/80"
                  }`}
                >
                  {/* Left: Drag Handle + Thumbnail + Info */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className="p-1.5 text-neutral-500 hover:text-black dark:hover:text-white cursor-grab active:cursor-grabbing transition-colors"
                      title="Drag to reorder"
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>

                    <span className="font-mono text-xs text-neutral-500 font-bold w-6">
                      {blog.number || `0${index + 1}`}
                    </span>

                    <div className="w-16 h-12 rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden shrink-0 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={blog.coverImage || "/favicon.svg"}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-semibold truncate ${textHeading} group-hover:text-[#ED3327] transition-colors`}>
                          <ScrambleText text={blog.title} hoverColor={accentColor} interactive={true} />
                        </h3>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
                          {blog.badge || blog.category}
                        </span>
                      </div>
                      <p className={`text-xs font-mono truncate ${textSub}`}>
                        {blog.publishedAt} · {blog.readTime}
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <Link
                      href={`/news/${blog.slug}`}
                      target="_blank"
                      className={`p-2 rounded-lg border text-xs transition-colors ${
                        isLight
                          ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-300"
                          : "bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border-neutral-800"
                      }`}
                      title="Preview on Live Site"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleTogglePublish(blog.slug)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
                        blog.published
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-bold"
                          : isLight
                          ? "bg-neutral-100 text-neutral-500 border-neutral-300"
                          : "bg-neutral-900 text-neutral-500 border-neutral-800"
                      }`}
                    >
                      {blog.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{blog.published ? "PUBLISHED" : "DRAFT"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingBlog({ ...blog });
                        setIsCreatingNew(false);
                      }}
                      className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                        isLight
                          ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-300"
                          : "bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-800"
                      }`}
                      title="Edit Post"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteConfirmSlug(blog.slug)}
                      className="p-2 rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                      title="Delete Post"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center space-y-4">
            <Newspaper className="w-10 h-10 mx-auto text-neutral-500" />
            <h4 className={`text-base font-bold ${textHeading}`}>No blog posts found</h4>
            <p className={`text-xs font-mono max-w-sm mx-auto ${textSub}`}>
              Create a new insight dispatch to showcase your technical thoughts and architecture reviews.
            </p>
            <CtaButton onClick={handleAddNew} variant="brand" shape="square" className="!py-2.5 !px-5 text-xs font-mono">
              + CREATE FIRST POST
            </CtaButton>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className={`max-w-md w-full p-6 rounded-2xl border space-y-4 shadow-2xl ${cardCls}`}>
            <h3 className={`text-base font-bold ${textHeading}`}>Delete Blog Post</h3>
            <p className={`text-xs font-mono leading-relaxed ${textSub}`}>
              Are you sure you want to permanently delete this post from MongoDB Atlas? This action cannot be reversed.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmSlug(null)}
                className={`px-4 py-2 rounded-xl text-xs font-mono border transition-colors ${
                  isLight ? "bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-black" : "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-white"
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmSlug)}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-rose-600 hover:bg-rose-700 text-white font-bold transition-colors"
              >
                Delete from MongoDB
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Create Blog Post Modal */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
          <div className={`max-w-2xl w-full p-6 sm:p-8 rounded-2xl border space-y-6 shadow-2xl my-8 ${cardCls}`}>
            <div className={`flex items-center justify-between pb-4 border-b ${borderSep}`}>
              <div className="flex items-center gap-3">
                <Newspaper className="w-5 h-5 text-[#ED3327]" />
                <h3 className={`text-base sm:text-lg font-bold font-mg12-bold ${textHeading}`}>
                  {isCreatingNew ? "Create New Blog Post" : `Edit Post: ${editingBlog.title}`}
                </h3>
              </div>
              <button
                onClick={() => setEditingBlog(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomInputField
                  label="Post Title"
                  name="title"
                  required
                  value={editingBlog.title}
                  onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                  isDark={!isLight}
                />
                <CustomInputField
                  label="URL Slug"
                  name="slug"
                  required
                  value={editingBlog.slug}
                  onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                  isDark={!isLight}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <CustomSelect
                  label="Category"
                  options={["Branding", "Digital Strategy", "3D & Motion", "WebGL & Graphics", "GEO & AI", "Engineering"]}
                  value={editingBlog.category}
                  onChange={(val) => setEditingBlog({ ...editingBlog, category: val })}
                  isDark={!isLight}
                />
                <CustomInputField
                  label="Badge Pill"
                  name="badge"
                  value={editingBlog.badge || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, badge: e.target.value })}
                  isDark={!isLight}
                />
                <CustomInputField
                  label="Read Time"
                  name="readTime"
                  value={editingBlog.readTime}
                  onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                  isDark={!isLight}
                />
              </div>

              <CustomInputField
                label="Cover Image URL"
                name="coverImage"
                value={editingBlog.coverImage}
                onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                isDark={!isLight}
              />

              <CustomInputField
                label="Excerpt / Short Summary"
                name="excerpt"
                value={editingBlog.excerpt}
                onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                multiline
                rows={2}
                isDark={!isLight}
              />

              <CustomInputField
                label="Markdown Content"
                name="content"
                value={editingBlog.content}
                onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                multiline
                rows={6}
                isDark={!isLight}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-neutral-800/40">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                  <input
                    type="checkbox"
                    checked={editingBlog.published}
                    onChange={(e) => setEditingBlog({ ...editingBlog, published: e.target.checked })}
                    className="w-4 h-4 accent-[#ED3327]"
                  />
                  <span className={textHeading}>Publish Post to Website</span>
                </label>

                <div className="flex items-center gap-3">
                  <CtaButton
                    type="button"
                    onClick={() => setEditingBlog(null)}
                    variant="outline"
                    shape="square"
                    className="!py-2.5 !px-5 text-xs font-mono"
                  >
                    CANCEL
                  </CtaButton>
                  <CtaButton
                    type="submit"
                    variant="brand"
                    shape="square"
                    disabled={isPending}
                    className="!py-2.5 !px-6 text-xs font-mono"
                  >
                    {isPending ? "SAVING..." : "SAVE TO MONGODB ↗"}
                  </CtaButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
