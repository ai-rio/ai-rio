import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { BlogNavigation, BlogPostHeader } from '@/components/blog';
import { getBlogPost, getBlogSlugs, generateBlogMetadata, generateArticleStructuredData } from '@/lib/blog';
import { Separator } from '@/components/ui/separator';
import '@/app/syntax-highlighting.css';

interface BlogPostPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const paths: Array<{ locale: string; slug: string }> = [];

  ['en', 'es', 'pt'].forEach((locale) => {
    const slugs = getBlogSlugs(locale);
    slugs.forEach((slug) => {
      paths.push({ locale, slug });
    });
  });

  return paths;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);
  const t = await getTranslations({ locale, namespace: 'blog' });

  if (!post) {
    return {
      title: t('post.notFound'),
    };
  }

  return generateBlogMetadata({
    title: post.metadata.title,
    description: post.metadata.description,
    canonical: `/${locale}/blog/${slug}`,
    type: 'article',
    publishedTime: post.metadata.date,
    modifiedTime: post.metadata.date,
    authors: [post.metadata.author],
    section: post.metadata.category,
    tags: post.metadata.tags,
  });
}

// Custom MDX components for proper styling
const mdxComponents = {
  // Code blocks - properly handle pre/code structure
  pre: ({ children, className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    return (
      <pre
        className="bg-[#0d1117] text-[#c9d1d9] p-4 rounded-lg overflow-x-auto text-sm my-6 block"
        {...props}
      >
        {children}
      </pre>
    );
  },
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Inline code - no language class
    const isInline = !className?.includes('language-') && !className?.includes('hljs');

    if (isInline) {
      return (
        <code
          className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    }

    // Code block - will be wrapped by pre
    return <code className={className} {...props}>{children}</code>;
  },
  // Headings
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 scroll-mt-20" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-semibold mt-8 mb-3 scroll-mt-20" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold mt-6 mb-2 scroll-mt-20" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl font-semibold mt-4 mb-2 scroll-mt-20" {...props}>
      {children}
    </h4>
  ),
  // Paragraphs
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base leading-7 my-4" {...props}>
      {children}
    </p>
  ),
  // Lists
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside my-4 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside my-4 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-base" {...props}>
      {children}
    </li>
  ),
  // Links
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="text-primary underline underline-offset-4 hover:text-primary/80"
      {...props}
    >
      {children}
    </a>
  ),
  // Blockquotes
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground" {...props}>
      {children}
    </blockquote>
  ),
  // Strong
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),
  // Tables
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-border" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-border bg-background" {...props} />
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-sm" {...props}>
      {children}
    </td>
  ),
  // Horizontal rule
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'blog' });

  // Generate structured data
  const structuredData = generateArticleStructuredData(post.metadata, slug, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <BlogNavigation locale={locale} slug={slug} title={post.metadata.title} />

        <BlogPostHeader metadata={post.metadata} />

        <Separator className="mb-8" />

        <div className="prose prose-slate max-w-none">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              parseFrontmatter: false,
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                  rehypeHighlight,
                ],
                format: 'mdx',
              },
            }}
          />
        </div>

        <Separator className="my-12" />

        {/* Author Bio */}
        <div className="flex items-start gap-4 py-6">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            AI
          </div>
          <div>
            <h3 className="font-semibold mb-1">{post.metadata.author}</h3>
            <p className="text-sm text-muted-foreground">
              {t('post.authorBio')}
            </p>
          </div>
        </div>

        <BlogNavigation locale={locale} />
      </article>
    </>
  );
}
