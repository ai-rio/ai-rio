import type { MetadataRoute } from 'next';

const SITE_URL = 'https://ai.rio.br';

/**
 * Priority configuration for different route types
 * Based on the Phase 6 transformation plan
 */
const PRIORITY_CONFIG = {
  home: 1.0,
  services: 0.9,
  serviceDetail: 0.8,
  about: 0.7,
  contact: 0.5,
  default: 0.6,
} as const;

/**
 * Route definitions with their types for sitemap generation
 *
 * To add a new route:
 * 1. Add the path and type to this array
 * 2. The sitemap will automatically generate entries for all locales
 */
const routes = [
  { path: '', type: 'home' as const },
  { path: '/services', type: 'services' as const },
  { path: '/about', type: 'about' as const },
  { path: '/contact', type: 'contact' as const },
  { path: '/services/payment-recovery', type: 'serviceDetail' as const },
  { path: '/services/usage-pricing', type: 'serviceDetail' as const },
  { path: '/services/ai-tracking', type: 'serviceDetail' as const },
  { path: '/services/billing-audit', type: 'serviceDetail' as const },
  { path: '/services/complete-billing', type: 'serviceDetail' as const },
  { path: '/services/billing-infrastructure', type: 'serviceDetail' as const },
];

/**
 * Get priority based on route type
 */
function getPriority(routeType: keyof typeof PRIORITY_CONFIG): number {
  return PRIORITY_CONFIG[routeType] ?? PRIORITY_CONFIG.default;
}

/**
 * Generate sitemap with i18n support
 *
 * This creates a sitemap with:
 * - All routes for all locales
 * - Proper hreflang alternates for SEO
 * - Priorities based on the transformation plan
 * - lastModified timestamps
 *
 * Priority breakdown (from Phase 6 plan):
 * - Home: priority 1.0
 * - Services overview: priority 0.9
 * - Service detail pages: priority 0.8
 * - About: priority 0.7
 * - Blog index: priority 0.8 (handled in sitemap-blog.ts)
 * - Blog posts: priority 0.6 (handled in sitemap-blog.ts)
 * - Contact: priority 0.5
 *
 * @returns Next.js sitemap configuration
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    const priority = getPriority(route.type);

    // English (default, no prefix) - highest priority for canonical
    entries.push({
      url: `${SITE_URL}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.type === 'home' ? 'daily' : 'weekly',
      priority,
      alternates: {
        languages: {
          es: `${SITE_URL}/es${route.path}`,
          pt: `${SITE_URL}/pt${route.path}`,
        },
      },
    });

    // Spanish - slightly lower priority than English
    entries.push({
      url: `${SITE_URL}/es${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.type === 'home' ? 'daily' : 'weekly',
      priority: priority * 0.9,
      alternates: {
        languages: {
          en: `${SITE_URL}${route.path}`,
          pt: `${SITE_URL}/pt${route.path}`,
        },
      },
    });

    // Portuguese - slightly lower priority than English
    entries.push({
      url: `${SITE_URL}/pt${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.type === 'home' ? 'daily' : 'weekly',
      priority: priority * 0.9,
      alternates: {
        languages: {
          en: `${SITE_URL}${route.path}`,
          es: `${SITE_URL}/es${route.path}`,
        },
      },
    });
  }

  return entries;
}
