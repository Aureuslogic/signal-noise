"use client";

import { useState, type KeyboardEvent } from "react";
import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Divider } from "@/components/Divider/Divider";
import { MarketVisual } from "@/components/MarketVisual/MarketVisual";
import { HERO_VISUAL } from "@/lib/marketScenes";
import styles from "./IntroSection.module.css";

interface IntroSectionProps {
  onStart: (name: string, voiceEnabled: boolean) => void;
}

export function IntroSection({ onStart }: IntroSectionProps) {
  const [name, setName] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const handleStart = () => onStart(name, voiceEnabled);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleStart();
  };

  return (
    <section>
      <h1 className={styles.title}>
        Game Time
      </h1>
      <p className={styles.lede}>The Trading Week. A decision game from Aulteus Logic.</p>
      <Divider />
      <Card
        top={
          <MarketVisual
            image={HERO_VISUAL.image}
            alt="Forex and commodity trading desk with market charts"
            label={HERO_VISUAL.label}
            chartPoints={HERO_VISUAL.chartPoints}
            priority
          />
        }
      >
        <p className="scene-text">
          One fictional account. Five days. Ten decisions. Each choice changes three game-only scores: simulated
          balance, decision discipline and process consistency.
        </p>
        <p className="scene-text">
          The scenarios explore common decision pressures: an unexpected loss, an early setup, a volatile
          announcement and an unverified performance claim. The outcomes are invented for reflection and must not be
          treated as evidence that any action or strategy will produce a particular result.
        </p>
        <p className="scene-text small" style={{ color: "var(--muted)" }}>
          The Decision Discipline and Process Consistency scores use the Aulteus Logic{" "}
          <b style={{ color: "var(--gold-light)" }}>EIT educational framework</b>. They are learning prompts, not
          assessments of suitability, competence or likely trading performance.
        </p>
        <div className={styles.riskNotice}>
          <b>Educational simulation only.</b> This game contains no live prices and provides no investment advice,
          personal recommendation or trading signal. Leveraged forex, CFDs and commodity-linked products are complex
          and high risk. Leverage can magnify losses, and you can lose all money placed at risk.
        </div>
        <label className="small" htmlFor="player-name" style={{ display: "block", marginBottom: 2 }}>
          First, what should the market call you?
        </label>
        <div className={styles.nameRow}>
          <input
            className={styles.nameInput}
            id="player-name"
            type="text"
            maxLength={24}
            placeholder="Your first name"
            autoComplete="given-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleStart}>Begin the week</Button>
        </div>
        <label className={styles.voiceOpt} htmlFor="voice-enabled">
          <input
            id="voice-enabled"
            type="checkbox"
            checked={voiceEnabled}
            onChange={(event) => setVoiceEnabled(event.target.checked)}
          />
          <span>
            Start the voice guide
            <small>
              A calm British male narrator will read the game aloud. Your microphone is muted after connection; you
              can turn the guide off at any time.
            </small>
          </span>
        </label>
        <p className="small" style={{ marginTop: 16 }}>
          No game choice should be copied into a live account. The score does not predict real-world results.
        </p>
      </Card>
    </section>
  );
}
