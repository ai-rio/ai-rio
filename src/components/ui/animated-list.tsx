import { motion, useInView } from 'framer-motion';
import React, { type ReactNode, forwardRef, type HTMLAttributes } from 'react';

interface AnimatedListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'as'> {
  children: ReactNode;
  staggerDelay?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  as?: React.ElementType;
  once?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(({
  children,
  staggerDelay = 0.05,
  duration = 0.2,
  delay = 0,
  threshold = 0.1,
  as: Component = 'div',
  once = true,
  direction = 'up',
  distance = 20,
  className = '',
  ...props
}, externalRef) => {
  const internalRef = React.useRef<HTMLDivElement>(null);
  // Use either external ref or internal ref
  const ref = (externalRef as React.RefObject<HTMLDivElement>) || internalRef;

  const isInView = useInView(ref, {
    amount: threshold,
    once,
  });

  // Check for reduced motion preference
  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Disable animation if user prefers reduced motion
  const effectiveDuration = prefersReducedMotion ? 0 : duration;
  const effectiveStaggerDelay = prefersReducedMotion ? 0 : staggerDelay;
  const effectiveDistance = prefersReducedMotion ? 0 : distance;

  // Convert children to array and filter out falsy values
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  // Map direction to motion values
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: effectiveDistance, opacity: 0 };
      case 'down':
        return { y: -effectiveDistance, opacity: 0 };
      case 'left':
        return { x: effectiveDistance, opacity: 0 };
      case 'right':
        return { x: -effectiveDistance, opacity: 0 };
      default:
        return { y: effectiveDistance, opacity: 0 };
    }
  };

  const initial = getInitialPosition();

  // Create props object for the dynamic component
  const componentProps: HTMLAttributes<HTMLDivElement> = {
    className,
    ...props,
  };

  // Add ref only for intrinsic elements (div, span, etc.)
  if (typeof Component === 'string') {
    (componentProps as HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }).ref = ref;
  }

  return React.createElement(
    Component,
    componentProps,
    childrenArray.map((child, index) =>
      React.createElement(
        motion.div,
        {
          key: index,
          initial,
          animate: isInView ? { x: 0, y: 0, opacity: 1 } : initial,
          transition: {
            duration: effectiveDuration,
            delay: delay + index * effectiveStaggerDelay,
            ease: 'easeOut',
          },
        },
        child
      )
    )
  );
});

AnimatedList.displayName = 'AnimatedList';

export default AnimatedList;
