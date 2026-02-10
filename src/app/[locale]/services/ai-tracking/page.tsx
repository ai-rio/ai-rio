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
import { Brain, Eye, DollarSign, Clock, ArrowRight, Calendar, Database, Shield, BarChart3, Zap } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as any,
    namespace: 'aiTracking',
    path: '/services/ai-tracking',
  });
}

export default async function AITrackingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const problems: ProblemPoint[] = [
    {
      id: '1',
      title: 'Your Margins Are a Black Box',
      description: 'You know your revenue, but you do not know your true costs. LLM expenses are scattered across OpenAI, Anthropic, OpenRouter, and more.',
      severity: 'critical',
      metric: 'Unknown cost per customer',
    },
    {
      id: '2',
      title: 'Cannot Calculate Unit Economics',
      description: 'CAC, LTV, and margin calculations are impossible without knowing AI costs per customer. You are flying blind.',
      severity: 'critical',
      metric: '400+ LLM models to track',
    },
    {
      id: '3',
      title: 'Heavy Users Are Losing Money',
      description: 'Some customers are costing more in LLM expenses than they pay in subscription. You do not know who they are.',
      severity: 'high',
      metric: '30-50% of customers unprofitable',
    },
    {
      id: '4',
      title: 'No Cost Attribution',
      description: 'You cannot tell which features, teams, or product areas are driving AI costs. Optimization is impossible.',
      severity: 'high',
    },
    {
      id: '5',
      title: 'Multi-Provider Chaos',
      description: 'OpenAI, Anthropic, OpenRouter, Cohere, Replicate - costs are fragmented across dashboards and invoices.',
      severity: 'medium',
    },
  ];

  const features: FeatureItem[] = [
    {
      id: '1',
      title: 'Multi-Provider Cost Tracking',
      description: 'Track LLM costs across OpenAI, Anthropic, OpenRouter, Cohere, and Replicate (400+ models) in one place.',
      icon: <Database className="h-6 w-6" />,
      badge: '5 providers integrated',
      highlighted: true,
    },
    {
      id: '2',
      title: 'Per-Customer Cost Attribution',
      description: 'Know exactly how much each customer costs in LLM expenses. Calculate true margins and unit economics.',
      icon: <DollarSign className="h-6 w-6" />,
      badge: 'True unit economics',
    },
    {
      id: '3',
      title: 'Real-Time Cost Dashboard',
      description: 'Live dashboard showing LLM costs per customer, model, and feature. No more monthly surprises.',
      icon: <BarChart3 className="h-6 w-6" />,
    },
    {
      id: '4',
      title: 'Token-Level Granularity',
      description: 'Track prompt tokens, completion tokens, and costs for every request. Debug expensive queries.',
      icon: <Zap className="h-6 w-6" />,
    },
    {
      id: '5',
      title: 'Cost Alerting',
      description: 'Get alerts when customers hit cost thresholds or when anomalous spending patterns emerge.',
      icon: <Eye className="h-6 w-6" />,
    },
    {
      id: '6',
      title: 'Model Performance Insights',
      description: 'Compare costs across models and providers. Identify opportunities to switch models and save money.',
      icon: <Brain className="h-6 w-6" />,
    },
  ];

  const phases: PhaseDeliverables[] = [
    {
      phase: '1',
      title: 'Discovery & Setup',
      description: 'Analyze current LLM usage and design tracking architecture',
      duration: 'Week 1',
      price: 1500,
      deliverables: [
        {
          id: '1-1',
          title: 'LLM Usage Audit',
          description: 'Map all LLM providers, models, and integration points in your codebase',
          status: 'pending',
          deliveryWeek: 'Week 1',
        },
        {
          id: '1-2',
          title: 'Tracking Architecture Design',
          description: 'Design middleware to intercept LLM calls and extract cost data',
          status: 'pending',
          deliveryWeek: 'Week 1',
        },
        {
          id: '1-3',
          title: 'Schema Design',
          description: 'Design database schema for storing token usage, costs, and customer attribution',
          status: 'pending',
          deliveryWeek: 'Week 1',
        },
      ],
    },
    {
      phase: '2',
      title: 'Implementation',
      description: 'Build tracking middleware and cost aggregation',
      duration: 'Week 2',
      price: 2500,
      deliverables: [
        {
          id: '2-1',
          title: 'Provider Integration',
          description: 'Integrate with OpenAI, Anthropic, OpenRouter APIs for cost tracking',
          status: 'pending',
          deliveryWeek: 'Week 2',
        },
        {
          id: '2-2',
          title: 'Customer Attribution',
          description: 'Link LLM costs to customer accounts and subscriptions',
          status: 'pending',
          deliveryWeek: 'Week 2',
        },
        {
          id: '2-3',
          title: 'Cost Aggregation Pipeline',
          description: 'Build pipeline to aggregate costs by customer, model, and time period',
          status: 'pending',
          deliveryWeek: 'Week 2',
        },
      ],
    },
    {
      phase: '3',
      title: 'Dashboard & Launch',
      description: 'Build cost dashboard and deploy to production',
      duration: 'Week 3',
      price: 1000,
      deliverables: [
        {
          id: '3-1',
          title: 'Cost Dashboard',
          description: 'Real-time dashboard showing LLM costs per customer and model',
          status: 'pending',
          deliveryWeek: 'Week 3',
        },
        {
          id: '3-2',
          title: 'Cost Alerting',
          description: 'Configure alerts for cost thresholds and anomalous spending',
          status: 'pending',
          deliveryWeek: 'Week 3',
        },
        {
          id: '3-3',
          title: 'Documentation & Handoff',
          description: 'Complete documentation and team training',
          status: 'pending',
          deliveryWeek: 'Week 3',
        },
      ],
    },
  ];

  const profiles: CustomerProfile[] = [
    {
      id: '1',
      name: 'AI SaaS Founder',
      initials: 'AF',
      stage: 'Seed-Series A',
      mrr: { min: 25000, max: 150000 },
      description: 'Building an AI-powered product but cannot calculate customer margins. LLM costs are a mystery.',
      painPoints: [
        'Cannot calculate true margins',
        'Do not know which customers are profitable',
        'LLM costs growing faster than revenue',
        'Unit economics unknown',
      ],
    },
    {
      id: '2',
      name: 'CTO of AI Startup',
      initials: 'AT',
      stage: 'Series A',
      mrr: { min: 100000, max: 500000 },
      description: 'Engineering leader managing complex AI infrastructure. Needs visibility into cost drivers.',
      painPoints: [
        'Multiple LLM providers',
        'No centralized cost tracking',
        'Cannot attribute costs to features',
        'Performance vs cost tradeoffs unclear',
      ],
    },
    {
      id: '3',
      name: 'Finance/Operations Leader',
      initials: 'FO',
      stage: 'Growth Stage',
      mrr: { min: 200000, max: 1000000 },
      description: 'Responsible for unit economics and margin optimization. Cannot manage what is not measured.',
      painPoints: [
        'No visibility into LLM spend per customer',
        'Cannot calculate CAC/LTV accurately',
        'Budgeting and forecasting impossible',
        'Revenue recognition complicated by usage costs',
      ],
    },
  ];

  const relatedServices: RelatedService[] = [
    {
      id: '1',
      title: 'Billing Audit',
      description: 'Identify revenue leaks and cost optimization opportunities. $1.5K-3K, 1 week.',
      href: '/services/billing-audit',
      badge: 'Start Here',
    },
    {
      id: '2',
      title: 'Usage-Based Pricing',
      description: 'Bill customers based on actual LLM usage. $3K-5K, 2 weeks.',
      href: '/services/usage-pricing',
    },
    {
      id: '3',
      title: 'Complete Billing',
      description: 'AI tracking + usage pricing + payment recovery all in one. $8K-15K.',
      href: '/services/complete-billing',
      badge: 'Best Value',
    },
    {
      id: '4',
      title: 'Payment Recovery',
      description: 'Recover 65-70% of failed payments. $2K-4K, 1 week.',
      href: '/services/payment-recovery',
    },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do you track LLM costs?',
      answer: 'I implement middleware that intercepts LLM API calls, extracts token usage and model information from responses, and stores it with customer attribution. Supports OpenAI, Anthropic, OpenRouter (400+ models), Cohere, and Replicate.',
      category: 'Technical',
    },
    {
      id: '2',
      question: 'Will this slow down my API calls?',
      answer: 'No. The middleware is non-blocking. It extracts cost data asynchronously after the LLM response is received. Your API latency is unaffected.',
      category: 'Performance',
    },
    {
      id: '3',
      question: 'What if I use multiple LLM providers?',
      answer: 'That is the point. I track costs across all providers in one place. You can see total costs per customer, broken down by provider and model.',
      category: 'Technical',
    },
    {
      id: '4',
      question: 'Can I track costs per feature or endpoint?',
      answer: 'Yes. The tracking system captures which endpoint or feature triggered each LLM call. You can see which features are driving costs.',
      category: 'Features',
    },
    {
      id: '5',
      question: 'How do you handle different pricing models?',
      answer: 'Each provider has different pricing (per-token, per-minute, per-character). The system pulls current pricing from provider APIs and calculates costs accurately.',
      category: 'Pricing',
    },
    {
      id: '6',
      question: 'I built Margin. Now I will build it for you.',
      answer: 'That is not a question, but it is relevant. I built an LLM cost tracking platform called Margin. I extracted the core tracking code and now offer it as a service.',
      category: 'About',
    },
  ];

  const metrics: Metric[] = [
    {
      id: '1',
      label: 'Providers Supported',
      value: 5,
      suffix: ' providers',
      description: 'OpenAI, Anthropic, OpenRouter, Cohere, Replicate',
      progress: 100,
      trend: 'neutral',
    },
    {
      id: '2',
      label: 'Models Tracked',
      value: 400,
      suffix: '+',
      description: 'Every model across all providers',
      progress: 100,
      trend: 'up',
    },
    {
      id: '3',
      label: 'Implementation Time',
      value: 3,
      suffix: ' weeks',
      description: 'From zero to cost visibility',
      progress: 100,
      trend: 'neutral',
    },
    {
      id: '4',
      label: 'Test Coverage',
      value: 99.5,
      suffix: '%',
      description: '866/871 tests passing',
      progress: 99.5,
      trend: 'up',
    },
  ];

  const dashboardViews: DashboardView[] = [
    {
      id: '1',
      title: 'Customer Costs',
      description: 'LLM costs per customer this month with trend visualization',
      imageSrc: '/images/dashboard/ai-customer-costs.png',
      imageAlt: 'Dashboard showing LLM costs per customer with monthly trends',
      device: 'desktop',
    },
    {
      id: '2',
      title: 'Model Breakdown',
      description: 'Costs by model and provider (GPT-4, Claude, etc.)',
      imageSrc: '/images/dashboard/ai-model-breakdown.png',
      imageAlt: 'Dashboard showing cost breakdown by LLM model and provider',
      device: 'desktop',
    },
    {
      id: '3',
      title: 'Token Usage',
      description: 'Prompt vs completion tokens, cost per request',
      imageSrc: '/images/dashboard/ai-token-usage.png',
      imageAlt: 'Dashboard showing token usage with prompt vs completion breakdown',
      device: 'desktop',
    },
    {
      id: '4',
      title: 'Feature Attribution',
      description: 'Which features or endpoints are driving LLM costs',
      imageSrc: '/images/dashboard/ai-feature-attribution.png',
      imageAlt: 'Dashboard showing LLM cost attribution by feature and endpoint',
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
            <span className="text-muted-foreground font-medium">2-3 weeks</span>
            <span className="text-muted-foreground">•</span>
            <DollarSign className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground font-medium">$3,000-5,000</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            AI Cost Visibility System
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            Your margins are a black box. I built a flashlight.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Track LLM costs per customer across OpenAI, Anthropic, and OpenRouter (400+ models).
            Know your true margins. Stop losing money on heavy users.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 md:py-16 space-y-12">
        <TechnicalProof
          title="Built on Production-Tested Infrastructure"
          subtitle="I built Margin, an LLM cost tracking platform. Now I will build it for you."
          metrics={metrics}
        />
      </section>

      {/* Problems */}
      <section className="py-12 md:py-16 space-y-12">
        <ProblemSection
          title="Why Your AI Costs Are Invisible"
          subtitle="You cannot optimize what you cannot see. LLM costs are scattered, unattributed, and growing."
          problems={problems}
          alertMessage={{
            title: 'The Margin Panic',
            description: 'Some customers cost more in LLM expenses than they pay in subscription. You do not know who they are until it is too late.',
          }}
        />
      </section>

      {/* Solution */}
      <section className="py-12 md:py-16 space-y-12">
        <SolutionSection
          title="The AI.RIO Solution"
          subtitle="Multi-provider cost tracking with per-customer attribution."
          features={features}
          layout="grid"
        />
      </section>

      {/* Dashboard Showcase */}
      <section className="py-12 md:py-16 space-y-12">
        <DashboardShowcase
          title="Live Cost Dashboard"
          subtitle="See your LLM costs per customer, per model, in real-time."
          views={dashboardViews}
        />
      </section>

      {/* Deliverables */}
      <section className="py-12 md:py-16 space-y-12">
        <DeliverablesSection
          locale={locale}
          title="What You Will Get"
          subtitle="Fixed scope, fixed price. Cost visibility in 2-3 weeks."
          phases={phases}
          totalPrice={5000}
          cta={{
            label: 'Get Cost Visibility',
            href: '/contact?service=ai-tracking',
          }}
        />
      </section>

      {/* Who For */}
      <section className="py-12 md:py-16 space-y-12">
        <WhoForSection
          locale={locale}
          title="Who This Is For"
          subtitle="AI SaaS companies with significant LLM costs and zero visibility."
          profiles={profiles}
        />
      </section>

      {/* Related Services */}
      <section className="py-12 md:py-16 space-y-12">
        <RelatedServices
          locale={locale}
          title="Related Services"
          subtitle="Cost tracking is powerful. Combine it with these for maximum impact."
          services={relatedServices}
          layout="grid"
        />
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 space-y-12">
        <FAQSection
          locale={locale}
          title="Frequently Asked Questions"
          subtitle="Questions about AI cost tracking implementation."
          faqs={faqs}
        />
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 space-y-12">
        <CTASection
          title="Know Your True Margins"
          subtitle="Your margins are a black box. I built a flashlight."
          description="Book a free discovery call. I will audit your LLM cost tracking gaps and provide a fixed quote."
          primaryAction={{
            label: 'Book Discovery Call',
            href: '/contact?service=ai-tracking',
            icon: <Calendar className="h-5 w-5" />,
          }}
          secondaryAction={{
            label: 'See Billing Audit',
            href: '/services/billing-audit',
            variant: 'outline',
            icon: <ArrowRight className="h-5 w-5" />,
          }}
          badge="I built Margin for this"
          trustSignals={[
            'Response within 24 hours',
            '2-3 week implementation',
            '5 providers supported',
            '99.5% test coverage',
          ]}
        />
      </section>
    </>
  );
}
