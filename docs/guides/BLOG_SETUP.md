# AI.RIO Blog Setup Documentation

## Overview

This document explains how the AI.RIO blog infrastructure works, how to create new blog posts, and how to maintain the blog system.

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Content Format**: MDX (Markdown + JSX)
- **Styling**: Tailwind CSS v4
- **i18n**: next-intl (English, Spanish, Portuguese)
- **Billing**: Stripe integration for examples
- **Components**: shadcn/ui

### File Structure

```
src/
├── app/
│   └── [locale]/
│       └── blog/
│           ├── page.tsx                    # Blog index page
│           ├── [slug]/
│           │   └── page.tsx                # Blog post detail page
│           └── globals.css                 # Syntax highlighting styles
├── components/
│   └── blog/
│       ├── blog-card.tsx                   # Blog post card component
│       ├── blog-navigation.tsx             # Navigation component
│       ├── blog-post-header.tsx            # Post header with metadata
│       ├── mdx-provider.tsx                # MDX components provider
│       └── index.ts                        # Exports
├── content/
│   ├── en/blog/                            # English posts
│   ├── es/blog/                            # Spanish posts
│   └── pt/blog/                            # Portuguese posts
└── lib/
    └── blog/
        ├── types.ts                        # TypeScript types
        ├── posts.ts                        # Post fetching utilities
        ├── seo.ts                          # SEO utilities
        ├── seo-enhanced.ts                 # Enhanced SEO with Schema
        └── index.ts                        # Exports
```

## Creating a New Blog Post

### 1. Choose Your Language

Create the post in the appropriate locale directory:
- English: `/src/content/en/blog/`
- Spanish: `/src/content/es/blog/`
- Portuguese: `/src/content/pt/blog/`

### 2. Create MDX File

Each blog post must:
- Use `.mdx` extension
- Include metadata export
- Follow the naming convention: `kebab-case.mdx`

### 3. Add Metadata

Every blog post must have metadata:

```mdx
export const metadata = {
  title: "Your Post Title",
  description: "SEO-friendly description (150-160 chars)",
  date: "2025-02-08",
  author: "AI.RIO",
  category: "Category Name",
  tags: ["tag1", "tag2", "tag3"],
};
```

### 4. Write Content

Follow the AI.RIO brand voice:
- **Bold, confident, direct**
- **Technical and actionable**
- **1000-1500 words**
- **Include code examples**
- **Show expertise (don't fake case studies)**

### 5. Code Examples

Use fenced code blocks with language specified:

````mdx
\`\`\`typescript
// Your code here
const example = "value";
\`\`\`
````

Supported languages:
- `typescript` / `ts`
- `javascript` / `js`
- `bash` / `sh`
- `json`
- `yaml` / `yml`
- `markdown` / `md`

### 6. MDX Components

You can use these custom components in your posts:

#### Callout Component

```mdx
<Callout type="info" title="Note">
  This is an informational callout.
</Callout>

<Callout type="warning">
  This is a warning callout.
</Callout>

<Callout type="success">
  This is a success callout.
</Callout>

<Callout type="error">
  This is an error callout.
</Callout>
```

#### Tag Component

```mdx
<Tag>stripe</Tag>
<Tag>payments</Tag>
```

## Translating Blog Posts

### Process

1. **Create translated files** in each locale directory
2. **Keep the same slug** (or translate if appropriate)
3. **Translate metadata** exactly
4. **Adapt code examples** if needed (comments, variable names)
5. **Maintain the same structure** (headings, sections)

### Example

English: `/src/content/en/blog/stripe-recovery-guide.mdx`
Spanish: `/src/content/es/blog/guia-recuperacion-stripe.mdx`
Portuguese: `/src/content/pt/blog/guia-recuperacao-stripe.mdx`

## SEO Best Practices

### 1. Metadata

- **Title**: 50-60 characters
- **Description**: 150-160 characters
- **Tags**: 3-7 relevant tags
- **Category**: One primary category

### 2. Content Structure

- Use H1 for the main title (automatic from metadata)
- Use H2 for main sections
- Use H3 for subsections
- Include internal links where relevant
- Add alt text to images

### 3. Schema Markup

The blog automatically generates:
- Article structured data
- Breadcrumb structured data
- Organization structured data
- WebSite structured data
- FAQPage structured data (if FAQs are included)

### 4. Open Graph & Twitter Cards

All blog posts include:
- Open Graph tags for social sharing
- Twitter Card meta tags
- Canonical URLs
- Hreflang tags for multilingual SEO

## Development

### Running Locally

```bash
# Install dependencies
bun install

# Run development server
bun run dev
```

Blog will be available at:
- English: http://localhost:3001/en/blog
- Spanish: http://localhost:3001/es/blog
- Portuguese: http://localhost:3001/pt/blog

### Building for Production

```bash
bun run build
```

## Troubleshooting

### MDX Not Rendering

1. Check that the file has `.mdx` extension
2. Verify metadata export exists
3. Ensure next.config.ts has MDX configuration
4. Restart development server

### Styling Issues

1. Check that Tailwind CSS v4 is properly configured
2. Verify syntax highlighting CSS is imported
3. Check for CSS conflicts with global styles

### i18n Issues

1. Ensure locale is one of: `en`, `es`, `pt`
2. Check that translation files exist in `/src/messages/`
3. Verify next-intl configuration in `/src/i18n/`

## Content Guidelines

### AI.RIO Brand Voice

- **Bold statements**: "Your margins are a black box. I built a flashlight."
- **Direct advice**: No fluff, actionable content
- **Technical depth**: Show code, explain architecture
- **No fake social proof**: Use real examples and expertise

### Post Topics

Focus on:
- Payment recovery (Stripe, billing)
- LLM cost tracking and optimization
- Usage-based pricing implementation
- Revenue leakage detection
- Scalable billing infrastructure
- Edge cases in billing systems

### Target Audience

- "Margin Panic" Founders/CTOs
- AI SaaS with ~$25K MRR
- Unattributed AI costs
- Technical decision-makers

## Maintenance

### Regular Tasks

1. **Update timestamps** when updating posts
2. **Check broken links** monthly
3. **Review analytics** for top-performing content
4. **Add internal links** between related posts
5. **Update code examples** if APIs change

### Adding New Features

To add new blog features:

1. Update TypeScript types in `/src/lib/blog/types.ts`
2. Add utility functions in `/src/lib/blog/`
3. Create components in `/src/components/blog/`
4. Update blog pages in `/src/app/[locale]/blog/`
5. Update this documentation

## Performance Optimization

### Static Generation

All blog posts are statically generated at build time using:
- `generateStaticParams()` for dynamic routes
- `generateMetadata()` for SEO metadata
- MDX compilation at build time

### Caching

- Blog posts are cached by Next.js
- Sitemap is generated at build time
- Static assets are cached via CDN

## Analytics Integration

To add analytics:

1. Update `/src/app/layout.tsx` with analytics scripts
2. Track page views for blog posts
3. Monitor scroll depth for engagement
4. Track outbound link clicks

## Support

For issues or questions:
1. Check this documentation first
2. Review Next.js 15 and MDX documentation
3. Check shadcn/ui component docs
4. Review Stripe API docs for code examples

## License

All blog content is copyright AI.RIO. Code examples may be used with attribution.
