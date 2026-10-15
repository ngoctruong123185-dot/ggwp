import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ArrowRight, Check, ChevronLeft, Flag, Lock } from "lucide-react";

export const revalidate = 0;

export default async function LevelDetailPage({
  params,
}: {
  params: { levelId: string };
}) {
  const level = await prisma.level.findUnique({
    where: { id: params.levelId },
    include: {
      lessons: {
        orderBy: { order: "asc" },
        include: {
          vocabItems: { select: { id: true, hanzi: true }, orderBy: { order: "asc" } },
          grammars: { select: { id: true } },
        },
      },
    },
  });

  if (!level) {
    notFound();
  }

  const user = await getCurrentUser();
  const userId = user?.id || "";

  const lessonIds = level.lessons.map((l) => l.id);
  const vocabIds = level.lessons.flatMap((l) => l.vocabItems.map((v) => v.id));

  const [lessonProgress, vocabProgress] = userId
    ? await Promise.all([
        prisma.userProgress.findMany({ where: { userId, itemType: "lesson", itemId: { in: lessonIds } } }),
        prisma.userProgress.findMany({ where: { userId, itemType: "vocab", status: "done", itemId: { in: vocabIds } } }),
      ])
    : [[], []];

  const progressMap = new Map<string, { status: string; score: number }>();
  lessonProgress.forEach((p) => progressMap.set(p.itemId, { status: p.status, score: p.score }));
  const doneVocab = new Set(vocabProgress.map((p) => p.itemId));

  const totalVocab = vocabIds.length;
  const totalGrammar = level.lessons.reduce((n, l) => n + l.grammars.length, 0);
  const levelPct = totalVocab ? Math.round((doneVocab.size / totalVocab) * 100) : 0;
  const nextLesson = level.lessons.find((l) => progressMap.get(l.id)?.status !== "done");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/hsk"
        className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Tất cả cấp độ</span>
      </Link>

      {/* Level header */}
      <header className="banner p-7 sm:p-9">
        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-3">
            <h1 className="headline text-6xl text-slate-900 sm:text-7xl">{level.name}</h1>
            <p className="max-w-xl text-slate-600">{level.description}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 pt-1 text-sm text-slate-500">
              <span>
                <span className="num text-xl font-bold text-slate-900">{level.lessons.length}</span> bài học
              </span>
              <span>
                <span className="num text-xl font-bold text-slate-900">{totalVocab}</span> từ vựng
              </span>
              <span>
                <span className="num text-xl font-bold text-slate-900">{totalGrammar}</span> điểm ngữ pháp
              </span>
            </div>
          </div>

          {level.lessons.length > 0 && (
            <div className="min-w-[240px] space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-slate-500">Đã thuộc</span>
                <span className="num text-3xl font-bold text-blue-600">{levelPct}%</span>
              </div>
              <div className="track">
                <div className="track-fill" style={{ width: `${Math.max(levelPct, 2)}%` }} />
              </div>
              {nextLesson && (
                <Link href={`/vocabulary/${nextLesson.id}`} className="btn-blaze w-full">
                  <span>{progressMap.size > 0 ? `Tập tiếp bài ${nextLesson.order}` : "Bắt đầu bài 1"}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </header>

      {level.lessons.length === 0 ? (
        <div className="flex items-center gap-4 rounded-[18px] border border-dashed border-line bg-surface p-8 text-slate-500">
          <Lock className="h-6 w-6 shrink-0" />
          <div>
            <p className="font-semibold text-slate-800">{level.name} chưa có bài học nào.</p>
            <p className="text-sm">
              Trong lúc chờ, bạn có thể ôn lại{" "}
              <Link href="/hsk/hsk1" className="font-semibold text-blue-600 hover:underline">
                HSK 1
              </Link>{" "}
              hoặc{" "}
              <Link href="/hsk/hsk2" className="font-semibold text-blue-600 hover:underline">
                HSK 2
              </Link>
              .
            </p>
          </div>
        </div>
      ) : (
        <section className="space-y-3">
          <div className="flex items-end justify-between gap-4">
            <h2 className="headline text-3xl text-slate-900">Giáo án</h2>
            <span className="text-sm text-slate-500">Cứ ba bài có một buổi ôn tập tổng hợp</span>
          </div>

          <ol className="space-y-2.5">
            {level.lessons.map((lesson, idx) => {
              const progress = progressMap.get(lesson.id);
              const isDone = progress?.status === "done";
              const percent = isDone ? 100 : progress?.score || 0;
              const learnedHere = lesson.vocabItems.filter((v) => doneVocab.has(v.id)).length;
              const isCheckpoint = (idx + 1) % 3 === 0;
              const isNext = nextLesson?.id === lesson.id;

              return (
                <React.Fragment key={lesson.id}>
                  <li>
                    <Link
                      href={`/vocabulary/${lesson.id}`}
                      className={`group grid grid-cols-[3rem_1fr] items-center gap-4 rounded-card border bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/50 hover:bg-raised sm:grid-cols-[3.5rem_1fr_11rem_auto] sm:p-5 ${
                        isNext ? "border-blue-500/60 shadow-[inset_4px_0_0_rgb(var(--c-blue-500))]" : "border-line"
                      }`}
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                          isDone ? "bg-emerald-500 text-onaccent" : isNext ? "bg-blue-500 text-onaccent" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {isDone ? <Check className="h-6 w-6" strokeWidth={3} /> : <span className="num text-2xl font-bold">{lesson.order}</span>}
                      </span>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <h3 className="hanzi-font text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {lesson.title}
                          </h3>
                          <span className="text-sm text-slate-500">{lesson.titleVi}</span>
                        </div>
                        <p className="mt-1 truncate text-sm text-slate-400">
                          <span className="hanzi-font text-slate-500">
                            {lesson.vocabItems.slice(0, 6).map((v) => v.hanzi).join("、")}
                          </span>
                          {lesson.vocabItems.length > 6 ? "…" : ""}
                        </p>
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>
                            {learnedHere}/{lesson.vocabItems.length} từ, {lesson.grammars.length} ngữ pháp
                          </span>
                          <span className="num text-sm font-semibold text-slate-700">{percent}%</span>
                        </div>
                        <div className="track mt-1.5 h-1.5">
                          <div
                            className={`h-full rounded-full ${isDone ? "bg-emerald-500" : "bg-blue-500"}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      <ArrowRight className="hidden h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-600 sm:block" />
                    </Link>
                  </li>

                  {isCheckpoint && (
                    <li className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-amber-500/30 bg-amber-500/[0.07] px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Flag className="h-5 w-5 text-amber-500" />
                        <div>
                          <div className="font-display text-lg font-bold italic text-slate-900">
                            Chặng ôn tập: bài {idx - 1}–{idx + 1}
                          </div>
                          <div className="text-sm text-slate-500">Trộn câu hỏi của cả ba bài vừa học</div>
                        </div>
                      </div>
                      <Link
                        href={`/vocabulary/${lesson.id}/comprehensive`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-bold text-onaccent hover:bg-amber-400 transition-colors"
                      >
                        <span>Vào ôn tập</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ol>
        </section>
      )}
    </div>
  );
}
