import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es', 'pt'],

  // Used when no locale matches
  defaultLocale: 'en',

  // No prefix for default locale (en), but use prefix for others (es, pt)
  localePrefix: 'as-needed'
});
