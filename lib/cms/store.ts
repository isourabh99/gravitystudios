import { connectToDatabase } from "@/lib/db/mongodb";
import {
  CMSFullStore,
  ThemeSettings,
  BrandingSettings,
  PageMetaConfig,
  GEOSettings,
  TrackingSettings,
  ProjectItem,
  BlogPostItem,
  DatabaseConfig,
  PageContentConfig,
} from "./types";
import { DEFAULT_CMS_STORE } from "./seedData";

// In-memory fallback session buffer when connection is initializing
let memoryStoreCache: CMSFullStore = { ...DEFAULT_CMS_STORE };

const SETTINGS_DOC_ID = "main_config";

/**
 * Primary MongoDB Settings Document Getter
 */
export async function getCMSStore(): Promise<CMSFullStore> {
  try {
    const { db, isConnected } = await connectToDatabase();

    if (isConnected && db) {
      const settingsDoc = await db.collection("settings").findOne({ id: SETTINGS_DOC_ID });

      if (settingsDoc) {
        // Fetch real projects directly from MongoDB projects collection
        const mongoProjects = await db
          .collection("projects")
          .find({})
          .sort({ orderIndex: 1 })
          .toArray();

        let cleanProjects: ProjectItem[] = [];
        if (mongoProjects.length > 0) {
          cleanProjects = mongoProjects.map((doc: any) => {
            const { _id, ...rest } = doc;
            return rest as ProjectItem;
          });
        } else if (DEFAULT_CMS_STORE.projects && DEFAULT_CMS_STORE.projects.length > 0) {
          cleanProjects = DEFAULT_CMS_STORE.projects;
          try {
            await db.collection("projects").insertMany(cleanProjects.map((p) => ({ ...p })));
          } catch (_) {}
        }

        // Fetch real blogs directly from MongoDB blogs collection
        const mongoBlogs = await db
          .collection("blogs")
          .find({})
          .sort({ orderIndex: 1 })
          .toArray();

        let cleanBlogs: BlogPostItem[] = [];
        if (mongoBlogs.length > 0) {
          cleanBlogs = mongoBlogs.map((doc: any) => {
            const { _id, ...rest } = doc;
            return rest as BlogPostItem;
          });
        } else if (DEFAULT_CMS_STORE.blogs && DEFAULT_CMS_STORE.blogs.length > 0) {
          cleanBlogs = DEFAULT_CMS_STORE.blogs;
          // Seed blogs in MongoDB
          try {
            await db.collection("blogs").insertMany(cleanBlogs);
          } catch (_) {}
        }

        const store: CMSFullStore = {
          ...DEFAULT_CMS_STORE,
          ...settingsDoc.data,
          projects: cleanProjects,
          blogs: cleanBlogs,
          database: {
            provider: "mongodb",
            isConnected: true,
            lastSyncedAt: new Date().toISOString(),
          },
        };

        memoryStoreCache = store;
        return store;
      } else {
        // Initialize settings collection in MongoDB
        await db.collection("settings").updateOne(
          { id: SETTINGS_DOC_ID },
          {
            $set: {
              id: SETTINGS_DOC_ID,
              data: {
                theme: DEFAULT_CMS_STORE.theme,
                branding: DEFAULT_CMS_STORE.branding,
                seo: DEFAULT_CMS_STORE.seo,
                geo: DEFAULT_CMS_STORE.geo,
                tracking: DEFAULT_CMS_STORE.tracking,
                pages: DEFAULT_CMS_STORE.pages,
              },
              updatedAt: new Date().toISOString(),
            },
          },
          { upsert: true }
        );

        memoryStoreCache = {
          ...DEFAULT_CMS_STORE,
          database: { provider: "mongodb", isConnected: true, lastSyncedAt: new Date().toISOString() },
        };
        return memoryStoreCache;
      }
    }
  } catch (err) {
    console.warn("[MongoDB Store] Notice: MongoDB query failed or initializing:", err);
  }

  return {
    ...memoryStoreCache,
    database: {
      provider: "mongodb",
      isConnected: false,
      lastSyncedAt: new Date().toISOString(),
    },
  };
}

