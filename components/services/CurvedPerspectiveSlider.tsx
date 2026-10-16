"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import IndustryDetailDrawer, { IndustryDetailData } from "./IndustryDetailDrawer";
import ScrambleText from "@/components/ui/ScrambleText";

export type { IndustryDetailData };

const BASE_INDUSTRIES: IndustryDetailData[] = [
  {
    id: "deeptech",
    num: "01",
    title: "DeepTech",
    category: "AEROSPACE & PROPULSION",
    imageUrl: "/images/industries/deeptech.jpg",
    accentColor: "#ED3327",
    link: "/industries/deeptech",
    alt: "DeepTech: looking into a vacuum chamber, laser light across machined steel",
    tagline: "Websites designed for technical buyers who need to verify extreme science before committing capital.",
    overview:
      "DeepTech companies struggle to convey proprietary physics and vacuum-chamber hardware to non-specialist venture funds and enterprise procurement officers. We build interactive 3D telemetry, exploded CAD subsystems, and interactive data rooms that turn defensible science into closed contracts.",
    approach: {
      challenge: "Hard engineering innovations appear high-risk when shown through generic commercial templates and stock renders.",
      solution: "We model actual subsystem schematics and interactive simulation sandboxes, letting buyers test performance parameters right in the browser.",
    },
    results: [
      { value: "$180M+", label: "Capital Raised by Clients" },
      { value: "84%", label: "Technical Retention Rate" },
      { value: "3x", label: "Procurement Speed Lift" },
    ],
    deliverables: [
      "Interactive Kinetic 3D Subsystem Explorers",
      "Vacuum Chamber & Propulsion Telemetry Feeds",
      "Investor-Ready Architecture & Data Rooms",
      "High-Fidelity CAD-to-Web Exploded Breakdowns",
      "Full Technical Documentation & Whitepaper Hub",
    ],
    metadata: {
      domain: "Propulsion & Space",
      location: "Global / Silicon Valley",
      year: "2025–2026",
      type: "Digital Flagship & 3D Web",
    },
    technologies: ["Three.js", "WebGL Shaders", "Next.js", "CAD Optimization", "Framer Motion", "Lenis Scroll"],
    quote: {
      quote: "Gravity turned our complex plasma physics into a stunning interactive site that closed our lead defense investor in weeks.",
      author: "Dr. Marcus Vance",
      role: "VP Engineering, AeroDynamics",
    },
  },
  {
    id: "climate-tech",
    num: "02",
    title: "Climate Tech",
    category: "RENEWABLE ENERGY & AGRI",
    imageUrl: "/images/industries/climate.jpg",
    accentColor: "#10B981",
    link: "/industries/climate-tech",
    alt: "Climate Tech: a wind turbine alone in a sunlit field, seen from above",
    tagline: "Audit-proof environmental storytelling backed by live telemetry and transparent data modeling.",
    overview:
      "Carbon buyers, institutional investors, and regulatory bodies demand unshakeable data clarity. We create verifiable digital experiences with live lifecycle analysis calculators, field sensor feeds, and interactive grid dispatch models that make environmental claims unmistakable.",
    approach: {
      challenge: "General public sustainability claims are met with skepticism unless substantiated by rigorous mathematical modeling.",
      solution: "We translate raw telemetry from remote wind and solar assets into real-time interactive dashboards that buyers can interrogate.",
    },
    results: [
      { value: "2.4M", label: "Tons CO₂ Verified" },
      { value: "+62%", label: "Institutional Conversion" },
      { value: "$42M", label: "Utility PPAs Secured" },
    ],
    deliverables: [
      "Real-Time Carbon Impact & Offsetting Calculators",
      "Live IoT Field Telemetry Visualization Maps",
      "Regulatory Compliance & ESG Audit Rooms",
      "Interactive Hybrid Grid Battery Dispatch Models",
      "Clean Energy Investor Presentation Portals",
    ],
    metadata: {
      domain: "Clean Energy & Carbon",
      location: "Europe & Americas",
      year: "2025–2026",
      type: "Data Platform & Web Experience",
    },
    technologies: ["React 19", "Telemetry APIs", "SVG Cartography", "Three.js", "Tailwind CSS", "Data Streams"],
    quote: {
      quote: "The interactive battery dispatch model built by Gravity proved our storage asset value directly to municipal utility directors.",
      author: "Elena Rostova",
      role: "Head of Project Finance, Solaria Energy",
    },
  },
  {
    id: "ai-data",
    num: "03",
    title: "AI & Data",
    category: "GENERATIVE AI & LLMs",
    imageUrl: "/images/industries/ai-data.jpg",
    accentColor: "#F59E0B",
    link: "/industries/ai-automation",
    alt: "AI & Data: streams of light folding into one another on a black ground",
    tagline: "Turning opaque neural architectures into tangible, demonstrable enterprise product value.",
    overview:
      "Enterprise buyers require more than marketing superlatives; they need governance, privacy, security, and benchmarked accuracy. We craft live model playgrounds, prompt sandboxes, and latency comparison visualizers that prove speed and safety to technical decision makers.",
    approach: {
      challenge: "AI features sound identical across competitors without live benchmark comparisons and hands-on developer testing.",
      solution: "We build sub-second interactive model sandboxes and architecture visualizers right in the browser to demonstrate inference speed and accuracy.",
    },
    results: [
      { value: "<12ms", label: "Demonstrated Latency" },
      { value: "$45M", label: "Enterprise Pipeline Created" },
      { value: "3.4x", label: "Developer Trial Growth" },
    ],
    deliverables: [
      "Live Model Benchmarking & Latency Playground",
      "Multi-Agent Architecture Flow Visualizers",
      "SOC2, HIPAA & Data Governance Documentation",
      "Interactive API Reference & SDK Sandbox",
      "Token Economy & Enterprise Cost Calculator",
    ],
    metadata: {
      domain: "Foundation Models & LLMs",
      location: "San Francisco / NYC",
      year: "2025–2026",
      type: "Developer Platform & Enterprise Web",
    },
    technologies: ["Streaming APIs", "WebGL Graph Visuals", "Next.js", "TypeScript", "Tailwind CSS"],
    quote: {
      quote: "Enterprise CISOs immediately understood our RAG governance model thanks to the interactive playground Gravity designed.",
      author: "Vikram Sethi",
      role: "Co-Founder & CEO, Nexus AI",
    },
  },
  {
    id: "industry-40",
    num: "04",
    title: "Industry 4.0",
    category: "SMART MANUFACTURING",
    imageUrl: "/images/industries/industry-40.jpg",
    accentColor: "#6366F1",
    link: "/industries/industries-manufacturing",
    alt: "Industry 4.0: the floor of a production hall, machines lined up under the lights",
    tagline: "Bridging the factory floor and the boardroom with real-time digital twins and robotic orchestration.",
    overview:
      "Industrial automation requires executive buy-in across OT and IT disciplines. We build 3D assembly line digital twins and SCADA-inspired control rooms that showcase downtime reduction, predictive maintenance, and seamless plant retrofitting.",
    approach: {
      challenge: "Plant directors are reluctant to authorize software overhauls without visualizing zero-downtime line integration.",
      solution: "We create interactive digital twin lines showing real-time OEE gains and predictive fault detection.",
    },
    results: [
      { value: "-38%", label: "Average Downtime Reduction" },
      { value: "14", label: "Global Plants Deployed" },
      { value: "99.98%", label: "Line Availability Rate" },
    ],
    deliverables: [
      "Interactive 3D Factory Cell Line Digital Twins",
      "Predictive Maintenance & Fault Alert Visualizers",
      "SCADA & PLC System Architecture Schematics",
      "Real-Time OEE & Plant ROI Assessment Calculators",
      "Enterprise Hardware-to-Cloud Integration Guides",
    ],
    metadata: {
      domain: "Smart Automation & Robotics",
      location: "Germany & USA",
      year: "2025–2026",
      type: "Digital Twin Web Application",
    },
    technologies: ["Three.js", "Real-Time WebSockets", "GLTF CAD", "Tailwind CSS", "Framer Motion"],
    quote: {
      quote: "The 3D digital twin on our site removed months of deliberation from our automotive OEM sales cycle.",
      author: "Karl Weber",
      role: "Chief Commercial Officer, SynchroFab",
    },
  },
  {
    id: "robotics-hardware",
    num: "05",
    title: "Robotics & Hardware",
    category: "KINETIC AUTOMATION",
    imageUrl: "/images/industries/robotics.jpg",
    accentColor: "#EC4899",
    link: "/industries/robotics-hardware",
    alt: "Robotics & Hardware: an industrial robot arm cutting along an assembly line",
    tagline: "Showcasing degrees of freedom, kinetic precision, and automated fulfillment throughput.",
    overview:
      "Hardware startups need to prove kinematic viability and payload reliability before deployment. We build interactive DOF arm simulators, cycle-time calculators, and exploded-view CAD breakdowns that showcase engineering rigor.",
    approach: {
      challenge: "Warehouse and fulfillment center buyers cannot gauge payload speed and kinematic reach from static PDF spec sheets.",
      solution: "We build fully articulated 3D robot models that visitors can steer, rotate, and stress-test under simulated payloads in real time.",
    },
    results: [
      { value: "4.8x", label: "Cycle-Time Throughput" },
      { value: "10k+", label: "Units Actively Monitored" },
      { value: "$60M", label: "Series B Funding Secured" },
    ],
    deliverables: [
      "Fully Articulated 6-DOF Robotic Arm Simulators",
      "Exploded-View CAD Assembly & Actuator Maps",
      "Warehouse Cell Cycle-Time & Payload Calculators",
      "Fleet Telemetry & Over-The-Air Fleet Management UI",
      "Comprehensive Developer & ROS2 SDK Documentation",
    ],
    metadata: {
      domain: "Kinetic Robotics & Sensors",
      location: "Boston & Austin",
      year: "2025–2026",
      type: "Interactive Hardware Flagship",
    },
    technologies: ["WebGL", "Three.js Kinematics", "URDF Parser", "Next.js", "Tailwind CSS"],
    quote: {
      quote: "Our interactive arm simulator was cited by our Series B lead as the single most impressive hardware showcase they had seen.",
      author: "Sarah Lindqvist",
      role: "VP Product, Kinetix Robotics",
    },
  },
  {
    id: "saas-b2b",
    num: "06",
    title: "SaaS B2B",
    category: "ENTERPRISE SOFTWARE",
    imageUrl: "/images/industries/smart-cities.jpg",
    accentColor: "#3B82F6",
    link: "/industries/saas",
    alt: "SaaS B2B: a glass atrium seen straight up, floor after floor of lit offices",
    tagline: "Enterprise workflows translated into clean, frictionless software storytelling and high-converting tours.",
    overview:
      "Complex multi-stakeholder enterprise software requires distinct storytelling for procurement, IT security, and end users. We build self-guided interactive product tours, SOC2 compliance trust portals, and transparent seat ROI models that drive adoption.",
    approach: {
      challenge: "Gated demo requests suffer high drop-off when buyers want immediate, frictionless product proof.",
      solution: "We build frictionless, ungated interactive tours where prospects can explore key workflows in seconds without scheduling sales calls.",
    },
    results: [
      { value: "+114%", label: "Inbound Demo Lift" },
      { value: "-28 Days", label: "Shorter Sales Cycles" },
      { value: "$120M+", label: "ARR Managed by Clients" },
    ],
    deliverables: [
      "Self-Guided Clickable Product Workflows",
      "Enterprise Trust & SOC2 / ISO Security Hub",
      "Multi-Tier Seat, Usage & ROI Calculators",
      "Interactive Third-Party Integration Ecosystems",
      "High-Conversion Enterprise Landing Architectures",
    ],
    metadata: {
      domain: "B2B Cloud & Enterprise Apps",
      location: "New York & London",
      year: "2025–2026",
      type: "Enterprise SaaS Flagship",
    },
    technologies: ["Next.js", "React 19", "Tailwind CSS", "Framer Motion", "Lenis"],
    quote: {
      quote: "Our self-guided tour created by Gravity drove our highest quarterly demo conversions in company history.",
      author: "David Chen",
      role: "CMO, OmniCloud",
    },
  },
];

