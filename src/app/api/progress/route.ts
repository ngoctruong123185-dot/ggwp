import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const itemType = searchParams.get("itemType");
    const itemId = searchParams.get("itemId");

    const whereClause: any = { userId: user.id };
    if (itemType) whereClause.itemType = itemType;
    if (itemId) whereClause.itemId = itemId;

    const [progressList, streak] = await Promise.all([
      prisma.userProgress.findMany({ where: whereClause }),
      prisma.userStreak.findUnique({ where: { userId: user.id } }),
    ]);

    return NextResponse.json({ progress: progressList, streak });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { itemType, itemId, status = "done", score = 100 } = body;

    if (!itemType || !itemId) {
      return NextResponse.json({ error: "itemType and itemId are required" }, { status: 400 });
    }

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_itemType_itemId: {
          userId: user.id,
          itemType,
          itemId,
        },
      },
      update: {
        status,
        score: Math.max(score, 0),
      },
      create: {
        userId: user.id,
        itemType,
        itemId,
        status,
        score,
      },
    });

    // Check streak
    const today = new Date().toISOString().slice(0, 10);
    const existingStreak = await prisma.userStreak.findUnique({
      where: { userId: user.id },
    });

    let updatedStreak = 1;
    if (existingStreak) {
      if (existingStreak.lastActiveDate !== today) {
        // Increment streak if active today
        updatedStreak = existingStreak.currentStreak + 1;
        await prisma.userStreak.update({
          where: { userId: user.id },
          data: { currentStreak: updatedStreak, lastActiveDate: today },
        });
      } else {
        updatedStreak = existingStreak.currentStreak;
      }
    } else {
      await prisma.userStreak.create({
        data: { userId: user.id, currentStreak: 1, lastActiveDate: today },
      });
    }

    return NextResponse.json({ success: true, progress, streak: updatedStreak });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
