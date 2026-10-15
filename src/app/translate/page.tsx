"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Languages, BookOpen, PenTool, Sparkles, Layers, Volume2 } from "lucide-react";
import { AudioButton } from "@/components/audio/AudioButton";

export default function TranslatePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [radicals, setRadicals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Quick suggestions
  const sampleQueries = ["你好", "谢谢", "ăn", "người", "mua", "thời tiết", "bù", "xiǎng"];

  const handleSearch = async (term: string) => {
    const q = term.trim();
    if (!q) {
      setResults([]);
      setRadicals([]);
      setSearched(false);
      return;
    }

    setIsLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
      setRadicals(data.radicals || []);
    } catch (e) {
      console.error(e);
      setResults([]);
      setRadicals([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <h1 className="headline text-5xl text-slate-900 sm:text-6xl">
          Từ điển offline
        </h1>
        <p className="text-lg text-slate-500">
          Tra cứu nhanh từ cơ sở dữ liệu SQLite cục bộ (offline), không gọi API đám mây ngoài.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nhập chữ Hán, pinyin hoặc tiếng Việt (vd: 你, nǐ, bạn, chào...)"
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            type="submit"
            className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-onaccent font-bold text-sm shadow-md transition-all active:scale-95 shrink-0"
          >
            {isLoading ? "Đang tìm..." : "Tra cứu"}
          </button>
        </form>

        {/* Suggestion tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
          <span className="font-semibold mr-1">Gợi ý tra nhanh:</span>
          {sampleQueries.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setQuery(item);
                handleSearch(item);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-medium transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-6">
        {/* Results in Vocab */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Từ vựng HSK tìm thấy ({results.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 hover:border-blue-400 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-black text-slate-900 hanzi-font">
                        {item.hanzi}
                      </span>
                      <div>
                        <div className="text-base font-bold text-blue-600">
                          {item.pinyin}
                        </div>
                        <div className="text-xs text-slate-400">
                          {item.lesson?.level?.name} • Bài {item.lesson?.order}
                        </div>
                      </div>
                    </div>

                    <AudioButton text={item.hanzi} size="sm" />
                  </div>

                  <div className="space-y-1">
                    {item.meanings?.map((m: any, i: number) => (
                      <div key={i} className="text-sm font-bold text-slate-800">
                        <span className="text-xs px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold mr-1.5">
                          {m.wordClass}
                        </span>
                        {m.meaningVi}
                      </div>
                    ))}
                  </div>

                  {item.exampleSentence && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs space-y-0.5">
                      <div className="font-bold text-slate-700 hanzi-font">
                        {item.exampleSentence}
                      </div>
                      <div className="italic text-slate-500">
                        {item.exampleSentenceVi}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <Link
                      href={`/character/${encodeURIComponent(item.hanzi)}`}
                      className="text-slate-500 hover:text-blue-600"
                    >
                      Chi tiết chữ
                    </Link>

                    <Link
                      href={`/write/${encodeURIComponent(item.hanzi)}`}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Tập viết</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results in Radicals */}
        {radicals.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-500" />
              <span>Bộ thủ liên quan ({radicals.length})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {radicals.map((rad) => (
                <div
                  key={rad.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-amber-900 hanzi-font">
                      {rad.hanzi}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {rad.meaning}
                      </div>
                      <div className="text-xs text-slate-500">{rad.theme?.name}</div>
                    </div>
                  </div>

                  <Link
                    href={`/write/${encodeURIComponent(rad.hanzi)}`}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Viết →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {searched && !isLoading && results.length === 0 && radicals.length === 0 && (
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Không tìm thấy kết quả phù hợp
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Từ khóa này chưa có trong cơ sở dữ liệu local. Ứng dụng chạy hoàn toàn offline nên không gọi API dịch ngoài. Bạn có thể thêm từ vựng mới tại trang quản trị.
            </p>
            <Link
              href="/admin"
              className="inline-block px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Thêm từ mới vào từ điển
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
