'use client';

import * as React from 'react';
import { HelpCircle } from 'lucide-react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FAQSectionProps {
  locale?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

/**
 * FAQSection - Expandable FAQs using Accordion
 *
 * Addresses common questions with direct, confident answers.
 * Fully accessible with proper ARIA and keyboard navigation.
 *
 * @example
 * ```tsx
 * <FAQSection
 *   title="Frequently Asked Questions"
 *   faqs={[
 *     { id: '1', question: 'How long does implementation take?', answer: 'Typically 2-3 weeks.' },
 *     { id: '2', question: 'Do I need engineering resources?', answer: 'Minimal. We handle the heavy lifting.' }
 *   ]}
 *   defaultOpen={['1']}
 * />
 * ```
 */
export function FAQSection({
  locale = 'en',
  className,
  title = 'Frequently Asked Questions',
  subtitle,
  faqs,
}: FAQSectionProps) {
  // Group FAQs by category if provided
  const categorized = faqs.some(faq => faq.category);
  const groupedFaqs = React.useMemo(() => {
    if (!categorized) return { '': faqs };

    return faqs.reduce<Record<string, FAQItem[]>>((acc, faq) => {
      const category = faq.category || '';
      if (!acc[category]) acc[category] = [];
      acc[category].push(faq);
      return acc;
    }, {});
  }, [faqs, categorized]);

  return (
    <section
      className={cn('space-y-6', className)}
      aria-labelledby="faq-section-title"
    >
      {/* Header */}
      <div className="space-y-2">
        <h2 id="faq-section-title" className="text-3xl font-bold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg">
            {subtitle}
          </p>
        )}
      </div>

      {/* FAQs */}
      {categorized ? (
        <div className="space-y-6">
          {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
            <div key={category || 'default'} className="space-y-3">
              {category && (
                <h3 className="text-lg font-semibold text-muted-foreground px-1">
                  {category}
                </h3>
              )}
              <Card>
                <CardContent className="p-0">
                  <AccordionPrimitive.Root
                    type="multiple"
                    className="divide-y"
                  >
                    {categoryFaqs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id} className="px-6">
                        <AccordionTrigger className="hover:no-underline hover:text-primary py-4 text-left">
                          <span className="flex items-center gap-3">
                            <HelpCircle className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden="true" />
                            <span className="font-medium">{faq.question}</span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4 pt-0 pl-8">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </AccordionPrimitive.Root>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <AccordionPrimitive.Root
              type="multiple"
              className="divide-y"
            >
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="px-6">
                  <AccordionTrigger className="hover:no-underline hover:text-primary py-4 text-left">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-muted-foreground shrink-0" aria-hidden="true" />
                      <span className="font-medium">{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 pt-0 pl-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </AccordionPrimitive.Root>
          </CardContent>
        </Card>
      )}

      {/* Accessibility note */}
      <p className="text-sm text-muted-foreground text-center">
        {locale === 'en'
          ? 'Use Enter or Space to toggle answers. Navigate with Tab and arrow keys.'
          : 'Use Enter ou Espaço para alternar respostas. Navegue com Tab e setas.'}
      </p>
    </section>
  );
}
