import type { PasswordConfirmModalProps } from "../types";

export default function PasswordConfirmModal({
  onCancel,
  onConfirm,
}: PasswordConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-[1.5px] z-50 flex items-center justify-center p-5 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.08)] max-w-sm w-full p-5 text-center animate-in zoom-in-95 duration-200">
        <h3 className="font-bold text-slate-800 text-base mb-2">
          Konfirmasi Perubahan Password
        </h3>

        <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
          Password akan diganti dan anda akan keluar dari akun. Silakan login
          kembali dengan password baru.
        </p>

        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100/80 rounded-xl transition-all"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}