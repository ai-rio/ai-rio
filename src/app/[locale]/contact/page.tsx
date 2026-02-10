import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { generatePageMetadata } from '@/lib/metadata/page-metadata';
import { SimplifiedContactForm } from '@/components/simplified-contact-form';
import type { Locale } from '@/lib/metadata/base-metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as Locale,
    namespace: 'contact',
    path: '/contact',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="min-h-screen bg-zinc-950 dark:bg-black text-zinc-50 dark:text-zinc-400">
      <Navbar locale={locale} />

      <main className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-zinc-300">
              {t('description')}
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
            <SimplifiedContactForm locale={locale} />
          </div>

          {/* Alternative Contact Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-zinc-400">
              {locale === 'en'
                ? 'Prefer email? Reach out directly at '
                : locale === 'es'
                ? '¿Prefieres email? Escríbeme directamente a '
                : 'Prefere email? Entre em contato diretamente em '}
              <a
                href="mailto:contact@ai.rio.br"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                contact@ai.rio.br
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
