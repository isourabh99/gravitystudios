import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work, digital products, and 3D web experiences for ambitious tech companies at pivotal moments. Case studies for HyLight, Artefact, Skipper NDT, blink, Alt-a, Kestrix, and BotBlox.",
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
