import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { LessonSidebar } from "@/components/layout/LessonSidebar";
import { VocabularyView } from "../VocabularyView";

export const revalidate = 0;

export default async function ExerciseDirectPage({
  params,
}: {
  params: { lessonId: string; exerciseType: string };
}) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    include: {
      level: true,
      grammars: true,
      vocabItems: {
        orderBy: { order: "asc" },
        include: {
          meanings: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!lesson) {
    notFound();
  }

  const levelLessons = await prisma.lesson.findMany({
    where: { levelId: lesson.levelId },
    orderBy: { order: "asc" },
  });

  const user = await getCurrentUser();
  const userId = user?.id || "";

  const lessonProgress = userId
    ? await prisma.userProgress.findMany({
        where: {
          userId,
          itemType: "lesson",
          itemId: { in: levelLessons.map((l) => l.id) },
        },
      })
    : [];

  const progressMap: Record<string, { status: string; score: number }> = {};
  lessonProgress.forEach((p) => {
    progressMap[p.itemId] = { status: p.status, score: p.score };
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      <LessonSidebar
        currentLessonId={lesson.id}
        levelName={lesson.level.name}
        levelId={lesson.levelId}
        lessons={levelLessons}
        progressMap={progressMap}
      />

      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 space-y-6 max-w-5xl mx-auto">
        <VocabularyView
          lesson={lesson}
          vocabDoneCount={0}
          vocabInProgressCount={0}
          vocabNotStartedCount={lesson.vocabItems.length}
          initialTab="practice"
          initialExercise={params.exerciseType}
        />
      </div>
    </div>
  );
}
