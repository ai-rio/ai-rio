'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
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
  // Convergence point in the right-center area
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

function bezierPoint(t: number, p0: THREE.Vector3, p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3): THREE.Vector3 {
  const u = 1 - t
  const tt = t * t
  const uu = u * u
  const uuu = uu * u
  const ttt = tt * t
  return new THREE.Vector3(
    uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
    uuu * p0.z + 3 * uu * t * p1.z + 3 * u * tt * p2.z + ttt * p3.z,
  )
}

function StreamTrail({ stream, time }: { stream: StreamData; time: number }) {
  const segments = 64
  const positions = useMemo(() => new Float32Array(segments * 3), [])
  const colors = useMemo(() => new Float32Array(segments * 3), [])

  const progress = ((time * stream.speed + stream.offset) % 1.4) - 0.2
  const headT = Math.max(0, Math.min(1, progress))
  const tailT = Math.max(0, headT - stream.trailLength)

  if (headT <= 0 || headT - tailT < 0.01) return null

  for (let i = 0; i < segments; i++) {
    const segT = i / (segments - 1)
    const curveT = tailT + segT * (headT - tailT)
    const point = bezierPoint(curveT, stream.p0, stream.p1, stream.p2, stream.p3)
    positions[i * 3] = point.x
    positions[i * 3 + 1] = point.y
    positions[i * 3 + 2] = point.z

    const brightness = Math.pow(segT, 2)
    colors[i * 3] = stream.color.r * brightness
    colors[i * 3 + 1] = stream.color.g * brightness
    colors[i * 3 + 2] = stream.color.b * brightness
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </line>
  )
}

function StreamHead({ stream, glowTexture, time }: { stream: StreamData; glowTexture: THREE.Texture; time: number }) {
  const progress = ((time * stream.speed + stream.offset) % 1.4) - 0.2
  const headT = Math.max(0, Math.min(1, progress))

  if (headT <= 0 || headT >= 1) return null

  const headPos = bezierPoint(headT, stream.p0, stream.p1, stream.p2, stream.p3)
  const s = stream.width * 6

  return (
    <sprite position={headPos} scale={[s, s, 1]}>
      <spriteMaterial
        map={glowTexture}
        color={stream.color}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  )
}

function StreamsRenderer({
  streams,
  glowTexture,
}: {
  streams: StreamData[]
  glowTexture: THREE.Texture
}) {
  const [time, setTime] = useState(0)

  useFrame((_, delta) => {
    setTime((t) => t + delta)
  })

  return (
    <>
      {streams.map((stream, i) => (
        <group key={i}>
          <StreamTrail stream={stream} time={time} />
          <StreamHead stream={stream} glowTexture={glowTexture} time={time} />
        </group>
      ))}
    </>
  )
}

export function FlowingStreams({ streamCount }: FlowingStreamsProps) {
  const glowTexture = useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.6)')
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
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
      <StreamsRenderer streams={streams} glowTexture={glowTexture} />
    </group>
  )
}
