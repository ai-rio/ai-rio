/**
 * Status Badge Component
 * ======================
 *
 * Reusable badge component for displaying profitability status.
 * Extracted from resources page calculator results display.
 *
 * Maps ProfitabilityStatus to appropriate color schemes:
 * - healthy -> profit (green)
 * - warning -> warning (yellow/orange)
 * - crisis -> danger (red)
 */

import { Badge } from '@/components/ui/badge';
import type { ProfitabilityStatus } from '@/types/resources';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import type { ReactNode } from 'react';

export interface StatusBadgeProps {
  /** The profitability status to display */
  status: ProfitabilityStatus;
  /** Optional custom content (defaults to status text) */
  children?: ReactNode;
}

interface StatusConfig {
  className: string;
  icon: typeof CheckCircle2 | typeof AlertTriangle | typeof XCircle;
}

const STATUS_CONFIG = {
  healthy: { className: 'bg-profit/10 text-profit border-profit/20', icon: CheckCircle2 },
  warning: { className: 'bg-warning/10 text-warning border-warning/20', icon: AlertTriangle },
  crisis: { className: 'bg-danger/10 text-danger border-danger/20', icon: XCircle },
} as const satisfies Record<ProfitabilityStatus, StatusConfig>;

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <Badge className={config.className}>
      <Icon className="w-3 h-3 mr-1" />
      {children}
    </Badge>
  );
}
