/**
 * Cal.com Styled Inline Embed
 * Full-page booking interface embedded directly into your page
 * Uses Cal.com React embed components with custom styling
 *
 * Install: bun add @calcom/embed-react
 */
"use client";

import { useEffect } from "react";

export interface CalcomStyledEmbedProps {
  /** Your Cal.com booking link (e.g., "username/30min") */
  calLink: string;
  /** Theme for the embed */
  theme?: "light" | "dark";
  /** Custom CSS class names for styling */
  customClassNames?: Record<string, string>;
}

/**
 * Cal.com Inline Embed Component
 * Embeds the full booking calendar directly on the page
 *
 * Usage:
 * <CalcomStyledEmbed calLink="ai-rio/consultation" />
 */
export function CalcomStyledEmbed({
  calLink,
  theme = "dark",
  customClassNames = {},
}: CalcomStyledEmbedProps) {
  useEffect(() => {
    // Dynamically load the embed script
    const script = document.createElement("script");
    script.src = "https://cal.com/embed/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Initialize the inline embed
    (window as unknown as Record<string, unknown>).Cal = (window as unknown as Record<string, unknown>).Cal || function () {
      (window as unknown as Record<string, { q: unknown[] }>).Cal.q = (window as unknown as Record<string, { q: unknown[] }>).Cal.q || [];
    };

    // Queue the embed initialization
    ((window as unknown as Record<string, { q: unknown[] }>).Cal.q as unknown[]).push({
      method: "init",
      args: [
        {
          calLink,
          theme,
          ...customClassNames,
        },
      ],
    });

    return () => {
      // Cleanup script on unmount
      script.remove();
    };
  }, [calLink, theme, customClassNames]);

  // Container for the embed
  return (
    <div
      id="calcom-embed-container"
      className="w-full min-h-[600px] bg-card rounded-xl border border-border"
    />
  );
}

/**
 * Custom styling presets for AI.RIO design system
 */
export const calcomPresets = {
  /** Dark theme with AI.RIO brand colors */
  dark: {
    container: "bg-card border-border",
    primaryButton: "bg-primary hover:bg-primary/90 text-primary-foreground",
    secondaryButton: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
    selectedDate: "bg-primary text-primary-foreground",
    timeSlot: "bg-muted hover:bg-muted/80 text-foreground",
  },
  /** Light theme variant */
  light: {
    container: "bg-background border-border",
    primaryButton: "bg-primary hover:bg-primary/90 text-primary-foreground",
    secondaryButton: "bg-muted hover:bg-muted/80 text-foreground",
    selectedDate: "bg-primary text-primary-foreground",
    timeSlot: "bg-secondary hover:bg-secondary/80 text-foreground",
  },
};
