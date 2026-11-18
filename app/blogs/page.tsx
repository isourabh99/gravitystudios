import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import NewsListingClient from "@/components/news/NewsListingClient";
import { getBlogPosts, getThemeSettings } from "@/lib/cms/store";

export const metadata = {
  title: "Blogs & Technical Insights | Gravity Studios",
  description: "Read technical articles, 3D WebGL architecture breakdowns, generative AI optimization, and digital craftsmanship directly from Gravity Studios.",
};

export default async function BlogsPage() {
  const [blogs, theme] = await Promise.all([
    getBlogPosts(),
    getThemeSettings(),
  ]);

  return (
    <main className="min-h-screen bg-[#F4F4F0] text-neutral-900 flex flex-col font-sans selection:bg-[#ED3327] selection:text-white">
      <Navbar />
      <div className="flex-1">
        <NewsListingClient initialBlogs={blogs} accentColor={theme.accentColor} />
      </div>
      <Footer />
    </main>
  );
}

