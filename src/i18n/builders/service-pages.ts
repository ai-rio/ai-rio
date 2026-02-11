/**
 * Service Page Builders
 *
 * Helper functions to build typed arrays for service page components
 * from translation data. These builders ensure type safety between
 * translation JSON files and component props.
 *
 * @example
 * ```tsx
 * import { useTranslations } from 'next-intl';
 * import { buildProblems, buildFeatures, buildMetrics, buildFAQs } from '@/i18n/builders/service-pages';
 *
 * function ServicePage() {
 *   const t = useTranslations('services.paymentRecovery');
 *
 *   const problems = buildProblems(t.raw('problems'));
 *   const features = buildFeatures(t.raw('features'));
 *   const metrics = buildMetrics(t.raw('metrics'));
 *   const faqs = buildFAQs(t.raw('faqs'));
 *
 *   return <ProblemSection problems={problems} />;
 * }
 * ```
 */

import type {
  ProblemPoint,
  FeatureItem,
  Metric,
  FAQItem,
  PhaseDeliverables,
  CustomerProfile,
  RelatedService,
  Deliverable,
  DashboardView,
} from '../../components/service-sections';

/**
 * Translation data shapes - these should match the structure in JSON files
 */
export interface ProblemPointData {
  id: string;
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  metric?: string;
}

export interface FeatureItemData {
  id: string;
  title: string;
  description: string;
  icon?: string; // Icon name - will be mapped to React component in page
  badge?: string;
  highlighted?: boolean;
}

export interface MetricData {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description?: string;
  progress?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface DeliverableData {
  id: string;
  title: string;
  description: string;
  status?: 'pending' | 'in-progress' | 'completed';
  deliveryWeek: string;
}

export interface PhaseDeliverablesData {
  phase: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  deliverables: DeliverableData[];
}

export interface MRRRange {
  min: number;
  max: number;
}

export interface CustomerProfileData {
  id: string;
  name: string;
  initials: string;
  stage: string;
  mrr: MRRRange;
  description: string;
  painPoints: string[];
}

export interface RelatedServiceData {
  id: string;
  title: string;
  description: string;
  href: string;
  badge?: string;
}

export interface DashboardViewData {
  id: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  device: string; // Will be cast to 'desktop' | 'tablet' | 'mobile'
  badge?: string;
}

/**
 * Build ProblemPoint[] from translation data
 * @param rawData - Raw translation array or object
 * @returns Typed ProblemPoint array
 */
export function buildProblems(rawData: unknown): ProblemPoint[] {
  if (!Array.isArray(rawData)) {
    console.warn('[buildProblems] Expected array, got:', typeof rawData);
    return [];
  }

  return rawData.filter((item): item is ProblemPointData => {
    return (
      typeof item === 'object' &&
      item !== null &&
      'id' in item &&
      'title' in item &&
      'description' in item
    );
  }).map((item): ProblemPoint => ({
    id: item.id,
    title: item.title,
    description: item.description,
    severity: item.severity ?? 'medium',
    metric: item.metric,
  }));
}

/**
 * Build FeatureItemData[] from translation data (raw type with string icons)
 * @param rawData - Raw translation array or object
 * @returns Typed FeatureItemData array
 */
export function buildFeaturesData(rawData: unknown): FeatureItemData[] {
  if (!Array.isArray(rawData)) {
    console.warn('[buildFeaturesData] Expected array, got:', typeof rawData);
    return [];
  }

  return rawData.filter((item): item is FeatureItemData => {
    return (
      typeof item === 'object' &&
      item !== null &&
      'id' in item &&
      'title' in item &&
      'description' in item
    );
  });
}

/**
 * Build FeatureItem[] from translation data
 * @param rawData - Raw translation array or object
 * @returns Typed FeatureItem array
 */
export function buildFeatures(rawData: unknown): FeatureItem[] {
  const items = buildFeaturesData(rawData);
  return items.map((item): FeatureItem => ({
    id: item.id,
    title: item.title,
    description: item.description,
    icon: item.icon,
    badge: item.badge,
    highlighted: item.highlighted ?? false,
  }));
}

/**
 * Build Metric[] from translation data
 * @param rawData - Raw translation array or object
 * @returns Typed Metric array
 */
export function buildMetrics(rawData: unknown): Metric[] {
  if (!Array.isArray(rawData)) {
    console.warn('[buildMetrics] Expected array, got:', typeof rawData);
    return [];
  }

  return rawData.filter((item): item is MetricData => {
    return (
      typeof item === 'object' &&
      item !== null &&
      'id' in item &&
      'label' in item &&
      'value' in item &&
      typeof item.value === 'number'
    );
  }).map((item): Metric => ({
    id: item.id,
    label: item.label,
    value: item.value,
    suffix: item.suffix,
    prefix: item.prefix,
    description: item.description,
    progress: item.progress,
    trend: item.trend,
  }));
}

/**
 * Build FAQItem[] from translation data
 * @param rawData - Raw translation array or object
 * @returns Typed FAQItem array
 */
export function buildFAQs(rawData: unknown): FAQItem[] {
  if (!Array.isArray(rawData)) {
    console.warn('[buildFAQs] Expected array, got:', typeof rawData);
    return [];
  }

  return rawData.filter((item): item is FAQItemData => {
    return (
      typeof item === 'object' &&
      item !== null &&
      'id' in item &&
      'question' in item &&
      'answer' in item
    );
  }).map((item): FAQItem => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
    category: item.category,
  }));
}

