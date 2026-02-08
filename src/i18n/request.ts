import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Load both UI and metadata translations from separate files
  const [ui, metadata] = await Promise.all([
    import(`./messages/${locale}/ui.json`),
    import(`./messages/${locale}/metadata.json`)
  ]);

  return {
    locale,
    messages: {
      ...ui.default,
      metadata: metadata.default
    }
  };
});
