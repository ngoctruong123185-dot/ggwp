"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { AudioButton } from "@/components/audio/AudioButton";
import { Check, X, Sparkles, RotateCcw, ArrowRight } from "lucide-react";

interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  imageUrl?: string | null;
  meanings: { wordClass: string; meaningVi: string }[];
}

interface Question {
  vocab: VocabItem;
  shownImageUrl: string;
  shownMeaning: string;
  isCorrectMatch: boolean;
}

export function TrueFalseImageExercise({
  vocabItems,
  lessonId,
  onFinish,
}: {
  vocabItems: VocabItem[];
  lessonId: string;
  onFinish?: (score: number) => void;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Generate questions
    const validItems = vocabItems.filter((v) => v.imageUrl);
    const pool = validItems.length >= 2 ? validItems : vocabItems;

    const generated: Question[] = pool.map((item, idx) => {
      const isMatch = Math.random() > 0.5;
      if (isMatch) {
        return {
          vocab: item,
          shownImageUrl: item.imageUrl || "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&q=80",
          shownMeaning: item.meanings[0]?.meaningVi || "",
          isCorrectMatch: true,
        };
      } else {
        // Pick distractor
        const otherItems = pool.filter((other) => other.id !== item.id);
        const distractor = otherItems[Math.floor(Math.random() * otherItems.length)] || item;
        return {
          vocab: item,
          shownImageUrl: distractor.imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
          shownMeaning: distractor.meanings[0]?.meaningVi || "",
          isCorrectMatch: false,
        };
      }
    });

    setQuestions(generated);
  }, [vocabItems]);

  const handleAnswer = (userChoice: boolean) => {
    if (isAnswered) return;

    setSelectedAnswer(userChoice);
    setIsAnswered(true);

    const isRight = userChoice === questions[currentIndex].isCorrectMatch;
    if (isRight) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
      const finalPercentage = Math.round(((score + (selectedAnswer === questions[currentIndex].isCorrectMatch ? 1 : 0)) / questions.length) * 100);
      confetti({ particleCount: 60, spread: 60 });

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
          <h3 className="text-2xl font-black text-slate-900">Kết quả Đúng / Sai</h3>
          <p className="text-slate-600 text-sm">
            Bạn đã trả lời đúng {score} / {questions.length} câu ({finalScore}%).
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setCompleted(false);
            setIsAnswered(false);
            setSelectedAnswer(null);
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

  const isUserCorrect = isAnswered && selectedAnswer === q.isCorrectMatch;

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

      {/* Card Content */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 space-y-5 text-center">
        <div className="text-xs text-slate-500 font-medium">
          Hình ảnh sau có khớp với từ vựng không?
        </div>

        {/* Image Display */}
        <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-100 relative shadow-inner">
          <img
            src={q.shownImageUrl}
            alt="Quiz illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Word Display */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-black text-slate-900 hanzi-font">{q.vocab.hanzi}</span>
            <AudioButton text={q.vocab.hanzi} size="sm" />
          </div>
          <div className="text-base font-bold text-blue-600">{q.vocab.pinyin}</div>
          <div className="text-xs text-slate-500 italic">({q.vocab.meanings[0]?.meaningVi})</div>
        </div>

        {/* Feedback Banner */}
        {isAnswered && (
          <div
            className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 ${
              isUserCorrect
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            {isUserCorrect ? (
              <>
                <Check className="w-4 h-4" />
                <span>Chính xác! Đáp án là {q.isCorrectMatch ? "ĐÚNG" : "SAI"}.</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4" />
                <span>Chưa đúng! Đáp án đúng là {q.isCorrectMatch ? "ĐÚNG" : "SAI"}.</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {!isAnswered ? (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleAnswer(false)}
            className="py-3.5 rounded-2xl bg-white hover:bg-rose-50 text-rose-600 border-2 border-rose-200 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <X className="w-5 h-5" />
            <span>SAI (Không khớp)</span>
          </button>

          <button
            onClick={() => handleAnswer(true)}
            className="py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-onaccent font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <Check className="w-5 h-5" />
            <span>ĐÚNG (Khớp)</span>
          </button>
        </div>
      ) : (
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
