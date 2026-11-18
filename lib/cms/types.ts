import { Project } from "@/data/projectsData";

export type ThemeMode = "dark" | "light" | "system";

export interface ThemeSettings {
  mode: ThemeMode;
  background: string;       // e.g., "#000000"
  foreground: string;       // e.g., "#F4F4F0"
  accentColor: string;      // e.g., "#ED3327"
  secondaryAccent: string;  // e.g., "#3B82F6"
  glassmorphism: boolean;
  gridOverlay: boolean;
  scanlines: boolean;
  fontFamily: "mg12" | "inter" | "mono" | "system";

  // Button & Scramble Text customizer
  buttonShape: "square" | "pill" | "rounded";
  buttonBgColor: string;
  buttonTextColor: string;
  buttonHoverBg: string;
  scrambleEnabled: boolean;
  scrambleHoverColor: string;

  // Admin Theme preference
  adminTheme: "dark" | "light";
}

export type LogoType = "text" | "image";
export type LogoFontWeight = "light" | "regular" | "semibold" | "bold";

export interface TextLogoConfig {
  brandName: string;         // e.g., "gravity studios"
  subText?: string;          // e.g., "benchmark of digital innovation"
  fontWeight: LogoFontWeight;
  uppercase: boolean;
  letterSpacing: string;     // e.g., "0.05em"
  orbitingDot: boolean;      // 3D spinning orbit dot
}

export interface ImageLogoConfig {
  url: string;               // primary logo image URL or uploaded asset
  darkUrl?: string;          // variant for dark backgrounds
  lightUrl?: string;         // variant for light backgrounds
  alt: string;
  height: number;            // in pixels, e.g. 28
  maxWidth?: number;
}

export interface BrandingSettings {
  logoType: LogoType;
  textLogo: TextLogoConfig;
  imageLogo: ImageLogoConfig;
  faviconUrl?: string;
  tagline: string;
  companyName: string;
  foundingYear: string;
  location: string;
  contactEmail: string;
  contactPhone?: string;
}

export interface PageMetaConfig {
  slug: string;              // "home", "projects", "services", "contact", "studio", "news"
  pageName: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonicalUrl?: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
}

export interface FAQBlock {
  question: string;
  answer: string;
}

export interface GEOSettings {
  developerName: string;
  studioName: string;
  headline: string;
  schemaType: "Person" | "Organization" | "ProfilePage";
  primaryRole: string;
  specializationSummary: string;
  expertiseTags: string[];
  targetRecommendations: string;
  aiReadableSummary: string;
  contextualQA: FAQBlock[];
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  enableLlmsTxt: boolean;
}

export interface TrackingSettings {
  vercelAnalyticsEnabled: boolean;
  googleAnalyticsId: string;
  googleAnalyticsEnabled?: boolean;
  googleTagManagerId?: string;
  metaPixelId: string;
  metaPixelEnabled: boolean;
  customHeadScripts: string;
  customHeadScriptsEnabled?: boolean;
  customBodyScripts: string;
}

export interface PageContentSection {
  id: string;
  title: string;
  badge?: string;
  headline: string;
  subheadline: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  visible: boolean;
}

export interface PageContentConfig {
  slug: string;              // "home", "projects", "services", "contact", "studio", "news"
  title: string;
  sections: PageContentSection[];
}

export interface ProjectItem extends Project {
  id: string;
  published: boolean;
  featured: boolean;
  orderIndex: number;
  githubUrl?: string;
}

export interface AnalyticsDataPoint {
  date: string;
  label: string;
  visitors: number;
  pageviews: number;
  sessions: number;
  bounceRate: number;
}

export interface AnalyticsReferrer {
  source: string;
  domain: string;
  visitors: number;
  pageviews: number;
  percentage: number;
  trend: number;
  category: "social" | "direct" | "search" | "portfolio" | "referral";
}

export interface AnalyticsProjectStat {
  slug: string;
  title: string;
  category: string;
  views: number;
  uniqueVisitors: number;
  avgDuration: string;
  inquiryClicks: number;
  share: number;
}

export interface AnalyticsMetrics {
  totalVisitors: number;
  visitorsTrend: number;
  totalPageviews: number;
  pageviewsTrend: number;
  avgSessionDuration: string;
  sessionDurationTrend: number;
  bounceRate: number;
  bounceRateTrend: number;
  activeUsersNow: number;
  timeRange: "24h" | "7d" | "30d" | "90d";
  timeline: AnalyticsDataPoint[];
  referrers: AnalyticsReferrer[];
  topProjects: AnalyticsProjectStat[];
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  browserBreakdown: {
    chrome: number;
    safari: number;
    firefox: number;
    edge: number;
    other: number;
  };
  geographicBreakdown: {
    country: string;
    code: string;
    visitors: number;
    percentage: number;
  }[];
}

export interface DatabaseConfig {
  provider: "mongodb";
  mongodbUri?: string;
  mongodbDatabase?: string;
  isConnected: boolean;
  lastSyncedAt?: string;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  number: string;        // e.g. "01", "02"
  title: string;
  excerpt: string;
  content: string;
  category: string;      // e.g. "Branding", "Digital Strategy", "3D & Motion"
  coverImage: string;
  badge?: string;        // e.g. "BRANDING", "DIGITAL STRATEGY"
  readTime: string;      // e.g. "4 min read"
  author?: string;       // e.g. "Gravity Engineering"
  publishedAt: string;   // e.g. "Oct 15, 2026"
  published: boolean;
  featured: boolean;
  orderIndex: number;
}

export interface CMSFullStore {
  version: string;
  updatedAt: string;
  theme: ThemeSettings;
  branding: BrandingSettings;
  seo: Record<string, PageMetaConfig>;
  geo: GEOSettings;
  tracking: TrackingSettings;
  projects: ProjectItem[];
  blogs: BlogPostItem[];
  pages: Record<string, PageContentConfig>;
  database: DatabaseConfig;
}
