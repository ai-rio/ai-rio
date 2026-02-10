import type { Metadata } from 'next';
import {
  CTASection,
  SolutionSection,
  TechnicalProof,
  DeliverablesSection,
  type FeatureItem,
  type Metric,
  type PhaseDeliverables,
} from '@/components/service-sections';
import { generatePageMetadata } from '@/lib/metadata/page-metadata';
import { Code2, Database, CheckCircle2, Calendar, ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/metadata/base-metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    namespace: 'about',
    path: '/about',
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Builder story: How I built billing infrastructure from scratch
  const builderStory: FeatureItem[] = [
    {
      id: '1',
      title: 'Margin - LLM Cost Tracking Platform',
      description: 'Built a complete LLM cost tracking system to solve the "black box" problem for AI SaaS companies. Tracks token usage across OpenAI, Anthropic, and OpenRouter (400+ models). Provides real-time cost attribution per customer.',
      icon: <Code2 className="h-6 w-6" />,
      badge: '18 months in development',
      highlighted: true,
    },
    {
      id: '2',
      title: 'QuoteKit Payment Systems',
      description: 'Extracted and refactored billing infrastructure from QuoteKit, handling complex edge cases like proration, upgrades/downgrades, trial conversions, and coupon stacking. Built a 720-line edge case coordinator.',
      icon: <Database className="h-6 w-6" />,
      badge: 'Production-hardened',
    },
    {
      id: '3',
      title: 'Real-World Problems Solved',
      description: 'These are not theoretical solutions. I built these systems because I needed them. The failed payment recovery improved recovery rates from 47.6% to 65-70%. The cost tracking solved actual margin panic.',
      icon: <CheckCircle2 className="h-6 w-6" />,
    },
  ];

  // Technical proof: Real metrics from the codebase
  const technicalMetrics: Metric[] = [
    {
      id: '1',
      label: 'Test Coverage',
      value: 99.5,
      suffix: '%',
      description: '866 out of 871 tests passing',
      progress: 99.5,
      trend: 'up',
    },
    {
      id: '2',
      label: 'LLM Providers Supported',
      value: 5,
      suffix: '+',
      description: 'OpenAI, Anthropic, OpenRouter, and more',
      progress: 100,
      trend: 'up',
    },
    {
      id: '3',
      label: 'Security Policies',
      value: 45,
      suffix: ' RLS',
      description: 'Row-level security policies, zero issues',
      progress: 100,
      trend: 'up',
    },
    {
      id: '4',
      label: 'Edge Cases Handled',
      value: 720,
      suffix: ' lines',
      description: 'Production-hardened edge case handling',
      progress: 100,
      trend: 'up',
    },
  ];

  // Process: How I work with clients
  const workPhases: PhaseDeliverables[] = [
    {
      phase: '1',
      title: 'Discovery Call',
      description: 'We discuss your billing challenges and I identify the scope',
      duration: '30-45 minutes',
      price: 0,
      deliverables: [
        {
          id: '1-1',
          title: 'Free Consultation',
          description: 'Understand your billing infrastructure, identify pain points, and discuss potential solutions',
          status: 'pending',
          deliveryWeek: 'Day 1',
        },
        {
          id: '1-2',
          title: 'Scope Definition',
          description: 'Clear outline of work required with fixed pricing and timeline',
          status: 'pending',
          deliveryWeek: 'Day 1-2',
        },
      ],
    },
    {
      phase: '2',
      title: 'Implementation',
      description: 'I build the solution while you focus on your product',
      duration: '1-6 weeks',
      price: 0,
      deliverables: [
        {
          id: '2-1',
          title: 'Parallel Development',
          description: 'I work independently with minimal input from your team',
          status: 'pending',
          deliveryWeek: 'Week 1+',
        },
        {
          id: '2-2',
          title: 'Regular Updates',
          description: 'Progress updates and demo sessions to ensure alignment',
          status: 'pending',
          deliveryWeek: 'Ongoing',
        },
        {
          id: '2-3',
          title: 'Testing & QA',
          description: 'Comprehensive testing with 99.5%+ test coverage',
          status: 'pending',
          deliveryWeek: 'Final week',
        },
      ],
    },
    {
      phase: '3',
      title: 'Handoff & Support',
      description: 'Complete documentation and post-launch support',
      duration: '30 days',
      price: 0,
      deliverables: [
        {
          id: '3-1',
          title: 'Documentation',
          description: 'Complete technical documentation and code handoff',
          status: 'pending',
          deliveryWeek: 'Launch',
        },
        {
          id: '3-2',
          title: 'Team Training',
          description: 'Session with your team to understand and maintain the system',
          status: 'pending',
          deliveryWeek: 'Launch',
        },
        {
          id: '3-3',
          title: '30-Day Support',
          description: 'Post-launch support for bug fixes and edge cases',
          status: 'pending',
          deliveryWeek: 'Days 1-30',
        },
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 space-y-6">
        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            I Built Billing Infrastructure From Scratch
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            Now I will build it for you.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl">
            I spent 18 months building Margin (LLM cost tracking) and extracting billing code from QuoteKit.
            I solved the problems you are facing right now.
          </p>
        </div>
      </section>

      {/* Builder Story Section */}
      <section className="py-12 md:py-16 space-y-12">
        <SolutionSection
          title="The Builder Story"
          subtitle="I did not learn this from a course. I built it because I needed it."
          features={builderStory}
          layout="list"
        />
      </section>

      {/* Technical Proof Section */}
      <section className="py-12 md:py-16 space-y-12">
        <TechnicalProof
          locale={locale}
          title="Production-Grade Standards"
          subtitle="Real metrics from the actual codebase. No inflated claims."
          metrics={technicalMetrics}
          highlightedMetric="1"
          layout="grid"
        />
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-16 space-y-12">
        <DeliverablesSection
          locale={locale}
          title="How I Work With Clients"
          subtitle="A simple, transparent process. You know what you are getting and when."
          phases={workPhases}
          cta={{
            label: 'Book a Discovery Call',
            href: '/contact?service=consultation',
          }}
        />
      </section>

      {/* Final CTA Section */}
      <section className="py-12 md:py-16 space-y-12">
        <CTASection
          title="Ready to Build Your Billing Infrastructure?"
          subtitle="I have already made the mistakes so you do not have to."
          description="Let us discuss your billing challenges. I will provide a clear scope and quote. No sales pressure, just honest advice."
          primaryAction={{
            label: 'Book Discovery Call',
            href: '/contact?service=consultation',
            icon: <Calendar className="h-5 w-5" />,
          }}
          secondaryAction={{
            label: 'See Case Studies',
            href: '/blog',
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
