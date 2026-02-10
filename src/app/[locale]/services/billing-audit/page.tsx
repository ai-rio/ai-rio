import type { Metadata } from 'next';
import {
  ProblemSection,
  SolutionSection,
  DeliverablesSection,
  WhoForSection,
  RelatedServices,
  FAQSection,
  CTASection,
  TechnicalProof,
  type FeatureItem,
} from '@/components/service-sections';
import { generatePageMetadata } from '@/lib/metadata/page-metadata';
import { Search, DollarSign, Clock, ArrowRight, Calendar, AlertTriangle, FileText, CheckCircle2, TrendingDown, type LucideIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { buildProblems, buildFeaturesData, buildMetrics, buildFAQs, buildPhases, buildProfiles, buildRelatedServices, type FeatureItemData } from '@/i18n/builders/service-pages';

// Icon mapping for feature items
const iconMap: Record<string, LucideIcon> = {
  'trending-down': TrendingDown,
  search: Search,
  'alert-triangle': AlertTriangle,
  'dollar-sign': DollarSign,
  'file-text': FileText,
  'check-circle': CheckCircle2,
};

// Helper to map icon names to React components
function mapFeatureIcon(feature: FeatureItemData): FeatureItem {
  const IconComponent = feature.icon ? iconMap[feature.icon] : undefined;
  return {
    id: feature.id,
    title: feature.title,
    description: feature.description,
    badge: feature.badge,
    highlighted: feature.highlighted ?? false,
    icon: IconComponent ? <IconComponent className="h-6 w-6" /> : undefined,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as 'en' | 'es' | 'pt',
    namespace: 'billingAudit',
    path: '/services/billing-audit',
  });
}

export default async function BillingAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('services/billing-audit');

  // Build arrays from translation data using builder functions
  const metrics = buildMetrics(t.raw('metrics.items'));
  const problems = buildProblems(t.raw('problems.items'));
  const features = buildFeaturesData(t.raw('solution.items')).map(mapFeatureIcon);
  const phases = buildPhases(t.raw('deliverables.phases'));
  const profiles = buildProfiles(t.raw('whoFor.profiles'));
  const relatedServices = buildRelatedServices(t.raw('relatedServices.items'));
  const faqs = buildFAQs(t.raw('faq.items'));

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 space-y-6">
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground font-medium">{t('hero.timeline')}</span>
            <span className="text-muted-foreground">•</span>
            <DollarSign className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground font-medium">{t('hero.price')}</span>
          </div>
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

      {/* Metrics */}
      <section className="py-12 md:py-16 space-y-12">
        <TechnicalProof
          title={t('metrics.title')}
          subtitle={t('metrics.subtitle')}
          metrics={metrics}
        />
      </section>

      {/* Problems */}
      <section className="py-12 md:py-16 space-y-12">
        <ProblemSection
          title={t('problems.title')}
          subtitle={t('problems.subtitle')}
          problems={problems}
          alertMessage={{
            title: t('problems.alert.title'),
            description: t('problems.alert.description'),
          }}
        />
      </section>

      {/* Solution */}
      <section className="py-12 md:py-16 space-y-12">
        <SolutionSection
          title={t('solution.title')}
          subtitle={t('solution.subtitle')}
          features={features}
          layout="grid"
        />
      </section>

      {/* Deliverables */}
      <section className="py-12 md:py-16 space-y-12">
        <DeliverablesSection
          locale={locale}
          title={t('deliverables.title')}
          subtitle={t('deliverables.subtitle')}
          phases={phases}
          totalPrice={t.raw('deliverables.totalPrice') as number}
          cta={{
            label: t('deliverables.cta.label'),
            href: t('deliverables.cta.href'),
          }}
        />
      </section>

      {/* Who For */}
      <section className="py-12 md:py-16 space-y-12">
        <WhoForSection
          locale={locale}
          title={t('whoFor.title')}
          subtitle={t('whoFor.subtitle')}
          profiles={profiles}
        />
      </section>

      {/* Related Services */}
      <section className="py-12 md:py-16 space-y-12">
        <RelatedServices
          locale={locale}
          title={t('relatedServices.title')}
          subtitle={t('relatedServices.subtitle')}
          services={relatedServices}
          layout="grid"
        />
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 space-y-12">
        <FAQSection
          locale={locale}
          title={t('faq.title')}
          subtitle={t('faq.subtitle')}
          faqs={faqs}
        />
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 space-y-12">
        <CTASection
          title={t('cta.title')}
          subtitle={t('cta.subtitle')}
          description={t('cta.description')}
          primaryAction={{
            label: t('cta.primaryAction.label'),
            href: t('cta.primaryAction.href'),
            icon: <Calendar className="h-5 w-5" />,
          }}
          secondaryAction={{
            label: t('cta.secondaryAction.label'),
            href: t('cta.secondaryAction.href'),
            variant: 'outline',
            icon: <ArrowRight className="h-5 w-5" />,
          }}
          badge={t('cta.badge')}
          trustSignals={t.raw('cta.trustSignals') as string[]}
        />
      </section>
    </>
  );
}
