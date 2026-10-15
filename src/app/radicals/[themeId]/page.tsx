import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ChevronLeft, Layers, PenTool, Sparkles, CheckCircle2 } from "lucide-react";
import { AudioButton } from "@/components/audio/AudioButton";
import { RadicalQuizInline } from "./RadicalQuizInline";

export const revalidate = 0;

export default async function RadicalThemeDetailPage({
  params,
}: {
  params: { themeId: string };
}) {
  const theme = await prisma.radicalTheme.findUnique({
    where: { id: params.themeId },
    include: {
      radicals: { orderBy: { number: "asc" } },
    },
  });

  if (!theme) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/radicals"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Quay lại danh sách chủ đề</span>
        </Link>
      </div>

      {/* Header Banner */}
      <header className="banner banner-gold p-7 sm:p-9">
        <div className="relative space-y-2">
          <p className="text-sm font-semibold text-amber-600">Chủ đề bộ thủ</p>
          <h1 className="headline text-5xl text-slate-900 sm:text-6xl">{theme.name}</h1>
          <p className="max-w-2xl text-slate-600">{theme.description}</p>
          <p className="pt-1 text-sm text-slate-500">
            <span className="num text-xl font-bold text-slate-900">{theme.radicals.length}</span> bộ thủ, xếp theo số thứ tự Khang Hy
          </p>
        </div>
      </header>

      {/* Interactive Quick Quiz Component */}
      <RadicalQuizInline radicals={theme.radicals} themeName={theme.name} />

      {/* Radicals Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Danh sách bộ thủ trong nhóm &quot;{theme.name}&quot;
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {theme.radicals.map((rad) => (
            <div
              key={rad.id}
              className="bg-white rounded-card border border-line p-5 hover:border-amber-500/50 hover:-translate-y-0.5 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-900 flex items-center justify-center text-4xl font-black hanzi-font group-hover:scale-105 transition-transform">
                    {rad.hanzi}
                    <span className="num absolute -top-2 -left-2 rounded-md bg-surface border border-line px-1.5 text-xs font-bold text-slate-500">
                      {rad.number}
                    </span>
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-900">
                      {rad.meaning}
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-2 text-xs text-slate-400 mt-0.5">
                      {rad.pinyin && <span className="font-semibold text-blue-600">{rad.pinyin}</span>}
                      <span>{rad.strokeCount} nét</span>
                      {rad.variant && (
                        <span>
                          Biến thể <span className="hanzi-font text-sm font-bold text-slate-700">{rad.variant}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {rad.pinyin && <AudioButton text={rad.hanzi} size="sm" />}
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <Link
                  href={`/write/${encodeURIComponent(rad.hanzi)}`}
                  className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Tập viết nét</span>
                </Link>

                <Link
                  href={`/translate?q=${encodeURIComponent(rad.hanzi)}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Tra từ điển
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
