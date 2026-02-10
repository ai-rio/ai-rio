import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { BlogGrid } from '@/components/blog';
import { getBlogPosts, getCategories, getTags, generateBlogMetadata, generateBlogStructuredData } from '@/lib/blog';

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Blog' });

  return generateBlogMetadata({
    title: t('meta.title'),
    description: t('meta.description'),
    canonical: `/${locale}/blog`,
    type: 'website',
  });
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'pt' }];
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;

  // Validate locale
  if (!['en', 'es', 'pt'].includes(locale)) {
    notFound();
  }

  const posts = await getBlogPosts(locale);
  const categories = await getCategories(locale);
  const tags = await getTags(locale);

  // Generate structured data
  const structuredData = generateBlogStructuredData(posts, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {locale === 'en' ? 'Blog' : locale === 'es' ? 'Blog' : 'Blog'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {locale === 'en'
              ? 'Technical insights on billing infrastructure, payment recovery, and revenue optimization for AI SaaS.'
              : locale === 'es'
              ? 'Perspectivas técnicas sobre infraestructura de facturación, recuperación de pagos y optimización de ingresos para SaaS de IA.'
              : 'Insights técnicos sobre infraestrutura de cobrança, recuperação de pagamentos e otimização de receita para SaaS de IA.'}
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8 flex justify-center flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2 self-center">
              {locale === 'en' ? 'Categories:' : locale === 'es' ? 'Categorías:' : 'Categorias:'}
            </span>
            {categories.map((category) => (
              <a
                key={category}
                href={`#${(category || '').toLowerCase().replace(/\s+/g, '-')}`}
                role="button"
                aria-label={`Filter by ${category}`}
                className="inline-flex items-center rounded-md border px-3 py-1 text-sm hover:bg-accent"
              >
                {category}
              </a>
            ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        <BlogGrid posts={posts} locale={locale} />

        {/* Tag Cloud */}
        {tags.length > 0 && (
          <div className="mt-16 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {locale === 'en' ? 'Explore by Topic' : locale === 'es' ? 'Explorar por Tema' : 'Explorar por Tópico'}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <a
                  key={tag}
                  href={`?tag=${encodeURIComponent(tag)}`}
                  aria-label={`View posts tagged with ${tag}`}
                  className="inline-flex items-center rounded-full border px-4 py-2 text-sm hover:bg-accent transition-colors"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
