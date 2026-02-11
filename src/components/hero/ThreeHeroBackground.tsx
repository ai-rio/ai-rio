'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { ParticleField } from './scenes/ParticleField'
import { WarpedGrid } from './scenes/WarpedGrid'
import { FlowingStreams } from './scenes/FlowingStreams'

interface ThreeHeroBackgroundProps {
  scene?: 'particles' | 'geometric' | 'dataflow'
  className?: string
}

type DeviceTier = 'desktop' | 'tablet' | 'mobile'

function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('desktop')

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setTier(w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop')
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return tier
}

function getParticleCount(tier: DeviceTier): number {
  return tier === 'mobile' ? 300 : tier === 'tablet' ? 600 : 1000
}

function getStreamCount(tier: DeviceTier): number {
  return tier === 'mobile' ? 6 : tier === 'tablet' ? 10 : 15
}

function getGridSegments(tier: DeviceTier): number {
  return tier === 'mobile' ? 12 : tier === 'tablet' ? 18 : 24
}

export function ThreeHeroBackground({
  scene = 'particles',
  className = '',
}: ThreeHeroBackgroundProps) {
  const deviceTier = useDeviceTier()

  return (
    <div
      className={`absolute inset-0 z-0 ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        style={{ background: '#050510' }}
      >
        <Suspense fallback={null}>
          <WarpedGrid gridSegments={getGridSegments(deviceTier)} />
          <ParticleField particleCount={getParticleCount(deviceTier)} />
          <FlowingStreams streamCount={getStreamCount(deviceTier)} />
        </Suspense>
      </Canvas>
    </div>
  )
}
