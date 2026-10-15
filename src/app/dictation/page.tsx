import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Headphones, Play, CheckCircle2, Clock, Sparkles, PlusCircle } from "lucide-react";
import { DictationFilter } from "./DictationFilter";

export const revalidate = 0;

export default async function DictationListPage() {
  const user = await getCurrentUser();
  const userId = user?.id || "";

  const videos = await prisma.dictationVideo.findMany();

  // Get user progress for dictation
  const progressList = userId
    ? await prisma.userProgress.findMany({
        where: {
          userId,
          itemType: "dictation",
        },
      })
    : [];

  const progressMap = new Map<string, { status: string; score: number }>();
  progressList.forEach((p) => {
    progressMap.set(p.itemId, { status: p.status, score: p.score });
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <h1 className="headline text-5xl text-slate-900 sm:text-6xl">
          Chép chính tả qua video
        </h1>
        <p className="text-lg text-slate-500">
          Nghe người bản xứ nói theo ngữ cảnh tự nhiên, tua từng câu và gõ lại để rèn luyện phản xạ nghe - viết tiếng Trung chuẩn xác.
        </p>
      </div>

      {/* Interactive Filter & Video Cards Grid */}
      <DictationFilter
        videos={videos.map((v) => {
          const prog = progressMap.get(v.id);
          let sentenceCount = 0;
          try {
            sentenceCount = JSON.parse(v.transcript).length;
          } catch (e) {}

          return {
            ...v,
            isDone: prog?.status === "done",
            score: prog?.score || 0,
            sentenceCount,
          };
        })}
      />
    </div>
  );
}
