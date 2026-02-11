/**
 * BlogPostHeader component for displaying blog post metadata
 */

'use client';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, User } from 'lucide-react';
import { type BlogPostMetadata } from '@/lib/blog';

interface BlogPostHeaderProps {
  metadata: BlogPostMetadata;
}

export function BlogPostHeader({ metadata }: BlogPostHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Badge>{metadata.category}</Badge>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
        {metadata.title}
      </h1>

      <p className="text-xl text-muted-foreground mb-6">
        {metadata.description}
      </p>

      <Separator className="mb-6" />

      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{metadata.author}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={metadata.date}>
            {(() => {
              try {
                const date = new Date(metadata.date);
                // Format manually to avoid date-fns timezone issues
                const months = ['January', 'February', 'March', 'April', 'May', 'June',
                              'July', 'August', 'September', 'October', 'November', 'December'];
                if (!isNaN(date.getTime())) {
                  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
                }
                return metadata.date;
              } catch {
                return metadata.date;
              }
            })()}
          </time>
        </div>

        {metadata.readingTime && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{metadata.readingTime} min read</span>
          </div>
        )}
      </div>

      <Separator className="my-6" />

      <div className="flex flex-wrap gap-2">
        {metadata.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
