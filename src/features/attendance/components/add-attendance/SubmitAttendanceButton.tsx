interface SubmitAttendanceButtonProps {
  isFormValid: boolean;
  onSubmit: () => void;
  submitting?: boolean;
}

export default function SubmitAttendanceButton({
  isFormValid,
  onSubmit,
  submitting = false,
}: SubmitAttendanceButtonProps) {
  if (!isFormValid && !submitting) {
    return (
      <div className="text-center py-4 text-sm text-gray-500">
        Lengkapi semua field yang wajib diisi untuk melanjutkan
      </div>
    );
  }

  return (
    <button
      onClick={onSubmit}
      disabled={submitting}
      className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {submitting ? "Memproses..." : "Simpan Presensi"}
    </button>
  );
}