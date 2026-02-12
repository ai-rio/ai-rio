"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Brand interface for Brandfetch API response
 */
interface Brand {
  domain: string;
  name: string;
  icon?: string;
  logo?: string;
}

interface LogoCloudProps {
  /**
   * Brand domains to fetch logos for
   */
  domains: string[];
  /**
   * Scroll speed in seconds (lower = faster)
   * @default 40
   */
  scrollDuration?: number;
  /**
   * Number of logo sets to duplicate for seamless loop
   * @default 4
   */
  duplicates?: number;
  /**
   * Additional class names
   */
  className?: string;
  /**
   * Whether to pause on hover
   * @default true
   */
  pauseOnHover?: boolean;
}

/**
 * Fallback SVG logos for the 9 requested brands
 */
const FALLBACK_LOGOS: Record<string, string> = {
  "openai": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-5.9815-5.87665c.0026-.09822.0053-.19631.0085-.29449l1.4187-5.1791a2.0444 2.0444 0 0 0-.15624-1.94289c-.1236-.26384-.3154-.51171-.55896-.72323l-3.9799-3.47045a2.0458 2.0458 0 0 0-.8587-.27487l-4.71044-2.50586a2.0444 2.0444 0 0 0-1.9535-.00221c-.71447-.00009-1.3733.17819-1.9535.50783l-3.47046 3.98c-.21152.24356.45939.43537.72324.55897.0982.00327.1963.00603.2945.00854l5.17906 1.41871a2.0444 2.0444 0 0 0 1.9429.15625c.26384.1236.51171.3154.72323.55896l3.47045 3.9799a2.0458 2.0458 0 0 0 .27487.8587l2.50586 4.71044a2.0444 2.0444 0 0 0 .00221 1.9535c.00009.71447-.17819 1.3733-.50783 1.9535l-3.98 3.47046a2.0444 2.0444 0 0 0-.55897.72324c-.00327-.0982-.00603-.1963-.00854-.2945l-1.41871-5.17906a2.0444 2.0444 0 0 0-.15625-1.94289c-.1236-.26384-.3154-.51171-.55896-.72323l-3.9799-3.47045a2.0458 2.0458 0 0 0-.8587-.27487l-4.71044-2.50586a2.0444 2.0444 0 0 0-1.9535-.00221z"/></svg>`,
  "anthropic": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.304 3.541l-5.967 16.918H7.06L12.587 3.541h4.717zm-1.25 3.948L12.587 15.77l-3.378-8.281h6.145z"/></svg>`,
  "stripe": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.828.645-1.415 1.516-1.415.354 0 .684.072.963.205.866.114-.021.29.043.19.087.466.194h1.965c.63 0 1.1-.467.992-1.027-.047-.22-.145-.507-.353-.818l-.015-.031c.338.182.711.283.98.283 1.842 0 2.377-1.66 4.06-3.885 4.06-1.178 0-2.188-.365-2.988-.963-.115-.09-.245-.255-.388-.255-.666 0-.448.339-.834.886-.834.617 0 1.154.638 1.83 1.62 1.83.874 0 1.56-.684 2.329-1.734 2.329-.287 0-.542-.067-.746-.179l-.015-.032-.015-.032c.388.27.556.415.912.415.63 0 1.405-1.062 2.478-2.685 2.478-.824 0-1.507-.277-2.041-.743-.162-.143-.369-.331-.623-.331-1.05 0-.58.485-1.03 1.185-1.03.673 0 1.284.693 2.106 1.739 2.106.484 0 .913-.243 1.67-.681 2.263h.032c-.13.164-.318.313-.563.313-.496 0-.886-.322-1.135-.756l-.031-.048c.358.32.65.483 1.05.483.776 0 1.432-.798 2.409-2.275 2.409-.688 0-1.254-.246-1.722-.652l-.033-.032c.423.34.683.482 1.152.482.776 0 1.367-.921 2.343-2.55 2.343zM4.526 10.065c.246-.507.623-.778 1.104-.778.532 0 1.048.287 1.283.713.178.324.412.528.667.528 1.065.032.145.048.293.048.447v2.527c0 .448-.066.835-.258 1.164h-.938c-.178-.34-.357-.613-.531-.954-.507-1.151-1.35-1.942-2.603-1.942-1.3 0-2.381.71-3.053 1.804-.357.651-.535 1.254-.535 1.807 0 .48.13.938.39 1.376.39 1.563 0 2.293-1.422 4.032-3.587 4.032-1.283 0-2.36-.514-3.198-1.35l-.032-.048v.048c.457.523.72.83.72 1.374.72 2.083 0 1.294-.807 2.388-2.128 3.167l-.033.016v-.016c.194.34.457.574.786.574.904.016.162.032.323.032.48v2.496c0 .432-.096.818-.289 1.147h-.938c-.195-.372-.407-.674-.633-.905-.57-1.07-1.47-1.866-2.7-1.866-1.381 0-2.51.835-3.272 2.165l-.065.114c-.29.524-.484.97-.484 1.494 0 .698.307 1.259.922 1.68.162.252.388.477.665.477.967.016.13.032.26.032.388v2.528c0 .448-.081.819-.244 1.131h-.938c-.162-.29-.338-.543-.527-.835-.616-1.048-1.52-1.775-2.752-1.775-1.51 0-2.73.886-3.538 2.283z"/></svg>`,
  "google": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-2.72 0-5-2.06-6.78-4.93zM12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-2.93-5.29-6.53 0-1.12.29-2.17.78-3.03L3.6 6.03C5.28 3.96 8.47 3 12 3c2.97 0 5.46.98 7.28 2.66L12 12V3h-2.29v9h2.29z"/></svg>`,
  "gemini": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93h2c0 3.31 2.69 6 6 6 1.25 0 2.41-.42 3.35-1.13l1.42 1.42C15.15 19.32 13.71 20 12 20c-4.41 0-8-3.59-8-8v4h-2v-6.07z"/></svg>`,
  "openrouter": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>`,
  "python": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18a.9.9 9.9 0 0 0-.5 1.2c.4 0 .8.2 1.1.5l.9.4c.6.3 1.2.5 1.2.5 2 0 .6-.3 1.2-.9 1.6-.6.4-1.2.6-1.9.6-.7 0-1.2-.2-1.5-.5l-.9-.4c-.6-.3-1.2-.5-1.2-1.2 0-.6.3-1.2.9-1.6.6-.4 1.2-.6 1.9-.6.7 0 1.2.2 1.5.5l.9.4c.6.3 1.2.5 1.2.5 2 0 .6-.3 1.2-.9 1.6zM9.75 15.82a.9.9 9.9 0 0 0 .5-1.2c-.4 0-.8-.2-1.1-.5l-.9-.4c-.6-.3-1.2-.5-1.2-1.2 0-.6-.3-1.2-.9-1.6-.6-.4-1.2-.6-1.9-.6-.7 0-1.2.2-1.5.5l-.9.4c-.6.3-1.2.5-1.2.5-2 0-.6-.3-1.2.9-1.6-.6-.4-1.2-.6-1.9-.6-.7 0-1.2.2-1.5.5l-.9.4c-.6.3-1.2.5-1.2.5-2z"/></svg>`,
  "nextjs": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007-.194.014-.425.035-.628.077-.24.106-.479.262-.681.464l-5.985 5.986c-.203.201-.398.354-.547.464l-.082.062c-.214.107-.446.163-.681.183-.066.006-.177.01-.351.01-.325 0-.589-.11-.856-.328l-.063-.063c-.064-.064-.112-.112-.112-.112-.233 0-.402.159-.773.433-1.082.058-.068.12-.13.184-.185.316-.174.609-.408 1.053-.695 1.313-.124.126-.24.259-.364.401l-.004.006c-.004.014-.008.027-.012.043-.23.165-.436.336-.699.401-.043.015-.084.028-.135.046-.056.017-.112.034-.176.047-.165.04-.309.061-.401.08-.036.006-.076.011-.112.015-.422.113-.755.33-1.001.655-.067.116-.13.238-.186.345-.038.098-.073.194-.101.265-.04.124-.077-.076-.151-.106-.179-.056-.046-.09-.081-.123-.102-.07-.035-.136-.064-.234-.106-.056-.022-.109-.044-.152-.066-.129-.059-.245-.087-.379-.114l-.021-.004c-.123-.029-.24-.05-.36-.067-.112-.019-.208-.035-.287-.045-.338-.045-.565.144-.565.324v.752c0 .184.102.334.24.401.088.065.192.124.318.159.181.042.361.085.501.14.181.061.324.15.466.24.052.085.12.155.177.2.005.014.01.026.015.04-.15.267-.32.447-.503.603-.084.098-.166.193-.253.285-.134.142-.265.275-.419.403l-.006.004c-.101.075-.195.157-.29.281l-.101.074c-.132.092-.258.18-.383.253-.043.022-.083.044-.119.064l-.014.007c-.066.034-.165.067-.246.094-.045.015-.089.028-.128.038-.19.057-.063.111-.121.091-.165.106-.045.046-.089.089-.134.118-.044.028-.075.051-.107.071-.063.057-.117.106-.176.152l-.008-.006c-.083-.062-.16-.118-.242-.159-.059-.028-.12-.053-.18-.077-.08-.028-.146-.057-.2-.09-.039-.024-.074-.044-.106-.065-.103-.067-.202-.123-.311-.177-.022-.009-.044-.018-.063-.026-.06-.024-.107-.048-.157-.069-.094-.059-.183-.105-.259-.114-.072-.01-.134-.019-.19-.026-.063-.009-.119-.018-.166-.025-.075-.011-.134-.021-.175-.027-.034-.007-.063-.013-.084-.017-.102-.024-.181-.046-.26-.067-.019-.006-.037-.012-.052-.016-.027-.009-.051-.017-.072-.025-.057-.021-.102-.037-.144-.053-.03-.011-.053-.02-.073-.028-.057-.024-.1-.041-.14-.056-.023-.009-.044-.018-.06-.026-.048-.023-.084-.045-.117-.064-.016-.009-.031-.017-.043-.024-.057-.034-.099-.065-.141-.092-.016-.009-.029-.019-.041-.026-.044-.029-.077-.054-.109-.075-.018-.011-.032-.022-.045-.028-.068-.046-.115-.075-.16-.105-.016-.009-.028-.017-.038-.022-.059-.037-.105-.071-.147-.091-.016-.009-.028-.019-.038-.026-.076-.057-.131-.083-.018-.009-.031-.017-.042-.021-.056-.034-.099-.064-.14-.083-.019-.032-.036-.055-.052-.066-.041-.059-.077-.087-.108-.069-.014-.023-.027-.041-.037-.053-.049-.066-.072-.108-.074-.014-.021-.026-.037-.036-.049-.068-.063-.106-.066-.014-.021-.025-.037-.035-.049-.064-.062-.099-.074-.016-.021-.028-.034-.038-.044-.058-.047-.093-.067-.131-.065-.019-.029-.035-.04-.048-.052-.058-.044-.069-.055-.074-.016-.021-.028-.033-.036-.043-.066-.063-.094-.043-.017-.027-.029-.037-.036-.048-.057-.061-.041-.017-.023-.027-.033-.035-.041-.047-.058-.045-.017-.023-.033-.031-.034-.038-.062-.059-.064-.059-.019-.028-.035-.037-.043-.045-.044-.056-.041-.073-.047-.069-.041-.019-.027-.029-.036-.036-.045-.042-.056-.041-.019-.028-.034-.033-.037-.042-.069-.048-.058-.045-.017-.023-.029-.032-.036-.039-.045-.039-.019-.029-.035-.035-.037-.037-.046-.038-.059-.043-.072-.041-.019-.028-.033-.034-.037-.04-.045-.041-.059-.041-.018-.029-.034-.035-.037-.039-.047-.039-.073-.043-.057-.044-.017-.028-.032-.036-.038-.041-.047-.04-.059-.04-.018-.029-.034-.035-.038-.039-.046-.038-.061-.043-.072-.041-.019-.028-.033-.036-.037-.042-.048-.041-.059-.041-.019-.029-.035-.036-.039-.041-.047-.041-.059-.042-.073-.043-.059-.046-.019-.029-.034-.037-.04-.046-.041-.059-.042-.019-.029-.035-.037-.04-.041-.047-.042-.059-.044-.074-.044-.06-.047-.019-.029-.035-.037-.041-.042-.049-.042-.059-.044-.019-.029-.035-.037-.041-.042-.048-.043-.06-.045-.074-.045-.061-.049-.019-.03-.036-.038-.042-.043-.049-.045-.06-.047-.075-.046-.061-.05-.019-.03-.036-.039-.043-.045-.051-.047-.061-.048-.075-.047-.061-.051-.019-.031-.037-.039-.043-.046-.051-.048-.061-.049-.075-.049-.062-.052-.019-.031-.037-.04-.044-.051-.049-.062-.051-.076-.051-.063-.053-.019-.031-.038-.04-.045-.052-.05-.063-.053-.077-.052-.064-.054-.019-.031-.038-.04-.045-.053-.051-.064-.054-.078-.053-.065-.056-.019-.031-.038-.041-.046-.053-.052-.065-.055-.079-.055-.066-.057-.019-.031-.038-.041-.046-.053-.052-.066-.055-.079-.056-.066-.058-.019-.031-.038-.041-.046-.053-.052-.066-.055-.08-.057-.087-.059.019.031.041.038.046.053.052.066.055.08.057.087.059.019.031.038.041.046.053.052.066.055.08.056.079.057.065.056.019.031.038.04.045.053.051.064.054.078.053.066.057.019.031.037.04.044.051.049.062.052.076.051.063.053.019.031.037.039.045.052.05.061.051.075.049.062.052.019.031.038.04.044.051.049.061.051.076.05.064.054.019.03.037.039.045.043.05.06.047.075.046.061.05.019.03.036.038.042.043.049.045.06.047.074.045.075.047.019.029.035.037.04.042.048.041.059.042.073.043.059.044.019.029.034.037.04.041.046.041.059.041.075.043.059.046.019.029.034.036.039.042.043.04.042.059.041.074.042.059.044.019.029.034.036.038.041.045.041.059.041.073.043.059.045.019.029.034.037.039.042.046.04.042.059.041.073.043.06.045.019.029.034.036.039.042.045.041.047.041.059.042.073.043.061.045.019.029.034.037.04.041.047.042.059.043.073.045.06.047.019.029.034.037.039.043.047.043.059.045.073.046.061.047.019.029.034.037.04.042.048.043.059.045.073.047.061.049.019.029.034.037.04.042.049.044.059.046.073.048.061.05.019.029.034.037.04.042.049.045.059.047.073.049.061.051.019.029.034.037.04.043.049.045.059.047.073.051.061.053.019.029.034.037.04.043.05.047.043.059.045.073.048.061.05.019.029.034.037.04.042.049.045.059.047.073.051.061.053.019.029.034.037.04.043.05.047.043.059.045.073.048.061.05.019.029.034.037.04.042.049.045.059.047.073.051.061.053.019.029.034.037.04.043.05.047.043.059.045.073.048.061.05.019.029.034.037.04.042.049.045.059.047.073.051.061.053.019.029.034.037.04.043.05.047.043.059.045.073.048.061.05.019.029.034.037.04.042.049.045.059.047.073.051.061.053z"/></svg>`,
  "postgresql": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 2.5c0 .28-.22.5-.5.5s.22-.5.5-.5-.22-.5-.5-.5zM12 2c-.28 0-.5.22-.5.5s.22-.5.5.5-.22-.5-.5-.5zM6.5 2.5c0 .28-.22.5-.5.5s-.22-.5-.5-.5.22.0.5.5.5zM12 17c-3.31 0-6-1.34-6-3v-1c0-1.66 2.69-3 6-3s6 1.34 6 3v1c0 1.66-2.69 3-6 3zm9-3.5c0 1.93-1.57 3.5-3.5 3.5S14 15.43 14 13.5c0-.76-.25-1.47-.66-2.05l.92-.53c.23.41.37.89.37 1.43 0 .28-.22.5-.5.5s-.22-.5-.5-.5c-.69 0-1.25-.39-1.55-.92l-.92.53C10.95 12.06 10.43 12 9.87 12c-.95 0-1.83.28-2.55.76l.92.53c.3.53.74.92.74 1.55.92.28 0 .5.22.5.5s-.22.5-.5.5c-.63 0-1.18-.28-1.48-.7l-.92-.53c.63 1.08 1.8 1.82 3.16 1.82 1.93 0 3.5-1.57 3.5-3.5 0-.76-.25-1.47-.66-2.05l.92-.53c.23.41.37.89.37 1.43 0 .28-.22.5-.5.5s-.22-.5-.5-.5c-.69 0-1.25-.39-1.55-.92z"/></svg>`,
  "supabase": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93h2c0 3.31 2.69 6 6 6 1.25 0 2.41-.42 3.35-1.13l1.42 1.42C15.15 19.32 13.71 20 12 20c-4.41 0-8-3.59-8-8v4h-2v-6.07z"/></svg>`,
};

