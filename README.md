# AI.RIO

> Billing Infrastructure Specialist for AI SaaS Companies

I help AI SaaS companies track and optimize their LLM costs—so you know your true margins and stop losing money on heavy users.

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

Visit [http://localhost:3001](http://localhost:3001) to see the site.

## 📋 Overview

AI.RIO is a Next.js 15 portfolio site showcasing billing infrastructure consulting services for AI SaaS companies. The site features:

- **Internationalization**: Full support for English, Spanish, and Portuguese
- **SEO Optimized**: Comprehensive metadata, sitemap, and robots.txt
- **Modern Stack**: Next.js 15 App Router, Tailwind CSS 4, TypeScript
- **Performance**: Server-side rendering, static generation, optimized assets

## 🏗️ Tech Stack

| Technology | Version | Purpose |
|-------------|---------|---------|
| [Next.js](https://nextjs.org) | 15.5.12 | React framework with App Router |
| [next-intl](https://next-intl-docs.vercel.app/) | 4.8.2 | Internationalization |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Styling |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |
| [Bun](https://bun.sh) | 1.3.1 | Package manager |

## 📁 Project Structure

```
src/
├── app/
│   └── [locale]/              # Dynamic locale routing (en, es, pt)
│       ├── page.tsx            # Homepage
│       ├── layout.tsx          # Root layout with fonts
│       └── sitemap.ts, robots.ts
├── components/
│   └── navbar.tsx             # Navigation component
├── i18n/
│   ├── routing.ts              # Locale configuration
│   ├── request.ts             # i18n middleware setup
│   └── messages/              # Translation files
│       └── {locale}/
│           ├── ui.json         # UI strings
│           └── metadata.json  # SEO metadata
└── lib/
    └── metadata/              # SEO utilities
        ├── base-metadata.ts   # URL building, alternates
        └── page-metadata.ts   # Metadata generation
```

## 🌍 Locales

The site supports three languages with automatic browser detection:

| Locale | Code | URL Pattern |
|--------|------|-------------|
| English | `en` | `/` (no prefix) |
| Spanish | `es` | `/es/*` |
| Portuguese | `pt` | `/pt/*` |

Users are automatically redirected based on browser `Accept-Language` header.

## 🛠️ Development

### Scripts

```bash
bun dev          # Start dev server on port 3001 (0.0.0.0 binding for WSL)
bun build        # Build for production
bun start        # Start production server
bun lint         # Run ESLint
```

### Environment Variables

None required. The site works out of the box.

### WSL Development

The dev server is configured to bind to `0.0.0.0` for Windows browser access from WSL2.

## 📈 Services

| Service | Price | Timeline |
|---------|-------|----------|
| Stripe Payment Recovery | $2,000–4,000 | 7–10 days |
| Usage-Based Pricing Launch | $3,000–5,000 | 10–14 days |
| AI Cost Visibility System | $3,000–5,000 | 10–14 days |
| Revenue Leak Detection | $1,500–3,000 | 3–5 days |
| Complete Billing Foundation | $8,000–15,000 | 3–4 weeks |

## 🔧 SEO Features

- **Dynamic Metadata**: Each locale has unique titles, descriptions, keywords
- **Hreflang Links**: Proper alternate language links for all pages
- **Sitemap**: Auto-generated with all routes and locales
- **Robots.txt**: Configured for search engine crawlers
- **OpenGraph & Twitter Cards**: Social sharing optimized

## 📝 Roadmap

See [`.claude/plan.md`](.claude/plan.md) for the complete implementation roadmap:

- **Phase 1**: Reusable Components (3 commits)
- **Phase 2**: Service Detail Pages (6 commits)
- **Phase 3**: MDX Blog Implementation (8 commits)
- **Phase 4**: Supporting Pages (2 commits)
- **Phase 5**: Home Page Enhancements (2 commits)
- **Phase 6**: Navigation & Polish (2 commits)

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
bun install -g vercel

# Deploy
vercel
```

### Environment Variables (if needed)

No environment variables required for basic deployment.

## 📄 License

© 2026 AI.RIO - All rights reserved.

## 🔗 Links

- **Live Site**: https://ai.rio.br
- **GitHub**: https://github.com/ai-rio/ai-rio
- **Vercel**: https://vercel.com
