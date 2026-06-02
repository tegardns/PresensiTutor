import { ArrowLeft } from "lucide-react";

import type { SettingsHeaderProps } from "../types";

export default function SettingsHeader({ onBack }: SettingsHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="px-5 pt-5 pb-3 text-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-tight">
          BimbelMelly
        </h1>
      </div>

      <div className="px-5 pb-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-5 text-gray-600" />
        </button>

        <div>
          <h2 className="font-bold text-gray-900">Edit Profil</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Lengkapi data diri dan rekening payout
          </p>
        </div>
      </div>
    </div>
  );
}