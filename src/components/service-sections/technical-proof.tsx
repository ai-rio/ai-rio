'use client';

import * as React from 'react';
import { TrendingUp, CheckCircle2, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export interface Metric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description?: string;
  progress?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export interface TechnicalProofProps {
  locale?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  metrics: Metric[];
  highlightedMetric?: string;
  layout?: 'grid' | 'list';
}

const iconMap = {
  up: TrendingUp,
  down: TrendingUp,
  neutral: BarChart3,
};

/**
 * TechnicalProof - Stats/metrics using Card, Progress, Badge
 *
 * Demonstrates credibility with concrete numbers.
 * Visual progress bars for immediate impact.
 *
 * @example
 * ```tsx
 * <TechnicalProof
 *   title="Proven Results"
 *   metrics={[
 *     { id: '1', label: 'Average Cost Savings', value: 37, suffix: '%', description: 'First 3 months', progress: 37, trend: 'up' },
 *     { id: '2', label: 'Implementation Time', value: 2, suffix: ' weeks', progress: 90, trend: 'up' },
 *     { id: '3', label: 'Cost Visibility', value: 100, suffix: '%', progress: 100, trend: 'up' }
 *   ]}
 *   highlightedMetric="1"
 * />
 * ```
 */
export function TechnicalProof({
  locale = 'en',
  className,
  title = 'Technical Proof',
  subtitle,
  metrics,
  highlightedMetric,
  layout = 'grid',
}: TechnicalProofProps) {
  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'pt-BR').format(value);
  };

  const isGrid = layout === 'grid';

  return (
    <section
      className={cn('space-y-6', className)}
      aria-labelledby="technical-proof-title"
    >
      {/* Header */}
      <div className="space-y-2">
        <h2 id="technical-proof-title" className="text-3xl font-bold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg">
            {subtitle}
          </p>
        )}
      </div>

      {/* Metrics */}
      <div
        className={cn(
          isGrid
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        )}
        role="list"
        aria-label="Technical metrics"
      >
        {metrics.map((metric) => {
          const TrendIcon = metric.trend ? iconMap[metric.trend] : null;
          const isHighlighted = metric.id === highlightedMetric;

          return (
            <Card
              key={metric.id}
              className={cn(
                'group relative overflow-hidden transition-all',
                isHighlighted && 'border-primary/50 ring-2 ring-primary/20',
                !isHighlighted && 'hover:shadow-md'
              )}
              role="listitem"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <CardTitle className={cn(
                      'text-base font-medium text-muted-foreground',
                      isHighlighted && 'text-primary'
                    )}>
                      {metric.label}
                    </CardTitle>
                    <div className="flex items-baseline gap-2">
                      {metric.prefix && (
                        <span className="text-2xl text-muted-foreground">
                          {metric.prefix}
                        </span>
                      )}
                      <span className={cn(
                        'text-4xl md:text-5xl font-bold tracking-tight',
                        isHighlighted && 'text-primary'
                      )}>
                        {formatNumber(metric.value)}
                      </span>
                      {metric.suffix && (
                        <span className="text-xl text-muted-foreground">
                          {metric.suffix}
                        </span>
                      )}
                    </div>
                  </div>

                  {metric.trend && TrendIcon && (
                    <Badge
                      variant={metric.trend === 'up' ? 'default' : 'secondary'}
                      className="shrink-0 gap-1.5"
                    >
                      <TrendIcon className="h-3 w-3" aria-hidden="true" />
                      {metric.trend === 'up' ? (locale === 'en' ? 'Improved' : 'Melhorado') : ''}
                    </Badge>
                  )}
                </div>

                {metric.description && (
                  <p className="text-sm text-muted-foreground">
                    {metric.description}
                  </p>
                )}
              </CardHeader>

              {metric.progress !== undefined && (
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{locale === 'en' ? 'Progress' : 'Progresso'}</span>
                    <span className="font-medium">{metric.progress}%</span>
                  </div>
                  <Progress
                    value={metric.progress}
                    className={cn(
                      'h-2',
                      isHighlighted && '[&>div]:bg-primary'
                    )}
                    aria-label={`${metric.label}: ${metric.progress}% complete`}
                  />
                </CardContent>
              )}

              {isHighlighted && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              )}
            </Card>
          );
        })}
      </div>

      {/* Trust Badge */}
      <div className="flex justify-center pt-4">
        <Badge variant="outline" className="gap-2 text-sm py-1.5 px-4">
          <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>
            {locale === 'en'
              ? 'Based on actual client results'
              : 'Baseado em resultados reais de clientes'}
          </span>
        </Badge>
      </div>
    </section>
  );
}
