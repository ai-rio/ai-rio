'use client';

/**
 * Animated Counter Component
 * ==========================
 *
 * Smooth animated number counter triggered on scroll.
 * Animates from start value to end value when scrolled into view.
 */

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  /** Starting value */
  from?: number;
  /** Ending value to count to */
  to: number;
  /** Duration in seconds */
  duration?: number;
  /** Custom formatter function */
  format?: (value: number) => string;
  /** CSS class name */
  className?: string;
}

/**
 * Animated Counter with Scroll Trigger
 *
 * Smoothly animates a number from start to end value when scrolled into view.
 * Supports custom formatting for currency, percentages, etc.
 * Animation triggers once when element enters viewport.
 *
 * @example
 * <AnimatedCounter to={66} format={(n) => `${n}%`} />
 * <AnimatedCounter from={0} to={15} format={(n) => `${n}K`} />
 */
export function AnimatedCounter({
  from = 0,
  to,
  duration = 1.5,
  format,
  className = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(from);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const effectiveDuration = prefersReducedMotion ? 0 : duration;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    // If reduced motion is preferred, just set the final value
    if (prefersReducedMotion) {
      setDisplayValue(to);
      return;
    }

    const startTime = performance.now();
    const difference = to - from;

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / effectiveDuration, 1);

      const newValue = from + difference * progress;
      setDisplayValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [from, to, effectiveDuration, hasStarted, prefersReducedMotion]);

  const formattedValue = format ? format(Math.round(displayValue)) : Math.round(displayValue);

  return (
    <span ref={elementRef} className={className}>
      {formattedValue}
    </span>
  );
}

export default AnimatedCounter;
