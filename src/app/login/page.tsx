"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthShell } from "@/components/auth/AuthShell";
import { LogIn, KeyRound, User, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Vui lòng điền đầy đủ tên đăng nhập và mật khẩu");
      return;
    }

    setLoading(true);
    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      router.push(redirectUrl);
      router.refresh();
    } else {
      setError(result.error || "Đăng nhập thất bại");
    }
  };

  const handleQuickLogin = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError("");
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-[18px] border border-line bg-surface p-7 shadow-2xl shadow-black/40 sm:p-9">
      <div className="mb-7">
        <h1 className="headline text-4xl text-slate-900">Đăng nhập</h1>
        <p className="text-sm text-slate-500 mt-2">Tiếp tục buổi tập của bạn.</p>
      </div>

      {/* Quick credential buttons */}
      <div className="mb-6 rounded-xl border border-line bg-night/40 p-3.5">
        <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Tài khoản mẫu, bấm để điền nhanh</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleQuickLogin("hocvien", "123456")}
            className="text-left px-3 py-2 rounded-lg bg-surface border border-line hover:border-blue-500/60 hover:bg-raised transition-colors text-xs"
          >
            <div className="font-bold text-slate-800">Học viên</div>
            <div className="text-[11px] text-slate-400 font-mono">hocvien / 123456</div>
          </button>
          <button
            type="button"
            onClick={() => handleQuickLogin("admin", "admin123")}
            className="text-left px-3 py-2 rounded-lg bg-surface border border-line hover:border-blue-500/60 hover:bg-raised transition-colors text-xs"
          >
            <div className="font-bold text-slate-800">Quản trị</div>
            <div className="text-[11px] text-slate-400 font-mono">admin / admin123</div>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2.5 animate-fadeIn">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Tên đăng nhập
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="VD: hocvien hoặc admin"
              autoComplete="username"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-line bg-night/60 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 text-sm text-slate-900 placeholder:text-slate-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Mật khẩu
          </label>
          <div className="relative">
            <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-line bg-night/60 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 text-sm text-slate-900 placeholder:text-slate-400 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-blaze w-full mt-3 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Đăng nhập</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-7 pt-5 border-t border-line text-center">
        <p className="text-sm text-slate-500">
          Chưa có tài khoản học viên?{" "}
          <Link
            href={`/register${redirectUrl !== "/" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
            className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 hover:underline ml-1"
          >
            <span>Tạo tài khoản mới</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthShell title="Khởi động trước buổi tập." lead="Đăng nhập để nhận lại chuỗi ngày học, các từ đã thuộc và bài học đang làm dở.">
      <Suspense fallback={<div className="text-slate-400 text-sm">Đang tải...</div>}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
