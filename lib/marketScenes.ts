import type { ArtKey, MarketSceneMeta } from "./types";

export const MARKET_SCENES: Record<ArtKey, MarketSceneMeta> = {
  prep: {
    image: "prep.webp",
    label: "Session map · EUR/USD + XAU/USD",
    motion: ["right"],
    chartPoints:
      "0,142 58,135 116,139 176,112 238,121 302,83 365,94 430,68 500,73 570,43 635,52 700,24",
  },
  early: {
    image: "early.webp",
    label: "London open · Liquidity building",
    motion: ["push"],
    chartPoints:
      "0,146 55,132 108,139 163,98 220,113 275,72 331,91 387,54 444,68 505,34 568,46 630,25 700,17",
  },
  stop: {
    image: "stop.webp",
    label: "Overnight risk · Position review",
    motion: ["left", "alert"],
    chartPoints:
      "0,28 60,38 116,52 176,49 238,76 302,69 364,94 426,88 488,119 552,111 618,139 700,150",
  },
  invite: {
    image: "invite.webp",
    label: "Signal noise · Conviction test",
    motion: ["float", "alert"],
    chartPoints:
      "0,126 60,72 118,136 180,58 239,118 302,43 363,128 425,64 486,110 552,50 620,124 700,72",
  },
  announce: {
    image: "announce.webp",
    label: "Macro event · Volatility expected",
    motion: ["push", "gold"],
    chartPoints:
      "0,138 56,129 112,143 170,102 230,116 288,55 350,93 414,29 475,84 537,41 603,72 700,18",
  },
  winner: {
    image: "winner.webp",
    label: "Trade management · Structure first",
    motion: ["right", "gold"],
    chartPoints:
      "0,139 63,131 126,134 188,111 250,114 313,91 376,89 438,62 501,65 564,43 627,39 700,20",
  },
  mirror: {
    image: "mirror.webp",
    label: "Mid-week risk · Size unchanged",
    motion: ["pull"],
    chartPoints:
      "0,92 64,83 127,102 190,76 253,85 317,69 381,91 444,66 507,74 571,54 635,63 700,48",
  },
  third: {
    image: "third.webp",
    label: "Trade cap · Decision point",
    motion: ["left", "gold"],
    chartPoints:
      "0,139 58,122 118,131 178,109 237,116 298,80 357,92 417,53 477,69 537,38 598,48 658,22 700,31",
  },
  cot: {
    image: "cot.webp",
    label: "Positioning · Crowding context",
    motion: ["push", "gold"],
    chartPoints:
      "0,133 59,126 118,118 176,110 235,103 294,94 353,87 412,76 471,66 530,53 589,41 648,30 700,18",
  },
  review: {
    image: "review.webp",
    label: "Friday close · Process review",
    motion: ["pull"],
    chartPoints:
      "0,78 62,75 124,81 187,68 250,73 312,62 375,65 438,51 500,56 563,43 625,48 700,38",
  },
  crest: {
    image: "review.webp",
    label: "Week complete · Profile ready",
    motion: ["float", "gold"],
    chartPoints:
      "0,142 52,136 108,146 160,112 216,124 273,82 330,99 390,65 455,78 520,39 592,54 700,20",
  },
};

export function sceneVisual(art: ArtKey) {
  const meta = MARKET_SCENES[art];
  return {
    image: meta.image,
    label: meta.label,
    chartPoints: meta.chartPoints,
    motionClasses: meta.motion,
    overlayArt: art,
  };
}

export const HERO_VISUAL = {
  image: "trading-desk.png",
  label: "Forex × commodities",
  chartPoints: "0,145 60,135 115,142 170,112 225,124 285,88 345,98 405,63 470,79 535,42 600,54 700,18",
};
