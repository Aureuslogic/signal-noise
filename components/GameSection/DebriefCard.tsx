import { Button } from "@/components/Button/Button";
import { applyName } from "@/lib/engine";
import styles from "./DebriefCard.module.css";

interface DebriefCardProps {
  debriefText: string;
  playerName: string;
  isLastScene: boolean;
  onContinue: () => void;
}

export function DebriefCard({ debriefText, playerName, isLastScene, onContinue }: DebriefCardProps) {
  return (
    <div>
      <div className={styles.debrief}>
        <span className={styles.kicker}>Debrief</span>
        <span className={styles.body}>{applyName(debriefText, playerName)}</span>
      </div>
      <Button onClick={onContinue}>{isLastScene ? "See your week reviewed" : "Continue"}</Button>
    </div>
  );
}
