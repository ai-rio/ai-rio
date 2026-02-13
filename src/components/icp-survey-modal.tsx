'use client';

/**
 * ICP Survey Modal
 * Multi-step lead qualification survey for AI.Rio services
 *
 * AI.Rio Tech Stack Context:
 * - Next.js 15 (App Router)
 * - FastAPI (Python backend)
 * - PostgreSQL (database)
 * - Formbricks (spam protection, form handling)
 * - Tailwind CSS (styling)
 * - TypeScript (type safety)
 * - Cal.com (30-min booking)
 * - shadcn/ui (component library)
 *
 * Scoring logic (0-120 points):
 * - Company stage (0-30)
 * - LLM spend (0-30)
 * - Billing setup (0-25)
 * - Billing challenge (0-20) - MAX for multi-select
 * - Decision maker (0-30)
 * - Timeline (0-30)
 * - Budget (0-10)
 *
 * ICP Levels:
 * - High (70+): Show Cal.com booking
 * - Medium (40-69): Show resources + booking
 * - Low (20-39): Show helpful resources
 *
 * Features:
 * - Auto-trigger after 2 min on homepage
 * - Progress indicator
 * - Real-time feedback
 * - Smooth transitions
 */

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronRight, ChevronLeft, X, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Types for survey data
type CompanyStage = 'pre-seed' | 'seed-series-a' | 'seed-series-b' | 'growth';
type LLMSpend = '0-500' | '500-2000' | '2000-5000' | '5000-plus';
type BillingSetup = 'stripe' | 'custom' | 'other';
type BillingChallenge = 'no-issues' | 'failed-payments' | 'cost-visibility' | 'usage-spikes' | 'multi-provider';
type DecisionMaker = 'no-authority' | 'influencer' | 'manager' | 'director-vp';
type Timeline = 'just-exploring' | 'six-plus-months' | 'three-six-months' | 'one-three-months';
type BudgetRange = 'under-3k' | '3k-10k' | '10k-25k' | '25k-plus' | 'not-sure';

interface ICPSurveyResponse {
  lead_id: string;
  total_score: number;
  icp_level: 'high' | 'medium' | 'low';
  next_action: string;
  created_at: string;
}

interface ICPSurveyProps {
  trigger?: boolean;
  onClose?: () => void;
  onLeadQualified?: (data: ICPSurveyResponse) => void;
}

// Survey step configuration
const SURVEY_STEPS = [
  {
    id: 'company-stage',
    title: "Company Stage",
    description: "What best describes your company's current stage?",
    field: 'company_stage',
    options: [
      { value: 'pre-seed', label: 'Pre-seed', score: 0 },
      { value: 'seed-series-a', label: 'Seed/Series A', score: 10 },
      { value: 'seed-series-b', label: 'Series B', score: 20 },
      { value: 'growth', label: 'Growth Stage', score: 15 },
    ],
  },
  {
    id: 'llm-spend',
    title: "Monthly LLM Spend",
    description: "What is your company's approximate monthly LLM spend across all providers?",
    field: 'llm_spend',
    options: [
      { value: '0-500', label: '$0-$500/mo', score: 0 },
      { value: '500-2000', label: '$500-$2K/mo', score: 10 },
      { value: '2000-5000', label: '$2K-$5K/mo', score: 20 },
      { value: '5000-plus', label: '$5K+/mo', score: 30 },
    ],
  },
  {
    id: 'billing-setup',
    title: "Current Billing Setup",
    description: "How does your company currently handle billing?",
    field: 'billing_setup',
    options: [
      { value: 'stripe', label: 'Stripe', score: 15 },
      { value: 'custom', label: 'Custom/In-house', score: 25 },
      { value: 'other', label: 'Other/None', score: 5 },
    ],
  },
  {
    id: 'billing-challenge',
    title: "Primary Billing Challenge",
    description: "What is your BIGGEST billing challenge right now?",
    field: 'billing_challenges', // Multi-select
    options: [
      { value: 'no-issues', label: 'No major issues', score: 0 },
      { value: 'failed-payments', label: 'Failed payments', score: 10 },
      { value: 'cost-visibility', label: 'No cost visibility', score: 10 },
      { value: 'usage-spikes', label: 'Unexpected usage spikes', score: 10 },
      { value: 'multi-provider', label: 'Multi-provider chaos', score: 20 },
    ],
    instruction: 'Select all that apply',
  },
  {
    id: 'decision-maker',
    title: "Decision Maker Role",
    description: "Who typically approves billing infrastructure or consulting projects over $3,000?",
    field: 'decision_maker',
    options: [
      { value: 'no-authority', label: 'No authority', score: 0 },
      { value: 'influencer', label: 'Influencer/Creator', score: 10 },
      { value: 'manager', label: 'Manager', score: 20 },
      { value: 'director-vp', label: 'Director/VP+', score: 30 },
    ],
  },
  {
    id: 'timeline',
    title: "Implementation Timeline",
    description: "When are you looking to implement billing infrastructure changes?",
    field: 'timeline',
    options: [
      { value: 'just-exploring', label: 'Just exploring', score: 0 },
      { value: 'six-plus-months', label: '6+ months', score: 10 },
      { value: 'three-six-months', label: '3-6 months', score: 20 },
      { value: 'one-three-months', label: '1-3 months', score: 30 },
    ],
  },
  {
    id: 'budget',
    title: "Budget Range",
    description: "If we proceed together, what's your budget range for this project?",
    field: 'budget',
    options: [
      { value: 'under-3k', label: 'Under $3,000', score: 0 },
      { value: '3k-10k', label: '$3K-$10K', score: 10 },
      { value: '10k-25k', label: '$10K-$25K', score: 20 },
      { value: '25k-plus', label: '$25K+', score: 30 },
      { value: 'not-sure', label: 'Not sure yet', score: 5 },
    ],
    optional: true,
  },
  {
    id: 'email',
    title: "Email for Follow-up",
    description: "What's the best email to send you updates and resources?",
    field: 'email',
    type: 'email',
    optional: true,
  },
];

