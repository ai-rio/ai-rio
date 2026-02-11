'use client';

import * as React from 'react';
import { Check, Sparkles, Zap, Shield, BarChart3, Puzzle } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: 'sparkles' | 'zap' | 'shield' | 'chart' | 'puzzle' | 'check' | React.ReactNode;
  badge?: string;
  highlighted?: boolean;
}

export interface SolutionSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  features: FeatureItem[];
  cta?: {
    label: string;
    href: string;
    variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  };
  layout?: 'grid' | 'list' | 'bento';
}

const iconMap = {
  sparkles: Sparkles,
  zap: Zap,
  shield: Shield,
  chart: BarChart3,
  puzzle: Puzzle,
  check: Check,
};

/**
 * SolutionSection - Feature highlights using Card, Badge
 *
 * Showcases the AI.RIO solution benefits with confidence and clarity.
 * Mobile-first responsive grid with proper semantic HTML.
 *
 * @example
 * ```tsx
 * <SolutionSection
 *   title="The AI.RIO Solution"
 *   features={[
 *     { id: '1', title: 'Real-time Tracking', description: 'See every AI cost as it happens', icon: 'zap', badge: 'New' },
 *     { id: '2', title: 'Cost Attribution', description: 'Know exactly which team drove costs', icon: 'chart' }
 *   ]}
 *   cta={{ label: 'See How It Works', href: '/demo' }}
 * />
 * ```
 */
export function SolutionSection({
  className,
  title = 'The Solution',
  subtitle,
  features,
  cta,
  layout = 'grid',
}: SolutionSectionProps) {
  const gridCols = {
    grid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    list: 'grid-cols-1',
    bento: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <section
      className={cn('space-y-8', className)}
      aria-labelledby="solution-section-title"
    >
      {/* Header */}
      <div className="space-y-3 text-center">
        <h2 id="solution-section-title" className="text-3xl font-bold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Features */}
      <div
        className={cn(
          'grid gap-6',
          gridCols[layout],
          layout === 'bento' && '[&_>:first-child]:md:col-span-2 [&_>:last-child]:md:col-span-2 lg:[&>:last-child]:col-span-1'
        )}
        role="list"
        aria-label="Solution features"
      >
        {features.map((feature) => {
          const IconComponent = typeof feature.icon === 'string' ? iconMap[feature.icon as keyof typeof iconMap] : null;

          return (
            <Card
              key={feature.id}
              className={cn(
                'group relative overflow-hidden transition-all hover:shadow-lg hover:border-primary/50',
                feature.highlighted && 'border-primary/50 bg-primary/5'
              )}
              role="listitem"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    {feature.icon && (
                      <div className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-xl transition-all group-hover:scale-110',
                        feature.highlighted
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )} aria-hidden="true">
                        {typeof feature.icon === 'string' && IconComponent ? (
                          <IconComponent className="h-6 w-6" />
                        ) : (
                          feature.icon
                        )}
                      </div>
                    )}
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      {feature.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              {feature.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              )}
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      {cta && (
        <div className="flex justify-center pt-4">
          <Button
            asChild
            variant={cta.variant || 'default'}
            size="lg"
            className="gap-2"
          >
            <a href={cta.href}>
              {cta.label}
              <Check className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      )}
    </section>
  );
}
