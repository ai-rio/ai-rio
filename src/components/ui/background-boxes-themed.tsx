/**
 * Background Boxes - Themed for Margin
 * ====================================
 *
 * Sophisticated, professional background following design principles:
 * - Cool, professional color palette (blues, subtle gradients)
 * - Lower opacity for subtle depth without distraction
 * - Theme-aware (light/dark mode)
 * - Refined to match financial SaaS aesthetic
 *
 * Design Direction: Sophistication & Trust
 * - Cool tones for professionalism
 * - Subtle presence, doesn't compete with content
 * - Technical but approachable
 */

'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

interface BackgroundBoxesProps {
  className?: string;
  /**
   * Color theme variant
   * - blue: Cool blue tones (default, professional)
   * - monochrome: Gray tones (minimal, technical)
   */
  variant?: 'blue' | 'monochrome';
}

export const BackgroundBoxesCore = ({ className, variant = 'blue' }: BackgroundBoxesProps) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);

  // Professional color palettes following design principles
  const blueColors = [
    'rgba(59, 130, 246, 0.15)', // blue-500, very subtle
    'rgba(37, 99, 235, 0.12)', // blue-600, subtle
    'rgba(29, 78, 216, 0.10)', // blue-700, very subtle
    'rgba(96, 165, 250, 0.08)', // blue-400, faint
    'rgba(147, 197, 253, 0.06)', // blue-300, very faint
  ];

  const monochromeColors = [
    'rgba(100, 116, 139, 0.12)', // slate-500, subtle
    'rgba(71, 85, 105, 0.10)', // slate-600, very subtle
    'rgba(51, 65, 85, 0.08)', // slate-700, faint
    'rgba(148, 163, 184, 0.06)', // slate-400, very faint
    'rgba(203, 213, 225, 0.04)', // slate-300, barely visible
  ];

  const colors = variant === 'blue' ? blueColors : monochromeColors;

  // Use useCallback to avoid calling Math.random during render
  const getRandomColor = React.useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [colors]); // Re-create when colors change

  return (
    <div
      style={{
        transform:
          'translate(-30%,-40%) skewX(-48deg) skewY(14deg) scale(0.8) rotate(0deg) translateZ(0)',
      }}
      className={cn(
        'absolute top-0 left-0 z-0 flex h-full w-full p-4 pointer-events-none',
        'opacity-60 opacity-50',
        className
      )}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row${i}`}
          className="relative h-8 w-16 border-l border-slate-700/20 border-slate-300/10"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col${j}`}
              className="relative h-8 w-16 border-t border-r border-slate-700/20 border-slate-300/10"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700/10 text-slate-300/5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const BackgroundBoxes = React.memo(BackgroundBoxesCore);
