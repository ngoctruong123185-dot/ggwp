"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Shield,
  GraduationCap,
  Flame,
  Award,
  KeyRound,
  Trash2,
  Eye,
  Plus,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  BookOpen,
  Layers,
  Headphones,
} from "lucide-react";

interface UserProgressSummary {
  itemType: string;
  status: string;
  score: number;
}

interface UserItem {
  id: string;
  username: string;
  displayName: string;
  role: string;
  createdAt: string;
  streak: {
    currentStreak: number;
    lastActiveDate: string;
  } | null;
  progress: UserProgressSummary[];
}

interface DetailProgressItem {
  id: string;
  userId: string;
  itemType: string;
  itemId: string;
  status: string;
  score: number;
  label: string;
  updatedAt: string;
}

interface DetailUser {
  id: string;
  username: string;
  displayName: string;
  role: string;
  createdAt: string;
  streak: {
    currentStreak: number;
    lastActiveDate: string;
  } | null;
  progress: DetailProgressItem[];
}

export function UserManagement({
  initialUsers,
  currentUserId,
}: {
  initialUsers: UserItem[];
  currentUserId: string;
}) {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "ADMIN" | "USER">("ALL");

  // Detail Modal State
  const [selectedUserDetail, setSelectedUserDetail] = useState<DetailUser | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Reset Password Modal State
  const [passwordTargetUser, setPasswordTargetUser] = useState<UserItem | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Create User Modal State
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [createUsername, setCreateUsername] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createDisplayName, setCreateDisplayName] = useState("");
  const [createRole, setCreateRole] = useState<"USER" | "ADMIN">("USER");
  const [createLoading, setCreateLoading] = useState(false);

  // General Notification / Alert
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 4000);
  };

  // Reload Users List from API
  const refreshUsersList = async () => {
    try {
      const res = await fetch("/api/admin");
      if (res.ok) {
        const data = await res.json();
        if (data.users) setUsers(data.users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 1. View User Details
  const handleOpenDetail = async (user: UserItem) => {
    setLoadingDetail(true);
    setSelectedUserDetail(null);
    try {
      const res = await fetch(`/api/admin?detailUserId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setSelectedUserDetail(data.user);
      } else {
        showNotification("error", "Không thể tải chi tiết người dùng");
      }
    } catch {
      showNotification("error", "Lỗi kết nối máy chủ");
    } finally {
      setLoadingDetail(false);
    }
  };

  // 2. Change Role
  const handleToggleRole = async (user: UserItem) => {
    if (user.id === currentUserId) {
      showNotification("error", "Bạn không thể tự thay đổi vai trò của chính mình!");
      return;
    }

    const nextRole = user.role === "ADMIN" ? "USER" : "ADMIN";
    const confirmMsg = `Bạn có chắc muốn đổi vai trò của "${user.displayName}" thành ${
      nextRole === "ADMIN" ? "QUẢN TRỊ VIÊN" : "HỌC VIÊN"
    }?`;

    if (!confirm(confirmMsg)) return;

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_role",
          targetUserId: user.id,
          newRole: nextRole,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showNotification("success", `Đã cập nhật vai trò thành công cho @${user.username}`);
        await refreshUsersList();
      } else {
        showNotification("error", data.error || "Cập nhật vai trò thất bại");
      }
    } catch {
      showNotification("error", "Lỗi kết nối máy chủ");
    }
  };

  // 3. Reset Password
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordTargetUser || !newPassword) return;

    if (newPassword.length < 6) {
      showNotification("error", "Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset_password",
          targetUserId: passwordTargetUser.id,
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showNotification("success", `Đã đặt lại mật khẩu cho @${passwordTargetUser.username}`);
        setPasswordTargetUser(null);
        setNewPassword("");
      } else {
        showNotification("error", data.error || "Đặt lại mật khẩu thất bại");
      }
    } catch {
      showNotification("error", "Lỗi kết nối máy chủ");
    } finally {
      setPasswordLoading(false);
    }
  };

  // 4. Delete User
  const handleDeleteUser = async (user: UserItem) => {
    if (user.id === currentUserId) {
      showNotification("error", "Bạn không thể tự xóa tài khoản của chính mình!");
      return;
    }

    const confirmMsg = `CẢNH BÁO: Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản "${user.displayName}" (@${user.username})? Toàn bộ tiến độ học và streak sẽ bị xoá!`;
    if (!confirm(confirmMsg)) return;

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete_user",
          targetUserId: user.id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showNotification("success", `Đã xóa tài khoản @${user.username}`);
        await refreshUsersList();
      } else {
        showNotification("error", data.error || "Xóa người dùng thất bại");
      }
    } catch {
      showNotification("error", "Lỗi kết nối máy chủ");
    }
  };

  // 5. Create User
  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createUsername.trim() || !createPassword) return;

    setCreateLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_user",
          username: createUsername.trim(),
          password: createPassword,
          displayName: createDisplayName.trim() || createUsername.trim(),
          role: createRole,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showNotification("success", `Đã tạo tài khoản @${createUsername} thành công!`);
        setCreateUserOpen(false);
        setCreateUsername("");
        setCreatePassword("");
        setCreateDisplayName("");
        setCreateRole("USER");
        await refreshUsersList();
      } else {
        showNotification("error", data.error || "Tạo tài khoản thất bại");
      }
    } catch {
      showNotification("error", "Lỗi kết nối máy chủ");
    } finally {
      setCreateLoading(false);
    }
  };

  // Filtered list
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  // Calculate statistics
  const totalUsers = users.length;
  const totalStudents = users.filter((u) => u.role === "USER").length;
  const totalAdmins = users.filter((u) => u.role === "ADMIN").length;
  const maxStreak = Math.max(0, ...users.map((u) => u.streak?.currentStreak || 0));

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-xl border flex items-center gap-3 animate-fadeIn max-w-md ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          )}
          <span className="text-sm font-semibold">{notification.text}</span>
        </div>
      )}

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{totalUsers}</div>
            <div className="text-xs text-slate-500 font-medium">Tổng người dùng</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{totalStudents}</div>
            <div className="text-xs text-slate-500 font-medium">Học viên</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{totalAdmins}</div>
            <div className="text-xs text-slate-500 font-medium">Quản trị viên</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{maxStreak} ngày</div>
            <div className="text-xs text-slate-500 font-medium">Chuỗi streak cao nhất</div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filter & Add Button */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên học viên hoặc @username..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="py-2 px-3 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
          >
            <option value="ALL">Tất cả vai trò</option>
            <option value="USER">Chỉ Học viên</option>
            <option value="ADMIN">Chỉ Quản trị viên</option>
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={refreshUsersList}
            title="Làm mới danh sách"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCreateUserOpen(true)}
            className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-onaccent font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm tài khoản</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500">
                <th className="py-3.5 px-4 sm:px-6">Người dùng</th>
                <th className="py-3.5 px-4">Vai trò</th>
                <th className="py-3.5 px-4">Chuỗi Streak</th>
                <th className="py-3.5 px-4">Tiến độ từ vựng</th>
                <th className="py-3.5 px-4">Ngày tạo</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    Không tìm thấy tài khoản nào phù hợp
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const vocabDone = u.progress.filter(
                    (p) => p.itemType === "vocab" && p.status === "done"
                  ).length;
                  const vocabInProgress = u.progress.filter(
                    (p) => p.itemType === "vocab" && p.status === "in_progress"
                  ).length;
                  const lessonsDone = u.progress.filter(
                    (p) => p.itemType === "lesson" && p.status === "done"
                  ).length;
                  const isCurrent = u.id === currentUserId;
                  const createdDate = new Date(u.createdAt).toLocaleDateString("vi-VN");

                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-onaccent font-bold flex items-center justify-center uppercase shadow-sm text-sm flex-shrink-0">
                            {u.displayName.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 flex items-center gap-1.5 truncate">
                              <span>{u.displayName}</span>
                              {isCurrent && (
                                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.2 rounded border border-slate-200">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 font-mono truncate">
                              @{u.username}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                            u.role === "ADMIN"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {u.role === "ADMIN" ? (
                            <>
                              <Shield className="w-3 h-3" />
                              <span>Quản trị viên</span>
                            </>
                          ) : (
                            <>
                              <GraduationCap className="w-3 h-3" />
                              <span>Học viên</span>
                            </>
                          )}
                        </span>
                      </td>

                      {/* Streak */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>{u.streak?.currentStreak || 0} ngày</span>
                        </div>
                        {u.streak?.lastActiveDate && (
                          <div className="text-[11px] text-slate-400">
                            Gần nhất: {u.streak.lastActiveDate}
                          </div>
                        )}
                      </td>

                      {/* Vocab Progress */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-slate-800">
                            {vocabDone} đã thuộc
                          </div>
                          {vocabInProgress > 0 && (
                            <span className="text-xs text-blue-600 font-medium">
                              ({vocabInProgress} đang học)
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {lessonsDone > 0 ? `${lessonsDone} bài học đã làm` : "Chưa hoàn thành bài"}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-xs text-slate-500">
                        {createdDate}
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenDetail(u)}
                            title="Xem chi tiết tiến độ"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              setPasswordTargetUser(u);
                              setNewPassword("");
                            }}
                            title="Đặt lại mật khẩu"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          >
                            <KeyRound className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleToggleRole(u)}
                            disabled={isCurrent}
                            title={
                              isCurrent
                                ? "Không thể đổi vai trò của chính mình"
                                : u.role === "ADMIN"
                                ? "Hạ quyền xuống Học viên"
                                : "Nâng quyền lên Quản trị viên"
                            }
                            className={`p-1.5 rounded-lg transition-colors ${
                              isCurrent
                                ? "opacity-30 cursor-not-allowed text-slate-400"
                                : "text-slate-500 hover:text-purple-600 hover:bg-purple-50"
                            }`}
                          >
                            <Shield className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteUser(u)}
                            disabled={isCurrent}
                            title={isCurrent ? "Không thể tự xóa chính mình" : "Xóa tài khoản"}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isCurrent
                                ? "opacity-30 cursor-not-allowed text-slate-400"
                                : "text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: USER PROGRESS DETAIL */}
      {(selectedUserDetail || loadingDetail) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-onaccent font-black text-xl flex items-center justify-center uppercase shadow-md">
                  {selectedUserDetail?.displayName.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {selectedUserDetail?.displayName || "Đang tải..."}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono">
                    @{selectedUserDetail?.username} •{" "}
                    {selectedUserDetail?.role === "ADMIN" ? "Quản trị viên" : "Học viên"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedUserDetail(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {loadingDetail ? (
                <div className="py-12 text-center text-slate-400">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <span>Đang tải thông tin chi tiết tiến độ...</span>
                </div>
              ) : selectedUserDetail ? (
                <>
                  {/* Detailed Metric Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                      <div className="text-xl font-black text-slate-900">
                        {
                          selectedUserDetail.progress.filter(
                            (p) => p.itemType === "vocab" && p.status === "done"
                          ).length
                        }
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Từ vựng đã thuộc
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                      <div className="text-xl font-black text-blue-600">
                        {
                          selectedUserDetail.progress.filter(
                            (p) => p.itemType === "vocab" && p.status === "in_progress"
                          ).length
                        }
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Từ đang ôn luyện
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                      <div className="text-xl font-black text-amber-600">
                        {selectedUserDetail.streak?.currentStreak || 0}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Ngày Streak 🔥
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                      <div className="text-xl font-black text-purple-600">
                        {
                          selectedUserDetail.progress.filter((p) => p.itemType === "lesson")
                            .length
                        }
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        Bài học hoàn thành
                      </div>
                    </div>
                  </div>

                  {/* Progress Items List */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span>Danh sách các mục học gần đây ({selectedUserDetail.progress.length})</span>
                    </h4>

                    {selectedUserDetail.progress.length === 0 ? (
                      <div className="py-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-sm">
                        Học viên chưa làm bài tập hoặc học từ vựng nào.
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                        {selectedUserDetail.progress.map((p) => (
                          <div
                            key={p.id}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              {p.itemType === "vocab" && (
                                <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                                  <BookOpen className="w-3.5 h-3.5" />
                                </span>
                              )}
                              {p.itemType === "lesson" && (
                                <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                                  <GraduationCap className="w-3.5 h-3.5" />
                                </span>
                              )}
                              {p.itemType === "radical" && (
                                <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                                  <Layers className="w-3.5 h-3.5" />
                                </span>
                              )}
                              {p.itemType === "dictation" && (
                                <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
                                  <Headphones className="w-3.5 h-3.5" />
                                </span>
                              )}

                              <div>
                                <div className="font-bold text-slate-800 text-sm">
                                  {p.label}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  Loại: {p.itemType} • Cập nhật: {new Date(p.updatedAt).toLocaleString("vi-VN")}
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                  p.status === "done"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {p.status === "done" ? "Đã xong" : "Đang học"}
                              </span>
                              {p.score > 0 && (
                                <div className="text-[11px] font-bold text-slate-600 mt-0.5">
                                  {p.score} điểm
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedUserDetail(null)}
                className="py-2 px-5 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-sm text-slate-700"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: RESET PASSWORD */}
      {passwordTargetUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Đặt lại mật khẩu</h3>
                  <p className="text-xs text-slate-400">Cho @{passwordTargetUser.username}</p>
                </div>
              </div>
              <button
                onClick={() => setPasswordTargetUser(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập ít nhất 6 ký tự..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPasswordTargetUser(null)}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-onaccent font-bold text-sm shadow-md transition-all disabled:opacity-50"
                >
                  {passwordLoading ? "Đang lưu..." : "Xác nhận đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CREATE NEW USER */}
      {createUserOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Thêm tài khoản mới</h3>
                  <p className="text-xs text-slate-400">Tạo trực tiếp từ quyền Quản trị</p>
                </div>
              </div>
              <button
                onClick={() => setCreateUserOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Tên hiển thị / Biệt hiệu
                </label>
                <input
                  type="text"
                  value={createDisplayName}
                  onChange={(e) => setCreateDisplayName(e.target.value)}
                  placeholder="VD: Trần Thị B"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Tên đăng nhập <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={createUsername}
                  onChange={(e) => setCreateUsername(e.target.value)}
                  placeholder="Ít nhất 3 ký tự (chữ hoặc số)..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Mật khẩu <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                  placeholder="Ít nhất 6 ký tự..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">
                  Vai trò
                </label>
                <select
                  value={createRole}
                  onChange={(e) => setCreateRole(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm bg-white"
                >
                  <option value="USER">Học viên (USER)</option>
                  <option value="ADMIN">Quản trị viên (ADMIN)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateUserOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-onaccent font-bold text-sm shadow-md transition-all disabled:opacity-50"
                >
                  {createLoading ? "Đang tạo..." : "Tạo tài khoản"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
