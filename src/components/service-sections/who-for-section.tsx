'use client';

import * as React from 'react';
import { Building2, Users, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CustomerProfile {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  initials: string;
  mrr?: { min: number; max: number };
  stage: string;
  painPoints: string[];
  icon?: 'building' | 'users' | 'zap' | 'growth' | React.ReactNode;
}

export interface WhoForSectionProps {
  locale?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  profiles: CustomerProfile[];
  cta?: {
    label: string;
    href: string;
  };
}

const iconMap = {
  building: Building2,
  users: Users,
  zap: Zap,
  growth: TrendingUp,
};

const formatMRR = (mrr: { min: number; max: number }, locale: string): string => {
  const format = (value: number) =>
    new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  return `${format(mrr.min)} - ${format(mrr.max)}`;
};

/**
 * WhoForSection - Customer profiles using Card, Avatar
 *
 * Helps visitors identify if this service is for them.
 * Uses relatable profiles for the target persona.
 *
 * @example
 * ```tsx
 * <WhoForSection
 *   title="Who This Is For"
 *   profiles={[
 *     {
 *       id: '1',
 *       name: 'AI SaaS Founder',
 *       initials: 'AF',
 *       stage: 'Series A',
 *       mrr: { min: 25000, max: 100000 },
 *       painPoints: ['Unattributed AI costs', 'No cost visibility']
 *     }
 *   ]}
 * />
 * ```
 */
export function WhoForSection({
  locale = 'en',
  className,
  title = 'Who This Is For',
  subtitle,
  profiles,
  cta,
}: WhoForSectionProps) {
  return (
    <section
      className={cn('space-y-8', className)}
      aria-labelledby="who-for-section-title"
    >
      {/* Header */}
      <div className="space-y-3 text-center">
        <h2 id="who-for-section-title" className="text-3xl font-bold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Profiles Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Customer profiles"
      >
        {profiles.map((profile) => {
          const IconComponent = typeof profile.icon === 'string' ? iconMap[profile.icon as keyof typeof iconMap] : null;

          return (
            <Card
              key={profile.id}
              className="group relative overflow-hidden transition-all hover:shadow-lg hover:border-primary/50"
              role="listitem"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-muted transition-all group-hover:ring-primary/50">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                      {profile.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-xl">{profile.name}</CardTitle>
                    {profile.icon && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {typeof profile.icon === 'string' && IconComponent ? (
                          <IconComponent className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          profile.icon && <span className="flex items-center">{profile.icon}</span>
                        )}
                        <span>{profile.stage}</span>
                      </div>
                    )}
                  </div>
                </div>

                <CardDescription className="text-base leading-relaxed">
                  {profile.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* MRR Badge */}
                {profile.mrr && (
                  <Badge variant="secondary" className="w-fit">
                    {formatMRR(profile.mrr, locale)} MRR
                  </Badge>
                )}

                {/* Pain Points */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Challenges:</p>
                  <ul className="space-y-1.5" role="list">
                    {profile.painPoints.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      {cta && (
        <div className="flex justify-center pt-4">
          <Button asChild size="lg" className="gap-2">
            <a href={cta.href}>
              {cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      )}
    </section>
  );
}
