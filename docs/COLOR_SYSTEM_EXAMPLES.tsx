/**
 * Color System Usage Examples
 *
 * This file demonstrates how to use the ai.rio color system
 * in React components with Tailwind CSS classes.
 */

import React from 'react';

// ============================================
// BUTTONS
// ============================================

export const ButtonExamples = () => (
  <div className="space-y-4">
    {/* Primary Button */}
    <button className="bg-primary hover:bg-primary-500 text-primary-foreground px-6 py-3 rounded-button transition-all duration-200 active:scale-98">
      Primary Action
    </button>

    {/* Secondary Button */}
    <button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-button transition-all">
      Secondary Action
    </button>

    {/* Ghost Button */}
    <button className="bg-transparent hover:bg-mixed-surface-200 text-primary border border-primary px-6 py-3 rounded-button transition-all">
      Ghost Button
    </button>

    {/* Outline Button */}
    <button className="bg-transparent hover:bg-primary hover:text-white text-primary border border-mixed-surface-300 px-6 py-3 rounded-button transition-all">
      Outline Button
    </button>

    {/* Destructive Button */}
    <button className="bg-negative hover:bg-negative-dark text-white px-6 py-3 rounded-button transition-all">
      Delete
    </button>
  </div>
);

// ============================================
// CARDS
// ============================================

export const CardExamples = () => (
  <div className="space-y-6">
    {/* Basic Card */}
    <div className="bg-mixed-surface-200 border border-mixed-surface-300 rounded-card p-6">
      <h3 className="text-text text-xl font-semibold mb-2">Card Title</h3>
      <p className="text-muted-foreground">Card description goes here.</p>
    </div>

    {/* Interactive Card */}
    <div className="bg-mixed-surface-200 border border-mixed-surface-300 hover:border-primary rounded-card p-6 transition-all cursor-pointer hover:shadow-brand">
      <h3 className="text-text text-xl font-semibold mb-2">Interactive Card</h3>
      <p className="text-muted-foreground">Hover to see the effect.</p>
    </div>

    {/* Glass Card */}
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-card-lg p-6">
      <h3 className="text-text text-xl font-semibold mb-2">Glass Card</h3>
      <p className="text-muted-foreground">With glassmorphism effect.</p>
    </div>

    {/* Elevated Card */}
    <div className="bg-dark-surface-300 border border-mixed-surface-400 rounded-card-lg p-6 shadow-card-lg">
      <h3 className="text-text text-xl font-semibold mb-2">Elevated Card</h3>
      <p className="text-muted-foreground">With shadow elevation.</p>
    </div>
  </div>
);

// ============================================
// BADGES & LABELS
// ============================================

export const BadgeExamples = () => (
  <div className="flex flex-wrap gap-2">
    {/* Success Badge */}
    <span className="bg-positive/10 text-positive px-3 py-1 rounded-full text-sm font-medium">
      Success
    </span>

    {/* Warning Badge */}
    <span className="bg-warning/10 text-warning px-3 py-1 rounded-full text-sm font-medium">
      Warning
    </span>

    {/* Error Badge */}
    <span className="bg-negative/10 text-negative px-3 py-1 rounded-full text-sm font-medium">
      Error
    </span>

    {/* Info Badge */}
    <span className="bg-info/10 text-info px-3 py-1 rounded-full text-sm font-medium">
      Info
    </span>

    {/* Primary Badge */}
    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
      Primary
    </span>

    {/* Secondary Badge */}
    <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
      Secondary
    </span>
  </div>
);

// ============================================
// FORM INPUTS
// ============================================

export const InputExamples = () => (
  <div className="space-y-4 max-w-md">
    {/* Text Input */}
    <div>
      <label className="block text-text text-sm font-medium mb-2">
        Email
      </label>
      <input
        type="email"
        className="w-full bg-dark-surface-100 border border-mixed-surface-300 text-text rounded-input px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        placeholder="you@example.com"
      />
    </div>

    {/* Textarea */}
    <div>
      <label className="block text-text text-sm font-medium mb-2">
        Message
      </label>
      <textarea
        className="w-full bg-dark-surface-100 border border-mixed-surface-300 text-text rounded-input px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
        rows={4}
        placeholder="Enter your message..."
      />
    </div>

    {/* Select */}
    <div>
      <label className="block text-text text-sm font-medium mb-2">
        Category
      </label>
      <select className="w-full bg-dark-surface-100 border border-mixed-surface-300 text-text rounded-input px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all">
        <option>Select an option</option>
        <option>Option 1</option>
        <option>Option 2</option>
      </select>
    </div>
  </div>
);

// ============================================
// ALERTS & NOTIFICATIONS
// ============================================

export const AlertExamples = () => (
  <div className="space-y-4">
    {/* Success Alert */}
    <div className="bg-positive/10 border border-positive/30 rounded-card p-4">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-positive mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <div>
          <h4 className="text-positive font-semibold">Success</h4>
          <p className="text-positive-light text-sm">Your action was completed successfully.</p>
        </div>
      </div>
    </div>

    {/* Error Alert */}
    <div className="bg-negative/10 border border-negative/30 rounded-card p-4">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-negative mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <div>
          <h4 className="text-negative font-semibold">Error</h4>
          <p className="text-negative-light text-sm">Something went wrong. Please try again.</p>
        </div>
      </div>
    </div>

    {/* Warning Alert */}
    <div className="bg-warning/10 border border-warning/30 rounded-card p-4">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-warning mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div>
          <h4 className="text-warning font-semibold">Warning</h4>
          <p className="text-warning-light text-sm">Please review this information carefully.</p>
        </div>
      </div>
    </div>

    {/* Info Alert */}
    <div className="bg-info/10 border border-info/30 rounded-card p-4">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-info mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <div>
          <h4 className="text-info font-semibold">Info</h4>
          <p className="text-info-light text-sm">Here is some additional information.</p>
        </div>
      </div>
    </div>
  </div>
);

