# Three.js Hero Background Implementation Guide

**Created**: February 10, 2025
**Status**: Ready for Implementation
**Objective**: Add animated 3D hero backgrounds using Three.js with React Three Fiber

---

## Overview

This guide covers integrating Three.js into the Ai.Rio Next.js App Router website to create premium, performance-optimized hero backgrounds with particle effects and geometric animations.

**Visual Goals** (aligned with Ai.Rio brand):
- Abstract geometric motifs (floating nodes, connected lines)
- Particle flows simulating data streams
- Electric blue (#0066FF) laser accents
- Subtle, sophisticated animations
- Navy (#0A1628) background integration

---

## Installation

### Step 1: Install Dependencies

```bash
bun add three @react-three/fiber @react-three/drei
```

### Step 2: Configure Next.js

Update `next.config.ts` to transpile the Three.js package:

```typescript
const nextConfig = {
  // Add transpilePackages for Next.js 13.1+
  transpilePackages: ['three'],
  // ... existing config
}
```

---

## Architecture

### Component Structure

```
src/components/hero/
├── ThreeHeroBackground.tsx    # Main Canvas wrapper (client component)
├── scenes/
│   ├── ParticleField.tsx      # Floating particles scene
│   ├── GeometricMesh.tsx      # Connected geometric shapes
│   └── DataFlow.tsx           # Animated data stream lines
└── shaders/
    └── glowMaterial.ts        # Custom glow shader (optional)
```

---

## Implementation

### 1. Main Canvas Component (Client Component)

**File**: `src/components/hero/ThreeHeroBackground.tsx`

```tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { ParticleField } from './scenes/ParticleField'

interface ThreeHeroBackgroundProps {
  scene?: 'particles' | 'geometric' | 'dataflow'
  className?: string
}

export function ThreeHeroBackground({
  scene = 'particles',
  className = ''
}: ThreeHeroBackgroundProps) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Auto-downscale on low FPS
      >
        <Suspense fallback={null}>
          {scene === 'particles' && <ParticleField />}
          {/* Add other scenes as needed */}
        </Suspense>
      </Canvas>
    </div>
  )
}
```

### 2. Particle Field Scene

**File**: `src/components/hero/scenes/ParticleField.tsx`

```tsx
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Brand colors from Ai.Rio design system
const BRAND_BLUE = new THREE.Color('#0066FF')
const BRAND_INDIGO = new THREE.Color('#6366F1')
const BRAND_PINK = new THREE.Color('#F472B6')

export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate particle positions and colors
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(1500 * 3)
    const colors = new Float32Array(1500 * 3)
    const colorArray = [BRAND_BLUE, BRAND_INDIGO, BRAND_PINK]

    for (let i = 0; i < 1500; i++) {
      // Position: Spread across visible space
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 15
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 8

      // Color: Random brand color
      const color = colorArray[Math.floor(Math.random() * colorArray.length)]
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    return { positions, colors }
  }, [])

  // Animate particles
  useFrame((state) => {
    if (pointsRef.current) {
      // Gentle rotation
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05

      // Optional: Add wave motion to individual particles
      // This requires more complex shader or per-frame position updates
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
```

### 3. Geometric Mesh Scene (Alternative)

**File**: `src/components/hero/scenes/GeometricMesh.tsx`

```tsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

export function GeometricMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group>
      {/* Main floating shape */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <MeshWobbleMaterial
          color="#0066FF"
          wireframe
          factor={0.3}
          speed={2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Secondary shapes */}
      <mesh position={[-3, 1, -2]} scale={0.5}>
        <octahedronGeometry args={[1, 0]} />
        <MeshWobbleMaterial
          color="#6366F1"
          wireframe
          factor={0.5}
          speed={3}
        />
      </mesh>

      <mesh position={[3, -1, -1]} scale={0.6}>
        <tetrahedronGeometry args={[1, 0]} />
        <MeshWobbleMaterial
          color="#F472B6"
          wireframe
          factor={0.4}
          speed={2.5}
        />
      </mesh>
    </group>
  )
}
```

### 4. Data Flow Scene (Lines + Particles)

**File**: `src/components/hero/scenes/DataFlow.tsx`

```tsx
'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Trail } from '@react-three/drei'
import * as THREE from 'three'

export function DataFlow() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Data packet with trail */}
      <Trail
        width={0.02}
        color="#0066FF"
        length={2}
        decay={0.5}
      >
        <mesh position={[2, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#0066FF" />
        </mesh>
      </Trail>

      {/* Orbiting packets */}
      <Trail
        width={0.015}
        color="#6366F1"
        length={1.5}
        decay={0.6}
      >
        <mesh position={[-1.5, 1, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#6366F1" />
        </mesh>
      </Trail>

      <Trail
        width={0.015}
        color="#F472B6"
        length={1.5}
        decay={0.6}
      >
        <mesh position={[0, -1.5, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#F472B6" />
        </mesh>
      </Trail>
    </group>
  )
}
```

---

## Integration with Hero Section

### Update Homepage Hero

**File**: `src/app/[locale]/page.tsx`

```tsx
import { ThreeHeroBackground } from '@/components/hero/ThreeHeroBackground'

export default function HomePage({ params: { locale } }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <ThreeHeroBackground scene="particles" />

      {/* Hero Content - positioned above */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
          Your margins are bleeding.
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-blue mt-4">
          We stop the leak in two weeks.
        </h2>
        {/* CTAs and other content */}
      </div>
    </section>
  )
}
```

---

## Performance Optimization

### 1. Lazy Load Three.js Components

```tsx
// In your page component
import dynamic from 'next/dynamic'

const ThreeHeroBackground = dynamic(
  () => import('@/components/hero/ThreeHeroBackground'),
  {
    loading: () => null,
    ssr: false
  }
)
```

### 2. Reduce Particle Count on Mobile

```tsx
'use client'

import { useState, useEffect } from 'react'

function useParticleCount() {
  const [count, setCount] = useState(1500)

  useEffect(() => {
    // Reduce particles on mobile for performance
    if (window.innerWidth < 768) {
      setCount(500)
    }
  }, [])

  return count
}
```

### 3. Performance Monitoring

Add FPS limiter and auto-quality scaling:

```tsx
<Canvas
  performance={{
    min: 0.5,  // Scale down if FPS drops below 30
    regress: () => console.log('Performance regression detected')
  }}
  dpr={[1, 1.5]} // Limit max DPR
>
```

---

## Custom Shader (Advanced)

For brand-specific glow effects matching Ai.Rio aesthetic:

**File**: `src/components/hero/shaders/glowMaterial.tsx`

```tsx
'use client'

import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

const GlowMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color('#0066FF'),
    opacity: 0.8
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color;
    uniform float opacity;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      // Create pulsing glow effect
      float pulse = sin(time * 2.0 + vPosition.x) * 0.5 + 0.5;
      float glow = 1.0 - length(vUv - 0.5) * 2.0;

      vec3 finalColor = color * (0.5 + pulse * 0.5);
      float alpha = opacity * glow * (0.5 + pulse * 0.3);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
)

extend({ GlowMaterial })

// Usage in component:
// <mesh>
//   <planeGeometry args={[10, 10]} />
//   <glowMaterial key={GlowMaterial.key} time={clock.elapsedTime} />
// </mesh>
```

---

## Scene Variations for Ai.Rio

### Scene 1: Network Nodes (Recommended)
- Connected nodes representing billing infrastructure
- Lines connecting nodes (data flow visualization)
- Electric blue brand color

### Scene 2: Floating Geometric
- Wireframe icosahedrons and octahedrons
- Slow, elegant rotation
- Multiple shapes in brand colors

### Scene 3: Data Particles
- Subtle particle field
- Wave motion effect
- Very minimal, sophisticated

### Scene 4: Laser Accents
- Thin, bright lines (electric blue)
- Occasional "pulse" animations
- Reminiscent of Jina AI style but adapted

---

## Troubleshooting

### Issue: "window is not defined" error
**Solution**: The Canvas component must be a client component. Add `'use client'` at the top.

### Issue: White flash during page load
**Solution**: Add loading state or preload:
```tsx
<Canvas>
  <Suspense fallback={null}>
    <YourScene />
  </Suspense>
</Canvas>
```

### Issue: Poor performance on mobile
**Solution**:
1. Reduce particle count
2. Limit DPR: `dpr={[1, 1.5]}`
3. Use simpler geometry
4. Enable performance scaling

### Issue: Colors don't match brand
**Solution**: Use exact brand colors from design system:
```tsx
const BRAND_BLUE = '#0066FF'
const BRAND_INDIGO = '#6366F1'
const BRAND_PINK = '#F472B6'
const BRAND_NAVY = '#0A1628'
```

---

## Implementation Checklist

- [ ] Install dependencies (three, @react-three/fiber, @react-three/drei)
- [ ] Configure next.config.ts transpilePackages
- [ ] Create ThreeHeroBackground component
- [ ] Implement at least one scene (ParticleField recommended)
- [ ] Add to homepage hero section
- [ ] Test on mobile devices
- [ ] Verify performance (should maintain 30+ FPS)
- [ ] Test with different screen sizes
- [ ] Ensure colors match brand guidelines
- [ ] Add accessibility (prefers-reduced-motion support)

---

## Accessibility

### Respect Reduced Motion Preference

```tsx
'use client'

import { useEffect, useState } from 'react'

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

// In your component:
const reducedMotion = useReducedMotion()

if (reducedMotion) {
  // Return static version or no animation
}
```

---

## Resources

**Documentation**:
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber
- Drei helpers: https://github.com/pmndrs/drei
- Three.js: https://threejs.org/docs/

**Inspiration**:
- Jina AI illustration style (geometric, particle flows)
- Stripe patterns (mesh gradients)
- Vercel style (minimal geometric)

**Brand Reference**:
- Colors: See `/docs/brand-guidelines-ai-rio-2025-02-10.md`
- Design system: `/src/app/[locale]/globals.css`

---

*This guide provides everything needed to implement premium 3D hero backgrounds for the Ai.Rio website while maintaining performance and brand consistency.*
