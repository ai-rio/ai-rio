'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'

interface WarpedGridProps {
  gridSegments: number
}

/**
 * Vertex shader for wave-deformed grid
 * Wave animation happens entirely on GPU - no CPU updates
 */
const gridVertexShader = `
  uniform float uTime;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Primary wave - radial from center
    float dist = length(pos.xz);
    float wave1 = sin(dist * 2.0 - uTime * 0.8) * 0.15;

    // Secondary wave - directional
    float wave2 = sin(pos.x * 1.5 + pos.z * 1.5 + uTime * 0.5) * 0.08;

    pos.y += wave1 + wave2;
    vElevation = pos.y;
    vWorldPos = pos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

/**
 * Fragment shader for grid with scan line effect
 * Scan → Detect leaks → Recover cycle, all GPU-driven
 */
const gridFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uScanProgress;
  uniform vec3 uScanColor;
  uniform vec3 uLeakColor;
  uniform vec3 uRecoveredColor;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vWorldPos;

  // Hash function for deterministic pseudo-random
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // Value noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    // Distance fade at edges
    float distFromCenter = length(vUv - 0.5) * 2.0;
    float alpha = (1.0 - smoothstep(0.3, 1.0, distFromCenter)) * uOpacity;

    // Elevation brightness
    float brightness = 0.5 + vElevation * 0.5;

    vec3 baseColor = uColor * brightness;

    // Map scan progress to Z range (-6 to 6, matching grid size 12)
    float scanZ = mix(-7.0, 7.0, uScanProgress);

    // Scan line - cyan pulse
    float scanDist = vWorldPos.x - scanZ;
    float scanLine = smoothstep(0.6, 0.0, abs(scanDist)) * step(0.01, uScanProgress) * step(uScanProgress, 0.99);
    float scanGlow = smoothstep(1.5, 0.0, abs(scanDist)) * 0.3 * step(0.01, uScanProgress) * step(uScanProgress, 0.99);

    // Leak detection - noise determines which points are "leaks"
    float leakNoise = noise(vWorldPos.xz * 1.8);
    float isLeak = step(0.72, leakNoise);

    // Leak flash - amber flare just behind the scan line
    float behindScan = smoothstep(0.0, -0.8, scanDist) * smoothstep(-2.5, -0.3, scanDist);
    float leakFlash = behindScan * isLeak * step(0.01, uScanProgress) * step(uScanProgress, 0.99);

    // Recovery glow - teal glow further behind (leaks "fixed")
    float recoveryZone = smoothstep(-1.5, -3.0, scanDist) * smoothstep(-8.0, -2.0, scanDist);
    float recoveryGlow = recoveryZone * isLeak * step(0.01, uScanProgress);

    // Blend everything together
    vec3 finalColor = baseColor;
    finalColor = mix(finalColor, uScanColor, (scanLine + scanGlow) * 0.8);
    finalColor = mix(finalColor, uLeakColor, leakFlash * 0.9);
    finalColor = mix(finalColor, uRecoveredColor, recoveryGlow * 0.6);

    // Boost alpha where effects are active
    float effectAlpha = max(max(scanLine * 0.5, leakFlash * 0.4), recoveryGlow * 0.3);
    alpha = max(alpha, effectAlpha * (1.0 - smoothstep(0.8, 1.0, distFromCenter)));

    gl_FragColor = vec4(finalColor, alpha);
  }
`

const CYCLE_DURATION = 8.0

export function WarpedGrid({ gridSegments }: WarpedGridProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(12, 12, gridSegments, gridSegments)
  }, [gridSegments])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#0066FF') },
        uOpacity: { value: 0.12 },
        uScanProgress: { value: 0 },
        uScanColor: { value: new THREE.Color('#00FFFF') },
        uLeakColor: { value: new THREE.Color('#F59E0B') },
        uRecoveredColor: { value: new THREE.Color('#14B8A6') },
      },
      vertexShader: gridVertexShader,
      fragmentShader: gridFragmentShader,
      wireframe: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    })
  }, [])

  useEffect(() => {
    materialRef.current = material
  }, [material])

  useFrame(({ clock }) => {
    if (!materialRef.current) return

    materialRef.current.uniforms.uTime.value = clock.elapsedTime

    // ~8 second cycle
    const t = clock.elapsedTime % CYCLE_DURATION

    let scanProgress = 0.0
    if (t >= 0.5 && t < 4.5) {
      // Scan sweeps across (0.5s - 4.5s)
      scanProgress = (t - 0.5) / 4.0
    } else if (t >= 4.5 && t < 7.0) {
      // Recovery display - scan complete
      scanProgress = 1.0
    } else if (t >= 7.0) {
      // Fade reset
      scanProgress = 1.0 - (t - 7.0) / 1.0
    }
    // else t < 0.5: pre-scan rest, scanProgress stays 0

    materialRef.current.uniforms.uScanProgress.value = scanProgress
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.5, 0]}
    >
      <primitive object={material} />
    </mesh>
  )
}
