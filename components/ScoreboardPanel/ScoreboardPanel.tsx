import type { ReactNode } from "react";
import styles from "./ScoreboardPanel.module.css";

interface ScoreboardPanelProps {
  title: string;
  playerName: string;
  rightSlot?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  live?: boolean;
}

export function ScoreboardPanel({ title, playerName, rightSlot, footer, children, live }: ScoreboardPanelProps) {
  return (
    <div className={styles.scoreboard} aria-live={live ? "polite" : undefined}>
      <div className={styles.scoreboardHead}>
        <span className={styles.scoreboardTitle}>{title}</span>
        <span className={styles.playerRow}>
          <span className={styles.scoreboardPlayer}>
            Player: <b>{playerName}</b>
          </span>
          {rightSlot}
        </span>
      </div>
      {children}
      {footer && <div className={styles.meterKey}>{footer}</div>}
    </div>
  );
}
