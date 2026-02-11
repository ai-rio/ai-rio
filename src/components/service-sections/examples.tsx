/**
 * AI.RIO Service Sections - Example Usage
 *
 * This file demonstrates how to use all 9 service section components
 * with realistic data for the AI.RIO billing infrastructure service.
 */

'use client';

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
import { Zap, Shield, BarChart3 } from 'lucide-react';

// ============================================================================
// PROBLEM SECTION EXAMPLE
// ============================================================================

const exampleProblems: ProblemPoint[] = [
  {
    id: 'no-visibility',
    title: 'Zero Cost Visibility',
    description: 'Your AI costs are scattered across OpenAI, Anthropic, and various providers. No unified view of what you\'re spending or where.',
    severity: 'critical',
    metric: 'Avg. 37% of AI costs unattributed',
  },
  {
    id: 'usage-spikes',
    title: 'Mystery Usage Spikes',
    description: 'Unexpected cost increases hit your bill with zero warning. No way to trace which team, feature, or user drove the spike.',
    severity: 'high',
    metric: '2-3x surprise bill increases',
  },
  {
    id: 'no-attribution',
    title: 'No Cost Attribution',
    description: 'Can\'t tie AI costs to customers or features. Making pricing decisions is guesswork. ROI calculations don\'t exist.',
    severity: 'high',
  },
  {
    id: 'delayed-data',
    title: '24-48 Hour Data Lag',
    description: 'By the time you see usage data, it\'s too late. Real-time monitoring doesn\'t exist for AI costs.',
    severity: 'medium',
  },
];

export function ProblemSectionExample() {
  return (
    <ProblemSection
      title="Why Your AI Costs Are a Black Box"
      subtitle="Your margins are disappearing and you don't know where."
      problems={exampleProblems}
      alertMessage={{
        title: 'The "Margin Panic" is Real',
        description: 'AI SaaS founders are losing 15-40% of revenue to untracked AI costs. You can\'t optimize what you can\'t see.',
      }}
    />
  );
}

// ============================================================================
// SOLUTION SECTION EXAMPLE
// ============================================================================

const exampleFeatures: FeatureItem[] = [
  {
    id: 'real-time-tracking',
    title: 'Real-Time Cost Tracking',
    description: 'See every AI token, API call, and cost as it happens. No more 24-hour delays. Know exactly what you\'re spending right now.',
    icon: 'zap',
    badge: 'New',
    highlighted: true,
  },
  {
    id: 'cost-attribution',
    title: 'Precise Cost Attribution',
    description: 'Trace every dollar to the team, feature, customer, or user that generated it. Finally answer "who drove our AI costs this month?"',
    icon: 'chart',
  },
  {
    id: 'anomaly-detection',
    title: 'Anomaly Detection',
    description: 'Get alerted the moment usage spikes. Understand what caused it before it becomes a budget disaster.',
    icon: 'shield',
  },
  {
    id: 'unified-dashboard',
    title: 'Unified Provider Dashboard',
    description: 'OpenAI, Anthropic, Cohere, and custom models—all in one place. Stop switching between 10 different tabs.',
    icon: 'sparkles',
  },
  {
    id: 'forecasting',
    title: 'Cost Forecasting',
    description: 'Predict next month\'s AI spend based on current trends. Plan your burn rate with confidence.',
    icon: 'chart',
  },
];

export function SolutionSectionExample() {
  return (
    <SolutionSection
      title="I Built a Flashlight for Your AI Costs"
      subtitle="Your margins are a black box. This is the flashlight."
      features={exampleFeatures}
      cta={{
        label: 'See How It Works',
        href: '#demo',
        variant: 'default',
      }}
      layout="grid"
    />
  );
}

// ============================================================================
// DELIVERABLES SECTION EXAMPLE
// ============================================================================

const examplePhases: PhaseDeliverables[] = [
  {
    phase: '1',
    title: 'Discovery & Audit',
    description: 'We dive deep into your current AI infrastructure, identify every cost center, and establish baselines.',
    duration: 'Week 1-2',
    price: 5000,
    deliverables: [
      {
        id: 'd1',
        title: 'AI Cost Infrastructure Audit',
        description: 'Complete mapping of all AI providers, endpoints, and cost centers.',
        status: 'completed',
        deliveryWeek: 'Week 1',
      },
      {
        id: 'd2',
        title: 'Cost Baseline Report',
        description: 'Establish your current AI spend patterns with historical analysis.',
        status: 'completed',
        deliveryWeek: 'Week 2',
      },
    ],
  },
  {
    phase: '2',
    title: 'Implementation & Integration',
    description: 'Deploy the AI.RIO tracking layer across your infrastructure with zero downtime.',
    duration: 'Week 3-4',
    price: 10000,
    deliverables: [
      {
        id: 'd3',
        title: 'Tracking SDK Integration',
        description: 'Drop-in SDKs for Python, Node.js, and Go. Implementation support included.',
        status: 'in-progress',
        deliveryWeek: 'Week 3',
      },
      {
        id: 'd4',
        title: 'Real-Time Dashboard Deployment',
        description: 'Custom dashboard showing your AI costs as they happen.',
        status: 'pending',
        deliveryWeek: 'Week 4',
      },
      {
        id: 'd5',
        title: 'Alert System Setup',
        description: 'Configure anomaly detection alerts to your Slack, email, or PagerDuty.',
        status: 'pending',
        deliveryWeek: 'Week 4',
      },
    ],
  },
];

