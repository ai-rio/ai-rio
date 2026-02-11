"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useTransform, useScroll, type Variants, type Transition } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LustreText from "@/components/ui/lustretext";
import { useTheme } from "next-themes";
import Globe from "@/components/ui/globe";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
      duration: 0.8,
    } as Transition,
  },
};

const textVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 15 },
  },
};

declare module "@/components/ui/badge" {
  interface BadgeProps {
    shiny?: boolean;
    shinySpeed?: number;
  }
}

interface HeroUIProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  description?: string;
  primaryCTA?: string;
  primaryCTAHref?: string;
  primaryCTAOnClick?: () => void;
  secondaryCTA?: string;
  secondaryCTAHref?: string;
  secondaryCTAOnClick?: () => void;
  features?: string[];
  className?: string;
  globeBaseColor?: {
    light: [number, number, number];
     [number, number, number];
  };
  globeMarkerColor?: {
    light: [number, number, number];
     [number, number, number];
  };
  globeGlowColor?: {
    light: [number, number, number];
     [number, number, number];
  };
}

export default function HeroUI({
  title = "Margin",
  subtitle = "Profitability Intelligence for AI SaaS",
  badgeText = "🎯 Stop Losing Money on Unprofitable Customers",
  description = "Track per-customer LLM costs and discover which accounts are bleeding your margins.",
  primaryCTA = "Start Free Trial",
  primaryCTAHref,
  primaryCTAOnClick,
  secondaryCTA = "Compare Plans",
  secondaryCTAHref,
  secondaryCTAOnClick,
  features = [
    "Connect Stripe in 2 clicks",
    "No SDK required",
    "Start free, upgrade when ready",
  ],
  className = "",
  globeBaseColor = {
    light: [0.98, 0.98, 0.98],
     [0.12, 0.12, 0.12],
  },
  globeMarkerColor = {
    light: [0.2, 0.5, 0.9],
     [0.1, 0.8, 1],
  },
  globeGlowColor = {
    light: [0.3, 0.3, 0.3],
     [1, 1, 1],
  },
}: HeroUIProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(() => false);
  const ref = useRef<HTMLDivElement>(null);

  // Only use scroll tracking after mount to avoid "not hydrated" error
  const { scrollYProgress } = useScroll({
    target: mounted ? ref : undefined,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    // Defer setMounted to avoid cascading renders
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!mounted) return null;

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden min-h-[90vh] flex items-center",
        className
      )}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]" />
        <motion.div
          className="absolute top-20 left-1/4 w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[30rem] lg:h-[30rem] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-6 sm:py-8 md:py-16 lg:py-24">
        <div className="relative min-h-[60vh] md:min-h-[70vh]">
          <motion.div
            className="absolute right-0 bottom-4 top-auto w-[70%] md:top-2 md:bottom-auto md:w-1/2 lg:top-[-60px] lg:right-[-40px] xl:top-[-80px] xl:right-[-60px] transition-all duration-500"
            style={{ y }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <div className="w-full h-[220px] md:h-[300px] lg:h-[400px] xl:h-[450px]">
              <Globe
                baseColor={
                  theme === "dark"
                    ? (globeBaseColor.dark as [number, number, number])
                    : (globeBaseColor.light as [number, number, number])
                }
                markerColor={
                  theme === "dark"
                    ? (globeMarkerColor.dark as [number, number, number])
                    : (globeMarkerColor.light as [number, number, number])
                }
                glowColor={
                  theme === "dark"
                    ? (globeGlowColor.dark as [number, number, number])
                    : (globeGlowColor.light as [number, number, number])
                }
              />
            </div>
          </motion.div>

          <motion.div
            className="relative z-20 w-full md:w-7/12 lg:w-1/2 pt-6 sm:pt-8 md:pt-16 lg:pt-24 md:ml-8 lg:ml-16 md:-mt-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Badge
              variant="destructive"
              className="w-fit mb-4"
              shiny
              shinySpeed={3}
            >
              {badgeText}
            </Badge>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              variants={textVariants}
            >
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
                {title}
              </span>
              <span className="text-foreground mt-2 block">
                {subtitle}
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mt-4"
              variants={textVariants}
            >
              {description}
            </motion.p>

            <motion.div
              className="flex gap-4 mt-6 max-[375px]:flex-col max-[375px]:w-full max-[375px]:gap-3"
              variants={textVariants}
            >
              {primaryCTAHref ? (
                <Link
                  href={primaryCTAHref}
                  className="group relative overflow-hidden rounded-xl px-8 py-6 text-lg font-semibold shadow-xl max-[375px]:w-full max-[375px]:px-4 max-[375px]:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 flex items-center justify-center min-h-[56px]"
                >
                  <LustreText
                    text={primaryCTA}
                    speed={6}
                    className="relative z-10 text-white"
                  />
                </Link>
              ) : (
                <Button
                  size="lg"
                  onClick={primaryCTAOnClick}
                  className="group relative overflow-hidden rounded-xl px-8 py-6 text-lg font-semibold shadow-xl max-[375px]:w-full max-[375px]:px-4 max-[375px]:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 min-h-[56px]"
                >
                  <LustreText
                    text={primaryCTA}
                    speed={6}
                    className="relative z-10 text-white"
                  />
                </Button>
              )}

              {secondaryCTAHref ? (
                <Link
                  href={secondaryCTAHref}
                  className="rounded-xl px-8 py-6 text-lg font-semibold border-2 backdrop-blur-sm max-[375px]:w-full max-[375px]:px-4 max-[375px]:py-4 flex items-center justify-center bg-transparent hover:bg-accent hover:text-accent-foreground border-border min-h-[56px]"
                >
                  <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    {secondaryCTA}
                  </span>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={secondaryCTAOnClick}
                  className="rounded-xl px-8 py-6 text-lg font-semibold border-2 backdrop-blur-sm max-[375px]:w-full max-[375px]:px-4 max-[375px]:py-4 min-h-[56px]"
                >
                  <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    {secondaryCTA}
                  </span>
                </Button>
              )}
            </motion.div>

            <motion.div
              className="flex items-center gap-8 mt-12 opacity-70"
              variants={textVariants}
            >
              <div className="flex gap-4 flex-wrap">
                {features.map((text) => (
                  <Badge
                    key={text}
                    variant="outline"
                    className="py-1.5 px-3 text-sm border-muted-foreground/30 bg-background/50"
                  >
                    {text}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
