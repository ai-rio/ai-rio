# i18n Modularization Migration Plan

## Executive Summary

This document outlines a comprehensive plan to modularize the internationalization (i18n) structure for the AI.RIO project. The current setup has some good foundations but suffers from hardcoded content in pages and monolithic translation files (`ui.json`) that are difficult to maintain.

**Core Principle**: **No monoliths.** Every translation file serves a single, specific component or feature. No "common" or "shared" files that accumulate content over time.

**Current State**: Partially modular with `ui.json` and `metadata.json` per locale, but:
- `ui.json` is a monolith containing all UI text mixed together
- Service pages contain hardcoded English content
- No clear one-to-one mapping between components and translation files

**Target State**: Fully modular, component-based translation structure where each file maps to exactly one component or page section.

---

## Current State Analysis

### What's Working

| Aspect | Status | Notes |
|--------|--------|-------|
| Locale separation | ✅ Good | Separate folders for `en/`, `es/`, `pt/` |
| Basic domain split | ✅ Good | `ui.json` vs `metadata.json` |
| Namespace usage | ✅ Good | Components use `useTranslations('nav')` |
| Request config | ✅ Good | Properly loads multiple message files |

### Problems Identified

#### 1. Monolithic Translation Files (Critical)
The current `ui.json` contains all UI text mixed together:

```json
// ❌ Current: ui.json - A monolith with everything
{
  "nav": { "home": "Home", "services": "Services", ... },
  "footer": { "tagline": "...", "copyright": "...", ... },
  "hero": { "title": "...", "subtitle": "...", ... },
  "services": { "title": "...", ... },
  "contact": { "title": "...", "form": { ... } },
  "Blog": { "meta": { ... } }
}
```

**Problems with monoliths:**
- Difficult to find what you're looking for
- Hard to track what changes affect which components
- Merge conflicts are frequent and messy
- Translators have no clear scope
- File becomes unwieldy as the app grows

#### 2. Hardcoded Page Content (Critical)
Service pages contain extensive hardcoded English content that cannot be translated:

```tsx
// src/app/[locale]/services/payment-recovery/page.tsx
const problems: ProblemPoint[] = [
  {
    id: '1',
    title: '47.6% Default Recovery Rate',  // ❌ Hardcoded
    description: 'Stripe\'s default settings recover less than half...',
    severity: 'critical',
    metric: '$52K avg annual loss for $100K MRR',
  },
  // ... more hardcoded content
];
```

#### 2. Inconsistent Translation Usage
- Metadata uses translations ✅
- Page content is hardcoded ❌
- Components use `useTranslations` ✅
- No server-side translation usage for page content

#### 3. Manual Locale Path Handling
Components manually construct paths instead of using next-intl navigation:

```tsx
// ❌ Current approach
const basePath = locale === 'en' ? '' : `/${locale}`;
<Link href={`${basePath}/services`}>
```

Should be:
```tsx
// ✅ Recommended approach
import { Link } from '@/i18n/navigation';
<Link href="/services">
```

#### 4. Translation Tracking Difficulty
- No clear mapping between components and translation files
- Changes in `ui.json` affect multiple components unclearly
- No way to know which component needs translation updates

---

## Proposed Modular Architecture

### Core Principle: One Component = One Translation File

**No monoliths. No "common" files. No "shared" files.**

Each component, page, or feature has its own dedicated translation file. If a component is deleted, its translation file is deleted. Simple.

### File Structure

