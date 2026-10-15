import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import { DictationPlayer } from "./DictationPlayer";

export const revalidate = 0;

export default async function DictationDetailPage({
  params,
}: {
  params: { videoId: string };
}) {
  const video = await prisma.dictationVideo.findUnique({
    where: { id: params.videoId },
  });

  if (!video) {
    notFound();
  }

  let transcriptItems: any[] = [];
  try {
    transcriptItems = JSON.parse(video.transcript);
  } catch (e) {
    transcriptItems = [];
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/dictation"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-rose-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Quay lại danh sách video</span>
        </Link>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
            {video.level}
          </span>
          <span className="text-xs text-slate-500">{video.channelName}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {video.title}
        </h1>
      </div>

      {/* Interactive Dictation Player */}
      <DictationPlayer video={video} transcript={transcriptItems} />
    </div>
  );
}
