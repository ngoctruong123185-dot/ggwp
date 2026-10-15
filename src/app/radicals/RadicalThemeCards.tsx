"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  User,
  CloudSun,
  Trees,
  Footprints,
  Wrench,
  Compass,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, any> = {
  "con-nguoi": User,
  "thien-nhien": CloudSun,
  "dong-thuc-vat": Trees,
  "hanh-dong": Footprints,
  "do-vat-cong-cu": Wrench,
  "phuong-huong-dia-diem": Compass,
  "bieu-tuong": Sparkles,
};

export function RadicalThemeCards({ themes }: { themes: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filtered =
    selectedCategory === "all"
      ? themes
      : themes.filter((t) => t.id === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            selectedCategory === "all"
              ? "bg-blue-600 text-onaccent shadow-sm"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Tất cả chủ đề ({themes.length})
        </button>

        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedCategory(t.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === t.id
                ? "bg-blue-600 text-onaccent shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Grid of themes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((theme) => {
          const IconComponent = iconMap[theme.id] || Layers;

          return (
            <Link
              key={theme.id}
              href={`/radicals/${theme.id}`}
              className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                    {theme.radicals.length} bộ thủ
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {theme.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {theme.description}
                  </p>
                </div>

                {/* Sample radicals preview */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {theme.radicals.slice(0, 6).map((rad: any) => (
                    <span
                      key={rad.id}
                      className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-800 hanzi-font"
                    >
                      {rad.hanzi}
                    </span>
                  ))}
                  {theme.radicals.length > 6 && (
                    <span className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-400">
                      +{theme.radicals.length - 6}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                <span>Xem chi tiết & Luyện tập</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
