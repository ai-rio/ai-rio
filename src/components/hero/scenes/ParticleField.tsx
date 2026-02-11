'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface ParticleFieldProps {
  particleCount: number
}

const PARTICLE_COLORS = [
  new THREE.Color('#ffffff'),  // White - dominant
  new THREE.Color('#8B5CF6'),  // Purple
  new THREE.Color('#EC4899'),  // Pink
  new THREE.Color('#06B6D4'),  // Cyan
  new THREE.Color('#F59E0B'),  // Amber
]

function pickColor(): THREE.Color {
  const r = Math.random()
  if (r < 0.4) return PARTICLE_COLORS[0]  // 40% white
  if (r < 0.6) return PARTICLE_COLORS[1]  // 20% purple
  if (r < 0.75) return PARTICLE_COLORS[2] // 15% pink
  if (r < 0.9) return PARTICLE_COLORS[3]  // 15% cyan
  return PARTICLE_COLORS[4]               // 10% amber
}

function createParticleTexture(): THREE.Texture {
  const size = 32
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  )
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.7)')
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.15)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function ParticleField({ particleCount }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const phasesRef = useRef<Float32Array | null>(null)
  const baseSizesRef = useRef<Float32Array | null>(null)

  const texture = useMemo(() => createParticleTexture(), [])

  const geometry = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const phases = new Float32Array(particleCount)
    const baseSizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Spread wide, concentrated in lower-right like jina.ai
      positions[i * 3] = (Math.random() - 0.3) * 16
      positions[i * 3 + 1] = (Math.random() - 0.6) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6

      const color = pickColor()
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      // Mostly tiny — like stars/dust
      const sizeRoll = Math.random()
      if (sizeRoll < 0.85) {
        baseSizes[i] = 0.008 + Math.random() * 0.015 // Tiny: 0.008-0.023
      } else if (sizeRoll < 0.95) {
        baseSizes[i] = 0.02 + Math.random() * 0.02  // Small: 0.02-0.04
      } else {
        baseSizes[i] = 0.04 + Math.random() * 0.03  // Medium: 0.04-0.07
      }
      sizes[i] = baseSizes[i]
      phases[i] = Math.random() * Math.PI * 2
    }

    phasesRef.current = phases
    baseSizesRef.current = baseSizes

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [particleCount])

  useFrame(({ clock }) => {
    if (!pointsRef.current || !phasesRef.current || !baseSizesRef.current) return

    const sizeAttr = pointsRef.current.geometry.attributes.size as THREE.BufferAttribute
    const sizeArr = sizeAttr.array as Float32Array
    const phases = phasesRef.current
    const baseSizes = baseSizesRef.current
    const time = clock.elapsedTime

    for (let i = 0; i < particleCount; i++) {
      // Subtle twinkle
      const twinkle = Math.sin(time * 1.2 + phases[i]) * 0.5 + 0.5
      sizeArr[i] = baseSizes[i] * (0.3 + twinkle * 0.7)
    }

    sizeAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        map={texture}
        vertexColors
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        alphaTest={0.01}
      />
    </points>
  )
}
