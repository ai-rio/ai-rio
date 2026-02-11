/**
 * Glossary Data for Programmatic SEO - Glossary Pages
 * ====================================================
 *
 * Contains glossary term data for "What is [Term]" pages.
 *
 * Each term includes:
 * - Term name and slug
 * - Definition (business-focused)
 * - Technical explanation
 * - Why it matters for Ai.Rio customers
 * - Common mistakes
 * - Related terms
 * - Code examples (where applicable)
 */

export interface GlossaryTerm {
  /** URL-friendly slug */
  slug: string;
  /** Term name */
  name: string;
  /** Short description for meta */
  description: string;
  /** Business-focused definition */
  definition: string;
  /** Technical explanation */
  technical: string;
  /** Why it matters for SaaS */
  whyItMatters: string;
  /** Common mistakes to avoid */
  commonMistakes: string[];
  /** Related glossary terms */
  relatedTerms: string[];
  /** Code example (optional) */
  codeExample?: {
    language: string;
    code: string;
  };
  /** Schema.org type (if applicable) */
  schemaType?: 'DefinedTerm' | 'Thing';
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: 'stripe-meter',
    name: 'Stripe Meter',
    description: 'Stripe\'s usage-based billing product for metered pricing and consumption billing.',
    definition: 'Stripe Meter is Stripe\'s usage-based billing product that allows SaaS companies to charge customers based on actual usage rather than flat subscription fees. Instead of "pay $99/month," customers pay "per API call," "per GB storage," or "per token processed."',
    technical: 'Stripe Meter uses usage records to track consumption events. You send usage events to Stripe via API, and Stripe aggregates them into billing periods. Meter supports per-unit pricing, tiered pricing, and volume discounts. Events are aggregated daily and included in invoices.',
    whyItMatters: 'Companies with usage-based pricing grow 54% faster than those with flat pricing (OpenView). For AI SaaS specifically, usage pricing is essential because LLM costs vary wildly per customer. Without usage-based pricing, you risk margin erosion on heavy users.',
    commonMistakes: [
      'Not aggregating events before sending to Stripe (rate limits)',
      'Sending usage events too infrequently (causing shock invoices)',
      'Not setting usage limits (customers can run up unlimited bills)',
      'Not testing tiered pricing logic',
      'Forgetting to handle zero-usage periods',
    ],
    relatedTerms: ['usage-based-billing', 'metered-billing', 'usage-records', 'event-aggregation'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'usage-based-billing',
    name: 'Usage-Based Billing',
    description: 'A pricing model where customers pay based on their actual usage of a product or service.',
    definition: 'Usage-based billing (also called consumption pricing or metered billing) charges customers based on how much they use your product. Instead of a flat monthly fee, pricing scales with usage: $0.01 per API call, $10 per GB stored, $0.001 per token processed.',
    technical: 'Usage-based billing requires three components: (1) event tracking to capture usage, (2) aggregation to roll up events into billing periods, and (3) rating engine to calculate charges. Stripe Meter provides the rating engine; you provide events via API or webhook.',
    whyItMatters: 'Usage-based pricing aligns your revenue with your costs. For AI SaaS, this is critical because LLM costs scale with customer usage. Without usage-based pricing, heavy users can destroy your margins. Usage pricing also lowers customer acquisition barriers (no large upfront commitment).',
    commonMistakes: [
      'Setting prices too low (margin compression)',
      'Not communicating usage clearly (customer confusion)',
      'Not providing usage visibility (bill shock)',
      'Aggregating at wrong frequency (cash flow vs. accuracy)',
      'Not handling free tiers properly',
    ],
    relatedTerms: ['stripe-meter', 'metered-billing', 'llm-unit-economics'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'failed-payment-recovery',
    name: 'Failed Payment Recovery',
    description: 'The process of recovering revenue from declined or failed subscription payments.',
    definition: 'Failed payment recovery (also called dunning management) is the systematic process of retrying failed payments and communicating with customers to update payment information. When a subscription payment fails (expired card, insufficient funds), recovery processes automatically retry at optimal times and send reminder emails.',
    technical: 'Stripe\'s smart retries use machine learning to determine optimal retry timing based on decline reason, card network, and historical data. Basic Stripe dunning achieves ~41% recovery rate. Advanced workflows with custom retry schedules, multi-channel communication, and account update pages can achieve 65-70% recovery rates.',
    whyItMatters: '25% of lapsed subscriptions are due to payment failures (Stripe data). For a $50K MRR SaaS with 5% monthly payment failures, that\'s $2,500/month or $30,000/year in preventable revenue loss. Recovery automation pays for itself in weeks.',
    commonMistakes: [
      'Only retrying once (most recoveries happen on 2nd-4th attempt)',
      'Retrying too frequently (looks like fraud to card networks)',
      'Not sending reminder emails (customers don\'t know payment failed)',
      'Making it hard to update payment info (extra friction = lost customers)',
      'Not tracking recovery rate (can\'t optimize what you don\'t measure)',
    ],
    relatedTerms: ['dunning-management', 'involuntary-churn', 'payment-recovery-rate', 'stripe-smart-retries'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'dunning-management',
    name: 'Dunning Management',
    description: 'The systematic process of communicating with customers about failed payments and attempting recovery.',
    definition: 'Dunning management is the process of handling failed payments through automated retries, customer communication, and account update workflows. Named after the "dunning letter" (debt collection communication), modern dunning uses email, SMS, in-app notifications, and hosted payment pages to recover revenue gracefully.',
    technical: 'Effective dunning requires: (1) retry schedule optimization (not all intervals work equally), (2) multi-channel communication (email + SMS + in-app), (3) self-service payment update (no friction), (4) decline code handling (hard vs. soft declines), and (5) escalation timing (when to pause service vs. keep trying).',
    whyItMatters: 'Up to 40% of churn is involuntary (payment failures). Good dunning can recover 65-70% of failed payments. For every $100K in failed payments, that\'s $65-70K recovered. The difference between basic Stripe dunning (~41%) and advanced workflows (~70%) is $29K per $100K.',
    commonMistakes: [
      'Using generic retry schedules (not optimized for decline type)',
      'Only using email (missing SMS, in-app, push notifications)',
      'Making customers log in to update payment info (unnecessary friction)',
      'Not differentiating by payment method (ACH vs. card needs different handling)',
      'Pausing service too early (some customers want service during recovery process)',
    ],
    relatedTerms: ['failed-payment-recovery', 'involuntary-churn', 'stripe-smart-retries'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'involuntary-churn',
    name: 'Involuntary Churn',
    description: 'Customer churn caused by payment failures, not deliberate cancellation.',
    definition: 'Involuntary churn occurs when customers want to continue your service but are lost due to payment issues: expired cards, insufficient funds, declined transactions, or technical failures. Unlike voluntary churn (customer chooses to leave), involuntary churn is recoverable with proper dunning management.',
    technical: 'Involuntary churn rate = (customers lost to payment failures) / (total customers at start of period). Industry average is 2-5% monthly. SaaS companies track "recoverable churn" (could have been saved with better dunning) vs. "non-recoverable churn" (true payment abandonment).',
    whyItMatters: '40% of total churn is involuntary (payment failures). This is entirely preventable revenue loss. For a $1M ARR SaaS with 40% gross margin and 5% monthly churn, reducing involuntary churn by half adds $10K/month to net revenue with zero acquisition cost.',
    commonMistakes: [
      'Not measuring involuntary vs. voluntary churn separately',
      'Accepting involuntary churn as "normal" (it\'s preventable)',
      'Not investing in dunning (ROI is 10-100x)',
      'Blaming customers for payment failures (system could retry smarter)',
      'Not measuring recovery rate (can\'t improve what you don\'t track)',
    ],
    relatedTerms: ['failed-payment-recovery', 'dunning-management', 'payment-recovery-rate'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'stripe-smart-retries',
    name: 'Stripe Smart Retries',
    description: 'Stripe\'s machine learning-powered system for optimizing payment retry timing.',
    definition: 'Stripe Smart Retries uses machine learning to determine the optimal time to retry failed payments based on decline reason, card network, issuing bank, and historical payment patterns. Instead of retrying on a fixed schedule, Smart Retries predicts when each payment is most likely to succeed.',
    technical: 'Smart Retries analyzes: decline code (generic decline vs. specific reason), card network (Visa, Mastercard, Amex have different patterns), bank/issuer (some banks process batches at specific times), day of week and time (success rates vary by time), and historical retry success. Stripe reports 41% median recovery rate with Smart Retries enabled.',
    whyItMatters: 'Retry timing significantly impacts recovery rates. Retrying too soon = same decline reason. Retrying too late = customer has already churned. Stripe Smart Retries handles the optimization automatically, but you can further improve with custom schedules for specific decline patterns.',
    commonMistakes: [
      'Disabling Smart Retries (always worse)',
      'Combining Smart Retries with aggressive manual schedules (too many retries)',
      'Not testing with test mode decline codes',
      'Not monitoring recovery rate by decline code',
      'Assuming Smart Retries is "enough" (custom workflows can improve 20-30%)',
    ],
    relatedTerms: ['failed-payment-recovery', 'dunning-management', 'payment-recovery-rate'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'llm-cost-tracking',
    name: 'LLM Cost Tracking',
    description: 'Monitoring and attributing LLM API costs to customers, features, or internal usage.',
    definition: 'LLM cost tracking is the process of monitoring token usage and costs across LLM providers (OpenAI, Anthropic, etc.) and attributing those costs to specific customers, features, or usage patterns. For AI SaaS companies, this is essential for understanding true unit economics and preventing margin erosion.',
    technical: 'LLM cost tracking requires: (1) capturing usage from each provider\'s API, (2) normalizing costs across providers (token pricing varies), (3) attributing usage to customers (API key mapping, user tagging), (4) aggregating for billing, and (5) real-time monitoring for anomaly detection. Providers offer usage APIs but don\'t do attribution.',
    whyItMatters: 'Without LLM cost tracking, you\'re flying blind. Some customers may cost more in LLM usage than they pay in subscription fees. One "power user" can destroy your margins. Tracking enables: usage-based pricing, cost optimization (prompt engineering), and informed customer tier decisions.',
    commonMistakes: [
      'Only tracking total spend (no attribution)',
      'Not tracking all providers (missing costs add up)',
      'Not updating pricing when provider prices change',
      'Not real-time (surprises at end of month)',
      'Confusing "tokens" with "cost" (different models have different pricing)',
    ],
    relatedTerms: ['token-attribution', 'customer-level-cost-attribution', 'cost-per-token', 'llm-unit-economics'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'token-attribution',
    name: 'Token Attribution',
    description: 'Mapping LLM token usage to specific customers, features, or internal cost centers.',
    definition: 'Token attribution is the process of tracking which customer or feature consumed LLM tokens. When a customer uses your AI feature, you need to know: which LLM provider was used, which model, how many tokens, and what it cost. This attribution enables accurate billing and margin analysis.',
    technical: 'Token attribution strategies: (1) API key mapping (one key per customer), (2) request metadata (tag each API call with customer ID), (3) proxy pattern (your server routes to LLM provider), (4) client-side reporting (less accurate), or (5) post-hoc inference (analyze logs to attribute). API key mapping is most accurate but requires key management overhead.',
    whyItMatters: 'Without token attribution, you can\'t: implement usage-based pricing (charge customers for what they use), identify expensive customers (margin risk), optimize prompts (which features are most costly), or accurately forecast LLM spend. Attribution is the foundation of LLM unit economics.',
    commonMistakes: [
      'Not attributing at all (only tracking total spend)',
      'Only attributing at provider level (OpenAI vs. Anthropic isn\'t enough)',
      'Not handling multi-model usage (GPT-4 vs. GPT-3.5 have 50x cost difference)',
      'Not accounting for both input and output tokens (priced differently)',
      'Client-side reporting (easily manipulated by users)',
    ],
    relatedTerms: ['llm-cost-tracking', 'customer-level-cost-attribution', 'api-key-mapping'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'customer-level-cost-attribution',
    name: 'Customer-Level Cost Attribution',
    description: 'Attributing costs (especially LLM usage) to specific customer accounts.',
    definition: 'Customer-level cost attribution means knowing exactly how much each customer costs to serve. For AI SaaS, this primarily means LLM token costs but can also include: infrastructure, support time, third-party APIs, and payment processing fees. Knowing cost-per-customer enables pricing decisions and churn analysis.',
    technical: 'Implementation requires: (1) unique identifiers for all cost-generating events (customer_id on every LLM call), (2) normalization (different cost metrics need common unit), (3) aggregation (roll up costs to billing period), and (4) margin calculation (revenue minus cost-attribution). Most companies have revenue attribution but lack cost attribution.',
    whyItMatters: 'You can\'t optimize unit economics without cost attribution. Customers who cost more than their subscription fee are destroying your margins. Knowing cost-per-customer enables: informed pricing (raise prices on heavy users), feature optimization (which features drive costs?), and churn prevention (save high-margin customers).',
    commonMistakes: [
      'Only attributing revenue (not costs)',
      'Allocating fixed costs incorrectly (makes all customers look unprofitable)',
      'Not including all cost sources (missing LLM costs = bad data)',
      'Using averages instead of actuals (hides outlier customers)',
      'Not updating attribution logic as product evolves',
    ],
    relatedTerms: ['llm-cost-tracking', 'token-attribution', 'llm-unit-economics'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'api-key-mapping',
    name: 'API Key Mapping',
    description: 'Using unique API keys per customer to attribute LLM usage and costs.',
    definition: 'API key mapping is a strategy for LLM cost attribution where each customer gets a unique API key for your LLM provider. When the customer makes requests, you use their specific key, making all usage automatically attributable to that customer in the provider\'s dashboard.',
    technical: 'Implementation: (1) create separate API keys with each LLM provider (OpenAI, Anthropic, etc.) for each customer, (2) store key-to-customer mapping in your database, (3) use customer\'s key for their requests, (4) pull usage data from provider dashboard (already attributed), (5) reconcile with your internal records. Requires key management and rotation strategy.',
    whyItMatters: 'API key mapping is the most accurate attribution method because the provider does the tracking. No complex logging or metadata parsing. However, it requires managing many keys (security risk) and may hit provider limits on keys per account. Best for B2B with moderate customer count.',
    commonMistakes: [
      'Not rotating keys (security risk)',
      'Hitting provider key limits (some providers limit keys per account)',
      'Not handling key expiration (customer suddenly can\'t use feature)',
      'Not logging key usage (provider dashboard is only source of truth)',
      'Using same key across environments (can\'t separate dev vs. prod costs)',
    ],
    relatedTerms: ['token-attribution', 'llm-cost-tracking', 'customer-level-cost-attribution'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'revenue-leakage',
    name: 'Revenue Leakage',
    description: 'Revenue that should be collected but isn\'t due to billing issues, errors, or inefficiencies.',
    definition: 'Revenue leakage refers to money that your business should be earning but doesn\'t collect due to preventable issues: failed payments not recovered, underbilling due to usage tracking errors, pricing plan misalignments, expired free trials not converting, or accounting errors.',
    technical: 'Revenue leakage calculation: (potential revenue) - (actual collected revenue) = leakage. Sources to audit: payment recovery rate (are you recovering all possible failed payments?), usage tracking (are you billing all events?), pricing plans (are customers on optimal plans?), free trials (are they converting?), and invoice errors (underbilling, missed charges).',
    whyItMatters: 'Average SaaS loses 5-15% of potential revenue to leakage. For $1M ARR, that\'s $50-150K/year left on the table. The good news: most leakage is preventable. Fixing payment recovery alone can recover 20-30% of leakage. Usage tracking fixes recover another 10-20%.',
    commonMistakes: [
      'Not measuring leakage (assuming revenue is optimized)',
      'Focusing only on new revenue (leakage is easier money)',
      'Not auditing usage tracking (invisible but expensive)',
      'Accepting churn as "normal" (some is leakage)',
      'Not reviewing invoices for underbilling (leaving money on table)',
    ],
    relatedTerms: ['failed-payment-recovery', 'usage-based-billing', 'stripe-meter'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'payment-recovery-rate',
    name: 'Payment Recovery Rate',
    description: 'The percentage of failed payments that are successfully recovered.',
    definition: 'Payment recovery rate measures the effectiveness of your dunning management: (value of recovered payments) / (value of initially failed payments). Industry average with Stripe Smart Retries is ~41%. Advanced dunning workflows can achieve 65-70% recovery rates.',
    technical: 'Calculation: sum(recovered_payment_amount) / sum(initial_failed_amount) over a period. Track by: decline code (some decline types recover better), payment method (ACH vs. card), customer tier (enterprise vs. SMB), and time-to-recovery (most recoveries happen within 7 days).',
    whyItMatters: 'Improving recovery rate from 41% to 70% increases recovered revenue by 70%. For $50K/month in failed payments, that\'s recovering $35K instead of $20.5K = $14.5K/month or $174K/year more. Recovery rate optimization has direct ROI: better dunning = more revenue recovered.',
    commonMistakes: [
      'Not tracking recovery rate (can\'t optimize)',
      'Tracking only aggregate (need breakdown by decline type)',
      'Not benchmarking against industry (41% is baseline)',
      'Assuming "good enough" (room for improvement is large)',
      'Not measuring time-to-recovery (fast recovery = less churn)',
    ],
    relatedTerms: ['failed-payment-recovery', 'dunning-management', 'involuntary-churn'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'metered-billing',
    name: 'Metered Billing',
    description: 'A type of usage-based billing where customers are charged based on measured consumption.',
    definition: 'Metered billing is usage-based pricing where you "meter" (measure) actual consumption and charge accordingly. Think utility billing: electricity is metered in kilowatt-hours, water in gallons. For SaaS, metering can measure API calls, storage used, tokens processed, or any other quantifiable resource.',
    technical: 'Metered billing components: (1) meter - captures usage events, (2) aggregation - combines events into billing period totals, (3) rating - applies pricing (per-unit, tiered, volume), (4) invoicing - generates bill. Stripe Meter handles aggregation, rating, and invoicing; you provide usage events via API.',
    whyItMatters: 'Metered billing enables fair pricing (heavy users pay more, light users pay less), aligns revenue with costs (especially important for AI SaaS with variable LLM costs), and lowers adoption barriers (no large upfront commitment). Companies with metered pricing grow faster because customers aren\'t locked into large commitments.',
    commonMistakes: [
      'Not setting usage limits (customers can run up unlimited bills)',
      'Metering at wrong granularity (too fine = noisy, too coarse = inaccurate)',
      'Not displaying usage to customers (bill shock)',
      'Not testing edge cases (zero usage, massive spikes)',
      'Forgetting about proration (mid-cycle plan changes)',
    ],
    relatedTerms: ['stripe-meter', 'usage-based-billing', 'usage-records'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'event-aggregation',
    name: 'Event Aggregation',
    description: 'Combining multiple usage events into summary totals for billing purposes.',
    definition: 'Event aggregation is the process of combining individual usage events (API calls, token usage, etc.) into aggregated totals for billing periods. Instead of billing each event individually (which would create thousands of line items), aggregation rolls up events: "1,234,567 tokens processed" instead of 50,000 individual token events.',
    technical: 'Aggregation strategies: (1) real-time aggregation (update totals as events arrive), (2) batch aggregation (roll up events periodically), (3) lambda architecture (real-time + batch for accuracy), or (4) use Stripe\'s built-in aggregation (sends usage records in batches). Trade-offs: real-time = immediate visibility but complex; batch = simpler but delayed.',
    whyItMatters: 'Without aggregation, billing is chaotic: thousands of line items, confusion for customers, difficult reconciliation. Aggregation makes bills understandable ("1.2M tokens this month" vs. line by line). Also reduces API calls to Stripe (sending one usage record vs. thousands of events).',
    commonMistakes: [
      'Not aggregating (sending individual events to Stripe = rate limits)',
      'Aggregating too infrequently (customer can\'t see current usage)',
      'Aggregating at wrong level (by feature vs. by customer)',
      'Not handling late-arriving events (events after period close)',
      'Double-counting events (aggregation bugs = wrong bills)',
    ],
    relatedTerms: ['stripe-meter', 'usage-records', 'usage-based-billing'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'cost-per-token',
    name: 'Cost Per Token',
    description: 'The cost charged by LLM providers for each token (roughly 4 characters of text) processed.',
    definition: 'Cost per token is the pricing unit for LLM APIs. LLM providers charge per token (roughly 3/4 of a word in English). Input tokens (prompt) and output tokens (response) are priced separately. Prices vary dramatically: GPT-3.5 is ~$0.0005/1K tokens, GPT-4 is ~$0.03/1K tokens (60x more expensive).',
    technical: 'Token pricing examples (2025): GPT-3.5-turbo: $0.0005/1K input, $0.0015/1K output. GPT-4: $0.03/1K input, $0.06/1K output. Claude 3 Opus: $0.015/1K input, $0.075/1K output. Models also have context window limits (max tokens per request).',
    whyItMatters: 'For AI SaaS, token costs are your COGS (cost of goods sold). Understanding cost-per-token is essential for: pricing decisions (charge customer more than it costs you), model selection (use cheaper models when possible), and prompt optimization (shorter prompts = lower costs). Small token cost differences compound at scale.',
    commonMistakes: [
      'Assuming all tokens cost the same (model choice matters 50-100x)',
      'Not accounting for input vs. output pricing (often 2-3x difference)',
      'Not updating costs when providers change prices (happens frequently)',
      'Not measuring tokens per feature (can\'t optimize what you don\'t track)',
      'Forgetting about image tokens (different pricing than text)',
    ],
    relatedTerms: ['llm-cost-tracking', 'llm-unit-economics', 'token-attribution'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'llm-unit-economics',
    name: 'LLM Unit Economics',
    description: 'The per-unit economics of LLM-powered features, including revenue and costs per customer/request.',
    definition: 'LLM unit economics refers to understanding the profit (or loss) per unit for AI-powered features. For SaaS, "unit" is typically per customer or per request. LLM unit economics = (revenue from customer) - (LLM costs for that customer) - (other serving costs). Positive unit economics mean profitable; negative means losing money on each customer.',
    technical: 'Unit economics calculation: (1) revenue per customer (subscription or usage-based), (2) LLM costs per customer (token attribution), (3) gross margin = (revenue - LLM costs) / revenue. Target: 70%+ gross margin for SaaS. If LLM costs are >30% of revenue, unit economics are unhealthy and need pricing or optimization changes.',
    whyItMatters: 'Without understanding unit economics, you can\'t know if your AI features are profitable. Some customers may be destroying your margins (high LLM usage, low revenue). Unit economics analysis informs: pricing tiers (charge heavy users more), feature design (optimize prompts), and customer decisions (fire unprofitable customers).',
    commonMistakes: [
      'Not calculating unit economics (flying blind on profitability)',
      'Using average costs (hides outlier unprofitable customers)',
      'Only measuring revenue (not costs)',
      "Assuming \"they'll pay more later\" (unit economics don't lie)",
      'Not updating analysis as pricing/models change',
    ],
    relatedTerms: ['llm-cost-tracking', 'customer-level-cost-attribution', 'cost-per-token'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'ai-saas-margins',
    name: 'AI SaaS Margins',
    description: 'The profit margins for AI-powered SaaS companies, considering variable LLM costs.',
    definition: 'AI SaaS margins are typically lower than traditional SaaS due to LLM costs. Traditional SaaS has 80-90% gross margins (software has near-zero marginal cost). AI SaaS margins are 50-70% because each request incurs LLM API costs. The "AI premium" (higher prices for AI features) compensates for lower margins.',
    technical: 'Gross margin calculation: (revenue - COGS) / revenue. For AI SaaS, COGS includes: LLM API costs (usually 10-30% of revenue), hosting/infrastructure (5-10%), and support (5-10%). Healthy AI SaaS gross margin: 60-70%. Below 50% indicates pricing or cost issues. Above 80% is rare for AI-heavy products.',
    whyItMatters: 'AI SaaS margins dictate growth strategy: lower margins mean slower growth (less revenue for reinvestment), higher customer LTV needed (justify higher CAC), and pricing pressure (need AI premium). Understanding your margins helps with: pricing decisions (charge enough to cover costs), growth planning (lower margins = slower growth), and investor conversations (AI SaaS gets different multiples than traditional SaaS).',
    commonMistakes: [
      'Comparing to traditional SaaS margins (AI SaaS is structurally different)',
      'Not tracking LLM costs per customer (average hides problems)',
      'Underpricing (not covering LLM COGS)',
      'Assuming margins will improve "at scale" (LLM costs scale with usage)',
      'Not communicating "AI premium" value (why charge more?)',
    ],
    relatedTerms: ['llm-unit-economics', 'llm-cost-tracking', 'cost-per-token'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'stripe-webhooks',
    name: 'Stripe Webhooks',
    description: 'Real-time notifications from Stripe about events in your account.',
    definition: 'Stripe webhooks are HTTP callbacks that Stripe sends to your server when events occur: payments succeed or fail, subscriptions are created or cancelled, invoices are generated, etc. Webhooks enable your system to react to Stripe events in real-time without polling.',
    technical: 'Webhook flow: (1) event occurs in Stripe, (2) Stripe sends POST request to your webhook URL, (3) your server receives and processes event, (4) your server responds with 2xx status (or Stripe retries). Events are signed with Stripe signature for verification. Critical events: invoice.payment_succeeded, invoice.payment_failed, customer.subscription.created.',
    whyItMatters: 'Webhooks are essential for billing automation. Without webhooks, you can\'t: react to failed payments (trigger dunning), sync subscription status (grant/revoke access), reconcile accounting (invoice paid), or trigger custom workflows (provision resources). Webhook reliability is critical: missed webhook = missed revenue or incorrect access.',
    commonMistakes: [
      'Not verifying webhook signatures (security risk)',
      'Not handling idempotency (duplicate events cause double-processing)',
      'Not responding quickly (Stripe retries if response is slow)',
      'Not handling all critical events (missing webhook = broken workflow)',
      'Not monitoring webhook failures (silent failures = lost revenue)',
    ],
    relatedTerms: ['stripe-meter', 'failed-payment-recovery'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'proration',
    name: 'Proration',
    description: 'Calculating partial charges when subscription changes occur mid-billing cycle.',
    definition: 'Proration is the calculation of partial charges when a subscription changes in the middle of a billing cycle. When a customer upgrades from $99 to $299 plan on day 15 of a 30-day month, proration calculates: they owe $99 for 15 days + $299 for 15 days (not $299 for the full month).',
    technical: 'Proration methods: (1) percentage-based (charge for unused days at old rate, charge for used days at new rate), (2) fixed-amount (charge prorated difference), or (3) service-date proration (align to specific date). Stripe supports automatic proration with configuration options: proration behavior (create prorations, always invoice, none).',
    whyItMatters: 'Without proration, customers either: (a) overpay (pay full month for partial month usage = angry customers) or (b) underpay (get full month upgrade for partial month price = revenue leakage). Proration ensures fair billing and prevents revenue loss. Mid-cycle changes are common (upgrades, downgrades, seat changes).',
    commonMistakes: [
      'Not prorating (unfair billing or revenue leakage)',
      'Prorating at wrong granularity (should prorate by day, not by month)',
      'Not communicating proration to customers (confusing bills)',
      'Not testing edge cases (multiple changes in same period)',
      'Forgetting about proration when calculating MRR (proration creates one-time revenue, not recurring)',
    ],
    relatedTerms: ['stripe-meter', 'usage-based-billing'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'invoice-line-items',
    name: 'Invoice Line Items',
    description: 'Individual charges that appear on a customer invoice.',
    definition: 'Invoice line items are the individual charges that make up an invoice: subscription fees, usage charges, one-time fees, discounts, credits, etc. Each line item has: description, quantity, unit price, and total. Line items create clear, understandable invoices for customers.',
    technical: 'Stripe line item types: (1) subscription (recurring), (2) invoice item (one-time charge), (3) usage record (metered usage), (4) discount (negative line item), (5) tax (calculated), (6) credit (negative balance). Line items appear in Stripe Dashboard and on invoice PDF. API: invoice.line_items.data array.',
    whyItMatters: 'Clear line items = fewer billing disputes and faster payments. Customers should understand exactly what they\'re being charged for. Poor line items ("Service Fee $500") create confusion. Good line items ("Pro Plan - December: $299" + "10M API calls: $15") create trust.',
    commonMistakes: [
      'Vague descriptions ("Service Fee" vs. "Pro Plan Subscription")',
      'Not including usage breakdown (customers can\'t verify usage charges)',
      'Too many line items (confusing, but better than too few)',
      'Not ordering logically (group related charges)',
      'Forgetting to include period dates (what time period is this for?)',
    ],
    relatedTerms: ['stripe-meter', 'usage-records', 'event-aggregation'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'usage-records',
    name: 'Usage Records',
    description: 'Data records representing customer usage for billing purposes in Stripe Meter.',
    definition: 'Usage records are the data objects you send to Stripe to track customer usage for metered billing. Each usage record represents consumption: 100 API calls, 5GB storage, 1M tokens processed. Stripe aggregates usage records into billing periods and calculates charges based on your pricing model.',
    technical: 'Usage record API: POST /v1/usage_records with parameters: quantity (amount used), timestamp (when usage occurred), action (usage type), subscription_item (which subscription). Stripe aggregates by: subscription_item + action + day. Aggregation resets each billing period. Maximum 2000 usage records per API call (batch for efficiency).',
    whyItMatters: 'Usage records are the foundation of metered billing. Without accurate, timely usage records, customers are billed incorrectly. Best practices: send records daily (not real-time, not monthly), use meaningful action names (customers should understand), and test aggregation logic (verify records are combined correctly).',
    commonMistakes: [
      'Sending records too frequently (rate limits, noisy aggregation)',
      'Sending records too infrequently (bill shock, delayed aggregation)',
      'Using unclear action names ("usage_1" vs. "api_calls")',
      'Not handling zero usage (customer expects $0 bill, gets nothing)',
      'Forgetting timestamp (all usage aggregates to day 1 = wrong billing)',
    ],
    relatedTerms: ['stripe-meter', 'metered-billing', 'event-aggregation'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'backfill-pipeline',
    name: 'Backfill Pipeline',
    description: 'A data pipeline to populate historical data that wasn\'t tracked from the start.',
    definition: 'A backfill pipeline loads historical data into your system retroactively. For LLM cost tracking, a backfill might load the past 6 months of OpenAI usage data. This gives you historical context even though you didn\'t track from day one. Backfills are common when adding tracking to existing products.',
    technical: 'Backfill pipeline steps: (1) extract historical data from provider APIs (OpenAI usage API, Anthropic usage API), (2) transform to your schema (normalize across providers), (3) load to your database (warehouse or analytics), (4) attribute to customers (API key mapping or inference), (5) validate (check for gaps, duplicates). Backfills can be one-time or recurring.',
    whyItMatters: 'You rarely implement tracking from day one. When you do add tracking, you\'re flying blind without historical data. Backfill gives you: trend analysis (are costs trending up or down?), seasonality patterns, baseline for forecasting, and customer cost history (identify expensive customers early).',
    commonMistakes: [
      'Not backfilling (no historical context when tracking starts)',
      'Backfilling without validation (bad data leads to wrong decisions)',
      'Not handling provider API limits (backfill takes forever or fails)',
      'Not attributing to customers (have cost data but don\'t know who caused it)',
      'Forgetting about ongoing backfills (need to backfill new customers)',
    ],
    relatedTerms: ['llm-cost-tracking', 'token-attribution', 'customer-level-cost-attribution'],
    schemaType: 'DefinedTerm',
  },
  {
    slug: 'cost-anomaly-detection',
    name: 'Cost Anomaly Detection',
    description: 'Automated monitoring for unusual spending patterns in LLM costs.',
    definition: 'Cost anomaly detection monitors your LLM spending and alerts you to unusual patterns: sudden spikes, unexpected provider usage, or customer cost changes. Anomalies might indicate: bugs (infinite loop calling LLM), abuse (customer exploiting free tier), or fraud (unauthorized API key usage).',
    technical: 'Anomaly detection approaches: (1) threshold-based (alert if daily spend > $X), (2) statistical (alert if spend is >3σ from mean), (3) ML-based (train model on normal patterns), or (4) rule-based (alert if specific customer spends >$Y). Effective detection requires: real-time monitoring, context awareness (weekends are lower volume), and actionable alerts.',
    whyItMatters: 'Without anomaly detection, cost issues can spiral for days before you notice. A bug causing 100x normal spend could cost thousands before discovery. Detection enables: rapid response (fix bug before it costs more), customer protection (catch abuse immediately), and cost optimization (identify unusual patterns for investigation).',
    commonMistakes: [
      'Not monitoring for anomalies (blind to cost issues)',
      'Setting thresholds too high (miss real problems) or too low (alert fatigue)',
      'Not accounting for normal variation (legitimate spikes trigger false alarms)',
      'Not having response playbook (alert fires but no clear action)',
      'Only monitoring total spend (customer-level anomalies hidden)',
    ],
    relatedTerms: ['llm-cost-tracking', 'customer-level-cost-attribution', 'revenue-leakage'],
    schemaType: 'DefinedTerm',
  },
];

/**
 * Get glossary term by slug
 */
export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((term) => term.slug === slug);
}

/**
 * Get all glossary slugs
 */
export function getTermSlugs(): string[] {
  return GLOSSARY_TERMS.map((term) => term.slug);
}

/**
 * Get terms grouped by category (first letter for A-Z navigation)
 */
export function getTermsByCategory(): Record<string, GlossaryTerm[]> {
  const categories: Record<string, GlossaryTerm[]> = {};
  for (const term of GLOSSARY_TERMS) {
    const firstLetter = term.name[0].toUpperCase();
    if (!categories[firstLetter]) {
      categories[firstLetter] = [];
    }
    categories[firstLetter].push(term);
  }
  return categories;
}

/**
 * Search terms by query
 */
export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return GLOSSARY_TERMS.filter(
    (term) =>
      term.name.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery) ||
      term.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get related terms
 */
export function getRelatedTerms(termSlug: string): GlossaryTerm[] {
  const term = getTermBySlug(termSlug);
  if (!term) return [];
  return term.relatedTerms
    .map((slug) => getTermBySlug(slug))
    .filter((t): t is GlossaryTerm => t !== undefined);
}