export function DeliverablesSectionExample() {
  return (
    <DeliverablesSection
      title="What You'll Get"
      subtitle="Transparent pricing. Clear deliverables. No surprises."
      phases={examplePhases}
      totalPrice={15000}
      cta={{
        label: 'Get Started',
        href: '/contact',
      }}
    />
  );
}

// ============================================================================
// WHO FOR SECTION EXAMPLE
// ============================================================================

const exampleProfiles: CustomerProfile[] = [
  {
    id: 'ai-saas-founder',
    name: 'AI SaaS Founder',
    initials: 'AF',
    stage: 'Seed to Series A',
    mrr: { min: 25000, max: 250000 },
    description: 'Building an AI-powered product. Costs scaling faster than revenue. Need visibility now.',
    painPoints: [
      'Can\'t attribute AI costs to customers',
      'Pricing is a guess, not a calculation',
      'Investors asking about unit economics',
    ],
    icon: 'growth',
  },
  {
    id: 'engineering-lead',
    name: 'Engineering Lead',
    initials: 'EL',
    stage: 'Team of 5-50',
    mrr: { min: 50000, max: 500000 },
    description: 'Responsible for infrastructure costs. Getting blindsided by AI bills. Need to show ROI.',
    painPoints: [
      'No way to track per-feature AI costs',
      'Can\'t optimize without visibility',
      'Budget planning is impossible',
    ],
    icon: 'users',
  },
  {
    id: 'finance-ops',
    name: 'Finance / Ops Lead',
    initials: 'FO',
    stage: 'Scaling Fast',
    mrr: { min: 100000, max: 1000000 },
    description: 'Watching margins shrink. Need to understand AI cost drivers before next board meeting.',
    painPoints: [
      'AI costs are a line item mystery',
      'Can\'t forecast AI spend',
      'Need cost allocation by customer',
    ],
    icon: 'building',
  },
];

export function WhoForSectionExample() {
  return (
    <WhoForSection
      title="Who This Is For"
      subtitle="If you\'re building with AI and your margins are suffering—this is for you."
      profiles={exampleProfiles}
      cta={{
        label: 'See if We\'re a Fit',
        href: '/contact',
      }}
    />
  );
}

// ============================================================================
// RELATED SERVICES EXAMPLE
// ============================================================================

const exampleRelatedServices: RelatedService[] = [
  {
    id: 'cost-audit',
    title: 'One-Time Cost Audit',
    description: 'Not ready for full implementation? Get a comprehensive audit of your AI costs.',
    href: '/services/cost-audit',
    badge: 'Popular',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    id: 'implementation',
    title: 'Custom Implementation',
    description: 'Have a complex setup? We do custom integrations for enterprise teams.',
    href: '/services/implementation',
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: 'consulting',
    title: 'AI Cost Consulting',
    description: 'Ongoing advisory for optimizing your AI infrastructure and reducing costs.',
    href: '/services/consulting',
    external: true,
    icon: <Shield className="h-5 w-5" />,
  },
];

export function RelatedServicesExample() {
  return (
    <RelatedServices
      title="Other Ways to Work Together"
      subtitle="Not ready for the full package? Start smaller."
      services={exampleRelatedServices}
      layout="grid"
    />
  );
}

// ============================================================================
// FAQ SECTION EXAMPLE
// ============================================================================

const exampleFAQs: FAQItem[] = [
  {
    id: 'implementation-time',
    question: 'How long does implementation take?',
    answer: 'Typically 2-4 weeks. Phase 1 (audit) completes in Week 1-2. Phase 2 (implementation) takes another 1-2 weeks depending on your stack complexity. We\'ve had simple integrations done in 5 days and complex multi-provider setups take 6 weeks.',
    category: 'Implementation',
  },
  {
    id: 'engineering-resources',
    question: 'Do I need to dedicate engineering resources?',
    answer: 'Minimal. Our SDKs are drop-in replacements for your existing AI API calls. Most teams integrate with less than 10 hours of engineering time. We handle the heavy lifting.',
    category: 'Implementation',
  },
  {
    id: 'supported-providers',
    question: 'Which AI providers do you support?',
    answer: 'OpenAI, Anthropic, Cohere, Replicate, Together AI, any OpenAI-compatible API, and custom models. If it makes an HTTP request, we can track it.',
    category: 'Technical',
  },
  {
    id: 'data-privacy',
    question: 'What about data privacy and security?',
    answer: 'We never see your prompts or responses. We only track metadata: model used, token count, cost, and your custom attribution tags. GDPR and SOC2 compliant.',
    category: 'Security',
  },
  {
    id: 'pricing',
    question: 'How is AI.RIO priced?',
    answer: 'Two options: (1) One-time implementation: $15K for complete setup. (2) Monthly subscription: Starts at $500/month based on usage volume. The implementation fee is credited toward your first 6 months of subscription.',
    category: 'Pricing',
  },
];

