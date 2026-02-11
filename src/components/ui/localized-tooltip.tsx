/**
 * Localized Tooltip Component
 * ============================
 *
 * An i18n-friendly tooltip wrapper that accepts translation keys
 * instead of hardcoded strings. Uses next-intl for translations.
 *
 * Features:
 * - Accepts translation key or direct content
 * - Supports dynamic values in translations
 * - Delays to prevent accidental triggers
 * - Accessible with proper ARIA attributes
 * - Supports all Radix tooltip options
 *
 * @module components/ui/localized-tooltip
 */

'use client';

import {
  Tooltip as BaseTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import * as React from 'react';

/**
 * Props for the LocalizedTooltip component
 */
export interface LocalizedTooltipProps {
  /** Translation key (e.g., 'dashboard.common.aria_labels.kpi_section') */
  contentKey?: string;
  /** Direct content (overrides contentKey if provided) */
  content?: React.ReactNode;
  /** Namespace for translation (optional, defaults to 'dashboard.common.tooltips') */
  namespace?: string;
  /** Dynamic values for translation interpolation */
  values?: Record<string, string | number>;
  /** Element that triggers the tooltip */
  children: React.ReactElement;
  /** Side where tooltip appears */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Delay before showing tooltip (ms) */
  delayDuration?: number;
  /** Skip delay when hiding tooltip (ms) */
  skipDelayDuration?: number;
  /** Additional CSS classes for tooltip content */
  className?: string;
}

/**
 * Localized Tooltip Component
 *
 * Provides i18n-compatible tooltips using translation keys.
 *
 * @example
 * ```tsx
 * // Using translation key
 * <LocalizedTooltip contentKey="aria_labels.kpi_section">
 *   <button>Help</button>
 * </LocalizedTooltip>
 *
 * // Using namespace shorthand
 * <LocalizedTooltip namespace="dashboard.overview.kpi" contentKey="help">
 *   <InfoIcon />
 * </LocalizedTooltip>
 *
 * // With dynamic values
 * <LocalizedTooltip
 *   namespace="dashboard.common"
 *   contentKey="customer_count"
 *   values={{ count: 42 }}
 * >
 *   <span>42 customers</span>
 * </LocalizedTooltip>
 *
 * // Direct content (no translation)
 * <LocalizedTooltip content="This is a direct tooltip">
 *   <button>Click me</button>
 * </LocalizedTooltip>
 * ```
 */
export function LocalizedTooltip({
  contentKey,
  content,
  namespace = 'dashboard.common.tooltips',
  values,
  children,
  side = 'top',
  delayDuration = 400,
  skipDelayDuration = 300,
  className,
}: LocalizedTooltipProps) {
  const t = useTranslations(namespace);

  // Get tooltip content - direct content takes precedence
  const tooltipContent = content || (contentKey ? t(contentKey, values) : null);

  // If no content provided, just render children
  if (!tooltipContent) {
    return children;
  }

  return (
    <TooltipProvider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <BaseTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          className={cn(
            'max-w-xs text-center',
            // Better contrast and readability
            'bg-popover text-popover-foreground border border-border',
            className
          )}
        >
          {tooltipContent}
        </TooltipContent>
      </BaseTooltip>
    </TooltipProvider>
  );
}

/**
 * Info Tooltip Component
 *
 * A convenience component for adding info icons with tooltips.
 * Commonly used for providing additional context or help text.
 *
 * @example
 * ```tsx
 * <InfoTooltip
 *   namespace="dashboard.overview"
 *   contentKey="total_llm_spend.help"
 *   className="ml-2"
 * />
 * ```
 */
export interface InfoTooltipProps extends Omit<LocalizedTooltipProps, 'children'> {
  /** Icon size (default: sm) */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Additional CSS classes for the icon wrapper */
  iconClassName?: string;
}

export function InfoTooltip({
  size = 'sm',
  className,
  iconClassName,
  ...tooltipProps
}: InfoTooltipProps) {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <LocalizedTooltip {...tooltipProps}>
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-full',
          'text-muted-foreground hover:text-foreground',
          'cursor-help transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
        tabIndex={0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(sizeClasses[size], iconClassName)}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </span>
    </LocalizedTooltip>
  );
}

/**
 * Icon Tooltip Component
 *
 * A convenience component for wrapping any icon with a tooltip.
 *
 * @example
 * ```tsx
 * <IconTooltip
 *   namespace="dashboard.overview"
 *   contentKey="trend_help"
 *   icon={<TrendingUp className="h-4 w-4" />}
 * />
 * ```
 */
export interface IconTooltipProps extends Omit<LocalizedTooltipProps, 'children'> {
  /** The icon element to wrap */
  icon: React.ReactElement;
  /** Additional CSS classes for the icon wrapper */
  iconClassName?: string;
}

export function IconTooltip({ icon, className, iconClassName, ...tooltipProps }: IconTooltipProps) {
  const iconElement = React.cloneElement(icon, {
    className: cn((icon.props as React.HTMLAttributes<HTMLElement>).className, iconClassName),
    'aria-hidden': true,
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <LocalizedTooltip {...tooltipProps}>
      <span
        className={cn(
          'inline-flex items-center justify-center',
          'text-muted-foreground hover:text-foreground',
          'cursor-help transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
        tabIndex={0}
      >
        {iconElement}
      </span>
    </LocalizedTooltip>
  );
}

export default LocalizedTooltip;
