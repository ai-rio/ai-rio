/**
 * Programmatic SEO: Glossary Page Template
 * ==========================================
 *
 * Dynamic route: /glossary/[term]
 *
 * Generates "What is [Term]" pages with:
 * - Clear definition and technical explanation
 * - Why it matters for SaaS
 * - Common mistakes to avoid
 * - Related terms
 * - Code examples (where applicable)
 *
 * Example URLs:
 * - /glossary/stripe-meter
 * - /glossary/failed-payment-recovery
 * - /glossary/llm-cost-tracking
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, Info, BookOpen, ArrowRight, Calendar } from 'lucide-react';
import { CTASection } from '@/components/service-sections/cta-section';
import { generateGlossaryMetadata } from '@/lib/programmatic-seo/metadata';
import {
  generateGlossaryDefinedTermSchema,
  generateGlossaryBreadcrumbSchema,
  generateGlossaryFAQSchema,
} from '@/lib/programmatic-seo/schema';
import {
  getTermBySlug,
  getTermSlugs,
  getRelatedTerms,
  getTermsByCategory,
  type GlossaryTerm,
} from '@/lib/programmatic-seo/glossary';
import type { Locale } from '@/lib/metadata/base-metadata';

interface PageProps {
  params: Promise<{
    locale: Locale;
    term: string;
  }>;
}

/**
 * Generate metadata for the glossary page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, term: termSlug } = await params;

  const term = getTermBySlug(termSlug);
  if (!term) {
    return {};
  }

  return generateGlossaryMetadata({ term, locale });
}

/**
 * Generate static params for all valid glossary terms
 */
export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'es', 'pt'];
  const params: Array<{ locale: Locale; term: string }> = [];

  for (const locale of locales) {
    for (const termSlug of getTermSlugs()) {
      params.push({ locale, term: termSlug });
    }
  }

  return params;
}

export default async function GlossaryPage({ params }: PageProps) {
  const { locale, term: termSlug } = await params;

  const term = getTermBySlug(termSlug);
  if (!term) {
    notFound();
  }

  // Generate schema markup
  const definedTermSchema = generateGlossaryDefinedTermSchema(term, locale);
  const breadcrumbSchema = generateGlossaryBreadcrumbSchema(term, locale);
  const faqSchema = generateGlossaryFAQSchema(term, locale);

  // Get related terms
  const relatedTerms = getRelatedTerms(termSlug).slice(0, 4);

  // Get terms in the same category (first letter)
  const category = term.name[0].toUpperCase();
  const termsByCategory = getTermsByCategory();
  const sameCategoryTerms = (termsByCategory[category] || [])
    .filter((t) => t.slug !== termSlug)
    .slice(0, 3);

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="container max-w-4xl py-16 md:py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/glossary" className="hover:text-foreground">
            Glossary
          </Link>
          <span>/</span>
          <span className="text-foreground">{term.name}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Definition</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            What is {term.name}?
          </h1>
          <p className="text-xl text-muted-foreground">{term.description}</p>
        </header>

        {/* Definition Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Info className="h-6 w-6" />
            Definition
          </h2>
          <p className="text-lg leading-relaxed">{term.definition}</p>
        </section>

        {/* Technical Explanation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Technical Details</h2>
          <p className="text-muted-foreground leading-relaxed">{term.technical}</p>
        </section>

        {/* Why It Matters */}
        <section className="mb-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Why It Matters</h2>
          <p className="text-muted-foreground leading-relaxed">{term.whyItMatters}</p>
        </section>

        {/* Code Example (if applicable) */}
        {term.codeExample && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Code Example</h2>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">{term.codeExample.code}</code>
              </pre>
              <span className="absolute top-2 right-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                {term.codeExample.language}
              </span>
            </div>
          </section>
        )}

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            Common Mistakes to Avoid
          </h2>
          <ul className="space-y-3">
            {term.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 bg-orange-900/30 text-orange-600 text-orange-400 flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{mistake}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Related Terms</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((relatedTerm) => (
                <Link
                  key={relatedTerm.slug}
                  href={`/glossary/${relatedTerm.slug}`}
                  className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                >
                  {relatedTerm.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other Terms Starting With [Letter] */}
        {sameCategoryTerms.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Other Terms Starting With &quot;{category}&quot;</h2>
            <div className="grid gap-3">
              {sameCategoryTerms.map((sameCategoryTerm) => (
                <Link
                  key={sameCategoryTerm.slug}
                  href={`/glossary/${sameCategoryTerm.slug}`}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors"
                >
                  <span className="font-medium">{sameCategoryTerm.name}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Glossary Link */}
        <section className="mb-12 text-center">
          <Link
            href="/glossary"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Glossary
          </Link>
        </section>

        {/* CTA Section */}
        <section className="mt-16 border-t pt-16">
          <CTASection
            title={`Need Help With ${term.name}?`}
            subtitle="Billing infrastructure services for AI SaaS"
            description={`We help implement ${term.name.toLowerCase()} and other billing infrastructure for AI SaaS companies.`}
            primaryAction={{
              label: 'Schedule a Call',
              href: '/contact',
              icon: <Calendar className="h-5 w-5" />,
            }}
            secondaryAction={{
              label: 'View Our Services',
              href: '/services',
              variant: 'outline',
              icon: <ArrowRight className="h-5 w-5" />,
            }}
            badge="Limited availability"
            trustSignals={[
              'Built Margin (production LLM metering)',
              'Built QuoteKit (billing infrastructure)',
              'Proven patterns',
            ]}
          />
        </section>
      </article>
    </>
  );
}
