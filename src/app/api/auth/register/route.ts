import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, createToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, displayName } = body;

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

    const existingUser = await prisma.user.findUnique({
      where: { username: cleanUsername },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Tên đăng nhập đã được sử dụng. Vui lòng chọn tên khác." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const finalDisplayName = (displayName && displayName.trim()) || cleanUsername;

    const today = new Date().toISOString().slice(0, 10);

    const newUser = await prisma.user.create({
      data: {
        username: cleanUsername,
        passwordHash,
        displayName: finalDisplayName,
        role: "USER",
        streak: {
          create: {
            currentStreak: 1,
            lastActiveDate: today,
          },
        },
      },
    });

    const token = await createToken({
      id: newUser.id,
      username: newUser.username,
      displayName: newUser.displayName,
      role: newUser.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        displayName: newUser.displayName,
        role: newUser.role,
      },
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi trong quá trình đăng ký tài khoản" },
      { status: 500 }
    );
  }
}
