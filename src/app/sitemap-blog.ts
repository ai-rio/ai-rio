import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';

/**
 * Generate sitemap for blog posts across all locales
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai.rio';
  const locales = ['en', 'es', 'pt'];
  const blogUrls: MetadataRoute.Sitemap = [];

  // Static blog index pages
  for (const locale of locales) {
    blogUrls.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Blog post pages
  for (const locale of locales) {
    try {
      const posts = await getBlogPosts(locale);

      for (const post of posts) {
        blogUrls.push({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: new Date(post.date),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    } catch (error) {
      // Skip if locale doesn't have blog posts yet
      console.warn(`No blog posts found for locale: ${locale}`);
    }
  }

  return blogUrls;
}
