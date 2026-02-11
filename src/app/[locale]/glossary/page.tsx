/**
 * Programmatic SEO: Glossary Hub Page
 * =====================================
 *
 * Route: /glossary
 *
 * Lists all glossary terms organized alphabetically.
 * Also provides search functionality.
 */

import Link from 'next/link';
import { BookOpen, Search } from 'lucide-react';
import { getTermsByCategory, getTermSlugs, type GlossaryTerm } from '@/lib/programmatic-seo/glossary';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/metadata/base-metadata';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'en' ? 'Billing Infrastructure Glossary | Ai.Rio' : 'Glosario de Infraestructura de Cobrança | Ai.Rio',
    description: locale === 'en'
      ? 'Comprehensive glossary of billing infrastructure terms: Stripe Meter, usage-based pricing, failed payment recovery, LLM cost tracking, and more.'
      : 'Glosário completo de termos de infraestrutura de cobrança: Stripe Meter, preços baseados em uso, recuperação de pagamentos e mais.',
    keywords: [
      'billing glossary',
      'saas glossary',
      'stripe meter',
      'usage-based pricing',
      'failed payment recovery',
      'llm cost tracking',
      'dunning management',
      'payment recovery',
    ],
  };
}

export default async function GlossaryHubPage({ params }: PageProps) {
  const { locale } = await params;
  const termsByCategory = getTermsByCategory();
  const categories = Object.keys(termsByCategory).sort();

  return (
    <div className="container max-w-6xl py-16 md:py-24">
      {/* Header */}
      <header className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
          <BookOpen className="h-5 w-5" />
          <span>Glossary</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Billing Infrastructure Glossary
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comprehensive definitions for billing infrastructure, SaaS pricing, payment recovery,
          and LLM cost tracking terms.
        </p>
      </header>

      {/* Quick Search Tip */}
      <div className="mb-12 p-4 bg-muted/50 rounded-lg border flex items-start gap-3 max-w-2xl mx-auto">
        <Search className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-muted-foreground">
            <strong>Tip:</strong> Use your browser&apos;s find function (Ctrl+F / Cmd+F) to search
            for specific terms on this page.
          </p>
        </div>
      </div>

      {/* Alphabet Navigation */}
      <nav className="mb-8 flex flex-wrap justify-center gap-2" aria-label="Alphabet navigation">
        {categories.map((category) => (
          <a
            key={category}
            href={`#${category.toLowerCase()}`}
            className="w-10 h-10 flex items-center justify-center border rounded-md hover:bg-muted hover:border-primary transition-colors font-medium"
          >
            {category}
          </a>
        ))}
      </nav>

      {/* Terms by Category */}
      <div className="space-y-12">
        {categories.map((category) => {
          const terms = termsByCategory[category];
          return (
            <section key={category} id={category.toLowerCase()} className="scroll-mt-20">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-12 h-12 flex items-center justify-center bg-primary text-primary-foreground rounded-lg">
                  {category}
                </span>
                <span>
                  {terms.length} {terms.length === 1 ? 'Term' : 'Terms'}
                </span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {terms.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="group block p-4 border rounded-lg hover:bg-muted hover:border-primary transition-all"
                  >
                    <h3 className="font-semibold group-hover:text-primary transition-colors mb-1">
                      {term.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{term.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Back to Services */}
      <div className="mt-16 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-3 border rounded-md hover:bg-muted transition-colors"
        >
          Explore Our Services
        </Link>
      </div>
    </div>
  );
}
