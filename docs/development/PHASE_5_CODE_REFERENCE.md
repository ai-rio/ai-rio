# Phase 5: Code Reference Guide

## File Structure

```
/home/carlos/projects/ai-rio/
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       └── page.tsx                    (625 lines - MODIFIED)
│   └── components/
│       ├── simplified-contact-form.tsx     (253 lines - NEW)
│       └── service-sections/
│           ├── technical-proof.tsx         (existing)
│           ├── dashboard-showcase.tsx      (existing)
│           ├── deliverables-section.tsx    (existing)
│           └── problem-section.tsx         (existing)
└── public/
    └── dashboard-screenshot.png            (NEW - 62KB)
```

## Key Components

### 1. SimplifiedContactForm Component

**Location:** `/home/carlos/projects/ai-rio/src/components/simplified-contact-form.tsx`

**Props Interface:**
```typescript
export interface SimplifiedContactFormProps {
  locale?: string;
  className?: string;
  title?: string;
  description?: string;
  contextText?: string;
  submitLabel?: string;
  onSubmit?: (values: ContactFormValues) => void | Promise<void>;
  emailAddress?: string;
}
```

**Form Schema:**
```typescript
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().optional(),
});
```

**Usage Example:**
```tsx
<SimplifiedContactForm
  locale="en"
  contextText="Start with an audit or book a call"
  description="Tell me about your billing challenges..."
  emailAddress="hello@ai-rio.com"
/>
```

### 2. TechnicalProof Component Usage

**Props:**
```typescript
<TechnicalProof
  locale={locale}
  title="Production-Grade Infrastructure"
  subtitle="Real metrics from the actual codebase"
  metrics={[
    {
      id: 'coverage',
      label: 'Test Coverage',
      value: 99.5,
      suffix: '%',
      description: 'Comprehensive test suite',
      progress: 99.5,
      trend: 'up'
    },
    // ... more metrics
  ]}
  highlightedMetric="coverage"
  layout="grid"
/>
```

### 3. DashboardShowcase Component Usage

**Props:**
```typescript
<DashboardShowcase
  locale={locale}
  title="See Your Costs in Real-Time"
  subtitle="Monitor your LLM spending..."
  views={[
    {
      id: 'dashboard',
      title: 'AI Cost Dashboard',
      imageSrc: '/dashboard-screenshot.png',
      imageAlt: 'AI.RIO dashboard showing costs',
      device: 'desktop',
      badge: 'Live Demo'
    }
  ]}
  cta={{
    label: 'View Live Demo',
    href: 'https://demo.ai-rio.com',
    external: true
  }}
  aspectRatio="16/9"
/>
```

### 4. ProblemSection Component Usage

**Props:**
```typescript
<ProblemSection
  title="The AI Cost Black Box Problem"
  subtitle="Most AI SaaS companies are losing money..."
  problems={[
    {
      id: 'no-visibility',
      title: 'No Cost Visibility',
      description: 'AI costs are scattered...',
      severity: 'critical',
      metric: '87% of AI SaaS companies'
    },
    // ... more problems
  ]}
  alertMessage={{
    title: 'The Margin Killer',
    description: 'You can\'t optimize what you can\'t see...'
  }}
/>
```

### 5. DeliverablesSection Component Usage

**Props:**
```typescript
<DeliverablesSection
  locale={locale}
  title="How We Work"
  subtitle="Transparent process, clear deliverables..."
  phases={[
    {
      phase: '1',
      title: 'Discovery & Audit',
      duration: 'Week 1',
      price: 0,
      deliverables: [
        {
          id: 'd1',
          title: 'Billing Audit',
          description: 'Comprehensive analysis...',
          status: 'pending'
        }
      ]
    },
    // ... more phases
  ]}
  totalPrice={5000}
  cta={{
    label: 'Start Your Project',
    href: '#contact'
  }}
/>
```

## Service Card Pattern

**Reusable pattern for service cards:**
```tsx
<Card className="border-zinc-800 bg-zinc-900 hover:border-indigo-500/50 transition-all">
  <CardHeader>
    <Badge variant="secondary">Category</Badge>
    <CardTitle>Service Title</CardTitle>
    <div className="text-2xl font-bold text-indigo-400">Price</div>
    <CardDescription>Timeline</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Description text</p>
    <Button asChild variant="outline">
      <Link href="/service-page">
        Learn More
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  </CardContent>
</Card>
```

## Hero Section Pattern

