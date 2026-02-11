'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'

interface FlowingStreamsProps {
  streamCount: number
}

const STREAM_COLORS = [
  new THREE.Color('#ffffff'),
  new THREE.Color('#8B5CF6'),
  new THREE.Color('#EC4899'),
  new THREE.Color('#06B6D4'),
  new THREE.Color('#F59E0B'),
  new THREE.Color('#0066FF'),
]

function pickStreamColor(): THREE.Color {
  return STREAM_COLORS[Math.floor(Math.random() * STREAM_COLORS.length)].clone()
}

interface StreamData {
  p0: THREE.Vector3
  p1: THREE.Vector3
  p2: THREE.Vector3
  p3: THREE.Vector3
  color: THREE.Color
  speed: number
  width: number
  offset: number
  trailLength: number
}

function createStream(index: number, total: number): StreamData {
  const convergeX = 2 + Math.random() * 2
  const convergeY = -1 + Math.random() * 1

  const edge = Math.random()
  let startX: number, startY: number
  if (edge < 0.5) {
    startX = -8 - Math.random() * 2
    startY = (Math.random() - 0.3) * 6
  } else if (edge < 0.8) {
    startX = (Math.random() - 0.5) * 8
    startY = 5 + Math.random() * 2
  } else {
    startX = -6 - Math.random() * 3
    startY = 3 + Math.random() * 3
  }

  const p0 = new THREE.Vector3(startX, startY, (Math.random() - 0.5) * 2)

  const midX = (startX + convergeX) / 2
  const midY = (startY + convergeY) / 2
  const curvature = 1.5 + Math.random() * 2.5
  const curveDir = Math.random() < 0.5 ? 1 : -1

  const p1 = new THREE.Vector3(
    midX + curveDir * curvature * 0.5,
    midY + curvature * 0.8,
    (Math.random() - 0.5) * 1
  )
  const p2 = new THREE.Vector3(
    midX + curveDir * curvature,
    midY - curvature * 0.3,
    (Math.random() - 0.5) * 1
  )

  const endAngle = Math.random() * Math.PI * 0.5 - Math.PI * 0.25
  const endDist = 3 + Math.random() * 4
  const p3 = new THREE.Vector3(
    convergeX + Math.cos(endAngle) * endDist,
    convergeY + Math.sin(endAngle) * endDist * 0.5,
    (Math.random() - 0.5) * 1
  )

  return {
    p0, p1, p2, p3,
    color: pickStreamColor(),
    speed: 0.08 + Math.random() * 0.12,
    width: 0.03 + Math.random() * 0.05,
    offset: (index / total) + Math.random() * 0.3,
    trailLength: 0.15 + Math.random() * 0.2,
  }
}

/**
 * Optimized stream trail with pre-allocated geometry
 * Only updates position attribute buffer, no geometry recreation
 */
