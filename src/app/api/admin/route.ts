import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, hashPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Chỉ quản trị viên mới có quyền xem thông tin này" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const detailUserId = searchParams.get("detailUserId");

    // If detail for a specific user is requested
    if (detailUserId) {
      const targetUser = await prisma.user.findUnique({
        where: { id: detailUserId },
        select: {
          id: true,
          username: true,
          displayName: true,
          role: true,
          createdAt: true,
          streak: true,
          progress: {
            orderBy: { updatedAt: "desc" },
            take: 50,
          },
        },
      });

      if (!targetUser) {
        return NextResponse.json({ error: "Không tìm thấy người dùng" }, { status: 404 });
      }

      // Gather item names for progress display
      const vocabIds = targetUser.progress
        .filter((p) => p.itemType === "vocab")
        .map((p) => p.itemId);
      const lessonIds = targetUser.progress
        .filter((p) => p.itemType === "lesson")
        .map((p) => p.itemId);

      const [vocabs, lessons] = await Promise.all([
        prisma.vocabItem.findMany({
          where: { id: { in: vocabIds } },
          select: { id: true, hanzi: true, pinyin: true },
        }),
        prisma.lesson.findMany({
          where: { id: { in: lessonIds } },
          select: { id: true, title: true, titleVi: true },
        }),
      ]);

      const vocabMap = new Map(vocabs.map((v) => [v.id, v]));
      const lessonMap = new Map(lessons.map((l) => [l.id, l]));

      const enrichedProgress = targetUser.progress.map((p) => {
        let label = p.itemId;
        if (p.itemType === "vocab" && vocabMap.has(p.itemId)) {
          const v = vocabMap.get(p.itemId)!;
          label = `${v.hanzi} (${v.pinyin})`;
        } else if (p.itemType === "lesson" && lessonMap.has(p.itemId)) {
          const l = lessonMap.get(p.itemId)!;
          label = `${l.title} - ${l.titleVi}`;
        }
        return {
          ...p,
          label,
        };
      });

      return NextResponse.json({
        user: {
          ...targetUser,
          progress: enrichedProgress,
        },
      });
    }

    // List all users
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        displayName: true,
        role: true,
        createdAt: true,
        streak: true,
        progress: {
          select: {
            itemType: true,
            status: true,
            score: true,
          },
        },
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Admin API GET error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Chỉ quản trị viên mới có quyền thực hiện thao tác này" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { action } = body;

    // 1. Create a new user from Admin panel
    if (action === "create_user") {
      const { username, password, displayName, role = "USER" } = body;

      if (!username || !password) {
        return NextResponse.json(
          { error: "Vui lòng nhập tên đăng nhập và mật khẩu" },
          { status: 400 }
        );
      }

      const cleanUsername = username.toLowerCase().trim();
      if (cleanUsername.length < 3) {
        return NextResponse.json(
          { error: "Tên đăng nhập phải có ít nhất 3 ký tự" },
          { status: 400 }
        );
      }

      if (password.length < 6) {
        return NextResponse.json(
          { error: "Mật khẩu phải có ít nhất 6 ký tự" },
          { status: 400 }
        );
      }

      const existing = await prisma.user.findUnique({
        where: { username: cleanUsername },
      });
      if (existing) {
        return NextResponse.json(
          { error: "Tên đăng nhập này đã tồn tại" },
          { status: 409 }
        );
      }

      const passwordHash = await hashPassword(password);
      const today = new Date().toISOString().slice(0, 10);

      const newUser = await prisma.user.create({
        data: {
          username: cleanUsername,
          passwordHash,
          displayName: (displayName && displayName.trim()) || cleanUsername,
          role: role === "ADMIN" ? "ADMIN" : "USER",
          streak: {
            create: {
              currentStreak: 1,
              lastActiveDate: today,
            },
          },
        },
        select: {
          id: true,
          username: true,
          displayName: true,
          role: true,
          createdAt: true,
          streak: true,
        },
      });

      return NextResponse.json({ success: true, user: newUser });
    }

    // 2. Update user role
    if (action === "update_role") {
      const { targetUserId, newRole } = body;
      if (!targetUserId || !newRole) {
        return NextResponse.json({ error: "Thiếu thông tin yêu cầu" }, { status: 400 });
      }

      if (targetUserId === user.id) {
        return NextResponse.json(
          { error: "Bạn không thể tự thay đổi vai trò của chính mình" },
          { status: 400 }
        );
      }

      if (newRole !== "ADMIN" && newRole !== "USER") {
        return NextResponse.json({ error: "Vai trò không hợp lệ" }, { status: 400 });
      }

      const updated = await prisma.user.update({
        where: { id: targetUserId },
        data: { role: newRole },
      });

      return NextResponse.json({ success: true, user: updated });
    }

    // 3. Reset password
    if (action === "reset_password") {
      const { targetUserId, newPassword } = body;
      if (!targetUserId || !newPassword) {
        return NextResponse.json({ error: "Thiếu thông tin yêu cầu" }, { status: 400 });
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: "Mật khẩu mới phải có ít nhất 6 ký tự" },
          { status: 400 }
        );
      }

      const passwordHash = await hashPassword(newPassword);
      await prisma.user.update({
        where: { id: targetUserId },
        data: { passwordHash },
      });

      return NextResponse.json({ success: true });
    }

    // 4. Delete user
    if (action === "delete_user") {
      const { targetUserId } = body;
      if (!targetUserId) {
        return NextResponse.json({ error: "Thiếu ID người dùng cần xóa" }, { status: 400 });
      }

      if (targetUserId === user.id) {
        return NextResponse.json(
          { error: "Bạn không thể tự xóa tài khoản quản trị của chính mình" },
          { status: 400 }
        );
      }

      await prisma.user.delete({
        where: { id: targetUserId },
      });

      return NextResponse.json({ success: true });
    }

    // 5. Add dictation
    if (action === "add_dictation") {
      const { youtubeId, title, level, channelName, transcript } = body;
      const newVideo = await prisma.dictationVideo.create({
        data: {
          id: `dict-${Date.now()}`,
          youtubeId,
          title,
          level,
          channelName: channelName || "Người dùng đóng góp",
          transcript: JSON.stringify(transcript),
          isFreeTrial: true,
        },
      });
      return NextResponse.json({ success: true, video: newVideo });
    }

    // 6. Add vocab
    if (action === "add_vocab") {
      const {
        lessonId,
        hanzi,
        pinyin,
        meaningVi,
        wordClass,
        exampleSentence,
        exampleSentenceVi,
      } = body;
      const vocabId = `vocab-${Date.now()}`;

      const newVocab = await prisma.vocabItem.create({
        data: {
          id: vocabId,
          lessonId,
          hanzi,
          pinyin,
          order: 99,
          exampleSentence,
          exampleSentenceVi,
          meanings: {
            create: {
              id: `meaning-${Date.now()}`,
              wordClass: wordClass || "Từ vựng",
              meaningVi,
              order: 1,
            },
          },
        },
        include: { meanings: true },
      });
      return NextResponse.json({ success: true, vocab: newVocab });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("Admin API Error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