```
src/i18n/
├── routing.ts                    # Already exists - locale routing config
├── request.ts                    # Already exists - request config
├── navigation.ts                 # ✨ NEW - locale-aware navigation helpers
├── messages/
│   ├── en/
│   │   ├── components/           # One file per component
│   │   │   ├── navbar.json       # Navbar component ONLY
│   │   │   ├── footer.json       # Footer component ONLY
│   │   │   ├── contact-form.json # Contact form ONLY
│   │   │   └── hero.json         # Hero section ONLY
│   │   ├── pages/                # One file per page
│   │   │   ├── home.json         # Home page ONLY
│   │   │   ├── about.json        # About page ONLY
│   │   │   ├── contact.json      # Contact page ONLY
│   │   │   └── blog.json         # Blog listing page ONLY
│   │   ├── services/             # One file per service page
│   │   │   ├── payment-recovery.json
│   │   │   ├── usage-pricing.json
│   │   │   ├── ai-tracking.json
│   │   │   ├── billing-audit.json
│   │   │   └── complete-billing.json
│   │   └── metadata.json         # Keep existing (already modular)
│   ├── es/                       # Mirror en/ structure exactly
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── pt/                       # Mirror en/ structure exactly
│       ├── components/
│       ├── pages/
│       └── services/
├── loaders/
│   └── load-locale-content.ts    # Server-side content loader
```

### Directory Organization

```
messages/
├── components/       # Reusable UI components
│   ├── navbar.json   # ← src/components/navbar.tsx
│   ├── footer.json   # ← src/components/footer.tsx
│   └── ...
├── pages/           # Full page content
│   ├── home.json     # ← src/app/[locale]/page.tsx
│   ├── about.json    # ← src/app/[locale]/about/page.tsx
│   └── ...
└── services/        # Service pages (could also be under pages/)
    ├── payment-recovery.json  # ← src/app/[locale]/services/payment-recovery/page.tsx
    └── ...
```

### Translation File Examples

#### `components/navbar.json` - Navbar component ONLY

```json
{
  "home": "Home",
  "services": "Services",
  "process": "Process",
  "about": "About",
  "blog": "Blog",
  "contact": "Contact"
}
```

Usage: `useTranslations('components/navbar')` → `t('home')`

#### `components/footer.json` - Footer component ONLY

```json
{
  "tagline": "Billing Infrastructure Specialist for AI SaaS",
  "navigation": "Navigation",
  "home": "Home",
  "services": "Services",
  "about": "About",
  "blog": "Blog",
  "servicesTitle": "Services",
  "paymentRecovery": "Payment Recovery",
  "usagePricing": "Usage Pricing",
  "aiTracking": "AI Tracking",
  "billingAudit": "Billing Audit",
  "contactTitle": "Contact",
  "getInTouch": "Get in Touch",
  "copyright": "© {year} AI.RIO. All rights reserved."
}
```

Usage: `useTranslations('components/footer')` → `t('tagline')`

#### `components/contact-form.json` - Contact form ONLY

```json
{
  "name": "Your name",
  "email": "Email address",
  "company": "Company",
  "service": "Which service interests you?",
  "message": "Tell me about your billing challenges",
  "submit": "Send Message"
}
```

Usage: `useTranslations('components/contact-form')` → `t('name')`

#### `components/hero.json` - Hero section (reusable)

```json
{
  "title": "Your AI margins are bleeding. Here's how to stop.",
  "subtitle": "I help AI SaaS companies track and optimize their LLM costs—so you know your true margins and stop losing money on heavy users.",
  "cta": "Get a Cost Audit"
}
```

Usage: `useTranslations('components/hero')` → `t('title')`

#### `services/payment-recovery.json` - This service page ONLY

