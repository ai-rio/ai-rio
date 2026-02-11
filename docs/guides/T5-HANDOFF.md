# T5 Handoff Document: Scene Components & Shader Implementation

**Date**: 2026-02-11
**Status**: Ready for Implementation
**Milestone**: Three.js Hero Animation - Scene Layer Implementation
**Previous Task**: T4 - ThreeHeroBackground.tsx (SHIPPED ✅)

---

## Executive Summary

T4 (ThreeHeroBackground.tsx) has been successfully implemented and shipped to production. This document provides comprehensive handoff information for T5, which implements the three scene components and their associated GLSL shaders.

**What T5 Delivers**:
- ParticleField scene component with animated particles
- WarpedGrid scene component with vertex deformation
- LaserController scene component with dynamic laser streaks
- Complete GLSL shader suite (4 shader files)
- Integrated device tier optimization
- Full performance monitoring

---

## T4 Deliverables (Completed)

### Files Shipped
```
src/components/hero/
├── ThreeHeroBackground.tsx    ✅ SHIPPED (256 lines)
└── USAGE.md                   ✅ SHIPPED (comprehensive docs)

Configuration:
├── next.config.ts             ✅ transpilePackages: ['three']
├── package.json               ✅ @react-three/drei@10.7.7 installed
└── bun.lock                   ✅ dependencies updated
```

### Quality Metrics
- **Overall Score**: 95/100
- **Code Quality**: 97/100
- **Architecture**: 97/100
- **Accessibility**: 95/100
- **ESLint**: 0 errors, 0 warnings
- **TypeScript**: 0 errors

### Key Features Implemented
- ✅ 'use client' directive with proper Next.js 15 boundary
- ✅ Canvas configuration: DPR [1,2], performance.min 0.5
- ✅ Device tier detection (mobile/tablet/desktop)
- ✅ Reduced motion accessibility support
- ✅ 4-layer scene composition structure
- ✅ Placeholder components returning null (ready for T5)
- ✅ Exported utilities for T5:
  - `useDeviceTier` hook
  - `getParticleCount(tier)` function
  - `getGridSegments(tier)` function
  - `getMaxLasers(tier)` function

### What T5 Needs from T4
All utilities and hooks are exported and ready for consumption:

```typescript
// Available imports for T5
import {
  ThreeHeroBackground,
  useDeviceTier,
  getParticleCount,
  getGridSegments,
  getMaxLasers
} from '@/components/hero/ThreeHeroBackground'
```

---

## T5 Task Breakdown

### Task 5.1: Implement ParticleField Component

**File**: `src/components/hero/scenes/ParticleField.tsx`

**Specifications** (from Director Spec):
- 1200 particles on desktop, 800 on tablet, 400 on mobile
- Colors: #0066FF (50%), #6366F1 (30%), #F472B6 (20%)
- Particle size: 0.015 - 0.04 units (varied)
- Speed: 0.2 - 0.8 units/second
- Brownian motion with subtle directional flow (left to right)
- Pulse opacity: 0.3 - 0.8 based on sine wave
- Blending: Additive (THREE.AdditiveBlending)

**Required Shader** (from Director Spec):
```glsl
// Particle Vertex Shader - src/components/hero/shaders/particleVertex.glsl
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

**Implementation Requirements**:
- [ ] Create vertex shader: `src/components/hero/shaders/particleVertex.glsl`
- [ ] Create component: `src/components/hero/scenes/ParticleField.tsx`
- [ ] Use ShaderMaterial with particle vertex shader
- [ ] Implement BufferGeometry with 1500 particles (max tier)
- [ ] Add size, phase, and velocity attributes
- [ ] Set uniforms: time (updates via useFrame)
- [ ] Apply device tier particle count via prop
- [ ] Use THREE.AdditiveBlending for composition

**Related Documentation**:
- `/docs/guides/hero-animation-director-spec.md` (lines 81-104)
- `/docs/guides/threejs-hero-background.md` (lines 105-186)
- `threejs-shaders` skill: Vertex shader, attribute management, particle systems

---

### Task 5.2: Implement WarpedGrid Component

**File**: `src/components/hero/scenes/WarpedGrid.tsx`

**Specifications** (from Director Spec):
- Grid: 32×32 segments on desktop, 24×24 on tablet, 16×16 on mobile
- Geometry: PlaneGeometry, rotated -90° on X-axis
- Wave deformation:
  - Primary wave: radial from center, frequency 0.5Hz, amplitude ±0.3
  - Secondary wave: directional, frequency 1.3Hz, amplitude ±0.15
- Material: Wireframe, additive blending, opacity 40%
- Color: #0066FF (brand blue)
- Fade at edges: distance-based alpha

**Required Shaders** (from Director Spec):

```glsl
// Grid Vertex Shader - src/components/hero/shaders/gridVertex.glsl
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

