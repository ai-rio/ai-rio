import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

/**
 * Message loader configuration
 *
 * Loads modular translation files from components/, pages/, services/ etc.
 * Each module is loaded as a separate namespace for better organization.
 */

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  // Load all modular translation files in parallel
  const [navbar, footer, hero, contactForm, about, home, contact, blog, services, paymentRecovery, usagePricing, aiTracking, billingAudit, completeBilling, billingInfrastructure, metadata] = await Promise.all([
    import(`./messages/${locale}/components/navbar.json`),
    import(`./messages/${locale}/components/footer.json`),
    import(`./messages/${locale}/components/hero.json`),
    import(`./messages/${locale}/components/contact-form.json`),
    import(`./messages/${locale}/pages/about.json`),
    import(`./messages/${locale}/pages/home.json`),
    import(`./messages/${locale}/pages/contact.json`),
    import(`./messages/${locale}/pages/blog.json`),
    import(`./messages/${locale}/pages/services.json`),
    import(`./messages/${locale}/services/payment-recovery.json`),
    import(`./messages/${locale}/services/usage-pricing.json`),
    import(`./messages/${locale}/services/ai-tracking.json`),
    import(`./messages/${locale}/services/billing-audit.json`),
    import(`./messages/${locale}/services/complete-billing.json`),
    import(`./messages/${locale}/services/billing-infrastructure.json`),
    import(`./messages/${locale}/metadata.json`)
  ]);

  return {
    locale,
    messages: {
      // Modular component namespaces (referenced as 'components/navbar', etc.)
      'components/navbar': navbar.default,
      'components/footer': footer.default,
      'components/hero': hero.default,
      'components/contact-form': contactForm.default,
      // Page namespaces (referenced as 'pages/about', etc.)
      'pages/about': about.default,
      'home': home.default,
      'pages/contact': contact.default,
      'blog': blog.default,
      'pages/services': services.default,
      // Service page namespaces (referenced as 'services/payment-recovery', etc.)
      'services/payment-recovery': paymentRecovery.default,
      'services/usage-pricing': usagePricing.default,
      'services/ai-tracking': aiTracking.default,
      'services/billing-audit': billingAudit.default,
      'services/complete-billing': completeBilling.default,
      'services/billing-infrastructure': billingInfrastructure.default,
      // Metadata namespace
      metadata: metadata.default
    }
  };
});
