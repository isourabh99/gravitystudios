export interface ServiceDetailData {
  id: string;
  num: string; // "01" to "10"
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  accentColor: string;
  alt: string;
  tagline: string;
  overview: string;
  approach: {
    challenge: string;
    solution: string;
  };
  results: { value: string; label: string }[];
  deliverables: string[];
  metadata: {
    domain: string;
    timeline: string;
    year: string;
    type: string;
  };
  technologies: string[];
  quote?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface ConveyorServiceItem {
  id: string;
  isTop: boolean;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  hudBadge: string;
  telemetry: {
    label: string;
    value: string;
  };
  serviceDetails: ServiceDetailData;
}

export const SERVICES_SHOWCASE_ITEMS: ConveyorServiceItem[] = [
  // 01. Web Design & UX Systems (TOP)
  {
    id: "service-01-web-design",
    isTop: true,
    number: "01",
    title: "Web Design & UX Systems",
    subtitle: "FIGMA & DESIGN TOKENS",
    tagline: "High-conversion digital experiences and design systems engineered for technical buyers.",
    description: "Websites that make complex technology clear, credible, and instantly desirable to enterprise buyers and venture funds.",
    category: "Design & Systems",
    imageUrl: "/images/services/web-design.jpg",
    imageAlt: "Figma design system and UI wireframes on dark minimalist workstation",
    tags: ["UI/UX Systems", "Tokens", "Figma", "Prototypes"],
    hudBadge: "DISCIPLINE // 01",
    telemetry: {
      label: "COVERAGE",
      value: "100% TOKENS",
    },
    serviceDetails: {
      id: "web-design",
      num: "01",
      title: "Web Design & UX Systems",
      subtitle: "Designed for technical buyers who value precision and speed",
      category: "DESIGN & SYSTEMS",
      imageUrl: "/images/services/web-design.jpg",
      accentColor: "#ED3327",
      alt: "Figma design system and UI wireframes on dark minimalist workstation",
      tagline: "High-conversion digital experiences and scalable design systems for high-growth and technical brands.",
      overview:
        "Technical brands often struggle to articulate proprietary engineering without getting bogged down in impenetrable jargon. We build clear information architectures, interactive Figma prototypes, and modular design token libraries that allow prospective buyers to intuitively grasp product power and close enterprise deals faster.",
      approach: {
        challenge: "Complex software and hardware products confuse non-technical executives and lengthen sales cycles.",
        solution: "We structure clear visual hierarchies, intuitive mental models, and clickable wireframes that explain deep capabilities in seconds.",
      },
      results: [
        { value: "100%", label: "Design Token Coverage" },
        { value: "98/100", label: "Usability Benchmark" },
        { value: "2.8x", label: "Enterprise Inbound Lift" },
      ],
      deliverables: [
        "Information Architecture & Strategic Wireframing",
        "Interactive Figma Design Systems & Token Libraries",
        "High-Fidelity Desktop & Mobile Prototypes",
        "Usability Audits & User Experience Strategy",
        "Custom Micro-Interactions & Motion Direction",
      ],
      metadata: {
        domain: "UI/UX & Systems",
        timeline: "2 – 4 Weeks",
        year: "2025–2026",
        type: "Design System & Prototyping",
      },
      technologies: ["Figma", "Design Tokens", "Framer", "Protopie", "Tailwind Tokens"],
      quote: {
        quote: "Gravity created a design system that united our entire product ecosystem. Our engineers ship new landing pages in half the time.",
        author: "Alexei Petrov",
        role: "VP Design, Quanta Systems",
      },
    },
  },

  // 02. High-Performance Engineering (BOTTOM)
  {
    id: "service-02-web-dev",
    isTop: false,
    number: "02",
    title: "High-Performance Web Engineering",
    subtitle: "NEXT.JS 16 & REACT 19",
    tagline: "Sub-second load times with enterprise-grade SSR & edge architecture.",
    description: "Framer when your team needs to move fast; custom code in Astro or Next.js when you need scale, speed, and 99+ Lighthouse scores.",
    category: "Engineering & Performance",
    imageUrl: "/images/services/web-dev.jpg",
    imageAlt: "High performance Next.js engineering architecture and code editor terminal",
    tags: ["Next.js 16", "Astro", "TypeScript", "Tailwind"],
    hudBadge: "DISCIPLINE // 02",
    telemetry: {
      label: "SPEED",
      value: "99+ LIGHTHOUSE",
    },
    serviceDetails: {
      id: "web-dev",
      num: "02",
      title: "High-Performance Web Engineering",
      subtitle: "The right stack for your stage: Next.js, Astro & React 19",
      category: "FULL-STACK CODE & ARCHITECTURE",
      imageUrl: "/images/services/web-dev.jpg",
      accentColor: "#ED3327",
      alt: "Next.js architecture diagram and high-performance terminal",
      tagline: "Sub-second page loads, clean modular TypeScript, and edge runtime scalability.",
      overview:
        "Slow, bloated websites bleed credibility and burn paid acquisition dollars. We engineer lightweight, zero-layout-shift web applications using Next.js 16 App Router, Astro static islands, and React 19 server components, delivering world-class performance and bulletproof uptime under global traffic surges.",
      approach: {
        challenge: "Modern marketing sites suffer from bloated JavaScript bundles and terrible Core Web Vitals.",
        solution: "We leverage edge caching, streaming SSR, and image optimization pipelines to guarantee sub-0.2s First Contentful Paint.",
      },
      results: [
        { value: "0.2s", label: "First Contentful Paint" },
        { value: "100%", label: "TypeScript Strict Mode" },
        { value: "99+", label: "Google Lighthouse Speed" },
      ],
      deliverables: [
        "Next.js 16 (App Router) & React 19 Architecture",
        "Astro Ultra-Fast Static Site Generation",
        "Tailwind CSS & Modular Design Token Implementation",
        "Headless CMS Integration (Sanity, Strapi, Contentful)",
        "Automated CI/CD Pipelines & Edge Deployments",
      ],
      metadata: {
        domain: "Engineering & Full-Stack",
        timeline: "3 – 6 Weeks",
        year: "2025–2026",
        type: "Custom Production Engineering",
      },
      technologies: ["Next.js 16", "React 19", "Astro", "TypeScript", "Turbopack", "Vercel Edge"],
      quote: {
        quote: "The site loads like lightning anywhere in the world. Our bounce rate plummeted by 42% on the first week after launch.",
        author: "Claire Sterling",
        role: "CTO, Vector Aerospace",
      },
    },
  },

  // 03. 3D & Real-Time WebGL (TOP)
  {
    id: "service-03-3d-webgl",
    isTop: true,
    number: "03",
    title: "3D & Real-Time WebGL Experiences",
    subtitle: "THREE.JS & SHADER LAB",
    tagline: "Interactive 3D configurators, spatial interfaces, and GPU physics at 60 FPS.",
    description: "Real-time WebGL configurators, GLSL custom shaders, and cinematic physics that elevate your product above static competitors.",
    category: "Spatial Media & Creative Tech",
    imageUrl: "/images/services/3d-webgl.jpg",
    imageAlt: "Futuristic 3D real-time WebGL spatial interactive polygon geometry",
    tags: ["Three.js", "WebGL Shaders", "Blender", "60 FPS GPU"],
    hudBadge: "DISCIPLINE // 03",
    telemetry: {
      label: "GPU TARGET",
      value: "60 FPS LOCK",
    },
    serviceDetails: {
      id: "3d-webgl",
      num: "03",
      title: "3D & Real-Time WebGL Experiences",
      subtitle: "Immersive real-time graphics that run smoothly in every browser",
      category: "SPATIAL MEDIA & CREATIVE TECH",
      imageUrl: "/images/services/3d-webgl.jpg",
      accentColor: "#ED3327",
      alt: "3D real-time WebGL polygon sculpture and telemetry overlay",
      tagline: "Interactive 3D product visualizers and shader art engineered for buttery 60 FPS performance.",
      overview:
        "Photographs cannot capture how groundbreaking hardware operates. We import raw CAD geometry into optimized GLTF meshes, author custom GLSL post-processing shaders, and orchestrate interactive camera physics in Three.js and React Three Fiber, letting buyers explore inside your hardware right in the browser.",
      approach: {
        challenge: "Heavy 3D models lag laptops, drain battery, and crash mobile browsers.",
        solution: "We implement dynamic LOD, Draco compression, and fallback canvas shaders that maintain 60 FPS across all devices.",
      },
      results: [
        { value: "60 FPS", label: "Guaranteed GPU Frame Rate" },
        { value: "< 2MB", label: "Total 3D Asset Footprint" },
        { value: "+74%", label: "Average Session Dwell Time" },
      ],
      deliverables: [
        "Three.js & React Three Fiber Real-Time 3D Viewers",
        "Custom GLSL Shader & Post-Processing Effects",
        "CAD-to-Blender Asset Retopology & Optimization",
        "Interactive Cursor & Scroll Physics Simulation",
        "Mobile & Low-End GPU Fallback Optimization",
      ],
      metadata: {
        domain: "Spatial Media & 3D Web",
        timeline: "3 – 5 Weeks",
        year: "2025–2026",
        type: "Interactive WebGL Engine",
      },
      technologies: ["Three.js", "React Three Fiber", "GLSL Shaders", "Blender", "Draco", "Framer Motion"],
      quote: {
        quote: "Our clients spend minutes rotating our hardware subsystem on the site. It closed a $4M defense procurement contract.",
        author: "Julian Thorne",
        role: "Founder, Orbital Dynamics",
      },
    },
  },

  // 04. Branding & Visual Identity (BOTTOM)
  {
    id: "service-04-branding",
    isTop: false,
    number: "04",
    title: "Branding & Visual Identity Systems",
    subtitle: "EDITORIAL & DIGITAL SYSTEMS",
    tagline: "A visual identity designed once and applied everywhere: from pitch deck to product UI.",
    description: "Comprehensive visual systems, custom typography, and luxury editorial collateral that establish unmistakable industry authority.",
    category: "Brand Strategy & Direction",
    imageUrl: "/images/services/branding.jpg",
    imageAlt: "Modern luxury brand identity mockup, brand guidelines book, and typography specimen",
    tags: ["Typography", "Design System", "Pitch Decks", "Guidelines"],
    hudBadge: "DISCIPLINE // 04",
    telemetry: {
      label: "SYSTEM",
      value: "OMNICHANNEL",
    },
    serviceDetails: {
      id: "branding",
      num: "04",
      title: "Branding & Visual Identity Systems",
      subtitle: "Identity, tone, and editorial systems for visionary companies",
      category: "BRAND STRATEGY & DIRECTION",
      imageUrl: "/images/services/branding.jpg",
      accentColor: "#ED3327",
      alt: "Brand identity book, cards, and typography specimen",
      tagline: "Authoritative brand identities that command premium market valuation.",
      overview:
        "Weak branding makes groundbreaking technology look unproven. We develop comprehensive brand identities with clinical typography, mathematical grids, and distinct color architectures. From investor seed decks to web flagships and trade show collateral, your brand presents as the undisputed market leader.",
      approach: {
        challenge: "Startups often use mismatched templates, causing brand fragmentation and credibility leaks.",
        solution: "We build a cohesive brand bible with strict typographic scales, iconography, and multi-channel design tokens.",
      },
      results: [
        { value: "80+", label: "Tailored Brand Assets" },
        { value: "100%", label: "Omnichannel Consistency" },
        { value: "$120M+", label: "Raised With Our Decks" },
      ],
      deliverables: [
        "Comprehensive Brand Book & Identity Guidelines",
        "Custom Typography Selection & Micro-Pairing",
        "High-Impact Investor Pitch Decks & Keynotes",
        "Logo Architecture, Favicons & Social Kits",
        "Print & Digital Marketing Collateral Templates",
      ],
      metadata: {
        domain: "Brand Direction & Print/Web",
        timeline: "3 – 5 Weeks",
        year: "2025–2026",
        type: "Comprehensive Brand Suite",
      },
      technologies: ["Illustrator", "InDesign", "Figma", "Glyphs", "Motion Graphics"],
      quote: {
        quote: "Gravity gave us an identity that immediately positioned us alongside Fortune 500 competitors.",
        author: "Sophie Laurent",
        role: "Chief Strategy Officer, Aurelius AI",
      },
    },
  },

  // 05. SEO & AI Search Optimization (TOP)
  {
    id: "service-05-seo-ai",
    isTop: true,
    number: "05",
    title: "SEO & AI Search Optimization (GEO)",
    subtitle: "GEO & GENERATIVE CITATIONS",
    tagline: "Built to be ranked by Google and cited by AI models like Perplexity and ChatGPT.",
    description: "Technical SEO from the first wireframe, plus the AI layer: content that search engines rank and that AI assistants quote as definitive truth.",
    category: "Search Strategy & AI",
    imageUrl: "/images/services/seo-ai.jpg",
    imageAlt: "Futuristic search engine and generative AI citations telemetry interface",
    tags: ["LLM Citation", "GEO", "Schema.org", "PageSpeed 100"],
    hudBadge: "DISCIPLINE // 05",
    telemetry: {
      label: "CITATION",
      value: "LLM EMBEDDED",
    },
    serviceDetails: {
      id: "seo-ai",
      num: "05",
      title: "SEO & AI Search Optimization (GEO)",
      subtitle: "Generative Engine Optimization for the future of search",
      category: "SEARCH STRATEGY & GEO",
      imageUrl: "/images/services/seo-ai.jpg",
      accentColor: "#ED3327",
      alt: "Generative AI search citation nodes and neural telemetry interface",
      tagline: "Ensuring your company is the #1 verified source quoted by AI models and search engines.",
      overview:
        "Search is undergoing its biggest paradigm shift in 25 years. Technical buyers now query Perplexity, ChatGPT, and Claude alongside Google. We engineer deep JSON-LD Knowledge Graphs, semantic citations, and information-gain content architectures that ensure AI answer engines cite your company as the authoritative domain source.",
      approach: {
        challenge: "Traditional keyword SEO fails in the age of conversational LLM synthesis and AI Overviews.",
        solution: "We implement multi-layered Schema.org ontologies and citation anchors that LLM web search agents parse reliably.",
      },
      results: [
        { value: "88%", label: "AI Answer Citation Rate" },
        { value: "100/100", label: "Core Web Vitals Metric" },
        { value: "3.4x", label: "Organic High-Intent Leads" },
      ],
      deliverables: [
        "Generative Engine Optimization (GEO) & Citation Architecture",
        "Semantic Structured Data & JSON-LD Schema Graphs",
        "Core Web Vitals Perfection (LCP, INP, CLS)",
        "Information Gain Content Strategy & Knowledge Graphs",
        "Technical Crawlability & Indexing Infrastructure",
      ],
      metadata: {
        domain: "Search & Generative AI",
        timeline: "2 – 4 Weeks",
        year: "2025–2026",
        type: "Technical GEO & SEO Suite",
      },
      technologies: ["Schema.org", "Next SEO", "JSON-LD", "Perplexity API", "OpenAI Embeddings"],
      quote: {
        quote: "Whenever enterprise clients ask ChatGPT or Perplexity about autonomous inspection, our company is cited as the top recommendation.",
        author: "Devon Reynolds",
        role: "VP Marketing, Hylight",
      },
    },
  },

  // 06. E-Commerce & Custom Cart Architecture (BOTTOM)
  {
    id: "service-06-ecommerce",
    isTop: false,
    number: "06",
    title: "E-Commerce & Custom Cart Architecture",
    subtitle: "HEADLESS SHOPIFY & STRIPE",
    tagline: "Sub-second headless checkout and high-conversion product showcases for luxury and technical goods.",
    description: "Custom headless storefronts, seamless international checkout, and tactile product configurators that turn visitors into high-AOV customers.",
    category: "Headless Commerce",
    imageUrl: "/images/services/ecommerce.jpg",
    imageAlt: "Dark luxury headless e-commerce interface with sub-second checkout drawer",
    tags: ["Shopify Plus", "Stripe", "Next.js Storefront", "Sub-Second"],
    hudBadge: "DISCIPLINE // 06",
    telemetry: {
      label: "CHECKOUT",
      value: "0.3s SUB-SECOND",
    },
    serviceDetails: {
      id: "ecommerce",
      num: "06",
      title: "E-Commerce & Custom Cart Architecture",
      subtitle: "Bespoke headless shopping experiences for high-AOV brands",
      category: "HEADLESS COMMERCE & CHECKOUT",
      imageUrl: "/images/services/ecommerce.jpg",
      accentColor: "#ED3327",
      alt: "Headless e-commerce product showcase and checkout drawer",
      tagline: "Sub-second checkout, international currencies, and bespoke product experiences.",
      overview:
        "Template e-commerce stores kill conversion rates for premium brands. We build bespoke headless e-commerce storefronts on Next.js paired with Shopify Plus and Stripe. With instant page transitions, fluid cart slide-outs, and 1-click international checkout, our stores maximize revenue per visitor.",
      approach: {
        challenge: "Default Shopify themes are slow, bloated, and visually indistinguishable from drop-shippers.",
        solution: "We decouple the frontend with Next.js, using Shopify solely as a secure backend API with instant edge caching.",
      },
      results: [
        { value: "0.3s", label: "Cart Drawer Open Time" },
        { value: "+38%", label: "Checkout Completion Rate" },
        { value: "$4.2M+", label: "Processed Annually" },
      ],
      deliverables: [
        "Custom Headless Shopify Storefront Architecture",
        "Stripe Custom Elements & Express Checkout Integration",
        "Multi-Currency & International Tax Localization",
        "Interactive 3D Product Customizers & Variants",
        "Real-Time Inventory Synchronization & Webhooks",
      ],
      metadata: {
        domain: "Commerce & Payments",
        timeline: "4 – 6 Weeks",
        year: "2025–2026",
        type: "Headless Digital Storefront",
      },
      technologies: ["Shopify Storefront API", "Next.js", "Stripe Elements", "Tailwind CSS", "Zustand"],
      quote: {
        quote: "Our average order value jumped 45% after Gravity rebuilt our store on Next.js and Shopify headless.",
        author: "Mateo Bianchi",
        role: "Founder, Chronos Timepieces",
      },
    },
  },

  // 07. Creative Motion Direction & Interactions (TOP)
  {
    id: "service-07-motion",
    isTop: true,
    number: "07",
    title: "Creative Motion & Interactions",
    subtitle: "GSAP & KINETIC PHYSICS",
    tagline: "Bespoke micro-interactions, scroll-driven timelines, and 120 FPS physics curves.",
    description: "Dynamic cursor physics, scroll storytelling, and fluid kinetic easing that make your digital product feel tactile and unforgettable.",
    category: "Motion & Interactions",
    imageUrl: "/images/services/motion-design.jpg",
    imageAlt: "Cinematic motion design with fluid spline curves and particle trajectories",
    tags: ["GSAP", "Framer Motion", "Lenis", "120 FPS Easing"],
    hudBadge: "DISCIPLINE // 07",
    telemetry: {
      label: "TIMELINE",
      value: "120 FPS FLUID",
    },
    serviceDetails: {
      id: "motion-design",
      num: "07",
      title: "Creative Motion & Interactions",
      subtitle: "Kinetic physics, scroll-driven narratives, and tactile digital micro-interactions",
      category: "KINETIC PHYSICS & GSAP",
      imageUrl: "/images/services/motion-design.jpg",
      accentColor: "#ED3327",
      alt: "Motion physics timeline curves and glowing spline ribbons",
      tagline: "Micro-animations and scroll narratives that evoke delight without hindering usability.",
      overview:
        "Motion should never be an afterthought or a cheap gimmick. We engineer purposeful motion systems that direct user attention, explain spatial relationships, and provide tactile sensory feedback. With butter-smooth 120 FPS easing curves and zero layout thrashing, every gesture feels instantaneous and luxurious.",
      approach: {
        challenge: "Excessive or unoptimized animations cause browser stutter, nauseate users, and degrade accessibility.",
        solution: "We benchmark animation performance on low-spec hardware, respect prefers-reduced-motion, and use GPU transforms exclusively.",
      },
      results: [
        { value: "120 FPS", label: "Silky Animation Refresh" },
        { value: "0ms", label: "Layout Thrashing / Reflow" },
        { value: "100%", label: "Reduced-Motion Compliant" },
      ],
      deliverables: [
        "Scroll-Triggered Narrative Storytelling Systems",
        "Interactive Cursor Follow & Magnetic Button Physics",
        "Page-To-Page Shared Layout Transitions",
        "Micro-Interactions & State Change Choreography",
        "Comprehensive Motion Token Guidelines",
      ],
      metadata: {
        domain: "Motion Direction & Physics",
        timeline: "2 – 4 Weeks",
        year: "2025–2026",
        type: "Kinetic Experience Layer",
      },
      technologies: ["Framer Motion", "GSAP ScrollTrigger", "Lenis Scroll", "SVG Morphing", "CSS Compositing"],
      quote: {
        quote: "The micro-animations Gravity implemented made our software feel 10x more polished and premium.",
        author: "Sarah Lindqvist",
        role: "Head of Product, Kestrix",
      },
    },
  },

  // 08. AI Agent Workflows & Copilots (BOTTOM)
  {
    id: "service-08-ai-agents",
    isTop: false,
    number: "08",
    title: "AI Agent Workflows & Copilots",
    subtitle: "MULTI-AGENT RAG & LLMS",
    tagline: "Embedding intelligent LLM agents and autonomous workflows directly into web interfaces.",
    description: "Custom conversational copilots, context-aware retrieval (RAG), and autonomous multi-agent systems embedded seamlessly into your product.",
    category: "AI & Agents",
    imageUrl: "/images/services/ai-agents.jpg",
    imageAlt: "Futuristic multi-agent AI workflow orchestration dashboard with glowing agent nodes",
    tags: ["LangChain", "RAG Vectors", "OpenAI", "Real-Time Streaming"],
    hudBadge: "DISCIPLINE // 08",
    telemetry: {
      label: "LATENCY",
      value: "12ms STREAM",
    },
    serviceDetails: {
      id: "ai-agents",
      num: "08",
      title: "AI Agent Workflows & Copilots",
      subtitle: "Transform static software into proactive, intelligent copilot workflows",
      category: "AGENTIC WORKFLOWS & RAG",
      imageUrl: "/images/services/ai-agents.jpg",
      accentColor: "#ED3327",
      alt: "Multi-agent orchestration dashboard and connected neural nodes",
      tagline: "Turn complex enterprise workflows into instant, conversational AI actions.",
      overview:
        "Static forms and dropdowns are being replaced by proactive generative copilots. We build secure, grounded multi-agent systems and retrieval-augmented generation (RAG) pipelines directly into web applications. Your users query proprietary datasets and trigger multi-step tasks in milliseconds with full auditability.",
      approach: {
        challenge: "LLM hallucinations, slow response latency, and data privacy leaks threaten enterprise adoption.",
        solution: "We implement vector search verification, token-efficient caching, and strict data fence boundaries.",
      },
      results: [
        { value: "12ms", label: "Token Stream Latency" },
        { value: "99.4%", label: "Fact-Grounded Precision" },
        { value: "6.5x", label: "Task Execution Speed" },
      ],
      deliverables: [
        "In-Browser Streaming Copilot & Assistant UI",
        "Retrieval-Augmented Generation (RAG) Vector Stores",
        "Multi-Agent Task Routing & Orchestration Graphs",
        "Enterprise Role-Based Access & Data Fencing",
        "Real-Time Telemetry & Token Usage Analytics",
      ],
      metadata: {
        domain: "AI Engineering & Agents",
        timeline: "4 – 6 Weeks",
        year: "2025–2026",
        type: "Intelligent Agent Integration",
      },
      technologies: ["OpenAI API", "Anthropic Claude", "Pinecone", "LangGraph", "Server-Sent Events", "Next.js Edge"],
      quote: {
        quote: "The embedded AI copilot Gravity created transformed our product from a complex CRM into an effortless conversational assistant.",
        author: "Tariq Mansoor",
        role: "Co-Founder, Synapse AI",
      },
    },
  },

  // 09. Mobile & Spatial Computing UI (TOP)
  {
    id: "service-09-mobile-spatial",
    isTop: true,
    number: "09",
    title: "Mobile & Spatial Computing UI",
    subtitle: "VISIONOS & RESPONSIVE GLASS",
    tagline: "Fluid glassmorphism interfaces, multi-touch gestures, and adaptive spatial layouts.",
    description: "Interfaces designed for next-generation mobile ergonomics and spatial computing, delivering depth, tactile blur, and natural physics.",
    category: "Mobile & Spatial UI",
    imageUrl: "/images/services/mobile-spatial.jpg",
    imageAlt: "Modern spatial computing and mobile device glass interface with translucent cards",
    tags: ["VisionOS", "iOS Gestures", "Glassmorphism", "Spatial Depth"],
    hudBadge: "DISCIPLINE // 09",
    telemetry: {
      label: "DEPTH",
      value: "Z-AXIS SPATIAL",
    },
    serviceDetails: {
      id: "mobile-spatial",
      num: "09",
      title: "Mobile & Spatial Computing UI",
      subtitle: "Ergonomic mobile interfaces and spatial glass computing design",
      category: "CROSS-PLATFORM & VISIONOS",
      imageUrl: "/images/services/mobile-spatial.jpg",
      accentColor: "#ED3327",
      alt: "Spatial computing floating translucent cards and mobile interface",
      tagline: "Tactile glass interfaces and spatial computing layouts built for human hands and vision.",
      overview:
        "Screen boundaries are dissolving as spatial computing and foldable devices emerge. We design interfaces with progressive spatial depth, real-time backdrop blur, and ergonomic thumb-reach zones. Whether viewed on an iPhone or an Apple Vision Pro headset, your application feels native, weightless, and intuitive.",
      approach: {
        challenge: "Flat desktop designs look clunky and unergonomic when ported directly to mobile and spatial viewports.",
        solution: "We build bottom-sheet navigation, natural spring physics, and progressive blur materials tailored to each viewport.",
      },
      results: [
        { value: "100%", label: "Mobile Ergonomics Score" },
        { value: "60 FPS", label: "Spring Gesture Response" },
        { value: "4.9/5", label: "App Store User Rating" },
      ],
      deliverables: [
        "Responsive Mobile-First Interface Architecture",
        "Progressive Web App (PWA) Offline Infrastructure",
        "Spatial Glassmorphism & Depth Token Libraries",
        "Multi-Touch & Gesture Navigation Systems",
        "Cross-Platform iOS & Android Design Translation",
      ],
      metadata: {
        domain: "Mobile & Spatial Systems",
        timeline: "3 – 5 Weeks",
        year: "2025–2026",
        type: "Spatial Mobile Experience",
      },
      technologies: ["React Native", "Tailwind CSS", "SwiftUI Tokens", "CSS Backdrop Filters", "PWA APIs"],
      quote: {
        quote: "Gravity's spatial glass design makes our mobile experience feel like something designed five years in the future.",
        author: "Nadia Chen",
        role: "Head of Mobile, Aether Health",
      },
    },
  },

  // 10. Technical Audits & Security Hardening (BOTTOM)
  {
    id: "service-10-security-audit",
    isTop: false,
    number: "10",
    title: "Technical Audits & Security Hardening",
    subtitle: "OWASP & CORE WEB VITALS",
    tagline: "Rigorous vulnerability assessments, zero-trust CSP headers, and guaranteed 100/100 Lighthouse scores.",
    description: "Deep technical audits covering code security, penetration testing, Content Security Policies, accessibility compliance, and performance guarantees.",
    category: "Security & Auditing",
    imageUrl: "/images/services/security-audit.jpg",
    imageAlt: "Cybersecurity and web performance audit dashboard with 100 percent Lighthouse metrics dials",
    tags: ["CSP Security", "OWASP Top 10", "Lighthouse 100", "Zero Trust"],
    hudBadge: "DISCIPLINE // 10",
    telemetry: {
      label: "AUDIT",
      value: "100% SECURE",
    },
    serviceDetails: {
      id: "security-audit",
      num: "10",
      title: "Technical Audits & Security Hardening",
      subtitle: "Enterprise-grade code security, strict CSP, and flawless performance compliance",
      category: "SECURITY & CORE WEB VITALS",
      imageUrl: "/images/services/security-audit.jpg",
      accentColor: "#10B981",
      alt: "Security audit compliance matrix and 100% Lighthouse metrics dials",
      tagline: "Bulletproof web security, cryptographic compliance, and perfect performance scores.",
      overview:
        "A single security breach or slow audit score can derail enterprise procurement and damage investor confidence. We perform comprehensive codebase audits, harden Content Security Policies (CSP), eliminate dependency vulnerabilities, and configure zero-trust edge proxies to guarantee compliance with enterprise security requirements.",
      approach: {
        challenge: "Third-party tracking scripts and unpatched dependencies introduce serious security vulnerabilities.",
        solution: "We implement strict nonce-based CSP headers, subresource integrity (SRI), and comprehensive dependency lockfiles.",
      },
      results: [
        { value: "100/100", label: "Lighthouse Performance" },
        { value: "0", label: "Known Vulnerabilities" },
        { value: "A+", label: "Mozilla Observatory Grade" },
      ],
      deliverables: [
        "Full-Stack Security & Dependency Vulnerability Audits",
        "Strict Nonce-Based Content Security Policy (CSP)",
        "OWASP Top 10 Mitigation & Penetration Testing",
        "Core Web Vitals Remediation & Performance Tuning",
        "Executive & Technical Compliance Certification Reports",
      ],
      metadata: {
        domain: "Security & Performance",
        timeline: "1 – 3 Weeks",
        year: "2025–2026",
        type: "Enterprise Audit & Hardening",
      },
      technologies: ["OWASP ZAP", "Mozilla Observatory", "Google Lighthouse", "Snyk", "Cloudflare WAF"],
      quote: {
        quote: "Gravity's audit resolved critical security flags and boosted our Lighthouse score to a perfect 100 across the board.",
        author: "Evelyn Reed",
        role: "Chief Information Security Officer, BotBlox",
      },
    },
  },
];
