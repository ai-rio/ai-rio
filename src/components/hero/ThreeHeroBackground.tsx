'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'

/**
 * Props for ThreeHeroBackground component
 */
interface ThreeHeroBackgroundProps {
  /**
   * Scene type to render
   * @default 'particles'
   */
  scene?: 'particles' | 'geometric' | 'dataflow'
  /**
   * Additional CSS classes for the container
   */
  className?: string
}

/**
 * Detect device tier for performance optimization
 * @returns 'desktop' | 'tablet' | 'mobile'
 */
function useDeviceTier() {
  const [tier, setTier] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  useEffect(() => {
    const updateTier = () => {
      const width = window.innerWidth
      if (width < 768) {
        setTier('mobile')
      } else if (width < 1024) {
        setTier('tablet')
      } else {
        setTier('desktop')
      }
    }

    updateTier()
    window.addEventListener('resize', updateTier)
    return () => window.removeEventListener('resize', updateTier)
  }, [])

  return tier
}

/**
 * Check if user prefers reduced motion
 * @returns boolean indicating reduced motion preference
 */
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Only check on client side
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

/**
 * Get particle count based on device tier
 */
function getParticleCount(tier: 'desktop' | 'tablet' | 'mobile'): number {
  switch (tier) {
    case 'mobile':
      return 400
    case 'tablet':
      return 800
    case 'desktop':
    default:
      return 1200
  }
}

/**
 * Get grid segments based on device tier
 */
function getGridSegments(tier: 'desktop' | 'tablet' | 'mobile'): number {
  switch (tier) {
    case 'mobile':
      return 16
    case 'tablet':
      return 24
    case 'desktop':
    default:
      return 32
  }
}

/**
 * Get max laser count based on device tier
 */
function getMaxLasers(tier: 'desktop' | 'tablet' | 'mobile'): number {
  switch (tier) {
    case 'mobile':
      return 2
    case 'tablet':
      return 3
    case 'desktop':
    default:
      return 5
  }
}

// Placeholder scene components - will be implemented in T5
function ParticleField() {
  // TODO: Implement particle field scene with:
  // - 400-1200 particles based on device tier
  // - Brand colors: #0066FF (50%), #6366F1 (30%), #F472B6 (20%)
  // - Brownian motion with subtle left-to-right flow
  // - Pulse opacity: 0.3 - 0.8
  // - Size: 0.015 - 0.04 units
  return null
}

function WarpedGrid() {
  // TODO: Implement warped grid scene with:
  // - 16x16 to 32x32 segments based on device tier
  // - Sinusoidal deformation with two wave frequencies
  // - Amplitude: ±0.3 units
  // - Primary wave: 0.5Hz, Secondary: 1.3Hz
  // - Additive blending at 40% opacity
  return null
}

function LaserController() {
  // TODO: Implement laser flash effects with:
  // - 2-5 concurrent lasers based on device tier
  // - Flash interval: 2-5 seconds (randomized)
  // - Flash duration: 0.3-0.6 seconds
  // - Diagonal trajectories (45° or 135°)
  // - Sharp attack, exponential decay
  return null
}

/**
 * Static fallback for reduced motion preference
 * Shows a simple gradient without animation
 */
function StaticBackground() {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        background: 'radial-gradient(ellipse at center, #0A1628 0%, #050911 100%)',
      }}
    />
  )
}

/**
 * Three.js Hero Background Component
 *
 * A premium 3D hero background using Three.js, React Three Fiber, and custom GLSL shaders.
 * Features a 4-layer composition: Navy background, warped grid mesh, particle field, and laser streaks.
 *
 * Performance targets:
 * - Desktop: 60 FPS
 * - Mobile: 30+ FPS minimum
 * - Initial render: <100ms
 * - Bundle size: <50KB gzipped
 *
 * Brand colors:
 * - Primary Blue: #0066FF
 * - Indigo: #6366F1
 * - Accent Pink: #F472B6
 * - Navy Background: #0A1628
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ThreeHeroBackground scene="particles" />
 *
 * // With custom styling
 * <ThreeHeroBackground scene="geometric" className="opacity-80" />
 *
 * // Lazy loaded with next/dynamic
 * const ThreeHero = dynamic(() => import('./ThreeHeroBackground'), { ssr: false })
 * ```
 */
export function ThreeHeroBackground({
  scene = 'particles',
  className = '',
}: ThreeHeroBackgroundProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _deviceTier = useDeviceTier() // Will be passed to scene components in T5
  const prefersReducedMotion = useReducedMotion()

  // Return static version for users who prefer reduced motion
  if (prefersReducedMotion) {
    return <StaticBackground />
  }

  // Performance settings calculated but not yet used
  // TODO: Pass these to scene components in T5 via context or props
  // getParticleCount(deviceTier)
  // getGridSegments(deviceTier)
  // getMaxLasers(deviceTier)

  return (
    <div
      className={`absolute inset-0 -z-10 ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]} // Limit pixel ratio for performance (1x to 2x)
        performance={{
          min: 0.5, // Scale down if FPS drops below 30
        }}
        style={{
          background: '#0A1628', // Brand navy background
        }}
      >
        <Suspense fallback={null}>
          {/* Layer composition from Director Spec - 4-layer stack */}
          {/* Layer 1: Background (handled by Canvas gl.background below) */}

          {/* Layer 2: Warped Grid (deforming mesh with sinusoidal waves) */}
          <WarpedGrid />

          {/* Layer 3: Particle Field (animated particles with opacity pulsing) */}
          {(scene === 'particles' || scene === 'dataflow') && <ParticleField />}

          {/* Layer 4: Laser Streaks (dynamic flashes, dataflow and geometric scenes) */}
          {(scene === 'dataflow' || scene === 'geometric') && <LaserController />}
        </Suspense>
      </Canvas>
    </div>
  )
}

// Export device tier utilities for use in scene components
export { useDeviceTier, getParticleCount, getGridSegments, getMaxLasers }
