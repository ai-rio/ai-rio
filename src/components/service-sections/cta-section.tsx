'use client';

import * as React from 'react';
import { ArrowRight, Check, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface CTAAction {
  label: string;
  href: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link';
  icon?: 'arrow' | 'check' | 'mail' | 'calendar' | React.ReactNode;
}

export interface CTASectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
  badge?: string;
  alignment?: 'left' | 'center' | 'right';
  variant?: 'default' | 'outlined' | 'filled';
  trustSignals?: string[];
}

const iconMap = {
  arrow: ArrowRight,
  check: Check,
  mail: Mail,
  calendar: Calendar,
};

/**
 * CTASection - Call-to-action using Button
 *
 * Bold, confident CTAs that drive action.
 * Uses trust signals to reduce friction.
 *
 * @example
 * ```tsx
 * <CTASection
 *   title="Ready to Shine a Light on Your AI Costs?"
 *   subtitle="Your margins are a black box. I built a flashlight."
 *   primaryAction={{ label: 'Book a Discovery Call', href: '/contact', icon: 'calendar' }}
 *   secondaryAction={{ label: 'See How It Works', href: '/demo', variant: 'outline' }}
 *   trustSignals={['No commitment required', 'Response within 24 hours']}
 * />
 * ```
 */
export function CTASection({
  className,
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  badge,
  alignment = 'center',
  variant = 'default',
  trustSignals,
}: CTASectionProps) {
  const PrimaryIcon = typeof primaryAction.icon === 'string' ? iconMap[primaryAction.icon as keyof typeof iconMap] : null;

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const flexAlignment = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <section
      className={cn('space-y-6', className)}
      aria-labelledby="cta-section-title"
    >
      <Card
        className={cn(
          'relative overflow-hidden',
          variant === 'outlined' && 'border-2 border-primary/20',
          variant === 'filled' && 'bg-primary text-primary-foreground'
        )}
      >
        {variant === 'filled' && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
        )}

        <CardContent className={cn('p-8 md:p-12', variant === 'filled' && 'relative z-10')}>
          <div className={cn('space-y-6', alignmentClasses[alignment])}>
            {/* Badge */}
            {badge && (
              <Badge
                variant={variant === 'filled' ? 'secondary' : 'default'}
                className="mb-2"
              >
                {badge}
              </Badge>
            )}

            {/* Title */}
            {title && (
              <h2
                id="cta-section-title"
                className={cn(
                  'text-3xl md:text-4xl font-bold tracking-tight',
                  variant === 'filled' && 'text-primary-foreground'
                )}
              >
                {title}
              </h2>
            )}

            {/* Subtitle - Brand Voice */}
            {subtitle && (
              <p
                className={cn(
                  'text-xl md:text-2xl font-medium',
                  variant === 'filled' ? 'text-primary-foreground/90' : 'text-muted-foreground'
                )}
              >
                {subtitle}
              </p>
            )}

            {/* Description */}
            {description && (
              <p
                className={cn(
                  'text-base max-w-2xl mx-auto',
                  variant === 'filled' ? 'text-primary-foreground/80' : 'text-muted-foreground',
                  alignment === 'left' && '!mx-0',
                  alignment === 'right' && '!mx-0 ml-auto'
                )}
              >
                {description}
              </p>
            )}

            {/* Actions */}
            <div
              className={cn(
                'flex flex-col sm:flex-row gap-3',
                flexAlignment[alignment]
              )}
            >
              <Button
                asChild
                size="lg"
                variant={variant === 'filled' ? 'secondary' : primaryAction.variant || 'default'}
                className="gap-2 text-base h-12 px-8"
              >
                <a href={primaryAction.href}>
                  {primaryAction.label}
                  {PrimaryIcon && <PrimaryIcon className="h-5 w-5" aria-hidden="true" />}
                  {typeof primaryAction.icon === 'object' && primaryAction.icon}
                </a>
              </Button>

              {secondaryAction && (
                <Button
                  asChild
                  size="lg"
                  variant={variant === 'filled' ? 'outline' : secondaryAction.variant || 'outline'}
                  className="gap-2 text-base h-12 px-8"
                >
                  <a href={secondaryAction.href}>
                    {secondaryAction.label}
                    {typeof secondaryAction.icon === 'string' && iconMap[secondaryAction.icon as keyof typeof iconMap] && (
                      React.createElement(iconMap[secondaryAction.icon as keyof typeof iconMap], {
                        className: 'h-5 w-5',
                        'aria-hidden': true,
                      })
                    )}
                    {typeof secondaryAction.icon === 'object' && secondaryAction.icon}
                  </a>
                </Button>
              )}
            </div>

            {/* Trust Signals */}
            {trustSignals && trustSignals.length > 0 && (
              <div className="pt-4">
                <ul
                  className={cn(
                    'flex flex-wrap gap-x-6 gap-y-2 text-sm',
                    variant === 'filled' ? 'text-primary-foreground/70' : 'text-muted-foreground',
                    alignment === 'center' && 'justify-center',
                    alignment === 'left' && 'justify-start',
                    alignment === 'right' && 'justify-end'
                  )}
                  role="list"
                  aria-label="Trust signals"
                >
                  {trustSignals.map((signal, index) => (
                    <li key={index} className="flex items-center gap-2" role="listitem">
                      <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
