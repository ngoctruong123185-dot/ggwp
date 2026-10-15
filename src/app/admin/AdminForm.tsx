"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Video, BookOpen, Check, AlertCircle } from "lucide-react";

export function AdminForm({ lessons }: { lessons: any[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<"dictation" | "vocab">("dictation");

  // Dictation form state
  const [ytId, setYtId] = useState("");
  const [ytTitle, setYtTitle] = useState("");
  const [ytLevel, setYtLevel] = useState("HSK 1");
  const [ytChannel, setYtChannel] = useState("");
  const [transcriptRaw, setTranscriptRaw] = useState(
    JSON.stringify(
      [
        {
          text: "你好！",
          pinyin: "Nǐ hǎo!",
          vi: "Xin chào!",
          startSec: 1,
          endSec: 4,
        },
      ],
      null,
      2
    )
  );

  // Vocab form state
  const [selectedLessonId, setSelectedLessonId] = useState(lessons[0]?.id || "");
  const [hanzi, setHanzi] = useState("");
  const [pinyin, setPinyin] = useState("");
  const [meaningVi, setMeaningVi] = useState("");
  const [wordClass, setWordClass] = useState("Danh từ");
  const [exampleSentence, setExampleSentence] = useState("");
  const [exampleSentenceVi, setExampleSentenceVi] = useState("");

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddDictation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let parsedTranscript: any[] = [];
      try {
        parsedTranscript = JSON.parse(transcriptRaw);
      } catch (err) {
        throw new Error("Định dạng JSON transcript chưa đúng.");
      }

      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_dictation",
          youtubeId: ytId.trim(),
          title: ytTitle.trim(),
          level: ytLevel,
          channelName: ytChannel.trim(),
          transcript: parsedTranscript,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Đã thêm video chép chính tả thành công!", type: "success" });
        setYtId("");
        setYtTitle("");
        router.refresh();
      } else {
        throw new Error(data.error || "Không thể lưu video");
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddVocab = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_vocab",
          lessonId: selectedLessonId,
          hanzi: hanzi.trim(),
          pinyin: pinyin.trim(),
          meaningVi: meaningVi.trim(),
          wordClass,
          exampleSentence: exampleSentence.trim(),
          exampleSentenceVi: exampleSentenceVi.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Đã thêm từ vựng thành công!", type: "success" });
        setHanzi("");
        setPinyin("");
        setMeaningVi("");
        setExampleSentence("");
        setExampleSentenceVi("");
        router.refresh();
      } else {
        throw new Error(data.error || "Không thể thêm từ vựng");
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => {
            setTab("dictation");
            setMessage(null);
          }}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            tab === "dictation"
              ? "border-rose-600 text-rose-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Thêm Video Chép chính tả</span>
        </button>

        <button
          onClick={() => {
            setTab("vocab");
            setMessage(null);
          }}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            tab === "vocab"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Thêm Từ vựng vào bài học</span>
        </button>
      </div>

      {/* Message notification */}
      {message && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {message.type === "success" ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* 1. Add Dictation Form */}
      {tab === "dictation" && (
        <form onSubmit={handleAddDictation} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                YouTube Video ID:
              </label>
              <input
                type="text"
                required
                value={ytId}
                onChange={(e) => setYtId(e.target.value)}
                placeholder="VD: dQw4w9WgXcQ"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500"
              />
              <span className="text-[10px] text-slate-400">
                (Phần mã sau ?v= trên link YouTube)
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Cấp độ HSK:
              </label>
              <select
                value={ytLevel}
                onChange={(e) => setYtLevel(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500"
              >
                <option value="HSK 1">HSK 1</option>
                <option value="HSK 2">HSK 2</option>
                <option value="HSK 3">HSK 3</option>
                <option value="HSK 4">HSK 4</option>
                <option value="HSK 5">HSK 5</option>
                <option value="HSK 6">HSK 6</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Tiêu đề video:
              </label>
              <input
                type="text"
                required
                value={ytTitle}
                onChange={(e) => setYtTitle(e.target.value)}
                placeholder="VD: Hội thoại mua sắm tại chợ Bắc Kinh"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Tên kênh / Nguồn:
              </label>
              <input
                type="text"
                value={ytChannel}
                onChange={(e) => setYtChannel(e.target.value)}
                placeholder="VD: Mandarin Corner"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Transcript câu kèm mốc giây (JSON format):
            </label>
            <textarea
              rows={6}
              value={transcriptRaw}
              onChange={(e) => setTranscriptRaw(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-rose-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-onaccent font-bold text-xs shadow-md transition-all active:scale-95"
          >
            {loading ? "Đang lưu video..." : "Lưu video Dictation mới"}
          </button>
        </form>
      )}

      {/* 2. Add Vocab Form */}
      {tab === "vocab" && (
        <form onSubmit={handleAddVocab} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Chọn bài học đích:
            </label>
            <select
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            >
              {lessons.map((lsn) => (
                <option key={lsn.id} value={lsn.id}>
                  {lsn.level.name} - Bài {lsn.order}: {lsn.title} ({lsn.titleVi})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Chữ Hán:
              </label>
              <input
                type="text"
                required
                value={hanzi}
                onChange={(e) => setHanzi(e.target.value)}
                placeholder="VD: 朋友"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 hanzi-font font-bold text-base"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Phiên âm Pinyin:
              </label>
              <input
                type="text"
                required
                value={pinyin}
                onChange={(e) => setPinyin(e.target.value)}
                placeholder="VD: péngyou"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Từ loại:
              </label>
              <select
                value={wordClass}
                onChange={(e) => setWordClass(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="Danh từ">Danh từ</option>
                <option value="Động từ">Động từ</option>
                <option value="Tính từ">Tính từ</option>
                <option value="Đại từ">Đại từ</option>
                <option value="Phó từ">Phó từ</option>
                <option value="Lượng từ">Lượng từ</option>
                <option value="Giới từ">Giới từ</option>
                <option value="Liên từ">Liên từ</option>
                <option value="Trợ từ">Trợ từ</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nghĩa tiếng Việt:
              </label>
              <input
                type="text"
                required
                value={meaningVi}
                onChange={(e) => setMeaningVi(e.target.value)}
                placeholder="VD: Bạn bè, bạn hữu"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Câu ví dụ chữ Hán:
              </label>
              <input
                type="text"
                value={exampleSentence}
                onChange={(e) => setExampleSentence(e.target.value)}
                placeholder="VD: 他是我的好朋友。"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 hanzi-font"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Dịch nghĩa câu ví dụ:
              </label>
              <input
                type="text"
                value={exampleSentenceVi}
                onChange={(e) => setExampleSentenceVi(e.target.value)}
                placeholder="VD: Cậu ấy là bạn tốt của tôi."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-onaccent font-bold text-xs shadow-md transition-all active:scale-95"
          >
            {loading ? "Đang thêm từ vựng..." : "Thêm từ vựng vào bài học"}
          </button>
        </form>
      )}
    </div>
  );
}
