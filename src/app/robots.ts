import type { MetadataRoute } from 'next';

const SITE_URL = 'https://ai.rio.br';

/**
 * Generate robots.txt
 *
 * This configuration:
 * - Allows all crawlers
 * - Disallows private/admin routes (if any)
 * - Points to the sitemap
 *
 * @returns Next.js robots configuration
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
