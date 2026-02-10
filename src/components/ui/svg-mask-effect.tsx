'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const containerRef = useRef<HTMLDivElement>(null);
  const updateMousePosition = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    const currentRef = containerRef.current;
    currentRef?.addEventListener('mousemove', updateMousePosition);
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', updateMousePosition);
      }
    };
  }, []);
  const maskSize = isHovered ? revealSize : size;

  return (
    <motion.div
      ref={containerRef}
      className={cn('relative h-screen w-full', className)}
      animate={{
        backgroundColor: isHovered ? 'hsl(var(--background))' : 'hsl(var(--background))',
      }}
      transition={{
        backgroundColor: { duration: 0.3 },
      }}
    >
      <motion.div
        className="absolute flex h-full w-full items-center justify-center bg-foreground text-6xl [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px]"
        animate={{
          maskPosition: `${mousePosition.x ?? 0 - maskSize / 2}px ${
            (mousePosition.y ?? 0) - maskSize / 2
          }px`,
          maskSize: `${maskSize}px`,
        }}
        transition={{
          maskSize: { duration: 0.3, ease: 'easeInOut' },
          maskPosition: { duration: 0.15, ease: 'linear' },
        }}
      >
        <div className="absolute inset-0 z-0 h-full w-full bg-foreground opacity-10" />
        <div
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className="relative z-20 mx-auto text-center text-4xl sm:text-5xl md:text-6xl font-bold"
        >
          {children}
        </div>
      </motion.div>

      <div className="flex h-full w-full items-center justify-center">{revealText}</div>
    </motion.div>
  );
};
