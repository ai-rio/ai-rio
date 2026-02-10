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

export function parseCounterValue(value: string | number): number {
  if (typeof value === 'number') return value;
  return parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
}
