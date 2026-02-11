# Blog Quick Reference

## URL Structure

```
/[locale]/blog                              # Blog index
/[locale]/blog/[slug]                       # Blog post detail
```

### Examples
- English: https://ai.rio.br/en/blog
- Spanish: https://ai.rio.br/es/blog
- Portuguese: https://ai.rio.br/pt/blog

## Available Blog Posts

### English
1. `/en/blog/stripe-recovery-guide`
2. `/en/blog/llm-cost-optimization`
3. `/en/blog/usage-based-pricing-guide`
4. `/en/blog/revenue-leakage-detection`
5. `/en/blog/scalable-billing-infrastructure`
6. `/en/blog/billing-edge-case-checklist`

### Spanish
1. `/es/blog/guia-recuperacion-stripe`
2. `/es/blog/optimizacion-costos-llm`
3. `/es/blog/guia-priceso-uso`
4. `/es/blog/deteccion-fugas-ingresos`
5. `/es/blog/infraestructura-facturacion-escalable`
6. `/es/blog/lista-casos-extremos-facturacion`

### Portuguese
1. `/pt/blog/guia-recuperacao-stripe`
2. `/pt/blog/rastrear-custos-llm`
3. `/pt/blog/guia-precos-uso`
4. `/pt/blog/deteccao-vazamento-receita`
5. `/pt/blog/infraestrutura-cobranca-escalavel`
6. `/pt/blog/lista-casos-extremos-cobranca`

## Components

### BlogCard
Displays a blog post summary with title, excerpt, date, and reading time.

```tsx
<BlogCard post={post} locale={locale} />
```

### BlogGrid
Displays multiple blog cards in a responsive grid.

```tsx
<BlogGrid posts={posts} locale={locale} />
```

### BlogNavigation
Back navigation button for blog post pages.

```tsx
<BlogNavigation locale={locale} slug={slug} title={title} />
```

### BlogPostHeader
Displays blog post metadata (title, date, author, tags).

```tsx
<BlogPostHeader metadata={metadata} />
```

### MDX Components
Custom components for use in MDX files:
- `<Callout type="info|warning|success|error">`
- `<Tag>`

## Utility Functions

### getBlogPosts(locale)
Get all blog posts for a specific locale.

```typescript
const posts = await getBlogPosts('en');
```

### getBlogPost(slug, locale)
Get a single blog post.

```typescript
const post = await getBlogPost('stripe-recovery-guide', 'en');
```

### getCategories(locale)
Get all unique categories.

```typescript
const categories = await getCategories('en');
```

### getTags(locale)
Get all unique tags.

```typescript
const tags = await getTags('en');
```

### calculateReadingTime(content)
Calculate reading time for content.

```typescript
const time = calculateReadingTime(content);
```

### generateExcerpt(content, maxLength)
Generate excerpt from content.

```typescript
const excerpt = generateExcerpt(content, 160);
```

## Metadata Format

Every blog post must have:

```mdx
export const metadata = {
  title: "Post Title",
  description: "SEO description",
  date: "2025-02-08",
  author: "AI.RIO",
  category: "Category Name",
  tags: ["tag1", "tag2", "tag3"],
};
```

## Creating a New Post

1. Create file in `/src/content/{locale}/blog/{slug}.mdx`
2. Add metadata export
3. Write content in MDX format
4. Use code blocks with language specified
5. Test locally

## Code Block Syntax

````mdx
\`\`\`typescript
// Your code here
\`\`\`
````

## MDX Components Usage

### Callout

```mdx
<Callout type="info" title="Note">
  Content here
</Callout>
```

### Tag

```mdx
<Tag>stripe</Tag>
```

## Styling

Code blocks use GitHub-like dark theme with syntax highlighting.

## SEO

All blog posts automatically include:
- Article structured data
- Breadcrumb structured data
- Open Graph tags
- Twitter Cards
- Canonical URLs
- Hreflang tags

## File Locations

- Posts: `/src/content/{locale}/blog/`
- Components: `/src/components/blog/`
- Utilities: `/src/lib/blog/`
- Pages: `/src/app/[locale]/blog/`
- Docs: `/BLOG_SETUP.md`

## Troubleshooting

### MDX not rendering
- Check file has `.mdx` extension
- Verify metadata export exists
- Restart dev server

### Styling issues
- Check Tailwind config
- Verify CSS imports
- Check for conflicts

### i18n issues
- Verify locale is `en`, `es`, or `pt`
- Check translation files exist
- Verify next-intl config

## Support

For detailed documentation, see `/BLOG_SETUP.md`.
