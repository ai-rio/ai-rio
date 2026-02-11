# Ai.Rio Design System

> **Version:** 2.0.0
> **Last Updated:** 2025-02-11
> **Status:** Active

## Overview

This design system ensures visual consistency across all pages of ai.rio. All components and pages MUST use CSS custom properties defined in `globals.css` rather than hardcoded Tailwind classes.

---

## Design Principles

1. **Semantic over Specific** - Use CSS variables, not hardcoded colors
2. **Consistent Spacing** - Use predefined spacing scale
3. **Accessibility First** - Maintain 4.5:1 contrast minimum
4. **Mobile Responsive** - Design mobile-first, scale up
5. **Performance** - Use CSS transforms for animations

---

## Color System

### Primary Brand Color: Hero Turquoise

**Primary Brand Color:** `#81E3EE` (Hero Turquoise - vibrant, trustworthy)

| Role | Color | Hex | Usage |
|------|------|-------|
| **Primary Brand** | `#81E3EE` | Primary buttons, CTAs, highlights, links | Hero headings |
| **Primary Foreground** | `#FFFFFF` | Text on primary background |
| **Primary Hover** | `#6F9F8` | Hover states for interactivity |

### Secondary Brand Colors

| Color | Hex | Usage |
|------|------|-------|
| **Secondary** | `#6366F1` | Indigo - Supporting elements, secondary buttons |
| **Accent Pink** | `#F472B6` | Playful highlights, special callouts |
| **Accent Red** | `#F43F5E` | Error states, destructive actions |
| **Accent Orange** | `#FB923C` | Warning states |

### Background Colors

| Role | Color | Hex | Usage |
|------|------|-------|
| **Background Base** | `#0F172A` | Near black | Page background |
| **Surface** | `#282828` | Light gray | Cards, surfaces |
| **Surface 200** | `#2D3333` | Lighter gray | Elevated cards |
| **Surface 300** | `#3F3F3` | Lightest gray | Borders, dividers |

### Text Colors

| Role | Color | Hex | Usage |
|------|------|-------|
| **Text Primary** | `#FFFFFF` | Body text, headings |
| **Text Secondary** | `#DBDBDB` | Supporting text, metadata |
| **Text Muted** | `#A0A0A0` | Descriptions, disabled text |

### Border Colors

| Role | Color | Hex | Usage |
|------|------|-------|
| **Border** | `#273640` | Default borders |
| **Border Highlight** | `#81E3EE` | Brand blue accents, focus rings |

---

## Tailwind Mapping

| CSS Variable | Tailwind Class | Use Case | Color Value |
|--------------|-----------------|------------|
| `--q-primary` | `bg-primary` | Primary buttons, hero | `#81E3EE` (hero turquoise) |
| `--q-primary-foreground` | `text-primary-foreground` | Text on primary | `#FFFFFF` |
| `--q-surface-100` | `bg-q-surface-100` | Page backgrounds | `#0F172A` (near black) |
| `--q-surface-*` | Various shades | Cards, surfaces | `#282828`-`#2D3333` |
| `--q-text` | `text-q-dark` | All text | `#FFFFFF` |
| `--q-border` | `border-q-default` | Default borders | `#273640` |
| `--q-border-subtle` | Subtle borders | `#1E2933` | Very subtle |

### Usage Examples

**Primary CTA Button:**
```tsx
<Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
  Click Here
</Button>
```

**Secondary Button:**
```tsx
<Button className="bg-q-secondary hover:bg-q-secondary-200 text-q-primary-foreground">
  Learn More
</Button>
```

---

## Migration Checklist

- [ ] Replace all `bg-*` with `bg-q-*`
- [ ] Replace all `text-*` with `text-q-*`
- [ ] Replace `border-*` with `border-q-*`
- [ ] Verify all pages render hero turquoise correctly
