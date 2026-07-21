import type { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  top?: ReactNode;
  children: ReactNode;
}

export function Card({ top, children }: CardProps) {
  return (
    <div className={styles.card}>
      {top}
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}
