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
  const { label: voiceLabel, voiceState, start: startVoice, toggle: toggleVoice, replaceSpeech, stopNarration } = useVapiNarration();

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
    replaceSpeech(
      `${scene.day}. ${scene.title}. ${applyName(scene.text, state.playerName)} ${spokenChoices} Choose A, B or C.`,
    );
  }, [state.phase, state.sceneIndex, state.playerName, replaceSpeech]);

  useEffect(() => {
    if (state.phase !== "debrief" || !state.activeChoice) return;
    replaceSpeech(`Debrief. ${applyName(state.activeChoice.debrief, state.playerName)}`);
  }, [state.phase, state.activeChoice, state.playerName, replaceSpeech]);

  // The lead form and the results screen have no narration of their own, so
  // reaching either one should silence whatever the last decision was saying.
  useEffect(() => {
    if (state.phase === "leadgate" || state.phase === "ending") stopNarration();
  }, [state.phase, stopNarration]);

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
