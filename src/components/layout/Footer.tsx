import React from "react";
import Link from "next/link";

const COLUMNS = [
  {
    title: "Chương trình học",
    links: [
      { href: "/hsk", label: "Giáo trình HSK 1 – 6" },
      { href: "/radicals", label: "214 bộ thủ Khang Hy" },
      { href: "/write/你", label: "Luyện viết chữ Hán" },
      { href: "/dictation", label: "Chép chính tả qua video" },
    ],
  },
  {
    title: "Luyện tập & công cụ",
    links: [
      { href: "/exam/hsk1", label: "Thi thử mô phỏng HSK" },
      { href: "/translate", label: "Từ điển offline" },
      { href: "/progress", label: "Tiến độ & chuỗi ngày học" },
      { href: "/settings", label: "Cài đặt giọng đọc" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line bg-surface">
      {/* finish-line stripe */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-[7px] h-[6px] opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgb(var(--c-slate-900)) 0 6px, transparent 6px 12px)",
          backgroundSize: "12px 3px",
          backgroundRepeat: "repeat-x",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-8 w-10 items-center justify-center">
                <span className="absolute inset-0 -skew-x-[14deg] rounded-[5px] bg-blue-500" />
                <span className="relative hanzi-sans text-base font-black text-onaccent">汉</span>
              </span>
              <span className="headline text-2xl text-slate-900">HiHSK</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Tự học tiếng Trung HSK ngay trên máy của bạn. Tài khoản, tiến độ và dữ liệu bài học đều nằm trong
              SQLite cục bộ.
            </p>
            <p className="flex items-center gap-2 text-xs text-slate-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Máy chủ cục bộ đang chạy
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-lg font-bold italic text-slate-900 mb-3">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-slate-500 hover:text-blue-600 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 HiHSK Local. Dự án học tập phi thương mại.</p>
          <p>Lấy cảm hứng từ cấu trúc học tập của HiHSK.com</p>
        </div>
      </div>
    </footer>
  );
}
