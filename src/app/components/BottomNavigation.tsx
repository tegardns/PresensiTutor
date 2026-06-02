import { Clock, Home, Plus } from "lucide-react";

import type { Page } from "../types";

interface BottomNavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

function getNavButtonClass(isActive: boolean) {
  return `flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors ${isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
    }`;
}

export default function BottomNavigation({
  currentPage,
  onNavigate,
}: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 max-w-md mx-auto">
      <div className="flex items-center justify-around px-6 py-2">
        <button
          onClick={() => onNavigate("home")}
          className={getNavButtonClass(currentPage === "home")}
        >
          <Home className="size-6" />
          <span className="text-xs font-medium">Beranda</span>
        </button>

        <button
          onClick={() => onNavigate("add-attendance")}
          className="size-14 bg-blue-600 text-white rounded-full shadow-sm hover:bg-blue-700 flex items-center justify-center -mt-7 hover:scale-105 transition-transform"
        >
          <Plus className="size-7" />
        </button>

        <button
          onClick={() => onNavigate("history")}
          className={getNavButtonClass(currentPage === "history")}
        >
          <Clock className="size-6" />
          <span className="text-xs font-medium">Riwayat</span>
        </button>
      </div>
    </div>
  );
}