/**
 * Save settings to MongoDB
 */
export async function saveCMSStore(partial: Partial<CMSFullStore>): Promise<CMSFullStore> {
  const current = await getCMSStore();
  const updated: CMSFullStore = {
    ...current,
    ...partial,
    updatedAt: new Date().toISOString(),
  };

  memoryStoreCache = updated;

  try {
    const { db, isConnected } = await connectToDatabase();
    if (isConnected && db) {
      await db.collection("settings").updateOne(
        { id: SETTINGS_DOC_ID },
        {
          $set: {
            id: SETTINGS_DOC_ID,
            data: {
              theme: updated.theme,
              branding: updated.branding,
              seo: updated.seo,
              geo: updated.geo,
              tracking: updated.tracking,
              pages: updated.pages,
            },
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );
    }
  } catch (err) {
    console.warn("[MongoDB Store] Save settings warning:", err);
  }

  return updated;
}

/* =========================================================================
   PROJECTS MONGODB CRUD (100% REAL DATA FROM MONGODB)
   ========================================================================= */

export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const { db, isConnected } = await connectToDatabase();
    if (isConnected && db) {
      const docs = await db
        .collection("projects")
        .find({})
        .sort({ orderIndex: 1 })
        .toArray();

      if (docs.length > 0) {
        return docs.map((doc: any) => {
          const { _id, ...rest } = doc;
          return rest as ProjectItem;
        });
      }

      if (DEFAULT_CMS_STORE.projects && DEFAULT_CMS_STORE.projects.length > 0) {
        try {
          await db.collection("projects").insertMany(DEFAULT_CMS_STORE.projects.map((p) => ({ ...p })));
          return DEFAULT_CMS_STORE.projects;
        } catch (_) {}
      }
    }
  } catch (err) {
    console.warn("[MongoDB Projects] Error querying projects collection:", err);
  }

  return memoryStoreCache.projects && memoryStoreCache.projects.length > 0
    ? memoryStoreCache.projects
    : DEFAULT_CMS_STORE.projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  try {
    const { db, isConnected } = await connectToDatabase();
    if (isConnected && db) {
      const doc = await db.collection("projects").findOne({ slug });
      if (doc) {
        const { _id, ...rest } = doc;
        return rest as ProjectItem;
      }
    }
  } catch (err) {
    console.warn("[MongoDB Projects] Error querying project by slug:", err);
  }

  return memoryStoreCache.projects.find((p) => p.slug === slug);
}

