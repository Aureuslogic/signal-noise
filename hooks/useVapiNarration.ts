"use client";

import { useCallback, useRef, useState } from "react";
import { VAPI_ASSISTANT_ID, VAPI_PUBLIC_KEY } from "@/lib/config";
import type Vapi from "@vapi-ai/web";

export type VoiceState = "idle" | "live" | "error";

const SPEECH_TIMEOUT_MS = 90_000;
const CONNECT_TIMEOUT_MS = 15_000;
const POST_SPEECH_DELAY_MS = 240;

/**
 * Drives the optional Vapi voice narrator: connects lazily on first use,
 * queues scene/debrief text so lines never overlap or get dropped mid-call,
 * and exposes just enough state to render the scoreboard's voice button.
 */
export function useVapiNarration() {
  const [label, setLabel] = useState("Voice ready");
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");

  const vapiRef = useRef<Vapi | null>(null);
  const connectedRef = useRef(false);
  const connectingRef = useRef(false);
  const speakingRef = useRef(false);
  const greetingFinishedRef = useRef(false);
  const shouldNarrateRef = useRef(false);
  const dispatchingRef = useRef(false);
  const currentSpeechRef = useRef("");
  const speechQueueRef = useRef<string[]>([]);
  const connectTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const speechTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const setVoiceButton = useCallback((nextLabel: string, nextState: VoiceState) => {
    setLabel(nextLabel);
    setVoiceState(nextState);
  }, []);

  const dispatchNextSpeech = useCallback(() => {
    const vapi = vapiRef.current;
    if (
      !vapi ||
      !connectedRef.current ||
      speakingRef.current ||
      !greetingFinishedRef.current ||
      dispatchingRef.current ||
      speechQueueRef.current.length === 0
    ) {
      return;
    }
    const text = speechQueueRef.current.shift() as string;
    currentSpeechRef.current = text;
    dispatchingRef.current = true;
    setVoiceButton("Narrating…", "live");
    try {
      vapi.say(text, false);
      // Safety net for a rare dropped speech-end event, so later scenes never stall forever.
      speechTimerRef.current = setTimeout(() => {
        if (!dispatchingRef.current) return;
        speechQueueRef.current.unshift(currentSpeechRef.current);
        dispatchingRef.current = false;
        currentSpeechRef.current = "";
        speakingRef.current = false;
        setVoiceButton("Voice: retry", "error");
      }, SPEECH_TIMEOUT_MS);
    } catch (error) {
      speechQueueRef.current.unshift(text);
      dispatchingRef.current = false;
      currentSpeechRef.current = "";
      console.error("Could not play queued Vapi narration", error);
      setVoiceButton("Voice: retry", "error");
    }
  }, [setVoiceButton]);

  const loadVapi = useCallback(async (): Promise<Vapi> => {
    if (vapiRef.current) return vapiRef.current;
    const { default: VapiClient } = await import("@vapi-ai/web");
    const vapi = new VapiClient(VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", () => {
      connectedRef.current = true;
      connectingRef.current = false;
      clearTimeout(connectTimerRef.current);
      greetingFinishedRef.current = false;
      dispatchingRef.current = false;
      currentSpeechRef.current = "";
      vapi.setMuted(true);
      setVoiceButton("Voice on", "live");
    });

    vapi.on("speech-start", () => {
      speakingRef.current = true;
      clearTimeout(speechTimerRef.current);
      setVoiceButton("Narrating…", "live");
    });

    vapi.on("speech-end", () => {
      speakingRef.current = false;
      clearTimeout(speechTimerRef.current);
      if (!greetingFinishedRef.current) {
        // Let the assistant's welcome finish before the first game scene.
        greetingFinishedRef.current = true;
      } else if (dispatchingRef.current) {
        dispatchingRef.current = false;
        currentSpeechRef.current = "";
      }
      setVoiceButton("Voice on", "live");
      setTimeout(dispatchNextSpeech, POST_SPEECH_DELAY_MS);
    });

    vapi.on("call-end", () => {
      if (dispatchingRef.current && currentSpeechRef.current) {
        speechQueueRef.current.unshift(currentSpeechRef.current);
      }
      connectedRef.current = false;
      connectingRef.current = false;
      clearTimeout(connectTimerRef.current);
      clearTimeout(speechTimerRef.current);
      speakingRef.current = false;
      greetingFinishedRef.current = false;
      dispatchingRef.current = false;
      currentSpeechRef.current = "";
      setVoiceButton(shouldNarrateRef.current ? "Voice: reconnect" : "Voice off", shouldNarrateRef.current ? "error" : "idle");
    });

    vapi.on("error", (error: unknown) => {
      connectingRef.current = false;
      clearTimeout(connectTimerRef.current);
      console.error("Vapi narration error", error);
      setVoiceButton("Voice unavailable", "error");
    });

    return vapi;
  }, [dispatchNextSpeech, setVoiceButton]);

  const start = useCallback(async () => {
    if (connectedRef.current || connectingRef.current) return;
    shouldNarrateRef.current = true;
    connectingRef.current = true;
    setVoiceButton("Connecting…", "idle");
    try {
      const client = await loadVapi();
      connectTimerRef.current = setTimeout(() => {
        if (!connectedRef.current) {
          connectingRef.current = false;
          void client.stop();
          setVoiceButton("Voice: retry", "error");
        }
      }, CONNECT_TIMEOUT_MS);
      await client.start(VAPI_ASSISTANT_ID, { artifactPlan: { recordingEnabled: false } });
    } catch (error) {
      connectingRef.current = false;
      clearTimeout(connectTimerRef.current);
      console.error("Could not start Vapi narration", error);
      setVoiceButton("Voice unavailable", "error");
    }
  }, [loadVapi, setVoiceButton]);

  const queueSpeech = useCallback(
    (text: string) => {
      const clean = text.trim();
      if (!clean) return;
      speechQueueRef.current.push(clean);
      dispatchNextSpeech();
      // If the call ended during a pause, the next narrated line reconnects it.
      if (shouldNarrateRef.current && !connectedRef.current && !connectingRef.current) {
        void start();
      }
    },
    [dispatchNextSpeech, start],
  );

  const toggle = useCallback(async () => {
    if ((connectedRef.current || connectingRef.current) && vapiRef.current) {
      shouldNarrateRef.current = false;
      connectingRef.current = false;
      clearTimeout(connectTimerRef.current);
      clearTimeout(speechTimerRef.current);
      speechQueueRef.current = [];
      dispatchingRef.current = false;
      currentSpeechRef.current = "";
      vapiRef.current.stop();
      setVoiceButton("Voice off", "idle");
      return;
    }
    await start();
  }, [setVoiceButton, start]);

  return { label, voiceState, start, toggle, queueSpeech };
}
