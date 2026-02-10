import {
  ProblemSection,
  SolutionSection,
  DeliverablesSection,
  WhoForSection,
  RelatedServices,
  FAQSection,
  CTASection,
  TechnicalProof,
  type ProblemPoint,
  type FeatureItem,
  type PhaseDeliverables,
  type CustomerProfile,
  type RelatedService,
  type FAQItem,
  type Metric,
} from '@/components/service-sections';
import { generatePageMetadata } from '@/lib/metadata/page-metadata';
import { Search, DollarSign, Clock, ArrowRight, Calendar, AlertTriangle, FileText, CheckCircle2, TrendingDown } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as any,
    namespace: 'billingAudit',
    path: '/services/billing-audit',
  });
}

export default async function BillingAuditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const problems: ProblemPoint[] = [
    {
      id: '1',
      title: 'Revenue Leaks Everywhere',
      description: 'Failed payments, unattributed LLM costs, proration errors, and edge cases are leaking revenue every month. You cannot see them.',
      severity: 'high',
      metric: '5-15% revenue leakage typical',
    },
    {
      id: '2',
      title: 'No Billing Visibility',
      description: 'You do not know your failed payment recovery rate, customer acquisition costs, or true margins per customer.',
      severity: 'high',
    },
    {
      id: '3',
      title: 'Edge Cases Breaking Revenue',
      description: 'Upgrades, downgrades, trials, coupons, and proration create edge cases that default Stripe configs do not handle.',
      severity: 'medium',
    },
    {
      id: '4',
      title: ' unsure What to Fix First',
      description: 'You know billing needs work, but you do not know where to start. Everything feels broken.',
      severity: 'medium',
    },
  ];

  const features: FeatureItem[] = [
    {
      id: '1',
      title: 'Revenue Leak Detection',
      description: 'Identify exactly where you are losing money: failed payments, proration errors, uncollected revenue, and cost attribution gaps.',
      icon: <TrendingDown className="h-6 w-6" />,
      badge: '5-15% revenue recovered',
      highlighted: true,
    },
    {
      id: '2',
      title: 'Stripe Configuration Audit',
      description: 'Complete review of your Stripe settings, dunning rules, webhooks, tax settings, and payment method configuration.',
      icon: <Search className="h-6 w-6" />,
    },
    {
      id: '3',
      title: 'Edge Case Documentation',
      description: 'Document every billing edge case: trials, coupons, proration, plan changes, annual/monthly switching, and enterprise flows.',
      icon: <AlertTriangle className="h-6 w-6" />,
    },
    {
      id: '4',
      title: 'Cost Attribution Analysis',
      description: 'Map LLM costs to customers. Identify which customers are unprofitable and why.',
      icon: <DollarSign className="h-6 w-6" />,
    },
    {
      id: '5',
      title: 'Competitor Benchmarking',
      description: 'Compare your billing practices to market standards: usage pricing, payment recovery, cost tracking.',
      icon: <FileText className="h-6 w-6" />,
    },
    {
      id: '6',
      title: 'Remediation Roadmap',
      description: 'Prioritized action plan with clear ROI estimates. Fix what matters most first.',
      icon: <CheckCircle2 className="h-6 w-6" />,
      badge: 'Clear next steps',
    },
  ];

  const phases: PhaseDeliverables[] = [
    {
      phase: '1',
      title: 'Data Collection & Analysis',
      description: 'Gather billing data and analyze current state',
      duration: 'Days 1-2',
      price: 750,
      deliverables: [
        {
          id: '1-1',
          title: 'Stripe Configuration Review',
          description: 'Extract and analyze all Stripe settings, webhooks, and product configurations',
          status: 'pending',
          deliveryWeek: 'Day 1',
        },
        {
          id: '1-2',
          title: 'Revenue Data Analysis',
          description: 'Analyze payment history, failed payments, refunds, and revenue trends',
          status: 'pending',
          deliveryWeek: 'Day 1-2',
        },
        {
          id: '1-3',
          title: 'Cost Attribution Mapping',
          description: 'Map LLM and infrastructure costs to customer accounts where possible',
          status: 'pending',
          deliveryWeek: 'Day 2',
        },
      ],
    },
    {
      phase: '2',
      title: 'Gap Identification',
      description: 'Identify revenue leaks and optimization opportunities',
      duration: 'Days 3-4',
      price: 1250,
      deliverables: [
        {
          id: '2-1',
          title: 'Revenue Leak Analysis',
          description: 'Quantify revenue lost to failed payments, proration errors, and uncollected revenue',
          status: 'pending',
          deliveryWeek: 'Day 3',
        },
        {
          id: '2-2',
          title: 'Edge Case Documentation',
          description: 'Document all billing edge cases and identify gaps in handling',
          status: 'pending',
          deliveryWeek: 'Day 3-4',
        },
        {
          id: '2-3',
          title: 'Competitive Benchmarking',
          description: 'Compare billing practices to market standards and identify gaps',
          status: 'pending',
          deliveryWeek: 'Day 4',
        },
      ],
    },
    {
      phase: '3',
      title: 'Roadmap & Recommendations',
      description: 'Create prioritized remediation plan',
      duration: 'Day 5',
      price: 1000,
      deliverables: [
        {
          id: '3-1',
          title: 'Remediation Roadmap',
          description: 'Prioritized action plan with ROI estimates for each improvement',
          status: 'pending',
          deliveryWeek: 'Day 5',
        },
        {
          id: '3-2',
          title: 'Executive Summary',
          description: 'Clear summary of findings, recommendations, and next steps for leadership',
          status: 'pending',
          deliveryWeek: 'Day 5',
        },
        {
          id: '3-3',
          title: 'Implementation Quotes',
          description: 'Fixed-price quotes for implementing any recommended improvements',
          status: 'pending',
          deliveryWeek: 'Day 5',
        },
      ],
    },
  ];

  const profiles: CustomerProfile[] = [
    {
      id: '1',
      name: 'SaaS Founder',
      initials: 'SF',
      stage: 'Seed-Series B',
      mrr: { min: 50000, max: 500000 },
      description: 'Knows billing needs work but unsure where to start. Needs clarity and ROI estimates.',
      painPoints: [
        'Revenue leaks unidentified',
        'Do not know what to fix first',
        'No visibility into billing health',
        'Budget needs ROI justification',
      ],
    },
    {
      id: '2',
      name: 'Finance Leader',
      initials: 'FL',
      stage: 'Growth Stage',
      mrr: { min: 200000, max: 2000000 },
      description: 'Responsible for margin optimization. Needs data to prioritize improvements.',
      painPoints: [
        'Cannot quantify revenue leaks',
        'No billing metrics dashboard',
        'Unit economics unclear',
        'Need ROI for improvements',
      ],
    },
    {
      id: '3',
      name: 'New CTO/Head of Revenue',
      initials: 'NR',
      stage: 'Any Stage',
      mrr: { min: 100000, max: 5000000 },
      description: 'New role and needs to understand billing infrastructure quickly. Comprehensive audit provides foundation.',
      painPoints: [
        'Inherited billing system',
        'Do not know what is broken',
        'Need quick assessment',
        'Must build credibility fast',
      ],
    },
  ];

  const relatedServices: RelatedService[] = [
    {
      id: '1',
      title: 'Payment Recovery',
      description: 'Implement failed payment recovery based on audit findings. $2K-4K, 1 week.',
      href: '/services/payment-recovery',
      badge: 'Quick Win',
    },
    {
      id: '2',
      title: 'AI Cost Tracking',
      description: 'Implement LLM cost tracking based on audit gaps. $3K-5K, 2-3 weeks.',
      href: '/services/ai-tracking',
    },
    {
      id: '3',
      title: 'Complete Billing',
      description: 'Implement all audit recommendations in one project. $8K-15K, 4-6 weeks.',
      href: '/services/complete-billing',
      badge: 'Best Value',
    },
    {
      id: '4',
      title: 'Usage-Based Pricing',
      description: 'Launch usage pricing if audit shows it is right for your market. $3K-5K, 2 weeks.',
      href: '/services/usage-pricing',
    },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'What do I actually get from the audit?',
      answer: 'A complete report identifying every revenue leak, every billing gap, and every optimization opportunity. Plus a prioritized roadmap with ROI estimates and fixed-price quotes for implementing any recommendation.',
      category: 'Deliverables',
    },
    {
      id: '2',
      question: 'How long does the audit take?',
      answer: '3-5 business days. Most of that time is analyzing data and documenting findings. You will have the complete report within a week.',
      category: 'Timeline',
    },
    {
      id: '3',
      question: 'What data do you need access to?',
      answer: 'Stripe account access (read-only), billing system documentation, and access to any cost tracking or usage data you have. I will guide you through exactly what is needed.',
      category: 'Process',
    },
    {
      id: '4',
      question: 'Will the audit disrupt my billing operations?',
      answer: 'No. The audit is read-only. I analyze data and configuration. No changes are made to your billing system during the audit.',
      category: 'Process',
    },
    {
      id: '5',
      question: 'What if I do not implement the recommendations?',
      answer: 'That is fine. The report is yours to keep. You can implement whenever you want, use it to justify budget, or share with your team for context. No obligation.',
      category: 'Post-Audit',
    },
    {
      id: '6',
      question: 'Do you implement the recommendations?',
      answer: 'Yes. I provide fixed-price quotes for implementing any recommendation. Many clients use the audit report to get budget approval, then hire me to implement.',
      category: 'Implementation',
    },
  ];

  const metrics: Metric[] = [
    {
      id: '1',
      label: 'Avg Revenue Leakage',
      value: 10,
      suffix: '%',
      progress: 10,
      trend: 'down',
      description: 'Typical revenue lost to billing gaps',
    },
    {
      id: '2',
      label: 'Audit Duration',
      value: 4,
      suffix: ' days',
      progress: 40,
      trend: 'neutral',
      description: 'From kickoff to final report',
    },
    {
      id: '3',
      label: 'ROI Multiple',
      value: 55,
      suffix: 'x',
      prefix: '10-100',
      progress: 55,
      trend: 'up',
      description: 'Typical ROI from implementing recommendations',
    },
    {
      id: '4',
      label: 'Implementation Time',
      value: 4,
      suffix: ' weeks',
      prefix: '1-6',
      progress: 40,
      trend: 'neutral',
      description: 'Depending on recommendations',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 space-y-6">
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground font-medium">1 week</span>
            <span className="text-muted-foreground">•</span>
            <DollarSign className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <span className="text-muted-foreground font-medium">$1,500-3,000</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Billing Audit & Revenue Leak Detection
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            Find where you are losing money. Fix what matters most.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Complete audit of your billing infrastructure to identify revenue leaks, edge cases,
            and optimization opportunities. Clear remediation roadmap with ROI estimates.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 md:py-16 space-y-12">
        <TechnicalProof
          title="The Cost of Invisible Leaks"
          subtitle="Most companies leak 5-15% of revenue to billing gaps. You cannot fix what you cannot see."
          metrics={metrics}
        />
      </section>

      {/* Problems */}
      <section className="py-12 md:py-16 space-y-12">
        <ProblemSection
          title="Why You Need a Billing Audit"
          subtitle="Your billing infrastructure has gaps. You need to know where and how much they are costing you."
          problems={problems}
          alertMessage={{
            title: 'Revenue Leaks Are Silent',
            description: 'Failed payments, proration errors, and unattributed costs do not show up in your MRR chart. They just silently drain revenue every month.',
          }}
        />
      </section>

      {/* Solution */}
      <section className="py-12 md:py-16 space-y-12">
        <SolutionSection
          title="What I Audit"
          subtitle="Comprehensive analysis of your entire billing infrastructure."
          features={features}
          layout="grid"
        />
      </section>

      {/* Deliverables */}
      <section className="py-12 md:py-16 space-y-12">
        <DeliverablesSection
          locale={locale}
          title="What You Will Get"
          subtitle="Fixed scope, fixed price. Complete audit in 3-5 days."
          phases={phases}
          totalPrice={3000}
          cta={{
            label: 'Start Billing Audit',
            href: '/contact?service=billing-audit',
          }}
        />
      </section>

      {/* Who For */}
      <section className="py-12 md:py-16 space-y-12">
        <WhoForSection
          locale={locale}
          title="Who This Is For"
          subtitle="SaaS companies who need clarity on billing priorities and ROI estimates."
          profiles={profiles}
        />
      </section>

      {/* Related Services */}
      <section className="py-12 md:py-16 space-y-12">
        <RelatedServices
          locale={locale}
          title="Related Services"
          subtitle="After the audit, these services implement the recommendations."
          services={relatedServices}
          layout="grid"
        />
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 space-y-12">
        <FAQSection
          locale={locale}
          title="Frequently Asked Questions"
          subtitle="Questions about the billing audit process and deliverables."
          faqs={faqs}
        />
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 space-y-12">
        <CTASection
          title="Find Your Revenue Leaks"
          subtitle="You cannot fix what you cannot see. Let me shine a light on your billing gaps."
          description="Book a free discovery call. I will explain the audit process and provide a fixed quote."
          primaryAction={{
            label: 'Book Discovery Call',
            href: '/contact?service=billing-audit',
            icon: <Calendar className="h-5 w-5" />,
          }}
          secondaryAction={{
            label: 'See Complete Billing',
            href: '/services/complete-billing',
            variant: 'outline',
            icon: <ArrowRight className="h-5 w-5" />,
          }}
          badge="3-5 day turnaround"
          trustSignals={[
            'Response within 24 hours',
            'Read-only audit (no changes)',
            'Clear ROI estimates',
            'Fixed-price implementation quotes',
          ]}
        />
      </section>
    </>
  );
}