```glsl
// Grid Fragment Shader - src/components/hero/shaders/gridFragment.glsl
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

**Implementation Requirements**:
- [ ] Create vertex shader: `src/components/hero/shaders/gridVertex.glsl`
- [ ] Create fragment shader: `src/components/hero/shaders/gridFragment.glsl`
- [ ] Create component: `src/components/hero/scenes/WarpedGrid.tsx`
- [ ] Use PlaneGeometry (12×12 units, responsive segments)
- [ ] Rotate -Math.PI / 2 on X-axis
- [ ] Set uniforms: time (updates via useFrame), color
- [ ] Use ShaderMaterial (wireframe mode)
- [ ] Apply THREE.AdditiveBlending
- [ ] Device tier integration via props

**Related Documentation**:
- `/docs/guides/hero-animation-director-spec.md` (lines 61-77, 160-201)
- `/docs/guides/threejs-hero-background.md` (implementation guide)
- `threejs-shaders` skill: Vertex deformation, fragment shading, uniforms

---

### Task 5.3: Implement LaserController Component

**File**: `src/components/hero/scenes/LaserController.tsx`

**Specifications** (from Director Spec):
- Flash interval: 2-5 seconds (randomized)
- Flash duration: 0.3-0.6 seconds
- Width: 0.02-0.04 units
- Length: 3-8 units (varies)
- Colors:
  - Standard (70%): #0066FF
  - Fast (20%): #00FFFF
  - Accent (10%): #F472B6
- Trajectory: Always diagonal (45° or 135°)
- Fade: Sharp attack, exponential decay

**Implementation Requirements**:
- [ ] Create component: `src/components/hero/scenes/LaserController.tsx`
- [ ] Manage laser state: array of active lasers
- [ ] Schedule flash creation: randomized intervals
- [ ] Implement Laser data structure:
  ```typescript
  interface Laser {
    id: number
    start: THREE.Vector3
    end: THREE.Vector3
    color: THREE.Color
    progress: number  // 0-1 along trajectory
    speed: number     // units/second
    decay: number     // fade speed
    active: boolean
  }
  ```
- [ ] Use CylinderGeometry for laser visual (thin cylinder)
- [ ] Apply THREE.AdditiveBlending
- [ ] Create LaserStreak sub-component for individual renders
- [ ] Device tier integration: max 5 lasers (desktop), 3 (tablet), 2 (mobile)
- [ ] Implement fragment shader for glow effect

**Optional Advanced Features**:
- Fragment shader for head/tail fade effect (Director Spec lines 232-250)
- Trail component from drei for smooth tail animation

**Related Documentation**:
- `/docs/guides/hero-animation-director-spec.md` (lines 107-138, 232-250)
- `/docs/guides/threejs-hero-background.md` (placeholder at lines 250-313)
- `threejs-animation` skill: Animation timing, state management

---

## Device Tier Integration

T5 components will receive device tier optimization via props. The calculation is already done in T4:

```typescript
// Available from T4 exports
const particleCount = getParticleCount(deviceTier)    // 400|800|1200
const gridSegments = getGridSegments(deviceTier)      // 16|24|32
const maxLasers = getMaxLasers(deviceTier)            // 2|3|5
```

**How to Connect in T5**:

Option A (Props - Recommended):
```typescript
// In ThreeHeroBackground.tsx (update placeholder calls)
<ParticleField particleCount={getParticleCount(deviceTier)} />
<WarpedGrid gridSegments={getGridSegments(deviceTier)} />
<LaserController maxLasers={getMaxLasers(deviceTier)} />
```

Option B (Context - If passing through many components):
```typescript
// Create context in T5
const DeviceTierContext = createContext<'desktop'|'tablet'|'mobile'>('desktop')