```json
{
  "hero": {
    "badge": "1 week",
    "price": "$2,000-4,000",
    "title": "Stripe Failed Payment Recovery",
    "subtitle": "Stop leaving revenue on the table. Recover 65-70% of failed payments.",
    "description": "Stripe's default settings recover less than half of failed payments. I build automated dunning workflows that recover 65-70%. Delivered in 1 week."
  },
  "metrics": {
    "title": "The Cost of Passive Recovery",
    "subtitle": "Stripe defaults are not enough. Here is what you are losing.",
    "items": [
      {
        "id": "1",
        "label": "Recovery Rate Improvement",
        "value": 68,
        "suffix": "%",
        "prefix": "47.6 → 65-70",
        "trend": "up",
        "description": "Stripe default to AI.RIO optimized"
      }
    ]
  },
  "problems": {
    "title": "Why Your Recovery Rate Is 47.6%",
    "subtitle": "Stripe's default dunning is passive. Your customers need better reminders, better timing, and smarter retries.",
    "alert": {
      "title": "Involuntary Churn Is Expensive",
      "description": "Acquiring a new customer costs 5-25x more than recovering an existing one. Failed payment recovery is pure profit."
    },
    "items": [
      {
        "id": "1",
        "title": "47.6% Default Recovery Rate",
        "description": "Stripe's default settings recover less than half of failed payments. You are leaving thousands on the table every month.",
        "severity": "critical",
        "metric": "$52K avg annual loss for $100K MRR"
      }
    ]
  },
  "solution": {
    "title": "The AI.RIO Solution",
    "subtitle": "Automated dunning workflows with intelligent retry logic.",
    "features": [
      {
        "id": "1",
        "title": "Automated Dunning Workflows",
        "description": "Strategic email sequences with the right messaging, timing, and urgency to recover payments.",
        "badge": "65-70% recovery rate",
        "highlighted": true
      }
    ]
  },
  "deliverables": {
    "title": "What You Will Get",
    "subtitle": "Fixed scope, fixed price. Delivered in 7-10 days.",
    "phases": [...]
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "subtitle": "Direct answers about payment recovery.",
    "items": [...]
  },
  "cta": {
    "title": "Stop Losing Revenue to Failed Payments",
    "subtitle": "Every failed payment is recoverable. Let me show you how.",
    "description": "Book a free discovery call. I will analyze your failed payments and estimate recovery potential.",
    "primaryButton": "Book Discovery Call",
    "secondaryButton": "See Billing Audit",
    "badge": "Response within 24 hours",
    "trustSignals": [
      "Free failed payment analysis",
      "Clear ROI estimate",
      "7-10 day delivery",
      "30-day monitoring included"
    ]
  }
}
```

---

## Implementation Components

### 1. Navigation Helper (`src/i18n/navigation.ts`)

Replace manual path construction with next-intl's navigation:

```typescript
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
} = createNavigation(routing);
```

### 2. Update `request.ts` for Modular Loading

```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Load all translation files (they're small now)
  const [navbar, footer, contactForm, hero, home, about, contact, blog, paymentRecovery, usagePricing, aiTracking, billingAudit, completeBilling, metadata] = await Promise.all([
    import(`./messages/${locale}/components/navbar.json`),
    import(`./messages/${locale}/components/footer.json`),
    import(`./messages/${locale}/components/contact-form.json`),
    import(`./messages/${locale}/components/hero.json`),
    import(`./messages/${locale}/pages/home.json`),
    import(`./messages/${locale}/pages/about.json`),
    import(`./messages/${locale}/pages/contact.json`),
    import(`./messages/${locale}/pages/blog.json`),
    import(`./messages/${locale}/services/payment-recovery.json`),
    import(`./messages/${locale}/services/usage-pricing.json`),
    import(`./messages/${locale}/services/ai-tracking.json`),
    import(`./messages/${locale}/services/billing-audit.json`),
    import(`./messages/${locale}/services/complete-billing.json`),
    import(`./messages/${locale}/metadata.json`),
  ]);

  return {
    locale,
    messages: {
      'components/navbar': navbar.default,
      'components/footer': footer.default,
      'components/contact-form': contactForm.default,
      'components/hero': hero.default,
      'pages/home': home.default,
      'pages/about': about.default,
      'pages/contact': contact.default,
      'pages/blog': blog.default,
      'services/payment-recovery': paymentRecovery.default,
      'services/usage-pricing': usagePricing.default,
      'services/ai-tracking': aiTracking.default,
      'services/billing-audit': billingAudit.default,
      'services/complete-billing': completeBilling.default,
      metadata: metadata.default,
    }
  };
});
```

### 3. Content Builders for Complex Pages

For service pages with structured data (problems, features, FAQs), use builders:

