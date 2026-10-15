"use client";

import React, { useState } from "react";
import { Users, Database, Video, BookOpen } from "lucide-react";
import { UserManagement } from "./UserManagement";
import { AdminForm } from "./AdminForm";

export function AdminDashboard({
  lessons,
  users,
  currentUserId,
}: {
  lessons: any[];
  users: any[];
  currentUserId: string;
}) {
  const [activeTab, setActiveTab] = useState<"users" | "content">("users");

  return (
    <div className="space-y-8">
      {/* Tab Navigation Buttons */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "users"
                ? "bg-white text-blue-600 shadow-md shadow-slate-200/50"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Kiểm tra & Quản lý tài khoản ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "content"
                ? "bg-white text-blue-600 shadow-md shadow-slate-200/50"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Thêm nội dung bài học</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "users" ? (
        <UserManagement initialUsers={users} currentUserId={currentUserId} />
      ) : (
        <div className="max-w-3xl mx-auto">
          <AdminForm lessons={lessons} />
        </div>
      )}
    </div>
  );
}
