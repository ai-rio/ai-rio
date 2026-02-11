import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { type BlogPost, type BlogPostSummary, type BlogPostMetadata } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

/**
 * Calculate reading time for a blog post
 * Average reading speed: 200 words per minute
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content: string, maxLength = 160): string {
  // Remove markdown syntax
  const plainText = content
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim();

  // Truncate to max length
  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + '...';
}

/**
 * Get all blog posts for a specific locale
 */
export async function getBlogPosts(locale: string): Promise<BlogPostSummary[]> {
  const blogDir = path.join(CONTENT_DIR, locale, 'blog');

  // Check if directory exists
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const filenames = fs.readdirSync(blogDir);
  const posts = filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(blogDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      const slug = filename.replace(/\.mdx$/, '');
      const readingTime = calculateReadingTime(content);
      const excerpt = generateExcerpt(content);

      return {
        ...(data as BlogPostMetadata),
        slug,
        locale,
        readingTime,
        excerpt,
        tags: (data as BlogPostMetadata).tags || [],
      } as BlogPostSummary;
    });

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug and locale
 */
export async function getBlogPost(slug: string, locale: string): Promise<BlogPost | null> {
  const blogDir = path.join(CONTENT_DIR, locale, 'blog');
  const filePath = path.join(blogDir, `${slug}.mdx`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const readingTime = calculateReadingTime(content);
  const excerpt = generateExcerpt(content);

  return {
    metadata: {
      ...(data as BlogPostMetadata),
      readingTime,
      excerpt,
      tags: (data as BlogPostMetadata).tags || [],
    },
    content,
    slug,
    locale,
  };
}

/**
 * Get all available locales for blog posts
 */
export function getBlogLocales(): string[] {
  const locales: string[] = [];

  ['en', 'es', 'pt'].forEach((locale) => {
    const blogDir = path.join(CONTENT_DIR, locale, 'blog');
    if (fs.existsSync(blogDir)) {
      const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'));
      if (files.length > 0) {
        locales.push(locale);
      }
    }
  });

  return locales;
}

/**
 * Get all blog slugs for a specific locale (for static generation)
 */
export function getBlogSlugs(locale: string): string[] {
  const blogDir = path.join(CONTENT_DIR, locale, 'blog');

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  return fs.readdirSync(blogDir).filter((filename) => filename.endsWith('.mdx')).map((filename) => filename.replace(/\.mdx$/, ''));
}

/**
 * Get blog posts by category
 */
export async function getBlogPostsByCategory(locale: string, category: string): Promise<BlogPostSummary[]> {
  const posts = await getBlogPosts(locale);
  return posts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
}

/**
 * Get blog posts by tag
 */
export async function getBlogPostsByTag(locale: string, tag: string): Promise<BlogPostSummary[]> {
  const posts = await getBlogPosts(locale);
  return posts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}

/**
 * Get all unique categories
 */
export async function getCategories(locale: string): Promise<string[]> {
  const posts = await getBlogPosts(locale);
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique tags
 */
export async function getTags(locale: string): Promise<string[]> {
  const posts = await getBlogPosts(locale);
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}
