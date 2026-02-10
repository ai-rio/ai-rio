'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations('components/footer');

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Ai.Rio</h3>
              <p className="text-sm text-zinc-400">
                {t('tagline')}
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">{t('navigation')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {t('home')}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {t('services')}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {t('about')}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {t('blog')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">{t('services_title')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/services/payment-recovery" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {t('payment_recovery')}
                  </Link>
                </li>
                <li>
                  <Link href="/services/usage-pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {t('usage_pricing')}
                  </Link>
                </li>
                <li>
                  <Link href="/services/ai-tracking" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {t('ai_tracking')}
                  </Link>
                </li>
                <li>
                  <Link href="/services/billing-audit" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {t('billing_audit')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">{t('contact_title')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
                    {t('get_in_touch')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 border-t border-zinc-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-zinc-400">
                {t('copyright', { year: new Date().getFullYear() })}
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="https://twitter.com/airio_br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  Twitter
                </Link>
                <Link
                  href="https://linkedin.com/company/ai-rio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </Link>
                <Link
                  href="https://github.com/ai-rio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