export function FAQSectionExample() {
  return (
    <FAQSection
      title="Frequently Asked Questions"
      subtitle="Direct answers to real questions."
      faqs={exampleFAQs}
    />
  );
}

// ============================================================================
// CTA SECTION EXAMPLE
// ============================================================================

export function CTASectionExample() {
  return (
    <CTASection
      title="Ready to Shine a Light on Your AI Costs?"
      subtitle="Your margins are a black box. I built a flashlight."
      description="Stop guessing. Start knowing. Book a 30-minute discovery call and we'll show you exactly what's possible."
      primaryAction={{
        label: 'Book Discovery Call',
        href: '/contact',
        icon: 'calendar',
      }}
      secondaryAction={{
        label: 'See the Demo',
        href: '/demo',
        variant: 'outline',
        icon: 'arrow',
      }}
      badge="Limited Availability for Q1"
      alignment="center"
      variant="default"
      trustSignals={[
        'No commitment required',
        'Response within 24 hours',
        'Free cost audit included',
      ]}
    />
  );
}

// ============================================================================
// TECHNICAL PROOF EXAMPLE
// ============================================================================

const exampleMetrics: Metric[] = [
  {
    id: 'cost-savings',
    label: 'Average Cost Savings',
    value: 37,
    suffix: '%',
    description: 'Average reduction in AI costs within first 90 days',
    progress: 37,
    trend: 'up',
  },
  {
    id: 'implementation-time',
    label: 'Implementation Time',
    value: 2,
    suffix: ' weeks',
    description: 'Average time from kickoff to live dashboard',
    progress: 95,
    trend: 'up',
  },
  {
    id: 'cost-visibility',
    label: 'Cost Visibility',
    value: 100,
    suffix: '%',
    description: 'Complete attribution of every AI dollar spent',
    progress: 100,
    trend: 'up',
  },
  {
    id: 'roi-timeline',
    label: 'ROI Timeline',
    value: 45,
    suffix: ' days',
    description: 'Average time to positive ROI',
    progress: 70,
    trend: 'up',
  },
];

export function TechnicalProofExample() {
  return (
    <TechnicalProof
      title="Proven Results"
      subtitle="Numbers from real AI SaaS companies."
      metrics={exampleMetrics}
      highlightedMetric="cost-savings"
      layout="grid"
    />
  );
}

// ============================================================================
// DASHBOARD SHOWCASE EXAMPLE
// ============================================================================

const exampleDashboardViews: DashboardView[] = [
  {
    id: 'overview',
    title: 'Cost Overview',
    description: 'Real-time view of all AI costs across providers',
    imageSrc: '/dashboard-overview.png',
    imageAlt: 'AI.RIO dashboard showing cost overview with provider breakdown',
    device: 'desktop',
    badge: 'Live Demo',
  },
  {
    id: 'breakdown',
    title: 'Cost Breakdown',
    description: 'Detailed cost attribution by feature, team, and customer',
    imageSrc: '/dashboard-breakdown.png',
    imageAlt: 'AI cost breakdown by feature and team',
    device: 'desktop',
  },
  {
    id: 'mobile',
    title: 'Mobile Alerts',
    description: 'Get notified instantly about cost anomalies',
    imageSrc: '/dashboard-mobile.png',
    imageAlt: 'Mobile view of AI.RIO cost alerts',
    device: 'mobile',
  },
];

export function DashboardShowcaseExample() {
  return (
    <DashboardShowcase
      title="See Your AI Costs in Real-Time"
      subtitle="No more 24-hour delays. Know exactly what you're spending, right now."
      views={exampleDashboardViews}
      defaultView="overview"
      cta={{
        label: 'Try the Interactive Demo',
        href: '/demo',
        external: true,
      }}
      aspectRatio="16/9"
      rounded={true}
    />
  );
}

// ============================================================================
// COMPLETE PAGE EXAMPLE
// ============================================================================

export function ServicePageExample() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 space-y-24">
        {/* Hero CTA */}
        <CTASection
          title="Your AI Costs Are a Black Box"
          subtitle="I built a flashlight."
          primaryAction={{
            label: 'See the Demo',
            href: '#demo',
            icon: 'arrow',
          }}
        />

        {/* Problem */}
        <ProblemSectionExample />

        {/* Solution */}
        <SolutionSectionExample />

        {/* Dashboard Showcase */}
        <DashboardShowcaseExample />

        {/* Technical Proof */}
        <TechnicalProofExample />

        {/* Deliverables */}
        <DeliverablesSectionExample />

        {/* Who This Is For */}
        <WhoForSectionExample />

        {/* FAQ */}
        <FAQSectionExample />

        {/* Related Services */}
        <RelatedServicesExample />

        {/* Final CTA */}
        <CTASectionExample />
      </div>
    </main>
  );
}
