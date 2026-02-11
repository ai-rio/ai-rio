# Hero Animation: Director's Technical Specification

**Project**: Ai.Rio Hero Background
**Created**: February 10, 2025
**Style Reference**: Warped Spacetime with Laser Streaks
**Target**: Premium, infrastructure-focused aesthetic

---

## Creative Vision

A living data universe that conveys **infrastructure, precision, and intelligence**. The animation should feel like gazing into the core of a billing system—mathematical, reliable, yet dynamic.

**Emotional Tone**: Confidence, sophistication, technical mastery
**Brand Alignment**: Electric blue (#0066FF) accents, navy (#0A1628) depth
**Performance Constraint**: Must maintain 30+ FPS on mobile devices

---

## Scene Composition

### Camera Setup
```
Position: [0, 0, 8]
FOV: 75
Depth of Field: Disabled (for sharpness)
Clear Color: #0A1628 (Brand Navy)
```

### Layer Stack (Back to Front)

| Layer | Component | Blend Mode | Opacity | Notes |
|-------|-----------|------------|---------|-------|
| 1 (Back) | Deep space gradient | Normal | 100% | Navy to darker navy radial |
| 2 | Warped grid mesh | Additive | 40% | Wireframe, deforming vertices |
| 3 | Particle field | Additive | 70% | 800-1200 particles |
| 4 (Front) | Laser streaks | Additive | 100% | Dynamic, burst-based |

---

## Sequence Breakdown

### Frame 1: Establish (0:00 - 0:02)
**Duration**: Fade in over 2 seconds

**Elements**:
- Background gradient appears first
- Grid materializes with alpha fade-in
- Initial grid state: flat, undistorted

**Technical**:
```javascript
// Fade in effect
gridMaterial.opacity = lerp(0, 0.4, time)
```

**Easing**: cubic-bezier(0.4, 0, 0.2, 1) - smooth onset

---

### Frame 2: Deformation Begins (0:02 - Loop)
**Duration**: Continuous, 8-second cycle

**Grid Behavior**:
- Sinusoidal wave propagation from center outward
- Two superimposed wave frequencies for organic irregularity
- Amplitude: ±0.3 units
- Frequency: Primary 0.5Hz, Secondary 1.3Hz

**Technical**:
```glsl
// Vertex shader deformation
vec3 warped = position;
float wave1 = sin(position.x * 2.0 + time * 0.5) * 0.3;
float wave2 = sin(length(position.xz) * 3.0 - time * 1.3) * 0.15;
warped.y += wave1 + wave2;
```

---

### Frame 3: Particle Layer (0:03 - Loop)
**Duration**: Continuous drift

**Particle Behavior**:
- Brownian motion with subtle directional flow (left to right)
- Size: 0.015 - 0.04 units (varied)
- Speed: 0.2 - 0.8 units/second
- Pulse opacity: 0.3 - 0.8 based on sine wave

**Color Distribution**:
- 50% #0066FF (Brand Blue)
- 30% #6366F1 (Indigo)
- 20% #F472B6 (Pink - for accent)

**Technical**:
```javascript
// Per-frame update
particles.forEach(p => {
  p.x += p.speedX * delta
  p.y += Math.sin(time + p.phase) * 0.001 // subtle bobbing
  p.opacity = 0.3 + Math.sin(time * 2 + p.phase) * 0.25
})
```

---

### Frame 4: Laser Flashes (0:04 - Loop, Irregular)
**Duration**: Each flash 0.3 - 0.6 seconds
**Interval**: 2 - 5 seconds between flashes (randomized)

**Flash Characteristics**:
- Width: 0.02 - 0.04 units
- Length: 3 - 8 units (varies per flash)
- Color: Predominantly #0066FF, occasional cyan/magenta variants
- Fade: Sharp attack, exponential decay
- Trajectory: Always diagonal (45° or 135°)

**Technical Implementation**:
```javascript
// Flash object structure
{
  startX: -5, startY: 3, // Random entry point
  endX: 5, endY: -3,     // Exit point
  color: 0x0066FF,
  progress: 0,           // 0 to 1
  speed: 2.5,            // Units per second
  decay: 3.0,            // Fade speed
  active: true
}
```

**Flash Types**:
| Type | Frequency | Color | Width | Notes |
|------|-----------|-------|-------|-------|
| Standard | 70% | #0066FF | 0.02 | Primary "scanning" flash |
| Fast | 20% | #00FFFF | 0.015 | Quick data burst |
| Accent | 10% | #F472B6 | 0.04 | Slow, dramatic |

---

### Frame 5: Continuous Loop
**Global Parameters**:
- Grid deformation: Never ceases, amplitude ±0.3 constant
- Particle drift: Wraps around screen edges
- Laser flashes: Irregular but minimum 2 per 8-second cycle

**Performance Safeguards**:
```javascript
// Auto-quality adjustment
if (fps < 30) {
  particleCount *= 0.7
  gridSegments = Math.max(20, gridSegments - 5)
}
```

---

## Shader Specifications

### Grid Vertex Shader
```glsl
uniform float time;
varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;

  vec3 pos = position;

  // Primary wave - radial from center
  float dist = length(pos.xz);
  float wave1 = sin(dist * 2.0 - time * 0.8) * 0.3;

  // Secondary wave - directional
  float wave2 = sin(pos.x * 1.5 + pos.z * 1.5 + time * 0.5) * 0.15;

  pos.y += wave1 + wave2;
  vElevation = pos.y;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

### Grid Fragment Shader
```glsl
uniform vec3 color;
varying vec2 vUv;
varying float vElevation;

void main() {
  // Distance fade at edges
  float distFromCenter = length(vUv - 0.5) * 2.0;
  float alpha = (1.0 - smoothstep(0.3, 1.0, distFromCenter)) * 0.4;

  // Elevation brightness
  float brightness = 0.5 + vElevation * 0.5;

  gl_FragColor = vec4(color * brightness, alpha);
}
```

### Particle Vertex Shader
```glsl
attribute float size;
attribute float phase;
attribute vec3 velocity;
varying float vAlpha;

uniform float time;

void main() {
  vec3 pos = position;

  // Apply velocity
  pos += velocity * time;

  // Wrap around
  pos = mod(pos + 5.0, 10.0) - 5.0;

  // Pulse size
  float pulse = sin(time * 2.0 + phase) * 0.5 + 0.5;
  gl_PointSize = size * (0.5 + pulse * 0.5);

  // Pulse alpha
  vAlpha = 0.3 + pulse * 0.4;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

### Laser Fragment Shader
```glsl
uniform float progress;  // 0 to 1 along line
uniform float fade;      // Fade factor
uniform vec3 color;

void main() {
  // Head intensity
  float head = smoothstep(progress - 0.2, progress, vUv.x);

  // Tail fade
  float tail = 1.0 - smoothstep(progress - 0.5, progress, vUv.x);

  // Combined with overall fade
  float alpha = head * tail * fade;

  gl_FragColor = vec4(color, alpha);
}
```

---

## React Three Fiber Implementation Structure

```
src/components/hero/
├── WarpedSpacetime.tsx           # Main canvas wrapper
├── shaders/
│   ├── gridVertex.glsl
│   ├── gridFragment.glsl
│   ├── particleVertex.glsl
│   └── laserFragment.glsl
└── components/
    ├── WarpedGrid.tsx            # Frame 2
    ├── ParticleField.tsx         # Frame 3
    └── LaserController.tsx       # Frame 4+
```

### Component: WarpedGrid.tsx
```tsx
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function WarpedGrid() {
  const meshRef = useRef<THREE.Mesh>(null)
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    color: { value: new THREE.Color('#0066FF') }
  }), [])

  useFrame(({ clock }) => {
    uniforms.time.value = clock.elapsedTime
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[12, 12, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`/* gridVertex.glsl content */`}
        fragmentShader={`/* gridFragment.glsl content */`}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}
```

### Component: LaserController.tsx
```tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'THREE'

interface Laser {
  id: number
  start: THREE.Vector3
  end: THREE.Vector3
  color: THREE.Color
  progress: number
  speed: number
  decay: number
  active: boolean
}

const FLASH_INTERVAL = [2000, 5000] // ms
const FLASH_DURATION = [300, 600]   // ms

export function LaserController() {
  const [lasers, setLasers] = useState<Laser[]>([])
  const nextFlashRef = useRef<number>(0)
  const idRef = useRef(0)

  useFrame(({ clock }) => {
    const now = Date.now()

    // Schedule next flash
    if (now > nextFlashRef.current) {
      const delay = FLASH_INTERVAL[0] + Math.random() *
        (FLASH_INTERVAL[1] - FLASH_INTERVAL[0])
      nextFlashRef.current = now + delay

      // Create new laser
      const angle = Math.random() > 0.5 ? Math.PI / 4 : 3 * Math.PI / 4
      const length = 3 + Math.random() * 5

      setLasers(prev => [...prev, {
        id: idRef.current++,
        start: new THREE.Vector3(-6, Math.random() * 4 - 2, 0),
        end: new THREE.Vector3(6, Math.random() * 4 - 2, 0),
        color: new THREE.Color('#0066FF'),
        progress: 0,
        speed: 2 + Math.random(),
        decay: 2 + Math.random() * 2,
        active: true
      }])
    }

    // Update lasers
    setLasers(prev => prev
      .map(l => ({
        ...l,
        progress: l.progress + l.speed * 0.016
      }))
      .filter(l => l.progress < 1.5) // Remove when faded
    )
  })

  return (
    <>
      {lasers.map(laser => (
        <LaserStreak key={laser.id} {...laser} />
      ))}
    </>
  )
}

function LaserStreak({ start, end, color, progress, decay }: Laser) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      const fade = Math.max(0, 1 - Math.pow(progress - 0.3, 2) * decay)
      meshRef.current.material.opacity = fade
    }
  })

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[0.02, 0.02, start.distanceTo(end), 8]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={1}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}
```

---

## Timing & Pacing Reference

| Element | Onset | Peak | Fade | Total |
|---------|-------|------|------|-------|
| Grid deformation | 2s | - | - | Continuous |
| Particles | 3s | - | - | Continuous |
| Laser flash | Instant | 0.1s | 0.3-0.5s | 0.4-0.6s |
| Flash interval | 2-5s (random) | - | - | Irregular |

---

## Mobile Optimization

| Device Tier | Particles | Grid Segments | Max Lasers |
|-------------|-----------|---------------|------------|
| Desktop | 1200 | 32×32 | 5 |
| Tablet | 800 | 24×24 | 3 |
| Mobile | 400 | 16×16 | 2 |

**Detection**:
```typescript
const getTier = () => {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}
```

---

## Accessibility

### Reduced Motion Mode
```typescript
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

if (prefersReducedMotion) {
  // Return static version with minimal animation
  return <StaticGrid />
}
```

### Fallback
- CSS gradient background as immediate visual
- Three.js loads progressively
- No blocking render on script load

---

## Brand Integration Checklist

- [ ] Background color matches #0A1628 (Brand Navy)
- [ ] Primary laser color is #0066FF (Brand Blue)
- [ ] Accent particles use #6366F1 (Indigo) and #F472B6 (Pink)
- [ ] Animation feels precise, not chaotic (infrastructure aesthetic)
- [ ] Laser timing is irregular but not erratic
- [ ] Overall mood: confident, sophisticated, intelligent

---

## Success Criteria

**Visual**:
- ✅ Seamless loop with no visible jump
- ✅ Smooth 60fps on desktop, 30fps+ on mobile
- ✅ Colors match brand palette exactly
- ✅ Animation enhances, doesn't distract from content

**Technical**:
- ✅ Initial render < 100ms
- ✅ Script bundle < 50KB gzipped
- ✅ No memory leaks (dispose geometries/materials)
- ✅ Works with React strict mode

**Brand**:
- ✅ Conveys infrastructure/reliability
- ✅ Feels premium and polished
- ✅ Distinguishes from generic particle effects
- ✅ Complements (not competes with) hero text

---

*This specification bridges creative intent with technical implementation, ensuring the final animation matches the Ai.Rio brand vision while meeting performance requirements.*