// ============================================
// NAVIGATION
// ============================================

export const NavigationExamples = () => (
  <div className="space-y-6">
    {/* Top Navigation */}
    <nav className="bg-mixed-surface-200 border-b border-mixed-surface-300 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-primary text-2xl font-bold">Logo</div>
        <div className="flex gap-6">
          <a href="#" className="text-text hover:text-primary transition-colors">Home</a>
          <a href="#" className="text-text hover:text-primary transition-colors">About</a>
          <a href="#" className="text-text hover:text-primary transition-colors">Services</a>
          <a href="#" className="text-text hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </nav>

    {/* Sidebar Navigation */}
    <aside className="bg-mixed-surface-200 border-r border-mixed-surface-300 w-64 p-4">
      <nav className="space-y-2">
        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-button">
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-mixed-surface-300 rounded-button transition-colors">
          <span>Analytics</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-mixed-surface-300 rounded-button transition-colors">
          <span>Settings</span>
        </a>
      </nav>
    </aside>

    {/* Breadcrumbs */}
    <nav className="flex items-center gap-2 text-sm">
      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
      <span className="text-muted-foreground">/</span>
      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Products</a>
      <span className="text-muted-foreground">/</span>
      <span className="text-text">Current Page</span>
    </nav>
  </div>
);

// ============================================
// HERO SECTIONS
// ============================================

export const HeroExample = () => (
  <section className="relative overflow-hidden bg-dark-page py-24">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

    {/* Content */}
    <div className="relative container mx-auto px-6 text-center">
      <h1 className="text-6xl font-bold text-text mb-6">
        Welcome to{' '}
        <span className="text-primary">ai.rio</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Building the future of artificial intelligence solutions
      </p>
      <div className="flex gap-4 justify-center">
        <button className="bg-primary hover:bg-primary-500 text-primary-foreground px-8 py-4 rounded-button transition-all shadow-glow">
          Get Started
        </button>
        <button className="bg-transparent hover:bg-mixed-surface-200 text-primary border border-primary px-8 py-4 rounded-button transition-all">
          Learn More
        </button>
      </div>
    </div>
  </section>
);

// ============================================
// DATA TABLES
// ============================================

export const TableExample = () => (
  <div className="bg-mixed-surface-200 border border-mixed-surface-300 rounded-card overflow-hidden">
    <table className="w-full">
      <thead className="bg-mixed-surface-300 border-b border-mixed-surface-400">
        <tr>
          <th className="px-6 py-4 text-left text-text font-semibold">Name</th>
          <th className="px-6 py-4 text-left text-text font-semibold">Status</th>
          <th className="px-6 py-4 text-left text-text font-semibold">Date</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-mixed-surface-300">
        <tr className="hover:bg-mixed-surface-300 transition-colors">
          <td className="px-6 py-4 text-text">John Doe</td>
          <td className="px-6 py-4">
            <span className="bg-positive/10 text-positive px-3 py-1 rounded-full text-sm">Active</span>
          </td>
          <td className="px-6 py-4 text-muted-foreground">2024-02-11</td>
        </tr>
        <tr className="hover:bg-mixed-surface-300 transition-colors">
          <td className="px-6 py-4 text-text">Jane Smith</td>
          <td className="px-6 py-4">
            <span className="bg-warning/10 text-warning px-3 py-1 rounded-full text-sm">Pending</span>
          </td>
          <td className="px-6 py-4 text-muted-foreground">2024-02-10</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// ============================================
// FULL PAGE LAYOUT EXAMPLE
// ============================================

export const FullLayoutExample = () => (
  <div className="min-h-screen bg-dark-page">
    {/* Header */}
    <header className="bg-mixed-surface-200 border-b border-mixed-surface-300 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-primary text-2xl font-bold">ai.rio</div>
        <nav className="flex gap-6">
          <a href="#" className="text-text hover:text-primary transition-colors">Home</a>
          <a href="#" className="text-text hover:text-primary transition-colors">Features</a>
          <a href="#" className="text-text hover:text-primary transition-colors">Pricing</a>
        </nav>
        <button className="bg-primary hover:bg-primary-500 text-primary-foreground px-6 py-2 rounded-button transition-all">
          Sign In
        </button>
      </div>
    </header>

    {/* Main Content */}
    <main className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature Cards */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-mixed-surface-200 border border-mixed-surface-300 hover:border-primary rounded-card p-6 transition-all cursor-pointer"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-button flex items-center justify-center mb-4">
              <span className="text-primary text-2xl">★</span>
            </div>
            <h3 className="text-text text-xl font-semibold mb-2">Feature {i}</h3>
            <p className="text-muted-foreground">
              Description of feature {i} goes here.
            </p>
          </div>
        ))}
      </div>
    </main>

    {/* Footer */}
    <footer className="bg-mixed-surface-200 border-t border-mixed-surface-300 mt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-primary text-xl font-bold mb-4">ai.rio</div>
            <p className="text-muted-foreground text-sm">
              Building the future of AI solutions.
            </p>
          </div>
          <div>
            <h4 className="text-text font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-text font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-text font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">License</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
);
