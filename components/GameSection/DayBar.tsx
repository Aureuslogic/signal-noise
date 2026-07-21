import { cn } from "@/lib/cn";
import type { Day } from "@/lib/types";
import styles from "./DayBar.module.css";

const DAYS: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

interface DayBarProps {
  currentDay: Day;
  seenDays: ReadonlySet<Day>;
}

export function DayBar({ currentDay, seenDays }: DayBarProps) {
  return (
    <div className={styles.daybar}>
      {DAYS.map((day) => (
        <div
          key={day}
          className={cn(styles.day, day === currentDay ? styles.active : seenDays.has(day) && styles.done)}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
