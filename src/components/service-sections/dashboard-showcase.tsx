'use client';

import * as React from 'react';
import { ExternalLink, Expand, Monitor, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export interface DashboardView {
  id: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  device?: 'desktop' | 'tablet' | 'mobile';
  badge?: string;
}

export interface DashboardShowcaseProps {
  locale?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  views: DashboardView[];
  defaultView?: string;
  cta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2';
  rounded?: boolean;
}

const deviceIconMap = {
  desktop: Monitor,
  tablet: 'tablet',
  mobile: Smartphone,
};

/**
 * DashboardShowcase - Screenshot frame using Card, Button
 *
 * Showcases the AI.RIO dashboard with interactive views.
 * Responsive design with proper image optimization.
 *
 * @example
 * ```tsx
 * <DashboardShowcase
 *   title="See Your AI Costs in Real-Time"
 *   views={[
 *     {
 *       id: 'overview',
 *       title: 'Cost Overview',
 *       imageSrc: '/dashboard-overview.png',
 *       imageAlt: 'AI.RIO dashboard showing cost overview',
 *       device: 'desktop',
 *       badge: 'Live Demo'
 *     },
 *     {
 *       id: 'breakdown',
 *       title: 'Cost Breakdown',
 *       imageSrc: '/dashboard-breakdown.png',
 *       imageAlt: 'AI cost breakdown by service',
 *       device: 'desktop'
 *     }
 *   ]}
 *   cta={{ label: 'Try the Demo', href: '/demo', external: true }}
 * />
 * ```
 */
export function DashboardShowcase({
  locale = 'en',
  className,
  title,
  subtitle,
  views,
  defaultView,
  cta,
  aspectRatio = '16/9',
  rounded = true,
}: DashboardShowcaseProps) {
  const [selectedView, setSelectedView] = React.useState(defaultView || views[0]?.id);

  const aspectRatioClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]',
  };

  return (
    <section
      className={cn('space-y-6', className)}
      aria-labelledby="dashboard-showcase-title"
    >
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="gap-1.5">
            <Monitor className="h-3 w-3" aria-hidden="true" />
            <span>{locale === 'en' ? 'Live Dashboard' : 'Painel ao Vivo'}</span>
          </Badge>
        </div>
        <h2 id="dashboard-showcase-title" className="text-3xl font-bold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-surface-700 text-lg max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Main View Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* View Tabs */}
          {views.length > 1 && (
            <Tabs
              value={selectedView}
              onValueChange={setSelectedView}
              className="w-full"
            >
              <div className="border-b px-6 pt-4">
                <TabsList className="bg-surface-300/30 h-9 p-1">
                  {views.map((view) => {
                    const IconComponent = typeof deviceIconMap[view.device || 'desktop'] === 'string'
                      ? null
                      : deviceIconMap[view.device || 'desktop'];

                    return (
                      <TabsTrigger
                        key={view.id}
                        value={view.id}
                        className="gap-2 data-[state=active]:bg-dark-page"
                      >
                        {IconComponent && <IconComponent className="h-4 w-4" aria-hidden="true" />}
                        <span>{view.title}</span>
                        {view.badge && (
                          <Badge variant="secondary" className="ml-1 text-xs h-5">
                            {view.badge}
                          </Badge>
                        )}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {views.map((view) => (
                <TabsContent key={view.id} value={view.id} className="mt-0 p-6">
                  <DashboardImageView
                    view={view}
                    aspectRatio={aspectRatioClasses[aspectRatio]}
                    rounded={rounded}
                  />
                </TabsContent>
              ))}
            </Tabs>
          )}

          {/* Single View */}
          {views.length === 1 && (
            <div className="p-6">
              <DashboardImageView
                view={views[0]}
                aspectRatio={aspectRatioClasses[aspectRatio]}
                rounded={rounded}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* CTA */}
      {cta && (
        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            variant={cta.external ? 'outline' : 'default'}
            className="gap-2"
          >
            <a
              href={cta.href}
              target={cta.external ? '_blank' : undefined}
              rel={cta.external ? 'noopener noreferrer' : undefined}
            >
              {cta.label}
              {cta.external ? (
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Expand className="h-4 w-4" aria-hidden="true" />
              )}
            </a>
          </Button>
        </div>
      )}
    </section>
  );
}

interface DashboardImageViewProps {
  view: DashboardView;
  aspectRatio: string;
  rounded: boolean;
}

function DashboardImageView({ view, aspectRatio, rounded }: DashboardImageViewProps) {
  return (
    <div className="space-y-4">
      {/* Description */}
      {view.description && (
        <p className="text-sm text-surface-700 text-center">
          {view.description}
        </p>
      )}

      {/* Image Container */}
      <div className={cn(
        'relative w-full overflow-hidden bg-surface-300/30 border',
        aspectRatio,
        rounded ? 'rounded-lg' : 'rounded-sm'
      )}>
        <Image
          src={view.imageSrc}
          alt={view.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority={view.id === 'overview'}
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors pointer-events-none" />

        {/* Device Badge */}
        {view.device && (
          <Badge
            variant="secondary"
            className="absolute bottom-4 right-4 gap-1.5 bg-dark-page/90 backdrop-blur-sm"
          >
            {view.device === 'desktop' && <Monitor className="h-3 w-3" aria-hidden="true" />}
            {view.device === 'tablet' && <span className="text-xs">Tablet</span>}
            {view.device === 'mobile' && <Smartphone className="h-3 w-3" aria-hidden="true" />}
            <span className="capitalize">{view.device}</span>
          </Badge>
        )}
      </div>
    </div>
  );
}
