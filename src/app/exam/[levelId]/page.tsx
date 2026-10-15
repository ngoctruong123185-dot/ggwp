import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ChevronLeft, Award, Clock, Sparkles } from "lucide-react";
import { ExamSimulator } from "./ExamSimulator";

export const revalidate = 0;

export default async function ExamPage({
  params,
}: {
  params: { levelId: string };
}) {
  const level = await prisma.level.findUnique({
    where: { id: params.levelId },
    include: {
      lessons: {
        include: {
          vocabItems: {
            include: {
              meanings: true,
            },
          },
        },
      },
    },
  });

  if (!level) {
    notFound();
  }

  // Flatten all vocab items in this level
  const allVocab = level.lessons.flatMap((lsn) => lsn.vocabItems);

  // Available levels for tab switching
  const allLevels = await prisma.level.findMany({
    orderBy: { order: "asc" },
    include: { lessons: { select: { id: true } } },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="headline text-5xl text-slate-900 sm:text-6xl">Thi thử {level.name}</h1>
          <p className="mt-2 text-slate-500">15 câu tổng hợp nghe, nghĩa và điền từ trong 15 phút.</p>
        </div>

        {/* Level Switcher */}
        <nav className="flex flex-wrap items-center gap-1.5" aria-label="Chọn cấp độ thi">
          {allLevels.map((lvl) => {
            const active = lvl.id === level.id;
            const ready = lvl.lessons.length > 0;
            if (!ready) {
              return (
                <span key={lvl.id} className="rounded-md px-3 py-1.5 font-display text-base font-semibold text-slate-300" title="Chưa có nội dung">
                  {lvl.name}
                </span>
              );
            }
            return (
              <Link
                key={lvl.id}
                href={`/exam/${lvl.id}`}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-1.5 font-display text-base font-semibold transition-colors ${
                  active ? "bg-blue-500 text-onaccent" : "border border-line bg-surface text-slate-600 hover:text-slate-900"
                }`}
              >
                {lvl.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {allVocab.length < 4 ? (
        <div className="rounded-[18px] border border-dashed border-line bg-surface p-8 text-slate-500">
          {level.name} chưa có đủ từ vựng để tạo đề thi. Hãy thử{" "}
          <Link href="/exam/hsk1" className="font-semibold text-blue-600 hover:underline">HSK 1</Link> hoặc{" "}
          <Link href="/exam/hsk2" className="font-semibold text-blue-600 hover:underline">HSK 2</Link>.
        </div>
      ) : (
        <ExamSimulator levelName={level.name} vocabItems={allVocab} />
      )}
    </div>
  );
}
