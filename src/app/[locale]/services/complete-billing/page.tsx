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
import { Shield, Clock, DollarSign, ArrowRight, Calendar, Zap, CreditCard, BarChart3, Database } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as any,
    namespace: 'completeBilling',
    path: '/services/complete-billing',
  });
}

export default async function CompleteBillingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const problems: ProblemPoint[] = [
    {
      id: '1',
      title: 'No Billing Foundation',
      description: 'Your AI SaaS has no billing infrastructure. You are using default Stripe settings and losing revenue to failed payments, unattributed costs, and manual processes.',
      severity: 'critical',
      metric: '20-30%+ revenue at risk',
    },
    {
      id: '2',
      title: 'Multiple Vendors, Fragmented Solution',
      description: 'You could hire different vendors for payment recovery, usage pricing, cost tracking, and audit. Integrations will break, costs will compound, and accountability will be unclear.',
      severity: 'high',
    },
    {
      id: '3',
      title: 'Engineering Team Distracted',
      description: 'Your engineers want to build product features, not billing infrastructure. Every sprint spent on billing is a feature not shipped.',
      severity: 'high',
    },
    {
      id: '4',
      title: 'Time to Market Pressure',
      description: 'Competitors are launching with usage pricing, better margins, and faster recovery. You need billing infrastructure now.',
      severity: 'medium',
    },
  ];

  const features: FeatureItem[] = [
    {
      id: '1',
      title: 'Failed Payment Recovery',
      description: 'Automated dunning workflows that recover 65-70% of failed payments. Stop leaving revenue on the table.',
      icon: <CreditCard className="h-6 w-6" />,
      badge: '+17.4% recovery',
      highlighted: true,
    },
    {
      id: '2',
      title: 'Usage-Based Pricing',
      description: 'Launch Stripe Meter in 2 weeks. Companies with usage pricing grow 54% faster.',
      icon: <Zap className="h-6 w-6" />,
      badge: '54% faster growth',
    },
    {
      id: '3',
      title: 'AI Cost Tracking',
      description: 'Track LLM costs per customer across 5 providers (400+ models). Know your true margins.',
      icon: <BarChart3 className="h-6 w-6" />,
      badge: '5 providers',
    },
    {
      id: '4',
      title: 'Billing Audit & Roadmap',
      description: 'Identify revenue leaks and create a prioritized optimization roadmap.',
      icon: <Database className="h-6 w-6" />,
    },
    {
      id: '5',
      title: 'Edge Case Coordinator',
      description: '720-line system handling upgrades, downgrades, proration, trials, coupons, and more.',
      icon: <Shield className="h-6 w-6" />,
      badge: 'Production-grade',
    },
    {
      id: '6',
      title: '90-Day Guarantee',
      description: 'If anything breaks within 90 days, I fix it. No questions, no additional cost.',
      icon: <Shield className="h-6 w-6" />,
      badge: 'Peace of mind',
    },
  ];

  const phases: PhaseDeliverables[] = [
    {
      phase: '1',
      title: 'Audit & Strategy',
      description: 'Complete billing audit and implementation roadmap',
      duration: 'Week 1',
      price: 2000,
      deliverables: [
        {
          id: '1-1',
          title: 'Billing Infrastructure Audit',
          description: 'Complete analysis of current setup, gaps, and revenue leaks',
          status: 'pending',
          deliveryWeek: 'Week 1',
        },
        {
          id: '1-2',
          title: 'Implementation Roadmap',
          description: 'Prioritized plan with clear milestones and timeline',
          status: 'pending',
          deliveryWeek: 'Week 1',
        },
        {
          id: '1-3',
          title: 'Edge Case Documentation',
          description: 'Document all billing edge cases and handling requirements',
          status: 'pending',
          deliveryWeek: 'Week 1',
        },
      ],
    },
    {
      phase: '2',
      title: 'Foundation: Recovery & Audit',
      description: 'Implement payment recovery and complete billing audit',
      duration: 'Week 2',
      price: 4000,
      deliverables: [
        {
          id: '2-1',
          title: 'Payment Recovery System',
          description: 'Automated dunning workflows with 65-70% recovery rate',
          status: 'pending',
          deliveryWeek: 'Week 2',
        },
        {
          id: '2-2',
          title: 'Billing Audit Report',
          description: 'Detailed report of all billing gaps and optimization opportunities',
          status: 'pending',
          deliveryWeek: 'Week 2',
        },
        {
          id: '2-3',
          title: 'Revenue Leak Fixes',
          description: 'Fix immediate revenue leaks identified in audit',
          status: 'pending',
          deliveryWeek: 'Week 2',
        },
      ],
    },
    {
      phase: '3',
      title: 'Usage & Cost Tracking',
      description: 'Implement usage-based pricing and AI cost tracking',
      duration: 'Weeks 3-4',
      price: 5000,
      deliverables: [
        {
          id: '3-1',
          title: 'Stripe Meter Implementation',
          description: 'Usage-based pricing infrastructure with event tracking',
          status: 'pending',
          deliveryWeek: 'Week 3',
        },
        {
          id: '3-2',
          title: 'LLM Cost Tracking',
          description: 'Multi-provider cost tracking with customer attribution',
          status: 'pending',
          deliveryWeek: 'Week 3-4',
        },
        {
          id: '3-3',
          title: 'Usage & Cost Dashboards',
          description: 'Real-time dashboards for usage and costs per customer',
          status: 'pending',
          deliveryWeek: 'Week 4',
        },
      ],
    },
    {
      phase: '4',
      title: 'Integration & Testing',
      description: 'Integrate all systems and rigorous testing',
      duration: 'Week 5',
      price: 2500,
      deliverables: [
        {
          id: '4-1',
          title: 'Edge Case Coordinator',
          description: '720-line system handling all billing edge cases',
          status: 'pending',
          deliveryWeek: 'Week 5',
        },
        {
          id: '4-2',
          title: 'Test Suite Execution',
          description: 'Run 866+ tests covering all scenarios',
          status: 'pending',
          deliveryWeek: 'Week 5',
        },
        {
          id: '4-3',
          title: 'Integration Testing',
          description: 'Verify all systems work together correctly',
          status: 'pending',
          deliveryWeek: 'Week 5',
        },
      ],
    },
    {
      phase: '5',
      title: 'Launch & Support',
      description: 'Production deployment and extended support',
      duration: 'Week 6',
      price: 1500,
      deliverables: [
        {
          id: '5-1',
          title: 'Production Deployment',
          description: 'Deploy to production with monitoring and alerts',
          status: 'pending',
          deliveryWeek: 'Week 6',
        },
        {
          id: '5-2',
          title: 'Documentation & Handoff',
          description: 'Complete documentation and team training',
          status: 'pending',
          deliveryWeek: 'Week 6',
        },
        {
          id: '5-3',
          title: '90-Day Guarantee',
          description: 'Full support and bug fixes for 90 days post-launch',
          status: 'pending',
          deliveryWeek: 'Weeks 6-18',
        },
      ],
    },
  ];

  const profiles: CustomerProfile[] = [
    {
      id: '1',
      name: 'Series A AI SaaS Founder',
      initials: 'AF',
      stage: 'Series A',
      mrr: { min: 100000, max: 500000 },
      description: 'Scaling fast with no billing foundation. Needs everything, needs it now, and needs it to work.',
      painPoints: [
        'No billing infrastructure',
        'Revenue leaking from gaps',
        'Engineering team distracted',
        'Competitors moving faster',
      ],
    },
    {
      id: '2',
      name: 'Growth-Stage CTO',
      initials: 'GC',
      stage: 'Growth Stage',
      mrr: { min: 500000, max: 2000000 },
      description: 'Technical leader who wants one vendor, one integration, and clear accountability. No fragmenting across vendors.',
      painPoints: [
        'Multiple vendor risk',
        'Integration complexity',
        'Accountability fragmentation',
        'Engineering team bandwidth',
      ],
    },
    {
      id: '3',
      name: 'Pre-IPO VP of Engineering',
      initials: 'PE',
      stage: 'Late Stage',
      mrr: { min: 2000000, max: 10000000 },
      description: 'Building robust infrastructure before IPO. Wants production-grade billing with guarantees.',
      painPoints: [
        'Need production-grade systems',
        'Compliance and audit readiness',
        'Scalability requirements',
        'Risk mitigation critical',
      ],
    },
  ];

  const relatedServices: RelatedService[] = [
    {
      id: '1',
      title: 'Payment Recovery',
      description: 'Just need payment recovery? $2K-4K, 1 week.',
      href: '/services/payment-recovery',
    },
    {
      id: '2',
      title: 'Usage-Based Pricing',
      description: 'Just need usage pricing? $3K-5K, 2 weeks.',
      href: '/services/usage-pricing',
    },
    {
      id: '3',
      title: 'AI Cost Tracking',
      description: 'Just need cost tracking? $3K-5K, 2-3 weeks.',
      href: '/services/ai-tracking',
    },
    {
      id: '4',
      title: 'Billing Audit',
      description: 'Start with an audit to assess needs. $1.5K-3K, 1 week.',
      href: '/services/billing-audit',
      badge: 'Start Here',
    },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'Why bundle instead of buying services separately?',
      answer: 'Three reasons: (1) Cost - bundled pricing is 15-25% less than buying separately. (2) Integration - one vendor means everything works together seamlessly. (3) Accountability - single point of contact, no finger-pointing when something breaks.',
      category: 'Value',
    },
    {
      id: '2',
      question: 'What does the 90-day guarantee cover?',
      answer: 'Everything. If any part of the billing infrastructure breaks within 90 days of launch, I fix it. No additional cost, no questions. This covers bugs, edge cases, integration issues, anything.',
      category: 'Guarantee',
    },
    {
      id: '3',
      question: 'How long does the complete implementation take?',
      answer: '4-6 weeks from start to production launch. Some phases can run in parallel, and I can adjust timeline based on your urgency.',
      category: 'Timeline',
    },
    {
      id: '4',
      question: 'What if I already have some billing infrastructure?',
      answer: 'I build on what you have. The initial audit identifies what exists and what is missing. You only pay for what you need. Complete billing is scoped to your specific situation.',
      category: 'Customization',
    },
    {
      id: '5',
      question: 'Do I need my engineering team involved?',
      answer: 'Minimally. I need a few hours for requirements gathering, access to systems, and a review of the implementation. Your team can focus on product features.',
      category: 'Process',
    },
    {
      id: '6',
      question: 'What if I need changes after the 90 days?',
      answer: 'I offer ongoing support packages, or your team can take over. The code is documented and tested, so any competent engineer can maintain it.',
      category: 'Support',
    },
  ];

  const metrics: Metric[] = [
    {
      id: '1',
      label: 'Services Included',
      value: 4,
      suffix: ' services',
      description: 'Payment recovery, usage pricing, cost tracking, audit',
      progress: 100,
      trend: 'neutral',
    },
    {
      id: '2',
      label: 'Implementation Time',
      value: 6,
      suffix: ' weeks',
      description: 'From start to production',
      progress: 100,
      trend: 'neutral',
    },
    {
      id: '3',
      label: 'Test Coverage',
      value: 99.5,
      suffix: '%',
      description: '866/871 tests passing',
      progress: 99.5,
      trend: 'up',
    },
    {
      id: '4',
      label: 'Guarantee Period',
      value: 90,
      suffix: ' days',
      description: 'Full support included',
      progress: 100,
      trend: 'up',
    },
  ];

  const dashboardViews: DashboardView[] = [
    {
      id: '1',
      title: 'Margin Overview',
      description: 'True margins per customer after accounting for LLM costs',
      imageSrc: '/images/dashboard/billing-margin-overview.png',
      imageAlt: 'Dashboard showing true profit margins per customer after LLM costs',
      device: 'desktop',
    },
    {
      id: '2',
      title: 'Revenue Recovery',
      description: 'Failed payments recovered and revenue saved',
      imageSrc: '/images/dashboard/billing-revenue-recovery.png',
      imageAlt: 'Dashboard showing failed payment recovery metrics and revenue saved',
      device: 'desktop',
    },
    {
      id: '3',
      title: 'Usage Trends',
      description: 'Customer usage patterns and projected billing',
      imageSrc: '/images/dashboard/billing-usage-trends.png',
      imageAlt: 'Dashboard showing customer usage patterns and billing projections',
      device: 'desktop',
    },
    {
      id: '4',
      title: 'Cost Attribution',
      description: 'LLM costs broken down by provider, model, and customer',
      imageSrc: '/images/dashboard/billing-cost-attribution.png',
      imageAlt: 'Dashboard showing LLM cost breakdown by provider, model, and customer',
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
            <span className="text-muted-foreground font-medium">4-6 weeks</span>
            <span className="text-muted-foreground">•</span>
            <DollarSign className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground font-medium">$8,000-15,000</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Complete Billing Foundation
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            End-to-end billing infrastructure for AI SaaS. All services integrated.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Payment recovery, usage-based pricing, AI cost tracking, and billing audit.
            One vendor, one integration, 90-day guarantee.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 md:py-16 space-y-12">
        <TechnicalProof
          title="Everything You Need, Nothing You Do Not"
          subtitle="Four essential services. One implementation. Complete accountability."
          metrics={metrics}
        />
      </section>

      {/* Problems */}
      <section className="py-12 md:py-16 space-y-12">
        <ProblemSection
          title="Why Fragmented Billing Fails"
          subtitle="Multiple vendors, integrations, and finger-pointing. You need one solution that actually works."
          problems={problems}
          alertMessage={{
            title: 'The Integration Nightmare',
            description: 'Payment recovery from vendor A, usage pricing from vendor B, cost tracking from vendor C. When they do not integrate, you are stuck in the middle debugging.',
          }}
        />
      </section>

      {/* Solution */}
      <section className="py-12 md:py-16 space-y-12">
        <SolutionSection
          title="The Complete AI.RIO Solution"
          subtitle="Four services, one implementation, single point of accountability."
          features={features}
          layout="grid"
        />
      </section>

      {/* Dashboard Showcase */}
      <section className="py-12 md:py-16 space-y-12">
        <DashboardShowcase
          title="Unified Billing Dashboard"
          subtitle="One dashboard for margins, recovery, usage, and costs."
          views={dashboardViews}
        />
      </section>

      {/* Deliverables */}
      <section className="py-12 md:py-16 space-y-12">
        <DeliverablesSection
          locale={locale}
          title="What You Will Get"
          subtitle="Phased delivery with clear milestones. Production-ready in 4-6 weeks."
          phases={phases}
          totalPrice={15000}
          cta={{
            label: 'Build Complete Billing',
            href: '/contact?service=complete-billing',
          }}
        />
      </section>

      {/* Who For */}
      <section className="py-12 md:py-16 space-y-12">
        <WhoForSection
          locale={locale}
          title="Who This Is For"
          subtitle="AI SaaS companies who need complete billing infrastructure, not fragmented point solutions."
          profiles={profiles}
        />
      </section>

      {/* Related Services */}
      <section className="py-12 md:py-16 space-y-12">
        <RelatedServices
          locale={locale}
          title="Individual Services"
          subtitle="Do not need everything? Each service is available separately."
          services={relatedServices}
          layout="grid"
        />
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 space-y-12">
        <FAQSection
          locale={locale}
          title="Frequently Asked Questions"
          subtitle="Questions about the complete billing package."
          faqs={faqs}
        />
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 space-y-12">
        <CTASection
          title="Ready for Complete Billing Infrastructure?"
          subtitle="One vendor. One integration. 90-day guarantee."
          description="Book a free discovery call. I will audit your billing situation and provide a fixed quote for the complete package."
          primaryAction={{
            label: 'Book Discovery Call',
            href: '/contact?service=complete-billing',
            icon: <Calendar className="h-5 w-5" />,
          }}
          secondaryAction={{
            label: 'Start with Audit',
            href: '/services/billing-audit',
            variant: 'outline',
            icon: <ArrowRight className="h-5 w-5" />,
          }}
          badge="15-25% cheaper than buying separately"
          trustSignals={[
            'Response within 24 hours',
            '4-6 week implementation',
            '90-day guarantee',
            'Single point of accountability',
          ]}
        />
      </section>
    </>
  );
}
