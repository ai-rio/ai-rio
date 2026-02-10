# Ai.Rio Brand Guidelines

**Version**: 1.0
**Last Updated**: February 10, 2025
**Domain**: ai.rio.br

---

## Table of Contents
1. [Brand Story](#brand-story)
2. [Visual Identity](#visual-identity)
3. [Voice and Messaging](#voice-and-messaging)
4. [Brand Applications](#brand-applications)
5. [Usage Examples](#usage-examples)

---

## Brand Story

### Mission Statement
To bring visibility and control to AI SaaS billing infrastructure — transforming revenue leaks into recovered margins through proven systems.

### Vision Statement
To become the standard for billing infrastructure in the AI SaaS ecosystem — the trusted partner that companies turn to when they need their billing to work.

### Core Values
1. **Visibility** — We bring light to what's hidden in your billing
2. **Speed** — Weeks, not months. Time is money.
3. **Certainty** — Proven, production-tested systems. No experiments.
4. **Transparency** — Clear pricing, clear deliverables, clear handoff.
5. **Ownership** — Your team owns it after we leave. No vendor lock-in.

### Brand Personality
Ai.Rio is the expert you call when billing becomes existential. Analytical but not academic. Direct but not blunt. We've seen the problems before, we've built the systems to fix them, and we deliver with precision.

### Brand Archetype
**Primary**: The Sage (65%) — Knowledge, expertise, truth-seeking
**Secondary**: The Ruler (35%) — Control, order, infrastructure

The Sage seeks understanding and truth — we find what's hidden in your billing. The Ruler brings control and order — we build infrastructure that puts you back in command.

---

## Visual Identity

### Logo

#### Primary Logo
The Ai.Rio wordmark in Geist Sans 600 with the period as the visual anchor — a glowing node representing connection points in billing infrastructure.

**Usage Guidelines**:
- Clear space: Height of "A" in all directions
- Minimum size: 120px wide (digital), 20mm wide (print)
- File formats: SVG (preferred), PNG, WebP

#### Logo Variations
- **Full Color (Dark)**: White wordmark with Electric Blue dot
- **Full Color (Light)**: Navy wordmark with Electric Blue dot
- **Monochrome**: All white or all navy
- **Reversed**: White on dark backgrounds
- **Icon**: The period alone for favicon/app icon

**Do's**:
- ✓ Maintain proper clear space
- ✓ Use approved color versions
- ✓ Maintain aspect ratio
- ✓ Use SVG for scaling

**Don'ts**:
- ✗ Distort or stretch the logo
- ✗ Change logo colors
- ✗ Add effects or shadows (except approved animation)
- ✗ Remove or obscure the period
- ✗ Compress letter spacing

### Color Palette

#### Primary Colors

| Role | Hex | Usage |
|------|-----|-------|
| **Primary / Hero** | `#0066FF` | Electric blue — CTAs, highlights, key interactions |
| **Secondary** | `#6366F1` | Indigo — supporting elements, gradients |
| **Accent** | `#F472B6` | Pink — emphasis, moments of delight |

**Usage**: Primary colors should dominate interactive elements and key messaging (60-70% of accent color usage).

#### Supporting Colors

| Role | Hex | Usage |
|------|-----|-------|
| **Success** | `#10B981` | Emerald — revenue recovered, positive outcomes |
| **Warning** | `#F59E0B` | Amber — costs, alerts, attention needed |
| **Error** | `#F43F5E` | Red — errors, critical issues |

#### Background Colors

| Role | Hex | Usage |
|------|-----|-------|
| **Background Base** | `#0A1628` | Deep navy — primary canvas, warmer than pure black |
| **Background Alt** | `#121212` | Near-black — cards, surfaces, depth layers |
| **Surface Mixed** | `#161A1A` → `#7C9191` | Muted blue-gray tones for subtle layering |

#### Accessibility
All color combinations meet WCAG 2.1 AA standards:
- White text on `#0A1628`: Contrast ratio 15.3:1 (AAA)
- `#0066FF` on `#0A1628`: Contrast ratio 7.2:1 (AA)
- `#10B981` on `#0A1628`: Contrast ratio 4.8:1 (AA)

### Typography

#### Primary Typeface
**Font Family**: Geist Sans (variable)
**Weights**: 100–900 (variable font)
**Usage**: All applications — headlines, body, UI

**Implementation**:
```tsx
import { GeistSans } from 'geist/font/sans'
<html lang="en" className={GeistSans.variable}>
```

**Hierarchy**:

| Token | Size | Line Height | Weight | Tracking | Usage |
|-------|------|-------------|--------|----------|-------|
| **Display** | 72px | 1.1 | 700 | -2% | Hero statement (rare) |
| **H1** | 48px | 1.2 | 600 | -1.5% | Page title |
| **H2** | 36px | 1.3 | 600 | -1% | Section header |
| **H3** | 28px | 1.4 | 500 | default | Card title |
| **H4** | 24px | 1.5 | 500 | default | Subsection |
| **Body Large** | 18px | 1.6 | 400 | default | Lead paragraph |
| **Body** | 16px | 1.6 | 400 | default | Body text |
| **Body Small** | 14px | 1.5 | 400 | default | Supporting text |
| **Caption** | 12px | 1.4 | 500 | +8% | Metadata, labels |

#### Secondary Typeface
**Font Family**: Geist Mono
**Weights**: Variable
**Usage**: Code, data, numbers, technical references

**Implementation**:
```tsx
import { GeistMono } from 'geist/font/mono'
```

**When to use**:
- Pricing figures and monetary amounts
- Metrics, KPIs, percentages
- Code snippets and technical terms
- File names, API references

#### Font Fallback
```css
font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
font-family: var(--font-geist-mono), "SF Mono", Monaco, "Cascadia Code", monospace;
```

#### Letter Spacing (Tracking)

| Context | Tracking |
|---------|----------|
| **Display/Hero** | -2% |
| **Headlines** | -1% to -1.5% |
| **Body** | 0% (default) |
| **Buttons/CTA** | +0.5% to +1% |
| **All caps/labels** | +8% to +10% |

### Imagery Style

#### Illustration Style
Ai.Rio uses abstract geometric illustrations inspired by data flow and infrastructure — adapted from Jina AI's aesthetic with meaningful shifts for billing context.

**Visual Elements**:
- **Warped grids**: Billing infrastructure, foundational layers
- **Flowing planes**: Revenue streams, cost flows
- **Particle systems**: Individual transactions, data points
  - Blue/cyan particles: Healthy revenue flow
  - Green particles: Recovered revenue
  - Amber particles: Costs, leaks
  - Scattered particles: Revenue leakage
- **Laser-like beams**: Scanning, auditing, discovery

**Color Treatment**:
- Deep navy/purple backgrounds for depth
- Electric blue for primary data flow
- Emerald green for recovered revenue
- Amber for costs and alerts
- Subtle pink for accent moments

**Design Philosophy**:
- Data as art: Revenue streams visualized as flowing particles
- Futuristic atmosphere: Warped grids evoke infrastructure scale
- Professional minimalism: Never overwhelming, always sophisticated

**AI Generation Prompt Template**:
```
Abstract 3D illustration for AI billing infrastructure.
Warped geometric grid in deep navy (#0A1628) and purple, 3D perspective.
Tiny glowing particles flowing along grid lines — electric blue (#0066FF) for main flow, emerald (#10B981) for recovered revenue.
Thin laser beam scanning across composition.
Futuristic, enterprise tech aesthetic. Dark background with neon accents.
Style: Jina AI website, linear.app, Vercel marketing.
--ar 16:9
```

#### Photography
Not a primary brand element. If used:
- Clean, minimal office shots
- Data visualization screens
- No stock photos of handshakes or generic business scenes

#### Iconography
**Style**: Minimal, geometric, consistent stroke width
**Grid**: 24x24 pixel base
**Weight**: 1.5px stroke (medium)
**Corner radius**: 4px (softened squares)

**Guidelines**:
- Outline style (not filled)
- Electric blue or white on dark backgrounds
- Consistent visual weight across sets
- Avoid detailed illustrations — keep abstract

---

## Voice and Messaging

### Brand Voice
Analytical but accessible. Expert but not academic. Direct but respectful. Ai.Rio speaks with the confidence of someone who has solved these problems before.

**Key Characteristics**:
1. **Analytical**: We use data and precision. "47.6% median recovery rate" not "improved significantly"
2. **Direct**: We say what we mean. "Weeks, not months" not "expedited timeline available"
3. **Confident**: We've done this before. "Proven, production-tested systems" not "we believe this approach works"

### Tone Variations

| Context | Tone | Example |
|---------|------|---------|
| **Sales pages** | Urgent, problem-focused | "Your margins are bleeding. We stop the leak in two weeks." |
| **Documentation** | Clear, instructional | "Connect your webhook endpoint to receive billing events." |
| **Case studies** | Authoritative, results-driven | "Series A AI SaaS: From 12% to 68% payment recovery in 8 days." |
| **Communication** | Professional, responsive | "Thanks for reaching out. I can review your billing setup this week." |
| **Error messages** | Helpful, specific | "Payment webhook failed: Signature verification timed out. Check your webhook secret." |

### Language Guidelines

**Do Use**:
- Specific numbers and percentages ("47.6% median recovery rate")
- Concrete timelines ("7-10 business days")
- Clear outcomes ("$131K/year recovered")
- Active voice ("We deploy" not "Deployment is done")
- Technical precision when appropriate

**Avoid**:
- Vague superlatives ("revolutionary", "game-changing")
- Filler words ("very", "really", "quite")
- Passive voice ("is being", "will be")
- Overpromising ("guaranteed", "never", "always")
- Clichéd business jargon ("synergy", "leverage", "paradigm")

### Key Messages

#### Value Proposition
Billing infrastructure for AI SaaS — proven systems delivered in weeks, not months.

#### Messaging Pillars
1. **Visibility**: "See what you're missing" — We bring light to hidden billing issues
2. **Control**: "Own your infrastructure" — You own it after we leave
3. **Speed**: "Weeks, not months" — Proven systems, not custom builds
4. **Certainty**: "Production-tested" — No experiments with your revenue

#### Brand Promise
"Billing infrastructure that works. Delivered in weeks. Guaranteed."

### Taglines
- **Primary**: "Billing infrastructure for AI SaaS"
- **Secondary** (hero section): "Your margins are bleeding. We stop the leak in two weeks."
- **Descriptive**: "Fixed scope. Proven systems. Weeks to delivery."

---

## Brand Applications

### Digital

#### Website

**Hero Section**:
```
Ai.Rio
Billing infrastructure for AI SaaS

Your margins are bleeding.
We stop the leak in two weeks.

[Get Started]
```

**Section Headers**: H2 (36px, 600 weight, -1% tracking) on navy backgrounds

**Body Copy**: 16px with 1.6 line height, max 75 characters per line

**Buttons**: Electric blue (#0066FF) background, white text, 500 weight, +0.5% tracking, 8px rounded corners

**Cards**: Darker navy (#121212) backgrounds, subtle 1px borders using surface mixed colors

**Case Studies**: Result-focused headlines with specific numbers ("68% recovery rate", "$131K/year saved")

#### Social Media

**Platform Voice Adaptation**:

| Platform | Tone | Content Focus |
|----------|------|---------------|
| **LinkedIn** | Professional, expert | Industry insights, case studies, benchmarking data |
| **Twitter/X** | Concise, opinionated | Quick takes, hot takes, threads on billing topics |
| **GitHub** | Technical, minimal | Documentation, issues, release notes |

**Visual Guidelines**:
- Use brand colors for backgrounds and accents
- Geist Sans for all text
- Include brand logo on all creative
- Maintain clear space around logo

**Content Cadence**:
- 2-3x per week on LinkedIn
- 3-5x per week on Twitter/X
- Case study deep dives monthly

#### Email

**Subject Line Style**: Direct, benefit-focused
- "Your payment recovery rate: 47.6% (below industry average)"
- "3 billing issues losing you $X/year"
- "Billing infrastructure in 2 weeks (not 6 months)"

**Body Structure**:
1. Problem statement (data-backed)
2. Specific issue identified
3. Solution proposed
4. Timeline and pricing
5. Clear CTA

**Sign-off**: Professional, not overly formal

---

### Print

#### Business Cards
- Front: Ai.Rio logo (white), name (white), title (caption, electric blue)
- Back: Email, website, minimal
- Paper: White or very light gray with navy text

#### Proposals
- Cover: Ai.Rio logo centered, navy background
- Body: Clean layouts, generous white space, data tables for pricing
- Colors: Navy, white, electric blue accents

#### Invoices
- Ai.Rio logo top left
- Clean itemization
- Payment terms clear
- Due dates highlighted in amber if overdue

---

### Environmental

Not currently applicable for remote/digital-first business. Future consideration:
- Conference booth branding
- Event signage
- Office space design (if physical presence established)

---

## Usage Examples

### Good Examples

**Hero Section**:
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              Ai.Rio                                     │
│        Billing infrastructure for AI SaaS                │
│                                                         │
│           Your margins are bleeding.                    │
│         We stop the leak in two weeks.                  │
│                                                         │
│              [Get Started]                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Service Card**:
```
┌─────────────────────────────────────────────────────────┐
│  Ai.Rio Recover                                         │
│  Failed Payment Recovery                                │
│                                                         │
│  Recover 47.6% → 70% of lost revenue in 7-10 days       │
│                                                         │
│  ✓ Dunning workflow                                     │
│  ✓ Retry logic                                          │
│  ✓ Recovery dashboard                                   │
│                                                         │
│  $2,997 · 7-10 days                                     │
│                                    [Learn More →]       │
└─────────────────────────────────────────────────────────┘
```

### Bad Examples

**Logo Misuse**:
- ❌ Stretching logo to fit containers
- ❌ Adding gradients to wordmark
- ❌ Using unauthorized colors
- ❌ Removing the period
- ❌ Placing on low-contrast backgrounds

**Color Misuse**:
- ❌ Pink as primary (accent only)
- ❌ Low contrast text on dark backgrounds
- ❌ Clashing colors from outside palette
- ❌ Overuse of accent colors (should be 20-30% max)

**Typography Misuse**:
- ❌ Mixing in other typefaces
- ❌ Using light weights (300-400) for headlines
- ❌ Excessive letter spacing on large type
- ❌ Body text smaller than 14px

---

## Brand Consistency Checklist

Before releasing any brand material, verify:

**Visual Elements**:
- [ ] Logo usage follows guidelines (clear space, minimum size)
- [ ] Colors match approved palette
- [ ] Typography follows hierarchy (Geist Sans, proper weights)
- [ ] Imagery style is consistent (abstract, data-driven)
- [ ] Layout maintains brand principles (generous white space)

**Voice and Messaging**:
- [ ] Tone matches brand personality (analytical, direct, confident)
- [ ] Language aligns with guidelines (specific numbers, active voice)
- [ ] Key messages are reinforced (visibility, control, speed, certainty)
- [ ] Content serves brand goals (positioning as expert infrastructure partner)

**Quality Standards**:
- [ ] All materials are high-quality (no pixelation, proper resolution)
- [ ] Brand promise is communicated (proven systems, weeks to delivery)
- [ ] Target audience is considered (founder/CTO of AI SaaS)
- [ ] Brand experience is cohesive (consistent across touchpoints)

---

## Resources and Contacts

### Asset Downloads
Brand assets stored in: `/brand-assets/`
- Logo files (SVG, PNG variations)
- Color palette files (ASE, CSS variables)
- Typography implementation (Tailwind config, CSS)
- Illustration templates and prompts
- Icon set

### Typography Implementation

**Tailwind CSS Config**:
```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        brand: {
          blue: '#0066FF',
          indigo: '#6366F1',
          pink: '#F472B6',
          navy: '#0A1628',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#F43F5E',
        }
      }
    },
  },
}
```

**Next.js Layout**:
```tsx
import { GeistSans, GeistMono } from 'geist/font/sans'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
```

### Approval Process
1. Create material following guidelines
2. Self-review against consistency checklist
3. Store in appropriate `/brand-assets/` subdirectory
4. Document any exceptions or deviations

---

**Questions?** Contact brand@ai.rio.br

---

*This document is a living resource and will evolve as the brand grows. Last updated: February 10, 2025*
