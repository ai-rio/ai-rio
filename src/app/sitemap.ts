import type { MetadataRoute } from 'next';

const SITE_URL = 'https://ai.rio.br';

/**
 * Route definitions for sitemap generation
 *
 * To add a new route:
 * 1. Add the path to this array
 * 2. The sitemap will automatically generate entries for all locales
 */
const routes = [
  '',
  '/services',
  '/about',
  '/contact',
  '/services/payment-recovery',
  '/services/usage-pricing',
  '/services/ai-tracking',
  '/services/billing-audit',
  '/services/complete-billing',
];

/**
 * Generate sitemap with i18n support
 *
 * This creates a sitemap with:
 * - All routes for all locales
 * - Proper hreflang alternates for SEO
 * - lastModified timestamps
 *
 * @returns Next.js sitemap configuration
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    // English (default, no prefix)
    entries.push({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: {
          es: `${SITE_URL}/es${route}`,
          pt: `${SITE_URL}/pt${route}`,
        },
      },
    });

    // Spanish
    entries.push({
      url: `${SITE_URL}/es${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 0.9 : 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}${route}`,
          pt: `${SITE_URL}/pt${route}`,
        },
      },
    });

    // Portuguese
    entries.push({
      url: `${SITE_URL}/pt${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 0.9 : 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}${route}`,
          es: `${SITE_URL}/es${route}`,
        },
      },
    });
  }

  return entries;
}
