"use client";

import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import ClientsSection from "@/components/sections/ClientsSection";
import Footer from "@/components/footer/Footer";

export default function SinglePageHome() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col relative overflow-x-clip font-sans selection:bg-white selection:text-black scroll-smooth">
      <Navbar />
      <Hero />
      <ClientsSection />
      <Footer />
    </div>
  );
}