// Wrap in provider
<DeviceTierContext.Provider value={deviceTier}>
  <ParticleField />
  <WarpedGrid />
  <LaserController />
</DeviceTierContext.Provider>
```

---

## Shader Integration Guide

### Shader File Structure

All shaders go in `src/components/hero/shaders/`:

```
src/components/hero/shaders/
├── gridVertex.glsl
├── gridFragment.glsl
├── particleVertex.glsl
└── laserFragment.glsl
```

### Importing Shaders

**With Vite/Webpack (Recommended)**:
```typescript
import vertexShader from './shaders/gridVertex.glsl'
import fragmentShader from './shaders/gridFragment.glsl'

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: { /* ... */ }
})
```

**As Inline Strings (Fallback)**:
```typescript
const material = new THREE.ShaderMaterial({
  vertexShader: `
    // shader code here
  `,
  fragmentShader: `
    // shader code here
  `
})
```

### Shader Best Practices
- Use `varying` to pass data from vertex to fragment shader
- Update uniforms via `useFrame` in React
- Use `mix`, `step`, `smoothstep` instead of if/else
- Test shaders with `threejs-shaders` skill for performance tips

---

## Scene Composition Architecture

**Current Structure** (T4 - Ready for T5):
```tsx
<Canvas>
  <Suspense fallback={null}>
    {/* Layer 2: Warped Grid (always visible) */}
    <WarpedGrid />

    {/* Layer 3: Particle Field (particles & dataflow scenes) */}
    {(scene === 'particles' || scene === 'dataflow') && <ParticleField />}

    {/* Layer 4: Laser Streaks (dataflow & geometric scenes) */}
    {(scene === 'dataflow' || scene === 'geometric') && <LaserController />}
  </Suspense>
</Canvas>
```

**Scene Combinations**:
- `scene='particles'`: WarpedGrid + ParticleField
- `scene='geometric'`: WarpedGrid + LaserController
- `scene='dataflow'`: WarpedGrid + ParticleField + LaserController

---

## Performance Targets & Monitoring

### Target Metrics (from Director Spec)
- Desktop: 60 FPS
- Mobile: 30+ FPS minimum
- Script bundle: <50KB gzipped
- Initial render: <100ms

### Performance Monitoring in T5

Use R3F's `useFrame` to monitor:
```typescript
useFrame(({ clock }) => {
  // Update uniforms
  materialRef.current.uniforms.time.value = clock.elapsedTime

  // Optional: Log FPS
  if (frameCountRef.current % 60 === 0) {
    console.log('FPS:', 1 / clock.getDelta())
  }
  frameCountRef.current++
})
```

### Mobile Optimization Checklist
- [ ] Particle count reduced per `getParticleCount(deviceTier)`
- [ ] Grid segments reduced per `getGridSegments(deviceTier)`
- [ ] Laser count capped per `getMaxLasers(deviceTier)`
- [ ] DPR capping from T4: [1, 2]
- [ ] Performance scaling from T4: min 0.5 FPS

---

## Testing & QA Checklist

### Functionality Testing
- [ ] ParticleField renders and animates smoothly
- [ ] WarpedGrid waves deform correctly
- [ ] LaserController flashes appear at random intervals
- [ ] All three scenes can be selected via `scene` prop
- [ ] Scene combinations render correctly

### Performance Testing
- [ ] Desktop: 60 FPS maintained
- [ ] Tablet (iPad): 30+ FPS maintained
- [ ] Mobile (iPhone): 30+ FPS maintained
- [ ] No memory leaks (check DevTools)
- [ ] Shader compilation time < 100ms

### Visual Testing
- [ ] Brand colors exact (#0066FF, #6366F1, #F472B6, #0A1628)
- [ ] Particle opacity pulsing visible
- [ ] Grid deformation smooth and continuous
- [ ] Laser flashes bright and sharp
- [ ] Additive blending creates proper light effects
- [ ] Reduced motion: static fallback renders correctly

### Accessibility Testing
- [ ] aria-hidden="true" present on Canvas container
- [ ] Reduced motion preference respected (T4 integration)
- [ ] No console errors or warnings

### Code Quality
- [ ] TypeScript strict: 0 errors
- [ ] ESLint: 0 errors, 0 warnings
- [ ] Proper component exports
- [ ] JSDoc comments on all exports

---

## Integration Points with T4

### What T5 Must Update in T4

**Option 1: Update ThreeHeroBackground.tsx placeholder components**

Lines 117-143 currently have placeholder components. T5 should either:

**A) Replace inline (if keeping structure)**:
```tsx
// Replace null returns with real implementations
function ParticleField() {
  // Real particle implementation from T5
}

