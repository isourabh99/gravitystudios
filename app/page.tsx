import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import ClientsSection from "@/components/sections/ClientsSection";
import HomeServicesSection from "@/components/home/HomeServicesSection";
import HomeNewsSection from "@/components/home/HomeNewsSection";
import Footer from "@/components/footer/Footer";
import { getCMSStore } from "@/lib/cms/store";

export default async function SinglePageHome() {
  const store = await getCMSStore();

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col relative overflow-x-clip font-sans selection:bg-white selection:text-black scroll-smooth">
      <Navbar />
      <Hero />
      <ClientsSection />
      {/* 3D Interactive Services Showcase (Matching Image 2) */}
      <HomeServicesSection accentColor={store.theme.accentColor} />
      {/* Editorial Blogs & Dispatches from MongoDB CMS (Matching Image 3) */}
      <HomeNewsSection blogs={store.blogs || []} accentColor={store.theme.accentColor} />
      <Footer />
    </div>
  );
}
