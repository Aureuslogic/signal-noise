import { Card } from "@/components/Card/Card";
import { MarketVisual } from "@/components/MarketVisual/MarketVisual";
import { Meter } from "@/components/Meter/Meter";
import { ScoreboardPanel } from "@/components/ScoreboardPanel/ScoreboardPanel";
import { VoiceButton } from "@/components/VoiceButton/VoiceButton";
import type { VoiceState } from "@/hooks/useVapiNarration";
import { SCENES } from "@/lib/gameData";
import { sceneVisual } from "@/lib/marketScenes";
import type { Choice, Day } from "@/lib/types";
import { DayBar } from "./DayBar";
import { DebriefCard } from "./DebriefCard";
import styles from "./GameSection.module.css";
import { SceneCard } from "./SceneCard";

interface GameSectionProps {
  sceneIndex: number;
  phase: "scene" | "debrief";
  playerName: string;
  scores: { cap: number; dis: number; edg: number };
  activeChoice: Choice | null;
  voiceLabel: string;
  voiceState: VoiceState;
  onToggleVoice: () => void;
  onChoose: (choice: Choice) => void;
  onContinue: () => void;
}

export function GameSection({
  sceneIndex,
  phase,
  playerName,
  scores,
  activeChoice,
  voiceLabel,
  voiceState,
  onToggleVoice,
  onChoose,
  onContinue,
}: GameSectionProps) {
  const scene = SCENES[sceneIndex];
  const seenDays = new Set<Day>(SCENES.slice(0, sceneIndex).map((s) => s.day));
  const showChips = phase === "debrief";

  return (
    <section>
      <DayBar currentDay={scene.day} seenDays={seenDays} />
      <div className={styles.progressNote}>
        Decision {sceneIndex + 1} of {SCENES.length}
      </div>

      <ScoreboardPanel
        title="Scoreboard"
        playerName={playerName}
        live
        rightSlot={<VoiceButton label={voiceLabel} state={voiceState} onClick={onToggleVoice} />}
        footer={
          <>
            <b>Simulated balance</b> is a fictional game score indexed to 100. <b>Decision discipline</b> reflects
            consistency with the plan described in the scenario. <b>Process consistency</b> reflects preparation and
            review choices. These scores are educational only and do not assess suitability or predict performance.
          </>
        }
      >
        <Meter label="Sim. balance" value={scores.cap} chipDelta={showChips ? activeChoice?.fx.cap : undefined} />
        <Meter label="Discipline" value={scores.dis} chipDelta={showChips ? activeChoice?.fx.dis : undefined} />
        <Meter label="Consistency" value={scores.edg} chipDelta={showChips ? activeChoice?.fx.edg : undefined} />
      </ScoreboardPanel>

      <Card
        top={
          <MarketVisual
            key={sceneIndex}
            {...sceneVisual(scene.art)}
            alt={`${scene.title} — forex and commodity market scene`}
            animateIn
          />
        }
      >
        {phase === "scene" ? (
          <SceneCard
            scene={scene}
            sceneIndex={sceneIndex}
            totalScenes={SCENES.length}
            playerName={playerName}
            onChoose={onChoose}
          />
        ) : (
          activeChoice && (
            <DebriefCard
              debriefText={activeChoice.debrief}
              playerName={playerName}
              isLastScene={sceneIndex === SCENES.length - 1}
              onContinue={onContinue}
            />
          )
        )}
      </Card>
    </section>
  );
}
