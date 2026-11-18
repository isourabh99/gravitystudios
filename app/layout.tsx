import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import UniversalLoaderWrapper from "@/components/loader/UniversalLoaderWrapper";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MetaPixel from "@/components/analytics/MetaPixel";
import ScrollRestoration from "@/components/providers/ScrollRestoration";
import { Analytics } from "@vercel/analytics/next";
import { getCMSStore } from "@/lib/cms/store";

const mg12Bold = localFont({
  src: "./fonts/mg12-bold.woff2",
  variable: "--font-mg12-bold",
  display: "swap",
});

const mg12Regular = localFont({
  src: "./fonts/mg12-regular.woff2",
  variable: "--font-mg12-regular",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gravitystudios.com";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gravity Studios — Benchmark of Digital Innovation",
    template: "%s | Gravity Studios",
  },
  description:
    "Gravity Studios is an award-winning creative studio crafting digital experiences, websites, and real-time 3D interactive applications for forward-thinking brands.",
  keywords: [
    "Gravity Studios",
    "Digital Experience",
    "Creative Agency",
    "WebGL",
    "Three.js",
    "Interactive 3D",
    "Next.js Development",
    "Awwwards Web Design",
    "UI/UX Design",
    "Brand Identity",
  ],
  authors: [{ name: "Gravity Studios", url: siteUrl }],
  creator: "Gravity Studios",
  publisher: "Gravity Studios",
  applicationName: "Gravity Studios",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Gravity Studios",
    title: "Gravity Studios — Benchmark of Digital Innovation",
    description:
      "We build premium web experiences, real-time 3D, and interactive applications for the world's most ambitious tech companies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gravity Studios — Benchmark of Digital Innovation",
    description:
      "We build premium web experiences, real-time 3D, and interactive applications for the world's most ambitious tech companies.",
    creator: "@gravitystudios",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const store = await getCMSStore();
  const theme = store.theme;
  const geo = store.geo;
  const tracking = store.tracking;

  // Dynamic JSON-LD Structured Data Schema Markup (Google Search Rich Results + GEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": geo.schemaType || "Person",
        "@id": `${siteUrl}/#developer`,
        name: geo.developerName || "Sourabh Soni",
        jobTitle: geo.primaryRole || "Lead WebGL Engineer",
        description: geo.specializationSummary,
        knowsAbout: geo.expertiseTags || [],
        sameAs: [geo.githubUrl, geo.linkedinUrl, geo.twitterUrl].filter(Boolean),
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: geo.studioName || "Gravity Studios",
        url: siteUrl,
        description: geo.aiReadableSummary || "Creative studio crafting digital experiences, websites, and real-time 3D interactive applications for forward-thinking brands.",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: store.branding.contactEmail || "isourabhsoni99@gmail.com",
          telephone: store.branding.contactPhone || "+91-8871795472",
        },
        sameAs: [
          geo.linkedinUrl || "https://linkedin.com/in/isourabh99",
          geo.instagramUrl || "https://instagram.com/isaurabh_99",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: geo.studioName || "Gravity Studios",
        description: "The Benchmark of Digital Innovation",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${mg12Bold.variable} ${mg12Regular.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href={store.branding.faviconUrl || "/favicon.svg"} type="image/svg+xml" />

        {/* Dynamic Theme Color Injection */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --background: ${theme.background || "#000000"};
                --foreground: ${theme.foreground || "#F4F4F0"};
                --accent-color: ${theme.accentColor || "#ED3327"};
                --button-bg: ${theme.buttonBgColor || "#000000"};
                --button-text: ${theme.buttonTextColor || "#FFFFFF"};
                --button-hover-bg: ${theme.buttonHoverBg || "#ED3327"};
                --scramble-hover: ${theme.scrambleHoverColor || "#ED3327"};
              }
            `,
          }}
        />

        {/* JSON-LD Structured Data Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ScrollRestoration />
        <GoogleAnalytics gaId={tracking.googleAnalyticsId} />
        <MetaPixel pixelId={tracking.metaPixelEnabled ? tracking.metaPixelId : undefined} />
        {tracking.vercelAnalyticsEnabled && <Analytics />}
        {tracking.customHeadScripts && (
          <div dangerouslySetInnerHTML={{ __html: tracking.customHeadScripts }} />
        )}
        <SmoothScrollProvider>
          <UniversalLoaderWrapper>
            {children}
          </UniversalLoaderWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