/**
 * Type guard for checking if data exists in translations
 * @param data - Raw translation data
 * @returns True if data is a non-null object/array
 */
export function hasTranslationData(data: unknown): boolean {
  return data !== null && data !== undefined && (typeof data === 'object' || Array.isArray(data));
}

/**
 * Safe getter for nested translation properties
 * @param obj - Translation object
 * @param path - Dot-notation path (e.g., 'services.paymentRecovery.problems')
 * @returns The value at path or undefined
 */
export function getTranslationProperty<T = unknown>(obj: unknown, path: string): T | undefined {
  if (typeof obj !== 'object' || obj === null) {
    return undefined;
  }

  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (typeof current !== 'object' || current === null || !(key in current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return current as T;
}

/**
 * Build PhaseDeliverables[] from translation data
 * @param rawData - Raw translation array or object
 * @returns Typed PhaseDeliverables array
 */
export function buildPhases(rawData: unknown): PhaseDeliverables[] {
  if (!Array.isArray(rawData)) {
    console.warn('[buildPhases] Expected array, got:', typeof rawData);
    return [];
  }

  return rawData.filter((item): item is PhaseDeliverablesData => {
    return (
      typeof item === 'object' &&
      item !== null &&
      ('phase' in item && 'title' in item && 'deliverables' in item)
    );
  }).map((item): PhaseDeliverables => ({
    phase: item.phase,
    title: item.title,
    description: item.description,
    duration: item.duration,
    price: item.price,
    deliverables: Array.isArray(item.deliverables) ? item.deliverables.map((d): Deliverable => ({
      id: d.id,
      title: d.title,
      description: d.description,
      status: d.status ?? 'pending',
      deliveryWeek: d.deliveryWeek,
    })) : [],
  }));
}

/**
 * Build CustomerProfile[] from translation data
 * @param rawData - Raw translation array or object
 * @returns Typed CustomerProfile array
 */
export function buildProfiles(rawData: unknown): CustomerProfile[] {
  if (!Array.isArray(rawData)) {
    console.warn('[buildProfiles] Expected array, got:', typeof rawData);
    return [];
  }

  return rawData.filter((item): item is CustomerProfileData => {
    return (
      typeof item === 'object' &&
      item !== null &&
      'id' in item &&
      'name' in item &&
      'initials' in item &&
      'mrr' in item &&
      'painPoints' in item
    );
  }).map((item): CustomerProfile => ({
    id: item.id,
    name: item.name,
    initials: item.initials,
    stage: item.stage,
    mrr: item.mrr,
    description: item.description,
    painPoints: Array.isArray(item.painPoints) ? item.painPoints : [],
  }));
}

/**
 * Build RelatedService[] from translation data
 * @param rawData - Raw translation array or object
 * @returns Typed RelatedService array
 */
export function buildRelatedServices(rawData: unknown): RelatedService[] {
  if (!Array.isArray(rawData)) {
    console.warn('[buildRelatedServices] Expected array, got:', typeof rawData);
    return [];
  }

  return rawData.filter((item): item is RelatedServiceData => {
    return (
      typeof item === 'object' &&
      item !== null &&
      'id' in item &&
      'title' in item &&
      'href' in item
    );
  }).map((item): RelatedService => ({
    id: item.id,
    title: item.title,
    description: item.description,
    href: item.href,
    badge: item.badge,
  }));
}

/**
 * Build DashboardView[] from translation data
 * @param rawData - Raw translation array or object
 * @returns Typed DashboardView array with proper device type casting
 */
export function buildDashboardViews(rawData: unknown): DashboardView[] {
  if (!Array.isArray(rawData)) {
    console.warn('[buildDashboardViews] Expected array, got:', typeof rawData);
    return [];
  }

  const validDevices = ['desktop', 'tablet', 'mobile'] as const;
  type ValidDevice = typeof validDevices[number];

  return rawData.filter((item): item is DashboardViewData => {
    return (
      typeof item === 'object' &&
      item !== null &&
      'id' in item &&
      'title' in item &&
      'imageSrc' in item &&
      'imageAlt' in item &&
      'device' in item
    );
  }).map((item): DashboardView => ({
    id: item.id,
    title: item.title,
    description: item.description,
    imageSrc: item.imageSrc,
    imageAlt: item.imageAlt,
    device: validDevices.includes(item.device as ValidDevice)
      ? (item.device as ValidDevice)
      : 'desktop',
    badge: item.badge,
  }));
}