```typescript
// src/i18n/builders/service-pages.ts
import type {
  ProblemPoint,
  FeatureItem,
  Metric,
  FAQItem,
} from '@/components/service-sections';
import type { TranslationFn } from './types';

export function buildProblems(
  t: TranslationFn,
  rawProblems: unknown[]
): ProblemPoint[] {
  return rawProblems.map((item: any) => ({
    ...item,
    severity: item.severity || 'medium',
  }));
}

export function buildFeatures(
  rawFeatures: unknown[]
): FeatureItem[] {
  return rawFeatures as FeatureItem[];
}

export function buildMetrics(
  rawMetrics: unknown[]
): Metric[] {
  return rawMetrics as Metric[];
}

export function buildFAQs(
  rawFAQs: unknown[]
): FAQItem[] {
  return rawFAQs as FAQItem[];
}
```

---

## Migration Steps

### Phase 1: Foundation Setup (1-2 hours)

1. **Create the new modular file structure**
   ```bash
   # Create component directories
   mkdir -p src/i18n/messages/en/components
   mkdir -p src/i18n/messages/es/components
   mkdir -p src/i18n/messages/pt/components

   # Create page directories
   mkdir -p src/i18n/messages/en/pages
   mkdir -p src/i18n/messages/es/pages
   mkdir -p src/i18n/messages/pt/pages

   # Create service directories
   mkdir -p src/i18n/messages/en/services
   mkdir -p src/i18n/messages/es/services
   mkdir -p src/i18n/messages/pt/services

   # Create builders directory
   mkdir -p src/i18n/builders
   ```

2. **Create `navigation.ts`**
   - Add `src/i18n/navigation.ts` with `createNavigation`

3. **Create builder utilities**
   - Add `src/i18n/builders/service-pages.ts` for structured data

4. **Update `request.ts`**
   - Modify to load all modular files (see example above)

### Phase 2: Extract Components from ui.json (1 hour)

1. **Create component files** - Split `ui.json` into:
   - `components/navbar.json` (from `ui.json` nav section)
   - `components/footer.json` (from `ui.json` footer section)
   - `components/hero.json` (from `ui.json` hero section)
   - `components/contact-form.json` (from `ui.json` contact.form section)

2. **Update component imports**
   - `src/components/navbar.tsx`: `useTranslations('components/navbar')`
   - `src/components/footer.tsx`: `useTranslations('components/footer')`

### Phase 3: Migrate One Service Page (Pilot) (2-3 hours)

1. **Extract payment-recovery content**
   - Create `src/i18n/messages/en/services/payment-recovery.json`
   - Move ALL hardcoded content from page to JSON (hero, problems, features, metrics, FAQ, CTA)

2. **Create Spanish and Portuguese versions**
   - Create `es/services/payment-recovery.json`
   - Create `pt/services/payment-recovery.json`

3. **Refactor the page component**
   ```tsx
   // Before
   const problems: ProblemPoint[] = [ /* hardcoded */ ];

   // After
   import { getTranslations } from 'next-intl/server';
   const t = await getTranslations('services/payment-recovery');
   const problems = t.raw('problems.items') as ProblemPoint[];
   ```

4. **Update imports**
   - Replace `Link from 'next/link'` with `Link from '@/i18n/navigation'`
   - Remove manual `basePath` logic

### Phase 4: Migrate Remaining Service Pages (4-6 hours)

Repeat Phase 3 for:
- `usage-pricing`
- `ai-tracking`
- `billing-audit`
- `complete-billing`

### Phase 5: Migrate Other Pages (2-3 hours)

1. **Home page** → `pages/home.json`
2. **Contact page** → `pages/contact.json` (reuse `components/contact-form.json`)
3. **About page** → `pages/about.json`
4. **Blog pages** → `pages/blog.json`

### Phase 6: Cleanup (1 hour)

