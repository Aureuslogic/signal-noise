import type { Ending, EndingKey, Scene, Scores } from "./types";

export const START_SCORES: Scores = { cap: 100, dis: 60, edg: 50 };

export const INSTRUMENTS = [
  "EURUSD",
  "GBPUSD",
  "USDJPY",
  "GBPJPY",
  "Gold (XAUUSD)",
  "US500",
  "NAS100",
  "FTSE 100",
  "Oil",
  "Bitcoin",
] as const;

export const LEVELS = ["Beginner", "Intermediate"] as const;

export const CHOICE_LETTERS = ["A", "B", "C"] as const;

export const SCENES: Scene[] = [
  {
    day: "Mon",
    title: "Before the open",
    art: "prep",
    text: "It is Sunday evening, {name}. The week's calendar shows a central bank decision on Wednesday and positioning data on Friday. Your journal from last week sits unopened. How do you prepare?",
    choices: [
      {
        label: "Review the calendar, mark key levels, and set a daily trade limit.",
        fx: { dis: 12, edg: 8 },
        debrief:
          "Preparation is not a ritual, {name}. It is the only part of trading you fully control, and it decides how every other moment this week will feel.",
      },
      {
        label: "Skip the preparation and respond to each market event as it unfolds.",
        fx: { dis: -10, edg: -5 },
        debrief:
          "Reading the market live sounds like skill. Without a plan it is improvisation with money.",
      },
      {
        label: "Check several signal groups and follow what other participants are watching.",
        fx: { dis: -5, edg: -8 },
        debrief: "Crowded opinions feel like information. They are mostly noise wearing a suit.",
      },
    ],
  },
  {
    day: "Mon",
    title: "The early setup",
    art: "early",
    text: "London open. Your favoured pair is approaching your level but has not reached it. Momentum is building and the candle is moving without you.",
    choices: [
      {
        label: "Wait for price to reach the level already in your plan.",
        fx: { cap: 6, dis: 10, edg: 6 },
        debrief:
          "In this fictional scenario, waiting avoided an impulsive entry. In live markets, waiting does not ensure a better outcome; the learning point is consistency with a pre-set plan.",
      },
      {
        label: "Enter before the level at half the size you planned.",
        fx: { cap: 2, dis: -4 },
        debrief: "Half size on a broken rule is still a broken rule, {name}. Size does not launder process.",
      },
      {
        label: "Enter before the level at the full size you planned.",
        fx: { cap: -8, dis: -8, edg: -3 },
        debrief:
          "Price spiked, then reversed to the level you originally wanted, taking your stop on the way. You bought the move everyone could already see. Late entries pay for early ones.",
      },
    ],
  },
  {
    day: "Tue",
    title: "The overnight stop",
    art: "stop",
    text: "You wake to find a position stopped out on a headline nobody could have predicted. The loss is within plan, but it stings more than it should.",
    choices: [
      {
        label: "Record the loss, review the process, then take an hour away.",
        fx: { dis: 10, edg: 5 },
        debrief:
          "A planned loss is not evidence of personal failure. Taking a pause can help separate a process review from an emotional reaction.",
      },
      {
        label: "Re-enter now and try to recover the loss before taking a break.",
        fx: { cap: -10, dis: -12 },
        debrief:
          "The market keeps no ledger of what it owes you, {name}. Revenge trades settle emotional accounts with real money.",
      },
      {
        label: "Make future stops wider so similar headlines cause less disruption later.",
        fx: { cap: -4, dis: -6, edg: -6 },
        debrief: "Wider stops do not remove risk. They relocate it, usually somewhere more expensive.",
      },
    ],
  },
  {
    day: "Tue",
    title: "The invitation",
    art: "invite",
    text: "A former colleague messages you, {name}: a private trading group claiming unusually consistent results and limited availability. No independently verified evidence or balanced risk information is provided.",
    choices: [
      {
        label: "Decline and check whether the results have evidence and balanced risk details.",
        fx: { dis: 8, edg: 8 },
        debrief:
          "A performance percentage without its period, sample size, costs, drawdowns and verification can mislead. Claims should be considered together with clear and prominent risk information.",
      },
      {
        label: "Join the group quietly and observe its messages without committing money.",
        fx: { dis: -5, edg: -4 },
        debrief:
          "Nobody only observes. Borrowed conviction leaks into your own decisions within days, and you cannot journal a conviction you do not understand.",
      },
      {
        label: "Join the group and allocate a modest amount to evaluate its claims.",
        fx: { cap: -6, dis: -8, edg: -5 },
        debrief:
          "Committing money on the basis of an unverified claim exposes you to financial loss and does not establish that the approach is suitable for you.",
      },
    ],
  },
  {
    day: "Wed",
    title: "The announcement",
    art: "announce",
    text: "Central bank day. In this fictional scenario, spreads widen and prices move sharply around the release. Your written plan does not cover trading during the announcement.",
    choices: [
      {
        label: "Avoid acting during the release and reassess later against the written plan.",
        fx: { cap: 3, dis: 10, edg: 8 },
        debrief:
          "In this simulation, not acting avoided exposure outside the written plan. It does not guarantee a better result in live markets.",
      },
      {
        label: "Place pending orders on both sides before the scheduled release begins.",
        fx: { cap: -8, dis: -4, edg: -2 },
        debrief:
          "In this fictional outcome, both orders were affected by rapid movement and wider spreads. The choice also acted outside the written plan.",
      },
      {
        label: "Choose one direction before the release based on your current feeling.",
        fx: { cap: -12, dis: -10 },
        debrief: "A feeling on announcement day is adrenaline with a narrative attached.",
      },
    ],
  },
  {
    day: "Wed",
    title: "Managing the position",
    art: "winner",
    text: "In this fictional scenario, a position opened after the announcement moves favourably before stalling near a previously identified level.",
    choices: [
      {
        label: "Take the planned partial and manage the remainder using existing structure.",
        fx: { cap: 8, dis: 8, edg: 5 },
        debrief:
          "This choice followed the fictional exit plan. The favourable outcome is part of the simulation and does not show that the same approach will work in live markets.",
      },
      {
        label: "Close the entire position because the current gain now feels sufficient.",
        fx: { cap: 4, dis: -2, edg: -3 },
        debrief:
          "This choice departed from the stated plan because of discomfort. The learning point is the change in process, not whether the simulated outcome was positive.",
      },
      {
        label: "Add more to the position because the current move appears favourable.",
        fx: { cap: -6, dis: -6 },
        debrief:
          "Increasing exposure changed the original risk plan near the identified level. Leverage can magnify both gains and losses.",
      },
    ],
  },
  {
    day: "Thu",
    title: "The mid-week mirror",
    art: "mirror",
    text: "You are roughly flat on the week, {name}. A familiar voice suggests the only way to make the week matter is to size up for the final two days.",
    choices: [
      {
        label: "Keep the planned size because the simulated week needs no rescue.",
        fx: { dis: 10, edg: 5 },
        debrief:
          "Keeping the fictional size unchanged remained consistent with the stated plan. A single simulated week provides no evidence of future performance.",
      },
      {
        label: "Double the planned size for every decision on Thursday and Friday.",
        fx: { cap: -10, dis: -12 },
        debrief:
          "Increasing size increases exposure. Leverage can magnify losses as well as gains, and a desire to change the week's result is not a risk assessment.",
      },
      {
        label: "Stop making any further decisions to preserve the current simulated result.",
        fx: { dis: 2, edg: -4 },
        debrief: "Stepping away is sometimes right. Doing it to avoid discomfort, rather than by plan, is avoidance in a wise costume.",
      },
    ],
  },
  {
    day: "Thu",
    title: "The third trade",
    art: "third",
    text: "Late session. A clean setup forms, close to textbook. But you have already taken your two planned trades today.",
    choices: [
      {
        label: "Pass on the setup because you have reached the daily limit.",
        fx: { dis: 12, edg: 6 },
        debrief: "Rules are cheap to keep on quiet days, {name}. They only become expensive, and valuable, when the setup looks perfect.",
      },
      {
        label: "Take the setup at half size despite reaching the daily limit.",
        fx: { cap: 2, dis: -8 },
        debrief:
          "The favourable simulated outcome could reinforce a decision that broke the stated limit. The learning point is the process change, not the invented gain.",
      },
      {
        label: "Take the setup at full size despite reaching the daily limit.",
        fx: { cap: -8, dis: -10 },
        debrief: "The third trade is rarely about the chart. It is about the first two.",
      },
    ],
  },
  {
    day: "Fri",
    title: "The positioning data",
    art: "cot",
    text: "Friday's report shows speculative positioning heavily crowded on one side of your market. Your own bias sits with the crowd.",
    choices: [
      {
        label: "Use positioning as context without changing the plan from it alone.",
        fx: { dis: 6, edg: 10 },
        debrief:
          "Positioning data can provide context, but it does not indicate when a market will move or guarantee the direction or size of a move.",
      },
      {
        label: "Change direction now because the positioning looks too extreme to continue.",
        fx: { cap: -8, edg: -4 },
        debrief: "Crowded trades can stay crowded for months, {name}. An extreme is a condition, not a trigger.",
      },
      {
        label: "Ignore the positioning report because price is the only relevant information.",
        fx: { edg: -6 },
        debrief:
          "Price is the last truth. Positioning is one of the earlier ones, and the crowd's early certainties are where late surprises come from.",
      },
    ],
  },
  {
    day: "Fri",
    title: "The close",
    art: "review",
    text: "The week ends, {name}. Whatever the account says, one decision remains.",
    choices: [
      {
        label: "Write a weekly review and grade each choice by process, not outcome.",
        fx: { dis: 8, edg: 10 },
        debrief: "The review is where a week's tuition becomes an education. Skip it and you paid full price for nothing.",
      },
      {
        label: "Close the laptop and rely on memory to retain the lessons.",
        fx: { edg: -6 },
        debrief: "Nobody remembers the lessons. That is what the journal is for.",
      },
      {
        label: "Post only the most favourable simulated decision from the week online.",
        fx: { dis: -4, edg: -4 },
        debrief: "An audience is a second account to manage, and it pays in a currency that cannot fund a future.",
      },
    ],
  },
];

