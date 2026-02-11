'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState, useCallback } from 'react'
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

// Pre-generate random intervals for laser spawning
const RANDOM_INTERVALS = [800, 950, 1100, 1250, 1400, 1550, 1700]

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
  outerGlow.addColorStop(0, 'rgba(255,255,255,0)')
  outerGlow.addColorStop(0.25, 'rgba(255,255,255,0.05)')
  outerGlow.addColorStop(0.4, 'rgba(255,255,255,0.15)')
  outerGlow.addColorStop(0.5, 'rgba(255,255,255,0.6)')
  outerGlow.addColorStop(0.75, 'rgba(255,255,255,0.15)')
  outerGlow.addColorStop(1, 'rgba(255,255,255,0)')

  // Horizontal taper - fade at both ends
  for (let x = 0; x < width; x++) {
    const t = x / width
    ctx.globalAlpha = Math.pow(Math.sin(t * Math.PI), 0.5)
    ctx.fillStyle = outerGlow
    ctx.fillRect(x, 0, 1, height)
  }

  // Bright core line - narrower, brighter
  ctx.globalAlpha = 1
  for (let x = 0; x < width; x++) {
    const t = x / width
    const coreHeight = 4

    const coreGrad = ctx.createLinearGradient(0, centerY - coreHeight, 0, centerY + coreHeight)
    coreGrad.addColorStop(0, 'rgba(255,255,255,0)')
    coreGrad.addColorStop(0.3, 'rgba(255,255,255,0.8)')
    coreGrad.addColorStop(0.5, 'rgba(255,255,255,1)')
    coreGrad.addColorStop(0.7, 'rgba(255,255,255,0.8)')
    coreGrad.addColorStop(1, 'rgba(255,255,255,0)')

    ctx.fillStyle = coreGrad
    ctx.fillRect(x, centerY - coreHeight, 1, coreHeight * 2)
  }

  ctx.globalAlpha = 1

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Single laser mesh component
 * Updates position/scale/opacity directly without React re-renders
 */
function LaserStreak({ laser, texture }: { laser: Laser; texture: THREE.Texture }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null)

  // Calculate initial transform (memoized to avoid recalcs)
  const initialTransform = useMemo(() => {
    const pos = new THREE.Vector3().addVectors(laser.start, laser.end).multiplyScalar(0.5)
    const dir = new THREE.Vector3().subVectors(laser.end, laser.start)
    const len = dir.length()
    dir.normalize()
    const angle = Math.atan2(dir.y, dir.x)
    const rot = new THREE.Euler(0, 0, angle)

    const scaleVec = new THREE.Vector3(len, laser.width * 8, 1)

    return {
      position: pos,
      rotation: rot,
      scale: scaleVec,
    }
  }, [laser.start, laser.end, laser.width])

  const material = useMemo(() => {
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      color: laser.color,
      transparent: true,
      opacity: laser.opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
    materialRef.current = mat
    return mat
  }, [laser.color, texture, laser.opacity])

  // Direct mesh property updates
  useFrame(() => {
    if (!meshRef.current || !materialRef.current) return

    // Update progress and opacity
    const delta = 1 / 60
    const updatedProgress = laser.progress + delta * laser.speed
    const updatedOpacity = Math.max(0, laser.opacity - delta * 0.4)

    // Update mesh properties directly
    meshRef.current.position.set(
      (1 - updatedProgress) * laser.start.x + updatedProgress * laser.end.x,
      (1 - updatedProgress) * laser.start.y + updatedProgress * laser.end.y,
      (1 - updatedProgress) * laser.start.z + updatedProgress * laser.end.z
    )

    // Update scale based on opacity (fade out effect)
    const fadeScale = Math.max(0, updatedOpacity)
    meshRef.current.scale.set(
      initialTransform.scale.x * fadeScale,
      initialTransform.scale.y * fadeScale,
      fadeScale
    )

    // Update material opacity directly
    if (materialRef.current) {
      materialRef.current.opacity = updatedOpacity
    }
  })
  })

  return (
    <mesh ref={meshRef} {...initialTransform}>
      <planeGeometry args={[1, 1]} />
      <primitive object={material} />
    </mesh>
  )
}

export function LaserController({ maxLasers }: LaserControllerProps) {
  const glowTexture = useMemo(() => createLaserTexture(), [])

  // State for lasers
  const [lasers, setLasers] = useState<Laser[]>([])

  const lastFlashRef = useRef(0)
  const nextIntervalIndexRef = useRef(0)
  const nextIntervalRef = useRef(RANDOM_INTERVALS[0])
  const idRef = useRef(0)

  // Callback-based state update to avoid modifying loop variables
  const spawnLaser = useCallback((newLaser: Laser) => {
    setLasers(prev => [...prev, newLaser])
  }, [])

  useFrame(() => {
    const now = Date.now()

    // Spawn new lasers (time-based, not frame-based to avoid jitter)
    const activeCount = lasers.filter(l => l.active).length

    if (now - lastFlashRef.current > nextIntervalRef.current && activeCount < maxLasers) {
      lastFlashRef.current = now

      // Cycle through pre-generated intervals
      nextIntervalIndexRef.current = (nextIntervalIndexRef.current + 1) % RANDOM_INTERVALS.length
      nextIntervalRef.current = RANDOM_INTERVALS[nextIntervalIndexRef.current]

      spawnLaser(createLaser(idRef.current++))
    }
  })

  return (
    <group>
      {lasers.map((laser) => (
        <LaserStreak key={laser.id} laser={laser} texture={glowTexture} />
      ))}
    </group>
  )
}