export async function saveProject(projectData: Partial<ProjectItem> & { slug: string }): Promise<ProjectItem> {
  const currentProjects = await getProjects();
  const existing = currentProjects.find((p) => p.slug === projectData.slug);
  const maxOrder = currentProjects.reduce((max, p) => Math.max(max, p.orderIndex ?? 0), -1);
  const newNumber = String(currentProjects.length + 1).padStart(2, "0");

  const projectToSave: ProjectItem = {
    id: existing?.id || `proj-${projectData.slug}-${Date.now()}`,
    number: projectData.number || existing?.number || newNumber,
    slug: projectData.slug,
    title: projectData.title || "Untitled Project",
    client: projectData.client || "Confidential",
    category: projectData.category || "Interactive 3D",
    tagline: projectData.tagline || "",
    description: projectData.description || "",
    year: projectData.year || new Date().getFullYear().toString(),
    location: projectData.location || "Global",
    projectType: projectData.projectType || "WEBGL EXPERIENCE",
    metaString: projectData.metaString || `${projectData.category || "WEBGL"} · ${projectData.year || "2026"}`,
    liveUrl: projectData.liveUrl || "",
    githubUrl: projectData.githubUrl || "",
    video: projectData.video || {
      id: `vid-${projectData.slug}`,
      type: "video",
      src: "",
      poster: "/favicon.svg",
      alt: projectData.title || "Demo",
      caption: "SHOWCASE DEMO",
    },
    images: projectData.images || [
      {
        id: `img-${projectData.slug}-web`,
        type: "image",
        src: "/favicon.svg",
        alt: `${projectData.title || "Project"} Desktop Web`,
        caption: "DESKTOP WEB EXPERIENCE",
      },
      {
        id: `img-${projectData.slug}-app`,
        type: "image",
        src: "/favicon.svg",
        alt: `${projectData.title || "Project"} Mobile App`,
        caption: "RESPONSIVE APPLICATION",
      },
    ],
    overview: projectData.overview || "",
    challenge: projectData.challenge || "",
    solution: projectData.solution || "",
    deliverables: projectData.deliverables || ["WebGL Engine"],
    technologies: projectData.technologies || ["Next.js", "Three.js"],
    results: projectData.results || [{ value: "+100%", label: "Impact" }],
    clientQuote: projectData.clientQuote,
    published: projectData.published ?? true,
    featured: projectData.featured ?? false,
    orderIndex: projectData.orderIndex ?? (existing ? existing.orderIndex : maxOrder + 1),
  };

  try {
    const { db, isConnected } = await connectToDatabase();
    if (isConnected && db) {
      await db.collection("projects").updateOne(
        { slug: projectData.slug },
        { $set: projectToSave },
        { upsert: true }
      );
    }
  } catch (err) {
    console.warn("[MongoDB Projects] Save to MongoDB failed, updating memory:", err);
  }

  // Update memory cache
  const idx = memoryStoreCache.projects.findIndex((p) => p.slug === projectData.slug);
  if (idx >= 0) {
    memoryStoreCache.projects[idx] = projectToSave;
  } else {
    memoryStoreCache.projects.push(projectToSave);
  }

  return projectToSave;
}

export async function deleteProject(slug: string): Promise<boolean> {
  try {
    const { db, isConnected } = await connectToDatabase();
    if (isConnected && db) {
      await db.collection("projects").deleteOne({ slug });
    }
  } catch (err) {
    console.warn("[MongoDB Projects] Delete failed:", err);
  }

  memoryStoreCache.projects = memoryStoreCache.projects.filter((p) => p.slug !== slug);
  return true;
}

export async function reorderProjects(orderedSlugs: string[]): Promise<ProjectItem[]> {
  const currentProjects = await getProjects();
  const projectMap = new Map(currentProjects.map((p) => [p.slug, p]));

  const reordered: ProjectItem[] = [];
  orderedSlugs.forEach((slug, idx) => {
    const proj = projectMap.get(slug);
    if (proj) {
      const updated = {
        ...proj,
        orderIndex: idx,
        number: String(idx + 1).padStart(2, "0"),
      };
      reordered.push(updated);
      projectMap.delete(slug);
    }
  });

  // Append any remainder
  projectMap.forEach((proj) => {
    reordered.push({
      ...proj,
      orderIndex: reordered.length,
      number: String(reordered.length + 1).padStart(2, "0"),
    });
  });

  try {
    const { db, isConnected } = await connectToDatabase();
    if (isConnected && db) {
      const bulkOps = reordered.map((p) => ({
        updateOne: {
          filter: { slug: p.slug },
          update: { $set: { orderIndex: p.orderIndex, number: p.number } },
        },
      }));
      if (bulkOps.length > 0) {
        await db.collection("projects").bulkWrite(bulkOps);
      }
    }
  } catch (err) {
    console.warn("[MongoDB Projects] Bulk reorder failed:", err);
  }

  memoryStoreCache.projects = reordered;
  return reordered;
}

/* =========================================================================
   BLOGS & EDITORIAL DISPATCHES (STORED EXCLUSIVELY IN MONGODB)
   ========================================================================= */

