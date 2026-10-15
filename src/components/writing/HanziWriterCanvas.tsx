"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Play,
  RotateCcw,
  Eye,
  EyeOff,
  PenTool,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Volume2,
} from "lucide-react";
import { AudioButton } from "@/components/audio/AudioButton";

interface HanziWriterCanvasProps {
  hanzi: string;
  pinyin?: string;
  meaning?: string;
  size?: number;
  onComplete?: () => void;
}

export function HanziWriterCanvas({
  hanzi,
  pinyin,
  meaning,
  size = 280,
  onComplete,
}: HanziWriterCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);

  const [isQuizMode, setIsQuizMode] = useState(false);
  const [showOutline, setShowOutline] = useState(true);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [totalMistakes, setTotalMistakes] = useState(0);
  const [strokeCount, setStrokeCount] = useState<number | null>(null);
  const [hintAfterMistakes, setHintAfterMistakes] = useState(3);
  const [quizComplete, setQuizComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initWriter() {
      if (!containerRef.current) return;
      setIsLoading(true);
      setLoadError(false);
      setQuizComplete(false);
      setMistakeCount(0);
      setTotalMistakes(0);

      try {
        const HanziWriter = (await import("hanzi-writer")).default;

        // Clear any previous svg
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }

        const writer = HanziWriter.create(containerRef.current, hanzi, {
          width: size,
          height: size,
          padding: 20,
          showOutline: showOutline,
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 200,
          strokeColor: "#1d4ed8", // blue-700
          radicalColor: "#059669", // emerald-600
          outlineColor: "#cbd5e1", // slate-300
          drawingColor: "#2563eb", // blue-600
          drawingWidth: 16,
          showHintAfterMisses: hintAfterMistakes,
          highlightOnComplete: true,
          onLoadCharDataSuccess: (data: any) => {
            if (isMounted && data?.strokes) {
              setStrokeCount(data.strokes.length);
              setIsLoading(false);
            }
          },
          onLoadCharDataError: () => {
            if (isMounted) {
              setLoadError(true);
              setIsLoading(false);
            }
          },
        });

        writerRef.current = writer;
        if (isMounted) setIsLoading(false);
      } catch (err) {
        console.error("Failed to initialize HanziWriter:", err);
        if (isMounted) {
          setLoadError(true);
          setIsLoading(false);
        }
      }
    }

    initWriter();

    return () => {
      isMounted = false;
      if (writerRef.current) {
        writerRef.current.cancelQuiz?.();
      }
    };
  }, [hanzi, size]);

  // Animate strokes
  const handleAnimate = () => {
    if (!writerRef.current) return;
    writerRef.current.cancelQuiz?.();
    setIsQuizMode(false);
    writerRef.current.animateCharacter();
  };

  // Start Quiz mode
  const handleStartQuiz = () => {
    if (!writerRef.current) return;
    setIsQuizMode(true);
    setQuizComplete(false);
    setMistakeCount(0);
    setTotalMistakes(0);

    writerRef.current.quiz({
      showOutline: showOutline,
      showHintAfterMisses: hintAfterMistakes,
      onMistake: (strokeData: any) => {
        setMistakeCount((prev) => prev + 1);
        setTotalMistakes((prev) => prev + 1);
      },
      onCorrectStroke: () => {
        setMistakeCount(0);
      },
      onComplete: (summary: any) => {
        setQuizComplete(true);
        setIsQuizMode(false);
        onComplete?.();
      },
    });
  };

  // Reset character
  const handleReset = () => {
    if (!writerRef.current) return;
    writerRef.current.cancelQuiz?.();
    setIsQuizMode(false);
    setQuizComplete(false);
    setMistakeCount(0);
    setTotalMistakes(0);
    writerRef.current.showCharacter();
  };

  // Toggle outline
  const handleToggleOutline = () => {
    const newShow = !showOutline;
    setShowOutline(newShow);
    if (!writerRef.current) return;
    if (newShow) {
      writerRef.current.showOutline();
    } else {
      writerRef.current.hideOutline();
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-md p-6 max-w-md mx-auto space-y-5">
      {/* Header with pronunciation & stroke info */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-slate-900 hanzi-font">
              {hanzi}
            </span>
            <AudioButton text={hanzi} size="sm" />
          </div>
          {pinyin && <div className="text-sm font-bold text-blue-600">{pinyin}</div>}
          {meaning && <div className="text-xs text-slate-500">{meaning}</div>}
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-slate-400 block">Số nét</span>
          <span className="text-lg font-black text-slate-800">
            {strokeCount !== null ? `${strokeCount} nét` : "..."}
          </span>
        </div>
      </div>

      {/* Grid Canvas (田字格 Tianzige background) */}
      <div className="flex justify-center relative">
        <div
          className="relative rounded-2xl border-2 border-dashed border-rose-300 bg-rose-50/30 overflow-hidden shadow-inner flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          {/* Tianzige guidelines */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-center">
            <div className="w-full border-t border-dashed border-rose-200" />
          </div>
          <div className="absolute inset-0 pointer-events-none flex justify-center">
            <div className="h-full border-l border-dashed border-rose-200" />
          </div>

          {/* HanziWriter target element */}
          <div ref={containerRef} className="relative z-10 cursor-crosshair" />

          {/* Loading / Error overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-slate-500 z-20">
              Đang tải nét vẽ...
            </div>
          )}
          {loadError && (
            <div className="absolute inset-0 bg-white/90 p-4 flex flex-col items-center justify-center text-center text-xs text-slate-500 z-20">
              <AlertCircle className="w-6 h-6 text-amber-500 mb-1" />
              <span>Chưa có dữ liệu nét của chữ này. Bạn vẫn có thể xem chữ mẫu.</span>
            </div>
          )}
        </div>
      </div>

      {/* Status banner */}
      {isQuizMode && (
        <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-center text-xs text-blue-800 font-semibold space-y-1">
          <div>Chế độ tập viết: Hãy vẽ từng nét theo thứ tự chuẩn!</div>
          <div className="text-[11px] text-blue-600">
            Số lỗi đã sai: <span className="font-bold">{totalMistakes}</span>
            {hintAfterMistakes && (
              <span> (Gợi ý sau {hintAfterMistakes} lần sai liên tiếp)</span>
            )}
          </div>
        </div>
      )}

      {quizComplete && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800 font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Xuất sắc! Bạn đã viết đúng thứ tự nét chữ {hanzi}!</span>
        </div>
      )}

      {/* Control Actions */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={handleAnimate}
          disabled={isLoading}
          className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Xem nét mẫu</span>
        </button>

        <button
          onClick={handleStartQuiz}
          disabled={isLoading}
          className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-onaccent font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Bắt đầu tự viết</span>
        </button>

        <button
          onClick={handleToggleOutline}
          disabled={isLoading}
          className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          {showOutline ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showOutline ? "Ẩn nét mờ" : "Hiện nét mờ"}</span>
        </button>

        <button
          onClick={handleReset}
          disabled={isLoading}
          className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Làm lại / Reset</span>
        </button>
      </div>

      {/* Mistake hint tolerance slider */}
      <div className="pt-2 border-t border-slate-100 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Gợi ý sau số lần sai:</span>
          <span className="font-bold text-blue-600">{hintAfterMistakes} lần</span>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          value={hintAfterMistakes}
          onChange={(e) => setHintAfterMistakes(parseInt(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>1 (Dễ nhất)</span>
          <span>3 (Chuẩn)</span>
          <span>5 (Thử thách)</span>
        </div>
      </div>
    </div>
  );
}
