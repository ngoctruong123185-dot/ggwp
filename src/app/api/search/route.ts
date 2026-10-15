import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim() || "";

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    // Search in VocabItems (hanzi, pinyin, or meaningVi)
    const items = await prisma.vocabItem.findMany({
      where: {
        OR: [
          { hanzi: { contains: query } },
          { pinyin: { contains: query } },
          { exampleSentence: { contains: query } },
          {
            meanings: {
              some: {
                meaningVi: { contains: query },
              },
            },
          },
        ],
      },
      include: {
        meanings: true,
        lesson: {
          include: {
            level: true,
          },
        },
      },
      take: 20,
    });

    // Also search in Radicals
    const radicals = await prisma.radical.findMany({
      where: {
        OR: [
          { hanzi: { contains: query } },
          { meaning: { contains: query } },
          { pinyin: { contains: query } },
        ],
      },
      include: {
        theme: true,
      },
      take: 10,
    });

    return NextResponse.json({ results: items, radicals });
  } catch (error) {
    console.error("Error in search:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
