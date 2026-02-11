/**
 * Navigation Configuration for next-intl
 *
 * This file exports navigation utilities created by next-intl's createNavigation.
 * These utilities provide type-safe navigation with locale support.
 *
 * @example
 * ```tsx
 * import { Link, useRouter, usePathname } from '@/i18n/navigation';
 *
 * // Type-safe Link component with locale prefix handling
 * <Link href="/services/payment-recovery">Payment Recovery</Link>
 *
 * // In a component or Server Action
 * const router = useRouter();
 * router.push('/contact');
 * ```
 */

import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
