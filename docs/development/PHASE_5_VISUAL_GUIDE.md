# Phase 5: Home Page - Visual Guide

## Page Structure Overview

The enhanced home page now consists of the following sections in order:

```
1. Navigation (existing - not modified in Phase 5)
   ↓
2. Hero Section (Commit 21 - ENHANCED)
   - Badge: "AI Cost Visibility Platform"
   - Headline: "Your AI margins are a black box."
   - Subheadline: "I built a flashlight."
   - Description about real-time visibility
   - Primary CTA: "See the Infrastructure" (with arrow)
   - Secondary CTA: "Book a Discovery Call"
   - Trust indicators (3 items)
   ↓
3. Technical Proof Section (Commit 21 - NEW)
   - Title: "Production-Grade Infrastructure"
   - Subtitle: "Real metrics from the actual codebase"
   - Grid of 4 metric cards:
     * Test Coverage: 99.5% (highlighted)
     * Providers Supported: 5
     * RLS Policies: 45
     * Models Tracked: 400+
   - Trust badge: "Based on actual client results"
   ↓
4. Dashboard Screenshot Showcase (Commit 21 - NEW)
   - Title: "See Your Costs in Real-Time"
   - Subtitle about monitoring LLM spending
   - Dashboard screenshot (16:9 aspect ratio)
   - Badge: "Live Demo"
   - CTA: "View Live Demo" (external link)
   ↓
5. Problem Section (Commit 22 - NEW)
   - Title: "The AI Cost Black Box Problem"
   - Subtitle about losing money
   - Alert: "The Margin Killer"
   - Grid of 4 problem cards with severity badges
   ↓
6. Services Section (Commit 22 - ENHANCED)
   - Title: "Billing Infrastructure Services"
   - Subtitle about fixed-scope, fixed-price
   - Grid of 5 service cards:
     * Payment Recovery (Revenue badge)
     * Usage-Based Pricing (Growth badge)
     * AI Cost Tracking (Core badge)
     * Billing Audit (Audit badge)
     * Complete Billing (Complete badge, 2-column span)
   - Each with title, price, timeline, description, CTA
   ↓
7. Process Section (Commit 22 - NEW)
   - Title: "How We Work"
   - Subtitle about transparent process
   - 3 phases with deliverables:
     * Phase 1: Discovery & Audit (Week 1, Free)
     * Phase 2: Foundation (Week 2, $3,000)
     * Phase 3: Launch & Optimize (Weeks 3-4, $2,000)
   - Total: $5,000
   - CTA: "Start Your Project"
   ↓
8. About Section (Commit 22 - ENHANCED)
   - Title: "Built by a Billing Specialist"
   - Description about Margin and QuoteKit
   - 3 credibility badges
   ↓
9. Contact Section (Commit 23 - REPLACED)
   - SimplifiedContactForm component
   - Context text above form
   - Fields: Name (required), Email (required), Message (optional)
   - Helper text about next steps
   - Submit button with loading state
   - Success state confirmation
   ↓
10. Footer (existing - enhanced in Phase 5)
    - Copyright notice
    - Privacy and Terms links
```

## Color Scheme

### Primary Colors
- Background: `zinc-950` (very dark gray)
- Cards: `zinc-900` (dark gray)
- Borders: `zinc-800` (medium gray)
- Text: `zinc-50` (nearly white), `zinc-300` (light gray), `zinc-400` (gray)
- Accents: `indigo-600`, `indigo-500`, `indigo-400`

### Severity Colors
- Critical: `destructive` (red)
- High: `destructive` (red)
- Medium: `default` (primary/indigo)
- Low: `secondary` (gray)

### Badge Variants
- `default`: Primary color with white text
- `secondary`: Gray background with white text
- `outline`: Border only with foreground color

## Responsive Breakpoints

- **Mobile (< 640px)**: Single column, stacked elements
- **Tablet (640px - 1024px)**: 2 columns for cards
- **Desktop (> 1024px)**: 3 columns for cards, full-width sections

## Interactive Elements

1. **Buttons**
   - Hover: Background color change
   - Focus: Ring outline
   - Group hover: Arrow translation effect

2. **Cards**
   - Hover: Border color change to indigo-500/50
   - Hover: Shadow effect
   - Hover: Scale transition (subtle)

3. **Forms**
   - Focus: Border color to indigo-500
   - Error: Red border with message
   - Success: Green confirmation card

4. **Links**
   - Hover: Text color change to zinc-400
   - Focus: Outline ring

## Typography Scale

- **Hero Title**: 4xl (mobile) → 6xl (tablet) → 7xl (desktop)
- **Section Titles**: 3xl
- **Card Titles**: xl → 2xl (featured)
- **Body Text**: lg (leading-8)
- **Small Text**: sm, xs

## Spacing System

- **Section Padding**: py-24 (96px vertical)
- **Section Gap**: 6 (1.5rem)
- **Card Gap**: 6 (1.5rem)
- **Element Gap**: 4 (1rem)
- **Text Gap**: 2 (0.5rem)

## Component Hierarchy

```
HomePage (Server Component)
├── Navbar (Client Component)
├── Hero Section (Server-rendered)
├── TechnicalProof (Client Component)
├── DashboardShowcase (Client Component)
├── ProblemSection (Client Component)
├── Services Grid (Server-rendered with shadcn Card)
├── DeliverablesSection (Client Component)
├── About Section (Server-rendered)
├── SimplifiedContactForm (Client Component)
└── Footer (Server-rendered)
```

## Key Features by Section

### Hero Section
- Multi-line headline for impact
- Gradient background overlay
- Badge for platform identification
- Dual CTAs with different visual weights
- Trust indicators with icons

### Technical Proof
- Progress bars for visual metrics
- Highlighted metric for focus
- Trend indicators (up arrow)
- Internationalized numbers

### Dashboard Showcase
- Screenshot with device badge
- External link indicator
- 16:9 aspect ratio for cinematic feel
- Badge for "Live Demo"

### Problem Section
- Alert component for urgency
- Severity badges with colors
- Grid layout for scanning
- Icon-based severity indicators

### Services Section
- Category badges for quick scanning
- Price prominence
- Timeline visibility
- Featured card with gradient
- Clear CTAs with arrows

### Process Section
- Phase-based timeline
- Deliverable checklist
- Status indicators (pending, in-progress, completed)
- Price transparency
- Total investment display

### Contact Form
- Minimal fields (3 total)
- Required field indicators
- Validation feedback
- Success confirmation
- Helper text for expectations

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels for icon-only buttons
- Proper heading hierarchy (h1 → h2 → h3)
- Form labels associated with inputs
- Alt text for images
- Keyboard navigation support
- Focus indicators
- Sufficient color contrast
- Screen reader friendly

## Performance Optimizations

- Server components for static content
- Client components only where needed
- Image optimization with Next.js
- Minimal JavaScript bundle
- CSS-in-JS with Tailwind (purged in production)
- Lazy loading for below-fold content (potential enhancement)
