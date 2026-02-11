/**
 * Schema.org Markup Generation for Ai.Rio
 * ========================================
 *
 * Generates JSON-LD structured data for:
 * - LocalBusiness / Organization schema
 * - Service schema
 * - BreadcrumbList schema
 * - WebSite schema
 *
 * Validates with: https://validator.schema.org/
 */

import type { Locale } from './base-metadata';

const SITE_URL = 'https://ai.rio.br';

/**
 * Organization/LocalBusiness Schema
 * Used for homepage and about pages
 */
export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    '@type': string;
    telephone?: string;
    email: string;
    contactType: string;
    availableLanguage?: string[];
  };
  priceRange?: string;
  areaServed?: string[];
}

/**
 * Generate Organization/LocalBusiness schema
 *
 * @param locale - Current locale
 * @returns JSON-LD Organization schema
 */
export function generateOrganizationSchema(locale: Locale = 'en'): OrganizationSchema {
  const descriptions: Record<Locale, string> = {
    en: 'Billing infrastructure specialist for AI SaaS companies. We help track and optimize LLM costs, implement usage-based pricing, and recover failed payments.',
    es: 'Especialista en infraestructura de facturación para empresas de SaaS de IA. Ayudamos a rastrear y optimizar costos de LLM, implementar precios basados en uso y recuperar pagos fallidos.',
    pt: 'Especialista em infraestrutura de cobrança para empresas de SaaS de IA. Ajudamos a rastrear e otimizar custos de LLM, implementar preços baseados em uso e recuperar pagamentos falhados.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ai.Rio',
    description: descriptions[locale],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://twitter.com/airio_br',
      'https://linkedin.com/company/ai-rio',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@ai.rio',
      contactType: 'sales',
      availableLanguage: ['English', 'Spanish', 'Portuguese'],
    },
    priceRange: '$$$',
    areaServed: ['US', 'GB', 'ES', 'PT', 'BR', 'MX', 'AR', 'CO', 'CL'],
  };
}

/**
 * Service Schema
 * Used for individual service pages
 */
export interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
    url: string;
  };
  url: string;
  offers?: {
    '@type': string;
    name: string;
    description?: string;
    price: string;
    priceCurrency: string;
  };
  areaServed?: string[];
}

/**
 * Service configuration for schema generation
 */
export interface ServiceConfig {
  id: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  price: string;
  path: string;
}

/**
 * Predefined service configurations
 */
