/**
 * MDX Provider component for rendering blog posts
 * Provides custom components for MDX elements
 */

'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MDXProviderProps {
  children: React.ReactNode;
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  id?: string;
}

// Custom heading component with anchor links
const Heading = ({ level, children, id, ...props }: HeadingProps) => {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const baseClasses = 'scroll-mt-20';

  const sizeClasses = {
    1: 'text-4xl font-bold mt-8 mb-4',
    2: 'text-3xl font-semibold mt-8 mb-3',
    3: 'text-2xl font-semibold mt-6 mb-2',
    4: 'text-xl font-semibold mt-4 mb-2',
    5: 'text-lg font-medium mt-3 mb-1',
    6: 'text-base font-medium mt-2 mb-1',
  };

  return React.createElement(Tag, {
    id,
    className: `${baseClasses} ${sizeClasses[level]}`,
    ...props
  }, children);
};

// Custom code block component - improved to properly detect code blocks
const CodeBlock = ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
  // Check if this is inside a pre tag (code block) or inline code
  const isInline = !className?.includes('language-') && !className?.includes('hljs');

  if (isInline) {
    return (
      <code
        className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground"
        {...props}
      >
        {children}
      </code>
    );
  }

  // This is a code block - it will be wrapped by the pre component
  return (
    <code className={className || ''} {...props}>
      {children}
    </code>
  );
};

// Custom pre component for code blocks
const PreBlock = ({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-border">
      <pre className={`bg-[#0d1117] text-[#c9d1d9] p-4 overflow-x-auto text-sm ${className || ''}`} {...props}>
        {children}
      </pre>
    </div>
  );
};

// Custom callout component
const Callout = ({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'success' | 'error'; title?: string; children: React.ReactNode }) => {
  const colors = {
    info: 'bg-blue-50 border-blue-500 text-blue-900',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-900',
    success: 'bg-green-50 border-green-500 text-green-900',
    error: 'bg-red-50 border-red-500 text-red-900',
  };

  return (
    <Card className={`my-6 border-l-4 ${colors[type]}`}>
      <CardContent className="pt-6">
        {title && <p className="font-semibold mb-2">{title}</p>}
        <div className="prose prose-sm max-w-none">{children}</div>
      </CardContent>
    </Card>
  );
};

export function MDXProvider({ children }: MDXProviderProps) {
  return <>{children}</>;
}

// Export custom components for use in MDX
export const MDXComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <Heading level={1} {...props}>{children}</Heading>,
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <Heading level={2} {...props}>{children}</Heading>,
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <Heading level={3} {...props}>{children}</Heading>,
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <Heading level={4} {...props}>{children}</Heading>,
  h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <Heading level={5} {...props}>{children}</Heading>,
  h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <Heading level={6} {...props}>{children}</Heading>,
  pre: PreBlock,
  code: CodeBlock,
  p: ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={`text-base leading-7 my-4 ${className || ''}`} {...props}>
      {children}
    </p>
  ),
  a: ({ className, children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className={`text-primary underline underline-offset-4 hover:text-primary/80 ${className || ''}`}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ className, children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={`list-disc list-inside my-4 space-y-2 ${className || ''}`} {...props}>
      {children}
    </ul>
  ),
  ol: ({ className, children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={`list-decimal list-inside my-4 space-y-2 ${className || ''}`} {...props}>
      {children}
    </ol>
  ),
  li: ({ className, children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={`text-base ${className || ''}`} {...props}>
      {children}
    </li>
  ),
  blockquote: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className={`border-l-4 border-primary pl-4 italic my-4 text-muted-foreground ${className || ''}`} {...props}>
      {children}
    </blockquote>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),
  table: ({ className, children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-4 overflow-x-auto">
      <table className={`min-w-full divide-y divide-border ${className || ''}`} {...props}>
        {children}
      </table>
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-border bg-background" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr {...props} />
  ),
  th: ({ className, children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground ${className || ''}`} {...props}>
      {children}
    </th>
  ),
  td: ({ className, children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className={`px-4 py-3 text-sm ${className || ''}`} {...props}>
      {children}
    </td>
  ),
  img: ({ className, alt = '', ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img className={`rounded-lg my-4 ${className || ''}`} alt={alt} {...props} />
  ),
  strong: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={`font-semibold ${className || ''}`} {...props}>
      {children}
    </strong>
  ),
  Callout,
  Tag: ({ children }: { children: React.ReactNode }) => (
    <Badge variant="secondary" className="mr-2 mb-2">
      {children}
    </Badge>
  ),
};
