import type { Session } from "../../types";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusLabel,
} from "../../utils";

interface SessionCardProps {
  session: Session;
  onViewDetail: (session: Session) => void;
}

export default function SessionCard({
  session,
  onViewDetail,
}: SessionCardProps) {
  const isFinished = session.status === "selesai";

  return (
    <div
      className={`bg-white rounded-2xl p-4 border border-gray-100 shadow-sm ${isFinished ? "opacity-50" : ""
        }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm text-gray-600">{formatDate(session.date)}</p>
          <p className="text-xs text-gray-400 font-mono mt-1">
            {session.sessionId}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            session.status
          )}`}
        >
          {getStatusLabel(session.status)}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Siswa</span>
          <span className="text-sm font-medium text-gray-900">
            {session.student}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Mata Pelajaran</span>
          <span className="text-sm font-medium text-gray-900">
            {session.subject}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Durasi</span>
          <span className="text-sm font-medium text-gray-900">
            {session.duration} menit
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
        <p className="font-bold text-gray-900">
          {formatCurrency(session.amount)}
        </p>

        <button
          onClick={() => onViewDetail(session)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
}