function WarpedGrid() {
  // Real grid implementation from T5
}

function LaserController() {
  // Real laser implementation from T5
}
```

**B) Extract to separate files (Recommended)**:
```tsx
// src/components/hero/ThreeHeroBackground.tsx (update imports)
import { ParticleField } from './scenes/ParticleField'
import { WarpedGrid } from './scenes/WarpedGrid'
import { LaserController } from './scenes/LaserController'
```

### Performance Config Wiring

**Current** (commented in T4, lines 204-208):
```typescript
// Performance settings calculated but not yet used
// TODO: Pass these to scene components in T5 via context or props
// getParticleCount(deviceTier)
// getGridSegments(deviceTier)
// getMaxLasers(deviceTier)
```

**T5 Must Implement** (one of two approaches):

Option A - Props (simpler):
```tsx
<Suspense fallback={null}>
  <WarpedGrid gridSegments={getGridSegments(_deviceTier)} />
  {(scene === 'particles' || scene === 'dataflow') &&
    <ParticleField particleCount={getParticleCount(_deviceTier)} />}
  {(scene === 'dataflow' || scene === 'geometric') &&
    <LaserController maxLasers={getMaxLasers(_deviceTier)} />}
</Suspense>
```

Option B - Context (recommended for many nested components):
```tsx
const DeviceTierContext = createContext<number>(1200)

// In T5
<DeviceTierContext.Provider value={getParticleCount(_deviceTier)}>
  <ParticleField />
  <WarpedGrid />
  <LaserController />
</DeviceTierContext.Provider>

