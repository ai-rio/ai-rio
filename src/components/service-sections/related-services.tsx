'use client';

import * as React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface RelatedService {
  id: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
  external?: boolean;
  icon?: React.ReactNode;
}

export interface RelatedServicesProps {
  locale?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  services: RelatedService[];
  layout?: 'grid' | 'horizontal';
}

/**
 * RelatedServices - Service links using Card, Button
 *
 * Cross-promotes related services to guide visitors.
 * Maintains brand voice - confident and direct.
 *
 * @example
 * ```tsx
 * <RelatedServices
 *   title="Related Services"
 *   services={[
 *     { id: '1', title: 'Cost Audit', description: 'One-time AI cost analysis', href: '/audit', badge: 'Popular' },
 *     { id: '2', title: 'Implementation', description: 'Full tracking setup', href: '/implementation', external: true }
 *   ]}
 * />
 * ```
 */
export function RelatedServices({
  locale = 'en',
  className,
  title = 'Related Services',
  subtitle,
  services,
  layout = 'grid',
}: RelatedServicesProps) {
  const isGrid = layout === 'grid';

  return (
    <section
      className={cn('space-y-6', className)}
      aria-labelledby="related-services-title"
    >
      {/* Header */}
      <div className="space-y-2">
        <h2 id="related-services-title" className="text-2xl font-bold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      {/* Services */}
      <div
        className={cn(
          isGrid
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'flex flex-col sm:flex-row gap-4 overflow-x-auto pb-2'
        )}
        role="list"
        aria-label="Related services"
      >
        {services.map((service) => (
          <Card
            key={service.id}
            className={cn(
              'group transition-all hover:shadow-md hover:border-primary/50',
              !isGrid && 'min-w-[280px] sm:min-w-0 sm:flex-1'
            )}
            role="listitem"
          >
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  {service.icon && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      {service.icon}
                    </div>
                  )}
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </div>
                {service.badge && (
                  <Badge variant="secondary" className="shrink-0">
                    {service.badge}
                  </Badge>
                )}
              </div>
              <CardDescription className="text-sm">
                {service.description}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                asChild
                variant="ghost"
                className="w-full group/btn justify-between px-3 h-9"
              >
                <a href={service.href} className="no-underline">
                  <span>
                    {locale === 'en' ? 'Learn more' : 'Saiba mais'}
                  </span>
                  <span className="flex items-center">
                    {service.external ? (
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" aria-hidden="true" />
                    )}
                  </span>
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
