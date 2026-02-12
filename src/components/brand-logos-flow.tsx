"use client";

import { FlowingLogos } from "@/components/ui/flowing-logos";

// Major LLM Providers & Infrastructure logos
const COMPANY_LOGOS = [
  {
    name: "OpenAI",
    image: "https://cdn.brandfetch.io/idQfdjYsfE/icon/w/400/h/400/theme/dark/icon.jpeg?c=1idntqPvr-90VCnpt9u",
  },
  {
    name: "Anthropic",
    image: "https://cdn.brandfetch.io/idxdUqXKE/icon.svg?c=1idntqPvr-90VCnpt9u",
  },
  {
    name: "Google",
    image: "https://cdn.brandfetch.io/idxzUjsmX/icon.svg?c=1idntqPvr-90VCnpt9u",
  },
  {
    name: "Meta",
    image: "https://cdn.brandfetch.io/id35vpFnY/icon.svg?c=1idntqPvr-90VCnpt9u",
  },
  {
    name: "Mistral",
    image: "https://cdn.brandfetch.io/id55cJM/icon.svg?c=1idntqPvr-90VCnpt9u",
  },
  {
    name: "Cohere",
    image: "https://cdn.brandfetch.io/id5i3f7f/icon.svg?c=1idntqPvr-90VCnpt9u",
  },
  {
    name: "Hugging Face",
    image: "https://cdn.brandfetch.io/idvp4G5Q/icon.svg?c=1idntqPvr-90VCnpt9u",
  },
  {
    name: "Perplexity",
    image: "https://cdn.brandfetch.io/idbDT0QF5/icon.svg?c=1idntqPvr-90VCnpt9u",
  },
  {
    name: "Stripe",
    image: "https://cdn.brandfetch.io/idMqkbl1g/w/400/h/400/theme/dark/icon.jpeg?c=1idntqPvr-90VCnpt9u",
  },
  {
    name: "PostgreSQL",
    image: "https://cdn.brandfetch.io/idE8cK4mY/icon.svg?c=1idntqPvr-90VCnpt9u",
  },
  {
    name: "Docker",
    image: "https://cdn.brandfetch.io/idxzITV2/icon.svg?c=1idntqPvr-90VCnpt9u",
  },
  {
    name: "Redis",
    image: "https://cdn.brandfetch.io/idL2j4jKEK/icon.svg?c=1idntqPvr-90VCnpt9u",
  },
  {
    name: "Next.js",
    image: "https://cdn.brandfetch.io/idMqRbl1g/w/400/h/400/theme/dark/icon.svg?c=1idntqPvr-90VCnpt9u",
  },
  {
    name: "Vercel",
    image: "https://cdn.brandfetch.io/idKSmfZhq7/icon.svg?c=1idntqPvr-90VCnpt9u",
  },
];

interface BrandLogosFlowProps {
  className?: string;
}

export function BrandLogosFlow({ className }: BrandLogosFlowProps) {
  return (
    <FlowingLogos
      data={COMPANY_LOGOS}
      className={className}
    />
  );
}
