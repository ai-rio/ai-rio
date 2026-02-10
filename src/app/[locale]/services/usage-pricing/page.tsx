import {
  ProblemSection,
  SolutionSection,
  DeliverablesSection,
  WhoForSection,
  RelatedServices,
  FAQSection,
  CTASection,
  TechnicalProof,
  DashboardShowcase,
  type ProblemPoint,
  type FeatureItem,
  type PhaseDeliverables,
  type CustomerProfile,
  type RelatedService,
  type FAQItem,
  type Metric,
  type DashboardView,
} from '@/components/service-sections';
import { generatePageMetadata } from '@/lib/metadata/page-metadata';
import { Zap, TrendingUp, BarChart3, Clock, DollarSign, ArrowRight, Calendar, Settings, Database } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as any,
    namespace: 'usagePricing',
    path: '/services/usage-pricing',
  });
}

export default async function UsagePricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const problems: ProblemPoint[] = [
    {
      id: '1',
      title: 'Flat Pricing Limits Growth',
      description: 'Companies with usage-based pricing grow 54% faster than traditional subscription models. You are leaving growth on the table.',
      severity: 'high',
      metric: '54% faster growth with usage pricing',
    },
    {
      id: '2',
      title: 'Stripe Meter Takes 6 Months',
      description: 'Building Stripe Meter internally requires event tracking, aggregation, billing logic, and edge case handling. Most teams underestimate it.',
      severity: 'critical',
      metric: '6 months avg implementation time',
    },
    {
      id: '3',
      title: 'Cannot Bill for Actual Value',
      description: 'Heavy users pay the same as light users. You are undercharging your best customers and overcharging casual ones.',
      severity: 'high',
    },
    {
      id: '4',
      title: 'No Usage Visibility',
      description: 'You cannot tell customers how much they are using, what they are being billed for, or when they will hit limits.',
      severity: 'medium',
    },
    {
      id: '5',
      title: 'Engineering Distracted',
      description: 'Your product team wants to build features, not billing infrastructure. Usage pricing keeps getting deprioritized.',
      severity: 'medium',
    },
  ];

  const features: FeatureItem[] = [
    {
      id: '1',
      title: 'Stripe Meter Implementation',
      description: 'Complete usage-based pricing infrastructure with Stripe Meter. Track events, aggregate usage, and bill accurately.',
      icon: <Zap className="h-6 w-6" />,
      badge: '2 weeks vs 6 months',
      highlighted: true,
    },
    {
      id: '2',
      title: 'Event Tracking Pipeline',
      description: 'Capture usage events from your application, validate them, and send to Stripe for aggregation.',
      icon: <Database className="h-6 w-6" />,
    },
    {
      id: '3',
      title: 'Usage Dashboard',
      description: 'Real-time dashboard showing current usage, projected billing, and usage trends per customer.',
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      id: '4',
      title: 'Billing Logic & Proration',
      description: 'Handle upgrades, downgrades, mid-cycle changes, and proration calculations automatically.',
      icon: <Settings className="h-6 w-6" />,
    },
    {
      id: '5',
      title: 'Custom Usage Models',
      description: 'Support tiered pricing, volume discounts, overage charges, and custom meter configurations.',
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      id: '6',
      title: 'Customer Notifications',
      description: 'Automated alerts when customers approach usage limits, with upgrade prompts and transparency.',
      icon: <Zap className="h-6 w-6" />,
    },
  ];

  const phases: PhaseDeliverables[] = [
    {
      phase: '1',
      title: 'Discovery & Design',
      description: 'Define usage model and meter configuration',
      duration: 'Week 1',
      price: 1500,
      deliverables: [
        {
          id: '1-1',
          title: 'Usage Model Design',
          description: 'Define what to meter, pricing tiers, and billing rules for your specific product',
          status: 'pending',
          deliveryWeek: 'Week 1',
        },
        {
          id: '1-2',
          title: 'Stripe Meter Configuration',
          description: 'Set up Stripe Meter with custom events, aggregation logic, and billing cycles',
          status: 'pending',
          deliveryWeek: 'Week 1',
        },
        {
          id: '1-3',
          title: 'Edge Case Documentation',
          description: 'Document upgrade/downgrade scenarios, proration rules, and limit handling',
          status: 'pending',
          deliveryWeek: 'Week 1',
        },
      ],
    },
    {
      phase: '2',
      title: 'Implementation',
      description: 'Build event tracking and aggregation pipeline',
      duration: 'Week 2',
      price: 2500,
      deliverables: [
        {
          id: '2-1',
          title: 'Event Tracking Pipeline',
          description: 'Middleware to capture usage events, validate them, and send to Stripe',
          status: 'pending',
          deliveryWeek: 'Week 2',
        },
        {
          id: '2-2',
          title: 'Usage Dashboard',
          description: 'Real-time dashboard showing current usage, projected billing, and trends',
          status: 'pending',
          deliveryWeek: 'Week 2',
        },
        {
          id: '2-3',
          title: 'Billing Logic Integration',
          description: 'Integrate usage billing with your existing subscription and invoice system',
          status: 'pending',
          deliveryWeek: 'Week 2',
        },
      ],
    },
  ];

  const profiles: CustomerProfile[] = [
    {
      id: '1',
      name: 'API Platform Founder',
      initials: 'AP',
      stage: 'Seed-Series A',
      mrr: { min: 25000, max: 150000 },
      description: 'Building an API or developer tool. Usage-based pricing is the standard, but implementation is blocking.',
      painPoints: [
        'Cannot bill based on API calls',
        'Engineering team understimated complexity',
        'Usage pricing delayed for months',
        'Flat pricing limiting growth',
      ],
    },
    {
      id: '2',
      name: 'AI Infrastructure Startup',
      initials: 'AI',
      stage: 'Series A',
      mrr: { min: 100000, max: 500000 },
      description: 'Selling AI compute or processing. Usage is the only logical pricing model.',
      painPoints: [
        'Need to bill for tokens/compute',
        'Stripe Meter too complex',
        'Revenue not aligned with costs',
        'Enterprise customers demanding usage pricing',
      ],
    },
    {
      id: '3',
      name: 'SaaS Growth Leader',
      initials: 'SG',
      stage: 'Growth Stage',
      mrr: { min: 200000, max: 1000000 },
      description: 'Knows that usage-based pricing drives growth. Needs to implement it without distracting engineering.',
      painPoints: [
        'Growth targets require usage pricing',
        'Engineering team focused on features',
        'Cannot afford 6-month implementation',
        'Competitors already have usage pricing',
      ],
    },
  ];

  const relatedServices: RelatedService[] = [
    {
      id: '1',
      title: 'AI Cost Tracking',
      description: 'Track LLM costs per customer across 5 providers. $3K-5K, 2-3 weeks.',
      href: '/services/ai-tracking',
      badge: 'Popular for AI SaaS',
    },
    {
      id: '2',
      title: 'Billing Audit',
      description: 'Audit your billing infrastructure before implementing usage pricing. $1.5K-3K.',
      href: '/services/billing-audit',
    },
    {
      id: '3',
      title: 'Payment Recovery',
      description: 'Recover 65-70% of failed payments while implementing usage pricing. $2K-4K.',
      href: '/services/payment-recovery',
    },
    {
      id: '4',
      title: 'Complete Billing',
      description: 'Usage pricing + payment recovery + AI tracking all in one. $8K-15K.',
      href: '/services/complete-billing',
      badge: 'Best Value',
    },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'Why does Stripe Meter take 6 months to build?',
      answer: 'Stripe Meter seems simple: send events, aggregate usage, bill customers. But the edge cases are massive: event validation, idempotency, backfilling historical data, handling retroactive changes, proration on mid-cycle plan changes, debugging discrepancies, and customer support. I have already solved these problems.',
      category: 'Technical',
    },
    {
      id: '2',
      question: 'What can I meter with Stripe Meter?',
      answer: 'Anything you can quantify: API calls, token usage, storage, compute time, transactions, users, seats, messages, searches, etc. The limitation is your imagination.',
      category: 'Technical',
    },
    {
      id: '3',
      question: 'How do you handle proration and plan changes?',
      answer: 'The implementation handles mid-cycle upgrades/downgrades, calculating prorated charges based on usage at the time of change. This is where most homegrown implementations break.',
      category: 'Technical',
    },
    {
      id: '4',
      question: 'Do I need to change my entire pricing model?',
      answer: 'No. Many companies launch usage-based pricing alongside existing plans. You can offer hybrid pricing (base subscription + usage overages) or pure usage pricing. We design the model that fits your market.',
      category: 'Pricing',
    },
    {
      id: '5',
      question: 'What if I already have events tracked?',
      answer: 'Even better. I can backfill historical usage data into Stripe Meter and launch with immediate visibility. Existing event infrastructure reduces implementation time.',
      category: 'Process',
    },
    {
      id: '6',
      question: 'How do customers see their usage?',
      answer: 'The usage dashboard shows current usage, projected billing, usage trends, and alerts when approaching limits. Customers can also see usage breakdowns in their invoices.',
      category: 'Customer Experience',
    },
  ];

  const metrics: Metric[] = [
    {
      id: '1',
      label: 'Growth Rate',
      value: 54,
      suffix: '%',
      progress: 54,
      trend: 'up',
      description: 'Companies with usage-based pricing vs traditional subscriptions',
    },
    {
      id: '2',
      label: 'Implementation Time',
      value: 2,
      suffix: ' weeks',
      progress: 90,
      trend: 'up',
      description: 'vs 6 months building internally',
    },
    {
      id: '3',
      label: 'Revenue Alignment',
      value: 100,
      suffix: '%',
      progress: 100,
      trend: 'up',
      description: 'Revenue scales with customer value',
    },
    {
      id: '4',
      label: 'Pricing Models',
      value: 4,
      suffix: '+',
      progress: 80,
      trend: 'up',
      description: 'Tiered, volume, overage, hybrid',
    },
  ];

  const dashboardViews: DashboardView[] = [
    {
      id: '1',
      title: 'Current Usage',
      description: 'Real-time view of customer usage this billing period',
      imageSrc: '/images/dashboard/usage-current.png',
      imageAlt: 'Dashboard showing current usage metrics for billing period',
      device: 'desktop',
    },
    {
      id: '2',
      title: 'Projected Billing',
      description: 'Forecasted invoice based on current usage trajectory',
      imageSrc: '/images/dashboard/usage-projected.png',
      imageAlt: 'Dashboard showing projected billing forecast based on current usage',
      device: 'desktop',
    },
    {
      id: '3',
      title: 'Usage Trends',
      description: 'Historical usage patterns and growth over time',
      imageSrc: '/images/dashboard/usage-trends.png',
      imageAlt: 'Dashboard showing historical usage trends and growth patterns',
      device: 'desktop',
    },
    {
      id: '4',
      title: 'Usage Breakdown',
      description: 'Detailed breakdown by feature, endpoint, or resource',
      imageSrc: '/images/dashboard/usage-breakdown.png',
      imageAlt: 'Dashboard showing detailed usage breakdown by feature and resource',
      device: 'desktop',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 space-y-6">
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground font-medium">2 weeks</span>
            <span className="text-muted-foreground">•</span>
            <DollarSign className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground font-medium">$3,000-5,000</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Usage-Based Pricing Launch
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            Launch Stripe Meter in 2 weeks instead of 6 months.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Companies with usage-based pricing grow 54% faster than traditional subscriptions.
            Stop leaving growth on the table.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 md:py-16 space-y-12">
        <TechnicalProof
          title="The Usage-Based Pricing Advantage"
          subtitle="Why the fastest-growing SaaS companies use usage pricing."
          metrics={metrics}
        />
      </section>

      {/* Problems */}
      <section className="py-12 md:py-16 space-y-12">
        <ProblemSection
          title="Why Usage Pricing Is Blocking Your Growth"
          subtitle="You know you need usage-based pricing. You just cannot afford to build it."
          problems={problems}
          alertMessage={{
            title: 'The 6-Month Gap',
            description: 'Building Stripe Meter internally takes 6 months. In that time, competitors with usage pricing are growing 54% faster.',
          }}
        />
      </section>

      {/* Solution */}
      <section className="py-12 md:py-16 space-y-12">
        <SolutionSection
          title="The AI.RIO Solution"
          subtitle="I have already solved the hard problems. Launch in 2 weeks."
          features={features}
          layout="grid"
        />
      </section>

      {/* Dashboard Showcase */}
      <section className="py-12 md:py-16 space-y-12">
        <DashboardShowcase
          title="Usage Visibility Built In"
          subtitle="Your customers can see their usage, projected billing, and trends."
          views={dashboardViews}
        />
      </section>

      {/* Deliverables */}
      <section className="py-12 md:py-16 space-y-12">
        <DeliverablesSection
          locale={locale}
          title="What You Will Get"
          subtitle="Fixed scope, fixed price. Production-ready in 2 weeks."
          phases={phases}
          totalPrice={4000}
          cta={{
            label: 'Launch Usage Pricing',
            href: '/contact?service=usage-pricing',
          }}
        />
      </section>

      {/* Who For */}
      <section className="py-12 md:py-16 space-y-12">
        <WhoForSection
          locale={locale}
          title="Who This Is For"
          subtitle="SaaS companies that need to bill based on actual usage, not flat subscriptions."
          profiles={profiles}
        />
      </section>

      {/* Related Services */}
      <section className="py-12 md:py-16 space-y-12">
        <RelatedServices
          locale={locale}
          title="Related Services"
          subtitle="Usage pricing works even better when combined with these services."
          services={relatedServices}
          layout="grid"
        />
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 space-y-12">
        <FAQSection
          locale={locale}
          title="Frequently Asked Questions"
          subtitle="Questions about usage-based pricing implementation."
          faqs={faqs}
        />
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 space-y-12">
        <CTASection
          title="Ready to Launch Usage-Based Pricing?"
          subtitle="Companies with usage pricing grow 54% faster. What are you waiting for?"
          description="Book a free discovery call. We will design your usage model and I will provide a fixed quote for implementation."
          primaryAction={{
            label: 'Book Discovery Call',
            href: '/contact?service=usage-pricing',
            icon: <Calendar className="h-5 w-5" />,
          }}
          secondaryAction={{
            label: 'See Billing Audit',
            href: '/services/billing-audit',
            variant: 'outline',
            icon: <ArrowRight className="h-5 w-5" />,
          }}
          badge="Free usage model design"
          trustSignals={[
            'Response within 24 hours',
            '2-week implementation',
            'Fixed pricing, no surprises',
            'Production-ready code',
          ]}
        />
      </section>
    </>
  );
}
