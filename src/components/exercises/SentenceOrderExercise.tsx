"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { AudioButton } from "@/components/audio/AudioButton";
import { Check, X, Sparkles, RotateCcw, ArrowRight, CornerDownLeft } from "lucide-react";

interface VocabItem {
  id: string;
  hanzi: string;
  exampleSentence?: string | null;
  exampleSentenceVi?: string | null;
}

interface OrderQuestion {
  targetSentence: string;
  translation: string;
  tokens: string[];
}

export function SentenceOrderExercise({
  vocabItems,
  lessonId,
  onFinish,
}: {
  vocabItems: VocabItem[];
  lessonId: string;
  onFinish?: (score: number) => void;
}) {
  const [questions, setQuestions] = useState<OrderQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Generate sentence ordering questions from example sentences
    const valid = vocabItems.filter(
      (v) => v.exampleSentence && v.exampleSentenceVi
    );

    const generated: OrderQuestion[] = valid.map((item) => {
      // Split sentence into 3 to 5 chunks
      const s = item.exampleSentence!.replace(/[。？！?!,，]/g, "").trim();
      let rawTokens: string[] = [];

      if (s.length <= 4) {
        rawTokens = s.split("");
      } else {
        // Chunk into 2-char pieces
        for (let i = 0; i < s.length; i += 2) {
          rawTokens.push(s.slice(i, i + 2));
        }
      }

      const shuffled = [...rawTokens].sort(() => Math.random() - 0.5);

      return {
        targetSentence: s,
        translation: item.exampleSentenceVi!,
        tokens: shuffled,
      };
    });

    setQuestions(generated);
    if (generated.length > 0) {
      setAvailableTokens(generated[0].tokens);
      setSelectedTokens([]);
    }
  }, [vocabItems]);

  const loadQuestionAtIndex = (idx: number) => {
    setCurrentIndex(idx);
    setIsAnswered(false);
    setIsCorrect(false);
    setSelectedTokens([]);
    if (questions[idx]) {
      setAvailableTokens([...questions[idx].tokens]);
    }
  };

  const handleSelectToken = (token: string, tokenIndex: number) => {
    if (isAnswered) return;
    const newAvail = [...availableTokens];
    newAvail.splice(tokenIndex, 1);
    setAvailableTokens(newAvail);
    setSelectedTokens((prev) => [...prev, token]);
  };

  const handleDeselectToken = (token: string, tokenIndex: number) => {
    if (isAnswered) return;
    const newSelected = [...selectedTokens];
    newSelected.splice(tokenIndex, 1);
    setSelectedTokens(newSelected);
    setAvailableTokens((prev) => [...prev, token]);
  };

  const handleCheckAnswer = () => {
    const q = questions[currentIndex];
    const userBuilt = selectedTokens.join("");
    const correct = userBuilt === q.targetSentence;

    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      loadQuestionAtIndex(currentIndex + 1);
    } else {
      setCompleted(true);
      const finalPercentage = Math.round(
        ((score + (isCorrect ? 1 : 0)) / questions.length) * 100
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
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">Hoàn thành Sắp xếp câu!</h3>
          <p className="text-slate-600 text-sm">
            Bạn đạt {score} / {questions.length} câu chính xác ({finalScore}%).
          </p>
        </div>

        <button
          onClick={() => {
            setScore(0);
            setCompleted(false);
            loadQuestionAtIndex(0);
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
    <div className="max-w-lg mx-auto space-y-6">
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

      {/* Target prompt */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 space-y-6 text-center">
        <div>
          <span className="text-xs text-slate-400 font-bold block mb-1">
            Dịch câu sau sang tiếng Trung:
          </span>
          <div className="text-xl font-bold text-slate-800">
            &quot;{q.translation}&quot;
          </div>
        </div>

        {/* Selected Tokens Area (The drop area) */}
        <div className="min-h-[72px] p-3 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 flex flex-wrap items-center justify-center gap-2">
          {selectedTokens.length === 0 ? (
            <span className="text-xs text-blue-400 font-medium">
              Nhấn các từ bên dưới để ghép câu...
            </span>
          ) : (
            selectedTokens.map((token, i) => (
              <button
                key={i}
                onClick={() => handleDeselectToken(token, i)}
                disabled={isAnswered}
                className="px-3.5 py-2 rounded-xl bg-blue-600 text-onaccent font-bold text-lg hanzi-font shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
              >
                {token}
              </button>
            ))
          )}
        </div>

        {/* Available Tokens (The pool) */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {availableTokens.map((token, i) => (
            <button
              key={i}
              onClick={() => handleSelectToken(token, i)}
              disabled={isAnswered}
              className="px-3.5 py-2 rounded-xl bg-white border-2 border-slate-200 text-slate-800 font-bold text-lg hanzi-font shadow-sm hover:border-blue-400 hover:bg-blue-50 active:scale-95 transition-all"
            >
              {token}
            </button>
          ))}
        </div>

        {/* Feedback Banner */}
        {isAnswered && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between ${
              isCorrect
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <X className="w-4 h-4 text-rose-600" />
              )}
              <span>
                {isCorrect
                  ? "Ghép câu hoàn toàn chính xác!"
                  : `Đáp án đúng: ${q.targetSentence}`}
              </span>
            </div>
            <AudioButton text={q.targetSentence} size="sm" />
          </div>
        )}
      </div>

      {/* Buttons */}
      {!isAnswered ? (
        <button
          onClick={handleCheckAnswer}
          disabled={selectedTokens.length === 0}
          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-onaccent font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
        >
          <CornerDownLeft className="w-4 h-4" />
          <span>Kiểm tra đáp án</span>
        </button>
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
