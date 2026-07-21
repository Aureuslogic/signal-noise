// Plain <img> is intentional: these are decorative, animated background
// visuals whose CSS keyframes target the <img> element directly, which
// next/image's wrapper markup does not support.
import { cn } from "@/lib/cn";
import type { ArtKey } from "@/lib/types";
import { Illustration } from "./Illustration";
import styles from "./MarketVisual.module.css";

interface MarketVisualProps {
  image: string;
  alt: string;
  label: string;
  chartPoints: string;
  motionClasses?: string[];
  overlayArt?: ArtKey;
  animateIn?: boolean;
  priority?: boolean;
}

export function MarketVisual({
  image,
  alt,
  label,
  chartPoints,
  motionClasses = [],
  overlayArt,
  animateIn = false,
  priority = false,
}: MarketVisualProps) {
  return (
    <div
      className={cn(
        styles.marketVisual,
        ...motionClasses.map((token) => styles[`motion-${token}`]),
        animateIn && "fade-in",
      )}
      role="img"
      aria-label={alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/signal-or-noise-assets/${image}`}
        alt=""
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? undefined : "lazy"}
      />
      <div className={styles.chartLayer} aria-hidden="true">
        <svg viewBox="0 0 700 170">
          <polyline className={styles.chartPath} points={chartPoints} />
        </svg>
      </div>
      {overlayArt && (
        <div className={cn(styles.overlayArt, "fade-in")}>
          <Illustration art={overlayArt} />
        </div>
      )}
      <div className={styles.marketCaption}>
        <span className={styles.marketLabel}>{label}</span>
        <span className={styles.marketStatus}>
          <span className={styles.pulseDot} />
          Market simulation live
        </span>
      </div>
    </div>
  );
}
