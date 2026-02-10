'use client';

/**
 * Animated Metric Value Component
 * ===============================
 *
 * Displays a metric value with optional animation using the Counter component.
 * Handles parsing of formatted strings (e.g., '$15K', '66%') and animates the numeric part.
 *
 * @example
 * <AnimatedMetricValue value="66%" className="text-profit" />
 * <AnimatedMetricValue value="$15K" animate={true} />
 * <AnimatedMetricValue value="N/A" animate={false} />
 */

import Counter from '@/components/Counter';
import { canAnimate, parseCounterValue } from '@/lib/utils/counter-formatter';
import React, { useMemo } from 'react';

interface AnimatedMetricValueProps {
  /** The value to display and animate */
  value: string | number;
  /** Whether to animate this value (default: true) */
  animate?: boolean;
  /** Tailwind CSS classes to apply to the container */
  className?: string;
}

/**
 * AnimatedMetricValue Component
 *
 * Wraps the Counter component and handles value parsing/formatting.
 * If the value can't be animated (non-numeric), renders as static text.
 */
export function AnimatedMetricValue({
  value,
  animate = true,
  className = '',
}: AnimatedMetricValueProps) {
  // Parse the value into numeric and formatting components
  const parsed = useMemo(() => parseCounterValue(value), [value]);

  // Determine if we should animate this value
  const shouldAnimate = animate && parsed.numeric !== null && canAnimate(value);

  // If we shouldn't animate, render static text
  if (!shouldAnimate) {
    return <span className={className}>{value}</span>;
  }

  // Render animated counter with formatting
  return (
    <span className={className}>
      {parsed.prefix}
      <Counter value={parsed.numeric!} />
      {parsed.suffix}
    </span>
  );
}

export default AnimatedMetricValue;
