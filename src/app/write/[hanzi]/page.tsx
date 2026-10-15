import React from "react";
import Link from "next/link";
import { HanziWriterCanvas } from "@/components/writing/HanziWriterCanvas";
import { prisma } from "@/lib/prisma";
import { PenTool, ChevronLeft, Search, Layers, Sparkles } from "lucide-react";
import { WriteSearchBox } from "./WriteSearchBox";

export const revalidate = 0;

export default async function WriteCharacterPage({
  params,
}: {
  params: { hanzi: string };
}) {
  const decodedHanzi = decodeURIComponent(params.hanzi);

  // Look up character details in database
  const vocab = await prisma.vocabItem.findFirst({
    where: { hanzi: { contains: decodedHanzi } },
    include: { meanings: true },
  });

  const charDetail = await prisma.characterDetail.findFirst({
    where: { hanzi: decodedHanzi },
  });

  // Popular characters list for quick navigation
  const sampleChars = ["你", "好", "您", "谢", "是", "人", "水", "买", "想", "热", "冷", "家"];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Navigation & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/hsk"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors self-start sm:self-auto"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Quay lại bài học</span>
        </Link>

        <WriteSearchBox currentHanzi={decodedHanzi} />
      </div>

      {/* Main Header */}
      <div className="space-y-2">
        <h1 className="headline text-5xl text-slate-900 sm:text-6xl">
          Luyện viết <span className="hanzi-font not-italic">{decodedHanzi}</span>
        </h1>
        <p className="text-lg text-slate-500">
          Vẽ từng nét bằng chuột hoặc cảm ứng. Sai thứ tự nét, khung sẽ gợi ý lại nét đúng.
        </p>
      </div>

      {/* Interactive HanziWriter Canvas */}
      <HanziWriterCanvas
        hanzi={decodedHanzi}
        pinyin={vocab?.pinyin}
        meaning={vocab?.meanings[0]?.meaningVi}
        size={300}
      />

      {/* Quick Switch Characters */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 text-center">
        <span className="text-xs font-bold text-slate-500 block">
          Các chữ Hán phổ biến khác:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {sampleChars.map((char) => (
            <Link
              key={char}
              href={`/write/${encodeURIComponent(char)}`}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl font-bold hanzi-font transition-all border ${
                char === decodedHanzi
                  ? "bg-blue-600 text-onaccent border-blue-600 shadow-md scale-110"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:border-blue-300"
              }`}
            >
              {char}
            </Link>
          ))}
        </div>

        {charDetail && (
          <div className="pt-3 border-t border-slate-100 flex justify-center">
            <Link
              href={`/character/${encodeURIComponent(decodedHanzi)}`}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Xem phân tích bộ thủ & từ ghép của chữ {decodedHanzi} →</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
