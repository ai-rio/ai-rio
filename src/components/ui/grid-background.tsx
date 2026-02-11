/**
 * Grid Background - Sophisticated Technical Pattern
 * ===============================================
 *
 * Professional grid background following design principles:
 * - Subtle, non-distracting
 * - Theme-aware (light/dark)
 * - Cool blue tones for professionalism
 * - Proper depth without overwhelming content
 */

'use client';
import { cn } from '@/lib/utils';
import React from 'react';

interface GridBackgroundProps {
  className?: string;
  /**
   * Grid size in pixels
   * @default 32
   */
  gridSize?: number;
  /**
   * Opacity of the grid lines
   * @default 0.5
   */
  opacity?: number;
  /**
   * Color variant
   * - blue: Cool blue tones (default)
   * - monochrome: Gray tones
   */
  variant?: 'blue' | 'monochrome';
}

export function GridBackground({
  className,
  gridSize = 32,
  opacity = 0.5,
  variant = 'blue',
}: GridBackgroundProps) {
  // Color following design principles - sophisticated, subtle
  const gridColor =
    variant === 'blue'
      ? 'rgba(59, 130, 246, 0.08)' // blue-500, very subtle
      : 'rgba(100, 116, 139, 0.06)'; // slate-500, very subtle

  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        'opacity-100 opacity-100',
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, ${gridColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
    />
  );
}

/**
 * Dot Grid Background - Alternative subtle pattern
 */
export function DotGridBackground({
  className,
  dotSize = 2,
  spacing = 24,
  opacity = 0.3,
  variant = 'blue',
}: GridBackgroundProps & { dotSize?: number; spacing?: number }) {
  const dotColor = variant === 'blue' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(100, 116, 139, 0.12)';

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        opacity,
      }}
    />
  );
}
