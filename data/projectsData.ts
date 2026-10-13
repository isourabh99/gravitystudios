export interface ProjectMediaItem {
  id: string;
  type: "video" | "image";
  src: string;
  poster?: string;
  alt: string;
  caption: string;
  tag?: string;
}

export interface Project {
  number: string; // "01", "02", ...
  slug: string; // "hylight", "artefact-area", ...
  title: string;
  client: string;
  category: string; // "DeepTech", "Creative studio", ...
  tagline: string;
  description: string;
  year: string;
  location: string;
  projectType: string; // "SHOWCASE WEBSITE", "LANDING PAGE", ...
  metaString: string; // "SHOWCASE WEBSITE · PARIS, FRANCE · 2025"
  liveUrl?: string;

  // Media: exactly 1 Video + 2 Images as requested
  video: ProjectMediaItem;
  images: [ProjectMediaItem, ProjectMediaItem];

  // Detail Case Study Content
  overview: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  technologies: string[];
  results: { value: string; label: string }[];
  clientQuote?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const PROJECTS: Project[] = [
  // 01. Hylight
  {
    number: "01",
    slug: "hylight",
    title: "Hylight",
    client: "HyLight",
    category: "DeepTech",
    tagline: "Hylight: an aerial inspection technology driven by design.",
    description:
      "Designing a brand identity and high-impact showcase website for an autonomous, zero-emission hydrogen airship that inspects power lines and pipeline infrastructure at scale.",
    year: "2025",
    location: "Paris, France",
    projectType: "SHOWCASE WEBSITE",
    metaString: "SHOWCASE WEBSITE · PARIS, FRANCE · 2025",
    liveUrl: "https://hylight.aero",

    video: {
      id: "hylight-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-drone-flying-over-a-dense-green-forest-41551-large.mp4",
      poster: "/projects/hylight-poster.jpg",
      alt: "HyLight autonomous airship scanning forest pipeline infrastructure",
      caption: "AUTONOMOUS AIRSHIP FLIGHT OVER CANOPY",
      tag: "4K SIMULATION",
    },
    images: [
      {
        id: "hylight-img-1",
        type: "image",
        src: "/projects/hylight-wireframe.svg",
        alt: "HyLight wireframe radar telemetry beam and 3D sensor simulation",
        caption: "TELEMETRY BEAM & 3D SENSOR MATRIX",
        tag: "WEBGL 3D",
      },
      {
        id: "hylight-img-2",
        type: "image",
        src: "/projects/hylight-landscape.svg",
        alt: "HyLight zero-emission blimp soaring above alpine ridges",
        caption: "ZERO-EMISSION AERIAL INSPECTION",
        tag: "BRAND SYSTEM",
      },
    ],

    overview:
      "HyLight develops hydrogen-powered airships capable of inspecting hundreds of kilometers of transmission grids and pipelines without carbon emissions. They approached us to build an authoritative digital presence that would convince both enterprise energy conglomerates and Tier-1 deep-tech venture investors.",
    challenge:
      "The primary obstacle was balancing technical precision with cinematic emotion. HyLight's technology is complex hardware; the website needed to feel like cutting-edge aerospace engineering without alienating non-technical decision-makers.",
    solution:
      "We engineered a custom interactive 3D WebGL model of the airship, coupled with real-time flight telemetry visualizations and responsive micro-animations in Next.js. The typography is clinical yet confident, establishing instant credibility.",
    deliverables: [
      "Brand Identity & Typography Guidelines",
      "Interactive 3D WebGL Airship Viewer",
      "Next.js 16 High-Performance Showcase Website",
      "Motion Direction & UI Sound Architecture",
      "Investor Pitch Deck Templates",
    ],
    technologies: ["Next.js 16", "Three.js", "WebGL Shaders", "Tailwind CSS", "Framer Motion", "Lenis"],
    results: [
      { value: "€3.7M", label: "Seed Capital Secured Post-Launch" },
      { value: "99.8%", label: "Google Lighthouse Performance Score" },
      { value: "4.2x", label: "Increase in Enterprise Inbound Enquiries" },
    ],
    clientQuote: {
      quote:
        "Gravity transformed our perception from a hardware lab prototype into a global aerospace contender. The website was instrumental in closing our institutional seed round.",
      author: "Martin Laroche",
      role: "CEO & Co-Founder, HyLight",
    },
  },

  // 02. Artefact area
  {
    number: "02",
    slug: "artefact-area",
    title: "Artefact area",
    client: "Artefact",
    category: "Creative studio",
    tagline: "Building the showcase website for Artefact, a space for their creative work.",
    description:
      "A dark, tactile digital gallery showcasing sculptural spatial media, stone textures, and avant-garde art direction for an international creative powerhouse.",
    year: "2025",
    location: "Nantes, France",
    projectType: "SHOWCASE WEBSITE, PORTFOLIO",
    metaString: "SHOWCASE WEBSITE, PORTFOLIO · NANTES, FRANCE · 2025",
    liveUrl: "https://artefactarea.com",

    video: {
      id: "artefact-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-cracked-earth-surface-in-a-desert-41554-large.mp4",
      poster: "/projects/artefact-poster.jpg",
      alt: "Artefact organic stone texture and geological macro landscape",
      caption: "GEOLOGICAL FORMATIONS & AMBIENT TEXTURE",
      tag: "GENERATIVE VIDEO",
    },
    images: [
      {
        id: "artefact-img-1",
        type: "image",
        src: "/projects/artefact-moss.svg",
        alt: "Artefact exploring unknown areas mossy rock formation",
        caption: "EXPLORING UNKNOWN AREAS · ORGANIC TERRAIN",
        tag: "MACRO CAPTURE",
      },
      {
        id: "artefact-img-2",
        type: "image",
        src: "/projects/artefact-blur.svg",
        alt: "Dynamic kinetic blur motion typography in nature",
        caption: "KINETIC BLUR & EDITORIAL MOTION STUDY",
        tag: "SPATIAL MEDIA",
      },
    ],

    overview:
      "Artefact is a collective of sculptors, digital artists, and spatial designers. They required an uncompromising portfolio website that felt more like stepping inside a contemporary concrete gallery pavilion than browsing a conventional web layout.",
    challenge:
      "Portfolios often struggle with visual clutter. Artefact's rich multimedia work required a design language that stepped back, allowing heavy stone textures, organic audio, and cinematic video to command the screen.",
    solution:
      "We conceived a horizontal flow with custom inertia damping, subtle audio responsive cues, and full-bleed image sequences. Text is treated as sparse architectural signage.",
    deliverables: [
      "Custom Inertial Horizontal Gallery Experience",
      "Dynamic Media CMS with Video Pre-Loading",
      "Bespoke Spatial Typography Grid",
      "Interactive Curatorial Filtering System",
    ],
    technologies: ["Astro", "WebGL", "Lenis Smooth Scroll", "Tailwind CSS", "TypeScript"],
    results: [
      { value: "62%", label: "Average Session Duration Increase" },
      { value: "0.4s", label: "Largest Contentful Paint (LCP)" },
      { value: "2", label: "Awwwards Site of the Day Recognitions" },
    ],
    clientQuote: {
      quote:
        "Our digital space now matches the gravity and stillness of our physical sculptures. It is rare to find a studio that understands weight and typography with such precision.",
      author: "Camille Durand",
      role: "Creative Director, Artefact",
    },
  },

  // 03. Une Autre Île Productions
  {
    number: "03",
    slug: "une-autre-ile",
    title: "Une Autre Île Productions",
    client: "Une Autre Île",
    category: "Production studio",
    tagline: "Crafting a digital experience for luxury film and high-end commercial production.",
    description:
      "A cinematic, typography-focused showcase for an elite commercial film production house working across Parisian haute couture, fragrance, and architecture.",
    year: "2025",
    location: "Paris, France",
    projectType: "LANDING PAGE",
    metaString: "LANDING PAGE · PARIS, FRANCE · 2025",
    liveUrl: "https://uneautreile.fr",

    video: {
      id: "uneautreile-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-luxury-perfume-bottle-with-water-droplets-41552-large.mp4",
      poster: "/projects/uneautreile-poster.jpg",
      alt: "Une Autre Île luxury perfume glass bottle and high-gloss lighting",
      caption: "HAUTE COUTURE COMMERCIAL REEL",
      tag: "FILM PRODUCTION",
    },
    images: [
      {
        id: "uneautreile-img-1",
        type: "image",
        src: "/projects/uneautreile-monochrome.svg",
        alt: "Hypnotic concentric circular typography and radial lens ripple",
        caption: "GET STARTED WITH US · HYPNOTIC RIPPLE",
        tag: "INTERACTIVE SHADER",
      },
      {
        id: "uneautreile-img-2",
        type: "image",
        src: "/projects/uneautreile-red.svg",
        alt: "Sculptural ruby red glass and luxury cosmetic visual grid",
        caption: "PARISIAN RUNWAY & BEAUTY STILLS",
        tag: "VISUAL IDENTITY",
      },
    ],

    overview:
      "Une Autre Île produces world-class commercials for international luxury fashion houses. Their digital home had to radiate Parisian elegance, editorial restraint, and instantaneous video playback.",
    challenge:
      "High-bitrate commercial reels typically lead to bloated website load times. We needed to display gigabytes of 4K cinematic reels without sacrificing instantaneous mobile responsiveness.",
    solution:
      "We engineered an adaptive video streaming pipeline with automatic bitrate switching, smooth custom cursor interactions, and an editorial grid that mirrors modern high-fashion magazines.",
    deliverables: [
      "Adaptive HLS Video Streaming Architecture",
      "Full Screen Director Reel Player",
      "Custom Micro-Interactions & Magnetic Buttons",
      "Multilingual CMS (French / English)",
    ],
    technologies: ["Next.js 16", "Cloudflare Stream", "Framer Motion", "Tailwind CSS"],
    results: [
      { value: "100%", label: "Fluid 60 FPS Mobile Playback" },
      { value: "3.5x", label: "Commercial Pitch Win Rate" },
      { value: "0.2s", label: "Instant Video Start Time" },
    ],
  },

  // 04. Skipper NDT
  {
    number: "04",
    slug: "skipper-ndt",
    title: "Skipper NDT",
    client: "Skipper NDT",
    category: "DeepTech",
    tagline: "Designing a clear, technical interface for contactless magnetic inspection technology.",
    description:
      "A clean, technical interface and 3D data pipeline translating subterranean magnetic anomaly detection into an intuitive visual platform for global pipeline operators.",
    year: "2025",
    location: "Caen, France",
    projectType: "SHOWCASE WEBSITE",
    metaString: "SHOWCASE WEBSITE · CAEN, FRANCE · 2025",
    liveUrl: "https://skipperndt.com",

    video: {
      id: "skipper-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-radar-screen-with-moving-scanning-line-41553-large.mp4",
      poster: "/projects/skipper-poster.jpg",
      alt: "Skipper NDT magnetic field sensor scanning subterranean pipelines",
      caption: "MAGNETIC FLUX LEAKAGE DETECTION",
      tag: "REAL-TIME SENSOR",
    },
    images: [
      {
        id: "skipper-img-1",
        type: "image",
        src: "/projects/skipper-pipeline.svg",
        alt: "Subterranean 3D pipeline trajectory and depth telemetry",
        caption: "3D PIPELINE DEPTH TELEMETRY MATRIX",
        tag: "GEOMETRY ENGINE",
      },
      {
        id: "skipper-img-2",
        type: "image",
        src: "/projects/skipper-dashboard.svg",
        alt: "High-contrast magnetic anomaly inspection charts",
        caption: "CONTACTLESS MAGNETIC INSPECTION UI",
        tag: "ANALYTICS UI",
      },
    ],

    overview:
      "Skipper NDT invented the world's first contactless magnetic inspection technology for buried pipelines. They needed a global website to present their scientific breakthroughs to multinational energy corporations and regulatory inspection authorities.",
    challenge:
      "The physics behind magnetic flux anomaly tracking is formidable. The website had to explain complex geophysical principles clearly in seconds through visual storytelling.",
    solution:
      "We built interactive 3D simulations showing how magnetic sensors pass over the earth's surface and detect micro-corrosions through soil and water without physical contact.",
    deliverables: [
      "Interactive 3D Subsurface Pipeline Simulator",
      "Technical Whitepaper Download Hub",
      "Case Study & Regulatory Compliance Architecture",
      "Executive Product Presentation Kit",
    ],
    technologies: ["React 19", "Three.js", "WebGL", "Next.js", "Tailwind CSS"],
    results: [
      { value: "48+", label: "Countries Engaged with Technical Docs" },
      { value: "99/100", label: "Accessibility (WCAG 2.1) Score" },
      { value: "5.1x", label: "Direct RFP Request Growth" },
    ],
  },

  // 05. blink
  {
    number: "05",
    slug: "blink",
    title: "blink",
    client: "blink",
    category: "SaaS & Media",
    tagline: "Reimagining modern content workflows with micro-interactions and high-velocity UI.",
    description:
      "A lightning-fast, tactile product interface and brand experience built for modern video editing, AI transcript intelligence, and collaborative storytelling teams.",
    year: "2025",
    location: "San Francisco, USA",
    projectType: "PRODUCT WEBSITE",
    metaString: "PRODUCT WEBSITE · SAN FRANCISCO, USA · 2025",
    liveUrl: "https://blink.media",

    video: {
      id: "blink-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-code-on-a-laptop-41555-large.mp4",
      poster: "/projects/blink-poster.jpg",
      alt: "blink gesture-driven timeline interface and real-time audio waveforms",
      caption: "REAL-TIME COLLABORATIVE TIMELINE",
      tag: "SAAS PRODUCT",
    },
    images: [
      {
        id: "blink-img-1",
        type: "image",
        src: "/projects/blink-dashboard.svg",
        alt: "Minimalist dark mode video editing dashboard with waveform nodes",
        caption: "MINIMALIST WORKSPACE & WAVEFORM INTELLIGENCE",
        tag: "DESIGN SYSTEM",
      },
      {
        id: "blink-img-2",
        type: "image",
        src: "/projects/blink-ai.svg",
        alt: "Multi-track AI assistant dialogue and keyboard shortcut system",
        caption: "HIGH-VELOCITY SHORTCUT ARCHITECTURE",
        tag: "UI TOKENS",
      },
    ],

    overview:
      "blink is a Silicon Valley media-tech startup building the next generation of generative video editing software. They needed a product website that was as fast, fluid, and responsive as the tool itself.",
    challenge:
      "SaaS product landing pages have become formulaic. blink needed to stand out from typical pastel software sites and demonstrate unprecedented speed and aesthetic confidence.",
    solution:
      "We engineered a dark, keyboard-friendly interface with interactive in-browser component mockups, sound design micro-cues, and live performance benchmarks.",
    deliverables: [
      "Product Strategy & Value Proposition Hierarchy",
      "Interactive Interactive Product Tour Component",
      "Figma Tokens & Design System Implementation",
      "Viral Waitlist & Referral Mechanism",
    ],
    technologies: ["Next.js 16", "Tailwind CSS", "Framer Motion", "TypeScript", "Vercel"],
    results: [
      { value: "140K+", label: "Organic Waitlist Signups in 30 Days" },
      { value: "48ms", label: "Interaction to Next Paint (INP)" },
      { value: "Top 3", label: "Product of the Day on Product Hunt" },
    ],
  },

  // 06. Alt-a
  {
    number: "06",
    slug: "alt-a",
    title: "Alt-a",
    client: "Alt-a",
    category: "Strategy & Foresight",
    tagline: "Building the landing page for Alt-a, a critical strategy and foresight agency.",
    description:
      "A radical, monochromatic web experience that merges particle dynamics, speculative research, and brutalist typography for a strategic future consultancy.",
    year: "2025",
    location: "Paris, France",
    projectType: "LANDING PAGE",
    metaString: "LANDING PAGE · PARIS, FRANCE · 2025",
    liveUrl: "https://alt-a.fr",

    video: {
      id: "alta-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-spiral-of-glowing-particles-41550-large.mp4",
      poster: "/projects/alta-poster.jpg",
      alt: "Generative point-cloud particle nebula collapsing into gravitational lens",
      caption: "GENERATIVE PARTICLE DISPERSION SHADER",
      tag: "THREE.JS SHADER",
    },
    images: [
      {
        id: "alta-img-1",
        type: "image",
        src: "/projects/alta-lens.svg",
        alt: "Spherical gravitational optical lens and stark typographic horizon",
        caption: "GRAVITATIONAL OCULAR SINGULARITY",
        tag: "POINT CLOUD",
      },
      {
        id: "alta-img-2",
        type: "image",
        src: "/projects/alta-manifesto.svg",
        alt: "Alt-a editorial essay interface with stark horizontal rules",
        caption: "STRATEGIC FORESIGHT MANIFESTO",
        tag: "BRUTALIST EDITORIAL",
      },
    ],

    overview:
      "Alt-a advises governments and multinational corporate boards on geopolitical, technological, and environmental inflection points. They wanted a web manifestation that avoided generic consulting cliches in favor of avant-garde strategic gravitas.",
    challenge:
      "How do you convey 'foresight' without using stock imagery of crystal balls or generic futuristic cityscapes? We needed pure mathematical abstraction.",
    solution:
      "We constructed an interactive particle field that reacts to cursor velocity, simulating complex systemic turbulence and equilibrium points, paired with stark Swiss typography.",
    deliverables: [
      "Custom Point Cloud Simulation Engine in Three.js",
      "Interactive Strategic Foresight Timeline",
      "Dynamic Reading Environment with Variable Typography",
      "Minimalist Soundscape Cues",
    ],
    technologies: ["Three.js", "GLSL Shaders", "Next.js 16", "Tailwind CSS"],
    results: [
      { value: "4.8m", label: "Average Time on Site for Long-Form Papers" },
      { value: "100%", label: "Custom GPU Compute Shader Execution" },
      { value: "1st", label: "Digital Vanguard Award Winner" },
    ],
  },

  // 07. Kestrix
  {
    number: "07",
    slug: "kestrix",
    title: "Kestrix",
    client: "Kestrix",
    category: "Climate Tech",
    tagline: "Kestrix: making thermal data readable to accelerate building retrofit.",
    description:
      "An intuitive thermal intelligence platform turning drone infrared photography and heat-loss data into actionable building retrofit maps across the UK and Europe.",
    year: "2026",
    location: "London, United Kingdom",
    projectType: "SHOWCASE WEBSITE",
    metaString: "SHOWCASE WEBSITE · LONDON, UNITED KINGDOM · 2026",
    liveUrl: "https://kestrix.ai",

    video: {
      id: "kestrix-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41556-large.mp4",
      poster: "/projects/kestrix-poster.jpg",
      alt: "Thermal infrared heatmap sweep across residential neighborhood",
      caption: "ISOMETRIC THERMAL HEAT-LOSS SCAN",
      tag: "CLIMATE DATA",
    },
    images: [
      {
        id: "kestrix-img-1",
        type: "image",
        src: "/projects/kestrix-houses.svg",
        alt: "Isometric 3D roof cluster with energy-resilient retrofit intelligence",
        caption: "ROOF-TOP THERMAL SIGNATURE CLUSTERING",
        tag: "GEOSPATIAL AI",
      },
      {
        id: "kestrix-img-2",
        type: "image",
        src: "/projects/kestrix-cards.svg",
        alt: "Modular retrofit cards and building efficiency breakdown",
        caption: "BUILDING RETROFIT INTELLIGENCE MODULES",
        tag: "DATA DASHBOARD",
      },
    ],

    overview:
      "Buildings account for over a third of global carbon emissions through poor insulation. Kestrix uses drones with thermal cameras and computer vision to identify heat leaks across cities. They needed a platform to communicate this to housing associations, lenders, and cities.",
    challenge:
      "Thermal data is technical and dry in raw formats. The user experience needed to translate complex thermodynamics into immediate visual clarity.",
    solution:
      "We engineered interactive before-and-after thermal comparison sliders, animated heat signature spectrums, and a clear calculator for carbon reduction impact.",
    deliverables: [
      "Thermal Spectrum Interactive Visualization Component",
      "Municipal Carbon Savings Calculator",
      "B2B SaaS Lead Capture Funnel",
      "Investor Pitch Architecture",
    ],
    technologies: ["Next.js 16", "Mapbox GL", "Tailwind CSS", "Framer Motion"],
    results: [
      { value: "£1.5M", label: "Innovate UK Grant & VC Inbound" },
      { value: "40K+", label: "Homes Mapped in Pilot Municipalities" },
      { value: "3.2x", label: "Growth in Housing Association Demos" },
    ],
  },

  // 08. BotBlox
  {
    number: "08",
    slug: "botblox",
    title: "BotBlox",
    client: "BotBlox",
    category: "Robotics & Hardware",
    tagline: "BotBlox: moving data where ethernet was never meant to go.",
    description:
      "A high-density hardware platform and digital showcase for ultra-compact, ruggedized ethernet switches deployed in autonomous drones, Mars rovers, and defense systems.",
    year: "2026",
    location: "Sheffield, UK",
    projectType: "ECOMMERCE & HARDWARE PLATFORM",
    metaString: "ECOMMERCE & HARDWARE PLATFORM · SHEFFIELD, UK · 2026",
    liveUrl: "https://botblox.io",

    video: {
      id: "botblox-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-with-moving-electronic-signals-41557-large.mp4",
      poster: "/projects/botblox-poster.jpg",
      alt: "BotBlox micro ethernet switch 3D rotation and trace illumination",
      caption: "RUGGEDIZED GIGABIT ETHERNET SWITCHING",
      tag: "HARDWARE CAD",
    },
    images: [
      {
        id: "botblox-img-1",
        type: "image",
        src: "/projects/botblox-radar.svg",
        alt: "Compact mmWave radar topography for autonomous robotic platforms",
        caption: "MMWAVE RADAR PLATFORM COMPATIBILITY",
        tag: "TOPOGRAPHIC SIM",
      },
      {
        id: "botblox-img-2",
        type: "image",
        src: "/projects/botblox-pcb.svg",
        alt: "Exploded modular PCB assembly and industrial casing design",
        caption: "MICRO-FOOTPRINT INDUSTRIAL HARDWARE",
        tag: "PCB PIPELINE",
      },
    ],

    overview:
      "BotBlox creates the world's smallest networking hardware for drones, autonomous rovers, and submersibles. Their hardware is trusted by NASA, Boeing, and autonomous vehicle innovators worldwide.",
    challenge:
      "Engineers don't want marketing fluff—they want schematics, pinouts, and exact thermal specs. At the same time, the company needed to look like a world-class technology brand.",
    solution:
      "We built a high-tech engineering platform featuring interactive 3D CAD board viewers, instant datasheet search, and streamlined global e-commerce checkout.",
    deliverables: [
      "Interactive 3D PCB CAD Viewer",
      "Instant Datasheet & Pinout Documentation Hub",
      "Global Hardware E-Commerce Experience",
      "CAD Step File Download Engine",
    ],
    technologies: ["Next.js 16", "Three.js", "Tailwind CSS", "Shopify Storefront API"],
    results: [
      { value: "65K+", label: "Units Deployed Across 70+ Countries" },
      { value: "0.08s", label: "Instant Product Configuration Latency" },
      { value: "85%", label: "Repeat Purchase Rate from Enterprise Engineers" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
