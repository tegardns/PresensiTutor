import { useState } from "react";
import { LogOut, User, Bell, ArrowUpRight, MoreHorizontal } from "lucide-react";

interface DashboardHeaderProps {
  tutorName: string;
  tutorPhoto?: string;
  tutorProfile?: any;
  currentDateTime: Date;
  showDropdown: boolean;
  onToggleDropdown: () => void;
  onCloseDropdown: () => void;
  onNavigateToSettings: () => void;
  onLogout: () => void;
  logoUrl?: string;
  namaBimbel?: string;
}

export default function DashboardHeader({
  tutorName,
  tutorPhoto,
  tutorProfile,
  showDropdown,
  onToggleDropdown,
  onCloseDropdown,
  onNavigateToSettings,
  onLogout,
}: DashboardHeaderProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  function handleNavigateToSettings() {
    onCloseDropdown();
    onNavigateToSettings();
  }

  // Get first name for friendly greeting
  const firstName = tutorName.trim().split(" ")[0];

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="px-5 py-4 flex items-center justify-between">

        {/* Left Side: Avatar & Sapaan */}
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white overflow-hidden shadow-sm">
            {tutorPhoto ? (
              <img
                src={tutorPhoto}
                alt={tutorName}
                className="size-full object-cover"
              />
            ) : (
              <User className="size-5" />
            )}
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-800 leading-tight">
              Halo, {firstName}
            </h2>
            <p className="text-xs text-slate-400 font-medium">Tutor</p>
          </div>
        </div>

        {/* Right Side: Modern Hexagonal Settings Icon & Dropdown */}
        <div className="relative">
          <button
            onClick={onToggleDropdown}
            className={`relative size-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
              showDropdown 
                ? "text-blue-600 bg-blue-50/50" 
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            }`}
          >
            <MoreHorizontal className="size-6 stroke-[2]" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 p-4 min-w-[260px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">

              {/* Profile Section with link to Settings */}
              <button
                onClick={handleNavigateToSettings}
                className="w-full text-left flex items-start justify-between group hover:opacity-80 transition-opacity pb-3"
              >
                <div className="pr-2">
                  <h3 className="font-semibold text-slate-800 text-sm tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                    {tutorName}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[190px]">
                    {tutorProfile?.email || "tutor@gmail.com"}
                  </p>
                </div>
                <ArrowUpRight className="size-4 text-blue-500 flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <hr className="border-slate-100 my-2" />

              {/* Menu items */}
              <div className="space-y-1">


                {/* Notifikasi */}
                <div className="flex items-center justify-between py-2 px-1 text-slate-600 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="size-4.5 text-slate-500 stroke-[1.5]" />
                    <span className="text-xs font-medium text-slate-600">Notifikasi</span>
                  </div>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`w-8 h-4.5 rounded-full transition-colors duration-200 relative flex items-center ${notificationsEnabled ? "bg-blue-600" : "bg-gray-200"
                      }`}
                  >
                    <div
                      className={`size-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 absolute ${notificationsEnabled ? "translate-x-[14px]" : "translate-x-0.5"
                        }`}
                    />
                  </button>
                </div>
              </div>

              <hr className="border-slate-100 my-2.5" />

              {/* Logout */}
              <button
                onClick={onLogout}
                className="w-full py-2 px-1 flex items-center gap-3 text-red-500 hover:opacity-85 transition-opacity"
              >
                <LogOut className="size-4.5 stroke-[1.5]" />
                <span className="text-xs font-bold">Logout</span>
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}