/**
 * Blog post metadata types
 */
export interface BlogPostMetadata {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  slug?: string;
  locale?: string;
  readingTime?: number;
  excerpt?: string;
}

/**
 * Complete blog post with metadata and content
 */
export interface BlogPost {
  metadata: BlogPostMetadata;
  content: string;
  slug: string;
  locale: string;
}

/**
 * Blog post summary for index pages
 */
export interface BlogPostSummary {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  slug: string;
  locale: string;
  readingTime: number;
  excerpt: string;
}

/**
 * Blog post category
 */
export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}
