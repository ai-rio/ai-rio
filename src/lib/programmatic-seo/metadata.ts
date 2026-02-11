/**
 * Programmatic SEO Metadata Generation
 * =====================================
 *
 * Generates Next.js metadata for:
 * - Persona pages (Service for Industry)
 * - Comparison pages
 * - Glossary pages
 */

import type { Metadata } from 'next';
import type { Locale } from '@/lib/metadata/base-metadata';
import {
  generateAlternates,
  generateOpenGraph,
  generateTwitterCard,
} from '@/lib/metadata/base-metadata';
import type { IndustryData } from './industries';
import type { ComparisonData } from './comparisons';
import type { GlossaryTerm } from './glossary';

const SITE_URL = 'https://ai.rio.br';

/**
 * Generate metadata for Persona pages
 */
export function generatePersonaMetadata(config: {
  serviceId: 'stripe-meter' | 'payment-recovery' | 'llm-tracking';
  industry: IndustryData;
  locale: Locale;
}): Metadata {
  const { serviceId, industry, locale } = config;

  const serviceNames = {
    'stripe-meter': { en: 'Stripe Meter', es: 'Stripe Meter', pt: 'Stripe Meter' },
    'payment-recovery': { en: 'Failed Payment Recovery', es: 'Recuperación de Pagos', pt: 'Recuperação de Pagamentos' },
    'llm-tracking': { en: 'LLM Cost Tracking', es: 'Seguimiento de LLM', pt: 'Rastreamento de LLM' },
  };

  const titles = {
    'stripe-meter': {
      en: `Stripe Meter Implementation for ${industry.name} | Ai.Rio`,
      es: `Implementación de Stripe Meter para ${industry.name} | Ai.Rio`,
      pt: `Implementação do Stripe Meter para ${industry.name} | Ai.Rio`,
    },
    'payment-recovery': {
      en: `Failed Payment Recovery for ${industry.name} | Ai.Rio`,
      es: `Recuperación de Pagos Fallidos para ${industry.name} | Ai.Rio`,
      pt: `Recuperação de Pagamentos Falhados para ${industry.name} | Ai.Rio`,
    },
    'llm-tracking': {
      en: `LLM Cost Tracking for ${industry.name} | Ai.Rio`,
      es: `Seguimiento de Costos de LLM para ${industry.name} | Ai.Rio`,
      pt: `Rastreamento de Custos de LLM para ${industry.name} | Ai.Rio`,
    },
  };

  const descriptions = {
    'stripe-meter': {
      en: `Stripe Meter implementation services for ${industry.name} companies. ${industry.description}. Delivered in 10-14 days with production-tested patterns. Fixed price $3,997.`,
      es: `Servicios de implementación de Stripe Meter para empresas de ${industry.name}. Entregado en 10-14 días. Precio fijo $3,997.`,
      pt: `Serviços de implementação do Stripe Meter para empresas de ${industry.name}. Entregue em 10-14 dias. Preço fixo $3,997.`,
    },
    'payment-recovery': {
      en: `Failed payment recovery services for ${industry.name} companies. Recover 65-70% of failed payments with advanced dunning. Delivered in 7-10 days. Fixed price $2,997.`,
      es: `Servicios de recuperación de pagos fallidos para empresas de ${industry.name}. Recupera 65-70%. Entregado en 7-10 días.`,
      pt: `Serviços de recuperação de pagamentos falhados para empresas de ${industry.name}. Recupere 65-70%. Entregue em 7-10 dias.`,
    },
    'llm-tracking': {
      en: `LLM cost tracking services for ${industry.name} companies. Track token usage across OpenAI, Anthropic, and 400+ models. Delivered in 10-14 days. Fixed price $4,997.`,
      es: `Servicios de seguimiento de costos de LLM para empresas de ${industry.name}. Rastrea en 10-14 días. Precio fijo $4,997.`,
      pt: `Serviços de rastreamento de custos de LLM para empresas de ${industry.name}. Rastreie em 10-14 dias. Preço fixo $4,997.`,
    },
  };

  const path = `/services/${serviceId}/for-${industry.slug}`;

  // Generate service-specific keywords
  const serviceKeywords = {
    'stripe-meter': ['stripe meter', 'usage-based pricing', 'metered billing', ...industry.keywords],
    'payment-recovery': ['failed payment recovery', 'dunning management', 'stripe dunning', ...industry.keywords],
    'llm-tracking': ['llm cost tracking', 'token attribution', 'ai cost monitoring', ...industry.keywords],
  };

  const title = titles[serviceId][locale];
  const description = descriptions[serviceId][locale];
  const keywords = [...new Set([...serviceKeywords[serviceId], 'ai.rio', 'billing infrastructure', ...industry.keywords])];

  // Generate alternates (canonical + hreflang)
  const alternates = generateAlternates(path, locale);

  // Generate OpenGraph metadata
  const openGraph = generateOpenGraph({
    title,
    description,
    locale,
    path,
  });

  // Generate Twitter card metadata
  const twitter = generateTwitterCard({
    title,
    description,
  });

  return {
    title,
    description,
    keywords,
    alternates,
    openGraph,
    twitter,
  };
}

/**
 * Generate metadata for Comparison pages
 */
