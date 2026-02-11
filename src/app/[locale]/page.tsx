import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navbar';
import { generatePageMetadata } from '@/lib/metadata/page-metadata';
import { TechnicalProof } from '@/components/service-sections/technical-proof';
import { DashboardShowcase } from '@/components/service-sections/dashboard-showcase';
import { DeliverablesSection } from '@/components/service-sections/deliverables-section';
import { ProblemSection } from '@/components/service-sections/problem-section';
import { SimplifiedContactForm } from '@/components/simplified-contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, TrendingUp, Zap, Shield, Database, Code2, DollarSign } from 'lucide-react';
import { Link } from '@/i18n/navigation';

// SEO: Schema markup imports
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  BREADCRUMBS,
} from '@/lib/metadata/schema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as 'en' | 'es' | 'pt',
    namespace: 'home',
    path: '/',
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  // SEO: Generate schema markup
  const organizationSchema = generateOrganizationSchema(locale as 'en' | 'es' | 'pt');
  const webSiteSchema = generateWebSiteSchema(locale as 'en' | 'es' | 'pt');
  const breadcrumbSchema = generateBreadcrumbSchema(BREADCRUMBS.home, locale as 'en' | 'es' | 'pt');

  return (
    <>
      {/* SEO: JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="min-h-screen bg-dark-page text-text">
        <Navbar locale={locale} />

        {/* Commit 21: Enhanced Hero Section */}
        <section className="relative px-4 py-32 sm:px-6 sm:py-40 lg:px-8 overflow-hidden border-b border-surface-mixed-300">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="mx-auto max-w-5xl relative">
          <div className="text-center space-y-10">
            {/* Main headline */}
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                <Zap className="h-3 w-3 mr-1" />
                {t('hero.badge')}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-text sm:text-6xl lg:text-7xl">
                {t('hero.title')}
              </h1>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
                {t('hero.subtitle')}
              </h2>
            </div>

            {/* Subheadline */}
            <p className="mt-6 text-lg leading-8 text-surface-700 sm:text-xl max-w-3xl mx-auto">
              {t('hero.description')}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="group gap-2 bg-primary hover:bg-primary/90 text-white"
              >
                <a href="#infrastructure">
                  {t('hero.cta.primary')}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-surface-mixed-300 bg-surface-mixed-100 text-text hover:bg-primary/50"
              >
                <a href="#contact">
                  {t('hero.cta.secondary')}
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-surface-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{t('hero.trust.productionReady')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>{t('hero.trust.soc2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-purple-500" />
                <span>{t('hero.trust.providers')}</span>
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* Commit 21: Technical Proof Section */}
        <section id="infrastructure" className="px-4 py-32 sm:px-6 sm:py-40 lg:px-8 bg-surface-mixed-100/50 border-b border-surface-mixed-300">
          <div className="mx-auto max-w-7xl">
          <TechnicalProof
            locale={locale}
            title={t('infrastructure.title')}
            subtitle={t('infrastructure.subtitle')}
            metrics={[
              {
                id: 'coverage',
                label: t('infrastructure.metrics.coverage.label'),
                value: 99.5,
                suffix: '%',
                description: t('infrastructure.metrics.coverage.description'),
                progress: 99.5,
                trend: 'up'
              },
              {
                id: 'providers',
                label: t('infrastructure.metrics.providers.label'),
                value: 5,
                description: t('infrastructure.metrics.providers.description'),
                progress: 100,
                trend: 'up'
              },
              {
                id: 'policies',
                label: t('infrastructure.metrics.policies.label'),
                value: 45,
                description: t('infrastructure.metrics.policies.description'),
                progress: 100,
                trend: 'up'
              },
              {
                id: 'models',
                label: t('infrastructure.metrics.models.label'),
                value: 400,
                suffix: '+',
                description: t('infrastructure.metrics.models.description'),
                progress: 95,
                trend: 'up'
              }
            ]}
            highlightedMetric="coverage"
            layout="grid"
          />
        </div>
        </section>

        {/* Commit 21: Dashboard Screenshot Showcase */}
        <section className="px-4 py-32 sm:px-6 sm:py-40 lg:px-8 border-b border-surface-mixed-300">
          <div className="mx-auto max-w-7xl">
          <DashboardShowcase
            locale={locale}
            title={t('dashboard.title')}
            subtitle={t('dashboard.subtitle')}
            views={[
              {
                id: 'dashboard',
                title: t('dashboard.views.title'),
                description: t('dashboard.views.description'),
                imageSrc: '/dashboard-screenshot.png',
                imageAlt: t('dashboard.views.imageAlt'),
                device: 'desktop',
                badge: t('dashboard.views.badge')
              }
            ]}
            cta={{
              label: t('dashboard.cta'),
              href: 'https://demo.ai-rio.com',
              external: true
            }}
            aspectRatio="16/9"
          />
        </div>
        </section>

        {/* Commit 22: Problem Section */}
        <section className="px-4 py-32 sm:px-6 sm:py-40 lg:px-8 bg-surface-mixed-100/50 border-b border-surface-mixed-300">
          <div className="mx-auto max-w-7xl">
          <ProblemSection
            title={t('problem.title')}
            subtitle={t('problem.subtitle')}
            problems={[
              {
                id: 'no-visibility',
                title: t('problem.problems.noVisibility.title'),
                description: t('problem.problems.noVisibility.description'),
                severity: 'critical',
                metric: t('problem.problems.noVisibility.metric')
              },
              {
                id: 'unknown-margins',
                title: t('problem.problems.unknownMargins.title'),
                description: t('problem.problems.unknownMargins.description'),
                severity: 'critical'
              },
              {
                id: 'usage-spikes',
                title: t('problem.problems.usageSpikes.title'),
                description: t('problem.problems.usageSpikes.description'),
                severity: 'high'
              },
              {
                id: 'multi-provider',
                title: t('problem.problems.multiProvider.title'),
                description: t('problem.problems.multiProvider.description'),
                severity: 'medium'
              }
            ]}
            alertMessage={{
              title: t('problem.alert.title'),
              description: t('problem.alert.description')
            }}
          />
        </div>
        </section>

        {/* Commit 22: Services Section */}
        <section id="services" className="px-4 py-32 sm:px-6 sm:py-40 lg:px-8 border-b border-surface-mixed-300">
          <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-4">
              {t('services.title')}
            </h2>
            <p className="text-lg text-surface-700 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Payment Recovery */}
            <Card className="border-surface-mixed-300 bg-surface-mixed-100/80 hover:bg-surface-mixed-100 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="shrink-0">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {t('services.badges.revenue')}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-4">
                  {t("services.payment_recovery.title")}
                </CardTitle>
                <div className="text-2xl font-bold text-primary">
                  {t("services.payment_recovery.price")}
                </div>
                <CardDescription className="text-sm">
                  {t("services.payment_recovery.timeline")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-surface-700">
                  {t("services.payment_recovery.description")}
                </p>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/services/payment-recovery">
                    {t('services.cta')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Usage-Based Pricing */}
            <Card className="border-surface-mixed-300 bg-surface-mixed-100/80 hover:bg-surface-mixed-100 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="shrink-0">
                    <Zap className="h-3 w-3 mr-1" />
                    {t('services.badges.growth')}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-4">
                  {t("services.usage_pricing.title")}
                </CardTitle>
                <div className="text-2xl font-bold text-primary">
                  {t("services.usage_pricing.price")}
                </div>
                <CardDescription className="text-sm">
                  {t("services.usage_pricing.timeline")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t("services.usage_pricing.description")}
                </p>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/services/usage-pricing">
                    {t('services.cta')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* AI Cost Tracking */}
            <Card className="border-surface-mixed-300 bg-surface-mixed-100/80 hover:bg-surface-mixed-100 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="default" className="shrink-0">
                    <Database className="h-3 w-3 mr-1" />
                    {t('services.badges.core')}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-4">
                  {t("services.ai_tracking.title")}
                </CardTitle>
                <div className="text-2xl font-bold text-primary">
                  {t("services.ai_tracking.price")}
                </div>
                <CardDescription className="text-sm">
                  {t("services.ai_tracking.timeline")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t("services.ai_tracking.description")}
                </p>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/services/ai-tracking">
                    {t('services.cta')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Billing Audit */}
            <Card className="border-surface-mixed-300 bg-surface-mixed-100/80 hover:bg-surface-mixed-100 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="shrink-0">
                    <Shield className="h-3 w-3 mr-1" />
                    {t('services.badges.audit')}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-4">
                  {t("services.billing_audit.title")}
                </CardTitle>
                <div className="text-2xl font-bold text-primary">
                  {t("services.billing_audit.price")}
                </div>
                <CardDescription className="text-sm">
                  {t("services.billing_audit.timeline")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t("services.billing_audit.description")}
                </p>
                <Button asChild className="w-full" variant="outline">
                  <Link href="/services/billing-audit">
                    {t('services.cta')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Complete Billing - Featured */}
            <Card className="md:col-span-2 border-primary/50 bg-gradient-to-br from-primary/5 to-surface-mixed-100 hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="default" className="shrink-0">
                    <Code2 className="h-3 w-3 mr-1" />
                    {t('services.badges.complete')}
                  </Badge>
                  <Badge variant="outline" className="shrink-0">
                    {t('services.badges.bestValue')}
                  </Badge>
                </div>
                <CardTitle className="text-2xl mt-4">
                  {t("services.complete_billing.title")}
                </CardTitle>
                <div className="text-3xl font-bold text-primary">
                  {t("services.complete_billing.price")}
                </div>
                <CardDescription className="text-sm">
                  {t("services.complete_billing.timeline")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-surface-700">
                  {t("services.complete_billing.description")}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-surface-700">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {t('services.features.allServices')}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {t('services.features.warranty')}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {t('services.features.support')}
                  </span>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/services/complete-billing">
                    {t('services.ctaFeatured')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        </section>

        {/* Commit 22: Process Section */}
        <section id="process" className="px-4 py-32 sm:px-6 sm:py-40 lg:px-8 bg-surface-mixed-100/50 border-b border-surface-mixed-300">
          <div className="mx-auto max-w-7xl">
          <DeliverablesSection
            locale={locale}
            title={t('process.title')}
            subtitle={t('process.subtitle')}
            phases={[
              {
                phase: '1',
                title: t('process.phases.1.title'),
                duration: t('process.phases.1.duration'),
                price: 0,
                description: t('process.phases.1.description'),
                deliverables: [
                  {
                    id: 'd1',
                    title: t('process.phases.1.deliverables.billingAudit.title'),
                    description: t('process.phases.1.deliverables.billingAudit.description'),
                    status: 'pending',
                    deliveryWeek: 'Day 1-3'
                  },
                  {
                    id: 'd2',
                    title: t('process.phases.1.deliverables.costAnalysis.title'),
                    description: t('process.phases.1.deliverables.costAnalysis.description'),
                    status: 'pending',
                    deliveryWeek: 'Day 4-5'
                  },
                  {
                    id: 'd3',
                    title: t('process.phases.1.deliverables.implementationPlan.title'),
                    description: t('process.phases.1.deliverables.implementationPlan.description'),
                    status: 'pending',
                    deliveryWeek: 'Day 5'
                  }
                ]
              },
              {
                phase: '2',
                title: t('process.phases.2.title'),
                duration: t('process.phases.2.duration'),
                price: 3000,
                description: t('process.phases.2.description'),
                deliverables: [
                  {
                    id: 'd4',
                    title: t('process.phases.2.deliverables.coreImplementation.title'),
                    description: t('process.phases.2.deliverables.coreImplementation.description'),
                    status: 'pending',
                    deliveryWeek: 'Day 1-7'
                  },
                  {
                    id: 'd5',
                    title: t('process.phases.2.deliverables.integration.title'),
                    description: t('process.phases.2.deliverables.integration.description'),
                    status: 'pending',
                    deliveryWeek: 'Day 8-10'
                  }
                ]
              },
              {
                phase: '3',
                title: t('process.phases.3.title'),
                duration: t('process.phases.3.duration'),
                price: 2000,
                description: t('process.phases.3.description'),
                deliverables: [
                  {
                    id: 'd6',
                    title: t('process.phases.3.deliverables.testing.title'),
                    description: t('process.phases.3.deliverables.testing.description'),
                    status: 'pending',
                    deliveryWeek: 'Day 1-3'
                  },
                  {
                    id: 'd7',
                    title: t('process.phases.3.deliverables.deployment.title'),
                    description: t('process.phases.3.deliverables.deployment.description'),
                    status: 'pending',
                    deliveryWeek: 'Day 4-5'
                  },
                  {
                    id: 'd8',
                    title: t('process.phases.3.deliverables.handover.title'),
                    description: t('process.phases.3.deliverables.handover.description'),
                    status: 'pending',
                    deliveryWeek: 'Day 6-10'
                  }
                ]
              }
            ]}
            totalPrice={5000}
            cta={{
              label: t('process.cta'),
              href: '#contact'
            }}
          />
        </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-4 py-32 sm:px-6 sm:py-40 lg:px-8 border-b border-surface-mixed-300">
          <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-text mb-6">
            {t('about.title')}
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-surface-700 mb-6">
              {t('about.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-surface-700">
              <Badge variant="outline" className="gap-2">
                <Code2 className="h-3 w-3" />
                {t('about.badges.openSource')}
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Shield className="h-3 w-3" />
                {t('about.badges.production')}
              </Badge>
              <Badge variant="outline" className="gap-2">
                <DollarSign className="h-3 w-3" />
                {t('about.badges.expert')}
              </Badge>
            </div>
          </div>
        </div>
        </section>

        {/* Commit 23: Simplified Contact Form */}
        <section id="contact" className="px-4 py-32 sm:px-6 sm:py-40 lg:px-8 bg-surface-mixed-100/50 border-b border-surface-mixed-300">
          <div className="mx-auto max-w-2xl">
          <SimplifiedContactForm
            locale={locale}
            contextText={t('contact.contextText')}
            description={t('contact.description')}
            emailAddress="hello@ai-rio.com"
          />
        </div>
        </section>

        {/* Footer */}
        <footer className="px-4 py-16 sm:px-6 border-t border-surface-mixed-300 bg-surface-mixed-100/50">
          <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-700">
              © 2026 Ai.Rio - {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6 text-sm text-surface-700">
              <Link href="/privacy" className="hover:text-text transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/privacy" className="hover:text-surface-700 transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
        </footer>
      </div>
    </>
  );
}
