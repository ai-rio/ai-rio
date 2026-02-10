import type { Metadata } from 'next';
import { CTASection } from '@/components/service-sections';
import type { Locale } from '@/lib/metadata/base-metadata';
import { generatePageMetadata } from '@/lib/metadata/page-metadata';
import { Calendar, DollarSign, Clock, ArrowRight, CheckCircle2, FileText, BarChart3, CreditCard, Database, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

export default async function ServicesPage() {
  const services: ServiceCard[] = [
    {
      id: '1',
      title: 'Billing Audit',
      description: 'Identify revenue leaks, edge cases, and optimization opportunities in your billing infrastructure. Get a clear remediation roadmap.',
      href: '/services/billing-audit',
      priceRange: '$1.5K-3K',
      duration: '3-5 days',
      icon: <FileText className="h-6 w-6" />,
      badge: 'Best Starting Point',
      highlighted: false,
      features: [
        'Complete billing infrastructure audit',
        'Revenue leak identification',
        'Edge case documentation',
        'Clear remediation roadmap',
      ],
    },
    {
      id: '2',
      title: 'Payment Recovery',
      description: 'Recover 47-65% of failed payments with automated dunning workflows. Stop leaving revenue on the table.',
      href: '/services/payment-recovery',
      priceRange: '$2K-4K',
      duration: '7-10 days',
      icon: <CreditCard className="h-6 w-6" />,
      badge: 'Quick Win',
      highlighted: false,
      features: [
        'Automated dunning workflows',
        'Intelligent retry logic',
        'Email sequence templates',
        '+17.4% recovery improvement',
      ],
    },
    {
      id: '3',
      title: 'Usage-Based Pricing',
      description: 'Launch Stripe Meter in 2 weeks. Companies with usage-based pricing grow 54% faster than traditional models.',
      href: '/services/usage-pricing',
      priceRange: '$3K-5K',
      duration: '2 weeks',
      icon: <Zap className="h-6 w-6" />,
      badge: '54% Faster Growth',
      highlighted: true,
      features: [
        'Stripe Meter implementation',
        'Event tracking and aggregation',
        'Real-time usage calculations',
        'Flexible pricing tiers',
      ],
    },
    {
      id: '4',
      title: 'AI Cost Tracking',
      description: 'Track LLM costs per customer across OpenAI, Anthropic, and OpenRouter (400+ models). Know your true margins.',
      href: '/services/ai-tracking',
      priceRange: '$3K-5K',
      duration: '10-14 days',
      icon: <BarChart3 className="h-6 w-6" />,
      badge: 'Popular',
      highlighted: false,
      features: [
        '5 LLM providers integrated',
        '400+ models supported',
        'Per-customer cost attribution',
        'Real-time margin dashboard',
      ],
    },
    {
      id: '5',
      title: 'Billing Infrastructure',
      description: 'Complete end-to-end billing infrastructure. Usage-based pricing, payment recovery, AI cost tracking, and edge case handling.',
      href: '/services/billing-infrastructure',
      priceRange: 'Custom',
      duration: '4-6 weeks',
      icon: <Database className="h-6 w-6" />,
      badge: 'Complete Solution',
      highlighted: true,
      features: [
        'All services integrated',
        '720-line edge case coordinator',
        '99.5% test coverage',
        'Priority support',
      ],
    },
    {
      id: '6',
      title: 'Complete Billing Foundation',
      description: 'The full package: audit, recovery, usage pricing, and AI tracking all in one. 90-day guarantee included.',
      href: '/services/complete-billing',
      priceRange: '$8K-15K',
      duration: '3-4 weeks',
      icon: <Shield className="h-6 w-6" />,
      badge: 'Best Value',
      highlighted: false,
      features: [
        'All services bundled',
        'Priority implementation',
        '90-day guarantee',
        'Ongoing optimization',
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 space-y-6">
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground font-medium">Fixed-Price Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Fixed-Price Billing Services
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            No scope creep. No hourly billing. No surprises.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Clear deliverables, fixed timelines, and transparent pricing. You know exactly what you are getting and when it will be done.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Choose Your Service</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Each service is designed to solve a specific billing problem. Not sure where to start? Begin with a billing audit.
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
                    Learn More
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
                Recommended First Step
              </Badge>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Not Sure Where to Start?
            </h2>
            <p className="text-lg text-muted-foreground">
              Begin with a billing audit. I will analyze your current billing infrastructure, identify revenue leaks,
              and provide a clear roadmap for improvements. The audit fee is credited back if you proceed with any implementation service.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link href="/services/billing-audit">
                  Start with Billing Audit
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/contact?service=audit">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 md:py-16 space-y-12">
        <CTASection
          title="Let's Talk About Your Billing Needs"
          subtitle="No sales pressure. Just honest advice."
          description="Book a free discovery call. We will discuss your billing challenges and I will recommend the best service for your situation."
          primaryAction={{
            label: 'Book Discovery Call',
            href: '/contact',
            icon: <Calendar className="h-5 w-5" />,
          }}
          secondaryAction={{
            label: 'View Case Studies',
            href: '/blog',
            icon: <ArrowRight className="h-5 w-5" />,
          }}
          badge="Response within 24 hours"
          trustSignals={[
            'Free consultation',
            'No commitment required',
            'Clear scope and pricing',
            '30-day post-launch support',
          ]}
        />
      </section>
    </>
  );
}
