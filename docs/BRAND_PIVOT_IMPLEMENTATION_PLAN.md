# Ai.Rio Brand Pivot Implementation Plan

**Created**: February 10, 2025
**Status**: Ready for Execution
**Objective**: Realign website from freelance positioning to premium productized services provider

---

## Executive Summary

**Current State**: Website built as "AI.RIO" - positioned as technical consultant/freelancer
**Target State**: "Ai.Rio" - premium productized services provider for AI SaaS billing infrastructure

**Key Insight**: The technical foundation is solid. This is 100% content and positioning work — no architectural changes needed.

**Estimated Effort**: 8-12 hours across 3 phases

---

## Current vs. Target Comparison

### Brand Identity

| Element | Current | Target | Priority |
|---------|---------|--------|----------|
| **Company Name** | AI.RIO | Ai.Rio | 🔴 Critical |
| **Tagline** | "Billing Infrastructure Specialist for AI SaaS" | "Billing infrastructure for AI SaaS" | 🔴 Critical |
| **Email** | hello@ai-rio.com | hello@ai.rio.br | 🟡 Medium |
| **Domain** | ai-rio.com | ai.rio.br | 🟡 Medium |

### Service Positioning

| Service | Current Name | Target Name | Current Pricing | Target Pricing |
|---------|-------------|-------------|----------------|---------------|
| Payment Recovery | Payment Recovery | Ai.Rio Recover | $2,000-4,000 | $2,997 |
| Usage-Based Pricing | Usage-Based Pricing | Ai.Rio Meter | $3,000-5,000 | $3,997 |
| AI Cost Tracking | AI Cost Tracking | Ai.Rio Track | $3,000-5,000 | $4,997 |
| Billing Audit | Billing Audit | Ai.Rio Audit | $1,500-3,000 | $1,997 |
| Complete Billing | Complete Billing | Ai.Rio Complete | $8,000-15,000 | $11,997 |

### Messaging Positioning

| Element | Current | Target | Priority |
|---------|---------|--------|----------|
| **Hero Headline** | "Your AI margins are a black box. I built a flashlight." | "Your margins are bleeding. We stop the leak in two weeks." | 🟡 Medium |
| **Hero Subhead** | "AI Cost Visibility Platform" | "Billing infrastructure for AI SaaS" | 🟡 Medium |
| **About** | "I built Margin..." | "Ai.Rio delivers billing infrastructure..." | 🟡 Medium |
| **CTAs** | "Book a Discovery Call" | "Get Started" / "See How It Works" | 🟢 Low |

---

## File-by-File Change Checklist

### 🔴 Critical (Brand Foundation)

#### 1. `/src/components/navbar.tsx`
**Changes**:
- Line 19: `AI.RIO` → `Ai.Rio`
- Line 35: Indigo focus ring → Brand blue focus ring

```tsx
// Before
<Link href={`${basePath === '' ? '/' : basePath}`} className="text-xl font-bold text-white">
  AI.RIO
</Link>

// After
<Link href={`${basePath === '' ? '/' : basePath}`} className="text-xl font-bold text-white">
  Ai.Rio
</Link>
```

#### 2. `/src/components/footer.tsx` (if exists)
**Changes**:
- Company name: `AI.RIO` → `Ai.Rio`
- Copyright year: Update if needed

#### 3. `/src/app/[locale]/page.tsx`
**Changes**:
- Line 18-20: Metadata title/description
- Line 44: Main headline
- Line 46: Subheadline

```tsx
// Before
title: "AI.RIO - Billing Infrastructure Specialist"
description: "I help AI SaaS companies track and optimize their LLM costs..."

// After
title: "Ai.Rio - Billing Infrastructure for AI SaaS"
description: "Proven billing infrastructure delivered in weeks. Fixed scope, guaranteed results."
```

#### 4. `/src/app/[locale]/layout.tsx`
**Changes**:
- Line 18-20: Metadata

#### 5. Service Pages (All 6 files)
**Location**: `/src/app/[locale]/services/*.tsx`

| File | Changes |
|------|--------|
| `payment-recovery/page.tsx` | Rename to "Ai.Rio Recover", update pricing to $2,997 |
| `usage-pricing/page.tsx` | Rename to "Ai.Rio Meter", update pricing to $3,997 |
| `ai-tracking/page.tsx` | Rename to "Ai.Rio Track", update pricing to $4,997 |
| `billing-audit/page.tsx` | Rename to "Ai.Rio Audit", update pricing to $1,997 |
| `billing-infrastructure/page.tsx` | Update to align with new positioning |
| `complete-billing/page.tsx` | Rename to "Ai.Rio Complete", update pricing to $11,997 |