/**
 * Gets logo for a brand, with fallback
 */
function getBrandLogo(brand: Brand): string {
  if (brand.icon) return brand.icon;
  if (brand.logo) return brand.logo;

  const domainKey = brand.domain.toLowerCase()
    .replace(".com", "")
    .replace(".org", "")
    .replace(".ai", "")
    .replace(".io", "");

  for (const [key, svg] of Object.entries(FALLBACK_LOGOS)) {
    if (domainKey.includes(key) || key.includes(domainKey)) {
      return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    }
  }

  // Default white letter fallback for unmapped domains
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><text x="12" y="17" text-anchor="middle" font-size="14" font-weight="600" fill="white">${brand.name.charAt(0).toUpperCase()}</text></svg>`
  )}`;
}

/**
 * Individual brand logo item
 */
function BrandLogo({ brand, className }: { brand: Brand; className?: string }) {
  const logoSrc = getBrandLogo(brand);

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 px-6 py-3 rounded-xl",
        "transition-all duration-300",
        "hover:scale-105",
        "hover:shadow-lg hover:shadow-primary/20 hover:shadow-cyan-500/20",
        "opacity-40 hover:opacity-100 hover:grayscale-0",
        "grayscale",
        "min-w-[130px] md:min-w-[170px]",
        "bg-surface-mixed-100/50",
        "border border-surface-mixed-300",
        "relative group",
        className
      )}
      title={brand.name}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none" />

      <div className="h-9 w-auto relative z-20">
        <img
          src={logoSrc}
          alt={brand.name}
          className="h-full w-auto object-contain rounded"
          loading="lazy"
          width={120}
          height={36}
        />
      </div>
    </div>
  );
}

