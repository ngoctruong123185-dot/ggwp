import { pinyin } from "pinyin-pro";

export function getPinyinWithTone(text: string): string {
  if (!text) return "";
  return pinyin(text, { toneType: "symbol" });
}

export function getPinyinWithoutTone(text: string): string {
  if (!text) return "";
  return pinyin(text, { toneType: "none" }).toLowerCase();
}

export function getPinyinWithToneNumber(text: string): string {
  if (!text) return "";
  return pinyin(text, { toneType: "num" });
}

export function normalizeInput(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[，。！？,.!?\s]/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function checkChineseMatch(input: string, target: string): boolean {
  const cleanInput = input.trim().replace(/[，。！？,.!?\s]/g, "");
  const cleanTarget = target.trim().replace(/[，。！？,.!?\s]/g, "");
  return cleanInput === cleanTarget;
}
