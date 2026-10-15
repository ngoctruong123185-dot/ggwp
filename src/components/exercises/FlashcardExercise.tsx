"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { AudioButton } from "@/components/audio/AudioButton";
import { Check, X, RotateCcw, ArrowRight, Sparkles, Volume2 } from "lucide-react";

interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  imageUrl?: string | null;
  exampleSentence?: string | null;
  exampleSentenceVi?: string | null;
  meanings: { wordClass: string; meaningVi: string }[];
}

interface FlashcardExerciseProps {
  vocabItems: VocabItem[];
  lessonId: string;
  onFinish?: (score: number) => void;
}

export function FlashcardExercise({
  vocabItems,
  lessonId,
  onFinish,
}: FlashcardExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rememberedIds, setRememberedIds] = useState<string[]>([]);
  const [reviewQueue, setReviewQueue] = useState<VocabItem[]>([...vocabItems]);
  const [completed, setCompleted] = useState(false);

  const currentItem = reviewQueue[currentIndex];

  const handleNext = (remembered: boolean) => {
    setIsFlipped(false);

    if (remembered) {
      if (!rememberedIds.includes(currentItem.id)) {
        setRememberedIds((prev) => [...prev, currentItem.id]);
      }
    } else {
      // Add back to end of queue for Leitner review
      setReviewQueue((prev) => [...prev, currentItem]);
    }

    if (currentIndex + 1 < reviewQueue.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed session
      setCompleted(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

      // Save progress
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: "lesson",
          itemId: lessonId,
          status: "done",
          score: 100,
        }),
      }).catch(() => {});

      onFinish?.(100);
    }
  };

  const restart = () => {
    setReviewQueue([...vocabItems]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setRememberedIds([]);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-lg mx-auto space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">Hoàn thành Flashcard!</h3>
          <p className="text-slate-600 text-sm">
            Bạn đã ôn tập toàn bộ {vocabItems.length} từ vựng của bài học này.
          </p>
        </div>

        <button
          onClick={restart}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-onaccent font-bold text-sm inline-flex items-center gap-2 shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Luyện tập lại</span>
        </button>
      </div>
    );
  }

  if (!currentItem) return null;

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Progress header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-600">
        <span>
          Thẻ {currentIndex + 1} / {reviewQueue.length}
        </span>
        <span>Đã thuộc: {rememberedIds.length} / {vocabItems.length}</span>
      </div>

      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / reviewQueue.length) * 100}%` }}
        />
      </div>

      {/* Flashcard Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-80 bg-white rounded-3xl border-2 border-slate-200 shadow-md hover:border-blue-300 transition-all cursor-pointer p-6 flex flex-col items-center justify-between select-none relative group"
      >
        <div className="w-full flex items-center justify-between text-xs text-slate-400">
          <span>Nhấn để lật thẻ</span>
          <AudioButton text={currentItem.hanzi} size="sm" />
        </div>

        {!isFlipped ? (
          /* Front */
          <div className="text-center my-auto space-y-3">
            <div className="text-7xl font-black text-slate-900 hanzi-font tracking-wide">
              {currentItem.hanzi}
            </div>
            <div className="text-xl font-bold text-blue-600">{currentItem.pinyin}</div>
          </div>
        ) : (
          /* Back */
          <div className="text-center my-auto space-y-3 w-full">
            <div className="text-4xl font-black text-slate-800 hanzi-font">
              {currentItem.hanzi}
            </div>
            <div className="text-sm font-bold text-blue-600">{currentItem.pinyin}</div>

            <div className="space-y-1 pt-2">
              {currentItem.meanings.map((m, i) => (
                <div key={i} className="text-base font-extrabold text-slate-900">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-semibold mr-1.5">
                    {m.wordClass}
                  </span>
                  {m.meaningVi}
                </div>
              ))}
            </div>

            {currentItem.exampleSentence && (
              <div className="pt-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="font-semibold text-slate-700">{currentItem.exampleSentence}</div>
                <div className="italic text-slate-500">{currentItem.exampleSentenceVi}</div>
              </div>
            )}
          </div>
        )}

        <div className="text-[11px] text-slate-400 font-medium">
          {isFlipped ? "Đang xem nghĩa & ví dụ" : "Đang xem chữ Hán"}
        </div>
      </div>

      {/* Buttons: Chưa nhớ vs Đã nhớ */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleNext(false)}
          className="py-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
        >
          <X className="w-5 h-5" />
          <span>Chưa nhớ (Học lại)</span>
        </button>

        <button
          onClick={() => handleNext(true)}
          className="py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-onaccent font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
        >
          <Check className="w-5 h-5" />
          <span>Đã nhớ rồi</span>
        </button>
      </div>
    </div>
  );
}
