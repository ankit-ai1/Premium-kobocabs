import type { MetadataRoute } from "next";
import { posts } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

/**
 * Sitemap for the public site.
 *
 * Deliberately excluded:
 *   • /admin/*  — private, and noindex anyway
 *   • /api/*    — not pages
 *   • /quote    — only meaningful with trip parameters; without them it renders
 *                 "No Trip Selected", which is thin content to hand a crawler.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();

  const pages: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/premium-cabs", changeFrequency: "monthly", priority: 0.9 },
    { path: "/routes", changeFrequency: "monthly", priority: 0.9 },
    { path: "/how-it-works", changeFrequency: "yearly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/refund-policy", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticEntries = pages.map((page) => ({
    url: `${base}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const postEntries = posts.map((post) => {
    // Post dates are human-readable strings ("December 18, 2025"). Fall back to
    // now if one is ever unparseable, so a typo can't emit an invalid sitemap.
    const parsed = new Date(post.date);
    return {
      url: `${base}/blog/${post.slug}`,
      lastModified: Number.isNaN(parsed.getTime()) ? now : parsed,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    };
  });

  return [...staticEntries, ...postEntries];
}
