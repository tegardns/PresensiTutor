import { Clock, Home, Sparkles, User } from "lucide-react";

import type { Page } from "../types";

interface BottomNavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

function getNavButtonClass(isActive: boolean) {
  return `flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 ${
    isActive 
      ? "text-blue-600 scale-105 font-semibold" 
      : "text-gray-400 hover:text-gray-600 active:scale-95"
  }`;
}

export default function BottomNavigation({
  currentPage,
  onNavigate,
}: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-40 max-w-md mx-auto">
      <div className="flex items-center justify-around px-2 py-2">
        <button
          onClick={() => onNavigate("home")}
          className={getNavButtonClass(currentPage === "home")}
        >
          <Home className="size-5" />
          <span className="text-[10px] tracking-wide">Home</span>
        </button>

        <button
          onClick={() => onNavigate("history")}
          className={getNavButtonClass(currentPage === "history")}
        >
          <Clock className="size-5" />
          <span className="text-[10px] tracking-wide">Riwayat</span>
        </button>

        <button
          onClick={() => onNavigate("ai-saka")}
          className={getNavButtonClass(currentPage === "ai-saka")}
        >
          <div className="relative">
            <Sparkles className="size-5 text-indigo-500 fill-indigo-100" />
            <span className="absolute -top-1.5 -right-2 bg-indigo-500 text-white text-[7px] px-1 rounded-full scale-90 font-bold animate-pulse">
              AI
            </span>
          </div>
          <span className="text-[10px] tracking-wide">AI Saka</span>
        </button>

        <button
          onClick={() => onNavigate("settings")}
          className={getNavButtonClass(currentPage === "settings" || currentPage === "settings")}
        >
          <User className="size-5" />
          <span className="text-[10px] tracking-wide">Profil</span>
        </button>
      </div>
    </div>
  );
}