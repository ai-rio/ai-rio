/**
 * Programmatic SEO Schema Generation
 * ==================================
 *
 * Generates JSON-LD structured data for:
 * - Persona pages (Service for Industry)
 * - Comparison pages
 * - Glossary pages
 */

import type { Locale } from '@/lib/metadata/base-metadata';
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  type BreadcrumbSchema,
  type FAQSchema,
  type ServiceSchema,
  generateOrganizationSchema,
} from '@/lib/metadata/schema';
import type { IndustryData } from './industries';
import type { ComparisonData } from './comparisons';
import type { GlossaryTerm } from './glossary';

const SITE_URL = 'https://ai.rio.br';

/**
 * Generate Service schema for Persona pages
 * Combines base service with industry context
 */
export function generatePersonaServiceSchema(
  serviceId: 'stripe-meter' | 'payment-recovery' | 'llm-tracking',
  industry: IndustryData,
  locale: Locale = 'en'
): ServiceSchema {
  const organization = generateOrganizationSchema(locale);

  const serviceNames = {
    'stripe-meter': {
      en: `Stripe Meter Implementation for ${industry.name}`,
      es: `Implementación de Stripe Meter para ${industry.name}`,
      pt: `Implementação do Stripe Meter para ${industry.name}`,
    },
    'payment-recovery': {
      en: `Failed Payment Recovery for ${industry.name}`,
      es: `Recuperación de Pagos Fallidos para ${industry.name}`,
      pt: `Recuperação de Pagamentos Falhados para ${industry.name}`,
    },
    'llm-tracking': {
      en: `LLM Cost Tracking for ${industry.name}`,
      es: `Seguimiento de Costos de LLM para ${industry.name}`,
      pt: `Rastreamento de Custos de LLM para ${industry.name}`,
    },
  };

  const descriptions = {
    'stripe-meter': {
      en: `Stripe Meter implementation for ${industry.name} companies. ${industry.description}. Delivered in 10-14 days with production-tested patterns.`,
      es: `Implementación de Stripe Meter para empresas de ${industry.name}. Entregado en 10-14 días con patrones probados en producción.`,
      pt: `Implementação do Stripe Meter para empresas de ${industry.name}. Entregue em 10-14 dias com padrões testados em produção.`,
    },
    'payment-recovery': {
      en: `Failed payment recovery for ${industry.name} companies. Recover 65-70% of failed payments with advanced dunning workflows. Delivered in 7-10 days.`,
      es: `Recuperación de pagos fallidos para empresas de ${industry.name}. Recupera el 65-70% con flujos de trabajo avanzados. Entregado en 7-10 días.`,
      pt: `Recuperação de pagamentos falhados para empresas de ${industry.name}. Recupere 65-70% com fluxos avançados. Entregue em 7-10 dias.`,
    },
    'llm-tracking': {
      en: `LLM cost tracking for ${industry.name} companies. Track token usage and costs per customer across OpenAI, Anthropic, and 400+ models.`,
      es: `Seguimiento de costos de LLM para empresas de ${industry.name}. Rastrea el uso de tokens y costos por cliente.`,
      pt: `Rastreamento de custos de LLM para empresas de ${industry.name}. Rastreie uso de tokens e custos por cliente.`,
    },
  };

  const prices = {
    'stripe-meter': '$3,997',
    'payment-recovery': '$2,997',
    'llm-tracking': '$4,997',
  };

  const paths = {
    'stripe-meter': `/services/stripe-meter/for-${industry.slug}`,
    'payment-recovery': `/services/payment-recovery/for-${industry.slug}`,
    'llm-tracking': `/services/llm-tracking/for-${industry.slug}`,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceNames[serviceId][locale],
    description: descriptions[serviceId][locale],
    provider: {
      '@type': 'LocalBusiness',
      name: organization.name,
      url: organization.url,
    },
    url: `${SITE_URL}${locale === 'en' ? paths[serviceId] : `/${locale}${paths[serviceId]}`}`,
    offers: {
      '@type': 'Offer',
      name: serviceNames[serviceId][locale],
      description: descriptions[serviceId][locale],
      price: prices[serviceId],
      priceCurrency: 'USD',
    },
    areaServed: organization.areaServed,
  };
}

/**
 * Generate breadcrumb schema for Persona pages
 */
