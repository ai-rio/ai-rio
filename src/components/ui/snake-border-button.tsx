/**
 * Snake Border Button Component
 * ==============================
 *
 * A button with an animated border that appears as if a snake is slithering around the edges.
 *
 * Effect: A gradient segment moves continuously along the button's perimeter,
 * creating the illusion of motion like a glowing trail circling the button.
 *
 * Features:
 * - SVG-based snake animation using stroke-dasharray and stroke-dashoffset
 * - Smooth continuous border motion
 * - Hover scale effects
 * - Accessible with aria-label support
 * - Works with Motion library for smooth animation
 * - SSR-safe with stable gradient IDs using React's useId hook
 *
 * @updated 2025-01-12: Fixed hydration issue by using useId() instead of global counter
 */

'use client';

import { motion } from 'framer-motion';
import type React from 'react';
import { useId } from 'react';

interface SnakeBorderButtonProps {
  children: React.ReactNode;
  href?: string;
  ariaLabel?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  snakeSpeed?: number; // Duration of one full rotation in seconds
  snakeColors?: readonly string[]; // Gradient colors for the snake
}

/**
 * Snake Border Button with animated border effect
 *
 * @example
 * ```tsx
 * <SnakeBorderButton href="#cta" snakeSpeed={3}>
 *   See Which Customers Are Profitable →
 * </SnakeBorderButton>
 * ```
 */
export function SnakeBorderButton({
  children,
  href,
  ariaLabel,
  className = '',
  onClick,
  snakeSpeed = 3,
  snakeColors = ['#2563EB', '#3B82F6', '#60A5FA', '#2563EB'],
}: SnakeBorderButtonProps) {
  // Use useId for stable, unique IDs across server and client (hydration-safe)
  const gradientId = useId();

  const buttonContent = (
    <>
      {/* Animated snake border */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 60"
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          <defs>
            {/* Gradient for the snake trail */}
            <linearGradient id={`snake-gradient-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              {snakeColors.map((color, index) => (
                <stop
                  key={index}
                  offset={`${(index / (snakeColors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          </defs>

          {/* Animated snake border using rect */}
          <rect
            x="2"
            y="2"
            width="296"
            height="56"
            rx="9999"
            fill="none"
            stroke={`url(#snake-gradient-${gradientId})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            style={{
              strokeDasharray: '30 15',
            }}
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-45"
              dur={`${snakeSpeed}s`}
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>

      <span className="relative z-10 text-brand-primary">{children}</span>
    </>
  );

  const baseClassName =
    'relative px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] text-base sm:text-lg font-medium rounded-full cursor-pointer overflow-hidden inline-flex items-center justify-center';

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseClassName} ${className}`}
        aria-label={ariaLabel}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={`${baseClassName} ${className}`}
      aria-label={ariaLabel}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {buttonContent}
    </motion.button>
  );
}

export default SnakeBorderButton;