function StreamTrail({ stream }: { stream: StreamData }) {
  const lineRef = useRef<THREE.Line>(null)
  const materialRef = useRef<THREE.LineBasicMaterial | null>(null)
  const geometryRef = useRef<THREE.BufferGeometry | null>(null)

  // Create geometry ONCE with pre-allocated buffers
  const geometry = useMemo(() => {
    const segments = 64
    const positions = new Float32Array(segments * 3)
    const colors = new Float32Array(segments * 3)

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    return geo
  }, [])

  // Store refs via useEffect, not during render
  useEffect(() => {
    geometryRef.current = geometry
  }, [geometry])

  const material = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    return mat
  }, [])

  useEffect(() => {
    materialRef.current = material
  }, [material])

  useFrame(({ clock }) => {
    if (!lineRef.current || !geometryRef.current) return

    const positions = geometryRef.current.attributes.position as THREE.BufferAttribute
    const colors = geometryRef.current.attributes.color as THREE.BufferAttribute
    const posArr = positions.array as Float32Array
    const colorArr = colors.array as Float32Array

    const progress = ((clock.elapsedTime * stream.speed + stream.offset) % 1.4) - 0.2
    const headT = Math.max(0, Math.min(1, progress))
    const tailT = Math.max(0, headT - stream.trailLength)

    // Early exit if stream is not visible
    if (headT <= 0 || headT - tailT < 0.01) {
      positions.needsUpdate = true
      colors.needsUpdate = true
      return
    }

    const segments = 64
    for (let i = 0; i < segments; i++) {
      const segT = i / (segments - 1)
      const curveT = tailT + segT * (headT - tailT)

      // Cubic bezier
      const t = curveT
      const u = 1 - t
      const uu = u * u
      const uuu = uu * u
      const tt = t * t
      const ttt = tt * t

      posArr[i * 3] = uuu * stream.p0.x + 3 * uu * t * stream.p1.x + 3 * u * tt * stream.p2.x + ttt * stream.p3.x
      posArr[i * 3 + 1] = uuu * stream.p0.y + 3 * uu * t * stream.p1.y + 3 * u * tt * stream.p2.y + ttt * stream.p3.y
      posArr[i * 3 + 2] = uuu * stream.p0.z + 3 * uu * t * stream.p1.z + 3 * u * tt * stream.p2.z + ttt * stream.p3.z

      // Fade from tail to head
      const brightness = Math.pow(segT, 2)
      colorArr[i * 3] = stream.color.r * brightness
      colorArr[i * 3 + 1] = stream.color.g * brightness
      colorArr[i * 3 + 2] = stream.color.b * brightness
    }

    positions.needsUpdate = true
    colors.needsUpdate = true
  })

  return <primitive ref={lineRef} object={new THREE.Line(geometry, material)} />
}

/**
 * Stream head glow sprite
 */
function StreamHead({ stream, glowTexture }: { stream: StreamData; glowTexture: THREE.Texture }) {
  const spriteRef = useRef<THREE.Sprite>(null)
  const materialRef = useRef<THREE.SpriteMaterial | null>(null)

  const material = useMemo(() => {
    const mat = new THREE.SpriteMaterial({
      map: glowTexture,
      color: stream.color,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    return mat
  }, [stream, glowTexture])

  useEffect(() => {
    materialRef.current = material
  }, [material])

  useFrame(({ clock }) => {
    if (!spriteRef.current || !materialRef.current) return

    const progress = ((clock.elapsedTime * stream.speed + stream.offset) % 1.4) - 0.2
    const headT = Math.max(0, Math.min(1, progress))

    if (headT <= 0 || headT >= 1) {
      spriteRef.current.visible = false
      return
    }

    spriteRef.current.visible = true

    // Cubic bezier for head position
    const t = headT
    const u = 1 - t
    const uu = u * u
    const uuu = uu * u
    const tt = t * t
    const ttt = tt * t

    spriteRef.current.position.set(
      uuu * stream.p0.x + 3 * uu * t * stream.p1.x + 3 * u * tt * stream.p2.x + ttt * stream.p3.x,
      uuu * stream.p0.y + 3 * uu * t * stream.p1.y + 3 * u * tt * stream.p2.y + ttt * stream.p3.y,
      uuu * stream.p0.z + 3 * uu * t * stream.p1.z + 3 * u * tt * stream.p2.z + ttt * stream.p3.z
    )

    const s = stream.width * 6
    spriteRef.current.scale.set(s, s, 1)
  })

  return <primitive ref={spriteRef} object={new THREE.Sprite(material)} />
}

export function FlowingStreams({ streamCount }: FlowingStreamsProps) {
  const glowTexture = useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.6)')
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.1)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
  }, [])

  const streams = useMemo(() => {
    const s: StreamData[] = []
    for (let i = 0; i < streamCount; i++) {
      s.push(createStream(i, streamCount))
    }
    return s
  }, [streamCount])

  return (
    <group>
      {streams.map((stream, i) => (
        <group key={i}>
          <StreamTrail stream={stream} />
          <StreamHead stream={stream} glowTexture={glowTexture} />
        </group>
      ))}
    </group>
  )
}
