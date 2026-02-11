import type { Metadata } from 'next';
import { CTASection } from '@/components/service-sections';
import type { Locale } from '@/lib/metadata/base-metadata';
import { generatePageMetadata } from '@/lib/metadata/page-metadata';
import { DollarSign, Clock, ArrowRight, CheckCircle2, FileText, BarChart3, CreditCard, Database, Zap, Shield, Calendar } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    namespace: 'services',
    path: '/services',
  });
}

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  href: string;
  priceRange: string;
  duration: string;
  icon: React.ReactNode;
  badge?: string;
  highlighted?: boolean;
  features: string[];
}

const iconMap: Record<string, React.ReactNode> = {
  'billing-audit': <FileText className="h-6 w-6" />,
  'payment-recovery': <CreditCard className="h-6 w-6" />,
  'usage-pricing': <Zap className="h-6 w-6" />,
  'ai-tracking': <BarChart3 className="h-6 w-6" />,
  'billing-infrastructure': <Database className="h-6 w-6" />,
  'complete-billing': <Shield className="h-6 w-6" />,
};

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('pages/services');

  // Build services array from translations
  const services: ServiceCard[] = t.raw('items').map((item: ServiceCard) => ({
    ...item,
    icon: iconMap[item.id] || <FileText className="h-6 w-6" />,
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 space-y-6">
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground font-medium">{t('hero.label')}</span>
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

      {/* Services Grid */}
      <section className="py-12 md:py-16 space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">{t('title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className={cn(
                'group relative flex flex-col overflow-hidden transition-all hover:shadow-lg hover:border-primary/50',
                service.highlighted && 'border-primary/50 ring-2 ring-primary/20'
              )}
            >
              {service.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              )}

              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className={cn(
                    'flex h-14 w-14 items-center justify-center rounded-xl transition-all group-hover:scale-110',
                    service.highlighted
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )} aria-hidden="true">
                    {service.icon}
                  </div>
                  {service.badge && (
                    <Badge
                      variant={service.highlighted ? 'default' : 'secondary'}
                      className="shrink-0"
                    >
                      {service.badge}
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 font-semibold text-foreground">
                    <DollarSign className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    {service.priceRange}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {service.duration}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-2" role="list" aria-label={`${service.title} features`}>
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full gap-2" variant={service.highlighted ? 'default' : 'outline'}>
                  <Link href={service.href}>
                    {t('learnMore')}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Audit Entry Point */}
      <section className="py-12 md:py-16">
        <div className="rounded-xl border-2 border-primary/20 bg-card p-8 md:p-12">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="gap-1.5">
                <FileText className="h-3 w-3" aria-hidden="true" />
                {t('audit.badge')}
              </Badge>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              {t('audit.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('audit.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href="/services/billing-audit">
                  {t('audit.primaryAction')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/contact?service=audit">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  {t('audit.secondaryAction')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 md:py-16 space-y-12">
        <CTASection
          title={t('cta.title')}
          subtitle={t('cta.subtitle')}
          description={t('cta.description')}
          primaryAction={{
            label: t('cta.primaryAction'),
            href: '/contact',
            icon: <Calendar className="h-5 w-5" />,
          }}
          secondaryAction={{
            label: t('cta.secondaryAction'),
            href: '/blog',
            icon: <ArrowRight className="h-5 w-5" />,
          }}
          badge={t('cta.badge')}
          trustSignals={t.raw('cta.trustSignals')}
        />
      </section>
    </>
  );
}
