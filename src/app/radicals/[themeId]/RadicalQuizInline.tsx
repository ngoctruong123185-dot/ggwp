"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Check, X, RotateCcw, ArrowRight } from "lucide-react";

export function RadicalQuizInline({
  radicals,
  themeName,
}: {
  radicals: any[];
  themeName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (radicals.length < 2) return null;

  const currentRadical = radicals[currentIndex];

  // Pick 3 distractors
  const distractors = radicals
    .filter((r) => r.id !== currentRadical.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const options = [currentRadical, ...distractors].sort(
    () => Math.random() - 0.5
  );

  const handleSelect = (rad: any) => {
    if (isAnswered) return;
    setSelectedAnswer(rad.id);
    setIsAnswered(true);

    if (rad.id === currentRadical.id) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentIndex + 1 < radicals.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
      confetti({ particleCount: 70, spread: 70 });
    }
  };

  if (!isOpen) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center gap-2 font-bold text-amber-900 justify-center sm:justify-start">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>Thử thách nhận diện bộ thủ ({themeName})</span>
          </div>
          <p className="text-xs text-amber-800">
            Kiểm tra khả năng phân biệt và ghi nhớ ý nghĩa của {radicals.length} bộ thủ trong nhóm này.
          </p>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-onaccent font-bold text-xs shadow-sm transition-all shrink-0"
        >
          Bắt đầu Quiz nhanh
        </button>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center space-y-4 max-w-md mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Hoàn thành Quiz bộ thủ!</h3>
          <p className="text-xs text-slate-500 mt-1">
            Bạn đạt {score} / {radicals.length} câu đúng.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setScore(0);
              setCompleted(false);
              setIsAnswered(false);
              setSelectedAnswer(null);
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại</span>
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-onaccent font-bold text-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md max-w-lg mx-auto space-y-5">
      <div className="flex items-center justify-between text-xs font-bold text-slate-600">
        <span>
          Câu {currentIndex + 1} / {radicals.length}
        </span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-600 text-xs"
        >
          Thoát
        </button>
      </div>

      <div className="text-center space-y-2">
        <span className="text-xs text-slate-500 font-medium">
          Bộ thủ nào dưới đây có nghĩa là:
        </span>
        <div className="text-2xl font-black text-amber-900">
          &quot;{currentRadical.meaning}&quot;
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isTarget = opt.id === currentRadical.id;
          const isSelected = selectedAnswer === opt.id;

          let btnStyle = "bg-slate-50 border-slate-200 hover:border-amber-400 text-slate-900";
          if (isAnswered) {
            if (isTarget) {
              btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-900 font-black";
            } else if (isSelected) {
              btnStyle = "bg-rose-100 border-rose-400 text-rose-900";
            } else {
              btnStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
            }
          }

          return (
            <button
              key={opt.id}
              disabled={isAnswered}
              onClick={() => handleSelect(opt)}
              className={`p-4 rounded-2xl border-2 text-center transition-all shadow-sm ${btnStyle}`}
            >
              <div className="text-4xl font-black hanzi-font">{opt.hanzi}</div>
              {isAnswered && (
                <div className="text-[11px] font-semibold mt-1 truncate">
                  {opt.meaning}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      {isAnswered && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-onaccent font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span>Câu tiếp theo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
