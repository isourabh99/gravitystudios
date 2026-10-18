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
  slug: string; // "sutra-crm", "indus-luxe", ...
  title: string;
  client: string;
  category: string; // "Enterprise CRM", "D2C E-Commerce", ...
  tagline: string;
  description: string;
  year: string;
  location: string;
  projectType: string;
  metaString: string;
  liveUrl?: string;

  // Media: exactly 1 Video + 2 Images (1 Desktop Website + 1 Responsive Application)
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
  // 01. Sutra CRM
  {
    number: "01",
    slug: "sutra-crm",
    title: "Sutra CRM",
    client: "Sutra Technologies",
    category: "Enterprise CRM",
    tagline: "AI-native sales intelligence & relationship management platform for modern enterprises.",
    description:
      "A high-velocity enterprise CRM engineered for Indian B2B tech giants, featuring real-time pipeline telemetry, WhatsApp business integrations, and automated deal scoring.",
    year: "2025",
    location: "Bengaluru, India",
    projectType: "ENTERPRISE CRM PLATFORM",
    metaString: "ENTERPRISE CRM · BENGALURU, INDIA · 2025",
    liveUrl: "https://sutracrm.in",

    video: {
      id: "sutra-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-hands-typing-code-on-a-laptop-41555-large.mp4",
      poster: "/projects/sutra-poster.jpg",
      alt: "Sutra CRM interactive pipeline management interface and real-time deal flow",
      caption: "INTERACTIVE SALES PIPELINE & REAL-TIME AUTOMATION",
      tag: "VIDEO DEMO",
    },
    images: [
      {
        id: "sutra-web",
        type: "image",
        src: "/projects/sutra-web.jpg",
        alt: "Sutra CRM Desktop Website featuring enterprise dashboard and pipeline overview",
        caption: "DESKTOP WEBSITE · ENTERPRISE COMMAND CENTER",
        tag: "DESKTOP WEB",
      },
      {
        id: "sutra-app",
        type: "image",
        src: "/projects/sutra-app.jpg",
        alt: "Sutra CRM Responsive Mobile Application for field sales teams",
        caption: "RESPONSIVE MOBILE APP · FIELD SALES TELEMETRY",
        tag: "RESPONSIVE APP",
      },
    ],

    overview:
      "Sutra CRM delivers next-generation customer relationship management specifically tailored for fast-scaling enterprises across India and Southeast Asia. We designed the unified design system, desktop command web portal, and responsive mobile application.",
    challenge:
      "Legacy CRM software is cluttered and slow on mobile. Sutra needed an interface that felt instantaneous, allowing field executives and C-suite leadership to log meetings, track ARR, and trigger workflows in under two taps.",
    solution:
      "We engineered a sleek, keyboard-first desktop web suite alongside a dedicated responsive mobile web application, backed by local-first offline caching and real-time pipeline synching.",
    deliverables: [
      "End-to-End Design System & Token Architecture",
      "Desktop Web Command Portal (Next.js 16)",
      "High-Performance Responsive Mobile Web Application",
      "Interactive Sales Pipeline & Analytics Dashboard",
    ],
    technologies: ["Next.js 16", "React 19", "Tailwind CSS", "TypeScript", "Framer Motion", "TanStack Query"],
    results: [
      { value: "3.8x", label: "Faster Deal Closure Cycle" },
      { value: "99.9%", label: "Mobile Sync Reliability in Low Connectivity" },
      { value: "48ms", label: "Average Interaction Latency" },
    ],
    clientQuote: {
      quote:
        "Gravity redefined how our sales reps and managers view CRM. The desktop and mobile app experience feels as responsive as a Bloomberg Terminal.",
      author: "Aditya Vardhan",
      role: "Chief Product Officer, Sutra Technologies",
    },
  },

  // 02. Indus Luxe
  {
    number: "02",
    slug: "indus-luxe",
    title: "Indus Luxe",
    client: "Indus Heritage Craft",
    category: "D2C E-Commerce",
    tagline: "Luxury Indian artisanal craft & couture high-conversion headless e-commerce store.",
    description:
      "A bespoke, high-fashion headless e-commerce store celebrating master Indian weavers, jewelers, and heritage textiles with cinematic typography and sub-second global checkout.",
    year: "2025",
    location: "Mumbai, India",
    projectType: "HEADLESS D2C E-COMMERCE",
    metaString: "HEADLESS E-COMMERCE · MUMBAI, INDIA · 2025",
    liveUrl: "https://indusluxe.com",

    video: {
      id: "indus-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-luxury-perfume-bottle-with-water-droplets-41552-large.mp4",
      poster: "/projects/indus-poster.jpg",
      alt: "Indus Luxe luxury couture collection editorial film and interactive storefront",
      caption: "HIGH-JEWELRY & ARTISANAL COUTURE STOREFRONT REEL",
      tag: "VIDEO DEMO",
    },
    images: [
      {
        id: "indus-web",
        type: "image",
        src: "/projects/indus-web.jpg",
        alt: "Indus Luxe Desktop Website editorial catalog and luxury product grid",
        caption: "DESKTOP WEBSITE · HIGH-CONVERSION EDITORIAL STORE",
        tag: "DESKTOP WEB",
      },
      {
        id: "indus-app",
        type: "image",
        src: "/projects/indus-app.jpg",
        alt: "Indus Luxe Responsive Mobile Application with 1-click checkout experience",
        caption: "RESPONSIVE MOBILE APP · FRICTIONLESS 1-TAP CHECKOUT",
        tag: "RESPONSIVE APP",
      },
    ],

    overview:
      "Indus Luxe unites India's most celebrated heritage textile artisans and contemporary couture ateliers. They required an uncompromising digital flagship that rivaled Parisian luxury fashion houses while optimizing for multi-currency global transactions.",
    challenge:
      "Traditional luxury fashion stores suffer from slow image rendering and clunky mobile cart drawers. The brand demanded editorial beauty without compromising load times or checkout velocity.",
    solution:
      "We engineered a headless Shopify storefront using Next.js App Router, edge image caching, and a thumb-friendly responsive mobile checkout interface with instantaneous UPI and Stripe integration.",
    deliverables: [
      "Headless E-Commerce Flagship Architecture",
      "Dynamic Editorial Lookbook & Video Commerce Grid",
      "Responsive Mobile Web Shopping Experience",
      "Multi-Currency Global Checkout Engine",
    ],
    technologies: ["Shopify Storefront API", "Next.js 16", "Tailwind CSS", "Framer Motion", "Cloudflare CDN"],
    results: [
      { value: "+64%", label: "Increase in Mobile Checkout Conversion" },
      { value: "0.4s", label: "Largest Contentful Paint (LCP)" },
      { value: "€2.4M", label: "Gross Merchandise Value in Q1" },
    ],
    clientQuote: {
      quote:
        "The digital experience captured the soul and craftsmanship of Indian couture while converting international collectors with unmatched speed.",
      author: "Meera Singhania",
      role: "Founder & Creative Director, Indus Luxe",
    },
  },

  // 03. Sarva CMS
  {
    number: "03",
    slug: "sarva-cms",
    title: "Sarva CMS",
    client: "Sarva Media Networks",
    category: "Headless CMS",
    tagline: "Blazing-fast multilingual content publishing system built for digital newsrooms.",
    description:
      "A modern headless CMS and publishing engine engineered for high-volume Indian editorial teams publishing across 12 Indian regional languages simultaneously.",
    year: "2025",
    location: "New Delhi, India",
    projectType: "HEADLESS CMS & PUBLISHING SYSTEM",
    metaString: "HEADLESS CMS · NEW DELHI, INDIA · 2025",
    liveUrl: "https://sarvacms.org",

    video: {
      id: "sarva-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-circuit-board-with-moving-electronic-signals-41557-large.mp4",
      poster: "/projects/sarva-poster.jpg",
      alt: "Sarva CMS real-time collaborative editorial authoring and distribution network",
      caption: "REAL-TIME COLLABORATIVE PUBLISHING PIPELINE",
      tag: "VIDEO DEMO",
    },
    images: [
      {
        id: "sarva-web",
        type: "image",
        src: "/projects/sarva-web.jpg",
        alt: "Sarva CMS Desktop Website editorial authoring and SEO management console",
        caption: "DESKTOP WEBSITE · MULTILINGUAL NEWSROOM CONSOLE",
        tag: "DESKTOP WEB",
      },
      {
        id: "sarva-app",
        type: "image",
        src: "/projects/sarva-app.jpg",
        alt: "Sarva CMS Responsive Mobile Application for field journalists and editors",
        caption: "RESPONSIVE MOBILE APP · LIVE BREAKING NEWS DISPATCH",
        tag: "RESPONSIVE APP",
      },
    ],

    overview:
      "Sarva Media powers over 40 million monthly readers across diverse Indian languages. They partnered with us to overhaul their entire content authoring, asset management, and syndication infrastructure into an ultra-modern headless platform.",
    challenge:
      "Newsroom editors were hindered by legacy monolithic CMS platforms that took minutes to publish breaking news updates and broke complex Indian language ligatures.",
    solution:
      "We built a clean, typography-focused headless CMS with live collaborative editing, automated SEO audits, and a companion responsive mobile publishing app for field correspondents.",
    deliverables: [
      "Custom Headless CMS Engine with Indian Typography Optimizations",
      "Real-Time Collaborative Markdown & Block Editor",
      "Responsive Journalist Mobile Dispatch Application",
      "Automated Multi-Channel Syndication Webhooks",
    ],
    technologies: ["Next.js 16", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis", "Vercel"],
    results: [
      { value: "10x", label: "Faster Publishing & Deploy Speed" },
      { value: "40M+", label: "Monthly Active Readers Served" },
      { value: "100%", label: "Lighthouse Performance Across Languages" },
    ],
    clientQuote: {
      quote:
        "Sarva CMS cut our newsroom publishing latency from minutes to milliseconds. Our journalists can now break stories from their phones seamlessly.",
      author: "Rajeshwar Rao",
      role: "Managing Editor, Sarva Media",
    },
  },

  // 04. Kala Studio
  {
    number: "04",
    slug: "kala-studio",
    title: "Kala Studio",
    client: "Kala Architecture & Design",
    category: "Creative Portfolio",
    tagline: "Award-winning tactile spatial portfolio celebrating contemporary Indian architecture.",
    description:
      "An evocative digital portfolio website and spatial gallery showcasing sustainable stone monuments, brutalist residential villas, and architectural foresights.",
    year: "2025",
    location: "Ahmedabad, India",
    projectType: "CREATIVE PORTFOLIO WEBSITE",
    metaString: "PORTFOLIO WEBSITE · AHMEDABAD, INDIA · 2025",
    liveUrl: "https://kalastudio.in",

    video: {
      id: "kala-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-cracked-earth-surface-in-a-desert-41554-large.mp4",
      poster: "/projects/kala-poster.jpg",
      alt: "Kala Studio architectural walkthrough of raw exposed concrete and natural terracotta",
      caption: "SPATIAL ARCHITECTURE REEL & GALLERY WALKTHROUGH",
      tag: "VIDEO DEMO",
    },
    images: [
      {
        id: "kala-web",
        type: "image",
        src: "/projects/kala-web.jpg",
        alt: "Kala Studio Desktop Website featuring monumental full-bleed architectural gallery",
        caption: "DESKTOP WEBSITE · MONUMENTAL SPATIAL GALLERY",
        tag: "DESKTOP WEB",
      },
      {
        id: "kala-app",
        type: "image",
        src: "/projects/kala-app.jpg",
        alt: "Kala Studio Responsive Mobile Application with smooth touch gestures and project drawers",
        caption: "RESPONSIVE MOBILE APP · IMMERSIVE TOUCH EXHIBIT",
        tag: "RESPONSIVE APP",
      },
    ],

    overview:
      "Kala Architecture is renowned for blending indigenous Indian masonry with radical modern brutalism. They needed a portfolio website that stood out globally and treated each architectural project as an artwork.",
    challenge:
      "High-resolution architectural photography frequently causes heavy page bloat. Kala required smooth, cinematic browsing across all devices with instant full-screen project drawers.",
    solution:
      "We crafted a horizontal inertial showcase with dark ambient backdrops, subtle sound design, and an adaptive responsive mobile exhibit that lets visitors swipe through floorplans and 3D renderings.",
    deliverables: [
      "Bespoke Spatial Architecture Portfolio Experience",
      "Interactive 3D Blueprint & Material Viewer",
      "Responsive Mobile Touch Exhibit with Gesture Navigation",
      "Dynamic Project Case Study Publishing Engine",
    ],
    technologies: ["Next.js 16", "Three.js", "Lenis Smooth Scroll", "Tailwind CSS", "Framer Motion"],
    results: [
      { value: "4.5m", label: "Average Session Duration" },
      { value: "3", label: "Global Architectural Awards Won" },
      { value: "0.3s", label: "Instant Full-Bleed Asset Transition" },
    ],
    clientQuote: {
      quote:
        "Gravity brought the stillness and tactile weight of our physical buildings into the digital realm. The mobile and desktop flow is pure poetry.",
      author: "Kavita Doshi",
      role: "Principal Architect, Kala Studio",
    },
  },

  // 05. Kosh Wealth
  {
    number: "05",
    slug: "kosh-wealth",
    title: "Kosh Wealth",
    client: "Kosh Capital Partners",
    category: "Fintech Web App",
    tagline: "Real-time algorithmic portfolio management, tax alpha tracking & wealth dashboard.",
    description:
      "A secure, institutional-grade wealthtech platform and responsive client application designed for high-net-worth investors and family offices across India.",
    year: "2025",
    location: "Mumbai, India",
    projectType: "FINTECH WEB APPLICATION",
    metaString: "FINTECH WEB APP · MUMBAI, INDIA · 2025",
    liveUrl: "https://koshwealth.io",

    video: {
      id: "kosh-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-radar-screen-with-moving-scanning-line-41553-large.mp4",
      poster: "/projects/kosh-poster.jpg",
      alt: "Kosh Wealth real-time market data visualizer and algorithmic portfolio engine",
      caption: "ALGORITHMIC ASSET ALLOCATION & RISK RADAR",
      tag: "VIDEO DEMO",
    },
    images: [
      {
        id: "kosh-web",
        type: "image",
        src: "/projects/kosh-web.jpg",
        alt: "Kosh Wealth Desktop Website institutional portfolio dashboard",
        caption: "DESKTOP WEBSITE · INSTITUTIONAL WEALTH CONSOLE",
        tag: "DESKTOP WEB",
      },
      {
        id: "kosh-app",
        type: "image",
        src: "/projects/kosh-app.jpg",
        alt: "Kosh Wealth Responsive Mobile Application biometric secure asset manager",
        caption: "RESPONSIVE MOBILE APP · BIOMETRIC WEALTH TRACKER",
        tag: "RESPONSIVE APP",
      },
    ],

    overview:
      "Kosh Capital manages over ₹12,000 Crores in private assets. They approached Gravity to replace fragmented PDF statements and legacy banking portals with a unified, modern fintech portal and mobile companion app.",
    challenge:
      "Wealthy clients expect bank-grade security alongside consumer-grade design elegance. Complex tax harvesting and multi-asset performance charts had to be digestible at a glance.",
    solution:
      "We designed an encrypted desktop dashboard and responsive mobile app featuring dark-mode luxury fintech aesthetics, real-time NAV calculation, and instant family-office reporting.",
    deliverables: [
      "Institutional Wealth Management Design System",
      "Desktop Portfolio Analytics & Tax Alpha Suite",
      "Responsive Client Mobile Application",
      "SEBI-Compliant Data Security Architecture",
    ],
    technologies: ["React 19", "Next.js 16", "Tailwind CSS", "D3.js", "TypeScript", "Node.js"],
    results: [
      { value: "₹12K Cr+", label: "Assets Under Monitoring" },
      { value: "99.99%", label: "Platform Uptime & Compliance SLA" },
      { value: "4.9/5", label: "Client Satisfaction Rating" },
    ],
    clientQuote: {
      quote:
        "Our clients now check their portfolios daily because the interface is so transparent, sleek, and reassuring. Gravity delivered an institutional masterpiece.",
      author: "Vikramaditya Shah",
      role: "Managing Partner, Kosh Capital",
    },
  },

  // 06. Pravaah Logistics
  {
    number: "06",
    slug: "pravaah-logistics",
    title: "Pravaah Logistics",
    client: "Pravaah Supply Chain",
    category: "SaaS Dashboard",
    tagline: "Autonomous pan-India freight tracking, fleet telemetry & delivery operations software.",
    description:
      "A high-density logistics SaaS platform and responsive driver/hub manager coordinating interstate freight, automated route dispatching, and cold-chain temperature telemetry.",
    year: "2025",
    location: "Gurugram, India",
    projectType: "SAAS OPERATIONS PLATFORM",
    metaString: "SAAS PLATFORM · GURUGRAM, INDIA · 2025",
    liveUrl: "https://pravaahlogistics.in",

    video: {
      id: "pravaah-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-drone-flying-over-a-dense-green-forest-41551-large.mp4",
      poster: "/projects/pravaah-poster.jpg",
      alt: "Pravaah Logistics pan-India GPS route tracking and multimodal freight dispatch",
      caption: "REAL-TIME FLEET TELEMETRY & ROUTE OPTIMIZATION",
      tag: "VIDEO DEMO",
    },
    images: [
      {
        id: "pravaah-web",
        type: "image",
        src: "/projects/pravaah-web.jpg",
        alt: "Pravaah Logistics Desktop Website fleet dispatcher console and route analytics",
        caption: "DESKTOP WEBSITE · FLEET DISPATCH CONTROL ROOM",
        tag: "DESKTOP WEB",
      },
      {
        id: "pravaah-app",
        type: "image",
        src: "/projects/pravaah-app.jpg",
        alt: "Pravaah Logistics Responsive Mobile Application for hub managers and drivers",
        caption: "RESPONSIVE MOBILE APP · HUB MANIFEST & PROOF OF DELIVERY",
        tag: "RESPONSIVE APP",
      },
    ],

    overview:
      "Pravaah operates a network of 14,000 trucks connecting key industrial corridors across India. They needed an end-to-end digital overhaul to modernize their control tower and empower on-ground hub managers.",
    challenge:
      "Drivers and warehouse staff work on budget smartphones in variable 4G/3G network conditions. The platform needed high information density without sacrificing speed or battery life.",
    solution:
      "We created a crisp, high-contrast desktop operations command center paired with an ultra-lightweight responsive web app equipped with barcode scanning and instant offline proof-of-delivery.",
    deliverables: [
      "Fleet Operations Control Room Architecture",
      "Interactive Pan-India Live Tracking Map (Mapbox GL)",
      "Lightweight Responsive Hub Manager App",
      "Automated Toll & Fuel Settlement Dashboard",
    ],
    technologies: ["Next.js 16", "Mapbox GL", "Tailwind CSS", "WebSockets", "TypeScript"],
    results: [
      { value: "14,000+", label: "Active Fleet Vehicles Connected" },
      { value: "22%", label: "Reduction in Turnaround Time (TAT)" },
      { value: "0.08s", label: "Instant Telemetry Event Latency" },
    ],
    clientQuote: {
      quote:
        "From our headquarters in Gurugram to warehouse docks in Kochi, Pravaah's new platform keeps our entire logistics engine running like clockwork.",
      author: "Harshvardhan Goel",
      role: "COO & Co-Founder, Pravaah Supply Chain",
    },
  },

  // 07. Veda Health
  {
    number: "07",
    slug: "veda-health",
    title: "Veda Health",
    client: "Veda Care Systems",
    category: "HealthTech Web App",
    tagline: "Preventative diagnostics, telehealth consultations & clinical patient records portal.",
    description:
      "An accessible, bilingual healthcare portal and responsive patient management app connecting chronic care patients with certified specialists and diagnostic labs across India.",
    year: "2026",
    location: "Hyderabad, India",
    projectType: "HEALTHTECH WEB APPLICATION",
    metaString: "HEALTHTECH WEB APP · HYDERABAD, INDIA · 2026",
    liveUrl: "https://vedahealth.care",

    video: {
      id: "veda-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-41556-large.mp4",
      poster: "/projects/veda-poster.jpg",
      alt: "Veda Health patient diagnostics telemetry and telemedicine consultation room",
      caption: "VIRTUAL TELEHEALTH & CLINICAL DIAGNOSTICS SUITE",
      tag: "VIDEO DEMO",
    },
    images: [
      {
        id: "veda-web",
        type: "image",
        src: "/projects/veda-web.jpg",
        alt: "Veda Health Desktop Website patient portal and medical record history",
        caption: "DESKTOP WEBSITE · CLINICAL TELEHEALTH PORTAL",
        tag: "DESKTOP WEB",
      },
      {
        id: "veda-app",
        type: "image",
        src: "/projects/veda-app.jpg",
        alt: "Veda Health Responsive Mobile Application vital tracking and prescription delivery",
        caption: "RESPONSIVE MOBILE APP · VITALS TRACKER & MEDICINE DISPATCH",
        tag: "RESPONSIVE APP",
      },
    ],

    overview:
      "Veda Health provides preventative medicine and chronic disease management across Tier-1 and Tier-2 Indian cities. They commissioned Gravity to build an intuitive, empathetic patient portal and doctor management web application.",
    challenge:
      "Elderly patients often find health apps difficult to navigate. The interface needed large legibility, multilingual voice support, and frictionless appointment booking.",
    solution:
      "We designed an accessible, human-centric design system featuring high contrast, clear visual hierarchies, and a responsive mobile web app with instant prescription downloads and integrated video consults.",
    deliverables: [
      "Patient-Centered Healthcare Design System (ABHA Compatible)",
      "Desktop Doctor Consultation & EHR Console",
      "Responsive Patient Health Management Mobile App",
      "Secure Video Consultation & Prescription Engine",
    ],
    technologies: ["Next.js 16", "WebRTC", "Tailwind CSS", "TypeScript", "Framer Motion"],
    results: [
      { value: "350K+", label: "Consultations Completed Post-Launch" },
      { value: "99/100", label: "Web Accessibility (WCAG 2.1) Score" },
      { value: "3.4x", label: "Increase in Patient Treatment Adherence" },
    ],
    clientQuote: {
      quote:
        "Gravity built an experience that our elderly patients find welcoming and our doctors find efficient. It sets a new benchmark for Indian healthtech.",
      author: "Dr. Ananya Murthy",
      role: "Chief Medical Officer, Veda Care",
    },
  },

  // 08. Drishti AI
  {
    number: "08",
    slug: "drishti-ai",
    title: "Drishti AI",
    client: "Drishti Robotics Labs",
    category: "Spatial AI & 3D",
    tagline: "Next-generation computer vision inspection & spatial intelligence agency platform.",
    description:
      "A cutting-edge spatial 3D inspection platform and responsive field inspector tool using deep-learning vision models to inspect smart infrastructure, manufacturing lines, and defense hardware.",
    year: "2026",
    location: "Pune, India",
    projectType: "SPATIAL 3D & AI WEB PLATFORM",
    metaString: "SPATIAL AI PLATFORM · PUNE, INDIA · 2026",
    liveUrl: "https://drishtiai.tech",

    video: {
      id: "drishti-video-1",
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-spiral-of-glowing-particles-41550-large.mp4",
      poster: "/projects/drishti-poster.jpg",
      alt: "Drishti AI real-time point-cloud anomaly detection and automated 3D spatial scan",
      caption: "REAL-TIME 3D POINT-CLOUD INSPECTION & DEFECT DETECTION",
      tag: "VIDEO DEMO",
    },
    images: [
      {
        id: "drishti-web",
        type: "image",
        src: "/projects/drishti-web.jpg",
        alt: "Drishti AI Desktop Website 3D spatial inspection workbench",
        caption: "DESKTOP WEBSITE · 3D COMPUTER VISION WORKBENCH",
        tag: "DESKTOP WEB",
      },
      {
        id: "drishti-app",
        type: "image",
        src: "/projects/drishti-app.jpg",
        alt: "Drishti AI Responsive Mobile Application for factory floor inspectors",
        caption: "RESPONSIVE MOBILE APP · INDUSTRIAL AR SCANNER",
        tag: "RESPONSIVE APP",
      },
    ],

    overview:
      "Drishti AI engineers proprietary computer vision algorithms for high-precision manufacturing, defense drones, and railway infrastructure. They needed a global web presence that showcased their mathematical rigour and practical field deployments.",
    challenge:
      "Visualizing multi-gigabyte 3D LiDAR point clouds and live video streams in an ordinary browser requires intense GPU optimization without crashing standard enterprise laptops.",
    solution:
      "We engineered custom Three.js WebGL shaders and an interactive 3D model viewer on the desktop web platform, backed by a responsive mobile scanner application for on-site engineers.",
    deliverables: [
      "Custom 3D WebGL Point-Cloud Inspection Viewer",
      "Interactive Industrial Case Study Showcase",
      "Responsive Inspector Tablet/Mobile AR Application",
      "Enterprise Sales Presentation Kit",
    ],
    technologies: ["Three.js", "WebGL Shaders", "Next.js 16", "Tailwind CSS", "TypeScript"],
    results: [
      { value: "99.8%", label: "Defect Detection Accuracy in Field Tests" },
      { value: "60 FPS", label: "Fluid 3D Render Speed on Mobile Devices" },
      { value: "€4.2M", label: "Enterprise Contracts Secured Post-Launch" },
    ],
    clientQuote: {
      quote:
        "Gravity brought our complex 3D vision technology to life with jaw-dropping fidelity. It gives our enterprise clients absolute confidence in our engineering.",
      author: "Nikhil Deshmukh",
      role: "CEO & Co-Founder, Drishti AI",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
