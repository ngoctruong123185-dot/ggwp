"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  Play,
  CheckCircle2,
  Clock,
  Sparkles,
  PlusCircle,
  Video,
} from "lucide-react";

interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  level: string;
  channelName: string;
  publishedAt?: string | null;
  isFreeTrial: boolean;
  isDone: boolean;
  score: number;
  sentenceCount: number;
}

export function DictationFilter({ videos }: { videos: VideoItem[] }) {
  const [activeLevel, setActiveLevel] = useState<string>("all");

  const levels = ["all", "HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"];

  const filtered =
    activeLevel === "all"
      ? videos
      : videos.filter((v) => v.level.toLowerCase() === activeLevel.toLowerCase());

  return (
    <div className="space-y-8">
      {/* Level Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                activeLevel === lvl
                  ? "bg-rose-500 text-onaccent shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {lvl === "all" ? "Tất cả cấp độ" : lvl}
            </button>
          ))}
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:underline"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Thêm video dictation mới</span>
        </Link>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((video) => (
          <Link
            key={video.id}
            href={`/dictation/${video.id}`}
            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-rose-400 transition-all flex flex-col justify-between"
          >
            {/* Thumbnail */}
            <div className="w-full h-48 bg-black relative overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
              />

              {/* Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-rose-600/90 text-onaccent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white text-[11px] font-bold">
                  {video.level}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-onaccent text-[11px] font-bold">
                  Miễn phí
                </span>
              </div>

              {video.isDone && (
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-onaccent text-xs font-bold flex items-center gap-1 shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Đã xong ({video.score}%)</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                  <span>Kênh: {video.channelName}</span>
                  <span>•</span>
                  <span>{video.sentenceCount} câu</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600">
                <span>Vào chép chính tả</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
