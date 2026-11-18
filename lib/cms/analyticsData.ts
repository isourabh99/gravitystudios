import { AnalyticsMetrics, AnalyticsDataPoint } from "./types";

export function getMockAnalytics(range: "24h" | "7d" | "30d" | "90d" = "7d"): AnalyticsMetrics {
  const now = new Date();

  // Generate timeline points according to time range
  let points: AnalyticsDataPoint[] = [];

  if (range === "24h") {
    for (let i = 23; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hour = d.getHours();
      const label = `${hour.toString().padStart(2, "0")}:00`;
      // Peak traffic between 13:00 - 22:00
      const multiplier = hour >= 13 && hour <= 22 ? 2.2 : 0.8;
      const baseVisitors = Math.floor((35 + Math.sin(i * 0.5) * 15 + Math.random() * 12) * multiplier);
      const pageviews = Math.floor(baseVisitors * (2.8 + Math.random() * 0.8));
      const sessions = Math.floor(baseVisitors * 1.15);

      points.push({
        date: d.toISOString(),
        label,
        visitors: baseVisitors,
        pageviews,
        sessions,
        bounceRate: parseFloat((26 + Math.random() * 6).toFixed(1)),
      });
    }
  } else if (range === "7d") {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayName = days[d.getDay()];
      const dateStr = `${d.getMonth() + 1}/${d.getDate()}`;
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const base = isWeekend ? 580 : 890;
      const visitors = Math.floor(base + Math.random() * 180);
      const pageviews = Math.floor(visitors * (3.4 + Math.random() * 0.6));
      const sessions = Math.floor(visitors * 1.25);

      points.push({
        date: d.toISOString(),
        label: `${dayName} (${dateStr})`,
        visitors,
        pageviews,
        sessions,
        bounceRate: parseFloat((24.2 + (isWeekend ? 3.5 : 0) + Math.random() * 3).toFixed(1)),
      });
    }
  } else if (range === "30d") {
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const label = `${d.getMonth() + 1}/${d.getDate()}`;
      const visitors = Math.floor(620 + Math.sin(i * 0.4) * 200 + Math.random() * 140);
      const pageviews = Math.floor(visitors * 3.3);
      const sessions = Math.floor(visitors * 1.22);

      points.push({
        date: d.toISOString(),
        label,
        visitors,
        pageviews,
        sessions,
        bounceRate: parseFloat((25 + Math.random() * 5).toFixed(1)),
      });
    }
  } else {
    // 90d
    for (let i = 89; i >= 0; i -= 3) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const label = `${d.getMonth() + 1}/${d.getDate()}`;
      const visitors = Math.floor(1800 + Math.sin(i * 0.2) * 500 + Math.random() * 300);
      const pageviews = Math.floor(visitors * 3.2);
      const sessions = Math.floor(visitors * 1.2);

      points.push({
        date: d.toISOString(),
        label,
        visitors,
        pageviews,
        sessions,
        bounceRate: parseFloat((26.5 + Math.random() * 4).toFixed(1)),
      });
    }
  }

  const totalVisitors = points.reduce((acc, p) => acc + p.visitors, 0);
  const totalPageviews = points.reduce((acc, p) => acc + p.pageviews, 0);
  const avgBounce = (
    points.reduce((acc, p) => acc + p.bounceRate, 0) / points.length
  ).toFixed(1);

  return {
    totalVisitors,
    visitorsTrend: +16.4,
    totalPageviews,
    pageviewsTrend: +21.8,
    avgSessionDuration: "3m 42s",
    sessionDurationTrend: +9.5,
    bounceRate: parseFloat(avgBounce),
    bounceRateTrend: -3.8,
    activeUsersNow: 42,
    timeRange: range,
    timeline: points,
    referrers: [
      {
        source: "GitHub",
        domain: "github.com/isourabh99",
        visitors: Math.floor(totalVisitors * 0.34),
        pageviews: Math.floor(totalPageviews * 0.36),
        percentage: 34,
        trend: +24.2,
        category: "social",
      },
      {
        source: "LinkedIn",
        domain: "linkedin.com/in/isourabh99",
        visitors: Math.floor(totalVisitors * 0.26),
        pageviews: Math.floor(totalPageviews * 0.24),
        percentage: 26,
        trend: +14.8,
        category: "social",
      },
      {
        source: "Direct / Bookmarks",
        domain: "gravitystudios.com",
        visitors: Math.floor(totalVisitors * 0.18),
        pageviews: Math.floor(totalPageviews * 0.17),
        percentage: 18,
        trend: +5.1,
        category: "direct",
      },
      {
        source: "Twitter / X",
        domain: "x.com/isourabh99",
        visitors: Math.floor(totalVisitors * 0.11),
        pageviews: Math.floor(totalPageviews * 0.12),
        percentage: 11,
        trend: +31.0,
        category: "social",
      },
      {
        source: "Awwwards & Godly",
        domain: "awwwards.com",
        visitors: Math.floor(totalVisitors * 0.07),
        pageviews: Math.floor(totalPageviews * 0.08),
        percentage: 7,
        trend: +12.3,
        category: "portfolio",
      },
      {
        source: "Google / Perplexity (GEO)",
        domain: "google.com",
        visitors: Math.floor(totalVisitors * 0.04),
        pageviews: Math.floor(totalPageviews * 0.03),
        percentage: 4,
        trend: +48.5,
        category: "search",
      },
    ],
    topProjects: [
      {
        slug: "sutra-crm",
        title: "Sutra CRM",
        category: "Enterprise CRM",
        views: Math.floor(totalPageviews * 0.28),
        uniqueVisitors: Math.floor(totalVisitors * 0.25),
        avgDuration: "4m 12s",
        inquiryClicks: 142,
        share: 28,
      },
      {
        slug: "indus-luxe",
        title: "Indus Luxe",
        category: "D2C E-Commerce",
        views: Math.floor(totalPageviews * 0.22),
        uniqueVisitors: Math.floor(totalVisitors * 0.21),
        avgDuration: "3m 50s",
        inquiryClicks: 118,
        share: 22,
      },
      {
        slug: "sarva-cms",
        title: "Sarva CMS",
        category: "Content Infrastructure",
        views: Math.floor(totalPageviews * 0.16),
        uniqueVisitors: Math.floor(totalVisitors * 0.15),
        avgDuration: "3m 15s",
        inquiryClicks: 84,
        share: 16,
      },
      {
        slug: "kestrix",
        title: "Kestrix AI Energy",
        category: "Spatial AI & Thermography",
        views: Math.floor(totalPageviews * 0.14),
        uniqueVisitors: Math.floor(totalVisitors * 0.14),
        avgDuration: "4m 35s",
        inquiryClicks: 95,
        share: 14,
      },
      {
        slug: "botblox",
        title: "BotBlox Networking",
        category: "Robotics Hardware",
        views: Math.floor(totalPageviews * 0.11),
        uniqueVisitors: Math.floor(totalVisitors * 0.12),
        avgDuration: "2m 58s",
        inquiryClicks: 62,
        share: 11,
      },
      {
        slug: "artefact",
        title: "Artefact Studios",
        category: "3D Brand Portal",
        views: Math.floor(totalPageviews * 0.09),
        uniqueVisitors: Math.floor(totalVisitors * 0.09),
        avgDuration: "3m 05s",
        inquiryClicks: 51,
        share: 9,
      },
    ],
    deviceBreakdown: {
      desktop: 68,
      mobile: 27,
      tablet: 5,
    },
    browserBreakdown: {
      chrome: 62,
      safari: 22,
      edge: 8,
      firefox: 6,
      other: 2,
    },
    geographicBreakdown: [
      { country: "United States", code: "US", visitors: Math.floor(totalVisitors * 0.38), percentage: 38 },
      { country: "India", code: "IN", visitors: Math.floor(totalVisitors * 0.24), percentage: 24 },
      { country: "Germany", code: "DE", visitors: Math.floor(totalVisitors * 0.11), percentage: 11 },
      { country: "United Kingdom", code: "GB", visitors: Math.floor(totalVisitors * 0.09), percentage: 9 },
      { country: "Japan", code: "JP", visitors: Math.floor(totalVisitors * 0.07), percentage: 7 },
      { country: "Canada", code: "CA", visitors: Math.floor(totalVisitors * 0.05), percentage: 5 },
      { country: "Other Regions", code: "WW", visitors: Math.floor(totalVisitors * 0.06), percentage: 6 },
    ],
  };
}

