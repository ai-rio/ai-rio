'use client';

/**
 * HybridBookingSection - Dual CTA component with Cal.com booking (primary) and contact form (fallback)
 *
 * NOTE: Formbricks provider is initialized in layout. To use Formbricks forms:
 * 1. Create a form on https://app.formbricks.com
 * 2. Add the form ID to FORMBRICKS_CONTACT_FORM_ID in .env
 * 3. Replace the mailto form submission with Formbricks inline/embed form
 *
 * UX Pattern: "Choice Architecture" - Offering options increases conversion
 * while maintaining booking as the primary, lowest-friction path.
 */

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, Mail, Send, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { CalcomButton } from './calcom-booking-button';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  message: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export interface HybridBookingSectionProps {
  locale?: string;
  className?: string;
  title?: string;
  description?: string;
  calLink?: string;
  emailAddress?: string;
}

type TabType = 'booking' | 'contact';

/**
 * HybridBookingSection - Dual CTA component with Cal.com booking (primary) and contact form (fallback)
 *
 * UX Pattern: "Choice Architecture" - Offering options increases conversion
 * while maintaining booking as the primary, lowest-friction path.
 *
 * @example
 * ```tsx
 * <HybridBookingSection
 *   calLink="ai-rio/discovery"
 *   emailAddress="hello@ai-rio.com"
 * />
 * ```
 */
