'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Send, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  message: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export interface SimplifiedContactFormProps {
  locale?: string;
  className?: string;
  title?: string;
  description?: string;
  contextText?: string;
  submitLabel?: string;
  onSubmit?: (values: ContactFormValues) => void | Promise<void>;
  emailAddress?: string;
}

/**
 * SimplifiedContactForm - Minimal contact form with name, email, and optional message
 *
 * Focused on reducing friction for initial contact.
 * No company field, no service dropdown - just the essentials.
 *
 * @example
 * ```tsx
 * <SimplifiedContactForm
 *   contextText="Start with an audit or book a call"
 *   emailAddress="hello@ai-rio.com"
 *   onSubmit={async (values) => {
 *     // Handle form submission
 *   }}
 * />
 * ```
 */
export function SimplifiedContactForm({
  locale = 'en',
  className,
  title,
  description,
  contextText,
  submitLabel,
  onSubmit,
  emailAddress = 'hello@ai-rio.com',
}: SimplifiedContactFormProps) {
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
      if (onSubmit) {
        await onSubmit(values);
        setIsSuccess(true);
      } else {
        // Default behavior: open email client
        const subject = encodeURIComponent('AI.RIO Inquiry');
        const body = encodeURIComponent(
          `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message || 'No additional message.'}`
        );
        window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTitle = locale === 'en' ? 'Get in Touch' : 'Entre em Contato';
  const defaultSubmitLabel = locale === 'en' ? 'Send Message' : 'Enviar Mensagem';

  if (isSuccess) {
    return (
      <Card className={cn('border-green-500/50 bg-green-500/5', className)}>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 mb-4">
            <Send className="h-6 w-6 text-green-600 dark:text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {locale === 'en' ? 'Message Sent!' : 'Mensagem Enviada!'}
          </h3>
          <p className="text-muted-foreground">
            {locale === 'en'
              ? "I'll get back to you within 24 hours."
              : 'Responderei em até 24 horas.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="space-y-4">
        {contextText && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>{contextText}</span>
          </div>
        )}
        <CardTitle className="text-2xl">{title || defaultTitle}</CardTitle>
        {description && (
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {locale === 'en' ? 'Name' : 'Nome'} *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={locale === 'en' ? 'Your name' : 'Seu nome'}
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
                  <FormLabel>
                    {locale === 'en' ? 'Email' : 'E-mail'} *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={locale === 'en' ? 'you@example.com' : 'voce@exemplo.com'}
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
                  <FormLabel>
                    {locale === 'en' ? 'Message (optional)' : 'Mensagem (opcional)'}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        locale === 'en'
                          ? 'Tell me about your billing challenges...'
                          : 'Conte-me sobre seus desafios de cobrança...'
                      }
                      rows={4}
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Helper Text */}
            <p className="text-xs text-muted-foreground">
              {locale === 'en'
                ? 'Next steps: I\'ll review your message and reach out within 24 hours to schedule a call.'
                : 'Próximos passos: Analisarei sua mensagem e entrarei em contato em até 24 horas para agendar uma chamada.'}
            </p>

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
                  {locale === 'en' ? 'Sending...' : 'Enviando...'}
                </>
              ) : (
                <>
                  {submitLabel || defaultSubmitLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