export function generatePersonaBreadcrumbSchema(
  serviceId: 'stripe-meter' | 'payment-recovery' | 'llm-tracking',
  industry: IndustryData,
  locale: Locale = 'en'
): BreadcrumbSchema {
  const serviceNames = {
    'stripe-meter': { en: 'Stripe Meter', es: 'Stripe Meter', pt: 'Stripe Meter' },
    'payment-recovery': { en: 'Payment Recovery', es: 'Recuperación de Pagos', pt: 'Recuperação de Pagamentos' },
    'llm-tracking': { en: 'LLM Cost Tracking', es: 'Seguimiento de LLM', pt: 'Rastreamento de LLM' },
  };

  const forIndustry = {
    en: `for ${industry.name}`,
    es: `para ${industry.name}`,
    pt: `para ${industry.name}`,
  };

  const path = `/services/${serviceId}/for-${industry.slug}`;

  return generateBreadcrumbSchema(
    [
      { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
      { name: { en: 'Services', es: 'Servicios', pt: 'Serviços' }, path: '/services' },
      { name: serviceNames[serviceId], path: `/services/${serviceId}` },
      { name: forIndustry, path },
    ],
    locale
  );
}

/**
 * Generate FAQ schema for Persona pages (industry-specific FAQs)
 */
export function generatePersonaFAQSchema(
  serviceId: 'stripe-meter' | 'payment-recovery' | 'llm-tracking',
  industry: IndustryData,
  locale: Locale = 'en'
): FAQSchema {
  const commonFAQs = {
    'stripe-meter': [
      {
        question: {
          en: `How long does Stripe Meter implementation take for ${industry.name} companies?`,
          es: `¿Cuánto tiempo toma la implementación de Stripe Meter para empresas de ${industry.name}?`,
          pt: `Quanto tempo leva a implementação do Stripe Meter para empresas de ${industry.name}?`,
        },
        answer: {
          en: `Typically 10-14 days for ${industry.name} companies. The timeline accounts for industry-specific integrations like ${industry.integrations.slice(0, 3).join(', ')}.`,
          es: `Típicamente 10-14 días para empresas de ${industry.name}. El cronograma incluye integraciones específicas de la industria.`,
          pt: `Normalmente 10-14 dias para empresas de ${industry.name}. O cronograma inclui integrações específicas da indústria.`,
        },
      },
      {
        question: {
          en: `What makes Stripe Meter implementation different for ${industry.name}?`,
          es: `¿Qué hace diferente la implementación de Stripe Meter para ${industry.name}?`,
          pt: `O que torna a implementação do Stripe Meter diferente para ${industry.name}?`,
        },
        answer: {
          en: `${industry.name} companies have unique billing needs: ${industry.painPoints.slice(0, 2).join(' and ')}. We configure Stripe Meter to handle these specific requirements.`,
          es: `Las empresas de ${industry.name} tienen necesidades únicas: ${industry.painPoints.slice(0, 2).join(' y ')}.`,
          pt: `Empresas de ${industry.name} têm necessidades únicas: ${industry.painPoints.slice(0, 2).join(' e ')}.`,
        },
      },
      {
        question: {
          en: `How much does Stripe Meter implementation cost for ${industry.name} companies?`,
          es: `¿Cuánto cuesta la implementación de Stripe Meter para empresas de ${industry.name}?`,
          pt: `Quanto custa a implementação do Stripe Meter para empresas de ${industry.name}?`,
        },
        answer: {
          en: `Fixed price of $3,997 for ${industry.name} companies. This includes all configuration, testing, and handoff. No ongoing fees or vendor lock-in.`,
          es: `Precio fijo de $3,997 para empresas de ${industry.name}. Incluye toda la configuración y pruebas.`,
          pt: `Preço fixo de $3,997 para empresas de ${industry.name}. Inclui toda configuração e testes.`,
        },
      },
    ],
    'payment-recovery': [
      {
        question: {
          en: `What payment recovery rate can ${industry.name} companies expect?`,
          es: `¿Qué tasa de recuperación pueden esperar las empresas de ${industry.name}?`,
          pt: `Que taxa de recuperação as empresas de ${industry.name} podem esperar?`,
        },
        answer: {
          en: `65-70% recovery rate for ${industry.name} companies, compared to 41% with Stripe's basic smart retries. This means recovering an additional $29K per $100K in failed payments.`,
          es: `Tasa de recuperación del 65-70% para empresas de ${industry.name}, comparado con el 41% básico de Stripe.`,
          pt: `Taxa de recuperação de 65-70% para empresas de ${industry.name}, comparado a 41% básico do Stripe.`,
        },
      },
      {
        question: {
          en: `How does payment recovery work for ${industry.name} companies specifically?`,
          es: `¿Cómo funciona la recuperación de pagos específicamente para empresas de ${industry.name}?`,
          pt: `Como funciona a recuperação de pagamentos especificamente para empresas de ${industry.name}?`,
        },
        answer: {
          en: `We configure industry-specific dunning workflows for ${industry.name}, considering factors like ${industry.painPoints.slice(0, 2).join(' and ')}.`,
          es: `Configuramos flujos de trabajo específicos para ${industry.name}, considerando ${industry.painPoints.slice(0, 2).join(' y ')}.`,
          pt: `Configuramos fluxos específicos para ${industry.name}, considerando ${industry.painPoints.slice(0, 2).join(' e ')}.`,
        },
      },
      {
        question: {
          en: `How long does failed payment recovery setup take for ${industry.name} companies?`,
          es: `¿Cuánto tiempo toma la configuración para empresas de ${industry.name}?`,
          pt: `Quanto tempo leva a configuração para empresas de ${industry.name}?`,
        },
        answer: {
          en: `7-10 days for ${industry.name} companies. We handle all configuration, email templates, and testing before handoff.`,
          es: `7-10 días para empresas de ${industry.name}. Manejamos toda la configuración y plantillas de correo.`,
          pt: `7-10 dias para empresas de ${industry.name}. Lidamos com toda configuração e modelos de email.`,
        },
      },
    ],
    'llm-tracking': [
      {
        question: {
          en: `Which LLM providers can ${industry.name} companies track?`,
          es: `¿Qué proveedores de LLM pueden rastrear las empresas de ${industry.name}?`,
          pt: `Quais provedores de LLM as empresas de ${industry.name} podem rastrear?`,
        },
        answer: {
          en: `OpenAI, Anthropic, OpenRouter (400+ models), and more. We set up tracking for all providers your ${industry.name} company uses.`,
          es: `OpenAI, Anthropic, OpenRouter (400+ modelos) y más. Configuramos el seguimiento para todos los proveedores.`,
          pt: `OpenAI, Anthropic, OpenRouter (400+ modelos) e mais. Configuramos rastreamento para todos os provedores.`,
        },
      },
      {
        question: {
          en: `How does LLM cost tracking work for ${industry.name} companies?`,
          es: `¿Cómo funciona el seguimiento de costos de LLM para empresas de ${industry.name}?`,
          pt: `Como funciona o rastreamento de custos de LLM para empresas de ${industry.name}?`,
        },
        answer: {
          en: `We implement token attribution that maps LLM usage to specific customers. This is essential for ${industry.name} companies where ${industry.painPoints[0]}.`,
          es: `Implementamos atribución de tokens que mapea el uso a clientes específicos. Esencial para ${industry.name}.`,
          pt: `Implementamos atribuição de tokens que mapeia o uso a clientes específicos. Essencial para ${industry.name}.`,
        },
      },
      {
        question: {
          en: `What's the cost for LLM tracking setup for ${industry.name} companies?`,
          es: `¿Cuál es el costo para configurar el seguimiento de LLM para ${industry.name}?`,
          pt: `Qual é o custo para configurar o rastreamento de LLM para ${industry.name}?`,
        },
        answer: {
          en: `Fixed price of $4,997 for ${industry.name} companies. Includes multi-provider setup, attribution logic, and dashboard configuration.`,
          es: `Precio fijo de $4,997 para empresas de ${industry.name}. Incluye configuración multiproveedor y lógica de atribución.`,
          pt: `Preço fixo de $4,997 para empresas de ${industry.name}. Inclui configuração multiprovedor e lógica de atribuição.`,
        },
      },
    ],
  };

  return generateFAQSchema(commonFAQs[serviceId], locale);
}

/**
 * Generate Article schema for Comparison pages
 */
export function generateComparisonArticleSchema(
  comparison: ComparisonData,
  locale: Locale = 'en'
) {
  const titles = {
    en: `Ai.Rio vs ${comparison.name}: Which is Right for You?`,
    es: `Ai.Rio vs ${comparison.name}: ¿Cuál es adecuado para ti?`,
    pt: `Ai.Rio vs ${comparison.name}: Qual é certo para você?`,
  };

  const descriptions = {
    en: `Compare Ai.Rio vs ${comparison.name}. ${comparison.description}. Learn when to choose each option with detailed cost, timeline, and feature comparisons.`,
    es: `Compara Ai.Rio vs ${comparison.name}. Aprende cuándo elegir cada opción con comparaciones detalladas.`,
    pt: `Compare Ai.Rio vs ${comparison.name}. Aprenda quando escolher cada opção com comparações detalhadas.`,
  };

  const path = `/compare/${comparison.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titles[locale],
    description: descriptions[locale],
    author: {
      '@type': 'Organization',
      name: 'Ai.Rio',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ai.Rio',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    url: `${SITE_URL}${locale === 'en' ? path : `/${locale}${path}`}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${locale === 'en' ? path : `/${locale}${path}`}`,
    },
    datePublished: '2025-02-11',
    dateModified: '2025-02-11',
    inLanguage: locale,
  };
}

/**
 * Generate breadcrumb schema for Comparison pages
 */
export function generateComparisonBreadcrumbSchema(
  comparison: ComparisonData,
  locale: Locale = 'en'
): BreadcrumbSchema {
  const path = `/compare/${comparison.slug}`;

  return generateBreadcrumbSchema(
    [
      { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
      { name: { en: 'Compare', es: 'Comparar', pt: 'Comparar' }, path: '/compare' },
      { name: { en: comparison.name, es: comparison.name, pt: comparison.name }, path },
    ],
    locale
  );
}

/**
 * Generate FAQ schema for Comparison pages
 */
export function generateComparisonFAQSchema(
  comparison: ComparisonData,
  locale: Locale = 'en'
): FAQSchema {
  const faqs = [
    {
      question: {
        en: `When should I choose ${comparison.name} over Ai.Rio?`,
        es: `¿Cuándo debería elegir ${comparison.name} en lugar de Ai.Rio?`,
        pt: `Quando devo escolher ${comparison.name} em vez de Ai.Rio?`,
      },
      answer: {
        en: comparison.whenToChooseAlternative.slice(0, 3).join(' '),
        es: comparison.whenToChooseAlternative.slice(0, 3).join(' '),
        pt: comparison.whenToChooseAlternative.slice(0, 3).join(' '),
      },
    },
    {
      question: {
        en: `When should I choose Ai.Rio over ${comparison.name}?`,
        es: `¿Cuándo debería elegir Ai.Rio en lugar de ${comparison.name}?`,
        pt: `Quando devo escolher Ai.Rio em vez de ${comparison.name}?`,
      },
      answer: {
        en: comparison.whenToChooseAiRio.slice(0, 3).join(' '),
        es: comparison.whenToChooseAiRio.slice(0, 3).join(' '),
        pt: comparison.whenToChooseAiRio.slice(0, 3).join(' '),
      },
    },
    {
      question: {
        en: `How do the costs compare between Ai.Rio and ${comparison.name}?`,
        es: `¿Cómo se comparan los costos entre Ai.Rio y ${comparison.name}?`,
        pt: `Como os custos se comparam entre Ai.Rio e ${comparison.name}?`,
      },
      answer: {
        en: `${comparison.name}: ${comparison.costComparison.alternative}. Ai.Rio: ${comparison.costComparison.aiRio}.`,
        es: `${comparison.name}: ${comparison.costComparison.alternative}. Ai.Rio: ${comparison.costComparison.aiRio}.`,
        pt: `${comparison.name}: ${comparison.costComparison.alternative}. Ai.Rio: ${comparison.costComparison.aiRio}.`,
      },
    },
  ];

  return generateFAQSchema(faqs, locale);
}

/**
 * Generate DefinedTerm schema for Glossary pages
 */
export function generateGlossaryDefinedTermSchema(
  term: GlossaryTerm,
  locale: Locale = 'en'
) {
  const path = `/glossary/${term.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.name,
    description: term.definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Ai.Rio Billing Infrastructure Glossary',
      url: `${SITE_URL}/glossary`,
    },
    url: `${SITE_URL}${locale === 'en' ? path : `/${locale}${path}`}`,
  };
}

