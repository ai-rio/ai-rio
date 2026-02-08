'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const basePath = locale === 'en' ? '' : `/${locale}`;

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`${basePath === '' ? '/' : basePath}`} className="text-xl font-bold text-white">
              AI.RIO
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <Link
              href={`${basePath}/services`}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {t('services')}
            </Link>
            <Link
              href={`${basePath}/about`}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {t('about')}
            </Link>
            <Link
              href={`${basePath}/blog`}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {t('blog')}
            </Link>
            <Link
              href={`${basePath}/contact`}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
