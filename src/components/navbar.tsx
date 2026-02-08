'use client';

import { useTranslations } from 'next-intl';

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href={`/${locale === 'en' ? '' : locale}`} className="text-xl font-bold text-white">
              AI.RIO
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <a
              href={`#${locale === 'en' ? '' : locale + '/'}services`}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {t('services')}
            </a>
            <a
              href={`#${locale === 'en' ? '' : locale + '/'}about`}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {t('about')}
            </a>
            <a
              href={`#${locale === 'en' ? '' : locale + '/'}contact`}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {t('contact')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
