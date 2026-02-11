import type { Metadata } from 'next';
import {
  CTASection,
  SolutionSection,
  TechnicalProof,
  DeliverablesSection,
  type FeatureItem,
  type Metric,
  type PhaseDeliverables,
} from '@/components/service-sections';
import { generatePageMetadata } from '@/lib/metadata/page-metadata';
import { Code2, Database, CheckCircle2, Calendar, ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/metadata/base-metadata';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    namespace: 'about',
    path: '/about',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/about' });

  // Builder story: How I built billing infrastructure from scratch
  const builderStory: FeatureItem[] = t.raw('builderStory.features').map((feature: FeatureItem) => ({
    ...feature,
    icon: feature.id === '1' ? <Code2 className="h-6 w-6" /> :
           feature.id === '2' ? <Database className="h-6 w-6" /> :
           feature.id === '3' ? <CheckCircle2 className="h-6 w-6" /> :
           undefined,
  }));

  // Technical proof: Real metrics from the codebase
  const technicalMetrics: Metric[] = t.raw('standards.metrics');

  // Process: How I work with clients
  const workPhases: PhaseDeliverables[] = t.raw('howIWork.phases');

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 space-y-6">
        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {t('hero.description')}
          </p>
        </div>
      </section>

      {/* Builder Story Section */}
      <section className="py-12 md:py-16 space-y-12">
        <SolutionSection
          title={t('builderStory.title')}
          subtitle={t('builderStory.subtitle')}
          features={builderStory}
          layout="list"
        />
      </section>

      {/* Technical Proof Section */}
      <section className="py-12 md:py-16 space-y-12">
        <TechnicalProof
          locale={locale}
          title={t('standards.title')}
          subtitle={t('standards.subtitle')}
          metrics={technicalMetrics}
          highlightedMetric="1"
          layout="grid"
        />
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-16 space-y-12">
        <DeliverablesSection
          locale={locale}
          title={t('howIWork.title')}
          subtitle={t('howIWork.subtitle')}
          phases={workPhases}
          cta={t.raw('howIWork.cta')}
        />
      </section>

      {/* Final CTA Section */}
      <section className="py-12 md:py-16 space-y-12">
        <CTASection
          title={t('cta.title')}
          subtitle={t('cta.subtitle')}
          description={t('cta.description')}
          primaryAction={{
            ...t.raw('cta.primaryAction'),
            icon: <Calendar className="h-5 w-5" />,
          }}
          secondaryAction={{
            ...t.raw('cta.secondaryAction'),
            icon: <ArrowRight className="h-5 w-5" />,
          }}
          badge={t('cta.badge')}
          trustSignals={t.raw('cta.trustSignals')}
        />
      </section>
    </>
  );
}
