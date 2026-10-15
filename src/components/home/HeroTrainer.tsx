"use client";

import React, { useEffect, useRef, useState } from "react";
import { LIAN_STROKE_DATA } from "./lian-strokes";

const TOTAL_STROKES = LIAN_STROKE_DATA.strokes.length; // 8

function cssColor(name: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v ? `rgb(${v.split(/\s+/).join(",")})` : "#ff6a1a";
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Home hero: draws 练 ("luyện" — to train) stroke by stroke on a tianzige grid,
 * with a lap-style stroke counter. Re-renders its colours when the theme changes.
 */
export function HeroTrainer() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [stroke, setStroke] = useState(0);
  const [themeKey, setThemeKey] = useState(0);

  useEffect(() => {
    const mo = new MutationObserver(() => setThemeKey((k) => k + 1));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const HanziWriter = (await import("hanzi-writer")).default;
      const el = targetRef.current;
      if (cancelled || !el) return;
      el.innerHTML = "";
      const size = el.clientWidth || 280;

      const writer = HanziWriter.create(el, "练", {
        width: size,
        height: size,
        padding: Math.round(size * 0.07),
        showCharacter: false,
        showOutline: true,
        strokeColor: cssColor("--c-blue-500"),
        radicalColor: cssColor("--c-amber-500"),
        outlineColor: cssColor("--c-slate-200"),
        strokeAnimationSpeed: 1.15,
        delayBetweenStrokes: 90,
        charDataLoader: (_char, onComplete) => {
          onComplete(LIAN_STROKE_DATA as unknown as Parameters<typeof onComplete>[0]);
        },
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        writer.showCharacter();
        setStroke(TOTAL_STROKES);
        return;
      }

      await wait(500);
      while (!cancelled) {
        setStroke(0);
        for (let i = 0; i < TOTAL_STROKES && !cancelled; i++) {
          await writer.animateStroke(i);
          if (!cancelled) setStroke(i + 1);
        }
        await wait(2200);
        if (cancelled) break;
        await writer.hideCharacter({ duration: 450 });
        await wait(500);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [themeKey]);

  const done = stroke === TOTAL_STROKES;

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* jersey-number slab behind the card */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-6 top-10 bottom-[-18px] -skew-x-[10deg] rounded-[20px] bg-blue-500/15 stripes"
      />

      <figure className="relative rounded-[20px] border border-line bg-surface p-5 shadow-2xl shadow-black/40">
        <figcaption className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="hanzi-sans text-2xl font-bold text-slate-900">练</span>
              <span className="font-display text-xl font-semibold italic text-blue-600">liàn</span>
            </div>
            <p className="text-sm text-slate-500">luyện, tập luyện</p>
          </div>
          <div className="text-right" aria-live="polite">
            <div className="text-[11px] font-semibold text-slate-400">Nét</div>
            <div className="num text-3xl font-bold leading-none text-slate-900">
              <span className={done ? "text-emerald-600" : "text-blue-600"}>
                {String(stroke).padStart(2, "0")}
              </span>
              <span className="text-slate-300">/{String(TOTAL_STROKES).padStart(2, "0")}</span>
            </div>
          </div>
        </figcaption>

        {/* tianzige practice square */}
        <div className="relative mt-4 aspect-square w-full rounded-xl border border-line bg-night/60 tianzige">
          <div ref={targetRef} className="absolute inset-0" role="img" aria-label="Chữ 练 được viết từng nét" />
        </div>

        {/* stroke segments */}
        <div className="mt-4 grid grid-cols-8 gap-1.5" aria-hidden="true">
          {Array.from({ length: TOTAL_STROKES }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 -skew-x-[24deg] rounded-[1px] transition-colors duration-300 ${
                i < stroke ? (i < 3 ? "bg-amber-500" : "bg-blue-500") : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          Ba nét màu vàng là bộ <span className="font-semibold text-amber-600">纟</span> (Mịch, sợi tơ) chỉ
          nghĩa; phần bên phải gợi cách đọc.
        </p>
      </figure>
    </div>
  );
}
