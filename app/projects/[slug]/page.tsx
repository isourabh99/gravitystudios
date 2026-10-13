import { redirect } from "next/navigation";
import { getAllProjectSlugs } from "@/data/projectsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({
    slug,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  await params;
  redirect("/projects");
}