// 3 sets for infinite seamless 3D wrapping
const LOOP_ITEMS = [
  ...BASE_INDUSTRIES.map((item, idx) => ({ ...item, uniqueKey: `set1-${item.id}-${idx}`, globalIndex: idx })),
  ...BASE_INDUSTRIES.map((item, idx) => ({ ...item, uniqueKey: `set2-${item.id}-${idx}`, globalIndex: idx + 6 })),
  ...BASE_INDUSTRIES.map((item, idx) => ({ ...item, uniqueKey: `set3-${item.id}-${idx}`, globalIndex: idx + 12 })),
];

// Dimensions calibrated for edge-to-edge curved screen display
const CARD_WIDTH = 3.4;               // Card width in 3D units
const CARD_HEIGHT = 1.91;             // 16:9 ratio
const CARD_STRIDE = 3.42;             // Edge-to-edge stride with hairline seam
const ONE_SET_WIDTH = BASE_INDUSTRIES.length * CARD_STRIDE; // 6 * 3.42 = 20.52
const INITIAL_CENTER_INDEX = 9;       // Index 9 is Industry 4.0 in Set 2
const FOLD_ANGLE = 0.44;              // ~25.2 degrees curved screen fold angle

/* ═══════════════════════════════════════════════════════════════════════════
   EDGE-TO-EDGE FOLDING PANEL GEOMETRY
   - Center panel is a flat upright rectangle
   - Left panel connects directly to center panel's left edge at the exact same height
   - Right panel connects directly to center panel's right edge at the exact same height
═══════════════════════════════════════════════════════════════════════════ */
function getFoldingPanelTransform(u: number, W: number, theta: number) {
  const halfW = W * 0.5;
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta);
  const t = u / W; // t = 0 at center, t = -1 on left, t = +1 on right

  if (Math.abs(t) <= 1.0) {
    if (t < 0) {
      const k = -t; // 0 to 1
      const rotY = k * theta;
      const x = -k * (halfW + halfW * cosT);
      const z = k * halfW * sinT;
      return { x, z, rotY };
    } else {
      const k = t; // 0 to 1
      const rotY = -k * theta;
      const x = k * (halfW + halfW * cosT);
      const z = k * halfW * sinT;
      return { x, z, rotY };
    }
  } else {
    const sign = t > 0 ? 1 : -1;
    const extra = Math.abs(t) - 1.0;
    const rotY = -sign * theta;
    const x = sign * (halfW + halfW * cosT + extra * W * cosT);
    const z = (halfW - extra * W * 0.5) * sinT;
    return { x, z, rotY };
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   CARD SHADERS
   - Center card: uDim = 0.0 (Full Brightness, Crystal Clear!)
   - Left & Right cards: uDim = 0.55 (Darkened Overlay for Depth & Contrast)
═══════════════════════════════════════════════════════════════════════════ */
const CardVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vec3 pos = position;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPos.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const CardFragmentShader = `
  uniform sampler2D uMap;
  uniform float uHover;
  uniform float uDim;

  varying vec2 vUv;
  varying vec3 vWorldPos;

  void main() {
    vec2 uv = vUv;
    vec4 color = texture2D(uMap, uv);

    // Active center slide has ZERO overlay/dimming. Side wing slides get dimmed.
    if (uDim > 0.001) {
      color.rgb *= (1.0 - uDim);
    }

    if (uHover > 0.0) {
      color.rgb += vec3(0.04) * uHover;
    }

    gl_FragColor = color;
  }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   CARD TEXTURE GENERATOR
   Creates high-DPI canvas texture with pure raw image, badges & CLICK circle
   - Zero overlay on active card for crystal clear visual clarity
   - Top-right CTA: Black circle with "CLICK" text
   - Bottom-left sector indicator badge
═══════════════════════════════════════════════════════════════════════════ */
function createCardCanvasTexture(
  img: HTMLImageElement | null,
  title: string,
  category: string,
  accentColor: string,
  num: string
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");

  const renderContent = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img && img.complete && img.naturalWidth > 0) {
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = canvas.width / canvas.height;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (imgAspect > canvasAspect) {
        sw = img.naturalHeight * canvasAspect;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / canvasAspect;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = "#12141a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 1. Zero overlay on active slide - pure, raw, vibrant photo presentation

    // 2. Category badge at top-left
    ctx.save();
    const categoryText = category.toUpperCase();
    ctx.font = "600 16px 'Courier New', monospace";
    const catWidth = ctx.measureText(categoryText).width;
    const pillY = 56;
    const startX = 48;
    const h = 34;
    const totalW = catWidth + 48;

    ctx.fillStyle = "rgba(10, 10, 14, 0.70)";
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(startX, pillY - h / 2, totalW, h, 17);
      ctx.fill();
    } else {
      ctx.fillRect(startX, pillY - h / 2, totalW, h);
    }

    ctx.strokeStyle = "rgba(255, 255, 255, 0.20)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(startX + 16, pillY, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#F1F5F9";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(categoryText, startX + 28, pillY);
    ctx.restore();

    // 3. Top-right CTA: Black Circle with "CLICK" text in capital
    ctx.save();
    const btnCx = canvas.width - 58;
    const btnCy = 56;
    const btnR = 25;

    ctx.beginPath();
    ctx.arc(btnCx, btnCy, btnR, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.stroke();

    // "CLICK" text
    ctx.font = "900 11px 'Courier New', monospace, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("CLICK", btnCx, btnCy);
    ctx.restore();

    // 4. Bottom-left Sector Indicator badge [ 01 // TITLE ]
    ctx.save();
    ctx.font = "700 16px 'Courier New', monospace";
    const indText = `[ ${num} // ${title.toUpperCase()} ]`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const bottomY = canvas.height - 48;
    const indStartX = 48;

    ctx.fillStyle = "rgba(10, 10, 14, 0.70)";
    const indW = ctx.measureText(indText).width + 36;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(indStartX, bottomY - 17, indW, 34, 17);
      ctx.fill();
    } else {
      ctx.fillRect(indStartX, bottomY - 17, indW, 34);
    }
    ctx.strokeStyle = "rgba(255, 255, 255, 0.20)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.arc(indStartX + 16, bottomY, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(indText, indStartX + 26, bottomY);
    ctx.restore();

    // 5. Fine outer bezel frame
    ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
  };

  renderContent();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  if (img && !img.complete) {
    img.onload = () => {
      renderContent();
      texture.needsUpdate = true;
    };
  }

  return texture;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA BUTTON TEXTURES GENERATOR (Default Black, Hover White)
