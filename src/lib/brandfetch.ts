interface BrandfetchLogo {
  domain: string;
  icon: string | null;
  logo: string | null;
}

const BRANDFETCH_API_KEY = process.env.BRANDFETCH_API_KEY;

/**
 * Fetch brand logo from Brandfetch API
 */
export async function getBrandLogo(domain: string): Promise<string | null> {
  if (!BRANDFETCH_API_KEY) {
    console.warn("BRANDFETCH_API_KEY not set");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.brandfetch.io/v2/brands/${domain}`,
      {
        headers: {
          Authorization: `Bearer ${BRANDFETCH_API_KEY}`,
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!response.ok) {
      console.warn(`Brandfetch error for ${domain}: ${response.status}`);
      return null;
    }

    const data: BrandfetchLogo[] = await response.json();

    if (data && data.length > 0) {
      const brand = data[0];
      // Prefer icon over logo for flowing logos (better aspect ratio)
      return brand.icon || brand.logo || null;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching logo for ${domain}:`, error);
    return null;
  }
}

/**
 * Fetch multiple brand logos in parallel
 */
export async function getBrandLogos(domains: string[]): Promise<Map<string, string>> {
  const logoMap = new Map<string, string>();

  const results = await Promise.allSettled(
    domains.map(async (domain) => {
      const logo = await getBrandLogo(domain);
      return { domain, logo };
    })
  );

  for (const result of results) {
    if (result.status === "fulfilled" && result.value.logo) {
      logoMap.set(result.value.domain, result.value.logo);
    }
  }

  return logoMap;
}