export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  paymentRecovery: {
    id: 'payment-recovery',
    name: {
      en: 'Stripe Failed Payment Recovery',
      es: 'Recuperación de Pagos Fallidos de Stripe',
      pt: 'Recuperação de Pagamentos Falhados do Stripe',
    },
    description: {
      en: 'Recover 65-70% of failed payments with automated dunning workflows. Fixed price, delivered in 7-10 days.',
      es: 'Recupera el 65-70% de los pagos fallidos con flujos de trabajo de dunning automatizados. Precio fijo, entregado en 7-10 días.',
      pt: 'Recupere 65-70% dos pagamentos falhados com fluxos de trabalho de dunning automatizados. Preço fixo, entregue em 7-10 dias.',
    },
    price: '$2,997',
    path: '/services/payment-recovery',
  },
  usagePricing: {
    id: 'usage-pricing',
    name: {
      en: 'Usage-Based Pricing Implementation',
      es: 'Implementación de Precios Basados en Uso',
      pt: 'Implementação de Preços Baseados em Uso',
    },
    description: {
      en: 'Launch Stripe Meter in 2 weeks. Companies with usage-based pricing grow 54% faster.',
      es: 'Lanza Stripe Meter en 2 semanas. Las empresas con precios basados en uso crecen 54% más rápido.',
      pt: 'Lance o Stripe Meter em 2 semanas. Empresas com preços baseados em uso crescem 54% mais rápido.',
    },
    price: '$3,997',
    path: '/services/usage-pricing',
  },
  aiTracking: {
    id: 'ai-tracking',
    name: {
      en: 'AI Cost Tracking System',
      es: 'Sistema de Seguimiento de Costos de IA',
      pt: 'Sistema de Rastreamento de Custos de IA',
    },
    description: {
      en: 'Track LLM costs per customer across OpenAI, Anthropic, and OpenRouter (400+ models).',
      es: 'Rastrea los costos de LLM por cliente a través de OpenAI, Anthropic y OpenRouter (400+ modelos).',
      pt: 'Rastreie custos de LLM por cliente através de OpenAI, Anthropic e OpenRouter (400+ modelos).',
    },
    price: '$4,997',
    path: '/services/ai-tracking',
  },
  billingAudit: {
    id: 'billing-audit',
    name: {
      en: 'Billing Audit & Revenue Leak Detection',
      es: 'Auditoría de Facturación y Detección de Fugas',
      pt: 'Auditoria de Cobrança e Detecção de Vazamentos',
    },
    description: {
      en: 'Complete billing audit to identify revenue leaks and optimization opportunities.',
      es: 'Auditoría completa de facturación para identificar fugas de ingresos y oportunidades de optimización.',
      pt: 'Auditoria completa de cobrança para identificar vazamentos de receita e oportunidades de otimização.',
    },
    price: '$1,997',
    path: '/services/billing-audit',
  },
  completeBilling: {
    id: 'complete-billing',
    name: {
      en: 'Complete Billing Infrastructure',
      es: 'Infraestructura de Facturación Completa',
      pt: 'Infraestrutura de Cobrança Completa',
    },
    description: {
      en: 'End-to-end billing infrastructure for AI SaaS. All services included with 90-day guarantee.',
      es: 'Infraestructura de facturación de extremo a extremo para SaaS de IA. Todos los servicios incluidos con garantía de 90 días.',
      pt: 'Infraestrutura de cobrança de ponta a ponta para SaaS de IA. Todos os serviços incluídos com garantia de 90 dias.',
    },
    price: '$11,997',
    path: '/services/complete-billing',
  },
  billingInfrastructure: {
    id: 'billing-infrastructure',
    name: {
      en: 'Billing Infrastructure Service',
      es: 'Servicio de Infraestructura de Facturación',
      pt: 'Serviço de Infraestrutura de Cobrança',
    },
    description: {
      en: 'Complete billing infrastructure for AI SaaS. Usage pricing, payment recovery, cost tracking.',
      es: 'Infraestructura de facturación completa para SaaS de IA. Precios de uso, recuperación de pagos, seguimiento de costos.',
      pt: 'Infraestrutura de cobrança completa para SaaS de IA. Preços de uso, recuperação de pagamentos, rastreamento de custos.',
    },
    price: '$11,000-15,000',
    path: '/services/billing-infrastructure',
  },
};

/**
 * Generate Service schema
 *
 * @param serviceId - Service identifier from SERVICE_CONFIGS
 * @param locale - Current locale
 * @returns JSON-LD Service schema
 */
