"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createAdminSession,
  destroyAdminSession,
  checkAdminCredentials,
} from "@/lib/auth/adminAuth";
import {
  saveThemeSettings,
  saveBrandingSettings,
  saveSEOSettings,
  saveGEOSettings,
  saveTrackingSettings,
  saveProject,
  deleteProject,
  reorderProjects,
  saveBlogPost,
  deleteBlogPost,
  reorderBlogPosts,
  saveDatabaseConfig,
  saveCMSStore,
  resetCMSStore,
} from "@/lib/cms/store";
import {
  ThemeSettings,
  BrandingSettings,
  PageMetaConfig,
  PageContentConfig,
  GEOSettings,
  TrackingSettings,
  ProjectItem,
  BlogPostItem,
  DatabaseConfig,
} from "@/lib/cms/types";

export interface ActionResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/**
 * Admin Login Server Action
 */
export async function loginAction(
  prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const password = formData.get("password") as string;
  const returnUrl = (formData.get("returnUrl") as string) || "/admin";

  if (!password) {
    return { success: false, error: "Please enter the studio master passcode." };
  }

  if (!checkAdminCredentials(password)) {
    return { success: false, error: "Invalid master passcode. Access denied." };
  }

  await createAdminSession();
  redirect(returnUrl);
}

/**
 * Admin Logout Server Action
 */
export async function logoutAction(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}

/**
 * Save Theme Settings
 */
export async function updateThemeAction(
  themeData: Partial<ThemeSettings>
): Promise<ActionResponse<ThemeSettings>> {
  try {
    const updated = await saveThemeSettings(themeData);
    revalidatePath("/", "layout");
    revalidatePath("/admin/theme");
    return { success: true, message: "Studio theme configuration saved successfully.", data: updated };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Save Branding Settings & Flexible Logo Engine
 */
export async function updateBrandingAction(
  brandingData: Partial<BrandingSettings>
): Promise<ActionResponse<BrandingSettings>> {
  try {
    const updated = await saveBrandingSettings(brandingData);
    revalidatePath("/", "layout");
    revalidatePath("/admin/theme");
    return { success: true, message: "Branding & Logo Engine updated successfully.", data: updated };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Save SEO Page-by-Page Config
 */
export async function updateSEOAction(
  seoData: Record<string, PageMetaConfig>
): Promise<ActionResponse<Record<string, PageMetaConfig>>> {
  try {
    const updated = await saveSEOSettings(seoData);
    revalidatePath("/", "layout");
    revalidatePath("/projects");
    revalidatePath("/services");
    revalidatePath("/contact");
    revalidatePath("/admin/seo");
    return { success: true, message: "SEO metadata saved and indexed.", data: updated };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Save GEO (Generative Engine Optimization) Settings
 */
export async function updateGEOAction(
  geoData: Partial<GEOSettings>
): Promise<ActionResponse<GEOSettings>> {
  try {
    const updated = await saveGEOSettings(geoData);
    revalidatePath("/", "layout");
    revalidatePath("/llms.txt");
    revalidatePath("/admin/seo");
    return { success: true, message: "GEO AI Knowledge graph updated successfully.", data: updated };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Save Tracking & Analytics Integrations
 */
export async function updateTrackingAction(
  trackingData: Partial<TrackingSettings>
): Promise<ActionResponse<TrackingSettings>> {
  try {
    const updated = await saveTrackingSettings(trackingData);
    revalidatePath("/", "layout");
    revalidatePath("/admin/integrations");
    return { success: true, message: "Tracking hub & pixels configured successfully.", data: updated };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Save / Create Project
 */
export async function saveProjectAction(
  projectData: Partial<ProjectItem> & { slug: string }
): Promise<ActionResponse<ProjectItem>> {
  try {
    const saved = await saveProject(projectData);
    revalidatePath("/", "layout");
    revalidatePath("/projects");
    revalidatePath(`/projects/${projectData.slug}`);
    revalidatePath("/admin/projects");
    revalidatePath("/sitemap.xml");
    return { success: true, message: `Project "${saved.title}" saved successfully.`, data: saved };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Delete Project
 */
export async function deleteProjectAction(slug: string): Promise<ActionResponse<void>> {
  try {
    const ok = await deleteProject(slug);
    if (!ok) return { success: false, error: "Project not found or already deleted." };
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath("/sitemap.xml");
    return { success: true, message: "Project deleted from portfolio catalog." };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Reorder Projects
 */
export async function reorderProjectsAction(
  orderedSlugs: string[]
): Promise<ActionResponse<ProjectItem[]>> {
  try {
    const updated = await reorderProjects(orderedSlugs);
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    return { success: true, message: "Project display order updated.", data: updated };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Save Page Content Configurations
 */
export async function updatePagesAction(
  pages: Record<string, PageContentConfig>
): Promise<ActionResponse<Record<string, PageContentConfig>>> {
  try {
    const updated = await saveCMSStore({ pages });
    revalidatePath("/", "layout");
    revalidatePath("/projects");
    revalidatePath("/admin/pages");
    return { success: true, message: "Page content saved successfully.", data: updated.pages };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Save Database Settings / Connection
 */
export async function saveDatabaseConfigAction(
  dbConfig: Partial<DatabaseConfig>
): Promise<ActionResponse<DatabaseConfig>> {
  try {
    const updated = await saveDatabaseConfig(dbConfig);
    revalidatePath("/admin/database");
    return { success: true, message: "Database connection preferences saved.", data: updated };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Save Blog Post directly to MongoDB
 */
export async function saveBlogPostAction(
  postData: Partial<BlogPostItem> & { slug: string; title: string }
): Promise<ActionResponse<BlogPostItem>> {
  try {
    const post = await saveBlogPost(postData);
    revalidatePath("/admin/blogs");
    revalidatePath("/news");
    revalidatePath("/");
    return { success: true, message: "Blog post saved directly to MongoDB.", data: post };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to save blog post" };
  }
}

/**
 * Delete Blog Post from MongoDB
 */
export async function deleteBlogPostAction(slug: string): Promise<ActionResponse<boolean>> {
  try {
    await deleteBlogPost(slug);
    revalidatePath("/admin/blogs");
    revalidatePath("/news");
    revalidatePath("/");
    return { success: true, message: "Blog post deleted.", data: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to delete blog post" };
  }
}

/**
 * Reorder Blog Posts
 */
export async function reorderBlogPostsAction(orderedSlugs: string[]): Promise<ActionResponse<BlogPostItem[]>> {
  try {
    const reordered = await reorderBlogPosts(orderedSlugs);
    revalidatePath("/admin/blogs");
    revalidatePath("/news");
    revalidatePath("/");
    return { success: true, message: "Blog posts order updated in MongoDB.", data: reordered };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to reorder blog posts" };
  }
}

/**
 * Reset Store to Factory Defaults
 */
export async function resetStoreAction(): Promise<ActionResponse<void>> {
  try {
    await resetCMSStore();
    revalidatePath("/", "layout");
    revalidatePath("/projects");
    revalidatePath("/admin");
    return { success: true, message: "CMS reset to initial studio seed state." };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}
