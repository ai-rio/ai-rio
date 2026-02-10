'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { AlertTriangle, Info } from 'lucide-react';
import * as React from 'react';

export interface DisclaimerTooltipProps {
  /**
   * Type of disclaimer - determines icon and styling
   */
  variant?: 'info' | 'warning';

  /**
   * Title displayed in the tooltip header
   */
  title: string;

  /**
   * Main disclaimer text content
   */
  description: string;

  /**
   * Optional links to related resources
   */
  links?: Array<{
    href: string;
    label: string;
  }>;

  /**
   * Additional CSS classes for the trigger icon
   */
  className?: string;

  /**
   * Position of the tooltip relative to the trigger
   * @default "top"
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
}

/**
 * DisclaimerTooltip - Compact tooltip for displaying disclaimer text
 *
 * A small, unobtrusive tooltip that reveals important information on hover or focus.
 * Replaces large banner components while maintaining accessibility.
 *
 * @example
 * ```tsx
 * <DisclaimerTooltip
 *   variant="warning"
 *   title="Pricing Estimate"
 *   description="These are rough estimates for planning purposes."
 *   links={[{ href: "https://example.com", label: "Learn more" }]}
 * />
 * ```
 */
export function DisclaimerTooltip({
  variant = 'info',
  title,
  description,
  links,
  className,
  side = 'top',
}: DisclaimerTooltipProps) {
  const Icon = variant === 'warning' ? AlertTriangle : Info;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={cn(
              'inline-flex items-center justify-center',
              'text-muted-foreground hover:text-foreground',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'rounded-sm',
              className
            )}
            aria-label={`Show disclaimer: ${title}`}
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
          </button>
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs sm:max-w-sm text-left">
          <div className="space-y-2">
            <p className="font-semibold text-sm">{title}</p>
            <p className="text-xs leading-relaxed whitespace-normal">{description}</p>
            {links && links.length > 0 && (
              <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 border-t border-primary/20">
                {links.map((link, index) => (
                  <React.Fragment key={link.href}>
                    {index > 0 && <span className="text-primary/40">•</span>}
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary rounded"
                    >
                      {link.label}
                    </a>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default DisclaimerTooltip;