1. **Delete old monolith files**
   ```bash
   rm src/i18n/messages/en/ui.json
   rm src/i18n/messages/es/ui.json
   rm src/i18n/messages/pt/ui.json
   ```

2. **Verify all translations work**
   - Test each locale
   - Test each page
   - Check for missing keys

### Phase 7: Testing & Validation (1 hour)

1. **Test all locales** - Verify English, Spanish, Portuguese all load correctly
2. **Test all pages** - Check each page renders properly
3. **Test navigation** - Verify locale-aware links work correctly
4. **Check for missing translations** - Compare file structure across locales

---

## Before/After Code Comparison

### Before: Current Approach

```tsx
// src/app/[locale]/services/payment-recovery/page.tsx
import Link from 'next/link';

export default async function PaymentRecoveryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const basePath = locale === 'en' ? '' : `/${locale}`;

  const problems: ProblemPoint[] = [
    {
      id: '1',
      title: '47.6% Default Recovery Rate',  // ❌ Hardcoded
      description: 'Stripe\'s default settings recover less than half...',
      severity: 'critical',
      metric: '$52K avg annual loss for $100K MRR',
    },
    // ... more hardcoded content
  ];

  return (
    <>
      <section className="py-16">
        <h1>Stripe Failed Payment Recovery</h1>  {/* ❌ Hardcoded */}
        <p>Stop leaving revenue on the table...</p>  {/* ❌ Hardcoded */}
        <Link href={`${basePath}/contact`}>Contact</Link>  {/* ❌ Manual path */}
      </section>
      <ProblemSection problems={problems} />
    </>
  );
}
```

### After: Truly Modular i18n Approach

```tsx
// src/app/[locale]/services/payment-recovery/page.tsx
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function PaymentRecoveryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('services/payment-recovery');

  // No builder needed - direct access to structured data
  const problems = t.raw('problems.items') as ProblemPoint[];
  const features = t.raw('solution.features') as FeatureItem[];
  const metrics = t.raw('metrics.items') as Metric[];

  return (
    <>
      <section className="py-16">
        <div className="flex items-center gap-2">
          <span>{t('hero.badge')}</span>  {/* ✅ From dedicated file */}
          <span>{t('hero.price')}</span>
        </div>
        <h1>{t('hero.title')}</h1>  {/* ✅ Translated */}
        <p>{t('hero.subtitle')}</p>
        <p>{t('hero.description')}</p>
      </section>

      <ProblemSection
        title={t('problems.title')}
        subtitle={t('problems.subtitle')}
        problems={problems}
        alertMessage={{
          title: t('problems.alert.title'),
          description: t('problems.alert.description'),
        }}
      />

      <Link href="/contact">{t('cta.primaryButton')}</Link>  {/* ✅ Locale-aware */}
    </>
  );
}
```

**Key differences from old plan:**
- ❌ No `common.json` monolith
- ❌ No `services/common.json` monolith
- ✅ Direct namespace: `services/payment-recovery`
- ✅ One file = one page/component
- ✅ Clear ownership and tracking

---

## Testing Strategy

### 1. Unit Tests for Loaders

```typescript
// __tests__/i18n/loaders.test.ts
import { buildProblems } from '@/i18n/loaders/builders';

describe('buildProblems', () => {
  it('should build problem array from translations', () => {
    const mockT = {
      raw: jest.fn().mockReturnValue([
        { id: '1', title: 'Test', description: 'Test desc', severity: 'high' }
      ])
    };

    const result = buildProblems(mockT);
    expect(result).toEqual([
      { id: '1', title: 'Test', description: 'Test desc', severity: 'high' }
    ]);
  });
});
```

### 2. Translation Completeness Check

Create a script to check for missing translations:

