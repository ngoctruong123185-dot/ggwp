"use client";

import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { speakChinese, stopSpeaking } from "@/lib/speech";

interface AudioButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  rate?: number;
}

export function AudioButton({
  text,
  className = "",
  size = "md",
  rate = 0.85,
}: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    speakChinese(text, {
      rate,
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const sizeClasses = {
    sm: "w-7 h-7 p-1 text-xs",
    md: "w-9 h-9 p-2 text-sm",
    lg: "w-11 h-11 p-2.5 text-base",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      title={`Phát âm: ${text}`}
      className={`rounded-full flex items-center justify-center transition-all ${
        isPlaying
          ? "bg-blue-600 text-onaccent scale-110 ring-4 ring-blue-100 shadow-md"
          : "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105"
      } ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <Volume2 className={`${iconSizes[size]} animate-pulse`} />
      ) : (
        <Volume2 className={iconSizes[size]} />
      )}
    </button>
  );
}
