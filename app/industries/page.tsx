import React from "react";
import Link from "next/link";
import { ArrowUpRight, Bot, Cpu, Globe, Rocket, Shield, Sparkles, Zap } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ShutterImage from "@/components/ui/ShutterImage";
import ScrambleText from "@/components/ui/ScrambleText";
import CtaButton from "@/components/ui/CtaButton";
import { getThemeSettings } from "@/lib/cms/store";

export const metadata = {
  title: "Industries & Sectors | Gravity Studios",
  description: "Specialized 3D WebGL websites and spatial technical narratives engineered for robotics, aerospace, semiconductors, and deeptech infrastructure.",
};

const INDUSTRIES = [
  {
    num: "01",
    name: "Robotics & Autonomous Platforms",
    subtitle: "Drone fleets, quadruped inspection units & micro-robotics hardware.",
    desc: "We render millimeter-accurate CAD assemblies in real-time WebGL. Allow engineers and decision makers to inspect internal PCB routing, brushless motor mounts, and lidar sensors directly in their browser.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    client: "BotBlox · Robotics Hardware",
    tags: ["Real-time 3D CAD", "Hardware Exploded View", "60 FPS Shaders"],
    icon: Bot,
  },
  {
    num: "02",
    name: "Aerospace & Orbital Defense",
    subtitle: "Satellite constellations, optical comms & tactical launch systems.",
    desc: "Complex atmospheric trajectories and orbital kinematics visualized with precision. We construct interactive celestial simulations and telemetry dashboards that communicate mission reliability to government and defense partners.",
    image: "https://images.unsplash.com/photo-1517976487502-520f924734a7?auto=format&fit=crop&w=1200&q=80",
    client: "Apex Orbitals · Defense Avionics",
    tags: ["Orbital Ephemeris", "Mission Telemetry", "Three.js Particle Systems"],
    icon: Rocket,
  },
  {
    num: "03",
    name: "Deeptech & Semiconductor Silicon",
    subtitle: "Photonics, quantum logic gates & sub-nanometer interconnects.",
    desc: "When your product is measured in nanometers or invisible photons, conventional photography fails. We design volumetric raymarched shaders and 3D visual metaphors that make complex physics tangible.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    client: "Aura Photonics · Optical Computing",
    tags: ["Raymarched Shaders", "Volumetric Light", "Scientific Precision"],
    icon: Cpu,
  },
  {
    num: "04",
    name: "AI Foundations & Neural Compute",
    subtitle: "Distributed cluster infrastructure & generative runtime stacks.",
    desc: "AI buyers require concrete proof of latency, throughput, and hardware topology. We integrate live telemetry graphs, generative model visualizers, and GEO machine-readable schemas.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    client: "Synapse Labs · Distributed Inference",
    tags: ["Generative Telemetry", "GEO Schema Graph", "Node Visualizers"],
    icon: Sparkles,
  },
  {
    num: "05",
    name: "Energy Transition & Fusion Tech",
    subtitle: "Megawatt grid storage, magnetic confinement & green hydrogen.",
    desc: "Global decarbonization requires massive capital expenditure. We architect interactive digital twins of fusion tokamaks and battery megastructures to convince institutional ESG allocators.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    client: "Helios Energy · Plasma Confinement",
    tags: ["Digital Twin", "Plasma Simulation", "Thermal Flow Visuals"],
    icon: Zap,
  },
  {
    num: "06",
    name: "Cryptographic Protocols & Zero Knowledge",
    subtitle: "ZK-rollups, modular consensus engines & decentralized networks.",
    desc: "Turn dense whitepapers into interactive visual proofs. We explain state transitions, consensus rounds, and cryptographic commitments through intuitive 3D spatial sequences.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    client: "Chronos Protocol · Modular ZK",
    tags: ["ZK Proof Visualizer", "State Graph", "Custom WebGL Canvas"],
    icon: Shield,
  },
];

export default async function IndustriesPage() {
  const theme = await getThemeSettings();
  const accentColor = theme.accentColor || "#ED3327";

  return (
    <main className="min-h-screen bg-[#F4F4F0] text-neutral-900 flex flex-col font-sans selection:bg-[#ED3327] selection:text-white select-none">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 sm:pt-44 pb-20 px-6 sm:px-12 border-b border-neutral-300 relative overflow-hidden bg-[#EFEFEA]">
        <div className="max-w-8xl mx-auto w-full space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-black/5 border border-black/10 text-xs font-mono tracking-widest text-neutral-600 uppercase">
            <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
            <span>SPECIALIZED SECTORS & CLIENT VERTICALS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-mg12-bold tracking-tight text-neutral-950 leading-[1.05] max-w-5xl">
            <ScrambleText text="Purpose-built for industries where precision engineering is paramount." hoverColor={accentColor} />
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-neutral-700 font-sans leading-relaxed">
            We partner with visionary founders in aerospace, robotics, micro-electronics, and foundational AI to translate high-entropy technical breakthroughs into captivating digital interfaces.
          </p>
        </div>
      </section>

      {/* Industry Showcase Grid */}
      <section className="py-20 sm:py-32 px-6 sm:px-12">
        <div className="max-w-8xl mx-auto w-full space-y-24">
          {INDUSTRIES.map((ind, idx) => {
            const Icon = ind.icon;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={ind.num}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Media Column with Chamfered Cut-Corner Card & Shutter Effect */}
                <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative group rounded-none overflow-hidden shadow-2xl bg-black border border-neutral-300">
                    <ShutterImage
                      src={ind.image}
                      alt={ind.name}
                      aspectRatio="aspect-[16/10]"
                      slatCount={7}
                      chamfered={true}
                      badge={
                        <div className="absolute top-4 left-4 z-30">
                          <span
                            className="px-3 py-1 text-white font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-md rounded-none"
                            style={{ backgroundColor: accentColor }}
                          >
                            <span>{ind.client}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </div>
                      }
                      containerClassName="rounded-none overflow-hidden"
                    />
                  </div>
                </div>

                {/* Text Description Column */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-none bg-black text-white font-mono text-xs font-bold">
                      {ind.num}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                      VERTICAL FOCUS
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-bold font-mg12-bold text-neutral-950 leading-tight">
                    <ScrambleText text={ind.name} hoverColor={accentColor} />
                  </h2>

                  <p className="text-sm font-mono text-neutral-700 font-semibold">
                    {ind.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
                    {ind.desc}
                  </p>

                  {/* Capability Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {ind.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-none bg-neutral-200/80 border border-neutral-300 text-xs font-mono text-neutral-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link href="/contact">
                      <CtaButton
                        variant="outline"
                        shape="square"
                        className="!py-3 !px-5 text-xs font-mono font-bold"
                      >
                        Consult on {ind.name.split(" ")[0]} ↗
                      </CtaButton>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 sm:px-12 bg-black text-white text-center space-y-8">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-mg12-bold tracking-tight">
          Have an unconventional engineering challenge?
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-400 font-sans">
          We relish unchartered territory. Schedule an architectural briefing with our creative engineering team.
        </p>
        <div className="flex justify-center pt-2">
          <Link href="/contact">
            <CtaButton
              variant="brand"
              shape="square"
              className="!py-3.5 !px-7 text-xs font-mono font-bold"
            >
              Schedule Architecture Briefing ↗
            </CtaButton>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
