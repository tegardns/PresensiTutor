interface SubmitAttendanceButtonProps {
  isFormValid: boolean;
  onSubmit: () => void;
}

export default function SubmitAttendanceButton({
  isFormValid,
  onSubmit,
}: SubmitAttendanceButtonProps) {
  if (!isFormValid) {
    return (
      <div className="text-center py-4 text-sm text-gray-500">
        Lengkapi semua field yang wajib diisi untuk melanjutkan
      </div>
    );
  }

  return (
    <button
      onClick={onSubmit}
      className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
    >
      Simpan Presensi
    </button>
  );
}