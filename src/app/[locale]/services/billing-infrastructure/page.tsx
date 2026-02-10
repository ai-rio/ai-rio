import type { Metadata } from 'next';
import {
  ProblemSection,
  SolutionSection,
  DeliverablesSection,
  WhoForSection,
  RelatedServices,
  FAQSection,
  CTASection,
  type ProblemPoint,
  type FeatureItem,
  type PhaseDeliverables,
  type CustomerProfile,
  type RelatedService,
  type FAQItem,
} from '@/components/service-sections';
import { generatePageMetadata } from '@/lib/metadata/page-metadata';
import { Database, Zap, Shield, BarChart3, Clock, DollarSign, CreditCard, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as any,
    namespace: 'services.billingInfrastructure',
    path: '/services/billing-infrastructure',
  });
}

export default async function BillingInfrastructurePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Problem: Complete billing system from scratch - targeting founders in "margin panic"
  const problems: ProblemPoint[] = [
    {
      id: '1',
      title: 'No Billing Foundation',
      description: 'You built an AI SaaS but have no billing infrastructure. Stripe is default, and you are losing revenue to failed payments.',
      severity: 'critical',
      metric: '47.6% default recovery rate',
    },
    {
      id: '2',
      title: 'AI Costs Unattributed',
      description: 'LLM costs are scattered across providers. You cannot calculate customer margins because you do not know who drove OpenAI/Anthropic costs.',
      severity: 'critical',
      metric: '400+ models to track',
    },
    {
      id: '3',
      title: 'Manual Revenue Operations',
      description: 'Your team is manually reconciling invoices, updating usage limits, and handling proration. It does not scale.',
      severity: 'high',
    },
    {
      id: '4',
      title: 'No Usage-Based Pricing',
      description: 'You cannot price based on actual usage. Flat pricing limits growth - usage-based companies grow 54% faster.',
      severity: 'medium',
    },
    {
      id: '5',
      title: 'Revenue Leaks Everywhere',
      description: 'Edge cases like upgrades/downgrades, proration, and failed payments are leaking revenue every month.',
      severity: 'high',
    },
  ];

  // Solution: Complete billing infrastructure built by someone who has done it
  const features: FeatureItem[] = [
    {
      id: '1',
      title: 'Stripe Meter Integration',
      description: 'Implement usage-based pricing in 2 weeks, not 6 months. Track events, aggregate usage, and bill accurately.',
      icon: <Zap className="h-6 w-6" />,
      badge: '54% faster growth',
      highlighted: true,
    },
    {
      id: '2',
      title: 'Failed Payment Recovery',
      description: 'Automated dunning workflows that recover 65-70% of failed payments. Stop leaving revenue on the table.',
      icon: <CreditCard className="h-6 w-6" />,
      badge: '+17.4% recovery',
    },
    {
      id: '3',
      title: 'Multi-Provider LLM Tracking',
      description: 'Track OpenAI, Anthropic, OpenRouter (400+ models) per customer. Know your true margins per account.',
      icon: <BarChart3 className="h-6 w-6" />,
      badge: '5 providers',
    },
    {
      id: '4',
      title: 'Edge Case Handling',
      description: '720-line edge case coordinator handles upgrades, downgrades, proration, trials, and coupon combinations.',
      icon: <Shield className="h-6 w-6" />,
    },
    {
      id: '5',
      title: 'Real-Time Cost Visibility',
      description: 'Dashboard showing LLM costs per customer. No more black box - see exactly where your margins go.',
      icon: <Database className="h-6 w-6" />,
    },
    {
      id: '6',
      title: 'Audit & Documentation',
      description: '45 RLS policies, zero security issues. Complete documentation and handoff for your team.',
      icon: <Shield className="h-6 w-6" />,
      badge: '99.5% test coverage',
    },
  ];

  // Deliverables: Phased approach with clear pricing
  const phases: PhaseDeliverables[] = [
    {
      phase: '1',
      title: 'Discovery & Audit',
      description: 'Understand your billing situation and identify gaps',
      duration: 'Week 1',
      price: 2000,
      deliverables: [
        {
          id: '1-1',
          title: 'Billing Infrastructure Audit',
          description: 'Complete analysis of your current Stripe setup, subscription logic, and revenue operations workflow',
          status: 'pending',
          deliveryWeek: 'Week 1',
        },
        {
          id: '1-2',
          title: 'Edge Case Documentation',
          description: 'Document all billing edge cases: trials, coupons, proration, upgrades/downgrades',
          status: 'pending',
          deliveryWeek: 'Week 1',
        },
        {
          id: '1-3',
          title: 'Cost Attribution Analysis',
          description: 'Map LLM costs to customers. Identify data gaps for tracking AI expenses',
          status: 'pending',
          deliveryWeek: 'Week 1',
        },
      ],
    },
    {
      phase: '2',
      title: 'Foundation Building',
      description: 'Core billing infrastructure and LLM cost tracking',
      duration: 'Weeks 2-3',
      price: 6000,
      deliverables: [
        {
          id: '2-1',
          title: 'Stripe Meter Implementation',
          description: 'Usage-based pricing infrastructure with event tracking and aggregation',
          status: 'pending',
          deliveryWeek: 'Week 2',
        },
        {
          id: '2-2',
          title: 'Multi-Provider LLM Tracking',
          description: 'Track OpenAI, Anthropic, OpenRouter costs per customer with 400+ model support',
          status: 'pending',
          deliveryWeek: 'Week 2-3',
        },
        {
          id: '2-3',
          title: 'Edge Case Coordinator',
          description: '720-line system handling upgrades, downgrades, proration, trials, and coupons',
          status: 'pending',
          deliveryWeek: 'Week 3',
        },
      ],
    },
    {
      phase: '3',
      title: 'Recovery & Optimization',
      description: 'Revenue recovery and dashboard implementation',
      duration: 'Weeks 4-5',
      price: 5000,
      deliverables: [
        {
          id: '3-1',
          title: 'Failed Payment Recovery System',
          description: 'Automated dunning workflows with intelligent retry logic and email sequences',
          status: 'pending',
          deliveryWeek: 'Week 4',
        },
        {
          id: '3-2',
          title: 'Margin Dashboard',
          description: 'Real-time dashboard showing LLM costs and revenue per customer',
          status: 'pending',
          deliveryWeek: 'Week 4-5',
        },
        {
          id: '3-3',
          title: 'Documentation & Handoff',
          description: 'Complete documentation, test suite (99.5% coverage), and team training',
          status: 'pending',
          deliveryWeek: 'Week 5',
        },
      ],
    },
    {
      phase: '4',
      title: 'Testing & Launch',
      description: 'Rigorous testing and production deployment',
      duration: 'Week 6',
      price: 2000,
      deliverables: [
        {
          id: '4-1',
          title: 'Test Suite Execution',
          description: 'Run 866+ tests covering all edge cases and integration scenarios',
          status: 'pending',
          deliveryWeek: 'Week 6',
        },
        {
          id: '4-2',
          title: 'Production Deployment',
          description: 'Deploy to production with monitoring, alerts, and rollback procedures',
          status: 'pending',
          deliveryWeek: 'Week 6',
        },
        {
          id: '4-3',
          title: '30-Day Support',
          description: 'Post-launch support for bug fixes and edge case handling',
          status: 'pending',
          deliveryWeek: 'Week 6-10',
        },
      ],
    },
  ];

  // Who For: Target customer profiles
  const profiles: CustomerProfile[] = [
    {
      id: '1',
      name: 'AI SaaS Founder',
      initials: 'AF',
      stage: 'Seed-Series A',
      mrr: { min: 25000, max: 200000 },
      description: 'Building an AI-powered SaaS with LLM costs eating into margins. Needs visibility and control.',
      painPoints: [
        'Cannot calculate true customer margins',
        'AI costs scattered across providers',
        'No usage-based pricing capability',
        'Revenue leaking from failed payments',
      ],
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      id: '2',
      name: 'CTO of AI Startup',
      initials: 'CT',
      stage: 'Growth Stage',
      mrr: { min: 100000, max: 500000 },
      description: 'Technical leader whose team is drowning in billing edge cases. Needs a robust foundation.',
      painPoints: [
        'Engineering team wasting time on billing',
        'Proration and upgrade edge cases',
        'No scalable billing infrastructure',
        'Security and compliance concerns',
      ],
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: '3',
      name: 'Finance Leader',
      initials: 'FL',
      stage: 'Series B+',
      mrr: { min: 500000, max: 2000000 },
      description: 'Responsible for unit economics and margin optimization. Cannot manage what you cannot measure.',
      painPoints: [
        'No visibility into LLM cost drivers',
        'Cannot attribute AI costs to customers',
        'Manual revenue operations processes',
        'Revenue leaks going undetected',
      ],
      icon: <BarChart3 className="h-4 w-4" />,
    },
  ];

  // Related Services
  const relatedServices: RelatedService[] = [
    {
      id: '1',
      title: 'Payment Recovery',
      description: 'Recover 47-65% of failed payments with automated dunning. $2K-4K, 1 week.',
      href: '/services/payment-recovery',
      badge: 'Quick Win',
    },
    {
      id: '2',
      title: 'Usage-Based Pricing',
      description: 'Launch Stripe Meter in 2 weeks. Companies with usage pricing grow 54% faster.',
      href: '/services/usage-pricing',
    },
    {
      id: '3',
      title: 'AI Cost Tracking',
      description: 'Track LLM costs per customer across 5 providers. $3K-5K, 2-3 weeks.',
      href: '/services/ai-tracking',
      badge: 'Popular',
    },
    {
      id: '4',
      title: 'Billing Audit',
      description: 'Identify revenue leaks and optimization opportunities. $1.5K-3K, 1 week.',
      href: '/services/billing-audit',
    },
  ];

  // FAQs
  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'Why custom pricing instead of fixed?',
      answer: 'Every AI SaaS has different billing complexity. Some have simple subscriptions, others have complex usage patterns, multi-seat plans, and enterprise contracts. I audit your situation first, then scope the work. You pay for what you need.',
      category: 'Pricing',
    },
    {
      id: '2',
      question: 'Do I need to pause feature development?',
      answer: 'No. I build the billing infrastructure in parallel with your team. I need access to your Stripe account, database schema, and a few hours of your team\'s time for requirements gathering. The rest is on me.',
      category: 'Process',
    },
    {
      id: '3',
      question: 'What if I already have Stripe setup?',
      answer: 'Great. I build on top of your existing Stripe configuration. The audit will reveal what you have and what is missing. Many companies have Stripe payments but lack usage-based pricing, failed payment recovery, or LLM cost tracking.',
      category: 'Process',
    },
    {
      id: '4',
      question: 'How do you track LLM costs?',
      answer: 'I implement middleware that intercepts LLM API calls, extracts token usage and model information, and stores it per customer. Supports OpenAI, Anthropic, OpenRouter (400+ models). The data is aggregated and displayed in a margin dashboard.',
      category: 'Technical',
    },
    {
      id: '5',
      question: 'What is the edge case coordinator?',
      answer: 'A 720-line system I built that handles the complex scenarios that break most billing implementations: upgrades/downgrades with proration, trial-to-paid conversions, coupon stacking, annual/monthly switching, and seat-based billing changes. It is the difference between something that works in demo and something that works in production.',
      category: 'Technical',
    },
    {
      id: '6',
      question: 'How long does support last after launch?',
      answer: '30 days of post-launch support included. This covers bug fixes, edge case handling, and minor adjustments. After that, you can purchase ongoing support or your team can take over - the code is documented and tested.',
      category: 'Support',
    },
    {
      id: '7',
      question: 'Can you handle enterprise billing requirements?',
      answer: 'Yes. Enterprise billing often involves custom contracts, negotiated rates, PO-based billing, and net payment terms. I build infrastructure that supports both self-serve and enterprise flows.',
      category: 'Enterprise',
    },
    {
      id: '8',
      question: 'I spent 18 months building this. Now I will build it for you.',
      answer: 'That is not a question, but it is the point. I built Margin (LLM cost tracking platform) and extracted billing code from QuoteKit. I have already made the mistakes so you do not have to.',
      category: 'About',
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
            <span className="text-muted-foreground font-medium">Custom pricing</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Complete Billing Infrastructure for AI SaaS
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            Your margins are a black box. I built a flashlight.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Usage-based pricing, failed payment recovery, AI cost tracking, and edge case handling.
            Built for AI SaaS companies losing money to billing complexity.
          </p>
        </div>
      </section>

      {/* Problems */}
      <section className="py-12 md:py-16 space-y-12">
        <ProblemSection
          title="Why Your Billing Is Broken"
          subtitle="AI SaaS billing is harder than traditional SaaS. LLM costs, usage-based pricing, and edge cases everywhere."
          problems={problems}
          alertMessage={{
            title: 'The Black Box Problem',
            description: 'You cannot optimize your margins when you do not know your true costs per customer.',
          }}
        />
      </section>

      {/* Solution */}
      <section className="py-12 md:py-16 space-y-12">
        <SolutionSection
          title="The AI.RIO Solution"
          subtitle="I spent 18 months building billing infrastructure. Now I will build it for you."
          features={features}
          layout="grid"
        />
      </section>

      {/* Technical Proof */}
      <section className="py-12 md:py-16 space-y-12">
        <div className="rounded-xl border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Built with Production-Grade Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">99.5%</div>
              <div className="text-sm text-muted-foreground">Test coverage (866/871 tests)</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">LLM providers integrated</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">720</div>
              <div className="text-sm text-muted-foreground">Lines of edge case handling</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">45</div>
              <div className="text-sm text-muted-foreground">RLS policies, zero security issues</div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-12 md:py-16 space-y-12">
        <DeliverablesSection
          locale={locale}
          title="What You Will Get"
          subtitle="Phased delivery with clear milestones and pricing. You pay for results, not hours."
          phases={phases}
          totalPrice={15000}
          cta={{
            label: 'Start Billing Foundation',
            href: '/contact?service=billing-infrastructure',
          }}
        />
      </section>

      {/* Who For */}
      <section className="py-12 md:py-16 space-y-12">
        <WhoForSection
          locale={locale}
          title="Who This Is For"
          subtitle="AI SaaS companies with $25K+ MRR who are bleeding margins on billing complexity."
          profiles={profiles}
          cta={{
            label: 'See If This Fits Your Needs',
            href: '/contact?service=billing-infrastructure',
          }}
        />
      </section>

      {/* Related Services */}
      <section className="py-12 md:py-16 space-y-12">
        <RelatedServices
          locale={locale}
          title="Related Services"
          subtitle="Need something smaller or more focused? These services might fit better."
          services={relatedServices}
          layout="grid"
        />
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 space-y-12">
        <FAQSection
          locale={locale}
          title="Frequently Asked Questions"
          subtitle="Direct answers to common questions. No sales fluff."
          faqs={faqs}
        />
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 space-y-12">
        <CTASection
          title="Ready to Fix Your Billing?"
          subtitle="I spent 18 months building this. Now I will build it for you."
          description="Book a free discovery call. We will discuss your billing challenges and I will provide a clear scope and quote."
          primaryAction={{
            label: 'Book Discovery Call',
            href: '/contact?service=billing-infrastructure',
            icon: <Calendar className="h-5 w-5" />,
          }}
          secondaryAction={{
            label: 'See Detailed Case Study',
            href: '/blog/margin-building-llm-cost-tracker',
            icon: <ArrowRight className="h-5 w-5" />,
          }}
          badge="No commitment required"
          trustSignals={[
            'Response within 24 hours',
            'Free discovery call',
            'Clear scope and pricing',
            '30-day post-launch support',
          ]}
        />
      </section>
    </>
  );
}
