"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { AudioButton } from "@/components/audio/AudioButton";
import { Check, X, Sparkles, RotateCcw, ArrowRight, Eye, EyeOff } from "lucide-react";

interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  meanings: { wordClass: string; meaningVi: string }[];
}

interface SpeedQuestion {
  vocab: VocabItem;
  options: VocabItem[];
}

export function SpeedRecallExercise({
  vocabItems,
  lessonId,
  onFinish,
}: {
  vocabItems: VocabItem[];
  lessonId: string;
  onFinish?: (score: number) => void;
}) {
  const [questions, setQuestions] = useState<SpeedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countdown, setCountdown] = useState<number>(3);
  const [isRevealed, setIsRevealed] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const generated: SpeedQuestion[] = vocabItems.map((item) => {
      const others = vocabItems.filter((v) => v.id !== item.id);
      const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [item, ...shuffledOthers].sort(() => Math.random() - 0.5);
      return { vocab: item, options };
    });

    setQuestions(generated);
  }, [vocabItems]);

  // Flash timer logic: show for 2.5s then hide
  useEffect(() => {
    if (questions.length === 0 || completed || isAnswered) return;

    setIsRevealed(true);
    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRevealed(false);
          return 0;
        }
        return prev - 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [currentIndex, questions, completed, isAnswered]);

  const handleSelect = (choice: VocabItem) => {
    if (isAnswered) return;

    setSelectedId(choice.id);
    setIsAnswered(true);
    setIsRevealed(true); // reveal on answer

    if (choice.id === questions[currentIndex].vocab.id) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedId(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
      const finalPercentage = Math.round(
        ((score + (selectedId === questions[currentIndex].vocab.id ? 1 : 0)) /
          questions.length) *
          100
      );
      confetti({ particleCount: 70, spread: 70 });

      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: "lesson",
          itemId: lessonId,
          status: "done",
          score: finalPercentage,
        }),
      }).catch(() => {});

      onFinish?.(finalPercentage);
    }
  };

  if (completed) {
    const finalScore = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-lg mx-auto space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">Hoàn thành Nhớ nhanh!</h3>
          <p className="text-slate-600 text-sm">
            Bạn trả lời đúng {score} / {questions.length} từ ({finalScore}%).
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setCompleted(false);
            setIsAnswered(false);
            setSelectedId(null);
          }}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-onaccent font-bold text-sm inline-flex items-center gap-2 shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Luyện tập lại</span>
        </button>
      </div>
    );
  }

  const q = questions[currentIndex];
  if (!q) return null;

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Progress header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-600">
        <span>
          Câu {currentIndex + 1} / {questions.length}
        </span>
        <span>Điểm: {score} đúng</span>
      </div>

      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Flash box */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 text-center space-y-4 relative overflow-hidden">
        {/* Flash countdown indicator */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-medium">
            {isRevealed ? <Eye className="w-4 h-4 text-blue-500" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
            {isRevealed ? "Ghi nhớ nhanh chữ Hán này!" : "Chữ đã ẩn, chọn đáp án đúng:"}
          </span>
          {isRevealed && !isAnswered && (
            <span className="font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
              {countdown}s
            </span>
          )}
        </div>

        <div className="min-h-[140px] flex items-center justify-center">
          {isRevealed ? (
            <div className="text-7xl font-black text-slate-900 hanzi-font animate-scale-in">
              {q.vocab.hanzi}
            </div>
          ) : (
            <div className="text-4xl font-extrabold text-slate-300 select-none">
              ? ? ?
            </div>
          )}
        </div>

        {/* 4 Choices (Meanings + Pinyin) */}
        <div className="grid grid-cols-1 gap-2.5 pt-2">
          {q.options.map((opt) => {
            const isTarget = opt.id === q.vocab.id;
            const isSelected = selectedId === opt.id;

            let btnStyle = "bg-slate-50 border-slate-200 hover:border-blue-400 text-slate-800";
            if (isAnswered) {
              if (isTarget) {
                btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-900 font-bold";
              } else if (isSelected) {
                btnStyle = "bg-rose-100 border-rose-400 text-rose-900";
              } else {
                btnStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-60";
              }
            }

            return (
              <button
                key={opt.id}
                disabled={isAnswered}
                onClick={() => handleSelect(opt)}
                className={`w-full p-3 rounded-2xl border-2 text-left transition-all shadow-sm active:scale-95 flex items-center justify-between ${btnStyle}`}
              >
                <div>
                  <span className="font-bold text-base text-slate-900 mr-2">
                    {opt.pinyin}
                  </span>
                  <span className="text-sm text-slate-600">
                    - {opt.meanings[0]?.meaningVi}
                  </span>
                </div>
                {isAnswered && isTarget && <Check className="w-5 h-5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      {isAnswered && (
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-onaccent font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <span>Câu tiếp theo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
