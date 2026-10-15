"use client";

// Web Speech API Helper for Chinese (Mandarin - zh-CN)

export function getChineseVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return [];
  }
  const voices = window.speechSynthesis.getVoices();
  return voices.filter(
    (v) =>
      v.lang.toLowerCase().startsWith("zh") ||
      v.lang.toLowerCase().includes("cmn") ||
      v.name.toLowerCase().includes("chinese")
  );
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakChinese(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis is not supported in this browser.");
    options?.onEnd?.();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = options?.rate ?? 0.85; // slightly slower for language learners
  utterance.pitch = options?.pitch ?? 1.0;

  const voices = getChineseVoices();
  if (voices.length > 0) {
    // Prefer mainland Chinese voice (zh-CN)
    const cnVoice =
      voices.find((v) => v.lang === "zh-CN" || v.lang === "zh_CN") || voices[0];
    utterance.voice = cnVoice;
  }

  utterance.onend = () => {
    options?.onEnd?.();
  };

  utterance.onerror = (e) => {
    console.warn("SpeechSynthesis error:", e);
    options?.onError?.(e);
    options?.onEnd?.();
  };

  window.speechSynthesis.speak(utterance);
}
