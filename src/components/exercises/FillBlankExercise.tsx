"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { AudioButton } from "@/components/audio/AudioButton";
import { Check, X, Sparkles, RotateCcw, ArrowRight } from "lucide-react";

interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  exampleSentence?: string | null;
  exampleSentenceVi?: string | null;
  meanings: { wordClass: string; meaningVi: string }[];
}

interface BlankQuestion {
  vocab: VocabItem;
  sentenceWithBlank: string;
  translation: string;
  correctWord: string;
  options: string[];
}

export function FillBlankExercise({
  vocabItems,
  lessonId,
  onFinish,
}: {
  vocabItems: VocabItem[];
  lessonId: string;
  onFinish?: (score: number) => void;
}) {
  const [questions, setQuestions] = useState<BlankQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Generate fill-in-the-blank questions
    const generated: BlankQuestion[] = vocabItems.map((item) => {
      let sentence = item.exampleSentence || `我喜欢 ${item.hanzi}。`;
      let translation = item.exampleSentenceVi || `Tôi thích ${item.meanings[0]?.meaningVi || ""}.`;

      // Replace target hanzi with blank
      const sentenceWithBlank = sentence.replace(item.hanzi, " _______ ");

      // Get 3 random distractors
      const otherVocab = vocabItems.filter((v) => v.id !== item.id);
      const shuffledOthers = [...otherVocab].sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [item.hanzi, ...shuffledOthers.map((o) => o.hanzi)].sort(
        () => Math.random() - 0.5
      );

      return {
        vocab: item,
        sentenceWithBlank,
        translation,
        correctWord: item.hanzi,
        options,
      };
    });

    setQuestions(generated);
  }, [vocabItems]);

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;

    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt === questions[currentIndex].correctWord) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedOption(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
      const finalPercentage = Math.round(
        ((score + (selectedOption === questions[currentIndex].correctWord ? 1 : 0)) /
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
        <div className="w-16 h-16 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">Hoàn thành Điền từ!</h3>
          <p className="text-slate-600 text-sm">
            Bạn đạt {score} / {questions.length} câu đúng ({finalScore}%).
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setCompleted(false);
            setIsAnswered(false);
            setSelectedOption(null);
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

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 space-y-6 text-center">
        <div className="text-xs text-slate-500 font-medium">
          Chọn từ thích hợp điền vào chỗ trống:
        </div>

        <div className="space-y-3 py-4">
          <div className="text-2xl sm:text-3xl font-black text-slate-900 hanzi-font leading-relaxed">
            {q.sentenceWithBlank}
          </div>
          <div className="text-sm font-medium text-slate-500 italic">
            &quot;{q.translation}&quot;
          </div>
        </div>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {q.options.map((opt, i) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === q.correctWord;

            let btnStyle = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800";
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-900 font-black";
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
                onClick={() => handleSelectOption(opt)}
                className={`py-4 px-3 rounded-2xl border-2 font-bold text-2xl hanzi-font transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 ${btnStyle}`}
              >
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Banner */}
        {isAnswered && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-bold flex items-center justify-between ${
              selectedOption === q.correctWord
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {selectedOption === q.correctWord ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <X className="w-4 h-4 text-rose-600" />
              )}
              <span>
                {selectedOption === q.correctWord
                  ? "Chính xác tuyệt vời!"
                  : `Đáp án đúng là: ${q.correctWord}`}
              </span>
            </div>
            <AudioButton text={q.vocab.exampleSentence || q.correctWord} size="sm" />
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
