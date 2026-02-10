import { type BlogPostMetadata } from './types';

interface SEOConfig {
  title: string;
  description: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  canonical?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

/**
 * Generate metadata for blog post pages
 */
export function generateBlogMetadata(config: SEOConfig) {
  const {
    title,
    description,
    ogImage = '/og-image.jpg',
    twitterCard = 'summary_large_image',
    canonical,
    type = 'article',
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
  } = config;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai.rio';
  const url = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'AI.RIO',
      locale: 'en_US',
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime,
      modifiedTime,
      authors,
      section,
      tags,
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate structured data (JSON-LD) for blog posts
 */
export function generateArticleStructuredData(metadata: BlogPostMetadata, slug: string, locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai.rio';
  const url = `${baseUrl}/${locale}/blog/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    description: metadata.description,
    image: '/og-image.jpg',
    datePublished: metadata.date,
    dateModified: metadata.date,
    author: {
      '@type': 'Organization',
      name: metadata.author,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI.RIO',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: metadata.category,
    keywords: metadata.tags.join(', '),
  };
}

/**
 * Generate structured data for blog index page
 */
export function generateBlogStructuredData(posts: Array<{ slug: string; title: string; date: string }>, locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai.rio';

  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AI.RIO Blog',
    description: 'Technical insights on billing infrastructure, payment recovery, and revenue optimization for AI SaaS.',
    url: `${baseUrl}/${locale}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'AI.RIO',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.date,
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
    })),
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
