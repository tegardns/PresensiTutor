import type { ChangePasswordCardProps } from "../types";

export default function ChangePasswordCard({
  onOpenPasswordModal,
}: ChangePasswordCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Ganti Password</h3>

      <p className="text-xs text-gray-500 mb-4">
        Perbarui password Anda secara berkala untuk keamanan akun
      </p>

      <button
        onClick={onOpenPasswordModal}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-sm"
      >
        Update Password
      </button>
    </div>
  );
}