```typescript
// scripts/check-translations.ts
import fs from 'fs';
import path from 'path';

const locales = ['en', 'es', 'pt'];
const baseDir = 'src/i18n/messages';

function checkCompleteness() {
  const enFiles = getAllJsonFiles(path.join(baseDir, 'en'));

  for (const locale of locales.filter(l => l !== 'en')) {
    console.log(`\nChecking ${locale}...`);
    for (const file of enFiles) {
      const relativePath = path.relative(path.join(baseDir, 'en'), file);
      const targetPath = path.join(baseDir, locale, relativePath);

      if (!fs.existsSync(targetPath)) {
        console.log(`  ❌ Missing: ${relativePath}`);
      } else {
        const enKeys = getKeys(JSON.parse(fs.readFileSync(file, 'utf-8')));
        const targetKeys = getKeys(JSON.parse(fs.readFileSync(targetPath, 'utf-8')));

        const missing = enKeys.filter(k => !targetKeys.includes(k));
        if (missing.length > 0) {
          console.log(`  ⚠️  ${relativePath} missing keys:`, missing);
        }
      }
    }
  }
}
```

### 3. E2E Testing

- Test each locale's pages render correctly
- Verify language switching works
- Check all links redirect to correct locale

---

## Benefits

### For Developers

| Benefit | Description |
|---------|-------------|
| One-to-one mapping | Component ↔ Translation file is obvious |
| Fast navigation | Know exactly where to find translations |
| Easy deletion | Delete component = delete its translation file |
| No merge conflicts | Small files = fewer conflicts |
| Clear scope | Each file has a single purpose |
| Autocomplete | Namespace makes keys predictable |

### For Translators

| Benefit | Description |
|---------|-------------|
| Clear scope | Each file = one component/page |
| Small files | Easy to review and translate |
| Easy tracking | Git diffs show precise changes |
| Context preservation | Each file contains related content |
| Parallel work | Different translators can work on different files without conflicts |

### For Performance

| Benefit | Description |
|---------|-------------|
| Code splitting | Load only required translations per page |
| Smaller bundles | Unused translations not included |
| Better caching | Separate files cache independently |
| Tree shaking | Next.js can optimize unused content |

---

## Trade-offs & Considerations

### More Files (But They're Small)
- **Con**: More files to manage (~25-30 JSON files vs 2 monoliths)
- **Pro**: Each file is tiny, focused, and easy to understand
- **Pro**: No searching through 500-line monoliths
- **Pro**: Delete a component = delete 1 file (obvious cleanup)

### Initial Migration Effort
- **Con**: 10-15 hours of work to complete migration
- **Pro**: Long-term maintenance is significantly easier
- **Pro**: New features follow clear pattern

### No Shared Content (By Design)
- **Con**: Some text may be duplicated across files (e.g., button labels)
- **Pro**: Each component's translations are self-contained
- **Pro**: No hidden dependencies between files
- **Pro**: When you change a button in one place, it only affects that component (intentional)

---

## Rollout Strategy

### Option A: Big Bang (Not Recommended)
- Migrate everything at once
- High risk, difficult to debug
- **Not recommended**

### Option B: Page by Page (Recommended)
- Migrate one page at a time
- Each page is independently working
- Can pause/resume migration
- **Recommended approach**

### Option C: A/B Hybrid
- Keep old structure for existing pages
- Use new structure for new pages
- Gradually migrate old pages
- **Good for teams with limited time**

---

## Success Criteria

Migration is complete when:

- [ ] All hardcoded page content is in translation files
- [ ] All three locales (en, es, pt) have complete translations
- [ ] Components use locale-aware navigation
- [ ] No manual `basePath` construction remains
- [ ] TypeScript types exist for all content schemas
- [ ] Translation completeness check passes
- [ ] All tests pass
- [ ] All E2E scenarios work for all locales

---

## Estimated Timeline

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Foundation Setup | 1-2 hours | None |
| Phase 2: Split Components from ui.json | 1 hour | Phase 1 |
| Phase 3: Pilot Service Page | 2-3 hours | Phase 2 |
| Phase 4: Remaining Service Pages | 4-6 hours | Phase 3 |
| Phase 5: Other Pages | 2-3 hours | Phase 2 |
| Phase 6: Cleanup (delete old files) | 1 hour | Phase 4 & 5 |
| Phase 7: Testing | 1 hour | All phases |
| **Total** | **12-19 hours** | Can be spread across multiple days/sprints |

