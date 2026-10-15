"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthShell } from "@/components/auth/AuthShell";
import { UserPlus, KeyRound, User, AlertCircle, ArrowLeft, Smile } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const { register } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (username.trim().length < 3) {
      setError("Tên đăng nhập phải có ít nhất 3 ký tự");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    const result = await register(
      username.trim(),
      password,
      displayName.trim() || username.trim()
    );
    setLoading(false);

    if (result.success) {
      router.push(redirectUrl);
      router.refresh();
    } else {
      setError(result.error || "Đăng ký thất bại");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-[18px] border border-line bg-surface p-7 shadow-2xl shadow-black/40 sm:p-9">
      <div className="mb-7">
        <h1 className="headline text-4xl text-slate-900">Tạo tài khoản</h1>
        <p className="text-sm text-slate-500 mt-2">Tài khoản học viên mới, lưu trên máy chủ cục bộ.</p>
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
            Tên hiển thị (Biệt danh)
          </label>
          <div className="relative">
            <Smile className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="VD: Nguyễn Văn A (hoặc để trống)"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-line bg-night/60 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 text-sm text-slate-900 placeholder:text-slate-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Tên đăng nhập <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ít nhất 3 ký tự (chữ hoặc số)"
              autoComplete="username"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-line bg-night/60 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 text-sm text-slate-900 placeholder:text-slate-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Mật khẩu <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ít nhất 6 ký tự"
              autoComplete="new-password"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-line bg-night/60 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 text-sm text-slate-900 placeholder:text-slate-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Xác nhận mật khẩu <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu phía trên"
              autoComplete="new-password"
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
              <UserPlus className="w-4 h-4" />
              <span>Đăng ký & Bắt đầu học</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-7 pt-5 border-t border-line text-center">
        <p className="text-sm text-slate-500">
          Đã có tài khoản?{" "}
          <Link
            href={`/login${redirectUrl !== "/" ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`}
            className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 hover:underline ml-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Đăng nhập ngay</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <AuthShell title="Ghi danh, rồi vào tập." lead="Một tài khoản riêng để theo dõi từng từ đã thuộc, từng bài đã xong và chuỗi ngày học liên tục của bạn.">
      <Suspense fallback={<div className="text-slate-400 text-sm">Đang tải...</div>}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
