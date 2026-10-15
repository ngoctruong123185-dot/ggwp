"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  BookOpen,
  Flame,
  Settings,
  PenTool,
  Award,
  ChevronDown,
  Layers,
  Menu,
  X,
  LogOut,
  Shield,
  LogIn,
  BarChart3,
} from "lucide-react";

type NavItem = { href: string; label: string; match: (p: string) => boolean };

const NAV: NavItem[] = [
  { href: "/", label: "Trang chủ", match: (p) => p === "/" },
  { href: "/hsk", label: "Giáo trình", match: (p) => p.startsWith("/hsk") || p.startsWith("/vocabulary") },
  { href: "/dictation", label: "Chép chính tả", match: (p) => p.startsWith("/dictation") },
  { href: "/exam/hsk1", label: "Thi thử", match: (p) => p.startsWith("/exam") },
  { href: "/translate", label: "Tra từ", match: (p) => p.startsWith("/translate") || p.startsWith("/character") },
];

const PRACTICE = [
  { href: "/vocabulary/hsk1-l1", label: "Học từ vựng", hint: "11 dạng bài tập", icon: BookOpen },
  { href: "/radicals", label: "214 bộ thủ", hint: "Theo 7 chủ đề", icon: Layers },
  { href: "/write/你", label: "Luyện viết chữ Hán", hint: "Thứ tự nét chuẩn", icon: PenTool },
];

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`group relative px-3 py-2 font-display text-[17px] font-semibold tracking-[0.01em] transition-colors ${
        active ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
      }`}
    >
      {item.label}
      <span
        className={`absolute left-3 right-3 -bottom-[13px] h-[3px] origin-left -skew-x-[24deg] bg-blue-500 transition-transform duration-300 ease-out ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
        }`}
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const [streak, setStreak] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetch("/api/progress")
        .then((res) => res.json())
        .then((data) => {
          if (data.streak) setStreak(data.streak.currentStreak);
        })
        .catch(() => {});
    }
  }, [user]);

  // Close menus on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setPracticeOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const practiceActive =
    pathname.startsWith("/radicals") || pathname.startsWith("/write");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-night/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="HiHSK — trang chủ">
            <span className="relative flex h-9 w-11 items-center justify-center">
              <span className="absolute inset-0 -skew-x-[14deg] rounded-[6px] bg-blue-500 transition-transform duration-300 group-hover:-skew-x-[22deg]" />
              <span className="relative hanzi-sans text-lg font-black text-onaccent">汉</span>
            </span>
            <span className="flex items-baseline gap-1.5">
              <span className="headline text-[26px] text-slate-900">HiHSK</span>
              <span className="font-display text-sm font-semibold italic text-slate-400">local</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center" aria-label="Điều hướng chính">
            {NAV.slice(0, 2).map((item) => (
              <NavLink key={item.href} item={item} active={item.match(pathname)} />
            ))}

            {/* Practice dropdown */}
            <div className="relative">
              <button
                onClick={() => setPracticeOpen(!practiceOpen)}
                onBlur={() => setTimeout(() => setPracticeOpen(false), 180)}
                aria-expanded={practiceOpen}
                className={`group relative flex items-center gap-1 px-3 py-2 font-display text-[17px] font-semibold tracking-[0.01em] transition-colors ${
                  practiceActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <span>Luyện tập</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${practiceOpen ? "rotate-180" : ""}`} />
                <span
                  className={`absolute left-3 right-3 -bottom-[13px] h-[3px] origin-left -skew-x-[24deg] bg-blue-500 transition-transform duration-300 ${
                    practiceActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>

              {practiceOpen && (
                <div className="absolute top-full left-0 mt-3 w-64 rounded-card border border-line bg-surface p-1.5 shadow-2xl shadow-black/40 animate-scale-in origin-top-left">
                  {PRACTICE.map(({ href, label, hint, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-raised transition-colors group/item"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-blue-600 group-hover/item:bg-blue-500 group-hover/item:text-onaccent transition-colors">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-900">{label}</span>
                        <span className="block text-xs text-slate-500">{hint}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV.slice(2).map((item) => (
              <NavLink key={item.href} item={item} active={item.match(pathname)} />
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {user && (
              <Link
                href="/progress"
                className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-amber-600 hover:bg-amber-500/20 transition-colors"
                title="Chuỗi ngày học liên tục"
              >
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-flame" />
                <span className="num text-lg font-bold leading-none">{streak}</span>
                <span className="hidden sm:inline text-xs font-semibold text-amber-700">ngày</span>
              </Link>
            )}

            <ThemeToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  onBlur={() => setTimeout(() => setUserMenuOpen(false), 180)}
                  aria-expanded={userMenuOpen}
                  className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-slate-100 transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-bold uppercase text-onaccent">
                    {user.displayName.charAt(0)}
                  </span>
                  <span className="hidden sm:block max-w-[110px] truncate text-sm font-semibold text-slate-700">
                    {user.displayName}
                  </span>
                  <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 rounded-card border border-line bg-surface p-1.5 shadow-2xl shadow-black/40 animate-scale-in origin-top-right">
                    <div className="px-3 py-2.5 mb-1 border-b border-line">
                      <div className="font-semibold text-slate-900 text-sm truncate">{user.displayName}</div>
                      <div className="text-xs text-slate-400 truncate">@{user.username}</div>
                      <span
                        className={`inline-block mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded ${
                          user.role === "ADMIN" ? "bg-violet-100 text-violet-700" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role === "ADMIN" ? "Quản trị viên" : "Học viên"}
                      </span>
                    </div>

                    <Link href="/progress" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-raised hover:text-slate-900">
                      <BarChart3 className="w-4 h-4 text-amber-500" />
                      <span>Tiến độ học tập</span>
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-raised hover:text-slate-900">
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span>Cài đặt âm thanh</span>
                    </Link>
                    {user.role === "ADMIN" && (
                      <Link href="/admin" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-violet-700 hover:bg-raised">
                        <Shield className="w-4 h-4 text-violet-600" />
                        <span>Trang quản trị</span>
                      </Link>
                    )}
                    <div className="border-t border-line mt-1 pt-1">
                      <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-500/10"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : !isLoading ? (
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-3.5 py-2 text-sm font-bold text-onaccent hover:bg-blue-400 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng nhập</span>
              </Link>
            ) : null}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-line bg-surface animate-fadeIn">
          <nav className="max-w-7xl mx-auto px-4 py-3 grid gap-1" aria-label="Điều hướng di động">
            {[...NAV, ...PRACTICE.map((p) => ({ href: p.href, label: p.label, match: (x: string) => x === p.href }))].map(
              (item) => {
                const active = item.match(pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 font-display text-lg font-semibold ${
                      active ? "bg-raised text-slate-900" : "text-slate-600 hover:bg-raised"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="h-2 w-5 -skew-x-[24deg] bg-blue-500" />}
                  </Link>
                );
              }
            )}
            <Link href="/progress" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-amber-600 hover:bg-raised">
              <Award className="w-4 h-4" />
              <span>Xem tiến độ</span>
            </Link>
            {user ? (
              <div className="mt-2 flex items-center justify-between border-t border-line px-3 pt-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{user.displayName}</div>
                  <div className="text-xs text-slate-400">@{user.username}</div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 rounded-lg bg-rose-500/10 px-2.5 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-500/20"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            ) : (
              <Link href="/login" className="mt-2 block rounded-lg bg-blue-500 py-2.5 text-center text-sm font-bold text-onaccent">
                Đăng nhập
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