```tsx
<section className="relative px-6 py-24 lg:px-8 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20" />
  <div className="mx-auto max-w-4xl relative">
    <div className="text-center space-y-8">
      <Badge>Platform Badge</Badge>
      <h1>Main Headline</h1>
      <h2>Subheadline</h2>
      <p>Description</p>
      <div className="flex gap-4">
        <Button>Primary CTA</Button>
        <Button variant="outline">Secondary CTA</Button>
      </div>
      <div className="flex gap-6">Trust Indicators</div>
    </div>
  </div>
</section>
```

## Internationalization Pattern

```tsx
{locale === 'en'
  ? 'English text'
  : locale === 'pt'
  ? 'Portuguese text'
  : 'Spanish text'
}
```

Or using translations:
```tsx
const t = await getTranslations({ locale });
{t("services.payment_recovery.title")}
```

## Icon Usage

**From lucide-react:**
```tsx
import { ArrowRight, CheckCircle2, TrendingUp, Zap, Shield } from 'lucide-react';

<ArrowRight className="h-4 w-4" />
<CheckCircle2 className="h-4 w-4 text-green-500" />
<TrendingUp className="h-3 w-3 mr-1" />
```

## Responsive Design Patterns

**Grid layouts:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

**Flex layouts:**
```tsx
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  {/* Buttons */}
</div>
```

**Text scaling:**
```tsx
<h1 className="text-4xl sm:text-6xl lg:text-7xl">
  Headline
</h1>
```

## Color Palette Reference

**Backgrounds:**
- `bg-zinc-950` - Main page background
- `bg-zinc-900` - Card backgrounds
- `bg-zinc-900/30` - Section backgrounds with opacity

**Borders:**
- `border-zinc-800` - Card borders
- `border-indigo-500/50` - Hover borders

**Text:**
- `text-zinc-50` - Primary text
- `text-zinc-300` - Secondary text
- `text-zinc-400` - Body text
- `text-zinc-500` - Muted text

**Accents:**
- `text-indigo-400` - Price/highlight text
- `text-indigo-600` - Primary buttons
- `text-indigo-500` - Hover states

**Severity:**
- `text-destructive` - Critical/high severity
- `text-green-500` - Success/checkmarks
- `text-blue-500` - Info/trust badges

## Spacing Reference

**Padding:**
- `px-6 py-24` - Section padding
- `p-6` - Card padding
- `py-12` - Footer padding

**Margins:**
- `mb-4` - Small bottom margin
- `mb-12` - Medium bottom margin
- `mt-10` - Medium top margin

**Gaps:**
- `gap-4` - Button gaps
- `gap-6` - Card gaps
- `gap-2` - Small element gaps

## Component Combinations

**Card with Badge and Button:**
```tsx
<Card>
  <CardHeader>
    <Badge variant="secondary">Label</Badge>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Description</p>
    <Button asChild>
      <Link href="/">CTA</Link>
    </Button>
  </CardContent>
</Card>
```

**Section with Title and Subtitle:**
```tsx
<section>
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold">Title</h2>
    <p className="text-lg text-zinc-400">Subtitle</p>
  </div>
  {/* Content */}
</section>
```

## Form Validation Pattern

```tsx
const form = useForm<ContactFormValues>({
  resolver: zodResolver(contactFormSchema),
  defaultValues: { name: '', email: '', message: '' }
});

<FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Label</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Link Patterns

**Internal links:**
```tsx
<Link href={`/${locale}/services/payment-recovery`}>
  Learn More
</Link>
```

**External links:**
```tsx
<a
  href="https://demo.ai-rio.com"
  target="_blank"
  rel="noopener noreferrer"
>
  View Live Demo
</a>
```

**Anchor links:**
```tsx
<a href="#contact">Book a Call</a>
```

## Import Patterns

```tsx
// Server components
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

// Components
import { ComponentName } from '@/components/component';

// UI components
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Icons
import { IconName } from 'lucide-react';

// Utilities
import { cn } from '@/lib/utils';
```

## Tailwind Class Combinations

**Hover effects:**
```tsx
className="hover:border-indigo-500/50 transition-all hover:shadow-lg"
```

**Gradient backgrounds:**
```tsx
className="bg-gradient-to-br from-indigo-950/50 to-zinc-900"
```

**Responsive classes:**
```tsx
className="text-4xl sm:text-6xl lg:text-7xl"
```

**Conditional classes:**
```tsx
className={cn(
  'base-class',
  condition && 'conditional-class',
  variant === 'primary' && 'primary-class'
)}
```

## Accessibility Patterns

**Semantic HTML:**
```tsx
<section aria-labelledby="section-title">
  <h2 id="section-title">Title</h2>
  {/* Content */}
</section>
```

**ARIA labels:**
```tsx
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>
```

**Icon with hidden text:**
```tsx
<CheckCircle2 className="h-4 w-4" aria-hidden="true" />
<span>Text</span>
```
