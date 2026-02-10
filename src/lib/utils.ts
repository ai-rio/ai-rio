import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with en-US locale (comma for thousands, no decimal places)
 *
 * Uses manual formatting to guarantee consistency between server and client.
 * This prevents hydration mismatches caused by server/client locale differences.
 *
 * @param value - Number to format
 * @returns Formatted number string (e.g., "1,234" for 1234)
 *
 * @example
 * ```tsx
 * formatNumber(50000); // "50,000"
 * formatNumber(1234567); // "1,234,567"
 * ```
 */
export function formatNumber(value: number): string {
  // Handle edge cases
  if (!isFinite(value)) {
    return '0';
  }

  // Manual number formatting that's deterministic regardless of locale
  // This ensures server and client always produce the same output
  const absValue = Math.abs(value);
  const parts = absValue.toString().split('.');
  const integerPart = parts[0];

  // Add commas for thousands (always en-US style)
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const result = value < 0 ? `-${formattedInteger}` : formattedInteger;

  return result;
}

/**
 * Format a number as USD currency with commas (no decimal places)
 *
 * Uses manual formatting to guarantee consistency between server and client.
 * This prevents hydration mismatches caused by server/client locale differences.
 *
 * @param value - Number in dollars (not cents)
 * @returns Formatted currency string (e.g., "$12,450" for 12450)
 *
 * @example
 * ```tsx
 * formatCurrency(12450); // "$12,450"
 * formatCurrency(50); // "$50"
 * ```
 */
export function formatCurrency(value: number): string {
  return `$${formatNumber(value)}`;
}

/**
 * Format a number as USD currency from cents with 2 decimal places
 *
 * Uses manual formatting to guarantee consistency between server and client.
 * This prevents hydration mismatches caused by server/client locale differences.
 *
 * @param value - Number in cents (will be divided by 100)
 * @returns Formatted currency string (e.g., "$12.45" for 1245 cents)
 *
 * @example
 * ```tsx
 * formatCurrencyCents(1245); // "$12.45"
 * formatCurrencyCents(50); // "$0.50"
 * ```
 */
export function formatCurrencyCents(value: number): string {
  const dollars = value / 100;
  const absDollars = Math.abs(dollars);

  // Split into integer and decimal parts
  const integerStr = Math.floor(absDollars).toString();
  const decimalStr = Math.round((absDollars % 1) * 100).toString().padStart(2, '0');

  // Add commas to integer part
  const formattedInteger = integerStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const result = dollars < 0
    ? `-$${formattedInteger}.${decimalStr}`
    : `$${formattedInteger}.${decimalStr}`;

  return result;
}
