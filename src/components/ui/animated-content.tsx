import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type React from 'react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  trigger?: 'mount' | 'scroll';
  once?: boolean;
  onComplete?: () => void;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  container,
  distance = 30,
  direction = 'up',
  reverse = false,
  duration = 0.2,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  trigger = 'scroll',
  once = true,
  onComplete,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Map direction to GSAP axis and offset
    const directionMap: Record<string, { axis: 'x' | 'y'; reverseMultiplier: number }> = {
      up: { axis: 'y', reverseMultiplier: 1 },
      down: { axis: 'y', reverseMultiplier: -1 },
      left: { axis: 'x', reverseMultiplier: 1 },
      right: { axis: 'x', reverseMultiplier: -1 },
    };

    const { axis, reverseMultiplier } = directionMap[direction];
    const offset = reverse ? -distance * reverseMultiplier : distance * reverseMultiplier;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible',
    });

    const tl = gsap.timeline({
      paused: trigger === 'scroll',
      delay,
      onComplete,
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
    });

    if (trigger === 'scroll') {
      let scrollerTarget: Element | string | null =
        container || document.getElementById('snap-main-container') || null;

      if (typeof scrollerTarget === 'string') {
        scrollerTarget = document.querySelector(scrollerTarget);
      }

      const st = ScrollTrigger.create({
        trigger: el,
        scroller: scrollerTarget || window,
        start: `top ${startPct}%`,
        once,
        onEnter: () => tl.play(),
      });

      return () => {
        st.kill();
        tl.kill();
      };
    }
    tl.play();
    return () => tl.kill();
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    trigger,
    once,
    onComplete,
  ]);

  return (
    <div ref={ref} className={`invisible ${className}`} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;
