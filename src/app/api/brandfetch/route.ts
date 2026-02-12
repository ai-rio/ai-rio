import { NextRequest, NextResponse } from 'next/server';

const BRANDFETCH_API_KEY = process.env.BRANDFETCH_API_KEY;
const BRANDFETCH_CLIENT_ID = process.env.BRANDFETCH_CLIENT_ID || process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID;

interface BrandfetchLogo {
  domain: string;
  icon: string | null;
  logo: string | null;
}

/**
 * Normalize domain for Brandfetch API
 * Brandfetch uses root domains (amazon.com, not aws.amazon.com)
 */
function normalizeDomain(domain: string): string {
  // Remove common subdomains that Brandfetch doesn't recognize
  const subdomainsToRemove = ['aws.', 'cloud.', 'azure.', 'docs.', 'developer.', 'api.'];

  let normalized = domain.toLowerCase();
  for (const subdomain of subdomainsToRemove) {
    if (normalized.startsWith(subdomain)) {
      normalized = normalized.substring(subdomain.length);
    }
  }

  return normalized;
}

/**
 * Fetch brand logo from Brandfetch API
 */
async function getBrandLogo(domain: string): Promise<string | null> {
  if (!BRANDFETCH_API_KEY) {
    console.error('[Brandfetch] No API key configured');
    return null;
  }

  if (!BRANDFETCH_CLIENT_ID) {
    console.error('[Brandfetch] No client ID configured');
    return null;
  }

  const normalizedDomain = normalizeDomain(domain);

  try {
    const url = new URL(`https://api.brandfetch.io/v2/brands/${encodeURIComponent(normalizedDomain)}`);
    url.searchParams.set('c', BRANDFETCH_CLIENT_ID);

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${BRANDFETCH_API_KEY}`,
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    }
    );

    console.log(`[Brandfetch] Fetching ${domain} (normalized: ${normalizedDomain}) - Status: ${response.status}`);

    if (!response.ok) {
      return null;
    }

    const data: BrandfetchLogo[] = await response.json();

    if (data && data.length > 0) {
      const brand = data[0];
      const logo = brand.icon || brand.logo || null;
      console.log(`[Brandfetch] Found logo for ${domain}: ${logo ? 'YES' : 'NO'}`);
      return logo;
    }

    return null;
  } catch (error) {
    console.error(`[Brandfetch] Error fetching ${domain}:`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const domains = searchParams.get('domains')?.split(',') || [];

  console.log(`[Brandfetch] Processing domains:`, domains);

  if (domains.length === 0) {
    return NextResponse.json({ logos: {} });
  }

  const logoMap: Record<string, string | null> = {};

  const results = await Promise.allSettled(
    domains.map(async (domain) => {
      const logo = await getBrandLogo(domain);
      return { domain, logo };
    })
  );

  for (const result of results) {
    if (result.status === "fulfilled" && result.value) {
      const { domain, logo } = result.value;
      if (logo) {
        logoMap[domain] = logo;
      }
    }
  }

  console.log(`[Brandfetch] Returning ${Object.keys(logoMap).length} logos for ${domains.length} domains`);

  return NextResponse.json({ logos: logoMap });
}
