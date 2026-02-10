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
import { CreditCard, TrendingUp, AlertTriangle, Mail, Clock, DollarSign, ArrowRight, Calendar } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as any,
    namespace: 'paymentRecovery',
    path: '/services/payment-recovery',
  });
}

export default async function PaymentRecoveryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const problems: ProblemPoint[] = [
    {
      id: '1',
      title: '47.6% Default Recovery Rate',
      description: 'Stripe\'s default settings recover less than half of failed payments. You are leaving thousands on the table every month.',
      severity: 'critical',
      metric: '$52K avg annual loss for $100K MRR',
    },
    {
      id: '2',
      title: 'Passive Dunning Only',
      description: 'Your failed payment emails are generic, poorly timed, and lack urgency. Customers ignore them.',
      severity: 'high',
    },
    {
      id: '3',
      title: 'No Intelligent Retry Logic',
      description: 'Stripe retries blindly, without considering card type, failure reason, or customer payment patterns.',
      severity: 'high',
    },
    {
      id: '4',
      title: 'Churn Misclassified',
      description: 'You think customers left because they did not want your product. They actually left because their card failed.',
      severity: 'medium',
    },
  ];

  const features: FeatureItem[] = [
    {
      id: '1',
      title: 'Automated Dunning Workflows',
      description: 'Strategic email sequences with the right messaging, timing, and urgency to recover payments.',
      icon: <Mail className="h-6 w-6" />,
      badge: '65-70% recovery rate',
      highlighted: true,
    },
    {
      id: '2',
      title: 'Intelligent Retry Logic',
      description: 'Smart retry scheduling based on failure reason, card network, and customer payment history.',
      icon: <CreditCard className="h-6 w-6" />,
    },
    {
      id: '3',
      title: 'Failure Pattern Analysis',
      description: 'Understand why payments fail: hard declines vs soft declines, insufficient funds, expired cards, fraud blocks.',
      icon: <AlertTriangle className="h-6 w-6" />,
    },
    {
      id: '4',
      title: 'Custom Email Templates',
      description: 'Dunning emails that match your brand and voice. A/B test subject lines and messaging.',
      icon: <Mail className="h-6 w-6" />,
    },
    {
      id: '5',
      title: 'Recovery Dashboard',
      description: 'Track recovery rates, failed payment trends, and revenue saved over time.',
      icon: <TrendingUp className="h-6 w-6" />,
    },
  ];

  const phases: PhaseDeliverables[] = [
    {
      phase: '1',
      title: 'Audit & Setup',
      description: 'Analyze current recovery performance and configure dunning',
      duration: 'Days 1-2',
      price: 500,
      deliverables: [
        {
          id: '1-1',
          title: 'Failed Payment Analysis',
          description: 'Analyze last 90 days of failed payments, identify patterns and recovery opportunities',
          status: 'pending',
          deliveryWeek: 'Day 1',
        },
        {
          id: '1-2',
          title: 'Stripe Dunning Configuration',
          description: 'Configure Stripe dunning settings with optimal retry schedule',
          status: 'pending',
          deliveryWeek: 'Day 2',
        },
      ],
    },
    {
      phase: '2',
      title: 'Dunning Implementation',
      description: 'Build and deploy automated recovery workflows',
      duration: 'Days 3-5',
      price: 2000,
      deliverables: [
        {
          id: '2-1',
          title: 'Email Sequence Design',
          description: 'Create strategic dunning email sequence with 3-5 touches over 14 days',
          status: 'pending',
          deliveryWeek: 'Day 3',
        },
        {
          id: '2-2',
          title: 'Smart Retry Logic',
          description: 'Implement intelligent retry scheduling based on failure codes and patterns',
          status: 'pending',
          deliveryWeek: 'Day 4',
        },
        {
          id: '2-3',
          title: 'Recovery Dashboard',
          description: 'Dashboard showing recovery rates, failed payments, and revenue saved',
          status: 'pending',
          deliveryWeek: 'Day 5',
        },
      ],
    },
    {
      phase: '3',
      title: 'Testing & Launch',
      description: 'Test workflows and deploy to production',
      duration: 'Days 6-7',
      price: 1500,
      deliverables: [
        {
          id: '3-1',
          title: 'Workflow Testing',
          description: 'Test dunning workflows with simulated failed payments',
          status: 'pending',
          deliveryWeek: 'Day 6',
        },
        {
          id: '3-2',
          title: 'Production Deployment',
          description: 'Deploy to production with monitoring and alerts',
          status: 'pending',
          deliveryWeek: 'Day 7',
        },
        {
          id: '3-3',
          title: '30-Day Monitoring',
          description: 'Monitor recovery rates and optimize based on actual performance',
          status: 'pending',
          deliveryWeek: 'Days 7-37',
        },
      ],
    },
  ];

  const profiles: CustomerProfile[] = [
    {
      id: '1',
      name: 'B2B SaaS Founder',
      initials: 'BF',
      stage: 'Seed-Series A',
      mrr: { min: 25000, max: 150000 },
      description: 'Growing SaaS with significant failed payment volume. Every recovered payment is pure profit.',
      painPoints: [
        'High churn from failed payments',
        'Generic Stripe dunning emails',
        'No visibility into recovery rates',
        'Manual follow-up on failed payments',
      ],
    },
    {
      id: '2',
      name: 'Revenue Operations Lead',
      initials: 'RR',
      stage: 'Growth Stage',
      mrr: { min: 100000, max: 500000 },
      description: 'Responsible for revenue retention. Needs to reduce involuntary churn.',
      painPoints: [
        'Involuntary churn untracked',
        'Cannot calculate recovery ROI',
        'Passive dunning only',
        'No failure pattern visibility',
      ],
    },
    {
      id: '3',
      name: 'Finance Director',
      initials: 'FD',
      stage: 'Series B+',
      mrr: { min: 500000, max: 2000000 },
      description: 'Focused on margin optimization. Failed payments are leaving money on the table.',
      painPoints: [
        'Revenue leaks from failed payments',
        'No recovery performance metrics',
        'Outdated recovery infrastructure',
        'Manual revenue reconciliation',
      ],
    },
  ];

  const relatedServices: RelatedService[] = [
    {
      id: '1',
      title: 'Billing Audit',
      description: 'Identify all revenue leaks and optimization opportunities. $1.5K-3K, 1 week.',
      href: '/services/billing-audit',
      badge: 'Start Here',
    },
    {
      id: '2',
      title: 'Complete Billing',
      description: 'End-to-end billing infrastructure including payment recovery. $8K-15K, 4-6 weeks.',
      href: '/services/complete-billing',
    },
    {
      id: '3',
      title: 'Usage-Based Pricing',
      description: 'Launch Stripe Meter in 2 weeks. Companies with usage pricing grow 54% faster.',
      href: '/services/usage-pricing',
    },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'What is the actual recovery rate improvement?',
      answer: 'Stripe\'s default configuration typically recovers 47-48% of failed payments. My clients typically see 65-70% recovery rates after implementing automated dunning. That is 17-22% more revenue recovered.',
      category: 'Results',
    },
    {
      id: '2',
      question: 'Why can\'t I just use Stripe\'s default dunning?',
      answer: 'You can, and you should enable it. But Stripe\'s default is generic: one email, basic retry logic. My service adds strategic email sequences, intelligent retry scheduling, and failure pattern analysis. The difference is material.',
      category: 'Technical',
    },
    {
      id: '3',
      question: 'How long does implementation take?',
      answer: '7-10 days from start to finish. Most of that time is designing and testing email sequences. The technical implementation is straightforward.',
      category: 'Timeline',
    },
    {
      id: '4',
      question: 'What if my customers are international?',
      answer: 'International cards have different failure patterns. The retry logic accounts for regional differences, card network variations, and time zone considerations.',
      category: 'Technical',
    },
    {
      id: '5',
      question: 'Do I need to change my Stripe setup?',
      answer: 'No. I configure dunning on top of your existing Stripe setup. No migration, no downtime, no changes to your subscription logic.',
      category: 'Process',
    },
    {
      id: '6',
      question: 'Can I customize the email templates?',
      answer: 'Yes. The dunning emails match your brand voice and include your company branding. You can edit them anytime.',
      category: 'Customization',
    },
  ];

  const metrics: Metric[] = [
    {
      id: '1',
      label: 'Recovery Rate Improvement',
      value: 68,
      suffix: '%',
      prefix: '47.6 → 65-70',
      progress: 68,
      trend: 'up',
      description: 'Stripe default to AI.RIO optimized',
    },
    {
      id: '2',
      label: 'Implementation Time',
      value: 9,
      suffix: ' days',
      prefix: '7-10',
      progress: 45,
      trend: 'neutral',
      description: 'From start to production',
    },
    {
      id: '3',
      label: 'Avg Revenue Saved',
      value: 52000,
      suffix: '',
      prefix: '$52K',
      progress: 52,
      trend: 'up',
      description: 'For $100K MRR companies',
    },
    {
      id: '4',
      label: 'ROI Timeline',
      value: 2,
      suffix: ' months',
      prefix: '<',
      progress: 20,
      trend: 'down',
      description: 'Payback period',
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
            <span className="text-muted-foreground font-medium">$2,000-4,000</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Stripe Failed Payment Recovery
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            Stop leaving revenue on the table. Recover 65-70% of failed payments.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Stripe\'s default settings recover less than half of failed payments. I build automated dunning workflows
            that recover 65-70%. Delivered in 1 week.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 md:py-16 space-y-12">
        <TechnicalProof
          title="The Cost of Passive Recovery"
          subtitle="Stripe defaults are not enough. Here is what you are losing."
          metrics={metrics}
        />
      </section>

      {/* Problems */}
      <section className="py-12 md:py-16 space-y-12">
        <ProblemSection
          title="Why Your Recovery Rate Is 47.6%"
          subtitle="Stripe's default dunning is passive. Your customers need better reminders, better timing, and smarter retries."
          problems={problems}
          alertMessage={{
            title: 'Involuntary Churn Is Expensive',
            description: 'Acquiring a new customer costs 5-25x more than recovering an existing one. Failed payment recovery is pure profit.',
          }}
        />
      </section>

      {/* Solution */}
      <section className="py-12 md:py-16 space-y-12">
        <SolutionSection
          title="The AI.RIO Solution"
          subtitle="Automated dunning workflows with intelligent retry logic."
          features={features}
          layout="grid"
        />
      </section>

      {/* Deliverables */}
      <section className="py-12 md:py-16 space-y-12">
        <DeliverablesSection
          locale={locale}
          title="What You Will Get"
          subtitle="Fixed scope, fixed price. Delivered in 7-10 days."
          phases={phases}
          totalPrice={4000}
          cta={{
            label: 'Recover Your Revenue',
            href: '/contact?service=payment-recovery',
          }}
        />
      </section>

      {/* Who For */}
      <section className="py-12 md:py-16 space-y-12">
        <WhoForSection
          locale={locale}
          title="Who This Is For"
          subtitle="B2B SaaS companies with $25K+ MRR and significant failed payment volume."
          profiles={profiles}
        />
      </section>

      {/* Related Services */}
      <section className="py-12 md:py-16 space-y-12">
        <RelatedServices
          locale={locale}
          title="Related Services"
          subtitle="Need more than payment recovery? These services complement recovery work."
          services={relatedServices}
          layout="grid"
        />
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 space-y-12">
        <FAQSection
          locale={locale}
          title="Frequently Asked Questions"
          subtitle="Direct answers about payment recovery."
          faqs={faqs}
        />
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 space-y-12">
        <CTASection
          title="Stop Losing Revenue to Failed Payments"
          subtitle="Every failed payment is recoverable. Let me show you how."
          description="Book a free discovery call. I will analyze your failed payments and estimate recovery potential."
          primaryAction={{
            label: 'Book Discovery Call',
            href: '/contact?service=payment-recovery',
            icon: <Calendar className="h-5 w-5" />,
          }}
          secondaryAction={{
            label: 'See Billing Audit',
            href: '/services/billing-audit',
            variant: 'outline',
            icon: <ArrowRight className="h-5 w-5" />,
          }}
          badge="Response within 24 hours"
          trustSignals={[
            'Free failed payment analysis',
            'Clear ROI estimate',
            '7-10 day delivery',
            '30-day monitoring included',
          ]}
        />
      </section>
    </>
  );
}