// In scene components
const particleCount = useContext(DeviceTierContext)
```

---

## Execution Plan for T5

### Sequential Tasks (GROUP 3 & 4)

**GROUP 3 (Sequential - ~25 min)**:
1. T5.1: ParticleField component + shader
2. T5.2: WarpedGrid component + shaders
3. T5.3: LaserController component

**GROUP 4 (Sequential - ~10 min)**:
4. Integration: Update ThreeHeroBackground.tsx
5. Testing: Run visual & performance tests

### Implementation Order
1. **Start with WarpedGrid** (simplest shader logic)
2. **Then ParticleField** (attribute-heavy but straightforward)
3. **Then LaserController** (state management intensive)
4. **Finally integration** (wire device tier parameters)

### Recommended Subagent Execution

Use `sc:implement` with `--with threejs-shaders` flag:

```bash
/sc:implement "T5.1-T5.3: Scene components with shaders" --with threejs-shaders
```

This activates:
- Frontend developer for React component architecture
- Shader expert for GLSL implementations
- Performance engineer for optimization

---

## Documentation References

### Primary Documents
- **Implementation Guide**: `/docs/guides/threejs-hero-background.md`
- **Director Specification**: `/docs/guides/hero-animation-director-spec.md`
- **T4 Completion**: This handoff document

### Skill References
- **threejs-shaders**: GLSL vertex/fragment, uniforms, materials
- **threejs-animation**: Timing, state management, animation loops
- **nextjs-vercel-pro:frontend-developer**: React patterns, component architecture

### In-Code Documentation
- **T4 JSDoc**: Lines 162-189 in ThreeHeroBackground.tsx
- **T4 TODO Comments**: Lines 117-143 with exact specifications
- **Director Spec References**: Inline comments in scene placeholders

---

## Known Constraints & Considerations

### Browser/Platform
- WebGL 1.0 required (Three.js default)
- Mobile GPU memory limited (reduce particle/segment counts)
- iOS Safari: Some shader features may differ

### Next.js Specific
- Canvas must be in 'use client' component (T4 handles this)
- SSR: No window access outside useEffect (T4 guards this)
- Dynamic import supported if needed for code splitting

### Performance Limits
- Particle count max: 1200 (desktop)
- Shader compilation adds ~50-100ms on page load
- Additive blending impacts fill rate on mobile

### Future Enhancements (Post-T5)
- [ ] Advanced shader: Fresnel effect for rim lighting
- [ ] Performance: Implement LOD (level of detail) for mobile
- [ ] Accessibility: Add audio visualization option for reduced motion
- [ ] Customization: Make colors/speeds configurable

---

## Success Criteria for T5

**Visual**:
- ✅ Particle field animates smoothly (30+ FPS)
- ✅ Grid waves deform in sinusoidal pattern
- ✅ Laser flashes appear at random intervals
- ✅ All colors match brand palette exactly
- ✅ Additive blending creates proper light composition

**Technical**:
- ✅ TypeScript strict: 0 errors
- ✅ ESLint: 0 errors, 0 warnings
- ✅ Performance: 60 FPS desktop, 30+ FPS mobile
- ✅ Memory: No leaks (DevTools check)
- ✅ Shaders compile cleanly

**Integration**:
- ✅ Scene components properly imported/exported
- ✅ Device tier parameters wired and working
- ✅ ThreeHeroBackground.tsx updated with real implementations
- ✅ Reduced motion fallback still works
- ✅ Ready for production deployment

**Code Quality**:
- ✅ All components have JSDoc
- ✅ Shader files properly organized
- ✅ Code follows project conventions
- ✅ No unused imports or variables

---

## Questions & Escalation Path

**For Shader Questions**:
- Reference `threejs-shaders` skill documentation
- Check shader examples in Director Spec (lines 160-250)
- WebGL reference: https://khronos.org/opengl/wiki/OpenGL_Shading_Language

**For React Three Fiber Questions**:
- Reference `@react-three/fiber` documentation (Context7)
- Check R3F examples at https://docs.pmnd.rs/react-three-fiber

**For Performance Questions**:
- Run QA audit with code-reviewer subagent
- Profile with Chrome DevTools Performance panel
- Check FPS with `stats.js` (optional addition)

---

## Deliverable Checklist

Upon T5 completion, verify:

- [ ] `src/components/hero/scenes/ParticleField.tsx` created and tested
- [ ] `src/components/hero/scenes/WarpedGrid.tsx` created and tested
- [ ] `src/components/hero/scenes/LaserController.tsx` created and tested
- [ ] `src/components/hero/shaders/particleVertex.glsl` created
- [ ] `src/components/hero/shaders/gridVertex.glsl` created
- [ ] `src/components/hero/shaders/gridFragment.glsl` created
- [ ] `src/components/hero/shaders/laserFragment.glsl` created (if implemented)
- [ ] ThreeHeroBackground.tsx updated with real component implementations
- [ ] Device tier parameters wired and functional
- [ ] All visual tests passing
- [ ] All performance tests passing (30+ FPS minimum)
- [ ] QA audit score: 90+/100
- [ ] Ready to merge to main
- [ ] USAGE.md updated with new scene composition details

---

## Sign-Off

**T4 Completed By**: Claude Haiku 4.5
**T4 QA Score**: 95/100
**T4 Status**: ✅ Shipped to Production
**T4 Merge Commits**: 7baf2a5, 3426a50

**T5 Ready To Begin**: YES
**Estimated T5 Duration**: 35 minutes (GROUP 3: 25m + GROUP 4: 10m)
**Next Milestone**: T6 - Homepage Integration (Optional: Refactor homepage.tsx to use ThreeHeroBackground)

---

**This handoff document is complete and ready for T5 implementation.**

For questions or clarifications, refer to the specification documents or contact the architecture team.

**Happy shipping! 🚀**