export function generateServiceSchema(
  serviceId: string,
  locale: Locale = 'en'
): ServiceSchema | null {
  const config = SERVICE_CONFIGS[serviceId];
  if (!config) return null;

  const path = locale === 'en' ? config.path : `/${locale}${config.path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: config.name[locale],
    description: config.description[locale],
    provider: {
      '@type': 'LocalBusiness',
      name: 'Ai.Rio',
      url: SITE_URL,
    },
    url: `${SITE_URL}${path}`,
    offers: {
      '@type': 'Offer',
      name: config.name[locale],
      description: config.description[locale],
      price: config.price,
      priceCurrency: 'USD',
    },
    areaServed: ['US', 'GB', 'ES', 'PT', 'BR', 'MX', 'AR', 'CO', 'CL'],
  };
}

/**
 * BreadcrumbList Schema
 * Used for navigation and SEO
 */
export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  '@type': string;
  position: number;
  name: string;
  item: string;
}

/**
 * Breadcrumb item configuration
 */
export interface BreadcrumbConfig {
  name: Record<Locale, string>;
  path: string;
}

/**
 * Generate BreadcrumbList schema
 *
 * @param breadcrumbs - Array of breadcrumb items
 * @param locale - Current locale
 * @returns JSON-LD BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  breadcrumbs: BreadcrumbConfig[],
  locale: Locale = 'en'
): BreadcrumbSchema {
  const itemListElement: BreadcrumbItem[] = breadcrumbs.map((crumb, index) => {
    const path = locale === 'en' ? crumb.path : `/${locale}${crumb.path}`;
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name[locale],
      item: `${SITE_URL}${path}`,
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

/**
 * Predefined breadcrumb structures
 */
export const BREADCRUMBS = {
  home: [
    { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
  ],
  services: [
    { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
    { name: { en: 'Services', es: 'Servicios', pt: 'Serviços' }, path: '/services' },
  ],
  paymentRecovery: [
    { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
    { name: { en: 'Services', es: 'Servicios', pt: 'Serviços' }, path: '/services' },
    { name: { en: 'Payment Recovery', es: 'Recuperación de Pagos', pt: 'Recuperação de Pagamentos' }, path: '/services/payment-recovery' },
  ],
  usagePricing: [
    { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
    { name: { en: 'Services', es: 'Servicios', pt: 'Serviços' }, path: '/services' },
    { name: { en: 'Usage Pricing', es: 'Precios por Uso', pt: 'Preços por Uso' }, path: '/services/usage-pricing' },
  ],
  aiTracking: [
    { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
    { name: { en: 'Services', es: 'Servicios', pt: 'Serviços' }, path: '/services' },
    { name: { en: 'AI Tracking', es: 'Seguimiento de IA', pt: 'Rastreamento de IA' }, path: '/services/ai-tracking' },
  ],
  billingAudit: [
    { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
    { name: { en: 'Services', es: 'Servicios', pt: 'Serviços' }, path: '/services' },
    { name: { en: 'Billing Audit', es: 'Auditoría de Facturación', pt: 'Auditoria de Cobrança' }, path: '/services/billing-audit' },
  ],
  completeBilling: [
    { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
    { name: { en: 'Services', es: 'Servicios', pt: 'Serviços' }, path: '/services' },
    { name: { en: 'Complete Billing', es: 'Facturación Completa', pt: 'Cobrança Completa' }, path: '/services/complete-billing' },
  ],
  billingInfrastructure: [
    { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
    { name: { en: 'Services', es: 'Servicios', pt: 'Serviços' }, path: '/services' },
    { name: { en: 'Billing Infrastructure', es: 'Infraestructura de Facturación', pt: 'Infraestrutura de Cobrança' }, path: '/services/billing-infrastructure' },
  ],
  about: [
    { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
    { name: { en: 'About', es: 'Sobre Nosotros', pt: 'Sobre' }, path: '/about' },
  ],
  contact: [
    { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
    { name: { en: 'Contact', es: 'Contacto', pt: 'Contato' }, path: '/contact' },
  ],
  blog: [
    { name: { en: 'Home', es: 'Inicio', pt: 'Início' }, path: '/' },
    { name: { en: 'Blog', es: 'Blog', pt: 'Blog' }, path: '/blog' },
  ],
};

/**
 * WebSite Schema
 * Basic site information
 */
export interface WebSiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    '@type': string;
    target: string;
    'query-input'?: string;
  };
}

/**
 * Generate WebSite schema with search action
 *
 * @param locale - Current locale
 * @returns JSON-LD WebSite schema
 */
export function generateWebSiteSchema(locale: Locale = 'en'): WebSiteSchema {
  const descriptions: Record<Locale, string> = {
    en: 'Billing infrastructure services for AI SaaS companies. Track LLM costs, implement usage-based pricing, and recover failed payments.',
    es: 'Servicios de infraestructura de facturación para empresas de SaaS de IA. Rastree costos de LLM, implemente precios basados en uso y recupere pagos fallidos.',
    pt: 'Serviços de infraestrutura de cobrança para empresas de SaaS de IA. Rastreie custos de LLM, implemente preços baseados em uso e recupere pagamentos falhados.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ai.Rio',
    url: SITE_URL,
    description: descriptions[locale],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * FAQPage Schema
 * For FAQ sections
 */
export interface FAQItem {
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

export interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: {
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }[];
}

/**
 * Generate FAQPage schema
 *
 * @param faqs - Array of FAQ items
 * @param locale - Current locale
 * @returns JSON-LD FAQPage schema
 */
export function generateFAQSchema(faqs: FAQItem[], locale: Locale = 'en'): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question[locale],
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer[locale],
      },
    })),
  };
}
