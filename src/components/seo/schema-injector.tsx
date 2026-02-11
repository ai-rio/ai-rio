/**
 * Schema Injector Component
 * =========================
 *
 * Injects JSON-LD structured data into Next.js pages.
 * Used for SEO enhancement with Schema.org markup.
 *
 * Usage:
 *   import { SchemaInjector } from '@/components/seo/schema-injector';
 *   import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/lib/metadata/schema';
 *
 *   export default function Page() {
 *     return (
 *       <>
 *         <SchemaInjector
 *           schemas={[
 *             generateOrganizationSchema('en'),
 *             generateBreadcrumbSchema(BREADCRUMBS.home, 'en'),
 *           ]}
 *         />
 *         {/* Page content *\/}
 *       </>
 *     );
 *   }
 */

'use client';

import { Fragment } from 'react';

export interface SchemaInjectorProps {
  schemas: Record<string, unknown>[];
}

/**
 * SchemaInjector component
 * Renders JSON-LD script tags for structured data
 */
export function SchemaInjector({ schemas }: SchemaInjectorProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <Fragment key={`schema-${index}`}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema, null, 2),
            }}
          />
        </Fragment>
      ))}
    </>
  );
}

/**
 * Individual schema script components
 * These can be imported and used directly
 */
export function OrganizationSchemaScript({ locale }: { locale: 'en' | 'es' | 'pt' }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Ai.Rio',
          description: locale === 'en'
            ? 'Billing infrastructure specialist for AI SaaS companies. We help track and optimize LLM costs, implement usage-based pricing, and recover failed payments.'
            : locale === 'es'
            ? 'Especialista en infraestructura de facturación para empresas de SaaS de IA. Ayudamos a rastrear y optimizar costos de LLM, implementar precios basados en uso y recuperar pagos fallidos.'
            : 'Especialista em infraestrutura de cobrança para empresas de SaaS de IA. Ajudamos a rastrear e otimizar custos de LLM, implementar preços baseados em uso e recuperar pagamentos falhados.',
          url: 'https://ai.rio.br',
          logo: 'https://ai.rio.br/logo.png',
          sameAs: [
            'https://twitter.com/airio_br',
            'https://linkedin.com/company/ai-rio',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'hello@ai.rio',
            contactType: 'sales',
            availableLanguage: ['English', 'Spanish', 'Portuguese'],
          },
          priceRange: '$$$',
        }, null, 2),
      }}
    />
  );
}

export function WebSiteSchemaScript({ locale }: { locale: 'en' | 'es' | 'pt' }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Ai.Rio',
          url: 'https://ai.rio.br',
          description: locale === 'en'
            ? 'Billing infrastructure services for AI SaaS companies. Track LLM costs, implement usage-based pricing, and recover failed payments.'
            : locale === 'es'
            ? 'Servicios de infraestructura de facturación para empresas de SaaS de IA. Rastree costos de LLM, implemente precios basados en uso y recupere pagos fallidos.'
            : 'Serviços de infraestrutura de cobrança para empresas de SaaS de IA. Rastreie custos de LLM, implemente preços baseados em uso e recupere pagamentos falhados.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://ai.rio.br/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }, null, 2),
      }}
    />
  );
}
