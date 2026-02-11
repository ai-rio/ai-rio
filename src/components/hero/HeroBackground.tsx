'use client'

import dynamic from 'next/dynamic'

const ThreeHeroBackground = dynamic(
  () => import('./ThreeHeroBackground').then(mod => ({ default: mod.ThreeHeroBackground })),
  { ssr: false }
)

interface HeroBackgroundProps {
  scene?: 'particles' | 'geometric' | 'dataflow'
  className?: string
}

export function HeroBackground({ scene = 'particles', className }: HeroBackgroundProps) {
  return <ThreeHeroBackground scene={scene} className={className} />
}