export const ENDINGS: Record<EndingKey, Ending> = {
  signal: {
    name: "The Structured Decision-Maker",
    text: "{name}, your choices in this fictional week were generally consistent with the plan supplied by the game. That is a reflection on these ten decisions only, not an assessment of your investment knowledge, suitability or likely performance.",
    quote: "A consistent process can be reviewed; an outcome can only be observed.",
    verdict:
      "High game-only scores for plan consistency and review. No comparison with other players and no prediction of real-world results.",
  },
  builder: {
    name: "The Developing Process",
    text: "Your choices were consistent with the fictional plan in some situations and departed from it in others, {name}. The value of this result is identifying which decisions you may want to reflect on, not forecasting a financial outcome.",
    quote: "You do not need a perfect week. You need a reviewable one.",
    verdict: "Mixed game-only scores. This educational summary is not a ranking, suitability assessment or performance forecast.",
  },
  lesson: {
    name: "The Reflective Learner",
    text: "Several choices moved away from the fictional plan, {name}. Review the moments where the stated plan and the selected action differed. The simulated balance is invented and says nothing about what would happen in live markets.",
    quote: "A fictional outcome is useful only as a prompt for reflection.",
    verdict: "Lower simulated-balance score in this game. This is not evidence of ability or likely future loss.",
  },
  passenger: {
    name: "The Reactive Decision-Maker",
    text: "In this fictional week, {name}, several choices were influenced by headlines, momentum or unverified third-party claims rather than the plan described in the scenario. This is a learning prompt, not a personal or financial assessment.",
    quote: "Unverified conviction is not evidence.",
    verdict: "Lower decision-discipline score in this simulation. The result does not predict behaviour or performance outside the game.",
  },
};
