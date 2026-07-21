"use client";

import { useEffect, useRef } from "react";
import { EndingSection } from "@/components/EndingSection/EndingSection";
import { GameSection } from "@/components/GameSection/GameSection";
import { IntroSection } from "@/components/IntroSection/IntroSection";
import { LeadGateSection } from "@/components/LeadGateSection/LeadGateSection";
import { useGameEngine, type Phase } from "@/hooks/useGameEngine";
import { useVapiNarration } from "@/hooks/useVapiNarration";
import { applyName } from "@/lib/engine";
import { CHOICE_LETTERS, SCENES } from "@/lib/gameData";

export function SignalOrNoiseGame() {
  const { state, startGame, choose, continueGame, completeLead, skipLead, restart } = useGameEngine();
  const { label: voiceLabel, voiceState, start: startVoice, toggle: toggleVoice, queueSpeech } = useVapiNarration();

  const prevPhaseRef = useRef<Phase>(state.phase);
  useEffect(() => {
    const prevPhase = prevPhaseRef.current;
    const enteringNewSection = state.phase === "leadgate" || state.phase === "ending" || (state.phase === "scene" && prevPhase !== "debrief");
    if (enteringNewSection && prevPhase !== state.phase) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    prevPhaseRef.current = state.phase;
  }, [state.phase]);

  useEffect(() => {
    if (state.phase !== "scene") return;
    const scene = SCENES[state.sceneIndex];
    const spokenChoices = scene.choices.map((choice, i) => `Choice ${CHOICE_LETTERS[i]}. ${choice.label}`).join(" ");
    queueSpeech(
      `${scene.day}. ${scene.title}. ${applyName(scene.text, state.playerName)} ${spokenChoices} Choose A, B or C.`,
    );
  }, [state.phase, state.sceneIndex, state.playerName, queueSpeech]);

  useEffect(() => {
    if (state.phase !== "debrief" || !state.activeChoice) return;
    queueSpeech(`Debrief. ${applyName(state.activeChoice.debrief, state.playerName)}`);
  }, [state.phase, state.activeChoice, state.playerName, queueSpeech]);

  if (state.phase === "intro") {
    return (
      <IntroSection
        onStart={(name, voiceEnabled) => {
          startGame(name);
          if (voiceEnabled) void startVoice();
        }}
      />
    );
  }

  if (state.phase === "leadgate") {
    return (
      <LeadGateSection
        playerName={state.playerName}
        scores={state.scores}
        onSubmit={completeLead}
        onSkip={skipLead}
      />
    );
  }

  if (state.phase === "ending") {
    return <EndingSection playerName={state.playerName} scores={state.scores} onRestart={restart} />;
  }

  return (
    <GameSection
      sceneIndex={state.sceneIndex}
      phase={state.phase}
      playerName={state.playerName}
      scores={state.scores}
      activeChoice={state.activeChoice}
      voiceLabel={voiceLabel}
      voiceState={voiceState}
      onToggleVoice={() => void toggleVoice()}
      onChoose={choose}
      onContinue={continueGame}
    />
  );
}
