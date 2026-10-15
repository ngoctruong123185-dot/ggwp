import React from "react";

/** Two-column frame for the login / register screens. */
export function AuthShell({ children, title, lead }: { children: React.ReactNode; title: string; lead: string }) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 floodlight" />
      <div aria-hidden="true" className="absolute inset-0 lanes opacity-60" />

      <div className="relative max-w-6xl mx-auto grid min-h-[calc(100vh-4rem)] items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_440px] lg:px-8">
        <div className="hidden lg:block">
          <div className="relative">
            <span
              aria-hidden="true"
              className="hanzi-sans pointer-events-none absolute -left-10 -top-32 select-none text-[20rem] font-black leading-none text-blue-500/[0.08]"
            >
              练
            </span>
            <h1 className="headline relative text-7xl text-slate-900">{title}</h1>
            <p className="relative mt-5 max-w-md text-lg leading-relaxed text-slate-600">{lead}</p>
            <ul className="relative mt-8 space-y-3 text-slate-600">
              {[
                "Tiến độ và chuỗi ngày học được lưu riêng cho từng tài khoản",
                "Mật khẩu được mã hóa bcrypt, phiên đăng nhập 30 ngày",
                "Mọi dữ liệu nằm trên máy này, không gửi lên đám mây",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-2 w-5 shrink-0 -skew-x-[24deg] bg-blue-500" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
