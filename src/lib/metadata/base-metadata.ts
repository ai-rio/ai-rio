/**
 * Base Metadata Utilities for AI.RIO
 * ====================================
 *
 * Core utilities for generating SEO metadata:
 * - Locale-aware URL building (as-needed prefix mode)
 * - Canonical and hreflang alternate links
 * - OpenGraph metadata with locale mapping
 * - Twitter card metadata
 *
 * Locale Prefix Mode: 'as-needed'
 * - English (default): no prefix (/)
 * - Spanish: /es prefix
 * - Portuguese: /pt prefix
 */

import type { Metadata } from 'next';

const SITE_URL = 'https://ai.rio.br';

/**
 * Supported locales for the site
 */
export type Locale = 'en' | 'es' | 'pt';

/**
 * OpenGraph locale mapping for each language
 */
const LOCALE_TO_OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  pt: 'pt_BR',
};

/**
 * Build a URL for a given path and locale
 *
 * In 'as-needed' prefix mode:
 * - English (default) has no prefix
 * - Other locales have their code prefix
 *
 * @param path - The path without locale prefix
 * @param locale - The locale to build URL for
 * @returns Full URL string
 */
export function buildUrl(path: string, locale: Locale): string {
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // English (default) has no prefix
  if (locale === 'en') {
    return cleanPath ? `${SITE_URL}/${cleanPath}` : SITE_URL;
  }

  // Other locales have prefix
  return cleanPath
    ? `${SITE_URL}/${locale}/${cleanPath}`
    : `${SITE_URL}/${locale}`;
}

/**
 * Generate alternate links for SEO (canonical + hreflang)
 *
 * Creates links for:
 * - Canonical URL for current locale
 * - Alternate URLs for all locales (hreflang)
 * - x-default pointing to English version
 *
 * @param path - The path without locale prefix
 * @param locale - The current locale
 * @returns Next.js alternates metadata
 */
export function generateAlternates(
  path: string,
  locale: Locale
): Metadata['alternates'] {
  const canonical = buildUrl(path, locale);

  // Build hreflang map for all locales
  const languages: Record<string, string> = {
    en: buildUrl(path, 'en'),
    es: buildUrl(path, 'es'),
    pt: buildUrl(path, 'pt'),
    'x-default': buildUrl(path, 'en'), // English is default
  };

  return { canonical, languages };
}

/**
 * Generate OpenGraph metadata
 *
 * Creates locale-aware OG metadata including:
 * - title and description
 * - locale mapping (en_US, es_ES, pt_BR)
 * - site name and URL
 * - images
 *
 * @param params - OpenGraph parameters
 * @returns Next.js openGraph metadata
 */
export function generateOpenGraph(params: {
  title: string;
  description: string;
  locale: Locale;
  path: string;
}): Metadata['openGraph'] {
  const { title, description, locale, path } = params;
  const ogLocale = LOCALE_TO_OG_LOCALE[locale];

  return {
    title,
    description,
    url: buildUrl(path, locale),
    siteName: 'AI.RIO',
    locale: ogLocale,
    alternateLocale: Object.values(LOCALE_TO_OG_LOCALE).filter(
      (l) => l !== ogLocale
    ),
    type: 'website',
    images: [
      {
        url: '/og-ai-rio-home.png',
        width: 1200,
        height: 630,
        alt: 'AI.RIO - Billing Infrastructure Specialist',
      },
    ],
  };
}

/**
 * Generate Twitter card metadata
 *
 * Creates large summary card with:
 * - title and description
 * - site handle (@airio_br)
 * - card type (summary_large_image)
 * - image
 *
 * @param params - Twitter card parameters
 * @returns Next.js twitter metadata
 */
export function generateTwitterCard(params: {
  title: string;
  description: string;
}): Metadata['twitter'] {
  const { title, description } = params;

  return {
    card: 'summary_large_image',
    site: '@airio_br',
    title,
    description,
    images: ['/twitter-ai-rio-preview.png'],
    creator: '@airio_br',
  };
}
