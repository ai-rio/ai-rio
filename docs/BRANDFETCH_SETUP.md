# Brandfetch API Setup for Logo Cloud Component

The `LogoCloud` component integrates with Brandfetch API to fetch dynamic brand logos.

## Environment Variables

Add to following to your `.env` file:

```env
# Brandfetch Client ID (required for CDN logo URLs)
NEXT_PUBLIC_BRANDFETCH_CLIENT_ID=your_client_id_here

# Brandfetch API Key (optional, for v2/brands API fallback)
BRANDFETCH_API_KEY=your_api_key_here
```

## Usage

### Basic Usage with Presets

```tsx
import { LogoCloudPreset } from '@/components/ui/logo-cloud';

<LogoCloudPreset
  preset="aiRio"
  scrollDuration={50}
  pauseOnHover={true}
/>
```

### Available Presets

- `aiProviders` - OpenAI, Anthropic, Cohere, Mistral, Meta, Google
- `paymentPlatforms` - Stripe, PayPal, Braintree, Paddle, Chargebee
- `techStack` - Vercel, Next.js, Supabase, Python, TypeScript, Tailwind
- `aiRio` - Combined AI providers, payment platforms, and tech stack
- `all` - Default selection of major brands

### Custom Domains

```tsx
import { LogoCloud } from '@/components/ui/logo-cloud';

<LogoCloud
  domains={["openai.com", "stripe.com", "vercel.com"]}
  scrollDuration={40}
/>
```

## Component Props

| Prop | Type | Default | Description |
|-------|------|----------|-------------|
| `domains` | `string[]` | - | List of domains to fetch logos for |
| `scrollDuration` | `number` | `50` | Animation duration in seconds (lower = faster) |
| `duplicates` | `number` | `4` | Number of logo sets for seamless loop |
| `pauseOnHover` | `boolean` | `true` | Pause animation on hover |
| `className` | `string` | - | Additional CSS classes |

## How Brandfetch Integration Works

1. **Immediate Display**: Component shows fallback SVG logos immediately
2. **Background Fetch**: Fetches actual logos from Brandfetch CDN
3. **CDN URL Format**: `https://cdn.brandfetch.io/{domain}?w={width}&h={height}&c={clientId}`
4. **Seamless Update**: Fetched logos replace fallbacks without re-render

## Features

- **Responsive Design**: Adapts to all screen sizes
- **Accessibility**: Respects `prefers-reduced-motion` preference
- **Fallback Logos**: Built-in SVG fallbacks for popular brands
- **Gradient Integration**: Blends seamlessly with page transitions
- **Lazy Loading**: Optimized image loading

## Styling

The component uses existing design tokens:
- Primary color: `#14B8A6` (teal)
- Dark theme compatible
- Grayscale to color on hover transition
- Consistent 32px logo height

## Brandfetch API Notes

- **Logo Link CDN**: Used for direct logo image URLs
- **No API Key Required for CDN**: Only Client ID needed
- **Rate Limits**: CDN has generous limits for public use
- **Image Parameters**: Width and height specified (120x32 default)
