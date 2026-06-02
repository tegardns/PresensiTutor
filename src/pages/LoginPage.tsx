import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, User, LogIn } from "lucide-react";
import api from "../shared/lib/api";

interface LoginPageProps {
  onLogin: (username: string, password: string) => Promise<void> | void;
  error?: string;
}

export default function LoginPage({ onLogin, error }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<{ logoUrl?: string; namaBimbel?: string }>({});

  useEffect(() => {
    api.get("/public/settings")
      .then((res) => {
        if (res.data) setSettings(res.data);
      })
      .catch((err) => console.error("Gagal load logo:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onLogin(username, password);
    } finally {
      setLoading(false);
    }
  };

  const namaBimbel = settings.namaBimbel || "Bimbel Saka";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md overflow-hidden transition-all duration-350 hover:shadow-2xl">
        {/* Banner header */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white text-center relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl -mr-6 -mt-6"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -ml-10 -mb-10"></div>

          {/* {settings.logoUrl ? (
             <img src={settings.logoUrl} alt="Logo" className="w-16 h-16 object-contain rounded-xl mb-4 relative z-10 bg-white/10 p-1 backdrop-blur-sm border border-white/20 shadow-inner" />
          ) : (
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner relative z-10">
              <span className="text-3xl font-extrabold text-white">{namaBimbel.charAt(0)}</span>
            </div>
          )} */}

          <h1 className="text-2xl font-bold tracking-tight relative z-10">{namaBimbel}</h1>
          <p className="text-xs text-blue-150 font-medium mt-1 relative z-10 text-blue-100">Sistem Presensi & Slip Gaji Tutor</p>
        </div>

        {/* Form content */}
        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">
            Masuk sebagai Tutor
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-sm font-semibold text-rose-600 text-center animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Email / Username
              </label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <LogIn className="w-5 h-5" />
              {loading ? "Menghubungkan..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
