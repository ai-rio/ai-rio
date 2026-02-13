/**
 * Cal.com Booking Button Component
 * Opens Cal.com booking modal/popup
 *
 * Configuration:
 * - data-cal-link: Your Cal.com booking link (e.g., "username/30min" or "team/event-type")
 * - data-cal-config: JSON config for theme, layout, etc.
 * - data-cal-namespace: Unique ID for styling targeting
 *
 * @example
 * <CalcomButton calLink="ai-rio/consultation" />
 */
"use client";

export interface CalcomButtonProps {
  /** Your Cal.com booking link (e.g., "username/30min") */
  calLink: string;
  /** Button text */
  children?: React.ReactNode;
  /** Theme: "light" | "dark" */
  theme?: "light" | "dark";
  /** Pre-fill user email */
  email?: string;
  /** Pre-fill user name */
  name?: string;
  /** Button variant */
  variant?: "primary" | "secondary" | "outline";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Additional classes */
  className?: string;
}

export function CalcomButton({
  calLink,
  children = "Book a Consultation",
  theme = "dark",
  email,
  name,
  variant = "primary",
  size = "md",
  className = "",
}: CalcomButtonProps) {
  // Build config object
  const config: Record<string, unknown> = {
    theme,
    layout: "month_view",
    useSlotsViewOnSmallScreen: true,
    hideEventTypeDetails: false,
    "flag.coep": true, // Enable Cross-Origin Embedder Policy
  };

  if (email) config.email = email;
  if (name) config.name = name;

  const configJson = JSON.stringify(config);
  // Extract event type from calLink for namespace (e.g., "ai-rio/15min" -> "15min")
  const eventType = calLink.split("/").pop() || calLink;
  const namespace = eventType;

  // Button base styles
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  // Variant styles
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
  };

  // Size styles
  const sizes = {
    sm: "h-10 px-4 text-sm rounded-md",
    md: "h-12 px-6 text-base rounded-lg",
    lg: "h-14 px-8 text-lg rounded-lg",
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} cursor-pointer ${className}`}
      data-cal-namespace={namespace}
      data-cal-config={configJson}
      data-cal-link={calLink}
    >
      {children}
    </button>
  );
}
