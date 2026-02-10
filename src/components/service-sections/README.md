# AI.RIO Service Sections

A collection of 9 reusable, composite UI components built with shadcn/ui for the AI.RIO website. These components are designed to showcase services, address pain points, and drive conversions.

## Components

| Component | Purpose | shadcn/ui Components Used |
|-----------|---------|---------------------------|
| `ProblemSection` | Display pain points | Card, Alert, Badge |
| `SolutionSection` | Feature highlights | Card, Badge, Button |
| `DeliverablesSection` | Timeline & pricing | Card, Badge, Separator, Button |
| `WhoForSection` | Customer profiles | Card, Avatar, Badge |
| `RelatedServices` | Service links | Card, Button |
| `FAQSection` | Expandable FAQs | Accordion, Card |
| `CTASection` | Call-to-action | Button, Card, Badge |
| `TechnicalProof` | Stats & metrics | Card, Progress, Badge |
| `DashboardShowcase` | Screenshot frame | Card, Tabs, Button |

## Installation

Components are already installed in `/src/components/service-sections/`. Import from the index:

```tsx
import {
  ProblemSection,
  SolutionSection,
  CTASection
} from '@/components/service-sections';
```

## Quick Start

```tsx
'use client';

import { ProblemSection } from '@/components/service-sections';

export function MyPage() {
  const problems = [
    {
      id: '1',
      title: 'No Visibility',
      description: 'Your AI costs are scattered across providers',
      severity: 'critical' as const,
    },
  ];

  return (
    <ProblemSection
      title="Why Your AI Costs Are Spiraling"
      problems={problems}
      alertMessage={{
        title: 'The Black Box Problem',
        description: 'You can\'t optimize what you can\'t see'
      }}
    />
  );
}
```

## Component Documentation

### ProblemSection

Displays pain points with severity indicators and optional alert message.

**Props:**

```tsx
interface ProblemSectionProps {
  locale?: string;                    // Default: 'en'
  className?: string;
  title?: string;                     // Default: 'The Problem'
  subtitle?: string;
  problems: ProblemPoint[];
  alertMessage?: {
    title: string;
    description: string;
  };
  variant?: 'default' | 'compact';    // Default: 'default'
}

interface ProblemPoint {
  id: string;
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  icon?: React.ReactNode;
  metric?: string;
}
```

**Features:**
- Color-coded severity badges
- Optional alert message for emphasis
- Metric display for impact quantification
- Responsive grid layout

**Accessibility:**
- Semantic HTML with proper ARIA labels
- Keyboard navigable
- Screen reader friendly

---

### SolutionSection

Showcases features with icons, badges, and optional CTA.

**Props:**

```tsx
interface SolutionSectionProps {
  locale?: string;
  className?: string;
  title?: string;                     // Default: 'The Solution'
  subtitle?: string;
  features: FeatureItem[];
  cta?: {
    label: string;
    href: string;
    variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  };
  layout?: 'grid' | 'list' | 'bento'; // Default: 'grid'
}

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: 'sparkles' | 'zap' | 'shield' | 'chart' | 'puzzle' | 'check' | React.ReactNode;
  badge?: string;
  highlighted?: boolean;
}
```

**Features:**
- Built-in icon set (lucide-react)
- Highlighted variant for emphasis
- Multiple layout options
- Optional CTA button

---

### DeliverablesSection

Timeline-based deliverables with pricing and status tracking.

**Props:**

```tsx
interface DeliverablesSectionProps {
  locale?: string;
  className?: string;
  title?: string;                     // Default: 'Deliverables & Pricing'
  subtitle?: string;
  phases: PhaseDeliverables[];
  totalPrice?: number;
  cta?: {
    label: string;
    href: string;
  };
}

interface PhaseDeliverables {
  phase: string;
  title: string;
  description?: string;
  duration: string;
  price: number;
  deliverables: Deliverable[];
}

interface Deliverable {
  id: string;
  title: string;
  description: string;
  status?: 'pending' | 'in-progress' | 'completed';
  deliveryWeek?: string;
}
```

**Features:**
- Multi-phase timeline
- Status tracking with visual indicators
- Currency formatting (locale-aware)
- Total price display
- Phase separators

---

### WhoForSection

Customer profile cards with MRR range and pain points.

**Props:**

```tsx
interface WhoForSectionProps {
  locale?: string;
  className?: string;
  title?: string;                     // Default: 'Who This Is For'
  subtitle?: string;
  profiles: CustomerProfile[];
  cta?: {
    label: string;
    href: string;
  };
}

interface CustomerProfile {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  initials: string;
  mrr?: { min: number; max: number };
  stage: string;
  painPoints: string[];
  icon?: 'building' | 'users' | 'zap' | 'growth' | React.ReactNode;
}
```

**Features:**
- Avatar support with fallback initials
- MRR range formatting
- Pain point lists
- Multiple icon options

---

### RelatedServices

Cross-promotion cards for related services.

