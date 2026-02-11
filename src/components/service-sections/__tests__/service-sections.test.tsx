/**
 * Service Sections Component Tests
 *
 * Unit tests for all 9 service section components.
 * Tests include: rendering, accessibility, user interactions, and edge cases.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
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

// ============================================================================
// TEST UTILITIES
// ============================================================================

const mockProblems: ProblemPoint[] = [
  {
    id: '1',
    title: 'Test Problem',
    description: 'Test description',
    severity: 'high',
  },
];

const mockFeatures: FeatureItem[] = [
  {
    id: '1',
    title: 'Test Feature',
    description: 'Test feature description',
    icon: 'zap',
  },
];

const mockPhases: PhaseDeliverables[] = [
  {
    phase: '1',
    title: 'Test Phase',
    duration: 'Week 1',
    price: 5000,
    deliverables: [
      {
        id: 'd1',
        title: 'Test Deliverable',
        description: 'Test deliverable description',
        status: 'pending',
      },
    ],
  },
];

const mockProfiles: CustomerProfile[] = [
  {
    id: '1',
    name: 'Test Profile',
    initials: 'TP',
    stage: 'Test Stage',
    mrr: { min: 10000, max: 50000 },
    description: 'Test profile description',
    painPoints: ['Pain point 1', 'Pain point 2'],
  },
];

const mockServices: RelatedService[] = [
  {
    id: '1',
    title: 'Test Service',
    description: 'Test service description',
    href: '/test',
  },
];

const mockFAQs: FAQItem[] = [
  {
    id: '1',
    question: 'Test Question?',
    answer: 'Test answer',
  },
];

const mockMetrics: Metric[] = [
  {
    id: '1',
    label: 'Test Metric',
    value: 42,
    suffix: '%',
    progress: 42,
    trend: 'up',
  },
];

// ============================================================================
// PROBLEM SECTION TESTS
// ============================================================================

describe('ProblemSection', () => {
  it('renders title and problems', () => {
    render(<ProblemSection problems={mockProblems} />);

    expect(screen.getByText('The Problem')).toBeInTheDocument();
    expect(screen.getByText('Test Problem')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders severity badge', () => {
    render(<ProblemSection problems={mockProblems} />);

    const badge = screen.getByLabelText('Severity: high');
    expect(badge).toBeInTheDocument();
  });

  it('renders alert message when provided', () => {
    render(
      <ProblemSection
        problems={mockProblems}
        alertMessage={{
          title: 'Alert Title',
          description: 'Alert description',
        }}
      />
    );

    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert description')).toBeInTheDocument();
  });

  it('renders custom title and subtitle', () => {
    render(
      <ProblemSection
        problems={mockProblems}
        title="Custom Title"
        subtitle="Custom subtitle"
      />
    );

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom subtitle')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProblemSection problems={mockProblems} className="custom-class" />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('renders metric when provided', () => {
    const problemsWithMetric: ProblemPoint[] = [
      { ...mockProblems[0], metric: 'Test metric' },
    ];

    render(<ProblemSection problems={problemsWithMetric} />);

    expect(screen.getByText('Test metric')).toBeInTheDocument();
  });

  it('respects variant prop', () => {
    const { container } = render(
      <ProblemSection problems={mockProblems} variant="compact" />
    );

    const grid = container.querySelector('[role="list"]');
    expect(grid?.className).toContain('md:grid-cols-2');
  });
});

// ============================================================================
// SOLUTION SECTION TESTS
// ============================================================================

describe('SolutionSection', () => {
  it('renders title and features', () => {
    render(<SolutionSection features={mockFeatures} />);

    expect(screen.getByText('The Solution')).toBeInTheDocument();
    expect(screen.getByText('Test Feature')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    const featuresWithBadge: FeatureItem[] = [
      { ...mockFeatures[0], badge: 'New' },
    ];

    render(<SolutionSection features={featuresWithBadge} />);

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders CTA button when provided', () => {
    render(
      <SolutionSection
        features={mockFeatures}
        cta={{ label: 'Click me', href: '/test' }}
      />
    );

    const link = screen.getByRole('link', { name: /click me/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('respects layout prop', () => {
    const { container } = render(
      <SolutionSection features={mockFeatures} layout="list" />
    );

    const grid = container.querySelector('[role="list"]');
    expect(grid?.className).toContain('grid-cols-1');
  });

  it('highlights featured items', () => {
    const highlightedFeatures: FeatureItem[] = [
      { ...mockFeatures[0], highlighted: true },
    ];

    const { container } = render(
      <SolutionSection features={highlightedFeatures} />
    );

    const card = container.querySelector('.border-primary\\/50');
    expect(card).toBeInTheDocument();
  });
});

// ============================================================================
// DELIVERABLES SECTION TESTS
// ============================================================================

describe('DeliverablesSection', () => {
  it('renders phases and deliverables', () => {
    render(<DeliverablesSection phases={mockPhases} />);

    expect(screen.getByText('Deliverables & Pricing')).toBeInTheDocument();
    expect(screen.getByText('Test Phase')).toBeInTheDocument();
    expect(screen.getByText('Test Deliverable')).toBeInTheDocument();
  });

  it('formats prices correctly', () => {
    render(
      <DeliverablesSection phases={mockPhases} locale="en" />
    );

    expect(screen.getByText(/\$5,000/)).toBeInTheDocument();
  });

  it('renders total price when provided', () => {
    render(
      <DeliverablesSection phases={mockPhases} totalPrice={10000} />
    );

    expect(screen.getByText(/10,000/)).toBeInTheDocument();
    expect(screen.getByText('Total Investment')).toBeInTheDocument();
  });

  it('renders phase badges', () => {
    render(<DeliverablesSection phases={mockPhases} />);

    expect(screen.getByText('Phase 1')).toBeInTheDocument();
  });

  it('renders deliverable status badges', () => {
    render(<DeliverablesSection phases={mockPhases} />);

    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('renders CTA when provided', () => {
    render(
      <DeliverablesSection
        phases={mockPhases}
        cta={{ label: 'Get Started', href: '/contact' }}
      />
    );

    const link = screen.getByRole('link', { name: /get started/i });
    expect(link).toBeInTheDocument();
  });
});

// ============================================================================
// WHO FOR SECTION TESTS
// ============================================================================

describe('WhoForSection', () => {
  it('renders profiles', () => {
    render(<WhoForSection profiles={mockProfiles} />);

    expect(screen.getByText('Who This Is For')).toBeInTheDocument();
    expect(screen.getByText('Test Profile')).toBeInTheDocument();
  });

  it('renders avatar initials', () => {
    render(<WhoForSection profiles={mockProfiles} />);

    expect(screen.getByText('TP')).toBeInTheDocument();
  });

  it('formats MRR range correctly', () => {
    render(<WhoForSection profiles={mockProfiles} locale="en" />);

    expect(screen.getByText(/10,000.*50,000.*MRR/i)).toBeInTheDocument();
  });

  it('renders pain points', () => {
    render(<WhoForSection profiles={mockProfiles} />);

    expect(screen.getByText('Pain point 1')).toBeInTheDocument();
    expect(screen.getByText('Pain point 2')).toBeInTheDocument();
  });

  it('renders stage information', () => {
    render(<WhoForSection profiles={mockProfiles} />);

    expect(screen.getByText('Test Stage')).toBeInTheDocument();
  });

  it('renders CTA when provided', () => {
    render(
      <WhoForSection
        profiles={mockProfiles}
        cta={{ label: 'See if fit', href: '/contact' }}
      />
    );

    const link = screen.getByRole('link', { name: /see if fit/i });
    expect(link).toBeInTheDocument();
  });
});

// ============================================================================
// RELATED SERVICES TESTS
// ============================================================================

describe('RelatedServices', () => {
  it('renders services', () => {
    render(<RelatedServices services={mockServices} />);

    expect(screen.getByText('Related Services')).toBeInTheDocument();
    expect(screen.getByText('Test Service')).toBeInTheDocument();
  });

  it('renders learn more links', () => {
    render(<RelatedServices services={mockServices} />);

    const link = screen.getByRole('link', { name: /learn more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('renders external links correctly', () => {
    const externalServices: RelatedService[] = [
      { ...mockServices[0], external: true },
    ];

    render(<RelatedServices services={externalServices} />);

    expect(screen.getByLabelText(/external/i)).toBeInTheDocument();
  });

  it('respects layout prop', () => {
    const { container } = render(
      <RelatedServices services={mockServices} layout="horizontal" />
    );

    const list = container.querySelector('[role="list"]');
    expect(list?.className).toContain('sm:flex-row');
  });

  it('renders badges when provided', () => {
    const servicesWithBadge: RelatedService[] = [
      { ...mockServices[0], badge: 'Popular' },
    ];

    render(<RelatedServices services={servicesWithBadge} />);

    expect(screen.getByText('Popular')).toBeInTheDocument();
  });
});

// ============================================================================
// FAQ SECTION TESTS
// ============================================================================

describe('FAQSection', () => {
  it('renders FAQs', () => {
    render(<FAQSection faqs={mockFAQs} />);

    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('Test Question?')).toBeInTheDocument();
  });

  it('allows accordion interaction', async () => {
    render(<FAQSection faqs={mockFAQs} />);

    const trigger = screen.getByText('Test Question?');
    await userEvent.click(trigger);

    expect(screen.getByText('Test answer')).toBeVisible();
  });

  it('groups FAQs by category', () => {
    const categorizedFAQs: FAQItem[] = [
      { ...mockFAQs[0], category: 'General' },
    ];

    render(<FAQSection faqs={categorizedFAQs} />);

    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<FAQSection faqs={mockFAQs} title="Custom FAQ Title" />);

    expect(screen.getByText('Custom FAQ Title')).toBeInTheDocument();
  });

  it('has accessible navigation help', () => {
    render(<FAQSection faqs={mockFAQs} />);

    expect(screen.getByText(/use enter or space/i)).toBeInTheDocument();
  });
});

// ============================================================================
// CTA SECTION TESTS
// ============================================================================

describe('CTASection', () => {
  it('renders title and actions', () => {
    render(
      <CTASection
        primaryAction={{ label: 'Primary', href: '/primary' }}
      />
    );

    const link = screen.getByRole('link', { name: /primary/i });
    expect(link).toHaveAttribute('href', '/primary');
  });

  it('renders secondary action when provided', () => {
    render(
      <CTASection
        primaryAction={{ label: 'Primary', href: '/primary' }}
        secondaryAction={{ label: 'Secondary', href: '/secondary' }}
      />
    );

    expect(screen.getByRole('link', { name: /secondary/i })).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(
      <CTASection
        badge="Test Badge"
        primaryAction={{ label: 'Primary', href: '/primary' }}
      />
    );

    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('renders trust signals', () => {
    render(
      <CTASection
        primaryAction={{ label: 'Primary', href: '/primary' }}
        trustSignals={['Signal 1', 'Signal 2']}
      />
    );

    expect(screen.getByText('Signal 1')).toBeInTheDocument();
    expect(screen.getByText('Signal 2')).toBeInTheDocument();
  });

  it('respects alignment prop', () => {
    const { container } = render(
      <CTASection
        primaryAction={{ label: 'Primary', href: '/primary' }}
        alignment="left"
      />
    );

    const section = container.querySelector('section > div');
    expect(section?.className).toContain('text-left');
  });

  it('respects variant prop', () => {
    const { container } = render(
      <CTASection
        primaryAction={{ label: 'Primary', href: '/primary' }}
        variant="filled"
      />
    );

    const card = container.querySelector('.bg-primary');
    expect(card).toBeInTheDocument();
  });
});

// ============================================================================
// TECHNICAL PROOF TESTS
// ============================================================================

describe('TechnicalProof', () => {
  it('renders metrics', () => {
    render(<TechnicalProof metrics={mockMetrics} />);

    expect(screen.getByText('Proven Results')).toBeInTheDocument();
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('renders progress bars', () => {
    const { container } = render(<TechnicalProof metrics={mockMetrics} />);

    const progress = container.querySelector('[role="progressbar"]');
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute('aria-label', 'Test Metric: 42% complete');
  });

  it('highlights specified metric', () => {
    render(<TechnicalProof metrics={mockMetrics} highlightedMetric="1" />);

    const card = screen.getByRole('listitem');
    expect(card?.className).toContain('border-primary/50');
  });

  it('formats numbers correctly for locale', () => {
    render(<TechnicalProof metrics={mockMetrics} locale="en" />);

    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders trend badges', () => {
    render(<TechnicalProof metrics={mockMetrics} />);

    expect(screen.getByText(/improved/i)).toBeInTheDocument();
  });

  it('renders metric descriptions', () => {
    const metricsWithDescription: Metric[] = [
      { ...mockMetrics[0], description: 'Test metric description' },
    ];

    render(<TechnicalProof metrics={metricsWithDescription} />);

    expect(screen.getByText('Test metric description')).toBeInTheDocument();
  });

  it('respects layout prop', () => {
    const { container } = render(
      <TechnicalProof metrics={mockMetrics} layout="list" />
    );

    const list = container.querySelector('[role="list"]');
    expect(list?.className).toContain('space-y-4');
  });
});

// ============================================================================
// DASHBOARD SHOWCASE TESTS
// ============================================================================

describe('DashboardShowcase', () => {
  const mockViews: DashboardView[] = [
    {
      id: 'overview',
      title: 'Overview',
      imageSrc: '/test.png',
      imageAlt: 'Test dashboard',
      device: 'desktop',
    },
  ];

  it('renders views', () => {
    render(<DashboardShowcase views={mockViews} />);

    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('renders tabs for multiple views', () => {
    const multipleViews: DashboardView[] = [
      ...mockViews,
      {
        id: 'details',
        title: 'Details',
        imageSrc: '/test2.png',
        imageAlt: 'Test dashboard 2',
        device: 'desktop',
      },
    ];

    render(<DashboardShowcase views={multipleViews} />);

    expect(screen.getByRole('tab', { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /details/i })).toBeInTheDocument();
  });

  it('switches between tabs', async () => {
    const multipleViews: DashboardView[] = [
      ...mockViews,
      {
        id: 'details',
        title: 'Details',
        imageSrc: '/test2.png',
        imageAlt: 'Test dashboard 2',
        device: 'desktop',
      },
    ];

    render(<DashboardShowcase views={multipleViews} defaultView="overview" />);

    const detailsTab = screen.getByRole('tab', { name: /details/i });
    await userEvent.click(detailsTab);

    expect(detailsTab).toHaveAttribute('aria-selected', 'true');
  });

  it('renders CTA when provided', () => {
    render(
      <DashboardShowcase
        views={mockViews}
        cta={{ label: 'View Demo', href: '/demo' }}
      />
    );

    const link = screen.getByRole('link', { name: /view demo/i });
    expect(link).toBeInTheDocument();
  });

  it('renders external link correctly', () => {
    render(
      <DashboardShowcase
        views={mockViews}
        cta={{ label: 'View Demo', href: '/demo', external: true }}
      />
    );

    const link = screen.getByRole('link', { name: /view demo/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders view badges', () => {
    const viewsWithBadge: DashboardView[] = [
      { ...mockViews[0], badge: 'Live' },
    ];

    render(<DashboardShowcase views={viewsWithBadge} />);

    expect(screen.getByText('Live')).toBeInTheDocument();
  });
});

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

describe('Accessibility', () => {
  it('ProblemSection has proper ARIA labels', () => {
    render(<ProblemSection problems={mockProblems} />);

    expect(screen.getByRole('region')).toHaveAttribute('aria-labelledby', 'problem-section-title');
    expect(screen.getByRole('list', { name: /list of problems/i })).toBeInTheDocument();
  });

  it('SolutionSection has proper ARIA labels', () => {
    render(<SolutionSection features={mockFeatures} />);

    expect(screen.getByRole('region')).toHaveAttribute('aria-labelledby', 'solution-section-title');
    expect(screen.getByRole('list', { name: /solution features/i })).toBeInTheDocument();
  });

  it('FAQSection has keyboard navigation', async () => {
    render(<FAQSection faqs={mockFAQs} />);

    const trigger = screen.getByText('Test Question?');

    // Test keyboard activation
    trigger.focus();
    await userEvent.keyboard('{Enter}');

    expect(screen.getByText('Test answer')).toBeVisible();
  });

  it('CTASection buttons are focusable', () => {
    render(
      <CTASection
        primaryAction={{ label: 'Primary', href: '/primary' }}
        secondaryAction={{ label: 'Secondary', href: '/secondary' }}
      />
    );

    const primary = screen.getByRole('link', { name: /primary/i });
    const secondary = screen.getByRole('link', { name: /secondary/i });

    expect(primary).toHaveAttribute('href', '/primary');
    expect(secondary).toHaveAttribute('href', '/secondary');
  });

  it('TechnicalProof progress bars have proper labels', () => {
    render(<TechnicalProof metrics={mockMetrics} />);

    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-label', 'Test Metric: 42% complete');
  });
});
