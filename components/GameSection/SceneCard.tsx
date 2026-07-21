import { cn } from "@/lib/cn";
import { applyName } from "@/lib/engine";
import { CHOICE_LETTERS } from "@/lib/gameData";
import type { Choice, Scene } from "@/lib/types";
import styles from "./SceneCard.module.css";

interface SceneCardProps {
  scene: Scene;
  sceneIndex: number;
  totalScenes: number;
  playerName: string;
  onChoose: (choice: Choice) => void;
}

export function SceneCard({ scene, sceneIndex, totalScenes, playerName, onChoose }: SceneCardProps) {
  return (
    <div key={sceneIndex}>
      <div className={styles.sceneKicker}>
        {scene.day}  ·  Decision {sceneIndex + 1} of {totalScenes}
      </div>
      <div className="scene-title">{scene.title}</div>
      <p className="scene-text">{applyName(scene.text, playerName)}</p>
      <div>
        {scene.choices.map((choice, i) => (
          <button
            key={choice.label}
            type="button"
            className={cn(styles.choice, "fade-in")}
            onClick={() => onChoose(choice)}
          >
            <span className={styles.glyph}>{CHOICE_LETTERS[i]}</span>
            <span>{choice.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
