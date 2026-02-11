/**
 * Industry Data for Programmatic SEO - Persona Pages
 * ==================================================
 *
 * Contains industry-specific data for generating
 * "Service for [Industry]" pages.
 *
 * Each industry includes:
 * - Industry metadata (name, description)
 * - Pain points specific to this industry
 * - ROI calculations
 * - Integration considerations
 * - Real examples (where available)
 * - Timeline adjustments
 * - Competitive landscape notes
 */

export interface IndustryData {
  /** URL-friendly slug */
  slug: string;
  /** Display name */
  name: string;
  /** Industry description */
  description: string;
  /** Industry-specific pain points for billing/LLM costs */
  painPoints: string[];
  /** Example companies in this space */
  examples: string[];
  /** Industry-specific integrations to mention */
  integrations: string[];
  /** Timeline multiplier (1 = standard, 1.5 = +50% time) */
  timelineMultiplier: number;
  /** Industry keywords for SEO */
  keywords: string[];
  /** Average company size that fits ICP */
  companySize: string;
  /** Typical funding stage */
  fundingStage: string;
}

export const INDUSTRIES: IndustryData[] = [
  {
    slug: 'b2b-saas',
    name: 'B2B SaaS',
    description: 'Business-to-business software-as-a-service companies with recurring revenue models and complex billing needs.',
    painPoints: [
      'Enterprise contracts with custom pricing tiers',
      'Multi-seat licensing with volume discounts',
      'Annual billing with monthly recognition',
      'Complex approval workflows for upgrades',
      'Integration with CRM/CPQ systems',
    ],
    examples: ['Notion', 'Linear', 'Vercel', 'Figma'],
    integrations: ['Salesforce', 'HubSpot', 'Stripe', 'Chargebee'],
    timelineMultiplier: 1.2,
    keywords: ['b2b saas', 'enterprise billing', 'contract billing', 'volume pricing'],
    companySize: '$10K-100K MRR',
    fundingStage: 'Seed to Series B',
  },
  {
    slug: 'fintech',
    name: 'Fintech',
    description: 'Financial technology companies with regulatory compliance requirements and precise billing needs.',
    painPoints: [
      'SOC 2 and PCI compliance requirements',
      'Precise transaction fee reconciliation',
      'Multi-currency billing and FX handling',
      'Regulatory reporting integration',
      'High-volume transaction processing',
    ],
    examples: ['Brex', 'Ramp', 'Mercury', 'Stripe'],
    integrations: ['Plaid', 'Stripe', 'Moov', 'Railway'],
    timelineMultiplier: 1.5,
    keywords: ['fintech billing', 'payment processing', 'transaction fees', 'multi-currency'],
    companySize: '$50K-500K MRR',
    fundingStage: 'Series A to Series C',
  },
  {
    slug: 'healthtech',
    name: 'HealthTech',
    description: 'Healthcare technology companies with HIPAA compliance and complex reimbursement models.',
    painPoints: [
      'HIPAA compliance for billing data',
      'Per-patient vs. per-seat licensing',
      'Insurance integration and reconciliation',
      'Audit trail requirements',
      'B2B2C billing complexity',
    ],
    examples: ['Headway', 'Modern Health', 'Hims & Hers', 'Ro'],
    integrations: ['Stripe', 'HIPAA-compliant storage', 'EHR systems'],
    timelineMultiplier: 1.4,
    keywords: ['healthtech billing', 'hipaa compliant', 'healthcare saas', 'patient billing'],
    companySize: '$25K-200K MRR',
    fundingStage: 'Seed to Series B',
  },
  {
    slug: 'edtech',
    name: 'EdTech',
    description: 'Educational technology with semester-based billing, institution licenses, and seasonal usage patterns.',
    painPoints: [
      'Semester/quarter-based billing cycles',
      'Institution vs. individual licensing',
      'Bulk enrollment pricing',
      'Seasonal usage spikes (exam periods)',
      'Integration with LMS platforms',
    ],
    examples: ['Coursera', 'Udemy', 'Quizlet', 'Grammarly'],
    integrations: ['Canvas', 'Blackboard', 'Google Classroom', 'Stripe'],
    timelineMultiplier: 1.1,
    keywords: ['edtech billing', 'education saas', 'institution licensing', 'semester billing'],
    companySize: '$10K-100K MRR',
    fundingStage: 'Seed to Series B',
  },
  {
    slug: 'legaltech',
    name: 'LegalTech',
    description: 'Legal technology with matter-based billing, trust accounting requirements, and attorney-specific workflows.',
    painPoints: [
      'Matter-based and subscription hybrid pricing',
      'Trust account reconciliation',
      'Per-attorney licensing',
      'Document-based billing units',
      'Integration with practice management',
    ],
    examples: ['Clio', 'Ironclad', 'Atrium', 'LegalZoom'],
    integrations: ['Clio', 'Ironclad', 'Stripe', 'LawPay'],
    timelineMultiplier: 1.3,
    keywords: ['legaltech billing', 'law firm saas', 'matter billing', 'attorney software'],
    companySize: '$15K-150K MRR',
    fundingStage: 'Seed to Series A',
  },
  {
    slug: 'proptech',
    name: 'PropTech (Real Estate)',
    description: 'Property technology with agent-based licensing, MLS integration, and market-dependent pricing.',
    painPoints: [
      'Per-agent vs. per-office licensing',
      'Transaction-based pricing',
      'MLS platform integration',
      'Seasonal market fluctuations',
      'Franchise vs. independent billing',
    ],
    examples: ['Zillow', 'Redfin', 'Opendoor', 'Better.com'],
    integrations: ['MLS systems', 'Stripe', 'DocuSign'],
    timelineMultiplier: 1.2,
    keywords: ['proptech billing', 'real estate saas', 'agent licensing', 'property tech'],
    companySize: '$20K-150K MRR',
    fundingStage: 'Seed to Series B',
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    description: 'E-commerce platforms and tools with transaction-based pricing, high volume, and complex fee structures.',
    painPoints: [
      'Transaction fee pass-through',
      'High-volume payment processing',
      'Multi-store management',
      'Seasonal traffic spikes',
      'Shopping cart integration',
    ],
    examples: ['Shopify', 'BigCommerce', 'WooCommerce', 'Magento'],
    integrations: ['Shopify', 'Stripe', 'PayPal', 'Adyen'],
    timelineMultiplier: 1.1,
    keywords: ['ecommerce billing', 'transaction fees', 'shopify billing', 'payment processing'],
    companySize: '$25K-200K MRR',
    fundingStage: 'Seed to Series C',
  },
  {
    slug: 'adtech',
    name: 'AdTech / Marketing',
    description: 'Advertising and marketing technology with impression-based billing, real-time bidding, and agency pricing.',
    painPoints: [
      'CPM/CPC-based billing',
      'Agency margin calculations',
      'Real-time spend limits',
      'Campaign-based vs. subscription',
      'Ad platform reconciliation',
    ],
    examples: ['Google Ads', 'Meta Ads', 'The Trade Desk', 'Mailchimp'],
    integrations: ['Google Ads', 'Meta', 'Stripe', 'Chargebee'],
    timelineMultiplier: 1.2,
    keywords: ['adtech billing', 'marketing saas', 'impression billing', 'agency pricing'],
    companySize: '$30K-300K MRR',
    fundingStage: 'Series A to Series C',
  },
  {
    slug: 'hrtech',
    name: 'HR Tech',
    description: 'HR technology with per-employee pricing, payroll integration, and compliance requirements.',
    painPoints: [
      'Per-employee-per-month pricing',
      'Payroll system integration',
      'Benefit plan add-ons',
      'Compliance reporting',
      'Onboarding/offboarding billing',
    ],
    examples: ['Gusto', 'Rippling', 'Deel', 'Remote'],
    integrations: ['Gusto', 'Rippling', 'Stripe', 'Deel'],
    timelineMultiplier: 1.1,
    keywords: ['hrtech billing', 'hr saas', 'payroll integration', 'per-employee pricing'],
    companySize: '$15K-150K MRR',
    fundingStage: 'Seed to Series B',
  },
  {
    slug: 'crm',
    name: 'CRM / Sales',
    description: 'Customer relationship management with seat-based pricing, usage tiers, and sales cycle alignment.',
    painPoints: [
      'Seat-based pricing with volume tiers',
      'Usage limits (emails, storage)',
      'Sales cycle-based billing',
      'Trial-to-paid conversion',
      'Sales tool integration',
    ],
    examples: ['Salesforce', 'HubSpot', 'Pipedrive', 'Close'],
    integrations: ['Salesforce', 'HubSpot', 'Stripe', 'Chargebee'],
    timelineMultiplier: 1.0,
    keywords: ['crm billing', 'sales saas', 'seat-based pricing', 'salesforce billing'],
    companySize: '$20K-200K MRR',
    fundingStage: 'Series A to Series C',
  },
  {
    slug: 'customersupport',
    name: 'Customer Support',
    description: 'Customer support tools with agent-based pricing, conversation-based usage, and quality metrics.',
    painPoints: [
      'Per-agent licensing',
      'Per-conversation usage pricing',
      'Quality-based tier adjustments',
      'Omnichannel cost attribution',
      'Integration with help desk',
    ],
    examples: ['Intercom', 'Zendesk', 'Front', 'Dixa'],
    integrations: ['Intercom', 'Zendesk', 'Stripe', 'Front'],
    timelineMultiplier: 1.0,
    keywords: ['customer support billing', 'helpdesk saas', 'per-conversation', 'intercom billing'],
    companySize: '$15K-100K MRR',
    fundingStage: 'Seed to Series B',
  },
  {
    slug: 'dataanalytics',
    name: 'Data & Analytics',
    description: 'Data and analytics platforms with compute-based pricing, storage costs, and query-based billing.',
    painPoints: [
      'Compute-based usage pricing',
      'Storage costs pass-through',
      'Query volume-based billing',
      'Data egress fees',
      'Warehouse integration',
    ],
    examples: ['Snowflake', 'Databricks', 'Mode', 'Heap'],
    integrations: ['Snowflake', 'BigQuery', 'Stripe', 'Chargebee'],
    timelineMultiplier: 1.3,
    keywords: ['data analytics billing', 'compute pricing', 'warehouse costs', 'usage-based'],
    companySize: '$30K-250K MRR',
    fundingStage: 'Series A to Series C',
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Security tools with asset-based pricing, tiered protection levels, and compliance reporting.',
    painPoints: [
      'Per-asset or per-user licensing',
      'Tier-based protection levels',
      'Compliance reporting integration',
      'Incident response billing',
      'Security tool consolidation',
    ],
    examples: ['Snyk', 'Wiz', 'Orca Security', 'Vanta'],
    integrations: ['AWS', 'Azure', 'GCP', 'Stripe'],
    timelineMultiplier: 1.2,
    keywords: ['cybersecurity billing', 'security saas', 'per-asset pricing', 'compliance'],
    companySize: '$25K-200K MRR',
    fundingStage: 'Series A to Series C',
  },
  {
    slug: 'devtools',
    name: 'DevTools / Infrastructure',
    description: 'Developer tools and infrastructure with usage-based pricing, API billing, and developer seats.',
    painPoints: [
      'API call-based pricing',
      'Compute/storage usage',
      'Per-developer seat pricing',
      'CI/CD integration costs',
      'Multi-environment billing',
    ],
    examples: ['Vercel', 'Netlify', 'GitHub', 'GitLab'],
    integrations: ['GitHub', 'GitLab', 'AWS', 'Stripe'],
    timelineMultiplier: 1.1,
    keywords: ['devtools billing', 'api pricing', 'developer saas', 'infrastructure billing'],
    companySize: '$20K-150K MRR',
    fundingStage: 'Seed to Series B',
  },
  {
    slug: 'collaboration',
    name: 'Collaboration / Productivity',
    description: 'Collaboration tools with seat-based pricing, storage tiers, and usage-based features.',
    painPoints: [
      'Per-seat licensing with tiers',
      'Storage-based pricing',
      'Feature-based add-ons',
      'Team/workspace billing',
      'Enterprise contract complexity',
    ],
    examples: ['Notion', 'Slack', 'Figma', 'Miro'],
    integrations: ['Stripe', 'Chargebee', 'Recurly'],
    timelineMultiplier: 1.0,
    keywords: ['collaboration billing', 'productivity saas', 'seat-based pricing', 'team billing'],
    companySize: '$15K-100K MRR',
    fundingStage: 'Seed to Series C',
  },
  {
    slug: 'projectmanagement',
    name: 'Project Management',
    description: 'Project management tools with per-project pricing, seat tiers, and usage-based features.',
    painPoints: [
      'Per-project vs. per-seat pricing',
      'Storage and attachment limits',
      'Time-tracking integration',
      'Client-billable hours',
      'Template library billing',
    ],
    examples: ['Asana', 'Monday.com', 'Linear', 'ClickUp'],
    integrations: ['Stripe', 'Harvest', 'QuickBooks', 'Chargebee'],
    timelineMultiplier: 1.0,
    keywords: ['project management billing', 'pm saas', 'per-project pricing', 'asana billing'],
    companySize: '$15K-100K MRR',
    fundingStage: 'Seed to Series B',
  },
];

/**
 * Get industry data by slug
 */
export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

/**
 * Get all industry slugs
 */
export function getIndustrySlugs(): string[] {
  return INDUSTRIES.map((industry) => industry.slug);
}

/**
 * Get industries grouped by service relevance
 */
export function getIndustriesByService(service: 'stripe-meter' | 'payment-recovery' | 'llm-tracking'): IndustryData[] {
  // All industries are relevant for all services
  // This function allows for future filtering if needed
  return INDUSTRIES;
}