═══════════════════════════════════════════════════════════════════════════ */
let cachedBtnTextures: { defaultTex: THREE.CanvasTexture; hoverTex: THREE.CanvasTexture } | null = null;

function getBtnTextures() {
  if (typeof window === "undefined") return null;
  if (!cachedBtnTextures) {
    const createTex = (isHover: boolean) => {
      const size = 128;
      const c = document.createElement("canvas");
      c.width = size;
      c.height = size;
      const ctx = c.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(c);

      const r = size / 2 - 4;
      const cx = size / 2;
      const cy = size / 2;

      // Circle
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = isHover ? "#FFFFFF" : "#000000";
      ctx.fill();

      // Border ring
      ctx.lineWidth = 4;
      ctx.strokeStyle = isHover ? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.45)";
      ctx.stroke();

      // "CLICK" text in capital
      ctx.font = "900 24px 'Courier New', monospace, sans-serif";
      ctx.fillStyle = isHover ? "#000000" : "#FFFFFF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("CLICK", cx, cy);

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      return tex;
    };

    cachedBtnTextures = {
      defaultTex: createTex(false),
      hoverTex: createTex(true),
    };
  }
  return cachedBtnTextures;
}

/* ═══════════════════════════════════════════════════════════════════════════
   INDIVIDUAL 3D CARD COMPONENT (Edge-to-Edge Curved Screen Alignment)
   - Dynamic Lighting: Center is Bright (uDim = 0), Side wings are Dimmed (uDim = 0.55)
   - Interactive Top-Right Redirect CTA Button visible on the Center Card
═══════════════════════════════════════════════════════════════════════════ */
interface CardProps {
  item: IndustryDetailData & { uniqueKey: string; globalIndex: number };
  texture: THREE.CanvasTexture;
  trackOffsetRef: React.MutableRefObject<number>;
  hasMovedEnoughForDrag: React.MutableRefObject<boolean>;
  onCardClick: (index: number) => void;
  onOpenDrawer: (item: IndustryDetailData) => void;
}

