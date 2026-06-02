import type { PasswordConfirmModalProps } from "../types";

export default function PasswordConfirmModal({
  onCancel,
  onConfirm,
}: PasswordConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
        <h3 className="font-bold text-gray-900 mb-2">
          Konfirmasi Perubahan Password
        </h3>

        <p className="text-sm text-gray-600 mb-6">
          Password akan diganti dan anda akan keluar dari akun. Silakan login
          kembali dengan password baru.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium"
          >
            Batalkan
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}