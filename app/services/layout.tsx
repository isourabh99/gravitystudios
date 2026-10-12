import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our services: Web Design & UX, Next.js & Framer Development, Real-Time 3D WebGL Experiences, Visual Identity, and Technical AI Search Optimization (GEO).",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Gravity Studios",
    description:
      "Explore our services: Web Design & UX, Next.js & Framer Development, Real-Time 3D WebGL Experiences, Visual Identity, and Technical AI Search Optimization.",
    url: "https://gravitystudios.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
