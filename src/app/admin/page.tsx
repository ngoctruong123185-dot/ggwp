import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { AdminDashboard } from "./AdminDashboard";
import { Shield } from "lucide-react";

export const revalidate = 0;

export default async function AdminPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/");
  }

  const [lessons, rawUsers] = await Promise.all([
    prisma.lesson.findMany({
      orderBy: { order: "asc" },
      include: { level: true },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        displayName: true,
        role: true,
        createdAt: true,
        streak: {
          select: {
            currentStreak: true,
            lastActiveDate: true,
          },
        },
        progress: {
          select: {
            itemType: true,
            status: true,
            score: true,
          },
        },
      },
    }),
  ]);

  const users = rawUsers.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="max-w-2xl space-y-3">
        <h1 className="headline text-5xl text-slate-900 sm:text-6xl">
          Quản trị
        </h1>
        <p className="text-lg text-slate-500">
          Kiểm tra tài khoản, theo dõi tiến độ học viên và cập nhật nội dung bài học chạy trên máy chủ này.
        </p>
      </div>

      <AdminDashboard
        lessons={lessons}
        users={users}
        currentUserId={currentUser.id}
      />
    </div>
  );
}
