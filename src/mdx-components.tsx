import type { MDXComponents } from 'mdx/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/**
 * This file is required to use MDX in Next.js 15.
 * It provides custom components for MDX elements.
 */

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Wrapper for code blocks
    pre: ({ className, ...props }) => (
      <pre
        className={className}
        style={{
          backgroundColor: '#1e1e1e',
          borderRadius: '0.5rem',
          padding: '1rem',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
        {...props}
      />
    ),
    // Inline code
    code: ({ className, ...props }) => {
      const isInline = !className?.includes('language-');
      if (isInline) {
        return (
          <code
            className={className}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
              fontWeight: '500',
            }}
            {...props}
          />
        );
      }
      return <code className={className} {...props} />;
    },
    // Headings with anchor links
    h1: ({ className, ...props }) => (
      <h1
        className={className}
        style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          lineHeight: '1.2',
        }}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={className}
        style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginTop: '2rem',
          marginBottom: '0.75rem',
          lineHeight: '1.3',
        }}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={className}
        style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginTop: '1.5rem',
          marginBottom: '0.5rem',
          lineHeight: '1.4',
        }}
        {...props}
      />
    ),
    // Paragraphs
    p: ({ className, ...props }) => (
      <p
        className={className}
        style={{
          fontSize: '1.125rem',
          lineHeight: '1.75',
          marginBottom: '1rem',
          color: 'rgba(0, 0, 0, 0.8)',
        }}
        {...props}
      />
    ),
    // Links
    a: ({ className, ...props }) => (
      <a
        className={className}
        style={{
          color: '#0f172a',
          textDecoration: 'underline',
          fontWeight: '500',
        }}
        {...props}
      />
    ),
    // Lists
    ul: ({ className, ...props }) => (
      <ul
        className={className}
        style={{
          paddingLeft: '1.5rem',
          marginBottom: '1rem',
          fontSize: '1.125rem',
          lineHeight: '1.75',
        }}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={className}
        style={{
          paddingLeft: '1.5rem',
          marginBottom: '1rem',
          fontSize: '1.125rem',
          lineHeight: '1.75',
        }}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li
        className={className}
        style={{
          marginBottom: '0.5rem',
        }}
        {...props}
      />
    ),
    // Blockquotes
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={className}
        style={{
          borderLeft: '4px solid #0f172a',
          paddingLeft: '1rem',
          fontStyle: 'italic',
          marginBottom: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          padding: '1rem',
        }}
        {...props}
      />
    ),
    // Tables
    table: ({ className, ...props }) => (
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table
          className={className}
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '1rem',
          }}
          {...props}
        />
      </div>
    ),
    thead: ({ className, ...props }) => (
      <thead
        className={className}
        style={{
          borderBottom: '2px solid #0f172a',
        }}
        {...props}
      />
    ),
    tbody: ({ className, ...props }) => <tbody className={className} {...props} />,
    tr: ({ className, ...props }) => (
      <tr
        className={className}
        style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
        {...props}
      />
    ),
    th: ({ className, ...props }) => (
      <th
        className={className}
        style={{
          padding: '0.75rem',
          textAlign: 'left',
          fontWeight: '600',
        }}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={className}
        style={{
          padding: '0.75rem',
        }}
        {...props}
      />
    ),
    // Separator
    hr: ({ className, ...props }) => (
      <hr
        className={className}
        style={{
          border: 'none',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          margin: '2rem 0',
        }}
        {...props}
      />
    ),
    // Images
    img: ({ className, alt = '', ...props }) => (
      <img
        className={className}
        alt={alt}
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '0.5rem',
          margin: '1rem 0',
        }}
        {...props}
      />
    ),
    // Strong/Bold
    strong: ({ className, ...props }) => (
      <strong
        className={className}
        style={{
          fontWeight: '700',
        }}
        {...props}
      />
    ),
    // Custom callout component
    Callout: ({ type = 'info', children }: { type?: 'info' | 'warning' | 'success' | 'error'; children: React.ReactNode }) => (
      <Card
        className="my-6"
        style={{
          backgroundColor:
            type === 'warning'
              ? '#fef3c7'
              : type === 'success'
              ? '#d1fae5'
              : type === 'error'
              ? '#fee2e2'
              : '#dbeafe',
          borderLeft: `4px solid ${
            type === 'warning'
              ? '#f59e0b'
              : type === 'success'
              ? '#10b981'
              : type === 'error'
              ? '#ef4444'
              : '#3b82f6'
          }`,
        }}
      >
        <CardContent className="pt-6" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
          {children}
        </CardContent>
      </Card>
    ),
    // Custom badge for tags
    Tag: ({ children }: { children: React.ReactNode }) => (
      <Badge
        variant="secondary"
        style={{
          marginRight: '0.5rem',
          marginBottom: '0.5rem',
          display: 'inline-block',
        }}
      >
        {children}
      </Badge>
    ),
    ...components,
  };
}
