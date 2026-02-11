'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/**
 * BentoGrid Container
 * ===================
 *
 * A responsive grid layout component inspired by Aceternity UI.
 * Displays items in a bento-box style with variable cell sizes.
 *
 * Features:
 * - 1 column on mobile, 3 columns on md+
 * - Consistent row heights with auto-rows
 * - Gap spacing following 4px grid (16px = gap-4)
 *
 * @example
 * ```tsx
 * <BentoGrid>
 *   <BentoGridItem title="Feature" description="..." />
 *   <BentoGridItem title="Featured" className="md:col-span-2" />
 * </BentoGrid>
 * ```
 */
export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * BentoGridItem
 * =============
 *
 * Individual grid cell component with title, description, header, and icon.
 *
 * Design tokens:
 * - Border: transparent in light → visible in dark (white/[0.2])
 * - Shadow: subtle base → elevated on hover
 * - Micro-interaction: content translates on hover
 *
 * Spans:
 * - Default: 1 column
 * - Featured: md:col-span-2 for emphasis
 * - Tall: row-span-2 for vertical emphasis
 *
 * @example
 * ```tsx
 * <BentoGridItem
 *   title="Profitability Score"
 *   description="See which customers are profitable"
 *   header={<MetricChart />}
 *   icon={<DollarSign />}
 *   className="md:col-span-2"
 * />
 * ```
 */
export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div
      className={cn(
        // Base layout
        'group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl p-4',
        // Border - stronger definition for visual clarity
        'border-2 border-stone-200 border-stone-700',
        // Background
        'bg-white bg-stone-900',
        // Shadow hierarchy
        'shadow-sm hover:shadow-xl',
        // Transitions
        'transition-all duration-200 ease-out',
        // Cursor
        'cursor-pointer',
        className
      )}
    >
      {/* Header slot - for charts, images, or custom content */}
      {header}

      {/* Content area with hover micro-interaction */}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {/* Icon */}
        {icon && <div className="mb-2 text-brand-primary text-brand-primary">{icon}</div>}

        {/* Title */}
        {title && (
          <div className="mb-2 font-h4 font-semibold text-foreground text-white">{title}</div>
        )}

        {/* Description */}
        {description && (
          <div className="font-small text-muted-foreground text-stone-400">{description}</div>
        )}
      </div>
    </div>
  );
}

/**
 * BentoGridItemFeatured
 * =====================
 *
 * A featured variant with brand accent border and larger visual presence.
 * Use for highlighting key metrics or primary CTAs.
 */
export function BentoGridItemFeatured({
  className,
  title,
  description,
  header,
  icon,
  accentColor = 'primary',
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  accentColor?: 'primary' | 'profit' | 'warning' | 'danger';
}) {
  const accentStyles = {
    primary:
      'border-brand-primary/50 border-brand-primary/40 bg-brand-primary/5 bg-brand-primary/10',
    profit: 'border-profit/50 border-profit/40 bg-profit/5 bg-profit/10',
    warning: 'border-warning/50 border-warning/40 bg-warning/5 bg-warning/10',
    danger: 'border-danger/50 border-danger/40 bg-danger/5 bg-danger/10',
  };

  return (
    <div
      className={cn(
        // Base layout - spans 2 columns by default
        'group/bento row-span-1 md:col-span-2 flex flex-col justify-between space-y-4 rounded-xl p-6',
        // Border - accent color with stronger presence
        'border-2',
        accentStyles[accentColor],
        // Shadow hierarchy
        'shadow-md hover:shadow-2xl',
        // Transitions
        'transition-all duration-200 ease-out',
        // Cursor
        'cursor-pointer',
        className
      )}
    >
      {/* Header slot */}
      {header}

      {/* Content area with hover micro-interaction */}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {/* Icon */}
        {icon && <div className="mb-2 text-brand-primary text-brand-primary">{icon}</div>}

        {/* Title - larger for featured items */}
        {title && (
          <div className="mb-2 font-h3 font-semibold text-foreground text-white">{title}</div>
        )}

        {/* Description */}
        {description && (
          <div className="font-body text-muted-foreground text-stone-300">{description}</div>
        )}
      </div>
    </div>
  );
}
