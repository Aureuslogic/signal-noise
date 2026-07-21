import { Button } from "@/components/Button/Button";
import { Card } from "@/components/Card/Card";
import { Divider } from "@/components/Divider/Divider";
import { MarketVisual } from "@/components/MarketVisual/MarketVisual";
import { Meter } from "@/components/Meter/Meter";
import { ScoreboardPanel } from "@/components/ScoreboardPanel/ScoreboardPanel";
import { applyName, describeFramework, pickEnding } from "@/lib/engine";
import { sceneVisual } from "@/lib/marketScenes";
import type { Scores } from "@/lib/types";
import styles from "./EndingSection.module.css";

interface EndingSectionProps {
  playerName: string;
  scores: Scores;
  onRestart: () => void;
}

export function EndingSection({ playerName, scores, onRestart }: EndingSectionProps) {
  const ending = pickEnding(scores);

  return (
    <section>
      <Card
        top={<MarketVisual {...sceneVisual("crest")} alt="Global forex and commodity markets — final profile" animateIn />}
      >
        <p className="small" style={{ letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)" }}>
          {playerName}, your week, reviewed
        </p>
        <div className={styles.profileName}>{ending.name}</div>
        <p className="scene-text">{applyName(ending.text, playerName)}</p>
        <p className={styles.quote}>&ldquo;{ending.quote}&rdquo;</p>

        <div style={{ marginTop: 22 }}>
          <ScoreboardPanel title="Final scoreboard" playerName={playerName} footer={ending.verdict}>
            <Meter label="Sim. balance" value={scores.cap} />
            <Meter label="Discipline" value={scores.dis} />
            <Meter label="Consistency" value={scores.edg} />
          </ScoreboardPanel>
        </div>

        <Divider />

        <div className={styles.framework}>
          <p className={styles.fwKicker}>The framework behind your scores</p>
          <p className={styles.fwTitle}>The EIT Framework: the Emotionally Intelligent Trader</p>
          <p className="scene-text">
            Decision Discipline and Process Consistency are two learning themes in the EIT educational framework.
            Market outcomes remain uncertain; the framework simply provides prompts for reviewing how a fictional
            plan was followed under pressure.
          </p>
          <p className="scene-text">
            <b style={{ color: "var(--gold-light)" }}>Decision Discipline</b> describes whether choices remained
            consistent with the plan given in each scenario. <b style={{ color: "var(--gold-light)" }}>Process
            Consistency</b> describes preparation, journalling and review choices. Neither score measures investment
            knowledge, suitability or likely returns.
          </p>
          <p className="scene-text">{describeFramework(scores, playerName)}</p>
          <p className="scene-text">
            Aulteus Logic workshops and educational materials explore decision awareness, reflection and planning.
            They do not provide personal investment recommendations or promise improved financial results.
          </p>
        </div>

        <p className="scene-text">
          This game is about reflecting on planning, limits and review in fictional situations. It is not a strategy
          and does not tell you whether, when or what to trade.
        </p>
        <p className="scene-text">
          If any of these fictional moments felt familiar, {playerName}, you may wish to reflect on the decision
          process. This is not a recommendation to take, avoid or change any real trade.
        </p>

        <div className={styles.cta}>
          <Button onClick={onRestart}>Play the week again</Button>
          <Button variant="ghost" href="https://www.linkedin.com/company/111351970/" target="_blank" rel="noopener">
            Follow Aulteus Logic
          </Button>
        </div>

        <div className={styles.disclaimer}>
          Aulteus Logic provides general education, not investment advice, personal recommendations, suitability
          assessments or trading signals. No specific investment product or provider is offered in this game. All
          scenarios, prices and outcomes are fictional. Leveraged forex, CFDs and commodity-linked products are
          complex and high risk; leverage can magnify losses and you can lose all money placed at risk. The game
          scores do not predict real-world results. Past or simulated performance is not a reliable indicator of
          future performance. If you are unsure whether a regulated product or service is appropriate for you,
          consider independent advice from an appropriately authorised adviser and check the FCA Register.
        </div>
      </Card>
    </section>
  );
}
