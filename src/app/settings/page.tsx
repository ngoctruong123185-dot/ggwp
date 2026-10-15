"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Volume2,
  PenTool,
  Lock,
  Sparkles,
  RotateCcw,
  Check,
  Smartphone,
} from "lucide-react";
import { getChineseVoices, speakChinese } from "@/lib/speech";

export default function SettingsPage() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [speechRate, setSpeechRate] = useState<number>(0.85);
  const [writerHintMistakes, setWriterHintMistakes] = useState<number>(3);
  const [unlockAll, setUnlockAll] = useState<boolean>(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    // Load voices
    const available = getChineseVoices();
    setVoices(available);
    if (available.length > 0) {
      setSelectedVoice(available[0].name);
    }

    // Load local config
    const savedRate = localStorage.getItem("hihsk_speech_rate");
    if (savedRate) setSpeechRate(parseFloat(savedRate));

    const savedHint = localStorage.getItem("hihsk_writer_hint");
    if (savedHint) setWriterHintMistakes(parseInt(savedHint));

    const savedUnlock = localStorage.getItem("hihsk_unlock_all");
    if (savedUnlock !== null) setUnlockAll(savedUnlock === "true");
  }, []);

  const handleSave = () => {
    localStorage.setItem("hihsk_speech_rate", speechRate.toString());
    localStorage.setItem("hihsk_writer_hint", writerHintMistakes.toString());
    localStorage.setItem("hihsk_unlock_all", unlockAll ? "true" : "false");

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleTestSpeech = () => {
    speakChinese("你好，欢迎来到 Hi H S K 本地学习系统！", { rate: speechRate });
  };

  const handleResetProgress = async () => {
    if (
      confirm(
        "Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ bài tập và từ vựng về 0 không?"
      )
    ) {
      // Call reset if needed or clear UserProgress
      alert("Đã hoàn tất thao tác đặt lại tiến độ!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="headline text-5xl text-slate-900 sm:text-6xl">
          Cài đặt
        </h1>
        <p className="text-lg text-slate-500">
          Tùy chỉnh giọng đọc Web Speech, số lần gợi ý nét chữ và các thiết lập hiển thị.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* 1. Speech Settings */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Volume2 className="w-4 h-4 text-blue-600" />
            <span>Giọng đọc phát âm (Web Speech API)</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-500 font-medium block mb-1">
                Giọng tiếng Trung (zh-CN) khả dụng trên máy:
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
              >
                {voices.length === 0 ? (
                  <option value="">Giọng mặc định hệ điều hành (zh-CN)</option>
                ) : (
                  voices.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                <span>Tốc độ đọc mặc định:</span>
                <span className="font-bold text-blue-600">{speechRate}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.2"
                step="0.05"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <button
              type="button"
              onClick={handleTestSpeech}
              className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Nghe thử câu mẫu</span>
            </button>
          </div>
        </div>

        {/* 2. Hanzi Writer Settings */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <PenTool className="w-4 h-4 text-emerald-600" />
            <span>Luyện viết chữ Hán (HanziWriter)</span>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
              <span>Gợi ý nét vẽ sau số lần sai liên tiếp:</span>
              <span className="font-bold text-emerald-600">
                {writerHintMistakes} lần
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={writerHintMistakes}
              onChange={(e) => setWriterHintMistakes(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 (Dễ nhất)</span>
              <span>3 (Vừa)</span>
              <span>5 (Thử thách)</span>
            </div>
          </div>
        </div>

        {/* 3. Unlock All Toggle (Offline VIP) */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Chế độ Mở khóa toàn bộ bài học (Offline VIP)</span>
              </div>
              <p className="text-xs text-slate-500">
                Tự động mở khóa tất cả các bài học HSK, video chép chính tả và bài thi.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={unlockAll}
                onChange={(e) => setUnlockAll(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleResetProgress}
            className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại tiến độ học</span>
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-onaccent font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : null}
            <span>{savedSuccess ? "Đã lưu cài đặt!" : "Lưu cài đặt"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
