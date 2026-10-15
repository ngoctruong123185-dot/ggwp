"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  PenTool,
  FileText,
  ChevronLeft,
  Sparkles,
  Layers,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Clock,
  CircleDot,
  HelpCircle,
} from "lucide-react";
import { AudioButton } from "@/components/audio/AudioButton";
import { PlayAllVocabBar } from "@/components/audio/PlayAllVocabBar";

// Exercise components
import { FlashcardExercise } from "@/components/exercises/FlashcardExercise";
import { TrueFalseImageExercise } from "@/components/exercises/TrueFalseImageExercise";
import { FillBlankExercise } from "@/components/exercises/FillBlankExercise";
import { SentenceOrderExercise } from "@/components/exercises/SentenceOrderExercise";
import { ListenPickImageExercise } from "@/components/exercises/ListenPickImageExercise";
import { MatchPairsExercise } from "@/components/exercises/MatchPairsExercise";
import { SpeedRecallExercise } from "@/components/exercises/SpeedRecallExercise";
import { PickRadicalExercise } from "@/components/exercises/PickRadicalExercise";
import { StrokeOrderExercise } from "@/components/exercises/StrokeOrderExercise";
import { ComprehensiveQuiz } from "@/components/exercises/ComprehensiveQuiz";

interface VocabularyViewProps {
  lesson: any;
  vocabDoneCount: number;
  vocabInProgressCount: number;
  vocabNotStartedCount: number;
  initialTab?: string;
  initialExercise?: string;
}

