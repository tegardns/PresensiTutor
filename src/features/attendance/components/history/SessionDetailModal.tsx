import type { Session } from "../../types";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  getStatusLabel,
} from "../../utils";

interface SessionDetailModalProps {
  session: Session;
  onClose: () => void;
}

export default function SessionDetailModal({
  session,
  onClose,
}: SessionDetailModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6 max-h-[80vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-gray-900">Detail Sesi</h3>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">ID Sesi</p>
            <p className="text-sm font-mono text-gray-900">
              {session.sessionId}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Tanggal</p>
            <p className="text-sm text-gray-900">{formatDate(session.date)}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Siswa</p>
            <p className="text-sm font-medium text-gray-900">
              {session.student}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Mata Pelajaran</p>
            <p className="text-sm font-medium text-gray-900">
              {session.subject}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Durasi</p>
            <p className="text-sm font-medium text-gray-900">
              {session.duration} menit
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Nominal</p>
            <p className="font-bold text-gray-900">
              {formatCurrency(session.amount)}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Status Payout</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                session.status
              )}`}
            >
              {getStatusLabel(session.status)}
            </span>
          </div>

          {session.notes && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Catatan</p>
              <p className="text-sm text-gray-900">{session.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}