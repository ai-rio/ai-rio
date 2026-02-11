/**
 * BlogNavigation component for blog post pages
 */

'use client';

import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2 } from 'lucide-react';

interface BlogNavigationProps {
  locale: string;
  slug?: string;
  title?: string;
}

export function BlogNavigation({ locale, slug, title }: BlogNavigationProps) {
  const handleShare = async () => {
    if (navigator.share && slug && title) {
      try {
        await navigator.share({
          title,
          url: `/blog/${slug}`,
        });
      } catch {
        // User cancelled sharing
      }
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <Link href="/blog" aria-label="Back to blog">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>
      </Link>
      {slug && title && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          aria-label="Share this post"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
