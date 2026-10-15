import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { HeroTrainer } from "@/components/home/HeroTrainer";
import { TrackCanvas } from "@/components/home/TrackCanvas";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import {
  BookOpen,
  Layers,
  PenTool,
  Headphones,
  Timer,
  Languages,
  FileText,
  Flame,
  ArrowRight,
  Volume2,
  Repeat,
  BarChart3,
} from "lucide-react";

export const revalidate = 0; // always fresh DB data

const TOOL_GROUPS = [
  {
    title: "Học",
    blurb: "Nạp kiến thức mới",
    items: [
      { href: "/hsk", label: "Giáo trình HSK", desc: "Bài học theo chủ đề, kèm ngữ pháp", icon: BookOpen },
      { href: "/radicals", label: "214 bộ thủ", desc: "Giải mã nghĩa của chữ Hán", icon: Layers },
      { href: "/vocabulary/hsk1-l1?tab=grammar", label: "Ngữ pháp trọng điểm", desc: "Cấu trúc câu và ví dụ", icon: FileText },
    ],
  },
  {
    title: "Luyện",
    blurb: "Lặp lại đến khi thành phản xạ",
    items: [
      { href: "/vocabulary/hsk1-l1", label: "11 dạng bài tập", desc: "Flashcard, điền từ, ghép cặp, sắp câu…", icon: Repeat },
      { href: "/write/练", label: "Luyện viết", desc: "Vẽ từng nét, chấm thứ tự nét", icon: PenTool },
      { href: "/dictation", label: "Chép chính tả", desc: "Nghe video, gõ lại từng câu", icon: Headphones },
    ],
  },
  {
    title: "Thi",
    blurb: "Đo sức trước ngày thi thật",
    items: [
      { href: "/exam/hsk1", label: "Thi thử HSK", desc: "15 câu, đồng hồ 15 phút", icon: Timer },
      { href: "/translate", label: "Từ điển offline", desc: "Tra Hán tự, pinyin, nghĩa Việt", icon: Languages },
      { href: "/progress", label: "Bảng thành tích", desc: "Từ đã thuộc và chuỗi ngày học", icon: BarChart3 },
    ],
  },
];

