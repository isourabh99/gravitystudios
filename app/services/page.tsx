"use client";

import React from "react";
import Navbar from "@/components/navbar/Navbar";
import HorizontalServicesShowcase from "@/components/services/HorizontalServicesShowcase";
import CurvedPerspectiveSlider from "@/components/services/CurvedPerspectiveSlider";
import Footer from "@/components/footer/Footer";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F0] text-neutral-900 flex flex-col font-sans selection:bg-[#ED3327] selection:text-white">
      <Navbar />
      <HorizontalServicesShowcase />
      <CurvedPerspectiveSlider />
      <Footer />
    </main>
  );
}
