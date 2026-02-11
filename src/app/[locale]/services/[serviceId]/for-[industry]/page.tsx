/**
 * Programmatic SEO: Persona Page Template
 * =========================================
 *
 * Dynamic route: /services/[serviceId]/for-[industry]
 *
 * Generates "Service for Industry" pages with:
 * - Industry-specific pain points and messaging
 * - Unique content per combination
 * - Schema markup for SEO
 * - Internal linking to related pages
 *
 * Example URLs:
 * - /services/stripe-meter/for-b2b-saas
 * - /services/payment-recovery/for-fintech
 * - /services/llm-tracking/for-healthtech
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, DollarSign, CheckCircle, AlertCircle, ArrowRight, Calendar } from 'lucide-react';
import { CTASection } from '@/components/service-sections/cta-section';
import { generatePersonaMetadata } from '@/lib/programmatic-seo/metadata';
import {
  generatePersonaServiceSchema,
  generatePersonaBreadcrumbSchema,
  generatePersonaFAQSchema,
} from '@/lib/programmatic-seo/schema';
import { getIndustryBySlug, getIndustrySlugs, type IndustryData } from '@/lib/programmatic-seo/industries';
import type { Locale } from '@/lib/metadata/base-metadata';

interface PageProps {
  params: Promise<{
    locale: Locale;
    serviceId: string;
    industry: string;
  }>;
}

// Valid service IDs
const VALID_SERVICE_IDS = ['stripe-meter', 'payment-recovery', 'llm-tracking'] as const;
type ServiceId = (typeof VALID_SERVICE_IDS)[number];

// Service configuration
const SERVICE_CONFIG = {
  'stripe-meter': {
    name: { en: 'Stripe Meter', es: 'Stripe Meter', pt: 'Stripe Meter' },
    price: '$3,997',
    timeline: '10-14 days',
    icon: '📊',
    description: {
      en: 'Usage-based pricing implementation with Stripe Meter',
      es: 'Implementación de precios basados en uso con Stripe Meter',
      pt: 'Implementação de preços baseados em uso com Stripe Meter',
    },
    hubPath: '/services/usage-pricing',
  },
  'payment-recovery': {
    name: { en: 'Failed Payment Recovery', es: 'Recuperación de Pagos', pt: 'Recuperação de Pagamentos' },
    price: '$2,997',
    timeline: '7-10 days',
    icon: '💳',
    description: {
      en: 'Advanced dunning workflows to recover failed payments',
      es: 'Flujos de trabajo de dunning avanzados para recuperar pagos fallidos',
      pt: 'Fluxos de trabalho de dunning avançados para recuperar pagamentos falhados',
    },
    hubPath: '/services/payment-recovery',
  },
  'llm-tracking': {
    name: { en: 'LLM Cost Tracking', es: 'Seguimiento de Costos LLM', pt: 'Rastreamento de Custos LLM' },
    price: '$4,997',
    timeline: '10-14 days',
    icon: '🤖',
    description: {
      en: 'Track LLM token usage and costs per customer',
      es: 'Rastrea el uso de tokens LLM y costos por cliente',
      pt: 'Rastreie o uso de tokens LLM e custos por cliente',
    },
    hubPath: '/services/ai-tracking',
  },
} as const;

/**
 * Generate metadata for the persona page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, serviceId, industry: industrySlug } = await params;

  // Validate service ID
  if (!VALID_SERVICE_IDS.includes(serviceId as ServiceId)) {
    return {};
  }

  const industry = getIndustryBySlug(industrySlug);
  if (!industry) {
    return {};
  }

  return generatePersonaMetadata({
    serviceId: serviceId as ServiceId,
    industry,
    locale,
  });
}

/**
 * Generate static params for all valid service + industry combinations
 */
export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'es', 'pt'];
  const params: Array<{ locale: Locale; serviceId: string; industry: string }> = [];

  for (const locale of locales) {
    for (const serviceId of VALID_SERVICE_IDS) {
      for (const industrySlug of getIndustrySlugs()) {
        params.push({ locale, serviceId, industry: industrySlug });
      }
    }
  }

  return params;
}

