# Tailwind Color System Reference

> Quick reference for using the ai.rio design system colors in Tailwind classes

## Color Palette Overview

### Primary Palette (Hero Turquoise)

Use for CTAs, hero elements, and primary branding.

```tsx
// Default primary
<div className="bg-primary text-primary-foreground">Primary CTA</div>

// Shades (100 = lightest, 600 = darkest)
<div className="bg-primary-100">Lightest</div>
<div className="bg-primary-200">Very Light</div>
<div className="bg-primary-300">Light (same as default)</div>
<div className="bg-primary-400">Medium</div>
<div className="bg-primary-500">Dark</div>
<div className="bg-primary-600">Darkest</div>

// Hover states
<button className="bg-primary hover:bg-primary-500">Button</button>
```

### Secondary & Accent Colors

```tsx
// Secondary (Teal)
<div className="bg-secondary">Secondary</div>
<div className="bg-secondary-light">Light</div>
<div className="bg-secondary-dark">Dark</div>

// Accent (Purple)
<div className="bg-accent">Accent</div>
<div className="bg-accent-light">Light</div>
<div className="bg-accent-dark">Dark</div>
```

### Semantic Colors

```tsx
// Positive (Success/Green)
<div className="bg-positive text-white">Success</div>
<div className="border-positive">Green border</div>

// Negative (Error/Red)
<div className="bg-negative text-white">Error</div>
<div className="text-negative">Error text</div>

// Info (Cyan)
<div className="bg-info text-white">Info</div>

// Warning (Yellow)
<div className="bg-warning text-black">Warning</div>
```

### Surface Colors

Use for backgrounds, cards, and layered UI.

```tsx
// Dark Surfaces (pure grayscale)
<div className="bg-dark-surface-100">Darkest (#121212)</div>
<div className="bg-dark-surface-300">Cards (#282828)</div>
<div className="bg-dark-surface-500">Mid gray</div>
<div className="bg-dark-surface-900">Lightest (#dbdbdb)</div>

// Mixed Surfaces (teal-tinted grayscale)
<div className="bg-mixed-surface-100">Darkest (#161a1a)</div>
<div className="bg-mixed-surface-200">Cards (#1f2626)</div>
<div className="bg-mixed-surface-300">Borders (#2d3333)</div>
<div className="bg-mixed-surface-500">Mid gray</div>
<div className="bg-mixed-surface-700">Light gray (#7c9191)</div>
```

### Background & Text

```tsx
// Page backgrounds
<body className="bg-dark">Dark background (#161a1a)</body>
<body className="bg-dark-page">Darker page (#121212)</body>

// Text colors
<p className="text-text">White text (#ffffff)</p>
<p className="text-foreground">Also white</p>
<p className="text-muted">Muted gray</p>
<p className="text-muted-foreground">Light gray</p>
```

## Common UI Patterns

### Primary Button
```tsx
<button className="bg-primary hover:bg-primary-500 text-primary-foreground px-6 py-3 rounded-button transition-all">
  Click Me
</button>
```

### Card Component
```tsx
<div className="bg-mixed-surface-200 border border-mixed-surface-300 rounded-card p-6 hover:border-primary transition-colors">
  Card Content
</div>
```

### Input Field
```tsx
<input
  className="w-full bg-dark-surface-100 border border-mixed-surface-300 text-text rounded-input px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20"
  placeholder="Enter text..."
/>
```

### Badge
```tsx
<span className="bg-positive/10 text-positive px-3 py-1 rounded-full text-sm">
  Success
</span>
```

### Glass Card
```tsx
<div className="glass backdrop-blur-lg bg-white/5 border border-white/10 rounded-card-lg p-6">
  Glass morphism effect
</div>
```

## Responsive Design

### Mobile-First Approach
```tsx
<div className="bg-dark-surface-200 p-4 md:p-6 lg:p-8">
  Responsive padding
</div>
```

## Accessibility

### Contrast Ratios
- Always use `text-primary-foreground` on `bg-primary`
- Use `text-white` on dark backgrounds
- Use `text-black` or `text-dark` on light backgrounds

### Focus States
```tsx
<button className="focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark">
  Accessible Button
</button>
```

## Performance Tips

### Use Tailwind's JIT
All colors are optimized for JIT mode. Use arbitrary values sparingly:
```tsx
// Good (uses design system)
<div className="bg-primary">...</div>

// Avoid (bypasses design system)
<div className="bg-[#81E3EE]">...</div>
```

### Color Opacity
```tsx
<div className="bg-primary/10">10% opacity</div>
<div className="bg-primary/50">50% opacity</div>
<div className="bg-primary/90">90% opacity</div>
```

## Animation & Effects

### Custom Animations
```tsx
<div className="animate-glow">Glowing element</div>
<div className="animate-float">Floating element</div>
<div className="animate-slide-up">Slide up animation</div>
<div className="animate-fade-in">Fade in animation</div>
```

### Custom Shadows
```tsx
<div className="shadow-brand">Brand shadow</div>
<div className="shadow-glow">Glow effect</div>
<div className="shadow-card">Card shadow</div>
```

## Migration from Old System

| Old Class | New Class | Notes |
|-----------|-----------|-------|
| `bg-[#81E3EE]` | `bg-primary` | Primary color |
| `text-[#ffffff]` | `text-white` or `text-text` | White text |
| `bg-[#121212]` | `bg-dark-page` | Page background |
| `bg-[#161a1a]` | `bg-dark` | Default dark bg |
| `border-[#2d3333]` | `border-mixed-surface-300` | Default border |

## CSS Variables Fallback

For custom components that need CSS variables:
```css
.custom-component {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
  border-color: var(--border);
}
```

## Full Color List

### Primary
- `primary`, `primary-100` through `primary-600`, `primary-foreground`

### Secondary & Accent
- `secondary`, `secondary-light`, `secondary-dark`
- `accent`, `accent-light`, `accent-dark`

### Semantic
- `positive`, `positive-light`, `positive-dark`
- `negative`, `negative-light`, `negative-dark`
- `info`, `info-light`, `info-dark`
- `warning`, `warning-light`, `warning-dark`

### Surfaces
- `dark-surface-100` through `dark-surface-900` (9 shades)
- `mixed-surface-100` through `mixed-surface-900` (9 shades)

### Special
- `dark`, `dark-page`, `text`
- `background`, `foreground`, `card`, `muted`, `border`, `input`, `ring`
- `destructive`, `destructive-foreground`

### Legacy Brand (for compatibility)
- `brand-blue`, `brand-blue-hover`, `brand-indigo`, `brand-pink`, `brand-navy`
