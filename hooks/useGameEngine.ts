"use client";

import { useCallback, useReducer } from "react";
import { applyDelta, capitalize } from "@/lib/engine";
import { SCENES, START_SCORES } from "@/lib/gameData";
import type { Choice, Scores } from "@/lib/types";

export type Phase = "intro" | "scene" | "debrief" | "leadgate" | "ending";

interface LeadState {
  instruments: string[];
  level: string;
  saved: boolean;
}

export interface GameState {
  phase: Phase;
  playerName: string;
  sceneIndex: number;
  scores: Scores;
  activeChoice: Choice | null;
  lead: LeadState;
}

type Action =
  | { type: "START_GAME"; name: string }
  | { type: "CHOOSE"; choice: Choice }
  | { type: "CONTINUE" }
  | { type: "SET_INSTRUMENTS"; instruments: string[] }
  | { type: "SET_LEVEL"; level: string }
  | { type: "COMPLETE_LEAD"; name: string }
  | { type: "SKIP_LEAD" }
  | { type: "RESTART" };

const initialState: GameState = {
  phase: "intro",
  playerName: "Player",
  sceneIndex: 0,
  scores: START_SCORES,
  activeChoice: null,
  lead: { instruments: [], level: "", saved: false },
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START_GAME": {
      const name = action.name.trim();
      return {
        ...state,
        playerName: name ? capitalize(name) : "Player",
        phase: "scene",
        sceneIndex: 0,
        scores: START_SCORES,
        activeChoice: null,
      };
    }
    case "CHOOSE":
      return {
        ...state,
        scores: applyDelta(state.scores, action.choice.fx),
        activeChoice: action.choice,
        phase: "debrief",
      };
    case "CONTINUE": {
      const nextIndex = state.sceneIndex + 1;
      if (nextIndex < SCENES.length) {
        return { ...state, sceneIndex: nextIndex, phase: "scene", activeChoice: null };
      }
      // Returning players who already saved a result are not asked twice.
      return { ...state, phase: state.lead.saved ? "ending" : "leadgate" };
    }
    case "SET_INSTRUMENTS":
      return { ...state, lead: { ...state.lead, instruments: action.instruments } };
    case "SET_LEVEL":
      return { ...state, lead: { ...state.lead, level: action.level } };
    case "COMPLETE_LEAD":
      return {
        ...state,
        playerName: capitalize(action.name),
        lead: { ...state.lead, saved: true },
        phase: "ending",
      };
    case "SKIP_LEAD":
      return { ...state, phase: "ending" };
    case "RESTART":
      return {
        ...state,
        scores: START_SCORES,
        sceneIndex: 0,
        activeChoice: null,
        lead: { ...state.lead, instruments: [], level: "" },
        phase: "scene",
      };
    default:
      return state;
  }
}

export function useGameEngine() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    startGame: useCallback((name: string) => dispatch({ type: "START_GAME", name }), []),
    choose: useCallback((choice: Choice) => dispatch({ type: "CHOOSE", choice }), []),
    continueGame: useCallback(() => dispatch({ type: "CONTINUE" }), []),
    setInstruments: useCallback((instruments: string[]) => dispatch({ type: "SET_INSTRUMENTS", instruments }), []),
    setLevel: useCallback((level: string) => dispatch({ type: "SET_LEVEL", level }), []),
    completeLead: useCallback((name: string) => dispatch({ type: "COMPLETE_LEAD", name }), []),
    skipLead: useCallback(() => dispatch({ type: "SKIP_LEAD" }), []),
    restart: useCallback(() => dispatch({ type: "RESTART" }), []),
  };
}
