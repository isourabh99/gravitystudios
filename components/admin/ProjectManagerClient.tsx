"use client";

import React, { useState, useTransition } from "react";
import {
  FolderGit2,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Check,
  Search,
  X,
  GripVertical,
  Database,
  Sparkles,
} from "lucide-react";
import { ProjectItem } from "@/lib/cms/types";
import {
  saveProjectAction,
  deleteProjectAction,
  reorderProjectsAction,
} from "@/app/admin/actions";
import CtaButton from "@/components/ui/CtaButton";
import CustomInputField from "@/components/ui/CustomInputField";
import CustomSelect from "@/components/ui/CustomSelect";
import ScrambleText from "@/components/ui/ScrambleText";
import { useAdminTheme } from "@/components/admin/AdminThemeContext";

interface ProjectManagerClientProps {
  initialProjects: ProjectItem[];
  accentColor?: string;
  isDark?: boolean;
}

export default function ProjectManagerClient({
  initialProjects,
  accentColor = "#ED3327",
}: ProjectManagerClientProps) {
  const { isLight } = useAdminTheme();
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);

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
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deleteConfirmSlug, setDeleteConfirmSlug] = useState<string | null>(null);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dropTargetIdx, setDropTargetIdx] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  // Search & filter
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // DRAG AND DROP REORDER HANDLERS
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
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

    const updated = [...projects];
    const [draggedItem] = updated.splice(draggedIdx, 1);
    updated.splice(targetIndex, 0, draggedItem);

    // Re-index order
    const orderedSlugs = updated.map((p) => p.slug);
    const reIndexed = updated.map((p, idx) => ({
      ...p,
      orderIndex: idx,
      number: String(idx + 1).padStart(2, "0"),
    }));

    setProjects(reIndexed);
    setDraggedIdx(null);
    setDropTargetIdx(null);

    startTransition(async () => {
      const res = await reorderProjectsAction(orderedSlugs);
      if (res.success && res.data) {
        setProjects(res.data);
        setToastMessage("Project display order updated in MongoDB.");
        setTimeout(() => setToastMessage(null), 3000);
      }
    });
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDropTargetIdx(null);
  };

  // Open Create Modal
  const handleAddNew = () => {
    const newNumber = String(projects.length + 1).padStart(2, "0");
    const emptyProj: ProjectItem = {
      id: `proj-new-${Date.now()}`,
      number: newNumber,
      slug: `project-${projects.length + 1}`,
      title: "New Case Study",
      client: "Client Name",
      category: "Interactive 3D",
      tagline: "Ultra high-performance WebGL digital flagship.",
      description: "Detailed case study description and architecture breakdown.",
      year: new Date().getFullYear().toString(),
      location: "Bengaluru, India",
      projectType: "WEBGL DIGITAL EXPERIENCE",
      metaString: `INTERACTIVE 3D · ${new Date().getFullYear()}`,
      liveUrl: "https://gravitystudios.com",
      githubUrl: "https://github.com/isourabh99",
      published: true,
      featured: false,
      orderIndex: projects.length,
      video: {
        id: `vid-new`,
        type: "video",
        src: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-code-on-a-laptop-41555-large.mp4",
        poster: "/favicon.svg",
        alt: "Demo showcase",
        caption: "SHOWCASE DEMO",
      },
      images: [
        {
          id: `img-new-web`,
          type: "image",
          src: "/favicon.svg",
          alt: "Desktop Web",
          caption: "DESKTOP WEB EXPERIENCE",
        },
        {
          id: `img-new-app`,
          type: "image",
          src: "/favicon.svg",
          alt: "Mobile App",
          caption: "RESPONSIVE MOBILE APP",
        },
      ],
      overview: "Comprehensive digital transformation narrative.",
      challenge: "Key engineering challenges and performance requirements.",
      solution: "GLSL compute shaders and Next.js 16 App Router streaming.",
      deliverables: ["Creative Direction", "Three.js WebGL Engine"],
      technologies: ["Next.js 16", "Three.js", "React Three Fiber", "Tailwind CSS"],
      results: [{ value: "+140%", label: "Conversion Lift" }],
    };

    setEditingProject(emptyProj);
    setIsCreatingNew(true);
  };

  // Save Project directly to MongoDB
  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    startTransition(async () => {
      const res = await saveProjectAction(editingProject);
      if (res.success && res.data) {
        setToastMessage(`Project "${res.data.title}" saved to MongoDB!`);
        setTimeout(() => setToastMessage(null), 4000);

        setProjects((prev) => {
          const idx = prev.findIndex((p) => p.slug === res.data!.slug);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = res.data!;
            return next;
          } else {
            return [...prev, res.data!];
          }
        });
        setEditingProject(null);
        setIsCreatingNew(false);
      } else {
        setToastMessage(`Error: ${res.error}`);
      }
    });
  };

  // Delete Project from MongoDB
  const handleDeleteConfirm = (slug: string) => {
    startTransition(async () => {
      const res = await deleteProjectAction(slug);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p.slug !== slug));
        setToastMessage("Project deleted from MongoDB catalog.");
        setTimeout(() => setToastMessage(null), 4000);
      } else {
        setToastMessage(`Error: ${res.error}`);
      }
      setDeleteConfirmSlug(null);
    });
  };

  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${borderSep}`}>
        <div>
          <div className="flex items-center gap-3">
            <h1 className={`text-xl sm:text-2xl font-bold font-mg12-bold tracking-tight ${textHeading}`}>
              <ScrambleText text="Project Case Studies CMS" hoverColor={accentColor} />
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-mono text-[11px] font-bold">
              MONGODB DIRECT
            </span>
          </div>
          <p className={`text-xs font-mono mt-1 ${textSub}`}>
            Real portfolio projects stored in MongoDB Atlas with drag-and-drop reordering
          </p>
        </div>

        {/* CtaButton component as used on the live website */}
        <CtaButton
          onClick={handleAddNew}
          variant="brand"
          shape="square"
          className="!py-3 !px-6 text-xs font-mono tracking-widest uppercase font-bold self-start sm:self-auto"
        >
          + ADD NEW CASE STUDY
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
            placeholder="Search real case studies in MongoDB..."
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
            CATALOG: <strong className={textHeading}>{projects.length}</strong> IN MONGODB
          </span>
        </div>
      </div>

      {/* Projects List Table with Drag-and-Drop */}
      <div className={`rounded-2xl border overflow-hidden ${cardCls}`}>
        {filteredProjects.length > 0 ? (
          <div className="divide-y divide-neutral-900">
            {filteredProjects.map((project, index) => {
              const isDragging = draggedIdx === index;
              const isDropTarget = dropTargetIdx === index;

              return (
                <div
                  key={project.slug}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all cursor-move group ${
                    isDragging
                      ? "opacity-30 scale-[0.98] bg-neutral-900"
                      : isDropTarget
                      ? "bg-neutral-900/90 border-t-2 border-[#ED3327]"
                      : "hover:bg-neutral-950/80"
                  }`}
                >
                  {/* Left: Drag Handle + Project Info */}
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Visual Drag Grip Handle */}
                    <div
                      className="p-1.5 text-neutral-600 hover:text-white cursor-grab active:cursor-grabbing transition-colors"
                      title="Drag to reorder"
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>

                    {/* Number Badge */}
                    <span className="font-mono text-xs text-neutral-500 font-bold w-6">
                      {project.number || `0${index + 1}`}
                    </span>

                    {/* Thumbnail */}
                    <div className="w-16 h-12 rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden shrink-0 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.images?.[0]?.src || project.video?.poster || "/favicon.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Title & Metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white group-hover:text-[#ED3327] transition-colors truncate">
                          <ScrambleText text={project.title} hoverColor={accentColor} interactive={true} />
                        </h3>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                          {project.year}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-neutral-400 truncate">
                        {project.client} · {project.category}
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
                        title="Visit Live Site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    <button
                      onClick={() => {
                        setEditingProject(project);
                        setIsCreatingNew(false);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 font-mono text-xs transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setDeleteConfirmSlug(project.slug)}
                      className="p-2 rounded-lg bg-neutral-900 hover:bg-rose-950/40 text-neutral-500 hover:text-rose-400 border border-neutral-800 hover:border-rose-900/50 transition-colors cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State when no real projects exist yet in MongoDB */
          <div className="p-16 text-center space-y-4 font-mono">
            <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center bg-neutral-900 text-neutral-500 border border-neutral-800">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                No Case Studies in MongoDB Yet
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Ready to add your real client work! Click the button below to publish your first case study directly into your MongoDB cluster.
              </p>
            </div>
            <div className="pt-2">
              <CtaButton onClick={handleAddNew} variant="brand" shape="square" className="!py-3 !px-6 text-xs">
                + PUBLISH FIRST CASE STUDY
              </CtaButton>
            </div>
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#0C0C0D] border border-neutral-800 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white font-mg12-bold">
              Confirm Deletion from MongoDB
            </h3>
            <p className="text-xs font-mono text-neutral-400">
              Are you sure you want to remove <strong className="text-white">{deleteConfirmSlug}</strong> from MongoDB Atlas?
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setDeleteConfirmSlug(null)}
                className="px-4 py-2 rounded-lg bg-neutral-900 text-neutral-300 font-mono text-xs hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirm(deleteConfirmSlug)}
                disabled={isPending}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white font-mono text-xs font-bold hover:bg-rose-500"
              >
                {isPending ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / CREATE PROJECT MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl p-6 sm:p-8 rounded-2xl bg-[#09090A] border border-neutral-800 shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-900">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-bold text-xs"
                  style={{ backgroundColor: accentColor }}
                >
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white font-mg12-bold">
                    {isCreatingNew ? "Create Real Case Study in MongoDB" : `Editing: ${editingProject.title}`}
                  </h2>
                  <p className="text-[11px] font-mono text-neutral-400">
                    Slug: /projects/{editingProject.slug}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingProject(null)}
                className="p-2 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-6">
              {/* 1. Core Metadata */}
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#ED3327] block">
                  01 // Core Meta
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <CustomInputField
                    label="Project Title"
                    name="title"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    isDark={!isLight}
                  />
                  <CustomInputField
                    label="Slug (URL)"
                    name="slug"
                    required
                    value={editingProject.slug}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                      })
                    }
                    isDark={!isLight}
                  />
                  <CustomInputField
                    label="Client Name"
                    name="client"
                    value={editingProject.client}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    isDark={!isLight}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-1">
                  <CustomSelect
                    label="Category"
                    options={[
                      "Websites",
                      "3D & Motion",
                      "Brand",
                      "Fundraising",
                      "SEO & GEO",
                      "Design System",
                      "Software",
                    ]}
                    value={editingProject.category}
                    onChange={(val) => setEditingProject({ ...editingProject, category: val })}
                    isDark={!isLight}
                  />
                  <CustomInputField
                    label="Year"
                    name="year"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    isDark={!isLight}
                  />
                  <CustomInputField
                    label="Location"
                    name="location"
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    isDark={!isLight}
                  />
                  <CustomInputField
                    label="Live URL"
                    name="liveUrl"
                    value={editingProject.liveUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    placeholder="https://..."
                    isDark={!isLight}
                  />
                </div>
              </div>

              {/* 2. Editorial Narrative */}
              <div className="space-y-4 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#ED3327] block">
                  02 // Editorial Content
                </span>
                <CustomInputField
                  label="Tagline (One-Liner)"
                  name="tagline"
                  value={editingProject.tagline}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  isDark={!isLight}
                />
                <CustomInputField
                  label="Overview Narrative"
                  name="overview"
                  multiline
                  rows={2}
                  value={editingProject.overview}
                  onChange={(e) => setEditingProject({ ...editingProject, overview: e.target.value })}
                  isDark={!isLight}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CustomInputField
                    label="Challenge"
                    name="challenge"
                    multiline
                    rows={2}
                    value={editingProject.challenge}
                    onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                    isDark={!isLight}
                  />
                  <CustomInputField
                    label="Solution"
                    name="solution"
                    multiline
                    rows={2}
                    value={editingProject.solution}
                    onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                    isDark={!isLight}
                  />
                </div>
              </div>

              {/* 3. Tech Stack Tags */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#ED3327] block">
                  03 // Stack & Deliverables
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-neutral-400">
                      Technologies (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editingProject.technologies?.join(", ") || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="Next.js 16, Three.js, React Three Fiber, GLSL..."
                      className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-neutral-400">
                      Deliverables (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editingProject.deliverables?.join(", ") || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          deliverables: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="Creative Engineering, Design System, WebGL..."
                      className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Showcase Media Assets */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#ED3327] block">
                  04 // Video & Screenshot Assets
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-neutral-400">
                      Showcase Video URL (.mp4)
                    </label>
                    <input
                      type="text"
                      value={editingProject.video?.src || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          video: {
                            ...editingProject.video,
                            src: e.target.value,
                            type: "video",
                            id: editingProject.video?.id || `vid-${editingProject.slug}`,
                            alt: editingProject.video?.alt || "Video",
                            caption: editingProject.video?.caption || "VIDEO DEMO",
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-neutral-400">
                      Desktop Web Image Path
                    </label>
                    <input
                      type="text"
                      value={editingProject.images?.[0]?.src || ""}
                      onChange={(e) => {
                        const newImages = [...editingProject.images];
                        newImages[0] = {
                          ...newImages[0],
                          src: e.target.value,
                          type: "image",
                          id: newImages[0]?.id || `img-${editingProject.slug}-web`,
                          alt: "Desktop Web",
                          caption: "DESKTOP WEB",
                        };
                        setEditingProject({ ...editingProject, images: newImages as any });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-neutral-400">
                      Mobile App Image Path
                    </label>
                    <input
                      type="text"
                      value={editingProject.images?.[1]?.src || ""}
                      onChange={(e) => {
                        const newImages = [...editingProject.images];
                        newImages[1] = {
                          ...newImages[1],
                          src: e.target.value,
                          type: "image",
                          id: newImages[1]?.id || `img-${editingProject.slug}-app`,
                          alt: "Responsive App",
                          caption: "RESPONSIVE APP",
                        };
                        setEditingProject({ ...editingProject, images: newImages as any });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-900">
                <CtaButton
                  type="button"
                  onClick={() => setEditingProject(null)}
                  variant="outline"
                  shape="square"
                  className="!py-3 !px-5 text-xs font-mono font-bold"
                >
                  CANCEL
                </CtaButton>
                <CtaButton
                  type="submit"
                  variant="brand"
                  shape="square"
                  disabled={isPending}
                  className="!py-3 !px-6 text-xs font-mono font-bold"
                >
                  {isPending ? "SAVING TO MONGODB..." : "SAVE & PUBLISH TO MONGODB ↗"}
                </CtaButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
