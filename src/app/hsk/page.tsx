import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ArrowRight, Lock } from "lucide-react";

export const revalidate = 0;

const LEVEL_META: Record<string, { stage: string; target: number; samples: string[] }> = {
  hsk1: { stage: "Nhập môn", target: 150, samples: ["你好", "谢谢", "朋友"] },
  hsk2: { stage: "Sơ cấp", target: 300, samples: ["运动", "旅游", "比"] },
  hsk3: { stage: "Trung cấp 1", target: 600, samples: ["周末", "爬山", "电影"] },
  hsk4: { stage: "Trung cấp 2", target: 1200, samples: ["成功", "坚持", "无论"] },
  hsk5: { stage: "Cao cấp 1", target: 2500, samples: ["经济", "哲学", "深刻"] },
  hsk6: { stage: "Cao cấp 2", target: 5000, samples: ["宏伟", "斟酌", "络绎不绝"] },
};

export default async function HskLevelsPage() {
  const user = await getCurrentUser();
  const userId = user?.id || "";

  const [levels, progress] = await Promise.all([
    prisma.level.findMany({
      orderBy: { order: "asc" },
      include: {
        lessons: {
          orderBy: { order: "asc" },
          include: {
            vocabItems: { select: { id: true } },
            grammars: { select: { id: true } },
          },
        },
      },
    }),
    userId
      ? prisma.userProgress.findMany({ where: { userId, itemType: "vocab", status: "done" }, select: { itemId: true } })
      : Promise.resolve([] as { itemId: string }[]),
  ]);

  const done = new Set(progress.map((p) => p.itemId));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <header className="max-w-3xl space-y-3">
        <h1 className="headline text-5xl text-slate-900 sm:text-6xl">Giáo trình HSK 1 – 6</h1>
        <p className="text-lg text-slate-500">
          Mỗi cấp độ chia thành các bài học theo chủ đề, mỗi bài mười từ kèm ngữ pháp và bài tập. Cứ ba bài lại có
          một buổi ôn tập tổng hợp.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {levels.map((lvl, idx) => {
          const meta = LEVEL_META[lvl.id] ?? { stage: "Tiêu chuẩn", target: 150, samples: [] };
          const vocabIds = lvl.lessons.flatMap((l) => l.vocabItems.map((v) => v.id));
          const grammarCount = lvl.lessons.reduce((n, l) => n + l.grammars.length, 0);
          const learned = vocabIds.filter((id) => done.has(id)).length;
          const pct = vocabIds.length ? Math.round((learned / vocabIds.length) * 100) : 0;
          const open = lvl.lessons.length > 0;

          return (
            <article
              key={lvl.id}
              className={`group relative flex flex-col overflow-hidden rounded-[18px] border bg-surface transition-all duration-300 ${
                open ? "border-line hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-black/40" : "border-line/60"
              }`}
            >
              {/* lane numeral */}
              <span
                aria-hidden="true"
                className={`headline pointer-events-none absolute right-3 top-2 text-[7.5rem] leading-[0.85] transition-transform duration-500 group-hover:-translate-x-2 ${
                  open ? "text-blue-500/15" : "text-slate-100"
                }`}
              >
                {idx + 1}
              </span>

              <div className="relative flex-1 p-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className={`h-2 w-6 -skew-x-[24deg] ${open ? "bg-blue-500" : "bg-slate-200"}`} />
                  <span className="font-semibold text-slate-500">{meta.stage}</span>
                </div>
                <h2 className={`headline mt-3 text-5xl ${open ? "text-slate-900" : "text-slate-400"}`}>{lvl.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{lvl.description}</p>

                {open ? (
                  <dl className="mt-5 grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-night/40">
                    {[
                      { k: "Bài học", v: lvl.lessons.length },
                      { k: "Từ vựng", v: vocabIds.length },
                      { k: "Ngữ pháp", v: grammarCount },
                    ].map((s) => (
                      <div key={s.k} className="px-3 py-2.5">
                        <dt className="text-xs text-slate-400">{s.k}</dt>
                        <dd className={`num text-2xl font-bold ${open ? "text-slate-900" : "text-slate-400"}`}>{s.v}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-5 rounded-xl border border-line bg-night/40 px-4 py-3 text-sm text-slate-500">
                    Mục tiêu tích lũy <span className="num text-xl font-bold text-slate-400">{meta.target}</span> từ
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {meta.samples.map((w) => (
                    <span
                      key={w}
                      className="rounded-md border border-line bg-raised px-2.5 py-1 hanzi-font text-base font-bold text-slate-700"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative border-t border-line p-6 pt-5">
                {open ? (
                  <>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-slate-500">
                        Đã thuộc <span className="num font-semibold text-slate-800">{learned}</span> / {vocabIds.length} từ
                      </span>
                      <span className="num text-lg font-bold text-blue-600">{pct}%</span>
                    </div>
                    <div className="track mt-2">
                      <div className="track-fill" style={{ width: `${Math.max(pct, 2)}%`, animationDelay: `${idx * 90}ms` }} />
                    </div>
                    <Link href={`/hsk/${lvl.id}`} className="btn-blaze mt-5 w-full">
                      <span>{learned > 0 ? `Tập tiếp ${lvl.name}` : `Vào học ${lvl.name}`}</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-dashed border-line px-4 py-3 text-sm text-slate-500">
                    <Lock className="h-4 w-4 shrink-0" />
                    <span>Nội dung {lvl.name} chưa có trong cơ sở dữ liệu. Làn này sẽ mở khi có bài học.</span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
