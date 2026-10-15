import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AudioButton } from "@/components/audio/AudioButton";
import { PenTool, ChevronLeft, Layers, BookOpen, Sparkles } from "lucide-react";

export const revalidate = 0;

export default async function CharacterDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const decodedId = decodeURIComponent(params.id);

  // Find character or vocab
  const vocab = await prisma.vocabItem.findFirst({
    where: { hanzi: decodedId },
    include: { meanings: true },
  });

  const detail = await prisma.characterDetail.findFirst({
    where: { hanzi: decodedId },
  });

  if (!vocab && !detail) {
    notFound();
  }

  let radicalIds: string[] = [];
  try {
    if (detail?.radicalIds) radicalIds = JSON.parse(detail.radicalIds);
  } catch (e) {}

  let compounds: { hanzi: string; pinyin: string; meaning: string }[] = [];
  try {
    if (detail?.compounds) compounds = JSON.parse(detail.compounds);
  } catch (e) {}

  // Fetch radicals info
  const radicals = await prisma.radical.findMany({
    where: { id: { in: radicalIds } },
    include: { theme: true },
  });

  const hanzi = decodedId;
  const pinyin = vocab?.pinyin || "zh";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href={vocab ? `/vocabulary/${vocab.lessonId}` : "/translate"}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{vocab ? "Quay lại bài học" : "Quay lại từ điển"}</span>
        </Link>
      </div>

      {/* Main Character Header Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-3xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-7xl font-black text-slate-900 hanzi-font shadow-inner">
            {hanzi}
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-2xl font-black text-blue-600">{pinyin}</span>
              <AudioButton text={hanzi} size="sm" />
            </div>

            {vocab && (
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1">
                {vocab.meanings.map((m: any, i: number) => (
                  <span
                    key={i}
                    className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                  >
                    {m.wordClass}: {m.meaningVi}
                  </span>
                ))}
              </div>
            )}

            <div className="text-xs text-slate-400 pt-1">
              Số nét:{" "}
              <span className="font-bold text-slate-700">
                {detail?.strokeCount || "?"} nét
              </span>
            </div>
          </div>
        </div>

        {/* CTA Luyện viết */}
        <Link
          href={`/write/${encodeURIComponent(hanzi)}`}
          className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-onaccent font-bold text-sm shadow-md flex items-center gap-2 transition-all group shrink-0"
        >
          <PenTool className="w-4 h-4" />
          <span>Luyện viết nét</span>
        </Link>
      </div>

      {/* Component Radicals Breakdown */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
          <Layers className="w-5 h-5 text-amber-500" />
          <h2>Bộ thủ cấu thành ({radicals.length})</h2>
        </div>

        {radicals.length === 0 ? (
          <p className="text-xs text-slate-500">
            Chưa có liên kết bộ thủ chi tiết cho chữ này.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {radicals.map((rad) => (
              <Link
                key={rad.id}
                href={`/radicals/${rad.themeId}`}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-slate-800 hanzi-font group-hover:text-blue-600">
                    {rad.hanzi}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {rad.meaning}
                      {rad.variant && <span className="ml-1.5 hanzi-font text-slate-500">({rad.variant})</span>}
                    </div>
                    <div className="text-[11px] text-slate-500">{rad.theme.name}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                  Xem →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Compound Words */}
      {compounds.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <h2>Từ ghép thường gặp chứa &quot;{hanzi}&quot;</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {compounds.map((comp, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <div className="text-xl font-bold text-slate-900 hanzi-font">
                    {comp.hanzi}
                  </div>
                  <div className="text-xs font-semibold text-blue-600">{comp.pinyin}</div>
                  <div className="text-xs text-slate-500 italic mt-0.5">
                    {comp.meaning}
                  </div>
                </div>
                <AudioButton text={comp.hanzi} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
