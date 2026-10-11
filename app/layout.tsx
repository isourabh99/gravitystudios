import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import UniversalLoaderWrapper from "@/components/loader/UniversalLoaderWrapper";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

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
};

// JSON-LD Structured Data Schema Markup (Google Search Rich Results)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Gravity Studios",
      url: siteUrl,
      description:
        "Creative studio crafting digital experiences, websites, and real-time 3D interactive applications for forward-thinking brands.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "isourabhsoni99@gmail.com",
        telephone: "+91-8871795472",
      },
      sameAs: [
        "https://linkedin.com/in/isourabh99",
        "https://instagram.com/isaurabh_99",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Gravity Studios",
      description: "The Benchmark of Digital Innovation",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${mg12Bold.variable} ${mg12Regular.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <GoogleAnalytics />
        <SmoothScrollProvider>
          <UniversalLoaderWrapper>
            {children}
          </UniversalLoaderWrapper>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
