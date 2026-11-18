import React from "react";
import Link from "next/link";
import { ArrowUpRight, Award, Compass, Cpu, Layers, ShieldCheck, Sparkles, Terminal, Users } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ShutterImage from "@/components/ui/ShutterImage";
import ScrambleText from "@/components/ui/ScrambleText";
import CtaButton from "@/components/ui/CtaButton";
import { getThemeSettings } from "@/lib/cms/store";

export const metadata = {
  title: "Studio & Manifesto | Gravity Studios",
  description: "A specialist 3D engineering and design studio crafting high-fidelity WebGL websites, generative SEO, and technical brand identities.",
};

const PILLARS = [
  {
    num: "01",
    title: "Spatial & WebGL Mastery",
    desc: "We don't settle for flat 2D templates. We model, shade, and simulate real-time Three.js/WebGL pipelines running at 60 FPS across desktop and mobile devices.",
    icon: Layers,
  },
  {
    num: "02",
    title: "Generative Engine Optimization (GEO)",
    desc: "We build websites specifically indexed and recommended by AI models (ChatGPT, Gemini, Perplexity). Structured Schema graphs and rich semantic telemetry are baked in.",
    icon: Cpu,
  },
  {
    num: "03",
    title: "Deeptech & Engineering Rigor",
    desc: "We speak the language of founders in robotics, space systems, semiconductors, and decentralized protocols. Complex architectures become clear, memorable spatial narratives.",
    icon: Terminal,
  },
];

const TEAM = [
  {
    name: "Alexei Vane",
    role: "Founder & Creative Director",
    bio: "Pioneering WebGL shader art and spatial UX for over a decade. Former design lead for next-generation hardware studios.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    badge: "FOUNDER",
  },
  {
    name: "Elena Rostova",
    role: "Head of 3D & Graphics",
    bio: "Specializing in Blender, Houdini procedural modeling, and Three.js physics pipelines for autonomous aerospace and robotics.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    badge: "3D LEAD",
  },
  {
    name: "Marcus Thorne",
    role: "Principal Systems Architect",
    bio: "Next.js performance fanatic, micro-frontend architect, and machine-readable data infrastructure specialist.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    badge: "SYSTEMS",
  },
];

const MILESTONES = [
  { label: "Awwwards Site of the Day", val: "14x" },
  { label: "FWA of the Month", val: "8x" },
  { label: "Average WebGL Frame Rate", val: "60 FPS" },
  { label: "Deeptech Client Funding Raised", val: "$420M+" },
];

export default async function StudioPage() {
  const theme = await getThemeSettings();
  const accentColor = theme.accentColor || "#ED3327";

  return (
    <main className="min-h-screen bg-[#F4F4F0] text-neutral-900 flex flex-col font-sans selection:bg-[#ED3327] selection:text-white select-none">
      <Navbar />

      {/* Hero Manifesto */}
      <section className="pt-32 sm:pt-44 pb-20 px-6 sm:px-12 border-b border-neutral-300 relative overflow-hidden bg-[#EFEFEA]">
        <div className="max-w-8xl mx-auto w-full space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-black/5 border border-black/10 text-xs font-mono tracking-widest text-neutral-600 uppercase">
            <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span>GRAVITY STUDIO MANIFESTO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-mg12-bold tracking-tight text-neutral-950 leading-[1.05] max-w-5xl">
            <ScrambleText text="Engineering digital gravity for the world's most ambitious technologies." hoverColor={accentColor} />
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            <div className="lg:col-span-8 text-lg sm:text-xl text-neutral-700 font-sans leading-relaxed space-y-4">
              <p>
                Gravity Studios was founded on a simple truth: breakthrough deeptech, robotics, and hardware innovations cannot be communicated with generic flat web design.
              </p>
              <p className="text-base text-neutral-600">
                We combine production-grade Three.js engineering, custom GLSL shaders, and semantic Generative Engine Optimization (GEO) into digital artifacts that turn passive visitors into invested partners.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <Link href="/contact">
                <CtaButton
                  variant="brand"
                  shape="square"
                  className="!py-3.5 !px-7 text-xs font-mono font-bold"
                >
                  Initiate Studio Dialogue ↗
                </CtaButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Milestones Bar */}
      <section className="py-12 px-6 sm:px-12 bg-black text-white border-b border-neutral-800">
        <div className="max-w-8xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-8">
          {MILESTONES.map((m, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight">
                {m.val}
              </div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Engineering Pillars */}
      <section className="py-20 sm:py-32 px-6 sm:px-12 border-b border-neutral-300">
        <div className="max-w-8xl mx-auto w-full space-y-16">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold block">
              OUR ARCHITECTURAL PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-mg12-bold tracking-tight text-neutral-950">
              <ScrambleText text="The Principles Behind the Craft" hoverColor={accentColor} />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.num}
                  className="p-8 rounded-none bg-white border border-neutral-300 shadow-sm space-y-6 flex flex-col justify-between hover:border-black transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-none bg-black text-white font-mono text-xs font-bold">
                        {pillar.num}
                      </span>
                      <Icon className="w-5 h-5 text-neutral-400 group-hover:text-black transition-colors" />
                    </div>

                    <h3 className="text-xl font-bold font-mg12-bold text-neutral-950 group-hover:text-[#ED3327] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 text-xs font-mono text-neutral-500 uppercase tracking-wider">
                    PRODUCTION STANDARD
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership & Studio Team with Shutter Effects */}
      <section className="py-20 sm:py-32 px-6 sm:px-12 border-b border-neutral-300 bg-[#EFEFEA]">
        <div className="max-w-8xl mx-auto w-full space-y-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-semibold block">
                PEOPLE OF GRAVITY
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold font-mg12-bold tracking-tight text-neutral-950">
                <ScrambleText text="Studio Leads & Craftspeople" hoverColor={accentColor} />
              </h2>
            </div>
            <p className="max-w-md text-xs font-mono text-neutral-600">
              Autonomous cross-disciplinary specialists blending creative code, industrial design, and spatial math.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <div
                key={member.name}
                className="group flex flex-col space-y-4"
              >
                {/* Team Portrait with Shutter Effect & Corner Badge */}
                <div className="relative rounded-none overflow-hidden bg-black shadow-lg border border-neutral-300">
                  <ShutterImage
                    src={member.image}
                    alt={member.name}
                    aspectRatio="aspect-[4/5]"
                    slatCount={6}
                    badge={
                      <div className="absolute bottom-4 left-4 z-30">
                        <span className="px-3 py-1 rounded-none bg-black/80 border border-white/20 text-white font-mono text-[10px] font-bold tracking-widest uppercase">
                          {member.badge}
                        </span>
                      </div>
                    }
                    containerClassName="rounded-none overflow-hidden"
                  />
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold font-mg12-bold text-neutral-950 group-hover:text-[#ED3327] transition-colors">
                      {member.name}
                    </h3>
                    <span className="text-xs font-mono text-neutral-400">0{idx + 1}</span>
                  </div>
                  <p className="text-xs font-mono text-neutral-500 font-semibold uppercase tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed font-sans pt-1">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-24 px-6 sm:px-12 bg-black text-white text-center space-y-8">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-mg12-bold tracking-tight">
          Ready to elevate your technology into 3D gravity?
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-400 font-sans">
          Let&apos;s build an unforgettable spatial website and machine-readable identity for your brand.
        </p>
        <div className="flex justify-center pt-2">
          <Link href="/contact">
            <CtaButton
              variant="brand"
              shape="square"
              className="!py-3.5 !px-7 text-xs font-mono font-bold"
            >
              Start a Project With Us ↗
            </CtaButton>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
