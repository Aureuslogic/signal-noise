import type { VoiceState } from "@/hooks/useVapiNarration";
import styles from "./VoiceButton.module.css";

interface VoiceButtonProps {
  label: string;
  state: VoiceState;
  onClick: () => void;
}

export function VoiceButton({ label, state, onClick }: VoiceButtonProps) {
  return (
    <button type="button" className={styles.voiceBtn} data-state={state} onClick={onClick}>
      {label}
    </button>
  );
}
