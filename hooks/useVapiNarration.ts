"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { VAPI_ASSISTANT_ID, VAPI_PUBLIC_KEY } from "@/lib/config";
import type Vapi from "@vapi-ai/web";

export type VoiceState = "idle" | "live" | "error";

const SPEECH_TIMEOUT_MS = 90_000;
const CONNECT_TIMEOUT_MS = 15_000;
const POST_SPEECH_DELAY_MS = 240;
const RECONNECT_DELAY_MS = 180;
const REPLACE_FALLBACK_MS = 700;

/**
 * Drives the optional voice narrator: connects lazily on first use, and
 * replaces (rather than queues behind) whatever is currently narrated so a
 * new screen is never overlapped by stale speech from the previous one.
 * Also silences narration outright when the tab is hidden, unloaded, or the
 * player leaves the page.
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
  const replacingSpeechRef = useRef(false);
  const currentSpeechRef = useRef("");
  const speechQueueRef = useRef<string[]>([]);
  const connectTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const speechTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const startRef = useRef<() => Promise<void>>(async () => {});

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
      // A screen change forced this call to end so it could reconnect with
      // only the new screen's line queued - pick that reconnection back up.
      const restartWithLatestPage = replacingSpeechRef.current && shouldNarrateRef.current && speechQueueRef.current.length > 0;
      if (!replacingSpeechRef.current && dispatchingRef.current && currentSpeechRef.current) {
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
      replacingSpeechRef.current = false;
      setVoiceButton(shouldNarrateRef.current ? "Voice: reconnect" : "Voice off", shouldNarrateRef.current ? "error" : "idle");
      if (restartWithLatestPage) {
        setVoiceButton("Changing page…", "idle");
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = setTimeout(() => {
          void startRef.current();
        }, RECONNECT_DELAY_MS);
      }
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

  useEffect(() => {
    startRef.current = start;
  }, [start]);

  // Replaces whatever is queued or currently playing with just this line, so
  // moving to a new decision, debrief, or results screen never overlaps with
  // narration left over from the one before it.
  const replaceSpeech = useCallback(
    (text: string) => {
      const clean = text.trim();
      if (!clean) return;

      clearTimeout(speechTimerRef.current);
      clearTimeout(reconnectTimerRef.current);
      speechQueueRef.current = [clean];
      speakingRef.current = false;
      dispatchingRef.current = false;
      currentSpeechRef.current = "";

      if (!shouldNarrateRef.current) return;

      if (vapiRef.current && (connectedRef.current || connectingRef.current)) {
        // Ending the call is the dependable way to stop active assistant audio;
        // reconnecting with only the current screen queued prevents stale narration.
        replacingSpeechRef.current = true;
        connectedRef.current = false;
        connectingRef.current = false;
        setVoiceButton("Changing page…", "idle");
        vapiRef.current.stop();
        // Fallback for browsers that omit call-end after a rapid screen change.
        reconnectTimerRef.current = setTimeout(() => {
          if (!replacingSpeechRef.current) return;
          replacingSpeechRef.current = false;
          void start();
        }, REPLACE_FALLBACK_MS);
        return;
      }
      void start();
    },
    [setVoiceButton, start],
  );

  // Silences narration immediately: used for hard stops (leaving a screen
  // with nothing new to say, hiding the tab, unloading the page) rather than
  // replacement (moving to a screen that has something new to narrate).
  const stopNarration = useCallback(() => {
    shouldNarrateRef.current = false;
    connectedRef.current = false;
    connectingRef.current = false;
    speakingRef.current = false;
    greetingFinishedRef.current = false;
    dispatchingRef.current = false;
    replacingSpeechRef.current = false;
    currentSpeechRef.current = "";
    speechQueueRef.current = [];
    clearTimeout(connectTimerRef.current);
    clearTimeout(speechTimerRef.current);
    clearTimeout(reconnectTimerRef.current);
    vapiRef.current?.stop();
    setVoiceButton("Voice off", "idle");
  }, [setVoiceButton]);

  const toggle = useCallback(async () => {
    if ((connectedRef.current || connectingRef.current) && vapiRef.current) {
      shouldNarrateRef.current = false;
      connectingRef.current = false;
      clearTimeout(connectTimerRef.current);
      clearTimeout(speechTimerRef.current);
      clearTimeout(reconnectTimerRef.current);
      speechQueueRef.current = [];
      replacingSpeechRef.current = false;
      dispatchingRef.current = false;
      currentSpeechRef.current = "";
      vapiRef.current.stop();
      setVoiceButton("Voice off", "idle");
      return;
    }
    await start();
  }, [setVoiceButton, start]);

  // Never let narration continue after the player leaves or hides the page.
  useEffect(() => {
    const handleHiddenChange = () => {
      if (document.hidden) stopNarration();
    };
    window.addEventListener("pagehide", stopNarration);
    window.addEventListener("beforeunload", stopNarration);
    document.addEventListener("visibilitychange", handleHiddenChange);
    return () => {
      window.removeEventListener("pagehide", stopNarration);
      window.removeEventListener("beforeunload", stopNarration);
      document.removeEventListener("visibilitychange", handleHiddenChange);
    };
  }, [stopNarration]);

  return { label, voiceState, start, toggle, replaceSpeech, stopNarration };
}
