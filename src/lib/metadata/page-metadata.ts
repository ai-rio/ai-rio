/**
 * Page Metadata Factory for AI.RIO
 * =================================
 *
 * Generates complete Next.js metadata objects for pages with i18n support.
 * Combines translation data with base metadata utilities to create
 * comprehensive SEO metadata for each page.
 *
 * Usage:
 * ```ts
 * import { generatePageMetadata } from '@/lib/metadata/page-metadata';
 *
 * export async function generateMetadata({ params }) {
 *   const { locale } = await params;
 *   return generatePageMetadata({
 *     locale: locale as any,
 *     namespace: 'home',
 *     path: '/',
 *   });
 * }
 * ```
 */

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { Locale } from './base-metadata';
import {
  generateAlternates,
  generateOpenGraph,
  generateTwitterCard,
} from './base-metadata';

/**
 * Supported page namespaces for metadata
 *
 * To add a new page:
 * 1. Add the namespace to this type
 * 2. Add entries to all 3 locale metadata files:
 *    - src/i18n/messages/en/metadata.json
 *    - src/i18n/messages/es/metadata.json
 *    - src/i18n/messages/pt/metadata.json
 *
 * Each namespace needs:
 * - pages.{namespace}.title
 * - pages.{namespace}.description
 * - pages.{namespace}.openGraph.title
 * - pages.{namespace}.openGraph.description
 */
export type MetadataNamespace =
  | 'home'
  | 'services'
  | 'about'
  | 'contact'
  | 'paymentRecovery'
  | 'usagePricing'
  | 'aiTracking'
  | 'billingAudit'
  | 'completeBilling';

/**
 * Configuration for generating page metadata
 */
export interface PageMetadataConfig {
  /** The locale to generate metadata for */
  locale: Locale;
  /** The page namespace (maps to translation keys) */
  namespace: MetadataNamespace | string;
  /** The path for this page (without locale prefix) */
  path: string;
  /** Enable fallback to default metadata if namespace not found (default: true) */
  fallback?: boolean;
}

/**
 * Generate complete metadata for a page
 *
 * This function:
 * 1. Loads translations for the 'metadata' namespace
 * 2. Extracts page-specific metadata (with fallback to defaults)
 * 3. Combines with base metadata utilities
 * 4. Returns a complete Next.js Metadata object
 *
 * Fallback Behavior:
 * - If the namespace is not found in metadata.json, falls back to 'home' metadata
 * - This prevents build errors when adding new pages
 * - Set fallback: false to disable this behavior
 *
 * @param config - Configuration for page metadata generation
 * @returns Complete Next.js Metadata object
 */
export async function generatePageMetadata(
  config: PageMetadataConfig
): Promise<Metadata> {
  const { locale, namespace, path, fallback = true } = config;

  // Load metadata translations
  const t = await getTranslations({ locale, namespace: 'metadata' });

  // Helper function to safely get translation with fallback
  const getWithFallback = (key: string, fallbackKey: string = 'home') => {
    try {
      return t(key);
    } catch {
      if (fallback) {
        console.warn(
          `[metadata] Missing translation key "${key}" for locale "${locale}", falling back to "${fallbackKey}"`
        );
        return t(fallbackKey);
      }
      throw new Error(
        `[metadata] Missing translation key "${key}" for locale "${locale}". Add it to src/i18n/messages/${locale}/metadata.json or enable fallback.`
      );
    }
  };

  // Extract page-specific metadata with fallback
  const titleKey = `pages.${namespace}.title`;
  const descKey = `pages.${namespace}.description`;
  const ogTitleKey = `pages.${namespace}.openGraph.title`;
  const ogDescKey = `pages.${namespace}.openGraph.description`;

  const title = getWithFallback(titleKey);
  const description = getWithFallback(descKey);
  const ogTitle = getWithFallback(ogTitleKey);
  const ogDescription = getWithFallback(ogDescKey);

  // Get default keywords from metadata (these should always exist)
  const keywords = t.raw('default.keywords') as string[];

  // Generate alternates (canonical + hreflang)
  const alternates = generateAlternates(path, locale);

  // Generate OpenGraph metadata
  const openGraph = generateOpenGraph({
    title: ogTitle,
    description: ogDescription,
    locale,
    path,
  });

  // Generate Twitter card metadata
  const twitter = generateTwitterCard({
    title,
    description,
  });

  // Return complete metadata object
  return {
    title,
    description,
    keywords,
    alternates,
    openGraph,
    twitter,
  };
}
