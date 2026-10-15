"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Award,
  ChevronLeft,
} from "lucide-react";

interface LessonSimple {
  id: string;
  order: number;
  title: string;
  titleVi: string;
  levelId: string;
}

interface LessonSidebarProps {
  currentLessonId: string;
  levelName: string;
  levelId: string;
  lessons: LessonSimple[];
  progressMap?: Record<string, { status: string; score: number }>;
}

export function LessonSidebar({
  currentLessonId,
  levelName,
  levelId,
  lessons,
  progressMap = {},
}: LessonSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${
        collapsed ? "w-16" : "w-72 lg:w-80"
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        {!collapsed && (
          <div className="flex flex-col">
            <Link
              href={`/hsk/${levelId}`}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>← {levelName}</span>
            </Link>
            <span className="text-sm font-extrabold text-slate-800 mt-0.5">
              Cây bài học
            </span>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors mx-auto"
          title={collapsed ? "Mở rộng danh sách" : "Thu gọn danh sách"}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Lesson Tree list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {lessons.map((lsn, idx) => {
          const isActive = lsn.id === currentLessonId;
          const progress = progressMap[lsn.id];
          const isDone = progress?.status === "done";
          const percent = isDone ? 100 : progress?.score || 0;

          if (collapsed) {
            return (
              <Link
                key={lsn.id}
                href={`/vocabulary/${lsn.id}`}
                title={`Bài ${lsn.order}: ${lsn.title} (${percent}%)`}
                className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                  isActive
                    ? "bg-blue-600 text-onaccent shadow-md"
                    : isDone
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {isDone ? <CheckCircle2 className="w-5 h-5" /> : lsn.order}
              </Link>
            );
          }

          return (
            <Link
              key={lsn.id}
              href={`/vocabulary/${lsn.id}`}
              className={`p-3 rounded-2xl flex items-center justify-between transition-all group ${
                isActive
                  ? "bg-blue-50 border border-blue-200 shadow-sm"
                  : "hover:bg-slate-50 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isActive
                      ? "bg-blue-600 text-onaccent"
                      : isDone
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : lsn.order}
                </div>

                <div className="truncate">
                  <div className="text-sm font-bold text-slate-800 truncate hanzi-font">
                    {lsn.title}
                  </div>
                  <div className="text-xs text-slate-500 truncate">{lsn.titleVi}</div>
                </div>
              </div>

              <div className="text-right shrink-0 ml-2">
                <span className="text-[11px] font-bold text-slate-600">{percent}%</span>
                <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-0.5">
                  <div
                    className={`h-full rounded-full ${
                      isDone ? "bg-emerald-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
