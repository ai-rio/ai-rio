export function formatCounterValue(
  value: number,
  options?: {
    suffix?: string;
    prefix?: string;
    decimals?: number;
  }
): string {
  const { suffix = '', prefix = '', decimals = 0 } = options || {};
  return `${prefix}${value.toFixed(decimals)}${suffix}`;
}

export function animateValue(
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
): void {
  const startTime = performance.now();

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = start + (end - start) * progress;
    callback(value);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Add missing exports
export function canAnimate(): boolean {
  return typeof requestAnimationFrame !== 'undefined';
}

export interface ParsedCounterValue {
  numeric: number | null;
  prefix: string;
  suffix: string;
}

export function parseCounterValue(value: string | number): ParsedCounterValue {
  if (typeof value === 'number') {
    return { numeric: value, prefix: '', suffix: '' };
  }

  const strValue = String(value);
  // Match patterns like '$15K', '66%', '1.5M', etc.
  const match = strValue.match(/^([^0-9.-]*)([0-9.-]+)([^0-9.-]*)$/);

  if (match) {
    return {
      prefix: match[1] || '',
      numeric: parseFloat(match[2]) || null,
      suffix: match[3] || '',
    };
  }

  // If no pattern match, try to extract just the number
  const numberOnly = parseFloat(strValue.replace(/[^\d.-]/g, ''));
  return {
    prefix: '',
    numeric: isNaN(numberOnly) ? null : numberOnly,
    suffix: '',
  };
}
