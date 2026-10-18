import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work, digital products, and web experiences for ambitious companies. Case studies for Sutra CRM, Indus Luxe, Sarva CMS, Kala Studio, Kosh Wealth, Pravaah Logistics, Veda Health, and Drishti AI.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Gravity Studios",
    description:
      "Selected work, digital products, and 3D web experiences for ambitious tech companies at pivotal moments.",
    url: "https://gravitystudios.com/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
