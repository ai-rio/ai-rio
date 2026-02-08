'use client';

import { useTranslations } from 'next-intl';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');

  const switchLanguage = (newLocale: string) => {
    // Get current path without locale
    const pathWithoutLocale = window.location.pathname.replace(`/${locale}`, '').replace(/^\/+/g, '');
    const newPath = newLocale === 'en' ? `/${pathWithoutLocale}` : `/${newLocale}/${pathWithoutLocale}`;
    window.location.href = newPath || '/';
  };

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

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

            {/* Language Switcher */}
            <div className="relative group">
              <button
                className="flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
                aria-label="Select language"
              >
                <span>{currentLanguage.flag}</span>
                <span>{currentLanguage.name}</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute right-0 mt-2 w-40 rounded-md border border-zinc-800 bg-zinc-900 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors ${
                        lang.code === locale
                          ? 'bg-zinc-800 text-white'
                          : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
