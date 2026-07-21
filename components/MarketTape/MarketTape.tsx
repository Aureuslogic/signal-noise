import { cn } from "@/lib/cn";
import styles from "./MarketTape.module.css";

interface Tick {
  symbol: string;
  direction: "up" | "down";
  value: string;
}

const TICKS: Tick[] = [
  { symbol: "EUR/USD", direction: "up", value: "0.18%" },
  { symbol: "XAU/USD", direction: "up", value: "0.42%" },
  { symbol: "WTI CRUDE", direction: "down", value: "0.31%" },
  { symbol: "GBP/JPY", direction: "down", value: "0.12%" },
  { symbol: "COPPER", direction: "up", value: "0.27%" },
  { symbol: "WHEAT", direction: "up", value: "0.09%" },
];

function TickList({ copy }: { copy: number }) {
  return (
    <>
      {TICKS.map((tick) => (
        <span className={styles.tick} key={`${copy}-${tick.symbol}`}>
          <b>{tick.symbol}</b> <span className={cn(styles[tick.direction])}>{tick.direction === "up" ? "▲" : "▼"} {tick.value}</span>
        </span>
      ))}
    </>
  );
}

export function MarketTape() {
  return (
    <div className={styles.marketTape} aria-label="Illustrative market ticker">
      <div className={styles.tapeTrack} aria-hidden="true">
        <TickList copy={0} />
        <TickList copy={1} />
      </div>
    </div>
  );
}