---

## Next Steps

1. **Review this plan** - Confirm the approach aligns with your goals
2. **Choose rollout strategy** - Decide on page-by-page migration
3. **Start Phase 1** - Set up the foundation structure
4. **Migrate pilot page** - Use payment-recovery as the template
5. **Validate and iterate** - Test and refine the approach before continuing

---

## Appendix: Quick Reference

### File Naming Conventions

| Content Type | Directory | File Pattern | Example |
|--------------|-----------|--------------|---------|
| Reusable Component | `components/` | `{component}.json` | `components/navbar.json` |
| Page | `pages/` | `{page}.json` | `pages/home.json` |
| Service Page | `services/` | `{service}.json` | `services/payment-recovery.json` |
| Metadata | Root | `metadata.json` | `metadata.json` (keep as-is) |

### Namespace Pattern

Namespace = File path without extension and locale:

| File Location | Namespace |
|---------------|-----------|
| `en/components/navbar.json` | `components/navbar` |
| `en/pages/home.json` | `pages/home` |
| `en/services/payment-recovery.json` | `services/payment-recovery` |

### Translation Key Patterns

```
{namespace}.{key}
{namespace}.{section}.{key}
{namespace}.{section}.{item}.{key}
```

Examples:
- `components/navbar.home`
- `pages/home.hero.title`
- `services/payment-recovery.hero.title`
- `services/payment-recovery.problems.items.0.title`

### Component Usage Pattern

```tsx
// In src/components/navbar.tsx
'use client';
import { useTranslations } from 'next-intl';

export function Navbar() {
  const t = useTranslations('components/navbar');
  return <nav>{t('home')}</nav>;
}
```

### Page Usage Pattern

```tsx
// In src/app/[locale]/services/payment-recovery/page.tsx
import { getTranslations } from 'next-intl/server';

export default async function PaymentRecoveryPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations('services/payment-recovery');

  return (
    <section>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </section>
  );
}
```

### Directory Structure Visual

```
messages/
├── en/
│   ├── components/       ← Reusable components
│   │   ├── navbar.json
│   │   ├── footer.json
│   │   └── contact-form.json
│   ├── pages/            ← Full pages
│   │   ├── home.json
│   │   ├── about.json
│   │   └── contact.json
│   ├── services/         ← Service pages
│   │   ├── payment-recovery.json
│   │   └── usage-pricing.json
│   └── metadata.json
├── es/                   ← Mirror en/ exactly
└── pt/                   ← Mirror en/ exactly
```

### Anti-Patterns to Avoid

❌ **Don't create monoliths:**
- `common.json` - becomes a junk drawer
- `shared.json` - unclear ownership
- `ui.json` - mixing everything together
- `buttons.json` - which buttons? which component?

✅ **Do create focused files:**
- `components/navbar.json` - just navbar
- `components/contact-form.json` - just contact form
- `pages/home.json` - just home page
- `services/payment-recovery.json` - just that service

### When to Create a New File

Create a new translation file when:
1. You create a new component
2. You create a new page
3. A component's translations are getting large (>100 lines)

**Rule of thumb:** If you can describe what's in the file in 3 words or less, it's well-focused.

| Good File Names | Bad File Names |
|-----------------|----------------|
| `navbar.json` | `ui.json` |
| `contact-form.json` | `forms.json` |
| `payment-recovery.json` | `services.json` |
| `hero.json` | `common.json` |

---

---

## Examples: Complete Translation Files

### Example 1: `components/navbar.json` (Simple)

```json
{
  "home": "Home",
  "services": "Services",
  "process": "Process",
  "about": "About",
  "blog": "Blog",
  "contact": "Contact"
}
```

### Example 2: `components/footer.json` (Moderate)

