'use client';

import * as React from 'react';
import { AlertCircle, TrendingDown, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface ProblemPoint {
  id: string;
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  icon?: React.ReactNode;
  metric?: string;
}

export interface ProblemSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  problems: ProblemPoint[];
  alertMessage?: {
    title: string;
    description: string;
  };
  variant?: 'default' | 'compact';
}

const severityConfig = {
  low: { variant: 'secondary' as const, icon: TrendingDown },
  medium: { variant: 'default' as const, icon: AlertCircle },
  high: { variant: 'destructive' as const, icon: AlertTriangle },
  critical: { variant: 'destructive' as const, icon: AlertTriangle },
};

/**
 * ProblemSection - Display pain points using Card, Alert, and Badge
 *
 * Addresses the "Margin Panic" persona's pain points around AI cost visibility.
 * Uses semantic section element with proper ARIA labels for accessibility.
 *
 * @example
 * ```tsx
 * <ProblemSection
 *   title="Why Your AI Costs Are Spiraling"
 *   problems={[
 *     { id: '1', title: 'No Visibility', description: 'AI costs scattered across teams', severity: 'critical' },
 *     { id: '2', title: 'Usage Spikes', description: 'Unexplained cost increases', severity: 'high' }
 *   ]}
 *   alertMessage={{ title: 'The Black Box Problem', description: 'You can\'t optimize what you can\'t see' }}
 * />
 * ```
 */
export function ProblemSection({
  className,
  title = 'The Problem',
  subtitle,
  problems,
  alertMessage,
  variant = 'default',
}: ProblemSectionProps) {
  return (
    <section
      className={cn('space-y-6', className)}
      aria-labelledby="problem-section-title"
    >
      {/* Header */}
      <div className="space-y-2">
        <h2 id="problem-section-title" className="text-3xl font-bold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg">
            {subtitle}
          </p>
        )}
      </div>

      {/* Alert Message */}
      {alertMessage && variant === 'default' && (
        <Alert variant="destructive" className="border-destructive/50 bg-destructive/5">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <AlertTitle>{alertMessage.title}</AlertTitle>
          <AlertDescription>{alertMessage.description}</AlertDescription>
        </Alert>
      )}

      {/* Problems Grid */}
      <div
        className={cn(
          'grid gap-4',
          variant === 'compact' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'
        )}
        role="list"
        aria-label="List of problems"
      >
        {problems.map((problem) => {
          const config = severityConfig[problem.severity || 'medium'];
          const SeverityIcon = config.icon;

          return (
            <Card
              key={problem.id}
              className="group relative overflow-hidden transition-all hover:shadow-lg hover:border-border/80"
              role="listitem"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {problem.icon ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        {problem.icon}
                      </div>
                    ) : (
                      <div className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg',
                        problem.severity === 'critical' || problem.severity === 'high'
                          ? 'bg-destructive/10'
                          : 'bg-muted'
                      )}>
                        <SeverityIcon className={cn(
                          'h-5 w-5',
                          problem.severity === 'critical' || problem.severity === 'high'
                            ? 'text-destructive'
                            : 'text-muted-foreground'
                        )} aria-hidden="true" />
                      </div>
                    )}
                    <CardTitle className="text-xl">{problem.title}</CardTitle>
                  </div>
                  {problem.severity && (
                    <Badge
                      variant={config.variant}
                      className="shrink-0"
                      aria-label={`Severity: ${problem.severity}`}
                    >
                      {problem.severity}
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {problem.description}
                </CardDescription>
              </CardHeader>

              {problem.metric && (
                <CardContent>
                  <div className="rounded-lg bg-muted/50 px-3 py-2">
                    <span className="text-sm font-medium">{problem.metric}</span>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
