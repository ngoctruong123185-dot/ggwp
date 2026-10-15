"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, RotateCcw, Volume2 } from "lucide-react";
import { speakChinese, stopSpeaking } from "@/lib/speech";

interface VocabItemForPlay {
  id: string;
  hanzi: string;
  pinyin: string;
}

interface PlayAllVocabBarProps {
  items: VocabItemForPlay[];
}

export function PlayAllVocabBar({ items }: PlayAllVocabBarProps) {
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.85);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const playItemAtIndex = (idx: number) => {
    if (!isPlayingRef.current || idx >= items.length) {
      setIsPlayingAll(false);
      isPlayingRef.current = false;
      return;
    }

    setCurrentIndex(idx);
    const item = items[idx];

    speakChinese(item.hanzi, {
      rate: playbackSpeed,
      onEnd: () => {
        // Pause 1.2 seconds between words
        setTimeout(() => {
          if (isPlayingRef.current) {
            playItemAtIndex(idx + 1);
          }
        }, 1200);
      },
      onError: () => {
        if (isPlayingRef.current) {
          playItemAtIndex(idx + 1);
        }
      },
    });
  };

  const handleStartPlayAll = () => {
    if (isPlayingAll) {
      isPlayingRef.current = false;
      setIsPlayingAll(false);
      stopSpeaking();
    } else {
      isPlayingRef.current = true;
      setIsPlayingAll(true);
      playItemAtIndex(currentIndex >= items.length ? 0 : currentIndex);
    }
  };

  const handleNext = () => {
    stopSpeaking();
    const nextIdx = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIdx);
    if (isPlayingAll) {
      playItemAtIndex(nextIdx);
    } else {
      speakChinese(items[nextIdx].hanzi, { rate: playbackSpeed });
    }
  };

  const handleReset = () => {
    stopSpeaking();
    setCurrentIndex(0);
    if (isPlayingAll) {
      playItemAtIndex(0);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-card border border-line bg-raised p-4 flex flex-wrap items-center justify-between gap-4">
      {/* lap progress along the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-slate-100">
        <div
          className="h-full bg-blue-500 transition-[width] duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleStartPlayAll}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 ${
            isPlayingAll
              ? "bg-blue-500 text-onaccent shadow-[0_0_0_6px_rgb(var(--c-blue-500)/0.18)]"
              : "bg-blue-500 text-onaccent hover:scale-105"
          }`}
          title={isPlayingAll ? "Tạm dừng" : "Phát tất cả từ vựng"}
          aria-label={isPlayingAll ? "Tạm dừng" : "Phát tất cả từ vựng"}
        >
          {isPlayingAll ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold italic leading-none text-slate-900">Nghe liên tục</span>
            <span className="num text-sm font-bold text-blue-600">
              {currentIndex + 1}/{items.length}
            </span>
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
            <span>Đang phát</span>
            <span key={currentIndex} className="font-bold text-slate-900 text-base hanzi-font animate-scale-in">
              {items[currentIndex]?.hanzi}
            </span>
            <span className="text-blue-600 font-semibold">{items[currentIndex]?.pinyin}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Speed Control */}
        <label className="flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs font-semibold text-slate-600">
          <span>Tốc độ</span>
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
            className="bg-transparent font-bold text-slate-900 cursor-pointer focus:outline-none"
          >
            <option value={0.7} className="bg-surface">0.7x</option>
            <option value={0.85} className="bg-surface">0.85x</option>
            <option value={1.0} className="bg-surface">1.0x</option>
          </select>
        </label>

        {/* Skip to Next */}
        <button
          onClick={handleNext}
          className="p-2 rounded-lg border border-line bg-surface text-slate-700 hover:text-blue-600 hover:border-blue-500/50 transition-colors"
          title="Từ tiếp theo"
          aria-label="Từ tiếp theo"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        {/* Reset to Beginning */}
        <button
          onClick={handleReset}
          className="p-2 rounded-lg border border-line bg-surface text-slate-700 hover:text-blue-600 hover:border-blue-500/50 transition-colors"
          title="Phát lại từ đầu"
          aria-label="Phát lại từ đầu"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