export function VocabularyView({
  lesson,
  vocabDoneCount,
  vocabInProgressCount,
  vocabNotStartedCount,
  initialTab = "vocab",
  initialExercise,
}: VocabularyViewProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [activeExercise, setActiveExercise] = useState<string | null>(
    initialExercise || null
  );

  const totalVocab = lesson.vocabItems.length;
  const donePercent = totalVocab > 0 ? Math.round((vocabDoneCount / totalVocab) * 100) : 0;
  const inProgressPercent =
    totalVocab > 0 ? Math.round((vocabInProgressCount / totalVocab) * 100) : 0;
  const notStartedPercent =
    totalVocab > 0 ? Math.round((vocabNotStartedCount / totalVocab) * 100) : 0;

  const exerciseTypes = [
    {
      id: "flashcard",
      name: "Flashcard từ vựng",
      desc: "Lật thẻ ghi nhớ theo phương pháp Spaced Repetition",
      color: "bg-blue-500",
    },
    {
      id: "fill-blank",
      name: "Điền từ vào câu",
      desc: "Chọn từ vựng đúng để hoàn thiện câu hoàn chỉnh",
      color: "bg-indigo-500",
    },
    {
      id: "tf-image",
      name: "Quiz Đúng / Sai (ảnh)",
      desc: "Kiểm tra sự tương quan giữa chữ Hán và hình ảnh",
      color: "bg-emerald-500",
    },
    {
      id: "listen-image",
      name: "Nghe chọn ảnh",
      desc: "Luyện phản xạ nghe phát âm chuẩn và nhận diện hình",
      color: "bg-purple-500",
    },
    {
      id: "sentence-order",
      name: "Sắp xếp câu",
      desc: "Xếp các khối từ thành câu ngữ pháp tiếng Trung chuẩn",
      color: "bg-amber-500",
    },
    {
      id: "match",
      name: "Ghép từ & nghĩa",
      desc: "Nối cặp chữ Hán và nghĩa tiếng Việt tương ứng",
      color: "bg-rose-500",
    },
    {
      id: "speed-recall",
      name: "Nhớ nhanh từ",
      desc: "Ghi nhớ chữ Hán chớp nhoáng và nhận diện nghĩa",
      color: "bg-teal-500",
    },
    {
      id: "radical",
      name: "Chọn bộ thủ",
      desc: "Phân tích và nhận diện bộ thủ cấu thành chữ Hán",
      color: "bg-orange-500",
    },
    {
      id: "stroke-order",
      name: "Luyện thứ tự nét",
      desc: "Vẽ và kiểm tra từng nét theo quy chuẩn thư pháp",
      color: "bg-cyan-600",
    },
    {
      id: "comprehensive",
      name: "Kiểm tra tổng hợp",
      desc: "Trộn tổng hợp các dạng bài để đánh giá mức độ ghi nhớ",
      color: "bg-violet-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href={`/hsk/${lesson.levelId}`} className="hover:text-blue-600">
            {lesson.level.name}
          </Link>
          <span>/</span>
          <span>Bài {lesson.order}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 hanzi-font">
              {lesson.title}{" "}
              <span className="text-xl font-bold text-slate-600 font-sans">
                ({lesson.titleVi})
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Bao gồm {lesson.vocabItems.length} từ vựng cốt lõi & {lesson.grammars.length} điểm ngữ pháp
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/write/${lesson.vocabItems[0]?.hanzi || "你"}`}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <PenTool className="w-4 h-4 text-emerald-600" />
              <span>Tập viết chữ</span>
            </Link>

            <button
              onClick={() => {
                setActiveTab("practice");
                setActiveExercise("comprehensive");
              }}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-onaccent text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Luyện thi tổng hợp</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Status Progress Strip (Đã làm / Đang làm / Chưa làm) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-700">Tiến độ ghi nhớ từ vựng</span>
          <span className="text-blue-600">{donePercent}% hoàn thành</span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full transition-all"
            style={{ width: `${donePercent}%` }}
            title={`Đã làm: ${donePercent}%`}
          />
          <div
            className="bg-amber-400 h-full transition-all"
            style={{ width: `${inProgressPercent}%` }}
            title={`Đang làm: ${inProgressPercent}%`}
          />
          <div
            className="bg-slate-200 h-full transition-all"
            style={{ width: `${notStartedPercent}%` }}
            title={`Chưa làm: ${notStartedPercent}%`}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Đã làm ({vocabDoneCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Đang làm ({vocabInProgressCount})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            <span>Chưa làm ({vocabNotStartedCount})</span>
          </div>
        </div>
      </div>

      {/* Sequential Play All Audio Player */}
      <PlayAllVocabBar items={lesson.vocabItems} />

      {/* Tabs Switcher */}
      <div className="flex items-center border-b border-slate-200 gap-6">
        <button
          onClick={() => {
            setActiveTab("vocab");
            setActiveExercise(null);
          }}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "vocab" && !activeExercise
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Danh sách từ vựng ({lesson.vocabItems.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("practice");
          }}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "practice" || activeExercise
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Luyện tập ({exerciseTypes.length} dạng)</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("grammar");
            setActiveExercise(null);
          }}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "grammar"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Ngữ pháp ({lesson.grammars.length})</span>
        </button>
      </div>

      {/* Tab 1: Vocab Cards List */}
      {activeTab === "vocab" && !activeExercise && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.vocabItems.map((vocab: any) => (
            <div
              key={vocab.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-black text-slate-900 hanzi-font group-hover:text-blue-600 transition-colors">
                    {vocab.hanzi}
                  </div>
                  <div>
                    <div className="text-base font-bold text-blue-600">
                      {vocab.pinyin}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-0.5">
                      {vocab.meanings.map((m: any, idx: number) => (
                        <span
                          key={idx}
                          className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                        >
                          {m.wordClass}: {m.meaningVi}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <AudioButton text={vocab.hanzi} size="sm" />
                </div>
              </div>

              {/* Example sentence */}
              {vocab.exampleSentence && (
                <div className="bg-slate-50 rounded-xl p-2.5 text-xs border border-slate-100 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 hanzi-font">
                      {vocab.exampleSentence}
                    </span>
                    <AudioButton text={vocab.exampleSentence} size="sm" />
                  </div>
                  <div className="text-slate-500 italic">{vocab.exampleSentenceVi}</div>
                </div>
              )}

              {/* Card Footer Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <Link
                  href={`/character/${vocab.hanzi}`}
                  className="text-slate-500 hover:text-blue-600 font-medium"
                >
                  Xem chi tiết chữ
                </Link>

                <Link
                  href={`/write/${vocab.hanzi}`}
                  className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Tập viết nét</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Practice Exercise Launcher or Active Exercise Runner */}
      {(activeTab === "practice" || activeExercise) && (
        <div className="space-y-6">
          {/* If an exercise is active, show back button */}
          {activeExercise && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveExercise(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Quay lại danh sách bài tập</span>
              </button>
            </div>
          )}

          {/* Exercise Runner Component */}
          {activeExercise === "flashcard" && (
            <FlashcardExercise vocabItems={lesson.vocabItems} lessonId={lesson.id} />
          )}
          {activeExercise === "tf-image" && (
            <TrueFalseImageExercise vocabItems={lesson.vocabItems} lessonId={lesson.id} />
          )}
          {activeExercise === "fill-blank" && (
            <FillBlankExercise vocabItems={lesson.vocabItems} lessonId={lesson.id} />
          )}
          {activeExercise === "sentence-order" && (
            <SentenceOrderExercise vocabItems={lesson.vocabItems} lessonId={lesson.id} />
          )}
          {activeExercise === "listen-image" && (
            <ListenPickImageExercise vocabItems={lesson.vocabItems} lessonId={lesson.id} />
          )}
          {activeExercise === "match" && (
            <MatchPairsExercise vocabItems={lesson.vocabItems} lessonId={lesson.id} />
          )}
          {activeExercise === "speed-recall" && (
            <SpeedRecallExercise vocabItems={lesson.vocabItems} lessonId={lesson.id} />
          )}
          {activeExercise === "radical" && (
            <PickRadicalExercise lessonId={lesson.id} />
          )}
          {activeExercise === "stroke-order" && (
            <StrokeOrderExercise vocabItems={lesson.vocabItems} lessonId={lesson.id} />
          )}
          {activeExercise === "comprehensive" && (
            <ComprehensiveQuiz vocabItems={lesson.vocabItems} lessonId={lesson.id} />
          )}

          {/* If no exercise is currently active, show the 10 Exercise cards grid */}
          {!activeExercise && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {exerciseTypes.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => setActiveExercise(ex.id)}
                  className="bg-white rounded-2xl border border-slate-200 p-5 text-left shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group active:scale-[0.98]"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-xl ${ex.color} text-onaccent flex items-center justify-center font-bold shadow-sm`}
                      >
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                      {ex.name}
                    </div>
                    <div className="text-xs text-slate-500 leading-relaxed">
                      {ex.desc}
                    </div>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span>Bắt đầu luyện tập</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Grammar Points */}
      {activeTab === "grammar" && !activeExercise && (
        <div className="space-y-6">
          {lesson.grammars.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-200">
              Bài học này chưa có điểm ngữ pháp chuyên sâu.
            </div>
          ) : (
            lesson.grammars.map((g: any) => {
              let examples: any[] = [];
              try {
                examples = JSON.parse(g.examples);
              } catch (e) {}

              return (
                <div
                  key={g.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{g.title}</h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {g.explanation}
                  </p>

                  {/* Examples */}
                  {examples.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-slate-500 block">
                        Ví dụ mẫu:
                      </span>
                      <div className="space-y-2">
                        {examples.map((ex: any, i: number) => (
                          <div
                            key={i}
                            className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between"
                          >
                            <div>
                              <div className="text-base font-bold text-slate-800 hanzi-font">
                                {ex.zh}
                              </div>
                              <div className="text-xs font-semibold text-blue-600">
                                {ex.pinyin}
                              </div>
                              <div className="text-xs text-slate-500 italic mt-0.5">
                                {ex.vi}
                              </div>
                            </div>

                            <AudioButton text={ex.zh} size="sm" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
