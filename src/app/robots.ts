import { MetadataRoute } from "next";

/**
 * Robots.txt configuration for SEO
 * Controls which pages search engines can crawl
 */
export default function robots(): MetadataRoute.Robots {
    // Get base URL from environment variable or use default
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://baila-ciencias.vercel.app";

    // Ensure URL has protocol
    const siteUrl = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin/", // Block all admin routes
                    "/api/", // Block API routes if they exist
                ],
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
