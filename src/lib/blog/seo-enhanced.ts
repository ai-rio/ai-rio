/**
 * Enhanced SEO utilities for blog posts
 * Includes Schema markup, Open Graph tags, and Twitter Cards
 */

import { type BlogPostMetadata } from './types';

interface BlogSEOConfig {
  title: string;
  description: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  canonical?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  locale: string;
}

/**
 * Generate enhanced metadata for blog post pages
 */
export function generateEnhancedBlogMetadata(config: BlogSEOConfig) {
  const {
    title,
    description,
    ogImage = '/og-image.jpg',
    twitterCard = 'summary_large_image',
    canonical,
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
    locale,
  } = config;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai.rio';
  const url = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en/blog${canonical?.split('/blog')[1] || ''}`,
        es: `${baseUrl}/es/blog${canonical?.split('/blog')[1] || ''}`,
        pt: `${baseUrl}/pt/blog${canonical?.split('/blog')[1] || ''}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'AI.RIO',
      locale,
      localeAlternate: ['en_US', 'es_ES', 'pt_BR'],
      type: 'article',
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
      creator: '@ai_rio',
    },
  };
}

/**
 * Generate Article structured data (JSON-LD)
 */
export function generateArticleStructuredData(
  metadata: BlogPostMetadata,
  slug: string,
  locale: string
) {
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
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: metadata.category,
    keywords: metadata.tags.join(', '),
    inLanguage: locale,
    about: {
      '@type': 'Thing',
      name: metadata.category,
    },
  };
}

/**
 * Generate Breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>,
  locale: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai.rio';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}/${locale}${item.url}`,
    })),
  };
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai.rio';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI.RIO',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
    },
    description: 'Billing infrastructure specialist for AI SaaS. Your margins are a black box. I built a flashlight.',
    sameAs: [
      'https://twitter.com/ai_rio',
      'https://linkedin.com/company/ai-rio',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hello@ai.rio',
    },
  };
}

/**
 * Generate FAQPage structured data
 */
export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>
) {
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

/**
 * Generate WebSite structured data for search
 */
export function generateWebSiteStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai.rio';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: baseUrl,
    name: 'AI.RIO',
    description: 'Billing infrastructure specialist for AI SaaS',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Person/Author structured data
 */
export function generatePersonStructuredData(name: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai.rio';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: baseUrl,
    jobTitle: 'Billing Infrastructure Specialist',
    worksFor: {
      '@type': 'Organization',
      name: 'AI.RIO',
      url: baseUrl,
    },
  };
}

/**
 * Generate TechArticle structured data for technical posts
 */
export function generateTechArticleStructuredData(
  metadata: BlogPostMetadata,
  slug: string,
  locale: string
) {
  const articleData = generateArticleStructuredData(metadata, slug, locale);

  return {
    ...articleData,
    '@type': 'TechArticle',
    proficiencyLevel: 'Expert',
    audience: {
      '@type': 'Audience',
      audienceType: 'Developers, Technical Founders, CTOs',
    },
  };
}