export default async function HomePage() {
  const user = await getCurrentUser();
  const userId = user?.id || "";

  const [levels, totalRadicals, progress, streak] = await Promise.all([
    prisma.level.findMany({
      orderBy: { order: "asc" },
      include: {
        lessons: {
          orderBy: { order: "asc" },
          include: { vocabItems: { select: { id: true } } },
        },
      },
    }),
    prisma.radical.count(),
    userId
      ? prisma.userProgress.findMany({ where: { userId }, select: { itemType: true, itemId: true, status: true } })
      : Promise.resolve([] as { itemType: string; itemId: string; status: string }[]),
    userId ? prisma.userStreak.findUnique({ where: { userId } }) : Promise.resolve(null),
  ]);

  const doneVocab = new Set(progress.filter((p) => p.itemType === "vocab" && p.status === "done").map((p) => p.itemId));
  const doneLessons = new Set(progress.filter((p) => p.itemType === "lesson" && p.status === "done").map((p) => p.itemId));
  const doneRadicals = progress.filter((p) => p.itemType === "radical" && p.status === "done").length;

  const allLessons = levels.flatMap((l) => l.lessons);
  const totalVocab = allLessons.reduce((n, l) => n + l.vocabItems.length, 0);
  const nextLesson = allLessons.find((l) => !doneLessons.has(l.id)) ?? allLessons[0];
  const nextLevel = levels.find((l) => l.id === nextLesson?.levelId);

  const scoreboard = [
    {
      label: "Chuỗi ngày học",
      value: streak?.currentStreak ?? 0,
      unit: "ngày",
      tone: "text-amber-600",
      icon: <Flame className="h-5 w-5 fill-amber-500 text-amber-500 animate-flame" />,
    },
    { label: "Từ đã thuộc", value: doneVocab.size, unit: `/ ${totalVocab}`, tone: "text-emerald-600" },
    { label: "Bài học hoàn thành", value: doneLessons.size, unit: `/ ${allLessons.length}`, tone: "text-blue-600" },
    { label: "Bộ thủ đã thuộc", value: doneRadicals, unit: `/ ${totalRadicals}`, tone: "text-violet-600" },
  ];

  return (
    <div className="pb-8">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 floodlight" />
        <TrackCanvas className="[mask-image:linear-gradient(to_bottom,transparent_0%,black_36%)]" />
        {/* readability scrim behind the copy */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/30 to-night/10 lg:bg-gradient-to-r lg:from-night lg:via-night/75 lg:to-transparent lg:[background-size:68%_100%] lg:bg-no-repeat"
        />

        <div className="relative max-w-7xl mx-auto flex min-h-[calc(100svh-7rem)] items-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
            <div className="space-y-7">
              <h1 className="headline text-[3.4rem] leading-[0.9] text-slate-900 sm:text-7xl lg:text-[5.6rem]">
                <span className="reveal-line">
                  <span style={{ animationDelay: "80ms" }}>Luyện chữ Hán</span>
                </span>
                <span className="reveal-line">
                  <span style={{ animationDelay: "230ms" }}>như luyện thể lực.</span>
                </span>
              </h1>

              <p className="rise-in max-w-xl text-lg leading-relaxed text-slate-600" style={{ animationDelay: "520ms" }}>
                Mỗi ngày một hiệp: học mười từ mới, làm bài theo 11 dạng bài tập, rồi viết lại từng nét cho đến khi
                tay nhớ. {totalVocab} từ vựng HSK 1–2 và {totalRadicals} bộ thủ đã sẵn sàng ngay trên máy của bạn.
              </p>

              <div className="rise-in flex flex-wrap items-center gap-3 pt-1" style={{ animationDelay: "680ms" }}>
                {nextLesson && (
                  <Link href={`/vocabulary/${nextLesson.id}`} className="btn-blaze">
                    <span>{doneLessons.size > 0 ? "Tập tiếp" : "Vào tập ngay"}</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                )}
                <Link href="/write/练" className="btn-ghost">
                  <PenTool className="h-[18px] w-[18px] text-blue-600" />
                  <span>Luyện viết chữ Hán</span>
                </Link>
              </div>

              {nextLesson && (
                <p className="rise-in text-sm text-slate-500" style={{ animationDelay: "820ms" }}>
                  Bài tiếp theo:{" "}
                  <Link href={`/vocabulary/${nextLesson.id}`} className="font-semibold text-slate-800 hover:text-blue-600">
                    {nextLevel?.name}, bài {nextLesson.order}{" "}
                    <span className="hanzi-font">{nextLesson.title}</span>
                  </Link>{" "}
                  <span className="text-slate-400">({nextLesson.titleVi})</span>
                </p>
              )}
            </div>

            <div className="card-in" style={{ animationDelay: "360ms" }}>
              <HeroTrainer />
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="rise-in absolute bottom-14 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
          style={{ animationDelay: "1500ms" }}
        >
          <span className="text-xs text-slate-400">Cuộn xuống</span>
          <span className="scroll-cue" />
        </div>
      </section>

      {/* ===== SCOREBOARD ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 overflow-hidden rounded-[18px] border border-line bg-surface shadow-xl shadow-black/30 md:grid-cols-4">
          {scoreboard.map((s, i) => (
            <div
              key={s.label}
              className={`px-5 py-5 sm:px-7 ${i % 2 === 1 ? "border-l border-line" : ""} ${
                i >= 2 ? "border-t border-line md:border-t-0" : ""
              } ${i === 2 ? "md:border-l" : ""}`}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                {s.icon}
                <span>{s.label}</span>
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className={`num text-5xl font-bold leading-none ${s.tone}`}>{s.value}</span>
                <span className="num text-lg font-semibold text-slate-400">{s.unit}</span>
              </div>
            </div>
          ))}
        </div>
        {!user && (
          <p className="mt-3 text-sm text-slate-500">
            <Link href="/login" className="font-semibold text-blue-600 hover:underline">
              Đăng nhập
            </Link>{" "}
            để lưu tiến độ và chuỗi ngày học của riêng bạn.
          </p>
        )}
      </section>

      {/* ===== HSK LANES ===== */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div data-reveal style={{ "--rx": "0px", "--ry": "28px" } as React.CSSProperties} className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="headline text-4xl text-slate-900 sm:text-5xl">Sáu đường chạy HSK</h2>
            <p className="mt-2 text-slate-500">Mỗi cấp độ là một làn chạy. Về đích làn này rồi chuyển sang làn kế.</p>
          </div>
          <Link href="/hsk" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline">
            Xem toàn bộ giáo trình <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ol className="overflow-hidden rounded-[18px] border border-line">
          {levels.map((lvl, idx) => {
            const vocabIds = lvl.lessons.flatMap((l) => l.vocabItems.map((v) => v.id));
            const done = vocabIds.filter((id) => doneVocab.has(id)).length;
            const pct = vocabIds.length ? Math.round((done / vocabIds.length) * 100) : 0;
            const open = lvl.lessons.length > 0;

            const row = (
              <div className="grid grid-cols-[3.2rem_1fr] items-center gap-x-4 gap-y-3 px-4 py-5 sm:grid-cols-[4.5rem_1fr_14rem_auto] sm:px-6">
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <span className={`lane-num headline text-5xl sm:text-6xl ${open ? "text-blue-500" : "text-slate-200"}`}>
                    {idx + 1}
                  </span>
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-display text-2xl font-bold italic text-slate-900">{lvl.name}</h3>
                    <span className="text-sm text-slate-500">
                      {open ? `${lvl.lessons.length} bài, ${vocabIds.length} từ` : "Đang xây dựng nội dung"}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">{lvl.description}</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  {open ? (
                    <>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Đã thuộc</span>
                        <span className="num text-sm font-semibold text-slate-700">{pct}%</span>
                      </div>
                      <div className="track mt-1.5">
                        <div className="track-fill" style={{ width: `${Math.max(pct, 2)}%`, animationDelay: `${idx * 80}ms` }} />
                      </div>
                    </>
                  ) : (
                    <div className="track opacity-50" />
                  )}
                </div>
                <span className="hidden sm:flex justify-end">
                  {open ? (
                    <ArrowRight className="h-5 w-5 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600" />
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">Sắp mở</span>
                  )}
                </span>
              </div>
            );

            return (
              <li
                key={lvl.id}
                data-reveal
                style={{ "--i": idx } as React.CSSProperties}
                className={`bg-surface ${idx > 0 ? "border-t border-line" : ""}`}
              >
                {open ? (
                  <Link href={`/hsk/${lvl.id}`} className="group block transition-colors hover:bg-raised">
                    {row}
                  </Link>
                ) : (
                  <div className="opacity-70">{row}</div>
                )}
              </li>
            );
          })}
        </ol>
      </ScrollReveal>

      {/* ===== TOOLS ===== */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div data-reveal style={{ "--rx": "0px", "--ry": "28px" } as React.CSSProperties}>
          <h2 className="headline text-4xl text-slate-900 sm:text-5xl">Giáo án mỗi buổi tập</h2>
          <p className="mt-2 max-w-2xl text-slate-500">
            Học, luyện, rồi thi. Mỗi công cụ đều đọc dữ liệu thật từ SQLite và ghi lại tiến độ của bạn.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TOOL_GROUPS.map((g, gi) => (
            <div
              key={g.title}
              data-reveal
              style={{ "--i": gi + 1, "--rx": "0px", "--ry": "32px" } as React.CSSProperties}
              className="rounded-[18px] border border-line bg-surface p-2"
            >
              <div className="flex items-baseline justify-between px-3 pt-3 pb-2">
                <h3 className="headline text-3xl text-slate-900">{g.title}</h3>
                <span className="text-xs text-slate-400">{g.blurb}</span>
              </div>
              <ul>
                {g.items.map(({ href, label, desc, icon: Icon }) => (
                  <li key={href}>
                    <Link href={href} className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-raised">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-blue-600 transition-colors group-hover:bg-blue-500 group-hover:text-onaccent">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-slate-900">{label}</span>
                        <span className="block truncate text-sm text-slate-500">{desc}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-slate-500">
          <Volume2 className="h-4 w-4 shrink-0 text-blue-600" />
          <span>
            Phát âm dùng giọng đọc tiếng Trung có sẵn của trình duyệt. Nếu không nghe thấy, chọn giọng trong{" "}
            <Link href="/settings" className="font-semibold text-slate-800 hover:text-blue-600">
              Cài đặt
            </Link>
            .
          </span>
        </div>
      </ScrollReveal>
    </div>
  );
}
