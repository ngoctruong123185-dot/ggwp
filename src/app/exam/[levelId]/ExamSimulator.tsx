"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { AudioButton } from "@/components/audio/AudioButton";
import {
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  exampleSentence?: string | null;
  exampleSentenceVi?: string | null;
  meanings: { wordClass: string; meaningVi: string }[];
}

interface ExamQuestion {
  id: number;
  type: "listen" | "read" | "fill" | "pinyin";
  typeLabel: string;
  prompt: string;
  subPrompt?: string;
  correctAnswer: string;
  options: string[];
  audioText?: string;
}

export function ExamSimulator({
  levelName,
  vocabItems,
}: {
  levelName: string;
  vocabItems: VocabItem[];
}) {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 mins
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // Generate randomized questions on start
  const startExam = () => {
    const qList: ExamQuestion[] = [];
    const pool = [...vocabItems].sort(() => Math.random() - 0.5);

    pool.forEach((item, idx) => {
      const others = vocabItems.filter((v) => v.id !== item.id);
      const shuffledOthers = [...others].sort(() => Math.random() - 0.5);

      const qType = idx % 4;
      if (qType === 0) {
        // Listening question
        const options = [
          item.meanings[0]?.meaningVi || "",
          shuffledOthers[0]?.meanings[0]?.meaningVi || "Nghĩa khác A",
          shuffledOthers[1]?.meanings[0]?.meaningVi || "Nghĩa khác B",
          shuffledOthers[2]?.meanings[0]?.meaningVi || "Nghĩa khác C",
        ].sort(() => Math.random() - 0.5);

        qList.push({
          id: idx + 1,
          type: "listen",
          typeLabel: "Phần 1: Nghe hiểu",
          prompt: "Nghe phát âm và chọn nghĩa đúng:",
          correctAnswer: item.meanings[0]?.meaningVi || "",
          options,
          audioText: item.hanzi,
        });
      } else if (qType === 1) {
        // Pinyin question
        const options = [
          item.pinyin,
          shuffledOthers[0]?.pinyin || "tā",
          shuffledOthers[1]?.pinyin || "hǎo",
          shuffledOthers[2]?.pinyin || "wǒ",
        ].sort(() => Math.random() - 0.5);

        qList.push({
          id: idx + 1,
          type: "pinyin",
          typeLabel: "Phần 2: Phiên âm Pinyin",
          prompt: item.hanzi,
          subPrompt: "Chọn cách đọc phiên âm chuẩn:",
          correctAnswer: item.pinyin,
          options,
          audioText: item.hanzi,
        });
      } else if (qType === 2) {
        // Fill in blank
        const s = item.exampleSentence || `这是 ${item.hanzi}。`;
        const blanked = s.replace(item.hanzi, " _______ ");
        const options = [
          item.hanzi,
          shuffledOthers[0]?.hanzi || "你",
          shuffledOthers[1]?.hanzi || "好",
          shuffledOthers[2]?.hanzi || "买",
        ].sort(() => Math.random() - 0.5);

        qList.push({
          id: idx + 1,
          type: "fill",
          typeLabel: "Phần 3: Điền từ vào câu",
          prompt: blanked,
          subPrompt: `Dịch nghĩa: "${item.exampleSentenceVi || item.meanings[0]?.meaningVi}"`,
          correctAnswer: item.hanzi,
          options,
          audioText: item.exampleSentence || undefined,
        });
      } else {
        // Reading comprehension
        const options = [
          item.meanings[0]?.meaningVi || "",
          shuffledOthers[0]?.meanings[0]?.meaningVi || "Nghĩa sai A",
          shuffledOthers[1]?.meanings[0]?.meaningVi || "Nghĩa sai B",
          shuffledOthers[2]?.meanings[0]?.meaningVi || "Nghĩa sai C",
        ].sort(() => Math.random() - 0.5);

        qList.push({
          id: idx + 1,
          type: "read",
          typeLabel: "Phần 4: Đọc hiểu từ vựng",
          prompt: item.hanzi,
          subPrompt: `(${item.pinyin}) có nghĩa tiếng Việt là gì?`,
          correctAnswer: item.meanings[0]?.meaningVi || "",
          options,
        });
      }
    });

    setQuestions(qList.slice(0, 15));
    setUserAnswers({});
    setTimeLeft(15 * 60);
    setIsSubmitted(false);
    setIsStarted(true);
    setCurrentIdx(0);
  };

  // Timer countdown
  useEffect(() => {
    if (!isStarted || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isSubmitted]);

  const handleSelectOption = (qId: number, option: string) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);

    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    if (percent >= 60) {
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 1. Initial State: Exam Briefing
  if (!isStarted) {
    return (
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[18px] border border-line bg-surface">
        <div aria-hidden="true" className="absolute inset-0 lanes opacity-60" />
        <div className="relative grid gap-8 p-8 sm:grid-cols-[1fr_auto] sm:items-center sm:p-10">
          <div className="space-y-3">
            <h2 className="headline text-4xl text-slate-900">Vào vạch xuất phát</h2>
            <p className="text-slate-600 leading-relaxed">
              15 câu trắc nghiệm được trộn ngẫu nhiên từ kho từ vựng {levelName}. Đồng hồ chạy ngay khi bạn bấm bắt
              đầu và tự nộp bài khi hết giờ.
            </p>
            <dl className="flex gap-6 pt-2 text-sm">
              <div>
                <dt className="text-slate-400">Số câu</dt>
                <dd className="num text-2xl font-bold text-slate-900">15</dd>
              </div>
              <div>
                <dt className="text-slate-400">Điểm đỗ</dt>
                <dd className="num text-2xl font-bold text-emerald-600">60%</dd>
              </div>
            </dl>
          </div>
          <div className="text-center">
            <div className="num text-7xl font-bold leading-none text-slate-900">15:00</div>
            <div className="mt-1 text-sm text-slate-400">phút làm bài</div>
          </div>
        </div>
        <div className="relative border-t border-line p-6 sm:px-10">
          <button onClick={startExam} className="btn-blaze w-full text-xl">
            Bắt đầu tính giờ
          </button>
        </div>
      </div>
    );
  }

  // 2. Exam Result Report
  if (isSubmitted) {
    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) correctCount += 1;
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    const isPassed = percent >= 60;

    return (
      <div className="space-y-8">
        {/* Summary Card */}
        <div className={`banner ${isPassed ? "banner-go" : "banner-foul"} mx-auto max-w-2xl p-8 sm:p-10`}>
          <div className="relative grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="space-y-2">
              <p className={`font-display text-xl font-bold italic ${isPassed ? "text-emerald-600" : "text-rose-600"}`}>
                {isPassed ? "Về đích: đạt chuẩn" : "Chưa qua vạch đích"}
              </p>
              <h2 className="headline text-5xl text-slate-900">
                {correctCount}/{questions.length} câu đúng
              </h2>
              <p className="text-slate-500">
                {isPassed
                  ? "Bạn đã vượt mức 60% của đề thi. Thử thêm một đề mới để giữ phong độ."
                  : "Cần đạt từ 60% để đỗ. Xem lại các câu sai bên dưới rồi làm một đề mới."}
              </p>
            </div>
            <div className="text-right">
              <div className={`num text-8xl font-bold leading-none ${isPassed ? "text-emerald-600" : "text-rose-600"}`}>
                {percent}
              </div>
              <div className="text-sm text-slate-400">điểm / 100</div>
            </div>
          </div>
          <button onClick={startExam} className="btn-blaze relative mt-6">
            <RotateCcw className="w-4 h-4" />
            <span>Làm đề mới</span>
          </button>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-display text-2xl font-bold italic text-slate-900">Chi tiết bài làm</h3>

          <div className="space-y-3">
            {questions.map((q, idx) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border text-sm space-y-2 ${
                    isCorrect
                      ? "bg-emerald-50/50 border-emerald-200"
                      : "bg-rose-50/50 border-rose-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">
                      Câu {idx + 1}: {q.typeLabel}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isCorrect
                          ? "bg-emerald-200 text-emerald-800"
                          : "bg-rose-200 text-rose-800"
                      }`}
                    >
                      {isCorrect ? "Đúng" : "Sai"}
                    </span>
                  </div>

                  <div className="font-black text-lg text-slate-900 hanzi-font">
                    {q.prompt}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div>
                      <span className="text-slate-500">Bạn chọn: </span>
                      <span
                        className={`font-bold ${
                          isCorrect ? "text-emerald-700" : "text-rose-700"
                        }`}
                      >
                        {userAns || "(Bỏ trống)"}
                      </span>
                    </div>

                    {!isCorrect && (
                      <div>
                        <span className="text-slate-500">Đáp án chuẩn: </span>
                        <span className="font-bold text-emerald-700">
                          {q.correctAnswer}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. Active Exam Session
  const currentQ = questions[currentIdx];
  if (!currentQ) return null;

  return (
    <div className="space-y-6">
      {/* Top Floating Timer & Progress */}
      <div className="sticky top-[72px] z-20 rounded-card border border-line bg-surface/95 backdrop-blur p-4 shadow-xl shadow-black/30">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock className={`w-5 h-5 ${timeLeft <= 60 ? "text-rose-500 animate-pulse" : "text-blue-600"}`} />
            <span className={`num text-4xl font-bold leading-none ${timeLeft <= 60 ? "text-rose-600" : "text-slate-900"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="text-sm text-slate-500">
            Đã làm <span className="num text-xl font-bold text-slate-900">{Object.keys(userAnswers).length}</span>/{questions.length}
          </div>

          <button
            onClick={handleSubmitExam}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-onaccent transition-all hover:bg-blue-400 active:scale-95"
          >
            Nộp bài
          </button>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full transition-[width] duration-1000 ease-linear ${timeLeft <= 60 ? "bg-rose-500" : "bg-blue-500"}`}
            style={{ width: `${(timeLeft / (15 * 60)) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Palette Navigation Strip */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm flex flex-wrap gap-1.5">
        {questions.map((q, i) => {
          const isAnswered = userAnswers[q.id] !== undefined;
          const isCurrent = i === currentIdx;

          return (
            <button
              key={q.id}
              onClick={() => setCurrentIdx(i)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                isCurrent
                  ? "bg-blue-500 text-onaccent ring-2 ring-blue-300"
                  : isAnswered
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Active Question Card */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-sm space-y-6 text-center">
        <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-3">
          <span className="font-bold text-blue-600">
            {currentQ.typeLabel}
          </span>
          <span>
            Câu {currentIdx + 1} / {questions.length}
          </span>
        </div>

        <div className="space-y-3 py-2">
          {currentQ.subPrompt && (
            <div className="text-xs text-slate-500 font-medium">
              {currentQ.subPrompt}
            </div>
          )}

          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-black text-slate-900 hanzi-font">
              {currentQ.prompt}
            </span>
            {currentQ.audioText && (
              <AudioButton text={currentQ.audioText} size="sm" />
            )}
          </div>
        </div>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
          {currentQ.options.map((opt, i) => {
            const isSelected = userAnswers[currentQ.id] === opt;

            return (
              <button
                key={i}
                onClick={() => handleSelectOption(currentQ.id, opt)}
                className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all shadow-sm active:scale-95 flex items-center justify-between ${
                  isSelected
                    ? "bg-violet-50 border-violet-600 text-violet-900 ring-2 ring-violet-200"
                    : "bg-slate-50 border-slate-200 hover:border-violet-300 text-slate-800"
                }`}
              >
                <span>{opt}</span>
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 text-xs font-bold flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Câu trước</span>
          </button>

          <button
            disabled={currentIdx + 1 === questions.length}
            onClick={() =>
              setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))
            }
            className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-onaccent disabled:opacity-40 text-xs font-bold flex items-center gap-1"
          >
            <span>Câu tiếp theo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
