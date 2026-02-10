import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

// Import translation files - adjust path as needed
const enMessages = require('@/i18n/messages/en/ui.json')
const esMessages = require('@/i18n/messages/es/ui.json')
const ptMessages = require('@/i18n/messages/pt/ui.json')

const messages = {
  en: enMessages,
  es: esMessages,
  pt: ptMessages,
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
