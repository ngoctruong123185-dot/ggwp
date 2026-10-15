"use client";

import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import {
  RotateCcw,
  Play,
  Check,
  X,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Volume2,
  CheckCircle2,
} from "lucide-react";
import { AudioButton } from "@/components/audio/AudioButton";
import { checkChineseMatch } from "@/lib/pinyin";

interface Sentence {
  text: string;
  pinyin?: string;
  vi?: string;
  startSec: number;
  endSec: number;
}

export function DictationPlayer({
  video,
  transcript,
}: {
  video: any;
  transcript: Sentence[];
}) {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [completed, setCompleted] = useState(false);
  const [videoStartTime, setVideoStartTime] = useState(transcript[0]?.startSec || 0);

  const currentSentence = transcript[currentSentenceIdx];

  const handleCheck = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userInput.trim() || isAnswered || !currentSentence) return;

    // Check with tolerance
    const matches: boolean = Boolean(
      checkChineseMatch(userInput, currentSentence.text) ||
      (currentSentence.pinyin &&
        userInput.toLowerCase().replace(/\s/g, "") ===
          currentSentence.pinyin.toLowerCase().replace(/[^a-z0-9]/g, ""))
    );

    setIsAnswered(true);
    setIsCorrect(matches);
    setResults((prev) => [...prev, matches]);
  };

  const handleReplaySegment = () => {
    if (!currentSentence) return;
    setVideoStartTime(currentSentence.startSec);
  };

  const handleNext = () => {
    setIsAnswered(false);
    setIsCorrect(false);
    setUserInput("");
    setShowAnswer(false);

    if (currentSentenceIdx + 1 < transcript.length) {
      const nextIdx = currentSentenceIdx + 1;
      setCurrentSentenceIdx(nextIdx);
      setVideoStartTime(transcript[nextIdx].startSec);
    } else {
      // Completed all
      setCompleted(true);
      const totalCorrect = results.filter(Boolean).length + (isCorrect ? 1 : 0);
      const finalScore = Math.round((totalCorrect / transcript.length) * 100);
      confetti({ particleCount: 80, spread: 70 });

      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: "dictation",
          itemId: video.id,
          status: "done",
          score: finalScore,
        }),
      }).catch(() => {});
    }
  };

  if (completed) {
    const totalCorrect = results.filter(Boolean).length;
    const finalScore = Math.round((totalCorrect / transcript.length) * 100);

    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-lg mx-auto space-y-6 shadow-sm">
        <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">Hoàn thành Chép chính tả!</h3>
          <p className="text-slate-600 text-sm">
            Bạn đã gõ đúng {totalCorrect} / {transcript.length} câu ({finalScore}%).
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentSentenceIdx(0);
            setUserInput("");
            setIsAnswered(false);
            setResults([]);
            setCompleted(false);
            setVideoStartTime(transcript[0]?.startSec || 0);
          }}
          className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-onaccent font-bold text-sm inline-flex items-center gap-2 shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Luyện tập lại video này</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* YouTube Embedded Player */}
      <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-lg border-2 border-slate-900">
        <iframe
          key={`${video.youtubeId}-${videoStartTime}`}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.youtubeId}?start=${videoStartTime}&autoplay=1&enablejsapi=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Dictation Typing Area */}
      {currentSentence && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm space-y-5">
          {/* Header of sentence */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                Câu {currentSentenceIdx + 1} / {transcript.length}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                ({currentSentence.startSec}s – {currentSentence.endSec}s)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReplaySegment}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Tua lại đoạn video của câu này"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tua lại câu này</span>
              </button>

              <AudioButton text={currentSentence.text} size="sm" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleCheck} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isAnswered}
                placeholder="Gõ lại câu tiếng Trung bạn vừa nghe được..."
                className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-base font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white transition-all disabled:opacity-80 hanzi-font"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowAnswer(!showAnswer)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showAnswer ? "Ẩn gợi ý" : "Xem gợi ý câu"}</span>
              </button>

              {!isAnswered ? (
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:bg-slate-200 disabled:text-slate-400 text-onaccent font-bold text-xs shadow-sm transition-all active:scale-95"
                >
                  Kiểm tra câu
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-onaccent font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  <span>Câu kế tiếp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Hint view */}
          {showAnswer && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
              <div className="font-bold text-sm hanzi-font">{currentSentence.text}</div>
              <div className="text-amber-800">{currentSentence.pinyin}</div>
              <div className="italic text-amber-700">{currentSentence.vi}</div>
            </div>
          )}

          {/* Answer Feedback Banner */}
          {isAnswered && (
            <div
              className={`p-4 rounded-2xl text-xs font-bold space-y-1.5 ${
                isCorrect
                  ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                  : "bg-rose-50 text-rose-900 border border-rose-200"
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
                    ? "Chính xác tuyệt đối! Bạn nghe rất tốt."
                    : "Chưa chính xác hoàn toàn. Hãy đối chiếu đáp án bên dưới:"}
                </span>
              </div>

              <div className="text-sm font-black hanzi-font pt-1">
                {currentSentence.text}
              </div>
              <div className="text-slate-600">{currentSentence.pinyin}</div>
              <div className="italic text-slate-500">{currentSentence.vi}</div>
            </div>
          )}
        </div>
      )}

      {/* Transcript List Navigation Strip */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-3">
        <h4 className="text-xs font-bold text-slate-400">
          Danh sách câu trong bài ({transcript.length} câu)
        </h4>

        <div className="space-y-2">
          {transcript.map((sent, i) => {
            const isCurrent = i === currentSentenceIdx;
            const isDone = results[i] !== undefined;
            const isRight = results[i] === true;

            return (
              <button
                key={i}
                onClick={() => {
                  setCurrentSentenceIdx(i);
                  setVideoStartTime(sent.startSec);
                  setIsAnswered(false);
                  setIsCorrect(false);
                  setUserInput("");
                  setShowAnswer(false);
                }}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                  isCurrent
                    ? "bg-rose-50 border-rose-400 text-rose-950 font-bold"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="truncate hanzi-font">{sent.text}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-slate-400 text-[10px] font-mono">
                    {sent.startSec}s
                  </span>
                  {isDone && (
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-onaccent ${
                        isRight ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    >
                      {isRight ? "✓" : "✕"}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
