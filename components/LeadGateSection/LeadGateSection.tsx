"use client";

import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { MarketVisual } from "@/components/MarketVisual/MarketVisual";
import { ALLOW_SKIP, WEBHOOK_URL } from "@/lib/config";
import { cn } from "@/lib/cn";
import { capitalize, clampScore, isValidEmail, pickEnding } from "@/lib/engine";
import { INSTRUMENTS, LEVELS } from "@/lib/gameData";
import { sceneVisual } from "@/lib/marketScenes";
import type { Scores } from "@/lib/types";
import styles from "./LeadGateSection.module.css";

interface LeadGateSectionProps {
  playerName: string;
  scores: Scores;
  onSubmit: (name: string) => void;
  onSkip: () => void;
}

export function LeadGateSection({ playerName, scores, onSubmit, onSkip }: LeadGateSectionProps) {
  const [name, setName] = useState(playerName === "Player" ? "" : playerName);
  const [email, setEmail] = useState("");
  const [instruments, setInstruments] = useState<string[]>([]);
  const [level, setLevel] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function toggleInstrument(option: string) {
    setInstruments((prev) => {
      if (prev.includes(option)) return prev.filter((item) => item !== option);
      if (prev.length >= 2) return prev;
      return [...prev, option];
    });
  }

  function handleSubmit() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName) return setError("Please add your first name.");
    if (!isValidEmail(trimmedEmail)) return setError("That email does not look complete. Please check it.");
    if (instruments.length !== 2) return setError("Please pick exactly two instruments.");
    if (!level) return setError("Please tell us where you are on the journey.");
    if (!consent) return setError("Please tick the consent box so we can email your result.");
    setError("");

    const finalName = capitalize(trimmedName);
    setSubmitting(true);

    const ending = pickEnding(scores);
    const payload: Record<string, string> = {
      timestamp: new Date().toISOString(),
      name: finalName,
      email: trimmedEmail,
      instruments: instruments.join(", "),
      level,
      educational_profile: ending.name,
      simulated_balance: String(Math.round(clampScore(scores.cap))),
      decision_discipline: String(Math.round(clampScore(scores.dis))),
      process_consistency: String(Math.round(clampScore(scores.edg))),
      source: "Signal or Noise educational simulation",
    };

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      onSubmit(finalName);
    };

    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload).toString(),
      })
        .then(finish)
        .catch(finish);
      setTimeout(finish, 4000); // never leave the player waiting
    } else {
      finish();
    }
  }

  return (
    <section>
      <Card
        top={
          <MarketVisual
            {...sceneVisual("crest")}
            alt="Global forex and commodity markets — week complete"
            animateIn
          />
        }
      >
        <p className="small" style={{ letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)" }}>
          Ten decisions made
        </p>
        <div className="scene-title" style={{ fontSize: "1.6rem" }}>
          One last step, {playerName}.
        </div>
        <p className="scene-text">
          Your educational game summary is ready. You may optionally receive a copy and occasional Aulteus Logic
          learning updates by email. These communications are general education, not personalised investment advice
          or trading signals.
        </p>

        <div className={styles.field}>
          <label htmlFor="lead-name">First name</label>
          <input
            type="text"
            id="lead-name"
            maxLength={24}
            autoComplete="given-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="lead-email">Email</label>
          <input
            type="email"
            id="lead-email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Which two market topics interest you most? (pick two)</label>
          <div className={styles.chips}>
            {INSTRUMENTS.map((option) => {
              const on = instruments.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  className={cn(styles.pick, on && styles.on)}
                  disabled={!on && instruments.length >= 2}
                  onClick={() => toggleInstrument(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        <div className={styles.field}>
          <label>Which learning stage best describes you? This is not a suitability assessment.</label>
          <div className={styles.chips}>
            {LEVELS.map((option) => (
              <button
                key={option}
                type="button"
                className={cn(styles.pick, level === option && styles.on)}
                onClick={() => setLevel(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <label className={styles.consent}>
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
          <span>
            I consent to Aulteus Logic emailing my game summary and occasional general educational updates. No
            trading signals or personalised recommendations. I can unsubscribe at any time.
          </span>
        </label>
        <p className={styles.formError}>{error}</p>
        <div className={styles.cta}>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Saving your result" : "Reveal my trading profile"}
          </Button>
        </div>
        {ALLOW_SKIP && (
          <button type="button" className={styles.skipLink} onClick={onSkip}>
            Continue without saving my details
          </button>
        )}
      </Card>
    </section>
  );
}