function SlideCard({ item, texture, trackOffsetRef, hasMovedEnoughForDrag, onCardClick, onOpenDrawer }: CardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const btnMeshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const geometry = useMemo(() => new THREE.PlaneGeometry(CARD_WIDTH, CARD_HEIGHT, 1, 1), []);
  const btnGeometry = useMemo(() => new THREE.PlaneGeometry(0.38, 0.38), []);

  const uniforms = useMemo(
    () => ({
      uMap: { value: texture },
      uHover: { value: 0.0 },
      uDim: { value: 0.0 },
    }),
    [texture]
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: CardVertexShader,
        fragmentShader: CardFragmentShader,
        uniforms,
        transparent: true,
        side: THREE.DoubleSide,
      }),
    [uniforms]
  );

  const btnTextures = useMemo(() => getBtnTextures(), []);
  const btnMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: btnTextures?.defaultTex,
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: false,
    });
  }, [btnTextures]);

  useFrame(() => {
    if (!meshRef.current) return;

    const trackX = trackOffsetRef.current;
    const cardU = trackX + item.globalIndex * CARD_STRIDE;
    const distFromCenter = Math.abs(cardU);

    // Strictly 3 cards visible: left, center, right
    if (distFromCenter > CARD_STRIDE * 1.35) {
      meshRef.current.visible = false;
      return;
    }
    meshRef.current.visible = true;

    // Calculate edge-to-edge curved folding transform
    const { x, z, rotY } = getFoldingPanelTransform(cardU, CARD_WIDTH, FOLD_ANGLE);

    meshRef.current.position.set(x, 0, z);
    meshRef.current.rotation.y = rotY;
    meshRef.current.scale.set(1.0, 1.0, 1.0);

    // Dynamic Dimming: Active Center Card has ZERO overlay (uDim = 0.0), Left & Right wings get dimmed
    let dimAmount = 0.0;
    if (distFromCenter > 0.35) {
      dimAmount = Math.min(0.60, Math.pow((distFromCenter - 0.35) / CARD_STRIDE, 0.75) * 0.60);
    }
    uniforms.uDim.value = dimAmount;
    uniforms.uHover.value = hovered ? 1.0 : 0.0;

    // Top-right CTA Redirect Button is ONLY visible on the center card
    const isCenter = distFromCenter < 0.45;
    if (btnMeshRef.current) {
      btnMeshRef.current.visible = isCenter;
      if (isCenter) {
        const targetScale = btnHovered ? 1.15 : 1.0;
        btnMeshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1.0), 0.2);
      }
    }

    if (btnMaterial && btnTextures) {
      btnMaterial.map = btnHovered ? btnTextures.hoverTex : btnTextures.defaultTex;
      btnMaterial.needsUpdate = true;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        const cardU = trackOffsetRef.current + item.globalIndex * CARD_STRIDE;
        if (Math.abs(cardU) < 0.45 && typeof document !== "undefined") {
          document.body.style.cursor = "pointer";
        }
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== "undefined") {
          document.body.style.cursor = "auto";
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (hasMovedEnoughForDrag.current) return;
        const cardU = trackOffsetRef.current + item.globalIndex * CARD_STRIDE;
        // Clicking active slide opens drawer. Side slides do NOT change slide.
        if (Math.abs(cardU) < CARD_STRIDE * 0.55) {
          onOpenDrawer(item);
        }
      }}
    >
      {/* Interactive Top-Right Redirect CTA Button on Center Card with "CLICK" */}
      <mesh
        ref={btnMeshRef}
        position={[CARD_WIDTH / 2 - 0.28, CARD_HEIGHT / 2 - 0.28, 0.02]}
        geometry={btnGeometry}
        material={btnMaterial}
        onPointerOver={(e) => {
          e.stopPropagation();
          setBtnHovered(true);
          if (typeof document !== "undefined") document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setBtnHovered(false);
          if (typeof document !== "undefined") document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (hasMovedEnoughForDrag.current) return;
          onOpenDrawer(item);
        }}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3D CAROUSEL SCENE (Handled inside Fiber Canvas)
