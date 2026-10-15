"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { HanziWriterCanvas } from "@/components/writing/HanziWriterCanvas";
import { Sparkles, RotateCcw, ArrowRight } from "lucide-react";

interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  meanings: { wordClass: string; meaningVi: string }[];
}

export function StrokeOrderExercise({
  vocabItems,
  lessonId,
  onFinish,
}: {
  vocabItems: VocabItem[];
  lessonId: string;
  onFinish?: (score: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  // Take individual single-character words first
  const singleCharVocab = vocabItems.filter((v) => v.hanzi.length === 1);
  const items = singleCharVocab.length > 0 ? singleCharVocab : vocabItems;

  const currentItem = items[currentIndex];

  const handleWordComplete = () => {
    if (!completedWords.includes(currentItem.hanzi)) {
      setCompletedWords((prev) => [...prev, currentItem.hanzi]);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < items.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
      confetti({ particleCount: 80, spread: 70 });

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

  if (completed) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-lg mx-auto space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">Hoàn thành Luyện thứ tự nét!</h3>
          <p className="text-slate-600 text-sm">
            Bạn đã luyện tập và viết chính xác thứ tự nét cho các chữ Hán trong bài.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentIndex(0);
            setCompletedWords([]);
            setCompleted(false);
          }}
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
          Chữ {currentIndex + 1} / {items.length}
        </span>
        <span>Đã viết đúng: {completedWords.length} chữ</span>
      </div>

      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
        />
      </div>

      {/* Canvas */}
      <HanziWriterCanvas
        key={currentItem.hanzi}
        hanzi={currentItem.hanzi[0]}
        pinyin={currentItem.pinyin}
        meaning={currentItem.meanings[0]?.meaningVi}
        onComplete={handleWordComplete}
      />

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-onaccent font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
      >
        <span>
          {currentIndex + 1 < items.length ? "Chuyển sang chữ kế tiếp" : "Hoàn thành bài tập"}
        </span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
