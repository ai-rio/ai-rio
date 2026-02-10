'use client';

import * as React from 'react';

export interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function Counter({ value, suffix = '', prefix = '' }: CounterProps) {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

// Add default export
export default Counter;
