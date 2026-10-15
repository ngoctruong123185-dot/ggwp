"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Check, X, Sparkles, RotateCcw, ArrowRight, Layers } from "lucide-react";

interface RadicalOption {
  hanzi: string;
  name: string;
}

interface RadicalQuestion {
  char: string;
  pinyin: string;
  meaning: string;
  correctRadical: RadicalOption;
  distractors: RadicalOption[];
  options: RadicalOption[];
}

export function PickRadicalExercise({
  lessonId,
  onFinish,
}: {
  lessonId: string;
  onFinish?: (score: number) => void;
}) {
  const [questions, setQuestions] = useState<RadicalQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRadical, setSelectedRadical] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Curated radical recognition database
    const pool: RadicalQuestion[] = [
      {
        char: "你",
        pinyin: "nǐ",
        meaning: "Bạn",
        correctRadical: { hanzi: "亻", name: "Nhân đứng (Người)" },
        distractors: [
          { hanzi: "氵", name: "Ba chấm thủy (Nước)" },
          { hanzi: "口", name: "Khẩu (Miệng)" },
          { hanzi: "木", name: "Mộc (Cây)" },
        ],
        options: [],
      },
      {
        char: "好",
        pinyin: "hǎo",
        meaning: "Tốt, đẹp",
        correctRadical: { hanzi: "女", name: "Nữ (Phụ nữ)" },
        distractors: [
          { hanzi: "日", name: "Nhật (Mặt trời)" },
          { hanzi: "心", name: "Tâm (Trái tim)" },
          { hanzi: "土", name: "Thổ (Đất)" },
        ],
        options: [],
      },
      {
        char: "谢",
        pinyin: "xiè",
        meaning: "Cảm ơn",
        correctRadical: { hanzi: "讠", name: "Ngôn (Lời nói)" },
        distractors: [
          { hanzi: "扌", name: "Thủ (Tay)" },
          { hanzi: "辶", name: "Sước (Bước đi)" },
          { hanzi: "钅", name: "Kim (Kim loại)" },
        ],
        options: [],
      },
      {
        char: "冷",
        pinyin: "lěng",
        meaning: "Lạnh",
        correctRadical: { hanzi: "冫", name: "Băng (Băng tuyết lạnh)" },
        distractors: [
          { hanzi: "火", name: "Hỏa (Lửa)" },
          { hanzi: "目", name: "Mục (Mắt)" },
          { hanzi: "月", name: "Nguyệt (Mặt trăng)" },
        ],
        options: [],
      },
      {
        char: "想",
        pinyin: "xiǎng",
        meaning: "Muốn, nhớ",
        correctRadical: { hanzi: "心", name: "Tâm (Trái tim, suy nghĩ)" },
        distractors: [
          { hanzi: "门", name: "Môn (Cửa)" },
          { hanzi: "艹", name: "Thảo (Cây cỏ)" },
          { hanzi: "饣", name: "Thực (Ăn uống)" },
        ],
        options: [],
      },
    ];

    const prepared = pool.map((q) => {
      const opts = [q.correctRadical, ...q.distractors].sort(
        () => Math.random() - 0.5
      );
      return { ...q, options: opts };
    });

    setQuestions(prepared);
  }, []);

  const handleSelect = (rad: RadicalOption) => {
    if (isAnswered) return;

    setSelectedRadical(rad.hanzi);
    setIsAnswered(true);

    if (rad.hanzi === questions[currentIndex].correctRadical.hanzi) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedRadical(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
      const finalPercentage = Math.round(
        ((score +
          (selectedRadical === questions[currentIndex].correctRadical.hanzi ? 1 : 0)) /
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
          <h3 className="text-2xl font-black text-slate-900">Hoàn thành Nhận diện bộ thủ!</h3>
          <p className="text-slate-600 text-sm">
            Bạn trả lời đúng {score} / {questions.length} câu ({finalScore}%).
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setCompleted(false);
            setIsAnswered(false);
            setSelectedRadical(null);
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

      {/* Target Character Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 text-center space-y-4">
        <span className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5">
          <Layers className="w-4 h-4 text-amber-500" />
          <span>Chữ Hán này chứa bộ thủ nào dưới đây?</span>
        </span>

        <div className="py-2">
          <div className="text-7xl font-black text-slate-900 hanzi-font">{q.char}</div>
          <div className="text-base font-bold text-blue-600 mt-1">{q.pinyin}</div>
          <div className="text-xs text-slate-500">({q.meaning})</div>
        </div>

        {/* 4 Radical Choices Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {q.options.map((rad, i) => {
            const isTarget = rad.hanzi === q.correctRadical.hanzi;
            const isSelected = selectedRadical === rad.hanzi;

            let btnStyle = "bg-slate-50 border-slate-200 hover:border-amber-400 text-slate-800";
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
                key={i}
                disabled={isAnswered}
                onClick={() => handleSelect(rad)}
                className={`p-3.5 rounded-2xl border-2 text-center transition-all shadow-sm active:scale-95 ${btnStyle}`}
              >
                <div className="text-3xl font-black hanzi-font mb-1">{rad.hanzi}</div>
                <div className="text-xs font-semibold truncate">{rad.name}</div>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div
            className={`p-3 rounded-2xl text-xs font-bold ${
              selectedRadical === q.correctRadical.hanzi
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {selectedRadical === q.correctRadical.hanzi
              ? `Chính xác! Bộ thủ ${q.correctRadical.hanzi} - ${q.correctRadical.name}.`
              : `Đáp án đúng là: Bộ thủ ${q.correctRadical.hanzi} - ${q.correctRadical.name}.`}
          </div>
        )}
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
