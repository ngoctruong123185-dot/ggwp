import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ArrowRight, Flame } from "lucide-react";

export const revalidate = 0;

function relativeDay(d: Date) {
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (days <= 0) return "Hôm nay";
  if (days === 1) return "Hôm qua";
  return `${days} ngày trước`;
}

export default async function ProgressPage() {
  const user = await getCurrentUser();
  const userId = user?.id || "";

  const [levels, userProgress, streak] = await Promise.all([
    prisma.level.findMany({
      orderBy: { order: "asc" },
      include: {
        lessons: {
          orderBy: { order: "asc" },
          include: { vocabItems: { select: { id: true, hanzi: true, pinyin: true } } },
        },
      },
    }),
    userId ? prisma.userProgress.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } }) : Promise.resolve([]),
    userId ? prisma.userStreak.findUnique({ where: { userId } }) : Promise.resolve(null),
  ]);

  const doneVocabIds = new Set(userProgress.filter((p) => p.itemType === "vocab" && p.status === "done").map((p) => p.itemId));
  const inProgressVocabIds = new Set(
    userProgress.filter((p) => p.itemType === "vocab" && p.status === "in_progress").map((p) => p.itemId)
  );

  const allLessons = levels.flatMap((l) => l.lessons.map((lsn) => ({ ...lsn, levelName: l.name })));
  const vocabIndex = new Map(allLessons.flatMap((l) => l.vocabItems.map((v) => [v.id, { ...v, lesson: l }] as const)));
  const lessonIndex = new Map(allLessons.map((l) => [l.id, l]));

  const totalVocab = vocabIndex.size;
  const doneCount = doneVocabIds.size;
  const inProgressCount = inProgressVocabIds.size;
  const notStartedCount = Math.max(0, totalVocab - doneCount - inProgressCount);
  const pctOf = (n: number) => (totalVocab > 0 ? Math.round((n / totalVocab) * 100) : 0);

  const recent = userProgress
    .map((p) => {
      if (p.itemType === "vocab") {
        const v = vocabIndex.get(p.itemId);
        return v ? { key: p.id, when: p.updatedAt, status: p.status, score: p.score, title: v.hanzi, sub: v.pinyin, href: `/vocabulary/${v.lesson.id}`, kind: "Từ vựng" } : null;
      }
      if (p.itemType === "lesson") {
        const l = lessonIndex.get(p.itemId);
        return l ? { key: p.id, when: p.updatedAt, status: p.status, score: p.score, title: l.title, sub: `${l.levelName}, bài ${l.order}`, href: `/vocabulary/${l.id}`, kind: "Bài học" } : null;
      }
      return null;
    })
    .filter(Boolean)
    .slice(0, 8) as {
    key: string; when: Date; status: string; score: number; title: string; sub: string; href: string; kind: string;
  }[];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="headline text-5xl text-slate-900 sm:text-6xl">Bảng thành tích</h1>
        <p className="text-slate-500">
          {user ? `${user.displayName}, đây là quãng đường bạn đã chạy.` : "Đăng nhập để xem tiến độ của riêng bạn."} Mọi kết quả được lưu
          tự động sau mỗi bài tập.
        </p>
      </header>

      {/* Headline stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="banner banner-gold p-6">
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Chuỗi ngày học</p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="num text-7xl font-bold leading-none text-amber-600">{streak?.currentStreak ?? 0}</span>
                <span className="font-display text-xl font-semibold italic text-slate-500">ngày</span>
              </p>
              <p className="mt-2 text-sm text-slate-500">Học mỗi ngày để giữ chuỗi.</p>
            </div>
            <Flame className="h-10 w-10 fill-amber-500 text-amber-500 animate-flame" />
          </div>
        </div>

        <div className="rounded-[18px] border border-line bg-surface p-6">
          <p className="text-sm font-medium text-slate-500">Từ đã thuộc</p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="num text-7xl font-bold leading-none text-emerald-600">{doneCount}</span>
            <span className="num text-xl font-semibold text-slate-400">/ {totalVocab}</span>
          </p>
          <p className="mt-2 text-sm text-slate-500">{pctOf(doneCount)}% kho từ vựng</p>
        </div>

        <div className="rounded-[18px] border border-line bg-surface p-6">
          <p className="text-sm font-medium text-slate-500">Đang ôn luyện</p>
          <p className="mt-1">
            <span className="num text-7xl font-bold leading-none text-blue-600">{inProgressCount}</span>
          </p>
          <p className="mt-2 text-sm text-slate-500">Cần thêm vài lượt bài tập</p>
        </div>
      </div>

      {/* Distribution */}
      <section className="rounded-[18px] border border-line bg-surface p-6 space-y-4">
        <h2 className="font-display text-2xl font-bold italic text-slate-900">Phân bố từ vựng</h2>
        <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full bg-emerald-500 origin-left animate-bar-fill" style={{ width: `${pctOf(doneCount)}%` }} title="Đã thuộc" />
          <div className="h-full bg-blue-500 origin-left animate-bar-fill" style={{ width: `${pctOf(inProgressCount)}%` }} title="Đang học" />
        </div>
        <dl className="grid grid-cols-3 gap-3 text-sm">
          {[
            { label: "Đã thuộc", n: doneCount, dot: "bg-emerald-500" },
            { label: "Đang học", n: inProgressCount, dot: "bg-blue-500" },
            { label: "Chưa học", n: notStartedCount, dot: "bg-slate-200" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-night/40 px-4 py-3">
              <dt className="flex items-center gap-2 text-slate-500">
                <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
                {s.label}
              </dt>
              <dd className="mt-1 flex items-baseline gap-2">
                <span className="num text-3xl font-bold text-slate-900">{s.n}</span>
                <span className="text-slate-400">{pctOf(s.n)}%</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Per level */}
        <section className="rounded-[18px] border border-line bg-surface p-6">
          <h2 className="font-display text-2xl font-bold italic text-slate-900">Theo cấp độ</h2>
          <ul className="mt-4 space-y-4">
            {levels.map((lvl) => {
              const levelVocab = lvl.lessons.flatMap((lsn) => lsn.vocabItems);
              const levelDone = levelVocab.filter((v) => doneVocabIds.has(v.id)).length;
              const percent = levelVocab.length > 0 ? Math.round((levelDone / levelVocab.length) * 100) : 0;
              const open = levelVocab.length > 0;
              return (
                <li key={lvl.id} className={open ? "" : "opacity-50"}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-lg font-bold italic text-slate-900">{lvl.name}</span>
                    {open ? (
                      <Link href={`/hsk/${lvl.id}`} className="group flex items-baseline gap-2 text-sm text-slate-500 hover:text-blue-600">
                        <span className="num">
                          {levelDone}/{levelVocab.length} từ
                        </span>
                        <span className="num font-bold text-slate-800 group-hover:text-blue-600">{percent}%</span>
                      </Link>
                    ) : (
                      <span className="text-xs text-slate-400">Chưa có nội dung</span>
                    )}
                  </div>
                  <div className="track mt-1.5">
                    {open && <div className="track-fill" style={{ width: `${Math.max(percent, 1.5)}%` }} />}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Recent activity */}
        <section className="rounded-[18px] border border-line bg-surface p-6">
          <h2 className="font-display text-2xl font-bold italic text-slate-900">Nhật ký tập luyện</h2>
          {recent.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-line p-5 text-sm text-slate-500">
              Chưa có buổi tập nào.{" "}
              <Link href="/hsk/hsk1" className="font-semibold text-blue-600 hover:underline">
                Bắt đầu với HSK 1
              </Link>
              .
            </div>
          ) : (
            <ol className="mt-4 divide-y divide-line">
              {recent.map((r) => (
                <li key={r.key}>
                  <Link href={r.href} className="group flex items-center gap-3 py-3">
                    <span
                      className={`h-9 w-1.5 shrink-0 -skew-x-[14deg] rounded-sm ${
                        r.status === "done" ? "bg-emerald-500" : "bg-blue-500"
                      }`}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="hanzi-font text-lg font-bold text-slate-900 group-hover:text-blue-600">{r.title}</span>
                        <span className="truncate text-sm text-slate-500">{r.sub}</span>
                      </span>
                      <span className="block text-xs text-slate-400">
                        {r.kind}, {r.status === "done" ? "đã thuộc" : "đang học"}, {relativeDay(r.when).toLowerCase()}
                      </span>
                    </span>
                    <span className="num text-lg font-bold text-slate-700">{r.score}</span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
          <Link href="/hsk" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline">
            Về giáo trình <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
