export type ScoreKey = "cap" | "dis" | "edg";

export type Scores = Record<ScoreKey, number>;

export type ScoreDelta = Partial<Record<ScoreKey, number>>;

export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type ArtKey =
  | "prep"
  | "early"
  | "stop"
  | "invite"
  | "announce"
  | "winner"
  | "mirror"
  | "third"
  | "cot"
  | "review"
  | "crest";

export interface Choice {
  label: string;
  fx: ScoreDelta;
  debrief: string;
}

export interface Scene {
  day: Day;
  title: string;
  art: ArtKey;
  text: string;
  choices: [Choice, Choice, Choice];
}

export type EndingKey = "signal" | "builder" | "lesson" | "passenger";

export interface Ending {
  name: string;
  text: string;
  quote: string;
  verdict: string;
}

export interface MarketSceneMeta {
  image: string;
  label: string;
  motion: string[];
  chartPoints: string;
}
