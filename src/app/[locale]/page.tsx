import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/navbar';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: "AI.RIO - Billing Infrastructure Specialist",
    description: t("subtitle"),
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="min-h-screen bg-zinc-950 dark:bg-black text-zinc-50 dark:text-zinc-400">
      <Navbar locale={locale} />
      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300 sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                href="#contact"
                className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {t("hero.cta")}
              </a>
              <a
                href="#services"
                className="rounded-md bg-zinc-800 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {t("nav.services")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("services.title")}
          </h2>
          <p className="text-lg text-zinc-400 mb-12">
            {t("services.subtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Payment Recovery */}
            <div className="rounded-lg bg-zinc-900 p-6 border border-zinc-800 hover:border-indigo-500 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("services.payment_recovery.title")}
              </h3>
              <p className="text-2xl font-bold text-indigo-400 mb-2">
                {t("services.payment_recovery.price")}
              </p>
              <p className="text-sm text-zinc-400 mb-4">
                {t("services.payment_recovery.timeline")}
              </p>
              <p className="text-sm text-zinc-300">
                {t("services.payment_recovery.description")}
              </p>
            </div>

            {/* Usage-Based Pricing */}
            <div className="rounded-lg bg-zinc-900 p-6 border border-zinc-800 hover:border-indigo-500 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("services.usage_pricing.title")}
              </h3>
              <p className="text-2xl font-bold text-indigo-400 mb-2">
                {t("services.usage_pricing.price")}
              </p>
              <p className="text-sm text-zinc-400 mb-4">
                {t("services.usage_pricing.timeline")}
              </p>
              <p className="text-sm text-zinc-300">
                {t("services.usage_pricing.description")}
              </p>
            </div>

            {/* AI Cost Tracking */}
            <div className="rounded-lg bg-zinc-900 p-6 border border-zinc-800 hover:border-indigo-500 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("services.ai_tracking.title")}
              </h3>
              <p className="text-2xl font-bold text-indigo-400 mb-2">
                {t("services.ai_tracking.price")}
              </p>
              <p className="text-sm text-zinc-400 mb-4">
                {t("services.ai_tracking.timeline")}
              </p>
              <p className="text-sm text-zinc-300">
                {t("services.ai_tracking.description")}
              </p>
            </div>

            {/* Billing Audit */}
            <div className="rounded-lg bg-zinc-900 p-6 border border-zinc-800 hover:border-indigo-500 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("services.billing_audit.title")}
              </h3>
              <p className="text-2xl font-bold text-indigo-400 mb-2">
                {t("services.billing_audit.price")}
              </p>
              <p className="text-sm text-zinc-400 mb-4">
                {t("services.billing_audit.timeline")}
              </p>
              <p className="text-sm text-zinc-300">
                {t("services.billing_audit.description")}
              </p>
            </div>

            {/* Complete Billing */}
            <div className="rounded-lg bg-zinc-900 p-6 border border-zinc-800 hover:border-indigo-500 transition-colors md:col-span-2">
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("services.complete_billing.title")}
              </h3>
              <p className="text-2xl font-bold text-indigo-400 mb-2">
                {t("services.complete_billing.price")}
              </p>
              <p className="text-sm text-zinc-400 mb-4">
                {t("services.complete_billing.timeline")}
              </p>
              <p className="text-sm text-zinc-300">
                {t("services.complete_billing.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("about.title")}
          </h2>
          <p className="text-lg text-zinc-400">
            {t("about.description")}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-zinc-400 mb-8">
            {t("contact.description")}
          </p>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                {t("contact.form.name")}
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                {t("contact.form.email")}
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-zinc-300">
                {t("contact.form.company")}
              </label>
              <input
                type="text"
                id="company"
                className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-zinc-300">
                {t("contact.form.service")}
              </label>
              <select
                id="service"
                className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:border-indigo-500 focus:outline-none"
              >
                <option value="">{t("nav.services")}</option>
                <option value="payment-recovery">{t("services.payment_recovery.title")}</option>
                <option value="usage-pricing">{t("services.usage_pricing.title")}</option>
                <option value="ai-tracking">{t("services.ai_tracking.title")}</option>
                <option value="billing-audit">{t("services.billing_audit.title")}</option>
                <option value="complete-billing">{t("services.complete_billing.title")}</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-300">
                {t("contact.form.message")}
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-zinc-700 bg-zinc-800 text-white px-3 py-2 focus:border-indigo-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white font-semibold hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2"
            >
              {t("contact.form.submit")}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-zinc-800">
        <div className="mx-auto max-w-6xl flex justify-between items-center">
          <p className="text-sm text-zinc-500">
            © 2026 AI.RIO - {locale === 'pt' ? 'Todos os direitos reservados.' : locale === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-4 text-sm">
            <a href="/" className="text-zinc-400 hover:text-white">
              {locale === 'en' ? 'English' : locale === 'es' ? 'Español' : 'Português'}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
