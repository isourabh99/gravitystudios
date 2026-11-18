import React from "react";
import { getBlogPosts, getThemeSettings } from "@/lib/cms/store";
import BlogManagerClient from "@/components/admin/BlogManagerClient";

export const metadata = {
  title: "Blogs & News CMS | Studio Admin",
  description: "Manage editorial articles, insights, and news dispatches with MongoDB.",
};

export default async function AdminBlogsPage() {
  const [blogs, theme] = await Promise.all([
    getBlogPosts(),
    getThemeSettings(),
  ]);

  return (
    <BlogManagerClient
      initialBlogs={blogs}
      accentColor={theme.accentColor}
    />
  );
}