#### 6. i18n Translation Files
**Locations**:
- `/src/i18n/messages/en/ui.json`
- `/src/i18n/messages/pt/ui.json`
- `/src/i18n/messages/es/ui.json`

**Changes**:
```json
// Before
"services": {
  "payment_recovery": {
    "title": "Payment Recovery",
    "price": "$2,000-4,000",
    ...
  }
}

// After
"services": {
  "ai_rio_recover": {
    "title": "Ai.Rio Recover",
    "price": "$2,997",
    ...
  }
}
```

---

### 🟡 Medium Priority (Messaging & Content)

#### 7. `/src/app/[locale]/page.tsx` - Hero Section
**Lines**: 38-84

**Current Headline**:
```tsx
<h1 className="text-4xl font-bold tracking-tight text-white">
  Your AI margins are a black box.
</h1>
<h2 className="text-3xl font-bold tracking-tight text-indigo-400">
  I built a flashlight.
</h2>
```

**New Headline** (premium, outcome-focused):
```tsx
<h1 className="text-4xl font-bold tracking-tight text-white">
  Your margins are bleeding.
</h1>
<h2 className="text-3xl font-bold tracking-tight text-brand-blue">
  We stop the leak in two weeks.
</h2>
```

#### 8. About Page
**Location**: `/src/app/[locale]/about/page.tsx`

**Current Messaging**:
- "Built by a Billing Specialist"
- "I built Margin..."
- First-person singular

**New Messaging**:
- "Billing Infrastructure for AI SaaS"
- Third-person company voice
- Focus on delivery systems, not personal projects

#### 9. Contact Page CTA
**Location**: `/src/app/[locale]/contact/page.tsx`

**Current**: "Book a Discovery Call"
**New**: "Get Started" / "Begin Your Audit"

---

### 🟢 Low Priority (Polish & Optimization)

#### 10. Service Card Components
**Location**: `/src/components/service-sections/*.tsx`

**Changes**:
- Update hover states to use brand colors
- Ensure consistent "Ai.Rio [Service]" naming
- Update pricing display format

#### 11. CTA Button Components
**Location**: `/src/components/ui/button.tsx` and related

**Changes**:
- Primary buttons use brand-blue
- Secondary buttons use brand-navy
- Hover states refined

#### 12. Social Media Links
**Changes**:
- Update to @ai.rio.br handles where applicable

---

## Implementation Phases

### Phase 1: Brand Foundation (2-3 hours)
**Goal**: Establish the Ai.Rio brand entity consistently

**Tasks**:
1. Update navbar: AI.RIO → Ai.Rio
2. Update footer: AI.RIO → Ai.Rio
3. Update all page metadata titles
4. Update email references to @ai.rio.br
5. Test basic brand consistency

**Files**: navbar.tsx, footer.tsx, all page.tsx metadata, layout.tsx

**Success Criteria**:
- ✅ All instances of "AI.RIO" changed to "Ai.Rio"
- ✅ Email updated to @ai.rio.br
- ✅ Metadata updated across all pages

---

### Phase 2: Service Rebranding (3-4 hours)
**Goal**: Productize all services with Ai.Rio naming and fixed pricing

**Tasks**:
1. Rename service pages in navigation (requires route changes or content updates)
2. Update all i18n translation files
3. Update service page content
4. Update homepage service cards
5. Update pricing display to fixed prices

**Files**:
- All service pages
- All i18n files
- Homepage service section

**Success Criteria**:
- ✅ All services named "Ai.Rio [Service]"
- ✅ Pricing displayed as fixed amounts
- ✅ Navigation reflects new naming

---

### Phase 3: Messaging Overhaul (3-5 hours)
**Goal**: Shift from freelancer to premium provider positioning

**Tasks**:
1. Update hero headline and subheadline
2. Reframe about section content
3. Update all CTAs to be more direct
4. Review and refine service descriptions
5. Update tagline and metadata descriptions

**Files**:
- Homepage hero
- About page
- Service pages
- Contact page

**Success Criteria**:
- ✅ Messaging emphasizes outcomes, not features
- ✅ Company voice (not "I")
- ✅ Premium positioning throughout

---

## Detailed Change Log

### File: `/src/components/navbar.tsx`

```diff
@@ - Line 18,6 +18,6 @@
-              <Link href={`${basePath === '' ? '/' : basePath}`} className="text-xl font-bold text-white">
-                AI.RIO
+               <Link href={`${basePath === '' ? '/' : basePath}`} className="text-xl font-bold text-white">
+                Ai.Rio
```

### File: `/src/app/[locale]/page.tsx` (Metadata)

