import React from "react";
import { headers } from "next/headers";
import { verifyAdminSession } from "@/lib/auth/adminAuth";
import { getCMSStore } from "@/lib/cms/store";
import AdminShellClient from "@/components/admin/AdminShellClient";

export const metadata = {
  title: "Admin Studio Control & CMS | Gravity Studios",
  description: "Next.js App Router Custom CMS, Analytics & Brand Management Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await verifyAdminSession();
  const store = await getCMSStore();

  return (
    <AdminShellClient
      isAuthenticated={isAuthenticated}
      accentColor={store.theme.accentColor}
      initialAdminTheme={store.theme.adminTheme || "dark"}
      brandName={store.branding.textLogo.brandName}
    >
      {children}
    </AdminShellClient>
  );
}
