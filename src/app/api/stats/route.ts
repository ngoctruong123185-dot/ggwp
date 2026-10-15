import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();

    const [totalVocab, totalLessons, totalRadicals, totalDictation] =
      await Promise.all([
        prisma.vocabItem.count(),
        prisma.lesson.count(),
        prisma.radical.count(),
        prisma.dictationVideo.count(),
      ]);

    let completedVocab = 0;
    let currentStreak = 0;

    if (user) {
      const [userCompletedVocab, streak] = await Promise.all([
        prisma.userProgress.count({
          where: { userId: user.id, itemType: "vocab", status: "done" },
        }),
        prisma.userStreak.findUnique({
          where: { userId: user.id },
        }),
      ]);
      completedVocab = userCompletedVocab;
      currentStreak = streak?.currentStreak ?? 1;
    }

    return NextResponse.json({
      totalVocab,
      totalLessons,
      totalRadicals,
      totalDictation,
      completedVocab,
      streak: currentStreak,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