```diff
@@ - Line 17,6 +17,6 @@
-export const metadata: Metadata = {
-  title: "AI.RIO - Billing Infrastructure Specialist",
-  description: "I help AI SaaS companies track and optimize their LLM costs..."
+  title: "Ai.Rio - Billing Infrastructure for AI SaaS",
+  description: "Proven billing infrastructure delivered in weeks. Fixed scope, guaranteed results."
```

### File: `/src/app/[locale]/page.tsx` (Hero)

```diff
@@ - Line 44,47 +44,47 @@
-               {locale === 'en'
-                 ? "Your AI margins are a black box."
-                 : "Suas margens de IA são uma caixa preta."}
-              <h2 className="text-3xl font-bold tracking-tight text-indigo-400">
-                {locale === 'en' ? "I built a flashlight." : "Eu construí uma lanterna."}

+               {locale === 'en'
+                 ? "Your margins are bleeding."
+                 : "Suas margens estão sangrando."}
+              <h2 className="text-3xl font-bold tracking-tight text-brand-blue">
+                {locale === 'en' ? "We stop the leak in two weeks." : "Paramos o vazamento em duas semanas."}
```

### File: `/src/i18n/messages/en/ui.json` (Services)

```diff
@@ - Service renaming pattern for all services
- "payment_recovery": {
-   "title": "Payment Recovery",
-   "price": "$2,000-4,000",
+ "ai_rio_recover": {
+   "title": "Ai.Rio Recover",
+   "price": "$2,997",
    "timeline": "7-10 days"
  }
```

---

## Testing Checklist

After implementing changes, verify:

### Brand Consistency
- [ ] All instances of "AI.RIO" changed to "Ai.Rio"
- [ ] Logo displays correctly in all contexts
- [ ] Email address uses @ai.rio.br
- [ ] Social media links updated (if applicable)

### Service Pages
- [ ] All services use "Ai.Rio [Service]" naming
- [ ] Pricing displays as fixed amounts
- [ ] Service names consistent in navigation
- [ ] Service names consistent in page content

### Messaging
- [ ] Hero reflects premium positioning
- [ ] About page uses company voice (not "I")
- [ ] CTAs are direct and premium-feeling
- [ ] Tagline updated consistently

### Cross-Language
- [ ] Changes applied to EN, PT, ES versions
- [ ] Translation keys updated consistently
- [ ] Language switcher works correctly

### Technical
- [ ] No broken links or routes
- [ ] All pages render correctly
- [ ] Metadata displays properly
- [ ] Forms function correctly

---

## Risk Assessment

### Low Risk
- **Color changes**: Already aligned ✅
- **Typography**: Already using Geist ✅
- **Structure**: No architectural changes ✅

### Medium Risk
- **Service renaming**: May affect SEO, requires route consideration
- **Pricing changes**: Need to ensure all instances updated
- **i18n updates**: Must maintain consistency across languages

### Mitigation
- Keep existing routes working (add redirects if needed)
- Update sitemap.xml if routes change
- Test all language versions
- Monitor for any broken links post-deployment

---

## Rollback Plan

If issues arise after deployment:

1. **Immediate**: Revert to previous commit
2. **Partial**: Roll back specific changes (e.g., pricing only)
3. **Content**: Keep brand changes, revert technical changes if broken

**Backup Strategy**: Create new branch before implementation
```bash
git checkout -b brand-pivot-implementation
# Make changes
# If needed: git checkout main
```

---

## Post-Implementation Tasks

After deployment:

1. **Update External Assets**
   - Social media profiles (handle names)
   - Email signatures
   - Business cards (if printed)
   - Any marketing materials

2. **SEO Considerations**
   - Submit sitemap with new structure
   - Monitor for any ranking changes
   - Update any directory listings

3. **Monitor**
   - Check for broken links
   - Monitor form submissions
   - Track analytics for bounce rate changes

---

## Success Metrics

### Quantitative
- Brand name consistency: 100%
- Service naming consistency: 100%
- Fixed pricing display: 100%

### Qualitative
- Premium positioning perception
- Clear differentiation from freelancer positioning
- Professional, confident tone throughout

---

## Next Steps

1. **Review this plan** with stakeholder approval
2. **Create implementation branch**
3. **Begin Phase 1** (Brand Foundation)
4. **Test thoroughly** after each phase
5. **Deploy** and monitor

**Total Estimated Time**: 8-12 hours
**Recommended Timeline**: 2-3 days (across 1-2 week sprints)

---

*Document prepared for Ai.Rio brand pivot implementation. Questions? Refer to brand guidelines at /docs/brand/brand-guidelines-ai-rio-2025-02-10.md*
