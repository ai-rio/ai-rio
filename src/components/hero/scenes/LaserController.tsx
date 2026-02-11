'use client'

import { useFrame } from '@react-three/fiber'
import { useState, useMemo, useRef } from 'react'
import * as THREE from 'three'

interface LaserControllerProps {
  maxLasers: number
}

interface Laser {
  id: number
  start: THREE.Vector3
  end: THREE.Vector3
  color: THREE.Color
  progress: number
  speed: number
  opacity: number
  length: number
  width: number
  active: boolean
  birthTime: number
}

const LASER_COLORS = {
  standard: new THREE.Color('#0066FF'),
  fast: new THREE.Color('#00FFFF'),
  accent: new THREE.Color('#F472B6'),
}

function getRandomColor(): THREE.Color {
  const r = Math.random()
  if (r < 0.7) return LASER_COLORS.standard.clone()
  if (r < 0.9) return LASER_COLORS.fast.clone()
  return LASER_COLORS.accent.clone()
}

function createLaser(id: number): Laser {
  const angle = Math.random() < 0.5 ? Math.PI / 4 : (3 * Math.PI) / 4
  const length = 4 + Math.random() * 6
  const width = 0.06 + Math.random() * 0.06
  const start = new THREE.Vector3(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 6,
    -1 + Math.random() * 2
  )
  const dir = new THREE.Vector3(Math.cos(angle), Math.sin(angle) * 0.5, 0).normalize()
  const end = start.clone().add(dir.multiplyScalar(length))

  return {
    id,
    start,
    end,
    color: getRandomColor(),
    progress: 0,
    speed: 2 + Math.random() * 2,
    opacity: 1,
    length,
    width,
    active: true,
    birthTime: Date.now(),
  }
}

/**
 * Creates a CanvasTexture for a laser beam with:
 * - Bright white core center line
 * - Soft color glow falloff
 * - Tapered transparent ends
 */
function createLaserTexture(): THREE.Texture {
  const width = 256
  const height = 64
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  // Clear
  ctx.clearRect(0, 0, width, height)

  const centerY = height / 2

  // Outer glow - wide soft band
  const outerGlow = ctx.createLinearGradient(0, 0, 0, height)
  outerGlow.addColorStop(0, 'rgba(255, 255, 255, 0)')
  outerGlow.addColorStop(0.25, 'rgba(255, 255, 255, 0.05)')
  outerGlow.addColorStop(0.4, 'rgba(255, 255, 255, 0.15)')
  outerGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.6)')
  outerGlow.addColorStop(0.6, 'rgba(255, 255, 255, 0.15)')
  outerGlow.addColorStop(0.75, 'rgba(255, 255, 255, 0.05)')
  outerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)')

  // Horizontal taper - fade at both ends
  for (let x = 0; x < width; x++) {
    const t = x / width
    // Smooth taper: quick fade at start, long tail at end
    const taper = Math.pow(Math.sin(t * Math.PI), 0.5)

    ctx.globalAlpha = taper
    ctx.fillStyle = outerGlow
    ctx.fillRect(x, 0, 1, height)
  }

  // Bright core line - narrower, brighter
  ctx.globalAlpha = 1
  for (let x = 0; x < width; x++) {
    const t = x / width
    const taper = Math.pow(Math.sin(t * Math.PI), 0.5)
    const coreHeight = 4

    const coreGrad = ctx.createLinearGradient(0, centerY - coreHeight, 0, centerY + coreHeight)
    coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0)')
    coreGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)')
    coreGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1)')
    coreGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.8)')
    coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.globalAlpha = taper
    ctx.fillStyle = coreGrad
    ctx.fillRect(x, centerY - coreHeight, 1, coreHeight * 2)
  }

  ctx.globalAlpha = 1

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function LaserStreak({ laser, texture }: { laser: Laser; texture: THREE.Texture }) {
  const meshRef = useRef<THREE.Mesh>(null)

  const { position, rotation, scale } = useMemo(() => {
    const pos = new THREE.Vector3().addVectors(laser.start, laser.end).multiplyScalar(0.5)
    const dir = new THREE.Vector3().subVectors(laser.end, laser.start)
    const len = dir.length()
    dir.normalize()

    // Rotate plane to align with beam direction
    const angle = Math.atan2(dir.y, dir.x)
    const rot = new THREE.Euler(0, 0, angle)

    return {
      position: pos,
      rotation: rot,
      scale: new THREE.Vector3(len, laser.width * 8, 1),
    }
  }, [laser.start, laser.end, laser.width])

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        color={laser.color}
        transparent
        opacity={laser.opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export function LaserController({ maxLasers }: LaserControllerProps) {
  const texture = useMemo(() => createLaserTexture(), [])

  const initialLasers = useMemo(() => {
    const init: Laser[] = []
    for (let i = 0; i < Math.min(2, maxLasers); i++) {
      init.push(createLaser(i))
    }
    return init
  }, [maxLasers])

  const [lasers, setLasers] = useState<Laser[]>(initialLasers)
  const lasersRef = useRef<Laser[]>(initialLasers)
  const lastFlashRef = useRef(0)
  const nextIntervalRef = useRef(800 + Math.random() * 1500)
  const idRef = useRef(initialLasers.length)

  useFrame((_, delta) => {
    const now = Date.now()

    // Update existing lasers
    const updated = lasersRef.current
      .map((l) => ({
        ...l,
        progress: l.progress + l.speed * delta,
        opacity: Math.max(0, l.opacity - delta * 0.4),
        active: l.opacity - delta * 0.4 > 0,
      }))
      .filter((l) => l.active)

    lasersRef.current = updated

    // Spawn new laser
    const activeCount = updated.length
    if (now - lastFlashRef.current > nextIntervalRef.current && activeCount < maxLasers) {
      lastFlashRef.current = now
      nextIntervalRef.current = 800 + Math.random() * 1500
      const newLaser = createLaser(idRef.current++)
      lasersRef.current = [...updated, newLaser]
    }

    setLasers([...lasersRef.current])
  })

  return (
    <group>
      {lasers.map((laser) => (
        <LaserStreak key={laser.id} laser={laser} texture={texture} />
      ))}
    </group>
  )
}
