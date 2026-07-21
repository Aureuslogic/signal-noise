import { GOLD, GOLD_LIGHT, MUTED, NAVY_3 } from "@/lib/palette";
import type { ArtKey } from "@/lib/types";
import styles from "./Illustration.module.css";

export function Illustration({ art }: { art: ArtKey }) {
  if (art === "crest") {
    return (
      <svg className={styles.svg} viewBox="0 0 760 220" aria-hidden="true">
        <circle cx="380" cy="110" r="64" fill="none" stroke={GOLD} strokeWidth="2" />
        <circle cx="380" cy="110" r="78" fill="none" stroke={NAVY_3} strokeWidth="1" />
        <polyline
          fill="none"
          stroke={GOLD_LIGHT}
          strokeWidth="3"
          strokeLinecap="round"
          points="340,138 362,120 378,128 420,84"
        />
        <circle cx="420" cy="84" r="5" fill={GOLD_LIGHT} />
        <g stroke={GOLD} strokeWidth="1.5" opacity=".7">
          <line x1="240" y1="110" x2="290" y2="110" />
          <line x1="470" y1="110" x2="520" y2="110" />
        </g>
        <text x="380" y="205" fontFamily="Georgia,serif" fontSize="13" fill={MUTED} textAnchor="middle" letterSpacing="4">
          THE WEEK, REVIEWED
        </text>
      </svg>
    );
  }

  return (
    <svg className={styles.svg} viewBox="0 0 760 200" aria-hidden="true">
      {art === "prep" && (
        <>
          <g stroke={NAVY_3} strokeWidth="1" opacity=".5">
            <line x1="60" y1="40" x2="60" y2="170" />
            <line x1="60" y1="170" x2="700" y2="170" />
          </g>
          <rect x="130" y="46" width="500" height="104" rx="6" fill="none" stroke={NAVY_3} />
          <g stroke={NAVY_3}>
            <line x1="230" y1="46" x2="230" y2="150" />
            <line x1="330" y1="46" x2="330" y2="150" />
            <line x1="430" y1="46" x2="430" y2="150" />
            <line x1="530" y1="46" x2="530" y2="150" />
          </g>
          <g fontFamily="Georgia,serif" fontSize="12" fill={MUTED}>
            <text x="163" y="68">Mon</text>
            <text x="266" y="68">Tue</text>
            <text x="363" y="68">Wed</text>
            <text x="466" y="68">Thu</text>
            <text x="566" y="68">Fri</text>
          </g>
          <circle cx="380" cy="112" r="13" fill="none" stroke={GOLD} strokeWidth="2" />
          <circle cx="580" cy="112" r="13" fill="none" stroke={GOLD} strokeWidth="2" />
          <g stroke={GOLD_LIGHT} strokeWidth="2" strokeLinecap="round">
            <line x1="160" y1="105" x2="200" y2="105" />
            <line x1="160" y1="118" x2="192" y2="118" />
          </g>
        </>
      )}
      {art === "early" && (
        <>
          <g stroke={NAVY_3} strokeWidth="1" opacity=".5">
            <line x1="40" y1="172" x2="720" y2="172" />
          </g>
          <g stroke={MUTED} strokeWidth="2">
            <line x1="120" y1="70" x2="120" y2="130" />
            <rect x="110" y="84" width="20" height="30" fill="#0E2138" />
            <line x1="190" y1="60" x2="190" y2="126" />
            <rect x="180" y="72" width="20" height="36" fill="#0E2138" />
            <line x1="260" y1="76" x2="260" y2="140" />
            <rect x="250" y="92" width="20" height="34" fill="#0E2138" />
            <line x1="330" y1="66" x2="330" y2="132" />
            <rect x="320" y="78" width="20" height="38" fill="#0E2138" />
          </g>
          <g stroke={GOLD_LIGHT} strokeWidth="2">
            <line x1="400" y1="52" x2="400" y2="120" />
            <rect x="390" y="60" width="20" height="44" fill="#16304F" />
          </g>
          <line x1="60" y1="148" x2="700" y2="148" stroke={GOLD} strokeWidth="2" strokeDasharray="8 7" />
          <text x="592" y="140" fontFamily="Georgia,serif" fontSize="13" fill={GOLD_LIGHT}>
            your level
          </text>
        </>
      )}
      {art === "stop" && (
        <>
          <circle cx="180" cy="100" r="52" fill="none" stroke={NAVY_3} strokeWidth="2" />
          <circle cx="180" cy="100" r="52" fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="10 12" />
          <line x1="180" y1="100" x2="180" y2="64" stroke={GOLD_LIGHT} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="180" y1="100" x2="206" y2="112" stroke={GOLD_LIGHT} strokeWidth="2.5" strokeLinecap="round" />
          <g stroke={MUTED} strokeWidth="2">
            <polyline fill="none" points="330,70 400,86 450,80 520,120" />
          </g>
          <polyline fill="none" points="520,120 560,150 620,144" stroke={GOLD} strokeWidth="2.5" />
          <circle cx="520" cy="120" r="5" fill="#C97A6E" />
          <text x="540" y="106" fontFamily="Georgia,serif" fontSize="13" fill={MUTED}>
            the headline
          </text>
        </>
      )}
      {art === "invite" && (
        <>
          <rect x="130" y="34" width="300" height="86" rx="14" fill="#16304F" stroke={NAVY_3} />
          <polygon points="170,120 196,120 176,142" fill="#16304F" />
          <text x="156" y="70" fontFamily="Georgia,serif" fontSize="20" fill={GOLD_LIGHT}>
            Performance claim.
          </text>
          <text x="156" y="98" fontFamily="Georgia,serif" fontSize="15" fill={MUTED}>
            Evidence not provided.
          </text>
          <g fill="none" stroke={GOLD} strokeWidth="2">
            <circle cx="560" cy="88" r="34" />
            <path d="M 546 88 l 10 10 l 20 -22" />
          </g>
          <text x="512" y="152" fontFamily="Georgia,serif" fontSize="13" fill={MUTED}>
            too clean?
          </text>
        </>
      )}
      {art === "announce" && (
        <>
          <g fill="none" stroke={MUTED} strokeWidth="2">
            <rect x="140" y="76" width="130" height="84" />
            <polygon points="130,76 280,76 205,38" />
            <line x1="160" y1="96" x2="160" y2="160" />
            <line x1="185" y1="96" x2="185" y2="160" />
            <line x1="210" y1="96" x2="210" y2="160" />
            <line x1="235" y1="96" x2="235" y2="160" />
          </g>
          <polyline
            fill="none"
            stroke={GOLD}
            strokeWidth="2.5"
            points="360,110 420,108 448,40 470,168 492,66 514,140 545,104 620,100"
          />
          <text x="600" y="84" fontFamily="Georgia,serif" fontSize="13" fill={MUTED}>
            the release
          </text>
        </>
      )}
      {art === "winner" && (
        <>
          <line x1="60" y1="66" x2="700" y2="66" stroke={GOLD} strokeWidth="2" strokeDasharray="8 7" />
          <text x="560" y="54" fontFamily="Georgia,serif" fontSize="13" fill={GOLD_LIGHT}>
            prior resistance
          </text>
          <polyline
            fill="none"
            stroke={GOLD_LIGHT}
            strokeWidth="3"
            strokeLinecap="round"
            points="90,168 200,150 300,140 400,112 500,86 580,76 640,74"
          />
          <circle cx="640" cy="74" r="6" fill={GOLD_LIGHT} />
          <g fontFamily="Georgia,serif" fontSize="13" fill={MUTED}>
            <text x="96" y="150">entry</text>
            <text x="596" y="102">+2R</text>
          </g>
        </>
      )}
      {art === "mirror" && (
        <>
          <line x1="380" y1="30" x2="380" y2="170" stroke={NAVY_3} strokeWidth="1" />
          <polyline fill="none" stroke={MUTED} strokeWidth="2" points="90,100 180,92 260,108 340,98" />
          <polyline
            fill="none"
            stroke={GOLD}
            strokeWidth="2"
            strokeDasharray="6 6"
            points="420,98 500,108 580,92 670,100"
          />
          <g fontFamily="Georgia,serif" fontSize="13" fill={MUTED}>
            <text x="120" y="140">the week so far</text>
            <text x="480" y="140" fill={GOLD_LIGHT}>the week you imagine</text>
          </g>
        </>
      )}
      {art === "third" && (
        <>
          <g fill="#16304F" stroke={NAVY_3}>
            <rect x="120" y="52" width="150" height="96" rx="8" />
            <rect x="305" y="52" width="150" height="96" rx="8" />
          </g>
          <rect x="490" y="44" width="150" height="112" rx="8" fill="#16304F" stroke={GOLD} strokeWidth="2" />
          <g fontFamily="Georgia,serif" fontSize="15" fill={MUTED} textAnchor="middle">
            <text x="195" y="106">Trade one</text>
            <text x="380" y="106">Trade two</text>
          </g>
          <text x="565" y="96" fontFamily="Georgia,serif" fontSize="15" fill={GOLD_LIGHT} textAnchor="middle">
            The third
          </text>
          <text x="565" y="122" fontFamily="Georgia,serif" fontSize="12" fill={MUTED} textAnchor="middle">
            beyond your cap
          </text>
          <g fontFamily="Georgia,serif" fontSize="20" fill={GOLD} textAnchor="middle">
            <text x="195" y="80">✓</text>
            <text x="380" y="80">✓</text>
          </g>
        </>
      )}
      {art === "cot" && (
        <>
          <line x1="380" y1="30" x2="380" y2="176" stroke={NAVY_3} strokeWidth="1" />
          <g fill={GOLD} opacity=".9">
            <rect x="392" y="42" width="228" height="14" rx="3" />
            <rect x="392" y="66" width="196" height="14" rx="3" />
            <rect x="392" y="90" width="246" height="14" rx="3" />
            <rect x="392" y="114" width="210" height="14" rx="3" />
          </g>
          <g fill={NAVY_3}>
            <rect x="308" y="42" width="60" height="14" rx="3" />
            <rect x="330" y="66" width="38" height="14" rx="3" />
            <rect x="318" y="90" width="50" height="14" rx="3" />
          </g>
          <g fontFamily="Georgia,serif" fontSize="13">
            <text x="300" y="160" fill={MUTED} textAnchor="end">the few</text>
            <text x="396" y="160" fill={GOLD_LIGHT}>the crowd</text>
          </g>
        </>
      )}
      {art === "review" && (
        <>
          <rect x="250" y="36" width="260" height="132" rx="6" fill="#16304F" stroke={NAVY_3} />
          <line x1="286" y1="36" x2="286" y2="168" stroke={NAVY_3} />
          <g stroke={GOLD} strokeWidth="2" strokeLinecap="round">
            <line x1="306" y1="64" x2="470" y2="64" />
            <line x1="306" y1="88" x2="440" y2="88" />
            <line x1="306" y1="112" x2="460" y2="112" />
            <line x1="306" y1="136" x2="410" y2="136" />
          </g>
          <line x1="520" y1="150" x2="590" y2="80" stroke={GOLD_LIGHT} strokeWidth="3" strokeLinecap="round" />
          <polygon points="590,80 600,66 596,86" fill={GOLD_LIGHT} />
        </>
      )}
    </svg>
  );
}
