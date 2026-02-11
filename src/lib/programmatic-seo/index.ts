/**
 * Programmatic SEO Module
 * ========================
 *
 * This module provides data and utilities for generating programmatic SEO pages
 * for Ai.Rio billing infrastructure services.
 *
 * Three main page types:
 *
 * 1. Persona Pages: /services/[serviceId]/for-[industry]
 *    - Example: /services/stripe-meter/for-b2b-saas
 *    - ~48-60 pages
 *
 * 2. Comparison Pages: /compare/[alternative]
 *    - Example: /compare/vs-build-in-house
 *    - ~12-15 pages
 *
 * 3. Glossary Pages: /glossary/[term]
 *    - Example: /glossary/stripe-meter
 *    - ~25 pages
 *
 * Usage:
 * ```ts
 * // Data access
 * import { getIndustryBySlug, getIndustrySlugs } from '@/lib/programmatic-seo/industries';
 * import { getComparisonBySlug, getComparisonSlugs } from '@/lib/programmatic-seo/comparisons';
 * import { getTermBySlug, getTermSlugs } from '@/lib/programmatic-seo/glossary';
 *
 * // Metadata generation
 * import { generatePersonaMetadata, generateComparisonMetadata, generateGlossaryMetadata } from '@/lib/programmatic-seo/metadata';
 *
 * // Schema generation
 * import {
 *   generatePersonaServiceSchema,
 *   generateComparisonArticleSchema,
 *   generateGlossaryDefinedTermSchema,
 * } from '@/lib/programmatic-seo/schema';
 * ```
 */

// Re-exports for convenience
export * from './industries';
export * from './comparisons';
export * from './glossary';
export * from './metadata';
export * from './schema';

// Module info
export const PROGRAMMATIC_SEO_INFO = {
  version: '1.0.0',
  lastUpdated: '2025-02-11',
  pageTypes: {
    persona: {
      count: 48,
      route: '/services/[serviceId]/for-[industry]',
      services: ['stripe-meter', 'payment-recovery', 'llm-tracking'] as const,
      industries: 16,
    },
    comparison: {
      count: 12,
      route: '/compare/[alternative]',
      alternatives: [
        'vs-build-in-house',
        'vs-stripe-billing',
        'vs-churnbuster',
        'vs-baremetrics',
        'vs-chargebee',
        'vs-recurly',
        'vs-zuora',
        'vs-hiring-freelancer',
        'vs-consulting-agency',
        'vs-opensource-billing',
        'vs-enterprise-si',
      ] as const,
    },
    glossary: {
      count: 25,
      route: '/glossary/[term]',
      terms: [
        'stripe-meter',
        'usage-based-billing',
        'failed-payment-recovery',
        'dunning-management',
        'involuntary-churn',
        'stripe-smart-retries',
        'llm-cost-tracking',
        'token-attribution',
        'customer-level-cost-attribution',
        'api-key-mapping',
        'revenue-leakage',
        'payment-recovery-rate',
        'metered-billing',
        'event-aggregation',
        'cost-per-token',
        'llm-unit-economics',
        'ai-saas-margins',
        'stripe-webhooks',
        'proration',
        'invoice-line-items',
        'usage-records',
        'backfill-pipeline',
        'cost-anomaly-detection',
      ] as const,
    },
  },
  totalCount: 85, // 48 + 12 + 25
} as const;
