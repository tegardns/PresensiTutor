import { ArrowLeft } from "lucide-react";

interface AddAttendanceHeaderProps {
  onBack: () => void;
}

export default function AddAttendanceHeader({
  onBack,
}: AddAttendanceHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-10">


      <div className="px-5 pt-4 pb-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="size-5 text-gray-600" />
        </button>

        <div>
          <h2 className="font-bold text-gray-900">Tambah Presensi</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Isi semua data sesi pembelajaran
          </p>
        </div>
      </div>
    </div>
  );
}