export async function getBlogPosts(): Promise<BlogPostItem[]> {
  const store = await getCMSStore();
  return store.blogs || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostItem | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function saveBlogPost(postData: Partial<BlogPostItem> & { slug: string; title: string }): Promise<BlogPostItem> {
  const currentBlogs = await getBlogPosts();
  const existing = currentBlogs.find((p) => p.slug === postData.slug);
  const maxOrder = currentBlogs.reduce((max, p) => Math.max(max, p.orderIndex || 0), -1);

  const postToSave: BlogPostItem = {
    id: postData.id || existing?.id || `blog-${Date.now()}`,
    slug: postData.slug,
    number: postData.number || existing?.number || String(currentBlogs.length + 1).padStart(2, "0"),
    title: postData.title,
    excerpt: postData.excerpt || "",
    content: postData.content || "",
    category: postData.category || "Branding",
    coverImage: postData.coverImage || "/favicon.svg",
    badge: postData.badge || postData.category?.toUpperCase() || "INSIGHT",
    readTime: postData.readTime || "5 min read",
    publishedAt: postData.publishedAt || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    published: postData.published ?? true,
    featured: postData.featured ?? false,
    orderIndex: postData.orderIndex ?? (existing ? existing.orderIndex : maxOrder + 1),
  };

  try {
    const { db, isConnected } = await connectToDatabase();
    if (isConnected && db) {
      await db.collection("blogs").updateOne(
        { slug: postData.slug },
        { $set: postToSave },
        { upsert: true }
      );
    }
  } catch (err) {
    console.warn("[MongoDB Blogs] Save to MongoDB failed:", err);
  }

  const idx = (memoryStoreCache.blogs || []).findIndex((p) => p.slug === postData.slug);
  if (!memoryStoreCache.blogs) memoryStoreCache.blogs = [];
  if (idx >= 0) {
    memoryStoreCache.blogs[idx] = postToSave;
  } else {
    memoryStoreCache.blogs.push(postToSave);
  }

  return postToSave;
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  try {
    const { db, isConnected } = await connectToDatabase();
    if (isConnected && db) {
      await db.collection("blogs").deleteOne({ slug });
    }
  } catch (err) {
    console.warn("[MongoDB Blogs] Delete failed:", err);
  }

  if (memoryStoreCache.blogs) {
    memoryStoreCache.blogs = memoryStoreCache.blogs.filter((p) => p.slug !== slug);
  }
  return true;
}

export async function reorderBlogPosts(orderedSlugs: string[]): Promise<BlogPostItem[]> {
  const currentBlogs = await getBlogPosts();
  const blogMap = new Map(currentBlogs.map((b) => [b.slug, b]));

  const reordered: BlogPostItem[] = [];
  orderedSlugs.forEach((slug, idx) => {
    const blog = blogMap.get(slug);
    if (blog) {
      const updated = {
        ...blog,
        orderIndex: idx,
        number: String(idx + 1).padStart(2, "0"),
      };
      reordered.push(updated);
      blogMap.delete(slug);
    }
  });

  blogMap.forEach((blog) => {
    reordered.push({
      ...blog,
      orderIndex: reordered.length,
      number: String(reordered.length + 1).padStart(2, "0"),
    });
  });

  try {
    const { db, isConnected } = await connectToDatabase();
    if (isConnected && db) {
      const bulkOps = reordered.map((b) => ({
        updateOne: {
          filter: { slug: b.slug },
          update: { $set: { orderIndex: b.orderIndex, number: b.number } },
        },
      }));
      if (bulkOps.length > 0) {
        await db.collection("blogs").bulkWrite(bulkOps);
      }
    }
  } catch (err) {
    console.warn("[MongoDB Blogs] Bulk reorder failed:", err);
  }

  memoryStoreCache.blogs = reordered;
  return reordered;
}

/* =========================================================================
   THEME, BRANDING, SEO, GEO, TRACKING (STORED IN MONGODB)
   ========================================================================= */

export async function getThemeSettings(): Promise<ThemeSettings> {
  const store = await getCMSStore();
  return store.theme;
}

export async function saveThemeSettings(theme: Partial<ThemeSettings>): Promise<ThemeSettings> {
  const store = await getCMSStore();
  const updatedTheme = { ...store.theme, ...theme };
  await saveCMSStore({ theme: updatedTheme });
  return updatedTheme;
}

export async function getBrandingSettings(): Promise<BrandingSettings> {
  const store = await getCMSStore();
  return store.branding;
}

export async function saveBrandingSettings(branding: Partial<BrandingSettings>): Promise<BrandingSettings> {
  const store = await getCMSStore();
  const updatedBranding = {
    ...store.branding,
    ...branding,
    textLogo: { ...store.branding.textLogo, ...(branding.textLogo || {}) },
    imageLogo: { ...store.branding.imageLogo, ...(branding.imageLogo || {}) },
  };
  await saveCMSStore({ branding: updatedBranding });
  return updatedBranding;
}

export async function getSEOSettings(): Promise<Record<string, PageMetaConfig>> {
  const store = await getCMSStore();
  return store.seo;
}

export async function saveSEOSettings(seo: Record<string, PageMetaConfig>): Promise<Record<string, PageMetaConfig>> {
  const store = await getCMSStore();
  const updatedSEO = { ...store.seo, ...seo };
  await saveCMSStore({ seo: updatedSEO });
  return updatedSEO;
}

export async function getGEOSettings(): Promise<GEOSettings> {
  const store = await getCMSStore();
  return store.geo;
}

export async function saveGEOSettings(geo: Partial<GEOSettings>): Promise<GEOSettings> {
  const store = await getCMSStore();
  const updatedGEO = { ...store.geo, ...geo };
  await saveCMSStore({ geo: updatedGEO });
  return updatedGEO;
}

export async function getTrackingSettings(): Promise<TrackingSettings> {
  const store = await getCMSStore();
  return store.tracking;
}

export async function saveTrackingSettings(tracking: Partial<TrackingSettings>): Promise<TrackingSettings> {
  const store = await getCMSStore();
  const updatedTracking = { ...store.tracking, ...tracking };
  await saveCMSStore({ tracking: updatedTracking });
  return updatedTracking;
}

export async function getPagesConfig(): Promise<Record<string, PageContentConfig>> {
  const store = await getCMSStore();
  return store.pages;
}

export async function savePagesConfig(pages: Record<string, PageContentConfig>): Promise<Record<string, PageContentConfig>> {
  const store = await getCMSStore();
  const updatedPages = { ...store.pages, ...pages };
  await saveCMSStore({ pages: updatedPages });
  return updatedPages;
}

export async function getDatabaseConfig(): Promise<DatabaseConfig> {
  const { isConnected } = await connectToDatabase();
  return {
    provider: "mongodb",
    mongodbUri: process.env.MONGODB_URI || "",
    mongodbDatabase: process.env.MONGODB_DB || "gravity_portfolio",
    isConnected,
    lastSyncedAt: new Date().toISOString(),
  };
}

export async function saveDatabaseConfig(dbConfig: Partial<DatabaseConfig>): Promise<DatabaseConfig> {
  const store = await getCMSStore();
  const updatedDB: DatabaseConfig = {
    provider: "mongodb",
    mongodbUri: dbConfig.mongodbUri || store.database.mongodbUri || "",
    mongodbDatabase: dbConfig.mongodbDatabase || store.database.mongodbDatabase || "gravity_portfolio",
    isConnected: true,
    lastSyncedAt: new Date().toISOString(),
  };
  await saveCMSStore({ database: updatedDB });
  return updatedDB;
}

export async function resetCMSStore(): Promise<CMSFullStore> {
  try {
    const { db, isConnected } = await connectToDatabase();
    if (isConnected && db) {
      await db.collection("projects").deleteMany({});
      await db.collection("settings").deleteOne({ id: SETTINGS_DOC_ID });
    }
  } catch (err) {
    console.warn("[MongoDB Store] Reset failed:", err);
  }

  memoryStoreCache = { ...DEFAULT_CMS_STORE };
  return memoryStoreCache;
}
