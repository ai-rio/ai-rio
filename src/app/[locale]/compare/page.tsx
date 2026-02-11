/**
 * Programmatic SEO: Comparison Hub Page
 * ====================================
 *
 * Route: /compare
 *
 * Lists all comparison pages organized by type.
 */

import Link from 'next/link';
import { ArrowRight, Scale } from 'lucide-react';
import { getComparisonsByType, getComparisonSlugs, type ComparisonData } from '@/lib/programmatic-seo/comparisons';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/metadata/base-metadata';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const COMPARISON_TYPES: Record<string, string> = {
  'diy-tool': 'DIY Tools & Platforms',
  'platform': 'Billing Platforms',
  'hiring': 'Hiring Options',
  'agency': 'Agencies & Consultants',
  'opensource': 'Open Source',
  'service': 'Service Providers',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'en' ? 'Ai.Rio Comparisons | Which is Right for You?' : 'Comparaciones Ai.Rio | ¿Cuál es adecuado?',
    description: locale === 'en'
      ? 'Compare Ai.Rio to billing platforms, DIY tools, hiring options, and more. Detailed comparisons of costs, timelines, and features.'
      : 'Compara Ai.Rio con plataformas de cobrança, herramientas DIY y más. Comparaciones detalladas de costos y características.',
    keywords: [
      'ai.rio comparison',
      'billing platform comparison',
      'stripe meter vs',
      'failed payment recovery vs',
      'llm cost tracking vs',
    ],
  };
}

export default async function ComparisonHubPage({ params }: PageProps) {
  const { locale } = await params;
  const slugs = getComparisonSlugs();

  // Group comparisons by type
  const comparisonsByType: Record<string, ComparisonData[]> = {};
  for (const slug of slugs) {
    // Import getComparisonBySlug function inline to avoid dependency issues
    const comparison = (await import('@/lib/programmatic-seo/comparisons')).getComparisonBySlug(slug);
    if (comparison) {
      const typeLabel = COMPARISON_TYPES[comparison.type] || comparison.type;
      if (!comparisonsByType[typeLabel]) {
        comparisonsByType[typeLabel] = [];
      }
      comparisonsByType[typeLabel].push(comparison);
    }
  }

  return (
    <div className="container max-w-6xl py-16 md:py-24">
      {/* Header */}
      <header className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
          <Scale className="h-5 w-5" />
          <span>Comparisons</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Ai.Rio vs Alternatives
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Detailed comparisons to help you choose the right billing infrastructure approach
          for your AI SaaS company.
        </p>
      </header>

      {/* Comparisons by Type */}
      <div className="space-y-12">
        {Object.entries(comparisonsByType).map(([typeLabel, comparisons]) => (
          <section key={typeLabel}>
            <h2 className="text-2xl font-bold mb-6">{typeLabel}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparisons.map((comparison) => (
                <Link
                  key={comparison.slug}
                  href={`/compare/${comparison.slug}`}
                  className="group block p-6 border rounded-lg hover:bg-muted hover:border-primary transition-all"
                >
                  <h3 className="font-semibold group-hover:text-primary transition-colors mb-2">
                    Ai.Rio vs {comparison.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{comparison.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {comparison.costComparison.alternative} vs {comparison.costComparison.aiRio}
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Why Compare Section */}
      <section className="mt-16 p-6 bg-muted/50 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4">Why Comparisons Matter</h2>
        <p className="text-muted-foreground mb-4">
          Choosing the right billing infrastructure approach can save you months of development
          time and tens of thousands of dollars. These comparisons help you understand:
        </p>
        <ul className="grid md:grid-cols-2 gap-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">→</span>
            <span>Total cost of ownership (not just upfront price)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">→</span>
            <span>Implementation timeline and complexity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">→</span>
            <span>Feature differences and limitations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">→</span>
            <span>When each option makes the most sense</span>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Still Deciding?</h2>
        <p className="text-muted-foreground mb-6">
          Schedule a free call to discuss your specific needs and get a recommendation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Schedule a Call
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