export function HybridBookingSection({
  locale = 'en',
  className,
  title,
  description,
  calLink = 'ai-rio/30min',
  emailAddress = 'hello@ai-rio.com',
}: HybridBookingSectionProps) {
  const [activeTab, setActiveTab] = React.useState<TabType>('booking');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const handleSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // Open email client with pre-filled data
      const subject = encodeURIComponent('AI.RIO Inquiry');
      const body = encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message || 'No additional message.'}`
      );
      window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
      setIsSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTitle = locale === 'en' ? "Let's Talk" : 'Vamos Conversar';

  // Translations
  const tabs = {
    booking: {
      label: locale === 'en' ? 'Schedule a Call' : 'Agendar Chamada',
      icon: Calendar,
      description: locale === 'en'
        ? 'Pick a time that works for you. Instant confirmation, automatic reminders.'
        : 'Escolha um horário que funcione para você. Confirmação instantânea, lembretes automáticos.',
      recommended: locale === 'en' ? 'Recommended' : 'Recomendado',
    },
    contact: {
      label: locale === 'en' ? 'Send a Message' : 'Enviar Mensagem',
      icon: Mail,
      description: locale === 'en'
        ? 'Prefer email? No problem—drop me a line and I will respond within 24 hours.'
        : 'Prefere e-mail? Sem problema—mande uma linha e responderei em até 24 horas.',
    },
  };

  const formLabels = {
    name: locale === 'en' ? 'Name' : 'Nome',
    email: locale === 'en' ? 'Email' : 'E-mail',
    message: locale === 'en' ? 'Message (optional)' : 'Mensagem (opcional)',
    namePlaceholder: locale === 'en' ? 'Your name' : 'Seu nome',
    emailPlaceholder: locale === 'en' ? 'you@example.com' : 'voce@exemplo.com',
    messagePlaceholder: locale === 'en'
      ? 'Tell me about your billing challenges...'
      : 'Conte-me sobre seus desafios de cobrança...',
    submit: locale === 'en' ? 'Send Message' : 'Enviar Mensagem',
    sending: locale === 'en' ? 'Sending...' : 'Enviando...',
    successTitle: locale === 'en' ? 'Message Sent!' : 'Mensagem Enviada!',
    successMessage: locale === 'en'
      ? "I'll get back to you within 24 hours."
      : 'Responderei em até 24 horas.',
  };

  if (isSuccess) {
    return (
      <Card className={cn('border-green-500/50 bg-green-500/5', className)}>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 mb-6">
            <Send className="h-8 w-8 text-green-600 dark:text-green-500" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-text">
            {formLabels.successTitle}
          </h3>
          <p className="text-base text-surface-700">{formLabels.successMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      'border-white/[0.06] bg-gradient-to-b from-surface-mixed-200/80 to-surface-mixed-100/60 backdrop-blur-sm',
      className
    )}>
      <CardHeader className="space-y-4">
        <CardTitle className="text-3xl text-center">{title || defaultTitle}</CardTitle>
        {description && (
          <CardDescription className="text-center text-lg text-surface-700">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Tab Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Booking Tab - Primary (Recommended) */}
          <button
            type="button"
            onClick={() => setActiveTab('booking')}
            className={cn(
              'group relative flex flex-col items-center gap-4 rounded-xl border-2 p-6 transition-all duration-200 cursor-pointer',
              'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10',
              activeTab === 'booking'
                ? 'border-primary bg-primary/5'
                : 'border-surface-mixed-300 bg-surface-mixed-100/50'
            )}
          >
            {activeTab === 'booking' && (
              <Badge variant="default" className="absolute -top-3 -right-3 shrink-0">
                {tabs.booking.recommended}
              </Badge>
            )}
            <div className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200',
              activeTab === 'booking' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            )}>
              <Calendar className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="text-center space-y-2">
              <h3 className={cn(
                'font-semibold transition-colors duration-200',
                activeTab === 'booking' ? 'text-text' : 'text-surface-700'
              )}>
                {tabs.booking.label}
              </h3>
              <p className="text-sm text-surface-700">
                {tabs.booking.description}
              </p>
            </div>
          </button>

          {/* Contact Tab - Secondary */}
          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={cn(
              'group flex flex-col items-center gap-4 rounded-xl border-2 p-6 transition-all duration-200 cursor-pointer',
              'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10',
              activeTab === 'contact'
                ? 'border-primary bg-primary/5'
                : 'border-surface-mixed-300 bg-surface-mixed-100/50'
            )}
          >
            <div className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200',
              activeTab === 'contact' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            )}>
              <Mail className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="text-center space-y-2">
              <h3 className={cn(
                'font-semibold transition-colors duration-200',
                activeTab === 'contact' ? 'text-text' : 'text-surface-700'
              )}>
                {tabs.contact.label}
              </h3>
              <p className="text-sm text-surface-700">
                {tabs.contact.description}
              </p>
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[300px]">
          {/* Booking Panel - Cal.com Button */}
          {activeTab === 'booking' && (
            <div className="flex flex-col items-center justify-center space-y-6 py-8">
              {/* Cal.com Booking Button - Large, Primary */}
              <CalcomButton
                calLink={calLink}
                size="lg"
                variant="primary"
                className="w-full max-w-md text-lg h-16"
              >
                {locale === 'en' ? 'Book a 30-Minute Call' : 'Agendar Chamada de 30 Minutos'}
              </CalcomButton>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-surface-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden="true" />
                  <span>{locale === 'en' ? 'Instant confirmation' : 'Confirmação instantânea'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500" aria-hidden="true" />
                  <span>{locale === 'en' ? 'Automatic reminders' : 'Lembretes automáticos'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-purple-500" aria-hidden="true" />
                  <span>{locale === 'en' ? '30 minutes' : '30 minutos'}</span>
                </div>
              </div>

              {/* Helper Text */}
              <p className="text-center text-sm text-surface-700 max-w-md">
                {locale === 'en'
                  ? "Most clients book directly. You'll receive a calendar invite within minutes."
                  : 'A maioria dos clientes agenda diretamente. Você receberá um convite do calendário em minutos.'}
              </p>
            </div>
          )}

          {/* Contact Panel - Form */}
          {activeTab === 'contact' && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 py-4">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formLabels.name} *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={formLabels.namePlaceholder}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formLabels.email} *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={formLabels.emailPlaceholder}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message Field (Optional) */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{formLabels.message}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={formLabels.messagePlaceholder}
                          rows={4}
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      {formLabels.sending}
                    </>
                  ) : (
                    <>
                      {formLabels.submit}
                      <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