**Props:**

```tsx
interface RelatedServicesProps {
  locale?: string;
  className?: string;
  title?: string;                     // Default: 'Related Services'
  subtitle?: string;
  services: RelatedService[];
  layout?: 'grid' | 'horizontal';     // Default: 'grid'
}

interface RelatedService {
  id: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
  external?: boolean;
  icon?: React.ReactNode;
}
```

**Features:**
- Grid or horizontal layout
- External link indicators
- Optional badges
- Hover effects

---

### FAQSection

Expandable accordion-style FAQ with category support.

**Props:**

```tsx
interface FAQSectionProps {
  locale?: string;
  className?: string;
  title?: string;                     // Default: 'Frequently Asked Questions'
  subtitle?: string;
  faqs: FAQItem[];
  collapsible?: boolean;              // Default: true
  defaultOpen?: string[];
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
```

**Features:**
- Category grouping
- Single or multiple expand mode
- Default open items
- Keyboard navigation
- Accessible ARIA states

---

### CTASection

Bold call-to-action with trust signals.

**Props:**

```tsx
interface CTASectionProps {
  locale?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
  badge?: string;
  alignment?: 'left' | 'center' | 'right';  // Default: 'center'
  variant?: 'default' | 'outlined' | 'filled';  // Default: 'default'
  trustSignals?: string[];
}

interface CTAAction {
  label: string;
  href: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';
  icon?: 'arrow' | 'check' | 'mail' | 'calendar' | React.ReactNode;
}
```

**Features:**
- Three visual variants
- Flexible alignment
- Trust signals list
- Dual action support
- Icon options

---

### TechnicalProof

Metric cards with progress bars and trend indicators.

**Props:**

```tsx
interface TechnicalProofProps {
  locale?: string;
  className?: string;
  title?: string;                     // Default: 'Technical Proof'
  subtitle?: string;
  metrics: Metric[];
  highlightedMetric?: string;
  layout?: 'grid' | 'list';           // Default: 'grid'
}

interface Metric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description?: string;
  progress?: number;
  trend?: 'up' | 'down' | 'neutral';
}
```

**Features:**
- Visual progress bars
- Trend indicators
- Highlighted metric variant
- Number formatting (locale-aware)
- Responsive grid

---

### DashboardShowcase

Interactive tabbed view for screenshots/demos.

**Props:**

```tsx
interface DashboardShowcaseProps {
  locale?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  views: DashboardView[];
  defaultView?: string;
  cta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2';  // Default: '16/9'
  rounded?: boolean;                  // Default: true
}

interface DashboardView {
  id: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  device?: 'desktop' | 'tablet' | 'mobile';
  badge?: string;
}
```

**Features:**
- Tabbed navigation for multiple views
- Aspect ratio options
- Device badges
- Image optimization ready (Next.js Image)
- External link support

## Design Guidelines

### Brand Voice

All components follow the AI.RIO brand voice:
- **Bold and confident**: "Your margins are a black box. I built a flashlight."
- **Direct and clear**: No fluff, just value
- **Action-oriented**: Every component should drive toward a goal

### Accessibility (WCAG 2.2 AA)

All components meet accessibility standards:
- Semantic HTML elements
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Color contrast compliance

### Responsive Design

Mobile-first approach with breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Dark Theme

All components work with dark theme (`zinc-950` background):
- Uses CSS custom properties
- Respects `bg-background` and `text-foreground` tokens
- Proper contrast in both themes

### i18n Support

Components are internationalization ready:
- `locale` prop for number/currency formatting
- `next-intl` compatible patterns
- Translatable text via props

## Examples

See `/src/components/service-sections/examples.tsx` for complete usage examples including:

- Realistic data for AI.RIO services
- All 9 components in context
- Complete page layout example
- Prop combinations and variations

## Testing

Run tests with:

```bash
npm test src/components/service-sections
```

Test file: `/src/components/service-sections/__tests__/service-sections.test.tsx`

## File Structure

```
src/components/service-sections/
├── problem-section.tsx
├── solution-section.tsx
├── deliverables-section.tsx
├── who-for-section.tsx
├── related-services.tsx
├── faq-section.tsx
├── cta-section.tsx
├── technical-proof.tsx
├── dashboard-showcase.tsx
├── index.ts
├── examples.tsx
├── __tests__/
│   └── service-sections.test.tsx
└── README.md
```

## TypeScript Support

All components are fully typed with TypeScript:
- Strict mode compatible
- No `any` types
- Proper interface exports
- Prop type definitions exported

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- Client components marked with `'use client'` where needed
- Optimized re-renders with proper React patterns
- Lazy loading ready (code splitting)
- Image optimization via Next.js Image component

## Contributing

When adding new features:
1. Maintain TypeScript strict typing
2. Ensure WCAG 2.2 AA compliance
3. Test on mobile and desktop
4. Add examples to `examples.tsx`
5. Update tests

## License

Proprietary - AI.RIO internal use only.
