import { MetadataRoute } from "next";

/**
 * Sitemap configuration for SEO
 * Generates sitemap.xml with all public routes
 */
export default function sitemap(): MetadataRoute.Sitemap {
    // Get base URL from environment variable or use default
    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://baila-ciencias.vercel.app";

    // Ensure URL has protocol
    const siteUrl = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;

    // Public routes that should be indexed
    const routes = [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 1.0,
        },
        {
            url: `${siteUrl}/cursos`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.9,
        },
    ];

    return routes;
}