export function LogoCloud({
  domains,
  scrollDuration = 50,
  duplicates = 4,
  className,
  pauseOnHover = true,
}: LogoCloudProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Initialize with fallback logos immediately
    const brandData: Brand[] = domains.map((domain) => ({
      domain,
      name: domain.charAt(0).toUpperCase() + domain.slice(1),
    }));
    setBrands(brandData);
    setLoading(false);

    // Fetch actual logos from Brandfetch CDN
    async function fetchBrandLogos() {
      const clientId = process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID;
      if (!clientId) {
        console.log("No BRANDFETCH_CLIENT_ID found, using fallbacks");
        return;
      }

      try {
        const results = await Promise.allSettled(
          domains.map(async (domain) => {
            try {
              // Use Brandfetch Logo Link CDN API with dark theme (transparent bg for dark page)
              // Format: https://cdn.brandfetch.io/{domain}/theme/dark?w=120&h=32&c={clientId}
              const iconUrl = `https://cdn.brandfetch.io/${domain}?theme=dark&w=120&h=32&c=${clientId}`;
              const logoUrl = `https://cdn.brandfetch.io/${domain}/logo?theme=dark&w=120&h=32&c=${clientId}`;

              // Fetch to verify URL is valid
              const response = await fetch(iconUrl, { method: "HEAD" });
              if (response.ok) {
                return {
                  domain,
                  name: domain.charAt(0).toUpperCase() + domain.slice(1),
                  icon: iconUrl,
                  logo: logoUrl,
                };
              }
              return null;
            } catch {
              return null;
            }
          })
        );

        const fetchedBrands = results
          .map((result) => (result.status === "fulfilled" && result.value ? result.value : null))
          .filter(Boolean) as Brand[];

        if (fetchedBrands.length > 0) {
          setBrands((prev) =>
            prev.map((prevBrand) => {
              const fetched = fetchedBrands.find((b) => b.domain === prevBrand.domain);
              return fetched || prevBrand;
            })
          );
        }
      } catch {
        console.log("Brandfetch fetch failed, using fallbacks");
      }
    }

    fetchBrandLogos();
  }, [domains]);

  if (loading || brands.length === 0) {
    return (
      <div
        className={cn(
          "w-full py-12 overflow-hidden relative",
          className
        )}
      >
        <div className="flex items-center justify-center gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 bg-surface-mixed-300/50 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full py-10 md:py-12 overflow-hidden relative",
        className
      )}
      aria-label="Trusted by leading companies"
    >
      <div
        className={cn(
          "flex gap-8 md:gap-12 items-center",
          "animate-scroll-left",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={
          prefersReducedMotion
            ? {}
            : {
                animationDuration: `${scrollDuration}s`,
              }
        }
      >
        {Array.from({ length: duplicates }).map((_, setIndex) => (
          <div
            key={setIndex}
            className="flex gap-8 md:gap-12 items-center shrink-0"
          >
            {brands.map((brand) => (
              <BrandLogo key={`${brand.domain}-${setIndex}`} brand={brand} />
            ))}
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-dark-page to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-dark-page to-transparent pointer-events-none" />

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-scroll-left {
          animation: scroll-left ${scrollDuration}s linear infinite;
        }
      `}</style>
    </div>
  );
}

export const PRESET_DOMAINS = {
  aiRio: [
    "stripe.com",
    "openai.com",
    "anthropic.com",
    "gemini.google.com",
    "openrouter.com",
    "python.org",
    "nextjs.org",
  ],
} as const;

export type PresetDomainKey = keyof typeof PRESET_DOMAINS;

export function LogoCloudPreset({
  preset = "aiRio",
  ...props
}: Omit<LogoCloudProps, "domains"> & { preset?: PresetDomainKey }) {
  const domains = PRESET_DOMAINS[preset];
  return <LogoCloud domains={Array.from(domains)} {...props} />;
}
