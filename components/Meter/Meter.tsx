import { cn } from "@/lib/cn";
import { clampScore, scoreToPercent } from "@/lib/engine";
import styles from "./Meter.module.css";

interface MeterProps {
  label: string;
  value: number;
  chipDelta?: number;
}

export function Meter({ label, value, chipDelta }: MeterProps) {
  return (
    <div className={styles.meter}>
      <span className={styles.label}>{label}</span>
      <div className={styles.track}>
        <div className={cn(styles.fill, value < 45 && styles.low)} style={{ width: scoreToPercent(value) }} />
      </div>
      <span className={styles.num}>
        <span
          key={chipDelta ?? "none"}
          className={cn(styles.chip, chipDelta ? (chipDelta > 0 ? styles.up : styles.down) : undefined)}
        >
          {chipDelta ? (chipDelta > 0 ? `+${chipDelta}` : chipDelta) : ""}
        </span>
        <span>{Math.round(clampScore(value))}</span>
      </span>
    </div>
  );
}
