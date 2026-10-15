"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { AudioButton } from "@/components/audio/AudioButton";
import { Check, Sparkles, RotateCcw, ArrowRight } from "lucide-react";

interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  meanings: { wordClass: string; meaningVi: string }[];
}

export function MatchPairsExercise({
  vocabItems,
  lessonId,
  onFinish,
}: {
  vocabItems: VocabItem[];
  lessonId: string;
  onFinish?: (score: number) => void;
}) {
  const [pairs, setPairs] = useState<VocabItem[]>([]);
  const [leftSelected, setLeftSelected] = useState<string | null>(null);
  const [rightSelected, setRightSelected] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [shuffledRight, setShuffledRight] = useState<VocabItem[]>([]);
  const [wrongPair, setWrongPair] = useState<{ left: string; right: string } | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Pick 5 items for matching
    const selected = [...vocabItems].sort(() => Math.random() - 0.5).slice(0, 5);
    setPairs(selected);
    setShuffledRight([...selected].sort(() => Math.random() - 0.5));
    setMatchedIds([]);
    setLeftSelected(null);
    setRightSelected(null);
    setCompleted(false);
  }, [vocabItems]);

  const handleLeftClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setLeftSelected(id);
    if (rightSelected) {
      checkMatch(id, rightSelected);
    }
  };

  const handleRightClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setRightSelected(id);
    if (leftSelected) {
      checkMatch(leftSelected, id);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // Correct match!
      const newMatched = [...matchedIds, leftId];
      setMatchedIds(newMatched);
      setLeftSelected(null);
      setRightSelected(null);

      if (newMatched.length === pairs.length) {
        setCompleted(true);
        confetti({ particleCount: 70, spread: 70 });

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
    } else {
      // Wrong match
      setWrongPair({ left: leftId, right: rightId });
      setTimeout(() => {
        setWrongPair(null);
        setLeftSelected(null);
        setRightSelected(null);
      }, 700);
    }
  };

  const restart = () => {
    const selected = [...vocabItems].sort(() => Math.random() - 0.5).slice(0, 5);
    setPairs(selected);
    setShuffledRight([...selected].sort(() => Math.random() - 0.5));
    setMatchedIds([]);
    setLeftSelected(null);
    setRightSelected(null);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-lg mx-auto space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">Ghép cặp hoàn tất!</h3>
          <p className="text-slate-600 text-sm">
            Bạn đã nối chính xác tất cả các cặp chữ Hán và ý nghĩa tương ứng.
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

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Progress header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-600">
        <span>Ghép từ và nghĩa tương ứng</span>
        <span>
          Đã ghép: {matchedIds.length} / {pairs.length}
        </span>
      </div>

      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${(matchedIds.length / pairs.length) * 100}%` }}
        />
      </div>

      {/* Grid: Left (Chinese) & Right (Vietnamese Meanings) */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-3">
          <span className="text-xs text-slate-500 font-bold block mb-1">
            Chữ Hán:
          </span>
          {pairs.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = leftSelected === item.id;
            const isWrong = wrongPair?.left === item.id;

            let cardStyle = "bg-white border-slate-200 hover:border-blue-400 text-slate-900";
            if (isMatched) {
              cardStyle = "bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60";
            } else if (isWrong) {
              cardStyle = "bg-rose-50 border-rose-400 text-rose-800 animate-shake";
            } else if (isSelected) {
              cardStyle = "bg-blue-50 border-blue-500 ring-2 ring-blue-200 text-blue-900 font-black";
            }

            return (
              <button
                key={item.id}
                disabled={isMatched}
                onClick={() => handleLeftClick(item.id)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all shadow-sm flex items-center justify-between ${cardStyle}`}
              >
                <div>
                  <div className="text-2xl font-black hanzi-font">{item.hanzi}</div>
                  <div className="text-xs font-medium text-blue-600">{item.pinyin}</div>
                </div>
                {isMatched && <Check className="w-5 h-5 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <span className="text-xs text-slate-500 font-bold block mb-1">
            Nghĩa tiếng Việt:
          </span>
          {shuffledRight.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = rightSelected === item.id;
            const isWrong = wrongPair?.right === item.id;

            let cardStyle = "bg-white border-slate-200 hover:border-blue-400 text-slate-900";
            if (isMatched) {
              cardStyle = "bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60";
            } else if (isWrong) {
              cardStyle = "bg-rose-50 border-rose-400 text-rose-800 animate-shake";
            } else if (isSelected) {
              cardStyle = "bg-blue-50 border-blue-500 ring-2 ring-blue-200 text-blue-900 font-black";
            }

            return (
              <button
                key={item.id}
                disabled={isMatched}
                onClick={() => handleRightClick(item.id)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all shadow-sm flex items-center justify-between min-h-[72px] ${cardStyle}`}
              >
                <div>
                  <div className="text-xs font-semibold text-slate-400">
                    {item.meanings[0]?.wordClass}
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    {item.meanings[0]?.meaningVi}
                  </div>
                </div>
                {isMatched && <Check className="w-5 h-5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
