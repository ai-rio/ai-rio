import { cn } from '@/lib/utils';
import { Info as InfoIcon } from 'lucide-react';
import * as React from 'react';

export interface CalculatorTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
}

/**
 * CalculatorTooltip - Reusable info tooltip for calculator forms
 *
 * @example
 * <CalculatorTooltip title="Cost Estimate" description="Based on current rates." />
 */
const CalculatorTooltip = React.forwardRef<HTMLDivElement, CalculatorTooltipProps>(
  ({ title, description, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-4 bg-muted/50 rounded-lg border border-muted', className)}
      {...props}
    >
      <div className="flex gap-3">
        <InfoIcon className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-medium text-foreground text-sm mb-1">{title}</p>
          <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
);

CalculatorTooltip.displayName = 'CalculatorTooltip';
export { CalculatorTooltip };
