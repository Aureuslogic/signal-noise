import { ENDINGS } from "./gameData";
import type { Ending, ScoreKey, Scores } from "./types";

const SCORE_MAX = 130;

export function clampScore(value: number): number {
  return Math.max(0, Math.min(value, SCORE_MAX));
}

export function scoreToPercent(value: number): string {
  return `${Math.round((clampScore(value) / SCORE_MAX) * 100)}%`;
}

export function applyName(text: string, playerName: string): string {
  return text.split("{name}").join(playerName);
}

export function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function applyDelta(scores: Scores, delta: Partial<Record<ScoreKey, number>>): Scores {
  return {
    cap: clampScore(scores.cap + (delta.cap ?? 0)),
    dis: clampScore(scores.dis + (delta.dis ?? 0)),
    edg: clampScore(scores.edg + (delta.edg ?? 0)),
  };
}

export function pickEnding(scores: Scores): Ending {
  if (scores.dis >= 85 && scores.cap >= 105) return ENDINGS.signal;
  if (scores.cap < 80) return ENDINGS.lesson;
  if (scores.dis < 45) return ENDINGS.passenger;
  return ENDINGS.builder;
}

export function describeFramework(scores: Scores, playerName: string): string {
  const discipline = Math.round(clampScore(scores.dis));
  const consistency = Math.round(clampScore(scores.edg));

  const disciplineText =
    discipline >= 85
      ? `Your Decision Discipline score was ${discipline}: in this simulation, most choices remained consistent with the supplied plan.`
      : discipline >= 55
        ? `Your Decision Discipline score was ${discipline}: some choices followed the supplied plan and others did not.`
        : `Your Decision Discipline score was ${discipline}: several choices departed from the supplied fictional plan.`;

  const consistencyText =
    consistency >= 85
      ? `Your Process Consistency score was ${consistency}: preparation and review were selected frequently in the game.`
      : consistency >= 55
        ? `Your Process Consistency score was ${consistency}: the fictional process was followed in some situations.`
        : `Your Process Consistency score was ${consistency}: several choices relied on reactions or third-party claims rather than the supplied plan.`;

  return `${playerName}, these are game-only learning scores and do not assess suitability, competence or likely financial performance. ${disciplineText} ${consistencyText}`;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}
