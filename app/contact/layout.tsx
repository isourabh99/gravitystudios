import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "We're always up for discussing a new project. Get in touch with Gravity Studios to discuss goals, timeline, and estimates.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Gravity Studios",
    description:
      "We're always up for discussing a new project. Reach out to design and engineering.",
    url: "https://gravitystudios.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
