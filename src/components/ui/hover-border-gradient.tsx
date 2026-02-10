'use client';
import React, { useState, useEffect } from 'react';

import { type CtaSize, getCtaClassName } from '@/components/ui/cta-variants';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/**
 * Hook to detect if dark mode is active
 */
function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkDark();

    // Observe class changes on html element
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

export interface HoverBorderGradientProps extends React.PropsWithChildren {
  as?: React.ElementType;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
  href?: string;
  /**
   * CTA size variant following design system
   * - compact: 16px padding, for dense interfaces
   * - default: 24px padding, standard size
   * - large: 32px padding, hero CTAs
   * - xl: 48px padding, featured CTAs
   */
  size?: CtaSize;
  /**
   * Enable high-contrast text color for light mode
   * Uses brand-primary-dark (#1E40AF) in light mode instead of standard brand-primary
   * Recommended for CTAs on light backgrounds for better accessibility
   */
  highContrast?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  size = 'default',
  highContrast = true,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>('TOP');
  const isDarkMode = useDarkMode();

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  // Snake animation colors - white for dark mode, blue for light mode
  const snakeColorLight = '#2563EB'; // Brand primary blue
  const snakeColorDark = '#FFFFFF'; // White for dark mode
  const transparent = 'rgba(255, 255, 255, 0)';

  const movingMap: Record<Direction, { light: string; dark: string }> = {
    TOP: {
      light: `radial-gradient(20.7% 50% at 50% 0%, ${snakeColorLight} 0%, ${transparent} 100%)`,
      dark: `radial-gradient(20.7% 50% at 50% 0%, ${snakeColorDark} 0%, ${transparent} 100%)`,
    },
    LEFT: {
      light: `radial-gradient(16.6% 43.1% at 0% 50%, ${snakeColorLight} 0%, ${transparent} 100%)`,
      dark: `radial-gradient(16.6% 43.1% at 0% 50%, ${snakeColorDark} 0%, ${transparent} 100%)`,
    },
    BOTTOM: {
      light: `radial-gradient(20.7% 50% at 50% 100%, ${snakeColorLight} 0%, ${transparent} 100%)`,
      dark: `radial-gradient(20.7% 50% at 50% 100%, ${snakeColorDark} 0%, ${transparent} 100%)`,
    },
    RIGHT: {
      light: `radial-gradient(16.2% 41.2% at 100% 50%, ${snakeColorLight} 0%, ${transparent} 100%)`,
      dark: `radial-gradient(16.2% 41.2% at 100% 50%, ${snakeColorDark} 0%, ${transparent} 100%)`,
    },
  };

  // Highlight gradient - darker blue for better contrast
  const highlight = {
    light: 'radial-gradient(75% 181% at 50% 50%, #1E40AF 0%, rgba(30, 64, 175, 0) 100%)',
    dark: 'radial-gradient(75% 181% at 50% 50%, #3275F8 0%, rgba(50, 117, 248, 0) 100%)',
  };

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return React.createElement(
    Tag,
    {
      onMouseEnter: () => {
        setHovered(true);
      },
      onMouseLeave: () => setHovered(false),
      className: cn(
        'relative flex rounded-full border border-brand-primary/30 dark:border-brand-primary/40 content-center bg-muted/20 hover:bg-muted/30 transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit',
        containerClassName
      ),
      ...props,
    },
    React.createElement(
      'div',
      {
        className: cn(
          'w-full text-foreground z-10 bg-background rounded-[inherit]',
          highContrast && 'dark:text-brand-primary text-brand-primary-dark',
          getCtaClassName('default', size),
          className
        ),
      },
      children
    ),
    React.createElement(motion.div, {
      className: cn('flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]'),
      style: {
        filter: 'blur(2px)',
        position: 'absolute',
        width: '100%',
        height: '100%',
      },
      initial: { background: isDarkMode ? movingMap[direction].dark : movingMap[direction].light },
      animate: {
        background: hovered
          ? [
              isDarkMode ? movingMap[direction].dark : movingMap[direction].light,
              isDarkMode ? highlight.dark : highlight.light,
            ]
          : isDarkMode
            ? movingMap[direction].dark
            : movingMap[direction].light,
      },
      transition: { ease: 'linear', duration: duration ?? 1 },
    }),
    React.createElement('div', {
      className: 'bg-background absolute z-1 flex-none inset-[2px] rounded-[100px]',
    })
  );
}
