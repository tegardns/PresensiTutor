import { LogOut, Settings, User } from "lucide-react";

import { formatCurrentDate } from "../utils";

interface DashboardHeaderProps {
  tutorName: string;
  tutorPhoto?: string;
  currentDateTime: Date;
  showDropdown: boolean;
  onToggleDropdown: () => void;
  onCloseDropdown: () => void;
  onNavigateToSettings: () => void;
  onLogout: () => void;
}

export default function DashboardHeader({
  tutorName,
  tutorPhoto,
  currentDateTime,
  showDropdown,
  onToggleDropdown,
  onCloseDropdown,
  onNavigateToSettings,
  onLogout,
}: DashboardHeaderProps) {
  function handleNavigateToSettings() {
    onCloseDropdown();
    onNavigateToSettings();
  }

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="px-5 pt-5 pb-3 text-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-tight">
          BimbelMelly
        </h1>
      </div>

      <div className="px-5 pb-4 flex items-center gap-3">
        <div className="relative">
          <button
            onClick={onToggleDropdown}
            className="size-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white overflow-hidden"
          >
            {tutorPhoto ? (
              <img
                src={tutorPhoto}
                alt={tutorName}
                className="size-full object-cover"
              />
            ) : (
              <User className="size-5" />
            )}
          </button>

          {showDropdown && (
            <div className="absolute top-12 left-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-w-[160px] z-20">
              <button
                onClick={handleNavigateToSettings}
                className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 text-left"
              >
                <Settings className="size-4 text-gray-600" />
                <span className="text-sm">Pengaturan</span>
              </button>

              <button
                onClick={onLogout}
                className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 text-left border-t border-gray-100"
              >
                <LogOut className="size-4 text-red-600" />
                <span className="text-sm text-red-600">Keluar</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-base text-gray-900">
            {tutorName}
          </h2>
          <p className="text-xs text-gray-500">Tentor</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-900 font-medium">
            {formatCurrentDate(currentDateTime)}
          </p>
        </div>
      </div>
    </div>
  );
}