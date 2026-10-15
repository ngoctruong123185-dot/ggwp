"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { AudioButton } from "@/components/audio/AudioButton";
import { speakChinese } from "@/lib/speech";
import { Check, X, Sparkles, RotateCcw, ArrowRight, Volume2 } from "lucide-react";

interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  imageUrl?: string | null;
  meanings: { wordClass: string; meaningVi: string }[];
}

interface ListenQuestion {
  vocab: VocabItem;
  options: VocabItem[];
}

export function ListenPickImageExercise({
  vocabItems,
  lessonId,
  onFinish,
}: {
  vocabItems: VocabItem[];
  lessonId: string;
  onFinish?: (score: number) => void;
}) {
  const [questions, setQuestions] = useState<ListenQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Generate questions with 4 image choices each
    const generated: ListenQuestion[] = vocabItems.map((item) => {
      const others = vocabItems.filter((v) => v.id !== item.id);
      const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [item, ...shuffledOthers].sort(() => Math.random() - 0.5);

      return {
        vocab: item,
        options,
      };
    });

    setQuestions(generated);
  }, [vocabItems]);

  // Auto play audio when entering question
  useEffect(() => {
    if (questions.length > 0 && questions[currentIndex]) {
      speakChinese(questions[currentIndex].vocab.hanzi, { rate: 0.85 });
    }
  }, [currentIndex, questions]);

  const handleSelect = (item: VocabItem) => {
    if (isAnswered) return;

    setSelectedId(item.id);
    setIsAnswered(true);

    if (item.id === questions[currentIndex].vocab.id) {
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
        <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">Hoàn thành Nghe chọn ảnh!</h3>
          <p className="text-slate-600 text-sm">
            Bạn đạt {score} / {questions.length} câu chính xác ({finalScore}%).
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
    <div className="max-w-xl mx-auto space-y-6">
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

      {/* Speaker Prompter */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 text-center space-y-4">
        <span className="text-xs text-slate-500 font-medium">
          Nghe phát âm và chọn hình ảnh tương ứng:
        </span>

        <div className="flex items-center justify-center py-2">
          <button
            onClick={() => speakChinese(q.vocab.hanzi, { rate: 0.85 })}
            className="w-16 h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-onaccent flex items-center justify-center shadow-lg shadow-blue-500/30 active:scale-95 transition-all"
            title="Nhấn để nghe lại"
          >
            <Volume2 className="w-8 h-8 animate-pulse" />
          </button>
        </div>

        {isAnswered && (
          <div className="pt-2 animate-fade-in">
            <div className="text-3xl font-black text-slate-800 hanzi-font">
              {q.vocab.hanzi}
            </div>
            <div className="text-sm font-bold text-blue-600">{q.vocab.pinyin}</div>
            <div className="text-xs text-slate-500 italic">
              ({q.vocab.meanings[0]?.meaningVi})
            </div>
          </div>
        )}

        {/* 4 Images Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {q.options.map((opt) => {
            const isSelected = selectedId === opt.id;
            const isTarget = opt.id === q.vocab.id;

            let borderStyle = "border-slate-200 hover:border-blue-400";
            if (isAnswered) {
              if (isTarget) {
                borderStyle = "border-emerald-500 ring-4 ring-emerald-100";
              } else if (isSelected) {
                borderStyle = "border-rose-500 ring-4 ring-rose-100 opacity-60";
              } else {
                borderStyle = "border-slate-200 opacity-40";
              }
            }

            return (
              <button
                key={opt.id}
                disabled={isAnswered}
                onClick={() => handleSelect(opt)}
                className={`group rounded-2xl border-2 overflow-hidden bg-slate-50 text-left transition-all relative ${borderStyle}`}
              >
                <div className="w-full h-32 bg-slate-100 overflow-hidden relative">
                  <img
                    src={
                      opt.imageUrl ||
                      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&q=80"
                    }
                    alt="Choice"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isAnswered && isTarget && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 text-onaccent flex items-center justify-center shadow-md">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  {isAnswered && isSelected && !isTarget && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-500 text-onaccent flex items-center justify-center shadow-md">
                      <X className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {isAnswered && (
                  <div className="p-2 text-center bg-white border-t border-slate-100">
                    <span className="font-bold text-sm text-slate-800 hanzi-font">
                      {opt.hanzi}
                    </span>
                    <span className="text-xs text-slate-500 block truncate">
                      {opt.meanings[0]?.meaningVi}
                    </span>
                  </div>
                )}
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