/**
 * Generate breadcrumb schema for Glossary pages
 */
export function generateGlossaryBreadcrumbSchema(
  term: GlossaryTerm,
  locale: Locale = 'en'
): BreadcrumbSchema {
  const path = `/glossary/${term.slug}`;

  return generateBreadcrumbSchema(
    [
      { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
      { name: { en: 'Glossary', es: 'Glosario', pt: 'Glossário' }, path: '/glossary' },
      { name: { en: term.name, es: term.name, pt: term.name }, path },
    ],
    locale
  );
}

/**
 * Generate FAQ schema for Glossary pages
 */
export function generateGlossaryFAQSchema(
  term: GlossaryTerm,
  locale: Locale = 'en'
): FAQSchema {
  const faqs = [
    {
      question: {
        en: `What is ${term.name}?`,
        es: `¿Qué es ${term.name}?`,
        pt: `O que é ${term.name}?`,
      },
      answer: {
        en: term.definition,
        es: term.definition,
        pt: term.definition,
      },
    },
    {
      question: {
        en: `Why does ${term.name} matter for SaaS companies?`,
        es: `¿Por qué ${term.name} es importante para empresas SaaS?`,
        pt: `Por que ${term.name} é importante para empresas SaaS?`,
      },
      answer: {
        en: term.whyItMatters,
        es: term.whyItMatters,
        pt: term.whyItMatters,
      },
    },
    {
      question: {
        en: `What are common mistakes with ${term.name}?`,
        es: `¿Cuáles son errores comunes con ${term.name}?`,
        pt: `Quais são erros comuns com ${term.name}?`,
      },
      answer: {
        en: term.commonMistakes.slice(0, 3).join('. '),
        es: term.commonMistakes.slice(0, 3).join('. '),
        pt: term.commonMistakes.slice(0, 3).join('. '),
      },
    },
  ];

  return generateFAQSchema(faqs, locale);
}
