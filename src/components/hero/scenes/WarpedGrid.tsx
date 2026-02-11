'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface WarpedGridProps {
  gridSegments: number
}

export function WarpedGrid({ gridSegments }: WarpedGridProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const originalPositions = useRef<Float32Array | null>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(12, 12, gridSegments, gridSegments)
    // Store original positions for wave animation
    originalPositions.current = new Float32Array(geo.attributes.position.array)
    return geo
  }, [gridSegments])

  useFrame(({ clock }) => {
    if (!meshRef.current || !originalPositions.current) return
    const positions = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = positions.array as Float32Array
    const orig = originalPositions.current
    const time = clock.elapsedTime

    for (let i = 0; i < arr.length; i += 3) {
      const x = orig[i]
      const y = orig[i + 1]

      // Primary wave - radial from center
      const dist = Math.sqrt(x * x + y * y)
      const wave1 = Math.sin(dist * 2.0 - time * 0.8) * 0.15

      // Secondary wave - directional
      const wave2 = Math.sin(x * 1.5 + y * 1.5 + time * 0.5) * 0.08

      arr[i] = orig[i]
      arr[i + 1] = orig[i + 1]
      arr[i + 2] = wave1 + wave2
    }

    positions.needsUpdate = true
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.5, 0]}
    >
      <meshBasicMaterial
        color="#0066FF"
        wireframe
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