export default async function PersonaPage({ params }: PageProps) {
  const { locale, serviceId, industry: industrySlug } = await params;

  // Validate service ID
  if (!VALID_SERVICE_IDS.includes(serviceId as ServiceId)) {
    notFound();
  }

  const industry = getIndustryBySlug(industrySlug);
  if (!industry) {
    notFound();
  }

  const service = SERVICE_CONFIG[serviceId as ServiceId];

  // Generate schema markup
  const serviceSchema = generatePersonaServiceSchema(serviceId as ServiceId, industry, locale);
  const breadcrumbSchema = generatePersonaBreadcrumbSchema(serviceId as ServiceId, industry, locale);
  const faqSchema = generatePersonaFAQSchema(serviceId as ServiceId, industry, locale);

  // Get related industries (same service, different industry)
  const relatedIndustries = getIndustrySlugs()
    .filter((slug) => slug !== industrySlug)
    .slice(0, 3)
    .map((slug) => getIndustryBySlug(slug))
    .filter((i): i is IndustryData => i !== undefined);

  // Get related services (same industry, different service)
  const relatedServices = VALID_SERVICE_IDS.filter((id) => id !== serviceId).slice(0, 2);

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container max-w-4xl py-16 md:py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-foreground">
            Services
          </Link>
          <span>/</span>
          <Link href={service.hubPath} className="hover:text-foreground">
            {service.name[locale]}
          </Link>
          <span>/</span>
          <span className="text-foreground">{industry.name}</span>
        </nav>

        {/* Hero Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-4xl">{service.icon}</span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5" />
              <span className="font-medium">{service.timeline}</span>
              <span>•</span>
              <DollarSign className="h-5 w-5" />
              <span className="font-medium">{service.price}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {service.name[locale]} for {industry.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            {service.description[locale]}
          </p>
          <p className="text-lg text-muted-foreground">
            {industry.description}
          </p>
        </section>

        {/* Industry-Specific Pain Points */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            Why {industry.name} Companies Need This Service
          </h2>
          <div className="grid gap-4">
            {industry.painPoints.map((painPoint, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">{painPoint}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">What&apos;s Included</h2>
          <div className="grid gap-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Industry-specific configuration for {industry.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Integration with {industry.integrations.slice(0, 3).join(', ')}</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Production-tested patterns (built Margin + QuoteKit)</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Complete handoff + documentation</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>No vendor lock-in</span>
            </div>
          </div>
        </section>

        {/* Industry Context */}
        <section className="mb-16 p-6 bg-muted/50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">About {industry.name}</h3>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Typical Company Size</dt>
              <dd className="font-medium">{industry.companySize}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Funding Stage</dt>
              <dd className="font-medium">{industry.fundingStage}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Timeline</dt>
              <dd className="font-medium">
                {service.timeline} (×{industry.timelineMultiplier} for {industry.name} complexity)
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Examples</dt>
              <dd className="font-medium">{industry.examples.slice(0, 3).join(', ')}</dd>
            </div>
          </dl>
        </section>

        {/* Related Industries */}
        {relatedIndustries.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Also Available For</h2>
            <div className="flex flex-wrap gap-2">
              {relatedIndustries.map((relatedIndustry) => (
                <Link
                  key={relatedIndustry.slug}
                  href={`/services/${serviceId}/for-${relatedIndustry.slug}`}
                  className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                >
                  {relatedIndustry.name}
                </Link>
              ))}
              <Link
                href={`/services/${serviceId}`}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                View all industries →
              </Link>
            </div>
          </section>
        )}

        {/* Other Services for This Industry */}
        {relatedServices.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Other Services for {industry.name}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedServices.map((relatedServiceId) => {
                const relatedService = SERVICE_CONFIG[relatedServiceId];
                return (
                  <Link
                    key={relatedServiceId}
                    href={`/services/${relatedServiceId}/for-${industrySlug}`}
                    className="p-4 border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{relatedService.icon}</span>
                      <span className="font-semibold">{relatedService.name[locale]}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {relatedService.description[locale]}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {relatedService.price}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {relatedService.timeline}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mt-16">
          <CTASection
            title={`Get ${service.name[locale]} for ${industry.name}`}
            subtitle={`Fixed price ${service.price}, delivered in ${service.timeline}`}
            description="Ready to implement? Schedule a call to discuss your requirements."
            primaryAction={{
              label: 'Schedule a Call',
              href: '/contact',
              icon: <Calendar className="h-5 w-5" />,
            }}
            secondaryAction={{
              label: 'View Full Service Details',
              href: service.hubPath,
              variant: 'outline',
              icon: <ArrowRight className="h-5 w-5" />,
            }}
            badge="Limited availability"
            trustSignals={[
              'Built Margin (production LLM metering)',
              'Built QuoteKit (billing infrastructure)',
              '99.5% test pass rate',
            ]}
          />
        </section>
      </div>
    </>
  );
}
