import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

// Import translation files from the new modular structure
import enComponents from '@/i18n/messages/en/components'
import enPages from '@/i18n/messages/en/pages'
import enServices from '@/i18n/messages/en/services'
import esComponents from '@/i18n/messages/es/components'
import esPages from '@/i18n/messages/es/pages'
import esServices from '@/i18n/messages/es/services'
import ptComponents from '@/i18n/messages/pt/components'
import ptPages from '@/i18n/messages/pt/pages'
import ptServices from '@/i18n/messages/pt/services'

// Merge messages for each locale
const messages = {
  en: {
    ...enComponents,
    ...enPages,
    ...enServices,
  },
  es: {
    ...esComponents,
    ...esPages,
    ...esServices,
  },
  pt: {
    ...ptComponents,
    ...ptPages,
    ...ptServices,
  },
}

interface TranslationProviderProps {
  children: React.ReactNode
  locale?: 'en' | 'es' | 'pt'
}

export function TranslationProvider({ children, locale = 'en' }: TranslationProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      {children}
    </NextIntlClientProvider>
  )
}

export function renderWithTranslations(
  ui: React.ReactNode,
  locale: 'en' | 'es' | 'pt' = 'en'
) {
  return render(<TranslationProvider locale={locale}>{ui}</TranslationProvider>)
}