// Validation schema
const surveySchema = z.object({
  company_stage: z.enum(['pre-seed', 'seed-series-a', 'seed-series-b', 'growth']),
  llm_spend: z.enum(['0-500', '500-2000', '2000-5000', '5000-plus']),
  billing_setup: z.enum(['stripe', 'custom', 'other']),
  billing_challenges: z.array(z.enum(['no-issues', 'failed-payments', 'cost-visibility', 'usage-spikes', 'multi-provider'])).min(1),
  decision_maker: z.enum(['no-authority', 'influencer', 'manager', 'director-vp']),
  timeline: z.enum(['just-exploring', 'six-plus-months', 'three-six-months', 'one-three-months']),
  budget: z.enum(['under-3k', '3k-10k', '10k-25k', '25k-plus', 'not-sure']).optional(),
  email: z.string().email().optional(),
});

export function ICPSurveyModal({ trigger, onClose, onLeadQualified }: ICPSurveyProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, CompanyStage | LLMSpend | BillingSetup | BillingChallenge[] | DecisionMaker | Timeline | BudgetRange | string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ICPSurveyResponse | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Auto-trigger after 2 minutes
  React.useEffect(() => {
    if (trigger && !isComplete) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 120000); // 2 minutes
      return () => clearTimeout(timer);
    };
  }
  }, [trigger, isComplete]);

  // Reset when trigger changes
  React.useEffect(() => {
    if (!trigger) {
      setIsOpen(false);
      setCurrentStep(0);
      setResponses({});
      setResult(null);
      setIsComplete(false);
    }
  }
  }, [trigger]);

  // Calculate score dynamically
  const calculateScore = () => {
    let score = 0;

    // Company stage
    const stageScore = SURVEY_STEPS[0].options?.find(o => o.value === responses.company_stage)?.score || 0;
    score += stageScore || 0;

    // LLM spend
    const spendScore = SURVEY_STEPS[1].options?.find(o => o.value === responses.llm_spend)?.score || 0;
    score += spendScore || 0;

    // Billing setup
    const setupScore = SURVEY_STEPS[2].options?.find(o => o.value === responses.billing_setup)?.score || 0;
    score += setupScore || 0;

    // Billing challenges (multi-select - take MAX)
    const challenges = responses.billing_challenges || [];
    const challengeScore = Math.min(
      challenges.reduce((sum, challenge) => {
        const optionScore = SURVEY_STEPS[3].options?.find(o => o.value === challenge)?.score || 0;
        return sum + (optionScore || 0);
      }, 0),
      20 // MAX score for challenges
    );
    score += challengeScore;

    // Decision maker
    const decisionScore = SURVEY_STEPS[4].options?.find(o => o.value === responses.decision_maker)?.score || 0;
    score += decisionScore || 0;

    // Timeline
    const timelineScore = SURVEY_STEPS[5].options?.find(o => o.value === responses.timeline)?.score || 0;
    score += timelineScore || 0;

    // Budget (optional)
    if (responses.budget) {
      const budgetScore = SURVEY_STEPS[6].options?.find(o => o.value === responses.budget)?.score || 0;
      score += budgetScore || 0;
    }

    return score;
  };

  const currentStep = SURVEY_STEPS[currentStep];
  const progress = ((currentStep / (SURVEY_STEPS.length - 1)) * 100;

  // Handle final submission
  const handleSubmit = async (values: z.infer(typeof surveySchema)) => {
    setIsSubmitting(true);

    try {
      const surveyResponse = await fetch('/api/icp/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          _action: 'submit_survey',
        }),
      });

      const data = await surveyResponse.json();
      setResult(data);

      if (data.icp_level === 'high') {
        // HIGH ICP - Redirect to booking with lead data
        const params = new URLSearchParams({
          lead: data.lead_id,
          score: data.total_score.toString(),
          prefill: JSON.stringify({
            company_stage: responses.company_stage,
            llm_spend: responses.llm_spend,
            billing_setup: responses.billing_setup,
          }),
        });
        window.location.href = `https://cal.com/ai-rio/30min?${params.toString()}`;
        return;
      }

      if (data.icp_level === 'medium' || data.icp_level === 'low') {
        // Show results page
        setCurrentStep(SURVEY_STEPS.length); // Results step
        setIsComplete(true);
      }

      onLeadQualified?.(data);
    } catch (error) {
      console.error('Survey submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < SURVEY_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit survey
      handleSubmit(responses as any);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  // Get ICP level label and color
  const getICPDisplay = (level: 'high' | 'medium' | 'low') => {
    const labels = {
      high: { text: 'Perfect Fit!', color: 'text-green-500' },
      medium: { text: 'Great Fit!', color: 'text-blue-500' },
      low: { text: 'Growing Team', color: 'text-yellow-500' },
    };
    return labels[level] || labels.low;
  };

  // If we have results from backend, use them
  const displayResult = result?.icp_level ? getICPDisplay(result.icp_level) : null;

  return (
    <>
      {/* Progress bar on top when open */}
      {isOpen && !isComplete && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-surface-700">
                AI.Rio Services Assessment {progress > 0 && `(${Math.round(progress)}% complete)`}
              </span>
              <button
                onClick={handleClose}
                className="text-surface-700 hover:text-surface-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </div>
      )}

      {/* Modal */}
      {!isComplete && isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm">
          <div className="relative bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-semibold text-text">
                  {currentStep === 0 ? 'Quick Assessment' : 'Question ' + (currentStep + 1) + ' of ' + SURVEY_STEPS.length}
                </h2>
                {displayResult && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className={cn('text-sm', getICPDisplay(result.icp_level).color)}>
                      {getICPDisplay(result.icp_level).text}
                    </span>
                    <span className="text-xs text-surface-700 ml-2">
                      Score: {result.total_score}/120
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={handleClose}
                className="text-surface-700 hover:text-surface-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Progress indicator */}
            <div className="px-6 pb-4 border-b border-border">
              {SURVEY_STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    'flex items-start gap-3 py-3 border-l-2 transition-all',
                    index < currentStep && 'border-primary/20 bg-primary/5',
                    index === currentStep && 'border-primary/50 bg-primary/10',
                    index > currentStep && 'border-surface-mixed-300 bg-surface-mixed-100/50',
                  )}
                >
                  <div className="flex-shrink-0">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      index < currentStep && 'bg-primary text-primary-foreground',
                      index === currentStep && 'bg-primary/50 text-primary-foreground',
                      index > currentStep && 'bg-muted text-muted-foreground',
                    )}>
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="font-medium text-text">{step.title}</div>
                    <p className="text-sm text-surface-700 mt-1">{step.description}</p>

                    {/* Render input based on step type */}
                    {step.field === 'company_stage' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        {step.options.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setResponses({ ...responses, company_stage: option.value as any })}
                            className={cn(
                              'w-full text-left px-4 py-3 rounded-md border-2 transition-all',
                              responses.company_stage === option.value
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-surface-mixed-300 hover:border-primary/50 bg-surface-mixed-100 hover:text-surface-700',
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.field === 'llm_spend' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        {step.options.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setResponses({ ...responses, llm_spend: option.value as any })}
                            className={cn(
                              'w-full text-left px-4 py-3 rounded-md border-2 transition-all',
                              responses.llm_spend === option.value
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-surface-mixed-300 hover:border-primary/50 bg-surface-mixed-100 hover:text-surface-700',
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.field === 'billing_setup' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        {step.options.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setResponses({ ...responses, billing_setup: option.value as any })}
                            className={cn(
                              'w-full text-left px-4 py-3 rounded-md border-2 transition-all',
                              responses.billing_setup === option.value
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-surface-mixed-300 hover:border-primary/50 bg-surface-mixed-100 hover:text-surface-700',
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.field === 'billing_challenges' && (
                      <div className="space-y-3 mt-4">
                        <p className="text-sm text-surface-700 mb-2">{step.instruction}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {step.options.map((option) => (
                            <label
                              key={option.value}
                              className={cn(
                                'flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition-all',
                                (responses.billing_challenges || []).includes(option.value)
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-surface-mixed-300 hover:border-primary/50 bg-surface-mixed-100 hover:text-surface-700',
                              )}
                            >
                              <input
                                type="checkbox"
                                checked={(responses.billing_challenges || []).includes(option.value)}
                                onChange={(e) => {
                                  const current = responses.billing_challenges || [];
                                  if (e.target.checked) {
                                    // Add it if not already present
                                    if (!current.includes(option.value)) {
                                      setResponses({
                                        ...responses,
                                        billing_challenges: [...current, option.value]
                                      });
                                    }
                                  } else {
                                    // Remove it
                                    setResponses({
                                      ...responses,
                                      billing_challenges: current.filter(c => c !== option.value)
                                      });
                                  }
                                }}
                                className="sr-only"
                              />
                              <span className="text-sm ml-3">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {step.field === 'decision_maker' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        {step.options.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setResponses({ ...responses, decision_maker: option.value as any })}
                            className={cn(
                              'w-full text-left px-4 py-3 rounded-md border-2 transition-all',
                              responses.decision_maker === option.value
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-surface-mixed-300 hover:border-primary/50 bg-surface-mixed-100 hover:text-surface-700',
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.field === 'timeline' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        {step.options.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setResponses({ ...responses, timeline: option.value as any })}
                            className={cn(
                              'w-full text-left px-4 py-3 rounded-md border-2 transition-all',
                              responses.timeline === option.value
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-surface-mixed-300 hover:border-primary/50 bg-surface-mixed-100 hover:text-surface-700',
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.field === 'budget' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        {step.options.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setResponses({ ...responses, budget: option.value as any })}
                            className={cn(
                              'w-full text-left px-4 py-3 rounded-md border-2 transition-all',
                              responses.budget === option.value
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-surface-mixed-300 hover:border-primary/50 bg-surface-mixed-100 hover:text-surface-700',
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.field === 'email' && (
                      <div className="mt-4">
                        <input
                          type="email"
                          value={responses.email as string || ''}
                          onChange={(e) => setResponses({ ...responses, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-md border border-border bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    )}
                  </div>
                )}
              )}
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between p-6 border-t border-border mt-4">
              <div className="text-sm text-surface-700">
                  Step {currentStep + 1} of {SURVEY_STEPS.length}
              </div>

              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBack}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                )}

                {currentStep < SURVEY_STEPS.length - 1 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleNext}
                    disabled={!isStepValid(currentStep)}
                    className="gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}

                {currentStep === SURVEY_STEPS.length - 1 && (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isStepComplete()}
                    className="gap-2 min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        {result?.icp_level === 'high' && (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Book Your Call
                          </>
                        )}
                        {result?.icp_level === 'medium' && (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500" />
                            Get Resources
                          </>
                        )}
                        {result?.icp_level === 'low' && (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2 text-yellow-500" />
                            View Guides
                          </>
                        )}
                        Submit Assessment
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Validation helper
function isStepValid(step: number): boolean {
  const step = SURVEY_STEPS[step];
  if (step.field) {
    if (step.optional) {
      return true; // Optional fields are always valid
    }
    // Required field must have a value
    const fieldValue = responses[step.field];
    if (Array.isArray(fieldValue)) {
      return fieldValue.length > 0;
    } else {
      return !!fieldValue;
    }
  }
  return true;
}
