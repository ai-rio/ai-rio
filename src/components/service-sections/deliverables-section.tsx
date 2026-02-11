'use client';

import * as React from 'react';
import { Calendar, DollarSign, CheckCircle2, Clock, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  status?: 'pending' | 'in-progress' | 'completed';
  deliveryWeek?: string;
}

export interface PhaseDeliverables {
  phase: string;
  title: string;
  description?: string;
  duration: string;
  price: number;
  deliverables: Deliverable[];
}

export interface DeliverablesSectionProps {
  locale?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  phases: PhaseDeliverables[];
  totalPrice?: number;
  cta?: {
    label: string;
    href: string;
  };
}

const statusConfig = {
  pending: { label: 'Pending', variant: 'secondary' as const, icon: Clock },
  'in-progress': { label: 'In Progress', variant: 'default' as const, icon: Package },
  completed: { label: 'Completed', variant: 'outline' as const, icon: CheckCircle2 },
};

/**
 * DeliverablesSection - Timeline, pricing using Card, Badge, Separator
 *
 * Transparent breakdown of what gets delivered and when.
 * Addresses cost-conscious founder concerns with clear pricing.
 *
 * @example
 * ```tsx
 * <DeliverablesSection
 *   title="What You'll Get"
 *   phases={[
 *     {
 *       phase: '1',
 *       title: 'Discovery & Setup',
 *       duration: 'Week 1-2',
 *       price: 5000,
 *       deliverables: [
 *         { id: '1', title: 'Cost Audit', description: 'Full AI cost analysis', status: 'completed' }
 *       ]
 *     }
 *   ]}
 *   totalPrice={15000}
 *   cta={{ label: 'Get Started', href: '/contact' }}
 * />
 * ```
 */
export function DeliverablesSection({
  locale = 'en',
  className,
  title = 'Deliverables & Pricing',
  subtitle,
  phases,
  totalPrice,
  cta,
}: DeliverablesSectionProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section
      className={cn('space-y-8', className)}
      aria-labelledby="deliverables-section-title"
    >
      {/* Header */}
      <div className="space-y-3">
        <h2 id="deliverables-section-title" className="text-3xl font-bold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-surface-700 text-lg max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Phases */}
      <div className="space-y-6">
        {phases.map((phase, phaseIndex) => (
          <div key={phase.phase} className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        Phase {phase.phase}
                      </Badge>
                      <CardTitle className="text-2xl">{phase.title}</CardTitle>
                    </div>
                    {phase.description && (
                      <CardDescription className="text-base">
                        {phase.description}
                      </CardDescription>
                    )}
                    <div className="flex items-center gap-4 text-sm text-surface-700">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        {phase.duration}
                      </span>
                      <Separator orientation="vertical" className="h-4" />
                      <span className="flex items-center gap-1.5 font-semibold text-text">
                        <DollarSign className="h-4 w-4" aria-hidden="true" />
                        {formatPrice(phase.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div
                  className="space-y-3"
                  role="list"
                  aria-label={`Phase ${phase.phase} deliverables`}
                >
                  {phase.deliverables.map((deliverable) => {
                    const config = statusConfig[deliverable.status || 'pending'];
                    const StatusIcon = config.icon;

                    return (
                      <div
                        key={deliverable.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-surface-300/30 transition-colors hover:bg-surface-300/50"
                        role="listitem"
                      >
                        <StatusIcon className="h-5 w-5 mt-0.5 text-surface-700 shrink-0" aria-hidden="true" />
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-medium">{deliverable.title}</h4>
                            <Badge variant={config.variant} className="text-xs">
                              {config.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-surface-700">
                            {deliverable.description}
                          </p>
                          {deliverable.deliveryWeek && (
                            <p className="text-xs text-surface-700">
                              Delivery: {deliverable.deliveryWeek}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {phaseIndex < phases.length - 1 && (
              <Separator className="bg-border/50" />
            )}
          </div>
        ))}
      </div>

      {/* Total & CTA */}
      {(totalPrice || cta) && (
        <>
          <Separator />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl bg-surface-300/30">
            {totalPrice && (
              <div className="text-center sm:text-left">
                <p className="text-sm text-surface-700 mb-1">Total Investment</p>
                <p className="text-3xl font-bold">{formatPrice(totalPrice)}</p>
              </div>
            )}
            {cta && (
              <Button asChild size="lg" className="gap-2">
                <a href={cta.href}>
                  {cta.label}
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
