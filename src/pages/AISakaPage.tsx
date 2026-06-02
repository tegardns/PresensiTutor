import { Sparkles, Brain, Cpu, MessageSquare } from "lucide-react";

export default function AISakaPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 pb-24 text-center animate-in fade-in duration-300">
      {/* Header Badge */}
      <div className="mb-6 inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase animate-pulse">
        <Sparkles className="size-3.5 fill-indigo-100" />
        AI Saka Co-Pilot
      </div>

      {/* Visual Container */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Animated Glow Rings */}
        <div className="absolute size-32 bg-indigo-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute size-24 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

        {/* Icon Frame */}
        <div className="relative size-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl shadow-xl flex items-center justify-center text-white transform hover:rotate-12 transition-transform duration-300">
          <Brain className="size-10 stroke-[1.5] animate-bounce" />
        </div>
      </div>

      {/* Text Info */}
      <h1 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">
        AI Saka
      </h1>
      <p className="text-sm text-slate-500 max-w-xs mx-auto mb-8 leading-relaxed">
        Asisten AI pintar untuk membantu Tutor mengelola presensi, merekap sesi belajar, dan menyusun catatan evaluasi secara otomatis.
      </p>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs text-left mb-6">
        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          <Cpu className="size-5 text-indigo-500 mb-2" />
          <h3 className="text-xs font-bold text-slate-700 mb-1">Presensi Cepat</h3>
          <p className="text-[10px] text-slate-400">Verifikasi presensi berbasis foto dengan cerdas.</p>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
          <MessageSquare className="size-5 text-blue-500 mb-2" />
          <h3 className="text-xs font-bold text-slate-700 mb-1">Catatan Otomatis</h3>
          <p className="text-[10px] text-slate-400">Generasi catatan sesi mengajar dengan AI.</p>
        </div>
      </div>

      {/* Footer Info */}
      <span className="text-xs text-indigo-500/80 font-bold bg-indigo-50/50 border border-indigo-100/50 px-3 py-1 rounded-lg">
        Segera Hadir
      </span>
    </div>
  );
}
