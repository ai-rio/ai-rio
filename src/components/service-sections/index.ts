/**
 * Service Sections Components
 *
 * A collection of 9 reusable composite components for the AI.RIO website.
 * Built with shadcn/ui primitives, fully typed, and accessible.
 *
 * @example
 * ```tsx
 * import {
 *   ProblemSection,
 *   SolutionSection,
 *   CTASection,
 *   type ProblemPoint
 * } from '@/components/service-sections';
 *
 * const problems: ProblemPoint[] = [
 *   { id: '1', title: 'No Visibility', description: '...', severity: 'critical' }
 * ];
 *
 * export function MyServicePage() {
 *   return (
 *     <>
 *       <ProblemSection problems={problems} />
 *       <SolutionSection features={features} />
 *       <CTASection primaryAction={{ label: 'Get Started', href: '/contact' }} />
 *     </>
 *   );
 * }
 * ```
 */

// Problem Section
export { ProblemSection } from './problem-section';
export type { ProblemPoint, ProblemSectionProps } from './problem-section';

// Solution Section
export { SolutionSection } from './solution-section';
export type { FeatureItem, SolutionSectionProps } from './solution-section';

// Deliverables Section
export { DeliverablesSection } from './deliverables-section';
export type { Deliverable, PhaseDeliverables, DeliverablesSectionProps } from './deliverables-section';

// Who For Section
export { WhoForSection } from './who-for-section';
export type { CustomerProfile, WhoForSectionProps } from './who-for-section';

// Related Services
export { RelatedServices } from './related-services';
export type { RelatedService, RelatedServicesProps } from './related-services';

// FAQ Section
export { FAQSection } from './faq-section';
export type { FAQItem, FAQSectionProps } from './faq-section';

// CTA Section
export { CTASection } from './cta-section';
export type { CTAAction, CTASectionProps } from './cta-section';

// Technical Proof
export { TechnicalProof } from './technical-proof';
export type { Metric, TechnicalProofProps } from './technical-proof';

// Dashboard Showcase
export { DashboardShowcase } from './dashboard-showcase';
export type { DashboardView, DashboardShowcaseProps } from './dashboard-showcase';