═══════════════════════════════════════════════════════════════════════════ */
interface SceneProps {
  trackOffsetRef: React.MutableRefObject<number>;
  targetTrackOffsetRef: React.MutableRefObject<number>;
  hasMovedEnoughForDrag: React.MutableRefObject<boolean>;
  textures: THREE.CanvasTexture[];
  onActiveIndexChange: (idx: number) => void;
  onCardClick: (index: number) => void;
  onOpenDrawer: (item: IndustryDetailData) => void;
}

function CarouselScene({
  trackOffsetRef,
  targetTrackOffsetRef,
  hasMovedEnoughForDrag,
  textures,
  onActiveIndexChange,
  onCardClick,
  onOpenDrawer,
}: SceneProps) {
  const { camera, size } = useThree();
  const lastActiveRef = useRef<number>(-1);

  // Calibrate camera FOV so all 3 edge-to-edge panels fit cleanly on screen
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      const aspect = Math.max(0.1, size.width / size.height);
      const targetWidth = size.width < 640 ? 10.4 : 9.9;
      const targetHeight = targetWidth / aspect;
      const dist = 7.2;
      camera.position.z = dist;
      const fov = 2 * Math.atan((targetHeight / 2) / dist) * (180 / Math.PI);
      camera.fov = Math.max(26, Math.min(60, fov));
      camera.updateProjectionMatrix();
    }
  }, [size.width, size.height, camera]);

  useFrame((_, delta) => {
    // Silky-smooth frame-rate independent glide lerp
    const smoothFactor = Math.min(1.0, 1.0 - Math.exp(-9.5 * delta));
    const current = trackOffsetRef.current;
    const target = targetTrackOffsetRef.current;
    trackOffsetRef.current += (target - current) * smoothFactor;

    // Seamless Infinite Looping
    const curr = trackOffsetRef.current;
    if (curr < -(ONE_SET_WIDTH * 2)) {
      trackOffsetRef.current += ONE_SET_WIDTH;
      targetTrackOffsetRef.current += ONE_SET_WIDTH;
    } else if (curr > -ONE_SET_WIDTH) {
      trackOffsetRef.current -= ONE_SET_WIDTH;
      targetTrackOffsetRef.current -= ONE_SET_WIDTH;
    }

    // Active item index calculation (mapped to 0..5)
    const activeGlobal = Math.round(-trackOffsetRef.current / CARD_STRIDE);
    const activeDot = ((activeGlobal % BASE_INDUSTRIES.length) + BASE_INDUSTRIES.length) % BASE_INDUSTRIES.length;
    if (activeDot !== lastActiveRef.current) {
      lastActiveRef.current = activeDot;
      onActiveIndexChange(activeDot);
    }
  });

  return (
    <group>
      {LOOP_ITEMS.map((item, idx) => (
        <SlideCard
          key={item.uniqueKey}
          item={item}
          texture={textures[idx % BASE_INDUSTRIES.length]}
          trackOffsetRef={trackOffsetRef}
          hasMovedEnoughForDrag={hasMovedEnoughForDrag}
          onCardClick={onCardClick}
          onOpenDrawer={onOpenDrawer}
        />
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN CURVED PERSPECTIVE SLIDER EXPORT WITH PROJECT-STYLE DETAIL DRAWER
═══════════════════════════════════════════════════════════════════════════ */
export default function CurvedPerspectiveSlider() {
  const [mounted, setMounted] = useState(false);
  const [activeDotIndex, setActiveDotIndex] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringCenter, setIsHoveringCenter] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryDetailData | null>(null);
  const [descScrambleDone, setDescScrambleDone] = useState(false);

  const handleDescScrambleComplete = useCallback(() => {
    setDescScrambleDone(true);
  }, []);

  useEffect(() => {
    setDescScrambleDone(false);
  }, [activeDotIndex]);

  // Smooth glide track offset in world units
  const trackOffsetRef = useRef<number>(-INITIAL_CENTER_INDEX * CARD_STRIDE);
  const targetTrackOffsetRef = useRef<number>(-INITIAL_CENTER_INDEX * CARD_STRIDE);

  // Pointer drag state
  const dragStartX = useRef<number>(0);
  const dragStartY = useRef<number>(0);
  const dragStartTrackX = useRef<number>(0);
  const hasMovedEnoughForDrag = useRef<boolean>(false);
  const velocityHistory = useRef<Array<{ x: number; time: number }>>([]);

  // Generate canvas textures once mounted
  const [textures, setTextures] = useState<THREE.CanvasTexture[]>([]);

  useEffect(() => {
    setMounted(true);

    const loadedTextures: THREE.CanvasTexture[] = BASE_INDUSTRIES.map((ind) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = ind.imageUrl;
      return createCardCanvasTexture(img, ind.title, ind.category, ind.accentColor, ind.num);
    });

    setTextures(loadedTextures);

    return () => {
      loadedTextures.forEach((tex) => tex.dispose());
    };
  }, []);

  // Smooth glide navigation helper
  const glideToIndex = useCallback((targetIndex: number) => {
    targetTrackOffsetRef.current = -targetIndex * CARD_STRIDE;
  }, []);

  const glideLeft = () => {
    const currentCardIndex = Math.round(-targetTrackOffsetRef.current / CARD_STRIDE);
    glideToIndex(currentCardIndex - 1);
  };

  const glideRight = () => {
    const currentCardIndex = Math.round(-targetTrackOffsetRef.current / CARD_STRIDE);
    glideToIndex(currentCardIndex + 1);
  };

  // Pointer drag controls directly on canvas container
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    hasMovedEnoughForDrag.current = false;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    dragStartTrackX.current = trackOffsetRef.current;
    targetTrackOffsetRef.current = trackOffsetRef.current;
    velocityHistory.current = [{ x: e.clientX, time: performance.now() }];

    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      const onCenter = ratio >= 0.25 && ratio <= 0.75;
      if (onCenter !== isHoveringCenter) {
        setIsHoveringCenter(onCenter);
      }
      return;
    }

    const now = performance.now();
    const deltaPx = e.clientX - dragStartX.current;
    const totalDist = Math.hypot(e.clientX - dragStartX.current, e.clientY - dragStartY.current);

    if (totalDist > 5) {
      hasMovedEnoughForDrag.current = true;
    }

    velocityHistory.current.push({ x: e.clientX, time: now });
    if (velocityHistory.current.length > 5) {
      velocityHistory.current.shift();
    }

    // Convert pixel delta into 3D world units
    const deltaWorld = (deltaPx / 100) * 0.95;
    const newTrack = dragStartTrackX.current + deltaWorld;
    targetTrackOffsetRef.current = newTrack;
    trackOffsetRef.current = newTrack;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const totalDist = Math.hypot(e.clientX - dragStartX.current, e.clientY - dragStartY.current);
    const wasDrag = hasMovedEnoughForDrag.current || totalDist > 5;

    // IF DRAG / GLIDE: execute slide momentum glide and NEVER open drawer!
    if (wasDrag) {
      hasMovedEnoughForDrag.current = true;
      // Keep flag true for 120ms so any asynchronous synthetic WebGL click is swallowed
      setTimeout(() => {
        hasMovedEnoughForDrag.current = false;
      }, 120);

      const now = performance.now();
      const history = velocityHistory.current.filter((pt) => now - pt.time < 120);
      let releaseVelocity = 0;

      if (history.length >= 2) {
        const first = history[0];
        const last = history[history.length - 1];
        const dt = last.time - first.time;
        if (dt > 8) {
          releaseVelocity = ((last.x - first.x) / dt) * 16;
        }
      }

      const currentTrack = trackOffsetRef.current;
      const currentCardIndex = Math.round(-currentTrack / CARD_STRIDE);
      const absVel = Math.abs(releaseVelocity);

      // Gentle release: snap smoothly to nearest card
      if (absVel < 2.5) {
        glideToIndex(currentCardIndex);
        return;
      }

      // Silky flick momentum
      const dir = releaseVelocity > 0 ? 1 : -1;
      let cardsToAdvance = 1;
      if (absVel > 15) {
        cardsToAdvance = 2;
      }

      const targetIndex = currentCardIndex - dir * cardsToAdvance;
      glideToIndex(targetIndex);
      return;
    }

    // IF CLEAN TAP / CLICK (no drag): open detail drawer on active center card
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = clickX / rect.width;

    if (ratio >= 0.25 && ratio <= 0.75) {
      setSelectedIndustry(activeIndustry);
    }
  };

  const handleCardClick = (globalIndex: number) => {
    if (hasMovedEnoughForDrag.current) return;
    const currentCardIndex = Math.round(-targetTrackOffsetRef.current / CARD_STRIDE);
    const diff = globalIndex - currentCardIndex;
    if (diff === 0) {
      // Active center card clicked - open detail drawer
      const baseIndex = ((globalIndex % BASE_INDUSTRIES.length) + BASE_INDUSTRIES.length) % BASE_INDUSTRIES.length;
      setSelectedIndustry(BASE_INDUSTRIES[baseIndex]);
    }
    // Side card clicked - DO NOT change slide on click!
  };

  const activeIndustry = BASE_INDUSTRIES[activeDotIndex] || BASE_INDUSTRIES[0];

  return (
    <section id="industries" className="relative w-full bg-[#F4F4F0] select-none overflow-hidden">
      {/* =========================================================================
          1. SECTION TITLE: "Industries We Address"
          Directly after Our Services, perfectly aligned with Navbar (max-w-8xl mx-auto px-6 sm:px-12)
         ========================================================================= */}
      <div className="w-full max-w-8xl mx-auto px-6 sm:px-12 pt-16 sm:pt-24 pb-8 sm:pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-300">
          <div>
            <span className="font-mono text-xs sm:text-[13px] tracking-[0.25em] text-[#ED3327] uppercase font-semibold block mb-3">
              [ SECTORS & DOMAINS ]
            </span>
            <h2 className="font-mg12-regular text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-none">
              Industries We Address
            </h2>
          </div>
          <p className="font-mg12-regular text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-md">
            Every tech sector convinces a different way. We shape each digital experience around what your field needs to prove.
          </p>
        </div>
      </div>

      {/* =========================================================================
          2. 3D WEBGL EDGE-TO-EDGE CURVED SCREEN VIEWPORT
          - Center card is FULLY BRIGHT & VIBRANT
          - Left & Right cards have dark cinema overlay for depth
          - Top-right CTA redirect button on the Center Card opens the Detail Drawer
         ========================================================================= */}
      <div className="w-full max-w-8xl mx-auto px-6 sm:px-12">
        <div
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Industries Carousel"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative w-full h-[440px] sm:h-[500px] md:h-[540px] overflow-hidden outline-hidden touch-pan-y ${
            isDragging ? "cursor-grabbing" : isHoveringCenter ? "cursor-pointer" : "cursor-grab"
          }`}
        >
          {/* WebGL Canvas */}
          <div className="absolute inset-0 w-full h-full">
            {mounted ? (
              <Canvas
                camera={{ position: [0, 0, 7.2], fov: 38 }}
                dpr={[1, 2]}
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: "high-performance",
                }}
                className="w-full h-full block"
              >
                <ambientLight intensity={1.3} />
                <CarouselScene
                  trackOffsetRef={trackOffsetRef}
                  targetTrackOffsetRef={targetTrackOffsetRef}
                  hasMovedEnoughForDrag={hasMovedEnoughForDrag}
                  textures={textures}
                  onActiveIndexChange={setActiveDotIndex}
                  onCardClick={handleCardClick}
                  onOpenDrawer={(item) => setSelectedIndustry(item)}
                />
              </Canvas>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-100/50">
                <div className="w-8 h-8 rounded-full border-2 border-[#ED3327] border-t-transparent animate-spin" />
              </div>
            )}
          </div>

          {/* Screen Reader accessible semantic links */}
          <div className="sr-only" style={{ pointerEvents: "none" }} data-centered={activeDotIndex}>
            {BASE_INDUSTRIES.map((ind) => (
              <a key={ind.id} href={ind.link}>
                {ind.alt}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. ACTIVE INDUSTRY TITLE & DESCRIPTION WITH REDIRECT ICON
          Aligns strictly with Navbar and Footer: max-w-8xl mx-auto px-6 sm:px-12
         ========================================================================= */}
      <div className="w-full max-w-8xl mx-auto px-6 sm:px-12 pt-8 sm:pt-10 pb-16 sm:pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-300">
          {/* Active Industry Title & Description */}
          <div className="space-y-3 max-w-5xl lg:max-w-6xl w-full">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-black font-bold tracking-wider">
                {activeIndustry.num} / 06
              </span>
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                // {activeIndustry.category}
              </span>
            </div>

            <h3 className="font-mg12-regular text-2xl sm:text-3xl md:text-4xl text-neutral-900 tracking-tight leading-tight">
              <ScrambleText
                key={`title-${activeIndustry.id}`}
                text={activeIndustry.title || ""}
                autoPlay={true}
                speed={0.8}
                interactive={false}
              />
            </h3>

            <p className="font-mg12-regular text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
              <ScrambleText
                key={`desc-${activeIndustry.id}`}
                text={activeIndustry.description || activeIndustry.tagline || activeIndustry.overview || ""}
                autoPlay={true}
                speed={2.2}
                interactive={false}
                onComplete={handleDescScrambleComplete}
              />
              <span
                className={`inline-block transition-opacity duration-300 ${
                  descScrambleDone ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndustry(activeIndustry)}
                  className="inline font-mono text-base font-bold text-black hover:text-[#ED3327] ml-2 align-baseline transition-transform duration-200 hover:translate-x-0.5 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
                  aria-label={`Open ${activeIndustry.title} details`}
                  title={`Open ${activeIndustry.title} details`}
                >
                  ↗
                </button>
              </span>
            </p>
          </div>

          {/* Right: Navigation Buttons (Previous / Next) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={glideLeft}
              aria-label="Previous Slide"
              className="w-11 h-11 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 flex items-center justify-center text-sm font-mono transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={glideRight}
              aria-label="Next Slide"
              className="w-11 h-11 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 flex items-center justify-center text-sm font-mono transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. EXACT PROJECT DETAIL DRAWER ARCHITECTURE FOR INDUSTRIES
          Matches ProjectDetailDrawer: CloseButton top-left, scramble-on-scroll,
          approach & outcome columns, deliverables with red arrows, tech pills,
          and bottom "HAVE A SIMILAR PROJECT?" with "Get in touch ↗" CtaButton.
         ========================================================================= */}
      <IndustryDetailDrawer
        industry={selectedIndustry}
        isOpen={Boolean(selectedIndustry)}
        onClose={() => setSelectedIndustry(null)}
      />
    </section>
  );
}
