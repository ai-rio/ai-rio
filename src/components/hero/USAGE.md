# ThreeHeroBackground Usage Guide

## Overview

The `ThreeHeroBackground` component provides a premium 3D animated background for hero sections using Three.js and React Three Fiber.

## Basic Usage

### Direct Import (Client Component)

```tsx
import { ThreeHeroBackground } from '@/components/hero/ThreeHeroBackground'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* 3D Background */}
      <ThreeHeroBackground scene="particles" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Your Hero Title
        </h1>
      </div>
    </section>
  )
}
```

### Lazy Loading (Recommended for Performance)

```tsx
import dynamic from 'next/dynamic'

const ThreeHeroBackground = dynamic(
  () => import('@/components/hero/ThreeHeroBackground').then(mod => ({ default: mod.ThreeHeroBackground })),
  {
    loading: () => null,
    ssr: false, // Disable SSR for Three.js component
  }
)

export default function HomePage() {
  return (
    <section className="relative min-h-screen">
      <ThreeHeroBackground scene="particles" />
      <div className="relative z-10">{/* Content */}</div>
    </section>
  )
}
```

## Props

### `scene` (optional)

Type: `'particles' | 'geometric' | 'dataflow'`
Default: `'particles'`

Determines which 3D scene to render:
- **particles**: Floating particle field with brand colors
- **geometric**: Warped grid with geometric deformation
- **dataflow**: Animated data streams with laser effects

```tsx
<ThreeHeroBackground scene="geometric" />
```

### `className` (optional)

Type: `string`
Default: `''`

Additional CSS classes for the container element.

```tsx
<ThreeHeroBackground scene="particles" className="opacity-90" />
```

## Performance Features

### Automatic Device Optimization

The component automatically adjusts quality based on device tier:

| Device | Particles | Grid Segments | Max Lasers |
|--------|-----------|---------------|------------|
| Desktop | 1200 | 32×32 | 5 |
| Tablet | 800 | 24×24 | 3 |
| Mobile | 400 | 16×16 | 2 |

### Reduced Motion Support

Automatically respects `prefers-reduced-motion` user preference and shows a static gradient fallback.

### Auto Quality Scaling

Canvas automatically reduces quality if FPS drops below 30 to maintain smooth performance.

## Integration with Next.js App Router

Since the page component is a Server Component, `ThreeHeroBackground` must be imported as a Client Component or lazy loaded.

### Example: Homepage Integration

```tsx
// src/app/[locale]/page.tsx
import { ThreeHeroBackground } from '@/components/hero/ThreeHeroBackground'

export default function HomePage({ params: { locale } }) {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
        {/* 3D Animated Background */}
        <ThreeHeroBackground scene="particles" />

        {/* Hero Content - z-10 ensures it's above background */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Your margins are bleeding.
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-blue mb-8">
            We stop the leak in two weeks.
          </h2>
          {/* CTAs */}
        </div>
      </section>
    </>
  )
}
```

## Styling Requirements

The component uses these CSS classes that should be available in your Tailwind setup:

- `absolute` - Positioning
- `inset-0` - Full coverage
- `-z-10` - Behind content
- `relative` - For parent container
- `z-10` - For content above background

## Brand Colors Used

The component uses exact brand colors from the design system:

- **Primary Blue**: `#0066FF` (50% of particles)
- **Indigo**: `#6366F1` (30% of particles)
- **Accent Pink**: `#F472B6` (20% of particles)
- **Navy Background**: `#0A1628`

## Accessibility

### Reduced Motion

Users who prefer reduced motion will automatically see a static gradient background instead of the animated 3D scene.

Test with browser DevTools:
```
Cmd/Ctrl + Shift + P → "Emulate CSS prefers-reduced-motion"
```

## Performance Targets

- **Desktop**: 60 FPS
- **Mobile**: 30+ FPS minimum
- **Initial render**: <100ms
- **Bundle size**: <50KB gzipped (when lazy loaded)

## Troubleshooting

### "window is not defined" Error

Make sure you're using the `'use client'` directive or lazy loading with `ssr: false`.

### White Flash on Load

Wrap in Suspense or use lazy loading:
```tsx
<Suspense fallback={null}>
  <ThreeHeroBackground scene="particles" />
</Suspense>
```

### Poor Mobile Performance

The component automatically reduces quality on mobile. If performance is still poor:
1. Use lazy loading
2. Consider using `scene="geometric"` (simpler than particles)
3. Add additional `className` to reduce opacity on very old devices

## Next Steps (T5)

The current implementation provides the foundation. Task T5 will add:
- `ParticleField` scene component with full animation
- `WarpedGrid` scene with GLSL shaders
- `LaserController` for dynamic laser effects
- Custom shader files in `/shaders` directory

## File Structure

```
src/components/hero/
├── ThreeHeroBackground.tsx       # Main component (✅ Completed)
├── USAGE.md                      # This file
├── scenes/                       # Scene components (🚧 T5)
│   ├── ParticleField.tsx
│   ├── WarpedGrid.tsx
│   └── LaserController.tsx
└── shaders/                      # GLSL shaders (🚧 T5)
    ├── gridVertex.glsl
    ├── gridFragment.glsl
    ├── particleVertex.glsl
    └── laserFragment.glsl
```
