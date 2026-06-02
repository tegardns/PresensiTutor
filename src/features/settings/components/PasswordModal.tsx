import { X } from "lucide-react";

import type { PasswordModalProps } from "../types";
import { isPasswordValid } from "../utils";

export default function PasswordModal({
  oldPassword,
  newPassword,
  confirmPassword,
  onOldPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onClose,
  onSubmit,
}: PasswordModalProps) {
  const canSubmit = isPasswordValid(
    oldPassword,
    newPassword,
    confirmPassword
  );

  function handleSubmit() {
    if (!canSubmit) return;

    onSubmit();
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-gray-900">Ganti Password</h3>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Password Lama
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(event) => onOldPasswordChange(event.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Password Baru
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => onNewPasswordChange(event.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xs text-gray-500 mt-2">
              Minimal 6 karakter dengan kombinasi uppercase dan simbol
            </p>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">
              Konfirmasi Password Baru
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                onConfirmPasswordChange(event.target.value)
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium"
            >
              Batalkan
            </button>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}