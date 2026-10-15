"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { AudioButton } from "@/components/audio/AudioButton";
import { Check, X, Sparkles, RotateCcw, ArrowRight, Award } from "lucide-react";

interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  exampleSentence?: string | null;
  exampleSentenceVi?: string | null;
  meanings: { wordClass: string; meaningVi: string }[];
}

interface ComprehensiveQuestion {
  type: "meaning" | "pinyin" | "fill" | "tf";
  prompt: string;
  subPrompt?: string;
  correctAnswer: string;
  options: string[];
  audioText?: string;
}

export function ComprehensiveQuiz({
  vocabItems,
  lessonId,
  title = "Kiểm tra tổng hợp",
  onFinish,
}: {
  vocabItems: VocabItem[];
  lessonId: string;
  title?: string;
  onFinish?: (score: number) => void;
}) {
  const [questions, setQuestions] = useState<ComprehensiveQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Generate mixed questions from vocabItems
    const generated: ComprehensiveQuestion[] = [];

    vocabItems.forEach((item, idx) => {
      const others = vocabItems.filter((v) => v.id !== item.id);
      const shuffledOthers = [...others].sort(() => Math.random() - 0.5);

      if (idx % 3 === 0) {
        // Type: Meaning question
        const options = [
          item.meanings[0]?.meaningVi || "",
          shuffledOthers[0]?.meanings[0]?.meaningVi || "Nghĩa khác A",
          shuffledOthers[1]?.meanings[0]?.meaningVi || "Nghĩa khác B",
          shuffledOthers[2]?.meanings[0]?.meaningVi || "Nghĩa khác C",
        ].sort(() => Math.random() - 0.5);

        generated.push({
          type: "meaning",
          prompt: item.hanzi,
          subPrompt: `(${item.pinyin}) có nghĩa là gì?`,
          correctAnswer: item.meanings[0]?.meaningVi || "",
          options,
          audioText: item.hanzi,
        });
      } else if (idx % 3 === 1) {
        // Type: Pinyin question
        const options = [
          item.pinyin,
          shuffledOthers[0]?.pinyin || "tā",
          shuffledOthers[1]?.pinyin || "hǎo",
          shuffledOthers[2]?.pinyin || "wǒ",
        ].sort(() => Math.random() - 0.5);

        generated.push({
          type: "pinyin",
          prompt: item.hanzi,
          subPrompt: "Chọn cách đọc phiên âm (Pinyin) đúng:",
          correctAnswer: item.pinyin,
          options,
          audioText: item.hanzi,
        });
      } else {
        // Type: Fill in blank or translation
        const sentence = item.exampleSentence || `这是 ${item.hanzi}。`;
        const sentenceWithBlank = sentence.replace(item.hanzi, " _______ ");
        const options = [
          item.hanzi,
          shuffledOthers[0]?.hanzi || "你",
          shuffledOthers[1]?.hanzi || "好",
          shuffledOthers[2]?.hanzi || "吗",
        ].sort(() => Math.random() - 0.5);

        generated.push({
          type: "fill",
          prompt: sentenceWithBlank,
          subPrompt: `Điền từ phù hợp với nghĩa: "${item.exampleSentenceVi || item.meanings[0]?.meaningVi}"`,
          correctAnswer: item.hanzi,
          options,
          audioText: item.exampleSentence || item.hanzi,
        });
      }
    });

    setQuestions(generated);
  }, [vocabItems]);

  const handleSelect = (opt: string) => {
    if (isAnswered) return;

    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt === questions[currentIndex].correctAnswer) {
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
        ((score + (selectedOption === questions[currentIndex].correctAnswer ? 1 : 0)) /
          questions.length) *
          100
      );
      confetti({ particleCount: 80, spread: 80 });

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
          <Award className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">Hoàn thành {title}!</h3>
          <p className="text-slate-600 text-sm">
            Kết quả của bạn: {score} / {questions.length} câu đúng ({finalScore}%).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
          {finalScore >= 80 ? (
            <span className="text-emerald-600 font-bold text-sm block">
              Xuất sắc! Bạn đã nắm rất vững kiến thức phần này! 🎉
            </span>
          ) : (
            <span className="text-amber-600 font-bold text-sm block">
              Khá tốt! Bạn có thể ôn tập lại các từ vựng chưa thuộc nhé. 👍
            </span>
          )}
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
          <span>Làm lại bài kiểm tra</span>
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

      {/* Main Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 space-y-5 text-center">
        <div className="text-xs text-slate-500 font-medium">{q.subPrompt}</div>

        <div className="py-2 flex items-center justify-center gap-3">
          <span className="text-4xl font-black text-slate-900 hanzi-font">{q.prompt}</span>
          {q.audioText && <AudioButton text={q.audioText} size="sm" />}
        </div>

        {/* 4 Options */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {q.options.map((opt, i) => {
            const isTarget = opt === q.correctAnswer;
            const isSelected = selectedOption === opt;

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
                key={i}
                disabled={isAnswered}
                onClick={() => handleSelect(opt)}
                className={`w-full p-3.5 rounded-2xl border-2 font-bold text-base transition-all shadow-sm active:scale-95 flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && isTarget && <Check className="w-5 h-5 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div
            className={`p-3 rounded-2xl text-xs font-bold ${
              selectedOption === q.correctAnswer
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {selectedOption === q.correctAnswer
              ? "Chính xác!"
              : `Đáp án đúng là: ${q.correctAnswer}`}
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
