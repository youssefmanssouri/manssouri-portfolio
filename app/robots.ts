import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Google-Extended",
          "Bingbot",
          "Applebot",
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
        ],
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
    ],
    sitemap: "https://www.youssefmanssouri.site/sitemap.xml",
  };
}