export function generateComparisonMetadata(config: {
  comparison: ComparisonData;
  locale: Locale;
}): Metadata {
  const { comparison, locale } = config;

  const titles = {
    en: `Ai.Rio vs ${comparison.name}: Comparison & Review`,
    es: `Ai.Rio vs ${comparison.name}: Comparación y Reseña`,
    pt: `Ai.Rio vs ${comparison.name}: Comparação e Análise`,
  };

  const descriptions = {
    en: `Compare Ai.Rio vs ${comparison.name}: ${comparison.description}. Detailed comparison of costs, timelines, features, and when to choose each option.`,
    es: `Compara Ai.Rio vs ${comparison.name}: Comparación detallada de costos, cronogramas y características.`,
    pt: `Compare Ai.Rio vs ${comparison.name}: Comparação detalhada de custos, prazos e recursos.`,
  };

  const path = `/compare/${comparison.slug}`;

  const title = titles[locale];
  const description = descriptions[locale];
  const keywords = [
    `ai.rio vs ${comparison.name.toLowerCase()}`,
    'ai.rio comparison',
    'billing infrastructure comparison',
    comparison.name.toLowerCase(),
    ...comparison.name.toLowerCase().split(' '),
  ];

  const alternates = generateAlternates(path, locale);
  const openGraph = generateOpenGraph({ title, description, locale, path });
  const twitter = generateTwitterCard({ title, description });

  return {
    title,
    description,
    keywords,
    alternates,
    openGraph,
    twitter,
  };
}

/**
 * Generate metadata for Glossary pages
 */
export function generateGlossaryMetadata(config: {
  term: GlossaryTerm;
  locale: Locale;
}): Metadata {
  const { term, locale } = config;

  const titles = {
    en: `What is ${term.name}? | Ai.Rio Glossary`,
    es: `¿Qué es ${term.name}? | Glosario Ai.Rio`,
    pt: `O que é ${term.name}? | Glossário Ai.Rio`,
  };

  const descriptions = {
    en: `${term.description} Learn ${term.name} definition, technical details, why it matters for SaaS, and common mistakes to avoid.`,
    es: `${term.description} Aprende la definición de ${term.name}, detalles técnicos y errores comunes.`,
    pt: `${term.description} Aprenda a definição de ${term.name}, detalhes técnicos e erros comuns.`,
  };

  const path = `/glossary/${term.slug}`;

  const title = titles[locale];
  const description = descriptions[locale];
  const keywords = [
    term.name.toLowerCase(),
    `what is ${term.name.toLowerCase()}`,
    `${term.name.toLowerCase()} definition`,
    'billing glossary',
    'saas glossary',
    ...term.name.toLowerCase().split(' '),
  ];

  const alternates = generateAlternates(path, locale);
  const openGraph = generateOpenGraph({ title, description, locale, path });
  const twitter = generateTwitterCard({ title, description });

  return {
    title,
    description,
    keywords,
    alternates,
    openGraph,
    twitter,
  };
}

/**
 * Generate metadata for Persona hub pages (all industries for a service)
 */
export function generatePersonaHubMetadata(config: {
  serviceId: 'stripe-meter' | 'payment-recovery' | 'llm-tracking';
  locale: Locale;
}): Metadata {
  const { serviceId, locale } = config;

  const titles = {
    'stripe-meter': {
      en: 'Stripe Meter Implementation Services | Ai.Rio',
      es: 'Servicios de Implementación de Stripe Meter | Ai.Rio',
      pt: 'Serviços de Implementação do Stripe Meter | Ai.Rio',
    },
    'payment-recovery': {
      en: 'Failed Payment Recovery Services | Ai.Rio',
      es: 'Servicios de Recuperación de Pagos Fallidos | Ai.Rio',
      pt: 'Serviços de Recuperação de Pagamentos Falhados | Ai.Rio',
    },
    'llm-tracking': {
      en: 'LLM Cost Tracking Services | Ai.Rio',
      es: 'Servicios de Seguimiento de Costos de LLM | Ai.Rio',
      pt: 'Serviços de Rastreamento de Custos de LLM | Ai.Rio',
    },
  };

  const descriptions = {
    'stripe-meter': {
      en: 'Stripe Meter implementation services for AI SaaS companies. Launch usage-based pricing in 10-14 days with production-tested patterns. Fixed price $3,997.',
      es: 'Servicios de implementación de Stripe Meter para empresas SaaS de IA. Precios basados en uso en 10-14 días.',
      pt: 'Serviços de implementação do Stripe Meter para empresas SaaS de IA. Preços baseados em uso em 10-14 dias.',
    },
    'payment-recovery': {
      en: 'Failed payment recovery services for SaaS companies. Recover 65-70% of failed payments with advanced dunning workflows. Delivered in 7-10 days.',
      es: 'Servicios de recuperación de pagos fallidos para empresas SaaS. Recupera 65-70% en 7-10 días.',
      pt: 'Serviços de recuperação de pagamentos falhados para empresas SaaS. Recupere 65-70% em 7-10 dias.',
    },
    'llm-tracking': {
      en: 'LLM cost tracking services for AI SaaS companies. Track token usage across OpenAI, Anthropic, and 400+ models per customer.',
      es: 'Servicios de seguimiento de costos de LLM para empresas SaaS de IA. Rastrea tokens por cliente.',
      pt: 'Serviços de rastreamento de custos de LLM para empresas SaaS de IA. Rastreie tokens por cliente.',
    },
  };

  const path = `/services/${serviceId}`;

  const title = titles[serviceId][locale];
  const description = descriptions[serviceId][locale];

  const keywords = {
    'stripe-meter': ['stripe meter', 'usage-based pricing', 'metered billing', 'billing infrastructure'],
    'payment-recovery': ['failed payment recovery', 'dunning management', 'stripe dunning', 'payment recovery'],
    'llm-tracking': ['llm cost tracking', 'token attribution', 'ai cost monitoring', 'openai cost tracking'],
  };

  const alternates = generateAlternates(path, locale);
  const openGraph = generateOpenGraph({ title, description, locale, path });
  const twitter = generateTwitterCard({ title, description });

  return {
    title,
    description,
    keywords: keywords[serviceId],
    alternates,
    openGraph,
    twitter,
  };
}
