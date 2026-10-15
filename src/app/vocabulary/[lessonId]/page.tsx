import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { LessonSidebar } from "@/components/layout/LessonSidebar";
import { PlayAllVocabBar } from "@/components/audio/PlayAllVocabBar";
import { AudioButton } from "@/components/audio/AudioButton";
import { VocabularyView } from "./VocabularyView";

export const revalidate = 0;

export default async function LessonVocabularyPage({
  params,
  searchParams,
}: {
  params: { lessonId: string };
  searchParams: { tab?: string; ex?: string };
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

  // Get all lessons in this level for the sidebar
  const levelLessons = await prisma.lesson.findMany({
    where: { levelId: lesson.levelId },
    orderBy: { order: "asc" },
  });

  // Get current user
  const user = await getCurrentUser();
  const userId = user?.id || "";

  // Get user progress for all lessons in this level
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

  // Get progress for vocab items in this lesson
  const vocabProgress = userId
    ? await prisma.userProgress.findMany({
        where: {
          userId,
          itemType: "vocab",
          itemId: { in: lesson.vocabItems.map((v) => v.id) },
        },
      })
    : [];

  const vocabDoneCount = vocabProgress.filter((p) => p.status === "done").length;
  const vocabInProgressCount = vocabProgress.filter(
    (p) => p.status === "in_progress"
  ).length;
  const vocabNotStartedCount =
    lesson.vocabItems.length - vocabDoneCount - vocabInProgressCount;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Left Sidebar */}
      <LessonSidebar
        currentLessonId={lesson.id}
        levelName={lesson.level.name}
        levelId={lesson.levelId}
        lessons={levelLessons}
        progressMap={progressMap}
      />

      {/* Main Lesson Content Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 space-y-6 max-w-5xl mx-auto">
        {/* Client Interactive View */}
        <VocabularyView
          lesson={lesson}
          vocabDoneCount={vocabDoneCount}
          vocabInProgressCount={vocabInProgressCount}
          vocabNotStartedCount={vocabNotStartedCount}
          initialTab={searchParams.tab || "vocab"}
          initialExercise={searchParams.ex}
        />
      </div>
    </div>
  );
}
