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

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

/**
 * Fragment shader for grid with edge fade
 */
const gridFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Distance fade at edges
    float distFromCenter = length(vUv - 0.5) * 2.0;
    float alpha = (1.0 - smoothstep(0.3, 1.0, distFromCenter)) * uOpacity;

    // Elevation brightness
    float brightness = 0.5 + vElevation * 0.5;

    gl_FragColor = vec4(uColor * brightness, alpha);
  }
`

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

  // Only update time uniform - no CPU vertex loops
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime
    }
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
