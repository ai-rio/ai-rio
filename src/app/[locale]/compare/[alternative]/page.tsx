/**
 * Programmatic SEO: Comparison Page Template
 * ===========================================
 *
 * Dynamic route: /compare/[alternative]
 *
 * Generates "Ai.Rio vs [Alternative]" pages with:
 * - Side-by-side feature comparison
 * - When to choose each option
 * - Cost and timeline comparison
 * - Schema markup for SEO
 *
 * Example URLs:
 * - /compare/vs-build-in-house
 * - /compare/vs-stripe-billing
 * - /compare/vs-churnbuster
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle, XCircle, Clock, DollarSign, ArrowRight, Calendar } from 'lucide-react';
import { CTASection } from '@/components/service-sections/cta-section';
import { generateComparisonMetadata } from '@/lib/programmatic-seo/metadata';
import {
  generateComparisonArticleSchema,
  generateComparisonBreadcrumbSchema,
  generateComparisonFAQSchema,
} from '@/lib/programmatic-seo/schema';
import { getComparisonBySlug, getComparisonSlugs, type ComparisonData } from '@/lib/programmatic-seo/comparisons';
import type { Locale } from '@/lib/metadata/base-metadata';

interface PageProps {
  params: Promise<{
    locale: Locale;
    alternative: string;
  }>;
}

/**
 * Generate metadata for the comparison page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, alternative } = await params;

  const comparison = getComparisonBySlug(alternative);
  if (!comparison) {
    return {};
  }

  return generateComparisonMetadata({ comparison, locale });
}

/**
 * Generate static params for all valid comparisons
 */
export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'es', 'pt'];
  const params: Array<{ locale: Locale; alternative: string }> = [];

  for (const locale of locales) {
    for (const alternativeSlug of getComparisonSlugs()) {
      params.push({ locale, alternative: alternativeSlug });
    }
  }

  return params;
}

export default async function ComparisonPage({ params }: PageProps) {
  const { locale, alternative } = await params;

  const comparison = getComparisonBySlug(alternative);
  if (!comparison) {
    notFound();
  }

  // Generate schema markup
  const articleSchema = generateComparisonArticleSchema(comparison, locale);
  const breadcrumbSchema = generateComparisonBreadcrumbSchema(comparison, locale);
  const faqSchema = generateComparisonFAQSchema(comparison, locale);

  // Get related comparisons
  const relatedComparisons = getComparisonSlugs()
    .filter((slug) => slug !== alternative)
    .slice(0, 3)
    .map((slug) => getComparisonBySlug(slug))
    .filter((c): c is ComparisonData => c !== undefined);

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container max-w-5xl py-16 md:py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/compare" className="hover:text-foreground">
            Compare
          </Link>
          <span>/</span>
          <span className="text-foreground">{comparison.name}</span>
        </nav>

        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Ai.Rio vs {comparison.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {comparison.description}
          </p>
        </section>

        {/* Quick Summary */}
        <section className="mb-16 p-6 bg-muted/50 rounded-lg border">
          <h2 className="text-xl font-bold mb-4">Quick Summary</h2>
          <p className="text-muted-foreground">{comparison.verdict}</p>
        </section>

        {/* Cost & Timeline Comparison */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Cost & Timeline</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-3">{comparison.name}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <span>{comparison.costComparison.alternative}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>{comparison.timelineComparison.alternative}</span>
                </div>
              </div>
            </div>
            <div className="p-6 border rounded-lg bg-primary/5">
              <h3 className="font-semibold mb-3">Ai.Rio</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="font-medium">{comparison.costComparison.aiRio}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-medium">{comparison.timelineComparison.aiRio}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Feature</th>
                  <th className="text-left py-3 px-4 font-medium">{comparison.name}</th>
                  <th className="text-left py-3 px-4 font-medium text-primary">Ai.Rio</th>
                </tr>
              </thead>
              <tbody>
                {comparison.featureComparison.map((feature, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 font-medium">{feature.feature}</td>
                    <td className="py-3 px-4 text-muted-foreground">{feature.alternative}</td>
                    <td className="py-3 px-4 text-primary font-medium">{feature.aiRio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When to Choose */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* When to Choose Alternative */}
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-4">Choose {comparison.name} if...</h3>
              <ul className="space-y-2">
                {comparison.whenToChooseAlternative.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* When to Choose Ai.Rio */}
            <div className="p-6 border rounded-lg bg-primary/5">
              <h3 className="text-xl font-bold mb-4">Choose Ai.Rio if...</h3>
              <ul className="space-y-2">
                {comparison.whenToChooseAiRio.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Alternative Pros & Cons */}
            <div>
              <h3 className="text-xl font-bold mb-4">{comparison.name} Pros & Cons</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 text-green-400 mb-2">Pros</h4>
                  <ul className="space-y-1">
                    {comparison.alternativePros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 text-red-400 mb-2">Cons</h4>
                  <ul className="space-y-1">
                    {comparison.alternativeCons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Ai.Rio Pros & Cons */}
            <div>
              <h3 className="text-xl font-bold mb-4">Ai.Rio Pros & Cons</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 text-green-400 mb-2">Pros</h4>
                  <ul className="space-y-1">
                    {comparison.aiRioPros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 text-red-400 mb-2">Cons</h4>
                  <ul className="space-y-1">
                    {comparison.aiRioCons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Comparisons */}
        {relatedComparisons.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Related Comparisons</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedComparisons.map((related) => (
                <Link
                  key={related.slug}
                  href={`/compare/${related.slug}`}
                  className="p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <h3 className="font-semibold mb-1">Ai.Rio vs {related.name}</h3>
                  <p className="text-sm text-muted-foreground">{related.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mt-16">
          <CTASection
            title="Ready to Work with Ai.Rio?"
            subtitle="Fixed pricing, guaranteed timelines, production-tested patterns"
            description="Schedule a call to discuss your billing infrastructure needs."
            primaryAction={{
              label: 'Schedule a Call',
              href: '/contact',
              icon: <Calendar className="h-5 w-5" />,
            }}
            secondaryAction={{
              label: 'View All Services',
              href: '/services',
              variant: 'outline',
              icon: <ArrowRight className="h-5 w-5" />,
            }}
            badge="Limited availability"
            trustSignals={[
              'Built Margin (production LLM metering)',
              'Built QuoteKit (billing infrastructure)',
              'No vendor lock-in',
            ]}
          />
        </section>
      </div>
    </>
  );
}