```json
{
  "tagline": "Billing Infrastructure Specialist for AI SaaS",
  "navigation": "Navigation",
  "home": "Home",
  "services": "Services",
  "about": "About",
  "blog": "Blog",
  "servicesTitle": "Services",
  "paymentRecovery": "Payment Recovery",
  "usagePricing": "Usage Pricing",
  "aiTracking": "AI Tracking",
  "billingAudit": "Billing Audit",
  "contactTitle": "Contact",
  "getInTouch": "Get in Touch",
  "copyright": "© {year} AI.RIO. All rights reserved."
}
```

### Example 3: `services/payment-recovery.json` (Complex)

```json
{
  "hero": {
    "badge": "1 week",
    "price": "$2,000-4,000",
    "title": "Stripe Failed Payment Recovery",
    "subtitle": "Stop leaving revenue on the table. Recover 65-70% of failed payments.",
    "description": "Stripe's default settings recover less than half..."
  },
  "metrics": {
    "title": "The Cost of Passive Recovery",
    "subtitle": "Stripe defaults are not enough. Here is what you are losing.",
    "items": [
      {
        "id": "1",
        "label": "Recovery Rate Improvement",
        "value": 68,
        "suffix": "%",
        "prefix": "47.6 → 65-70",
        "trend": "up",
        "description": "Stripe default to AI.RIO optimized"
      },
      {
        "id": "2",
        "label": "Implementation Time",
        "value": 9,
        "suffix": " days",
        "prefix": "7-10",
        "progress": 45,
        "trend": "neutral",
        "description": "From start to production"
      }
    ]
  },
  "problems": {
    "title": "Why Your Recovery Rate Is 47.6%",
    "subtitle": "Stripe's default dunning is passive...",
    "alert": {
      "title": "Involuntary Churn Is Expensive",
      "description": "Acquiring a new customer costs 5-25x more..."
    },
    "items": [
      {
        "id": "1",
        "title": "47.6% Default Recovery Rate",
        "description": "Stripe's default settings recover less than half...",
        "severity": "critical",
        "metric": "$52K avg annual loss for $100K MRR"
      }
    ]
  },
  "solution": {
    "title": "The AI.RIO Solution",
    "subtitle": "Automated dunning workflows with intelligent retry logic.",
    "features": [
      {
        "id": "1",
        "title": "Automated Dunning Workflows",
        "description": "Strategic email sequences...",
        "badge": "65-70% recovery rate",
        "highlighted": true
      }
    ]
  },
  "deliverables": {
    "title": "What You Will Get",
    "subtitle": "Fixed scope, fixed price. Delivered in 7-10 days.",
    "phases": [
      {
        "phase": "1",
        "title": "Audit & Setup",
        "description": "Analyze current recovery performance and configure dunning",
        "duration": "Days 1-2",
        "price": 500,
        "deliverables": [
          {
            "id": "1-1",
            "title": "Failed Payment Analysis",
            "description": "Analyze last 90 days of failed payments...",
            "status": "pending",
            "deliveryWeek": "Day 1"
          }
        ]
      }
    ],
    "totalPrice": 4000
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "subtitle": "Direct answers about payment recovery.",
    "items": [
      {
        "id": "1",
        "question": "What is the actual recovery rate improvement?",
        "answer": "Stripe's default configuration typically recovers 47-48%...",
        "category": "Results"
      }
    ]
  },
  "cta": {
    "title": "Stop Losing Revenue to Failed Payments",
    "subtitle": "Every failed payment is recoverable. Let me show you how.",
    "description": "Book a free discovery call...",
    "primaryButton": "Book Discovery Call",
    "secondaryButton": "See Billing Audit",
    "badge": "Response within 24 hours",
    "trustSignals": [
      "Free failed payment analysis",
      "Clear ROI estimate",
      "7-10 day delivery",
      "30-day monitoring included"
    ]
  }
}
```

---

*Document Version: 2.0 - Truly Modular (No Monoliths)*
*Last Updated: 2025-02-10*
*Author: AI.RIO Team*
