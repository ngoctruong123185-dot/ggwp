import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import {
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Sun,
  Trees,
  Footprints,
  Wrench,
  Compass,
} from "lucide-react";
import { RadicalThemeCards } from "./RadicalThemeCards";

export const revalidate = 0;

export default async function RadicalsPage() {
  const themes = await prisma.radicalTheme.findMany({
    include: {
      radicals: { orderBy: { number: "asc" } },
    },
  });

  const totalRadicals = themes.reduce((sum, t) => sum + t.radicals.length, 0);

  // Get user progress for radicals
  const user = await getCurrentUser();
  const userId = user?.id || "";

  const radicalProgress = userId
    ? await prisma.userProgress.findMany({
        where: {
          userId,
          itemType: "radical",
          status: "done",
        },
      })
    : [];

  const completedCount = radicalProgress.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <header className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl space-y-3">
          <h1 className="headline text-5xl text-slate-900 sm:text-6xl">214 bộ thủ Khang Hy</h1>
          <p className="text-lg text-slate-500">
            Bộ thủ là phần chỉ nghĩa của chữ Hán. Thuộc bộ thủ, bạn đoán được nghĩa và nhớ thứ tự nét của hàng nghìn
            chữ. Chia thành 7 chủ đề để học theo nhóm.
          </p>
        </div>

        <div className="banner banner-gold min-w-[300px] p-6">
          <div className="relative space-y-3">
            <div className="flex items-baseline justify-between gap-6">
              <span className="text-sm text-slate-500">Đã thuộc</span>
              <span className="num text-3xl font-bold text-slate-900">
                {completedCount}
                <span className="text-lg text-slate-400"> / {totalRadicals}</span>
              </span>
            </div>
            <div className="track">
              <div
                className="h-full rounded-full bg-amber-500 origin-left animate-bar-fill"
                style={{ width: `${Math.max(totalRadicals > 0 ? Math.round((completedCount / totalRadicals) * 100) : 0, 2)}%` }}
              />
            </div>
            <Link
              href={`/radicals/${themes[0]?.id || "con-nguoi"}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:underline"
            >
              <Sparkles className="w-4 h-4" />
              <span>Luyện nhận diện bộ thủ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 7 Themes Cards */}
      <RadicalThemeCards themes={themes} />
    </div>
  );
}
